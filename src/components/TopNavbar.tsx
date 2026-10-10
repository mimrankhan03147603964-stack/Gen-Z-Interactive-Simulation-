import React from 'react';
import { Menu, Atom, RotateCcw, Maximize2, Layers, Sparkles, Sun, Moon } from 'lucide-react';
import { SimulationItem } from '../types';

interface TopNavbarProps {
  activeSim: SimulationItem;
  onToggleSidebar: () => void;
  onResetLab: () => void;
  onFullscreen: () => void;
  isDarkMode?: boolean;
  onToggleTheme?: () => void;
}

export const TopNavbar: React.FC<TopNavbarProps> = ({
  activeSim,
  onToggleSidebar,
  onResetLab,
  onFullscreen,
  isDarkMode = false,
  onToggleTheme
}) => {
  return (
    <header className={`w-full border-b px-3 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between gap-3 shadow-md sticky top-0 z-30 transition-colors ${
      isDarkMode 
        ? 'bg-gradient-to-r from-[#060f24] via-[#0b1b3d] to-[#060f24] border-blue-500/30 text-white' 
        : 'bg-white border-slate-200 text-slate-800'
    }`}>
      
      {/* Left: Navigation Menu Toggle & 3D Glowing Brand Logo */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className={`btn-3d p-2 rounded-xl border transition-all cursor-pointer ${
            isDarkMode
              ? 'bg-gradient-to-b from-[#162a56] to-[#0c1836] border-blue-400/30 text-cyan-300 hover:text-white'
              : 'bg-gradient-to-b from-slate-50 to-slate-100 hover:from-white hover:to-slate-50 border-slate-300 text-slate-700 hover:text-blue-600 shadow-xs'
          }`}
          title="Toggle Navigation Menu (01 - 14)"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2.5 sm:gap-3">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-500 flex items-center justify-center text-white shadow-lg shadow-blue-500/25 icon-tile-3d border border-white/40 shrink-0">
            <Atom className="w-5 h-5 sm:w-6 sm:h-6 animate-spin-slow text-white" />
          </div>
          <div>
            <div className={`text-xs sm:text-sm font-black tracking-wider leading-tight flex items-center gap-1.5 ${
              isDarkMode ? 'text-white' : 'text-slate-900'
            }`}>
              <span>GEN Z EDTECH INTERACTIVE SIMULATION</span>
              <span className="hidden xl:inline-block px-1.5 py-0.2 rounded text-[9px] font-black bg-blue-600 text-white shadow-xs">
                4K 3D
              </span>
            </div>
            <div className={`text-[10px] sm:text-[11px] font-bold tracking-tight ${
              isDarkMode ? 'text-cyan-300' : 'text-blue-700'
            }`}>
              Interactive STEM Digital Laboratory Portal &bull; 14 Verified Simulators
            </div>
          </div>
        </div>
      </div>

      {/* Right: Vibrant 3D Action Buttons & Status Indicators */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        
        {/* Active Simulation Pill */}
        <div className={`hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-bold shadow-xs ${
          isDarkMode 
            ? 'bg-[#0a1838] border-blue-500/40 text-white' 
            : 'bg-blue-50/80 border-blue-200 text-blue-900'
        }`}>
          <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse shadow-xs"></span>
          <span className="font-mono text-blue-600 font-extrabold">[{activeSim.indexNumber}]</span>
          <span className="truncate max-w-[170px]">{activeSim.title}</span>
        </div>

        {/* 14 Labs Counter Pill - Vibrant Amber */}
        <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/40 text-xs font-bold text-amber-700 dark:text-amber-300 shadow-2xs">
          <Layers className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
          <span>14 Labs</span>
        </div>

        {/* 4K Ultra Indicator - Vibrant Emerald */}
        <div className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/40 text-[11px] font-bold text-emerald-700 dark:text-emerald-300 shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          <span>4K Ultra</span>
        </div>

        {/* Theme Toggle Button (Light / Dark) */}
        {onToggleTheme && (
          <button
            onClick={onToggleTheme}
            className={`btn-3d px-2.5 sm:px-3 py-1.5 rounded-full border text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs ${
              isDarkMode
                ? 'bg-amber-400 text-slate-950 border-amber-300 hover:bg-amber-300'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300'
            }`}
            title={isDarkMode ? "Switch to Bright Light Display" : "Switch to Dark Display"}
          >
            {isDarkMode ? (
              <>
                <Sun className="w-3.5 h-3.5 text-amber-950" />
                <span className="hidden md:inline font-extrabold text-[11px]">روشن ڈسپلے</span>
              </>
            ) : (
              <>
                <Moon className="w-3.5 h-3.5 text-indigo-700" />
                <span className="hidden md:inline font-extrabold text-[11px]">Theme</span>
              </>
            )}
          </button>
        )}

        {/* 3D Emerald Reset Simulation Button */}
        <button
          onClick={onResetLab}
          className="btn-3d px-3 sm:px-3.5 py-1.5 rounded-full bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-500 hover:to-teal-500 text-white border border-emerald-400 font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-md shadow-emerald-600/20"
          title="Reset Active Simulation Parameters"
        >
          <RotateCcw className="w-3.5 h-3.5 text-white" />
          <span className="hidden sm:inline">Reset Lab</span>
        </button>

        {/* 3D Rose/Red Fullscreen Launch Button */}
        <button
          onClick={onFullscreen}
          className="btn-3d px-3.5 sm:px-4 py-1.5 rounded-full bg-gradient-to-r from-rose-600 via-red-600 to-rose-700 hover:from-rose-500 hover:to-red-500 text-white border border-rose-400 font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-md shadow-rose-600/25"
          title="Launch 4K Fullscreen View"
        >
          <Maximize2 className="w-3.5 h-3.5 text-white" />
          <span>Fullscreen</span>
        </button>

      </div>

    </header>
  );
};
