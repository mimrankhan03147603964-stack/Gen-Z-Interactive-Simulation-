import React from 'react';
import { Menu, Atom, RotateCcw, Maximize2, Layers, Sparkles, CheckCircle2 } from 'lucide-react';
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
    <header className="w-full bg-white border-b border-slate-200 px-4 sm:px-6 py-3 flex items-center justify-between gap-4 shadow-xs sticky top-0 z-30">
      
      {/* Left: Hamburger Toggle & Logo Wordmark */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
          title="Toggle Navigation Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-700 to-indigo-600 flex items-center justify-center text-white shadow-xs">
            <Atom className="w-5 h-5 animate-spin-slow" />
          </div>
          <div>
            <div className="text-xs sm:text-sm font-black text-slate-900 tracking-tight leading-tight">
              GEN Z EDTECH INTERACTIVE SIMULATION
            </div>
            <div className="text-[11px] text-blue-600 font-semibold tracking-tight">
              Interactive STEM Digital Laboratory Portal
            </div>
          </div>
        </div>
      </div>

      {/* Right: Vibrant Pill Action Buttons (matching screenshot styling) */}
      <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
        
        {/* Active Simulation Pill */}
        <div className="hidden md:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-xs font-bold text-blue-700 shadow-2xs">
          <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
          <span>Lab {activeSim.indexNumber}: {activeSim.title}</span>
        </div>

        {/* 14 Labs Badge */}
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-xs font-bold text-amber-700 shadow-2xs">
          <Layers className="w-3.5 h-3.5" />
          <span>14 Labs</span>
        </div>

        {/* Reset Lab Button */}
        <button
          onClick={onResetLab}
          className="px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 font-semibold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
          title="Reset Active Simulation"
        >
          <RotateCcw className="w-3.5 h-3.5 text-blue-600" />
          <span className="hidden sm:inline">Reset</span>
        </button>

        {/* Fullscreen Button */}
        <button
          onClick={onFullscreen}
          className="px-3.5 py-1.5 rounded-full bg-red-600 hover:bg-red-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
          title="Launch Fullscreen"
        >
          <Maximize2 className="w-3.5 h-3.5" />
          <span>Fullscreen</span>
        </button>

      </div>

    </header>
  );
};
