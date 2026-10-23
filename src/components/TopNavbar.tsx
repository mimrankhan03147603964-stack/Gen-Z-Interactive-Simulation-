import React from 'react';
import { Menu, Sparkles } from 'lucide-react';
import { SimulationItem } from '../types';

interface TopNavbarProps {
  activeSim?: SimulationItem | null;
  totalSimulations?: number;
  onToggleSidebar?: () => void;
  onResetLab?: () => void;
  onFullscreen?: () => void;
  isDarkMode?: boolean;
  onToggleTheme?: () => void;
  onBackToCatalog?: () => void;
}

export const TopNavbar: React.FC<TopNavbarProps> = ({
  totalSimulations = 74,
  onToggleSidebar,
  onBackToCatalog
}) => {
  return (
    <header 
      className="sticky top-0 z-[1000] w-full bg-white border-b-2 border-slate-200 shadow-md transition-all text-slate-800" 
      style={{ zIndex: 1000, position: 'sticky', top: 0 }}
    >
      <div className="max-w-[1720px] 2xl:max-w-[1820px] mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between gap-3 sm:gap-4">
        
        {/* Left: Hamburger Button, GZ Monogram & Title */}
        <div className="flex items-center gap-3">
          {/* Hamburger Menu Drawer Trigger */}
          <button
            type="button"
            id="hamburger-menu-btn"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (onToggleSidebar) {
                onToggleSidebar();
              }
            }}
            className="p-2 sm:p-2.5 rounded-2xl bg-white hover:bg-slate-50 active:bg-slate-100 border border-[rgba(220,235,255,0.9)] text-slate-700 hover:text-blue-600 transition-all active:scale-95 cursor-pointer flex items-center justify-center shrink-0 shadow-[0_4px_14px_rgba(0,60,130,0.05),inset_0_1px_1px_rgba(255,255,255,0.95)]"
            title="Open STEM Subjects & Categories Drawer"
            aria-label="Open STEM Subjects & Categories Drawer"
          >
            <Menu className="w-5 h-5 text-slate-700 pointer-events-none shrink-0" />
          </button>

          {/* GZ Monogram Logo - Official Logo */}
          <div 
            onClick={onBackToCatalog}
            className="w-20 h-10 sm:w-24 sm:h-11 rounded-xl flex items-center justify-center shrink-0 p-1 bg-slate-950 border border-slate-700 transition-all hover:scale-105 cursor-pointer overflow-hidden shadow-md"
            title="Gen Z Interactive Simulations Home"
          >
            <img 
              src="/genz-official-logo.png" 
              alt="Gen Z Interactive Simulations Official Logo" 
              className="w-full h-full object-contain pointer-events-none" 
            />
          </div>

          <div>
            <div className="text-xs sm:text-sm md:text-base font-black tracking-tight leading-tight flex items-center gap-2">
              <span className="font-heading font-black tracking-tight text-slate-900 drop-shadow-2xs">
                GEN Z INTERACTIVE SIMULATIONS
              </span>
              <span className="hidden sm:inline-block px-2 py-0.5 rounded-full text-[10px] font-mono font-black bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-xs">
                4K UHD
              </span>
            </div>
            <div className="text-[10px] sm:text-[11px] font-semibold text-slate-500 flex items-center gap-1.5 flex-wrap mt-0.5">
              <span>Digital Laboratory Portal &bull; {totalSimulations} Verified Simulations</span>
              <span className="text-slate-300 hidden md:inline">&bull;</span>
              <span className="hidden md:inline px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/90 shadow-2xs">
                Aligned with National Curriculum of Pakistan (Session 2026-27)
              </span>
            </div>
          </div>
        </div>

        {/* Center Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full bg-white/80 border border-[rgba(220,235,255,0.9)] shadow-[0_2px_8px_rgba(0,80,180,0.04)]">
          <a
            href="#catalog"
            className="px-3 py-1 rounded-full text-slate-600 hover:text-blue-600 hover:bg-sky-50 transition-colors"
          >
            STEM Catalog ({totalSimulations} Labs)
          </a>
          <a
            href="#features"
            className="px-3 py-1 rounded-full text-slate-600 hover:text-blue-600 hover:bg-sky-50 transition-colors"
          >
            Capabilities
          </a>
          <a
            href="#developer"
            className="px-3 py-1 rounded-full text-slate-600 hover:text-blue-600 hover:bg-sky-50 transition-colors"
          >
            Developer
          </a>
        </div>

        {/* Right Action Button: Explore Catalog with Primary Vibrant Gradient & Soft Glow */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <a
            href="#catalog"
            className="clay-btn-primary px-4 py-2 rounded-2xl text-xs sm:text-sm font-black flex items-center gap-1.5 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300 pointer-events-none" />
            <span>Explore Catalog</span>
          </a>
        </div>

      </div>
    </header>
  );
};
