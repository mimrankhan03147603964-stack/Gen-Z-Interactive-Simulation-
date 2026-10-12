import React, { useState } from 'react';
import { SimulationItem } from '../types';
import { getSimTheme } from '../data/simTheme';
import { 
  Activity, 
  Atom, 
  Zap, 
  Flame, 
  Gauge, 
  Sun, 
  Sparkles, 
  FlaskConical, 
  Rocket, 
  Cpu, 
  Leaf, 
  Cog, 
  Layers, 
  Globe,
  Moon,
  Map,
  CircleDot,
  Orbit,
  Telescope,
  Search,
  PanelLeftClose,
  Calculator,
  Shapes,
  Scale,
  Ruler,
  Computer,
  Keyboard,
  BookOpen,
  Baby,
  Dna,
  TestTube,
  Magnet
} from 'lucide-react';

interface SidebarProps {
  simulations: SimulationItem[];
  activeSim: SimulationItem;
  onSelectSim: (sim: SimulationItem) => void;
  isOpen: boolean;
  onToggle: () => void;
  isDarkMode?: boolean;
}

// 3D Vibrant colorful icon mapper preserving original rich colors
const renderTopicIcon = (iconName: string, iconColor?: string) => {
  const getIconColor = () => {
    if (iconColor && iconColor !== '#ffffff') return iconColor;
    switch (iconName) {
      case 'Activity': return '#10b981'; // Emerald
      case 'Atom': return '#06b6d4'; // Cyan
      case 'Zap': return '#f59e0b'; // Amber
      case 'Flame': return '#f43f5e'; // Rose
      case 'Gauge': return '#3b82f6'; // Royal Blue
      case 'Sun': return '#eab308'; // Bright Gold
      case 'Sparkles': return '#ec4899'; // Radiant Pink
      case 'FlaskConical': return '#a855f7'; // Purple
      case 'Rocket': return '#ef4444'; // Scarlet
      case 'Cpu': return '#0284c7'; // Sky Blue
      case 'Leaf': return '#22c55e'; // Green
      case 'Cog': return '#f97316'; // Orange
      case 'Layers': return '#8b5cf6'; // Violet
      case 'Globe': return '#0284c7'; // Ocean
      case 'Moon': return '#38bdf8'; // Lunar Cyan
      case 'Map': return '#14b8a6'; // Teal
      case 'CircleDot': return '#f43f5e'; // Rose
      case 'Orbit': return '#6366f1'; // Indigo
      case 'Telescope': return '#8b5cf6'; // Violet
      case 'Calculator': return '#4f46e5'; // Indigo
      case 'Shapes': return '#d946ef'; // Fuchsia
      case 'Scale': return '#0ea5e9'; // Cyan
      case 'Ruler': return '#f59e0b'; // Amber
      case 'Computer': return '#0284c7'; // Cyan
      case 'Keyboard': return '#7c3aed'; // Purple
      case 'BookOpen': return '#ec4899'; // Hot Pink
      case 'Baby': return '#f59e0b'; // Warm Amber
      case 'Dna': return '#10b981'; // Emerald
      case 'TestTube': return '#a855f7'; // Purple
      case 'Magnet': return '#06b6d4'; // Electric Cyan
      default: return '#3b82f6';
    }
  };
  const color = getIconColor();
  const iconProps = { 
    className: "w-5 h-5 transition-transform group-hover:scale-110",
    style: { color, stroke: color }
  };
  switch (iconName) {
    case 'Activity': return <Activity {...iconProps} />;
    case 'Atom': return <Atom {...iconProps} />;
    case 'Zap': return <Zap {...iconProps} />;
    case 'Flame': return <Flame {...iconProps} />;
    case 'Gauge': return <Gauge {...iconProps} />;
    case 'Sun': return <Sun {...iconProps} />;
    case 'Sparkles': return <Sparkles {...iconProps} />;
    case 'FlaskConical': return <FlaskConical {...iconProps} />;
    case 'Rocket': return <Rocket {...iconProps} />;
    case 'Cpu': return <Cpu {...iconProps} />;
    case 'Leaf': return <Leaf {...iconProps} />;
    case 'Cog': return <Cog {...iconProps} />;
    case 'Layers': return <Layers {...iconProps} />;
    case 'Globe': return <Globe {...iconProps} />;
    case 'Moon': return <Moon {...iconProps} />;
    case 'Map': return <Map {...iconProps} />;
    case 'CircleDot': return <CircleDot {...iconProps} />;
    case 'Orbit': return <Orbit {...iconProps} />;
    case 'Telescope': return <Telescope {...iconProps} />;
    case 'Calculator': return <Calculator {...iconProps} />;
    case 'Shapes': return <Shapes {...iconProps} />;
    case 'Scale': return <Scale {...iconProps} />;
    case 'Ruler': return <Ruler {...iconProps} />;
    case 'Computer': return <Computer {...iconProps} />;
    case 'Keyboard': return <Keyboard {...iconProps} />;
    case 'BookOpen': return <BookOpen {...iconProps} />;
    case 'Baby': return <Baby {...iconProps} />;
    case 'Dna': return <Dna {...iconProps} />;
    case 'TestTube': return <TestTube {...iconProps} />;
    case 'Magnet': return <Magnet {...iconProps} />;
    default: return <Atom {...iconProps} />;
  }
};


