import React, { useState, useEffect } from 'react';
import { Clock, Sparkles, Star, ShieldCheck } from 'lucide-react';
import { SimulationItem } from '../types.ts';

interface HeroBannerProps {
  activeSim: SimulationItem;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ activeSim }) => {
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
    <div className="w-full rounded-2xl bg-gradient-to-r from-[#0c1f4a] via-[#122e6b] to-[#0a193c] text-white p-5 sm:p-7 shadow-2xl border border-blue-500/40 relative overflow-hidden">
      
      {/* Background Decorative 3D Lighting Glows */}
      <div className="absolute top-0 right-1/4 w-96 h-36 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 w-80 h-28 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

      {/* Top Row: 3D Pill Badge on Left + Digital Clock Widget on Right */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4 relative z-10">
        
        {/* Left 3D Pill Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#08173d] border border-blue-400/40 text-xs font-black text-cyan-300 tracking-wide uppercase shadow-md">
          <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
          <span>GEN Z EDTECH SIMULATION PORTAL</span>
          <span className="px-1.5 py-0.2 rounded bg-cyan-400 text-slate-950 text-[9px] font-black">
            4K 3D
          </span>
        </div>

        {/* Right: 3D Digital Clock Widget */}
        <div className="px-4 py-1.5 rounded-full bg-[#050f28] border border-blue-500/50 shadow-lg flex items-center gap-2.5 text-xs">
          
          <div className="flex items-center gap-1.5 font-mono font-black text-amber-400 text-sm tracking-wider">
            <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>{time || '00:00:00'}</span>
          </div>

          <span className="px-1.5 py-0.2 rounded-md bg-blue-600 text-[10px] font-black text-white uppercase shadow-xs">
            {period}
          </span>

          <span className="text-emerald-400 font-bold">|</span>

          <span className="text-slate-200 font-bold whitespace-nowrap text-xs">
            {dateStr || 'Loading date...'}
          </span>

        </div>

      </div>

      {/* Main Headline */}
      <div className="relative z-10 my-2">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight leading-tight drop-shadow-md">
          Gen Z EdTech Interactive Simulation
        </h1>
        <p className="mt-2 text-xs sm:text-sm text-cyan-100/90 max-w-3xl leading-relaxed font-medium">
          Explore authentic interactive STEM laboratories across physics mechanics, electricity, chemistry reactions, cellular biology, and planetary space dynamics. Switch seamlessly across all 14 modules with single-click direct execution in 4K high fidelity.
        </p>
      </div>

      {/* Ticker / Announcement Bar */}
      <div className="relative z-10 mt-4 p-3 rounded-xl bg-[#06122e]/90 border border-blue-500/40 text-xs text-cyan-100 flex items-center gap-2.5 overflow-hidden shadow-inner">
        <Star className="w-4 h-4 text-amber-400 shrink-0 fill-amber-400 drop-shadow-sm" />
        <div className="font-medium truncate text-xs">
          <span className="font-extrabold text-white">Active Simulation:</span>{' '}
          <span className="text-amber-300 font-black">[{activeSim.indexNumber}] {activeSim.title}</span> ({activeSim.category}) &bull;{' '}
          <span className="text-cyan-300 font-bold">Ready for Interactive Execution &amp; 4K Fullscreen Study</span>
        </div>
      </div>

    </div>
  );
};
