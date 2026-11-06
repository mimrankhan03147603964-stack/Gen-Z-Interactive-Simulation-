import React, { useState, useEffect } from 'react';
import { 
  ExternalLink, 
  Globe, 
  Sparkles, 
  CheckCircle2,
  X,
  Search,
  GraduationCap,
  Layers,
  Target
} from 'lucide-react';

import {
  MultiPhetIcon,
  MultiGeoGebraIcon,
  MultiOphysicsIcon,
  MultiWalterFendtIcon,
  MultiFalstadIcon,
  MultiMolecularIcon,
  MultiMyPhysicsLabIcon,
  MultiTinkercadIcon,
  MultiMozaikIcon,
  MultiPaperMakerIcon
} from './ModernStemIcons';

import {
  ExternalSimulationResource,
  EXTERNAL_SIMULATION_RESOURCES
} from '../data/externalSimulationsData';
export type { ExternalSimulationResource };
export { EXTERNAL_SIMULATION_RESOURCES };

// Sensible categorization for filtering
const LAB_CATEGORIES_MAP: Record<string, string[]> = {
  phet: ['Physics', 'Maths', 'Chemistry'],
  geogebra: ['Maths', 'Tools'],
  ophysics: ['Physics'],
  'walter-fendt': ['Physics'],
  falstad: ['Electronics', 'Physics'],
  'molecular-workbench': ['Chemistry'],
  myphysicslab: ['Physics'],
  'tinkercad-circuits': ['Electronics', 'Tools'],
  'mozaik-3d': ['Tools'],
  'paper-maker': ['Tools']
};

const CATEGORY_TABS = ['All', 'Physics', 'Maths', 'Chemistry', 'Electronics', 'Tools'] as const;
type CategoryTab = typeof CATEGORY_TABS[number];

const getLabObjectives = (item: ExternalSimulationResource): string[] => {
  const specificObjectives: Record<string, string[]> = {
    phet: [
      'Investigate fundamental STEM principles through interactive discovery-based inquiry',
      'Analyze dynamic relationships between physical and chemical variables in real time',
      'Bridge mathematical formulas with visual, hands-on scientific models'
    ],
    geogebra: [
      'Construct interactive 2D geometric proofs and manipulate 3D spatial solids',
      'Visualize functions, derivatives, integrals, and algebraic equation transformations',
      'Analyze real-time coordinate geometry with precision graphing tools'
    ],
    ophysics: [
      'Simulate kinematics, free-body forces, projectile trajectories, and friction',
      'Investigate wave optics, double-slit interference, reflection, and refraction',
      'Explore circuit currents, capacitor discharge, and electromagnetic fields'
    ],
    'walter-fendt': [
      'Simulate classical mechanics, pendulums, pulleys, and Keplerian planetary orbits',
      'Analyze wave propagation, Doppler shifts, interference, and acoustic resonance',
      'Experiment with geometric ray optics, thin lenses, and atomic energy levels'
    ],
    falstad: [
      'Build and simulate analog AC/DC circuits with live electron flow animations',
      'Analyze frequency response, active operational amplifiers, filters, and logic gates',
      'Visualize acoustic standing waves, 2D electrostatics, and quantum wavefunctions'
    ],
    'molecular-workbench': [
      'Model atomic lattice dynamics, kinetic energy, and temperature phase changes',
      'Simulate chemical bonding, reaction kinetics, and exothermic/endothermic states',
      'Observe gas laws and Brownian motion at microscopic molecular scale'
    ],
    myphysicslab: [
      'Simulate continuous rigid body mechanics using numerical physics differential equations',
      'Experiment with chaotic double pendulums, coupled springs, and roller coasters',
      'Analyze energy conservation, momentum transfer, and collision dynamics'
    ],
    'tinkercad-circuits': [
      'Assemble interactive electronic circuits on a virtual prototyping breadboard',
      'Program virtual Arduino microcontrollers and simulate sensor/motor interactions',
      'Safely test wiring diagrams, power supplies, and multi-meter measurements'
    ],
    'mozaik-3d': [
      'Explore immersive interactive 3D digital scenes of biology, anatomy, and physics',
      'Dissect complex anatomical structures and examine spatial mechanisms layer by layer',
      'Reinforce conceptual understanding through narrated visual 3D demonstrations'
    ],
    'paper-maker': [
      'Quickly create customized STEM assessment exam papers and test worksheets',
      'Format questions, formulas, diagrams, and marking keys for classroom printing',
      'Save preparation time with pre-built academic question templates'
    ]
  };

  if (specificObjectives[item.id]) {
    return specificObjectives[item.id];
  }

  const actionVerbs = ['Investigate', 'Analyze', 'Explore', 'Simulate', 'Experiment with'];
  return item.topics.map((t, i) => `${actionVerbs[i % actionVerbs.length]} ${t}`);
};

