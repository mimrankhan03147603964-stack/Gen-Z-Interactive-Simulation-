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

  // Render a simulation card fully filled with the rich crimson, terracotta & amber palette
  const renderCard = (sim: SimulationItem) => {
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
        className={`rounded-2xl p-5 flex flex-col justify-between relative overflow-hidden group cursor-pointer select-none transition-all duration-200 border text-white ${
          isActive 
            ? 'ring-3 ring-[#7BBDE8] border-[#7BBDE8] shadow-xl scale-[1.01]' 
            : 'hover:-translate-y-1 hover:shadow-2xl hover:border-[#7BBDE8]'
        }`}
        style={{
          background: 'linear-gradient(145deg, #0A4174 0%, #001D39 60%, #001224 100%)',
          backgroundColor: '#001D39',
          borderColor: '#4E8EA2',
          boxShadow: '0 8px 25px rgba(0, 29, 57, 0.7)'
        }}
      >
        {/* Top Header: Visual Emblem Pedestal & LAB Badge Row */}
        <div className="flex items-center justify-between gap-3 relative z-10 pt-1">
          {/* Realistic Visual Emblem Pedestal (Icons 100% Untouched) */}
          <a
            href={getSimulationStandaloneUrl(sim)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center shrink-0 p-1.5 group-hover:scale-105 transition-transform block bg-[#001D39] border border-[#4E8EA2] shadow-sm"
            title={`Open ${displayTitle} in new tab`}
          >
            <TopicRealisticIcon 
              indexNumber={sim.indexNumber} 
              simId={sim.id} 
              className="w-9 h-9 sm:w-10 sm:h-10 group-hover:scale-110 transition-transform duration-200 pointer-events-none shrink-0" 
            />
          </a>

          {/* Lab / Concept Badge */}
          <span 
            className="font-mono text-xs font-black px-3 py-1 rounded-full bg-[#4E8EA2] text-white border border-[#7BBDE8] shrink-0 tracking-wide shadow-xs"
          >
            {isConceptGuide ? 'CONCEPT GUIDE' : `LAB ${sim.indexNumber}`}
          </span>
        </div>

        {/* Dedicated Grade / Class Level Area */}
        <div className="relative z-10 mt-2.5 mb-2.5 flex items-center">
          <span 
            className="text-[11px] font-bold px-3 py-1 rounded-full font-mono bg-[#0A4174] text-[#BDD8E9] border border-[#4E8EA2] leading-normal inline-block max-w-full break-words text-left shadow-2xs"
            title={displayGrade}
          >
            {displayGrade}
          </span>
        </div>

        {/* Content: Title, Subject, Description, Topics */}
        <div className="relative z-10 flex-1 flex flex-col">
          {/* Simulation Topic Title in Crisp Pure White */}
          <h4 
            className={`text-base sm:text-lg font-bold tracking-tight text-white ${
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
              className="hover:text-[#7BBDE8] transition-colors"
              title={`Open ${displayTitle} in new tab`}
            >
              {displayTitle}
            </a>
          </h4>

          {/* Subject & Sub-discipline */}
          <p className="text-xs font-bold mt-1.5 line-clamp-1 flex items-center gap-1.5 text-[#7BBDE8]">
            <span className="w-2 h-2 rounded-full bg-[#7BBDE8] inline-block shrink-0" />
            <span className="text-[#7BBDE8] font-bold">{displaySubject}</span>
          </p>

          {/* Concept Description in Soft Pale Blue Text */}
          <div className="mt-2">
            <p 
              className={`text-xs sm:text-[13px] font-normal text-[#BDD8E9] leading-relaxed ${
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
                className="mt-1 text-[11px] font-bold text-[#7BBDE8] hover:underline cursor-pointer inline-flex items-center gap-1 transition-colors"
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

          {/* Topic Tags */}
          <div className="flex flex-wrap gap-1.5 mt-3">
            {sim.topics.slice(0, 2).map((topic, i) => {
              const cleanT = cleanCardTopic(topic, sim.category);
              const isTopicUrdu = /[\u0600-\u06FF]/.test(cleanT);
              return (
                <span
                  key={i}
                  className={`text-[11px] font-medium px-2.5 py-0.5 rounded-md truncate max-w-[150px] bg-[#001D39] text-[#BDD8E9] border border-[#4E8EA2] font-mono ${
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
                className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-[#0A4174] text-[#BDD8E9] border border-[#4E8EA2] font-mono"
              >
                +{sim.topics.length - 2}
              </span>
            )}
          </div>
        </div>

        {/* Card Action Bar */}
        <div className="relative z-10 pt-4 mt-auto border-t border-[#0A4174] flex items-center justify-between gap-2">
          {/* Main Action Button: Ocean Slate Button with Crisp White Text */}
          <a
            href={getSimulationStandaloneUrl(sim)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="bg-[#4E8EA2] hover:bg-[#6EA2B3] text-white px-4 py-2.5 rounded-xl text-xs sm:text-sm font-black flex items-center gap-2 cursor-pointer shadow-md border border-[#7BBDE8] transition-all transform active:scale-95"
            title={isConceptGuide ? "Explore Detailed Pedagogical Concept Guide in New Tab" : "Launch Detailed Simulation Lab in New Tab"}
          >
            <ExternalLink className="w-3.5 h-3.5 text-white pointer-events-none shrink-0" />
            <span className="text-white font-black">{isConceptGuide ? 'Explore Concept' : 'Launch Lab'}</span>
          </a>

          {/* Direct Fullscreen Modal Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onLaunchFullscreenModal(sim);
            }}
            className="w-10 h-10 rounded-xl bg-[#0A4174] hover:bg-[#001D39] text-[#7BBDE8] border border-[#4E8EA2] transition-all cursor-pointer flex items-center justify-center shadow-xs active:scale-95"
            title="Launch in Fullscreen View"
          >
            <Maximize2 className="w-4 h-4 text-[#7BBDE8] pointer-events-none shrink-0" />
          </button>
        </div>
      </div>
    );
  };

  const getGradeTierStyle = (_tierKey: string, isSelected: boolean) => {
    return {
      btn: isSelected
        ? 'bg-[#4E8EA2] text-white border-2 border-[#7BBDE8] shadow-md font-black scale-[1.02]'
        : 'bg-[#0A4174] hover:bg-[#001D39] text-[#BDD8E9] hover:text-white border border-[#4E8EA2] shadow-sm font-bold',
      badge: isSelected
        ? 'bg-[#001D39] text-[#7BBDE8] font-mono font-bold border border-[#7BBDE8]'
        : 'bg-[#001D39] text-[#BDD8E9] font-mono font-bold border border-[#4E8EA2]',
      iconBox: isSelected ? 'bg-white/20 text-white' : 'bg-transparent text-[#7BBDE8]'
    };
  };

  const getSubjectStyle = (_key: string, isSelected: boolean) => {
    return {
      btn: isSelected
        ? 'bg-[#4E8EA2] text-white border-2 border-[#7BBDE8] shadow-md font-black scale-[1.02]'
        : 'bg-[#0A4174] hover:bg-[#001D39] text-[#BDD8E9] hover:text-white border border-[#4E8EA2] shadow-sm font-bold',
      badge: isSelected
        ? 'bg-[#001D39] text-[#7BBDE8] font-mono font-bold border border-[#7BBDE8]'
        : 'bg-[#001D39] text-[#BDD8E9] font-mono font-bold border border-[#4E8EA2]',
      iconBox: isSelected ? 'bg-white/20 text-white' : 'bg-transparent text-[#7BBDE8]'
    };
  };

  return (
    <section 
      id="catalog" 
      className="w-full space-y-6 pt-2 scroll-mt-28 opacity-100"
    >
      {/* If Dedicated Catalog View: Show Top Back Navigation Header */}
      {!isHomeView && (
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <button
            type="button"
            onClick={onBackToHome}
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl text-xs sm:text-sm font-sans font-bold text-white bg-[#4E8EA2] hover:bg-[#6EA2B3] border border-[#7BBDE8] shadow-md transition-all cursor-pointer shrink-0 active:scale-95"
            title="Return to Main Home Screen"
          >
            <Home className="w-4 h-4 text-white pointer-events-none shrink-0" />
            <span className="font-heading tracking-wide uppercase font-bold text-white">
              BACK TO HOME
            </span>
          </button>
          
          <div 
            className="rounded-xl p-2.5 sm:p-3 flex items-center gap-2.5 sm:gap-3 flex-wrap shadow-md border"
            style={{
              backgroundColor: '#001D39',
              borderColor: '#4E8EA2'
            }}
          >
            <span className="px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-bold bg-[#0A4174] text-[#BDD8E9] border border-[#4E8EA2]">
              Discipline: {isAllCategory ? 'All Disciplines' : activeSubjectConfig.fullTitle}
            </span>
            <span className="px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-bold bg-[#0A4174] text-[#BDD8E9] border border-[#4E8EA2]">
              Grade: {gradeTiers.find(g => g.key === selectedGradeTier)?.label || 'All Grades'}
            </span>
            <span className="px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-black bg-[#4E8EA2] text-white border border-[#7BBDE8]">
              {displayedSims.length} Labs Available
            </span>
          </div>
        </div>
      )}

      {/* Tier 1 Curriculum Filter Flow: Grade Level Tabs */}
      <div 
        className="relative z-10 shadow-lg rounded-2xl p-5 sm:p-6 text-white transition-all border"
        style={{
          background: 'linear-gradient(135deg, #0A4174 0%, #001D39 100%)',
          backgroundColor: '#001D39',
          borderColor: '#4E8EA2',
          boxShadow: '0 8px 30px rgba(0, 29, 57, 0.65)'
        }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 mb-4">
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="text-[11px] font-mono font-black uppercase tracking-wider text-white px-3 py-1 rounded-md bg-[#4E8EA2] border border-[#7BBDE8] shrink-0">
              GRADE FILTER
            </span>
            <span className="text-sm sm:text-base font-bold text-white font-heading">
              Curriculum Grade &amp; Academic Stage
            </span>
          </div>
          <div className="flex items-center gap-2 flex-wrap text-xs font-normal text-[#BDD8E9]">
            <span>Aligned with National Curriculum of Pakistan (Session 2026-27)</span>
            {selectedGradeTier !== 'all' && (
              <button 
                type="button"
                onClick={() => handleGradeTierChange('all')}
                className="text-[#7BBDE8] hover:underline cursor-pointer text-xs font-bold ml-1 transition-colors"
                title="Reset grade filter to show all simulations"
              >
                Reset to All {activeSimulations.length} Labs
              </button>
            )}
          </div>
        </div>

        {/* Grade Filter Buttons */}
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
                className={`inline-flex items-center gap-2.5 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-sans transition-all duration-150 cursor-pointer select-none shadow-xs hover:-translate-y-0.5 active:translate-y-0 shrink-0 max-w-full ${style.btn}`}
                title={`${tier.label}: ${tier.desc}`}
              >
                <div className={`shrink-0 w-6 h-6 flex items-center justify-center rounded-lg p-1 ${style.iconBox}`}>
                  <TierIcon className="w-4 h-4 pointer-events-none shrink-0" />
                </div>
                <span className="font-heading font-bold tracking-normal whitespace-nowrap">{tier.label}</span>
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

      {/* Subject Filter Section: Category Buttons */}
      <div 
        className="relative z-10 shadow-lg rounded-2xl p-5 sm:p-6 text-white transition-all border"
        style={{
          background: 'linear-gradient(135deg, #0A4174 0%, #001D39 100%)',
          backgroundColor: '#001D39',
          borderColor: '#4E8EA2',
          boxShadow: '0 8px 30px rgba(0, 29, 57, 0.65)'
        }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 mb-4">
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="text-[11px] font-mono font-black uppercase tracking-wider text-white px-3 py-1 rounded-md bg-[#4E8EA2] border border-[#7BBDE8] shrink-0">
              STEM SUBJECT FILTER
            </span>
            <span className="text-sm sm:text-base font-bold text-white font-heading">
              Select Discipline &amp; Learning Track
            </span>
          </div>
          <div className="flex items-center gap-2 flex-wrap text-xs font-normal text-[#BDD8E9]">
            <span>Filtered for {gradeTiers.find(g => g.key === selectedGradeTier)?.label || 'Selected Grade'}</span>
            {!isAllCategory && (
              <button 
                type="button"
                onClick={() => handleCategoryChange('All Simulations')}
                className="text-[#7BBDE8] hover:underline cursor-pointer text-xs font-bold ml-1 transition-colors"
                title="Reset subject filter to show all simulations"
              >
                Reset to All Subjects
              </button>
            )}
          </div>
        </div>

        {/* Subject Category Buttons */}
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
                className={`inline-flex items-center gap-2.5 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-sans transition-all duration-150 cursor-pointer select-none shadow-xs hover:-translate-y-0.5 active:translate-y-0 shrink-0 max-w-full ${style.btn}`}
                title={`Filter simulations by ${cat.fullTitle} (${count} available)`}
              >
                <div className={`shrink-0 w-6 h-6 flex items-center justify-center rounded-lg p-1 ${style.iconBox}`}>
                  {cat.renderIcon({ isSelected, className: 'w-4 h-4 pointer-events-none' })}
                </div>
                <span className="font-heading font-bold tracking-normal whitespace-nowrap">{cat.shortLabel}</span>
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

      {/* IF HOME VIEW: Render Clean Navigation Callout */}
      {isHomeView ? (
        <div 
          className="relative z-10 p-6 sm:p-7 rounded-2xl shadow-lg border text-white flex flex-col lg:flex-row items-center justify-between gap-6 select-none"
          style={{
            background: 'linear-gradient(135deg, #0A4174 0%, #001D39 100%)',
            backgroundColor: '#001D39',
            borderColor: '#4E8EA2',
            boxShadow: '0 8px 30px rgba(0, 29, 57, 0.65)'
          }}
        >
          <div className="space-y-2 text-center lg:text-left flex-1 min-w-0">
            <div className="flex items-center gap-2 justify-center lg:justify-start">
              <span className="inline-flex items-center gap-1.5 text-xs font-mono font-black uppercase tracking-wider text-white px-3.5 py-1 rounded-md bg-[#4E8EA2] border border-[#7BBDE8]">
                <Sparkles className="w-3.5 h-3.5 text-white" />
                LABORATORY WORKSPACE
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white font-heading tracking-tight leading-snug">
              Click Any Grade or Subject Above to Open Interactive Labs
            </h3>
            <p className="text-xs sm:text-sm text-[#BDD8E9] font-normal leading-relaxed max-w-2xl">
              Select any curriculum grade tier or STEM discipline above to view dedicated simulation laboratories in a high-contrast, distraction-free environment.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onOpenCatalog && onOpenCatalog('All Simulations', 'all')}
            className="relative z-20 px-6 sm:px-7 py-3.5 sm:py-4 rounded-xl text-sm sm:text-base font-sans font-black text-white bg-[#4E8EA2] hover:bg-[#6EA2B3] border border-[#7BBDE8] shadow-md transition-all cursor-pointer shrink-0 whitespace-nowrap flex items-center gap-3 active:scale-95"
            title="Open Complete STEM Simulations Catalog"
          >
            <BookOpen className="w-5 h-5 text-white pointer-events-none shrink-0" />
            <span className="font-heading tracking-wider uppercase font-black text-white">
              OPEN ALL {activeSimulations.length} LABS CATALOG
            </span>
            <ArrowRight className="w-5 h-5 text-white pointer-events-none shrink-0" />
          </button>
        </div>
      ) : (
        /* Dedicated Full-Width Simulation Catalog Main Content (Only shown in Catalog View) */
        <div className="w-full space-y-6">
        
        {/* Top Breadcrumb & Quick Search Filter Bar */}
        <div 
          className="shadow-lg rounded-2xl p-5 sm:p-6 transition-all text-white border"
          style={{
            background: 'linear-gradient(135deg, #0A4174 0%, #001D39 100%)',
            backgroundColor: '#001D39',
            borderColor: '#4E8EA2',
            boxShadow: '0 8px 30px rgba(0, 29, 57, 0.65)'
          }}
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            {/* Breadcrumb & Subject Header */}
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-medium text-[#BDD8E9] flex-wrap">
                <span 
                  onClick={() => handleCategoryChange('All Simulations')}
                  className="cursor-pointer hover:underline text-[#7BBDE8] font-bold"
                >
                  Interactive Catalog
                </span>
                <span>&gt;</span>
                <span className="text-white font-bold">
                  {isAllCategory ? 'All Simulations' : activeSubjectConfig.fullTitle}
                </span>
              </div>

              <div className="flex items-center gap-2.5 flex-wrap">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight text-white font-heading">
                  {isAllCategory ? 'All STEM Simulations' : activeSubjectConfig.fullTitle}
                </h2>
                {!isAllCategory && (
                  <button
                    type="button"
                    onClick={() => handleCategoryChange('All Simulations')}
                    className="px-3 py-1 rounded-lg text-xs font-bold bg-[#0A4174] text-[#7BBDE8] border border-[#4E8EA2] flex items-center gap-1.5 cursor-pointer hover:bg-[#001D39] transition-colors shadow-xs"
                    title="Reset discipline filter to show all simulations"
                  >
                    <span>Filter: {activeSubjectConfig.fullTitle}</span>
                    <span className="font-bold text-sm">&times;</span>
                  </button>
                )}
                <span className="px-3.5 py-1.5 rounded-lg text-xs font-bold shadow-xs flex items-center gap-2 bg-[#0A4174] text-[#BDD8E9] border border-[#4E8EA2] font-mono">
                  <CheckCircle2 className="w-4 h-4 text-[#7BBDE8] shrink-0" />
                  {displayedSims.length === activeSimulations.length
                    ? `Showing All ${activeSimulations.length} Verified Labs`
                    : `Showing ${displayedSims.length} of ${activeSimulations.length} Total Labs`}
                </span>
              </div>
            </div>

            {/* Quick Search Bar to Filter Labs Instantly */}
            <div className="w-full md:w-80 shrink-0">
              <div 
                className="relative flex items-center rounded-xl border border-[#4E8EA2] bg-[#001224] shadow-inner focus-within:ring-2 focus-within:ring-[#7BBDE8]"
              >
                <Search className="w-4 h-4 ml-3.5 shrink-0 text-[#7BBDE8]" />
                <input
                  type="text"
                  placeholder="Search labs across disciplines..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full py-2.5 px-3 text-xs sm:text-sm font-medium bg-transparent outline-none text-white placeholder-[#BDD8E9] font-sans"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="mr-2 text-xs font-bold px-1.5 py-0.5 rounded-full cursor-pointer bg-[#4E8EA2] text-white hover:bg-[#6EA2B3]"
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
              className="rounded-2xl p-8 sm:p-12 text-center text-white border shadow-lg transition-all"
              style={{
                background: 'linear-gradient(135deg, #0A4174 0%, #001D39 100%)',
                backgroundColor: '#001D39',
                borderColor: '#4E8EA2',
                boxShadow: '0 8px 30px rgba(0, 29, 57, 0.65)'
              }}
            >
              <div className="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center bg-[#0A4174] text-[#7BBDE8] mb-4 border border-[#4E8EA2]">
                <Sparkles className="w-8 h-8 text-[#7BBDE8]" />
              </div>
              <span className="px-3 py-1 rounded-md text-xs font-black uppercase tracking-wider text-white bg-[#4E8EA2] border border-[#7BBDE8] inline-block mb-2 font-mono">
                No Pre-Built Simulation Found
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                {searchTerm ? `Synthesize Simulation for "${searchTerm}"` : `No Labs Found`}
              </h3>
              <p className="text-xs sm:text-sm font-normal mt-2 max-w-xl mx-auto leading-relaxed text-[#BDD8E9]">
                Use the generator below to synthesize an interactive simulation canvas and controls on the fly.
              </p>

              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                {searchTerm && (
                  <button
                    disabled={isGeneratingAi}
                    onClick={() => onTriggerAiGeneration && onTriggerAiGeneration(searchTerm.trim())}
                    className="px-6 py-3 rounded-xl text-sm font-black text-white bg-[#4E8EA2] hover:bg-[#6EA2B3] border border-[#7BBDE8] cursor-pointer transition-all active:scale-95 flex items-center gap-2 shadow-md disabled:opacity-50"
                  >
                    {isGeneratingAi ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-white" />
                        <span>Synthesizing Simulation...</span>
                      </>
                    ) : (
                      <>
                        <Wand2 className="w-4 h-4 text-white" />
                        <span>Synthesize &ldquo;{searchTerm}&rdquo; Lab</span>
                      </>
                    )}
                  </button>
                )}

                <button
                  onClick={() => {
                    handleCategoryChange('All Simulations');
                    setSearchTerm('');
                  }}
                  className="px-5 py-3 rounded-xl text-xs font-bold cursor-pointer transition-all bg-[#0A4174] hover:bg-[#001D39] text-[#7BBDE8] border border-[#4E8EA2]"
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
