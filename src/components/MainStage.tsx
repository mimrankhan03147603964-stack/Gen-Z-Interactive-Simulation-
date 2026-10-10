import React, { useRef, useState } from 'react';
import { SimulationItem } from '../types';
import { 
  Maximize2, 
  RotateCcw, 
  ExternalLink, 
  CheckCircle2, 
  BookOpen, 
  Zap, 
  Layers,
  Sparkles,
  Sliders,
  Monitor
} from 'lucide-react';

interface MainStageProps {
  activeSim: SimulationItem;
  onLaunchFullscreenModal?: (sim: SimulationItem) => void;
}

export const MainStage: React.FC<MainStageProps> = ({
  activeSim,
  onLaunchFullscreenModal
}) => {
  const [aspectRatio, setAspectRatio] = useState<'16:9' | '4:3' | 'full'>('16:9');
  const [isReloading, setIsReloading] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const stageContainerRef = useRef<HTMLDivElement>(null);

  const handleReload = () => {
    setIsReloading(true);
    if (iframeRef.current) {
      const src = iframeRef.current.src;
      iframeRef.current.src = 'about:blank';
      setTimeout(() => {
        if (iframeRef.current) {
          iframeRef.current.src = src;
          setIsReloading(false);
        }
      }, 90);
    } else {
      setIsReloading(false);
    }
  };

  const handleNativeFullscreen = () => {
    if (stageContainerRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen().catch(() => {});
      } else {
        stageContainerRef.current.requestFullscreen().catch(() => {
          if (onLaunchFullscreenModal) {
            onLaunchFullscreenModal(activeSim);
          }
        });
      }
    } else if (onLaunchFullscreenModal) {
      onLaunchFullscreenModal(activeSim);
    }
  };

  return (
    <div 
      ref={stageContainerRef}
      className="w-full bg-gradient-to-b from-[#0a1838] via-[#061026] to-[#040a1c] rounded-2xl border border-blue-500/35 shadow-2xl overflow-hidden flex flex-col transition-all"
    >
      {/* 3D Stage Cockpit Header Bar */}
      <div className="p-4 sm:p-5 border-b border-blue-500/25 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#071329]/95">
        
        {/* Left: Active Simulation Name & Meta */}
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2.5 py-0.5 rounded-md bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-mono font-black text-xs shadow-md border border-cyan-300/40">
              LAB {activeSim.indexNumber}
            </span>
            <h2 className="text-base sm:text-lg font-black text-white drop-shadow-sm">
              {activeSim.title}
            </h2>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#0d214a] text-cyan-300 border border-blue-400/30">
              {activeSim.category}
            </span>
          </div>
          <p className="text-xs text-cyan-200/80 font-medium mt-1">
            {activeSim.subject} &bull; {activeSim.gradeLevel} &bull; <span className="text-emerald-400 font-bold">4K 3D Interactive Execution</span>
          </p>
        </div>

        {/* Right: Stage Control 3D Buttons */}
        <div className="flex items-center gap-2 flex-wrap shrink-0">
          
          {/* 3D Aspect Ratio Switcher */}
          <div className="flex items-center bg-[#07132e] border border-blue-500/40 rounded-xl p-0.5 text-xs text-slate-300 shadow-inner">
            <button
              onClick={() => setAspectRatio('16:9')}
              className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer font-bold ${
                aspectRatio === '16:9' 
                  ? 'btn-3d bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md' 
                  : 'hover:text-white'
              }`}
              title="16:9 Screen Fit"
            >
              16:9
            </button>
            <button
              onClick={() => setAspectRatio('4:3')}
              className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer font-bold ${
                aspectRatio === '4:3' 
                  ? 'btn-3d bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md' 
                  : 'hover:text-white'
              }`}
              title="4:3 Screen Fit"
            >
              4:3
            </button>
            <button
              onClick={() => setAspectRatio('full')}
              className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer font-bold ${
                aspectRatio === 'full' 
                  ? 'btn-3d bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md' 
                  : 'hover:text-white'
              }`}
              title="Full Height View"
            >
              Full
            </button>
          </div>

          {/* 3D Emerald Reset Button */}
          <button
            onClick={handleReload}
            className="btn-3d px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white border border-emerald-400/40 font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-md"
            title="Reset simulation parameters"
          >
            <RotateCcw className={`w-3.5 h-3.5 ${isReloading ? 'animate-spin' : ''}`} />
            <span>Reset</span>
          </button>

          {/* 3D Indigo New Tab Button */}
          <a
            href={activeSim.fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-3d px-3 py-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white border border-indigo-400/40 font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-md"
            title="Open simulation in new browser tab"
          >
            <ExternalLink className="w-3.5 h-3.5 text-cyan-200" />
            <span className="hidden sm:inline">New Tab</span>
          </a>

          {/* 3D Rose Fullscreen Button */}
          <button
            onClick={handleNativeFullscreen}
            className="btn-3d px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-rose-950/60 border border-rose-400/40 transition-all cursor-pointer"
            title="Open Fullscreen Stage"
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span>Fullscreen</span>
          </button>

        </div>

      </div>

      {/* Live Simulation Iframe Canvas Container */}
      <div 
        className={`w-full bg-[#040817] relative transition-all overflow-hidden ${
          aspectRatio === '16:9'
            ? 'aspect-[16/9] min-h-[500px] max-h-[820px]'
            : aspectRatio === '4:3'
            ? 'aspect-[4/3] min-h-[540px] max-h-[860px]'
            : 'h-[780px]'
        }`}
      >
        {isReloading && (
          <div className="absolute inset-0 z-20 bg-slate-950/90 backdrop-blur-xs flex items-center justify-center">
            <div className="flex items-center gap-3 text-cyan-400 text-sm font-bold">
              <RotateCcw className="w-5 h-5 animate-spin" />
              <span>Reloading simulation canvas...</span>
            </div>
          </div>
        )}

        <iframe
          ref={iframeRef}
          key={activeSim.id}
          src={activeSim.fileUrl}
          title={activeSim.title}
          className="w-full h-full border-0 block"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
          allowFullScreen
          sandbox="allow-scripts allow-same-origin allow-forms allow-modals allow-downloads allow-pointer-lock"
        />
      </div>

      {/* 3D Stage Bottom Curriculum & Features Drawer */}
      <div className="p-5 sm:p-6 bg-[#071329] border-t border-blue-500/25 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left: Learning Focus & Topic Badges */}
        <div className="lg:col-span-7">
          <div className="flex items-center gap-2 text-xs font-black text-cyan-400 uppercase tracking-wider mb-2">
            <BookOpen className="w-4 h-4 text-cyan-400" />
            <span>Curriculum &amp; Pedagogical Objective</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed mb-3 font-medium">
            {activeSim.description}
          </p>
          
          <div className="flex flex-wrap items-center gap-2">
            {activeSim.topics.map((t: string, idx: number) => (
              <span 
                key={idx}
                className="px-3 py-1 rounded-lg bg-[#0d1e44] border border-blue-400/30 text-xs font-bold text-cyan-200 shadow-sm"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Right: Controls & Features */}
        <div className="lg:col-span-5 lg:border-l lg:border-blue-500/20 lg:pl-6">
          <div className="text-xs font-black text-purple-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-purple-400" />
            <span>Interactive Controls Available</span>
          </div>
          <ul className="space-y-2 text-xs text-slate-200 font-medium">
            {activeSim.features.map((f: string, idx: number) => (
              <li key={idx} className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>

    </div>
  );
};
