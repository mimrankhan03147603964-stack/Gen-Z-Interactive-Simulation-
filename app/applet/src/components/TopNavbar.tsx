import React from 'react';
import { Menu, Atom, RotateCcw, Maximize2, Layers, Sparkles } from 'lucide-react';
import { SimulationItem } from '../types.ts';

interface TopNavbarProps {
  activeSim: SimulationItem;
  onToggleSidebar: () => void;
  onResetLab: () => void;
  onFullscreen: () => void;
}

export const TopNavbar: React.FC<TopNavbarProps> = ({
  activeSim,
  onToggleSidebar,
  onResetLab,
  onFullscreen
}) => {
  return (
    <header className="w-full bg-[#07132e] text-white border-b border-blue-900/60 px-4 sm:px-6 py-3 flex items-center justify-between gap-4 shadow-xl sticky top-0 z-30">
      
      {/* Left: Hamburger Toggle & Logo Wordmark */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="p-2 rounded-xl bg-[#0e214d] hover:bg-[#142e6a] border border-blue-700/50 text-blue-200 hover:text-white transition-all cursor-pointer shadow-xs active:scale-95"
          title="Toggle Navigation Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2.5">
          <div className="w-9.5 h-9.5 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-500 to-cyan-400 flex items-center justify-center text-white shadow-[0_0_16px_rgba(6,182,212,0.5)] ring-1 ring-white/30">
            <Atom className="w-5.5 h-5.5 animate-spin-slow" />
          </div>
          <div>
            <div className="text-xs sm:text-sm font-black text-white tracking-tight leading-tight drop-shadow-sm">
              GEN Z EDTECH INTERACTIVE SIMULATION
            </div>
            <div className="text-[11px] text-cyan-300 font-bold tracking-tight flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>4K High-Definition STEM Simulation Portal</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right: 3D Glossy Action Buttons */}
      <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
        
        {/* Active Simulation Pill */}
        <div className="hidden md:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0e2456] border border-blue-600/50 text-xs font-bold text-cyan-200 shadow-inner">
          <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee] animate-pulse"></span>
          <span>Lab {activeSim.indexNumber}: {activeSim.title}</span>
        </div>

        {/* 14 Labs 3D Badge */}
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-600/30 to-orange-600/30 border border-amber-500/50 text-xs font-black text-amber-300 shadow-2xs">
          <Layers className="w-3.5 h-3.5 text-amber-400" />
          <span>14 Labs</span>
        </div>

        {/* 3D Reset Lab Button */}
        <button
          onClick={onResetLab}
          className="px-3.5 py-1.5 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-xs flex items-center gap-1.5 shadow-[0_4px_12px_rgba(16,185,129,0.35)] ring-1 ring-white/20 transition-all cursor-pointer active:scale-95"
          title="Reset Active Simulation"
        >
          <RotateCcw className="w-3.5 h-3.5 text-white" />
          <span className="hidden sm:inline">Reset</span>
        </button>

        {/* 3D Fullscreen Button */}
        <button
          onClick={onFullscreen}
          className="px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-black text-xs flex items-center gap-1.5 shadow-[0_4px_16px_rgba(59,130,246,0.45)] ring-1 ring-white/30 transition-all cursor-pointer active:scale-95"
          title="Launch Fullscreen"
        >
          <Maximize2 className="w-3.5 h-3.5" />
          <span>Fullscreen</span>
        </button>

      </div>

    </header>
  );
};
