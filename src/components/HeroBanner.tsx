import React, { useState, useEffect } from 'react';
import { Clock, Sparkles, Layers, Play, Radio, ExternalLink } from 'lucide-react';
import { SimulationItem } from '../types';
import { SIMULATIONS_LIST } from '../data/simulationsData';
import { openSimulationInNewTab, getSimulationStandaloneUrl } from '../utils/navigation';
import { TopicRealisticIcon } from './TopicRealisticIcon';

interface HeroBannerProps {
  activeSim?: SimulationItem | null;
  isDarkMode?: boolean;
  onSelectSim?: (sim: SimulationItem) => void;
}

const cleanTopicTitle = (title: string, category?: string): string => {
  let clean = title
    .replace(/\.html$/i, '')
    .replace(/_/g, ' ')
    .replace(/Cambridge\s+Scholar\s*[-–—]?\s*/gi, '')
    .trim();
  if (category !== 'Urdu & Linguistics') {
    clean = clean.replace(/[\u0600-\u06FF]+/g, '').replace(/\(\s*\)/g, '').trim();
  }
  return clean;
};

const getCategoryStyle = (category: string, isDark: boolean) => {
  if (category.includes('Urdu')) {
    return {
      name: 'Urdu Language',
      bg: isDark ? 'rgba(16, 185, 129, 0.25)' : 'rgba(236, 253, 245, 0.95)',
      color: isDark ? '#6ee7b7' : '#065f46',
      border: isDark ? '#10b981' : '#a7f3d0'
    };
  }
  if (category.includes('Physics')) {
    return {
      name: 'Physics',
      bg: isDark ? 'rgba(37, 99, 235, 0.25)' : 'rgba(239, 246, 255, 0.95)',
      color: isDark ? '#93c5fd' : '#1d4ed8',
      border: isDark ? '#3b82f6' : '#bfdbfe'
    };
  }
  if (category.includes('Chemistry')) {
    return {
      name: 'Chemistry',
      bg: isDark ? 'rgba(168, 85, 247, 0.25)' : 'rgba(250, 245, 255, 0.95)',
      color: isDark ? '#d8b4fe' : '#7e22ce',
      border: isDark ? '#a855f7' : '#e9d5ff'
    };
  }
  if (category.includes('Biology')) {
    return {
      name: 'Biology',
      bg: isDark ? 'rgba(34, 197, 94, 0.25)' : 'rgba(240, 253, 244, 0.95)',
      color: isDark ? '#86efac' : '#15803d',
      border: isDark ? '#22c55e' : '#bbf7d0'
    };
  }
  if (category.includes('Earth') || category.includes('Space')) {
    return {
      name: 'Earth & Space',
      bg: isDark ? 'rgba(2, 132, 199, 0.25)' : 'rgba(240, 249, 255, 0.95)',
      color: isDark ? '#7dd3fc' : '#0369a1',
      border: isDark ? '#0284c7' : '#bae6fd'
    };
  }
  if (category.includes('Math')) {
    return {
      name: 'Mathematics',
      bg: isDark ? 'rgba(245, 158, 11, 0.25)' : 'rgba(255, 251, 235, 0.95)',
      color: isDark ? '#fcd34d' : '#b45309',
      border: isDark ? '#f59e0b' : '#fde68a'
    };
  }
  if (category.includes('Computer')) {
    return {
      name: 'Computer Science',
      bg: isDark ? 'rgba(20, 184, 166, 0.25)' : 'rgba(240, 253, 250, 0.95)',
      color: isDark ? '#5eead4' : '#0f766e',
      border: isDark ? '#14b8a6' : '#99f6e4'
    };
  }
  if (category.includes('English') || category.includes('Grammar')) {
    return {
      name: 'English & Grammar',
      bg: isDark ? 'rgba(139, 92, 246, 0.25)' : 'rgba(245, 243, 255, 0.95)',
      color: isDark ? '#c4b5fd' : '#6d28d9',
      border: isDark ? '#8b5cf6' : '#ddd6fe'
    };
  }
  return {
    name: 'Early Childhood',
    bg: isDark ? 'rgba(244, 63, 94, 0.25)' : 'rgba(255, 241, 242, 0.95)',
    color: isDark ? '#fecdd3' : '#be123c',
    border: isDark ? '#f43f5e' : '#fecdd3'
  };
};

