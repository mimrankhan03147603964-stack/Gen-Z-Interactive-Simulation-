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
      className="sticky top-0 z-50 w-full border-b-2 border-slate-300 transition-all select-none" 
      style={{ 
        position: 'sticky', 
        top: 0, 
        zIndex: 50,
        backgroundColor: '#ffffff',
        boxShadow: '0 4px 14px rgba(15, 23, 42, 0.1)'
      }}
    >
      <div className="max-w-[1720px] 2xl:max-w-[1820px] mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between gap-4">
        
        {/* Left: Official Rectangular Logo & Portal Subtitle */}
        <div className="flex items-center gap-3.5">
          {/* GZ Monogram Logo - Exact-Fit Box Tightly Shrink-Wrapped around Logo */}
          <div 
            onClick={onBackToCatalog}
            className="inline-flex items-center justify-center shrink-0 rounded-lg overflow-hidden border-2 border-sky-500 bg-[#240854] shadow-[0_2px_6px_rgba(0,0,0,0.3)] transition-all duration-150 hover:scale-105 cursor-pointer"
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
              <span className="text-xs font-black tracking-tight text-slate-900 font-heading">
                DIGITAL LABORATORY PORTAL
              </span>
              <span 
                className="px-2 py-0.5 rounded-full text-[10px] font-mono font-black text-white shadow-xs"
                style={{ backgroundColor: '#0284c7', border: '1px solid #0369a1', color: '#ffffff' }}
              >
                4K UHD
              </span>
            </div>
            <div className="text-[11px] font-semibold flex items-center gap-1.5 flex-wrap mt-0.5">
              <span className="font-extrabold text-blue-700">{totalSimulations} Verified Interactive Simulations</span>
              <span className="text-slate-400 font-bold">&bull;</span>
              <span 
                className="px-2 py-0.5 rounded-full text-[10px] font-extrabold text-white shadow-xs"
                style={{ backgroundColor: '#059669', border: '1px solid #047857', color: '#ffffff' }}
              >
                National Curriculum of Pakistan (Session 2026-27)
              </span>
            </div>
          </div>
        </div>

        {/* Center Desktop Navigation: Solid, Opaque 3D Colorful Buttons (Different Vibrant Color Each) */}
        <div 
          className="flex items-center gap-2 sm:gap-2.5 p-1 rounded-2xl border-2 border-slate-300"
          style={{ backgroundColor: '#f1f5f9' }}
        >
          {/* Button 1: Home (Solid Vibrant Blue Gradient 3D) */}
          <button
            type="button"
            onClick={onBackToCatalog}
            className="relative inline-flex items-center px-4 py-2 rounded-xl text-xs font-black transition-all duration-150 hover:-translate-y-0.5 active:translate-y-0.5 cursor-pointer select-none"
            style={{
              background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
              color: '#ffffff',
              border: '1px solid #1e40af',
              borderBottom: '3px solid #172554',
              boxShadow: '0 3px 0 #0f172a, 0 5px 10px rgba(0,0,0,0.2)',
              textShadow: '0 1px 2px rgba(0,0,0,0.5)'
            }}
          >
            <span style={{ color: '#ffffff', fontWeight: 800 }}>Home</span>
          </button>

          {/* Button 2: STEM Catalog (Solid Emerald/Teal Green Gradient 3D) */}
          <a
            href="#catalog"
            className="relative inline-flex items-center px-4 py-2 rounded-xl text-xs font-black transition-all duration-150 hover:-translate-y-0.5 active:translate-y-0.5 cursor-pointer select-none"
            style={{
              background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
              color: '#ffffff',
              border: '1px solid #065f46',
              borderBottom: '3px solid #064e3b',
              boxShadow: '0 3px 0 #0f172a, 0 5px 10px rgba(0,0,0,0.2)',
              textShadow: '0 1px 2px rgba(0,0,0,0.5)'
            }}
          >
            <span style={{ color: '#ffffff', fontWeight: 800 }}>STEM Catalog ({totalSimulations})</span>
          </a>

          {/* Button 3: Educators & Students Hub (Solid Violet/Purple Gradient 3D) */}
          <a
            href="#pedagogical-hub"
            className="relative inline-flex items-center px-4 py-2 rounded-xl text-xs font-black transition-all duration-150 hover:-translate-y-0.5 active:translate-y-0.5 cursor-pointer select-none"
            style={{
              background: 'linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)',
              color: '#ffffff',
              border: '1px solid #5b21b6',
              borderBottom: '3px solid #4c1d95',
              boxShadow: '0 3px 0 #0f172a, 0 5px 10px rgba(0,0,0,0.2)',
              textShadow: '0 1px 2px rgba(0,0,0,0.5)'
            }}
          >
            <span style={{ color: '#ffffff', fontWeight: 800 }}>Educators &amp; Students Hub</span>
          </a>

          {/* Button 4: Developer & Contact (Solid Amber/Orange Gradient 3D) */}
          <a
            href="#developer"
            className="relative inline-flex items-center px-4 py-2 rounded-xl text-xs font-black transition-all duration-150 hover:-translate-y-0.5 active:translate-y-0.5 cursor-pointer select-none"
            style={{
              background: 'linear-gradient(135deg, #d97706 0%, #b45309 100%)',
              color: '#ffffff',
              border: '1px solid #92400e',
              borderBottom: '3px solid #78350f',
              boxShadow: '0 3px 0 #0f172a, 0 5px 10px rgba(0,0,0,0.2)',
              textShadow: '0 1px 2px rgba(0,0,0,0.5)'
            }}
          >
            <span style={{ color: '#ffffff', fontWeight: 800 }}>Developer &amp; Contact</span>
          </a>
        </div>

        {/* Right Action Button: Master Indigo 3D Vibrant Button */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="#catalog"
            className="relative inline-flex items-center gap-2 px-4 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-black transition-all duration-150 hover:-translate-y-0.5 active:translate-y-0.5 cursor-pointer select-none"
            style={{
              background: 'linear-gradient(135deg, #4338ca 0%, #3730a3 100%)',
              color: '#ffffff',
              border: '1px solid #312e81',
              borderBottom: '3px solid #1e1b4b',
              boxShadow: '0 3px 0 #0f172a, 0 6px 12px rgba(0,0,0,0.25)',
              textShadow: '0 1px 2px rgba(0,0,0,0.6)'
            }}
          >
            <Sparkles className="w-4 h-4 pointer-events-none" style={{ color: '#facc15' }} />
            <span style={{ color: '#ffffff', fontWeight: 900 }}>Explore All Labs Grid</span>
          </a>
        </div>

      </div>
    </header>
  );
};
