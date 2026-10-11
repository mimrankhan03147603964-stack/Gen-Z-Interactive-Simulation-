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
        backgroundColor: isDarkMode ? '#0a1a3e' : '#1e40af',
        backgroundImage: isDarkMode
          ? 'linear-gradient(135deg, #091838 0%, #0d255a 50%, #061129 100%)'
          : 'linear-gradient(135deg, #1e40af 0%, #2563eb 50%, #1d4ed8 100%)',
        borderColor: isDarkMode ? '#3b82f6' : '#60a5fa',
        borderWidth: '1.5px',
        borderStyle: 'solid',
        color: '#ffffff'
      }}
    >
      {/* Top Row: Pill Badge on Left + Digital Clock Widget on Right */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4 relative z-10">
        
        {/* Left Pill Badge - Solid high contrast, no foggy wash */}
        <div 
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-black tracking-wide uppercase shadow-md"
          style={{
            backgroundColor: isDarkMode ? '#040d22' : '#0f2963',
            borderColor: '#67e8f9',
            borderWidth: '1.5px',
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

        {/* Right: Crisp Solid Digital Clock Widget */}
        <div 
          className="px-4 py-1.5 rounded-full shadow-lg flex items-center gap-2.5 text-xs"
          style={{
            backgroundColor: isDarkMode ? '#040d22' : '#0c2255',
            borderColor: '#60a5fa',
            borderWidth: '1.5px',
            borderStyle: 'solid',
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

        {/* Official Monogram Emblem Badge */}
        <div 
          className="shrink-0 rounded-2xl p-3 border shadow-2xl flex items-center gap-3.5 bg-white/95 dark:bg-slate-900/90 text-slate-900 dark:text-white"
          style={{
            borderColor: '#38bdf8',
            borderWidth: '2px',
            boxShadow: '0 8px 24px rgba(2, 132, 199, 0.35)'
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
              backgroundColor: '#fbbf24',
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
              backgroundColor: '#059669',
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

      {/* Continuous Right-to-Left Live Bulletin Ticker for All 27 Interactive Simulations */}
      <div 
        className="relative z-10 mt-4 rounded-xl text-xs flex items-center overflow-hidden shadow-md"
        style={{
          backgroundColor: isDarkMode ? '#040d22' : '#0c2255',
          borderColor: '#60a5fa',
          borderWidth: '1.5px',
          borderStyle: 'solid',
          color: '#ffffff'
        }}
      >
        {/* Fixed Left Badge: Live STEM Bulletin */}
        <div 
          className="shrink-0 z-20 px-3.5 py-2.5 flex items-center gap-2 font-black uppercase tracking-wider text-[11px] shadow-lg"
          style={{
            backgroundColor: '#2563eb',
            backgroundImage: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
            borderRight: '1.5px solid #60a5fa',
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
