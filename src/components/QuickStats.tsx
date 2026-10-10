import React from 'react';
import { Layers, BookOpen, Atom, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';
import { SimulationItem } from '../types';

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
      
      {/* 3D Stat Card 1: Total Simulations (Electric Blue & Cyan 3D Glass) */}
      <div className="card-3d p-4.5 bg-gradient-to-br from-[#0c224f] via-[#081738] to-[#040e24] border border-blue-500/40 rounded-2xl shadow-xl flex items-center justify-between gap-3 group">
        <div className="min-w-0">
          <div className="text-[11px] font-black uppercase tracking-wider text-cyan-300 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
            <span>TOTAL SIMULATIONS</span>
          </div>
          <div className="text-xl sm:text-2xl font-black text-white mt-1 drop-shadow-md">
            {totalSimulations} STEM Labs
          </div>
          <div className="text-[11px] font-bold text-cyan-200 mt-1 flex items-center gap-1">
            <span>All modules ready</span>
            <ArrowRight className="w-3 h-3 text-cyan-400" />
          </div>
        </div>
        <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-500 text-white flex items-center justify-center shadow-lg shadow-blue-500/30 icon-tile-3d border border-cyan-300/40 shrink-0 group-hover:scale-105 transition-transform">
          <Layers className="w-6 h-6 drop-shadow-sm" />
        </div>
      </div>

      {/* 3D Stat Card 2: Current Discipline (Electric Purple & Violet 3D Glass) */}
      <div className="card-3d p-4.5 bg-gradient-to-br from-[#2a134a] via-[#1a0a33] to-[#0d041e] border border-purple-500/40 rounded-2xl shadow-xl flex items-center justify-between gap-3 group">
        <div className="min-w-0">
          <div className="text-[11px] font-black uppercase tracking-wider text-purple-300 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span>
            <span>CURRENT DISCIPLINE</span>
          </div>
          <div className="text-lg sm:text-xl font-black text-white mt-1 truncate max-w-[170px] drop-shadow-md">
            {activeSim.category}
          </div>
          <div className="text-[11px] font-bold text-purple-200 mt-1 truncate max-w-[170px]">
            {activeSim.subject}
          </div>
        </div>
        <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-purple-600 to-pink-500 text-white flex items-center justify-center shadow-lg shadow-purple-500/30 icon-tile-3d border border-pink-300/40 shrink-0 group-hover:scale-105 transition-transform">
          <BookOpen className="w-6 h-6 drop-shadow-sm" />
        </div>
      </div>

      {/* 3D Stat Card 3: Active Module (Electric Emerald & Mint 3D Glass) */}
      <div className="card-3d p-4.5 bg-gradient-to-br from-[#0c382b] via-[#07241b] to-[#031510] border border-emerald-500/40 rounded-2xl shadow-xl flex items-center justify-between gap-3 group">
        <div className="min-w-0">
          <div className="text-[11px] font-black uppercase tracking-wider text-emerald-300 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            <span>ACTIVE MODULE</span>
          </div>
          <div className="text-lg sm:text-xl font-black text-white mt-1 truncate max-w-[170px] drop-shadow-md">
            [{activeSim.indexNumber}] {activeSim.title}
          </div>
          <div className="text-[11px] font-bold text-emerald-200 mt-1 truncate max-w-[170px]">
            {activeSim.gradeLevel}
          </div>
        </div>
        <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 text-white flex items-center justify-center shadow-lg shadow-emerald-500/30 icon-tile-3d border border-teal-300/40 shrink-0 group-hover:scale-105 transition-transform">
          <Atom className="w-6 h-6 drop-shadow-sm" />
        </div>
      </div>

      {/* 3D Stat Card 4: 3D Visual Engine & Status (Electric Amber & Gold 3D Glass) */}
      <div className="card-3d p-4.5 bg-gradient-to-br from-[#3b2707] via-[#241804] to-[#140d02] border border-amber-500/40 rounded-2xl shadow-xl flex items-center justify-between gap-3 group">
        <div className="min-w-0">
          <div className="text-[11px] font-black uppercase tracking-wider text-amber-300 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
            <span>3D VISUAL ENGINE</span>
          </div>
          <div className="text-lg sm:text-xl font-black text-amber-300 mt-1 flex items-center gap-1.5 drop-shadow-md">
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
            <span>4K Ultra 3D</span>
          </div>
          <div className="text-[11px] font-bold text-emerald-300 mt-1 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>High-Fidelity Display</span>
          </div>
        </div>
        <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 text-white flex items-center justify-center shadow-lg shadow-amber-500/30 icon-tile-3d border border-amber-300/40 shrink-0 group-hover:scale-105 transition-transform">
          <ShieldCheck className="w-6 h-6 drop-shadow-sm" />
        </div>
      </div>

    </div>
  );
};
