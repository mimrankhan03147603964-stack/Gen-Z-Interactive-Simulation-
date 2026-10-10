import React from 'react';
import { Menu, Atom, Layers, Sparkles, Sun, Moon } from 'lucide-react';
import { SimulationItem } from '../types';
import { getSimTheme } from '../data/simTheme';

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
  isDarkMode = false,
  onToggleTheme
}) => {
  const activeTheme = getSimTheme(activeSim.indexNumber);

  return (
    <header 
      className="w-full px-3 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between gap-3 shadow-md sticky top-0 z-30 transition-colors"
      style={{
        backgroundColor: isDarkMode ? '#060f24' : '#ffffff',
        borderBottom: isDarkMode ? '1px solid #1e3a8a' : '1px solid #e2e8f0',
        color: isDarkMode ? '#ffffff' : '#0f172a'
      }}
    >
      
      {/* Left: Navigation Menu Toggle & 3D Glowing Brand Logo */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="btn-3d p-2 rounded-xl transition-all cursor-pointer shadow-xs"
          style={{
            backgroundColor: isDarkMode ? '#0c1b3d' : '#f1f5f9',
            borderColor: isDarkMode ? '#3b82f6' : '#cbd5e1',
            borderWidth: '1px',
            borderStyle: 'solid',
            color: isDarkMode ? '#38bdf8' : '#1e293b'
          }}
          title="Toggle Navigation Menu (01 - 14)"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2.5 sm:gap-3">
          <div 
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center text-white shadow-lg icon-tile-3d shrink-0"
            style={{
              backgroundColor: '#2563eb',
              backgroundImage: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
              borderColor: '#60a5fa',
              borderWidth: '1.5px',
              borderStyle: 'solid',
              boxShadow: '0 4px 12px rgba(37, 99, 235, 0.4), inset 0 1px 1px rgba(255, 255, 255, 0.5)'
            }}
          >
            <Atom className="w-5 h-5 sm:w-6 sm:h-6 animate-spin-slow text-white" />
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
              className="text-[10px] sm:text-[11px] font-bold tracking-tight"
              style={{ color: isDarkMode ? '#38bdf8' : '#1d4ed8' }}
            >
              Interactive STEM Digital Laboratory Portal &bull; 14 Verified Simulators
            </div>
          </div>
        </div>
      </div>

      {/* Right: Vibrant 3D Action Buttons & Status Indicators */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        
        {/* Active Simulation Pill */}
        <div 
          className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold shadow-xs"
          style={{
            backgroundColor: activeTheme.badgeBg,
            color: activeTheme.badgeText,
            borderColor: activeTheme.badgeBorder,
            borderWidth: '1px',
            borderStyle: 'solid'
          }}
        >
          <span 
            className="w-2.5 h-2.5 rounded-full animate-pulse shadow-xs" 
            style={{ backgroundColor: activeTheme.bgSolid }}
          />
          <span className="font-mono font-black">[{activeSim.indexNumber}]</span>
          <span className="truncate max-w-[170px]">{activeSim.title}</span>
        </div>

        {/* 14 Labs Counter Pill - Vibrant Amber */}
        <div 
          className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold shadow-2xs"
          style={{
            backgroundColor: '#fef3c7',
            color: '#92400e',
            borderColor: '#fcd34d',
            borderWidth: '1px',
            borderStyle: 'solid'
          }}
        >
          <Layers className="w-3.5 h-3.5" style={{ color: '#d97706' }} />
          <span>14 Labs</span>
        </div>

        {/* 4K Ultra Indicator - Vibrant Emerald */}
        <div 
          className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-full text-[11px] font-bold shadow-2xs"
          style={{
            backgroundColor: '#d1fae5',
            color: '#065f46',
            borderColor: '#6ee7b7',
            borderWidth: '1px',
            borderStyle: 'solid'
          }}
        >
          <Sparkles className="w-3.5 h-3.5" style={{ color: '#059669' }} />
          <span>4K Ultra</span>
        </div>

        {/* Theme Toggle Button (Day / Night) */}
        {onToggleTheme && (
          <button
            onClick={onToggleTheme}
            className="btn-3d px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
            style={
              isDarkMode
                ? {
                    backgroundColor: '#f59e0b',
                    color: '#0f172a',
                    borderColor: '#fbbf24',
                    borderWidth: '1px',
                    borderStyle: 'solid'
                  }
                : {
                    backgroundColor: '#f1f5f9',
                    color: '#1e293b',
                    borderColor: '#cbd5e1',
                    borderWidth: '1px',
                    borderStyle: 'solid'
                  }
            }
            title={isDarkMode ? "Switch to Bright Light Display" : "Switch to Dark Display"}
          >
            {isDarkMode ? (
              <>
                <Sun className="w-3.5 h-3.5" style={{ color: '#0f172a' }} />
                <span>Day Mode</span>
              </>
            ) : (
              <>
                <Moon className="w-3.5 h-3.5" style={{ color: '#4338ca' }} />
                <span>Night Mode</span>
              </>
            )}
          </button>
        )}

      </div>
    </header>
  );
};
