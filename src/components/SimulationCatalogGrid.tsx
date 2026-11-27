import React, { useState, useEffect, useRef, useMemo, useCallback, useDeferredValue } from 'react';
import { SimulationItem } from '../types';
import {
  Sparkles,
  Search,
  CheckCircle2,
  Wand2,
  Loader2,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  GraduationCap
} from 'lucide-react';

import { openSimulationInNewTab, getSimulationStandaloneUrl } from '../utils/navigation';
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
import {
  PlayPrepBlocksIcon,
  PrimaryBackpackIcon,
  MiddleGlobeBookIcon,
  SecondaryMicroscopeIcon
} from './ClassLevelIcons';

const ChemistryBiologySlider = React.lazy(() =>
  import('./ChemistryBiologySlider').then((m) => ({ default: m.ChemistryBiologySlider }))
);
const TopicRealisticIcon = React.lazy(() =>
  import('./TopicRealisticIcon').then((m) => ({ default: m.TopicRealisticIcon }))
);

const TOPICS_PAGE_SIZE = 6;

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
  searchKey: string;
  paginationResetNonce: number;
  onCardClick: (sim: SimulationItem) => void;
  onSelectSim?: (sim: SimulationItem) => void;
}

const LazyClassPanelBody: React.FC<LazyClassPanelBodyProps> = React.memo(
  ({
    panel,
    panelEntries,
    totalSimulationsCount,
    lazyOnScroll,
    searchKey,
    paginationResetNonce,
    onCardClick,
    onSelectSim
  }) => {
    const bodyRef = useRef<HTMLDivElement>(null);
    const [isLoaded, setIsLoaded] = useState<boolean>(() => !lazyOnScroll);
    const [visibleCount, setVisibleCount] = useState<number>(TOPICS_PAGE_SIZE);

    // Reset visible cards to first 6 whenever search term changes or Expand All resets pagination
    useEffect(() => {
      setVisibleCount(TOPICS_PAGE_SIZE);
    }, [searchKey, paginationResetNonce]);

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

    // Order all entries in this class by curriculum subject order
    const orderedEntries = useMemo(() => {
      const ordered: ClassSimulationEntry[] = [];
      panel.subjectOrder.forEach((subjectName) => {
        panelEntries.forEach((entry) => {
          if (entry.subject === subjectName) {
            ordered.push(entry);
          }
        });
      });
      panelEntries.forEach((entry) => {
        if (!panel.subjectOrder.includes(entry.subject)) {
          ordered.push(entry);
        }
      });
      return ordered;
    }, [panel.subjectOrder, panelEntries]);

    const totalCount = orderedEntries.length;
    const clampedVisibleCount = Math.min(visibleCount, totalCount);

    // Only build/render the currently visible slice of cards (lazy pagination: 6 at a time)
    const visibleSubjectGroups = useMemo(() => {
      if (!isLoaded) return [];

      const totalBySubject = new Map<CurriculumSubjectKey, number>();
      orderedEntries.forEach((entry) => {
        totalBySubject.set(entry.subject, (totalBySubject.get(entry.subject) || 0) + 1);
      });

      const visibleSlice = orderedEntries.slice(0, clampedVisibleCount);
      const groups: Array<{
        subjectName: CurriculumSubjectKey;
        sims: SimulationItem[];
        totalInSubject: number;
      }> = [];
      const groupMap = new Map<
        CurriculumSubjectKey,
        { subjectName: CurriculumSubjectKey; sims: SimulationItem[]; totalInSubject: number }
      >();

      visibleSlice.forEach((entry) => {
        let group = groupMap.get(entry.subject);
        if (!group) {
          group = {
            subjectName: entry.subject,
            sims: [],
            totalInSubject: totalBySubject.get(entry.subject) || 0
          };
          groupMap.set(entry.subject, group);
          groups.push(group);
        }
        group.sims.push(entry.sim);
      });

      return groups;
    }, [isLoaded, orderedEntries, clampedVisibleCount]);

    useEffect(() => {
      if (!isLoaded) return;
      const timer = setTimeout(() => {
        if (bodyRef.current) {
          scrollRevealEngine.scanAndObserve(bodyRef.current);
        }
      }, 30);
      return () => clearTimeout(timer);
    }, [isLoaded, clampedVisibleCount, totalCount]);

    const handleSeeMore = () => {
      setVisibleCount((prev) => Math.min(prev + TOPICS_PAGE_SIZE, totalCount));
    };

    const handleShowLess = () => {
      setVisibleCount(TOPICS_PAGE_SIZE);
      const panelEl = document.getElementById(`class-panel-${panel.key}`);
      if (panelEl && panelEl.getBoundingClientRect().top < 72) {
        panelEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };

    return (
      <div ref={bodyRef} className="p-4 sm:p-5 bg-slate-50/70 border-t border-black/5 space-y-5">
        {!isLoaded ? (
          <div className="min-h-[96px] flex items-center justify-center gap-2 text-xs font-semibold text-[#5A6E85]">
            <Loader2 className="w-4 h-4 animate-spin text-[#1546A8]" />
            <span>Loading {panel.name} simulations...</span>
          </div>
        ) : (
          <>
            {visibleSubjectGroups.map((group) => {
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
                      {group.sims.length < group.totalInSubject
                        ? `${group.sims.length} of ${group.totalInSubject} topics`
                        : `${group.totalInSubject} ${group.totalInSubject === 1 ? 'topic' : 'topics'}`}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 w-full">
                    {group.sims.map((sim, cardIdx) => {
                      const displayTitle = cleanCardTitleStatic(sim.title);
                      const isUrdu = sim.category === 'Urdu & Linguistics' || /[\u0600-\u06FF]/.test(sim.title);
                      const col = cardIdx % 3;
                      const cardReveal =
                        col === 0
                          ? 'reveal-left'
                          : col === 1
                          ? 'reveal-up reveal-delay-1'
                          : 'reveal-right reveal-delay-2';

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

                            {/* Center: Full Topic Title with English Serial Number */}
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
                                  className={`font-bold text-slate-900 group-hover:text-[var(--subject-color)] transition-colors block break-words ${
                                    isUrdu
                                      ? 'font-urdu text-[16px] sm:text-[17px] text-right py-0.5'
                                      : 'text-[14px] sm:text-[15px] leading-snug'
                                  }`}
                                  dir={isUrdu ? 'rtl' : 'ltr'}
                                  style={{
                                    ...(isUrdu
                                      ? {
                                          fontFamily:
                                            "'Noto Nastaliq Urdu', 'Jameel Noori Nastaleeq', 'Urdu Typesetting', serif",
                                          lineHeight: 2.2
                                        }
                                      : {})
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
            })}

            {/* Progressive Pagination Bar: Showing X of Y + See more / Show less */}
            {totalCount > 0 && (
              <div className="pt-3 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-3">
                <span className="text-xs font-bold text-[#5A6E85] font-mono">
                  Showing {clampedVisibleCount} of {totalCount}
                </span>

                {totalCount > TOPICS_PAGE_SIZE &&
                  (clampedVisibleCount < totalCount ? (
                    <button
                      type="button"
                      onClick={handleSeeMore}
                      className="inline-flex items-center justify-center gap-1.5 px-5 py-2 rounded-xl text-xs sm:text-sm font-black text-white shadow-sm hover:brightness-110 active:scale-[0.98] transition-all cursor-pointer"
                      style={{
                        background: 'linear-gradient(135deg, #0F1E42 0%, #1546A8 100%)',
                        boxShadow: '0 4px 12px rgba(21, 70, 168, 0.28)'
                      }}
                    >
                      <span>See more</span>
                      <ChevronDown className="w-4 h-4 shrink-0" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleShowLess}
                      className="inline-flex items-center justify-center gap-1.5 px-5 py-2 rounded-xl text-xs sm:text-sm font-black text-[#1B2A5C] bg-white hover:bg-[#EEF3F9] border border-[#CBD5E1] shadow-xs active:scale-[0.98] transition-all cursor-pointer"
                    >
                      <span>Show less</span>
                      <ChevronUp className="w-4 h-4 shrink-0" />
                    </button>
                  ))}
              </div>
            )}
          </>
        )}
      </div>
    );
  }
);

// Reusable smooth ease-out count-up animation for Quick Jump box numbers
const AnimatedBadgeCounter: React.FC<{
  target: number;
  isVisible: boolean;
  triggerKey: number;
  duration?: number;
}> = ({ target, isVisible, triggerKey, duration = 2800 }) => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    setPrefersReducedMotion(mediaQuery.matches);
    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
    mediaQuery.addListener(handleChange);
    return () => mediaQuery.removeListener(handleChange);
  }, []);

  const [displayValue, setDisplayValue] = useState<number>(() =>
    prefersReducedMotion ? target : 0
  );

  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplayValue(target);
      return;
    }

    if (!isVisible) {
      setDisplayValue(0);
      return;
    }

    let startTime: number | null = null;
    let animationFrameId: number;
    setDisplayValue(0);

    const step = (timestamp: number) => {
      if (startTime === null) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Smooth cubic ease-out curve so counting slows gently near the final number
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
  }, [target, isVisible, triggerKey, duration, prefersReducedMotion]);

  return (
    <span className="tabular-nums" style={{ fontVariantNumeric: 'tabular-nums' }}>
      {prefersReducedMotion ? target : isVisible ? displayValue : 0}
    </span>
  );
};

