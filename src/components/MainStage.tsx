import React, { useRef, useState } from 'react';
import { SimulationItem } from '../types';
import { getSimTheme } from '../data/simTheme';
import { 
  Maximize2, 
  RotateCcw, 
  ExternalLink, 
  CheckCircle2, 
  BookOpen, 
  Zap, 
  Sparkles
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

  const theme = getSimTheme(activeSim.indexNumber);

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

  // Colorful pill styles with solid HEX fallbacks
  const topicPillStyles = [
    { bg: '#dbeafe', text: '#1e40af', border: '#93c5fd' },
    { bg: '#d1fae5', text: '#065f46', border: '#6ee7b7' },
    { bg: '#ede9fe', text: '#5b21b6', border: '#c4b5fd' },
    { bg: '#fef3c7', text: '#92400e', border: '#fcd34d' },
  ];

  return (
    <div 
      ref={stageContainerRef}
      className="w-full rounded-2xl border transition-all overflow-hidden flex flex-col shadow-xl"
      style={{
        backgroundColor: isDarkMode ? '#060e22' : '#ffffff',
        borderColor: isDarkMode ? '#1e3a8a' : '#cbd5e1',
        borderWidth: '1.5px',
        borderStyle: 'solid',
        color: isDarkMode ? '#ffffff' : '#0f172a'
      }}
    >
      {/* Stage Cockpit Header Bar */}
      <div 
        className="p-4 sm:p-5 border-b flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors"
        style={{
          backgroundColor: isDarkMode ? '#0a1633' : '#f8fafc',
          borderBottom: isDarkMode ? '1px solid #1e3a8a' : '1px solid #e2e8f0'
        }}
      >
        
        {/* Left: Active Simulation Name & Meta */}
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <span 
              className="px-2.5 py-0.5 rounded-md font-mono font-black text-xs shadow-md shrink-0"
              style={{
                backgroundColor: theme.bgSolid,
                backgroundImage: theme.bgGradient,
                borderColor: theme.borderColor,
                borderWidth: '1px',
                borderStyle: 'solid',
                color: '#ffffff',
                boxShadow: `0 2px 8px ${theme.glowColor}`
              }}
            >
              LAB {activeSim.indexNumber}
            </span>
            <h2 
              className="text-base sm:text-lg font-black drop-shadow-xs"
              style={{ color: isDarkMode ? '#ffffff' : '#0f172a' }}
            >
              {activeSim.title}
            </h2>
            <span 
              className="text-xs font-bold px-2.5 py-0.5 rounded-full"
              style={{
                backgroundColor: theme.badgeBg,
                color: theme.badgeText,
                borderColor: theme.badgeBorder,
                borderWidth: '1px',
                borderStyle: 'solid'
              }}
            >
              {activeSim.category}
            </span>
          </div>
          <p 
            className="text-xs font-medium mt-1"
            style={{ color: isDarkMode ? '#94a3b8' : '#475569' }}
          >
            {activeSim.subject} &bull; {activeSim.gradeLevel} &bull;{' '}
            <span style={{ color: '#059669', fontWeight: 800 }}>4K 3D Interactive Execution</span>
          </p>
        </div>

        {/* Right: Stage Control 3D Buttons with Guaranteed Visibility and Solid Colors */}
        <div className="flex items-center gap-2 flex-wrap shrink-0">
          
          {/* 3D Aspect Ratio Switcher */}
          <div 
            className="flex items-center rounded-xl p-0.5 text-xs shadow-inner"
            style={{
              backgroundColor: isDarkMode ? '#07132e' : '#f1f5f9',
              borderColor: isDarkMode ? '#3b82f6' : '#cbd5e1',
              borderWidth: '1px',
              borderStyle: 'solid'
            }}
          >
            <button
              onClick={() => setAspectRatio('16:9')}
              className="px-2.5 py-1 rounded-lg transition-all cursor-pointer font-bold"
              style={
                aspectRatio === '16:9'
                  ? {
                      backgroundColor: '#2563eb',
                      backgroundImage: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                      color: '#ffffff',
                      boxShadow: '0 2px 6px rgba(37, 99, 235, 0.4)'
                    }
                  : {
                      backgroundColor: 'transparent',
                      color: isDarkMode ? '#cbd5e1' : '#334155'
                    }
              }
              title="16:9 Widescreen Fit"
            >
              16:9
            </button>
            <button
              onClick={() => setAspectRatio('4:3')}
              className="px-2.5 py-1 rounded-lg transition-all cursor-pointer font-bold"
              style={
                aspectRatio === '4:3'
                  ? {
                      backgroundColor: '#2563eb',
                      backgroundImage: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                      color: '#ffffff',
                      boxShadow: '0 2px 6px rgba(37, 99, 235, 0.4)'
                    }
                  : {
                      backgroundColor: 'transparent',
                      color: isDarkMode ? '#cbd5e1' : '#334155'
                    }
              }
              title="4:3 Screen Fit"
            >
              4:3
            </button>
            <button
              onClick={() => setAspectRatio('full')}
              className="px-2.5 py-1 rounded-lg transition-all cursor-pointer font-bold"
              style={
                aspectRatio === 'full'
                  ? {
                      backgroundColor: '#2563eb',
                      backgroundImage: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                      color: '#ffffff',
                      boxShadow: '0 2px 6px rgba(37, 99, 235, 0.4)'
                    }
                  : {
                      backgroundColor: 'transparent',
                      color: isDarkMode ? '#cbd5e1' : '#334155'
                    }
              }
              title="Full Height View"
            >
              Full
            </button>
          </div>

          {/* 3D Emerald Reset Button */}
          <button
            onClick={handleReload}
            className="btn-3d px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-md"
            style={{
              backgroundColor: '#059669',
              backgroundImage: 'linear-gradient(135deg, #10b981 0%, #047857 100%)',
              borderColor: '#34d399',
              borderWidth: '1.5px',
              borderStyle: 'solid',
              color: '#ffffff',
              boxShadow: '0 4px 10px rgba(5, 150, 105, 0.35)'
            }}
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
            className="btn-3d px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-md"
            style={{
              backgroundColor: '#4f46e5',
              backgroundImage: 'linear-gradient(135deg, #6366f1 0%, #4338ca 100%)',
              borderColor: '#818cf8',
              borderWidth: '1.5px',
              borderStyle: 'solid',
              color: '#ffffff',
              boxShadow: '0 4px 10px rgba(79, 70, 229, 0.35)'
            }}
            title="Open simulation in new browser tab"
          >
            <ExternalLink className="w-3.5 h-3.5 text-white" />
            <span className="hidden sm:inline">New Tab</span>
          </a>

          {/* 3D Rose Fullscreen Button */}
          <button
            onClick={handleNativeFullscreen}
            className="btn-3d px-3.5 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 shadow-md transition-all cursor-pointer"
            style={{
              backgroundColor: '#e11d48',
              backgroundImage: 'linear-gradient(135deg, #f43f5e 0%, #be123c 100%)',
              borderColor: '#fb7185',
              borderWidth: '1.5px',
              borderStyle: 'solid',
              color: '#ffffff',
              boxShadow: '0 4px 10px rgba(225, 29, 72, 0.35)'
            }}
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
          aspectRatio === '16:9'
            ? 'aspect-[16/9] min-h-[500px] max-h-[820px]'
            : aspectRatio === '4:3'
            ? 'aspect-[4/3] min-h-[540px] max-h-[860px]'
            : 'h-[780px]'
        }`}
        style={{ backgroundColor: '#0f172a' }}
      >
        {isReloading && (
          <div className="absolute inset-0 z-20 bg-slate-950/90 flex items-center justify-center">
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
      <div 
        className="p-5 sm:p-6 border-t grid grid-cols-1 lg:grid-cols-12 gap-6 items-start transition-colors"
        style={{
          backgroundColor: isDarkMode ? '#071329' : '#f8fafc',
          borderTop: isDarkMode ? '1px solid #1e3a8a' : '1px solid #e2e8f0'
        }}
      >
        
        {/* Left: Learning Focus & Topic Badges */}
        <div className="lg:col-span-7">
          <div 
            className="flex items-center gap-2 text-xs font-black uppercase tracking-wider mb-2"
            style={{ color: isDarkMode ? '#38bdf8' : '#1d4ed8' }}
          >
            <BookOpen className="w-4 h-4" />
            <span>Core Curriculum Topics &amp; Competencies</span>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {activeSim.topics.map((t: string, idx: number) => {
              const pillStyle = topicPillStyles[idx % topicPillStyles.length];
              return (
                <span 
                  key={idx}
                  className="px-3 py-1 rounded-lg text-xs font-bold shadow-2xs"
                  style={{
                    backgroundColor: pillStyle.bg,
                    color: pillStyle.text,
                    borderColor: pillStyle.border,
                    borderWidth: '1px',
                    borderStyle: 'solid'
                  }}
                >
                  {t}
                </span>
              );
            })}
          </div>

          <p 
            className="text-xs leading-relaxed font-medium"
            style={{ color: isDarkMode ? '#cbd5e1' : '#475569' }}
          >
            {activeSim.description}
          </p>
        </div>

        {/* Right: Key Interactive Features */}
        <div 
          className="lg:col-span-5 lg:border-l pl-0 lg:pl-6"
          style={{
            borderLeftColor: isDarkMode ? 'rgba(59, 130, 246, 0.2)' : '#e2e8f0'
          }}
        >
          <div 
            className="flex items-center gap-2 text-xs font-black uppercase tracking-wider mb-3"
            style={{ color: '#059669' }}
          >
            <Zap className="w-4 h-4" />
            <span>Verified Interactive Features</span>
          </div>

          <div className="space-y-2">
            {activeSim.features.map((feat: string, idx: number) => (
              <div 
                key={idx}
                className="flex items-center gap-2 text-xs font-semibold p-2 rounded-lg"
                style={{
                  backgroundColor: isDarkMode ? '#0c1a3b' : '#ffffff',
                  borderColor: isDarkMode ? '#1e3a8a' : '#cbd5e1',
                  borderWidth: '1px',
                  borderStyle: 'solid',
                  color: isDarkMode ? '#f8fafc' : '#0f172a'
                }}
              >
                <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: '#10b981' }} />
                <span>{feat}</span>
              </div>
            ))}
          </div>

          <div 
            className="mt-3 pt-3 border-t flex items-center justify-between text-[11px] font-bold"
            style={{
              borderTopColor: isDarkMode ? 'rgba(59, 130, 246, 0.2)' : '#e2e8f0',
              color: isDarkMode ? '#94a3b8' : '#64748b'
            }}
          >
            <span>Target Level: {activeSim.gradeLevel}</span>
            <span 
              className="flex items-center gap-1"
              style={{ color: isDarkMode ? '#38bdf8' : '#2563eb' }}
            >
              <Sparkles className="w-3 h-3" />
              <span>4K High-Res Graphics</span>
            </span>
          </div>
        </div>

      </div>

    </div>
  );
};
