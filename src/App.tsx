import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { TopNavbar } from './components/TopNavbar';
import { HeroBanner } from './components/HeroBanner';
import { QuickStats } from './components/QuickStats';
import { MainStage } from './components/MainStage';
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

    window.addEventListener('contextmenu', handleContextMenu);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('contextmenu', handleContextMenu);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

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
      className="min-h-screen flex flex-col font-sans select-none antialiased transition-colors duration-200"
      style={{
        backgroundColor: isDarkMode ? '#040a1c' : '#f1f5f9',
        color: isDarkMode ? '#ffffff' : '#0f172a'
      }}
    >
      
      {/* Top Application Navbar */}
      <TopNavbar
        activeSim={activeSim}
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        onResetLab={handleResetLab}
        onFullscreen={() => setFullscreenModalSim(activeSim)}
        isDarkMode={isDarkMode}
        onToggleTheme={() => setIsDarkMode(!isDarkMode)}
      />

      {/* Main Layout Area: Left Sidebar (01-14) + Content Canvas */}
      <div className="flex-1 flex overflow-hidden relative">
        
        {/* Responsive Vertical Left Sidebar */}
        <Sidebar
          simulations={SIMULATIONS_LIST}
          activeSim={activeSim}
          onSelectSim={handleSelectSim}
          isOpen={sidebarOpen}
          onToggle={() => setSidebarOpen(!sidebarOpen)}
          isDarkMode={isDarkMode}
        />

        {/* Mobile Sidebar Backdrop */}
        {sidebarOpen && (
          <div 
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-slate-950/60 z-30 lg:hidden backdrop-blur-xs"
          />
        )}

        {/* Main Dashboard Scrollable Stage Area */}
        <main 
          className="flex-1 flex flex-col min-w-0 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6 transition-colors duration-200"
          style={{
            backgroundColor: isDarkMode ? '#040a1c' : '#f1f5f9'
          }}
        >
          
          {/* 1. Royal Blue Hero Header Banner with Live Clock Widget */}
          <HeroBanner 
            activeSim={activeSim} 
            isDarkMode={isDarkMode}
          />

          {/* 2. Quick Metrics Row (4 Cards) */}
          <QuickStats 
            activeSim={activeSim} 
            totalSimulations={SIMULATIONS_LIST.length} 
            isDarkMode={isDarkMode}
          />

          {/* 3. Single-Click Interactive Simulation Stage */}
          <MainStage 
            activeSim={activeSim}
            onLaunchFullscreenModal={(sim) => setFullscreenModalSim(sim)}
            isDarkMode={isDarkMode}
          />

        </main>

      </div>

      {/* Fullscreen Immersion Viewport Modal */}
      {fullscreenModalSim && (
        <SimulationViewerModal
          sim={fullscreenModalSim}
          onClose={() => setFullscreenModalSim(null)}
        />
      )}

      {/* Developer Footer */}
      <Footer isDarkMode={isDarkMode} />

    </div>
  );
}
