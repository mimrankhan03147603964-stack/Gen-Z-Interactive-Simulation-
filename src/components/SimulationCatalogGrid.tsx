import React, { useState, useEffect } from 'react';
import { SimulationItem } from '../types';
import { getSimTheme, getDisciplineColor } from '../data/simTheme';
import { 
  Sparkles, 
  Search, 
  Maximize2, 
  CheckCircle2, 
  ExternalLink, 
  Wand2, 
  Loader2, 
  Layers,
  ChevronDown,
  ChevronUp,
  ArrowLeft,
  ArrowRight,
  Home,
  Atom,
  FlaskConical,
  Dna,
  Globe,
  Calculator,
  Laptop,
  BookOpen,
  Languages,
  GraduationCap,
  Compass,
  BrainCircuit
} from 'lucide-react';

import { openSimulationInNewTab, getSimulationStandaloneUrl } from '../utils/navigation';
import { TopicRealisticIcon } from './TopicRealisticIcon';

interface SimulationCatalogGridProps {
  simulations: SimulationItem[];
  activeSim?: SimulationItem | null;
  selectedCategory?: string;
  onSelectCategory?: (category: string) => void;
  selectedGradeTier?: string;
  onSelectGradeTier?: (tier: string) => void;
  onSelectSim: (sim: SimulationItem) => void;
  onLaunchOnStage?: (sim: SimulationItem) => void;
  onTriggerAiGeneration?: (topic: string) => void;
  isGeneratingAi?: boolean;
  onLaunchFullscreenModal: (sim: SimulationItem) => void;
  isDarkMode?: boolean;
  isHomeView?: boolean;
  onOpenCatalog?: (category?: string, grade?: string) => void;
  onBackToHome?: () => void;
}

// Subject configuration matching "All Simulations" default + all 8 STEM disciplines
interface SubjectCategoryConfig {
  key: string;
  shortLabel: string;
  fullTitle: string;
  iconBg: string;
  iconBorder: string;
  activeBorder: string;
  glowColor: string;
  renderIcon: (props: { className?: string; isSelected?: boolean; isDark?: boolean }) => React.ReactNode;
}

const getSubjectCategories = (): SubjectCategoryConfig[] => [
  {
    key: 'All Simulations',
    shortLabel: 'All Simulations',
    fullTitle: 'All Simulations',
    iconBg: 'rgba(56, 189, 248, 0.16)',
    iconBorder: '#0ea5e9',
    activeBorder: '#38bdf8',
    glowColor: 'rgba(14, 165, 233, 0.45)',
    renderIcon: ({ className }) => <Layers className={className || "w-4 h-4"} />
  },
  {
    key: 'Physics & Motion',
    shortLabel: 'Physics & Motion',
    fullTitle: 'Physics & Classical Mechanics',
    iconBg: 'rgba(37, 99, 235, 0.16)',
    iconBorder: '#3b82f6',
    activeBorder: '#60a5fa',
    glowColor: 'rgba(37, 99, 235, 0.45)',
    renderIcon: ({ className }) => <Atom className={className || "w-4 h-4"} />
  },
  {
    key: 'Chemistry & Matter',
    shortLabel: 'Chemistry & Matter',
    fullTitle: 'Chemistry & Molecular Science',
    iconBg: 'rgba(168, 85, 247, 0.16)',
    iconBorder: '#a855f7',
    activeBorder: '#d8b4fe',
    glowColor: 'rgba(147, 51, 234, 0.45)',
    renderIcon: ({ className }) => <FlaskConical className={className || "w-4 h-4"} />
  },
  {
    key: 'Biology & Life',
    shortLabel: 'Biology & Life',
    fullTitle: 'Biology & Living Systems',
    iconBg: 'rgba(34, 197, 94, 0.16)',
    iconBorder: '#22c55e',
    activeBorder: '#86efac',
    glowColor: 'rgba(22, 163, 74, 0.45)',
    renderIcon: ({ className }) => <Dna className={className || "w-4 h-4"} />
  },
  {
    key: 'Earth & Space',
    shortLabel: 'Earth & Space',
    fullTitle: 'Earth & Space Exploration',
    iconBg: 'rgba(2, 132, 199, 0.16)',
    iconBorder: '#0284c7',
    activeBorder: '#7dd3fc',
    glowColor: 'rgba(2, 132, 199, 0.45)',
    renderIcon: ({ className }) => <Globe className={className || "w-4 h-4"} />
  },
  {
    key: 'Mathematics & Logic',
    shortLabel: 'Mathematics & Logic',
    fullTitle: 'Mathematics & Geometry',
    iconBg: 'rgba(245, 158, 11, 0.16)',
    iconBorder: '#f59e0b',
    activeBorder: '#fdba74',
    glowColor: 'rgba(234, 88, 12, 0.45)',
    renderIcon: ({ className }) => <Calculator className={className || "w-4 h-4"} />
  },
  {
    key: 'Computer Science & IT',
    shortLabel: 'Computer Science & IT',
    fullTitle: 'Computer Science & Hardware',
    iconBg: 'rgba(20, 184, 166, 0.16)',
    iconBorder: '#14b8a6',
    activeBorder: '#5eead4',
    glowColor: 'rgba(13, 148, 136, 0.45)',
    renderIcon: ({ className }) => <Laptop className={className || "w-4 h-4"} />
  },
  {
    key: 'English & Grammar',
    shortLabel: 'English & Grammar',
    fullTitle: 'English & Spatial Linguistics',
    iconBg: 'rgba(139, 92, 246, 0.16)',
    iconBorder: '#8b5cf6',
    activeBorder: '#c4b5fd',
    glowColor: 'rgba(99, 102, 241, 0.45)',
    renderIcon: ({ className }) => <BookOpen className={className || "w-4 h-4"} />
  },
  {
    key: 'Early Childhood (ECCE)',
    shortLabel: 'Early Childhood (ECCE)',
    fullTitle: 'Early Childhood Care & Education',
    iconBg: 'rgba(244, 63, 94, 0.16)',
    iconBorder: '#f43f5e',
    activeBorder: '#fecdd3',
    glowColor: 'rgba(244, 63, 94, 0.45)',
    renderIcon: ({ className }) => <Sparkles className={className || "w-4 h-4"} />
  },
  {
    key: 'Urdu & Linguistics',
    shortLabel: 'Urdu & Linguistics',
    fullTitle: 'Urdu Language & Linguistics',
    iconBg: 'rgba(16, 185, 129, 0.16)',
    iconBorder: '#10b981',
    activeBorder: '#6ee7b7',
    glowColor: 'rgba(16, 185, 129, 0.45)',
    renderIcon: ({ className }) => <Languages className={className || "w-4 h-4"} />
  }
];

