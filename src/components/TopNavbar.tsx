import React from 'react';
import { Atom, Layers, Sparkles } from 'lucide-react';
import { SimulationItem } from '../types';
import { getSimTheme } from '../data/simTheme';

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
  activeSim,
  totalSimulations = 33,
  isDarkMode = false,
  onToggleTheme,
  onBackToCatalog
}) => {
  const activeTheme = activeSim ? getSimTheme(activeSim.indexNumber) : null;

  return (
    <header 
      className="w-full px-3 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between gap-3 shadow-md sticky top-0 z-30 transition-colors opacity-100"
      style={{
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        backgroundColor: isDarkMode ? 'rgba(6, 15, 36, 0.90)' : 'rgba(10, 20, 44, 0.90)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.15)',
        boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.35)',
        color: '#ffffff'
      }}
    >
      
      {/* Left: 3D Glowing Brand Logo & Title */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2.5 sm:gap-3">
          <div 
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center shadow-lg icon-tile-3d shrink-0 p-1 overflow-hidden"
            style={{
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              backgroundColor: 'rgba(12, 26, 59, 0.85)',
              borderColor: 'rgba(56, 189, 248, 0.7)',
              borderWidth: '1.5px',
              borderStyle: 'solid',
              boxShadow: '0 4px 12px rgba(2, 132, 199, 0.35)'
            }}
          >
            <img 
              src="/genz-edtech-symbol.svg" 
              alt="Gen Z EdTech Interactive Monogram" 
              className="w-full h-full object-contain drop-shadow-xs" 
            />
          </div>
          <div>
            <div className="text-xs sm:text-sm font-black tracking-wider leading-tight flex items-center gap-1.5">
              <span style={{ color: '#ffffff' }}>
                GEN Z EDTECH INTERACTIVE SIMULATION
              </span>
              <span 
                className="hidden xl:inline-block px-1.5 py-0.2 rounded text-[9px] font-black shadow-xs"
                style={{ backgroundColor: '#2563eb', color: '#ffffff' }}
              >
                4K 3D
              </span>
            </div>
            <div 
              className="text-[10px] sm:text-[11px] font-black tracking-tight flex items-center gap-1.5 flex-wrap"
              style={{ color: isDarkMode ? '#38bdf8' : '#1d4ed8' }}
            >
              <span>Interactive STEM Digital Laboratory Portal &bull; {totalSimulations} Verified Simulators</span>
            </div>
          </div>
        </div>
      </div>

      {/* Center Website Navigation Links for Laptop & Desktop */}
      <nav 
        className="hidden 2xl:flex items-center gap-1 text-xs font-extrabold px-3 py-1 rounded-full border shadow-xs"
        style={{
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          backgroundColor: isDarkMode ? 'rgba(12, 26, 59, 0.6)' : 'rgba(241, 245, 249, 0.65)',
          borderColor: isDarkMode ? '1px solid rgba(255, 255, 255, 0.18)' : '1px solid rgba(255, 255, 255, 0.6)'
        }}
      >
        <a
          href="#catalog"
          className="px-3 py-1.5 rounded-lg transition-colors hover:text-blue-600"
          style={{ color: isDarkMode ? '#e2e8f0' : '#334155' }}
        >
          STEM Catalog ({totalSimulations} Labs)
        </a>
        <a
          href="#features"
          className="px-3 py-1.5 rounded-lg transition-colors hover:text-blue-600"
          style={{ color: isDarkMode ? '#e2e8f0' : '#334155' }}
        >
          Features
        </a>
        <a
          href="#developer"
          className="px-3 py-1.5 rounded-lg transition-colors hover:text-blue-600"
          style={{ color: isDarkMode ? '#e2e8f0' : '#334155' }}
        >
          Developer
        </a>
      </nav>

      {/* Right: Clean, spacious navigation cluster */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        <a
          href="#catalog"
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-black transition-all hover:scale-105 active:scale-95 shadow-sm"
          style={{
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            backgroundColor: isDarkMode ? 'rgba(37, 99, 235, 0.25)' : 'rgba(239, 246, 255, 0.95)',
            color: isDarkMode ? '#93c5fd' : '#1d4ed8',
            borderColor: isDarkMode ? 'rgba(59, 130, 246, 0.5)' : 'rgba(147, 197, 253, 0.9)',
            borderWidth: '1.5px',
            borderStyle: 'solid'
          }}
        >
          <span className="w-2 h-2 rounded-full bg-blue-500 shadow-xs animate-pulse" />
          <span>Explore Catalog</span>
        </a>
      </div>

    </header>
  );
};
