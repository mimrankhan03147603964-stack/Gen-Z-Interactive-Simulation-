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
  CheckCircle2,
  ChevronRight,
  GraduationCap,
  PanelLeftClose,
  FlaskRound
} from 'lucide-react';

interface SidebarProps {
  simulations: SimulationItem[];
  activeSim: SimulationItem;
  onSelectSim: (sim: SimulationItem) => void;
  isOpen: boolean;
  onToggle: () => void;
}

// Icon mapper matching the screenshot's colorful rounded icon boxes
const renderTopicIcon = (iconName: string) => {
  const iconProps = { className: "w-4 h-4 text-white" };
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
      className={`fixed lg:static top-0 left-0 z-40 h-full flex flex-col bg-white border-r border-slate-200 transition-all duration-300 shadow-lg lg:shadow-none ${
        isOpen ? 'w-84 translate-x-0' : '-translate-x-full lg:translate-x-0 lg:w-84'
      }`}
    >
      {/* Top Sidebar Branding Header */}
      <div className="p-4 border-b border-slate-100 flex items-center justify-between gap-3 shrink-0 bg-white">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-700 via-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
            <Atom className="w-5 h-5 animate-spin-slow" />
          </div>
          <div>
            <h2 className="text-xs font-black text-slate-900 tracking-wider uppercase">
              GEN Z EDTECH SIMULATION
            </h2>
            <p className="text-[11px] text-blue-600 font-bold uppercase tracking-tight">
              Interactive STEM Portal (14 Labs)
            </p>
          </div>
        </div>

        {/* Mobile Close Button */}
        <button
          onClick={onToggle}
          className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200"
          title="Close Navigation"
        >
          <PanelLeftClose className="w-4 h-4" />
        </button>
      </div>

      {/* Quick Search Input */}
      <div className="p-4 pb-2 shrink-0">
        <div className="relative">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search simulations (01 - 14)..."
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            className="w-full pl-8.5 pr-3 py-1.5 text-xs rounded-lg bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-colors"
          />
        </div>
      </div>

      {/* Vertical Navigation List (Indexed 01 to 14) */}
      <div className="flex-1 overflow-y-auto px-3 py-1 space-y-1 scrollbar-thin">
        {filtered.map((sim) => {
          const isActive = activeSim.id === sim.id;

          return (
            <button
              key={sim.id}
              onClick={() => onSelectSim(sim)}
              className={`w-full text-left p-2 rounded-xl transition-all duration-150 flex items-center gap-3 cursor-pointer group ${
                isActive
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25 ring-1 ring-blue-500'
                  : 'bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 border border-transparent hover:border-slate-200'
              }`}
            >
              {/* Vibrant Colorful Icon Badge (matching screenshot's vivid icon buttons) */}
              <div 
                className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 shadow-xs"
                style={{ backgroundColor: sim.accentColor }}
              >
                {renderTopicIcon(sim.iconName)}
              </div>

              {/* Title and Subject */}
              <div className="min-w-0 flex-1">
                <div className={`text-xs font-bold truncate leading-tight ${isActive ? 'text-white' : 'text-slate-800'}`}>
                  <span className="font-mono mr-1 opacity-75">{sim.indexNumber}.</span>
                  {sim.title}
                </div>
                <div className={`text-[10px] truncate mt-0.5 ${isActive ? 'text-blue-100' : 'text-slate-500'}`}>
                  {sim.subject}
                </div>
              </div>

              {/* Right Tag/Badge */}
              {isActive ? (
                <div className="shrink-0 px-2 py-0.5 rounded-md bg-white text-blue-700 font-extrabold text-[9px] uppercase tracking-wide shadow-xs animate-pulse">
                  Active
                </div>
              ) : (
                <div className="shrink-0 text-[10px] font-semibold text-slate-600 bg-slate-100 border border-slate-200/80 px-2 py-0.5 rounded-md">
                  {sim.category.split(' ')[0]}
                </div>
              )}
            </button>
          );
        })}

        {filtered.length === 0 && (
          <div className="p-4 text-center text-xs text-slate-500">
            No simulation found
          </div>
        )}
      </div>

      {/* Sidebar Footer Info */}
      <div className="p-3 border-t border-slate-100 bg-slate-50 text-[11px] text-slate-600 flex items-center justify-between shrink-0">
        <span className="font-mono text-slate-600 font-bold">14 Simulations Available</span>
        <span className="text-emerald-800 font-semibold flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-700 animate-pulse"></span>
          Ready to Run
        </span>
      </div>
    </aside>
  );
};
