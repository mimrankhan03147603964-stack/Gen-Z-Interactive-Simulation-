import React from 'react';
import { Layers, BookOpen, Atom, ShieldCheck, ArrowRight } from 'lucide-react';
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
      
      {/* Stat Card 1: Total Simulations */}
      <div className="bg-white rounded-2xl p-4.5 border border-slate-200/90 shadow-xs flex items-center justify-between gap-3">
        <div>
          <div className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
            TOTAL SIMULATIONS
          </div>
          <div className="text-xl font-black text-slate-900 mt-1">
            {totalSimulations} Labs
          </div>
          <div className="text-[11px] font-semibold text-blue-600 mt-1 flex items-center gap-1">
            <span>All modules ready</span>
            <ArrowRight className="w-3 h-3" />
          </div>
        </div>
        <div className="w-11 h-11 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-sm shadow-blue-500/20 shrink-0">
          <Layers className="w-5 h-5" />
        </div>
      </div>

      {/* Stat Card 2: Current Discipline */}
      <div className="bg-white rounded-2xl p-4.5 border border-slate-200/90 shadow-xs flex items-center justify-between gap-3">
        <div>
          <div className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
            CURRENT DISCIPLINE
          </div>
          <div className="text-base font-black text-slate-900 mt-1 truncate max-w-[160px]">
            {activeSim.category}
          </div>
          <div className="text-[11px] font-semibold text-purple-600 mt-1 flex items-center gap-1">
            <span>{activeSim.subject}</span>
          </div>
        </div>
        <div className="w-11 h-11 rounded-xl bg-purple-600 text-white flex items-center justify-center shadow-sm shadow-purple-500/20 shrink-0">
          <BookOpen className="w-5 h-5" />
        </div>
      </div>

      {/* Stat Card 3: Active Module */}
      <div className="bg-white rounded-2xl p-4.5 border border-slate-200/90 shadow-xs flex items-center justify-between gap-3">
        <div>
          <div className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
            ACTIVE MODULE
          </div>
          <div className="text-base font-black text-slate-900 mt-1 truncate max-w-[160px]">
            {activeSim.indexNumber}. {activeSim.title}
          </div>
          <div className="text-[11px] font-semibold text-emerald-600 mt-1 flex items-center gap-1">
            <span>{activeSim.gradeLevel}</span>
          </div>
        </div>
        <div className="w-11 h-11 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-sm shadow-emerald-500/20 shrink-0">
          <Atom className="w-5 h-5" />
        </div>
      </div>

      {/* Stat Card 4: System License & Verification */}
      <div className="bg-white rounded-2xl p-4.5 border border-slate-200/90 shadow-xs flex items-center justify-between gap-3">
        <div>
          <div className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
            SYSTEM STATUS
          </div>
          <div className="text-base font-black text-emerald-700 mt-1 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
            <span>Active &amp; Ready</span>
          </div>
          <div className="text-[11px] font-semibold text-slate-500 mt-1">
            Production Vercel Ready
          </div>
        </div>
        <div className="w-11 h-11 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-sm shadow-amber-500/20 shrink-0">
          <ShieldCheck className="w-5 h-5" />
        </div>
      </div>

    </div>
  );
};
