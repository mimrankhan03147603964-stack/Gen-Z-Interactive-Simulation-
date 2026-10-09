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
  Sparkles
} from 'lucide-react';

interface MainStageProps {
  activeSim: SimulationItem;
  onLaunchFullscreenModal?: (sim: SimulationItem) => void;
}

const TOPIC_BADGE_COLORS = [
  'bg-emerald-950/80 text-emerald-300 border-emerald-500/40 shadow-[0_2px_8px_rgba(16,185,129,0.2)]',
  'bg-cyan-950/80 text-cyan-300 border-cyan-500/40 shadow-[0_2px_8px_rgba(6,182,212,0.2)]',
  'bg-amber-950/80 text-amber-300 border-amber-500/40 shadow-[0_2px_8px_rgba(245,158,11,0.2)]',
  'bg-purple-950/80 text-purple-300 border-purple-500/40 shadow-[0_2px_8px_rgba(168,85,247,0.2)]',
  'bg-rose-950/80 text-rose-300 border-rose-500/40 shadow-[0_2px_8px_rgba(244,63,94,0.2)]'
];

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
      className="w-full bg-[#050e24] rounded-3xl border border-blue-800/60 shadow-[0_12px_36px_rgba(0,0,0,0.45)] overflow-hidden flex flex-col transition-all"
    >
      {/* 3D Stage Header Bar */}
      <div className="p-4 sm:p-5 border-b border-blue-900/70 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-[#091b42] via-[#0c2254] to-[#071433]">
        
        {/* Left: Active Simulation Name & Meta */}
        <div>
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="px-3 py-1 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-mono font-black text-xs shadow-[0_2px_10px_rgba(6,182,212,0.4)] ring-1 ring-white/30">
              LAB {activeSim.indexNumber}
            </span>
            <h2 className="text-base sm:text-xl font-black text-white drop-shadow-sm tracking-tight">
              {activeSim.title}
            </h2>
            <span className="text-xs font-bold px-3 py-0.5 rounded-full bg-blue-900/60 text-cyan-300 border border-cyan-400/40 shadow-xs">
              {activeSim.category}
            </span>
          </div>
          <p className="text-xs text-blue-200/80 font-medium mt-1.5 flex items-center gap-2">
            <span>{activeSim.subject}</span>
            <span className="text-cyan-400">&bull;</span>
            <span>{activeSim.gradeLevel}</span>
            <span className="text-cyan-400">&bull;</span>
            <span className="text-emerald-400 font-bold">4K Ultra Resolution Ready</span>
          </p>
        </div>

        {/* Right: 3D Glossy Action Buttons */}
        <div className="flex items-center gap-2.5 flex-wrap shrink-0">
          
          {/* Aspect Ratio Switcher */}
          <div className="flex items-center bg-[#050e24] border border-blue-800/80 rounded-xl p-1 text-xs text-blue-200 shadow-inner">
            <button
              onClick={() => setAspectRatio('16:9')}
              className={`px-3 py-1 rounded-lg transition-all cursor-pointer font-extrabold ${
                aspectRatio === '16:9' ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-[0_2px_8px_rgba(37,99,235,0.5)]' : 'hover:text-white'
              }`}
              title="16:9 Screen Fit"
            >
              16:9
            </button>
            <button
              onClick={() => setAspectRatio('4:3')}
              className={`px-3 py-1 rounded-lg transition-all cursor-pointer font-extrabold ${
                aspectRatio === '4:3' ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-[0_2px_8px_rgba(37,99,235,0.5)]' : 'hover:text-white'
              }`}
              title="4:3 Screen Fit"
            >
              4:3
            </button>
            <button
              onClick={() => setAspectRatio('full')}
              className={`px-3 py-1 rounded-lg transition-all cursor-pointer font-extrabold ${
                aspectRatio === 'full' ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-[0_2px_8px_rgba(37,99,235,0.5)]' : 'hover:text-white'
              }`}
              title="Full Height View"
            >
              Full
            </button>
          </div>

          {/* 3D Reset Button */}
          <button
            onClick={handleReload}
            className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-500 hover:to-teal-600 text-white font-extrabold text-xs flex items-center gap-1.5 shadow-[0_4px_12px_rgba(16,185,129,0.35)] ring-1 ring-white/20 transition-all cursor-pointer active:scale-95"
            title="Reset simulation parameters"
          >
            <RotateCcw className={`w-3.5 h-3.5 ${isReloading ? 'animate-spin' : ''}`} />
            <span>Reset</span>
          </button>

          {/* 3D Standalone Window Tab Button */}
          <a
            href={activeSim.fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-cyan-600 via-sky-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-extrabold text-xs flex items-center gap-1.5 shadow-[0_4px_12px_rgba(6,182,212,0.35)] ring-1 ring-white/20 transition-all cursor-pointer active:scale-95"
            title="Open simulation in new browser tab"
          >
            <ExternalLink className="w-3.5 h-3.5 text-cyan-200" />
            <span className="hidden sm:inline">New Tab</span>
          </a>

          {/* 3D Fullscreen Button */}
          <button
            onClick={handleNativeFullscreen}
            className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-black text-xs flex items-center gap-1.5 shadow-[0_4px_16px_rgba(59,130,246,0.45)] ring-1 ring-white/30 transition-all cursor-pointer active:scale-95"
            title="Open Fullscreen Stage"
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span>Fullscreen</span>
          </button>

        </div>

      </div>

      {/* Live Simulation Iframe Canvas Container */}
      <div 
        className={`w-full bg-[#030816] relative transition-all overflow-hidden ${
          aspectRatio === '16:9'
            ? 'aspect-[16/9] min-h-[520px] max-h-[860px]'
            : aspectRatio === '4:3'
            ? 'aspect-[4/3] min-h-[560px] max-h-[900px]'
            : 'h-[820px]'
        }`}
      >
        {isReloading && (
          <div className="absolute inset-0 z-20 bg-[#030816]/90 backdrop-blur-sm flex items-center justify-center">
            <div className="flex items-center gap-3 text-cyan-300 text-sm font-bold bg-[#0a1c40] px-5 py-3 rounded-2xl border border-cyan-500/40 shadow-xl">
              <RotateCcw className="w-5 h-5 animate-spin text-cyan-400" />
              <span>Reloading 4K simulation canvas...</span>
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

      {/* 3D Stage Bottom Details Drawer with High Contrast & Color */}
      <div className="p-5 sm:p-6 bg-gradient-to-r from-[#081738] via-[#0a1e4a] to-[#07132e] border-t border-blue-900/70 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left: Learning Focus & Vibrant Topic Badges */}
        <div className="lg:col-span-7">
          <div className="flex items-center gap-2 text-xs font-black text-cyan-300 uppercase tracking-wider mb-2">
            <BookOpen className="w-4 h-4 text-cyan-400" />
            <span>Curriculum &amp; Pedagogical Objective</span>
          </div>
          <p className="text-xs sm:text-sm text-blue-100/90 leading-relaxed mb-4">
            {activeSim.description}
          </p>
          
          <div className="flex flex-wrap items-center gap-2">
            {activeSim.topics.map((t, idx) => {
              const colorClass = TOPIC_BADGE_COLORS[idx % TOPIC_BADGE_COLORS.length];
              return (
                <span 
                  key={idx}
                  className={`px-3 py-1 rounded-xl text-xs font-bold border ${colorClass} transition-all`}
                >
                  {t}
                </span>
              );
            })}
          </div>
        </div>

        {/* Right: Controls & Features with Vibrant Icons */}
        <div className="lg:col-span-5 lg:border-l lg:border-blue-900/60 lg:pl-6">
          <div className="text-xs font-black text-indigo-300 uppercase tracking-wider mb-2.5 flex items-center gap-2">
            <Zap className="w-4 h-4 text-indigo-400" />
            <span>Interactive Controls Available</span>
          </div>
          <ul className="space-y-2 text-xs text-blue-100 font-semibold">
            {activeSim.features.map((f, idx) => (
              <li key={idx} className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 drop-shadow-[0_0_6px_#34d399]" />
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>

    </div>
  );
};
