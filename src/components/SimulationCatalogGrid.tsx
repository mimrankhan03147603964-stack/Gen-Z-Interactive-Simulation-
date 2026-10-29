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
}> = ({ target, isVisible, duration = 1800 }) => {
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
    renderIcon: ({ className }) => <MultiStemAllIcon className={className || "w-4 h-4"} />
  },
  {
    key: 'Physics & Motion',
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
    { key: 'all', label: 'All Grades', short: 'All', desc: 'Pre-K to Grade 12', icon: MultiAllGradesIcon },
    { key: 'primary', label: 'Primary (Grades 1–5)', short: 'Grades 1–5', desc: 'Foundational STEM & ECCE', icon: MultiPrimaryIcon },
    { key: 'middle', label: 'Middle School (Grades 6–8)', short: 'Grades 6–8', desc: 'General Sciences & Physics', icon: MultiMiddleIcon },
    { key: 'secondary', label: 'Secondary / Matric (Grades 9–10)', short: 'Matric (9–10)', desc: 'Physics, Chemistry, Bio, CS', icon: MultiSecondaryIcon },
    { key: 'higher', label: 'Higher Secondary / F.Sc (Grades 11–12)', short: 'F.Sc (11–12)', desc: 'Advanced Mechanics & Calculus', icon: MultiHigherIcon },
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

  // Helper functions matching uploaded card screenshot aesthetic
  const getPastelTagStyle = (index: number) => {
    const styles = [
      'bg-[#DCFCE7] text-[#166534] border-[#BBF7D0]',
      'bg-[#FFEDD5] text-[#9A3412] border-[#FED7AA]',
      'bg-[#F3E8FF] text-[#6B21A8] border-[#E9D5FF]',
      'bg-[#E0F2FE] text-[#0369A1] border-[#BAE6FD]',
    ];
    return styles[index % styles.length];
  };

  const formatShortGrade = (grade: string): { primary: string; secondary?: string } => {
    let clean = grade
      .replace(/Cambridge\s+Scholar\s*/gi, '')
      .trim();

    if (/Secondary School SSC-I|SSC-I|Grade 9\b/i.test(clean)) {
      return { primary: 'Grade 9', secondary: 'SSC-I' };
    }
    if (/Secondary School SSC-II|SSC-II|Grade 10\b/i.test(clean)) {
      return { primary: 'Grade 10', secondary: 'SSC-II' };
    }
    if (/HSSC-I|Grade 11\b/i.test(clean)) {
      return { primary: 'Grade 11', secondary: 'HSSC-I' };
    }
    if (/HSSC-II|Grade 12\b/i.test(clean)) {
      return { primary: 'Grade 12', secondary: 'HSSC-II' };
    }
    if (/Middle/i.test(clean) && /Secondary/i.test(clean)) {
      return { primary: 'Middle', secondary: 'Secondary' };
    }
    if (/Secondary/i.test(clean) && /Higher/i.test(clean)) {
      return { primary: 'Secondary', secondary: 'Higher Sec' };
    }
    if (/Primary/i.test(clean)) {
      return { primary: 'Primary', secondary: 'Grades 1-5' };
    }
    if (/Middle/i.test(clean)) {
      return { primary: 'Middle', secondary: 'Grades 6-8' };
    }
    if (/Secondary/i.test(clean)) {
      return { primary: 'Secondary', secondary: 'Grades 9-10' };
    }
    if (/Higher/i.test(clean)) {
      return { primary: 'Higher Sec', secondary: 'Grades 11-12' };
    }
    if (/ECCE|Early/i.test(clean)) {
      return { primary: 'ECCE', secondary: 'Early Years' };
    }

    const parts = clean.split(/[•·/]/).map(p => p.trim()).filter(Boolean);
    if (parts.length >= 2) {
      return { 
        primary: parts[0].slice(0, 10), 
        secondary: parts[1].slice(0, 12) 
      };
    }
    return { primary: clean.slice(0, 16) };
  };

  const renderGradePill = (grade: string) => {
    const g = formatShortGrade(grade);
    if (g.secondary) {
      return (
        <div className="inline-flex items-center rounded-full overflow-hidden text-[11px] font-bold font-sans shadow-2xs border border-[#E2E8F0] shrink-0 max-w-[190px]">
          <span className="px-2.5 py-0.5 bg-[#FEE2E2] text-[#991B1B] truncate">
            {g.primary}
          </span>
          <span className="px-2.5 py-0.5 bg-[#E0F2FE] text-[#0369A1] truncate">
            {g.secondary}
          </span>
        </div>
      );
    }
    return (
      <div className="inline-flex items-center rounded-full overflow-hidden text-[11px] font-bold font-sans shadow-2xs border border-[#BFDBFE] shrink-0 max-w-[190px]">
        <span className="px-2.5 py-0.5 bg-[#EFF6FF] text-[#1E40AF] truncate">
          {g.primary}
        </span>
      </div>
    );
  };

  const formatShortTopic = (topic: string): string => {
    let t = topic
      .replace(/\.html$/i, '')
      .replace(/_/g, ' ')
      .replace(/\(.*?\)/g, '')
      .replace(/Experiment|Investigation|Demonstration|Simulation|Laboratory|Theory|Classical|Maxwell|Defects\s+in/gi, '')
      .replace(/\s{2,}/g, ' ')
      .trim();

    if (/[\u0600-\u06FF]/.test(t)) {
      return t.length > 16 ? t.substring(0, 14) + '…' : t;
    }

    const words = t.split(/\s+/).filter(Boolean);
    if (words.length > 2) {
      t = words.slice(0, 2).join(' ');
    }
    if (t.length > 16) {
      t = t.substring(0, 14) + '…';
    }
    return t || 'Topic';
  };

  // Generate concise, high-impact learning objectives from curriculum topics
  const getLearningObjectives = (sim: SimulationItem): string[] => {
    if (sim.topics && sim.topics.length > 0) {
      const actionVerbs = ['Understand', 'Analyze', 'Investigate', 'Explore', 'Examine', 'Master'];
      return sim.topics.slice(0, 3).map((topic, idx) => {
        const cleanT = cleanCardTopic(topic);
        if (/[\u0600-\u06FF]/.test(cleanT)) {
          return cleanT;
        }
        if (/^(understand|explore|investigate|analyze|calculate|observe|learn|study|master|identify)/i.test(cleanT)) {
          return cleanT;
        }
        const verb = actionVerbs[idx % actionVerbs.length];
        return `${verb} ${cleanT}`;
      });
    }
    return [
      `Master core principles of ${cleanCardSubject(sim.subject)}`,
      'Investigate variables and real-time interactive parameters',
      'Observe cause-and-effect scientific outcomes'
    ];
  };

  const renderObjectivesTooltip = (sim: SimulationItem) => {
    const objectives = getLearningObjectives(sim);
    const displayTitle = cleanCardTitle(sim.title);
    const isUrdu = sim.category === 'Urdu & Linguistics' || /[\u0600-\u06FF]/.test(sim.title);

    return (
      <div className="relative group/tip z-30">
        {/* Objectives Badge / Trigger */}
        <div
          tabIndex={0}
          role="button"
          aria-label={`View learning objectives for ${displayTitle}`}
          className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#FEF3C7] hover:bg-[#FDE68A] text-[#92400E] border border-[#FCD34D] shadow-2xs transition-all cursor-help group-hover/tip:border-[#F59E0B] group-hover/tip:shadow-xs"
        >
          <Target className="w-3 h-3 text-[#D97706] shrink-0" />
          <span className="font-heading">Objectives</span>
        </div>

        {/* Hover-Triggered Floating Tooltip */}
        <div
          role="tooltip"
          className="absolute bottom-[calc(100%+8px)] right-0 w-72 sm:w-80 p-3.5 rounded-2xl bg-[#0F172A] text-white border border-[#334155] shadow-2xl pointer-events-none opacity-0 invisible translate-y-1 group-hover/tip:opacity-100 group-hover/tip:visible group-hover/tip:translate-y-0 transition-all duration-200 z-50 text-left"
          style={{
            boxShadow: '0 20px 30px -10px rgba(15, 23, 42, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.1)'
          }}
        >
          {/* Arrow Notch */}
          <div className="absolute -bottom-1.5 right-5 w-3 h-3 bg-[#0F172A] border-r border-b border-[#334155] rotate-45" />

          {/* Tooltip Header */}
          <div className="flex items-center justify-between gap-2 pb-2 mb-2 border-b border-slate-700/80">
            <div className="flex items-center gap-1.5">
              <Target className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span className="text-[11px] font-black uppercase tracking-wider text-amber-400 font-mono">
                Learning Objectives
              </span>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
              {sim.category.split('&')[0].trim()}
            </span>
          </div>

          {/* Simulation Title in Tooltip */}
          <p className="text-xs font-black text-white line-clamp-1 mb-2 font-heading">
            {displayTitle}
          </p>

          {/* Bulleted Learning Outcomes */}
          <div className="space-y-1.5 mb-2.5">
            {objectives.map((obj, i) => (
              <div key={i} className="flex items-start gap-1.5 text-xs leading-snug text-slate-200">
                <span className="text-emerald-400 font-bold shrink-0 mt-0.5">✓</span>
                <span className={isUrdu && /[\u0600-\u06FF]/.test(obj) ? 'font-urdu' : ''}>{obj}</span>
              </div>
            ))}
          </div>

          {/* Footer Highlights */}
          <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-400 font-medium">
            <span className="flex items-center gap-1 text-emerald-400 font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 animate-ping" />
              Verified STEM Concepts
            </span>
            <span className="text-amber-300 font-mono font-bold">Launch Lab ↗</span>
          </div>
        </div>
      </div>
    );
  };

  // Render a simulation card matching the screenshot layout & high-definition button aesthetics
  const renderCard = (sim: SimulationItem, _cardIndex: number) => {
    const isActive = activeSim ? activeSim.id === sim.id : false;
    const isConceptGuide = sim.id === 'sim-ecce-curriculum-learning-areas';
    const displayTitle = cleanCardTitle(sim.title);
    const displayGrade = cleanGradeBadge(sim.gradeLevel);
    const displaySubject = cleanCardSubject(sim.subject);
    const displayDesc = cleanCardDescription(sim.description);
    const objectives = getLearningObjectives(sim);

    const isUrdu = sim.category === 'Urdu & Linguistics' || /[\u0600-\u06FF]/.test(sim.title);
    const parsedNum = parseInt(sim.indexNumber, 10);
    const colorIdx = !isNaN(parsedNum) && parsedNum > 0 ? (parsedNum - 1) : _cardIndex;
    const cardLaunchBtnStyle = getLaunchBtnStyle(colorIdx);

    return (
      <div
        key={sim.id}
        onClick={(e) => {
          if ((e.target as HTMLElement).closest('button') || (e.target as HTMLElement).closest('a')) return;
          handleCardClick(sim);
        }}
        className={`rounded-3xl p-5 sm:p-5.5 flex flex-col justify-between relative overflow-hidden group/card select-none transition-all duration-200 border bg-[#F8FAFC] border-[#E2E8F0] shadow-sm hover:-translate-y-1 hover:shadow-xl hover:border-[#CBD5E1] h-full ${
          isActive ? 'ring-3 ring-[#0284C7] shadow-xl scale-[1.01]' : ''
        }`}
      >
        {/* Top Header: Visual Emblem Pedestal & LAB Badge Row */}
        <div className="flex items-center justify-between gap-2.5 relative z-10 pt-0.5">
          {/* Realistic Visual Emblem Pedestal */}
          <a
            href={getSimulationStandaloneUrl(sim)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center shrink-0 p-1.5 group-hover:scale-105 transition-transform block border border-[#E2E8F0] bg-[#EEF5F8] shadow-2xs"
            title={`Open ${displayTitle} in new tab`}
          >
            <TopicRealisticIcon 
              indexNumber={sim.indexNumber} 
              simId={sim.id} 
              className="w-8 h-8 sm:w-9 sm:h-9 group-hover:scale-110 transition-transform duration-200 pointer-events-none shrink-0" 
            />
          </a>

          {/* Lab / Concept Badge (Deep Indigo Pill from Screenshot) */}
          <span 
            className="font-mono text-xs font-black px-3.5 py-1 rounded-full border border-indigo-900/30 text-white bg-[#312E81] shrink-0 tracking-wider uppercase shadow-xs"
          >
            {isConceptGuide ? 'CONCEPT GUIDE' : `LAB ${sim.indexNumber}`}
          </span>
        </div>

        {/* Dedicated Grade / Class Level Area & Objectives Trigger */}
        <div className="relative z-10 flex items-center justify-between gap-1.5 mt-2.5 mb-1.5">
          {renderGradePill(displayGrade)}
          
          <div className="group/obj relative">
            <button
              type="button"
              className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#FEF3C7] hover:bg-[#FDE68A] text-[#92400E] border border-[#FCD34D] shadow-2xs transition-all cursor-help shrink-0"
              title="Hover to view Learning Objectives"
            >
              <Target className="w-3 h-3 text-[#D97706] shrink-0" />
              <span className="font-heading">Objectives</span>
            </button>
          </div>
        </div>

        {/* Content: Title, Subject, Description, Topics */}
        <div className="relative z-10 flex flex-col flex-1">
          {/* Simulation Topic Title - Full Topic Name ALWAYS Displayed Completely */}
          <h4 
            className={`text-base sm:text-lg font-black tracking-tight ${
              isUrdu ? 'font-urdu leading-[1.8]' : 'font-heading leading-snug'
            } text-[#0F172A] group-hover:text-[#0284C7] transition-colors break-words`}
            dir={isUrdu ? 'rtl' : 'ltr'}
          >
            <a
              href={getSimulationStandaloneUrl(sim)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                e.stopPropagation();
              }}
              className="hover:underline transition-colors text-[#0F172A] group-hover:text-[#0284C7]"
              title={`Open ${displayTitle} in new tab`}
            >
              {displayTitle}
            </a>
          </h4>

          {/* Subject & Sub-discipline */}
          <div className="flex items-center gap-2 mt-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#0284C7] shrink-0" />
            <span className="text-xs sm:text-sm font-bold text-[#1E293B] truncate">{displaySubject}</span>
          </div>

          {/* Concise Description - Compact without large empty gaps */}
          {displayDesc && (
            <p 
              className={`text-xs font-normal leading-relaxed text-[#475569] line-clamp-2 mt-2 ${
                isUrdu ? 'font-urdu leading-[1.8]' : ''
              }`}
              dir={isUrdu ? 'rtl' : 'ltr'}
              title={displayDesc}
            >
              {displayDesc}
            </p>
          )}

          {/* Topic Tags (Pastel pills - Shortened & Truncated so they never overflow) */}
          <div className="flex flex-wrap gap-1.5 mt-2.5">
            {sim.topics.slice(0, 3).map((topic, i) => {
              const shortT = formatShortTopic(topic);
              const isTopicUrdu = /[\u0600-\u06FF]/.test(shortT);
              return (
                <span
                  key={i}
                  className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border shadow-2xs max-w-[110px] truncate ${getPastelTagStyle(i)} ${
                    isTopicUrdu ? 'font-urdu leading-[1.8]' : ''
                  }`}
                  dir={isTopicUrdu ? 'rtl' : 'ltr'}
                  title={topic}
                >
                  {shortT}
                </span>
              );
            })}
            {sim.topics.length > 3 && (
              <span 
                className="text-[11px] font-bold px-2 py-0.5 rounded-full border shadow-2xs bg-[#E0F2FE] text-[#0369A1] border-[#BAE6FD] shrink-0"
              >
                +{sim.topics.length - 3}
              </span>
            )}
          </div>
        </div>

        {/* Card Action Bar (Teal-to-Cyan Gradient Button + Maximize Button) */}
        <div className="relative z-10 pt-4 mt-3.5 border-t border-slate-200/80 flex items-center justify-between gap-2.5">
          {/* Main Action Button */}
          <a
            href={getSimulationStandaloneUrl(sim)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="flex-1 min-w-0 h-11 sm:h-12 rounded-2xl flex items-center justify-center gap-2 text-xs sm:text-sm font-black text-white shadow-md hover:shadow-lg hover:brightness-110 transition-all transform active:scale-98 cursor-pointer select-none"
            style={{
              background: cardLaunchBtnStyle.bg,
              boxShadow: cardLaunchBtnStyle.shadow,
              color: '#FFFFFF'
            }}
            title={isConceptGuide ? "Explore Detailed Pedagogical Concept Guide in New Tab" : "Launch Detailed Simulation Lab in New Tab"}
          >
            <ExternalLink className="w-4 h-4 pointer-events-none shrink-0 text-white" />
            <span className="font-black text-white truncate" style={{ color: '#FFFFFF' }}>{isConceptGuide ? 'Explore Concept' : 'Launch Lab'}</span>
          </a>

          {/* Direct Fullscreen Modal Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onLaunchFullscreenModal(sim);
            }}
            className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 shadow-sm transition-all cursor-pointer flex items-center justify-center active:scale-95 shrink-0"
            title="Launch in Fullscreen View"
          >
            <Maximize2 className="w-4 h-4 pointer-events-none shrink-0 text-slate-700" />
          </button>
        </div>

        {/* Learning Objectives Inset Drawer / Full Overview on Card Hover */}
        <div className="absolute inset-0 z-30 p-5 rounded-3xl bg-[#0F172A] text-white opacity-0 invisible pointer-events-none group-hover/card:opacity-0 hover:!opacity-100 transition-all duration-200 flex flex-col justify-between" id={`obj-panel-${sim.id}`} />
      </div>
    );
  };

  const getGradeTierStyle = (_tierKey: string, isSelected: boolean) => {
    return {
      btn: isSelected
        ? 'bg-[#1B2A5C] text-white border-2 border-[#1546A8] shadow-md font-black scale-[1.02]'
        : 'bg-[#FFFFFF] hover:bg-[#DBE7FB] text-[#1B2A5C] hover:text-[#1B2A5C] border border-[#1B2A5C] shadow-sm font-bold',
      badge: isSelected
        ? 'bg-[#1546A8] text-white border border-[#42A5F5] shadow-xs'
        : 'bg-[#EEF3F9] text-[#1546A8] border border-[#C9D3E6] shadow-2xs',
      iconBox: isSelected ? 'bg-white/20 text-white' : 'bg-transparent text-[#1B2A5C]'
    };
  };

  const getSubjectStyle = (_key: string, isSelected: boolean) => {
    return {
      btn: isSelected
        ? 'bg-[#1B2A5C] text-white border-2 border-[#1546A8] shadow-md font-black scale-[1.02]'
        : 'bg-[#FFFFFF] hover:bg-[#DBE7FB] text-[#1B2A5C] hover:text-[#1B2A5C] border border-[#1B2A5C] shadow-sm font-bold',
      badge: isSelected
        ? 'bg-[#1546A8] text-white border border-[#42A5F5] shadow-xs'
        : 'bg-[#EEF3F9] text-[#1546A8] border border-[#C9D3E6] shadow-2xs',
      iconBox: isSelected ? 'bg-white/20 text-white' : 'bg-transparent text-[#1B2A5C]'
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
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl text-xs sm:text-sm font-sans font-bold text-white bg-[#1B2A5C] hover:bg-[#1546A8] border border-[#F5A623] shadow-md transition-all cursor-pointer shrink-0 active:scale-95"
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
              backgroundColor: '#FFFFFF',
              borderColor: '#DDE5F3'
            }}
          >
            <span className="px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-bold bg-[#EEF3F9] text-[#1B2A5C] border border-[#DDE5F3]">
              Discipline: {isAllCategory ? 'All Disciplines' : activeSubjectConfig.fullTitle}
            </span>
            <span className="px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-bold bg-[#EEF3F9] text-[#1B2A5C] border border-[#DDE5F3]">
              Grade: {gradeTiers.find(g => g.key === selectedGradeTier)?.label || 'All Grades'}
            </span>
            <span className="px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-black bg-[#1B2A5C] text-white border border-[#1546A8]">
              {displayedSims.length} Labs Available
            </span>
          </div>
        </div>
      )}

      {/* Tier 1 Curriculum Filter Flow: Grade Level Tabs */}
      <div 
        ref={gradeSectionRef}
        className="relative z-10 shadow-lg rounded-2xl p-5 sm:p-6 transition-all border"
        style={{
          backgroundColor: '#FFFFFF',
          borderColor: '#DDE5F3',
          boxShadow: '0 8px 24px rgba(27, 42, 92, 0.08)'
        }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 mb-4">
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="text-[11px] font-mono font-black uppercase tracking-wider text-white px-3 py-1 rounded-md bg-[#1B2A5C] border border-[#1546A8] shrink-0">
              GRADE FILTER
            </span>
            <span className="text-sm sm:text-base font-bold text-[#1B2A5C] font-heading">
              Curriculum Grade &amp; Academic Stage
            </span>
          </div>
          <div className="flex items-center gap-2 flex-wrap text-xs font-normal text-[#3B4A73]">
            <span>Aligned with National Curriculum of Pakistan (Session 2026-27)</span>
            {selectedGradeTier !== 'all' && (
              <button 
                type="button"
                onClick={() => handleGradeTierChange('all')}
                className="text-[#1E88E5] hover:underline cursor-pointer text-xs font-bold ml-1 transition-colors"
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
                {/* Enlarged Prominent Animated Counter Badge for Grades */}
                <span
                  className={`text-sm sm:text-base font-black font-heading px-3 py-1 rounded-xl shrink-0 min-w-[2.25rem] text-center leading-none ${style.badge}`}
                >
                  <AnimatedBadgeCounter 
                    target={count} 
                    isVisible={isGradeSectionVisible} 
                    duration={1800} 
                  />
                </span>
              </button>
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
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 mb-4">
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="text-[11px] font-mono font-black uppercase tracking-wider text-white px-3 py-1 rounded-md bg-[#1546A8] border border-[#2D62D1] shrink-0">
              STEM SUBJECT FILTER
            </span>
            <span className="text-sm sm:text-base font-bold text-[#1B2A5C] font-heading">
              Select Discipline &amp; Learning Track
            </span>
          </div>
          <div className="flex items-center gap-2 flex-wrap text-xs font-normal text-[#3B4A73]">
            <span>Filtered for {gradeTiers.find(g => g.key === selectedGradeTier)?.label || 'Selected Grade'}</span>
            {!isAllCategory && (
              <button 
                type="button"
                onClick={() => handleCategoryChange('All Simulations')}
                className="text-[#1E88E5] hover:underline cursor-pointer text-xs font-bold ml-1 transition-colors"
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
                {/* Enlarged Prominent Animated Counter Badge for Subjects */}
                <span 
                  className={`text-sm sm:text-base font-black font-heading px-3 py-1 rounded-xl shrink-0 min-w-[2.25rem] text-center leading-none ${style.badge}`}
                >
                  <AnimatedBadgeCounter 
                    target={count} 
                    isVisible={isSubjectSectionVisible} 
                    duration={1800} 
                  />
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
            backgroundColor: '#1B2A5C',
            borderColor: '#F5A623',
            boxShadow: '0 8px 30px rgba(27, 42, 92, 0.25)'
          }}
        >
          <div className="space-y-2 text-center lg:text-left flex-1 min-w-0">
            <div className="flex items-center gap-2 justify-center lg:justify-start">
              <span className="inline-flex items-center gap-1.5 text-xs font-mono font-black uppercase tracking-wider text-[#1B2A5C] px-3.5 py-1 rounded-md bg-[#F5A623] border border-[#E58E0A]">
                <Sparkles className="w-3.5 h-3.5 text-[#1B2A5C]" />
                LABORATORY WORKSPACE
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white font-heading tracking-tight leading-snug">
              Click Any Grade or Subject Above to Open Interactive Labs
            </h3>
            <p className="text-xs sm:text-sm text-[#DBE4F7] font-normal leading-relaxed max-w-2xl">
              Select any curriculum grade tier or STEM discipline above to view dedicated simulation laboratories in a high-contrast, distraction-free environment.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onOpenCatalog && onOpenCatalog('All Simulations', 'all')}
            className="fx-pulse-gold relative z-20 px-6 sm:px-7 py-3.5 sm:py-4 rounded-xl text-sm sm:text-base font-sans font-black text-[#1B2A5C] bg-[#F5A623] hover:bg-[#E58E0A] border border-[#E58E0A] shadow-md transition-all cursor-pointer shrink-0 whitespace-nowrap flex items-center gap-3 active:scale-95"
            title="Open Complete STEM Simulations Catalog"
          >
            <BookOpen className="w-5 h-5 text-[#1B2A5C] pointer-events-none shrink-0" />
            <span className="font-heading tracking-wider uppercase font-black text-[#1B2A5C] flex items-center gap-1.5">
              <span>OPEN ALL</span>
              <span className="text-base sm:text-lg font-black font-heading px-2.5 py-0.5 rounded-lg bg-[#1B2A5C] text-[#F5A623] border border-[#1546A8] shadow-xs">
                <AnimatedBadgeCounter 
                  target={activeSimulations.length} 
                  isVisible={isSubjectSectionVisible} 
                  duration={1800} 
                />
              </span>
              <span>LABS CATALOG</span>
            </span>
            <ArrowRight className="w-5 h-5 text-[#1B2A5C] pointer-events-none shrink-0" />
          </button>
        </div>
      ) : (
        /* Dedicated Full-Width Simulation Catalog Main Content (Only shown in Catalog View) */
        <div className="w-full space-y-6">
        
        {/* Top Breadcrumb & Quick Search Filter Bar */}
        <div 
          className="shadow-lg rounded-2xl p-5 sm:p-6 transition-all border"
          style={{
            backgroundColor: '#FFFFFF',
            borderColor: '#DDE5F3',
            boxShadow: '0 8px 24px rgba(27, 42, 92, 0.08)'
          }}
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            {/* Breadcrumb & Subject Header */}
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-medium text-[#3B4A73] flex-wrap">
                <span 
                  onClick={() => handleCategoryChange('All Simulations')}
                  className="cursor-pointer hover:underline text-[#1E88E5] font-bold"
                >
                  Interactive Catalog
                </span>
                <span>&gt;</span>
                <span className="text-[#1B2A5C] font-bold">
                  {isAllCategory ? 'All Simulations' : activeSubjectConfig.fullTitle}
                </span>
              </div>

              <div className="flex items-center gap-2.5 flex-wrap">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight text-[#1B2A5C] font-heading">
                  {isAllCategory ? 'All STEM Simulations' : activeSubjectConfig.fullTitle}
                </h2>
                {!isAllCategory && (
                  <button
                    type="button"
                    onClick={() => handleCategoryChange('All Simulations')}
                    className="px-3 py-1 rounded-lg text-xs font-bold bg-[#EEF3F9] text-[#1E88E5] border border-[#DDE5F3] flex items-center gap-1.5 cursor-pointer hover:bg-[#DBE7FB] transition-colors shadow-xs"
                    title="Reset discipline filter to show all simulations"
                  >
                    <span>Filter: {activeSubjectConfig.fullTitle}</span>
                    <span className="font-bold text-sm">&times;</span>
                  </button>
                )}
                <span className="px-3.5 py-1.5 rounded-lg text-xs font-bold shadow-xs flex items-center gap-2 bg-[#EEF3F9] text-[#1B2A5C] border border-[#DDE5F3] font-mono">
                  <CheckCircle2 className="w-4 h-4 text-[#1E88E5] shrink-0" />
                  {displayedSims.length === activeSimulations.length
                    ? `Showing All ${activeSimulations.length} Verified Labs`
                    : `Showing ${displayedSims.length} of ${activeSimulations.length} Total Labs`}
                </span>
              </div>
            </div>

            {/* Quick Search Bar to Filter Labs Instantly */}
            <div className="w-full md:w-80 shrink-0">
              <div 
                className="relative flex items-center rounded-xl border border-[#C9D3E6] bg-[#FFFFFF] shadow-inner focus-within:ring-2 focus-within:ring-[#1E88E5]"
              >
                <Search className="w-4 h-4 ml-3.5 shrink-0 text-[#1E88E5]" />
                <input
                  type="text"
                  placeholder="Search labs across disciplines..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full py-2.5 px-3 text-xs sm:text-sm font-medium bg-transparent outline-none text-[#1B2A5C] placeholder-[#8A97B8] font-sans"
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

        {/* Full-Width Simulation Cards Grid: 4 Columns on Large/Widescreen Displays */}
        {displayedSims.length > 0 ? (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6 w-full">
              {displayedSims.map((sim, index) => renderCard(sim, index))}
            </div>
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
      )}
    </section>
  );
};
