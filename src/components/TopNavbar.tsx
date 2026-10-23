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
      className="sticky top-0 z-[1000] w-full bg-white border-b-2 border-slate-200 shadow-md transition-all text-slate-800" 
      style={{ zIndex: 1000, position: 'sticky', top: 0 }}
    >
      <div className="max-w-[1720px] 2xl:max-w-[1820px] mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between gap-4">
        
        {/* Left: Official Rectangular Logo & Portal Subtitle (No Hamburger Button) */}
        <div className="flex items-center gap-3.5">
          {/* GZ Monogram Logo - Official Rectangular Logo (100% Unclipped Text) */}
          <div 
            onClick={onBackToCatalog}
            className="w-[180px] sm:w-[210px] h-[46px] sm:h-[50px] rounded-xl overflow-hidden p-1 border-2 border-sky-400/90 bg-[#240854] flex items-center justify-center shrink-0 transition-transform hover:scale-[1.02] cursor-pointer shadow-md"
            style={{ borderRadius: '12px' }}
            title="Gen Z Interactive Simulations Home"
          >
            <img 
              src="/genz-official-logo.png" 
              alt="Gen Z Interactive Simulations Official Logo" 
              className="w-full h-full object-contain block pointer-events-none" 
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
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

        {/* Center Desktop Navigation Links (Direct Horizontal Desktop Navigation) */}
        <div className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-2xl bg-slate-50 border border-slate-200 shadow-xs">
          <button
            type="button"
            onClick={onBackToCatalog}
            className="px-3 py-1.5 rounded-xl text-slate-700 hover:text-blue-600 hover:bg-white transition-all cursor-pointer font-bold"
          >
            Home
          </button>
          <a
            href="#catalog"
            className="px-3 py-1.5 rounded-xl text-slate-700 hover:text-blue-600 hover:bg-white transition-all font-bold"
          >
            STEM Catalog ({totalSimulations})
          </a>
          <a
            href="#pedagogical-hub"
            className="px-3 py-1.5 rounded-xl text-slate-700 hover:text-blue-600 hover:bg-white transition-all font-bold"
          >
            Educators &amp; Students Hub
          </a>
          <a
            href="#developer"
            className="px-3 py-1.5 rounded-xl text-slate-700 hover:text-blue-600 hover:bg-white transition-all font-bold"
          >
            Developer &amp; Contact
          </a>
        </div>

        {/* Right Action Button: Explore Catalog with Primary Vibrant Gradient & Soft Glow */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="#catalog"
            className="clay-btn-primary px-4 py-2 rounded-2xl text-xs sm:text-sm font-black flex items-center gap-1.5 cursor-pointer shadow-md"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300 pointer-events-none" />
            <span>Explore All Labs Grid</span>
          </a>
        </div>

      </div>
    </header>
  );
};
