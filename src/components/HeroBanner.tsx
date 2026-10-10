import React, { useState, useEffect } from 'react';
import { Clock, Sparkles, Star } from 'lucide-react';
import { SimulationItem } from '../types';

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

      {/* Main Headline - Solid Pure White, Crisp & High Contrast */}
      <div className="relative z-10 my-2">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight leading-tight drop-shadow-sm">
          Gen Z EdTech Interactive Simulation
        </h1>
        <p className="mt-2 text-xs sm:text-sm text-white max-w-3xl leading-relaxed font-bold opacity-100">
          Explore authentic interactive STEM laboratories across physics mechanics, electricity, chemistry reactions, cellular biology, and planetary space dynamics. Switch seamlessly across all 14 modules with single-click direct execution in 4K high fidelity.
        </p>
      </div>

      {/* Ticker / Announcement Bar - Solid crisp background without blur or transparency wash */}
      <div 
        className="relative z-10 mt-4 p-3 rounded-xl text-xs flex items-center gap-2.5 overflow-hidden shadow-md"
        style={{
          backgroundColor: isDarkMode ? '#040d22' : '#0c2255',
          borderColor: '#60a5fa',
          borderWidth: '1.5px',
          borderStyle: 'solid',
          color: '#ffffff'
        }}
      >
        <Star className="w-4 h-4 shrink-0 fill-amber-300 text-amber-300" />
        <div className="font-bold truncate text-xs text-white">
          <span className="font-black text-white">Active Simulation:</span>{' '}
          <span className="font-black text-amber-300">[{activeSim.indexNumber}] {activeSim.title}</span> ({activeSim.category}) &bull;{' '}
          <span className="font-bold text-cyan-200">Ready for Interactive Execution &amp; 4K Fullscreen Study</span>
        </div>
      </div>

    </div>
  );
};
