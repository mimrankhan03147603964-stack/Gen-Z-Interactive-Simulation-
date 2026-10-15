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
  totalSimulations = 52,
  isDarkMode = false,
  onToggleTheme,
  onBackToCatalog
}) => {
  const activeTheme = activeSim ? getSimTheme(activeSim.indexNumber) : null;

  return (
    <header 
      className="w-full px-3 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between gap-3 shadow-md sticky top-0 z-[1000] transition-colors opacity-100"
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #e2e8f0',
        boxShadow: '0 4px 20px 0 rgba(0, 0, 0, 0.08)',
        color: '#111827'
      }}
    >
      
      {/* Left: 3D Brand Logo & Title with Solid White Monogram Card */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2.5 sm:gap-3">
          <div 
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center shadow-md shrink-0 p-1.5 overflow-visible transition-transform hover:scale-105"
            style={{
              backgroundColor: '#ffffff',
              borderColor: '#e2e8f0',
              borderWidth: '2px',
              borderStyle: 'solid',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)'
            }}
          >
            <img 
              src="/genz-edtech-symbol.svg" 
              alt="Gen Z EdTech Interactive Monogram" 
              className="w-full h-full object-contain" 
            />
          </div>
          <div>
            <div className="text-xs sm:text-sm font-black tracking-wider leading-tight flex items-center gap-1.5">
              <span style={{ color: '#111827' }}>
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
              style={{ color: '#2563eb' }}
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
          backgroundColor: '#f8fafc',
          borderColor: '#e2e8f0'
        }}
      >
        <a
          href="#catalog"
          className="px-3 py-1.5 rounded-lg transition-colors hover:text-blue-600"
          style={{ color: '#334155' }}
        >
          STEM Catalog ({totalSimulations} Labs)
        </a>
        <a
          href="#features"
          className="px-3 py-1.5 rounded-lg transition-colors hover:text-blue-600"
          style={{ color: '#334155' }}
        >
          Features
        </a>
        <a
          href="#developer"
          className="px-3 py-1.5 rounded-lg transition-colors hover:text-blue-600"
          style={{ color: '#334155' }}
        >
          Developer
        </a>
      </nav>

      {/* Right: Clean, spacious navigation cluster */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        <a
          href="#catalog"
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black transition-all hover:scale-105 active:scale-95 shadow-sm"
          style={{
            backgroundColor: '#2563eb',
            backgroundImage: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
            color: '#ffffff',
            borderColor: '#1d4ed8',
            borderWidth: '1.5px',
            borderStyle: 'solid',
            boxShadow: '0 3px 10px rgba(37, 99, 235, 0.3)'
          }}
        >
          <span className="w-2 h-2 rounded-full bg-white shadow-xs animate-pulse" />
          <span>Explore Catalog</span>
        </a>
      </div>

    </header>
  );
};