export const Sidebar: React.FC<SidebarProps> = ({
  simulations,
  activeSim,
  onSelectSim,
  isOpen,
  onToggle,
  isDarkMode = false
}) => {
  const [searchFilter, setSearchFilter] = useState('');

  const filtered = simulations.filter(s => 
    s.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
    s.indexNumber.includes(searchFilter) ||
    s.subject.toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <aside 
      className={`fixed top-0 left-0 z-50 h-full flex flex-col transition-transform duration-300 shadow-2xl select-none opacity-100 ${
        isOpen ? 'w-84 sm:w-96 translate-x-0' : '-translate-x-full w-84 sm:w-96 pointer-events-none'
      }`}
      style={{
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        backgroundColor: isDarkMode ? 'rgba(6, 14, 31, 0.85)' : 'rgba(255, 255, 255, 0.85)',
        borderRight: isDarkMode ? '1px solid rgba(255, 255, 255, 0.18)' : '1px solid rgba(255, 255, 255, 0.5)',
        boxShadow: isDarkMode ? '0 8px 32px 0 rgba(0, 0, 0, 0.5)' : '0 8px 32px 0 rgba(31, 38, 135, 0.1)',
        color: isDarkMode ? '#ffffff' : '#0f172a'
      }}
    >
      {/* Top Sidebar Header */}
      <div 
        className="p-4 border-b flex items-center justify-between gap-3 shrink-0"
        style={{
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          backgroundColor: isDarkMode ? 'rgba(10, 22, 51, 0.75)' : 'rgba(248, 250, 252, 0.75)',
          borderBottom: isDarkMode ? '1px solid rgba(255, 255, 255, 0.18)' : '1px solid rgba(255, 255, 255, 0.5)'
        }}
      >
        <div className="flex items-center gap-3">
          <div 
            className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg icon-tile-3d shrink-0 p-1 overflow-hidden"
            style={{
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              backgroundColor: isDarkMode ? 'rgba(12, 26, 59, 0.85)' : 'rgba(255, 255, 255, 0.88)',
              borderColor: '#38bdf8',
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
            <h2 
              className="text-xs font-black tracking-wider uppercase text-slate-900 dark:text-white"
              style={{ color: isDarkMode ? '#ffffff' : '#0f172a' }}
            >
              GEN Z EDTECH SIMULATION
            </h2>
            <p className="text-[11px] font-extrabold tracking-tight flex items-center gap-1.5 mt-0.5">
              <span style={{ color: isDarkMode ? '#38bdf8' : '#1d4ed8' }}>STEM Lab Catalog</span>
              <span 
                className="px-1.5 py-0.2 rounded text-[9px] font-black shadow-xs"
                style={{ backgroundColor: '#2563eb', color: '#ffffff' }}
              >
                {simulations.length} LABS
              </span>
            </p>
          </div>
        </div>

        {/* Drawer Close Button */}
        <button
          onClick={onToggle}
          className="p-1.5 rounded-lg border transition-all cursor-pointer hover:scale-105"
          style={{
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            backgroundColor: isDarkMode ? 'rgba(14, 31, 66, 0.75)' : 'rgba(241, 245, 249, 0.75)',
            borderColor: isDarkMode ? 'rgba(59, 130, 246, 0.4)' : 'rgba(203, 213, 225, 0.7)',
            color: isDarkMode ? '#ffffff' : '#0f172a'
          }}
          title="Close Navigation Drawer"
        >
          <PanelLeftClose className="w-4 h-4" />
        </button>
      </div>

      {/* Search Input Box */}
      <div 
        className="p-3 shrink-0"
        style={{
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          backgroundColor: isDarkMode ? 'rgba(7, 19, 41, 0.72)' : 'rgba(248, 250, 252, 0.72)'
        }}
      >
        <div className="relative">
          <Search 
            className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" 
            style={{ color: isDarkMode ? '#38bdf8' : '#1d4ed8' }}
          />
          <input
            type="text"
            placeholder={`Search simulations (01 - ${String(simulations.length).padStart(2, '0')})...`}
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border focus:outline-none font-bold transition-all shadow-inner"
            style={{
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              backgroundColor: isDarkMode ? 'rgba(10, 22, 51, 0.75)' : 'rgba(255, 255, 255, 0.8)',
              borderColor: isDarkMode ? 'rgba(59, 130, 246, 0.45)' : 'rgba(148, 163, 184, 0.6)',
              borderWidth: '1px',
              color: isDarkMode ? '#ffffff' : '#0f172a'
            }}
          />
        </div>
      </div>

      {/* Vertical Navigation List (01 to 14) with Crisp Borders & 100% Opacity */}
      <div className="flex-1 overflow-y-auto px-2.5 py-2 space-y-2 scrollbar-thin">
        {filtered.map((sim) => {
          const isActive = activeSim.id === sim.id;
          const theme = getSimTheme(sim.indexNumber);

          return (
            <button
              key={sim.id}
              onClick={() => onSelectSim(sim)}
              style={
                isActive
                  ? {
                      backdropFilter: 'blur(12px)',
                      WebkitBackdropFilter: 'blur(12px)',
                      backgroundColor: 'rgba(29, 78, 216, 0.88)',
                      backgroundImage: 'linear-gradient(135deg, rgba(37, 99, 235, 0.95) 0%, rgba(30, 64, 175, 0.95) 100%)',
                      borderTopColor: 'rgba(147, 197, 253, 0.5)',
                      borderRightColor: 'rgba(147, 197, 253, 0.5)',
                      borderBottomColor: 'rgba(147, 197, 253, 0.5)',
                      borderLeftColor: theme.bgSolid,
                      borderTopWidth: '1px',
                      borderRightWidth: '1px',
                      borderBottomWidth: '1px',
                      borderLeftWidth: '5px',
                      borderStyle: 'solid',
                      color: '#ffffff',
                      boxShadow: '0 8px 24px rgba(29, 78, 216, 0.4), inset 0 1px 1px rgba(255, 255, 255, 0.5)'
                    }
                  : {
                      backdropFilter: 'blur(12px)',
                      WebkitBackdropFilter: 'blur(12px)',
                      backgroundColor: isDarkMode ? 'rgba(11, 22, 51, 0.65)' : 'rgba(255, 255, 255, 0.72)',
                      borderTopColor: isDarkMode ? 'rgba(255, 255, 255, 0.18)' : 'rgba(255, 255, 255, 0.6)',
                      borderRightColor: isDarkMode ? 'rgba(255, 255, 255, 0.18)' : 'rgba(255, 255, 255, 0.6)',
                      borderBottomColor: isDarkMode ? 'rgba(255, 255, 255, 0.18)' : 'rgba(255, 255, 255, 0.6)',
                      borderLeftColor: theme.bgSolid,
                      borderTopWidth: '1px',
                      borderRightWidth: '1px',
                      borderBottomWidth: '1px',
                      borderLeftWidth: '4px',
                      borderStyle: 'solid',
                      color: isDarkMode ? '#ffffff' : '#0f172a',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)'
                    }
              }
              className="w-full text-left p-2.5 rounded-xl transition-all duration-150 flex items-center gap-3 cursor-pointer group btn-3d opacity-100"
            >
              {/* Colorful 3D Icon Tile with Crisp Sharp Outline */}
              <div 
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 icon-tile-3d shadow-md"
                style={{
                  backgroundColor: isActive ? '#ffffff' : theme.badgeBg,
                  borderColor: theme.borderColor,
                  borderWidth: '2px',
                  borderStyle: 'solid',
                  boxShadow: `0 4px 10px ${theme.glowColor}`
                }}
              >
                {renderTopicIcon(sim.iconName, theme.iconBg || theme.bgSolid)}
              </div>

              {/* Title, Number and Subject - Crisp High Contrast Typography */}
              <div className="min-w-0 flex-1">
                <div className="text-xs font-black truncate leading-tight flex items-center gap-1.5">
                  <span 
                    style={{
                      backgroundColor: isActive ? '#ffffff' : theme.badgeBg,
                      color: isActive ? '#1e40af' : theme.badgeText,
                      borderColor: isActive ? '#93c5fd' : theme.badgeBorder,
                      borderWidth: '1.5px',
                      borderStyle: 'solid'
                    }}
                    className="font-mono text-[10px] font-black px-1.5 py-0.5 rounded shadow-2xs shrink-0"
                  >
                    {sim.indexNumber}
                  </span>
                  <span 
                    className="truncate font-black"
                    style={{
                      color: isActive ? '#ffffff' : (isDarkMode ? '#ffffff' : '#0f172a')
                    }}
                  >
                    {sim.title}
                  </span>
                </div>
                <div 
                  className="text-[10px] truncate mt-1 font-bold"
                  style={{
                    color: isActive ? '#ffffff' : (isDarkMode ? '#e2e8f0' : '#334155')
                  }}
                >
                  {sim.subject}
                </div>
              </div>

              {/* Right Tag/Badge */}
              {isActive ? (
                <div 
                  className="shrink-0 px-2 py-0.5 rounded-md font-black text-[9px] uppercase tracking-wider shadow-md border"
                  style={{
                    backgroundColor: '#ffffff',
                    color: '#1e3a8a',
                    borderColor: '#93c5fd',
                    borderWidth: '1.5px',
                    borderStyle: 'solid'
                  }}
                >
                  ACTIVE
                </div>
              ) : (
                <div 
                  style={{
                    backgroundColor: theme.badgeBg,
                    color: theme.badgeText,
                    borderColor: theme.badgeBorder,
                    borderWidth: '1.5px',
                    borderStyle: 'solid'
                  }}
                  className="shrink-0 text-[9px] font-black px-1.5 py-0.5 rounded shadow-2xs"
                >
                  {sim.category.split(' ')[0]}
                </div>
              )}
            </button>
          );
        })}

        {filtered.length === 0 && (
          <div 
            className="p-6 text-center text-xs font-bold"
            style={{ color: isDarkMode ? '#cbd5e1' : '#334155' }}
          >
            No simulation found matching your search.
          </div>
        )}
      </div>

      {/* Sidebar Footer Info */}
      <div 
        className="p-3 border-t text-[11px] flex items-center justify-between shrink-0"
        style={{
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          backgroundColor: isDarkMode ? 'rgba(7, 19, 40, 0.75)' : 'rgba(248, 250, 252, 0.75)',
          borderTop: isDarkMode ? '1px solid rgba(255, 255, 255, 0.18)' : '1px solid rgba(255, 255, 255, 0.5)',
          color: isDarkMode ? '#f8fafc' : '#0f172a'
        }}
      >
        <span 
          className="font-mono font-black"
          style={{ color: isDarkMode ? '#38bdf8' : '#1d4ed8' }}
        >
          {simulations.length} STEM Labs
        </span>
        <span 
          className="font-black flex items-center gap-1.5"
          style={{ color: '#047857' }}
        >
          <span 
            className="w-2 h-2 rounded-full shadow-xs"
            style={{ backgroundColor: '#10b981' }}
          ></span>
          <span>4K Ultra Fidelity</span>
        </span>
      </div>
    </aside>
  );
};
