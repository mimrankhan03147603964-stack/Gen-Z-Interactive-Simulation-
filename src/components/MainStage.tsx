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
  isDarkMode?: boolean;
}

export const MainStage: React.FC<MainStageProps> = ({
  activeSim,
  onLaunchFullscreenModal,
  isDarkMode = false
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

  // Colorful pill styles for topic tags
  const topicPillColors = [
    'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950/80 dark:text-cyan-200 dark:border-blue-500/40',
    'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/80 dark:text-emerald-200 dark:border-emerald-500/40',
    'bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-950/80 dark:text-purple-200 dark:border-purple-500/40',
    'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/80 dark:text-amber-200 dark:border-amber-500/40',
  ];

  return (
    <div 
      ref={stageContainerRef}
      className={`w-full rounded-2xl border transition-all overflow-hidden flex flex-col shadow-xl ${
        isDarkMode
          ? 'bg-gradient-to-b from-[#0a1838] via-[#061026] to-[#040a1c] border-blue-500/35 text-white'
          : 'bg-white border-slate-200 text-slate-800'
      }`}
    >
      {/* Stage Cockpit Header Bar */}
      <div className={`p-4 sm:p-5 border-b flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors ${
        isDarkMode
          ? 'bg-[#071329]/95 border-blue-500/25'
          : 'bg-gradient-to-r from-slate-50 via-blue-50/40 to-slate-50 border-slate-200'
      }`}>
        
        {/* Left: Active Simulation Name & Meta */}
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2.5 py-0.5 rounded-md bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-mono font-black text-xs shadow-md border border-white/30">
              LAB {activeSim.indexNumber}
            </span>
            <h2 className={`text-base sm:text-lg font-black drop-shadow-xs ${
              isDarkMode ? 'text-white' : 'text-slate-900'
            }`}>
              {activeSim.title}
            </h2>
            <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${
              isDarkMode
                ? 'bg-[#0d214a] text-cyan-300 border-blue-400/30'
                : 'bg-blue-100 text-blue-800 border-blue-300'
            }`}>
              {activeSim.category}
            </span>
          </div>
          <p className={`text-xs font-medium mt-1 ${
            isDarkMode ? 'text-cyan-200/80' : 'text-slate-600'
          }`}>
            {activeSim.subject} &bull; {activeSim.gradeLevel} &bull; <span className="text-emerald-600 dark:text-emerald-400 font-bold">4K 3D Interactive Execution</span>
          </p>
        </div>

        {/* Right: Stage Control 3D Buttons */}
        <div className="flex items-center gap-2 flex-wrap shrink-0">
          
          {/* 3D Aspect Ratio Switcher */}
          <div className={`flex items-center border rounded-xl p-0.5 text-xs shadow-inner ${
            isDarkMode
              ? 'bg-[#07132e] border-blue-500/40 text-slate-300'
              : 'bg-slate-100 border-slate-300 text-slate-700'
          }`}>
            <button
              onClick={() => setAspectRatio('16:9')}
              className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer font-bold ${
                aspectRatio === '16:9' 
                  ? 'btn-3d bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-xs' 
                  : 'hover:text-blue-600'
              }`}
              title="16:9 Widescreen Fit"
            >
              16:9
            </button>
            <button
              onClick={() => setAspectRatio('4:3')}
              className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer font-bold ${
                aspectRatio === '4:3' 
                  ? 'btn-3d bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-xs' 
                  : 'hover:text-blue-600'
              }`}
              title="4:3 Screen Fit"
            >
              4:3
            </button>
            <button
              onClick={() => setAspectRatio('full')}
              className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer font-bold ${
                aspectRatio === 'full' 
                  ? 'btn-3d bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-xs' 
                  : 'hover:text-blue-600'
              }`}
              title="Full Height View"
            >
              Full
            </button>
          </div>

          {/* 3D Emerald Reset Button */}
          <button
            onClick={handleReload}
            className="btn-3d px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white border border-emerald-400 font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-md shadow-emerald-600/20"
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
            className="btn-3d px-3 py-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white border border-indigo-400 font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-md shadow-indigo-600/20"
            title="Open simulation in new browser tab"
          >
            <ExternalLink className="w-3.5 h-3.5 text-white" />
            <span className="hidden sm:inline">New Tab</span>
          </a>

          {/* 3D Rose Fullscreen Button */}
          <button
            onClick={handleNativeFullscreen}
            className="btn-3d px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-rose-600/25 border border-rose-400 transition-all cursor-pointer"
            title="Open Fullscreen Stage"
          >
            <Maximize2 className="w-3.5 h-3.5 text-white" />
            <span>Fullscreen</span>
          </button>

        </div>

      </div>

      {/* Live Simulation Iframe Canvas Container */}
      <div 
        className={`w-full relative transition-all overflow-hidden ${
          isDarkMode ? 'bg-[#040817]' : 'bg-slate-900'
        } ${
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

      {/* Stage Bottom Curriculum & Features Drawer */}
      <div className={`p-5 sm:p-6 border-t grid grid-cols-1 lg:grid-cols-12 gap-6 items-start transition-colors ${
        isDarkMode
          ? 'bg-[#071329] border-blue-500/25'
          : 'bg-slate-50 border-slate-200'
      }`}>
        
        {/* Left: Learning Focus & Topic Badges */}
        <div className="lg:col-span-7">
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider mb-2 text-blue-600 dark:text-cyan-400">
            <BookOpen className="w-4 h-4 text-blue-600 dark:text-cyan-400" />
            <span>Core Curriculum Topics &amp; Competencies</span>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {activeSim.topics.map((t: string, idx: number) => {
              const colorClass = topicPillColors[idx % topicPillColors.length];
              return (
                <span 
                  key={idx}
                  className={`px-3 py-1 rounded-lg border text-xs font-bold shadow-2xs ${colorClass}`}
                >
                  {t}
                </span>
              );
            })}
          </div>

          <p className={`text-xs leading-relaxed font-medium ${
            isDarkMode ? 'text-slate-300' : 'text-slate-600'
          }`}>
            {activeSim.description}
          </p>
        </div>

        {/* Right: Key Interactive Features */}
        <div className={`lg:col-span-5 lg:border-l pl-0 lg:pl-6 ${
          isDarkMode ? 'border-blue-500/20' : 'border-slate-300'
        }`}>
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider mb-3 text-emerald-600 dark:text-emerald-400">
            <Zap className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Verified Interactive Features</span>
          </div>

          <div className="space-y-2">
            {activeSim.features.map((feat: string, idx: number) => (
              <div 
                key={idx}
                className={`flex items-center gap-2 text-xs font-semibold p-2 rounded-lg border ${
                  isDarkMode
                    ? 'bg-[#0c1a3b]/80 border-blue-500/30 text-slate-200'
                    : 'bg-white border-slate-200 text-slate-800 shadow-2xs'
                }`}
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>{feat}</span>
              </div>
            ))}
          </div>

          <div className={`mt-3 pt-3 border-t flex items-center justify-between text-[11px] font-bold ${
            isDarkMode ? 'border-blue-500/20 text-slate-400' : 'border-slate-200 text-slate-500'
          }`}>
            <span>Target Level: {activeSim.gradeLevel}</span>
            <span className="text-blue-600 dark:text-cyan-400 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-blue-500 dark:text-cyan-400" />
              <span>4K High-Res Graphics</span>
            </span>
          </div>
        </div>

      </div>

    </div>
  );
};
