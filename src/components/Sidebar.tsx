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
  Search,
  CheckCircle2,
  ChevronRight,
  PanelLeftClose
} from 'lucide-react';

interface SidebarProps {
  simulations: SimulationItem[];
  activeSim: SimulationItem;
  onSelectSim: (sim: SimulationItem) => void;
  isOpen: boolean;
  onToggle: () => void;
  isDarkMode?: boolean;
}

// 3D Vibrant colorful icon mapper for all 14 simulation modules
const renderTopicIcon = (iconName: string, iconColor = '#ffffff') => {
  const iconProps = { 
    className: "w-5 h-5 drop-shadow-sm transition-transform group-hover:scale-110",
    style: { color: iconColor }
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
      className={`fixed lg:static top-0 left-0 z-40 h-full flex flex-col transition-all duration-300 shadow-xl lg:shadow-none select-none ${
        isOpen ? 'w-84 translate-x-0' : '-translate-x-full lg:translate-x-0 lg:w-84'
      }`}
      style={{
        backgroundColor: isDarkMode ? '#060e1f' : '#ffffff',
        borderRight: isDarkMode ? '1px solid #1e3a8a' : '1px solid #e2e8f0',
        color: isDarkMode ? '#f8fafc' : '#0f172a'
      }}
    >
      {/* Top Sidebar Header */}
      <div 
        className="p-4 border-b flex items-center justify-between gap-3 shrink-0"
        style={{
          backgroundColor: isDarkMode ? '#0a1633' : '#f8fafc',
          borderBottom: isDarkMode ? '1px solid #1e3a8a' : '1px solid #e2e8f0'
        }}
      >
        <div className="flex items-center gap-3">
          <div 
            className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-lg icon-tile-3d shrink-0"
            style={{
              backgroundColor: '#2563eb',
              backgroundImage: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
              borderColor: '#60a5fa',
              borderWidth: '1.5px',
              borderStyle: 'solid',
              boxShadow: '0 4px 12px rgba(37, 99, 235, 0.4), inset 0 1px 1px rgba(255, 255, 255, 0.6)'
            }}
          >
            <Atom className="w-5 h-5 animate-spin-slow text-white" />
          </div>
          <div>
            <h2 
              className="text-xs font-black tracking-wider uppercase drop-shadow-xs"
              style={{ color: isDarkMode ? '#ffffff' : '#0f172a' }}
            >
              GEN Z EDTECH SIMULATION
            </h2>
            <p className="text-[11px] font-bold tracking-tight flex items-center gap-1.5 mt-0.5">
              <span style={{ color: isDarkMode ? '#38bdf8' : '#1d4ed8' }}>STEM Lab Catalog</span>
              <span 
                className="px-1.5 py-0.2 rounded text-[9px] font-black shadow-xs"
                style={{ backgroundColor: '#2563eb', color: '#ffffff' }}
              >
                14 LABS
              </span>
            </p>
          </div>
        </div>

        {/* Mobile Close Button */}
        <button
          onClick={onToggle}
          className="lg:hidden p-1.5 rounded-lg border transition-all cursor-pointer"
          style={{
            backgroundColor: isDarkMode ? '#0e1f42' : '#f1f5f9',
            borderColor: isDarkMode ? '#3b82f6' : '#cbd5e1',
            color: isDarkMode ? '#ffffff' : '#334155'
          }}
          title="Close Navigation"
        >
          <PanelLeftClose className="w-4 h-4" />
        </button>
      </div>

      {/* Search Input Box */}
      <div 
        className="p-3 shrink-0"
        style={{ backgroundColor: isDarkMode ? 'transparent' : '#f8fafc' }}
      >
        <div className="relative">
          <Search 
            className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" 
            style={{ color: isDarkMode ? '#38bdf8' : '#2563eb' }}
          />
          <input
            type="text"
            placeholder="Search simulations (01 - 14)..."
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border focus:outline-none font-medium transition-all shadow-inner"
            style={{
              backgroundColor: isDarkMode ? '#0a1633' : '#ffffff',
              borderColor: isDarkMode ? '#3b82f6' : '#cbd5e1',
              color: isDarkMode ? '#ffffff' : '#0f172a'
            }}
          />
        </div>
      </div>

      {/* Vertical Navigation List (01 to 14) with Guaranteed Solid 3D Tiles & High Contrast */}
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
                      backgroundColor: '#1d4ed8',
                      backgroundImage: 'linear-gradient(135deg, #2563eb 0%, #1e40af 100%)',
                      borderColor: '#60a5fa',
                      borderWidth: '1.5px',
                      borderStyle: 'solid',
                      borderLeftWidth: '6px',
                      borderLeftColor: theme.bgSolid,
                      color: '#ffffff',
                      boxShadow: '0 4px 12px rgba(29, 78, 216, 0.35), inset 0 1px 1px rgba(255, 255, 255, 0.4)'
                    }
                  : {
                      backgroundColor: isDarkMode ? '#0b1633' : '#ffffff',
                      borderColor: isDarkMode ? '#1e293b' : '#e2e8f0',
                      borderWidth: '1px',
                      borderStyle: 'solid',
                      borderLeftWidth: '5px',
                      borderLeftColor: theme.bgSolid,
                      color: isDarkMode ? '#ffffff' : '#0f172a',
                      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.05)'
                    }
              }
              className="w-full text-left p-2.5 rounded-xl transition-all duration-150 flex items-center gap-3 cursor-pointer group btn-3d"
            >
              {/* Guaranteed Colorful 3D Icon Tile with Solid HEX Fallback */}
              <div 
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 icon-tile-3d shadow-md"
                style={{
                  backgroundColor: theme.bgSolid,
                  backgroundImage: theme.bgGradient,
                  borderColor: theme.borderColor,
                  borderWidth: '1.5px',
                  borderStyle: 'solid',
                  boxShadow: `0 4px 10px ${theme.glowColor}, inset 0 1px 1px rgba(255, 255, 255, 0.5)`
                }}
              >
                {renderTopicIcon(sim.iconName, '#ffffff')}
              </div>

              {/* Title, Number and Subject */}
              <div className="min-w-0 flex-1">
                <div className="text-xs font-black truncate leading-tight flex items-center gap-1.5">
                  <span 
                    style={{
                      backgroundColor: isActive ? 'rgba(255, 255, 255, 0.25)' : theme.badgeBg,
                      color: isActive ? '#ffffff' : theme.badgeText,
                      borderColor: isActive ? '#93c5fd' : theme.badgeBorder,
                      borderWidth: '1px',
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
                  className="text-[10px] truncate mt-1 font-medium"
                  style={{
                    color: isActive ? '#dbeafe' : (isDarkMode ? '#94a3b8' : '#475569')
                  }}
                >
                  {sim.subject}
                </div>
              </div>

              {/* Right Tag/Badge */}
              {isActive ? (
                <div 
                  className="shrink-0 px-2 py-0.5 rounded-md font-black text-[9px] uppercase tracking-wider shadow-md animate-pulse border"
                  style={{
                    backgroundColor: '#ffffff',
                    color: '#1e3a8a',
                    borderColor: '#93c5fd'
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
                    borderWidth: '1px',
                    borderStyle: 'solid'
                  }}
                  className="shrink-0 text-[9px] font-extrabold px-1.5 py-0.5 rounded shadow-2xs"
                >
                  {sim.category.split(' ')[0]}
                </div>
              )}
            </button>
          );
        })}

        {filtered.length === 0 && (
          <div 
            className="p-6 text-center text-xs"
            style={{ color: isDarkMode ? '#94a3b8' : '#64748b' }}
          >
            No simulation found matching your search.
          </div>
        )}
      </div>

      {/* Sidebar Footer Info */}
      <div 
        className="p-3 border-t text-[11px] flex items-center justify-between shrink-0"
        style={{
          backgroundColor: isDarkMode ? '#071328' : '#f8fafc',
          borderTop: isDarkMode ? '1px solid #1e3a8a' : '1px solid #e2e8f0',
          color: isDarkMode ? '#cbd5e1' : '#475569'
        }}
      >
        <span 
          className="font-mono font-bold"
          style={{ color: isDarkMode ? '#38bdf8' : '#2563eb' }}
        >
          14 STEM Labs
        </span>
        <span 
          className="font-bold flex items-center gap-1.5"
          style={{ color: '#059669' }}
        >
          <span 
            className="w-2 h-2 rounded-full animate-pulse shadow-xs"
            style={{ backgroundColor: '#10b981' }}
          ></span>
          <span>4K Ultra Fidelity</span>
        </span>
      </div>
    </aside>
  );
};
