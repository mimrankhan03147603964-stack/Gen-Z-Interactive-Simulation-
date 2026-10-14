import React, { useEffect, useRef, useState } from 'react';
import { SimulationItem } from '../types';

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
