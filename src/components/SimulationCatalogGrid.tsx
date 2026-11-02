import React, { useState, useEffect, useRef } from 'react';
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
  BrainCircuit,
  Target
} from 'lucide-react';

import { openSimulationInNewTab, getSimulationStandaloneUrl } from '../utils/navigation';
import { TopicRealisticIcon } from './TopicRealisticIcon';
import { getThemeForIndex, getLaunchBtnStyle } from '../data/sequentialPalette';
import { ScrollReveal } from './ScrollReveal';

import { 
  MultiStemAllIcon, 
  MultiPhysicsIcon, 
  MultiChemistryIcon, 
  MultiBiologyIcon, 
  MultiEarthSpaceIcon, 
  MultiMathIcon, 
  MultiCompSciIcon, 
  MultiEnglishIcon, 
  MultiEcceIcon, 
  MultiUrduIcon,
  MultiAllGradesIcon,
  MultiPrimaryIcon,
  MultiMiddleIcon,
  MultiSecondaryIcon,
  MultiHigherIcon
} from './ModernStemIcons';

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

// Reusable smooth count-up animation for grade & subject badges
const AnimatedBadgeCounter: React.FC<{
  target: number;
  isVisible: boolean;
  duration?: number;
}> = ({ target, isVisible, duration = 3000 }) => {
  const [displayValue, setDisplayValue] = useState<number>(0);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number | null = null;
    let animationFrameId: number;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Smooth cubic ease-out curve matching QuickStats
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.round(target * easeOut));

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        setDisplayValue(target);
      }
    };

    animationFrameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrameId);
  }, [target, isVisible, duration]);

  return <>{isVisible ? displayValue : 0}</>;
};

