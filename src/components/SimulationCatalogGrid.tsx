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
  ArrowUpRight,
  Filter
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
    default: return <Atom {...iconProps} />;
  }
};

const CATEGORIES = [
  'All Simulations',
  'Physics & Motion',
  'Chemistry & Matter',
  'Biology & Life',
  'Earth & Space'
] as const;

export const SimulationCatalogGrid: React.FC<SimulationCatalogGridProps> = ({
  simulations,
  activeSim,
  onSelectSim,
  onLaunchFullscreenModal,
  isDarkMode = false
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All Simulations');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filteredSimulations = simulations.filter((sim) => {
    const matchesCategory =
      selectedCategory === 'All Simulations' || sim.category === selectedCategory;
    const matchesSearch =
      sim.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sim.indexNumber.includes(searchTerm) ||
      sim.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sim.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleCardClick = (sim: SimulationItem) => {
    onSelectSim(sim);
    const stageElement = document.getElementById('stage');
    if (stageElement) {
      stageElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
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
          backgroundColor: isDarkMode ? '#0a1633' : '#ffffff',
          borderColor: isDarkMode ? '#1e3a8a' : '#cbd5e1',
          borderWidth: '1.5px',
          borderStyle: 'solid',
          color: isDarkMode ? '#ffffff' : '#0f172a'
        }}
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span 
                className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider shadow-2xs"
                style={{
                  backgroundColor: isDarkMode ? '#0f2963' : '#eff6ff',
                  color: isDarkMode ? '#38bdf8' : '#1d4ed8',
                  borderColor: isDarkMode ? '#3b82f6' : '#93c5fd',
                  borderWidth: '1.5px',
                  borderStyle: 'solid'
                }}
              >
                Interactive STEM Library
              </span>
              <span 
                className="px-2.5 py-0.5 rounded-full text-xs font-black shadow-xs"
                style={{ backgroundColor: '#2563eb', color: '#ffffff' }}
              >
                {simulations.length} Labs Verified
              </span>
            </div>

            <h2 
              className="text-2xl sm:text-3xl font-black tracking-tight"
              style={{ color: isDarkMode ? '#ffffff' : '#0f172a' }}
            >
              Explore All Interactive Simulations
            </h2>
            <p 
              className="text-sm font-bold mt-1 max-w-3xl"
              style={{ color: isDarkMode ? '#94a3b8' : '#475569' }}
            >
              Select any simulation card to launch it directly into the high-resolution interactive stage, or click Fullscreen to experience immersive digital lab learning.
            </p>
          </div>

          {/* Quick Search Input */}
          <div className="w-full md:w-72 shrink-0">
            <div 
              className="relative flex items-center rounded-xl border shadow-inner transition-all"
              style={{
                backgroundColor: isDarkMode ? '#060e22' : '#f8fafc',
                borderColor: isDarkMode ? '#3b82f6' : '#94a3b8',
                borderWidth: '1.5px',
                borderStyle: 'solid'
              }}
            >
              <Search className="w-4 h-4 ml-3 shrink-0" style={{ color: isDarkMode ? '#38bdf8' : '#2563eb' }} />
              <input
                type="text"
                placeholder="Search labs (e.g., 01, Optics, Ohm)..."
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

        {/* Category Tabs for Laptop / Computer Website View */}
        <div className="flex items-center gap-2 mt-6 overflow-x-auto pb-1 scrollbar-none flex-wrap">
          <div className="flex items-center gap-1.5 text-xs font-black mr-1" style={{ color: isDarkMode ? '#94a3b8' : '#64748b' }}>
            <Filter className="w-3.5 h-3.5" />
            <span>Category:</span>
          </div>
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className="btn-3d px-3.5 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer shadow-xs whitespace-nowrap"
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
                {cat}
                {cat === 'All Simulations' && ` (${simulations.length})`}
              </button>
            );
          })}
        </div>
      </div>

      {/* Website Responsive Grid of Simulation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {filteredSimulations.map((sim) => {
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
                backgroundColor: isDarkMode ? '#0a1633' : '#ffffff',
                borderColor: isActive 
                  ? theme.bgSolid 
                  : (isDarkMode ? '#1e3a8a' : '#cbd5e1'),
                borderWidth: isActive ? '2px' : '1.5px',
                borderStyle: 'solid',
                color: isDarkMode ? '#ffffff' : '#0f172a',
                outlineColor: theme.bgSolid
              }}
            >
              {/* Card Top Strip with Vibrant Colorful 3D Icon */}
              <div className="p-5 pb-3">
                <div className="flex items-start justify-between gap-3 mb-3">
                  {/* Colorful 3D Icon Tile - 100% original icon colors preserved */}
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

                  {/* Badges: Lab Number & Category */}
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
                      {sim.category}
                    </span>
                  </div>
                </div>

                {/* Simulation Title */}
                <h3 
                  className="text-base font-black tracking-tight leading-snug line-clamp-1 group-hover:text-blue-500 transition-colors"
                  style={{ color: isDarkMode ? '#ffffff' : '#0f172a' }}
                >
                  {sim.title}
                </h3>

                {/* Subject & Grade Level */}
                <p 
                  className="text-xs font-bold mt-1 line-clamp-1"
                  style={{ color: isDarkMode ? '#38bdf8' : '#1d4ed8' }}
                >
                  {sim.subject}
                </p>

                {/* Description Excerpt */}
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
                  backgroundColor: isDarkMode ? '#060e22' : '#f8fafc',
                  borderTop: isDarkMode ? '1.5px solid #1e3a8a' : '1.5px solid #cbd5e1'
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
                    <span>Loaded on Stage</span>
                  </span>
                ) : (
                  <span 
                    className="inline-flex items-center gap-1 text-xs font-black transition-colors group-hover:translate-x-0.5 duration-150"
                    style={{ color: isDarkMode ? '#38bdf8' : '#1d4ed8' }}
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Load Simulation</span>
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

      {filteredSimulations.length === 0 && (
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
            Try searching for another keyword or select &ldquo;All Simulations&rdquo;.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('All Simulations');
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