export const SimulationCatalogGrid: React.FC<SimulationCatalogGridProps> = ({
  simulations,
  activeSim,
  selectedCategory: controlledCategory,
  onSelectCategory,
  selectedGradeTier: controlledGradeTier,
  onSelectGradeTier,
  onSelectSim,
  onLaunchOnStage,
  onTriggerAiGeneration,
  isGeneratingAi = false,
  onLaunchFullscreenModal,
  isDarkMode = false,
  isHomeView = false,
  onOpenCatalog,
  onBackToHome
}) => {
  // Tier 1 Grade Level filter state ('all' | 'primary' | 'middle' | 'secondary' | 'higher')
  const [internalGradeTier, setInternalGradeTier] = useState<string>('all');
  const selectedGradeTier = controlledGradeTier !== undefined ? controlledGradeTier : internalGradeTier;

  // Category state (Default to 'All Simulations' on initial load)
  const [internalCategory, setInternalCategory] = useState<string>('All Simulations');

  // Quick search filter term
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Track expanded descriptions per card (collapsed by default for progressive disclosure)
  const [expandedDescIds, setExpandedDescIds] = useState<Record<string, boolean>>({});

  const selectedCategory = controlledCategory !== undefined ? controlledCategory : internalCategory;

  const gradeTiers = [
    { key: 'all', label: 'All Grades', short: 'All', desc: 'Pre-K to Grade 12', icon: GraduationCap },
    { key: 'primary', label: 'Primary (Grades 1–5)', short: 'Grades 1–5', desc: 'Foundational STEM & ECCE', icon: Sparkles },
    { key: 'middle', label: 'Middle School (Grades 6–8)', short: 'Grades 6–8', desc: 'General Sciences & Physics', icon: Compass },
    { key: 'secondary', label: 'Secondary / Matric (Grades 9–10)', short: 'Matric (9–10)', desc: 'Physics, Chemistry, Bio, CS', icon: FlaskConical },
    { key: 'higher', label: 'Higher Secondary / F.Sc (Grades 11–12)', short: 'F.Sc (11–12)', desc: 'Advanced Mechanics & Calculus', icon: BrainCircuit },
  ];

  const handleGradeTierChange = (tierKey: string) => {
    if (onSelectGradeTier) {
      onSelectGradeTier(tierKey);
    } else {
      setInternalGradeTier(tierKey);
    }
    if (isHomeView && onOpenCatalog) {
      onOpenCatalog(undefined, tierKey);
    }
  };

  const handleCategoryChange = (catKey: string) => {
    if (catKey !== 'All Simulations') {
      const countInCurrentTier = activeSimulations.filter(s => s.category === catKey && matchesGradeTier(s, selectedGradeTier)).length;
      if (countInCurrentTier === 0) {
        handleGradeTierChange('all');
      }
    }
    if (onSelectCategory) {
      onSelectCategory(catKey);
    } else {
      setInternalCategory(catKey);
    }
    if (isHomeView && onOpenCatalog) {
      onOpenCatalog(catKey, undefined);
    }
  };

  useEffect(() => {
    if (controlledCategory && controlledCategory !== 'All Simulations') {
      const countInCurrentTier = simulations.filter(
        s => s.category === controlledCategory && matchesGradeTier(s, selectedGradeTier)
      ).length;
      if (countInCurrentTier === 0) {
        handleGradeTierChange('all');
      }
    }
  }, [controlledCategory, simulations, selectedGradeTier]);

  const handleCardClick = (sim: SimulationItem) => {
    openSimulationInNewTab(sim);
  };

  // All active simulation labs including standalone uploaded modules
  const activeSimulations = simulations;

  const matchesGradeTier = (sim: SimulationItem, tier: string): boolean => {
    if (tier === 'all') return true;
    const grade = (sim.gradeLevel || '').toLowerCase();
    const cat = (sim.category || '').toLowerCase();

    if (tier === 'primary') {
      return (
        cat.includes('early childhood') ||
        cat.includes('ecce') ||
        grade.includes('elementary') ||
        grade.includes('primary') ||
        grade.includes('pre-k') ||
        grade.includes('grades 1') ||
        grade.includes('grades 2') ||
        grade.includes('grades 3') ||
        grade.includes('grades 4') ||
        grade.includes('grades 5') ||
        grade.includes('3–9') ||
        grade.includes('kindergarten')
      );
    }
    if (tier === 'middle') {
      return (
        grade.includes('middle') ||
        grade.includes('class 6') ||
        grade.includes('class 7') ||
        grade.includes('class 8') ||
        grade.includes('grades 6') ||
        grade.includes('grades 7') ||
        grade.includes('grades 8') ||
        grade.includes('6–8') ||
        grade.includes('6-8') ||
        grade.includes('6–10') ||
        grade.includes('6–12') ||
        grade.includes('7–12')
      );
    }
    if (tier === 'secondary') {
      return (
        grade.includes('secondary') ||
        grade.includes('matric') ||
        grade.includes('class 9') ||
        grade.includes('class 10') ||
        grade.includes('grades 9') ||
        grade.includes('grades 10') ||
        grade.includes('9–10') ||
        grade.includes('9-10') ||
        grade.includes('9–12') ||
        grade.includes('6–10') ||
        grade.includes('6–12') ||
        grade.includes('7–12') ||
        grade.includes('high school')
      );
    }
    if (tier === 'higher') {
      return (
        grade.includes('higher') ||
        grade.includes('f.sc') ||
        grade.includes('fsc') ||
        grade.includes('grades 11') ||
        grade.includes('grades 12') ||
        grade.includes('11–12') ||
        grade.includes('11-12') ||
        grade.includes('9–12') ||
        grade.includes('6–12') ||
        grade.includes('7–12') ||
        grade.includes('college') ||
        grade.includes('advanced') ||
        grade.includes('high school')
      );
    }
    return true;
  };

  const getGradeTierCount = (tierKey: string) => {
    return activeSimulations.filter(s => matchesGradeTier(s, tierKey)).length;
  };

  const cleanCardTitle = (title: string, category?: string): string => {
    let clean = title
      .replace(/\.html$/i, '')
      .replace(/_/g, ' ')
      .replace(/Cambridge\s+Scholar\s*[-–—]?\s*/gi, '')
      .trim();
    if (category !== 'Urdu & Linguistics') {
      clean = clean.replace(/[\u0600-\u06FF]+/g, '').replace(/\(\s*\)/g, '').trim();
    }
    return clean;
  };

  const cleanCardTopic = (topic: string, category?: string): string => {
    let clean = topic
      .replace(/\.html$/i, '')
      .replace(/_/g, ' ')
      .replace(/Cambridge\s+Scholar\s*[-–—]?\s*/gi, '')
      .trim();
    if (category !== 'Urdu & Linguistics') {
      clean = clean.replace(/[\u0600-\u06FF]+/g, '').replace(/\(\s*\)/g, '').trim();
    }
    return clean;
  };

  const cleanGradeBadge = (grade: string): string => {
    return grade
      .replace(/Cambridge\s+Scholar\s*/gi, '')
      .trim();
  };

  const cleanCardSubject = (subject: string, category?: string): string => {
    let clean = subject
      .replace(/Cambridge\s+Scholar\s*[-–—]?\s*/gi, '')
      .replace(/\|\s*GEN\s+Z\s+(?:EDTECH\s+)?INTERACTIVE(?:\s+SIMULATIONS?)?/gi, '')
      .trim();
    if (category !== 'Urdu & Linguistics') {
      clean = clean.replace(/[\u0600-\u06FF]+/g, '').replace(/\(\s*\)/g, '').trim();
    }
    return clean;
  };

  const cleanCardDescription = (desc: string, category?: string): string => {
    let clean = desc
      .replace(/Cambridge\s+Scholar\s*/gi, '')
      .trim();
    if (category !== 'Urdu & Linguistics') {
      clean = clean.replace(/[\u0600-\u06FF]+/g, '').replace(/\(\s*\)/g, '').trim();
    }
    return clean;
  };

  const matchesSearch = (sim: SimulationItem) => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    const cleanT = cleanCardTitle(sim.title).toLowerCase();
    const cleanS = cleanCardSubject(sim.subject).toLowerCase();
    const cleanD = cleanCardDescription(sim.description).toLowerCase();
    return (
      cleanT.includes(term) ||
      sim.indexNumber.includes(term) ||
      cleanS.includes(term) ||
      cleanD.includes(term)
    );
  };

  const getCategoryCount = (categoryKey: string) => {
    if (categoryKey === 'All Simulations' || categoryKey === 'All') {
      return activeSimulations.filter(s => matchesGradeTier(s, selectedGradeTier)).length;
    }
    return activeSimulations.filter(s => s.category === categoryKey && matchesGradeTier(s, selectedGradeTier)).length;
  };

  const subjectCategories = getSubjectCategories();
  const activeSubjectConfig = subjectCategories.find(c => c.key === selectedCategory) || subjectCategories[0];

  const isAllCategory = selectedCategory === 'All Simulations' || selectedCategory === 'All';

  // Two-tier filtered simulations: Grade Level Tier & STEM Subject Tier + Real-time Instant Search
  const displayedSims = activeSimulations.filter(s => {
    if (!matchesGradeTier(s, selectedGradeTier)) return false;
    if (!isAllCategory && s.category !== selectedCategory) return false;
    if (!matchesSearch(s)) return false;
    return true;
  });

  // Render a simulation card with deep frosted glassmorphism, unique multi-colored identity, and 3D tactile push buttons
  const renderCard = (sim: SimulationItem) => {
    const simTheme = getSimTheme(sim.indexNumber);
    const discStyle = getDisciplineColor(sim.category);
    const isActive = activeSim ? activeSim.id === sim.id : false;
    const isConceptGuide = sim.id === 'sim-ecce-curriculum-learning-areas';
    const displayTitle = cleanCardTitle(sim.title, sim.category);
    const displayGrade = cleanGradeBadge(sim.gradeLevel);
    const displaySubject = cleanCardSubject(sim.subject, sim.category);
    const displayDesc = cleanCardDescription(sim.description, sim.category);

    const isUrdu = sim.category === 'Urdu & Linguistics' || /[\u0600-\u06FF]/.test(sim.title);

    return (
      <div
        key={sim.id}
        onClick={(e) => {
          if ((e.target as HTMLElement).closest('button') || (e.target as HTMLElement).closest('a')) return;
          handleCardClick(sim);
        }}
        className={`card-colored-3d rounded-3xl p-5 flex flex-col justify-between relative overflow-hidden group cursor-pointer select-none transition-all duration-300 text-white ${
          isActive ? 'ring-4 ring-amber-300 scale-[1.02] shadow-2xl' : 'hover:-translate-y-1.5'
        }`}
        style={{
          background: simTheme.bgGradient,
          borderRadius: '24px',
          borderWidth: '2px',
          borderStyle: 'solid',
          borderColor: simTheme.borderColor || '#38bdf8',
          boxShadow: `0 12px 28px -5px ${simTheme.glowColor || 'rgba(0, 80, 180, 0.35)'}, 0 6px 12px -4px rgba(0, 0, 0, 0.2)`,
          transform: 'translateZ(0)'
        }}
      >
        {/* Top Header: Visual Emblem Pedestal & LAB Badge Row */}
        <div className="flex items-center justify-between gap-3 relative z-10 pt-1">
          {/* Realistic Visual Emblem Pedestal on Solid High-Contrast Surface */}
          <a
            href={getSimulationStandaloneUrl(sim)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center shrink-0 p-1.5 group-hover:scale-105 transition-transform block bg-slate-950 border-2 border-sky-400 shadow-md"
            title={`Open ${displayTitle} in new tab`}
          >
            <TopicRealisticIcon 
              indexNumber={sim.indexNumber} 
              simId={sim.id} 
              className="w-9 h-9 sm:w-10 sm:h-10 drop-shadow-sm group-hover:scale-110 transition-transform duration-200 pointer-events-none shrink-0" 
            />
          </a>

          {/* 3D Lab / Concept Badge - Clearly Separated on Right */}
          <span 
            className="font-mono text-xs font-black px-3.5 py-1 rounded-full bg-slate-950 text-white shadow-md border-2 border-sky-400 shrink-0 tracking-wide"
          >
            {isConceptGuide ? 'CONCEPT GUIDE' : `LAB ${sim.indexNumber}`}
          </span>
        </div>

        {/* Dedicated Grade / Class Level Area: Sits on its own unobstructed line with crisp readability */}
        <div className="relative z-10 mt-2.5 mb-2.5 flex items-center">
          <span 
            className="text-[11px] font-bold px-3 py-1 rounded-full font-mono shadow-xs bg-slate-950 text-amber-300 border-2 border-amber-400 leading-normal inline-block max-w-full break-words text-left"
            title={displayGrade}
          >
            {displayGrade}
          </span>
        </div>

        {/* Content: Title, Subject, Description, Topics */}
        <div className="relative z-10 flex-1 flex flex-col">
          {/* Simulation Topic Title in Crisp White */}
          <h4 
            className={`text-base sm:text-lg font-black tracking-wide text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)] ${
              isUrdu ? 'font-urdu leading-[2.2]' : 'font-heading leading-snug line-clamp-2'
            }`}
            dir={isUrdu ? 'rtl' : 'ltr'}
          >
            <a
              href={getSimulationStandaloneUrl(sim)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                e.stopPropagation();
              }}
              className="hover:underline text-white hover:text-amber-200 transition-colors"
              title={`Open ${displayTitle} in new tab`}
            >
              {displayTitle}
            </a>
          </h4>

          {/* Subject & Sub-discipline */}
          <p className="text-xs font-bold mt-1.5 line-clamp-1 flex items-center gap-1.5 text-amber-300 drop-shadow-xs">
            <span className="w-2 h-2 rounded-full bg-amber-300 animate-pulse inline-block shrink-0" />
            <span className="text-amber-200 font-extrabold">{displaySubject}</span>
          </p>

          {/* Concept Description with Click-to-Expand Progressive Disclosure */}
          <div className="mt-2">
            <p 
              className={`text-xs sm:text-[13px] font-normal text-white leading-relaxed drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)] ${
                expandedDescIds[sim.id] ? '' : 'line-clamp-2'
              } ${isUrdu ? 'font-urdu leading-[2.2]' : ''}`}
              dir={isUrdu ? 'rtl' : 'ltr'}
            >
              {displayDesc}
            </p>
            {displayDesc && displayDesc.length > 80 && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setExpandedDescIds(prev => ({ ...prev, [sim.id]: !prev[sim.id] }));
                }}
                className="mt-1 text-[11px] font-bold text-amber-300 hover:text-white underline cursor-pointer inline-flex items-center gap-1 transition-colors drop-shadow-xs"
              >
                {expandedDescIds[sim.id] ? (
                  <>
                    <ChevronUp className="w-3 h-3 pointer-events-none" />
                    <span>Hide Details</span>
                  </>
                ) : (
                  <>
                    <ChevronDown className="w-3 h-3 pointer-events-none" />
                    <span>Read Details</span>
                  </>
                )}
              </button>
            )}
          </div>

          {/* Topic Tags in Rounded Pill Capsules */}
          <div className="flex flex-wrap gap-1.5 mt-3">
            {sim.topics.slice(0, 2).map((topic, i) => {
              const cleanT = cleanCardTopic(topic, sim.category);
              const isTopicUrdu = /[\u0600-\u06FF]/.test(cleanT);
              return (
                <span
                  key={i}
                  className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full truncate max-w-[150px] shadow-xs bg-slate-900 text-sky-200 border border-sky-400 font-mono ${
                    isTopicUrdu ? 'font-urdu leading-[2]' : ''
                  }`}
                  dir={isTopicUrdu ? 'rtl' : 'ltr'}
                  title={cleanT}
                >
                  {cleanT}
                </span>
              );
            })}
            {sim.topics.length > 2 && (
              <span 
                className="text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-xs bg-slate-900 text-amber-300 border border-amber-400 font-mono"
              >
                +{sim.topics.length - 2}
              </span>
            )}
          </div>
        </div>

        {/* Card Action Bar */}
        <div className="relative z-10 pt-4 mt-auto border-t border-slate-700 flex items-center justify-between gap-2">
          {/* Action Button: Solid High-Contrast Dark Button with Vibrant Accent */}
          <a
            href={getSimulationStandaloneUrl(sim)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="bg-slate-950 hover:bg-amber-400 text-white hover:text-slate-950 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-black flex items-center gap-2 cursor-pointer shadow-xl border-2 border-white transition-all transform active:scale-95"
            title={isConceptGuide ? "Explore Detailed Pedagogical Concept Guide in New Tab" : "Launch Detailed Simulation Lab in New Tab"}
          >
            <ExternalLink className="w-3.5 h-3.5 text-amber-300 group-hover:text-slate-950 pointer-events-none shrink-0" />
            <span>{isConceptGuide ? 'Explore Concept' : 'Launch Lab'}</span>
          </a>

          {/* Direct Fullscreen Modal Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onLaunchFullscreenModal(sim);
            }}
            className="w-10 h-10 rounded-2xl bg-slate-950 hover:bg-amber-400 text-white hover:text-slate-950 border-2 border-amber-400 transition-all cursor-pointer flex items-center justify-center shadow-md active:scale-95"
            title="Launch in 4K Fullscreen View"
          >
            <Maximize2 className="w-4 h-4 pointer-events-none shrink-0" />
          </button>
        </div>
      </div>
    );
  };

  const getGradeTierStyle = (tierKey: string, isSelected: boolean) => {
    switch (tierKey) {
      case 'all':
        return {
          btn: isSelected
            ? 'bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white border-2 border-white shadow-xl shadow-blue-500/50 font-black ring-2 ring-blue-400'
            : 'bg-[#153a7a] text-white border-2 border-sky-400 hover:bg-[#1e4d9e] hover:border-sky-300 font-extrabold shadow-md',
          badge: isSelected ? 'bg-slate-950 text-cyan-300 font-mono font-black border border-cyan-300' : 'bg-slate-950/90 text-sky-200 font-mono font-black border border-sky-400',
          iconBox: isSelected ? 'bg-blue-500/40 text-white border border-white/60' : 'bg-sky-500/30 text-white border border-sky-400'
        };
      case 'primary':
        return {
          btn: isSelected
            ? 'bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white border-2 border-white shadow-xl shadow-emerald-500/50 font-black ring-2 ring-emerald-400'
            : 'bg-[#0f5439] text-white border-2 border-emerald-400 hover:bg-[#15734e] hover:border-emerald-300 font-extrabold shadow-md',
          badge: isSelected ? 'bg-slate-950 text-emerald-300 font-mono font-black border border-emerald-300' : 'bg-slate-950/90 text-emerald-200 font-mono font-black border border-emerald-400',
          iconBox: isSelected ? 'bg-emerald-500/40 text-white border border-white/60' : 'bg-emerald-500/30 text-white border border-emerald-400'
        };
      case 'middle':
        return {
          btn: isSelected
            ? 'bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white border-2 border-white shadow-xl shadow-amber-500/50 font-black ring-2 ring-amber-400'
            : 'bg-[#6b3805] text-white border-2 border-amber-400 hover:bg-[#8f4b07] hover:border-amber-300 font-extrabold shadow-md',
          badge: isSelected ? 'bg-slate-950 text-amber-300 font-mono font-black border border-amber-300' : 'bg-slate-950/90 text-amber-200 font-mono font-black border border-amber-400',
          iconBox: isSelected ? 'bg-amber-500/40 text-white border border-white/60' : 'bg-amber-500/30 text-white border border-amber-400'
        };
      case 'secondary':
        return {
          btn: isSelected
            ? 'bg-gradient-to-r from-rose-600 via-red-600 to-rose-700 text-white border-2 border-white shadow-xl shadow-rose-500/50 font-black ring-2 ring-rose-400'
            : 'bg-[#691436] text-white border-2 border-rose-400 hover:bg-[#8a1a47] hover:border-rose-300 font-extrabold shadow-md',
          badge: isSelected ? 'bg-slate-950 text-rose-300 font-mono font-black border border-rose-300' : 'bg-slate-950/90 text-rose-200 font-mono font-black border border-rose-400',
          iconBox: isSelected ? 'bg-rose-500/40 text-white border border-white/60' : 'bg-rose-500/30 text-white border border-rose-400'
        };
      case 'higher':
        return {
          btn: isSelected
            ? 'bg-gradient-to-r from-purple-600 via-fuchsia-600 to-purple-700 text-white border-2 border-white shadow-xl shadow-purple-500/50 font-black ring-2 ring-purple-400'
            : 'bg-[#4d1678] text-white border-2 border-purple-400 hover:bg-[#681ea3] hover:border-purple-300 font-extrabold shadow-md',
          badge: isSelected ? 'bg-slate-950 text-purple-300 font-mono font-black border border-purple-300' : 'bg-slate-950/90 text-purple-200 font-mono font-black border border-purple-400',
          iconBox: isSelected ? 'bg-purple-500/40 text-white border border-white/60' : 'bg-purple-500/30 text-white border border-purple-400'
        };
      default:
        return {
          btn: isSelected
            ? 'bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 text-white border-2 border-white shadow-xl shadow-sky-500/50 font-black ring-2 ring-sky-400'
            : 'bg-[#153a7a] text-white border-2 border-sky-400 hover:bg-[#1e4d9e] font-extrabold shadow-md',
          badge: isSelected ? 'bg-slate-950 text-sky-300 font-mono font-black border border-sky-300' : 'bg-slate-950/90 text-sky-200 font-mono font-black border border-sky-400',
          iconBox: isSelected ? 'bg-sky-500/40 text-white border border-white/60' : 'bg-sky-500/30 text-white border border-sky-400'
        };
    }
  };

  const getSubjectStyle = (key: string, isSelected: boolean) => {
    switch (key) {
      case 'All Simulations':
        return {
          btn: isSelected
            ? 'bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white border-2 border-white shadow-xl shadow-blue-500/50 font-black ring-2 ring-blue-400'
            : 'bg-[#153a7a] text-white border-2 border-blue-400 hover:bg-[#1e4d9e] hover:border-blue-300 font-extrabold shadow-md',
          badge: isSelected ? 'bg-slate-950 text-cyan-300 font-mono font-black border border-cyan-300' : 'bg-slate-950/90 text-blue-200 font-mono font-black border border-blue-400',
          iconBox: isSelected ? 'bg-blue-500/40 text-white border border-white/60' : 'bg-blue-500/30 text-white border border-blue-400'
        };
      case 'Physics & Motion':
        return {
          btn: isSelected
            ? 'bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 text-white border-2 border-white shadow-xl shadow-sky-500/50 font-black ring-2 ring-sky-400'
            : 'bg-[#0f4a82] text-white border-2 border-sky-400 hover:bg-[#1563ae] hover:border-sky-300 font-extrabold shadow-md',
          badge: isSelected ? 'bg-slate-950 text-sky-300 font-mono font-black border border-sky-300' : 'bg-slate-950/90 text-sky-200 font-mono font-black border border-sky-400',
          iconBox: isSelected ? 'bg-sky-500/40 text-white border border-white/60' : 'bg-sky-500/30 text-white border border-sky-400'
        };
      case 'Chemistry & Matter':
        return {
          btn: isSelected
            ? 'bg-gradient-to-r from-teal-600 via-emerald-600 to-teal-700 text-white border-2 border-white shadow-xl shadow-teal-500/50 font-black ring-2 ring-teal-400'
            : 'bg-[#0e5450] text-white border-2 border-teal-400 hover:bg-[#14706b] hover:border-teal-300 font-extrabold shadow-md',
          badge: isSelected ? 'bg-slate-950 text-amber-300 font-mono font-black border border-amber-300' : 'bg-slate-950/90 text-teal-200 font-mono font-black border border-teal-400',
          iconBox: isSelected ? 'bg-teal-500/40 text-amber-300 border border-white/60' : 'bg-teal-500/30 text-amber-300 border border-teal-400'
        };
      case 'Biology & Life':
        return {
          btn: isSelected
            ? 'bg-gradient-to-r from-emerald-600 via-green-600 to-teal-700 text-white border-2 border-white shadow-xl shadow-emerald-500/50 font-black ring-2 ring-emerald-400'
            : 'bg-[#105c36] text-white border-2 border-emerald-400 hover:bg-[#167847] hover:border-emerald-300 font-extrabold shadow-md',
          badge: isSelected ? 'bg-slate-950 text-emerald-300 font-mono font-black border border-emerald-300' : 'bg-slate-950/90 text-emerald-200 font-mono font-black border border-emerald-400',
          iconBox: isSelected ? 'bg-emerald-500/40 text-white border border-white/60' : 'bg-emerald-500/30 text-white border border-emerald-400'
        };
      case 'Earth & Space':
        return {
          btn: isSelected
            ? 'bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-700 text-white border-2 border-white shadow-xl shadow-cyan-500/50 font-black ring-2 ring-cyan-400'
            : 'bg-[#0e4e80] text-white border-2 border-cyan-400 hover:bg-[#1466a6] hover:border-cyan-300 font-extrabold shadow-md',
          badge: isSelected ? 'bg-slate-950 text-cyan-300 font-mono font-black border border-cyan-300' : 'bg-slate-950/90 text-cyan-200 font-mono font-black border border-cyan-400',
          iconBox: isSelected ? 'bg-cyan-500/40 text-white border border-white/60' : 'bg-cyan-500/30 text-white border border-cyan-400'
        };
      case 'Mathematics & Logic':
        return {
          btn: isSelected
            ? 'bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 text-white border-2 border-white shadow-xl shadow-purple-500/50 font-black ring-2 ring-purple-400'
            : 'bg-[#4d1b8c] text-white border-2 border-purple-400 hover:bg-[#6423b5] hover:border-purple-300 font-extrabold shadow-md',
          badge: isSelected ? 'bg-slate-950 text-purple-300 font-mono font-black border border-purple-300' : 'bg-slate-950/90 text-purple-200 font-mono font-black border border-purple-400',
          iconBox: isSelected ? 'bg-purple-500/40 text-white border border-white/60' : 'bg-purple-500/30 text-white border border-purple-400'
        };
      case 'Computer Science & IT':
        return {
          btn: isSelected
            ? 'bg-gradient-to-r from-cyan-600 via-teal-600 to-blue-700 text-white border-2 border-white shadow-xl shadow-cyan-500/50 font-black ring-2 ring-cyan-400'
            : 'bg-[#0f5c6b] text-white border-2 border-cyan-400 hover:bg-[#157a8f] hover:border-cyan-300 font-extrabold shadow-md',
          badge: isSelected ? 'bg-slate-950 text-cyan-300 font-mono font-black border border-cyan-300' : 'bg-slate-950/90 text-cyan-200 font-mono font-black border border-cyan-400',
          iconBox: isSelected ? 'bg-cyan-500/40 text-white border border-white/60' : 'bg-cyan-500/30 text-white border border-cyan-400'
        };
      case 'English & Grammar':
        return {
          btn: isSelected
            ? 'bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 text-white border-2 border-white shadow-xl shadow-amber-500/50 font-black ring-2 ring-amber-400'
            : 'bg-[#6b380a] text-white border-2 border-amber-400 hover:bg-[#8f4a0e] hover:border-amber-300 font-extrabold shadow-md',
          badge: isSelected ? 'bg-slate-950 text-amber-300 font-mono font-black border border-amber-300' : 'bg-slate-950/90 text-amber-200 font-mono font-black border border-amber-400',
          iconBox: isSelected ? 'bg-amber-500/40 text-white border border-white/60' : 'bg-amber-500/30 text-white border border-amber-400'
        };
      case 'Early Childhood (ECCE)':
        return {
          btn: isSelected
            ? 'bg-gradient-to-r from-pink-600 via-rose-600 to-purple-600 text-white border-2 border-white shadow-xl shadow-pink-500/50 font-black ring-2 ring-pink-400'
            : 'bg-[#6e1640] text-white border-2 border-pink-400 hover:bg-[#911d54] hover:border-pink-300 font-extrabold shadow-md',
          badge: isSelected ? 'bg-slate-950 text-pink-300 font-mono font-black border border-pink-300' : 'bg-slate-950/90 text-pink-200 font-mono font-black border border-pink-400',
          iconBox: isSelected ? 'bg-pink-500/40 text-white border border-white/60' : 'bg-pink-500/30 text-white border border-pink-400'
        };
      case 'Urdu & Linguistics':
        return {
          btn: isSelected
            ? 'bg-gradient-to-r from-emerald-600 via-teal-700 to-amber-700 text-white border-2 border-white shadow-xl shadow-emerald-500/50 font-black ring-2 ring-amber-400'
            : 'bg-[#24542d] text-white border-2 border-emerald-400 hover:bg-[#306e3b] hover:border-emerald-300 font-extrabold shadow-md',
          badge: isSelected ? 'bg-slate-950 text-amber-300 font-mono font-black border border-amber-300' : 'bg-slate-950/90 text-emerald-200 font-mono font-black border border-emerald-400',
          iconBox: isSelected ? 'bg-emerald-500/40 text-white border border-white/60' : 'bg-emerald-500/30 text-white border border-emerald-400'
        };
      default:
        return {
          btn: isSelected
            ? 'bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 text-white border-2 border-white shadow-xl shadow-sky-500/50 font-black ring-2 ring-sky-400'
            : 'bg-[#153a7a] text-white border-2 border-sky-400 hover:bg-[#1e4d9e] font-extrabold shadow-md',
          badge: isSelected ? 'bg-slate-950 text-sky-300 font-mono font-black border border-sky-300' : 'bg-slate-950/90 text-sky-200 font-mono font-black border border-sky-400',
          iconBox: isSelected ? 'bg-sky-500/40 text-white border border-white/60' : 'bg-sky-500/30 text-white border border-sky-400'
        };
    }
  };

  return (
    <section 
      id="catalog" 
      className="w-full space-y-6 pt-2 scroll-mt-28 opacity-100"
    >
      {/* If Dedicated Catalog View: Show Top Back Navigation Header */}
      {!isHomeView && (
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#07193b] p-5 sm:p-6 rounded-xl border-2 border-sky-400/80 shadow-2xl text-white">
          <button
            type="button"
            onClick={onBackToHome}
            className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl text-xs sm:text-sm font-sans font-black text-white bg-gradient-to-r from-rose-600 via-red-600 to-rose-700 hover:from-rose-500 hover:to-red-500 border-2 border-white shadow-xl shadow-red-600/40 transition-all transform hover:-translate-y-0.5 hover:scale-105 active:translate-y-0 cursor-pointer shrink-0"
            title="Return to Main Home Screen"
          >
            <Home className="w-5 h-5 text-white pointer-events-none shrink-0" />
            <span className="font-heading tracking-wide uppercase font-black text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
              Back to Home
            </span>
          </button>
          
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="px-4 py-2 rounded-xl text-xs font-mono font-black bg-gradient-to-r from-sky-500 to-blue-600 text-white border-2 border-sky-300/80 shadow-md">
              Discipline: {isAllCategory ? 'All Disciplines' : activeSubjectConfig.fullTitle}
            </span>
            <span className="px-4 py-2 rounded-xl text-xs font-mono font-black bg-gradient-to-r from-emerald-500 to-teal-600 text-white border-2 border-emerald-300/80 shadow-md">
              Grade: {gradeTiers.find(g => g.key === selectedGradeTier)?.label || 'All Grades'}
            </span>
            <span className="px-4 py-2 rounded-xl text-xs font-mono font-black bg-gradient-to-r from-purple-500 to-pink-600 text-white border-2 border-purple-300/80 shadow-md">
              {displayedSims.length} Labs Available
            </span>
          </div>
        </div>
      )}

      {/* Tier 1 Curriculum Filter Flow: Grade Level Tabs */}
      <div className="relative z-10 bg-[#07193b] border-2 border-sky-400/80 shadow-[0_12px_35px_rgba(7,25,59,0.5)] rounded-xl p-5 sm:p-6 text-white transition-all">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 mb-4">
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="text-[11px] font-mono font-black uppercase tracking-wider text-slate-950 px-3 py-1 rounded-lg bg-gradient-to-r from-sky-400 to-cyan-300 shadow-sm border border-cyan-200 shrink-0">
              GRADE FILTER
            </span>
            <span className="text-sm sm:text-base font-black text-white font-heading drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
              Curriculum Grade &amp; Academic Stage
            </span>
          </div>
          <div className="flex items-center gap-2 flex-wrap text-xs font-semibold text-sky-200">
            <span>Aligned with National Curriculum of Pakistan (Session 2026-27)</span>
            {selectedGradeTier !== 'all' && (
              <button 
                type="button"
                onClick={() => handleGradeTierChange('all')}
                className="text-cyan-300 hover:text-white underline cursor-pointer text-xs font-black ml-1 transition-colors"
                title="Reset grade filter to show all simulations"
              >
                Reset to All {activeSimulations.length} Labs
              </button>
            )}
          </div>
        </div>

        {/* Colorful Grade Filter Buttons */}
        <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 w-full">
          {gradeTiers.map((tier) => {
            const isSelectedTier = selectedGradeTier === tier.key;
            const count = getGradeTierCount(tier.key);
            const style = getGradeTierStyle(tier.key, isSelectedTier);
            const TierIcon = tier.icon;

            return (
              <button
                key={tier.key}
                type="button"
                onClick={() => handleGradeTierChange(tier.key)}
                data-grade={tier.key}
                data-filter={tier.key}
                className={`inline-flex items-center gap-2.5 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-sans transition-all duration-200 cursor-pointer select-none shadow-md hover:-translate-y-0.5 active:translate-y-0 active:scale-95 shrink-0 max-w-full ${style.btn}`}
                title={`${tier.label}: ${tier.desc}`}
              >
                <div className={`shrink-0 w-6 h-6 flex items-center justify-center rounded-lg p-1 ${style.iconBox}`}>
                  <TierIcon className="w-4 h-4 pointer-events-none shrink-0" />
                </div>
                <span className="font-heading font-black tracking-normal whitespace-nowrap text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">{tier.label}</span>
                <span
                  className={`text-[11px] font-mono px-2.5 py-0.5 rounded-full shrink-0 ${style.badge}`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Subject Filter Section: Colorful Category Buttons */}
      <div className="relative z-10 bg-[#17082e] border-2 border-purple-400/80 shadow-[0_12px_35px_rgba(23,8,46,0.5)] rounded-xl p-5 sm:p-6 text-white transition-all">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 mb-4">
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="text-[11px] font-mono font-black uppercase tracking-wider text-slate-950 px-3 py-1 rounded-lg bg-gradient-to-r from-purple-400 to-pink-300 shadow-sm border border-pink-200 shrink-0">
              STEM SUBJECT FILTER
            </span>
            <span className="text-sm sm:text-base font-black text-white font-heading drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
              Select Discipline &amp; Learning Track
            </span>
          </div>
          <div className="flex items-center gap-2 flex-wrap text-xs font-semibold text-purple-200">
            <span>Filtered for {gradeTiers.find(g => g.key === selectedGradeTier)?.label || 'Selected Grade'}</span>
            {!isAllCategory && (
              <button 
                type="button"
                onClick={() => handleCategoryChange('All Simulations')}
                className="text-pink-300 hover:text-white underline cursor-pointer text-xs font-black ml-1 transition-colors"
                title="Reset subject filter to show all simulations"
              >
                Reset to All Subjects
              </button>
            )}
          </div>
        </div>

        {/* Colorful Subject Category Buttons */}
        <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 w-full">
          {subjectCategories.map((cat) => {
            const isSelected = selectedCategory === cat.key;
            const count = getCategoryCount(cat.key);
            const style = getSubjectStyle(cat.key, isSelected);

            return (
              <button
                key={cat.key}
                type="button"
                onClick={() => handleCategoryChange(cat.key)}
                data-subject={cat.key}
                data-filter={cat.key}
                className={`inline-flex items-center gap-2.5 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-sans transition-all duration-200 cursor-pointer select-none shadow-md hover:-translate-y-0.5 active:translate-y-0 active:scale-95 shrink-0 max-w-full ${style.btn}`}
                title={`Filter simulations by ${cat.fullTitle} (${count} available)`}
              >
                <div className={`shrink-0 w-6 h-6 flex items-center justify-center rounded-lg p-1 ${style.iconBox}`}>
                  {cat.renderIcon({ isSelected, className: 'w-4 h-4 pointer-events-none' })}
                </div>
                <span className="font-heading font-black tracking-normal whitespace-nowrap text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">{cat.shortLabel}</span>
                <span 
                  className={`text-[11px] font-mono px-2.5 py-0.5 rounded-full shrink-0 ${style.badge}`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* IF HOME VIEW: Render Clean Navigation Callout and DO NOT render the 86 simulation cards */}
      {isHomeView ? (
        <div className="relative z-10 p-6 sm:p-8 rounded-xl border-2 border-cyan-400 shadow-[0_15px_45px_rgba(6,182,212,0.35)] bg-[#07132b] text-white flex flex-col lg:flex-row items-center justify-between gap-6 select-none">
          <div className="space-y-2 text-center lg:text-left flex-1 min-w-0">
            <div className="flex items-center gap-2 justify-center lg:justify-start">
              <span className="inline-flex items-center gap-1.5 text-xs font-mono font-black uppercase tracking-wider text-slate-950 px-3 py-1 rounded-lg bg-gradient-to-r from-cyan-400 to-sky-300 shadow-sm border border-cyan-200">
                <Sparkles className="w-3.5 h-3.5 text-slate-950" />
                LABORATORY WORKSPACE
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-white font-heading tracking-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]">
              Click Any Grade or Subject Above to Open Interactive Labs
            </h3>
            <p className="text-xs sm:text-sm text-sky-100 font-bold leading-relaxed max-w-2xl drop-shadow-[0_1px_4px_rgba(0,0,0,0.7)]">
              Select any curriculum grade tier or STEM discipline above to view dedicated simulation laboratories in a high-contrast, distraction-free environment.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onOpenCatalog && onOpenCatalog('All Simulations', 'all')}
            className="relative z-20 px-6 sm:px-8 py-4 sm:py-4.5 rounded-xl text-sm sm:text-base font-sans font-black text-slate-950 bg-gradient-to-r from-amber-400 via-yellow-300 to-cyan-400 hover:from-amber-300 hover:to-cyan-300 border-2 border-white shadow-2xl shadow-cyan-500/40 transition-all transform hover:-translate-y-1 hover:scale-105 active:translate-y-0 cursor-pointer shrink-0 whitespace-nowrap flex items-center gap-3"
            title="Open Complete STEM Simulations Catalog"
          >
            <BookOpen className="w-5 h-5 text-slate-950 pointer-events-none shrink-0" />
            <span className="font-heading tracking-wider uppercase font-black text-slate-950">
              Open All {activeSimulations.length} Labs Catalog
            </span>
            <ArrowRight className="w-5 h-5 text-slate-950 pointer-events-none shrink-0" />
          </button>
        </div>
      ) : (
        /* Dedicated Full-Width Simulation Catalog Main Content (Only shown in Catalog View) */
        <div className="w-full space-y-6">
        
        {/* Top Breadcrumb & Quick Search Filter Bar */}
        <div className="bg-white border-2 border-slate-200 shadow-md rounded-3xl p-4 sm:p-5 transition-all text-slate-800">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            {/* Breadcrumb & Subject Header */}
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 flex-wrap">
                <span 
                  onClick={() => handleCategoryChange('All Simulations')}
                  className="cursor-pointer hover:text-sky-600 text-slate-500 underline"
                >
                  Interactive Catalog
                </span>
                <span>&gt;</span>
                <span className="text-sky-700 font-black">
                  {isAllCategory ? 'All Simulations' : activeSubjectConfig.fullTitle}
                </span>
              </div>

              <div className="flex items-center gap-2.5 flex-wrap">
                <h2 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 font-heading">
                  {isAllCategory ? 'All STEM Simulations' : activeSubjectConfig.fullTitle}
                </h2>
                {!isAllCategory && (
                  <button
                    type="button"
                    onClick={() => handleCategoryChange('All Simulations')}
                    className="px-3 py-1 rounded-full text-xs font-black bg-blue-100 hover:bg-blue-200 text-blue-900 border border-blue-300 flex items-center gap-1.5 cursor-pointer transition-colors"
                    title="Reset discipline filter to show all simulations"
                  >
                    <span>Filter: {activeSubjectConfig.fullTitle}</span>
                    <span className="font-black text-sm">&times;</span>
                  </button>
                )}
                <span className="px-3 py-1 rounded-full text-xs font-black shadow-2xs flex items-center gap-1.5 bg-gradient-to-r from-sky-500 to-blue-600 text-white font-mono">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-300" />
                  {displayedSims.length === activeSimulations.length
                    ? `Showing All ${activeSimulations.length} Verified Labs`
                    : `Showing ${displayedSims.length} of ${activeSimulations.length} Total Labs`}
                </span>
              </div>
            </div>

            {/* Quick Search Bar to Filter Labs Instantly */}
            <div className="w-full md:w-80 shrink-0">
              <div className="relative flex items-center rounded-2xl border border-[rgba(220,235,255,0.95)] bg-white shadow-[inset_0_1px_2px_rgba(0,0,0,0.03)] focus-within:border-sky-400 focus-within:ring-2 focus-within:ring-sky-100">
                <Search className="w-4 h-4 ml-3.5 shrink-0 text-sky-500" />
                <input
                  type="text"
                  placeholder="Search labs across disciplines..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full py-2.5 px-3 text-xs font-bold bg-transparent outline-none text-slate-800 placeholder-slate-400 font-sans"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="mr-2 text-xs font-black px-1.5 py-0.5 rounded-full cursor-pointer bg-slate-100 text-slate-500 hover:text-slate-800"
                    title="Clear search"
                  >
                    &times;
                  </button>
                )}
              </div>
            </div>

          </div>
        </div>

        {/* Full-Width Simulation Cards Grid: 4 Columns on Large/Widescreen Displays */}
        {displayedSims.length > 0 ? (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6 w-full">
              {displayedSims.map(renderCard)}
            </div>
          </div>
        ) : (
            <div 
              className="rounded-2xl p-8 sm:p-12 text-center border shadow-xl transition-all"
              style={{
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                backgroundColor: isDarkMode ? 'rgba(15, 23, 42, 0.92)' : 'rgba(255, 255, 255, 0.95)',
                borderColor: '#a855f7',
                borderWidth: '2px',
                borderStyle: 'solid',
                boxShadow: '0 12px 40px rgba(168, 85, 247, 0.25)'
              }}
            >
              <div className="w-16 h-16 mx-auto rounded-3xl flex items-center justify-center bg-purple-500/20 text-purple-500 mb-4 shadow-lg border border-purple-500/30">
                <Sparkles className="w-8 h-8 animate-pulse text-purple-400" />
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider text-purple-400 bg-purple-500/10 border border-purple-500/30 inline-block mb-2">
                No Pre-Built Simulation Found
              </span>
              <h3 className="text-xl sm:text-2xl font-black" style={{ color: isDarkMode ? '#ffffff' : '#0f172a' }}>
                {searchTerm ? `Synthesize Simulation for "${searchTerm}"` : `No Labs Found`}
              </h3>
              <p className="text-xs sm:text-sm font-bold mt-2 max-w-xl mx-auto leading-relaxed" style={{ color: isDarkMode ? '#cbd5e1' : '#475569' }}>
                Use the Gemini AI generator below to synthesize a live 4K interactive physics canvas and controls on the fly.
              </p>

              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                {searchTerm && (
                  <button
                    disabled={isGeneratingAi}
                    onClick={() => onTriggerAiGeneration && onTriggerAiGeneration(searchTerm.trim())}
                    className="btn-3d px-6 py-3 rounded-xl text-sm font-black text-white cursor-pointer transition-transform hover:scale-105 active:scale-95 flex items-center gap-2 shadow-xl disabled:opacity-50"
                    style={{
                      backgroundColor: '#9333ea',
                      backgroundImage: 'linear-gradient(135deg, #a855f7 0%, #7e22ce 100%)',
                      borderColor: '#c084fc',
                      borderWidth: '1.5px',
                      borderStyle: 'solid',
                      boxShadow: '0 6px 20px rgba(168, 85, 247, 0.4)'
                    }}
                  >
                    {isGeneratingAi ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Synthesizing Simulation with Gemini...</span>
                      </>
                    ) : (
                      <>
                        <Wand2 className="w-4 h-4" />
                        <span>⚡ Synthesize &ldquo;{searchTerm}&rdquo; Lab with Gemini AI</span>
                      </>
                    )}
                  </button>
                )}

                <button
                  onClick={() => {
                    handleCategoryChange('All Simulations');
                    setSearchTerm('');
                  }}
                  className="btn-3d px-4 py-3 rounded-xl text-xs font-black cursor-pointer transition-transform hover:scale-105"
                  style={{
                    backgroundColor: isDarkMode ? '#1e293b' : '#f1f5f9',
                    borderColor: isDarkMode ? '#334155' : '#cbd5e1',
                    borderWidth: '1px',
                    color: isDarkMode ? '#cbd5e1' : '#475569'
                  }}
                >
                  View All Simulations
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
};
