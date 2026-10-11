import React, { useState, useEffect } from 'react';
import { Clock, Sparkles, Star, Layers, Play, Radio } from 'lucide-react';
import { SimulationItem } from '../types';
import { SIMULATIONS_LIST } from '../data/simulationsData';

interface HeroBannerProps {
  activeSim: SimulationItem;
  isDarkMode?: boolean;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ activeSim, isDarkMode = false }) => {
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
    <div 
      className="w-full rounded-2xl p-5 sm:p-7 shadow-xl border relative overflow-hidden transition-all text-white opacity-100"
      style={{
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        backgroundColor: isDarkMode ? 'rgba(9, 24, 56, 0.82)' : 'rgba(30, 64, 175, 0.82)',
        backgroundImage: isDarkMode
          ? 'linear-gradient(135deg, rgba(9, 24, 56, 0.88) 0%, rgba(13, 37, 90, 0.82) 50%, rgba(6, 17, 41, 0.88) 100%)'
          : 'linear-gradient(135deg, rgba(30, 64, 175, 0.85) 0%, rgba(37, 99, 235, 0.82) 50%, rgba(29, 78, 216, 0.85) 100%)',
        borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.18)' : 'rgba(255, 255, 255, 0.28)',
        borderWidth: '1px',
        borderStyle: 'solid',
        boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.25)',
        color: '#ffffff'
      }}
    >
      {/* Top Row: Pill Badge on Left + Digital Clock Widget on Right */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4 relative z-10">
        
        {/* Left Pill Badge - Frosted Glass */}
        <div 
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-black tracking-wide uppercase shadow-md"
          style={{
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            backgroundColor: isDarkMode ? 'rgba(4, 13, 34, 0.72)' : 'rgba(15, 41, 99, 0.72)',
            borderColor: 'rgba(103, 232, 249, 0.5)',
            borderWidth: '1px',
            borderStyle: 'solid',
            color: '#ffffff'
          }}
        >
          <Sparkles className="w-3.5 h-3.5 text-cyan-300 drop-shadow-xs" />
          <span className="font-black text-white">GEN Z EDTECH SIMULATION PORTAL</span>
          <span 
            className="px-2 py-0.5 rounded text-[10px] font-black shadow-xs"
            style={{ backgroundColor: '#fbbf24', color: '#0f172a' }}
          >
            4K 3D
          </span>
        </div>

        {/* Right: Crisp Frosted Glass Digital Clock Widget */}
        <div 
          className="px-4 py-1.5 rounded-full shadow-lg flex items-center gap-2.5 text-xs"
          style={{
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            backgroundColor: isDarkMode ? 'rgba(4, 13, 34, 0.72)' : 'rgba(12, 34, 85, 0.72)',
            borderColor: 'rgba(96, 165, 250, 0.45)',
            borderWidth: '1px',
            borderStyle: 'solid',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.25)',
            color: '#ffffff'
          }}
        >
          
          <div 
            className="flex items-center gap-1.5 font-mono font-black text-sm tracking-wider"
            style={{ color: '#fef08a' }}
          >
            <Clock className="w-4 h-4 text-amber-300" />
            <span className="font-extrabold text-amber-200">{time || '00:00:00'}</span>
          </div>

          <span 
            className="px-2 py-0.5 rounded-md text-[10px] font-black uppercase shadow-xs"
            style={{ backgroundColor: '#ffffff', color: '#1e3a8a' }}
          >
            {period}
          </span>

          <span className="text-emerald-400 font-extrabold">|</span>

          <span className="font-extrabold whitespace-nowrap text-xs text-white">
            {dateStr || 'Loading date...'}
          </span>

        </div>

      </div>

      {/* Main Headline & Monogram Showcase */}
      <div className="relative z-10 my-2 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex-1">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight leading-tight drop-shadow-sm">
            Gen Z EdTech Interactive Simulation
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-white max-w-2xl leading-relaxed font-bold opacity-100">
            Explore authentic interactive STEM laboratories across physics mechanics, electricity, chemistry reactions, cellular biology, celestial mechanics, mathematics, and computer science. Switch seamlessly across all 27 modules with single-click direct execution in 4K high fidelity.
          </p>
        </div>

        {/* Official Monogram Emblem Badge with Frosted Glass Styling */}
        <div 
          className="shrink-0 rounded-2xl p-3 border shadow-2xl flex items-center gap-3.5 text-slate-900 dark:text-white"
          style={{
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            backgroundColor: isDarkMode ? 'rgba(15, 23, 42, 0.82)' : 'rgba(255, 255, 255, 0.88)',
            borderColor: '#38bdf8',
            borderWidth: '1.5px',
            borderStyle: 'solid',
            boxShadow: '0 8px 24px rgba(2, 132, 199, 0.3)'
          }}
        >
          <img 
            src="/genz-edtech-monogram.svg" 
            alt="Gen Z EdTech Interactive Monogram Logo" 
            className="w-24 sm:w-28 h-auto object-contain"
          />
          <div className="hidden sm:block text-left pr-2">
            <span className="block text-[10px] font-mono font-black text-cyan-600 dark:text-cyan-400 uppercase tracking-wider">Official Monogram</span>
            <span className="block text-xs font-black text-slate-900 dark:text-white leading-tight">Gen Z EdTech</span>
            <span className="block text-[10px] font-bold text-slate-500 dark:text-slate-400">Interactive Portal</span>
          </div>
        </div>
      </div>

        {/* Website Action Buttons for Laptop & Desktop */}
        <div className="my-3 flex items-center gap-3 flex-wrap">
          <a
            href="#catalog"
            className="btn-3d px-4 py-2 rounded-xl text-xs font-black flex items-center gap-2 text-slate-900 shadow-md cursor-pointer"
            style={{
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              backgroundColor: 'rgba(251, 191, 36, 0.9)',
              borderColor: '#fde047',
              borderWidth: '1.5px',
              borderStyle: 'solid',
              color: '#0f172a'
            }}
          >
            <Layers className="w-4 h-4 text-slate-900" />
            <span>Explore All 25 Labs Grid</span>
          </a>
          <a
            href="#stage"
            className="btn-3d px-4 py-2 rounded-xl text-xs font-black flex items-center gap-2 text-white shadow-md cursor-pointer"
            style={{
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              backgroundColor: 'rgba(5, 150, 105, 0.9)',
              borderColor: '#34d399',
              borderWidth: '1.5px',
              borderStyle: 'solid',
              color: '#ffffff'
            }}
          >
            <Play className="w-4 h-4 fill-current text-white" />
            <span>Interactive Stage [Lab {activeSim.indexNumber}]</span>
          </a>
        </div>

      {/* Continuous Right-to-Left Live Bulletin Ticker with Frosted Glass Styling */}
      <div 
        className="relative z-10 mt-4 rounded-xl text-xs flex items-center overflow-hidden shadow-md"
        style={{
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          backgroundColor: isDarkMode ? 'rgba(4, 13, 34, 0.72)' : 'rgba(12, 34, 85, 0.72)',
          borderColor: 'rgba(96, 165, 250, 0.35)',
          borderWidth: '1px',
          borderStyle: 'solid',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
          color: '#ffffff'
        }}
      >
        {/* Fixed Left Badge: Live STEM Bulletin */}
        <div 
          className="shrink-0 z-20 px-3.5 py-2.5 flex items-center gap-2 font-black uppercase tracking-wider text-[11px] shadow-lg"
          style={{
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            backgroundColor: 'rgba(37, 99, 235, 0.88)',
            backgroundImage: 'linear-gradient(135deg, rgba(59, 130, 246, 0.9) 0%, rgba(29, 78, 216, 0.9) 100%)',
            borderRight: '1.5px solid rgba(96, 165, 250, 0.5)',
            color: '#ffffff'
          }}
        >
          <Radio className="w-3.5 h-3.5 animate-pulse text-yellow-300" />
          <span className="whitespace-nowrap">LIVE STEM BULLETIN</span>
        </div>

        {/* Endless Seamless Marquee Viewport (Left-to-Right Screen Flow, English Right-to-Left Continuous Scroll) */}
        <div className="flex-1 overflow-hidden relative py-2.5">
          <div className="animate-marquee-infinite flex items-center">
            
            {/* Copy 1 of All Simulations */}
            <div className="flex items-center shrink-0">
              {SIMULATIONS_LIST.map((sim, index) => (
                <div key={`sim-ticker-1-${sim.id}`} className="flex items-center shrink-0 mr-8">
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
                </div>
              ))}
            </div>

            {/* Copy 2 of All Simulations (Guarantees Zero Gap / Seamless Infinite Continuity) */}
            <div className="flex items-center shrink-0">
              {SIMULATIONS_LIST.map((sim, index) => (
                <div key={`sim-ticker-2-${sim.id}`} className="flex items-center shrink-0 mr-8">
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
                </div>
              ))}
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};
