import React, { useRef, useState } from 'react';
import { SimulationItem } from '../types';
import { getSimTheme } from '../data/simTheme';
import { getSimulationStandaloneUrl } from '../utils/navigation';
import { 
  Maximize2, 
  RotateCcw, 
  ExternalLink, 
  CheckCircle2, 
  BookOpen, 
  Zap, 
  Sparkles,
  HelpCircle,
  Sliders,
  BarChart3,
  Layers,
  GraduationCap,
  ArrowLeft,
  ChevronRight,
  X
} from 'lucide-react';

interface MainStageProps {
  activeSim: SimulationItem;
  totalSimulations?: number;
  onLaunchFullscreenModal?: (sim: SimulationItem) => void;
  onBackToCatalog?: () => void;
  isDarkMode?: boolean;
}

export const MainStage: React.FC<MainStageProps> = ({
  activeSim,
  totalSimulations = 52,
  onLaunchFullscreenModal,
  onBackToCatalog,
  isDarkMode = false
}) => {
  const [aspectRatio, setAspectRatio] = useState<'16:9' | '4:3' | 'full'>('full');
  const [iframeHeight, setIframeHeight] = useState<number>(850);
  const [isReloading, setIsReloading] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const stageContainerRef = useRef<HTMLDivElement>(null);

  const theme = getSimTheme(activeSim.indexNumber);

  // Measure and synchronize the natural content height of the simulation document
  const syncIframeHeight = React.useCallback(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    try {
      const doc = iframe.contentDocument || iframe.contentWindow?.document;
      if (!doc || !doc.body) return;

      // Restore natural, smooth vertical scrolling in the iframe document
      doc.documentElement.style.overflowX = 'hidden';
      doc.documentElement.style.overflowY = 'auto';
      doc.body.style.overflowX = 'hidden';
      doc.body.style.overflowY = 'auto';

      const hasEducationalCards = !!doc.querySelector(
        '.container, .card, .tabs, .tab-btn, .section-tabs, #topicsContainer, .grid-3, .quiz, .theory, .sim-readout, .teacher-note'
      );

      const bodyScroll = doc.body.scrollHeight || 0;
      const docScroll = doc.documentElement.scrollHeight || 0;
      const bodyOffset = doc.body.offsetHeight || 0;
      const docOffset = doc.documentElement.offsetHeight || 0;

      let contentH = Math.max(bodyScroll, docScroll, bodyOffset, docOffset);

      if (!hasEducationalCards) {
        contentH = Math.max(window.innerHeight - 150, 750);
      } else {
        contentH = Math.max(contentH + 24, 760);
      }

      if (contentH > 200) {
        setIframeHeight(contentH);
      }
    } catch {
      // Cross-origin fallback
    }
  }, []);

  const handleIframeLoad = () => {
    setIsReloading(false);
    const iframe = iframeRef.current;
    if (!iframe) return;

    try {
      const doc = iframe.contentDocument || iframe.contentWindow?.document;
      if (!doc) return;

      const styleId = 'genz-natural-scrollbar';
      if (!doc.getElementById(styleId)) {
        const style = doc.createElement('style');
        style.id = styleId;
        style.textContent = `
          html, body {
            overflow-x: hidden !important;
            overflow-y: auto !important;
            scrollbar-width: thin !important;
            scrollbar-color: #0284c7 rgba(15, 23, 42, 0.6) !important;
          }
          ::-webkit-scrollbar {
            width: 8px !important;
            height: 8px !important;
          }
          ::-webkit-scrollbar-track {
            background: rgba(10, 15, 30, 0.7) !important;
          }
          ::-webkit-scrollbar-thumb {
            background: #0284c7 !important;
            border-radius: 4px !important;
          }
        `;
        doc.head?.appendChild(style);
      }

      syncIframeHeight();

      if (doc.body) {
        const mo = new MutationObserver(() => {
          syncIframeHeight();
        });
        mo.observe(doc.body, { childList: true, subtree: true, attributes: true, characterData: true });

        if (iframe.contentWindow && 'ResizeObserver' in iframe.contentWindow) {
          const ro = new (iframe.contentWindow as any).ResizeObserver(() => {
            syncIframeHeight();
          });
          ro.observe(doc.body);
        }

        doc.addEventListener('click', () => {
          setTimeout(syncIframeHeight, 50);
          setTimeout(syncIframeHeight, 150);
          setTimeout(syncIframeHeight, 350);
        });
      }
    } catch {
      // Fallback
    }
  };

  React.useEffect(() => {
    syncIframeHeight();
    const handleResize = () => syncIframeHeight();
    window.addEventListener('resize', handleResize);

    const interval = setInterval(syncIframeHeight, 600);
    const timer = setTimeout(() => clearInterval(interval), 3600);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [activeSim, aspectRatio, syncIframeHeight]);

  const handleReload = () => {
    setIsReloading(true);
    if (iframeRef.current) {
      if (activeSim.htmlContent) {
        const content = activeSim.htmlContent;
        iframeRef.current.srcdoc = '';
        setTimeout(() => {
          if (iframeRef.current) {
            iframeRef.current.srcdoc = content;
            setIsReloading(false);
          }
        }, 90);
      } else {
        const src = iframeRef.current.src;
        iframeRef.current.src = 'about:blank';
        setTimeout(() => {
          if (iframeRef.current) {
            iframeRef.current.src = src;
            setIsReloading(false);
          }
        }, 90);
      }
    } else {
      setIsReloading(false);
    }
  };

  const handleNativeFullscreen = () => {
    if (onLaunchFullscreenModal) {
      onLaunchFullscreenModal(activeSim);
    } else if (stageContainerRef.current) {
      const container = stageContainerRef.current;
      if (!document.fullscreenElement) {
        container.requestFullscreen().catch((err) => console.error('Fullscreen request error:', err));
      } else {
        document.exitFullscreen().catch((err) => console.error('Exit fullscreen error:', err));
      }
    }
  };

  // High contrast topic pill styles with solid HEX borders
  const topicPillStyles = [
    { bg: '#dbeafe', text: '#1e3a8a', border: '#60a5fa' },
    { bg: '#d1fae5', text: '#064e3b', border: '#34d399' },
    { bg: '#ede9fe', text: '#4c1d95', border: '#a78bfa' },
    { bg: '#fef3c7', text: '#78350f', border: '#f59e0b' },
  ];

  return (
    <div 
      id="stage"
      ref={stageContainerRef}
      className="simulation-wrapper w-full rounded-2xl border transition-all overflow-hidden flex flex-col shadow-xl opacity-100 scroll-mt-20"
      style={{
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        backgroundColor: isDarkMode ? 'rgba(6, 14, 34, 0.78)' : 'rgba(255, 255, 255, 0.82)',
        borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.18)' : 'rgba(255, 255, 255, 0.65)',
        borderWidth: '1px',
        borderStyle: 'solid',
        boxShadow: isDarkMode ? '0 8px 32px 0 rgba(0, 0, 0, 0.45)' : '0 8px 32px 0 rgba(31, 38, 135, 0.08)',
        color: isDarkMode ? '#ffffff' : '#0f172a'
      }}
    >
      {/* Top Navigation Bar with Back to Topics Button & Breadcrumbs */}
      <div 
        className="px-5 py-3 border-b flex flex-wrap items-center justify-between gap-3 transition-colors"
        style={{
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          backgroundColor: isDarkMode ? 'rgba(7, 18, 45, 0.88)' : 'rgba(255, 255, 255, 0.92)',
          borderBottom: isDarkMode ? '1px solid rgba(255, 255, 255, 0.15)' : '1px solid rgba(226, 232, 240, 0.9)'
        }}
      >
        <div className="flex items-center gap-3">
          {onBackToCatalog && (
            <button
              onClick={onBackToCatalog}
              className="btn-3d px-3.5 py-1.5 rounded-xl text-xs font-black flex items-center gap-2 cursor-pointer shadow-sm transition-all hover:scale-105"
              style={{
                backgroundColor: theme.bgSolid,
                color: '#ffffff',
                borderColor: theme.borderColor,
                borderWidth: '1.5px',
                borderStyle: 'solid',
                boxShadow: `0 4px 12px ${theme.glowColor}`
              }}
              title="Return to Subject Topics Catalog"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Topics</span>
            </button>
          )}

          {/* Breadcrumb Navigation */}
          <div className="flex items-center gap-1.5 text-xs font-bold" style={{ color: isDarkMode ? '#94a3b8' : '#64748b' }}>
            <span 
              onClick={onBackToCatalog} 
              className="cursor-pointer hover:underline hover:text-blue-500 font-extrabold"
            >
              Subjects
            </span>
            <ChevronRight className="w-3 h-3 text-slate-400" />
            <span 
              onClick={onBackToCatalog}
              className="cursor-pointer hover:underline font-extrabold"
              style={{ color: isDarkMode ? '#38bdf8' : '#2563eb' }}
            >
              {activeSim.category}
            </span>
            <ChevronRight className="w-3 h-3 text-slate-400" />
            <span className="font-mono font-black" style={{ color: isDarkMode ? '#f8fafc' : '#0f172a' }}>
              Lab {activeSim.indexNumber}
            </span>
          </div>
        </div>

        {/* Right close lab button */}
        {onBackToCatalog && (
          <button
            onClick={onBackToCatalog}
            className="p-1.5 rounded-lg border text-xs font-bold transition-all cursor-pointer hover:bg-red-500/10 hover:text-red-500 flex items-center gap-1"
            style={{
              borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.18)' : '#cbd5e1',
              color: isDarkMode ? '#94a3b8' : '#64748b'
            }}
            title="Close Lab and Return to Catalog"
          >
            <X className="w-4 h-4" />
            <span className="text-[11px] font-black hidden sm:inline">Close Lab</span>
          </button>
        )}
      </div>

      {/* =========================================================================
          STEP 1: SUBJECT HEADING
          Clearly identifies the overarching subject domain (e.g. Physics, Chemistry, Biology, Mathematics)
          ========================================================================= */}
      <div 
        className="px-5 py-3 border-b flex flex-wrap items-center justify-between gap-3"
        style={{
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          backgroundColor: isDarkMode ? 'rgba(11, 25, 61, 0.75)' : 'rgba(239, 246, 255, 0.75)',
          borderBottom: isDarkMode ? '1px solid rgba(255, 255, 255, 0.18)' : '1px solid rgba(191, 219, 254, 0.6)'
        }}
      >
        <div className="flex items-center gap-2.5">
          <span 
            className="w-2.5 h-2.5 rounded-full animate-pulse" 
            style={{ backgroundColor: theme.bgSolid }}
          />
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider">
            <span style={{ color: isDarkMode ? '#93c5fd' : '#1e40af' }}>
              STEP 1 &bull; SUBJECT DOMAIN:
            </span>
            <span 
              className="px-2.5 py-0.5 rounded-full text-xs font-black shadow-2xs"
              style={{
                backgroundColor: theme.badgeBg,
                color: theme.badgeText,
                borderColor: theme.badgeBorder,
                borderWidth: '1.5px',
                borderStyle: 'solid'
              }}
            >
              {activeSim.subject}
            </span>
            <span 
              className="text-[11px] font-extrabold px-2 py-0.5 rounded-md"
              style={{
                backgroundColor: isDarkMode ? '#13234d' : '#dbeafe',
                color: isDarkMode ? '#60a5fa' : '#1d4ed8'
              }}
            >
              {activeSim.category}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-black">
          <span 
            className="flex items-center gap-1 font-bold text-[11px]"
            style={{ color: isDarkMode ? '#94a3b8' : '#64748b' }}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Target: {activeSim.gradeLevel}</span>
          </span>
          <span 
            className="px-2.5 py-0.5 rounded font-mono text-xs font-black text-white shadow-xs flex items-center gap-1"
            style={{
              backgroundColor: activeSim.isAiGenerated ? '#8b5cf6' : theme.bgSolid,
              boxShadow: `0 2px 6px ${activeSim.isAiGenerated ? 'rgba(139, 92, 246, 0.4)' : theme.glowColor}`
            }}
          >
            {activeSim.isAiGenerated ? (
              <>
                <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
                <span>AI-GENERATED &bull; GEMINI</span>
              </>
            ) : (
              <span>LAB {activeSim.indexNumber} OF {totalSimulations}</span>
            )}
          </span>
        </div>
      </div>

      {/* =========================================================================
          STEP 2: TOPIC TITLE & DESCRIPTION / CONCEPT INTRODUCTION
          Clearly stated first so the user understands what the simulation is about
          ========================================================================= */}
      <div 
        className="p-5 sm:p-6 border-b transition-colors"
        style={{
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          backgroundColor: isDarkMode ? 'rgba(8, 20, 47, 0.72)' : 'rgba(248, 250, 252, 0.75)',
          borderBottom: isDarkMode ? '1px solid rgba(255, 255, 255, 0.18)' : '1px solid rgba(255, 255, 255, 0.5)'
        }}
      >
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
          {/* Left: Topic Title & Description */}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2 text-xs font-black uppercase tracking-wider"
              style={{ color: isDarkMode ? '#38bdf8' : '#2563eb' }}
            >
              <BookOpen className="w-4 h-4" />
              <span>STEP 2 &bull; TOPIC OVERVIEW &amp; CONCEPT INTRODUCTION</span>
            </div>

            <h1 
              className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight leading-tight"
              style={{ color: isDarkMode ? '#ffffff' : '#0f172a' }}
            >
              {activeSim.title}
            </h1>

            <p 
              className="text-xs sm:text-sm lg:text-base font-bold mt-2.5 leading-relaxed"
              style={{ color: isDarkMode ? '#e2e8f0' : '#334155' }}
            >
              {activeSim.description}
            </p>

            {/* Core curriculum competencies badges */}
            <div className="flex flex-wrap items-center gap-2 mt-4">
              <span 
                className="text-xs font-black uppercase tracking-wider mr-1 flex items-center gap-1"
                style={{ color: isDarkMode ? '#94a3b8' : '#64748b' }}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Core Topics:</span>
              </span>
              {activeSim.topics.map((t: string, idx: number) => {
                const pillStyle = topicPillStyles[idx % topicPillStyles.length];
                return (
                  <span 
                    key={idx}
                    className="px-3 py-1 rounded-lg text-xs font-black shadow-2xs"
                    style={{
                      backgroundColor: pillStyle.bg,
                      color: pillStyle.text,
                      borderColor: pillStyle.border,
                      borderWidth: '1.5px',
                      borderStyle: 'solid'
                    }}
                  >
                    {t}
                  </span>
                );
              })}
            </div>
          </div>

          {/* Right: Key Verified Learning Outcomes Card */}
          <div 
            className="w-full lg:w-80 shrink-0 p-4 rounded-xl border"
            style={{
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              backgroundColor: isDarkMode ? 'rgba(12, 27, 61, 0.75)' : 'rgba(255, 255, 255, 0.82)',
              borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.18)' : 'rgba(255, 255, 255, 0.65)',
              borderWidth: '1px',
              borderStyle: 'solid',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.06)'
            }}
          >
            <div 
              className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider mb-2.5"
              style={{ color: '#059669' }}
            >
              <Zap className="w-4 h-4" />
              <span>Verified Lab Competencies</span>
            </div>
            <div className="space-y-1.5">
              {activeSim.features.slice(0, 3).map((feat: string, idx: number) => (
                <div 
                  key={idx}
                  className="flex items-start gap-2 text-xs font-bold"
                  style={{ color: isDarkMode ? '#e2e8f0' : '#1e293b' }}
                >
                  <CheckCircle2 className="w-3.5 h-3.5 mt-0.5 shrink-0" style={{ color: '#059669' }} />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
            <div 
              className="mt-3 pt-2.5 border-t flex items-center justify-between text-[11px] font-black"
              style={{
                borderTopColor: isDarkMode ? 'rgba(255, 255, 255, 0.18)' : '#e2e8f0',
                borderTopWidth: '1px',
                color: isDarkMode ? '#38bdf8' : '#2563eb'
              }}
            >
              <span className="flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>4K Ultra Graphics</span>
              </span>
              <span>Direct Hands-On</span>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          STEP 3: INTERACTIVE SIMULATION AREA (CANVAS / PLAYGROUND)
          Directly below its topic explanation with quick stage tools
          ========================================================================= */}
      <div className="w-full flex flex-col">
        {/* Step 3 Header Bar with Stage Toolbar */}
        <div 
          className="px-4 sm:px-5 py-2.5 border-b flex flex-wrap items-center justify-between gap-3"
          style={{
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            backgroundColor: isDarkMode ? 'rgba(10, 22, 51, 0.75)' : 'rgba(241, 245, 249, 0.75)',
            borderBottom: isDarkMode ? '1px solid rgba(255, 255, 255, 0.18)' : '1px solid rgba(255, 255, 255, 0.5)'
          }}
        >
          <div className="flex items-center gap-2">
            <span 
              className="px-2 py-0.5 rounded text-[11px] font-black uppercase tracking-wider text-white"
              style={{ backgroundColor: '#2563eb' }}
            >
              STEP 3
            </span>
            <span 
              className="text-xs sm:text-sm font-black"
              style={{ color: isDarkMode ? '#ffffff' : '#0f172a' }}
            >
              Interactive Simulation Playground
            </span>
          </div>

          {/* Stage Controls: Aspect Ratio, Reset, New Tab, Fullscreen */}
          <div className="flex items-center gap-2 flex-wrap shrink-0">
            {/* Aspect Ratio Switcher */}
            <div 
              className="flex items-center rounded-xl p-0.5 text-xs shadow-inner"
              style={{
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                backgroundColor: isDarkMode ? 'rgba(7, 19, 46, 0.75)' : 'rgba(255, 255, 255, 0.75)',
                borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.18)' : 'rgba(148, 163, 184, 0.6)',
                borderWidth: '1px',
                borderStyle: 'solid'
              }}
            >
              <button
                onClick={() => setAspectRatio('16:9')}
                className="px-2.5 py-1 rounded-lg transition-all cursor-pointer font-black"
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
                        color: isDarkMode ? '#ffffff' : '#0f172a'
                      }
                }
                title="16:9 Widescreen Fit"
              >
                16:9
              </button>
              <button
                onClick={() => setAspectRatio('4:3')}
                className="px-2.5 py-1 rounded-lg transition-all cursor-pointer font-black"
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
                        color: isDarkMode ? '#ffffff' : '#0f172a'
                      }
                }
                title="4:3 Screen Fit"
              >
                4:3
              </button>
              <button
                onClick={() => setAspectRatio('full')}
                className="px-2.5 py-1 rounded-lg transition-all cursor-pointer font-black"
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
                        color: isDarkMode ? '#ffffff' : '#0f172a'
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
              className="btn-3d px-3 py-1.5 rounded-xl font-black text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-md"
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
              href={getSimulationStandaloneUrl(activeSim)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-3d px-3 py-1.5 rounded-xl font-black text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-md"
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
              className="btn-3d px-3.5 py-1.5 rounded-xl font-black text-xs flex items-center gap-1.5 shadow-md transition-all cursor-pointer"
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

        {/* Live Simulation Iframe Canvas Container - Expands Naturally with Single Page Scroll */}
        {(() => {
          const calculatedHeight = 
            aspectRatio === '16:9'
              ? 'max(700px, 56.25vw)'
              : aspectRatio === '4:3'
              ? 'max(750px, 75vw)'
              : `${iframeHeight}px`;

          return (
            <div 
              className="w-full relative transition-all"
              style={{
                height: calculatedHeight,
                minHeight: '680px',
                backgroundColor: '#0f172a'
              }}
            >
              {isReloading && (
                <div className="absolute inset-0 z-20 bg-slate-950 flex items-center justify-center">
                  <div className="flex items-center gap-3 text-cyan-300 text-sm font-black">
                    <RotateCcw className="w-5 h-5 animate-spin" />
                    <span>Reloading simulation canvas...</span>
                  </div>
                </div>
              )}

              <iframe
                ref={iframeRef}
                key={activeSim.id}
                src={activeSim.htmlContent ? undefined : activeSim.fileUrl}
                srcDoc={activeSim.htmlContent || undefined}
                title={activeSim.title}
                className="w-full border-0 block"
                style={{
                  height: calculatedHeight,
                  minHeight: '680px',
                  overflow: 'hidden'
                }}
                scrolling="no"
                onLoad={handleIframeLoad}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                allowFullScreen
              />
            </div>
          );
        })()}
      </div>

      {/* =========================================================================
          STEP 4: SIMULATION PERFORMANCE / CONTROLS & ANALYSIS
          Neatly placed underneath the simulation playground
          ========================================================================= */}
      <div 
        className="p-5 sm:p-6 border-t transition-colors"
        style={{
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          backgroundColor: isDarkMode ? 'rgba(7, 19, 41, 0.75)' : 'rgba(255, 255, 255, 0.75)',
          borderTop: isDarkMode ? '1px solid rgba(255, 255, 255, 0.18)' : '1px solid rgba(255, 255, 255, 0.5)'
        }}
      >
        <div className="flex items-center gap-2 mb-4 text-xs font-black uppercase tracking-wider"
          style={{ color: '#059669' }}
        >
          <Sliders className="w-4 h-4" />
          <span>STEP 4 &bull; SIMULATION PERFORMANCE, CONTROLS &amp; OBSERVATION ANALYSIS</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Card 1: Interactive Controls Guide */}
          <div 
            className="p-4 rounded-xl border flex flex-col justify-between"
            style={{
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              backgroundColor: isDarkMode ? 'rgba(12, 27, 61, 0.72)' : 'rgba(248, 250, 252, 0.75)',
              borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.18)' : 'rgba(255, 255, 255, 0.65)',
              borderWidth: '1px',
              borderStyle: 'solid',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.06)'
            }}
          >
            <div>
              <div 
                className="text-xs font-black uppercase tracking-wider mb-2 flex items-center gap-1.5"
                style={{ color: isDarkMode ? '#38bdf8' : '#1d4ed8' }}
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>Interactive Controls</span>
              </div>
              <p 
                className="text-xs font-bold leading-relaxed"
                style={{ color: isDarkMode ? '#cbd5e1' : '#475569' }}
              >
                Use the interactive controls, sliders, and parameter buttons embedded directly in the canvas above. Adjust inputs, toggle modes, and explore real-time responses.
              </p>
            </div>
            <div 
              className="mt-3 pt-2 border-t text-[11px] font-black flex items-center justify-between"
              style={{
                borderTopColor: isDarkMode ? 'rgba(255, 255, 255, 0.18)' : '#e2e8f0',
                color: isDarkMode ? '#93c5fd' : '#2563eb'
              }}
            >
              <span>Built-in Canvas Sliders</span>
              <span className="font-extrabold text-emerald-600">Active</span>
            </div>
          </div>

          {/* Card 2: Performance Metrics & Real-time Readouts */}
          <div 
            className="p-4 rounded-xl border flex flex-col justify-between"
            style={{
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              backgroundColor: isDarkMode ? 'rgba(12, 27, 61, 0.72)' : 'rgba(248, 250, 252, 0.75)',
              borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.18)' : 'rgba(255, 255, 255, 0.65)',
              borderWidth: '1px',
              borderStyle: 'solid',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.06)'
            }}
          >
            <div>
              <div 
                className="text-xs font-black uppercase tracking-wider mb-2 flex items-center gap-1.5"
                style={{ color: '#059669' }}
              >
                <BarChart3 className="w-3.5 h-3.5" />
                <span>Live Metrics &amp; Telemetry</span>
              </div>
              <p 
                className="text-xs font-bold leading-relaxed"
                style={{ color: isDarkMode ? '#cbd5e1' : '#475569' }}
              >
                Observe live numerical readouts, vectors, formula outputs, and scientific telemetry generated continuously by the 60 FPS physics calculation engine.
              </p>
            </div>
            <div 
              className="mt-3 pt-2 border-t text-[11px] font-black flex items-center justify-between"
              style={{
                borderTopColor: isDarkMode ? 'rgba(255, 255, 255, 0.18)' : '#e2e8f0',
                color: isDarkMode ? '#93c5fd' : '#2563eb'
              }}
            >
              <span>60 FPS Physics Engine</span>
              <span className="font-extrabold text-emerald-600">Synchronized</span>
            </div>
          </div>

          {/* Card 3: Observation Results & Guided Learning */}
          <div 
            className="p-4 rounded-xl border flex flex-col justify-between"
            style={{
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              backgroundColor: isDarkMode ? 'rgba(12, 27, 61, 0.72)' : 'rgba(248, 250, 252, 0.75)',
              borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.18)' : 'rgba(255, 255, 255, 0.65)',
              borderWidth: '1px',
              borderStyle: 'solid',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.06)'
            }}
          >
            <div>
              <div 
                className="text-xs font-black uppercase tracking-wider mb-2 flex items-center gap-1.5"
                style={{ color: isDarkMode ? '#c084fc' : '#7c3aed' }}
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>Observation &amp; Inquiry</span>
              </div>
              <p 
                className="text-xs font-bold leading-relaxed"
                style={{ color: isDarkMode ? '#cbd5e1' : '#475569' }}
              >
                Compare how altering individual parameters affects system equilibrium, wave frequencies, chemical concentrations, orbital periods, or mechanical forces.
              </p>
            </div>
            <div 
              className="mt-3 pt-2 border-t text-[11px] font-black flex items-center justify-between"
              style={{
                borderTopColor: isDarkMode ? 'rgba(255, 255, 255, 0.12)' : '#e2e8f0',
                color: isDarkMode ? '#93c5fd' : '#2563eb'
              }}
            >
              <span>Inquiry-Based Learning</span>
              <span className="font-extrabold text-purple-600">Verified</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};
