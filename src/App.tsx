import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { TopNavbar } from './components/TopNavbar';
import { HeroBanner } from './components/HeroBanner';
import { SimulationCatalogGrid } from './components/SimulationCatalogGrid';
import { WebsiteFeatures } from './components/WebsiteFeatures';
import { SimulationViewerModal } from './components/SimulationViewerModal';
import { StandaloneLabPlayer } from './components/StandaloneLabPlayer';
import { Footer } from './components/Footer';
import { MainStage } from './components/MainStage';
import { SIMULATIONS_LIST } from './data/simulationsData';
import { SimulationItem } from './types';
import { openSimulationInNewTab, getSimulationStandaloneUrl } from './utils/navigation';
import { requestAiSimulation } from './utils/aiSimulationGenerator';

function resolveSimulationFromUrl(): SimulationItem | null {
  try {
    // 1. Check Query Parameters: ?sim=... or ?lab=...
    const searchParams = new URLSearchParams(window.location.search);
    const queryParam = searchParams.get('sim') || searchParams.get('lab');

    // 2. Check Hash Parameters: #sim=... or #lab=... or #...
    let hashParam: string | null = null;
    const rawHash = window.location.hash || '';
    if (rawHash) {
      const cleanHash = rawHash.replace(/^#\/?/, '').trim();
      const hashParams = new URLSearchParams(cleanHash.includes('=') ? cleanHash : '');
      hashParam =
        hashParams.get('sim') ||
        hashParams.get('lab') ||
        (cleanHash.startsWith('sim=') ? cleanHash.replace(/^sim=/, '') : null) ||
        (cleanHash.startsWith('lab=') ? cleanHash.replace(/^lab=/, '') : null) ||
        (!cleanHash.includes('=') && !cleanHash.includes('/') && cleanHash.length > 0 ? cleanHash : null);
    }

    // 3. Check Pathname fallback: /simulation/:id
    const pathname = window.location.pathname;
    const simMatch = pathname.match(/^\/simulation\/(.+?)(?:\/)?$/);
    const pathMatch = simMatch ? decodeURIComponent(simMatch[1]).trim() : null;

    const rawTarget = queryParam || hashParam || pathMatch;
    if (rawTarget) {
      const targetKey = decodeURIComponent(rawTarget).trim().toLowerCase();
      return (
        SIMULATIONS_LIST.find((s) => {
          return (
            s.indexNumber.toLowerCase() === targetKey ||
            s.slug.toLowerCase() === targetKey ||
            s.id.toLowerCase() === targetKey ||
            s.fileUrl.toLowerCase().includes(targetKey)
          );
        }) || null
      );
    }
  } catch {
    // Fallback
  }
  return null;
}

export default function App() {
  // Check if launched as dedicated standalone simulation workspace via /simulation/:id or ?lab=01
  const [standaloneLab, setStandaloneLab] = useState<SimulationItem | null>(() => resolveSimulationFromUrl());

  // Default active subject filter: "Physics & Motion" is the default initial discipline
  const [selectedSubject, setSelectedSubject] = useState<string>('Physics & Motion');
  
  // Active stage simulation (auto-opened from search, catalog card, or AI generation)
  const [activeStageSim, setActiveStageSim] = useState<SimulationItem | null>(null);
  const [allSimulations, setAllSimulations] = useState<SimulationItem[]>(SIMULATIONS_LIST);
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);
  const [aiGeneratingTopic, setAiGeneratingTopic] = useState<string>('');

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [fullscreenModalSim, setFullscreenModalSim] = useState<SimulationItem | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false); // Default to clean, bright, colorful Light Mode

  // Security & Code Asset Protection: Disable right-click & inspect shortcuts
  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      return false;
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      // F12 key
      if (e.key === 'F12') {
        e.preventDefault();
        return false;
      }

      // Ctrl+Shift+I / J / C (DevTools) or Ctrl+U (View Source)
      if (
        (e.ctrlKey || e.metaKey) &&
        (e.key === 'u' || e.key === 'U' ||
         ((e.shiftKey) && (
           e.key === 'I' || e.key === 'i' || 
           e.key === 'J' || e.key === 'j' || 
           e.key === 'C' || e.key === 'c'
         )))
      ) {
        e.preventDefault();
        return false;
      }
    };

    const handleMessage = (e: MessageEvent) => {
      if (e.data && e.data.type === 'GENZ_SIM_REQUEST_FULLSCREEN') {
        const matching = SIMULATIONS_LIST.find(s => s.fileUrl === e.data.simFile || window.location.pathname.includes(s.slug)) || SIMULATIONS_LIST[0];
        setFullscreenModalSim(matching);
      }
    };

    window.addEventListener('contextmenu', handleContextMenu);
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('contextmenu', handleContextMenu);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  // Listen to popstate and hashchange in case of browser back/forward or hash changes
  useEffect(() => {
    const handleUrlChange = () => {
      setStandaloneLab(resolveSimulationFromUrl());
    };
    window.addEventListener('popstate', handleUrlChange);
    window.addEventListener('hashchange', handleUrlChange);
    return () => {
      window.removeEventListener('popstate', handleUrlChange);
      window.removeEventListener('hashchange', handleUrlChange);
    };
  }, []);

  // When a user selects a simulation from any card, topic, module, or drawer, open in a new tab keeping portal intact
  const handleSelectSim = (sim: SimulationItem) => {
    setSelectedSubject(sim.category);
    setSidebarOpen(false);
    openSimulationInNewTab(sim);
  };

  // Launch a simulation directly onto the active interactive stage
  const handleLaunchOnStage = (sim: SimulationItem) => {
    setActiveStageSim(sim);
    setSelectedSubject(sim.category);
    setSidebarOpen(false);
    setTimeout(() => {
      const stageEl = document.getElementById('stage');
      if (stageEl) {
        stageEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  // On-demand AI dynamic simulation generation workflow via Gemini API
  const handleTriggerAiGeneration = async (topic: string) => {
    if (!topic || isGeneratingAi) return;
    setIsGeneratingAi(true);
    setAiGeneratingTopic(topic);
    try {
      const result = await requestAiSimulation(topic);
      const newSim: SimulationItem = {
        id: `ai-${Date.now()}`,
        slug: `ai-${encodeURIComponent(topic.toLowerCase().replace(/[^a-z0-9]+/g, '-'))}`,
        indexNumber: 'AI',
        title: result.title,
        subject: result.category,
        category: result.category,
        iconName: 'Sparkles',
        accentColor: '#8b5cf6',
        description: result.description,
        fileUrl: '',
        htmlContent: result.htmlContent,
        isAiGenerated: true,
        topics: result.topics,
        features: result.features,
        gradeLevel: 'Advanced STEM Interactive'
      };
      setAllSimulations((prev) => [newSim, ...prev]);
      setActiveStageSim(newSim);
      setSelectedSubject(newSim.category);
      setTimeout(() => {
        const stageEl = document.getElementById('stage');
        if (stageEl) {
          stageEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 150);
    } catch (err) {
      console.error('AI simulation generation failed:', err);
    } finally {
      setIsGeneratingAi(false);
      setAiGeneratingTopic('');
    }
  };

  const handleBackToCatalog = () => {
    setStandaloneLab(null);
    setActiveStageSim(null);
    try {
      window.history.pushState({}, '', '/');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch {
      // Fallback
    }
  };

  // IF LOADED AS DEDICATED STANDALONE TAB/WINDOW (/simulation/:id or ?lab=01):
  if (standaloneLab) {
    return <StandaloneLabPlayer sim={standaloneLab} />;
  }

  // MAIN CATALOG PORTAL & DASHBOARD: Lightweight, clean, clutter-free
  return (
    <div 
      className="min-h-screen flex flex-col font-sans select-none antialiased transition-colors duration-200 opacity-100"
      style={{
        backgroundColor: isDarkMode ? '#040a1c' : '#f1f5f9',
        backgroundImage: isDarkMode
          ? 'radial-gradient(circle at 15% 15%, rgba(30, 58, 138, 0.25) 0%, transparent 45%), radial-gradient(circle at 85% 65%, rgba(14, 116, 144, 0.18) 0%, transparent 45%), radial-gradient(circle at 50% 90%, rgba(88, 28, 135, 0.15) 0%, transparent 50%)'
          : 'radial-gradient(circle at 15% 15%, rgba(219, 234, 254, 0.65) 0%, transparent 45%), radial-gradient(circle at 85% 60%, rgba(224, 231, 255, 0.5) 0%, transparent 45%), radial-gradient(circle at 50% 90%, rgba(209, 250, 229, 0.4) 0%, transparent 50%)',
        color: isDarkMode ? '#ffffff' : '#0f172a'
      }}
    >
      
      {/* Top Website Header Navbar */}
      <TopNavbar
        totalSimulations={allSimulations.length}
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        isDarkMode={isDarkMode}
        onToggleTheme={() => setIsDarkMode(!isDarkMode)}
        onBackToCatalog={handleBackToCatalog}
      />

      {/* Slide-over Fast Navigation Drawer */}
      <Sidebar
        simulations={allSimulations}
        onSelectSim={handleSelectSim}
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        isDarkMode={isDarkMode}
      />

      {/* Drawer Overlay Backdrop with Frosted Glass Blur */}
      {sidebarOpen && (
        <div 
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 transition-opacity"
          style={{
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            backgroundColor: 'rgba(2, 6, 23, 0.6)'
          }}
        />
      )}

      {/* Main Catalog Portal & Dashboard for Laptop & Desktop Screens */}
      <main 
        className="flex-1 max-w-7xl mx-auto w-full px-3 sm:px-6 lg:px-8 py-6 space-y-8 transition-colors duration-200 opacity-100"
        style={{
          backgroundColor: 'transparent'
        }}
      >
        
        {/* 1. Hero Header Banner with Live Digital Clock & Portal CTAs */}
        <HeroBanner 
          isDarkMode={isDarkMode}
          onSelectSim={handleSelectSim}
        />

        {/* AI Generation In-Progress Ambient HUD Banner */}
        {isGeneratingAi && (
          <div 
            className="p-6 rounded-2xl border shadow-2xl transition-all flex flex-col items-center justify-center text-center space-y-3"
            style={{
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              backgroundColor: isDarkMode ? 'rgba(26, 16, 51, 0.95)' : 'rgba(250, 245, 255, 0.95)',
              borderColor: '#a855f7',
              borderWidth: '2px',
              borderStyle: 'solid',
              boxShadow: '0 10px 40px rgba(168, 85, 247, 0.35)'
            }}
          >
            <div className="flex items-center gap-3">
              <span className="w-4 h-4 rounded-full bg-purple-500 animate-ping" />
              <span className="text-base sm:text-lg font-black text-purple-600 dark:text-purple-300">
                Synthesizing &ldquo;{aiGeneratingTopic}&rdquo; Interactive Simulation with Gemini API...
              </span>
            </div>
            <p className="text-xs font-bold text-slate-500 dark:text-slate-400 max-w-md">
              Generating mathematical models, real-time Canvas 60 FPS physics, and interactive parameter sliders on the fly.
            </p>
            <div className="w-full max-w-md h-2 bg-purple-200 dark:bg-purple-950 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 animate-pulse w-full" />
            </div>
          </div>
        )}

        {/* Interactive Simulation Stage (Mounted when selected from search auto-open, catalog card, or AI generation) */}
        {activeStageSim && (
          <div className="scroll-mt-24" id="stage">
            <MainStage
              activeSim={activeStageSim}
              totalSimulations={allSimulations.length}
              onBackToCatalog={() => setActiveStageSim(null)}
              onLaunchFullscreenModal={(sim) => setFullscreenModalSim(sim)}
              isDarkMode={isDarkMode}
            />
          </div>
        )}

        {/* 2. STEM Catalog & Topic Cards Grid with Enhanced Search Bar */}
        <SimulationCatalogGrid
          simulations={allSimulations}
          selectedCategory={selectedSubject}
          onSelectCategory={(cat) => setSelectedSubject(cat)}
          onSelectSim={handleSelectSim}
          onLaunchOnStage={handleLaunchOnStage}
          onTriggerAiGeneration={handleTriggerAiGeneration}
          isGeneratingAi={isGeneratingAi}
          onLaunchFullscreenModal={(sim) => setFullscreenModalSim(sim)}
          isDarkMode={isDarkMode}
        />

        {/* 4. Educational Standards & Digital Laboratory Architecture */}
        <WebsiteFeatures isDarkMode={isDarkMode} />

      </main>

      {/* Fullscreen Immersion Viewport Modal (available directly from cards) */}
      {fullscreenModalSim && (
        <SimulationViewerModal
          sim={fullscreenModalSim}
          onClose={() => setFullscreenModalSim(null)}
        />
      )}

      {/* Developer Website Footer */}
      <Footer isDarkMode={isDarkMode} />

    </div>
  );
}
