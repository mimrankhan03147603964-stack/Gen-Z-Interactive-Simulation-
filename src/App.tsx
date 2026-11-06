import React, { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Sidebar } from './components/Sidebar';
import { TopNavbar } from './components/TopNavbar';
import { HeroBanner } from './components/HeroBanner';
import { PedagogicalHub } from './components/PedagogicalHub';
import { QuickStats } from './components/QuickStats';
import { SimulationCatalogGrid } from './components/SimulationCatalogGrid';
import { WebsiteFeatures } from './components/WebsiteFeatures';
import { SimulationViewerModal } from './components/SimulationViewerModal';
import { StandaloneLabPlayer } from './components/StandaloneLabPlayer';
import { Footer } from './components/Footer';
import { MainStage } from './components/MainStage';
import { ThreeStemBackground } from './components/ThreeStemBackground';
import { ExternalSimulationsHub } from './components/ExternalSimulationsHub';
import { ScrollReveal } from './components/ScrollReveal';
import { scrollRevealEngine } from './utils/scrollRevealManager';
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

export type AppView = 
  | 'home' 
  | 'catalog' 
  | 'portal-highlights' 
  | 'teachers' 
  | 'students' 
  | 'pedagogical-hub' 
  | 'capabilities' 
  | 'stats' 
  | 'external-sims';

interface SectionViewHeaderProps {
  title: string;
  badge: string;
  subtitle: string;
  onBack: () => void;
}

