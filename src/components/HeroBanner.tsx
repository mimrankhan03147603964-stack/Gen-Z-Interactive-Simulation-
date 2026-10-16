import React, { useState, useEffect } from 'react';
import { Clock, Sparkles, Layers, Play, Radio, ExternalLink, Zap } from 'lucide-react';
import { SimulationItem } from '../types';
import { SIMULATIONS_LIST } from '../data/simulationsData';
import { openSimulationInNewTab, getSimulationStandaloneUrl } from '../utils/navigation';
import { TopicRealisticIcon } from './TopicRealisticIcon';
import { getSimTheme } from '../data/simTheme';

interface HeroBannerProps {
  activeSim?: SimulationItem | null;
  isDarkMode?: boolean;
  onSelectSim?: (sim: SimulationItem) => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ activeSim, isDarkMode = false, onSelectSim }) => {
  const [time, setTime] = useState<string>('');
  const [period, setPeriod] = useState<string>('PM');
  const [dateStr, setDateStr] = useState<string>('');

  // UPDATE 3: 1-Second Live Showcase Carousel State
  const [showcaseIndex, setShowcaseIndex] = useState<number>(0);
  const [isShowcaseHovered, setIsShowcaseHovered] = useState<boolean>(false);

  // Filter only valid, currently existing simulations in database
  const validSims = SIMULATIONS_LIST.filter(
    (s) =>
      s.indexNumber !== '53' &&
      s.indexNumber !== '55' &&
      s.id !== 'sim-cambridge-scholar-parts-of-speech-lab' &&
      s.id !== 'sim-urdu-grammar'
  );

  // Digital clock updater
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      
      let hours = now.getHours();
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12;
      const formattedHours = String(hours).padStart(2, '0');

      setTime(`${formattedHours}:${minutes}:${seconds}`);
      setPeriod(ampm);

      const weekday = now.toLocaleDateString('en-US', { weekday: 'long' });
      const day = String(now.getDate()).padStart(2, '0');
      const month = now.toLocaleDateString('en-US', { month: 'long' });
      const year = now.getFullYear();

      setDateStr(`${weekday} , ${day} ${month} ${year}`);
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // UPDATE 3: High-Speed 1-Second Auto-Rotation Showcase Carousel
  // Strict 1000ms transition speed, pausing automatically on hover
  useEffect(() => {
    if (isShowcaseHovered || validSims.length === 0) return;
    const interval = setInterval(() => {
      setShowcaseIndex((prev) => (prev + 1) % validSims.length);
    }, 1000);
    return () => clearInterval(interval);
  }, [isShowcaseHovered, validSims.length]);

  const currentShowcaseSim = validSims[showcaseIndex % validSims.length] || validSims[0];
  const showcaseTheme = getSimTheme(currentShowcaseSim?.indexNumber || '01');

  const handleLaunchShowcase = (sim: SimulationItem) => {
    if (onSelectSim) {
      onSelectSim(sim);
    } else {
      openSimulationInNewTab(sim);
    }
  };

  return (
    <div className="relative group w-full">
      {/* Soft Ambient Cyan & Purple Glow Lights Behind Card Corners for Futuristic 3D Depth */}
      <div 
        className="absolute -top-6 -left-6 w-72 h-72 rounded-full pointer-events-none -z-10 blur-3xl opacity-30 transition-opacity"
        style={{ background: 'radial-gradient(circle, rgba(56, 189, 248, 0.4) 0%, transparent 70%)' }}
      />
      <div 
        className="absolute -bottom-6 -right-6 w-72 h-72 rounded-full pointer-events-none -z-10 blur-3xl opacity-30 transition-opacity"
        style={{ background: 'radial-gradient(circle, rgba(168, 85, 247, 0.35) 0%, transparent 70%)' }}
      />

      {/* UPDATE 2: Top Main Large Dark Card/Banner with Rich 3D Science & Technology Background Effect */}
      <div 
        className="w-full rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden transition-all text-white opacity-100"
        style={{
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          backgroundColor: 'rgba(8, 14, 28, 0.94)',
          backgroundImage: 'radial-gradient(ellipse at 50% 0%, rgba(30, 58, 138, 0.38) 0%, rgba(8, 14, 28, 0.97) 75%)',
          borderColor: 'rgba(56, 189, 248, 0.28)',
          borderWidth: '1.5px',
          borderStyle: 'solid',
          boxShadow: '0 25px 60px 0 rgba(0, 0, 0, 0.75), 0 0 50px rgba(6, 182, 212, 0.12), inset 0 1px 2px rgba(255, 255, 255, 0.15)',
          color: '#ffffff'
        }}
      >
        {/* =========================================================================
            UPDATE 2: RICH 3D SCIENCE & TECHNOLOGY HOLOGRAPHIC BACKGROUND PATTERN
            Subtle, deep, semi-transparent 3D finish (curves, equations, orbits & grids)
            Confined strictly to this top dark card banner only.
            ========================================================================= */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
          
          {/* 1. 3D Perspective Grid Mesh (Isometric Cyber Horizon) */}
          <svg className="absolute inset-0 w-full h-full opacity-25" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="grid3dGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.45" />
                <stop offset="60%" stopColor="#0891b2" stopOpacity="0.18" />
                <stop offset="100%" stopColor="#1e1b4b" stopOpacity="0.02" />
              </linearGradient>
              <pattern id="perspectiveGrid" width="48" height="48" patternUnits="userSpaceOnUse">
                <path d="M 48 0 L 0 0 0 48" fill="none" stroke="url(#grid3dGrad)" strokeWidth="0.8" />
                <circle cx="0" cy="0" r="1.5" fill="#38bdf8" opacity="0.6" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#perspectiveGrid)" />
          </svg>

          {/* 2. 3D Holographic Orbits, Ellipses & Quantum Wave Trajectories */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1200 600" preserveAspectRatio="none" fill="none">
            <defs>
              <linearGradient id="holoCyanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.5" />
                <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#6366f1" stopOpacity="0.05" />
              </linearGradient>
              <linearGradient id="holoGoldGrad" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.4" />
                <stop offset="50%" stopColor="#f59e0b" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#d97706" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="waveInterference" x1="0%" y1="50%" x2="100%" y2="50%">
                <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.35" />
                <stop offset="50%" stopColor="#a855f7" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.2" />
              </linearGradient>
            </defs>

            {/* Dimensional Elliptical Orbits */}
            <ellipse cx="600" cy="220" rx="480" ry="140" stroke="url(#holoCyanGrad)" strokeWidth="1.8" strokeDasharray="14 10" transform="rotate(-7 600 220)" />
            <ellipse cx="600" cy="220" rx="360" ry="90" stroke="url(#holoGoldGrad)" strokeWidth="1.4" strokeDasharray="8 6" transform="rotate(12 600 220)" />
            <ellipse cx="600" cy="220" rx="220" ry="60" stroke="#38bdf8" strokeWidth="1" strokeOpacity="0.3" transform="rotate(-18 600 220)" />

            {/* Holographic Science Curves / Sine Waves */}
            <path d="M-50,180 Q150,80 350,190 T750,160 T1150,220 T1350,140" stroke="url(#waveInterference)" strokeWidth="2" fill="none" opacity="0.6" />
            <path d="M-50,230 Q200,320 450,210 T850,240 T1250,180" stroke="url(#holoCyanGrad)" strokeWidth="1.5" fill="none" opacity="0.45" />

            {/* Glowing Coordinate Nodes on Orbits */}
            <circle cx="210" cy="185" r="3.5" fill="#38bdf8" filter="drop-shadow(0 0 6px #38bdf8)" />
            <circle cx="890" cy="280" r="3" fill="#fbbf24" filter="drop-shadow(0 0 6px #fbbf24)" />
            <circle cx="1020" cy="150" r="2.5" fill="#2dd4bf" filter="drop-shadow(0 0 5px #2dd4bf)" />
            <circle cx="440" cy="120" r="2.5" fill="#a78bfa" filter="drop-shadow(0 0 5px #a78bfa)" />
          </svg>

          {/* 3. Faint Glowing Science & Math Equations in Glowing Blues, Golds & Teals */}
          <div className="absolute inset-0 pointer-events-none font-mono text-xs font-black tracking-widest overflow-hidden opacity-30 select-none">
            <span className="absolute top-6 left-1/4 text-cyan-400 drop-shadow-[0_0_8px_rgba(56,189,248,0.5)]">
              E = mc²
            </span>
            <span className="absolute top-20 right-1/3 text-amber-300 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]">
              ∇ × B = μ₀J + μ₀ε₀(∂E/∂t)
            </span>
            <span className="absolute bottom-28 left-16 text-teal-300 drop-shadow-[0_0_8px_rgba(45,212,191,0.5)]">
              iℏ(∂ψ/∂t) = Ĥψ
            </span>
            <span className="absolute top-1/2 left-8 text-sky-300 drop-shadow-[0_0_6px_rgba(56,189,248,0.4)]">
              F = G(m₁m₂)/r²
            </span>
            <span className="absolute bottom-24 right-20 text-yellow-300 drop-shadow-[0_0_8px_rgba(253,224,71,0.5)]">
              λ = h/p
            </span>
            <span className="absolute top-12 right-12 text-cyan-300 drop-shadow-[0_0_6px_rgba(34,211,238,0.4)]">
              PV = nRT
            </span>
            <span className="absolute bottom-1/2 right-1/4 text-emerald-300 drop-shadow-[0_0_6px_rgba(110,231,183,0.4)]">
              e^(iπ) + 1 = 0
            </span>
          </div>

          {/* 4. Translucent Radial Sheen Mask for Uncompromised High-Contrast Text Legibility */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(circle at 50% 40%, rgba(8, 14, 28, 0.72) 0%, rgba(8, 14, 28, 0.92) 100%)'
            }}
          />
        </div>

        {/* Top Row: Pill Badge on Left + Digital Clock Widget on Right (Zero edit buttons, strictly view-only) */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-5 relative z-10">
          
          {/* Left Pill Badge - Modern Glassmorphism */}
          <div 
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black tracking-wide uppercase shadow-md"
            style={{
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              backgroundColor: 'rgba(15, 23, 42, 0.85)',
              borderColor: 'rgba(56, 189, 248, 0.35)',
              borderWidth: '1px',
              borderStyle: 'solid',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.35), 0 0 12px rgba(56, 189, 248, 0.15)',
              color: '#ffffff'
            }}
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-300 drop-shadow-xs" />
            <span className="font-black text-white tracking-wider">GEN Z EDTECH SIMULATION PORTAL</span>
            <span 
              className="px-2 py-0.5 rounded text-[10px] font-black shadow-xs font-mono"
              style={{ backgroundColor: '#fbbf24', color: '#090d16' }}
            >
              4K 3D
            </span>
          </div>

          {/* Right Area: Crisp Frosted Glass Digital Clock Widget (Original Compact Size) */}
          <div className="flex items-center gap-2 flex-wrap ml-auto sm:ml-0">
            <div 
              className="px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full shadow-md flex items-center gap-2 sm:gap-2.5 transition-all"
              style={{
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                backgroundColor: 'rgba(11, 19, 38, 0.88)',
                borderColor: 'rgba(56, 189, 248, 0.35)',
                borderWidth: '1px',
                borderStyle: 'solid',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.45), 0 0 15px rgba(56, 189, 248, 0.15)',
                color: '#ffffff'
              }}
            >
              <div 
                className="flex items-center gap-1.5 font-mono font-bold text-xs sm:text-sm tracking-wide"
                style={{ color: '#fef08a' }}
              >
                <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-300 animate-pulse shrink-0 drop-shadow-xs" />
                <span className="font-bold text-amber-200">{time || '00:00:00'}</span>
              </div>

              <span 
                className="px-1.5 py-0.5 rounded text-[10px] font-black uppercase shadow-xs font-mono"
                style={{ backgroundColor: '#ffffff', color: '#090d16' }}
              >
                {period}
              </span>

              <span className="text-emerald-400 font-bold text-xs">|</span>

              <span className="font-semibold whitespace-nowrap text-[11px] sm:text-xs text-white tracking-wide drop-shadow-xs">
                {dateStr || 'Loading date...'}
              </span>
            </div>
          </div>

        </div>

        {/* Main Headline & Monogram Showcase */}
        <div className="relative z-10 my-3 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex-1">
            <h1 
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight"
              style={{
                textShadow: '0 2px 14px rgba(0, 0, 0, 0.7), 0 0 30px rgba(56, 189, 248, 0.25)'
              }}
            >
              Gen Z EdTech Interactive Simulation
            </h1>
            <p className="mt-3 text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed font-semibold opacity-100">
              Explore authentic interactive STEM laboratories across physics mechanics, electricity, chemistry reactions, cellular biology, celestial mechanics, mathematics, computer science, linguistics, and early childhood care &amp; education (ECCE). Switch seamlessly across all {SIMULATIONS_LIST.length} modules with single-click direct execution in 4K high fidelity.
            </p>
          </div>

          {/* Official Monogram Emblem: Solid White Background (#FFFFFF) with Proper Padding and Rounded Borders for Sharp Contrast */}
          <div className="shrink-0 flex items-center justify-center monogram-3d-stage my-2 md:my-0 self-center overflow-visible">
            <div 
              className="monogram-3d-card relative rounded-3xl p-3 sm:p-4 flex items-center justify-center cursor-pointer transition-all overflow-visible shadow-xl"
              style={{
                backgroundColor: '#FFFFFF',
                borderColor: '#e2e8f0',
                borderWidth: '2px',
                borderStyle: 'solid',
                boxShadow: '0 12px 36px rgba(0, 0, 0, 0.4), 0 0 25px rgba(255, 255, 255, 0.3)',
                width: '210px',
                maxWidth: '100%',
                height: '165px'
              }}
              title="Gen Z EdTech Official Monogram - Interactive Dimensional Emblem"
            >
              {/* Dimensional Monogram Element */}
              <div className="monogram-3d-element relative z-10 w-full h-full flex items-center justify-center overflow-visible">
                <img 
                  src="/genz-edtech-monogram.svg" 
                  alt="Gen Z EdTech Official Monogram Logo" 
                  className="w-full h-full max-w-full max-h-full object-contain block mx-auto select-none"
                  style={{ objectFit: 'contain' }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Website Action Buttons with High-Contrast Obsidian Theme Styling */}
        <div className="relative z-10 my-4 flex items-center gap-3.5 flex-wrap">
          <a
            href="#catalog"
            className="btn-3d px-5 py-2.5 rounded-xl text-xs sm:text-sm font-black flex items-center gap-2 shadow-lg cursor-pointer transition-transform hover:scale-[1.02] active:scale-95"
            style={{
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              backgroundColor: '#f59e0b',
              backgroundImage: 'linear-gradient(135deg, #fbbf24 0%, #d97706 100%)',
              borderColor: '#fde047',
              borderWidth: '1.5px',
              borderStyle: 'solid',
              color: '#090d16',
              boxShadow: '0 4px 18px rgba(245, 158, 11, 0.35)'
            }}
          >
            <Layers className="w-4 h-4 text-slate-950 font-black" />
            <span>Explore All Labs Grid</span>
          </a>
          <a
            href="#catalog"
            className="btn-3d px-5 py-2.5 rounded-xl text-xs sm:text-sm font-black flex items-center gap-2 shadow-lg cursor-pointer transition-transform hover:scale-[1.02] active:scale-95 text-white"
            style={{
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              backgroundColor: '#059669',
              backgroundImage: 'linear-gradient(135deg, #10b981 0%, #047857 100%)',
              borderColor: '#34d399',
              borderWidth: '1.5px',
              borderStyle: 'solid',
              color: '#ffffff',
              boxShadow: '0 4px 18px rgba(16, 185, 129, 0.3)'
            }}
          >
            <Play className="w-4 h-4 fill-current text-white font-black" />
            <span>Interactive Stage &amp; Dedicated Tabs</span>
          </a>
        </div>

        {/* Continuous Right-to-Left Live Bulletin Ticker with Frosted Glass Styling (Hover to Pause) */}
        <div 
          className="ticker-container group/ticker relative z-10 mt-4 rounded-xl text-xs flex items-center overflow-hidden shadow-lg select-none"
          title="Live STEM Bulletin — Hover to pause scrolling, click any lab to open"
          style={{
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            backgroundColor: 'rgba(15, 23, 42, 0.85)',
            borderColor: 'rgba(255, 255, 255, 0.14)',
            borderWidth: '1px',
            borderStyle: 'solid',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
            color: '#ffffff'
          }}
        >
          {/* Fixed Left Badge: Live STEM Bulletin */}
          <div 
            className="shrink-0 z-20 px-3.5 py-2.5 flex items-center gap-2 font-black uppercase tracking-wider text-[11px] shadow-lg"
            style={{
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              backgroundColor: 'rgba(37, 99, 235, 0.95)',
              backgroundImage: 'linear-gradient(135deg, rgba(59, 130, 246, 0.95) 0%, rgba(29, 78, 216, 0.95) 100%)',
              borderRight: '1px solid rgba(255, 255, 255, 0.2)',
              color: '#ffffff'
            }}
          >
            <Radio className="w-3.5 h-3.5 animate-pulse text-yellow-300" />
            <span className="whitespace-nowrap">LIVE STEM BULLETIN</span>
            <span className="hidden lg:inline text-[9px] font-normal tracking-normal text-blue-100 opacity-80">(HOVER PAUSES)</span>
          </div>

          {/* Endless Seamless Marquee Viewport with Slow Reading Speed & Pause on Hover */}
          <div className="flex-1 overflow-hidden relative py-2.5 cursor-pointer">
            <div className="animate-marquee-infinite flex items-center">
              
              {/* Copy 1 of All Simulations */}
              <div className="flex items-center shrink-0">
                {validSims.map((sim) => (
                  <a 
                    key={`sim-ticker-1-${sim.id}`} 
                    href={getSimulationStandaloneUrl(sim)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center shrink-0 mr-8 hover:opacity-85 transition-opacity cursor-pointer text-inherit no-underline"
                    title={`Open ${sim.title} in new tab`}
                  >
                    <span 
                      className="inline-block px-1.5 py-0.5 rounded text-[10px] font-black mr-2 shadow-xs"
                      style={{ backgroundColor: sim.accentColor, color: '#ffffff' }}
                    >
                      LAB {sim.indexNumber}
                    </span>
                    <span className="font-extrabold text-amber-300 mr-1.5">
                      {sim.title}
                    </span>
                    <span className="text-slate-300 text-[11px] font-medium mr-2">
                      ({sim.category}) &mdash; {sim.description}
                    </span>
                    <span className="text-cyan-400 font-bold mx-2">★</span>
                  </a>
                ))}
              </div>

              {/* Copy 2 of All Simulations */}
              <div className="flex items-center shrink-0">
                {validSims.map((sim) => (
                  <a 
                    key={`sim-ticker-2-${sim.id}`} 
                    href={getSimulationStandaloneUrl(sim)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center shrink-0 mr-8 hover:opacity-85 transition-opacity cursor-pointer text-inherit no-underline"
                    title={`Open ${sim.title} in new tab`}
                  >
                    <span 
                      className="inline-block px-1.5 py-0.5 rounded text-[10px] font-black mr-2 shadow-xs"
                      style={{ backgroundColor: sim.accentColor, color: '#ffffff' }}
                    >
                      LAB {sim.indexNumber}
                    </span>
                    <span className="font-extrabold text-amber-300 mr-1.5">
                      {sim.title}
                    </span>
                    <span className="text-slate-300 text-[11px] font-medium mr-2">
                      ({sim.category}) &mdash; {sim.description}
                    </span>
                    <span className="text-cyan-400 font-bold mx-2">★</span>
                  </a>
                ))}
              </div>

            </div>
          </div>

        </div>

        {/* =========================================================================
            UPDATE 3: ADD 1-SECOND LIVE SHOWCASE / SPOTLIGHT AUTO-ROTATOR (NEW)
            High-speed 1000ms transition auto-changing carousel, pausing on hover,
            featuring strictly valid database simulation labs with 1s smooth transitions.
            ========================================================================= */}
        {currentShowcaseSim && (
          <div 
            className="relative z-10 mt-4 rounded-xl border shadow-xl transition-all duration-300 overflow-hidden"
            onMouseEnter={() => setIsShowcaseHovered(true)}
            onMouseLeave={() => setIsShowcaseHovered(false)}
            style={{
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              backgroundColor: 'rgba(10, 20, 42, 0.88)',
              borderColor: 'rgba(56, 189, 248, 0.4)',
              borderWidth: '1.5px',
              borderStyle: 'solid',
              boxShadow: `0 8px 30px rgba(0, 0, 0, 0.5), 0 0 20px ${showcaseTheme.glowColor}`
            }}
          >
            {/* Top Bar: LIVE SHOWCASE (Auto-changing every second...) Label */}
            <div 
              className="px-4 py-2 border-b flex items-center justify-between flex-wrap gap-2 transition-colors"
              style={{
                backgroundColor: 'rgba(15, 23, 42, 0.75)',
                borderColor: 'rgba(56, 189, 248, 0.25)'
              }}
            >
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <span className="font-mono text-[11px] sm:text-xs font-black uppercase tracking-wider text-cyan-300 flex items-center gap-1.5">
                  LIVE SHOWCASE (Auto-changing every second...)
                </span>
              </div>

              <div className="flex items-center gap-2 text-[10px] sm:text-[11px] font-bold">
                <span 
                  className={`px-2 py-0.5 rounded font-mono font-black ${
                    isShowcaseHovered 
                      ? 'bg-amber-400/20 text-amber-300 border border-amber-400/40' 
                      : 'bg-blue-500/20 text-blue-300 border border-blue-400/30'
                  }`}
                >
                  {isShowcaseHovered ? 'PAUSED ON HOVER' : 'AUTO-ROTATING (1s)'}
                </span>
                <span className="font-mono text-slate-400">
                  Lab {currentShowcaseSim.indexNumber} of {validSims.length}
                </span>
              </div>
            </div>

            {/* Showcase Main Content: Left Column (Preview Thumbnail) & Right Column (Details + CTA Button) */}
            <div 
              key={currentShowcaseSim.id}
              className="p-4 sm:p-5 flex flex-col sm:flex-row items-center sm:items-stretch gap-4 sm:gap-6 transition-opacity duration-300"
            >
              {/* Left Column: Simulation Actual Preview Image / Vector Emblem */}
              <div className="shrink-0 flex items-center justify-center">
                <a
                  href={getSimulationStandaloneUrl(currentShowcaseSim)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleLaunchShowcase(currentShowcaseSim);
                  }}
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl flex flex-col items-center justify-center p-2 shadow-xl cursor-pointer group-hover:scale-105 transition-transform duration-200 relative overflow-hidden"
                  style={{
                    backgroundColor: showcaseTheme.badgeBg || 'rgba(15, 23, 42, 0.95)',
                    borderColor: showcaseTheme.borderColor || '#38bdf8',
                    borderWidth: '2px',
                    borderStyle: 'solid',
                    boxShadow: `0 8px 24px ${showcaseTheme.glowColor}`
                  }}
                  title={`Launch ${currentShowcaseSim.title}`}
                >
                  <TopicRealisticIcon 
                    indexNumber={currentShowcaseSim.indexNumber}
                    simId={currentShowcaseSim.id}
                    className="w-12 h-12 sm:w-14 sm:h-14 drop-shadow-md group-hover:scale-110 transition-transform"
                  />
                  <span 
                    className="mt-1 font-mono text-[9px] font-black px-1.5 py-0.2 rounded shadow-2xs"
                    style={{
                      backgroundColor: showcaseTheme.bgSolid || '#2563eb',
                      color: '#ffffff'
                    }}
                  >
                    LAB {currentShowcaseSim.indexNumber}
                  </span>
                </a>
              </div>

              {/* Right Column: Lab Name, Class & Category, 1-Line Description, and CTA Button */}
              <div className="flex-1 min-w-0 flex flex-col justify-between text-center sm:text-left gap-2">
                <div>
                  <div className="flex items-center justify-center sm:justify-start gap-2 flex-wrap mb-1">
                    <span 
                      className="text-[11px] font-black tracking-wide uppercase px-2 py-0.5 rounded-md text-amber-300 font-mono"
                      style={{
                        backgroundColor: 'rgba(245, 158, 11, 0.15)',
                        border: '1px solid rgba(245, 158, 11, 0.3)'
                      }}
                    >
                      FEATURED SIMULATION: {currentShowcaseSim.title}
                    </span>
                  </div>

                  {/* Class & Category */}
                  <div className="text-xs font-bold text-cyan-300 flex items-center justify-center sm:justify-start gap-2 flex-wrap">
                    <span>Class: <strong className="text-white">{currentShowcaseSim.gradeLevel}</strong></span>
                    <span className="text-slate-500">•</span>
                    <span>Category: <strong className="text-white">{currentShowcaseSim.category}</strong></span>
                  </div>

                  {/* Brief 1-Line Description */}
                  <p className="mt-1.5 text-xs text-slate-300 font-medium line-clamp-1 leading-relaxed">
                    {currentShowcaseSim.description}
                  </p>
                </div>

                {/* Highly Visible CTA Button: Launch Simulation Now 🚀 */}
                <div className="mt-2 flex items-center justify-center sm:justify-start">
                  <a
                    href={getSimulationStandaloneUrl(currentShowcaseSim)}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLaunchShowcase(currentShowcaseSim);
                    }}
                    className="btn-3d px-5 py-2 rounded-xl text-xs sm:text-sm font-black flex items-center gap-2 shadow-lg cursor-pointer transition-transform hover:scale-105 active:scale-95 text-white"
                    style={{
                      backgroundColor: '#10b981',
                      backgroundImage: 'linear-gradient(135deg, #059669 0%, #10b981 50%, #06b6d4 100%)',
                      borderColor: '#34d399',
                      borderWidth: '1.5px',
                      borderStyle: 'solid',
                      boxShadow: '0 4px 18px rgba(16, 185, 129, 0.4), 0 0 12px rgba(6, 182, 212, 0.3)'
                    }}
                    title={`Launch ${currentShowcaseSim.title} immediately`}
                  >
                    <Zap className="w-4 h-4 fill-current text-yellow-300 animate-pulse" />
                    <span>Launch Simulation Now 🚀</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
