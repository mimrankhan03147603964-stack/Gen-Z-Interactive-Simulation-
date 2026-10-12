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
  CircleDot,
  Orbit,
  Telescope,
  Search,
  Play,
  Maximize2,
  CheckCircle2,
  Filter,
  Calculator,
  Shapes,
  Scale,
  Ruler,
  BookOpen,
  Computer,
  Keyboard,
  Baby,
  Dna,
  TestTube,
  Magnet
} from 'lucide-react';

interface SimulationCatalogGridProps {
  simulations: SimulationItem[];
  activeSim: SimulationItem;
  onSelectSim: (sim: SimulationItem) => void;
  onLaunchFullscreenModal: (sim: SimulationItem) => void;
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

// Explicit category ordering corresponding to school subjects
const SUBJECT_CATEGORIES = [
  { key: 'Physics & Motion', label: 'Physics & Motion', icon: <Atom className="w-4 h-4 text-blue-500" /> },
  { key: 'Chemistry & Matter', label: 'Chemistry & Matter', icon: <FlaskConical className="w-4 h-4 text-purple-500" /> },
  { key: 'Biology & Life', label: 'Biology & Life', icon: <Leaf className="w-4 h-4 text-emerald-500" /> },
  { key: 'Earth & Space', label: 'Earth & Space (Geography & Astronomy)', icon: <Globe className="w-4 h-4 text-sky-500" /> },
  { key: 'Mathematics & Logic', label: 'Mathematics & Logic', icon: <Calculator className="w-4 h-4 text-indigo-500" /> },
  { key: 'Computer Science & IT', label: 'Computer Science & IT', icon: <Computer className="w-4 h-4 text-cyan-500" /> },
  { key: 'English & Grammar', label: 'English & Grammar (Linguistics)', icon: <BookOpen className="w-4 h-4 text-pink-500" /> },
  { key: 'Early Childhood (ECCE)', label: 'Early Childhood Care & Education (ECCE)', icon: <Baby className="w-4 h-4 text-amber-500" /> },
] as const;

export const SimulationCatalogGrid: React.FC<SimulationCatalogGridProps> = ({
  simulations,
  activeSim,
  onSelectSim,
  onLaunchFullscreenModal,
  isDarkMode = false
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleCardClick = (sim: SimulationItem) => {
    onSelectSim(sim);
    const stageElement = document.getElementById('stage');
    if (stageElement) {
      stageElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const matchesSearch = (sim: SimulationItem) => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return (
      sim.title.toLowerCase().includes(term) ||
      sim.indexNumber.includes(term) ||
      sim.subject.toLowerCase().includes(term) ||
      sim.description.toLowerCase().includes(term)
    );
  };

  return (
    <section 
      id="catalog" 
      className="w-full space-y-6 pt-4 scroll-mt-20 opacity-100"
    >
      {/* Website Section Header */}
      <div 
        className="rounded-2xl p-6 sm:p-8 border shadow-xl transition-all"
        style={{
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          backgroundColor: isDarkMode ? 'rgba(10, 22, 51, 0.78)' : 'rgba(255, 255, 255, 0.82)',
          borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.14)' : 'rgba(255, 255, 255, 0.65)',
          borderWidth: '1px',
          borderStyle: 'solid',
          boxShadow: isDarkMode ? '0 8px 32px 0 rgba(0, 0, 0, 0.45)' : '0 8px 32px 0 rgba(31, 38, 135, 0.08)',
          color: isDarkMode ? '#ffffff' : '#0f172a'
        }}
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span 
                className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider shadow-2xs"
                style={{
                  backgroundColor: isDarkMode ? 'rgba(15, 41, 99, 0.75)' : 'rgba(239, 246, 255, 0.85)',
                  color: isDarkMode ? '#38bdf8' : '#1d4ed8',
                  borderColor: isDarkMode ? 'rgba(59, 130, 246, 0.45)' : 'rgba(147, 197, 253, 0.7)',
                  borderWidth: '1px',
                  borderStyle: 'solid'
                }}
              >
                Subject-Wise Modules Catalog
              </span>
              <span 
                className="px-2.5 py-0.5 rounded-full text-xs font-black shadow-xs"
                style={{ backgroundColor: '#2563eb', color: '#ffffff' }}
              >
                {simulations.length} Labs Available
              </span>
            </div>

            <h2 
              className="text-2xl sm:text-3xl font-black tracking-tight"
              style={{ color: isDarkMode ? '#ffffff' : '#0f172a' }}
            >
              Interactive STEM Simulations by Subject Category
            </h2>
            <p 
              className="text-sm font-bold mt-1 max-w-3xl"
              style={{ color: isDarkMode ? '#94a3b8' : '#475569' }}
            >
              Browse systematically under each subject heading from concept theory to hands-on interactive simulation execution. Click any lab card to load it directly into the top stage.
            </p>
          </div>

          {/* Quick Search Input */}
          <div className="w-full md:w-72 shrink-0">
            <div 
              className="relative flex items-center rounded-xl border shadow-inner transition-all"
              style={{
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                backgroundColor: isDarkMode ? 'rgba(6, 14, 34, 0.75)' : 'rgba(248, 250, 252, 0.75)',
                borderColor: isDarkMode ? 'rgba(59, 130, 246, 0.45)' : 'rgba(148, 163, 184, 0.6)',
                borderWidth: '1px',
                borderStyle: 'solid'
              }}
            >
              <Search className="w-4 h-4 ml-3 shrink-0" style={{ color: isDarkMode ? '#38bdf8' : '#2563eb' }} />
              <input
                type="text"
                placeholder="Search labs (e.g., 01, Optics, Bohr)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full py-2.5 px-3 text-xs font-bold bg-transparent outline-none"
                style={{
                  color: isDarkMode ? '#ffffff' : '#0f172a'
                }}
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="mr-3 text-xs font-black px-1.5 py-0.5 rounded cursor-pointer"
                  style={{
                    backgroundColor: isDarkMode ? '#1e293b' : '#e2e8f0',
                    color: isDarkMode ? '#ffffff' : '#0f172a'
                  }}
                >
                  &times;
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Filter Category Pills */}
        <div className="flex items-center gap-2 mt-6 overflow-x-auto pb-1 scrollbar-none flex-wrap">
          <div className="flex items-center gap-1.5 text-xs font-black mr-1" style={{ color: isDarkMode ? '#94a3b8' : '#64748b' }}>
            <Filter className="w-3.5 h-3.5" />
            <span>Filter Subject:</span>
          </div>

          <button
            onClick={() => setSelectedCategory('All')}
            className="btn-3d px-3.5 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer shadow-xs whitespace-nowrap"
            style={
              selectedCategory === 'All'
                ? {
                    backgroundColor: '#2563eb',
                    backgroundImage: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                    borderColor: '#60a5fa',
                    borderWidth: '1.5px',
                    borderStyle: 'solid',
                    color: '#ffffff',
                    boxShadow: '0 4px 10px rgba(37, 99, 235, 0.35)'
                  }
                : {
                    backgroundColor: isDarkMode ? '#060e22' : '#f1f5f9',
                    borderColor: isDarkMode ? '#1e3a8a' : '#cbd5e1',
                    borderWidth: '1.5px',
                    borderStyle: 'solid',
                    color: isDarkMode ? '#cbd5e1' : '#334155'
                  }
            }
          >
            All Subjects ({simulations.length})
          </button>

          {SUBJECT_CATEGORIES.map((cat) => {
            const count = simulations.filter(s => s.category === cat.key).length;
            const isSelected = selectedCategory === cat.key;
            const catColors: Record<string, { bg: string; border: string; text: string; activeBg: string; activeBorder: string }> = {
              'Physics & Motion': { bg: '#eff6ff', border: '#93c5fd', text: '#1d4ed8', activeBg: '#2563eb', activeBorder: '#60a5fa' },
              'Chemistry & Matter': { bg: '#faf5ff', border: '#d8b4fe', text: '#7e22ce', activeBg: '#9333ea', activeBorder: '#c084fc' },
              'Biology & Life': { bg: '#f0fdf4', border: '#86efac', text: '#15803d', activeBg: '#16a34a', activeBorder: '#4ade80' },
              'Earth & Space': { bg: '#f0f9ff', border: '#7dd3fc', text: '#0369a1', activeBg: '#0284c7', activeBorder: '#38bdf8' },
              'Mathematics & Logic': { bg: '#eef2ff', border: '#a5b4fc', text: '#4338ca', activeBg: '#4f46e5', activeBorder: '#818cf8' },
              'Computer Science & IT': { bg: '#ecfeff', border: '#67e8f9', text: '#0e7490', activeBg: '#0891b2', activeBorder: '#22d3ee' },
              'English & Grammar': { bg: '#fdf2f8', border: '#f9a8d4', text: '#be185d', activeBg: '#db2777', activeBorder: '#f472b6' },
              'Early Childhood (ECCE)': { bg: '#fffbeb', border: '#fde68a', text: '#b45309', activeBg: '#d97706', activeBorder: '#fbbf24' }
            };
            const cStyle = catColors[cat.key] || { bg: '#f1f5f9', border: '#cbd5e1', text: '#334155', activeBg: '#2563eb', activeBorder: '#60a5fa' };

            return (
              <button
                key={cat.key}
                onClick={() => setSelectedCategory(cat.key)}
                className="btn-3d px-3.5 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer shadow-xs whitespace-nowrap flex items-center gap-1.5"
                style={
                  isSelected
                    ? {
                        backgroundColor: cStyle.activeBg,
                        borderColor: cStyle.activeBorder,
                        borderWidth: '1.5px',
                        borderStyle: 'solid',
                        color: '#ffffff',
                        boxShadow: `0 4px 10px ${cStyle.border}`
                      }
                    : {
                        backgroundColor: isDarkMode ? 'rgba(15, 23, 42, 0.75)' : cStyle.bg,
                        borderColor: isDarkMode ? cStyle.activeBorder : cStyle.border,
                        borderWidth: '1.5px',
                        borderStyle: 'solid',
                        color: isDarkMode ? '#ffffff' : cStyle.text
                      }
                }
              >
                <span>{cat.label}</span>
                <span className="opacity-90 font-mono text-[10px]">({count})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Systematic Subject-Wise Categorized Sections */}
      <div className="space-y-10">
        {SUBJECT_CATEGORIES.filter(cat => selectedCategory === 'All' || selectedCategory === cat.key).map((cat) => {
          const categorySims = simulations.filter(s => s.category === cat.key && matchesSearch(s));
          if (categorySims.length === 0) return null;

          return (
            <div key={cat.key} className="space-y-4">
              {/* Subject Category Group Header */}
              <div 
                className="px-5 py-3.5 rounded-xl border flex items-center justify-between gap-3 shadow-md"
                style={{
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  backgroundColor: isDarkMode ? 'rgba(9, 24, 56, 0.75)' : 'rgba(239, 246, 255, 0.8)',
                  borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.14)' : 'rgba(191, 219, 254, 0.6)',
                  borderWidth: '1px',
                  borderStyle: 'solid',
                  boxShadow: '0 8px 24px 0 rgba(0, 0, 0, 0.05)'
                }}
              >
                <div className="flex items-center gap-2.5">
                  <div 
                    className="w-8 h-8 rounded-lg flex items-center justify-center shadow-xs"
                    style={{
                      backgroundColor: isDarkMode ? 'rgba(15, 41, 99, 0.8)' : '#dbeafe',
                      borderColor: isDarkMode ? 'rgba(59, 130, 246, 0.5)' : '#93c5fd',
                      borderWidth: '1px',
                      borderStyle: 'solid'
                    }}
                  >
                    {cat.icon}
                  </div>
                  <div>
                    <h3 
                      className="text-base sm:text-lg font-black tracking-tight"
                      style={{ color: isDarkMode ? '#ffffff' : '#0f172a' }}
                    >
                      {cat.label}
                    </h3>
                    <p 
                      className="text-[11px] font-extrabold"
                      style={{ color: isDarkMode ? '#93c5fd' : '#1d4ed8' }}
                    >
                      Step 1 Subject Domain &bull; {categorySims.length} Modules Aligned
                    </p>
                  </div>
                </div>

                <span 
                  className="px-3 py-1 rounded-full text-xs font-black shadow-2xs"
                  style={{
                    backgroundColor: isDarkMode ? 'rgba(23, 37, 84, 0.8)' : '#dbeafe',
                    color: isDarkMode ? '#60a5fa' : '#1e40af'
                  }}
                >
                  {categorySims.length} Labs
                </span>
              </div>

              {/* Grid of Simulation Cards under this Subject */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {categorySims.map((sim) => {
                  const theme = getSimTheme(sim.indexNumber);
                  const isActive = activeSim.id === sim.id;

                  return (
                    <div
                      key={sim.id}
                      onClick={() => handleCardClick(sim)}
                      className={`rounded-2xl border transition-all duration-200 flex flex-col justify-between cursor-pointer group shadow-lg btn-3d relative overflow-hidden opacity-100 ${
                        isActive ? 'ring-2 ring-offset-2' : ''
                      }`}
                      style={{
                        backdropFilter: 'blur(12px)',
                        WebkitBackdropFilter: 'blur(12px)',
                        backgroundColor: isDarkMode ? 'rgba(10, 22, 51, 0.75)' : 'rgba(255, 255, 255, 0.92)',
                        borderStyle: 'solid',
                        borderTopWidth: '4px',
                        borderRightWidth: isActive ? '2px' : '1.5px',
                        borderBottomWidth: isActive ? '2px' : '1.5px',
                        borderLeftWidth: isActive ? '2px' : '1.5px',
                        borderTopColor: theme.bgSolid,
                        borderRightColor: isActive ? theme.bgSolid : theme.borderColor,
                        borderBottomColor: isActive ? theme.bgSolid : theme.borderColor,
                        borderLeftColor: isActive ? theme.bgSolid : theme.borderColor,
                        boxShadow: isDarkMode 
                          ? `0 8px 32px 0 rgba(0, 0, 0, 0.35), 0 0 12px ${theme.glowColor}` 
                          : `0 8px 24px rgba(31, 38, 135, 0.08), 0 2px 10px ${theme.glowColor}`,
                        color: isDarkMode ? '#ffffff' : '#0f172a'
                      }}
                    >
                      {/* Card Content */}
                      <div className="p-5 pb-3">
                        <div className="flex items-start justify-between gap-3 mb-3">
                          {/* Colorful 3D Icon Tile */}
                          <div 
                            className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 icon-tile-3d shadow-md group-hover:scale-105 transition-transform"
                            style={{
                              backgroundColor: theme.badgeBg,
                              borderColor: theme.borderColor,
                              borderWidth: '2px',
                              borderStyle: 'solid',
                              boxShadow: `0 4px 12px ${theme.glowColor}`
                            }}
                          >
                            {renderTopicIcon(sim.iconName, theme.iconBg || theme.bgSolid)}
                          </div>

                          {/* Badges: Lab Number & Grade */}
                          <div className="flex flex-col items-end gap-1.5">
                            <span 
                              className="font-mono text-xs font-black px-2 py-0.5 rounded shadow-2xs"
                              style={{
                                backgroundColor: theme.bgSolid,
                                color: '#ffffff',
                                borderColor: theme.borderColor,
                                borderWidth: '1px',
                                borderStyle: 'solid'
                              }}
                            >
                              LAB {sim.indexNumber}
                            </span>
                            <span 
                              className="text-[10px] font-black px-2 py-0.5 rounded-full"
                              style={{
                                backgroundColor: theme.badgeBg,
                                color: theme.badgeText,
                                borderColor: theme.badgeBorder,
                                borderWidth: '1px',
                                borderStyle: 'solid'
                              }}
                            >
                              {sim.gradeLevel}
                            </span>
                          </div>
                        </div>

                        {/* Simulation Topic Title */}
                        <h4 
                          className="text-base font-black tracking-tight leading-snug line-clamp-1 group-hover:text-blue-500 transition-colors"
                          style={{ color: isDarkMode ? '#ffffff' : '#0f172a' }}
                        >
                          {sim.title}
                        </h4>

                        {/* Subject & Sub-discipline */}
                        <p 
                          className="text-xs font-bold mt-1 line-clamp-1"
                          style={{ color: isDarkMode ? '#38bdf8' : '#1d4ed8' }}
                        >
                          {sim.subject}
                        </p>

                        {/* Concept Description Intro */}
                        <p 
                          className="text-xs font-medium mt-2 line-clamp-2 leading-relaxed"
                          style={{ color: isDarkMode ? '#cbd5e1' : '#475569' }}
                        >
                          {sim.description}
                        </p>

                        {/* Topic Tags */}
                        <div className="flex flex-wrap gap-1.5 mt-3">
                          {sim.topics.slice(0, 2).map((topic, i) => (
                            <span
                              key={i}
                              className="text-[10px] font-bold px-2 py-0.5 rounded-md truncate max-w-[140px]"
                              style={{
                                backgroundColor: isDarkMode ? '#060e22' : theme.tagBg,
                                color: isDarkMode ? '#cbd5e1' : theme.tagText,
                                borderColor: isDarkMode ? '#1e3a8a' : theme.badgeBorder,
                                borderWidth: '1px',
                                borderStyle: 'solid'
                              }}
                            >
                              {topic}
                            </span>
                          ))}
                          {sim.topics.length > 2 && (
                            <span 
                              className="text-[10px] font-bold px-1.5 py-0.5 rounded-md"
                              style={{
                                backgroundColor: isDarkMode ? '#060e22' : theme.badgeBg,
                                color: isDarkMode ? '#94a3b8' : theme.badgeText,
                                borderColor: isDarkMode ? '#1e3a8a' : theme.badgeBorder,
                                borderWidth: '1px',
                                borderStyle: 'solid'
                              }}
                            >
                              +{sim.topics.length - 2}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Card Action Bar */}
                      <div 
                        className="p-3 px-4 border-t flex items-center justify-between gap-2 transition-colors"
                        style={{
                          backdropFilter: 'blur(12px)',
                          WebkitBackdropFilter: 'blur(12px)',
                          backgroundColor: isDarkMode ? 'rgba(6, 14, 34, 0.75)' : 'rgba(248, 250, 252, 0.75)',
                          borderTop: isDarkMode ? '1px solid rgba(255, 255, 255, 0.12)' : '1px solid rgba(255, 255, 255, 0.5)'
                        }}
                      >
                        {isActive ? (
                          <span 
                            className="inline-flex items-center gap-1.5 text-xs font-black px-2.5 py-1 rounded-lg"
                            style={{
                              backgroundColor: '#dcfce7',
                              color: '#15803d',
                              borderColor: '#86efac',
                              borderWidth: '1px',
                              borderStyle: 'solid'
                            }}
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Active in Stage</span>
                          </span>
                        ) : (
                          <span 
                            className="inline-flex items-center gap-1 text-xs font-black transition-colors group-hover:translate-x-0.5 duration-150"
                            style={{ color: isDarkMode ? '#38bdf8' : '#1d4ed8' }}
                          >
                            <Play className="w-3.5 h-3.5 fill-current" />
                            <span>Load Lab &bull; Step 1-4</span>
                          </span>
                        )}

                        {/* Direct Fullscreen Button */}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onLaunchFullscreenModal(sim);
                          }}
                          className="p-1.5 rounded-lg border transition-all cursor-pointer hover:scale-105 shadow-sm"
                          style={{
                            backgroundColor: theme.bgSolid,
                            borderColor: theme.borderColor,
                            borderWidth: '1.5px',
                            borderStyle: 'solid',
                            color: '#ffffff'
                          }}
                          title="Launch in 4K Fullscreen"
                        >
                          <Maximize2 className="w-3.5 h-3.5 text-white" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {simulations.filter(matchesSearch).length === 0 && (
        <div 
          className="rounded-2xl p-12 text-center border shadow-md"
          style={{
            backgroundColor: isDarkMode ? '#0a1633' : '#ffffff',
            borderColor: isDarkMode ? '#1e3a8a' : '#cbd5e1',
            borderWidth: '1.5px',
            borderStyle: 'solid'
          }}
        >
          <div className="w-12 h-12 mx-auto rounded-full flex items-center justify-center bg-blue-100 text-blue-600 mb-3">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="text-base font-black" style={{ color: isDarkMode ? '#ffffff' : '#0f172a' }}>
            No simulations match &ldquo;{searchTerm}&rdquo;
          </h3>
          <p className="text-xs font-bold mt-1" style={{ color: isDarkMode ? '#94a3b8' : '#64748b' }}>
            Try searching for another keyword or select &ldquo;All Subjects&rdquo;.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSearchTerm('');
            }}
            className="btn-3d mt-4 px-4 py-2 rounded-xl text-xs font-black text-white"
            style={{
              backgroundColor: '#2563eb',
              borderColor: '#60a5fa',
              borderWidth: '1px'
            }}
          >
            Clear Filters
          </button>
        </div>
      )}
    </section>
  );
};
