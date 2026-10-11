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

export default function App() {
  const [activeSim, setActiveSim] = useState<SimulationItem>(SIMULATIONS_LIST[0]);
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
        const matching = SIMULATIONS_LIST.find(s => s.fileUrl === e.data.simFile || window.location.pathname.includes(s.slug)) || activeSim;
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
  }, [activeSim]);

  const handleSelectSim = (sim: SimulationItem) => {
    setActiveSim(sim);
    setSidebarOpen(false);
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
        activeSim={activeSim}
        totalSimulations={SIMULATIONS_LIST.length}
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        onResetLab={handleResetLab}
        onFullscreen={() => setFullscreenModalSim(activeSim)}
        isDarkMode={isDarkMode}
        onToggleTheme={() => setIsDarkMode(!isDarkMode)}
      />

      {/* Slide-over Drawer for Fast Navigation when requested */}
      <Sidebar
        simulations={SIMULATIONS_LIST}
        activeSim={activeSim}
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
          activeSim={activeSim} 
          isDarkMode={isDarkMode}
        />

        {/* 2. Quick Metrics Row (4 High-Contrast 3D Cards) */}
        <QuickStats 
          activeSim={activeSim} 
          totalSimulations={SIMULATIONS_LIST.length} 
          isDarkMode={isDarkMode}
        />

        {/* 3. Featured Interactive Simulation Stage (Full Widescreen Viewport) */}
        <MainStage 
          activeSim={activeSim}
          onLaunchFullscreenModal={(sim) => setFullscreenModalSim(sim)}
          isDarkMode={isDarkMode}
        />

        {/* 4. Complete Website Interactive Simulations Library Grid (All 19 Labs) */}
        <SimulationCatalogGrid
          simulations={SIMULATIONS_LIST}
          activeSim={activeSim}
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
