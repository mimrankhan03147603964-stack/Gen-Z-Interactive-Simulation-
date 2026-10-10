import React from 'react';
import { Layers, BookOpen, Atom, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';
import { SimulationItem } from '../types';

interface QuickStatsProps {
  activeSim: SimulationItem;
  totalSimulations: number;
  isDarkMode?: boolean;
}

export const QuickStats: React.FC<QuickStatsProps> = ({
  activeSim,
  totalSimulations,
  isDarkMode = false
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
      
      {/* 3D Stat Card 1: Total Simulations (Vibrant Oceanic Blue) */}
      <div className={`p-4.5 rounded-2xl border transition-all duration-200 flex items-center justify-between gap-3 group ${
        isDarkMode
          ? 'card-3d-dark bg-gradient-to-br from-[#0c224f] to-[#040e24] border-blue-500/40 text-white shadow-xl'
          : 'card-3d-light bg-gradient-to-br from-white via-blue-50/40 to-blue-100/30 border-blue-200 text-slate-800 shadow-sm hover:border-blue-400'
      }`}>
        <div className="min-w-0">
          <div className="text-[11px] font-black uppercase tracking-wider text-blue-600 dark:text-cyan-300 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-blue-500 shadow-xs"></span>
            <span>TOTAL SIMULATIONS</span>
          </div>
          <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-1 drop-shadow-xs">
            {totalSimulations} STEM Labs
          </div>
          <div className="text-[11px] font-bold text-blue-700 dark:text-cyan-200 mt-1 flex items-center gap-1">
            <span>All 14 active & ready</span>
            <ArrowRight className="w-3 h-3 text-blue-500 dark:text-cyan-400" />
          </div>
        </div>
        <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-500 text-white flex items-center justify-center shadow-lg shadow-blue-500/25 icon-tile-3d border border-white/40 shrink-0 group-hover:scale-105 transition-transform">
          <Layers className="w-6 h-6 text-white drop-shadow-sm" />
        </div>
      </div>

      {/* 3D Stat Card 2: Current Discipline (Vibrant Royal Purple) */}
      <div className={`p-4.5 rounded-2xl border transition-all duration-200 flex items-center justify-between gap-3 group ${
        isDarkMode
          ? 'card-3d-dark bg-gradient-to-br from-[#2a134a] to-[#0d041e] border-purple-500/40 text-white shadow-xl'
          : 'card-3d-light bg-gradient-to-br from-white via-purple-50/40 to-purple-100/30 border-purple-200 text-slate-800 shadow-sm hover:border-purple-400'
      }`}>
        <div className="min-w-0">
          <div className="text-[11px] font-black uppercase tracking-wider text-purple-600 dark:text-purple-300 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-purple-500 shadow-xs"></span>
            <span>CURRENT DISCIPLINE</span>
          </div>
          <div className="text-lg sm:text-xl font-black text-slate-900 dark:text-white mt-1 truncate max-w-[170px] drop-shadow-xs">
            {activeSim.category}
          </div>
          <div className="text-[11px] font-bold text-purple-700 dark:text-purple-200 mt-1 truncate max-w-[170px]">
            {activeSim.subject}
          </div>
        </div>
        <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-purple-600 to-pink-500 text-white flex items-center justify-center shadow-lg shadow-purple-500/25 icon-tile-3d border border-white/40 shrink-0 group-hover:scale-105 transition-transform">
          <BookOpen className="w-6 h-6 text-white drop-shadow-sm" />
        </div>
      </div>

      {/* 3D Stat Card 3: Active Module (Vibrant Emerald) */}
      <div className={`p-4.5 rounded-2xl border transition-all duration-200 flex items-center justify-between gap-3 group ${
        isDarkMode
          ? 'card-3d-dark bg-gradient-to-br from-[#0c382b] to-[#031510] border-emerald-500/40 text-white shadow-xl'
          : 'card-3d-light bg-gradient-to-br from-white via-emerald-50/40 to-emerald-100/30 border-emerald-200 text-slate-800 shadow-sm hover:border-emerald-400'
      }`}>
        <div className="min-w-0">
          <div className="text-[11px] font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-300 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-xs"></span>
            <span>ACTIVE MODULE</span>
          </div>
          <div className="text-lg sm:text-xl font-black text-slate-900 dark:text-white mt-1 truncate max-w-[170px] drop-shadow-xs">
            [{activeSim.indexNumber}] {activeSim.title}
          </div>
          <div className="text-[11px] font-bold text-emerald-700 dark:text-emerald-200 mt-1 truncate max-w-[170px]">
            {activeSim.gradeLevel}
          </div>
        </div>
        <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center shadow-lg shadow-emerald-500/25 icon-tile-3d border border-white/40 shrink-0 group-hover:scale-105 transition-transform">
          <Atom className="w-6 h-6 text-white drop-shadow-sm" />
        </div>
      </div>

      {/* 3D Stat Card 4: 3D Visual Engine & Status (Vibrant Amber & Gold) */}
      <div className={`p-4.5 rounded-2xl border transition-all duration-200 flex items-center justify-between gap-3 group ${
        isDarkMode
          ? 'card-3d-dark bg-gradient-to-br from-[#3b2707] to-[#140d02] border-amber-500/40 text-white shadow-xl'
          : 'card-3d-light bg-gradient-to-br from-white via-amber-50/40 to-amber-100/30 border-amber-200 text-slate-800 shadow-sm hover:border-amber-400'
      }`}>
        <div className="min-w-0">
          <div className="text-[11px] font-black uppercase tracking-wider text-amber-600 dark:text-amber-300 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-500 shadow-xs"></span>
            <span>VISUAL ENGINE</span>
          </div>
          <div className="text-lg sm:text-xl font-black text-amber-700 dark:text-amber-300 mt-1 flex items-center gap-1.5 drop-shadow-xs">
            <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
            <span>4K Ultra 3D</span>
          </div>
          <div className="text-[11px] font-bold text-emerald-600 dark:text-emerald-300 mt-1 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-xs"></span>
            <span>High Fidelity Active</span>
          </div>
        </div>
        <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 text-white flex items-center justify-center shadow-lg shadow-amber-500/25 icon-tile-3d border border-white/40 shrink-0 group-hover:scale-105 transition-transform">
          <ShieldCheck className="w-6 h-6 text-white drop-shadow-sm" />
        </div>
      </div>

    </div>
  );
};
