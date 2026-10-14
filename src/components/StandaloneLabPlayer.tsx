import React, { useRef, useState, useEffect } from 'react';
import { SimulationItem } from '../types';
import { getSimTheme } from '../data/simTheme';
import { 
  Maximize2, 
  RotateCcw, 
  ExternalLink, 
  Sparkles, 
  Layers, 
  GraduationCap, 
  Sliders, 
  BarChart3, 
  HelpCircle, 
  ArrowLeft,
  CheckCircle2,
  Atom,
  ChevronRight,
  Sun,
  Moon,
  Compass
} from 'lucide-react';
import { TopicRealisticIcon } from './TopicRealisticIcon';

interface StandaloneLabPlayerProps {
  sim: SimulationItem;
  totalSimulations?: number;
  onBackToCatalog?: () => void;
}

export const StandaloneLabPlayer: React.FC<StandaloneLabPlayerProps> = ({
  sim,
  totalSimulations = 33,
  onBackToCatalog
}) => {
  const [aspectRatio, setAspectRatio] = useState<'16:9' | '4:3' | 'full'>('full');
  const [iframeHeight, setIframeHeight] = useState<number>(850);
  const [isReloading, setIsReloading] = useState(false);
  const [isNativeFs, setIsNativeFs] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const theme = getSimTheme(sim.indexNumber);

  // Measure and synchronize the natural content height of the simulation document
  const syncIframeHeight = React.useCallback(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    try {
      const doc = iframe.contentDocument || iframe.contentWindow?.document;
      if (!doc || !doc.body) return;

      // Strip inner scrollbars from the iframe document
      doc.documentElement.style.overflowX = 'hidden';
      doc.documentElement.style.overflowY = 'hidden';
      doc.body.style.overflowX = 'hidden';
      doc.body.style.overflowY = 'hidden';

      // Check whether this simulation has structured document cards/tabs
      const hasEducationalCards = !!doc.querySelector(
        '.container, .card, .tabs, .tab-btn, .section-tabs, #topicsContainer, .grid-3, .quiz, .theory, .sim-readout, .teacher-note'
      );

      const bodyScroll = doc.body.scrollHeight || 0;
      const docScroll = doc.documentElement.scrollHeight || 0;
      const bodyOffset = doc.body.offsetHeight || 0;
      const docOffset = doc.documentElement.offsetHeight || 0;

      let contentH = Math.max(bodyScroll, docScroll, bodyOffset, docOffset);

      if (!hasEducationalCards) {
        // For single-screen canvas simulations, provide a generous, expansive full-viewport stage
        contentH = Math.max(window.innerHeight - 140, 760);
      } else {
        // For educational document simulations with cards/tabs, expand to full natural height
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

      // Inject style to suppress inner scrollbars inside iframe document
      const styleId = 'genz-kill-inner-scrollbar';
      if (!doc.getElementById(styleId)) {
        const style = doc.createElement('style');
        style.id = styleId;
        style.textContent = `
          html, body {
            overflow: hidden !important;
            overflow-x: hidden !important;
            overflow-y: hidden !important;
            scrollbar-width: none !important;
            -ms-overflow-style: none !important;
          }
          html::-webkit-scrollbar, body::-webkit-scrollbar {
            display: none !important;
            width: 0 !important;
            height: 0 !important;
          }
        `;
        doc.head?.appendChild(style);
      }

      syncIframeHeight();

      if (doc.body) {
        // MutationObserver for tab switching, panel toggles, accordion updates
        const mo = new MutationObserver(() => {
          syncIframeHeight();
        });
        mo.observe(doc.body, { childList: true, subtree: true, attributes: true, characterData: true });

        // ResizeObserver on the iframe document body
        if (iframe.contentWindow && 'ResizeObserver' in iframe.contentWindow) {
          const ro = new (iframe.contentWindow as any).ResizeObserver(() => {
            syncIframeHeight();
          });
          ro.observe(doc.body);
        }

        // Click listeners on buttons/tabs inside the simulation
        doc.addEventListener('click', () => {
          setTimeout(syncIframeHeight, 50);
          setTimeout(syncIframeHeight, 150);
          setTimeout(syncIframeHeight, 350);
        });
      }
    } catch {
      // Cross-origin fallback
    }
  };

  useEffect(() => {
    syncIframeHeight();
    const handleResize = () => syncIframeHeight();
    window.addEventListener('resize', handleResize);

    // Initial polling interval for dynamically rendered canvases and math fonts
    const interval = setInterval(syncIframeHeight, 600);
    const timer = setTimeout(() => clearInterval(interval), 3600);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [sim, aspectRatio, syncIframeHeight]);

  useEffect(() => {
    // Dynamically set document title to the simulation name
    const originalTitle = document.title;
    document.title = `[${sim.indexNumber}] ${sim.title} — Gen Z EdTech Lab`;
    return () => {
      document.title = originalTitle;
    };
  }, [sim]);

  useEffect(() => {
    const handleFsChange = () => {
      setIsNativeFs(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFsChange);
    };
  }, []);

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

  const handleToggleFullscreen = () => {
    if (!document.fullscreenElement) {
      if (containerRef.current) {
        containerRef.current.requestFullscreen().catch(() => {});
      } else {
        document.documentElement.requestFullscreen().catch(() => {});
      }
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  const handleReturnToPortal = () => {
    if (onBackToCatalog) {
      onBackToCatalog();
    } else {
      // Remove query param without losing history
      const cleanUrl = window.location.origin + window.location.pathname;
      window.location.href = cleanUrl;
    }
  };

  return (
    <div 
      ref={containerRef}
      className="min-h-screen flex flex-col font-sans select-none antialiased transition-colors duration-200"
      style={{
        backgroundColor: isDarkMode ? '#040a1c' : '#f8fafc',
        backgroundImage: isDarkMode
          ? 'radial-gradient(circle at 15% 15%, rgba(30, 58, 138, 0.3) 0%, transparent 45%), radial-gradient(circle at 85% 65%, rgba(14, 116, 144, 0.22) 0%, transparent 45%)'
          : 'radial-gradient(circle at 15% 15%, rgba(219, 234, 254, 0.7) 0%, transparent 45%), radial-gradient(circle at 85% 60%, rgba(224, 231, 255, 0.5) 0%, transparent 45%)',
        color: isDarkMode ? '#ffffff' : '#0f172a'
      }}
    >
      {/* 1. Dedicated Full-Screen Header Bar */}
      <header 
        className="w-full px-3 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between gap-3 shadow-md sticky top-0 z-[1000] transition-colors"
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1000,
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          backgroundColor: isDarkMode ? 'rgba(6, 15, 36, 0.94)' : 'rgba(10, 20, 44, 0.94)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.15)',
          boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.45)',
          color: '#ffffff'
        }}
      >
        {/* Left: Brand + Navigation Breadcrumb + Lab Title */}
        <div className="flex items-center gap-3 min-w-0">
          {/* Back to Portal Catalog Button */}
          <button
            type="button"
            onClick={handleReturnToPortal}
            className="btn-3d px-3 py-1.5 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer shadow-sm shrink-0"
            style={{
              backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
              color: isDarkMode ? '#93c5fd' : '#1d4ed8',
              borderColor: isDarkMode ? 'rgba(59, 130, 246, 0.4)' : '#bfdbfe',
              borderWidth: '1.5px',
              borderStyle: 'solid'
            }}
            title="Return to Main Portal STEM Catalog"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Portal Catalog</span>
          </button>

          {/* Brand Monogram */}
          <div 
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shadow-lg icon-tile-3d shrink-0 p-1 overflow-hidden hidden md:flex"
            style={{
              backgroundColor: isDarkMode ? 'rgba(12, 26, 59, 0.85)' : '#ffffff',
              borderColor: '#38bdf8',
              borderWidth: '1.5px',
              borderStyle: 'solid',
              boxShadow: '0 4px 12px rgba(2, 132, 199, 0.35)'
            }}
          >
            <img 
              src="/genz-edtech-symbol.svg" 
              alt="Gen Z EdTech" 
              className="w-full h-full object-contain" 
            />
          </div>

          {/* Lab Info */}
          <div className="min-w-0 flex items-center gap-2.5">
            {/* Topic Realistic Emblem */}
            <div 
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center shrink-0 icon-tile-3d shadow-md p-1"
              style={{
                backgroundColor: theme.badgeBg,
                borderColor: theme.borderColor,
                borderWidth: '1.5px',
                borderStyle: 'solid',
                boxShadow: `0 2px 8px ${theme.glowColor}`
              }}
            >
              <TopicRealisticIcon indexNumber={sim.indexNumber} simId={sim.id} className="w-6 h-6 sm:w-7 sm:h-7" />
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2 truncate">
                <span 
                  className="font-mono text-xs font-black px-2 py-0.5 rounded shadow-2xs shrink-0"
                  style={{
                    backgroundColor: theme.bgSolid,
                    color: '#ffffff'
                  }}
                >
                  LAB [{sim.indexNumber}]
                </span>
                <h1 className="text-sm sm:text-base font-black truncate text-slate-900 dark:text-white">
                  {sim.title}
                </h1>
              <span 
                className="hidden lg:inline-block px-2.5 py-0.5 rounded-full text-[10px] font-black shrink-0"
                style={{
                  backgroundColor: isDarkMode ? '#0d224d' : theme.tagBg,
                  borderColor: theme.borderColor,
                  borderWidth: '1px',
                  borderStyle: 'solid',
                  color: isDarkMode ? '#93c5fd' : theme.tagText
                }}
              >
                {sim.category}
              </span>
            </div>
            
            {/* Developer Credit & Subtitle */}
            <div className="text-[10px] sm:text-[11px] font-bold tracking-tight flex items-center gap-2 text-slate-500 dark:text-slate-400 mt-0.5">
              <span>{sim.subject}</span>
              <span>&bull;</span>
              <span className="inline-flex items-center gap-1 font-mono">
                <span className="font-medium">Dev:</span>
                <span className="font-extrabold text-blue-600 dark:text-sky-400">M. Imran Khan</span>
              </span>
              <span className="hidden sm:inline">&bull;</span>
              <span className="hidden sm:inline font-mono text-emerald-600 dark:text-emerald-400">
                Standalone Workspace
              </span>
            </div>
            </div>
          </div>
        </div>

        {/* Right: Workspace Controls */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Light / Dark Mode Toggle */}
          <button
            type="button"
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2 rounded-xl border transition-all cursor-pointer shadow-xs hover:scale-105"
            style={{
              backgroundColor: isDarkMode ? '#0f172a' : '#ffffff',
              borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.1)',
              color: isDarkMode ? '#fde047' : '#0f172a'
            }}
            title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Reload / Reset Canvas */}
          <button
            type="button"
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
            title="Reset Simulation Canvas"
          >
            <RotateCcw className={`w-3.5 h-3.5 ${isReloading ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">Reset Engine</span>
          </button>

          {/* Fullscreen Immersion Button */}
          <button
            type="button"
            onClick={handleToggleFullscreen}
            className="btn-3d px-3 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 text-xs font-black shadow-md"
            style={{
              backgroundColor: '#2563eb',
              backgroundImage: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
              borderColor: '#60a5fa',
              borderWidth: '1.5px',
              borderStyle: 'solid',
              color: '#ffffff',
              boxShadow: '0 4px 10px rgba(37, 99, 235, 0.35)'
            }}
            title="Toggle Native Fullscreen"
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span className="hidden md:inline">{isNativeFs ? 'Exit Fullscreen' : 'Fullscreen'}</span>
          </button>

          {/* Raw File Source Link */}
          <a
            href={sim.fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-xl border transition-all cursor-pointer shadow-xs hover:scale-105 hidden sm:flex items-center justify-center"
            style={{
              backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
              borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.1)',
              color: isDarkMode ? '#94a3b8' : '#64748b'
            }}
            title="Open Raw HTML File"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </header>

      {/* 2. Main Workspace Simulation Canvas Viewport */}
      <main className="flex-1 flex flex-col p-2 sm:p-4 md:p-6 gap-4 max-w-7xl mx-auto w-full">
        {/* Interactive Canvas Container */}
        <div 
          className="w-full rounded-2xl overflow-hidden shadow-2xl relative flex flex-col transition-all border"
          style={{
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            backgroundColor: isDarkMode ? '#030712' : '#ffffff',
            borderColor: isDarkMode ? 'rgba(56, 189, 248, 0.4)' : theme.borderColor,
            borderWidth: '2px',
            borderStyle: 'solid',
            boxShadow: isDarkMode 
              ? `0 12px 40px rgba(0, 0, 0, 0.6), 0 0 24px ${theme.glowColor}` 
              : `0 12px 40px rgba(0, 0, 0, 0.12), 0 0 20px ${theme.glowColor}`
          }}
        >
          {/* Sub-bar with Live Status, Aspect Controls & Key Specs */}
          <div 
            className="px-4 py-2 flex items-center justify-between gap-3 text-xs font-bold border-b transition-colors"
            style={{
              backgroundColor: 'rgba(8, 20, 50, 0.92)',
              borderBottomColor: 'rgba(255, 255, 255, 0.12)',
              color: '#ffffff'
            }}
          >
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-xs" />
              <span className="font-mono text-[11px] font-black text-emerald-400">
                LIVE 60 FPS PHYSICS ENGINE
              </span>
              <span className="text-slate-400">&bull;</span>
              <span className="text-[11px] font-bold text-slate-300">
                Interactive Touch &amp; Mouse Controls Active
              </span>
            </div>

            {/* Viewport Scale Selector */}
            <div className="flex items-center gap-1">
              <span className="text-[10px] font-extrabold uppercase text-slate-400 mr-1 hidden sm:inline">
                Viewport:
              </span>
              <button
                type="button"
                onClick={() => setAspectRatio('full')}
                className={`px-2.5 py-0.5 rounded text-[10px] font-black uppercase transition-all cursor-pointer ${
                  aspectRatio === 'full'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300'
                }`}
                title="Full Natural Page Height (Single Unified Scrollbar)"
              >
                Full Height
              </button>
              <button
                type="button"
                onClick={() => setAspectRatio('16:9')}
                className={`px-2.5 py-0.5 rounded text-[10px] font-black uppercase transition-all cursor-pointer ${
                  aspectRatio === '16:9'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300'
                }`}
                title="16:9 Cinema View"
              >
                16:9
              </button>
              <button
                type="button"
                onClick={() => setAspectRatio('4:3')}
                className={`px-2.5 py-0.5 rounded text-[10px] font-black uppercase transition-all cursor-pointer ${
                  aspectRatio === '4:3'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300'
                }`}
                title="4:3 Ratio View"
              >
                4:3
              </button>
            </div>
          </div>

          {/* The Live Interactive Engine Iframe - Expands Naturally with Single Page Scroll */}
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
                  minHeight: '680px'
                }}
              >
                <iframe
                  ref={iframeRef}
                  src={sim.fileUrl}
                  title={`${sim.title} Interactive Simulation`}
                  className="w-full border-0 block"
                  style={{
                    height: calculatedHeight,
                    minHeight: '680px',
                    overflow: 'hidden'
                  }}
                  scrolling="no"
                  onLoad={handleIframeLoad}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                  loading="eager"
                />
              </div>
            );
          })()}
        </div>

        {/* 3. Concept Overview, Interactive Controls & Learning Objectives */}
        <div 
          className="w-full rounded-2xl border p-5 sm:p-6 transition-colors shadow-lg"
          style={{
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            backgroundColor: isDarkMode ? 'rgba(8, 20, 50, 0.75)' : 'rgba(255, 255, 255, 0.85)',
            borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.15)' : 'rgba(226, 232, 240, 0.9)',
            borderWidth: '1.5px',
            borderStyle: 'solid'
          }}
        >
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200 dark:border-slate-800">
            <div>
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-blue-600 dark:text-cyan-400 mb-1">
                <GraduationCap className="w-4 h-4" />
                <span>Pedagogical Core &amp; Scientific Concept Overview</span>
              </div>
              <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
                {sim.title}
              </h2>
            </div>
            
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-3 py-1 rounded-full text-xs font-black bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 border border-blue-300 dark:border-blue-700">
                Grade: {sim.gradeLevel || 'Secondary to University'}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-black bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700">
                Active Lab #{sim.indexNumber}
              </span>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm font-bold text-slate-700 dark:text-slate-300 leading-relaxed mt-4">
            {sim.description}
          </p>

          {/* Key Learning Topics & Verified Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
            {/* Topics */}
            <div 
              className="p-4 rounded-xl border"
              style={{
                backgroundColor: isDarkMode ? 'rgba(12, 27, 61, 0.65)' : 'rgba(248, 250, 252, 0.8)',
                borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.12)' : '#e2e8f0'
              }}
            >
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-1.5 mb-2.5">
                <Layers className="w-3.5 h-3.5 text-blue-500" />
                <span>Core Scientific Topics</span>
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {sim.topics.map((topic, i) => (
                  <span
                    key={i}
                    className="text-xs font-bold px-2.5 py-1 rounded-lg border"
                    style={{
                      backgroundColor: isDarkMode ? '#0f172a' : theme.tagBg,
                      color: isDarkMode ? '#cbd5e1' : theme.tagText,
                      borderColor: isDarkMode ? '#1e3a8a' : theme.badgeBorder
                    }}
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>

            {/* Features */}
            <div 
              className="p-4 rounded-xl border"
              style={{
                backgroundColor: isDarkMode ? 'rgba(12, 27, 61, 0.65)' : 'rgba(248, 250, 252, 0.8)',
                borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.12)' : '#e2e8f0'
              }}
            >
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-1.5 mb-2.5">
                <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
                <span>Simulation Features &amp; Sensors</span>
              </h3>
              <ul className="space-y-1.5">
                {sim.features.map((feat, i) => (
                  <li key={i} className="text-xs font-bold text-slate-600 dark:text-slate-300 flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 3 Guided Inquiry Columns */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mt-5">
            <div 
              className="p-3.5 rounded-xl border"
              style={{
                backgroundColor: isDarkMode ? 'rgba(12, 27, 61, 0.5)' : '#ffffff',
                borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : '#e2e8f0'
              }}
            >
              <div className="text-xs font-black uppercase tracking-wider text-blue-600 dark:text-sky-400 flex items-center gap-1 mb-1.5">
                <Sliders className="w-3.5 h-3.5" />
                <span>1. Experiment</span>
              </div>
              <p className="text-xs font-bold text-slate-600 dark:text-slate-300 leading-relaxed">
                Interact with the sliders, toggle switches, charge generators, or step through variables directly on the canvas.
              </p>
            </div>

            <div 
              className="p-3.5 rounded-xl border"
              style={{
                backgroundColor: isDarkMode ? 'rgba(12, 27, 61, 0.5)' : '#ffffff',
                borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : '#e2e8f0'
              }}
            >
              <div className="text-xs font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-1 mb-1.5">
                <BarChart3 className="w-3.5 h-3.5" />
                <span>2. Measure</span>
              </div>
              <p className="text-xs font-bold text-slate-600 dark:text-slate-300 leading-relaxed">
                Observe live numerical readouts, vectors, formula outputs, and scientific telemetry generated continuously at 60 FPS.
              </p>
            </div>

            <div 
              className="p-3.5 rounded-xl border"
              style={{
                backgroundColor: isDarkMode ? 'rgba(12, 27, 61, 0.5)' : '#ffffff',
                borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : '#e2e8f0'
              }}
            >
              <div className="text-xs font-black uppercase tracking-wider text-purple-600 dark:text-purple-400 flex items-center gap-1 mb-1.5">
                <HelpCircle className="w-3.5 h-3.5" />
                <span>3. Deduce</span>
              </div>
              <p className="text-xs font-bold text-slate-600 dark:text-slate-300 leading-relaxed">
                Compare how altering individual parameters affects system equilibrium, wave frequencies, or mechanical forces.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* 4. Standalone Player Footer */}
      <footer 
        className="w-full py-4 px-6 border-t mt-auto text-center text-xs font-bold transition-colors"
        style={{
          backgroundColor: isDarkMode ? 'rgba(6, 15, 36, 0.9)' : 'rgba(255, 255, 255, 0.9)',
          borderTopColor: isDarkMode ? 'rgba(255, 255, 255, 0.12)' : '#e2e8f0',
          color: isDarkMode ? '#94a3b8' : '#64748b'
        }}
      >
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-slate-900 dark:text-white">
              Gen Z EdTech Interactive Simulation
            </span>
            <span>&bull;</span>
            <span>{totalSimulations} Verified Digital Simulators</span>
          </div>
          <div className="flex items-center gap-2 font-mono">
            <span>Developer:</span>
            <span className="font-black text-blue-600 dark:text-sky-400">M. Imran Khan</span>
            <span>&bull;</span>
            <button
              type="button"
              onClick={handleReturnToPortal}
              className="text-xs font-black text-blue-600 dark:text-sky-400 hover:underline cursor-pointer"
            >
              Back to Catalog Portal
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};
