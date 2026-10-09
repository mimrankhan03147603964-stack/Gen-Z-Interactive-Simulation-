import React from 'react';
import { Layers, BookOpen, Atom, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';
import { SimulationItem } from '../types.ts';

interface QuickStatsProps {
  activeSim: SimulationItem;
  totalSimulations: number;
}

export const QuickStats: React.FC<QuickStatsProps> = ({
  activeSim,
  totalSimulations
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
      
      {/* 3D Stat Card 1: Total Simulations (Electric Blue / Cyan Glow) */}
      <div className="relative overflow-hidden rounded-2xl p-5 bg-gradient-to-br from-[#0f2d6b] via-[#123985] to-[#091b40] text-white border border-blue-400/40 shadow-[0_8px_24px_rgba(15,45,107,0.35)] hover:scale-[1.02] transition-transform duration-200">
        <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-400/20 rounded-full blur-2xl pointer-events-none" />
        <div className="flex items-center justify-between gap-3 relative z-10">
          <div>
            <div className="text-[10px] font-black uppercase tracking-wider text-cyan-300">
              TOTAL STEM SIMULATIONS
            </div>
            <div className="text-2xl font-black text-white mt-1 drop-shadow-sm">
              {totalSimulations} Interactive Labs
            </div>
            <div className="text-[11px] font-bold text-cyan-200/90 mt-1 flex items-center gap-1">
              <span>All 14 Modules 4K Ready</span>
              <ArrowRight className="w-3.5 h-3.5 text-cyan-400" />
            </div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-400 text-white flex items-center justify-center shadow-[0_4px_16px_rgba(6,182,212,0.5)] ring-2 ring-white/30 shrink-0">
            <Layers className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* 3D Stat Card 2: Current Discipline (Vivid Violet / Purple Glow) */}
      <div className="relative overflow-hidden rounded-2xl p-5 bg-gradient-to-br from-[#351863] via-[#421d7d] to-[#220f40] text-white border border-purple-400/40 shadow-[0_8px_24px_rgba(53,24,99,0.35)] hover:scale-[1.02] transition-transform duration-200">
        <div className="absolute top-0 right-0 w-24 h-24 bg-purple-400/20 rounded-full blur-2xl pointer-events-none" />
        <div className="flex items-center justify-between gap-3 relative z-10">
          <div>
            <div className="text-[10px] font-black uppercase tracking-wider text-purple-300">
              CURRICULUM DISCIPLINE
            </div>
            <div className="text-lg font-black text-white mt-1 truncate max-w-[170px] drop-shadow-sm">
              {activeSim.category}
            </div>
            <div className="text-[11px] font-bold text-purple-200/90 mt-1 truncate max-w-[170px]">
              {activeSim.subject}
            </div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 to-fuchsia-500 text-white flex items-center justify-center shadow-[0_4px_16px_rgba(168,85,247,0.5)] ring-2 ring-white/30 shrink-0">
            <BookOpen className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* 3D Stat Card 3: Active Module (Radiant Emerald / Green Glow) */}
      <div className="relative overflow-hidden rounded-2xl p-5 bg-gradient-to-br from-[#0c402e] via-[#10523b] to-[#07261b] text-white border border-emerald-400/40 shadow-[0_8px_24px_rgba(12,64,46,0.35)] hover:scale-[1.02] transition-transform duration-200">
        <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-400/20 rounded-full blur-2xl pointer-events-none" />
        <div className="flex items-center justify-between gap-3 relative z-10">
          <div>
            <div className="text-[10px] font-black uppercase tracking-wider text-emerald-300">
              ACTIVE STAGE MODULE
            </div>
            <div className="text-lg font-black text-white mt-1 truncate max-w-[170px] drop-shadow-sm">
              [{activeSim.indexNumber}] {activeSim.title}
            </div>
            <div className="text-[11px] font-bold text-emerald-200/90 mt-1">
              {activeSim.gradeLevel}
            </div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-400 text-white flex items-center justify-center shadow-[0_4px_16px_rgba(16,185,129,0.5)] ring-2 ring-white/30 shrink-0">
            <Atom className="w-6 h-6 animate-spin-slow" />
          </div>
        </div>
      </div>

      {/* 3D Stat Card 4: System Status & 4K Graphics (Amber / Sunburst Glow) */}
      <div className="relative overflow-hidden rounded-2xl p-5 bg-gradient-to-br from-[#592f08] via-[#6e3a0b] to-[#3b1f05] text-white border border-amber-400/40 shadow-[0_8px_24px_rgba(89,47,8,0.35)] hover:scale-[1.02] transition-transform duration-200">
        <div className="absolute top-0 right-0 w-24 h-24 bg-amber-400/20 rounded-full blur-2xl pointer-events-none" />
        <div className="flex items-center justify-between gap-3 relative z-10">
          <div>
            <div className="text-[10px] font-black uppercase tracking-wider text-amber-300">
              SYSTEM ENGINE STATUS
            </div>
            <div className="text-lg font-black text-amber-100 mt-1 flex items-center gap-2 drop-shadow-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_10px_#34d399] animate-pulse"></span>
              <span>4K Ultra Precision</span>
            </div>
            <div className="text-[11px] font-bold text-amber-200/90 mt-1">
              Active Simulation Engine
            </div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 text-white flex items-center justify-center shadow-[0_4px_16px_rgba(245,158,11,0.5)] ring-2 ring-white/30 shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
        </div>
      </div>

    </div>
  );
};
