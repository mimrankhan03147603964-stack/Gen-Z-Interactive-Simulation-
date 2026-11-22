import React, { useState, useEffect, useRef, useMemo, useCallback, useDeferredValue } from 'react';
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
import { getThemeForIndex, getLaunchBtnStyle } from '../data/sequentialPalette';
import { ScrollReveal } from './ScrollReveal';
import { DisciplineCatalogHoverImage } from './DisciplineCatalogHoverImage';
import {
  CLASS_PANELS_CONFIG,
  CURRICULUM_SUBJECT_META,
  ClassLevelKey,
  ClassPanelDefinition,
  CurriculumSubjectKey,
  EMPTY_CLASS_LABELS,
  EMPTY_CLASS_MESSAGE,
  SelectableClassKey,
  getSimulationClassAssignments,
  isEmptyClassKey
} from '../data/curriculumClassMapping';
import { scrollRevealEngine } from '../utils/scrollRevealManager';

const ChemistryBiologySlider = React.lazy(() =>
  import('./ChemistryBiologySlider').then((m) => ({ default: m.ChemistryBiologySlider }))
);
const TopicRealisticIcon = React.lazy(() =>
  import('./TopicRealisticIcon').then((m) => ({ default: m.TopicRealisticIcon }))
);

function createAllCollapsedMap(): Record<string, boolean> {
  const map: Record<string, boolean> = {};
  CLASS_PANELS_CONFIG.forEach((p) => {
    map[p.key] = true;
  });
  return map;
}

