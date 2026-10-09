import React, { useRef, useState } from 'react';
import { SimulationItem } from '../types.ts';
import { X, RotateCcw, ExternalLink, Maximize2, Minimize2, Sparkles, ShieldCheck } from 'lucide-react';

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
  const iframeRef = useRef<HTMLIFrameElement>(null);

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

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md flex flex-col animate-in fade-in duration-200">
      
      {/* Sleek Modal Control Header */}
      <div className="h-14 px-6 bg-slate-900 border-b border-slate-800 flex items-center justify-between gap-4 shrink-0">
        
        {/* Left: Active Simulation Info */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-sm shadow-cyan-400"></div>
          <div className="flex items-center gap-2 truncate">
            <span className="text-sm font-bold text-white truncate">
              {sim.title}
            </span>
            <span className="hidden sm:inline-block px-2 py-0.5 rounded text-[10px] font-semibold bg-cyan-950/80 border border-cyan-800/40 text-cyan-300">
              {sim.category}
            </span>
          </div>
        </div>

        {/* Right: Actions and Close */}
        <div className="flex items-center gap-2 shrink-0">
          
          <button
            onClick={handleReload}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer flex items-center gap-1.5 text-xs"
            title="Reset Simulation"
          >
            <RotateCcw className={`w-3.5 h-3.5 ${isReloading ? 'animate-spin text-cyan-400' : ''}`} />
            <span className="hidden md:inline">Reset</span>
          </button>

          <a
            href={sim.fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer flex items-center gap-1.5 text-xs"
            title="Open Standalone Window"
          >
            <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden md:inline">Standalone</span>
          </a>

          <div className="h-4 w-px bg-slate-800 mx-1"></div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-slate-800 hover:bg-rose-900/60 text-slate-300 hover:text-rose-200 border border-slate-700/80 transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-semibold"
            title="Close Fullscreen View (Esc)"
          >
            <X className="w-4 h-4" />
            <span>Close</span>
          </button>

        </div>

      </div>

      {/* Fullscreen Iframe Canvas Container */}
      <div className="grow relative bg-[#050a1e] overflow-hidden">
        {isReloading && (
          <div className="absolute inset-0 z-20 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center">
            <div className="flex items-center gap-3 text-cyan-400 text-sm font-medium">
              <RotateCcw className="w-5 h-5 animate-spin" />
              <span>Reloading simulation canvas...</span>
            </div>
          </div>
        )}

        <iframe
          ref={iframeRef}
          src={sim.fileUrl}
          title={sim.title}
          className="w-full h-full border-0 block"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
          allowFullScreen
          sandbox="allow-scripts allow-same-origin allow-forms allow-modals allow-downloads allow-pointer-lock"
        />
      </div>

    </div>
  );
};
