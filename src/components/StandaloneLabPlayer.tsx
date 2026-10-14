import React, { useEffect, useRef, useState } from 'react';
import { SimulationItem } from '../types';
import { Maximize2, Minimize2 } from 'lucide-react';

interface StandaloneLabPlayerProps {
  sim: SimulationItem;
}

/**
 * StandaloneLabPlayer:
 * Ultra-clean, distraction-free, 100vw x 100vh standalone simulation view.
 * Displays the interactive simulation with robust full-screen container targeting.
 */
export const StandaloneLabPlayer: React.FC<StandaloneLabPlayerProps> = ({ sim }) => {
  const simulationContainerRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const originalTitle = document.title;
    document.title = `${sim.title} — Gen Z EdTech`;
    return () => {
      document.title = originalTitle;
    };
  }, [sim.title]);

  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFsChange);
    };
  }, []);

  const handleToggleFullscreen = () => {
    const container = simulationContainerRef.current;
    if (!container) return;
    if (!document.fullscreenElement) {
      container.requestFullscreen().catch((err) => console.error('Fullscreen request error:', err));
    } else {
      document.exitFullscreen().catch((err) => console.error('Exit fullscreen error:', err));
    }
  };

  return (
    <div 
      ref={simulationContainerRef}
      className="simulation-wrapper fixed inset-0 w-screen h-screen min-h-screen m-0 p-0 overflow-hidden bg-slate-950 z-[99999]"
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        minHeight: '100vh',
        margin: 0,
        padding: 0,
        overflow: 'hidden',
        backgroundColor: '#020617'
      }}
    >
      {/* Floating high-z-index overlay controls */}
      <div 
        className="fullscreen-overlay-controls absolute top-3 right-4 z-50 flex items-center gap-2 pointer-events-auto"
        style={{ zIndex: 50 }}
      >
        <button
          onClick={handleToggleFullscreen}
          className="btn-3d px-3 py-1.5 rounded-xl font-black text-xs flex items-center gap-1.5 shadow-lg cursor-pointer transition-all hover:scale-105"
          style={{
            backgroundColor: '#0f172a',
            backgroundImage: 'linear-gradient(135deg, rgba(30, 41, 59, 0.9) 0%, rgba(15, 23, 42, 0.95) 100%)',
            borderColor: 'rgba(56, 189, 248, 0.6)',
            borderWidth: '1.5px',
            borderStyle: 'solid',
            color: '#38bdf8',
            boxShadow: '0 4px 14px rgba(0, 0, 0, 0.6)'
          }}
          title={isFullscreen ? "Exit Fullscreen" : "Enter True Fullscreen"}
        >
          {isFullscreen ? (
            <>
              <Minimize2 className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden sm:inline">Exit Fullscreen</span>
            </>
          ) : (
            <>
              <Maximize2 className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden sm:inline">Fullscreen</span>
            </>
          )}
        </button>
      </div>

      <iframe
        src={sim.fileUrl}
        title={sim.title}
        className="w-full h-full border-0 block"
        style={{
          width: '100vw',
          height: '100vh',
          minHeight: '100vh',
          margin: 0,
          padding: 0,
          border: 'none',
          display: 'block',
          backgroundColor: '#020617'
        }}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
        allowFullScreen
        loading="eager"
      />
    </div>
  );
};