function cleanCardTitleStatic(title: string): string {
  return title
    .replace(/\.html$/i, '')
    .replace(/_/g, ' ')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

const LazyViewportMount: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [shouldMount, setShouldMount] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || shouldMount) return;
    if (typeof IntersectionObserver === 'undefined') {
      setShouldMount(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setShouldMount(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px 0px', threshold: 0.01 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [shouldMount]);

  return (
    <div ref={ref} className="w-full min-h-[1px]">
      {shouldMount ? <React.Suspense fallback={null}>{children}</React.Suspense> : null}
    </div>
  );
};

interface ClassSimulationEntry {
  sim: SimulationItem;
  subject: CurriculumSubjectKey;
}

interface LazyClassPanelBodyProps {
  panel: ClassPanelDefinition;
  panelEntries: ClassSimulationEntry[];
  totalSimulationsCount: number;
  lazyOnScroll: boolean;
  onCardClick: (sim: SimulationItem) => void;
  onSelectSim?: (sim: SimulationItem) => void;
}

const LazyClassPanelBody: React.FC<LazyClassPanelBodyProps> = React.memo(
  ({ panel, panelEntries, totalSimulationsCount, lazyOnScroll, onCardClick, onSelectSim }) => {
    const bodyRef = useRef<HTMLDivElement>(null);
    const [isLoaded, setIsLoaded] = useState<boolean>(() => !lazyOnScroll);

    useEffect(() => {
      if (!lazyOnScroll) {
        setIsLoaded(true);
        return;
      }
      if (isLoaded) return;

      const el = bodyRef.current;
      if (!el || typeof IntersectionObserver === 'undefined') {
        const rafId = requestAnimationFrame(() => setIsLoaded(true));
        return () => cancelAnimationFrame(rafId);
      }

      let rafId: number | null = null;
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0]?.isIntersecting) {
            observer.disconnect();
            rafId = requestAnimationFrame(() => {
              setIsLoaded(true);
            });
          }
        },
        { rootMargin: '220px 0px', threshold: 0.01 }
      );

      observer.observe(el);
      return () => {
        observer.disconnect();
        if (rafId !== null) cancelAnimationFrame(rafId);
      };
    }, [lazyOnScroll, isLoaded]);

    useEffect(() => {
      if (!isLoaded) return;
      const timer = setTimeout(() => {
        if (bodyRef.current) {
          scrollRevealEngine.scanAndObserve(bodyRef.current);
        }
      }, 30);
      return () => clearTimeout(timer);
    }, [isLoaded, panelEntries.length]);

    const subjectGroups = useMemo(() => {
      if (!isLoaded) return [];
      return panel.subjectOrder
        .map((subjectName) => ({
          subjectName,
          sims: panelEntries
            .filter((entry) => entry.subject === subjectName)
            .map((entry) => entry.sim)
        }))
        .filter((group) => group.sims.length > 0);
    }, [isLoaded, panel.subjectOrder, panelEntries]);

    return (
      <div ref={bodyRef} className="p-4 sm:p-5 bg-slate-50/70 border-t border-black/5 space-y-5">
        {!isLoaded ? (
          <div className="min-h-[96px] flex items-center justify-center gap-2 text-xs font-semibold text-[#5A6E85]">
            <Loader2 className="w-4 h-4 animate-spin text-[#1546A8]" />
            <span>Loading {panel.name} simulations...</span>
          </div>
        ) : (
          subjectGroups.map((group) => {
            const subjMeta = CURRICULUM_SUBJECT_META[group.subjectName];
            return (
              <div
                key={`${panel.key}-${group.subjectName}`}
                className="space-y-3"
                style={{
                  '--subject-color': subjMeta.color,
                  '--subject-tint': subjMeta.bg,
                  '--subject-shadow-color': subjMeta.border
                } as React.CSSProperties}
              >
                {/* Curriculum Subject Sub-Header */}
                <div className="flex items-center justify-between gap-2 pb-1.5 border-b border-slate-200/90">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full shrink-0"
                      style={{ backgroundColor: subjMeta.color }}
                    />
                    <h4 className="text-xs sm:text-sm font-black uppercase tracking-wide text-[#1B2A5C] font-heading m-0">
                      {group.subjectName}
                    </h4>
                  </div>
                  <span
                    className="px-2.5 py-0.5 rounded-full text-[11px] font-bold font-mono border shrink-0"
                    style={{
                      color: subjMeta.color,
                      backgroundColor: subjMeta.bg,
                      borderColor: subjMeta.border
                    }}
                  >
                    {group.sims.length} {group.sims.length === 1 ? 'topic' : 'topics'}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 w-full">
                  {group.sims.map((sim, cardIdx) => {
                    const displayTitle = cleanCardTitleStatic(sim.title);
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
                            onCardClick(sim);
                            if (onSelectSim) onSelectSim(sim);
                          }}
                          className="horizontal-topic-card group w-full h-full"
                          title={`Open #${sim.indexNumber} - ${displayTitle} in new tab`}
                        >
                          {/* Left: Realistic & Colorful Vector Emblem Tile */}
                          <div
                            className="w-[38px] h-[38px] sm:w-[42px] sm:h-[42px] rounded-xl flex items-center justify-center shrink-0 p-1 bg-white shadow-2xs border border-slate-200/90 group-hover:scale-105 group-hover:border-slate-300 transition-transform duration-150 overflow-hidden"
                            aria-hidden="true"
                          >
                            <React.Suspense fallback={<div className="w-full h-full" />}>
                              <TopicRealisticIcon
                                indexNumber={sim.indexNumber}
                                simId={sim.id}
                                className="w-full h-full pointer-events-none drop-shadow-2xs"
                              />
                            </React.Suspense>
                          </div>

                          {/* Center: Full Topic Title with English Serial Number - 100% Fully Visible, No Cutoff, No Truncate, No Overlap */}
                          <div className="flex-1 min-w-0 pr-1">
                            <div className="flex items-start gap-1.5">
                              <span
                                className="inline-flex items-center justify-center px-1.5 py-0.5 rounded text-[11px] font-black font-mono shrink-0 select-none shadow-2xs border mt-0.5"
                                style={{
                                  backgroundColor: '#1E88E5',
                                  color: '#FFFFFF',
                                  borderColor: '#1546A8'
                                }}
                                title={`Simulation #${sim.indexNumber} of ${totalSimulationsCount}`}
                              >
                                #{sim.indexNumber}
                              </span>
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
              </div>
            );
          })
        )}
      </div>
    );
  }
);

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
  selectedClassKey?: SelectableClassKey;
  onSelectClassKey?: (classKey: SelectableClassKey) => void;
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
  selectedClassKey: controlledClassKey,
  onSelectClassKey,
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

  // Quick search filter term (deferred to keep typing smooth)
  const [searchTerm, setSearchTerm] = useState<string>('');
  const deferredSearchTerm = useDeferredValue(searchTerm);
  const trimmedSearch = deferredSearchTerm.trim();

  // Track expanded descriptions per card (collapsed by default for progressive disclosure)
  const [expandedDescIds, setExpandedDescIds] = useState<Record<string, boolean>>({});

  // List Length & Scroll Controls: Start collapsed by default so page opens light and fast
  const [collapsedPanels, setCollapsedPanels] = useState<Record<string, boolean>>(() => {
    const initial = createAllCollapsedMap();
    if (controlledClassKey && controlledClassKey !== 'all' && !isEmptyClassKey(controlledClassKey)) {
      initial[controlledClassKey] = false;
    }
    return initial;
  });
  const [isExpandAllActive, setIsExpandAllActive] = useState<boolean>(false);
  const [internalClassKey, setInternalClassKey] = useState<SelectableClassKey>('all');
  const selectedClassKey = controlledClassKey !== undefined ? controlledClassKey : internalClassKey;

  const setSelectedClassKey = useCallback(
    (key: SelectableClassKey) => {
      if (onSelectClassKey) {
        onSelectClassKey(key);
      } else {
        setInternalClassKey(key);
      }
    },
    [onSelectClassKey]
  );

  const scrollToClassElement = useCallback((classKey?: SelectableClassKey) => {
    setTimeout(() => {
      const targetEl =
        classKey && classKey !== 'all' && !isEmptyClassKey(classKey)
          ? document.getElementById(`class-panel-${classKey}`) || document.getElementById('class-results-anchor')
          : document.getElementById('class-results-anchor');
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 60);
  }, []);

  const handleSelectClass = useCallback(
    (key: SelectableClassKey, shouldScroll = true) => {
      setIsExpandAllActive(false);
      setSelectedClassKey(key);
      if (key === 'all') {
        setCollapsedPanels(createAllCollapsedMap());
      } else if (!isEmptyClassKey(key)) {
        const next = createAllCollapsedMap();
        next[key] = false;
        setCollapsedPanels(next);
        if (shouldScroll) {
          scrollToClassElement(key);
        }
      } else {
        setCollapsedPanels(createAllCollapsedMap());
        if (shouldScroll) {
          scrollToClassElement(key);
        }
      }
    },
    [setSelectedClassKey, scrollToClassElement]
  );

  // Sync panel expand/collapse state whenever controlledClassKey changes (e.g. from TopNavbar dropdown)
  useEffect(() => {
    if (controlledClassKey === undefined) return;
    setIsExpandAllActive(false);
    if (controlledClassKey === 'all') {
      setCollapsedPanels(createAllCollapsedMap());
    } else if (!isEmptyClassKey(controlledClassKey)) {
      const next = createAllCollapsedMap();
      next[controlledClassKey] = false;
      setCollapsedPanels(next);
    } else {
      setCollapsedPanels(createAllCollapsedMap());
    }
  }, [controlledClassKey]);

  const togglePanelCollapse = (key: string) => {
    setCollapsedPanels(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const collapseAllPanels = () => {
    setIsExpandAllActive(false);
    setCollapsedPanels(createAllCollapsedMap());
  };

  const expandAllPanels = () => {
    setIsExpandAllActive(true);
    setCollapsedPanels({});
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      scrollRevealEngine.scanAndObserve();
    }, 50);
    return () => clearTimeout(timer);
  }, [selectedClassKey, collapsedPanels, trimmedSearch]);

  const selectedCategory = controlledCategory !== undefined ? controlledCategory : internalCategory;

  // Intersection Observer triggers for smooth count-up on scroll
  const gradeSectionRef = useRef<HTMLDivElement>(null);
  const [isGradeSectionVisible, setIsGradeSectionVisible] = useState<boolean>(false);

  const subjectSectionRef = useRef<HTMLDivElement>(null);
  const [isSubjectSectionVisible, setIsSubjectSectionVisible] = useState<boolean>(false);

  const quickJumpRef = useRef<HTMLDivElement>(null);
  const [isQuickJumpVisible, setIsQuickJumpVisible] = useState<boolean>(false);

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

  useEffect(() => {
    const el = quickJumpRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsQuickJumpVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.05, rootMargin: '0px 0px -10px 0px' }
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
    setIsExpandAllActive(false);
    setSelectedClassKey('all');
    setCollapsedPanels(createAllCollapsedMap());
    if (onSelectGradeTier) {
      onSelectGradeTier(tierKey);
    } else {
      setInternalGradeTier(tierKey);
    }
    if (isHomeView && onOpenCatalog) {
      onOpenCatalog(undefined, tierKey);
    } else if (tierKey !== 'all') {
      scrollToClassElement('all');
    }
  };

  const handleCategoryChange = (catKey: string) => {
    setIsExpandAllActive(false);
    setSelectedClassKey('all');
    if (catKey !== 'All Simulations') {
      const countInCurrentTier = activeSimulations.filter(s => s.category === catKey && matchesGradeTier(s, selectedGradeTier)).length;
      if (countInCurrentTier === 0) {
        if (onSelectGradeTier) {
          onSelectGradeTier('all');
        } else {
          setInternalGradeTier('all');
        }
      }
      // Expand only the selected subject's matching panels (loaded lazily on scroll)
      setCollapsedPanels({});
    } else {
      // "All Simulations" shows compact collapsed class headers, not all 147 at once
      setCollapsedPanels(createAllCollapsedMap());
    }
    if (onSelectCategory) {
      onSelectCategory(catKey);
    } else {
      setInternalCategory(catKey);
    }
    if (isHomeView && onOpenCatalog) {
      onOpenCatalog(catKey, undefined);
    } else if (catKey !== 'All Simulations') {
      scrollToClassElement('all');
    }
  };

  const prevControlledCategoryRef = useRef<string | undefined>(controlledCategory);

  useEffect(() => {
    const prevCategory = prevControlledCategoryRef.current;
    prevControlledCategoryRef.current = controlledCategory;

    if (controlledCategory && controlledCategory !== 'All Simulations') {
      const countInCurrentTier = simulations.filter(
        s => s.category === controlledCategory && matchesGradeTier(s, selectedGradeTier)
      ).length;
      if (countInCurrentTier === 0) {
        if (onSelectGradeTier) {
          onSelectGradeTier('all');
        } else {
          setInternalGradeTier('all');
        }
      }
      setIsExpandAllActive(false);
      setCollapsedPanels({});
    } else if (
      controlledCategory === 'All Simulations' &&
      prevCategory &&
      prevCategory !== 'All Simulations' &&
      selectedClassKey === 'all'
    ) {
      setIsExpandAllActive(false);
      setCollapsedPanels(createAllCollapsedMap());
    }
  }, [controlledCategory, simulations, selectedGradeTier, onSelectGradeTier, selectedClassKey]);

  const handleCardClick = useCallback((sim: SimulationItem) => {
    openSimulationInNewTab(sim);
  }, []);

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
    if (!trimmedSearch) return true;
    const term = trimmedSearch.toLowerCase();
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
  const baseDisplayedSims = useMemo(() => {
    return activeSimulations.filter(s => {
      if (!matchesGradeTier(s, selectedGradeTier)) return false;
      if (!isAllCategory && s.category !== selectedCategory) return false;
      if (!matchesSearch(s)) return false;
      return true;
    });
  }, [activeSimulations, selectedGradeTier, isAllCategory, selectedCategory, trimmedSearch]);

  // Pre-group simulations by class by reference (a single simulation can appear in multiple classes under each class's curriculum subject)
  const simsByClass = useMemo(() => {
    const grouped: Record<ClassLevelKey, ClassSimulationEntry[]> = {
      'play-prep': [],
      'class-1': [],
      'class-2': [],
      'class-3': [],
      'class-4': [],
      'class-5': [],
      'class-6': [],
      'class-7': [],
      'class-8': [],
      'class-9': [],
      'class-10': []
    };
    const seenPerClass: Record<ClassLevelKey, Set<string>> = {
      'play-prep': new Set(),
      'class-1': new Set(),
      'class-2': new Set(),
      'class-3': new Set(),
      'class-4': new Set(),
      'class-5': new Set(),
      'class-6': new Set(),
      'class-7': new Set(),
      'class-8': new Set(),
      'class-9': new Set(),
      'class-10': new Set()
    };

    baseDisplayedSims.forEach((sim) => {
      const assignments = getSimulationClassAssignments(sim);
      assignments.forEach(({ classKey, subject }) => {
        if (!seenPerClass[classKey].has(sim.id)) {
          seenPerClass[classKey].add(sim.id);
          grouped[classKey].push({ sim, subject });
        }
      });
    });

    return grouped;
  }, [baseDisplayedSims]);

  // Unique total when viewing All; exact class count when viewing a single class
  const displayedSims = useMemo(() => {
    if (selectedClassKey === 'all') return baseDisplayedSims;
    if (isEmptyClassKey(selectedClassKey)) return [];
    return (simsByClass[selectedClassKey] || []).map((entry) => entry.sim);
  }, [selectedClassKey, baseDisplayedSims, simsByClass]);

  const getClassPanelIcon = (classKey: ClassLevelKey) => {
    if (classKey === 'play-prep') return MultiEcceIcon;
    if (
      classKey === 'class-1' ||
      classKey === 'class-2' ||
      classKey === 'class-3' ||
      classKey === 'class-4' ||
      classKey === 'class-5'
    ) {
      return MultiPrimaryIcon;
    }
    if (classKey === 'class-6' || classKey === 'class-7' || classKey === 'class-8') {
      return MultiMiddleIcon;
    }
    return MultiSecondaryIcon;
  };

  const activeClassPanel =
    selectedClassKey === 'all' || isEmptyClassKey(selectedClassKey)
      ? null
      : CLASS_PANELS_CONFIG.find(c => c.key === selectedClassKey) || null;

  const activeEmptyClassLabel = isEmptyClassKey(selectedClassKey)
    ? EMPTY_CLASS_LABELS[selectedClassKey]
    : null;

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
                    className={`w-13 h-13 sm:w-15 sm:h-15 rounded-2xl flex items-center justify-center shadow-md shrink-0 ml-1 group-hover:scale-105 transition-transform border p-2 relative z-10 self-center ${
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

      {/* Full-Width Hover Slide-In Image between Discipline Cards Row and All STEM Disciplines Card */}
      <DisciplineCatalogHoverImage />

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

        {/* Top Search Bar & List Length Controls */}
        <div 
          id="class-results-anchor"
          className="reveal-up scroll-mt-20 shadow-lg rounded-2xl p-4 sm:p-5 transition-all border space-y-3.5"
          style={{
            backgroundColor: '#FFFFFF',
            borderColor: '#DDE5F3',
            boxShadow: '0 8px 24px rgba(27, 42, 92, 0.08)'
          }}
        >
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="text-base sm:text-lg font-black tracking-tight text-[#1B2A5C] font-heading">
                {activeClassPanel
                  ? activeClassPanel.name
                  : activeEmptyClassLabel
                  ? activeEmptyClassLabel
                  : isAllCategory
                  ? 'All Classes (Play Group / Prep – Class 10)'
                  : activeSubjectConfig.fullTitle}
              </span>
              <span className="px-3 py-1 rounded-lg text-xs font-bold shadow-xs flex items-center gap-2 bg-[#EEF3F9] text-[#1B2A5C] border border-[#DDE5F3] font-mono">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#1E88E5] shrink-0" />
                {displayedSims.length} Active Simulations
              </span>
              {selectedClassKey !== 'all' && (
                <button
                  type="button"
                  onClick={() => handleSelectClass('all', false)}
                  className="px-2.5 py-1 rounded-lg text-xs font-bold bg-[#EEF3F9] text-[#1E88E5] border border-[#DDE5F3] hover:bg-[#DBE7FB] transition-colors cursor-pointer"
                  title="Show all classes"
                >
                  Show All Classes &times;
                </button>
              )}
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

            {/* List Controls: Collapse/Expand All & Search */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
              {/* Expand / Collapse All Controls */}
              {selectedClassKey === 'all' && (
                <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#EEF3F9] border border-[#DDE5F3]">
                  <button
                    type="button"
                    onClick={collapseAllPanels}
                    className="px-2.5 py-1.5 rounded-lg text-xs font-bold text-[#1B2A5C] hover:bg-white hover:text-[#1546A8] transition-all cursor-pointer flex items-center gap-1"
                    title="Collapse all class panels for fast overview"
                  >
                    <ChevronDown className="w-3.5 h-3.5 text-[#1546A8]" />
                    <span>Collapse All</span>
                  </button>
                  <span className="w-px h-4 bg-[#CBD5E1]" />
                  <button
                    type="button"
                    onClick={expandAllPanels}
                    className="px-2.5 py-1.5 rounded-lg text-xs font-bold text-[#1B2A5C] hover:bg-white hover:text-[#1546A8] transition-all cursor-pointer flex items-center gap-1"
                    title="Expand all class panels"
                  >
                    <ChevronUp className="w-3.5 h-3.5 text-[#1546A8]" />
                    <span>Expand All</span>
                  </button>
                </div>
              )}

              {/* Quick Search */}
              <div className="relative flex items-center rounded-xl border border-[#C9D3E6] bg-[#FFFFFF] shadow-inner focus-within:ring-2 focus-within:ring-[#1E88E5] min-w-[220px] sm:w-64">
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

          {/* Quick Jump Wrapping Grid of Square Class Boxes (No Horizontal Scroll, Animated Counts) */}
          <div ref={quickJumpRef} className="pt-3 border-t border-[#EEF3F9] space-y-2.5 select-none">
            <div className="flex items-center justify-between gap-2">
              <span className="text-[11px] font-bold text-[#5A6E85] uppercase tracking-wider flex items-center gap-1">
                <span>Quick Jump:</span>
              </span>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 xl:grid-cols-12 gap-2.5 w-full">
              <button
                type="button"
                onClick={() => handleSelectClass('all', false)}
                className={`aspect-square w-full p-2 rounded-xl border transition-all duration-200 cursor-pointer flex flex-col items-center justify-center text-center gap-1 ${
                  selectedClassKey === 'all'
                    ? 'bg-[#1546A8] text-white border-[#1546A8] shadow-md scale-[1.02]'
                    : 'bg-[#EEF3F9] text-[#1B2A5C] border-[#DDE5F3] hover:bg-[#DBE7FB] hover:border-[#93C5FD]'
                }`}
              >
                <span
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ backgroundColor: selectedClassKey === 'all' ? '#F5A623' : '#1546A8' }}
                />
                <span className="text-lg sm:text-xl font-black font-heading leading-none">
                  <AnimatedBadgeCounter
                    target={baseDisplayedSims.length}
                    isVisible={isQuickJumpVisible}
                    duration={1800}
                  />
                </span>
                <span className="text-[10.5px] sm:text-[11px] font-bold leading-tight">
                  All
                </span>
              </button>
              {CLASS_PANELS_CONFIG.map((cls) => {
                const count = (simsByClass[cls.key] || []).length;
                const isSelected = selectedClassKey === cls.key;
                return (
                  <button
                    key={`pill-${cls.key}`}
                    type="button"
                    onClick={() => handleSelectClass(cls.key, true)}
                    className={`aspect-square w-full p-2 rounded-xl border transition-all duration-200 cursor-pointer flex flex-col items-center justify-center text-center gap-1 ${
                      isSelected
                        ? 'text-white shadow-md scale-[1.02]'
                        : 'bg-[#EEF3F9] text-[#1B2A5C] border-[#DDE5F3] hover:bg-[#DBE7FB] hover:border-[#93C5FD]'
                    }`}
                    style={{
                      backgroundColor: isSelected ? cls.color : undefined,
                      borderColor: isSelected ? cls.color : undefined
                    }}
                  >
                    <span
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ backgroundColor: isSelected ? '#FFFFFF' : cls.color }}
                    />
                    <span className="text-lg sm:text-xl font-black font-heading leading-none">
                      <AnimatedBadgeCounter
                        target={count}
                        isVisible={isQuickJumpVisible}
                        duration={1800}
                      />
                    </span>
                    <span className="text-[10px] sm:text-[11px] font-bold leading-tight break-words">
                      {cls.shortLabel}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Horizontal Class Panels (Play Group/Prep to Class 10) — On-Demand & Lazy Rendered */}
        {displayedSims.length > 0 ? (
          <div className="space-y-6 w-full">
            {CLASS_PANELS_CONFIG
              .filter((panel) => {
                if (selectedClassKey !== 'all') {
                  return panel.key === selectedClassKey;
                }
                return true;
              })
              .map((panel, panelIdx) => {
                const panelEntries = simsByClass[panel.key] || [];

                // Omit classes that have no matching simulations under current filter/search
                if (panelEntries.length === 0) return null;

                const PanelIcon = getClassPanelIcon(panel.key);
                const panelReveal = panelIdx % 2 === 0 ? 'reveal-left' : 'reveal-right';
                // When searching by keyword, auto-expand only the matching class panels; otherwise respect collapsed state
                const isPanelCollapsed = trimmedSearch ? false : !!collapsedPanels[panel.key];
                const isMultiPanelView = selectedClassKey === 'all';

                const handleHeaderClick = () => {
                  if (
                    selectedClassKey === 'all' &&
                    !isExpandAllActive &&
                    !trimmedSearch &&
                    isAllCategory
                  ) {
                    // Clicking a class header in the overview opens only that class and hides all others
                    handleSelectClass(panel.key, true);
                  } else {
                    togglePanelCollapse(panel.key);
                  }
                };

                return (
                  <React.Fragment key={panel.key}>
                    <div
                      id={`class-panel-${panel.key}`}
                      className={`subject-panel-horizontal scroll-mt-24 ${panelReveal}`}
                      style={{
                        '--subject-color': panel.color,
                        '--subject-tint': panel.tint,
                        '--subject-shadow-color': panel.shadow
                      } as React.CSSProperties}
                    >
                      {/* Header Bar Across the Top in Class's Color - Clickable to Select / Expand / Collapse */}
                      <div
                        onClick={handleHeaderClick}
                        className="px-5 py-3.5 sm:py-4 flex items-center justify-between gap-3 text-white select-none flex-wrap cursor-pointer hover:brightness-105 transition-all"
                        style={{ backgroundColor: panel.color }}
                        title={isPanelCollapsed ? `Click to open ${panel.name}` : `Click to collapse ${panel.name}`}
                      >
                        <div className="flex items-center gap-3.5 min-w-0">
                          <div className="w-[36px] h-[36px] flex items-center justify-center shrink-0">
                            <PanelIcon className="w-[36px] h-[36px] text-white pointer-events-none drop-shadow-sm" />
                          </div>
                          <div className="min-w-0">
                            <h3 className="font-bold leading-tight text-white m-0 text-[18px] sm:text-[19px] font-heading">
                              {panel.name}
                            </h3>
                            <p className="text-[12px] sm:text-[13px] opacity-90 mt-0.5 font-medium leading-none text-white/90">
                              {panel.subtitle}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/20 text-white border border-white/30 backdrop-blur-xs font-mono">
                            {panelEntries.length} {panelEntries.length === 1 ? 'simulation' : 'simulations'}
                          </span>
                          <div className="w-7 h-7 rounded-lg bg-white/20 hover:bg-white/30 flex items-center justify-center text-white border border-white/30 transition-transform">
                            {isPanelCollapsed ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
                          </div>
                        </div>
                      </div>

                      {/* Curriculum Subjects & Topic Cards — Mounted strictly on demand when expanded */}
                      {!isPanelCollapsed && (
                        <LazyClassPanelBody
                          panel={panel}
                          panelEntries={panelEntries}
                          totalSimulationsCount={activeSimulations.length}
                          lazyOnScroll={isMultiPanelView}
                          onCardClick={handleCardClick}
                          onSelectSim={onSelectSim}
                        />
                      )}
                    </div>
                    {panel.key === 'class-5' && selectedClassKey === 'all' && isAllCategory && !trimmedSearch && selectedGradeTier === 'all' && (
                      <LazyViewportMount>
                        <ChemistryBiologySlider />
                      </LazyViewportMount>
                    )}
                  </React.Fragment>
                );
              })}
          </div>
        ) : activeEmptyClassLabel ? (
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
              <GraduationCap className="w-8 h-8 text-[#F5A623]" />
            </div>
            <span className="px-3 py-1 rounded-md text-xs font-black uppercase tracking-wider text-[#1B2A5C] bg-[#F5A623] border border-[#E58E0A] inline-block mb-3 font-mono">
              {activeEmptyClassLabel}
            </span>
            <p className="text-sm sm:text-base font-semibold mt-1 max-w-2xl mx-auto leading-relaxed text-[#DBE4F7]">
              {EMPTY_CLASS_MESSAGE}
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => {
                  handleSelectClass('all', false);
                  handleCategoryChange('All Simulations');
                  handleGradeTierChange('all');
                  setSearchTerm('');
                }}
                className="px-5 py-3 rounded-xl text-xs font-bold cursor-pointer transition-all bg-[#1546A8] hover:bg-[#1B2A5C] text-[#DBE4F7] border border-[#2D62D1]"
              >
                View All Simulations
              </button>
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
                  handleSelectClass('all', false);
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
