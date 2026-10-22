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
    accent: '#2563eb',
    gradient: 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)',
    border: 'rgba(96, 165, 250, 0.6)',
    glow: 'rgba(37, 99, 235, 0.45)',
    icon: <Layers className="w-5 h-5 text-white" />
  },
  {
    key: 'Physics & Motion',
    name: 'Physics & Classical Mechanics',
    shortLabel: 'Physics',
    countKey: 'Physics & Motion',
    accent: '#1d4ed8',
    gradient: 'linear-gradient(135deg, #1e3a8a 0%, #0284c7 100%)',
    border: 'rgba(56, 189, 248, 0.6)',
    glow: 'rgba(2, 132, 199, 0.45)',
    icon: <Atom className="w-5 h-5 text-cyan-200" />
  },
  {
    key: 'Chemistry & Matter',
    name: 'Chemistry & Molecular Science',
    shortLabel: 'Chemistry',
    countKey: 'Chemistry & Matter',
    accent: '#9333ea',
    gradient: 'linear-gradient(135deg, #6b21a8 0%, #a855f7 100%)',
    border: 'rgba(216, 180, 254, 0.6)',
    glow: 'rgba(168, 85, 247, 0.45)',
    icon: <FlaskConical className="w-5 h-5 text-purple-200" />
  },
  {
    key: 'Biology & Life',
    name: 'Biology & Living Systems',
    shortLabel: 'Biology',
    countKey: 'Biology & Life',
    accent: '#16a34a',
    gradient: 'linear-gradient(135deg, #065f46 0%, #10b981 100%)',
    border: 'rgba(134, 239, 172, 0.6)',
    glow: 'rgba(16, 185, 129, 0.45)',
    icon: <Leaf className="w-5 h-5 text-emerald-200" />
  },
  {
    key: 'Earth & Space',
    name: 'Earth & Space Exploration',
    shortLabel: 'Earth & Space',
    countKey: 'Earth & Space',
    accent: '#0f766e',
    gradient: 'linear-gradient(135deg, #115e59 0%, #06b6d4 100%)',
    border: 'rgba(103, 232, 249, 0.6)',
    glow: 'rgba(6, 182, 212, 0.45)',
    icon: <Globe className="w-5 h-5 text-teal-200" />
  },
  {
    key: 'Mathematics & Logic',
    name: 'Mathematics & Geometry',
    shortLabel: 'Mathematics',
    countKey: 'Mathematics & Logic',
    accent: '#ea580c',
    gradient: 'linear-gradient(135deg, #9a3412 0%, #ea580c 100%)',
    border: 'rgba(253, 186, 116, 0.6)',
    glow: 'rgba(234, 88, 12, 0.45)',
    icon: <Calculator className="w-5 h-5 text-amber-200" />
  },
  {
    key: 'Computer Science & IT',
    name: 'Computer Science & Hardware',
    shortLabel: 'Computer Science',
    countKey: 'Computer Science & IT',
    accent: '#0e7490',
    gradient: 'linear-gradient(135deg, #0369a1 0%, #6366f1 100%)',
    border: 'rgba(129, 140, 248, 0.6)',
    glow: 'rgba(99, 102, 241, 0.45)',
    icon: <Cpu className="w-5 h-5 text-sky-200" />
  },
  {
    key: 'English & Grammar',
    name: 'English & Spatial Linguistics',
    shortLabel: 'English',
    countKey: 'English & Grammar',
    accent: '#4f46e5',
    gradient: 'linear-gradient(135deg, #3730a3 0%, #8b5cf6 100%)',
    border: 'rgba(196, 181, 253, 0.6)',
    glow: 'rgba(139, 92, 246, 0.45)',
    icon: <BookOpen className="w-5 h-5 text-indigo-200" />
  },
  {
    key: 'Early Childhood (ECCE)',
    name: 'Early Childhood Care & Education',
    shortLabel: 'ECCE',
    countKey: 'Early Childhood (ECCE)',
    accent: '#db2777',
    gradient: 'linear-gradient(135deg, #9d174d 0%, #ec4899 100%)',
    border: 'rgba(244, 114, 182, 0.6)',
    glow: 'rgba(236, 72, 153, 0.45)',
    icon: <Baby className="w-5 h-5 text-pink-200" />
  },
  {
    key: 'Urdu & Linguistics',
    name: 'Urdu Language & Linguistics',
    shortLabel: 'Urdu',
    countKey: 'Urdu & Linguistics',
    accent: '#b91c1c',
    gradient: 'linear-gradient(135deg, #991b1b 0%, #ef4444 100%)',
    border: 'rgba(252, 165, 165, 0.6)',
    glow: 'rgba(239, 68, 68, 0.45)',
    icon: <GraduationCap className="w-5 h-5 text-rose-200" />
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
      {/* Backdrop overlay */}
      {isOpen && (
        <div
          onClick={onToggle}
          className="fixed inset-0 z-[9990] bg-slate-950/60 backdrop-blur-xs transition-opacity duration-300 cursor-pointer"
          aria-hidden="true"
        />
      )}

      {/* Slide-out Drawer Panel */}
      <div
        className={`fixed top-0 left-0 z-[9999] h-full w-84 sm:w-96 bg-[#0a1836] text-white shadow-2xl border-r-2 border-blue-400 flex flex-col transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{
          boxShadow: '10px 0 40px -10px rgba(0, 0, 0, 0.8)'
        }}
        role="dialog"
        aria-modal="true"
        aria-label="STEM Navigation Drawer"
      >
        {/* Drawer Header with Rich 3D Gradient */}
        <div 
          className="p-4 sm:p-5 border-b-2 border-blue-400 flex items-center justify-between gap-3 shrink-0 relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #091e42 0%, #1e3a8a 50%, #2563eb 100%)',
            boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.3)'
          }}
        >
          {/* Top Sheen */}
          <div className="absolute inset-0 pointer-events-none opacity-20 bg-gradient-to-b from-white/40 via-transparent to-black/30" />

          <div className="flex items-center gap-3 relative z-10">
            <div 
              className="w-11 h-11 rounded-xl p-1 bg-[#0f2347] border-2 border-blue-400 shadow-md shrink-0 flex items-center justify-center overflow-hidden"
              style={{
                boxShadow: '0 4px 15px rgba(37, 99, 235, 0.4)'
              }}
            >
              <img
                src="/genz-monogram.png"
                alt="Gen Z Monogram"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h2 className="text-sm font-black tracking-wide text-white uppercase font-heading drop-shadow-xs">
                GEN Z SIMULATIONS
              </h2>
              <p className="text-xs font-bold text-cyan-200 flex items-center gap-1.5 mt-0.5">
                <span>STEM Disciplines</span>
                <span className="px-2 py-0.2 rounded-full text-[10px] font-mono font-black bg-amber-400 text-slate-950 shadow-xs">
                  {simulations.length} Labs
                </span>
              </p>
            </div>
          </div>

          {/* Close Button with 3D tactile push */}
          <button
            type="button"
            onClick={onToggle}
            className="p-2 rounded-xl bg-white/20 hover:bg-white/30 border border-white/40 text-white transition-all cursor-pointer shadow-md active:scale-95 relative z-10"
            title="Close Drawer"
            aria-label="Close Drawer"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* View Switcher Tabs (Disciplines vs All Labs) */}
        <div className="p-3 border-b-2 border-blue-400/50 bg-[#0e2145] grid grid-cols-2 gap-2 shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab('categories')}
            className={`py-2 px-3 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center justify-center gap-1.5 border-2 ${
              activeTab === 'categories'
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-blue-300 shadow-md'
                : 'bg-[#163261] text-slate-200 hover:bg-[#1c3f7a] border-blue-400/40'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>9 Disciplines</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('labs')}
            className={`py-2 px-3 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center justify-center gap-1.5 border-2 ${
              activeTab === 'labs'
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-blue-300 shadow-md'
                : 'bg-[#163261] text-slate-200 hover:bg-[#1c3f7a] border-blue-400/40'
            }`}
          >
            <Search className="w-3.5 h-3.5" />
            <span>Search {simulations.length} Labs</span>
          </button>
        </div>

        {/* Tab 1: STEM Subjects / Categories List - FULLY COLORED 3D BOXES */}
        {activeTab === 'categories' && (
          <div className="flex-1 overflow-y-auto p-3 space-y-2.5">
            <div className="px-2 py-1 text-[11px] font-black uppercase tracking-wider text-cyan-300 flex items-center justify-between">
              <span>Filter By Subject</span>
              <span className="text-[10px] font-mono text-slate-400">9 Available</span>
            </div>

            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat.key;
              const count = getCategoryCount(cat.key);

              return (
                <button
                  key={cat.key}
                  type="button"
                  onClick={() => handleCategoryClick(cat.key)}
                  className={`w-full p-3 rounded-2xl text-left cursor-pointer transition-all duration-200 flex items-center justify-between group relative overflow-hidden border ${
                    isSelected
                      ? 'ring-3 ring-amber-300 ring-offset-2 ring-offset-slate-900 scale-[1.02] shadow-xl'
                      : 'hover:scale-[1.01] hover:brightness-110 shadow-md'
                  }`}
                  style={{
                    background: cat.gradient,
                    borderColor: isSelected ? '#fde047' : cat.border,
                    boxShadow: `0 8px 24px -4px ${cat.glow}, inset 0 1px 1px rgba(255,255,255,0.4)`
                  }}
                  title={`Filter by ${cat.name}`}
                >
                  {/* Top Specular Glass Highlight */}
                  <div className="absolute inset-0 pointer-events-none opacity-20 bg-gradient-to-b from-white/40 via-transparent to-black/30" />

                  <div className="flex items-center gap-3 min-w-0 relative z-10">
                    {/* Glowing 3D Icon Box */}
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border-2 transition-transform group-hover:scale-110 bg-white/20 border-white/40 shadow-sm"
                    >
                      {cat.icon}
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs sm:text-sm font-black truncate leading-tight text-white drop-shadow-sm font-heading">
                        {cat.name}
                      </div>
                      <div className="text-[11px] font-bold text-white/90 drop-shadow-xs mt-0.5">
                        {cat.shortLabel}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 ml-2 relative z-10">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-xs font-mono font-black ${
                        isSelected
                          ? 'bg-amber-300 text-slate-950 shadow-md'
                          : 'bg-white/25 text-white border border-white/40 shadow-xs'
                      }`}
                    >
                      {count}
                    </span>
                    <ChevronRight className={`w-4 h-4 transition-transform group-hover:translate-x-0.5 ${isSelected ? 'text-amber-300' : 'text-white/80'}`} />
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {/* Tab 2: All Labs Direct Search & Launch */}
        {activeTab === 'labs' && (
          <div className="flex-1 flex flex-col min-h-0">
            {/* Search Input */}
            <div className="p-3 border-b-2 border-blue-400/50 bg-[#0e2145]">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-cyan-300 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search by title, number, or topic..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-8 py-2 text-xs font-bold rounded-xl border-2 border-blue-400/60 bg-[#08152e] text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 shadow-xs"
                />
                {searchTerm && (
                  <button
                    type="button"
                    onClick={() => setSearchTerm('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs font-bold"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto p-3 space-y-2 bg-[#091630]">
              <div className="px-2 py-1 text-[11px] font-black text-cyan-300 flex justify-between">
                <span>SIMULATIONS</span>
                <span className="font-mono text-amber-300">{filteredSims.length} FOUND</span>
              </div>

              {filteredSims.map((sim) => (
                <a
                  key={sim.id}
                  href={getSimulationStandaloneUrl(sim)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => onToggle()}
                  className="p-3 rounded-2xl border-2 border-blue-400/40 bg-[#122752] hover:bg-[#183466] hover:border-cyan-400 transition-all flex items-center justify-between gap-2.5 group shadow-md no-underline text-inherit block relative overflow-hidden"
                >
                  <div className="min-w-0 flex-1 relative z-10">
                    <div className="flex items-center gap-1.5 mb-1">
                      <span 
                        className="font-mono text-[10px] font-black px-1.5 py-0.2 rounded text-white shadow-xs"
                        style={{ backgroundColor: sim.accentColor || '#2563eb' }}
                      >
                        LAB {sim.indexNumber}
                      </span>
                      <span className="text-[10px] font-bold text-cyan-300 truncate">
                        {sim.category}
                      </span>
                    </div>
                    <h4 className="text-xs font-black text-white group-hover:text-cyan-300 truncate font-heading">
                      {sim.title}
                    </h4>
                    <p className="text-[11px] font-medium text-slate-200 line-clamp-1 mt-0.5">
                      {sim.description}
                    </p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-cyan-400 group-hover:text-white group-hover:scale-110 transition-all shrink-0 relative z-10" />
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Drawer Footer with Vibrant 3D Gradient */}
        <div 
          className="p-3.5 border-t-2 border-blue-400 text-center shrink-0"
          style={{
            background: 'linear-gradient(135deg, #091e42 0%, #1e3a8a 100%)'
          }}
        >
          <p className="text-[11px] font-black text-cyan-200">
            Gen Z Interactive Simulations &bull; {simulations.length} Verified Labs
          </p>
        </div>
      </div>
    </>
  );
};
