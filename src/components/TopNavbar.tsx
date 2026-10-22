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
      className="sticky top-0 z-[1000] w-full bg-[#0c1c3d] border-b-2 border-blue-400 shadow-2xl transition-all text-white" 
      style={{ zIndex: 1000, position: 'sticky', top: 0 }}
    >
      <div className="max-w-[1580px] mx-auto px-3 sm:px-6 py-2.5 flex items-center justify-between gap-3 sm:gap-4">
        
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
            className="p-2 sm:p-2.5 rounded-xl bg-[#10244c] hover:bg-[#18356d] active:bg-[#0a1836] border-2 border-blue-400 text-white hover:text-cyan-300 transition-all active:scale-95 cursor-pointer flex items-center justify-center shrink-0 shadow-md"
            title="Open STEM Subjects & Categories Drawer"
            aria-label="Open STEM Subjects & Categories Drawer"
          >
            <Menu className="w-5 h-5 text-white pointer-events-none shrink-0" />
          </button>

          {/* GZ Monogram Logo - Navy elevated pedestal */}
          <div 
            onClick={onBackToCatalog}
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center shrink-0 p-1 bg-[#0f2347] border-2 border-blue-400 transition-all hover:scale-110 cursor-pointer overflow-hidden shadow-md"
            style={{
              boxShadow: '0 6px 16px -2px rgba(2, 132, 199, 0.4)'
            }}
            title="Gen Z Interactive Simulations Home"
          >
            <img 
              src="/genz-monogram.png" 
              alt="Gen Z Interactive Simulations Monogram" 
              className="w-full h-full object-contain pointer-events-none" 
            />
          </div>

          <div>
            <div className="text-xs sm:text-sm md:text-base font-black tracking-tight leading-tight flex items-center gap-2">
              <span className="font-heading font-black tracking-tight text-white drop-shadow-sm">
                GEN Z INTERACTIVE SIMULATIONS
              </span>
              <span className="hidden sm:inline-block px-2 py-0.5 rounded-full text-[10px] font-mono font-black bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-xs border border-cyan-400">
                4K UHD
              </span>
            </div>
            <div className="text-[10px] sm:text-[11px] font-bold text-cyan-300 flex items-center gap-1.5 flex-wrap mt-0.5">
              <span>Digital Laboratory Portal &bull; {totalSimulations} Verified Simulations</span>
              <span className="text-slate-400 hidden md:inline">&bull;</span>
              <span className="hidden md:inline px-2 py-0.2 rounded-full text-[10px] font-semibold bg-[#063327] text-emerald-200 border border-emerald-400/60 shadow-xs">
                Aligned with National Curriculum of Pakistan (Session 2026-27)
              </span>
            </div>
          </div>
        </div>

        {/* Center Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl bg-[#10244c] border-2 border-blue-400/50 shadow-md">
          <a
            href="#catalog"
            className="px-3 py-1 rounded-lg text-slate-100 hover:text-white hover:bg-[#18366d] transition-colors"
          >
            STEM Catalog ({totalSimulations} Labs)
          </a>
          <a
            href="#features"
            className="px-3 py-1 rounded-lg text-slate-100 hover:text-white hover:bg-[#18366d] transition-colors"
          >
            Capabilities
          </a>
          <a
            href="#developer"
            className="px-3 py-1 rounded-lg text-slate-100 hover:text-white hover:bg-[#18366d] transition-colors"
          >
            Developer
          </a>
        </div>

        {/* Right Action Button: Explore Catalog with rich royal-blue 3D gradient */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <a
            href="#catalog"
            className="btn-tactile-3d px-4 py-2 rounded-xl text-xs sm:text-sm font-black text-white shadow-lg hover:shadow-2xl transition-all flex items-center gap-1.5 border-2 border-white cursor-pointer"
            style={{
              background: 'linear-gradient(135deg, #1d4ed8 0%, #2563eb 50%, #0284c7 100%)',
              boxShadow: '0 6px 18px -3px rgba(2, 132, 199, 0.5)'
            }}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300 pointer-events-none" />
            <span>Explore Catalog</span>
          </a>
        </div>

      </div>
    </header>
  );
};
