import React, { useRef, useState } from 'react';
import { SimulationItem } from '../types.ts';
import { 
  Maximize2, 
  RotateCcw, 
  ExternalLink, 
  CheckCircle2, 
  BookOpen, 
  Zap, 
  Layers,
  Sparkles,
  Sliders
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
      className="w-full bg-white rounded-2xl border border-slate-200/90 shadow-md overflow-hidden flex flex-col transition-all"
    >
      {/* Stage Header Bar */}
      <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white">
        
        {/* Left: Active Simulation Name & Meta */}
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2.5 py-0.5 rounded-md bg-blue-100 text-blue-800 font-mono font-bold text-xs">
              LAB {activeSim.indexNumber}
            </span>
            <h2 className="text-base sm:text-lg font-black text-slate-900">
              {activeSim.title}
            </h2>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
              {activeSim.category}
            </span>
          </div>
          <p className="text-xs text-slate-500 font-medium mt-1">
            {activeSim.subject} &bull; {activeSim.gradeLevel} &bull; Single-click direct sandbox execution
          </p>
        </div>

        {/* Right: Stage Control Buttons */}
        <div className="flex items-center gap-2 flex-wrap shrink-0">
          
          {/* Aspect Ratio Switcher */}
          <div className="flex items-center bg-slate-100 border border-slate-200 rounded-lg p-0.5 text-xs text-slate-600">
            <button
              onClick={() => setAspectRatio('16:9')}
              className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer font-bold ${
                aspectRatio === '16:9' ? 'bg-white text-blue-700 shadow-2xs' : 'hover:text-slate-900'
              }`}
              title="16:9 Screen Fit"
            >
              16:9
            </button>
            <button
              onClick={() => setAspectRatio('4:3')}
              className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer font-bold ${
                aspectRatio === '4:3' ? 'bg-white text-blue-700 shadow-2xs' : 'hover:text-slate-900'
              }`}
              title="4:3 Screen Fit"
            >
              4:3
            </button>
            <button
              onClick={() => setAspectRatio('full')}
              className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer font-bold ${
                aspectRatio === 'full' ? 'bg-white text-blue-700 shadow-2xs' : 'hover:text-slate-900'
              }`}
              title="Full Height View"
            >
              Full
            </button>
          </div>

          {/* Reset Button */}
          <button
            onClick={handleReload}
            className="px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
            title="Reset simulation parameters"
          >
            <RotateCcw className={`w-3.5 h-3.5 ${isReloading ? 'animate-spin' : ''}`} />
            <span>Reset</span>
          </button>

          {/* Standalone Window Tab Button */}
          <a
            href={activeSim.fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
            title="Open simulation in new browser tab"
          >
            <ExternalLink className="w-3.5 h-3.5 text-blue-600" />
            <span className="hidden sm:inline">New Tab</span>
          </a>

          {/* Fullscreen Button */}
          <button
            onClick={handleNativeFullscreen}
            className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
            title="Open Fullscreen Stage"
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span>Fullscreen</span>
          </button>

        </div>

      </div>

      {/* Live Simulation Iframe Canvas Container */}
      <div 
        className={`w-full bg-[#050a1e] relative transition-all overflow-hidden ${
          aspectRatio === '16:9'
            ? 'aspect-[16/9] min-h-[500px] max-h-[820px]'
            : aspectRatio === '4:3'
            ? 'aspect-[4/3] min-h-[540px] max-h-[860px]'
            : 'h-[780px]'
        }`}
      >
        {isReloading && (
          <div className="absolute inset-0 z-20 bg-slate-950/85 backdrop-blur-xs flex items-center justify-center">
            <div className="flex items-center gap-3 text-cyan-400 text-sm font-semibold">
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

      {/* Stage Bottom Details Drawer */}
      <div className="p-5 bg-slate-50 border-t border-slate-200/90 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left: Learning Focus & Topic Badges */}
        <div className="lg:col-span-7">
          <div className="flex items-center gap-2 text-xs font-extrabold text-blue-700 uppercase tracking-wider mb-1.5">
            <BookOpen className="w-3.5 h-3.5 text-blue-600" />
            <span>Curriculum &amp; Pedagogical Objective</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-3">
            {activeSim.description}
          </p>
          
          <div className="flex flex-wrap items-center gap-1.5">
            {activeSim.topics.map((t, idx) => (
              <span 
                key={idx}
                className="px-2.5 py-1 rounded-md bg-white border border-slate-200 text-xs font-semibold text-slate-700 shadow-2xs"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Right: Controls & Features */}
        <div className="lg:col-span-5 lg:border-l lg:border-slate-200 lg:pl-6">
          <div className="text-xs font-extrabold text-indigo-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-indigo-600" />
            <span>Interactive Controls Available</span>
          </div>
          <ul className="space-y-1.5 text-xs text-slate-700 font-medium">
            {activeSim.features.map((f, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>

    </div>
  );
};
