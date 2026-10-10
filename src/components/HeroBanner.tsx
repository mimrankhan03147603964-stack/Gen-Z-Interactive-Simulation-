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
      className="w-full rounded-2xl p-5 sm:p-7 shadow-xl border relative overflow-hidden transition-all text-white"
      style={{
        backgroundColor: isDarkMode ? '#0c1f4a' : '#1e40af',
        backgroundImage: isDarkMode
          ? 'linear-gradient(135deg, #0c1f4a 0%, #122e6b 50%, #0a193c 100%)'
          : 'linear-gradient(135deg, #1e40af 0%, #2563eb 50%, #1d4ed8 100%)',
        borderColor: isDarkMode ? '#3b82f6' : '#60a5fa',
        borderWidth: '1.5px',
        borderStyle: 'solid',
        color: '#ffffff'
      }}
    >
      
      {/* Background Decorative 3D Lighting Glows */}
      <div className="absolute top-0 right-1/4 w-96 h-36 bg-cyan-400/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 w-80 h-28 bg-indigo-400/25 rounded-full blur-3xl pointer-events-none" />

      {/* Top Row: 3D Pill Badge on Left + Digital Clock Widget on Right */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4 relative z-10">
        
        {/* Left 3D Pill Badge */}
        <div 
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-black tracking-wide uppercase shadow-md"
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            borderColor: 'rgba(255, 255, 255, 0.35)',
            borderWidth: '1px',
            borderStyle: 'solid',
            color: '#a5f3fc'
          }}
        >
          <Sparkles className="w-3.5 h-3.5" style={{ color: '#67e8f9' }} />
          <span>GEN Z EDTECH SIMULATION PORTAL</span>
          <span 
            className="px-1.5 py-0.2 rounded text-[9px] font-black"
            style={{ backgroundColor: '#fbbf24', color: '#0f172a' }}
          >
            4K 3D
          </span>
        </div>

        {/* Right: 3D Digital Clock Widget */}
        <div 
          className="px-4 py-1.5 rounded-full shadow-lg flex items-center gap-2.5 text-xs"
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            borderColor: 'rgba(255, 255, 255, 0.35)',
            borderWidth: '1px',
            borderStyle: 'solid',
            color: '#ffffff'
          }}
        >
          
          <div 
            className="flex items-center gap-1.5 font-mono font-black text-sm tracking-wider"
            style={{ color: '#fde047' }}
          >
            <Clock className="w-3.5 h-3.5" style={{ color: '#facc15' }} />
            <span>{time || '00:00:00'}</span>
          </div>

          <span 
            className="px-1.5 py-0.2 rounded-md text-[10px] font-black uppercase shadow-xs"
            style={{ backgroundColor: '#ffffff', color: '#1e3a8a' }}
          >
            {period}
          </span>

          <span style={{ color: '#6ee7b7', fontWeight: 800 }}>|</span>

          <span className="font-bold whitespace-nowrap text-xs text-white">
            {dateStr || 'Loading date...'}
          </span>

        </div>

      </div>

      {/* Main Headline */}
      <div className="relative z-10 my-2">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight leading-tight drop-shadow-md">
          Gen Z EdTech Interactive Simulation
        </h1>
        <p className="mt-2 text-xs sm:text-sm text-blue-50 max-w-3xl leading-relaxed font-medium">
          Explore authentic interactive STEM laboratories across physics mechanics, electricity, chemistry reactions, cellular biology, and planetary space dynamics. Switch seamlessly across all 14 modules with single-click direct execution in 4K high fidelity.
        </p>
      </div>

      {/* Ticker / Announcement Bar */}
      <div 
        className="relative z-10 mt-4 p-3 rounded-xl text-xs flex items-center gap-2.5 overflow-hidden shadow-inner"
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
          borderColor: 'rgba(255, 255, 255, 0.25)',
          borderWidth: '1px',
          borderStyle: 'solid',
          color: '#dbeafe'
        }}
      >
        <Star className="w-4 h-4 shrink-0 fill-amber-300 drop-shadow-sm" style={{ color: '#facc15' }} />
        <div className="font-medium truncate text-xs">
          <span className="font-extrabold text-white">Active Simulation:</span>{' '}
          <span className="font-black" style={{ color: '#fde047' }}>[{activeSim.indexNumber}] {activeSim.title}</span> ({activeSim.category}) &bull;{' '}
          <span className="font-bold" style={{ color: '#a5f3fc' }}>Ready for Interactive Execution &amp; 4K Fullscreen Study</span>
        </div>
      </div>

    </div>
  );
};
