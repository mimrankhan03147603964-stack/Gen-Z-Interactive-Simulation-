import React, { useState } from 'react';
import { SimulationItem } from '../types';
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

// 3D Vibrant colorful icon mapper for all 14 simulation modules with distinct colors
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

// Rich 3D gradient colors and accent styling for each simulation tile
interface SimStyling {
  bgGradient: string;
  badgeBg: string;
  badgeText: string;
  badgeBorder: string;
  borderAccent: string;
  iconGlow: string;
}

const getSimStyling = (indexStr: string): SimStyling => {
  const map: Record<string, SimStyling> = {
    '01': {
      bgGradient: 'from-[#10b981] to-[#047857]',
      badgeBg: '#d1fae5',
      badgeText: '#065f46',
      badgeBorder: '#6ee7b7',
      borderAccent: '#10b981',
      iconGlow: '#a7f3d0'
    },
    '02': {
      bgGradient: 'from-[#06b6d4] to-[#0369a1]',
      badgeBg: '#cffafe',
      badgeText: '#0e7490',
      badgeBorder: '#67e8f9',
      borderAccent: '#06b6d4',
      iconGlow: '#bae6fd'
    },
    '03': {
      bgGradient: 'from-[#f59e0b] to-[#d97706]',
      badgeBg: '#fef3c7',
      badgeText: '#92400e',
      badgeBorder: '#fcd34d',
      borderAccent: '#f59e0b',
      iconGlow: '#fde68a'
    },
    '04': {
      bgGradient: 'from-[#f43f5e] to-[#be123c]',
      badgeBg: '#ffe4e6',
      badgeText: '#9f1239',
      badgeBorder: '#fda4af',
      borderAccent: '#f43f5e',
      iconGlow: '#fecdd3'
    },
    '05': {
      bgGradient: 'from-[#3b82f6] to-[#1d4ed8]',
      badgeBg: '#dbeafe',
      badgeText: '#1e40af',
      badgeBorder: '#93c5fd',
      borderAccent: '#3b82f6',
      iconGlow: '#bfdbfe'
    },
    '06': {
      bgGradient: 'from-[#eab308] to-[#ca8a04]',
      badgeBg: '#fef9c3',
      badgeText: '#854d0e',
      badgeBorder: '#fde047',
      borderAccent: '#eab308',
      iconGlow: '#fef08a'
    },
    '07': {
      bgGradient: 'from-[#14b8a6] to-[#0f766e]',
      badgeBg: '#ccfbf1',
      badgeText: '#115e59',
      badgeBorder: '#5eead4',
      borderAccent: '#14b8a6',
      iconGlow: '#99f6e4'
    },
    '08': {
      bgGradient: 'from-[#6366f1] to-[#4338ca]',
      badgeBg: '#e0e7ff',
      badgeText: '#3730a3',
      badgeBorder: '#a5b4fc',
      borderAccent: '#6366f1',
      iconGlow: '#c7d2fe'
    },
    '09': {
      bgGradient: 'from-[#8b5cf6] to-[#6d28d9]',
      badgeBg: '#ede9fe',
      badgeText: '#5b21b6',
      badgeBorder: '#c4b5fd',
      borderAccent: '#8b5cf6',
      iconGlow: '#ddd6fe'
    },
    '10': {
      bgGradient: 'from-[#0ea5e9] to-[#0284c7]',
      badgeBg: '#e0f2fe',
      badgeText: '#0369a1',
      badgeBorder: '#7dd3fc',
      borderAccent: '#0ea5e9',
      iconGlow: '#bae6fd'
    },
    '11': {
      bgGradient: 'from-[#84cc16] to-[#4d7c0f]',
      badgeBg: '#ecfccb',
      badgeText: '#3f6212',
      badgeBorder: '#bef264',
      borderAccent: '#84cc16',
      iconGlow: '#d9f99d'
    },
    '12': {
      bgGradient: 'from-[#f97316] to-[#c2410c]',
      badgeBg: '#ffedd5',
      badgeText: '#9a3412',
      badgeBorder: '#fdba74',
      borderAccent: '#f97316',
      iconGlow: '#fed7aa'
    },
    '13': {
      bgGradient: 'from-[#d946ef] to-[#a21caf]',
      badgeBg: '#fae8ff',
      badgeText: '#86198f',
      badgeBorder: '#f0abfc',
      borderAccent: '#d946ef',
      iconGlow: '#f5d0fe'
    },
    '14': {
      bgGradient: 'from-[#2563eb] to-[#1e3a8a]',
      badgeBg: '#dbeafe',
      badgeText: '#1e40af',
      badgeBorder: '#93c5fd',
      borderAccent: '#2563eb',
      iconGlow: '#bfdbfe'
    },
  };
  return map[indexStr] || {
    bgGradient: 'from-[#2563eb] to-[#1d4ed8]',
    badgeBg: '#dbeafe',
    badgeText: '#1e40af',
    badgeBorder: '#93c5fd',
    borderAccent: '#2563eb',
    iconGlow: '#bfdbfe'
  };
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
        isDarkMode 
          ? 'bg-gradient-to-b from-[#081226] via-[#050e1f] to-[#040816] border-r border-blue-500/25 text-white' 
          : 'bg-white border-r border-slate-200 text-slate-800'
      } ${
        isOpen ? 'w-84 translate-x-0' : '-translate-x-full lg:translate-x-0 lg:w-84'
      }`}
    >
      {/* Top Sidebar Header */}
      <div 
        className={`p-4 border-b flex items-center justify-between gap-3 shrink-0 ${
          isDarkMode 
            ? 'bg-[#071328]/95 border-blue-500/20' 
            : 'bg-gradient-to-r from-blue-50/80 via-indigo-50/50 to-white border-slate-200'
        }`}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-500 flex items-center justify-center text-white shadow-lg shadow-blue-500/25 icon-tile-3d border border-white/40">
            <Atom className="w-5 h-5 animate-spin-slow text-white" />
          </div>
          <div>
            <h2 className={`text-xs font-black tracking-wider uppercase drop-shadow-xs ${
              isDarkMode ? 'text-white' : 'text-slate-900'
            }`}>
              GEN Z EDTECH SIMULATION
            </h2>
            <p className="text-[11px] font-bold tracking-tight flex items-center gap-1.5 mt-0.5">
              <span className={isDarkMode ? 'text-cyan-300' : 'text-blue-700'}>STEM Lab Catalog</span>
              <span className="px-1.5 py-0.2 rounded bg-blue-600 text-white text-[9px] font-black shadow-xs">
                14 LABS
              </span>
            </p>
          </div>
        </div>

        {/* Mobile Close Button */}
        <button
          onClick={onToggle}
          className={`lg:hidden p-1.5 rounded-lg border transition-all ${
            isDarkMode 
              ? 'text-slate-300 hover:text-white bg-[#0e1f42] border-blue-500/30' 
              : 'text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 border-slate-300'
          }`}
          title="Close Navigation"
        >
          <PanelLeftClose className="w-4 h-4" />
        </button>
      </div>

      {/* Search Input Box */}
      <div className={`p-3 shrink-0 ${isDarkMode ? 'bg-transparent' : 'bg-slate-50/60'}`}>
        <div className="relative">
          <Search className={`w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none ${
            isDarkMode ? 'text-cyan-400' : 'text-blue-600'
          }`} />
          <input
            type="text"
            placeholder="Search simulations (01 - 14)..."
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            className={`w-full pl-9 pr-3 py-2 text-xs rounded-xl border focus:outline-none focus:ring-2 font-medium transition-all shadow-inner ${
              isDarkMode 
                ? 'bg-[#0a1633] border-blue-500/35 text-white placeholder-slate-400 focus:border-cyan-400 focus:ring-cyan-400/40' 
                : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:ring-blue-500/20'
            }`}
          />
        </div>
      </div>

      {/* Vertical Navigation List (01 to 14) with 3D Bevel Cards & Vivid Colorful Badges */}
      <div className="flex-1 overflow-y-auto px-2.5 py-2 space-y-2 scrollbar-thin">
        {filtered.map((sim) => {
          const isActive = activeSim.id === sim.id;
          const styling = getSimStyling(sim.indexNumber);

          return (
            <button
              key={sim.id}
              onClick={() => onSelectSim(sim)}
              style={{
                borderLeftColor: styling.borderAccent,
                borderLeftWidth: '4px'
              }}
              className={`w-full text-left p-2.5 rounded-xl transition-all duration-150 flex items-center gap-3 cursor-pointer group btn-3d ${
                isActive
                  ? isDarkMode
                    ? 'bg-gradient-to-r from-blue-700 via-indigo-600 to-blue-800 text-white border-t border-r border-b border-cyan-400 shadow-lg ring-2 ring-cyan-400/50'
                    : 'bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white border-t border-r border-b border-blue-500 shadow-md ring-2 ring-blue-500/40'
                  : isDarkMode
                    ? 'bg-[#0b1633] hover:bg-[#12234e] text-white border border-blue-900/40 hover:border-blue-400/60 shadow-sm'
                    : 'bg-white hover:bg-slate-50 text-slate-900 border border-slate-200/90 hover:border-blue-300 shadow-sm hover:shadow-md'
              }`}
            >
              {/* Vibrant Colorful 3D Icon Badge */}
              <div 
                className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${styling.bgGradient} flex items-center justify-center shrink-0 icon-tile-3d border border-white/40 shadow-md`}
              >
                {renderTopicIcon(sim.iconName, '#ffffff')}
              </div>

              {/* Title, Number and Subject */}
              <div className="min-w-0 flex-1">
                <div className="text-xs font-black truncate leading-tight flex items-center gap-1.5">
                  <span 
                    style={{
                      backgroundColor: styling.badgeBg,
                      color: styling.badgeText,
                      borderColor: styling.badgeBorder
                    }}
                    className="font-mono text-[10px] font-black px-1.5 py-0.5 rounded border shadow-2xs shrink-0"
                  >
                    {sim.indexNumber}
                  </span>
                  <span className={`truncate ${
                    isActive 
                      ? 'text-white font-black drop-shadow-xs' 
                      : isDarkMode ? 'text-white' : 'text-slate-900 font-extrabold'
                  }`}>
                    {sim.title}
                  </span>
                </div>
                <div className={`text-[10px] truncate mt-1 font-medium ${
                  isActive 
                    ? 'text-cyan-100 font-bold' 
                    : isDarkMode ? 'text-slate-400' : 'text-slate-500'
                }`}>
                  {sim.subject}
                </div>
              </div>

              {/* Right Tag/Badge */}
              {isActive ? (
                <div className="shrink-0 px-2 py-0.5 rounded-md bg-white text-blue-900 font-black text-[9px] uppercase tracking-wider shadow-md animate-pulse border border-cyan-300">
                  ACTIVE
                </div>
              ) : (
                <div 
                  style={{
                    backgroundColor: styling.badgeBg,
                    color: styling.badgeText,
                    borderColor: styling.badgeBorder
                  }}
                  className="shrink-0 text-[9px] font-extrabold border px-1.5 py-0.5 rounded shadow-2xs"
                >
                  {sim.category.split(' ')[0]}
                </div>
              )}
            </button>
          );
        })}

        {filtered.length === 0 && (
          <div className="p-6 text-center text-xs text-slate-500">
            No simulation found matching your search.
          </div>
        )}
      </div>

      {/* Sidebar Footer Info */}
      <div className={`p-3 border-t text-[11px] flex items-center justify-between shrink-0 ${
        isDarkMode 
          ? 'bg-[#071328]/95 border-blue-500/20 text-slate-300' 
          : 'bg-slate-50 border-slate-200 text-slate-600'
      }`}>
        <span className="font-mono font-bold text-blue-600 dark:text-cyan-300">14 STEM Labs</span>
        <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-xs"></span>
          <span>4K Ultra Fidelity</span>
        </span>
      </div>
    </aside>
  );
};
