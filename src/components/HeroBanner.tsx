import React, { useState, useEffect } from 'react';
import { Clock, Calendar, Sparkles, Star } from 'lucide-react';
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
      hours = hours ? hours : 12; // '0' becomes 12
      const formattedHours = String(hours).padStart(2, '0');

      setTime(`${formattedHours}:${minutes}:${seconds}`);
      setPeriod(ampm);

      // Format Date: Friday, 09 October 2026
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
    <div className="w-full rounded-2xl bg-gradient-to-r from-[#0d2149] via-[#122e66] to-[#0a1936] text-white p-6 sm:p-8 shadow-xl border border-blue-900/60 relative overflow-hidden">
      
      {/* Background Decorative Lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-36 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 w-80 h-28 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />

      {/* Top Row: Pill Badge on Left + Digital Clock Widget on Right (Matching User Screenshot) */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4 relative z-10">
        
        {/* Left Pill Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-900/70 border border-blue-400/30 text-xs font-bold text-blue-200 tracking-wide uppercase shadow-inner">
          <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
          <span>GEN Z EDTECH SIMULATION PORTAL</span>
        </div>

        {/* Right: Digital Clock Widget (Yellow LED Time, Blue AM/PM Pill, Green Separator, White Date) */}
        <div className="px-4 py-1.5 rounded-full bg-[#07132e] border border-blue-600/40 shadow-md flex items-center gap-2.5 text-xs">
          
          <div className="flex items-center gap-1.5 font-mono font-black text-amber-400 text-sm tracking-wider">
            <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>{time || '00:00:00'}</span>
          </div>

          <span className="px-1.5 py-0.2 rounded-md bg-blue-600 text-[10px] font-bold text-white uppercase shadow-xs">
            {period}
          </span>

          <span className="text-emerald-400 font-bold">|</span>

          <span className="text-slate-200 font-medium whitespace-nowrap text-xs">
            {dateStr || 'Loading date...'}
          </span>

        </div>

      </div>

      {/* Main Headline (Exact Title Prominently Displayed) */}
      <div className="relative z-10 my-3">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
          Gen Z EdTech Interactive Simulation
        </h1>
        <p className="mt-2 text-xs sm:text-sm text-blue-100/90 max-w-3xl leading-relaxed">
          Explore authentic interactive STEM laboratories across physics mechanics, electricity, chemistry reactions, cellular biology, and planetary space dynamics. Switch seamlessly across all 14 modules with single-click direct execution.
        </p>
      </div>

      {/* Ticker / Announcement Bar (Matching Screenshot's Star Ticker Bar) */}
      <div className="relative z-10 mt-5 p-2.5 rounded-xl bg-[#06122b]/90 border border-blue-700/40 text-xs text-blue-100 flex items-center gap-2 overflow-hidden shadow-inner">
        <Star className="w-4 h-4 text-amber-400 shrink-0 fill-amber-400" />
        <div className="font-medium truncate">
          <span className="font-bold text-white">Active Simulation:</span> [{activeSim.indexNumber}] {activeSim.title} ({activeSim.category}) &bull; <span className="text-cyan-300 font-bold">Ready for Interactive Execution &amp; Fullscreen Study</span>
        </div>
      </div>

    </div>
  );
};
