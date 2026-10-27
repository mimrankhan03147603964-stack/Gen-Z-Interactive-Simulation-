import React, { useState } from 'react';
import { SimulationItem } from '../types';
import { 
  X, 
  Layers, 
  Search, 
  ChevronRight, 
  ExternalLink,
  Atom,
  FlaskConical,
  Leaf,
  Globe,
  Calculator,
  Cpu,
  BookOpen,
  Baby,
  GraduationCap,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { getSimulationStandaloneUrl } from '../utils/navigation';

interface CategoryItem {
  key: string;
  name: string;
  shortLabel: string;
  countKey: string;
  accent: string;
  gradient: string;
  border: string;
  glow: string;
  icon: React.ReactNode;
}

const CATEGORIES: CategoryItem[] = [
  {
    key: 'All Simulations',
    name: 'All Simulations',
    shortLabel: 'Full STEM Catalog',
    countKey: 'All Simulations',
    accent: '#1e40af',
    gradient: 'linear-gradient(135deg, #172554 0%, #1e40af 50%, #2563eb 100%)',
    border: '#3b82f6',
    glow: 'rgba(37, 99, 235, 0.35)',
    icon: <Layers className="w-5 h-5 text-white" />
  },
  {
    key: 'Physics & Motion',
    name: 'Physics & Classical Mechanics',
    shortLabel: 'Physics & Force Motion',
    countKey: 'Physics & Motion',
    accent: '#1d4ed8',
    gradient: 'linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 50%, #0284c7 100%)',
    border: '#38bdf8',
    glow: 'rgba(2, 132, 199, 0.35)',
    icon: <Atom className="w-5 h-5 text-white" />
  },
  {
    key: 'Chemistry & Matter',
    name: 'Chemistry & Molecular Science',
    shortLabel: 'Chemistry (Atoms & Molecules)',
    countKey: 'Chemistry & Matter',
    accent: '#1d4ed8',
    gradient: 'linear-gradient(135deg, #172554 0%, #1d4ed8 50%, #2563eb 100%)',
    border: '#60a5fa',
    glow: 'rgba(37, 99, 235, 0.35)',
    icon: <FlaskConical className="w-5 h-5 text-white" />
  },
  {
    key: 'Biology & Life',
    name: 'Biology & Living Systems',
    shortLabel: 'Biology (Genetics, DNA)',
    countKey: 'Biology & Life',
    accent: '#1e40af',
    gradient: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 50%, #2563eb 100%)',
    border: '#3b82f6',
    glow: 'rgba(30, 64, 175, 0.35)',
    icon: <Leaf className="w-5 h-5 text-white" />
  },
  {
    key: 'Earth & Space',
    name: 'Earth & Space Exploration',
    shortLabel: 'Earth & Celestial Orbits',
    countKey: 'Earth & Space',
    accent: '#0369a1',
    gradient: 'linear-gradient(135deg, #075985 0%, #0369a1 50%, #0284c7 100%)',
    border: '#38bdf8',
    glow: 'rgba(2, 132, 199, 0.35)',
    icon: <Globe className="w-5 h-5 text-white" />
  },
  {
    key: 'Mathematics & Logic',
    name: 'Mathematics & Geometry',
    shortLabel: 'Mathematics & Geometry',
    countKey: 'Mathematics & Logic',
    accent: '#1d4ed8',
    gradient: 'linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 50%, #3b82f6 100%)',
    border: '#60a5fa',
    glow: 'rgba(29, 78, 216, 0.35)',
    icon: <Calculator className="w-5 h-5 text-white" />
  },
  {
    key: 'Computer Science & IT',
    name: 'Computer Science & Hardware',
    shortLabel: 'Computer Science & Logic',
    countKey: 'Computer Science & IT',
    accent: '#1e40af',
    gradient: 'linear-gradient(135deg, #0f172a 0%, #1e40af 50%, #2563eb 100%)',
    border: '#3b82f6',
    glow: 'rgba(30, 64, 175, 0.35)',
    icon: <Cpu className="w-5 h-5 text-white" />
  },
  {
    key: 'English & Grammar',
    name: 'English & Spatial Linguistics',
    shortLabel: 'English Language Arts',
    countKey: 'English & Grammar',
    accent: '#2563eb',
    gradient: 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 50%, #60a5fa 100%)',
    border: '#93c5fd',
    glow: 'rgba(37, 99, 235, 0.35)',
    icon: <BookOpen className="w-5 h-5 text-white" />
  },
  {
    key: 'Early Childhood (ECCE)',
    name: 'Early Childhood Care & Education',
    shortLabel: 'Early Childhood Care (ECCE)',
    countKey: 'Early Childhood (ECCE)',
    accent: '#1d4ed8',
    gradient: 'linear-gradient(135deg, #172554 0%, #1d4ed8 50%, #3b82f6 100%)',
    border: '#60a5fa',
    glow: 'rgba(29, 78, 216, 0.35)',
    icon: <Baby className="w-5 h-5 text-white" />
  },
  {
    key: 'Urdu & Linguistics',
    name: 'Urdu Language & Linguistics',
    shortLabel: 'Urdu Language & Alphabet',
    countKey: 'Urdu & Linguistics',
    accent: '#1e3a8a',
    gradient: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #2563eb 100%)',
    border: '#3b82f6',
    glow: 'rgba(30, 58, 138, 0.35)',
    icon: <GraduationCap className="w-5 h-5 text-white" />
  }
];

interface SidebarProps {
  simulations: SimulationItem[];
  selectedCategory?: string;
  onSelectCategory?: (category: string) => void;
  onSelectSim: (sim: SimulationItem) => void;
  isOpen: boolean;
  onToggle: () => void;
  isDarkMode?: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({
  simulations,
  selectedCategory = 'All Simulations',
  onSelectCategory,
  isOpen,
  onToggle
}) => {
  const [activeTab, setActiveTab] = useState<'categories' | 'labs'>('categories');
  const [searchTerm, setSearchTerm] = useState('');

  const getCategoryCount = (key: string) => {
    if (key === 'All Simulations') return simulations.length;
    return simulations.filter((s) => s.category === key).length;
  };

  const filteredSims = simulations.filter((s) => {
    const q = searchTerm.toLowerCase();
    return (
      s.title.toLowerCase().includes(q) ||
      s.indexNumber.includes(q) ||
      s.subject.toLowerCase().includes(q) ||
      s.category.toLowerCase().includes(q)
    );
  });

  // Lock body scroll when drawer is open to prevent underlying content bleed and scroll
  React.useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  // Handle Escape key to close drawer
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onToggle();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onToggle]);

  const handleCategoryClick = (catKey: string) => {
    if (onSelectCategory) {
      onSelectCategory(catKey);
    }
    onToggle();
    setTimeout(() => {
      const catalogEl = document.getElementById('catalog');
      if (catalogEl) {
        catalogEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 50);
  };

  return (
    <>
      {/* Backdrop overlay - Solid Opaque Dimming Preventing Any Bleed-through */}
      {isOpen && (
        <div
          onClick={onToggle}
          className="fixed inset-0 z-[99990] bg-black/85 transition-opacity duration-300 cursor-pointer"
          aria-hidden="true"
        />
      )}

      {/* Slide-out Drawer Panel - Solid Pure White Background with Crisp Blue Cards at z-[99999] */}
      <div
        className={`fixed top-0 left-0 z-[99999] h-full w-84 sm:w-96 bg-white text-slate-900 shadow-[0_0_60px_rgba(0,0,0,0.6)] border-r-2 border-slate-300 flex flex-col transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="STEM Navigation Drawer"
      >
        {/* Drawer Header: Clean Solid White with Crisp Dark Contrast */}
        <div 
          className="p-4 sm:p-5 border-b border-[#BDD8E9] flex items-center justify-between gap-3 shrink-0 relative bg-white"
        >
          <div className="flex items-center gap-3">
            <div 
              className="inline-flex items-center justify-center rounded-lg bg-[#240854] border border-[#BDD8E9] shadow-sm shrink-0 overflow-hidden"
              style={{ width: 'fit-content', height: 'auto', padding: '0px', borderRadius: '8px' }}
            >
              <img
                src="/genz-official-logo.png"
                alt="Gen Z Official Logo"
                className="block pointer-events-none rounded-md"
                style={{ display: 'block', maxHeight: '40px', width: 'auto', objectFit: 'contain' }}
              />
            </div>
            <div>
              <h2 className="text-sm font-black tracking-wide text-[#001D39] uppercase font-heading">
                GEN Z SIMULATIONS
              </h2>
              <p className="text-xs font-bold text-[#0A4174] flex items-center gap-1.5 mt-0.5">
                <span>STEM Disciplines</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#BDD8E9] text-[#001D39] border border-[#4E8EA2]">
                  {simulations.length} Labs
                </span>
              </p>
            </div>
          </div>

          {/* Close Button */}
          <button
            type="button"
            onClick={onToggle}
            className="p-2 rounded-xl bg-[#BDD8E9]/30 hover:bg-[#BDD8E9] border border-[#BDD8E9] text-[#001D39] transition-all cursor-pointer shadow-xs active:scale-95"
            title="Close Drawer"
            aria-label="Close Drawer"
          >
            <X className="w-5 h-5 text-[#001D39]" />
          </button>
        </div>

        {/* View Switcher Tabs (Disciplines vs All Labs) */}
        <div className="p-3 border-b border-[#BDD8E9] bg-[rgba(189,216,233,0.18)] grid grid-cols-2 gap-2 shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab('categories')}
            className={`py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 border ${
              activeTab === 'categories'
                ? 'bg-[#0A4174] text-white border-[#001D39] shadow-xs'
                : 'bg-white text-[#49769F] hover:text-[#001D39] border-[#BDD8E9] shadow-xs'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>9 Disciplines</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('labs')}
            className={`py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 border ${
              activeTab === 'labs'
                ? 'bg-[#0A4174] text-white border-[#001D39] shadow-xs'
                : 'bg-white text-[#49769F] hover:text-[#001D39] border-[#BDD8E9] shadow-xs'
            }`}
          >
            <Search className="w-3.5 h-3.5" />
            <span>Search {simulations.length} Labs</span>
          </button>
        </div>

        {/* Tab 1: STEM Subjects / Categories List */}
        {activeTab === 'categories' && (
          <div className="flex-1 overflow-y-auto p-3 space-y-2 bg-white">
            <div className="px-2 py-1 text-xs font-bold uppercase tracking-wider text-[#001D39] flex items-center justify-between border-b border-[#BDD8E9] pb-1.5 mb-2">
              <span>Filter By Subject</span>
              <span className="text-[11px] font-mono font-medium text-[#49769F]">9 Available</span>
            </div>

            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat.key;
              const count = getCategoryCount(cat.key);

              return (
                <button
                  key={cat.key}
                  type="button"
                  onClick={() => handleCategoryClick(cat.key)}
                  className={`w-full p-3 rounded-xl text-left cursor-pointer transition-all duration-150 flex items-center justify-between group relative border ${
                    isSelected
                      ? 'bg-[#0A4174] text-white border-[#001D39] shadow-xs'
                      : 'bg-white hover:bg-[#BDD8E9]/35 text-[#001D39] border-[#BDD8E9] shadow-xs'
                  }`}
                  title={`Filter by ${cat.name}`}
                >
                  <div className="flex items-center gap-3 min-w-0 relative z-10">
                    {/* Icon Box */}
                    <div
                      className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 border transition-transform group-hover:scale-105 shadow-xs ${
                        isSelected ? 'bg-white/15 border-white/30 text-white' : 'bg-[#BDD8E9]/30 border-[#BDD8E9] text-[#0A4174]'
                      }`}
                    >
                      {cat.icon}
                    </div>
                    <div className="min-w-0">
                      <div className={`text-xs sm:text-sm font-bold truncate leading-tight font-heading ${
                        isSelected ? 'text-white' : 'text-[#001D39]'
                      }`}>
                        {cat.name}
                      </div>
                      <div className={`text-[11px] font-normal truncate mt-0.5 ${
                        isSelected ? 'text-white/80' : 'text-[#49769F]'
                      }`}>
                        {cat.shortLabel}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 ml-2 relative z-10">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-xs font-mono font-bold ${
                        isSelected
                          ? 'bg-white/25 text-white'
                          : 'bg-[#BDD8E9] text-[#001D39] border border-[#6EA2B3]'
                      }`}
                    >
                      {count}
                    </span>
                    <ChevronRight className={`w-4 h-4 transition-transform group-hover:translate-x-0.5 ${
                      isSelected ? 'text-white' : 'text-[#0A4174]'
                    }`} />
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {/* Tab 2: All Labs Direct Search & Launch */}
        {activeTab === 'labs' && (
          <div className="flex-1 flex flex-col min-h-0 bg-white">
            {/* Search Input */}
            <div className="p-3 border-b border-[#BDD8E9] bg-[rgba(189,216,233,0.18)]">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#0A4174] pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search by title, number, or topic..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-8 py-2 text-xs font-medium rounded-xl border border-[#BDD8E9] bg-white text-[#001D39] placeholder-[#49769F] focus:outline-none focus:border-[#0A4174] focus:ring-1 focus:ring-[#0A4174] shadow-xs"
                />
                {searchTerm && (
                  <button
                    type="button"
                    onClick={() => setSearchTerm('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#49769F] hover:text-[#001D39] text-xs font-bold"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>

            {/* List with Clean White Cards */}
            <div className="flex-1 overflow-y-auto p-3 space-y-2 bg-white">
              <div className="px-2 py-1 text-xs font-bold text-[#001D39] flex justify-between border-b border-[#BDD8E9] pb-1 mb-2">
                <span>SIMULATIONS</span>
                <span className="font-mono text-[#0A4174] font-bold">{filteredSims.length} FOUND</span>
              </div>

              {filteredSims.map((sim) => (
                <a
                  key={sim.id}
                  href={getSimulationStandaloneUrl(sim)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => onToggle()}
                  className="p-3 rounded-xl border border-[#BDD8E9] hover:border-[#4E8EA2] transition-all flex items-center justify-between gap-3 group shadow-xs no-underline block bg-white hover:bg-[rgba(189,216,233,0.2)]"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5 mb-1">
                      <span 
                        className="font-mono text-[10px] font-bold px-2 py-0.5 rounded-md text-[#001D39] bg-[#BDD8E9] border border-[#6EA2B3]"
                      >
                        LAB {sim.indexNumber}
                      </span>
                      <span className="text-[10px] font-medium text-[#0A4174] truncate">
                        {sim.category}
                      </span>
                    </div>
                    <h4 className="text-xs sm:text-sm font-bold text-[#001D39] group-hover:text-[#0A4174] truncate font-heading">
                      {sim.title}
                    </h4>
                    <p className="text-[11px] font-normal text-[#49769F] line-clamp-1 mt-0.5">
                      {sim.description}
                    </p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-[#0A4174] group-hover:scale-110 transition-transform shrink-0" />
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Quick Link to External Simulations Hub */}
        <div className="p-3 bg-[rgba(189,216,233,0.18)] border-t border-[#BDD8E9] shrink-0">
          <a
            href="#external-simulations"
            onClick={() => {
              onToggle();
              const el = document.getElementById('external-simulations');
              if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
            className="w-full py-2.5 px-3 rounded-xl text-xs font-bold bg-[#0A4174] hover:bg-[#001D39] text-white shadow-xs flex items-center justify-center gap-2 transition-all cursor-pointer border border-[#001D39]"
          >
            <Globe className="w-4 h-4 text-white" />
            <span>Open External Simulation Hub (8 Labs)</span>
          </a>
        </div>

        {/* Drawer Footer with High Contrast Details */}
        <div className="p-3.5 border-t border-[#BDD8E9] bg-[rgba(189,216,233,0.18)] text-center shrink-0">
          <p className="text-xs font-bold text-[#001D39]">
            Gen Z Interactive Simulations &bull; {simulations.length} Verified Labs
          </p>
          <p className="text-[10px] font-medium text-[#49769F] mt-0.5">
            National Curriculum of Pakistan &bull; Session 2026-27
          </p>
        </div>
      </div>
    </>
  );
};
