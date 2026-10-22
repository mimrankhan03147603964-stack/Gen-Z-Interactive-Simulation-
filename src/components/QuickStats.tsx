import React from 'react';
import { Layers, BookOpen, Atom, Sparkles, ArrowRight } from 'lucide-react';
import { SimulationItem } from '../types';

interface QuickStatsProps {
  activeSim?: SimulationItem | null;
  totalSimulations: number;
  isDarkMode?: boolean;
}

export const QuickStats: React.FC<QuickStatsProps> = ({
  activeSim,
  totalSimulations,
  isDarkMode = true
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full opacity-100">
      
      {/* Stat Card 1: Total Simulations (Solid Royal Blue) */}
      <div 
        className="p-4.5 rounded-2xl border-2 transition-all duration-200 flex items-center justify-between gap-3 group btn-3d opacity-100 bg-[#10244c] border-blue-400 shadow-xl text-white"
      >
        <div className="min-w-0">
          <div 
            className="text-[11px] font-black uppercase tracking-wider flex items-center gap-1.5 text-cyan-300"
          >
            <span 
              className="w-2.5 h-2.5 rounded-full shadow-xs bg-blue-400" 
            />
            <span>TOTAL SIMULATIONS</span>
          </div>
          <div 
            className="text-xl sm:text-2xl font-black mt-1 drop-shadow-xs text-white"
          >
            {totalSimulations} STEM Labs
          </div>
          <div 
            className="text-[11px] font-black mt-1 flex items-center gap-1 text-cyan-200"
          >
            <span>All {totalSimulations} active &amp; ready</span>
            <ArrowRight className="w-3.5 h-3.5 font-black" />
          </div>
        </div>
        <div 
          className="w-12 h-12 rounded-xl text-white flex items-center justify-center shadow-lg icon-tile-3d shrink-0 group-hover:scale-105 transition-transform bg-gradient-to-br from-blue-600 to-indigo-700 border-2 border-white"
        >
          <Layers className="w-6 h-6 text-white drop-shadow-sm" />
        </div>
      </div>

      {/* Stat Card 2: Current Discipline (Solid Royal Purple) */}
      <div 
        className="p-4.5 rounded-2xl border-2 transition-all duration-200 flex items-center justify-between gap-3 group btn-3d opacity-100 bg-[#1f1442] border-purple-400 shadow-xl text-white"
      >
        <div className="min-w-0">
          <div 
            className="text-[11px] font-black uppercase tracking-wider flex items-center gap-1.5 text-purple-300"
          >
            <span 
              className="w-2.5 h-2.5 rounded-full shadow-xs bg-purple-400" 
            />
            <span>{activeSim ? 'CURRENT DISCIPLINE' : 'CORE DISCIPLINES'}</span>
          </div>
          <div 
            className="text-lg sm:text-xl font-black mt-1 truncate max-w-[170px] drop-shadow-xs text-white"
          >
            {activeSim ? activeSim.category : '9 Key Subjects'}
          </div>
          <div 
            className="text-[11px] font-black mt-1 truncate max-w-[170px] text-purple-200"
          >
            {activeSim ? activeSim.subject : 'Curriculum Aligned'}
          </div>
        </div>
        <div 
          className="w-12 h-12 rounded-xl text-white flex items-center justify-center shadow-lg icon-tile-3d shrink-0 group-hover:scale-105 transition-transform bg-gradient-to-br from-purple-600 to-pink-600 border-2 border-white"
        >
          <BookOpen className="w-6 h-6 text-white drop-shadow-sm" />
        </div>
      </div>

      {/* Stat Card 3: Active Module (Solid Emerald) */}
      <div 
        className="p-4.5 rounded-2xl border-2 transition-all duration-200 flex items-center justify-between gap-3 group btn-3d opacity-100 bg-[#0d2e24] border-emerald-400 shadow-xl text-white"
      >
        <div className="min-w-0">
          <div 
            className="text-[11px] font-black uppercase tracking-wider flex items-center gap-1.5 text-emerald-300"
          >
            <span 
              className="w-2.5 h-2.5 rounded-full shadow-xs bg-emerald-400" 
            />
            <span>{activeSim ? 'ACTIVE MODULE' : 'LAB STATUS'}</span>
          </div>
          <div 
            className="text-lg sm:text-xl font-black mt-1 truncate max-w-[170px] drop-shadow-xs text-white"
          >
            {activeSim ? `[${activeSim.indexNumber}] ${activeSim.title}` : 'On-Demand Loading'}
          </div>
          <div 
            className="text-[11px] font-black mt-1 truncate max-w-[170px] text-emerald-200"
          >
            {activeSim ? activeSim.gradeLevel : 'Select any Topic Card below'}
          </div>
        </div>
        <div 
          className="w-12 h-12 rounded-xl text-white flex items-center justify-center shadow-lg icon-tile-3d shrink-0 group-hover:scale-105 transition-transform bg-gradient-to-br from-emerald-600 to-teal-700 border-2 border-white"
        >
          <Atom className="w-6 h-6 text-white drop-shadow-sm" />
        </div>
      </div>

      {/* Stat Card 4: 3D Visual Engine & Status (Solid Amber) */}
      <div 
        className="p-4.5 rounded-2xl border-2 transition-all duration-200 flex items-center justify-between gap-3 group btn-3d opacity-100 bg-[#331c0a] border-amber-400 shadow-xl text-white"
      >
        <div className="min-w-0">
          <div 
            className="text-[11px] font-black uppercase tracking-wider flex items-center gap-1.5 text-amber-300"
          >
            <span 
              className="w-2.5 h-2.5 rounded-full shadow-xs bg-amber-400" 
            />
            <span>VISUAL ENGINE</span>
          </div>
          <div 
            className="text-lg sm:text-xl font-black mt-1 flex items-center gap-1.5 drop-shadow-xs text-white"
          >
            <Sparkles className="w-4 h-4 shrink-0 text-amber-300" />
            <span>4K Full HD</span>
          </div>
          <div 
            className="text-[11px] font-black mt-1 text-amber-200"
          >
            Live HTML5 / Canvas 60 FPS
          </div>
        </div>
        <div 
          className="w-12 h-12 rounded-xl text-white flex items-center justify-center shadow-lg icon-tile-3d shrink-0 group-hover:scale-105 transition-transform bg-gradient-to-br from-amber-500 to-orange-600 border-2 border-white"
        >
          <Sparkles className="w-6 h-6 text-white drop-shadow-sm" />
        </div>
      </div>

    </div>
  );
};
