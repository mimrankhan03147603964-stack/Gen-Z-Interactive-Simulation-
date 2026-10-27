import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { TopNavbar } from './components/TopNavbar';
import { HeroBanner } from './components/HeroBanner';
import { PedagogicalHub } from './components/PedagogicalHub';
import { SimulationCatalogGrid } from './components/SimulationCatalogGrid';
import { WebsiteFeatures } from './components/WebsiteFeatures';
import { SimulationViewerModal } from './components/SimulationViewerModal';
import { StandaloneLabPlayer } from './components/StandaloneLabPlayer';
import { Footer } from './components/Footer';
import { MainStage } from './components/MainStage';
import { ThreeStemBackground } from './components/ThreeStemBackground';
import { ExternalSimulationsHub } from './components/ExternalSimulationsHub';
import { SIMULATIONS_LIST } from './data/simulationsData';
import { SimulationItem } from './types';
import { openSimulationInNewTab, getSimulationStandaloneUrl } from './utils/navigation';
import { requestAiSimulation } from './utils/aiSimulationGenerator';

function resolveSimulationFromUrl(): SimulationItem | null {
  try {
    // 1. Check Query Parameters: ?sim=... or ?lab=...
    const searchParams = new URLSearchParams(window.location.search);
    const queryParam = searchParams.get('sim') || searchParams.get('lab');
    if (queryParam) {
      const targetKey = decodeURIComponent(queryParam).trim().toLowerCase();
      return (
        SIMULATIONS_LIST.find((s) => (
          s.indexNumber.toLowerCase() === targetKey ||
          s.slug.toLowerCase() === targetKey ||
          s.id.toLowerCase() === targetKey ||
          s.fileUrl.toLowerCase().includes(targetKey)
        )) || null
      );
    }

    // 2. Check Hash Parameters: #sim=... or #lab=... (Ignore page section anchors like #developer, #catalog, #stage, #features)
    const rawHash = window.location.hash || '';
    if (rawHash) {
      const cleanHash = rawHash.replace(/^#\/?/, '').trim().toLowerCase();
      const pageSectionAnchors = ['developer', 'catalog', 'stage', 'features', 'top', 'menu', 'contact', 'external-simulations', 'simulation-hub'];
      if (pageSectionAnchors.includes(cleanHash)) {
        return null;
      }
      if (cleanHash.startsWith('sim=') || cleanHash.startsWith('lab=')) {
        const val = cleanHash.split('=')[1]?.trim();
        if (val) {
          return (
            SIMULATIONS_LIST.find((s) => (
              s.indexNumber.toLowerCase() === val ||
              s.slug.toLowerCase() === val ||
              s.id.toLowerCase() === val
            )) || null
          );
        }
      }
    }

    // 3. Check Pathname: /simulation/:id
    const pathname = window.location.pathname;
    const simMatch = pathname.match(/^\/simulation\/(.+?)(?:\/)?$/);
    if (simMatch) {
      const pathMatch = decodeURIComponent(simMatch[1]).trim().toLowerCase();
      return (
        SIMULATIONS_LIST.find((s) => (
          s.indexNumber.toLowerCase() === pathMatch ||
          s.slug.toLowerCase() === pathMatch ||
          s.id.toLowerCase() === pathMatch
        )) || null
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

  // Default active subject filter: "All Simulations" is the default initial state
  const [selectedSubject, setSelectedSubject] = useState<string>('All Simulations');
  const [selectedGradeTier, setSelectedGradeTier] = useState<string>('all');
  
  // Clean View Navigation State: 'home' (zero-rush dashboard without 86 cards) or 'catalog' (dedicated lab catalog view)
  const [currentView, setCurrentView] = useState<'home' | 'catalog'>('home');
  
  // Active stage simulation (auto-opened from search, catalog card, or AI generation)
  const [activeStageSim, setActiveStageSim] = useState<SimulationItem | null>(null);
  const [allSimulations, setAllSimulations] = useState<SimulationItem[]>(SIMULATIONS_LIST);
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);
  const [aiGeneratingTopic, setAiGeneratingTopic] = useState<string>('');

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [fullscreenModalSim, setFullscreenModalSim] = useState<SimulationItem | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false); // Clean Soft Claymorphism & Neumorphic Light Theme

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
    setCurrentView('home');
    try {
      window.history.pushState({}, '', '/');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch {
      // Fallback
    }
  };

  const handleOpenCatalog = (category?: string, grade?: string) => {
    if (category) setSelectedSubject(category);
    if (grade) setSelectedGradeTier(grade);
    setCurrentView('catalog');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleScrollToExternal = () => {
    if (currentView !== 'home') {
      setCurrentView('home');
    }
    setTimeout(() => {
      const el = document.getElementById('external-simulations');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 120);
  };

  // Ensure initial load starts at top hero section without accidental jumping
  useEffect(() => {
    if (window.location.hash === '#developer') {
      try {
        window.history.replaceState(null, '', window.location.pathname + window.location.search);
      } catch {
        // ignore
      }
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  // IF LOADED AS DEDICATED STANDALONE TAB/WINDOW (/simulation/:id or ?lab=01):
  if (standaloneLab) {
    return <StandaloneLabPlayer sim={standaloneLab} />;
  }

  // MAIN CATALOG PORTAL & DASHBOARD: Steel & Ocean Blue Theme (Light Top to Dark Bottom)
  return (
    <div 
      className="min-h-screen flex flex-col font-sans select-none antialiased relative text-white"
      style={{ 
        background: 'linear-gradient(180deg, #7BBDE8 0%, #4E8EA2 18%, #0A4174 50%, #001D39 85%, #001224 100%)',
        backgroundColor: '#001D39'
      }}
    >
      {/* 3D STEM Simulation Interactive Background strictly in background */}
      <ThreeStemBackground />
      
      {/* Website Content Container with position: relative, z-index: 10, offset by fixed navbar height */}
      <div className="relative z-10 flex flex-col flex-1 w-full min-h-screen pt-14">
        {/* Top Website Header Navbar (Desktop-Optimized, Sticky at Top) */}
        <TopNavbar
          totalSimulations={allSimulations.length}
          isDarkMode={isDarkMode}
          onToggleTheme={() => setIsDarkMode((prev) => !prev)}
          onBackToCatalog={handleBackToCatalog}
          onNavigateToExternal={handleScrollToExternal}
          onSelectCategory={(cat) => {
            setSelectedSubject(cat);
            setCurrentView('catalog');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />

        {/* Slide-over Fast Navigation Drawer (Disabled for desktop, guarded if opened) */}
        {sidebarOpen && (
          <Sidebar
            simulations={allSimulations}
            selectedCategory={selectedSubject}
            onSelectCategory={(cat) => {
              setSelectedSubject(cat);
              setSidebarOpen(false);
              setCurrentView('catalog');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onSelectSim={handleSelectSim}
            isOpen={sidebarOpen}
            onToggle={() => setSidebarOpen(false)}
            isDarkMode={isDarkMode}
          />
        )}

        {/* Main Content Area: Switches between Clean Zero-Rush Home and Focused Lab Catalog */}
        <main 
          className="flex-1 w-full max-w-none px-3 sm:px-6 lg:px-8 xl:px-12 pt-3 pb-8 sm:pt-4 sm:pb-12 space-y-6 sm:space-y-8 relative z-10 transition-colors duration-200 opacity-100 overflow-x-clip"
          style={{
            backgroundColor: 'transparent'
          }}
        >
          {/* AI Generation In-Progress Ambient HUD Banner - Fully Color Filled */}
          {isGeneratingAi && (
            <div 
              className="p-6 rounded-2xl border shadow-lg transition-all flex flex-col items-center justify-center text-center space-y-3"
              style={{
                background: 'linear-gradient(135deg, #0A4174 0%, #001D39 100%)',
                borderColor: '#7BBDE8',
                boxShadow: '0 8px 30px rgba(0, 29, 57, 0.6)'
              }}
            >
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-[#7BBDE8] animate-ping" />
                <span className="text-base sm:text-lg font-bold text-[#BDD8E9]">
                  Synthesizing &ldquo;{aiGeneratingTopic}&rdquo; Interactive Simulation...
                </span>
              </div>
              <p className="text-xs font-normal text-[#BDD8E9] max-w-md">
                Generating mathematical models, real-time physics, and interactive parameter sliders.
              </p>
              <div className="w-full max-w-md h-2 bg-[#001D39] border border-[#4E8EA2] rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-[#4E8EA2] to-[#7BBDE8] animate-pulse w-full" />
              </div>
            </div>
          )}

          {/* Interactive Simulation Stage (Mounted when selected from search auto-open or AI generation) */}
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

          {currentView === 'home' ? (
            /* VIEW 1: CLEAN ZERO-RUSH HOME VIEW (Without 86 Cards) */
            <>
              {/* 1. Hero Header Banner with Live Digital Clock & Portal CTAs */}
              <HeroBanner 
                isDarkMode={isDarkMode}
                onSelectSim={handleSelectSim}
                onExploreLabs={() => handleOpenCatalog('All Simulations', 'all')}
              />

              {/* 2. Dedicated High-Impact Pedagogical Hub (For Teachers & Students) */}
              <PedagogicalHub 
                totalSimulations={allSimulations.length} 
                onBrowseTeacher={() => handleOpenCatalog('All Simulations', 'all')}
                onLaunchStudent={() => handleOpenCatalog('All Simulations', 'all')}
              />

              {/* 3. Grade & Subject Selection Area (No Simulation Cards Rendered Here!) */}
              <SimulationCatalogGrid
                simulations={allSimulations}
                selectedCategory={selectedSubject}
                onSelectCategory={(cat) => setSelectedSubject(cat)}
                selectedGradeTier={selectedGradeTier}
                onSelectGradeTier={(tier) => setSelectedGradeTier(tier)}
                onSelectSim={handleSelectSim}
                onLaunchOnStage={handleLaunchOnStage}
                onTriggerAiGeneration={handleTriggerAiGeneration}
                isGeneratingAi={isGeneratingAi}
                onLaunchFullscreenModal={(sim) => setFullscreenModalSim(sim)}
                isDarkMode={isDarkMode}
                isHomeView={true}
                onOpenCatalog={handleOpenCatalog}
              />

              {/* 4. Curated External Interactive Simulations Hub (8 Global Platforms) */}
              <ExternalSimulationsHub isDarkMode={isDarkMode} />

              {/* 5. Educational Standards & Digital Laboratory Architecture */}
              <WebsiteFeatures isDarkMode={isDarkMode} />
            </>
          ) : (
            /* VIEW 2: FOCUSED SIMULATION LABS CATALOG VIEW (With Back to Home Button) */
            <>
              <SimulationCatalogGrid
                simulations={allSimulations}
                selectedCategory={selectedSubject}
                onSelectCategory={(cat) => setSelectedSubject(cat)}
                selectedGradeTier={selectedGradeTier}
                onSelectGradeTier={(tier) => setSelectedGradeTier(tier)}
                onSelectSim={handleSelectSim}
                onLaunchOnStage={handleLaunchOnStage}
                onTriggerAiGeneration={handleTriggerAiGeneration}
                isGeneratingAi={isGeneratingAi}
                onLaunchFullscreenModal={(sim) => setFullscreenModalSim(sim)}
                isDarkMode={isDarkMode}
                isHomeView={false}
                onBackToHome={handleBackToCatalog}
              />

              {/* Curated External Interactive Simulations Hub */}
              <ExternalSimulationsHub isDarkMode={isDarkMode} />
            </>
          )}

        </main>

        {/* Fullscreen Immersion Viewport Modal (available directly from cards) */}
        {fullscreenModalSim && (
          <SimulationViewerModal
            sim={fullscreenModalSim}
            onClose={() => setFullscreenModalSim(null)}
          />
        )}

        {/* Developer Website Footer strictly pinned to bottom under all conditions */}
        <Footer isDarkMode={isDarkMode} totalSimulations={allSimulations.length} />

      </div>
    </div>
  );
}
