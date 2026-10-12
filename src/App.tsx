import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { TopNavbar } from './components/TopNavbar';
import { HeroBanner } from './components/HeroBanner';
import { QuickStats } from './components/QuickStats';
import { MainStage } from './components/MainStage';
import { SimulationCatalogGrid } from './components/SimulationCatalogGrid';
import { WebsiteFeatures } from './components/WebsiteFeatures';
import { SimulationViewerModal } from './components/SimulationViewerModal';
import { Footer } from './components/Footer';
import { SIMULATIONS_LIST } from './data/simulationsData';
import { SimulationItem } from './types';
import { Sparkles, Layers, Play } from 'lucide-react';

export default function App() {
  // Step 1: Default active subject filter (Physics & Motion provides clean, uncluttered starting view)
  const [selectedSubject, setSelectedSubject] = useState<string>('Physics & Motion');
  
  // Step 3: On-Demand active staged simulation (null on landing so no heavy simulations run by default)
  const [activeStageSim, setActiveStageSim] = useState<SimulationItem | null>(null);
  
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
        const matching = SIMULATIONS_LIST.find(s => s.fileUrl === e.data.simFile || window.location.pathname.includes(s.slug)) || activeStageSim || SIMULATIONS_LIST[0];
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
  }, [activeStageSim]);

  // On-Demand Loading: Called when user selects a Topic Card
  const handleSelectSim = (sim: SimulationItem) => {
    setActiveStageSim(sim);
    setSelectedSubject(sim.category);
    setSidebarOpen(false);
    setTimeout(() => {
      const stageElement = document.getElementById('stage');
      if (stageElement) {
        stageElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 60);
  };

  // Back to Topics Navigation: Called when user exits the active stage
  const handleBackToCatalog = () => {
    setActiveStageSim(null);
    setTimeout(() => {
      const catalogElement = document.getElementById('catalog');
      if (catalogElement) {
        catalogElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 60);
  };

  const handleResetLab = () => {
    const iframe = document.querySelector('iframe');
    if (iframe) {
      const src = iframe.src;
      iframe.src = 'about:blank';
      setTimeout(() => {
        iframe.src = src;
      }, 80);
    }
  };

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
        activeSim={activeStageSim}
        totalSimulations={SIMULATIONS_LIST.length}
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        onResetLab={handleResetLab}
        onFullscreen={() => activeStageSim && setFullscreenModalSim(activeStageSim)}
        isDarkMode={isDarkMode}
        onToggleTheme={() => setIsDarkMode(!isDarkMode)}
        onBackToCatalog={handleBackToCatalog}
      />

      {/* Slide-over Drawer for Fast Navigation when requested */}
      <Sidebar
        simulations={SIMULATIONS_LIST}
        activeSim={activeStageSim}
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

      {/* Natural Website Page Flow for Laptop & Computer Screens */}
      <main 
        className="flex-1 max-w-7xl mx-auto w-full px-3 sm:px-6 lg:px-8 py-6 space-y-8 transition-colors duration-200 opacity-100"
        style={{
          backgroundColor: 'transparent'
        }}
      >
        
        {/* 1. Hero Header Banner with Live Digital Clock & Quick CTAs */}
        <HeroBanner 
          activeSim={activeStageSim} 
          isDarkMode={isDarkMode}
        />

        {/* 2. Quick Metrics Row (4 High-Contrast 3D Cards) */}
        <QuickStats 
          activeSim={activeStageSim} 
          totalSimulations={SIMULATIONS_LIST.length} 
          isDarkMode={isDarkMode}
        />

        {/* 3. Featured Interactive Simulation Stage (Loaded On-Demand) */}
        {activeStageSim ? (
          <MainStage 
            activeSim={activeStageSim}
            totalSimulations={SIMULATIONS_LIST.length}
            onLaunchFullscreenModal={(sim) => setFullscreenModalSim(sim)}
            onBackToCatalog={handleBackToCatalog}
            isDarkMode={isDarkMode}
          />
        ) : (
          /* Clean Landing Stage Placeholder with On-Demand Architecture */
          <div 
            id="stage"
            className="w-full rounded-2xl border p-6 sm:p-8 transition-all shadow-xl opacity-100 scroll-mt-20 flex flex-col md:flex-row items-center justify-between gap-6"
            style={{
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              backgroundColor: isDarkMode ? 'rgba(8, 20, 50, 0.78)' : 'rgba(255, 255, 255, 0.85)',
              borderColor: isDarkMode ? 'rgba(56, 189, 248, 0.35)' : 'rgba(191, 219, 254, 0.8)',
              borderWidth: '1.5px',
              borderStyle: 'solid',
              boxShadow: isDarkMode ? '0 8px 32px 0 rgba(0, 0, 0, 0.45)' : '0 8px 32px 0 rgba(37, 99, 235, 0.08)'
            }}
          >
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2 text-xs font-black uppercase tracking-wider text-blue-600 dark:text-cyan-400">
                <Sparkles className="w-4 h-4" />
                <span>On-Demand Interactive STEM Simulation Stage</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                Select Any Topic Lab Below to Launch the Interactive Stage
              </h2>
              <p className="text-xs sm:text-sm font-bold text-slate-600 dark:text-slate-300 mt-2 max-w-2xl leading-relaxed">
                Choose a subject domain and click any topic card to launch its dedicated 4K simulation canvas, real-time physics/chemistry controls, and concept overview. Other simulations stay dormant to maximize speed and eliminate clutter.
              </p>
              
              {/* 3-Step Interactive Workflow */}
              <div className="flex flex-wrap items-center gap-2.5 mt-4 text-xs font-black">
                <span className="px-3 py-1 rounded-lg bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 border border-blue-300 dark:border-blue-700">
                  Step 1: Select Subject Domain
                </span>
                <span className="text-slate-400">➔</span>
                <span className="px-3 py-1 rounded-lg bg-purple-100 dark:bg-purple-900/40 text-purple-800 dark:text-purple-300 border border-purple-300 dark:border-purple-700">
                  Step 2: Choose Topic Lab Card
                </span>
                <span className="text-slate-400">➔</span>
                <span className="px-3 py-1 rounded-lg bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700">
                  Step 3: Direct 4K Interactive Execution
                </span>
              </div>
            </div>

            <div className="shrink-0 flex flex-col items-center sm:items-end gap-3">
              <a
                href="#catalog"
                className="btn-3d px-5 py-2.5 rounded-xl text-xs font-black flex items-center gap-2 shadow-md cursor-pointer text-white"
                style={{
                  backgroundColor: '#2563eb',
                  backgroundImage: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                  borderColor: '#60a5fa',
                  borderWidth: '1.5px',
                  borderStyle: 'solid',
                  boxShadow: '0 4px 14px rgba(37, 99, 235, 0.4)'
                }}
              >
                <Layers className="w-4 h-4" />
                <span>Browse {selectedSubject} Labs</span>
              </a>
              <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400">
                On-Demand Loading &bull; Zero Idle Lag
              </span>
            </div>
          </div>
        )}

        {/* 4. Complete Website Interactive Simulations Library Grid */}
        <SimulationCatalogGrid
          simulations={SIMULATIONS_LIST}
          activeSim={activeStageSim}
          selectedCategory={selectedSubject}
          onSelectCategory={(cat) => setSelectedSubject(cat)}
          onSelectSim={handleSelectSim}
          onLaunchFullscreenModal={(sim) => setFullscreenModalSim(sim)}
          isDarkMode={isDarkMode}
        />

        {/* 5. Educational Standards & Digital Laboratory Architecture */}
        <WebsiteFeatures isDarkMode={isDarkMode} />

      </main>

      {/* Fullscreen Immersion Viewport Modal */}
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
