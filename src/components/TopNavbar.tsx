import React from 'react';
import { Sparkles } from 'lucide-react';
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
      className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b-2 border-slate-200/90 shadow-[0_4px_20px_rgba(0,0,0,0.06)] transition-all text-slate-800" 
      style={{ position: 'sticky', top: 0, zIndex: 50 }}
    >
      <div className="max-w-[1720px] 2xl:max-w-[1820px] mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between gap-4">
        
        {/* Left: Official Rectangular Logo & Portal Subtitle */}
        <div className="flex items-center gap-3.5">
          {/* GZ Monogram Logo - Exact-Fit Box Tightly Shrink-Wrapped around Logo */}
          <div 
            onClick={onBackToCatalog}
            className="inline-flex items-center justify-center shrink-0 rounded-lg overflow-hidden border-2 border-sky-400 bg-[#240854] shadow-[0_2px_8px_rgba(0,0,0,0.25)] transition-all duration-200 hover:scale-105 cursor-pointer"
            style={{ width: 'fit-content', height: 'auto', padding: '0px', borderRadius: '8px' }}
            title="Gen Z Interactive Simulations Home"
          >
            <img 
              src="/genz-official-logo.png" 
              alt="Gen Z Interactive Simulations Official Logo" 
              className="block select-none pointer-events-none rounded-md" 
              style={{ display: 'block', maxHeight: '42px', width: 'auto', objectFit: 'contain' }}
            />
          </div>

          <div className="hidden sm:block">
            <div className="flex items-center gap-2">
              <span className="text-xs font-black tracking-tight text-slate-800 font-heading">
                DIGITAL LABORATORY PORTAL
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-black bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-xs">
                4K UHD
              </span>
            </div>
            <div className="text-[11px] font-semibold text-slate-500 flex items-center gap-1.5 flex-wrap mt-0.5">
              <span className="font-bold text-sky-700">{totalSimulations} Verified Interactive Simulations</span>
              <span className="text-slate-300">&bull;</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/90 shadow-2xs">
                National Curriculum of Pakistan (Session 2026-27)
              </span>
            </div>
          </div>
        </div>

        {/* Center Desktop Navigation: Modern 3D & Colorful Navbar Buttons */}
        <div className="flex items-center gap-2 sm:gap-2.5 p-1 rounded-2xl bg-slate-100/80 border border-slate-200/80 shadow-inner">
          {/* Button 1: Home (Cyber Cyan / Sky 3D) */}
          <button
            type="button"
            onClick={onBackToCatalog}
            className="relative inline-flex items-center px-3.5 py-1.5 rounded-xl text-xs font-black text-white bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 border border-cyan-300 shadow-[0_4px_14px_rgba(6,182,212,0.4),inset_0_1px_0_rgba(255,255,255,0.45)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(6,182,212,0.65)] active:translate-y-0.5 active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)] cursor-pointer select-none"
          >
            Home
          </button>

          {/* Button 2: STEM Catalog (Neon Emerald / Mint 3D) */}
          <a
            href="#catalog"
            className="relative inline-flex items-center px-3.5 py-1.5 rounded-xl text-xs font-black text-white bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 border border-emerald-300 shadow-[0_4px_14px_rgba(16,185,129,0.4),inset_0_1px_0_rgba(255,255,255,0.45)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(16,185,129,0.65)] active:translate-y-0.5 active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)] cursor-pointer select-none"
          >
            STEM Catalog ({totalSimulations})
          </a>

          {/* Button 3: Educators & Students Hub (Neon Violet / Royal Purple 3D) */}
          <a
            href="#pedagogical-hub"
            className="relative inline-flex items-center px-3.5 py-1.5 rounded-xl text-xs font-black text-white bg-gradient-to-r from-purple-600 via-fuchsia-600 to-indigo-600 border border-purple-300 shadow-[0_4px_14px_rgba(147,51,234,0.4),inset_0_1px_0_rgba(255,255,255,0.45)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(147,51,234,0.65)] active:translate-y-0.5 active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)] cursor-pointer select-none"
          >
            Educators &amp; Students Hub
          </a>

          {/* Button 4: Developer & Contact (Sunset Amber / Gold 3D) */}
          <a
            href="#developer"
            className="relative inline-flex items-center px-3.5 py-1.5 rounded-xl text-xs font-black text-white bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 border border-amber-300 shadow-[0_4px_14px_rgba(245,158,11,0.4),inset_0_1px_0_rgba(255,255,255,0.45)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(245,158,11,0.65)] active:translate-y-0.5 active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)] cursor-pointer select-none"
          >
            Developer &amp; Contact
          </a>
        </div>

        {/* Right Action Button: Modern 3D Vibrant Master Button */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="#catalog"
            className="relative inline-flex items-center gap-2 px-4 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-black text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 border-2 border-sky-300 shadow-[0_5px_18px_rgba(99,102,241,0.5),inset_0_1px_0_rgba(255,255,255,0.5)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_25px_rgba(99,102,241,0.7)] active:translate-y-0.5 active:shadow-[inset_0_2px_6px_rgba(0,0,0,0.4)] cursor-pointer select-none"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300 pointer-events-none" />
            <span>Explore All Labs Grid</span>
          </a>
        </div>

      </div>
    </header>
  );
};
