import React, { useRef, useState, useEffect } from 'react';
import { SimulationItem } from '../types';
import { X, RotateCcw, ExternalLink, Sparkles, Maximize2, Minimize2 } from 'lucide-react';
import { TopicRealisticIcon } from './TopicRealisticIcon';
import { getSimulationStandaloneUrl } from '../utils/navigation';

interface SimulationViewerModalProps {
  sim: SimulationItem | null;
  onClose: () => void;
}

export const SimulationViewerModal: React.FC<SimulationViewerModalProps> = ({
  sim,
  onClose
}) => {
  if (!sim) return null;

  const [isReloading, setIsReloading] = useState(false);
  const [isNativeFs, setIsNativeFs] = useState(!!document.fullscreenElement);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const simulationContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleFsChange = () => {
      setIsNativeFs(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFsChange);
    };
  }, []);

  const handleToggleBrowserFs = () => {
    const container = simulationContainerRef.current;
    if (!container) return;
    if (!document.fullscreenElement) {
      container.requestFullscreen().catch((err) => console.error('Fullscreen request error:', err));
    } else {
      document.exitFullscreen().catch((err) => console.error('Exit fullscreen error:', err));
    }
  };

  const handleReload = () => {
    setIsReloading(true);
    if (iframeRef.current) {
      const currentSrc = iframeRef.current.src;
      iframeRef.current.src = 'about:blank';
      setTimeout(() => {
        if (iframeRef.current) {
          iframeRef.current.src = currentSrc;
          setIsReloading(false);
        }
      }, 100);
    } else {
      setIsReloading(false);
    }
  };

  const handleIframeLoad = () => {
    setIsReloading(false);
    try {
      const doc = iframeRef.current?.contentDocument || iframeRef.current?.contentWindow?.document;
      if (!doc) return;
      doc.documentElement.style.overflow = 'hidden';
      doc.documentElement.style.scrollbarWidth = 'none';
      if (doc.body) {
        doc.body.style.overflow = 'hidden';
        doc.body.style.scrollbarWidth = 'none';
      }
    } catch {
      // Fallback
    }
  };

  return (
    <div 
      ref={simulationContainerRef}
      className="simulation-wrapper fixed inset-0 z-50 flex flex-col animate-in fade-in duration-200 opacity-100 overflow-hidden"
      style={{
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        backgroundColor: 'rgba(3, 7, 20, 0.88)',
        height: '100vh',
        maxHeight: '100vh',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}
    >
      
      {/* 3D Modal Control Header Bar with Frosted Glass Styling */}
      <div 
        className="h-14 px-4 sm:px-6 flex items-center justify-between gap-4 shrink-0 shadow-lg"
        style={{
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          backgroundColor: 'rgba(6, 14, 34, 0.85)',
          backgroundImage: 'linear-gradient(135deg, rgba(6, 14, 34, 0.9) 0%, rgba(9, 24, 56, 0.85) 50%, rgba(6, 14, 34, 0.9) 100%)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.18)',
          boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.5)',
          color: '#ffffff'
        }}
      >
        
        {/* Left: Active Simulation Info */}
        <div className="flex items-center gap-3 min-w-0">
          <div 
            className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 p-0.5"
            style={{
              backgroundColor: 'rgba(15, 23, 42, 0.8)',
              borderColor: 'rgba(56, 189, 248, 0.5)',
              borderWidth: '1px',
              borderStyle: 'solid'
            }}
          >
            <TopicRealisticIcon indexNumber={sim.indexNumber} simId={sim.id} className="w-5 h-5" />
          </div>
          <div className="flex items-center gap-2 truncate">
            <span className="text-xs font-mono font-black" style={{ color: '#fde047' }}>
              [{sim.indexNumber}]
            </span>
            <span className="text-sm font-black text-white truncate drop-shadow-xs">
              {sim.title}
            </span>
            <span 
              className="hidden sm:inline-block px-2.5 py-0.5 rounded-full text-[10px] font-black"
              style={{
                backgroundColor: '#0d224d',
                borderColor: '#3b82f6',
                borderWidth: '1.5px',
                borderStyle: 'solid',
                color: '#67e8f9'
              }}
            >
              {sim.category}
            </span>
            <span 
              className="hidden md:inline-flex items-center gap-1 text-[10px] font-black px-2 py-0.5 rounded-full"
              style={{
                backgroundColor: '#064e3b',
                borderColor: '#10b981',
                borderWidth: '1.5px',
                borderStyle: 'solid',
                color: '#6ee7b7'
              }}
            >
              <Sparkles className="w-3 h-3" />
              <span>4K Ultra</span>
            </span>
          </div>
        </div>

        {/* Right: 3D Actions and Close Buttons with Explicit Inline Styles */}
        <div className="flex items-center gap-2.5 shrink-0">
          
          {/* 3D Reset Button */}
          <button
            onClick={handleReload}
            className="btn-3d px-3 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 text-xs font-black shadow-md"
            style={{
              backgroundColor: '#059669',
              backgroundImage: 'linear-gradient(135deg, #10b981 0%, #047857 100%)',
              borderColor: '#34d399',
              borderWidth: '1.5px',
              borderStyle: 'solid',
              color: '#ffffff',
              boxShadow: '0 4px 10px rgba(5, 150, 105, 0.35)'
            }}
            title="Reset Simulation"
          >
            <RotateCcw className={`w-3.5 h-3.5 ${isReloading ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">Reset</span>
          </button>

          {/* 3D Standalone Window Button */}
          <a
            href={getSimulationStandaloneUrl(sim)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-3d px-3 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 text-xs font-black shadow-md"
            style={{
              backgroundColor: '#4f46e5',
              backgroundImage: 'linear-gradient(135deg, #6366f1 0%, #4338ca 100%)',
              borderColor: '#818cf8',
              borderWidth: '1.5px',
              borderStyle: 'solid',
              color: '#ffffff',
              boxShadow: '0 4px 10px rgba(79, 70, 229, 0.35)'
            }}
            title="Open Standalone Window in New Tab"
          >
            <ExternalLink className="w-3.5 h-3.5 text-white" />
            <span className="hidden sm:inline">New Tab</span>
          </a>

          {/* 3D Fullscreen Toggle Button */}
          <button
            onClick={handleToggleBrowserFs}
            className="btn-3d px-3 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 text-xs font-black shadow-md"
            style={{
              backgroundColor: '#e11d48',
              backgroundImage: 'linear-gradient(135deg, #f43f5e 0%, #be123c 100%)',
              borderColor: '#fb7185',
              borderWidth: '1.5px',
              borderStyle: 'solid',
              color: '#ffffff',
              boxShadow: '0 4px 10px rgba(225, 29, 72, 0.35)'
            }}
            title={isNativeFs ? "Exit Browser Fullscreen" : "Enter True Browser Fullscreen"}
          >
            {isNativeFs ? (
              <>
                <Minimize2 className="w-3.5 h-3.5 text-white" />
                <span className="hidden sm:inline">Exit Full</span>
              </>
            ) : (
              <>
                <Maximize2 className="w-3.5 h-3.5 text-white" />
                <span className="hidden sm:inline">Fullscreen</span>
              </>
            )}
          </button>

          {/* 3D Close Modal Button */}
          <button
            onClick={onClose}
            className="btn-3d p-2 rounded-xl transition-all cursor-pointer shadow-md"
            style={{
              backgroundColor: '#dc2626',
              backgroundImage: 'linear-gradient(135deg, #ef4444 0%, #b91c1c 100%)',
              borderColor: '#fca5a5',
              borderWidth: '1.5px',
              borderStyle: 'solid',
              color: '#ffffff',
              boxShadow: '0 4px 10px rgba(220, 38, 38, 0.35)'
            }}
            title="Exit Immersion View (Esc)"
          >
            <X className="w-4 h-4 text-white" />
          </button>

        </div>

      </div>

      {/* Main Simulation Iframe Canvas Viewport */}
      <div className="flex-1 min-h-0 w-full bg-[#020617] relative overflow-hidden">
        {isReloading && (
          <div className="absolute inset-0 z-20 bg-slate-950 flex items-center justify-center">
            <div className="flex items-center gap-3 text-cyan-300 text-sm font-black">
              <RotateCcw className="w-5 h-5 animate-spin" />
              <span>Resetting simulation...</span>
            </div>
          </div>
        )}

        <iframe
          ref={iframeRef}
          src={sim.fileUrl}
          title={sim.title}
          className="w-full h-full border-0 block"
          onLoad={handleIframeLoad}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
          allowFullScreen
        />
      </div>

    </div>
  );
};
