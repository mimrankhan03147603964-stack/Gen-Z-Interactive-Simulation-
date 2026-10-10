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
}

// 3D Vibrant colorful icon mapper for all 14 simulation modules
const renderTopicIcon = (iconName: string) => {
  const iconProps = { className: "w-4 h-4 text-white drop-shadow-sm" };
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

// Rich 3D gradient colors for each simulation icon box
const getIconGradient = (indexStr: string, defaultColor: string) => {
  const gradients: Record<string, string> = {
    '01': 'from-emerald-500 to-teal-700',
    '02': 'from-cyan-500 to-blue-700',
    '03': 'from-amber-500 to-orange-700',
    '04': 'from-rose-500 to-red-700',
    '05': 'from-purple-500 to-indigo-700',
    '06': 'from-yellow-400 to-amber-600',
    '07': 'from-teal-400 to-emerald-700',
    '08': 'from-blue-500 to-cyan-700',
    '09': 'from-red-500 to-rose-700',
    '10': 'from-pink-500 to-rose-700',
    '11': 'from-green-500 to-emerald-800',
    '12': 'from-orange-500 to-amber-700',
    '13': 'from-sky-500 to-blue-700',
    '14': 'from-indigo-500 to-purple-800',
  };
  return gradients[indexStr] || 'from-blue-600 to-indigo-700';
};

export const Sidebar: React.FC<SidebarProps> = ({
  simulations,
  activeSim,
  onSelectSim,
  isOpen,
  onToggle
}) => {
  const [searchFilter, setSearchFilter] = useState('');

  const filtered = simulations.filter(s => 
    s.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
    s.indexNumber.includes(searchFilter) ||
    s.subject.toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <aside 
      className={`fixed lg:static top-0 left-0 z-40 h-full flex flex-col bg-gradient-to-b from-[#081226] via-[#050e1f] to-[#040816] border-r border-blue-500/25 transition-all duration-300 shadow-2xl lg:shadow-none select-none ${
        isOpen ? 'w-84 translate-x-0' : '-translate-x-full lg:translate-x-0 lg:w-84'
      }`}
    >
      {/* Top Sidebar 3D Header */}
      <div className="p-4 border-b border-blue-500/20 flex items-center justify-between gap-3 shrink-0 bg-[#071328]/90">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-500 flex items-center justify-center text-white shadow-lg shadow-blue-500/30 icon-tile-3d border border-cyan-400/30">
            <Atom className="w-5 h-5 animate-spin-slow" />
          </div>
          <div>
            <h2 className="text-xs font-black text-white tracking-wider uppercase drop-shadow-sm">
              GEN Z EDTECH SIMULATION
            </h2>
            <p className="text-[11px] text-cyan-300 font-bold uppercase tracking-tight flex items-center gap-1.5">
              <span>Interactive STEM Portal</span>
              <span className="px-1.5 py-0.2 rounded bg-blue-600/60 text-white text-[9px] font-black border border-cyan-400/40">14 LABS</span>
            </p>
          </div>
        </div>

        {/* Mobile Close Button */}
        <button
          onClick={onToggle}
          className="lg:hidden p-1.5 rounded-lg text-slate-300 hover:text-white bg-[#0e1f42] hover:bg-[#152e61] border border-blue-500/30"
          title="Close Navigation"
        >
          <PanelLeftClose className="w-4 h-4" />
        </button>
      </div>

      {/* 3D Search Input Box */}
      <div className="p-3.5 pb-2 shrink-0">
        <div className="relative">
          <Search className="w-3.5 h-3.5 text-cyan-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search simulations (01 - 14)..."
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-[#0a1633] border border-blue-500/35 text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 shadow-inner transition-all font-medium"
          />
        </div>
      </div>

      {/* Vertical Navigation List (01 to 14) with 3D Bevel Cards & Vivid Colorful Badges */}
      <div className="flex-1 overflow-y-auto px-2.5 py-1.5 space-y-1.5 scrollbar-thin">
        {filtered.map((sim) => {
          const isActive = activeSim.id === sim.id;
          const gradientClass = getIconGradient(sim.indexNumber, sim.accentColor);

          return (
            <button
              key={sim.id}
              onClick={() => onSelectSim(sim)}
              className={`w-full text-left p-2.5 rounded-xl transition-all duration-150 flex items-center gap-3 cursor-pointer group btn-3d ${
                isActive
                  ? 'bg-gradient-to-r from-blue-700 via-indigo-600 to-blue-800 text-white border-2 border-cyan-400 shadow-lg shadow-blue-900/60 ring-1 ring-cyan-400'
                  : 'bg-[#0a1532] hover:bg-[#12234e] text-white border border-blue-900/40 hover:border-blue-400/60 shadow-md'
              }`}
            >
              {/* Vibrant Colorful 3D Icon Badge */}
              <div 
                className={`w-9 h-9 rounded-xl bg-gradient-to-tr ${gradientClass} flex items-center justify-center shrink-0 icon-tile-3d border border-white/30`}
              >
                {renderTopicIcon(sim.iconName)}
              </div>

              {/* Title and Subject - High Contrast Crisp 4K Text */}
              <div className="min-w-0 flex-1">
                <div className="text-xs font-extrabold truncate leading-tight text-white flex items-center gap-1 drop-shadow-xs">
                  <span className="font-mono text-amber-400 font-black">{sim.indexNumber}.</span>
                  <span className="truncate">{sim.title}</span>
                </div>
                <div className={`text-[10px] truncate mt-0.5 font-medium ${isActive ? 'text-cyan-200 font-bold' : 'text-slate-400'}`}>
                  {sim.subject}
                </div>
              </div>

              {/* Right Tag/Badge with 3D Depth */}
              {isActive ? (
                <div className="shrink-0 px-2 py-0.5 rounded-md bg-white text-blue-900 font-black text-[9px] uppercase tracking-wider shadow-md animate-pulse border border-cyan-300">
                  ACTIVE
                </div>
              ) : (
                <div className="shrink-0 text-[9px] font-bold text-cyan-300 bg-[#061129] border border-blue-500/30 px-2 py-0.5 rounded-md shadow-2xs">
                  {sim.category.split(' ')[0]}
                </div>
              )}
            </button>
          );
        })}

        {filtered.length === 0 && (
          <div className="p-6 text-center text-xs text-slate-400">
            No simulation found matching your search.
          </div>
        )}
      </div>

      {/* Sidebar 3D Footer Info */}
      <div className="p-3 border-t border-blue-500/20 bg-[#071328]/95 text-[11px] text-slate-300 flex items-center justify-between shrink-0 shadow-inner">
        <span className="font-mono text-cyan-300 font-bold">14 Labs Available</span>
        <span className="text-emerald-400 font-bold flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-sm shadow-emerald-400"></span>
          <span>4K Ultra Ready</span>
        </span>
      </div>
    </aside>
  );
};
