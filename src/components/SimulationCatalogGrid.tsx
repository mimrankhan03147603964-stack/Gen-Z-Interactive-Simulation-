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
  Keyboard
} from 'lucide-react';

interface SimulationCatalogGridProps {
  simulations: SimulationItem[];
  activeSim: SimulationItem;
  onSelectSim: (sim: SimulationItem) => void;
  onLaunchFullscreenModal: (sim: SimulationItem) => void;
  isDarkMode?: boolean;
}

// 3D Vibrant colorful icon mapper preserving 100% exact icon colors & styles
const renderTopicIcon = (iconName: string, iconColor = '#ffffff') => {
  const iconProps = { 
    className: "w-5 h-5 transition-transform group-hover:scale-110 opacity-100",
    style: { color: iconColor, opacity: 1 }
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
            return (
              <button
                key={cat.key}
                onClick={() => setSelectedCategory(cat.key)}
                className="btn-3d px-3.5 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer shadow-xs whitespace-nowrap flex items-center gap-1.5"
                style={
                  isSelected
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
                <span>{cat.label}</span>
                <span className="opacity-80 text-[10px]">({count})</span>
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
                        backgroundColor: isDarkMode ? 'rgba(10, 22, 51, 0.75)' : 'rgba(255, 255, 255, 0.82)',
                        borderColor: isActive 
                          ? theme.bgSolid 
                          : (isDarkMode ? 'rgba(255, 255, 255, 0.14)' : 'rgba(255, 255, 255, 0.65)'),
                        borderWidth: isActive ? '2px' : '1px',
                        borderStyle: 'solid',
                        boxShadow: isDarkMode ? '0 8px 32px 0 rgba(0, 0, 0, 0.35)' : '0 8px 32px 0 rgba(31, 38, 135, 0.08)',
                        color: isDarkMode ? '#ffffff' : '#0f172a',
                        outlineColor: theme.bgSolid
                      }}
                    >
                      {/* Card Content */}
                      <div className="p-5 pb-3">
                        <div className="flex items-start justify-between gap-3 mb-3">
                          {/* Colorful 3D Icon Tile */}
                          <div 
                            className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 icon-tile-3d shadow-md group-hover:scale-105 transition-transform"
                            style={{
                              backgroundColor: theme.bgSolid,
                              backgroundImage: theme.bgGradient,
                              borderColor: theme.borderColor,
                              borderWidth: '1.5px',
                              borderStyle: 'solid',
                              boxShadow: `0 4px 10px ${theme.glowColor}, inset 0 1px 1px rgba(255, 255, 255, 0.6)`
                            }}
                          >
                            {renderTopicIcon(sim.iconName, '#ffffff')}
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
                                backgroundColor: isDarkMode ? '#060e22' : '#f1f5f9',
                                color: isDarkMode ? '#cbd5e1' : '#334155',
                                borderColor: isDarkMode ? '#1e3a8a' : '#cbd5e1',
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
                                backgroundColor: isDarkMode ? '#060e22' : '#f1f5f9',
                                color: isDarkMode ? '#94a3b8' : '#64748b'
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
                          className="p-1.5 rounded-lg border transition-all cursor-pointer hover:scale-105"
                          style={{
                            backgroundColor: isDarkMode ? '#0c1b3d' : '#ffffff',
                            borderColor: isDarkMode ? '#3b82f6' : '#cbd5e1',
                            borderWidth: '1px',
                            borderStyle: 'solid',
                            color: isDarkMode ? '#38bdf8' : '#0f172a'
                          }}
                          title="Launch in 4K Fullscreen"
                        >
                          <Maximize2 className="w-3.5 h-3.5" />
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
