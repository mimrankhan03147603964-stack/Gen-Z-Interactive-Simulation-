import React from 'react';
import { Menu, Atom, RotateCcw, Maximize2, Layers, Sparkles, MonitorPlay } from 'lucide-react';
import { SimulationItem } from '../types';

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
    <header className="w-full bg-gradient-to-r from-[#060f24] via-[#0b1b3d] to-[#060f24] border-b border-blue-500/30 px-3 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between gap-3 shadow-2xl sticky top-0 z-30">
      
      {/* Left: Navigation Menu Toggle & 3D Glowing Brand Logo */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="btn-3d p-2 rounded-xl bg-gradient-to-b from-[#162a56] to-[#0c1836] border border-blue-400/30 text-cyan-300 hover:text-white transition-all cursor-pointer"
          title="Toggle Navigation Menu (01 - 14)"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2.5 sm:gap-3">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-500 flex items-center justify-center text-white shadow-lg shadow-blue-500/30 icon-tile-3d border border-cyan-300/40 shrink-0">
            <Atom className="w-5 h-5 sm:w-6 sm:h-6 animate-spin-slow" />
          </div>
          <div>
            <div className="text-xs sm:text-sm font-black text-white tracking-wider leading-tight flex items-center gap-1.5 drop-shadow-md">
              <span>GEN Z EDTECH INTERACTIVE SIMULATION</span>
              <span className="hidden xl:inline-block px-1.5 py-0.2 rounded text-[9px] font-black bg-cyan-500/20 text-cyan-300 border border-cyan-400/40">
                4K 3D
              </span>
            </div>
            <div className="text-[10px] sm:text-[11px] text-cyan-300 font-bold tracking-tight drop-shadow-xs">
              Interactive STEM Digital Laboratory Portal &bull; 14 Verified Simulators
            </div>
          </div>
        </div>
      </div>

      {/* Right: Vibrant 3D Action Buttons & Status Indicators */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        
        {/* Active Simulation Pill */}
        <div className="hidden lg:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0a1838] border border-blue-500/40 text-xs font-bold text-white shadow-inner">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse shadow-sm shadow-cyan-400"></span>
          <span className="text-cyan-300 font-mono">[{activeSim.indexNumber}]</span>
          <span className="truncate max-w-[180px]">{activeSim.title}</span>
        </div>

        {/* 14 Labs Counter Pill */}
        <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-950/80 to-amber-900/60 border border-amber-500/50 text-xs font-bold text-amber-300 shadow-sm">
          <Layers className="w-3.5 h-3.5 text-amber-400" />
          <span>14 Labs</span>
        </div>

        {/* 4K Ultra Indicator */}
        <div className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/50 text-[11px] font-bold text-emerald-300 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
          <span>4K Ultra</span>
        </div>

        {/* 3D Emerald Reset Simulation Button */}
        <button
          onClick={onResetLab}
          className="btn-3d px-3 sm:px-3.5 py-1.5 rounded-full bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-500 hover:to-teal-500 text-white border border-emerald-400/50 font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-md"
          title="Reset Active Simulation"
        >
          <RotateCcw className="w-3.5 h-3.5 text-white" />
          <span className="hidden sm:inline">Reset Lab</span>
        </button>

        {/* 3D Rose/Red Fullscreen Launch Button */}
        <button
          onClick={onFullscreen}
          className="btn-3d px-3.5 sm:px-4 py-1.5 rounded-full bg-gradient-to-r from-rose-600 via-red-600 to-rose-700 hover:from-rose-500 hover:to-red-500 text-white border border-rose-400/50 font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-lg shadow-rose-900/40"
          title="Launch 4K Fullscreen View"
        >
          <Maximize2 className="w-3.5 h-3.5" />
          <span>Fullscreen</span>
        </button>

      </div>

    </header>
  );
};