interface SimulationCatalogGridProps {
  simulations: SimulationItem[];
  selectedClassKey?: SelectableClassKey;
  classSelectNonce?: number;
  onSelectClassKey?: (classKey: SelectableClassKey) => void;
  onSelectSim: (sim: SimulationItem) => void;
  onTriggerAiGeneration?: (topic: string) => void;
  isGeneratingAi?: boolean;
}

export const SimulationCatalogGrid: React.FC<SimulationCatalogGridProps> = ({
  simulations,
  selectedClassKey: controlledClassKey,
  classSelectNonce = 0,
  onSelectClassKey,
  onSelectSim,
  onTriggerAiGeneration,
  isGeneratingAi = false
}) => {
  // Quick keyword search filter (deferred to keep typing smooth)
  const [searchTerm, setSearchTerm] = useState<string>('');
  const deferredSearchTerm = useDeferredValue(searchTerm);
  const trimmedSearch = deferredSearchTerm.trim();

  // Class panel collapse state: all collapsed by default unless a specific class is pre-selected
  const [collapsedPanels, setCollapsedPanels] = useState<Record<string, boolean>>(() => {
    const initial = createAllCollapsedMap();
    if (controlledClassKey && controlledClassKey !== 'all' && !isEmptyClassKey(controlledClassKey)) {
      initial[controlledClassKey] = false;
    }
    return initial;
  });

  const [paginationResetNonce, setPaginationResetNonce] = useState<number>(0);
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

  const scrollToClassElement = useCallback((classKey: SelectableClassKey) => {
    const performScroll = (onlyIfOutOfPosition = false) => {
      const targetEl =
        classKey !== 'all' && !isEmptyClassKey(classKey)
          ? document.getElementById(`class-panel-${classKey}`)
          : isEmptyClassKey(classKey)
          ? document.getElementById('empty-class-panel') || document.getElementById('class-results-anchor')
          : document.getElementById('class-results-anchor');

      if (!targetEl) return;

      if (onlyIfOutOfPosition) {
        const top = targetEl.getBoundingClientRect().top;
        if (top >= 40 && top <= window.innerHeight * 0.55) {
          return;
        }
      }

      targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    requestAnimationFrame(() => {
      setTimeout(() => performScroll(false), 60);
      // Re-align gently if top banner images finish sizing right after view mount
      setTimeout(() => performScroll(true), 380);
    });
  }, []);

  const handleSelectClass = useCallback(
    (key: SelectableClassKey, shouldScroll = true) => {
      setSearchTerm('');
      setSelectedClassKey(key);
      setPaginationResetNonce((n) => n + 1);

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

  const lastHandledNonceRef = useRef<number>(0);

  // Sync panel expand/collapse state & smooth scroll whenever a class is selected from TopNavbar dropdown
  useEffect(() => {
    if (controlledClassKey === undefined) return;
    if (classSelectNonce === 0 || classSelectNonce === lastHandledNonceRef.current) return;
    lastHandledNonceRef.current = classSelectNonce;

    setSearchTerm('');
    setPaginationResetNonce((n) => n + 1);

    if (controlledClassKey === 'all') {
      setCollapsedPanels(createAllCollapsedMap());
    } else if (!isEmptyClassKey(controlledClassKey)) {
      const next = createAllCollapsedMap();
      next[controlledClassKey] = false;
      setCollapsedPanels(next);
      scrollToClassElement(controlledClassKey);
    } else {
      setCollapsedPanels(createAllCollapsedMap());
      scrollToClassElement(controlledClassKey);
    }
  }, [controlledClassKey, classSelectNonce, scrollToClassElement]);

  const togglePanelCollapse = (key: ClassLevelKey) => {
    setCollapsedPanels((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const collapseAllPanels = () => {
    setSelectedClassKey('all');
    setCollapsedPanels(createAllCollapsedMap());
  };

  const expandAllPanels = () => {
    setSelectedClassKey('all');
    setPaginationResetNonce((n) => n + 1);
    setCollapsedPanels({});
  };

  const prevTrimmedSearchRef = useRef<string>('');

  useEffect(() => {
    const prev = prevTrimmedSearchRef.current;
    prevTrimmedSearchRef.current = trimmedSearch;

    if (trimmedSearch && trimmedSearch !== prev) {
      setCollapsedPanels({});
      setPaginationResetNonce((n) => n + 1);
    } else if (!trimmedSearch && prev && selectedClassKey === 'all') {
      setCollapsedPanels(createAllCollapsedMap());
    }
  }, [trimmedSearch, selectedClassKey]);

  useEffect(() => {
    const timer = setTimeout(() => {
      scrollRevealEngine.scanAndObserve();
    }, 50);
    return () => clearTimeout(timer);
  }, [selectedClassKey, collapsedPanels, trimmedSearch]);

  // Intersection Observer for Quick Jump count-up animation (starts at ~30% visible, replays on scroll away & back)
  const quickJumpRef = useRef<HTMLDivElement>(null);
  const quickJumpInViewRef = useRef<boolean>(false);
  const [isQuickJumpVisible, setIsQuickJumpVisible] = useState<boolean>(false);
  const [quickJumpAnimKey, setQuickJumpAnimKey] = useState<number>(0);

  useEffect(() => {
    const el = quickJumpRef.current;
    if (!el) return;

    if (typeof IntersectionObserver === 'undefined') {
      quickJumpInViewRef.current = true;
      setIsQuickJumpVisible(true);
      setQuickJumpAnimKey((k) => k + 1);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;

        if (entry.isIntersecting && entry.intersectionRatio >= 0.3) {
          if (!quickJumpInViewRef.current) {
            quickJumpInViewRef.current = true;
            setIsQuickJumpVisible(true);
            setQuickJumpAnimKey((k) => k + 1);
          }
        } else if (!entry.isIntersecting) {
          if (quickJumpInViewRef.current) {
            quickJumpInViewRef.current = false;
            setIsQuickJumpVisible(false);
          }
        }
      },
      { threshold: [0, 0.3] }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Also replay the Quick Jump count-up when class view is reopened via navbar navigation while visible
  useEffect(() => {
    if (classSelectNonce > 0 && quickJumpInViewRef.current) {
      setQuickJumpAnimKey((k) => k + 1);
    }
  }, [classSelectNonce]);

  const handleCardClick = useCallback((sim: SimulationItem) => {
    openSimulationInNewTab(sim);
  }, []);

  const activeSimulations = simulations;

  const cleanCardTitle = (title: string): string => {
    return title
      .replace(/\.html$/i, '')
      .replace(/_/g, ' ')
      .replace(/\s{2,}/g, ' ')
      .trim();
  };

  const cleanCardSubject = (subject: string): string => {
    return subject
      .replace(/\|\s*GEN\s+Z\s+(?:EDTECH\s+)?INTERACTIVE(?:\s+SIMULATIONS?)?/gi, '')
      .replace(/\s{2,}/g, ' ')
      .trim();
  };

  const cleanCardDescription = (desc: string): string => {
    return desc.replace(/\s{2,}/g, ' ').trim();
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

  // Real-time keyword search across all simulations
  const baseDisplayedSims = useMemo(() => {
    return activeSimulations.filter((s) => matchesSearch(s));
  }, [activeSimulations, trimmedSearch]);

  // Group simulations by class by reference (Play Group / Prep through Class 10)
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

  const isViewingEmptyClass = isEmptyClassKey(selectedClassKey) && !trimmedSearch;

  const activeEmptyClassLabel = isViewingEmptyClass
    ? EMPTY_CLASS_LABELS[selectedClassKey as keyof typeof EMPTY_CLASS_LABELS]
    : null;

  const getClassPanelIcon = (classKey: ClassLevelKey) => {
    if (classKey === 'play-prep') return PlayPrepBlocksIcon;
    if (
      classKey === 'class-1' ||
      classKey === 'class-2' ||
      classKey === 'class-3' ||
      classKey === 'class-4' ||
      classKey === 'class-5'
    ) {
      return PrimaryBackpackIcon;
    }
    if (classKey === 'class-6' || classKey === 'class-7' || classKey === 'class-8') {
      return MiddleGlobeBookIcon;
    }
    return SecondaryMicroscopeIcon;
  };

  const expandedPanelCount = useMemo(() => {
    return CLASS_PANELS_CONFIG.filter(
      (p) => (simsByClass[p.key] || []).length > 0 && !collapsedPanels[p.key]
    ).length;
  }, [simsByClass, collapsedPanels]);

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    if (value.trim() && selectedClassKey !== 'all') {
      setSelectedClassKey('all');
    }
  };

  return (
    <section id="catalog" className="w-full space-y-6 pt-1 scroll-mt-24 opacity-100">
      <div className="w-full space-y-4">
        {/* Scoped Styles for Horizontal Class Panels & Horizontal Topic Cards */}
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

        {/* Top Class Overview Bar: Title, Expand/Collapse All, Keyword Search & Quick Jump Chips */}
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
                {activeEmptyClassLabel
                  ? activeEmptyClassLabel
                  : 'All Classes (Play Group / Prep – Class 10)'}
              </span>
              <span className="px-3 py-1 rounded-lg text-xs font-bold shadow-xs flex items-center gap-2 bg-[#EEF3F9] text-[#1B2A5C] border border-[#DDE5F3] font-mono">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#1E88E5] shrink-0" />
                {isViewingEmptyClass ? 0 : baseDisplayedSims.length} Active Simulations
              </span>
              {isViewingEmptyClass && (
                <button
                  type="button"
                  onClick={() => handleSelectClass('all', false)}
                  className="px-2.5 py-1 rounded-lg text-xs font-bold bg-[#EEF3F9] text-[#1E88E5] border border-[#DDE5F3] hover:bg-[#DBE7FB] transition-colors cursor-pointer"
                  title="Show all classes"
                >
                  Show All Classes &times;
                </button>
              )}
            </div>

            {/* List Controls: Collapse/Expand All & Keyword Search */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
              {!isViewingEmptyClass && (
                <div className="flex items-center justify-center gap-1.5 p-1 rounded-xl bg-[#EEF3F9] border border-[#DDE5F3]">
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
                    title="Expand all class panels (showing first 6 topics per class)"
                  >
                    <ChevronUp className="w-3.5 h-3.5 text-[#1546A8]" />
                    <span>Expand All</span>
                  </button>
                </div>
              )}

              {/* Quick Keyword Search across all classes */}
              <div className="relative flex items-center rounded-xl border border-[#C9D3E6] bg-[#FFFFFF] shadow-inner focus-within:ring-2 focus-within:ring-[#1E88E5] w-full min-w-0 sm:w-64">
                <Search className="w-4 h-4 ml-3.5 shrink-0 text-[#1E88E5]" />
                <input
                  type="text"
                  placeholder="Filter topics by keyword..."
                  value={searchTerm}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className="w-full py-2 px-3 text-xs sm:text-sm font-medium bg-transparent outline-none text-[#1B2A5C] placeholder-[#8A97B8] font-sans"
                />
                {searchTerm && (
                  <button
                    type="button"
                    onClick={() => setSearchTerm('')}
                    className="mr-2 text-xs font-bold px-1.5 py-0.5 rounded-full cursor-pointer bg-[#1E88E5] text-white hover:bg-[#1546A8]"
                    title="Clear search"
                    aria-label="Clear search"
                  >
                    &times;
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Quick Jump Responsive Grid of Roomy Class Boxes (Desktop-first: 6 per row on large screens) */}
          <div ref={quickJumpRef} className="pt-3.5 border-t border-[#EEF3F9] space-y-3 select-none">
            <div className="flex items-center justify-between gap-2">
              <span className="text-[11px] font-bold text-[#5A6E85] uppercase tracking-wider flex items-center gap-1">
                <span>Quick Jump:</span>
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-3.5 sm:gap-4 w-full">
              <button
                type="button"
                onClick={() => handleSelectClass('all', false)}
                className={`w-full min-h-[104px] sm:min-h-[112px] md:min-h-[116px] xl:min-h-[122px] 2xl:min-h-[128px] px-3.5 py-4 sm:px-4 sm:py-5 rounded-2xl transition-all duration-200 cursor-pointer flex flex-col items-center justify-center text-center border-2 ${
                  selectedClassKey === 'all'
                    ? 'text-white border-[#F5A623] hover:-translate-y-1'
                    : 'bg-[#F0F5FD] text-[#0B1B3F] border-[#A8BFE2] shadow-[0_4px_12px_rgba(15,30,66,0.08)] hover:bg-[#E4EEFC] hover:border-[#1546A8] hover:-translate-y-1 hover:shadow-[0_10px_22px_rgba(21,70,168,0.18)]'
                }`}
                style={{
                  fontFamily: "'Plus Jakarta Sans', 'Inter', system-ui, -apple-system, sans-serif",
                  ...(selectedClassKey === 'all'
                    ? {
                        background: 'linear-gradient(135deg, #0F1E42 0%, #1546A8 100%)',
                        boxShadow: '0 10px 24px rgba(15, 30, 66, 0.30)'
                      }
                    : {})
                }}
              >
                <span className="text-[20px] sm:text-[22px] md:text-[24px] xl:text-[26px] 2xl:text-[28px] font-extrabold leading-[1.15] tracking-tight text-balance">
                  All
                </span>
                <span
                  className={`text-[13px] sm:text-[14px] md:text-[15px] 2xl:text-[16px] font-semibold leading-snug tabular-nums ${
                    selectedClassKey === 'all' ? 'text-[#FDE68A]' : 'text-[#1E3A6E]'
                  }`}
                  style={{ fontVariantNumeric: 'tabular-nums' }}
                >
                  <AnimatedBadgeCounter
                    target={baseDisplayedSims.length}
                    isVisible={isQuickJumpVisible}
                    triggerKey={quickJumpAnimKey}
                    duration={2800}
                  />{' '}
                  {baseDisplayedSims.length === 1 ? 'simulation' : 'simulations'}
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
                    className={`w-full min-h-[104px] sm:min-h-[112px] md:min-h-[116px] xl:min-h-[122px] 2xl:min-h-[128px] px-3.5 py-4 sm:px-4 sm:py-5 rounded-2xl transition-all duration-200 cursor-pointer flex flex-col items-center justify-center text-center border-2 ${
                      isSelected
                        ? 'text-white border-[#F5A623] hover:-translate-y-1'
                        : 'bg-[#F0F5FD] text-[#0B1B3F] border-[#A8BFE2] shadow-[0_4px_12px_rgba(15,30,66,0.08)] hover:bg-[#E4EEFC] hover:border-[#1546A8] hover:-translate-y-1 hover:shadow-[0_10px_22px_rgba(21,70,168,0.18)]'
                    }`}
                    style={{
                      fontFamily: "'Plus Jakarta Sans', 'Inter', system-ui, -apple-system, sans-serif",
                      ...(isSelected
                        ? {
                            background: 'linear-gradient(135deg, #0F1E42 0%, #1546A8 100%)',
                            boxShadow: '0 10px 24px rgba(15, 30, 66, 0.30)'
                          }
                        : {})
                    }}
                  >
                    <span className="text-[20px] sm:text-[22px] md:text-[24px] xl:text-[26px] 2xl:text-[28px] font-extrabold leading-[1.15] tracking-tight break-words text-balance">
                      {cls.shortLabel}
                    </span>
                    <span
                      className={`text-[13px] sm:text-[14px] md:text-[15px] 2xl:text-[16px] font-semibold leading-snug tabular-nums ${
                        isSelected ? 'text-[#FDE68A]' : 'text-[#1E3A6E]'
                      }`}
                      style={{ fontVariantNumeric: 'tabular-nums' }}
                    >
                      <AnimatedBadgeCounter
                        target={count}
                        isVisible={isQuickJumpVisible}
                        triggerKey={quickJumpAnimKey}
                        duration={2800}
                      />{' '}
                      {count === 1 ? 'simulation' : 'simulations'}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Colored Collapsible Class Sections (Play Group / Prep – Class 10) */}
        {isViewingEmptyClass && activeEmptyClassLabel ? (
          <div
            id="empty-class-panel"
            className="scroll-mt-24 rounded-2xl p-8 sm:p-12 text-center text-white border shadow-lg transition-all"
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
                onClick={() => handleSelectClass('all', false)}
                className="px-5 py-3 rounded-xl text-xs font-bold cursor-pointer transition-all bg-[#1546A8] hover:bg-[#1B2A5C] text-[#DBE4F7] border border-[#2D62D1]"
              >
                View All Simulations
              </button>
            </div>
          </div>
        ) : baseDisplayedSims.length > 0 ? (
          <div className="space-y-6 w-full">
            {CLASS_PANELS_CONFIG.map((panel, panelIdx) => {
              const panelEntries = simsByClass[panel.key] || [];

              // Omit classes that have no matching simulations under current keyword search
              if (panelEntries.length === 0) return null;

              const PanelIcon = getClassPanelIcon(panel.key);
              const panelReveal = panelIdx % 2 === 0 ? 'reveal-left' : 'reveal-right';
              const isPanelCollapsed = !!collapsedPanels[panel.key];
              const isBarHighlighted = !isPanelCollapsed || selectedClassKey === panel.key;
              const shouldLazyOnScroll = expandedPanelCount > 1;

              return (
                <React.Fragment key={panel.key}>
                  <div
                    id={`class-panel-${panel.key}`}
                    className={`subject-panel-horizontal scroll-mt-20 ${panelReveal}`}
                    style={{
                      '--subject-color': '#1546A8',
                      '--subject-tint': 'rgba(21, 70, 168, 0.06)',
                      '--subject-shadow-color': 'rgba(15, 30, 66, 0.22)'
                    } as React.CSSProperties}
                  >
                    {/* Header Bar Across the Top in 2-Color Portal Brand Palette (Deep Blue + Soft Gold Accent) */}
                    <div
                      onClick={() => togglePanelCollapse(panel.key)}
                      className="px-5 py-3.5 sm:py-4 flex items-center justify-between gap-3 text-white select-none flex-wrap cursor-pointer hover:brightness-110 transition-all"
                      style={{
                        background: isBarHighlighted
                          ? 'linear-gradient(135deg, #132A60 0%, #1546A8 100%)'
                          : 'linear-gradient(135deg, #0F1E42 0%, #16326E 55%, #1546A8 100%)',
                        borderBottom: isBarHighlighted ? '2.5px solid #F5A623' : '1px solid rgba(255, 255, 255, 0.08)',
                        boxShadow: isBarHighlighted ? 'inset 5px 0 0 #F5A623' : 'none'
                      }}
                      title={
                        isPanelCollapsed ? `Click to open ${panel.name}` : `Click to collapse ${panel.name}`
                      }
                    >
                      <div className="flex items-center gap-3.5 min-w-0">
                        <div className="w-11 h-11 rounded-xl bg-white/95 border border-white/70 shadow-sm flex items-center justify-center shrink-0 p-1">
                          <PanelIcon className="w-9 h-9 pointer-events-none" />
                        </div>
                        <div className="min-w-0">
                          <h3 className="font-bold leading-tight text-white m-0 text-[18px] sm:text-[19px] font-heading">
                            {panel.name}
                          </h3>
                          <p className="text-[12px] sm:text-[13px] mt-0.5 font-medium leading-snug text-[#DBE4F7]">
                            {panel.subtitle}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span
                          className="px-3 py-1 rounded-full text-xs font-bold font-mono border transition-colors"
                          style={
                            isBarHighlighted
                              ? {
                                  backgroundColor: '#F5A623',
                                  color: '#0F1E42',
                                  borderColor: '#E58E0A'
                                }
                              : {
                                  backgroundColor: 'rgba(245, 166, 35, 0.16)',
                                  color: '#FDE68A',
                                  borderColor: 'rgba(245, 166, 35, 0.5)'
                                }
                          }
                        >
                          {panelEntries.length}{' '}
                          {panelEntries.length === 1 ? 'simulation' : 'simulations'}
                        </span>
                        <div
                          className="w-7 h-7 rounded-lg flex items-center justify-center text-white border transition-colors"
                          style={
                            isBarHighlighted
                              ? {
                                  backgroundColor: 'rgba(245, 166, 35, 0.22)',
                                  borderColor: 'rgba(245, 166, 35, 0.65)',
                                  color: '#FDE68A'
                                }
                              : {
                                  backgroundColor: 'rgba(255, 255, 255, 0.14)',
                                  borderColor: 'rgba(255, 255, 255, 0.28)'
                                }
                          }
                        >
                          {isPanelCollapsed ? (
                            <ChevronDown className="w-4 h-4" />
                          ) : (
                            <ChevronUp className="w-4 h-4" />
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Curriculum Subjects & Topic Cards — Mounted strictly on demand, 6 at a time */}
                    {!isPanelCollapsed && (
                      <LazyClassPanelBody
                        panel={panel}
                        panelEntries={panelEntries}
                        totalSimulationsCount={activeSimulations.length}
                        lazyOnScroll={shouldLazyOnScroll}
                        searchKey={trimmedSearch}
                        paginationResetNonce={paginationResetNonce}
                        onCardClick={handleCardClick}
                        onSelectSim={onSelectSim}
                      />
                    )}
                  </div>

                  {panel.key === 'class-5' && selectedClassKey === 'all' && !trimmedSearch && (
                    <LazyViewportMount>
                      <ChemistryBiologySlider />
                    </LazyViewportMount>
                  )}
                </React.Fragment>
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
                  type="button"
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
                type="button"
                onClick={() => {
                  handleSelectClass('all', false);
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
