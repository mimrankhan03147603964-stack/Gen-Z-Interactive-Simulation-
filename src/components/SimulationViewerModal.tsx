import React, { useRef, useState } from 'react';
import { SimulationItem } from '../types';
import { X, RotateCcw, ExternalLink, Maximize2, Sparkles } from 'lucide-react';

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
    <div className="fixed inset-0 z-50 bg-[#030714]/98 backdrop-blur-md flex flex-col animate-in fade-in duration-200">
      
      {/* 3D Modal Control Header Bar */}
      <div className="h-14 px-4 sm:px-6 bg-gradient-to-r from-[#060e22] via-[#091838] to-[#060e22] border-b border-blue-500/30 flex items-center justify-between gap-4 shrink-0 shadow-lg">
        
        {/* Left: Active Simulation Info */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-3 h-3 rounded-full bg-cyan-400 shadow-md shadow-cyan-400 animate-pulse shrink-0"></div>
          <div className="flex items-center gap-2 truncate">
            <span className="text-xs font-mono font-black text-amber-400">
              [{sim.indexNumber}]
            </span>
            <span className="text-sm font-black text-white truncate drop-shadow-xs">
              {sim.title}
            </span>
            <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#0d224d] border border-blue-400/40 text-cyan-300">
              {sim.category}
            </span>
            <span className="hidden md:inline-flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded-full">
              <Sparkles className="w-3 h-3" />
              <span>4K Ultra</span>
            </span>
          </div>
        </div>

        {/* Right: 3D Actions and Close Buttons */}
        <div className="flex items-center gap-2.5 shrink-0">
          
          {/* 3D Reset Button */}
          <button
            onClick={handleReload}
            className="btn-3d px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white border border-emerald-400/40 transition-all cursor-pointer flex items-center gap-1.5 text-xs font-bold shadow-md"
            title="Reset Simulation"
          >
            <RotateCcw className={`w-3.5 h-3.5 ${isReloading ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">Reset</span>
          </button>

          {/* 3D Standalone Window Button */}
          <a
            href={sim.fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-3d px-3 py-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white border border-indigo-400/40 transition-all cursor-pointer flex items-center gap-1.5 text-xs font-bold shadow-md"
            title="Open Standalone Window"
          >
            <ExternalLink className="w-3.5 h-3.5 text-cyan-200" />
            <span className="hidden sm:inline">New Tab</span>
          </a>

          {/* 3D Rose/Red Close Fullscreen Button */}
          <button
            onClick={onClose}
            className="btn-3d px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white border border-rose-400/50 transition-all cursor-pointer flex items-center gap-1.5 text-xs font-bold shadow-lg shadow-rose-950/60"
            title="Close Fullscreen View (Esc)"
          >
            <X className="w-4 h-4" />
            <span>Close</span>
          </button>

        </div>

      </div>

      {/* Fullscreen Iframe Canvas Container */}
      <div className="grow relative bg-[#040816] overflow-hidden">
        {isReloading && (
          <div className="absolute inset-0 z-20 bg-slate-950/90 backdrop-blur-sm flex items-center justify-center">
            <div className="flex items-center gap-3 text-cyan-400 text-sm font-bold">
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
