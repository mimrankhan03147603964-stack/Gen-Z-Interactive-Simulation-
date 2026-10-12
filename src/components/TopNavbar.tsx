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
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        backgroundColor: isDarkMode ? 'rgba(6, 15, 36, 0.82)' : 'rgba(255, 255, 255, 0.82)',
        borderBottom: isDarkMode ? '1px solid rgba(255, 255, 255, 0.18)' : '1px solid rgba(255, 255, 255, 0.55)',
        boxShadow: isDarkMode ? '0 8px 32px 0 rgba(0, 0, 0, 0.45)' : '0 8px 32px 0 rgba(31, 38, 135, 0.08)',
        color: isDarkMode ? '#ffffff' : '#0f172a'
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
              backgroundColor: isDarkMode ? 'rgba(12, 26, 59, 0.85)' : 'rgba(255, 255, 255, 0.88)',
              borderColor: isDarkMode ? 'rgba(56, 189, 248, 0.7)' : '#38bdf8',
              borderWidth: '1.5px',
              borderStyle: 'solid',
              boxShadow: '0 4px 12px rgba(2, 132, 199, 0.35)'
            }}
          >
            <img 
              src="/genz-edtech-symbol.svg" 
              alt="Gen Z EdTech Interactive Monogram" 
              className="w-full h-full object-contain filter drop-shadow-xs" 
            />
          </div>
          <div>
            <div className="text-xs sm:text-sm font-black tracking-wider leading-tight flex items-center gap-1.5">
              <span style={{ color: isDarkMode ? '#ffffff' : '#0f172a' }}>
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
              <span className="hidden md:inline-flex items-center gap-1 px-1.5 py-0.2 rounded text-[9px] font-mono font-bold"
                style={{
                  backgroundColor: isDarkMode ? 'rgba(30, 58, 138, 0.4)' : 'rgba(219, 234, 254, 0.6)',
                  color: isDarkMode ? '#93c5fd' : '#1e40af',
                  border: isDarkMode ? '1px solid rgba(59, 130, 246, 0.3)' : '1px solid rgba(191, 219, 254, 0.8)'
                }}
              >
                <span>Dev:</span>
                <span className="font-extrabold">M. Imran Khan</span>
              </span>
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

      {/* Right: Vibrant 3D Action Buttons & Status Indicators */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        
        {/* Active Simulation Pill */}
        {activeSim && activeTheme ? (
          <div 
            onClick={onBackToCatalog}
            className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-black shadow-xs cursor-pointer hover:opacity-90 transition-opacity"
            title="Click to view all labs in catalog"
            style={{
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              backgroundColor: isDarkMode ? 'rgba(15, 33, 76, 0.75)' : 'rgba(239, 246, 255, 0.85)',
              color: activeTheme.badgeText,
              borderColor: isDarkMode ? 'rgba(59, 130, 246, 0.45)' : 'rgba(147, 197, 253, 0.7)',
              borderWidth: '1px',
              borderStyle: 'solid'
            }}
          >
            <span 
              className="w-2.5 h-2.5 rounded-full shadow-xs animate-pulse" 
              style={{ backgroundColor: activeTheme.bgSolid }}
            />
            <span className="font-mono font-black">[{activeSim.indexNumber}]</span>
            <span className="truncate max-w-[170px]">{activeSim.title}</span>
          </div>
        ) : (
          <a
            href="#catalog"
            className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-black shadow-xs hover:opacity-90 transition-opacity"
            style={{
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              backgroundColor: isDarkMode ? 'rgba(15, 33, 76, 0.75)' : 'rgba(239, 246, 255, 0.85)',
              color: isDarkMode ? '#93c5fd' : '#1e40af',
              borderColor: isDarkMode ? 'rgba(59, 130, 246, 0.45)' : 'rgba(147, 197, 253, 0.7)',
              borderWidth: '1px',
              borderStyle: 'solid'
            }}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-xs" />
            <span>Select a Subject Lab</span>
          </a>
        )}

        {/* Labs Counter Pill - Vibrant Amber Frosted Glass */}
        <div 
          className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-black shadow-2xs"
          style={{
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            backgroundColor: isDarkMode ? 'rgba(56, 32, 4, 0.75)' : 'rgba(254, 243, 199, 0.82)',
            color: isDarkMode ? '#fef08a' : '#78350f',
            borderColor: isDarkMode ? 'rgba(245, 158, 11, 0.45)' : 'rgba(245, 158, 11, 0.5)',
            borderWidth: '1px',
            borderStyle: 'solid'
          }}
        >
          <Layers className="w-3.5 h-3.5 text-amber-600" />
          <span>{totalSimulations} Labs</span>
        </div>

        {/* 4K Ultra Indicator - Vibrant Emerald Frosted Glass */}
        <div 
          className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-full text-[11px] font-black shadow-2xs"
          style={{
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            backgroundColor: isDarkMode ? 'rgba(6, 45, 34, 0.75)' : 'rgba(209, 250, 229, 0.82)',
            color: isDarkMode ? '#6ee7b7' : '#064e3b',
            borderColor: isDarkMode ? 'rgba(52, 211, 153, 0.45)' : 'rgba(52, 211, 153, 0.5)',
            borderWidth: '1px',
            borderStyle: 'solid'
          }}
        >
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          <span>4K Ultra</span>
        </div>

        {/* Theme Toggle Button (Day / Night) - Frosted Glass Button */}
        {onToggleTheme && (
          <button
            onClick={onToggleTheme}
            className="btn-3d px-3 py-1.5 rounded-full text-xs font-black flex items-center gap-1.5 cursor-pointer shadow-xs"
            style={
              isDarkMode
                ? {
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    backgroundColor: 'rgba(245, 158, 11, 0.85)',
                    color: '#0f172a',
                    borderColor: 'rgba(253, 224, 71, 0.8)',
                    borderWidth: '1px',
                    borderStyle: 'solid'
                  }
                : {
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    backgroundColor: 'rgba(241, 245, 249, 0.85)',
                    color: '#0f172a',
                    borderColor: 'rgba(148, 163, 184, 0.6)',
                    borderWidth: '1px',
                    borderStyle: 'solid'
                  }
            }
            title={isDarkMode ? "Switch to Bright Light Display" : "Switch to Dark Display"}
          >
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: isDarkMode ? '#0f172a' : '#2563eb' }} />
            <span>{isDarkMode ? 'Bright' : 'Dark'}</span>
          </button>
        )}

      </div>

    </header>
  );
};
