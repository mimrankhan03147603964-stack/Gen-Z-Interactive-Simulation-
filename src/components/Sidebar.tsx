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

      {/* Slide-out Drawer Panel - Solid Warm Sunset Background with Rich Crimson Cards at z-[99999] */}
      <div
        className={`fixed top-0 left-0 z-[99999] h-full w-84 sm:w-96 text-white shadow-[0_0_60px_rgba(0,0,0,0.85)] flex flex-col transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{
          background: 'linear-gradient(180deg, #0A4174 0%, #001D39 60%, #001224 100%)',
          backgroundColor: '#001D39',
          borderRight: '2px solid #4E8EA2'
        }}
        role="dialog"
        aria-modal="true"
        aria-label="STEM Navigation Drawer"
      >
        {/* Drawer Header: Clean Solid Prussian Navy with Slate Contrast */}
        <div 
          className="p-4 sm:p-5 border-b flex items-center justify-between gap-3 shrink-0 relative"
          style={{
            backgroundColor: '#001D39',
            borderColor: '#0A4174'
          }}
        >
          <div className="flex items-center gap-3">
            <div 
              className="inline-flex items-center justify-center rounded-lg bg-[#001224] border border-[#4E8EA2] shadow-sm shrink-0 overflow-hidden"
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
              <h2 className="text-sm font-black tracking-wide text-white uppercase font-heading">
                GEN Z SIMULATIONS
              </h2>
              <p className="text-xs font-bold flex items-center gap-1.5 mt-0.5" style={{ color: '#7BBDE8' }}>
                <span>STEM Disciplines</span>
                <span 
                  className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold border"
                  style={{
                    backgroundColor: '#0A4174',
                    color: '#BDD8E9',
                    borderColor: '#4E8EA2'
                  }}
                >
                  {simulations.length} Labs
                </span>
              </p>
            </div>
          </div>

          {/* Close Button */}
          <button
            type="button"
            onClick={onToggle}
            className="p-2 rounded-xl border transition-all cursor-pointer shadow-xs active:scale-95"
            style={{
              backgroundColor: '#0A4174',
              borderColor: '#4E8EA2',
              color: '#7BBDE8'
            }}
            title="Close Drawer"
            aria-label="Close Drawer"
          >
            <X className="w-5 h-5 text-[#7BBDE8]" />
          </button>
        </div>

        {/* View Switcher Tabs (Disciplines vs All Labs) */}
        <div 
          className="p-3 border-b grid grid-cols-2 gap-2 shrink-0"
          style={{
            backgroundColor: '#001D39',
            borderColor: '#0A4174'
          }}
        >
          <button
            type="button"
            onClick={() => setActiveTab('categories')}
            className="py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 border"
            style={
              activeTab === 'categories'
                ? {
                    backgroundColor: '#4E8EA2',
                    color: '#FFFFFF',
                    borderColor: '#7BBDE8',
                    boxShadow: '0 2px 8px rgba(78, 142, 162, 0.4)'
                  }
                : {
                    backgroundColor: '#0A4174',
                    color: '#BDD8E9',
                    borderColor: '#4E8EA2'
                  }
            }
          >
            <Layers className="w-3.5 h-3.5" />
            <span>9 Disciplines</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('labs')}
            className="py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 border"
            style={
              activeTab === 'labs'
                ? {
                    backgroundColor: '#4E8EA2',
                    color: '#FFFFFF',
                    borderColor: '#7BBDE8',
                    boxShadow: '0 2px 8px rgba(78, 142, 162, 0.4)'
                  }
                : {
                    backgroundColor: '#0A4174',
                    color: '#BDD8E9',
                    borderColor: '#4E8EA2'
                  }
            }
          >
            <Search className="w-3.5 h-3.5" />
            <span>Search {simulations.length} Labs</span>
          </button>
        </div>

        {/* Tab 1: STEM Subjects / Categories List */}
        {activeTab === 'categories' && (
          <div className="flex-1 overflow-y-auto p-3 space-y-2" style={{ backgroundColor: '#001D39' }}>
            <div 
              className="px-2 py-1 text-xs font-bold uppercase tracking-wider flex items-center justify-between border-b pb-1.5 mb-2"
              style={{ borderColor: '#0A4174', color: '#7BBDE8' }}
            >
              <span>Filter By Subject</span>
              <span className="text-[11px] font-mono font-medium" style={{ color: '#BDD8E9' }}>9 Available</span>
            </div>

            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat.key;
              const count = getCategoryCount(cat.key);

              return (
                <button
                  key={cat.key}
                  type="button"
                  onClick={() => handleCategoryClick(cat.key)}
                  className="w-full p-3 rounded-xl text-left cursor-pointer transition-all duration-150 flex items-center justify-between group relative border"
                  style={
                    isSelected
                      ? {
                          backgroundColor: '#4E8EA2',
                          color: '#FFFFFF',
                          borderColor: '#7BBDE8',
                          boxShadow: '0 4px 12px rgba(78, 142, 162, 0.4)'
                        }
                      : {
                          backgroundColor: '#0A4174',
                          color: '#FFFFFF',
                          borderColor: '#4E8EA2'
                        }
                  }
                  onMouseEnter={(e) => {
                    if (!isSelected) e.currentTarget.style.backgroundColor = '#001D39';
                  }}
                  onMouseLeave={(e) => {
                    if (!isSelected) e.currentTarget.style.backgroundColor = '#0A4174';
                  }}
                  title={`Filter by ${cat.name}`}
                >
                  <div className="flex items-center gap-3 min-w-0 relative z-10">
                    {/* Icon Box */}
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 border transition-transform group-hover:scale-105 shadow-xs"
                      style={
                        isSelected
                          ? {
                              backgroundColor: 'rgba(255, 255, 255, 0.25)',
                              borderColor: 'rgba(255, 255, 255, 0.45)',
                              color: '#FFFFFF'
                            }
                          : {
                              backgroundColor: '#001D39',
                              borderColor: '#4E8EA2',
                              color: '#7BBDE8'
                            }
                      }
                    >
                      {cat.icon}
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs sm:text-sm font-bold truncate leading-tight font-heading text-white">
                        {cat.name}
                      </div>
                      <div 
                        className="text-[11px] font-normal truncate mt-0.5"
                        style={{ color: isSelected ? 'rgba(255, 255, 255, 0.9)' : '#BDD8E9' }}
                      >
                        {cat.shortLabel}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 ml-2 relative z-10">
                    <span
                      className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold border"
                      style={
                        isSelected
                          ? {
                              backgroundColor: 'rgba(255, 255, 255, 0.3)',
                              color: '#FFFFFF',
                              borderColor: 'rgba(255, 255, 255, 0.5)'
                            }
                          : {
                              backgroundColor: '#001D39',
                              color: '#7BBDE8',
                              borderColor: '#4E8EA2'
                            }
                      }
                    >
                      {count}
                    </span>
                    <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" style={{ color: isSelected ? '#FFFFFF' : '#7BBDE8' }} />
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {/* Tab 2: All Labs Direct Search & Launch */}
        {activeTab === 'labs' && (
          <div className="flex-1 flex flex-col min-h-0" style={{ backgroundColor: '#001D39' }}>
            {/* Search Input */}
            <div 
              className="p-3 border-b"
              style={{
                backgroundColor: '#001D39',
                borderColor: '#0A4174'
              }}
            >
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#7BBDE8] pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search by title, number, or topic..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-8 py-2 text-xs font-medium rounded-xl border text-white placeholder-[#BDD8E9] focus:outline-none focus:border-[#7BBDE8] shadow-xs"
                  style={{
                    backgroundColor: '#001224',
                    borderColor: '#4E8EA2'
                  }}
                />
                {searchTerm && (
                  <button
                    type="button"
                    onClick={() => setSearchTerm('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 hover:text-white text-xs font-bold"
                    style={{ color: '#BDD8E9' }}
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>

            {/* List with Filled Ocean Navy Cards */}
            <div className="flex-1 overflow-y-auto p-3 space-y-2" style={{ backgroundColor: '#001D39' }}>
              <div 
                className="px-2 py-1 text-xs font-bold flex justify-between border-b pb-1 mb-2"
                style={{ borderColor: '#0A4174', color: '#FFFFFF' }}
              >
                <span>SIMULATIONS</span>
                <span className="font-mono font-bold" style={{ color: '#7BBDE8' }}>{filteredSims.length} FOUND</span>
              </div>

              {filteredSims.map((sim) => (
                <a
                  key={sim.id}
                  href={getSimulationStandaloneUrl(sim)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => onToggle()}
                  className="p-3 rounded-xl border transition-all flex items-center justify-between gap-3 group shadow-xs no-underline block"
                  style={{
                    background: 'linear-gradient(145deg, #0A4174 0%, #001D39 100%)',
                    backgroundColor: '#001D39',
                    borderColor: '#4E8EA2'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#7BBDE8')}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#4E8EA2')}
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5 mb-1">
                      <span 
                        className="font-mono text-[10px] font-bold px-2 py-0.5 rounded-md border"
                        style={{
                          backgroundColor: '#4E8EA2',
                          color: '#FFFFFF',
                          borderColor: '#7BBDE8'
                        }}
                      >
                        LAB {sim.indexNumber}
                      </span>
                      <span className="text-[10px] font-bold truncate" style={{ color: '#7BBDE8' }}>
                        {sim.category}
                      </span>
                    </div>
                    <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-[#7BBDE8] truncate font-heading">
                      {sim.title}
                    </h4>
                    <p className="text-[11px] font-normal line-clamp-1 mt-0.5" style={{ color: '#BDD8E9' }}>
                      {sim.description}
                    </p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-[#7BBDE8] group-hover:scale-110 transition-transform shrink-0" />
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Quick Link to External Simulations Hub */}
        <div 
          className="p-3 border-t shrink-0"
          style={{
            backgroundColor: '#001D39',
            borderColor: '#0A4174'
          }}
        >
          <a
            href="#external-simulations"
            onClick={() => {
              onToggle();
              const el = document.getElementById('external-simulations');
              if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
            className="w-full py-2.5 px-3 rounded-xl text-xs font-bold text-white shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer border"
            style={{
              backgroundColor: '#4E8EA2',
              borderColor: '#7BBDE8'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#6EA2B3')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#4E8EA2')}
          >
            <Globe className="w-4 h-4 text-white" />
            <span>Open External Simulation Hub (8 Labs)</span>
          </a>
        </div>

        {/* Drawer Footer with High Contrast Details */}
        <div 
          className="p-3.5 border-t text-center shrink-0"
          style={{
            backgroundColor: '#001224',
            borderColor: '#0A4174'
          }}
        >
          <p className="text-xs font-bold text-white">
            Gen Z Interactive Simulations &bull; {simulations.length} Verified Labs
          </p>
          <p className="text-[10px] font-medium mt-0.5" style={{ color: '#BDD8E9' }}>
            National Curriculum of Pakistan &bull; Session 2026-27
          </p>
        </div>
      </div>
    </>
  );
};