export const HeroBanner: React.FC<HeroBannerProps> = ({ activeSim, isDarkMode = false, onSelectSim }) => {
  const [time, setTime] = useState<string>('');
  const [period, setPeriod] = useState<string>('PM');
  const [dateStr, setDateStr] = useState<string>('');

  // Strict 2-Second Interval Timer & Fluid Right-to-Left Slide Rotator State
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [nextIndex, setNextIndex] = useState<number | null>(null);
  const [isSliding, setIsSliding] = useState<boolean>(false);
  const [isShowcaseHovered, setIsShowcaseHovered] = useState<boolean>(false);

  // 100% of available simulation topics currently in the system library
  const allSimulationTopics = SIMULATIONS_LIST;

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

  // Strict 2-Second (2000ms) Interval with Fluid Right-to-Left Slide Transition
  // Pauses automatically on hover over the topic or direct launch button
  useEffect(() => {
    if (isShowcaseHovered || allSimulationTopics.length <= 1) return;

    const timer = setInterval(() => {
      const target = (currentIndex + 1) % allSimulationTopics.length;
      setNextIndex(target);

      // Trigger the slide on next micro-frame for smooth CSS animation
      requestAnimationFrame(() => {
        setIsSliding(true);
      });

      // Complete slide transition after 450ms
      setTimeout(() => {
        setCurrentIndex(target);
        setNextIndex(null);
        setIsSliding(false);
      }, 450);
    }, 2000); // Strictly 2 seconds (2000ms)

    return () => clearInterval(timer);
  }, [currentIndex, isShowcaseHovered, allSimulationTopics.length]);

  const currentSim = allSimulationTopics[currentIndex % allSimulationTopics.length] || allSimulationTopics[0];
  const nextSim = nextIndex !== null ? allSimulationTopics[nextIndex % allSimulationTopics.length] : null;

  const handleLaunchShowcase = (sim: SimulationItem) => {
    if (onSelectSim) {
      onSelectSim(sim);
    } else {
      openSimulationInNewTab(sim);
    }
  };

  const renderTopicItem = (sim: SimulationItem) => {
    const catStyle = getCategoryStyle(sim.category, isDarkMode);
    const cleanTitle = cleanTopicTitle(sim.title, sim.category);

    return (
      <div 
        className="w-full h-full flex items-center justify-between gap-3 px-3.5 sm:px-6"
      >
        {/* Left Topic Name & Category Badge */}
        <div className="flex items-center gap-2.5 sm:gap-3.5 min-w-0">
          {/* Topic Realistic Icon */}
          <div 
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl shrink-0 p-1 flex items-center justify-center shadow-xs"
            style={{
              backgroundColor: catStyle.bg,
              border: `1.5px solid ${catStyle.border}`
            }}
          >
            <TopicRealisticIcon indexNumber={sim.indexNumber} simId={sim.id} className="w-7 h-7 sm:w-8 sm:h-8" />
          </div>

          {/* Clean Category Badge */}
          <span 
            className="text-[10px] sm:text-xs font-black uppercase tracking-wider px-2 sm:px-2.5 py-1 rounded-lg shrink-0 shadow-2xs"
            style={{
              backgroundColor: catStyle.bg,
              color: catStyle.color,
              border: `1px solid ${catStyle.border}`
            }}
          >
            {catStyle.name}
          </span>

          {/* Clean Topic Name (Clickable link to open simulation) */}
          <a
            href={getSimulationStandaloneUrl(sim)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              e.stopPropagation();
              handleLaunchShowcase(sim);
            }}
            className="text-xs sm:text-sm md:text-base font-black truncate hover:underline cursor-pointer transition-colors"
            style={{
              color: isDarkMode ? '#f8fafc' : '#0f172a'
            }}
            title={`Open ${cleanTitle} in new tab`}
          >
            {cleanTitle}
          </a>
        </div>

        {/* Right Direct "Launch Lab 🚀" Button */}
        <a
          href={getSimulationStandaloneUrl(sim)}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => {
            e.stopPropagation();
            handleLaunchShowcase(sim);
          }}
          className="btn-3d shrink-0 ml-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs sm:text-sm font-black flex items-center gap-1.5 text-white shadow-md transition-all hover:scale-105 active:scale-95 cursor-pointer whitespace-nowrap"
          style={{
            backgroundColor: '#2563eb',
            backgroundImage: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
            border: '1.5px solid #60a5fa',
            boxShadow: '0 4px 14px rgba(37, 99, 235, 0.35)'
          }}
          title={`Launch ${cleanTitle} simulation now`}
        >
          <span>Launch Lab</span>
          <span className="text-sm">🚀</span>
        </a>
      </div>
    );
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

      {/* Top Main Large Dark Card/Banner with Rich 3D Science & Technology Background Effect */}
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
          
          {/* Dynamic 3D Perspective Cyber Horizon Grid */}
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

          {/* Luminous 3D Holographic Orbits, Coordinate Rings & Vector Meshes */}
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

          {/* High-Contrast Floating Physics & Mathematical Formulas */}
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

          {/* Subtle Horizon Glow Sheen */}
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
                {allSimulationTopics.map((sim) => (
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
                {allSimulationTopics.map((sim) => (
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
          FAST 2-SECOND TOPIC TICKER / ROTATOR:
          1. Topic-Only Content: Clean names/topics of all available simulations
          2. Clean category badge (Physics, Chemistry, Biology, etc.)
          3. Compact direct "Launch Lab 🚀" button
          4. Strict 2-second right-to-left slide animation (450ms translateX)
          5. Smooth pause on hover
          6. NO heavy visual canvases, text paragraphs, complex theory, countdowns, or counter numbers
          ========================================================================= */}
      {currentSim && (
        <div 
          className="w-full h-16 sm:h-20 rounded-2xl overflow-hidden shadow-xl relative select-none"
          onMouseEnter={() => setIsShowcaseHovered(true)}
          onMouseLeave={() => setIsShowcaseHovered(false)}
          style={{
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            backgroundColor: isDarkMode ? 'rgba(10, 22, 51, 0.88)' : 'rgba(255, 255, 255, 0.94)',
            borderColor: isDarkMode ? 'rgba(56, 189, 248, 0.38)' : 'rgba(147, 197, 253, 0.85)',
            borderWidth: '1.5px',
            borderStyle: 'solid',
            boxShadow: isDarkMode 
              ? '0 12px 32px rgba(0, 0, 0, 0.45), 0 0 20px rgba(56, 189, 248, 0.15)' 
              : '0 8px 24px rgba(37, 99, 235, 0.08), 0 2px 10px rgba(37, 99, 235, 0.05)'
          }}
        >
          {/* Active Current Topic (Slides out to LEFT when isSliding is true) */}
          <div
            className="absolute inset-0 w-full h-full flex items-center"
            style={{
              transform: isSliding ? 'translateX(-100%)' : 'translateX(0%)',
              transition: isSliding ? 'transform 450ms cubic-bezier(0.4, 0, 0.2, 1)' : 'none',
              willChange: 'transform'
            }}
          >
            {renderTopicItem(currentSim)}
          </div>

          {/* Next Incoming Topic (Slides in from RIGHT when isSliding is true) */}
          {nextSim && (
            <div
              className="absolute inset-0 w-full h-full flex items-center"
              style={{
                transform: isSliding ? 'translateX(0%)' : 'translateX(100%)',
                transition: isSliding ? 'transform 450ms cubic-bezier(0.4, 0, 0.2, 1)' : 'none',
                willChange: 'transform'
              }}
            >
              {renderTopicItem(nextSim)}
            </div>
          )}
        </div>
      )}

    </div>
  );
};