// Subject configuration matching "All Simulations" default + all 8 STEM disciplines
interface SubjectCategoryConfig {
  key: string;
  tagLabel: string;
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
    tagLabel: 'ALL DISCIPLINES',
    shortLabel: 'All Simulations',
    fullTitle: 'All Simulations',
    iconBg: 'rgba(56, 189, 248, 0.16)',
    iconBorder: '#0ea5e9',
    activeBorder: '#38bdf8',
    glowColor: 'rgba(14, 165, 233, 0.45)',
    renderIcon: ({ className }) => <MultiStemAllIcon className={className || "w-4 h-4"} />
  },
  {
    key: 'Physics & Motion',
    tagLabel: 'PHYSICS',
    shortLabel: 'Physics & Motion',
    fullTitle: 'Physics & Classical Mechanics',
    iconBg: 'rgba(37, 99, 235, 0.16)',
    iconBorder: '#3b82f6',
    activeBorder: '#60a5fa',
    glowColor: 'rgba(37, 99, 235, 0.45)',
    renderIcon: ({ className }) => <MultiPhysicsIcon className={className || "w-4 h-4"} />
  },
  {
    key: 'Chemistry & Matter',
    tagLabel: 'CHEMISTRY',
    shortLabel: 'Chemistry & Matter',
    fullTitle: 'Chemistry & Molecular Science',
    iconBg: 'rgba(168, 85, 247, 0.16)',
    iconBorder: '#a855f7',
    activeBorder: '#d8b4fe',
    glowColor: 'rgba(147, 51, 234, 0.45)',
    renderIcon: ({ className }) => <MultiChemistryIcon className={className || "w-4 h-4"} />
  },
  {
    key: 'Biology & Life',
    tagLabel: 'BIOLOGY',
    shortLabel: 'Biology & Life',
    fullTitle: 'Biology & Living Systems',
    iconBg: 'rgba(34, 197, 94, 0.16)',
    iconBorder: '#22c55e',
    activeBorder: '#86efac',
    glowColor: 'rgba(22, 163, 74, 0.45)',
    renderIcon: ({ className }) => <MultiBiologyIcon className={className || "w-4 h-4"} />
  },
  {
    key: 'Earth & Space',
    tagLabel: 'EARTH & SPACE',
    shortLabel: 'Earth & Space',
    fullTitle: 'Earth & Space Exploration',
    iconBg: 'rgba(2, 132, 199, 0.16)',
    iconBorder: '#0284c7',
    activeBorder: '#7dd3fc',
    glowColor: 'rgba(2, 132, 199, 0.45)',
    renderIcon: ({ className }) => <MultiEarthSpaceIcon className={className || "w-4 h-4"} />
  },
  {
    key: 'Mathematics & Logic',
    tagLabel: 'MATHEMATICS',
    shortLabel: 'Mathematics & Logic',
    fullTitle: 'Mathematics & Geometry',
    iconBg: 'rgba(245, 158, 11, 0.16)',
    iconBorder: '#f59e0b',
    activeBorder: '#fdba74',
    glowColor: 'rgba(234, 88, 12, 0.45)',
    renderIcon: ({ className }) => <MultiMathIcon className={className || "w-4 h-4"} />
  },
  {
    key: 'Computer Science & IT',
    tagLabel: 'COMP SCIENCE',
    shortLabel: 'Computer Science & IT',
    fullTitle: 'Computer Science & Hardware',
    iconBg: 'rgba(20, 184, 166, 0.16)',
    iconBorder: '#14b8a6',
    activeBorder: '#5eead4',
    glowColor: 'rgba(13, 148, 136, 0.45)',
    renderIcon: ({ className }) => <MultiCompSciIcon className={className || "w-4 h-4"} />
  },
  {
    key: 'English & Grammar',
    tagLabel: 'ENGLISH',
    shortLabel: 'English & Grammar',
    fullTitle: 'English & Spatial Linguistics',
    iconBg: 'rgba(139, 92, 246, 0.16)',
    iconBorder: '#8b5cf6',
    activeBorder: '#c4b5fd',
    glowColor: 'rgba(99, 102, 241, 0.45)',
    renderIcon: ({ className }) => <MultiEnglishIcon className={className || "w-4 h-4"} />
  },
  {
    key: 'Early Childhood (ECCE)',
    tagLabel: 'EARLY CHILDHOOD',
    shortLabel: 'Early Childhood (ECCE)',
    fullTitle: 'Early Childhood Care & Education',
    iconBg: 'rgba(244, 63, 94, 0.16)',
    iconBorder: '#f43f5e',
    activeBorder: '#fecdd3',
    glowColor: 'rgba(244, 63, 94, 0.45)',
    renderIcon: ({ className }) => <MultiEcceIcon className={className || "w-4 h-4"} />
  },
  {
    key: 'Urdu & Linguistics',
    tagLabel: 'URDU LANG',
    shortLabel: 'Urdu & Linguistics',
    fullTitle: 'Urdu Language & Linguistics',
    iconBg: 'rgba(16, 185, 129, 0.16)',
    iconBorder: '#10b981',
    activeBorder: '#6ee7b7',
    glowColor: 'rgba(16, 185, 129, 0.45)',
    renderIcon: ({ className }) => <MultiUrduIcon className={className || "w-4 h-4"} />
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

  // Intersection Observer triggers for smooth count-up on scroll
  const gradeSectionRef = useRef<HTMLDivElement>(null);
  const [isGradeSectionVisible, setIsGradeSectionVisible] = useState<boolean>(false);

  const subjectSectionRef = useRef<HTMLDivElement>(null);
  const [isSubjectSectionVisible, setIsSubjectSectionVisible] = useState<boolean>(false);

  useEffect(() => {
    const el = gradeSectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsGradeSectionVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const el = subjectSectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsSubjectSectionVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const gradeTiers = [
    { key: 'all', label: 'All Grades', shortTag: 'ALL GRADES', desc: 'Pre-K to Grade 12', icon: MultiAllGradesIcon },
    { key: 'primary', label: 'Primary (Grades 1–5)', shortTag: 'GRADES 1–5', desc: 'Foundational STEM & ECCE', icon: MultiPrimaryIcon },
    { key: 'middle', label: 'Middle School (Grades 6–8)', shortTag: 'GRADES 6–8', desc: 'General Sciences & Physics', icon: MultiMiddleIcon },
    { key: 'secondary', label: 'Secondary / Matric (Grades 9–10)', shortTag: 'MATRIC (9–10)', desc: 'Physics, Chemistry, Bio, CS', icon: MultiSecondaryIcon },
    { key: 'higher', label: 'Higher Secondary / F.Sc (Grades 11–12)', shortTag: 'F.SC (11–12)', desc: 'Advanced Mechanics & Calculus', icon: MultiHigherIcon },
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

  const cleanCardTitle = (title: string): string => {
    return title
      .replace(/\.html$/i, '')
      .replace(/_/g, ' ')
      .replace(/\s{2,}/g, ' ')
      .trim();
  };

  const cleanCardTopic = (topic: string): string => {
    return topic
      .replace(/\.html$/i, '')
      .replace(/_/g, ' ')
      .replace(/\s{2,}/g, ' ')
      .trim();
  };

  const cleanGradeBadge = (grade: string): string => {
    return grade.trim();
  };

  const cleanCardSubject = (subject: string): string => {
    return subject
      .replace(/\|\s*GEN\s+Z\s+(?:EDTECH\s+)?INTERACTIVE(?:\s+SIMULATIONS?)?/gi, '')
      .replace(/\s{2,}/g, ' ')
      .trim();
  };

  const cleanCardDescription = (desc: string): string => {
    return desc
      .replace(/\s{2,}/g, ' ')
      .trim();
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

  const SUBJECT_PANELS_CONFIG = [
    {
      key: 'Physics & Motion',
      name: 'Physics & Motion',
      color: '#2563EB',
      tint: 'rgba(37, 99, 235, 0.08)',
      shadow: 'rgba(37, 99, 235, 0.35)',
      icon: MultiPhysicsIcon
    },
    {
      key: 'Chemistry & Matter',
      name: 'Chemistry & Matter',
      color: '#9333EA',
      tint: 'rgba(147, 51, 234, 0.08)',
      shadow: 'rgba(147, 51, 234, 0.35)',
      icon: MultiChemistryIcon
    },
    {
      key: 'Biology & Life',
      name: 'Biology & Life',
      color: '#16A34A',
      tint: 'rgba(22, 163, 74, 0.08)',
      shadow: 'rgba(22, 163, 74, 0.35)',
      icon: MultiBiologyIcon
    },
    {
      key: 'Earth & Space',
      name: 'Earth & Space',
      color: '#0284C7',
      tint: 'rgba(2, 132, 199, 0.08)',
      shadow: 'rgba(2, 132, 199, 0.35)',
      icon: MultiEarthSpaceIcon
    },
    {
      key: 'Mathematics & Logic',
      name: 'Mathematics & Logic',
      color: '#EA580C',
      tint: 'rgba(234, 88, 12, 0.08)',
      shadow: 'rgba(234, 88, 12, 0.35)',
      icon: MultiMathIcon
    },
    {
      key: 'Computer Science & IT',
      name: 'Computer Science & IT',
      color: '#0D9488',
      tint: 'rgba(13, 148, 136, 0.08)',
      shadow: 'rgba(13, 148, 136, 0.35)',
      icon: MultiCompSciIcon
    },
    {
      key: 'English & Grammar',
      name: 'English & Grammar',
      color: '#4F46E5',
      tint: 'rgba(79, 70, 229, 0.08)',
      shadow: 'rgba(79, 70, 229, 0.35)',
      icon: MultiEnglishIcon
    },
    {
      key: 'Early Childhood (ECCE)',
      name: 'Early Childhood (ECCE)',
      color: '#E11D48',
      tint: 'rgba(225, 29, 72, 0.08)',
      shadow: 'rgba(225, 29, 72, 0.35)',
      icon: MultiEcceIcon
    },
    {
      key: 'Urdu & Linguistics',
      name: 'اردو اور لسانیات',
      color: '#059669',
      tint: 'rgba(5, 150, 105, 0.08)',
      shadow: 'rgba(5, 150, 105, 0.35)',
      icon: MultiUrduIcon
    }
  ];

  const getGradeTierStyle = (_tierKey: string, isSelected: boolean) => {
    return {
      btn: isSelected
        ? 'bg-[#1B2A5C] text-white border-2 border-[#1546A8] shadow-md hover:shadow-lg font-black scale-[1.02]'
        : 'bg-[#FFFFFF] hover:bg-[#F5F8FC] text-[#1B2A5C] hover:text-[#1546A8] border border-[#DDE5F3] hover:border-[#CBD5E1] shadow-md hover:shadow-lg font-black',
      badge: isSelected
        ? 'bg-[#1546A8] text-white border border-[#42A5F5] shadow-xs'
        : 'bg-[#EEF3F9] text-[#1565C0] border border-[#DDE5F3] shadow-2xs',
      iconBox: isSelected 
        ? 'bg-white/20 text-white border border-white/30 shadow-xs' 
        : 'bg-[#EEF3F9] text-[#1546A8] border border-[#DDE5F3] shadow-2xs'
    };
  };

  const getSubjectStyle = (_key: string, isSelected: boolean) => {
    return {
      btn: isSelected
        ? 'bg-[#1B2A5C] text-white border-2 border-[#1546A8] shadow-md hover:shadow-lg font-black scale-[1.02]'
        : 'bg-[#FFFFFF] hover:bg-[#F5F8FC] text-[#1B2A5C] hover:text-[#1546A8] border border-[#DDE5F3] hover:border-[#CBD5E1] shadow-md hover:shadow-lg font-black',
      badge: isSelected
        ? 'bg-[#1546A8] text-white border border-[#42A5F5] shadow-xs'
        : 'bg-[#EEF3F9] text-[#1565C0] border border-[#DDE5F3] shadow-2xs',
      iconBox: isSelected 
        ? 'bg-white/20 text-white border border-white/30 shadow-xs' 
        : 'bg-[#EEF3F9] text-[#1546A8] border border-[#DDE5F3] shadow-2xs'
    };
  };

  return (
    <section 
      id="catalog" 
      className="w-full space-y-6 pt-2 scroll-mt-28 opacity-100"
    >

      {/* Tier 1 Curriculum Filter Flow: Grade Level Tabs */}
      <div 
        ref={gradeSectionRef}
        className="relative z-10 shadow-lg rounded-2xl p-5 sm:p-6 transition-all border overflow-hidden"
        style={{
          backgroundImage: `url('/assets/aistudio/WhatsApp_Image_2026-10-30_at_12.56.40_PM_6a76a1bb.jpeg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderColor: '#DDE5F3',
          boxShadow: '0 8px 24px rgba(27, 42, 92, 0.08)'
        }}
      >
        {/* Clean Readable Panel for Heading Row */}
        <div 
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 p-3.5 sm:px-5 sm:py-3 rounded-2xl border shadow-sm relative z-10"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.92)',
            borderColor: '#DDE5F3',
            boxShadow: '0 2px 10px rgba(27, 42, 92, 0.08)'
          }}
        >
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="text-[11px] font-mono font-black uppercase tracking-wider text-white px-3 py-1 rounded-md bg-[#1B2A5C] border border-[#1546A8] shrink-0">
              GRADE FILTER
            </span>
            <span className="text-sm sm:text-base font-black text-[#1B2A5C] font-heading">
              Curriculum Grade &amp; Academic Stage
            </span>
          </div>
          <div className="flex items-center gap-2 flex-wrap text-xs font-semibold text-[#1B2A5C]">
            <span>Aligned with National Curriculum of Pakistan (Session 2026-27)</span>
            {selectedGradeTier !== 'all' && (
              <button 
                type="button"
                onClick={() => handleGradeTierChange('all')}
                className="text-[#1546A8] hover:underline cursor-pointer text-xs font-black ml-1 transition-colors"
                title="Reset grade filter to show all simulations"
              >
                Reset to All {activeSimulations.length} Labs
              </button>
            )}
          </div>
        </div>

        {/* Grade Filter Cards Grid - Strictly styled identical to Top Metric Cards from screenshot */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3.5 sm:gap-4.5 w-full relative z-10">
          {gradeTiers.map((tier, tierIdx) => {
            const isSelectedTier = selectedGradeTier === tier.key;
            const count = getGradeTierCount(tier.key);
            const TierIcon = tier.icon;
            const tierReveal = tierIdx === 0 ? 'reveal-left' : tierIdx === 4 ? 'reveal-right reveal-delay-2' : 'reveal-up reveal-delay-1';

            return (
              <div key={tier.key} className={`${tierReveal} w-full h-full`}>
                <button
                  type="button"
                  onClick={() => handleGradeTierChange(tier.key)}
                  data-grade={tier.key}
                  data-filter={tier.key}
                  className={`p-4 sm:p-5 rounded-2xl border transition-all duration-200 flex items-center justify-between gap-3 text-left w-full group cursor-pointer select-none min-h-[160px] h-full ${
                    isSelectedTier
                      ? 'bg-[#1B2A5C] text-white border-2 border-[#1546A8] shadow-lg ring-2 ring-[#42A5F5]/40 scale-[1.02]'
                      : 'bg-[#FFFFFF] border-[#DDE5F3] shadow-md hover:-translate-y-1 hover:shadow-lg hover:border-[#CBD5E1]'
                  }`}
                  title={`${tier.label}: ${tier.desc}`}
                >
                  <div className="flex-1 min-w-0 pr-1 flex flex-col justify-between self-stretch py-0.5">
                    {/* Dot + Tag */}
                    <div className={`text-[10px] sm:text-[11px] font-black uppercase tracking-wider flex items-center gap-1.5 ${
                      isSelectedTier ? 'text-[#F5A623]' : 'text-[#1E88E5]'
                    }`}>
                      <span className={`w-2.5 h-2.5 rounded-full shadow-xs shrink-0 ${
                        isSelectedTier ? 'bg-[#F5A623]' : 'bg-[#1E88E5]'
                      }`} />
                      <span className="whitespace-nowrap">{tier.shortTag}</span>
                    </div>

                    {/* Large Prominent Counter Number + Complete Grade Title */}
                    <div className="flex flex-col my-1">
                      <span 
                        className={`text-3xl sm:text-4xl lg:text-5xl font-black font-heading tracking-tight leading-none ${
                          isSelectedTier ? 'text-white' : 'text-[#1565C0]'
                        }`}
                      >
                        <AnimatedBadgeCounter 
                          target={count} 
                          isVisible={isGradeSectionVisible} 
                          duration={3000} 
                        />
                      </span>
                      <span className={`text-xs sm:text-[13px] font-black uppercase tracking-tight mt-1 leading-snug whitespace-normal break-words block ${
                        isSelectedTier ? 'text-[#DBE4F7]' : 'text-[#1565C0]'
                      }`}>
                        {tier.label}
                      </span>
                    </div>

                    {/* Bottom Status */}
                    <div className={`text-[11px] font-bold flex items-center gap-1 ${
                      isSelectedTier ? 'text-[#DBE4F7]' : 'text-[#3B4A73]'
                    }`}>
                      <span className="whitespace-nowrap">{count} Labs Available</span>
                      <ArrowRight className={`w-3.5 h-3.5 font-black shrink-0 ${
                        isSelectedTier ? 'text-[#F5A623]' : 'text-[#1E88E5]'
                      }`} />
                    </div>
                  </div>

                  {/* Right Icon Pedestal matching the screenshot */}
                  <div className={`reveal-zoom w-13 h-13 sm:w-15 sm:h-15 rounded-2xl flex items-center justify-center shadow-md shrink-0 ml-1 group-hover:scale-105 transition-transform border p-2 relative z-10 self-center ${
                    isSelectedTier 
                      ? 'bg-white/15 border-white/30 text-white' 
                      : 'bg-white border-[#1546A8] text-[#1B2A5C]'
                  }`}>
                    <TierIcon className="w-7 h-7 sm:w-8 sm:h-8 drop-shadow-sm pointer-events-none" />
                  </div>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Subject Filter Section: Category Buttons */}
      <div 
        ref={subjectSectionRef}
        className="relative z-10 shadow-lg rounded-2xl p-5 sm:p-6 transition-all border"
        style={{
          backgroundColor: '#FFFFFF',
          borderColor: '#DDE5F3',
          boxShadow: '0 8px 24px rgba(27, 42, 92, 0.08)'
        }}
      >
        {/* Clean Readable Panel for Heading Row */}
        <div 
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 p-3.5 sm:px-5 sm:py-3 rounded-2xl border shadow-sm"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.92)',
            borderColor: '#DDE5F3',
            boxShadow: '0 2px 10px rgba(27, 42, 92, 0.08)'
          }}
        >
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="text-[11px] font-mono font-black uppercase tracking-wider text-white px-3 py-1 rounded-md bg-[#1546A8] border border-[#2D62D1] shrink-0">
              STEM SUBJECT FILTER
            </span>
            <span className="text-sm sm:text-base font-black text-[#1B2A5C] font-heading">
              Select Discipline &amp; Learning Track
            </span>
          </div>
          <div className="flex items-center gap-2 flex-wrap text-xs font-semibold text-[#1B2A5C]">
            <span>Filtered for {gradeTiers.find(g => g.key === selectedGradeTier)?.label || 'Selected Grade'}</span>
            {!isAllCategory && (
              <button 
                type="button"
                onClick={() => handleCategoryChange('All Simulations')}
                className="text-[#1546A8] hover:underline cursor-pointer text-xs font-black ml-1 transition-colors"
                title="Reset subject filter to show all simulations"
              >
                Reset to All Subjects
              </button>
            )}
          </div>
        </div>

        {/* Subject Category Cards Grid - Strictly styled identical to Top Metric Cards from screenshot */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3.5 sm:gap-4.5 w-full">
          {subjectCategories.map((cat, catIdx) => {
            const isSelected = selectedCategory === cat.key;
            const count = getCategoryCount(cat.key);
            const col = catIdx % 3;
            const catReveal = col === 0 ? 'reveal-left' : col === 1 ? 'reveal-up reveal-delay-1' : 'reveal-right reveal-delay-2';

            return (
              <div key={cat.key} className={`${catReveal} w-full h-full`}>
                <button
                  type="button"
                  onClick={() => handleCategoryChange(cat.key)}
                  data-subject={cat.key}
                  data-filter={cat.key}
                  className={`p-4 sm:p-5 rounded-2xl border transition-all duration-200 flex items-center justify-between gap-3 text-left w-full group cursor-pointer select-none min-h-[160px] h-full ${
                    isSelected
                      ? 'bg-[#1B2A5C] text-white border-2 border-[#1546A8] shadow-lg ring-2 ring-[#42A5F5]/40 scale-[1.02]'
                      : 'bg-[#FFFFFF] border-[#DDE5F3] shadow-md hover:-translate-y-1 hover:shadow-lg hover:border-[#CBD5E1]'
                  }`}
                  title={`Filter simulations by ${cat.fullTitle} (${count} available)`}
                >
                  <div className="flex-1 min-w-0 pr-1 flex flex-col justify-between self-stretch py-0.5">
                    {/* Dot + Tag */}
                    <div className={`text-[10px] sm:text-[11px] font-black uppercase tracking-wider flex items-center gap-1.5 ${
                      isSelected ? 'text-[#F5A623]' : 'text-[#1E88E5]'
                    }`}>
                      <span 
                        className="w-2.5 h-2.5 rounded-full shadow-xs shrink-0" 
                        style={{ backgroundColor: isSelected ? '#F5A623' : (cat.iconBorder || '#1E88E5') }}
                      />
                      <span className="whitespace-nowrap">{cat.tagLabel}</span>
                    </div>

                    {/* Large Prominent Counter Number + Complete Subject Name */}
                    <div className="flex flex-col my-1">
                      <span 
                        className={`text-3xl sm:text-4xl lg:text-5xl font-black font-heading tracking-tight leading-none ${
                          isSelected ? 'text-white' : 'text-[#1565C0]'
                        }`}
                      >
                        <AnimatedBadgeCounter 
                          target={count} 
                          isVisible={isSubjectSectionVisible} 
                          duration={3000} 
                        />
                      </span>
                      <span className={`text-xs sm:text-[13px] font-black uppercase tracking-tight mt-1 leading-snug whitespace-normal break-words block ${
                        isSelected ? 'text-[#DBE4F7]' : 'text-[#1565C0]'
                      }`}>
                        {cat.shortLabel}
                      </span>
                    </div>

                    {/* Bottom Status */}
                    <div className={`text-[11px] font-bold flex items-center gap-1 ${
                      isSelected ? 'text-[#DBE4F7]' : 'text-[#3B4A73]'
                    }`}>
                      <span className="whitespace-nowrap">{count} Active Labs</span>
                      <ArrowRight className={`w-3.5 h-3.5 font-black shrink-0 ${
                        isSelected ? 'text-[#F5A623]' : 'text-[#1E88E5]'
                      }`} />
                    </div>
                  </div>

                  {/* Right Icon Pedestal matching the screenshot */}
                  <div 
                    className={`reveal-zoom w-13 h-13 sm:w-15 sm:h-15 rounded-2xl flex items-center justify-center shadow-md shrink-0 ml-1 group-hover:scale-105 transition-transform border p-2 relative z-10 self-center ${
                      isSelected 
                        ? 'bg-white/15 border-white/30 text-white' 
                        : 'bg-white text-[#1B2A5C]'
                    }`}
                    style={{
                      borderColor: isSelected ? undefined : (cat.iconBorder || '#1546A8')
                    }}
                  >
                    {cat.renderIcon({ isSelected, className: 'w-7 h-7 sm:w-8 sm:h-8 drop-shadow-sm pointer-events-none' })}
                  </div>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Subject Panels Layout: Replaces the old large simulation cards */}
      <div className="w-full space-y-4">
        {/* Scoped Styles for Horizontal Subject Panels & Horizontal Topic Cards */}
        <style>{`
          .subject-panel-horizontal {
            background-color: #ffffff;
            border-radius: 18px;
            overflow: hidden;
            box-shadow: 0 4px 18px rgba(0, 0, 0, 0.05);
            border: 1px solid rgba(0, 0, 0, 0.08);
            margin-bottom: 24px;
            width: 100%;
            transition: box-shadow 0.2s ease;
          }
          .subject-panel-horizontal:hover {
            box-shadow: 0 8px 26px var(--subject-shadow-color);
          }
          .horizontal-topic-card {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 12px 14px;
            background-color: #ffffff;
            border-radius: 14px;
            border: 1.5px solid #CBD5E1;
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
            text-decoration: none;
            cursor: pointer;
            min-height: 64px;
            box-sizing: border-box;
            text-rendering: geometricPrecision;
            -webkit-font-smoothing: antialiased;
            backface-visibility: hidden;
            transition: transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease, background-color 0.18s ease;
          }
          .horizontal-topic-card:hover {
            transform: translateY(-2px);
            background-color: var(--subject-tint);
            border-color: var(--subject-color);
            box-shadow: 0 6px 18px var(--subject-shadow-color);
          }
          @media (prefers-reduced-motion: reduce) {
            .subject-panel-horizontal, .subject-panel-horizontal:hover,
            .horizontal-topic-card, .horizontal-topic-card:hover {
              transition: none !important;
              transform: none !important;
            }
          }
        `}</style>

        {/* Top Search Bar & Counter */}
        <div 
          className="reveal-up shadow-lg rounded-2xl p-4 sm:p-5 transition-all border"
          style={{
            backgroundColor: '#FFFFFF',
            borderColor: '#DDE5F3',
            boxShadow: '0 8px 24px rgba(27, 42, 92, 0.08)'
          }}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="text-base sm:text-lg font-black tracking-tight text-[#1B2A5C] font-heading">
                {isAllCategory ? 'All STEM Disciplines' : activeSubjectConfig.fullTitle}
              </span>
              <span className="px-3 py-1 rounded-lg text-xs font-bold shadow-xs flex items-center gap-2 bg-[#EEF3F9] text-[#1B2A5C] border border-[#DDE5F3] font-mono">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#1E88E5] shrink-0" />
                {displayedSims.length} Active Simulations
              </span>
              {!isAllCategory && (
                <button
                  type="button"
                  onClick={() => handleCategoryChange('All Simulations')}
                  className="px-2.5 py-1 rounded-lg text-xs font-bold bg-[#EEF3F9] text-[#1E88E5] border border-[#DDE5F3] hover:bg-[#DBE7FB] transition-colors cursor-pointer"
                  title="Show all subjects"
                >
                  Show All Subjects &times;
                </button>
              )}
            </div>

            {/* Quick Search */}
            <div className="w-full sm:w-72 shrink-0">
              <div className="relative flex items-center rounded-xl border border-[#C9D3E6] bg-[#FFFFFF] shadow-inner focus-within:ring-2 focus-within:ring-[#1E88E5]">
                <Search className="w-4 h-4 ml-3.5 shrink-0 text-[#1E88E5]" />
                <input
                  type="text"
                  placeholder="Filter topics by keyword..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full py-2 px-3 text-xs sm:text-sm font-medium bg-transparent outline-none text-[#1B2A5C] placeholder-[#8A97B8] font-sans"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="mr-2 text-xs font-bold px-1.5 py-0.5 rounded-full cursor-pointer bg-[#1E88E5] text-white hover:bg-[#1546A8]"
                    title="Clear search"
                  >
                    &times;
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Horizontal Subject Panels with Horizontal Topic Cards Grid */}
        {displayedSims.length > 0 ? (
          <div className="space-y-6 w-full">
            {SUBJECT_PANELS_CONFIG
              .filter((panel) => {
                if (!isAllCategory) {
                  return panel.key === selectedCategory;
                }
                return true;
              })
              .map((panel, panelIdx) => {
                const panelSims = activeSimulations.filter((sim) => {
                  if (sim.category !== panel.key) return false;
                  if (!matchesGradeTier(sim, selectedGradeTier)) return false;
                  if (!matchesSearch(sim)) return false;
                  return true;
                });

                // If a search is active and this panel has 0 matching sims, omit it
                if (searchTerm && panelSims.length === 0) return null;

                const PanelIcon = panel.icon;
                const panelReveal = panelIdx % 2 === 0 ? 'reveal-left' : 'reveal-right';

                return (
                  <div
                    key={panel.key}
                    className={`subject-panel-horizontal ${panelReveal}`}
                    style={{
                      '--subject-color': panel.color,
                      '--subject-tint': panel.tint,
                      '--subject-shadow-color': panel.shadow
                    } as React.CSSProperties}
                  >
                    {/* Header Bar Across the Top in Subject's Color */}
                    <div
                      className="px-5 py-3.5 sm:py-4 flex items-center justify-between gap-3 text-white select-none flex-wrap"
                      style={{ backgroundColor: panel.color }}
                    >
                      <div className="flex items-center gap-3.5 min-w-0">
                        <div className="w-[36px] h-[36px] flex items-center justify-center shrink-0">
                          <PanelIcon className="w-[36px] h-[36px] text-white pointer-events-none drop-shadow-sm" />
                        </div>
                        <div className="min-w-0">
                          <h3
                            className={`font-bold leading-normal text-white m-0 ${panel.key === 'Urdu & Linguistics' ? 'font-urdu text-[20px] sm:text-[22px]' : 'text-[18px] sm:text-[19px] font-heading leading-tight'}`}
                            dir={panel.key === 'Urdu & Linguistics' ? 'rtl' : undefined}
                          >
                            {panel.name}
                          </h3>
                          <p className="text-[12px] sm:text-[13px] opacity-90 mt-0.5 font-medium leading-none text-white/90">
                            Curriculum Interactive Simulations
                          </p>
                        </div>
                      </div>

                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/20 text-white border border-white/30 backdrop-blur-xs font-mono">
                        {panelSims.length} simulations
                      </span>
                    </div>

                    {/* Horizontal Multi-Column Grid of Topic Cards (Spanning Across Laptop & Desktop) */}
                    <div className="p-4 sm:p-5 bg-slate-50/70 border-t border-black/5">
                          {panelSims.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 w-full">
                              {panelSims.map((sim, cardIdx) => {
                                const displayTitle = cleanCardTitle(sim.title);
                                const isUrdu = sim.category === 'Urdu & Linguistics' || /[\u0600-\u06FF]/.test(sim.title);
                                const col = cardIdx % 3;
                                const cardReveal = col === 0 ? 'reveal-left' : col === 1 ? 'reveal-up reveal-delay-1' : 'reveal-right reveal-delay-2';

                                return (
                                  <div key={sim.id} className={`${cardReveal} w-full h-full`}>
                                    <a
                                      href={getSimulationStandaloneUrl(sim)}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      onClick={(e) => {
                                        e.preventDefault();
                                        handleCardClick(sim);
                                        if (onSelectSim) onSelectSim(sim);
                                      }}
                                      className="horizontal-topic-card group w-full h-full"
                                      title={`Open ${displayTitle} in new tab`}
                                    >
                                      {/* Left: Realistic & Colorful Vector Emblem Tile */}
                                      <div
                                        className="reveal-zoom w-[38px] h-[38px] sm:w-[42px] sm:h-[42px] rounded-xl flex items-center justify-center shrink-0 p-1 bg-white shadow-2xs border border-slate-200/90 group-hover:scale-105 group-hover:border-slate-300 transition-transform duration-150 overflow-hidden"
                                        aria-hidden="true"
                                      >
                                        <TopicRealisticIcon
                                          indexNumber={sim.indexNumber}
                                          simId={sim.id}
                                          className="w-full h-full pointer-events-none drop-shadow-2xs"
                                        />
                                      </div>

                                      {/* Center: Full Topic Title - 100% Fully Visible, No Cutoff, No Truncate, No Overlap */}
                                      <div className="flex-1 min-w-0 pr-1">
                                        <span
                                          className={`font-bold text-slate-900 group-hover:text-[var(--subject-color)] transition-colors block break-words ${isUrdu ? 'font-urdu text-[16px] sm:text-[17px] text-right py-0.5' : 'text-[14px] sm:text-[15px] leading-snug'}`}
                                          dir={isUrdu ? 'rtl' : 'ltr'}
                                          style={{
                                            ...(isUrdu ? { fontFamily: "'Noto Nastaliq Urdu', 'Jameel Noori Nastaleeq', 'Urdu Typesetting', serif", lineHeight: 2.2 } : {})
                                          }}
                                        >
                                          {displayTitle}
                                        </span>
                                      </div>

                                      {/* Right: Subtle Arrow Indicator */}
                                      <div 
                                        className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-slate-400 group-hover:text-[var(--subject-color)] group-hover:bg-[var(--subject-tint)] group-hover:translate-x-0.5 transition-all"
                                        aria-hidden="true"
                                      >
                                        <ArrowRight className="w-4 h-4 shrink-0 font-bold" />
                                      </div>
                                    </a>
                                  </div>
                                );
                              })}
                            </div>
                          ) : (
                            <div className="py-8 text-center text-xs text-slate-400 font-medium">
                              No simulations match filter
                            </div>
                          )}
                        </div>
                      </div>
                    );
              })}
          </div>
        ) : (
          <div 
            className="rounded-2xl p-8 sm:p-12 text-center text-white border shadow-lg transition-all"
            style={{
              background: 'linear-gradient(135deg, #1546A8 0%, #1B2A5C 100%)',
              backgroundColor: '#1B2A5C',
              borderColor: '#F5A623',
              boxShadow: '0 8px 30px rgba(27, 42, 92, 0.45)'
            }}
          >
            <div className="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center bg-[#1546A8] text-[#F5A623] mb-4 border border-[#F5A623]">
              <Sparkles className="w-8 h-8 text-[#F5A623]" />
            </div>
            <span className="px-3 py-1 rounded-md text-xs font-black uppercase tracking-wider text-[#1B2A5C] bg-[#F5A623] border border-[#E58E0A] inline-block mb-2 font-mono">
              No Pre-Built Simulation Found
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              {searchTerm ? `Synthesize Simulation for "${searchTerm}"` : `No Labs Found`}
            </h3>
            <p className="text-xs sm:text-sm font-normal mt-2 max-w-xl mx-auto leading-relaxed text-[#DBE4F7]">
              Use the generator below to synthesize an interactive simulation canvas and controls on the fly.
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              {searchTerm && (
                <button
                  disabled={isGeneratingAi}
                  onClick={() => onTriggerAiGeneration && onTriggerAiGeneration(searchTerm.trim())}
                  className="px-6 py-3 rounded-xl text-sm font-black text-[#1B2A5C] bg-[#F5A623] hover:bg-[#E58E0A] border border-[#E58E0A] cursor-pointer transition-all active:scale-95 flex items-center gap-2 shadow-md disabled:opacity-50"
                >
                  {isGeneratingAi ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-[#1B2A5C]" />
                      <span>Synthesizing Simulation...</span>
                    </>
                  ) : (
                    <>
                      <Wand2 className="w-4 h-4 text-[#1B2A5C]" />
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
                className="px-5 py-3 rounded-xl text-xs font-bold cursor-pointer transition-all bg-[#1546A8] hover:bg-[#1B2A5C] text-[#DBE4F7] border border-[#2D62D1]"
              >
                View All Simulations
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
