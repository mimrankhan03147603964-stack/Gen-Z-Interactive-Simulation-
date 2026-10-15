import React, { useState, useEffect } from 'react';
import { Clock, Sparkles, Layers, Play, Radio } from 'lucide-react';
import { SimulationItem } from '../types';
import { SIMULATIONS_LIST } from '../data/simulationsData';
import { getSimulationStandaloneUrl } from '../utils/navigation';

interface HeroBannerProps {
  activeSim?: SimulationItem | null;
  isDarkMode?: boolean;
  onSelectSim?: (sim: SimulationItem) => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ activeSim, isDarkMode = false, onSelectSim }) => {
  const [time, setTime] = useState<string>('');
  const [period, setPeriod] = useState<string>('PM');
  const [dateStr, setDateStr] = useState<string>('');

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

      <div 
        className="w-full rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden transition-all text-white opacity-100"
        style={{
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          backgroundColor: 'rgba(11, 15, 25, 0.88)',
          backgroundImage: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(11, 15, 25, 0.98) 50%, rgba(15, 23, 42, 0.92) 100%)',
          borderColor: 'rgba(255, 255, 255, 0.12)',
          borderWidth: '1px',
          borderStyle: 'solid',
          boxShadow: '0 20px 50px 0 rgba(0, 0, 0, 0.65), 0 0 40px rgba(6, 182, 212, 0.08)',
          color: '#ffffff'
        }}
      >
        {/* Subtle Ambient Radial Mesh Sheen Overlay */}
        <div 
          className="absolute inset-0 pointer-events-none transition-all"
          style={{
            background: 'radial-gradient(circle at 15% 20%, rgba(56, 189, 248, 0.07) 0%, transparent 55%), radial-gradient(circle at 85% 80%, rgba(168, 85, 247, 0.06) 0%, transparent 55%)',
          }}
        />

        {/* Top Row: Pill Badge on Left + Digital Clock Widget on Right (Zero edit buttons, strictly view-only) */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-5 relative z-10">
          
          {/* Left Pill Badge - Modern Glassmorphism */}
          <div 
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black tracking-wide uppercase shadow-md"
            style={{
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              backgroundColor: 'rgba(15, 23, 42, 0.75)',
              borderColor: 'rgba(255, 255, 255, 0.14)',
              borderWidth: '1px',
              borderStyle: 'solid',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.35)',
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

          {/* Right Area: Crisp Frosted Glass Digital Clock Widget (Enlarged & High-Contrast) */}
          <div className="flex items-center gap-2 flex-wrap ml-auto sm:ml-0">
            <div 
              className="px-4 sm:px-6 py-2 sm:py-2.5 rounded-2xl sm:rounded-full shadow-2xl flex items-center gap-2.5 sm:gap-4 transition-all"
              style={{
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                backgroundColor: 'rgba(11, 19, 38, 0.94)',
                borderColor: 'rgba(56, 189, 248, 0.45)',
                borderWidth: '1.5px',
                borderStyle: 'solid',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.65), 0 0 25px rgba(56, 189, 248, 0.25)',
                color: '#ffffff'
              }}
            >
              <div 
                className="flex items-center gap-2 font-mono font-black text-base sm:text-xl md:text-2xl tracking-wider"
                style={{ color: '#fef08a' }}
              >
                <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-amber-300 animate-pulse shrink-0 drop-shadow-xs" />
                <span className="font-black text-amber-200 drop-shadow-sm">{time || '00:00:00'}</span>
              </div>

              <span 
                className="px-2.5 py-1 rounded-lg text-xs sm:text-sm font-black uppercase shadow-md font-mono"
                style={{ backgroundColor: '#ffffff', color: '#090d16' }}
              >
                {period}
              </span>

              <span className="text-emerald-400 font-black text-base sm:text-xl">|</span>

              <span className="font-black whitespace-nowrap text-xs sm:text-sm md:text-base text-white tracking-wide drop-shadow-sm">
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
          <div className="shrink-0 flex items-center justify-center monogram-3d-stage my-2 md:my-0 self-center">
            <div 
              className="monogram-3d-card relative rounded-3xl p-5 sm:p-6 flex items-center justify-center cursor-pointer transition-all"
              style={{
                backgroundColor: '#FFFFFF',
                borderColor: '#e2e8f0',
                borderWidth: '2.5px',
                borderStyle: 'solid',
                boxShadow: '0 20px 45px rgba(0, 0, 0, 0.5), 0 0 35px rgba(255, 255, 255, 0.4), inset 0 1px 2px rgba(255, 255, 255, 1)',
                width: '180px',
                height: '180px'
              }}
              title="Gen Z EdTech Official Monogram - 3D Interactive Dimensional Emblem"
            >
              {/* The 3D Dimensional Monogram Element with 360-degree Dimensional Rotation and Floating Tilt */}
              <div className="monogram-3d-element relative z-10 w-full h-full flex items-center justify-center">
                <img 
                  src="/genz-edtech-monogram.svg" 
                  alt="Gen Z EdTech Official Monogram Logo" 
                  className="w-32 sm:w-36 h-auto max-h-32 sm:max-h-36 object-contain"
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
                {SIMULATIONS_LIST.map((sim) => (
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
                {SIMULATIONS_LIST.map((sim) => (
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
    </div>
  );
};