interface ExternalSimulationsHubProps {
  isDarkMode?: boolean;
}

export const ExternalSimulationsHub: React.FC<ExternalSimulationsHubProps> = () => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryTab>('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLab, setSelectedLab] = useState<ExternalSimulationResource | null>(null);

  // Continuous Looping Typing Effect Engine for the Main Heading ONLY
  const HEADING_FULL_TEXT = 'External Interactive Simulation Platforms';
  const [headingText, setHeadingText] = useState<string>('');
  const [isHeadingDeleting, setIsHeadingDeleting] = useState<boolean>(false);
  const [isHeadingPaused, setIsHeadingPaused] = useState<boolean>(false);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    if (isHeadingPaused) {
      // Pause for 2 seconds with full heading visible
      timeout = setTimeout(() => {
        setIsHeadingPaused(false);
        setIsHeadingDeleting(true);
      }, 2000);
      return () => clearTimeout(timeout);
    }

    if (isHeadingDeleting) {
      if (headingText.length > 0) {
        timeout = setTimeout(() => {
          setHeadingText((prev) => prev.slice(0, prev.length - 1));
        }, 18);
      } else {
        // Erased completely, brief pause before typing again
        timeout = setTimeout(() => {
          setIsHeadingDeleting(false);
        }, 400);
      }
      return () => clearTimeout(timeout);
    }

    // Typing forward phase
    if (headingText.length >= HEADING_FULL_TEXT.length) {
      setIsHeadingPaused(true);
      return;
    }

    timeout = setTimeout(() => {
      setHeadingText(HEADING_FULL_TEXT.slice(0, headingText.length + 1));
    }, 35);

    return () => clearTimeout(timeout);
  }, [headingText, isHeadingDeleting, isHeadingPaused]);

  // Close panel on Esc key press and handle body scroll lock
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedLab(null);
      }
    };
    if (selectedLab) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [selectedLab]);

  // Filter resources by category and search keyword
  const filteredResources = EXTERNAL_SIMULATION_RESOURCES.filter((lab) => {
    if (selectedCategory !== 'All') {
      const cats = LAB_CATEGORIES_MAP[lab.id] || [];
      if (!cats.includes(selectedCategory)) {
        return false;
      }
    }

    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase().trim();
      const matchTitle = lab.title.toLowerCase().includes(term);
      const matchCategory = lab.category.toLowerCase().includes(term);
      const matchDesc = lab.description.toLowerCase().includes(term);
      const matchTopics = lab.topics.some((t) => t.toLowerCase().includes(term));
      const matchBadge = lab.badge.toLowerCase().includes(term);
      if (!matchTitle && !matchCategory && !matchDesc && !matchTopics && !matchBadge) {
        return false;
      }
    }

    return true;
  });

  return (
    <section 
      id="external-simulations" 
      className="w-full relative z-10 space-y-5 scroll-mt-24 select-none"
    >
      <style>{`
        .external-sims-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 14px;
          width: 100%;
          box-sizing: border-box;
        }
        @media (max-width: 900px) {
          .external-sims-grid {
            grid-template-columns: repeat(1, minmax(0, 1fr)) !important;
          }
        }
        .external-sim-row {
          background-color: #ffffff;
          border-radius: 16px;
          border: 1px solid #E2E8F0;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
          display: flex;
          align-items: center;
          position: relative;
          overflow: hidden;
          padding: 12px 14px;
          gap: 12px;
          transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
        }
        .external-sim-row:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 24px var(--lab-glow);
          border-color: #CBD5E1;
        }
        .lab-launch-btn {
          transition: transform 0.18s ease, filter 0.18s ease;
        }
        .lab-launch-btn:hover {
          filter: brightness(1.1);
          transform: scale(1.04);
        }
        @keyframes hubHeadingBlink {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0;
          }
        }
        .hub-heading-cursor {
          display: inline-block;
          font-weight: 300;
          line-height: 1;
          animation: hubHeadingBlink 0.75s infinite ease-in-out;
          pointer-events: none;
          user-select: none;
        }
        @media (prefers-reduced-motion: reduce) {
          .external-sim-row, .external-sim-row:hover,
          .lab-launch-btn, .lab-launch-btn:hover {
            transition: none !important;
            transform: none !important;
          }
          .hub-heading-cursor {
            display: none !important;
          }
        }
      `}</style>

      {/* Top Banner / Section Header: Sequential Palette Fill */}
      <div 
        className="reveal-up border shadow-lg rounded-2xl p-5 sm:p-7 text-white transition-all"
        style={{
          backgroundColor: '#1B2A5C',
          borderColor: '#F5A623',
          boxShadow: '0 8px 30px rgba(27, 42, 92, 0.25)'
        }}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 flex-wrap">
              <span 
                className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider px-3.5 py-1 rounded-md border"
                style={{
                  backgroundColor: '#F5A623',
                  color: '#1B2A5C',
                  borderColor: '#E58E0A'
                }}
              >
                <Globe className="w-3.5 h-3.5 text-[#1B2A5C] shrink-0" />
                SIMULATION HUB
              </span>
              <span 
                className="px-3 py-1 rounded-full text-xs font-bold border flex items-center gap-1.5 font-mono"
                style={{
                  backgroundColor: '#1546A8',
                  color: '#DBE4F7',
                  borderColor: '#2D62D1'
                }}
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-[#F5A623] shrink-0" />
                {EXTERNAL_SIMULATION_RESOURCES.length} Curated Global STEM Repositories
              </span>
            </div>

            <h2 
              className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight text-white font-heading min-h-[1.75rem] sm:min-h-[2.25rem] md:min-h-[2.5rem] flex items-center"
              aria-label={HEADING_FULL_TEXT}
            >
              <span>{headingText}</span>
              <span className="hub-heading-cursor text-[#F5A623] ml-0.5" aria-hidden="true">
                |
              </span>
            </h2>

            <p className="text-xs sm:text-sm font-normal max-w-3xl leading-relaxed" style={{ color: '#DBE4F7' }}>
              Explore leading research-grade physics, chemistry, engineering, and mathematics interactive simulation engines worldwide with instant direct access.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <div 
              className="px-4 py-2 rounded-xl border flex items-center gap-2 text-xs font-bold"
              style={{
                backgroundColor: '#1546A8',
                borderColor: '#2D62D1',
                color: '#DBE4F7'
              }}
            >
              <Sparkles className="w-4 h-4 text-[#F5A623] shrink-0" />
              <span>Direct External Access</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="reveal-up flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3.5 sm:p-4 rounded-2xl border border-slate-200 shadow-xs">
        {/* Category Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {CATEGORY_TABS.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                  isSelected
                    ? 'bg-[#1B2A5C] text-white shadow-xs scale-[1.02]'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 border border-slate-200/70'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Search Box */}
        <div className="relative w-full sm:w-64 shrink-0">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Search external labs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-7 py-1.5 text-xs sm:text-sm rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1E88E5] text-slate-900 placeholder-slate-400 font-sans"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={() => setSearchTerm('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 cursor-pointer font-bold px-1"
              title="Clear search"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* 2-Column Slim Rows Grid (1 Column under 900px) */}
      {filteredResources.length > 0 ? (
        <div className="external-sims-grid">
          {filteredResources.map((item, idx) => {
            const IconComponent = item.icon;
            const badgeLabel = item.isAd && item.adLabels?.[0] ? item.adLabels[0] : item.badge;
            const revealClass = idx % 2 === 0 ? 'reveal-left' : 'reveal-right reveal-delay-1';

            return (
              <div key={item.id} className={revealClass}>
                <div
                  className="external-sim-row"
                  style={{
                    '--lab-glow': item.glowColor
                  } as React.CSSProperties}
                >
                  {/* Thin Colored Left Edge Bar */}
                  <div 
                    className="w-1.5 self-stretch rounded-full shrink-0" 
                    style={{ backgroundColor: item.accentColor }} 
                    aria-hidden="true"
                  />

                  {/* 52x52px Colorful Icon Tile */}
                  <div
                    className="reveal-zoom w-[52px] h-[52px] rounded-xl flex items-center justify-center shrink-0 p-1.5 border"
                    style={{
                      backgroundColor: `${item.accentColor}15`,
                      borderColor: `${item.accentColor}35`
                    }}
                  >
                    <IconComponent className="w-8 h-8 pointer-events-none shrink-0" />
                  </div>

                  {/* Lab Information (Name, Subject, Badge) */}
                  <div className="flex-1 min-w-0 flex flex-col justify-center gap-0.5">
                    <h3 
                      className="text-[16px] font-bold text-slate-900 truncate leading-snug font-heading" 
                      title={item.title}
                    >
                      {item.title}
                    </h3>
                    <p 
                      className="text-[13px] text-slate-500 truncate leading-tight font-sans" 
                      title={item.category}
                    >
                      {item.category}
                    </p>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span
                        className="text-[11px] font-bold px-2 py-0.5 rounded-md border shrink-0 tracking-wide uppercase font-mono"
                        style={{
                          backgroundColor: `${item.accentColor}18`,
                          color: item.accentColor,
                          borderColor: `${item.accentColor}40`
                        }}
                      >
                        {badgeLabel}
                      </span>
                    </div>
                  </div>

                  {/* Right Side: Colored Launch Button + Round Details Button */}
                  <div className="shrink-0 flex items-center gap-2">
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="lab-launch-btn h-9 px-3.5 rounded-xl flex items-center gap-1.5 text-xs sm:text-sm font-bold text-white shadow-xs cursor-pointer select-none"
                      style={{
                        backgroundColor: item.accentColor,
                        boxShadow: `0 2px 8px ${item.glowColor}`
                      }}
                      title={`Open ${item.title} in new tab`}
                    >
                      <span>Launch</span>
                      <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                    </a>

                    <button
                      type="button"
                      onClick={() => setSelectedLab(item)}
                      className="w-8 h-8 rounded-full border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-slate-900 flex items-center justify-center font-bold text-sm cursor-pointer shadow-2xs hover:border-slate-300 transition-colors"
                      title={`View details for ${item.title}`}
                      aria-label={`View details for ${item.title}`}
                    >
                      ⓘ
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-2xl p-8 text-center border border-slate-200 shadow-xs">
          <p className="text-sm font-semibold text-slate-600">
            No external simulation platforms match your current filter.
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedCategory('All');
              setSearchTerm('');
            }}
            className="mt-3 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-[#1B2A5C] text-white hover:bg-[#1546A8] transition-colors cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Details Side Panel Modal (About 380px wide with Dark Backdrop) */}
      {selectedLab && (
        <div 
          className="fixed inset-0 z-50 flex justify-end"
          role="dialog"
          aria-modal="true"
          aria-label={`${selectedLab.title} details`}
        >
          {/* Dark Shade Backdrop */}
          <div
            onClick={() => setSelectedLab(null)}
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity cursor-pointer"
            aria-hidden="true"
          />

          {/* Right Drawer Panel */}
          <div 
            className="relative z-10 w-full max-w-[380px] h-full bg-white shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-right duration-200"
            style={{
              borderLeft: `4px solid ${selectedLab.accentColor}`
            }}
          >
            {/* Top Bar with Close Button */}
            <div className="flex items-center justify-between p-4 border-b border-slate-100 bg-slate-50/90">
              <span 
                className="text-xs font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-md"
                style={{
                  backgroundColor: `${selectedLab.accentColor}18`,
                  color: selectedLab.accentColor
                }}
              >
                {selectedLab.isAd && selectedLab.adLabels?.[0] ? selectedLab.adLabels[0] : selectedLab.badge}
              </span>
              <button
                type="button"
                onClick={() => setSelectedLab(null)}
                className="w-8 h-8 rounded-full bg-white hover:bg-slate-200 text-slate-600 hover:text-slate-900 flex items-center justify-center font-bold text-base cursor-pointer shadow-2xs border border-slate-200 transition-colors"
                title="Close details (Esc)"
                aria-label="Close details"
              >
                ✕
              </button>
            </div>

            {/* Scrollable Content Body */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {/* Large Icon + Name + Subject */}
              <div className="flex items-start gap-3.5">
                <div 
                  className="w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 p-2 shadow-2xs border"
                  style={{
                    backgroundColor: `${selectedLab.accentColor}15`,
                    borderColor: `${selectedLab.accentColor}35`
                  }}
                >
                  {React.createElement(selectedLab.icon, { className: 'w-10 h-10 pointer-events-none' })}
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-lg font-bold text-slate-900 leading-snug break-words font-heading">
                    {selectedLab.title}
                  </h3>
                  <p className="text-xs font-semibold mt-1" style={{ color: selectedLab.accentColor }}>
                    {selectedLab.category}
                  </p>
                </div>
              </div>

              {/* About (Full description, not cut off) */}
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                  About Platform
                </h4>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans">
                  {selectedLab.description}
                </p>
              </div>

              {/* Level (Full text, not cut off) */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5 flex items-center gap-1.5">
                  <GraduationCap className="w-3.5 h-3.5 text-slate-400" />
                  <span>Academic Level</span>
                </h4>
                <div className="p-2.5 rounded-xl bg-blue-50/60 border border-blue-100 text-xs font-bold text-[#1546A8] leading-relaxed">
                  {selectedLab.gradeTier}
                </div>
              </div>

              {/* Topics (All topic tags, nothing hidden as +1) */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-slate-400" />
                  <span>Topics Covered</span>
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedLab.topics.map((t, idx) => (
                    <span
                      key={idx}
                      className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 border border-slate-200/80"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Objective (Text from old objectives button) */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1.5">
                  <Target className="w-3.5 h-3.5 text-amber-500" />
                  <span>Learning Objectives</span>
                </h4>
                <div className="space-y-2 bg-amber-50/50 p-3.5 rounded-xl border border-amber-200/70">
                  {getLabObjectives(selectedLab).map((obj, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs leading-relaxed text-slate-800">
                      <span className="text-emerald-600 font-bold shrink-0 mt-0.5">✓</span>
                      <span>{obj}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Pinned Bottom Big Launch Lab Button */}
            <div className="p-4 border-t border-slate-100 bg-white">
              <a
                href={selectedLab.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full h-12 rounded-xl flex items-center justify-center gap-2 text-sm font-bold text-white shadow-md hover:brightness-110 active:scale-98 transition-all select-none"
                style={{
                  backgroundColor: selectedLab.accentColor,
                  boxShadow: `0 4px 14px ${selectedLab.glowColor}`
                }}
              >
                <span>Launch Lab</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
