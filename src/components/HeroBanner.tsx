import React, { useState, useEffect, useRef } from 'react';
import { Clock, Sparkles, Layers, Play, Radio, ExternalLink } from 'lucide-react';
import { SimulationItem } from '../types';
import { SIMULATIONS_LIST } from '../data/simulationsData';
import { openSimulationInNewTab, getSimulationStandaloneUrl } from '../utils/navigation';
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

  // UPDATE 2: 5-Second Interval Timer & Fluid Right-to-Left Carousel Slider State
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [nextIndex, setNextIndex] = useState<number | null>(null);
  const [isSliding, setIsSliding] = useState<boolean>(false);
  const [isShowcaseHovered, setIsShowcaseHovered] = useState<boolean>(false);

  // Filter only valid, currently existing simulations in database
  const validSims = SIMULATIONS_LIST.filter(
    (s) =>
      s.indexNumber !== '53' &&
      s.indexNumber !== '55' &&
      s.id !== 'sim-cambridge-scholar-parts-of-speech-lab' &&
      s.id !== 'sim-urdu-grammar'
  );

  // Digital clock widget
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

  // UPDATE 2: Strict 5-Second (5000ms) Timer with Fluid Right-to-Left Slide Animation
  // Pauses automatically on hover or direct interaction with controls
  useEffect(() => {
    if (isShowcaseHovered || validSims.length === 0) return;

    const timer = setInterval(() => {
      const target = (currentIndex + 1) % validSims.length;
      setNextIndex(target);

      // Trigger the slide on the next micro-frame for smooth CSS animation
      requestAnimationFrame(() => {
        setIsSliding(true);
      });

      // Complete slide transition after 700ms
      setTimeout(() => {
        setCurrentIndex(target);
        setNextIndex(null);
        setIsSliding(false);
      }, 700);
    }, 5000); // Strictly 5 seconds (5000ms)

    return () => clearInterval(timer);
  }, [currentIndex, isShowcaseHovered, validSims.length]);

  const currentSim = validSims[currentIndex % validSims.length] || validSims[0];
  const nextSim = nextIndex !== null ? validSims[nextIndex % validSims.length] : null;

  // The active simulation displayed in header details
  const activeHeaderSim = isSliding && nextSim ? nextSim : currentSim;

  const handleLaunchShowcase = (sim: SimulationItem) => {
    if (onSelectSim) {
      onSelectSim(sim);
    } else {
      openSimulationInNewTab(sim);
    }
  };

  return (
    <div className="relative group w-full space-y-5">
      {/* Soft Ambient Cyan & Purple Glow Lights Behind Card Corners for Futuristic 3D Depth */}
      <div 
        className="absolute -top-6 -left-6 w-80 h-80 rounded-full pointer-events-none -z-10 blur-3xl opacity-40 transition-opacity"
        style={{ background: 'radial-gradient(circle, rgba(56, 189, 248, 0.5) 0%, transparent 70%)' }}
      />
      <div 
        className="absolute -bottom-6 -right-6 w-80 h-80 rounded-full pointer-events-none -z-10 blur-3xl opacity-40 transition-opacity"
        style={{ background: 'radial-gradient(circle, rgba(168, 85, 247, 0.45) 0%, transparent 70%)' }}
      />

      {/* =========================================================================
          UPDATE 1: ENHANCE 3D BACKGROUND EFFECT & FIX BANNER COLOR
          - Removed flat jet black; applied rich deep dark sapphire/midnight navy cyber-gradient
          - Dramatically amplified 3D perspective grids, glowing tech vector meshes,
            luminous particle rings, and floating physics equations for vibrant depth.
          ========================================================================= */}
      <div 
        className="w-full rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden transition-all text-white opacity-100"
        style={{
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          backgroundColor: '#090e1a',
          backgroundImage: 'linear-gradient(135deg, #090e1a 0%, #0d1b2e 50%, #061124 100%)',
          borderColor: 'rgba(56, 189, 248, 0.45)',
          borderWidth: '1.5px',
          borderStyle: 'solid',
          boxShadow: '0 25px 60px 0 rgba(0, 0, 0, 0.75), 0 0 50px rgba(6, 182, 212, 0.22), inset 0 1px 3px rgba(56, 189, 248, 0.25)',
          color: '#ffffff'
        }}
      >
        {/* Highly Visible, Vibrant 3D Science & Technology Background Layer */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
          
          {/* 1. Dynamic 3D Perspective Cyber Horizon Grid */}
          <svg className="absolute inset-0 w-full h-full opacity-60" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="cyberGridGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.85" />
                <stop offset="45%" stopColor="#06b6d4" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0.12" />
              </linearGradient>
              <pattern id="highContrastGrid" width="44" height="44" patternUnits="userSpaceOnUse">
                <path d="M 44 0 L 0 0 0 44" fill="none" stroke="url(#cyberGridGrad)" strokeWidth="1.2" />
                <circle cx="0" cy="0" r="2" fill="#38bdf8" opacity="0.9" filter="drop-shadow(0 0 4px #38bdf8)" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#highContrastGrid)" />
          </svg>

          {/* 2. Luminous 3D Holographic Orbits, Coordinate Rings & Vector Meshes */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1200 600" preserveAspectRatio="none" fill="none">
            <defs>
              <linearGradient id="vibrantCyanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00f5ff" stopOpacity="0.9" />
                <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.65" />
                <stop offset="100%" stopColor="#818cf8" stopOpacity="0.25" />
              </linearGradient>
              <linearGradient id="vibrantGoldGrad" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#fef08a" stopOpacity="0.95" />
                <stop offset="50%" stopColor="#fbbf24" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.2" />
              </linearGradient>
              <linearGradient id="vibrantWave" x1="0%" y1="50%" x2="100%" y2="50%">
                <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.75" />
                <stop offset="50%" stopColor="#c084fc" stopOpacity="0.75" />
                <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.6" />
              </linearGradient>
              <filter id="glow3d" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Glowing 3D Dimensional Elliptical Orbits */}
            <ellipse cx="600" cy="220" rx="500" ry="150" stroke="url(#vibrantCyanGrad)" strokeWidth="2.5" strokeDasharray="16 10" transform="rotate(-7 600 220)" filter="url(#glow3d)" />
            <ellipse cx="600" cy="220" rx="380" ry="100" stroke="url(#vibrantGoldGrad)" strokeWidth="2.2" strokeDasharray="10 8" transform="rotate(14 600 220)" filter="url(#glow3d)" />
            <ellipse cx="600" cy="220" rx="240" ry="70" stroke="#38bdf8" strokeWidth="1.8" strokeOpacity="0.65" transform="rotate(-20 600 220)" />

            {/* Holographic Quantum Interference Sine Waves */}
            <path d="M-50,170 Q160,60 360,180 T760,150 T1160,210 T1360,130" stroke="url(#vibrantWave)" strokeWidth="3" fill="none" opacity="0.85" filter="url(#glow3d)" />
            <path d="M-50,240 Q210,340 460,220 T860,250 T1260,190" stroke="url(#vibrantCyanGrad)" strokeWidth="2.2" fill="none" opacity="0.7" />

            {/* Luminous Science Particle Rings and Orbiting Nodes */}
            <circle cx="210" cy="185" r="5" fill="#00f5ff" filter="drop-shadow(0 0 10px #00f5ff)" />
            <circle cx="890" cy="285" r="4.5" fill="#fbbf24" filter="drop-shadow(0 0 10px #fbbf24)" />
            <circle cx="1030" cy="150" r="4" fill="#2dd4bf" filter="drop-shadow(0 0 8px #2dd4bf)" />
            <circle cx="430" cy="115" r="4" fill="#c084fc" filter="drop-shadow(0 0 8px #c084fc)" />
            <circle cx="680" cy="330" r="3.5" fill="#38bdf8" filter="drop-shadow(0 0 6px #38bdf8)" />

            {/* Coordinate Ring Geometry in Deep Space */}
            <circle cx="950" cy="180" r="55" stroke="rgba(56, 189, 248, 0.45)" strokeWidth="1.2" strokeDasharray="4 6" />
            <circle cx="250" cy="280" r="45" stroke="rgba(251, 191, 36, 0.4)" strokeWidth="1.2" strokeDasharray="4 6" />
          </svg>

          {/* 3. High-Contrast Floating Physics & Mathematical Formulas */}
          <div className="absolute inset-0 pointer-events-none font-mono text-xs sm:text-sm font-black tracking-widest overflow-hidden opacity-75 select-none">
            <span 
              className="absolute top-6 left-1/4 text-cyan-300"
              style={{ textShadow: '0 0 14px rgba(6, 182, 212, 0.9), 0 0 24px rgba(56, 189, 248, 0.6)' }}
            >
              E = mc²
            </span>
            <span 
              className="absolute top-16 right-1/4 text-amber-300"
              style={{ textShadow: '0 0 14px rgba(251, 191, 36, 0.9), 0 0 24px rgba(245, 158, 11, 0.6)' }}
            >
              ∇ × B = μ₀J + μ₀ε₀(∂E/∂t)
            </span>
            <span 
              className="absolute bottom-28 left-12 text-teal-300"
              style={{ textShadow: '0 0 14px rgba(45, 212, 191, 0.9), 0 0 20px rgba(20, 184, 166, 0.6)' }}
            >
              iℏ(∂ψ/∂t) = Ĥψ
            </span>
            <span 
              className="absolute top-1/2 left-8 text-sky-300"
              style={{ textShadow: '0 0 12px rgba(56, 189, 248, 0.8)' }}
            >
              F = G(m₁m₂)/r²
            </span>
            <span 
              className="absolute bottom-24 right-16 text-yellow-300"
              style={{ textShadow: '0 0 14px rgba(253, 224, 71, 0.9)' }}
            >
              λ = h/p
            </span>
            <span 
              className="absolute top-12 right-10 text-cyan-300"
              style={{ textShadow: '0 0 12px rgba(34, 211, 238, 0.8)' }}
            >
              PV = nRT
            </span>
            <span 
              className="absolute bottom-1/2 right-1/3 text-emerald-300"
              style={{ textShadow: '0 0 12px rgba(110, 231, 183, 0.8)' }}
            >
              e^(iπ) + 1 = 0
            </span>
            <span 
              className="absolute bottom-12 left-1/3 text-blue-300"
              style={{ textShadow: '0 0 12px rgba(147, 197, 253, 0.8)' }}
            >
              c = 299,792,458 m/s
            </span>
          </div>

          {/* 4. Subtle Horizon Glow Sheen (Enhances Depth Without Hiding 3D Assets) */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(circle at 50% 30%, rgba(13, 27, 46, 0.25) 0%, rgba(9, 14, 26, 0.65) 100%)'
            }}
          />
        </div>

        {/* Top Row: Pill Badge on Left + Digital Clock Widget on Right */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-5 relative z-10">
          
          {/* Left Pill Badge */}
          <div 
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black tracking-wide uppercase shadow-md"
            style={{
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              backgroundColor: 'rgba(15, 23, 42, 0.85)',
              borderColor: 'rgba(56, 189, 248, 0.45)',
              borderWidth: '1px',
              borderStyle: 'solid',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.35), 0 0 14px rgba(56, 189, 248, 0.25)',
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

          {/* Right Area: Digital Clock Widget */}
          <div className="flex items-center gap-2 flex-wrap ml-auto sm:ml-0">
            <div 
              className="px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full shadow-md flex items-center gap-2 sm:gap-2.5 transition-all"
              style={{
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                backgroundColor: 'rgba(11, 19, 38, 0.88)',
                borderColor: 'rgba(56, 189, 248, 0.45)',
                borderWidth: '1px',
                borderStyle: 'solid',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.45), 0 0 16px rgba(56, 189, 248, 0.2)',
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
                textShadow: '0 2px 14px rgba(0, 0, 0, 0.8), 0 0 35px rgba(56, 189, 248, 0.35)'
              }}
            >
              Gen Z EdTech Interactive Simulation
            </h1>
            <p className="mt-3 text-xs sm:text-sm text-slate-200 max-w-2xl leading-relaxed font-semibold opacity-100">
              Explore authentic interactive STEM laboratories across physics mechanics, electricity, chemistry reactions, cellular biology, celestial mechanics, mathematics, computer science, linguistics, and early childhood care &amp; education (ECCE). Switch seamlessly across all {SIMULATIONS_LIST.length} modules with single-click direct execution in 4K high fidelity.
            </p>
          </div>

          {/* Official Monogram Emblem */}
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

        {/* Website Action Buttons */}
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

        {/* Continuous Right-to-Left Live Bulletin Ticker */}
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

          {/* Endless Seamless Marquee Viewport */}
          <div className="flex-1 overflow-hidden relative py-2.5 cursor-pointer">
            <div className="animate-marquee-infinite flex items-center">
              
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

      </div>

      {/* =========================================================================
          UPDATE 2: EXTEND SHOWCASE DURATION TO 5 SECONDS & FLUID RIGHT-TO-LEFT SLIDE
          - 5000ms Interval Timer
          - Authentic fluid carousel slide animation: Current stage slides out to LEFT,
            next stage slides in from RIGHT (700ms cubic-bezier transition)
          - Distinct, contrasting container background & clean border
          - Sleek, uncluttered header without any debug, speed, or counter numbers
          - Automatically pauses rotation on hover and interactive controls usage
          ========================================================================= */}
      {currentSim && (
        <div 
          className="w-full rounded-2xl overflow-hidden transition-all duration-300 shadow-2xl relative select-none"
          onMouseEnter={() => setIsShowcaseHovered(true)}
          onMouseLeave={() => setIsShowcaseHovered(false)}
          style={{
            backgroundColor: isDarkMode ? '#0a1628' : '#ffffff',
            backgroundImage: isDarkMode 
              ? 'linear-gradient(180deg, #0e1e38 0%, #081122 100%)' 
              : 'linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)',
            borderColor: isDarkMode ? '#0284c7' : '#2563eb',
            borderWidth: '2.5px',
            borderStyle: 'solid',
            boxShadow: isDarkMode 
              ? '0 20px 50px rgba(0, 0, 0, 0.7), 0 0 30px rgba(2, 132, 199, 0.3)' 
              : '0 20px 45px rgba(37, 99, 235, 0.14), 0 4px 16px rgba(0, 0, 0, 0.06)'
          }}
        >
          {/* Sleek, Minimal Header Bar (Zero speed, counter, or status labels) */}
          <div 
            className="px-4 sm:px-6 py-3 border-b flex items-center justify-between flex-wrap gap-3 transition-colors"
            style={{
              backgroundColor: isDarkMode ? 'rgba(2, 132, 199, 0.12)' : 'rgba(239, 246, 255, 0.95)',
              borderColor: isDarkMode ? 'rgba(56, 189, 248, 0.3)' : 'rgba(147, 197, 253, 0.6)'
            }}
          >
            {/* Left: Clean Simulation Name and Subject */}
            <div className="flex items-center gap-2.5 truncate">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse shrink-0" />
              <span 
                className="font-mono text-xs font-black uppercase tracking-wider"
                style={{ color: isDarkMode ? '#38bdf8' : '#1d4ed8' }}
              >
                Live Interactive Showcase:
              </span>
              <span 
                className="font-black text-xs sm:text-sm truncate transition-opacity duration-300"
                style={{ color: isDarkMode ? '#ffffff' : '#0f172a' }}
              >
                {activeHeaderSim.title}
              </span>
              <span 
                className="hidden sm:inline text-xs font-bold px-2 py-0.5 rounded-md"
                style={{
                  backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)',
                  color: isDarkMode ? '#94a3b8' : '#475569'
                }}
              >
                {activeHeaderSim.category}
              </span>
            </div>

            {/* Right: Sleek Action CTA to launch simulation in dedicated tab */}
            <div className="flex items-center gap-2 ml-auto">
              <a
                href={getSimulationStandaloneUrl(activeHeaderSim)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  e.stopPropagation();
                  handleLaunchShowcase(activeHeaderSim);
                }}
                className="btn-3d px-4 py-1.5 rounded-xl text-xs font-black flex items-center gap-2 shadow-md cursor-pointer transition-transform hover:scale-105 active:scale-95 text-white"
                style={{
                  backgroundColor: '#2563eb',
                  backgroundImage: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                  borderColor: '#60a5fa',
                  borderWidth: '1.5px',
                  borderStyle: 'solid'
                }}
                title={`Open ${activeHeaderSim.title} in new dedicated tab`}
              >
                <ExternalLink className="w-3.5 h-3.5 text-white" />
                <span>Launch Full Simulation</span>
              </a>
            </div>
          </div>

          {/* Fluid Carousel Viewport (Height 440px) with Right-to-Left Slide Animation */}
          <div 
            className="w-full relative overflow-hidden"
            style={{
              height: '440px',
              backgroundColor: isDarkMode ? '#060a16' : '#f8fafc'
            }}
          >
            {/* Active Current Stage (Slides out to LEFT when isSliding is true) */}
            <div
              className="absolute inset-0 w-full h-full"
              style={{
                transform: isSliding ? 'translateX(-100%)' : 'translateX(0%)',
                transition: isSliding ? 'transform 700ms cubic-bezier(0.4, 0, 0.2, 1)' : 'none',
                willChange: 'transform'
              }}
            >
              <iframe
                src={currentSim.htmlContent ? undefined : currentSim.fileUrl}
                srcDoc={currentSim.htmlContent || undefined}
                title={currentSim.title}
                className="w-full h-full border-0 block"
                style={{
                  pointerEvents: isShowcaseHovered ? 'auto' : 'none'
                }}
                loading="eager"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
              />
            </div>

            {/* Next Incoming Stage (Slides in from RIGHT when isSliding is true) */}
            {nextSim && (
              <div
                className="absolute inset-0 w-full h-full"
                style={{
                  transform: isSliding ? 'translateX(0%)' : 'translateX(100%)',
                  transition: isSliding ? 'transform 700ms cubic-bezier(0.4, 0, 0.2, 1)' : 'none',
                  willChange: 'transform'
                }}
              >
                <iframe
                  src={nextSim.htmlContent ? undefined : nextSim.fileUrl}
                  srcDoc={nextSim.htmlContent || undefined}
                  title={nextSim.title}
                  className="w-full h-full border-0 block"
                  style={{
                    pointerEvents: isShowcaseHovered ? 'auto' : 'none'
                  }}
                  loading="eager"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                />
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
