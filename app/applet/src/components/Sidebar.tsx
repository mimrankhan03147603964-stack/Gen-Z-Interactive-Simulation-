import React, { useState } from 'react';
import { SimulationItem } from '../types.ts';
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
  PanelLeftClose,
  CheckCircle2
} from 'lucide-react';

interface SidebarProps {
  simulations: SimulationItem[];
  activeSim: SimulationItem;
  onSelectSim: (sim: SimulationItem) => void;
  isOpen: boolean;
  onToggle: () => void;
}

const renderTopicIcon = (iconName: string) => {
  const iconProps = { className: "w-4.5 h-4.5 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]" };
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
      className={`fixed lg:static top-0 left-0 z-40 h-full flex flex-col bg-[#07132e] text-white border-r border-blue-900/60 transition-all duration-300 shadow-2xl lg:shadow-none ${
        isOpen ? 'w-88 translate-x-0' : '-translate-x-full lg:translate-x-0 lg:w-88'
      }`}
    >
      {/* Top Sidebar 3D Glass Header */}
      <div className="p-4 border-b border-blue-900/60 flex items-center justify-between gap-3 shrink-0 bg-gradient-to-r from-[#0a1b42] to-[#07132e]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-500 via-indigo-500 to-cyan-400 flex items-center justify-center text-white shadow-[0_0_20px_rgba(6,182,212,0.5)] ring-1 ring-white/30">
            <Atom className="w-5.5 h-5.5 animate-spin-slow" />
          </div>
          <div>
            <h2 className="text-xs font-black text-white tracking-wider uppercase drop-shadow-sm">
              GEN Z EDTECH SIMULATION
            </h2>
            <p className="text-[11px] text-cyan-300 font-bold uppercase tracking-tight flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
              4K STEM PORTAL (14 LABS)
            </p>
          </div>
        </div>

        {/* Mobile Close Button */}
        <button
          onClick={onToggle}
          className="lg:hidden p-1.5 rounded-lg text-blue-200 hover:text-white bg-blue-900/50 hover:bg-blue-800/60 border border-blue-700/50"
          title="Close Navigation"
        >
          <PanelLeftClose className="w-4 h-4" />
        </button>
      </div>

      {/* Quick Search Input with 3D Bevel */}
      <div className="p-3.5 pb-2 shrink-0">
        <div className="relative">
          <Search className="w-4 h-4 text-cyan-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search simulations (01 - 14)..."
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-[#0d2252]/80 border border-blue-700/50 text-white placeholder-blue-300/60 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 shadow-inner transition-colors"
          />
        </div>
      </div>

      {/* Vertical Navigation List with 3D Glowing Cards */}
      <div className="flex-1 overflow-y-auto px-3 py-1.5 space-y-2 scrollbar-thin">
        {filtered.map((sim) => {
          const isActive = activeSim.id === sim.id;
          const grad = sim.gradient || 'from-blue-600 to-indigo-600';

          return (
            <button
              key={sim.id}
              onClick={() => onSelectSim(sim)}
              className={`w-full text-left p-2.5 rounded-2xl transition-all duration-200 flex items-center gap-3 cursor-pointer group relative overflow-hidden ${
                isActive
                  ? 'bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white shadow-[0_8px_24px_rgba(37,99,235,0.55)] ring-2 ring-cyan-400/90 scale-[1.01]'
                  : 'bg-[#0b1c3f]/80 hover:bg-[#102757] text-blue-100 border border-blue-800/40 hover:border-cyan-400/50 shadow-[0_4px_12px_rgba(0,0,0,0.3)] hover:scale-[1.01]'
              }`}
            >
              {/* Vibrant 3D Colorful Icon Box */}
              <div 
                className={`w-9.5 h-9.5 rounded-xl flex items-center justify-center shrink-0 shadow-[0_4px_14px_rgba(0,0,0,0.4)] ring-1 ring-white/30 bg-gradient-to-tr ${grad} transform group-hover:scale-105 transition-transform`}
                style={{
                  boxShadow: `0 4px 16px ${sim.glowColor || 'rgba(59,130,246,0.5)'}`
                }}
              >
                {renderTopicIcon(sim.iconName)}
              </div>

              {/* Title and Subject */}
              <div className="min-w-0 flex-1">
                <div className={`text-xs font-black truncate leading-tight ${isActive ? 'text-white' : 'text-slate-100 group-hover:text-white'}`}>
                  <span className="font-mono text-cyan-300 font-bold mr-1">{sim.indexNumber}.</span>
                  {sim.title}
                </div>
                <div className={`text-[10px] truncate mt-0.5 font-medium ${isActive ? 'text-blue-100' : 'text-blue-300/70 group-hover:text-blue-200'}`}>
                  {sim.subject}
                </div>
              </div>

              {/* Right Tag/Badge */}
              {isActive ? (
                <div className="shrink-0 px-2 py-0.5 rounded-full bg-cyan-400 text-[#07132e] font-black text-[9px] uppercase tracking-wider shadow-[0_0_12px_rgba(6,182,212,0.8)] animate-pulse">
                  ACTIVE
                </div>
              ) : (
                <div className="shrink-0 text-[9px] font-bold text-cyan-200/90 bg-[#122858] border border-blue-700/60 px-2 py-0.5 rounded-md shadow-2xs">
                  {sim.category.split(' ')[0]}
                </div>
              )}
            </button>
          );
        })}

        {filtered.length === 0 && (
          <div className="p-4 text-center text-xs text-blue-300/60">
            No simulation found
          </div>
        )}
      </div>

      {/* Sidebar 3D Footer Info */}
      <div className="p-3 border-t border-blue-900/60 bg-[#061026] text-[11px] text-blue-200 flex items-center justify-between shrink-0">
        <span className="font-mono text-cyan-300 font-bold">14 STEM Labs (4K HDR)</span>
        <span className="text-emerald-400 font-bold flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399] animate-pulse"></span>
          Ready to Run
        </span>
      </div>
    </aside>
  );
};