function SectionViewHeader({ title, badge, subtitle, onBack }: SectionViewHeaderProps) {
  return (
    <div 
      className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 sm:px-6 sm:py-3.5 rounded-2xl border shadow-md mb-6 relative z-20"
      style={{
        backgroundColor: '#FFFFFF',
        borderColor: '#DDE5F3',
        boxShadow: '0 4px 18px rgba(27, 42, 92, 0.08)'
      }}
    >
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-black text-white bg-[#1546A8] hover:bg-[#1B2A5C] border border-[#2D62D1] shadow-sm hover:shadow-md cursor-pointer transition-all hover:-translate-x-0.5 active:translate-x-0"
          title="Return to Home View"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>← Back to Home</span>
        </button>
        <span className="hidden sm:inline-block h-6 w-[1.5px] bg-[#DDE5F3]" />
        <span className="text-[11px] font-mono font-black uppercase tracking-wider text-white px-2.5 py-1 rounded-md bg-[#1B2A5C] border border-[#1546A8] shrink-0">
          {badge}
        </span>
      </div>

      <div className="text-left sm:text-right min-w-0">
        <h2 className="text-sm sm:text-base font-black text-[#1B2A5C] font-heading leading-tight truncate">
          {title}
        </h2>
        <p className="text-[11px] sm:text-xs font-medium text-[#5A6E85] leading-normal truncate">
          {subtitle}
        </p>
      </div>
    </div>
  );
}

export default function App() {
  // Check if launched as dedicated standalone simulation workspace via /simulation/:id or ?lab=01
  const [standaloneLab, setStandaloneLab] = useState<SimulationItem | null>(() => resolveSimulationFromUrl());

  // Default active subject filter: "All Simulations" is the default initial state
  const [selectedSubject, setSelectedSubject] = useState<string>('All Simulations');
  const [selectedGradeTier, setSelectedGradeTier] = useState<string>('all');
  
  // Clean View Navigation State: 'home' (zero-rush dashboard without extra sections) or dedicated section views
  const [currentView, setCurrentView] = useState<AppView>('home');
  
  // Active stage simulation (auto-opened from search, catalog card, or AI generation)
  const [activeStageSim, setActiveStageSim] = useState<SimulationItem | null>(null);
  const [allSimulations, setAllSimulations] = useState<SimulationItem[]>(SIMULATIONS_LIST);
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);
  const [aiGeneratingTopic, setAiGeneratingTopic] = useState<string>('');

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [fullscreenModalSim, setFullscreenModalSim] = useState<SimulationItem | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Top colorful scroll progress bar percentage (0% to 100%)
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  // Initialize global scroll reveal engine and track scroll progress
  useEffect(() => {
    scrollRevealEngine.init();

    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop || 0;
      const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = docHeight > 0 ? Math.min(100, Math.max(0, (scrollTop / docHeight) * 100)) : 0;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // When switching views or closing modals, rescan unrevealed elements so nothing stays empty
  useEffect(() => {
    const timer = setTimeout(() => {
      scrollRevealEngine.scanAndObserve();
    }, 60);
    return () => clearTimeout(timer);
  }, [currentView, selectedSubject, selectedGradeTier, fullscreenModalSim, standaloneLab]);

  useEffect(() => {
    try {
      localStorage.removeItem('genz_sim_theme');
    } catch {}
    document.documentElement.classList.remove('dark');
  }, []);

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

  const handleBackToHome = () => {
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

  const handleNavigateToView = (viewKey: string) => {
    setActiveStageSim(null);
    if (viewKey === 'home') {
      handleBackToHome();
      return;
    }
    setCurrentView(viewKey as AppView);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleScrollToExternal = () => {
    handleNavigateToView('external-sims');
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

  // MAIN CATALOG PORTAL & DASHBOARD: Recolored to New Shell Palette
  return (
    <div 
      className="min-h-screen flex flex-col font-sans select-none antialiased relative bg-[#EEF3F9]"
      style={{ 
        background: '#EEF3F9',
        backgroundColor: '#EEF3F9'
      }}
    >
      {/* Thin colorful scroll progress bar at the very top of the page */}
      <div 
        id="scroll-progress-bar"
        className="fixed top-0 left-0 h-[3.5px] z-[100000] pointer-events-none transition-[width] duration-100 ease-out"
        style={{
          width: `${scrollProgress}%`,
          background: 'linear-gradient(90deg, #1E88E5 0%, #00a2ff 25%, #7c3aed 50%, #F5A623 75%, #E53935 100%)',
          boxShadow: '0 0 10px rgba(0, 162, 255, 0.75)'
        }}
        aria-hidden="true"
      />

      {/* Dynamic Moving Colorful Balloons Background Effect */}
      <ThreeStemBackground />

      {/* Website Content Container with position: relative, z-index: 10, offset by fixed navbar height */}
      <div className="relative z-10 flex flex-col flex-1 w-full min-h-screen pt-14 bg-transparent">
        {/* Top Website Header Navbar (Desktop-Optimized, Sticky at Top) */}
        <TopNavbar
          totalSimulations={allSimulations.length}
          isDarkMode={isDarkMode}
          onToggleTheme={() => setIsDarkMode((prev) => !prev)}
          onBackToCatalog={handleBackToHome}
          onNavigateToExternal={handleScrollToExternal}
          onNavigateToView={handleNavigateToView}
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

          {/* Sectional Views Navigation Router */}
          {currentView === 'home' && (
            /* VIEW 1: CLEAN HOME VIEW (Only Hero Banner + Live Clock + Slideshow Background) */
            <div className="-mx-3 sm:-mx-6 lg:-mx-8 xl:-mx-12 w-auto">
              <ScrollReveal direction="up" distance={16} duration={480} resetOnLeave={true}>
                <HeroBanner 
                  isDarkMode={isDarkMode}
                  onSelectSim={handleSelectSim}
                  onExploreLabs={() => handleOpenCatalog('All Simulations', 'all')}
                />
              </ScrollReveal>
            </div>
          )}

          {currentView === 'catalog' && (
            /* VIEW 2: FOCUSED SIMULATION LABS CATALOG VIEW */
            <div className="space-y-6">
              <SectionViewHeader 
                badge="STEM REPOSITORY"
                title="Simulations"
                subtitle={`Curriculum-aligned interactive digital experiments across 10 disciplines (${allSimulations.length} Modules)`}
                onBack={handleBackToHome}
              />
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
                onBackToHome={handleBackToHome}
              />
            </div>
          )}

          {currentView === 'portal-highlights' && (
            /* VIEW 3: PORTAL HIGHLIGHTS (4 PILLARS) */
            <div className="space-y-6">
              <SectionViewHeader 
                badge="PORTAL ARCHITECTURE"
                title="Portal Highlights & Core Pillars"
                subtitle="National Curriculum alignment, dynamic math engines, hands-on inquiry, and performance architecture"
                onBack={handleBackToHome}
              />
              <ScrollReveal direction="up" distance={20} duration={500} resetOnLeave={true}>
                <PedagogicalHub 
                  totalSimulations={allSimulations.length} 
                  viewMode="highlights"
                  onBrowseTeacher={() => handleOpenCatalog('All Simulations', 'all')}
                  onLaunchStudent={() => handleOpenCatalog('All Simulations', 'all')}
                />
              </ScrollReveal>
            </div>
          )}

          {currentView === 'teachers' && (
            /* VIEW 4: FOR TEACHERS & EDUCATORS */
            <div className="space-y-6">
              <SectionViewHeader 
                badge="CLASSROOM INTEGRATION"
                title="For Teachers & Educators — Instructional Methodology"
                subtitle="Pedagogical sequencing, step-by-step classroom delivery, and conceptual mastery toolkits"
                onBack={handleBackToHome}
              />
              <ScrollReveal direction="up" distance={20} duration={500} resetOnLeave={true}>
                <PedagogicalHub 
                  totalSimulations={allSimulations.length} 
                  viewMode="teachers"
                  onBrowseTeacher={() => handleOpenCatalog('All Simulations', 'all')}
                  onLaunchStudent={() => handleOpenCatalog('All Simulations', 'all')}
                />
              </ScrollReveal>
            </div>
          )}

          {currentView === 'students' && (
            /* VIEW 5: FOR STUDENTS & YOUNG SCIENTISTS */
            <div className="space-y-6">
              <SectionViewHeader 
                badge="HANDS-ON PRACTICE"
                title="For Students & Young Scientists — Independent Discovery"
                subtitle="Self-guided inquiry, dynamic variable manipulation, and real-time scientific exploration"
                onBack={handleBackToHome}
              />
              <ScrollReveal direction="up" distance={20} duration={500} resetOnLeave={true}>
                <PedagogicalHub 
                  totalSimulations={allSimulations.length} 
                  viewMode="students"
                  onBrowseTeacher={() => handleOpenCatalog('All Simulations', 'all')}
                  onLaunchStudent={() => handleOpenCatalog('All Simulations', 'all')}
                />
              </ScrollReveal>
            </div>
          )}

          {currentView === 'pedagogical-hub' && (
            /* VIEW 6: COMPLETE PEDAGOGICAL HUB */
            <div className="space-y-6">
              <SectionViewHeader 
                badge="ACADEMIC PEDAGOGY"
                title="Educators & Students Pedagogical Hub"
                subtitle="Comprehensive academic frameworks, curriculum alignment guides, and instructional toolkits"
                onBack={handleBackToHome}
              />
              <ScrollReveal direction="up" distance={20} duration={500} resetOnLeave={true}>
                <PedagogicalHub 
                  totalSimulations={allSimulations.length} 
                  viewMode="all"
                  onBrowseTeacher={() => handleOpenCatalog('All Simulations', 'all')}
                  onLaunchStudent={() => handleOpenCatalog('All Simulations', 'all')}
                />
              </ScrollReveal>
            </div>
          )}

          {currentView === 'capabilities' && (
            /* VIEW 7: STEM EDUCATIONAL WEBSITE CAPABILITIES */
            <div className="space-y-6">
              <SectionViewHeader 
                badge="DIGITAL ARCHITECTURE"
                title="Professional STEM Educational Website Capabilities"
                subtitle="Verified digital laboratory standards, continuous rotating capabilities, and high-fidelity engines"
                onBack={handleBackToHome}
              />
              <ScrollReveal direction="up" distance={24} duration={520} resetOnLeave={true}>
                <WebsiteFeatures isDarkMode={isDarkMode} />
              </ScrollReveal>
            </div>
          )}

          {currentView === 'stats' && (
            /* VIEW 8: PORTAL STATISTICS & METRICS */
            <div className="space-y-6">
              <SectionViewHeader 
                badge="METRICS & ANALYTICS"
                title="Portal Statistics & Key Performance Indicators"
                subtitle="Real-time curriculum coverage, grade distribution, and simulation performance metrics"
                onBack={handleBackToHome}
              />
              <ScrollReveal direction="up" distance={20} duration={500} resetOnLeave={true}>
                <QuickStats 
                  totalSimulations={allSimulations.length}
                  isDarkMode={isDarkMode}
                />
              </ScrollReveal>
            </div>
          )}

          {currentView === 'external-sims' && (
            /* VIEW 9: EXTERNAL INTERACTIVE SIMULATION PLATFORMS */
            <div className="space-y-6">
              <SectionViewHeader 
                badge="GLOBAL STEM NETWORK"
                title="External Interactive Simulation Platforms — Simulation Hub"
                subtitle="Curated global repositories including PhET, GeoGebra, ChemCollective, Falstad, and Desmos"
                onBack={handleBackToHome}
              />
              <ScrollReveal direction="up" distance={24} duration={520} resetOnLeave={true}>
                <ExternalSimulationsHub isDarkMode={isDarkMode} />
              </ScrollReveal>
            </div>
          )}

        </main>

        {/* Fullscreen Immersion Viewport Modal (available directly from cards - STRICTLY EXCLUDED FROM SCROLL ANIMATIONS) */}
        {fullscreenModalSim && (
          <SimulationViewerModal
            sim={fullscreenModalSim}
            onClose={() => setFullscreenModalSim(null)}
          />
        )}

        {/* Developer Website Footer strictly pinned to bottom under all conditions */}
        <ScrollReveal direction="up" distance={16} duration={450} resetOnLeave={true}>
          <Footer isDarkMode={isDarkMode} totalSimulations={allSimulations.length} />
        </ScrollReveal>

      </div>
    </div>
  );
}
