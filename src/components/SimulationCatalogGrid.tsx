import React, { useState } from 'react';
import { SimulationItem } from '../types';
import { getSimTheme } from '../data/simTheme';
import { 
  Sparkles, 
  Search, 
  Maximize2, 
  CheckCircle2, 
  Filter, 
  ExternalLink, 
  Wand2, 
  Loader2, 
  ChevronDown, 
  Layers
} from 'lucide-react';

import { openSimulationInNewTab, getSimulationStandaloneUrl } from '../utils/navigation';
import { TopicRealisticIcon } from './TopicRealisticIcon';

interface SimulationCatalogGridProps {
  simulations: SimulationItem[];
  activeSim?: SimulationItem | null;
  selectedCategory?: string;
  onSelectCategory?: (category: string) => void;
  onSelectSim: (sim: SimulationItem) => void;
  onLaunchOnStage?: (sim: SimulationItem) => void;
  onTriggerAiGeneration?: (topic: string) => void;
  isGeneratingAi?: boolean;
  onLaunchFullscreenModal: (sim: SimulationItem) => void;
  isDarkMode?: boolean;
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
    renderIcon: ({ isSelected, className }) => (
      <svg className={className || "w-6 h-6"} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 2 7 12 12 22 7 12 2" fill={isSelected ? 'rgba(255,255,255,0.35)' : 'rgba(56,189,248,0.2)'} stroke={isSelected ? '#ffffff' : '#38bdf8'} />
        <polyline points="2 17 12 22 22 17" stroke={isSelected ? '#ffffff' : '#38bdf8'} />
        <polyline points="2 12 12 17 22 12" stroke={isSelected ? '#ffffff' : '#0ea5e9'} />
      </svg>
    )
  },
  {
    key: 'Physics & Motion',
    shortLabel: 'Physics & Motion',
    fullTitle: 'Physics & Classical Mechanics',
    iconBg: 'rgba(37, 99, 235, 0.16)',
    iconBorder: '#3b82f6',
    activeBorder: '#60a5fa',
    glowColor: 'rgba(37, 99, 235, 0.45)',
    renderIcon: ({ isSelected, className }) => (
      <svg className={className || "w-6 h-6"} viewBox="0 0 72 72" fill="none">
        <defs>
          <radialGradient id="physNucleus" cx="40%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="35%" stopColor="#38bdf8" />
            <stop offset="70%" stopColor="#2563eb" />
            <stop offset="100%" stopColor="#1e3a8a" />
          </radialGradient>
        </defs>
        <ellipse cx="36" cy="36" rx="28" ry="11" transform="rotate(30 36 36)" stroke={isSelected ? '#ffffff' : '#38bdf8'} strokeWidth="2.5" opacity="0.9" />
        <ellipse cx="36" cy="36" rx="28" ry="11" transform="rotate(-30 36 36)" stroke={isSelected ? '#ffffff' : '#60a5fa'} strokeWidth="2.5" opacity="0.9" />
        <circle cx="36" cy="36" r="9" fill="url(#physNucleus)" />
        <circle cx="58" cy="49" r="3.5" fill="#00f5ff" />
      </svg>
    )
  },
  {
    key: 'Chemistry & Matter',
    shortLabel: 'Chemistry & Matter',
    fullTitle: 'Chemistry & Molecular Science',
    iconBg: 'rgba(168, 85, 247, 0.16)',
    iconBorder: '#a855f7',
    activeBorder: '#d8b4fe',
    glowColor: 'rgba(147, 51, 234, 0.45)',
    renderIcon: ({ isSelected, className }) => (
      <svg className={className || "w-6 h-6"} viewBox="0 0 72 72" fill="none">
        <path d="M30 8 H42 V22 L58 54 C60 58 57 62 53 62 H19 C15 62 12 58 14 54 L30 22 V8 Z" 
          stroke={isSelected ? '#ffffff' : '#d8b4fe'} 
          strokeWidth="2.5" 
          strokeLinejoin="round" 
          fill="rgba(168, 85, 247, 0.15)" 
        />
        <rect x="27" y="6" width="18" height="3" rx="1.5" fill={isSelected ? '#ffffff' : '#c084fc'} />
        <path d="M19 44 Q28 41 36 45 T53 43 L56 54 C57 57 55 60 52 60 H20 C17 60 15 57 16 54 Z" fill="#a855f7" />
        <circle cx="30" cy="51" r="2.8" fill="#ffffff" opacity="0.9" />
      </svg>
    )
  },
  {
    key: 'Biology & Life',
    shortLabel: 'Biology & Life',
    fullTitle: 'Biology & Living Systems',
    iconBg: 'rgba(34, 197, 94, 0.16)',
    iconBorder: '#22c55e',
    activeBorder: '#86efac',
    glowColor: 'rgba(22, 163, 74, 0.45)',
    renderIcon: ({ isSelected, className }) => (
      <svg className={className || "w-6 h-6"} viewBox="0 0 72 72" fill="none">
        <path d="M38 12 C49 14 62 25 60 44 C58 56 46 62 34 60 C32 50 31 38 38 12 Z" 
          fill="#22c55e" 
          opacity="0.85" 
          stroke={isSelected ? '#ffffff' : '#86efac'} 
          strokeWidth="1.5" 
        />
        <path d="M12 14 Q28 24 19 34 Q10 44 28 54 Q19 64 12 68" stroke={isSelected ? '#ffffff' : '#34d399'} strokeWidth="3" fill="none" />
        <path d="M26 14 Q10 24 19 34 Q28 44 10 54 Q19 64 26 68" stroke={isSelected ? '#e0f2fe' : '#10b981'} strokeWidth="3" fill="none" />
      </svg>
    )
  },
  {
    key: 'Earth & Space',
    shortLabel: 'Earth & Space',
    fullTitle: 'Earth & Space Exploration',
    iconBg: 'rgba(2, 132, 199, 0.16)',
    iconBorder: '#0284c7',
    activeBorder: '#7dd3fc',
    glowColor: 'rgba(2, 132, 199, 0.45)',
    renderIcon: ({ isSelected, className }) => (
      <svg className={className || "w-6 h-6"} viewBox="0 0 72 72" fill="none">
        <ellipse cx="36" cy="36" rx="32" ry="11" transform="rotate(-22 36 36)" stroke="#f59e0b" strokeWidth="2.5" opacity="0.7" strokeDasharray="36 36" />
        <circle cx="36" cy="36" r="20" fill="#0284c7" stroke={isSelected ? '#ffffff' : '#7dd3fc'} strokeWidth="1.5" />
        <path d="M26 26 C28 22 37 23 41 26 C44 29 45 34 42 37 C38 40 33 36 31 38 C29 40 27 34 26 26 Z" fill="#22c55e" />
        <circle cx="60" cy="25" r="3.5" fill={isSelected ? '#ffffff' : '#fbbf24'} />
      </svg>
    )
  },
  {
    key: 'Mathematics & Logic',
    shortLabel: 'Mathematics & Logic',
    fullTitle: 'Mathematics & Geometry',
    iconBg: 'rgba(245, 158, 11, 0.16)',
    iconBorder: '#f59e0b',
    activeBorder: '#fdba74',
    glowColor: 'rgba(234, 88, 12, 0.45)',
    renderIcon: ({ isSelected, className }) => (
      <svg className={className || "w-6 h-6"} viewBox="0 0 72 72" fill="none">
        <line x1="10" y1="56" x2="62" y2="56" stroke={isSelected ? '#ffffff' : '#fb923c'} strokeWidth="2" />
        <line x1="16" y1="10" x2="16" y2="62" stroke={isSelected ? '#ffffff' : '#fb923c'} strokeWidth="2" />
        <path d="M16 56 Q28 18 42 42 T62 20" stroke={isSelected ? '#ffffff' : '#f59e0b'} strokeWidth="3" fill="none" />
        <circle cx="36" cy="16" r="4" fill="#fbbf24" stroke={isSelected ? '#ffffff' : '#7c2d12'} strokeWidth="1.2" />
      </svg>
    )
  },
  {
    key: 'Computer Science & IT',
    shortLabel: 'Computer Science & IT',
    fullTitle: 'Computer Science & Hardware',
    iconBg: 'rgba(20, 184, 166, 0.16)',
    iconBorder: '#14b8a6',
    activeBorder: '#5eead4',
    glowColor: 'rgba(13, 148, 136, 0.45)',
    renderIcon: ({ isSelected, className }) => (
      <svg className={className || "w-6 h-6"} viewBox="0 0 72 72" fill="none">
        <rect x="12" y="10" width="48" height="34" rx="4" fill="#042f2e" stroke={isSelected ? '#ffffff' : '#2dd4bf'} strokeWidth="2.5" />
        <line x1="18" y1="18" x2="30" y2="18" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" />
        <line x1="33" y1="18" x2="42" y2="18" stroke="#34d399" strokeWidth="2" strokeLinecap="round" />
        <rect x="25" y="52" width="22" height="3" rx="1.5" fill={isSelected ? '#ffffff' : '#14b8a6'} />
      </svg>
    )
  },
  {
    key: 'English & Grammar',
    shortLabel: 'English & Grammar',
    fullTitle: 'English & Spatial Linguistics',
    iconBg: 'rgba(139, 92, 246, 0.16)',
    iconBorder: '#8b5cf6',
    activeBorder: '#c4b5fd',
    glowColor: 'rgba(99, 102, 241, 0.45)',
    renderIcon: ({ isSelected, className }) => (
      <svg className={className || "w-6 h-6"} viewBox="0 0 72 72" fill="none">
        <path d="M36 54 C26 49 14 49 8 51 V21 C14 19 26 19 36 24 C46 19 58 19 64 21 V51 C58 49 46 49 36 54 Z" 
          fill="#312e81" 
          stroke={isSelected ? '#ffffff' : '#fbbf24'} 
          strokeWidth="2.2" 
        />
        <circle cx="26" cy="12" r="7" fill="#fbbf24" />
        <text x="23" y="16" fill="#1e1b4b" fontSize="11" fontWeight="900">A</text>
      </svg>
    )
  },
  {
    key: 'Early Childhood (ECCE)',
    shortLabel: 'Early Childhood (ECCE)',
    fullTitle: 'Early Childhood Care & Education',
    iconBg: 'rgba(244, 63, 94, 0.16)',
    iconBorder: '#f43f5e',
    activeBorder: '#fecdd3',
    glowColor: 'rgba(244, 63, 94, 0.45)',
    renderIcon: ({ isSelected, className }) => (
      <svg className={className || "w-6 h-6"} viewBox="0 0 72 72" fill="none">
        <polygon points="16,32 30,39 16,46 2,39" fill="#fda4af" stroke={isSelected ? '#ffffff' : '#fbbf24'} strokeWidth="1.5" />
        <polygon points="2,39 16,46 16,60 2,53" fill="#e11d48" stroke={isSelected ? '#ffffff' : '#fbbf24'} strokeWidth="1.5" />
        <polygon points="16,46 30,39 30,53 16,60" fill="#be123c" stroke={isSelected ? '#ffffff' : '#fbbf24'} strokeWidth="1.5" />
        <text x="5" y="53" fill="#ffffff" fontSize="11" fontWeight="900">A</text>
      </svg>
    )
  },
  {
    key: 'Urdu & Linguistics',
    shortLabel: 'Urdu & Linguistics',
    fullTitle: 'Urdu Language & Linguistics (اردو زبان و قواعد)',
    iconBg: 'rgba(16, 185, 129, 0.16)',
    iconBorder: '#10b981',
    activeBorder: '#6ee7b7',
    glowColor: 'rgba(16, 185, 129, 0.45)',
    renderIcon: ({ isSelected, className }) => (
      <svg className={className || "w-6 h-6"} viewBox="0 0 72 72" fill="none">
        <path d="M12 20 C22 18 34 18 36 24 C38 18 50 18 60 20 V54 C50 52 38 52 36 57 C34 52 22 52 12 54 Z" 
          fill={isSelected ? '#064e3b' : '#065f46'} 
          stroke={isSelected ? '#ffffff' : '#34d399'} 
          strokeWidth="2.2" 
        />
        <text x="36" y="42" fill="#fbbf24" fontSize="14" fontWeight="900" textAnchor="middle">اردو</text>
      </svg>
    )
  }
];

export const SimulationCatalogGrid: React.FC<SimulationCatalogGridProps> = ({
  simulations,
  activeSim,
  selectedCategory: controlledCategory,
  onSelectCategory,
  onSelectSim,
  onLaunchOnStage,
  onTriggerAiGeneration,
  isGeneratingAi = false,
  onLaunchFullscreenModal,
  isDarkMode = false
}) => {
  // Category state (Default to 'All Simulations')
  const [internalCategory, setInternalCategory] = useState<string>('All Simulations');
  
  // Quick search filter term
  const [searchTerm, setSearchTerm] = useState<string>('');

  const selectedCategory = controlledCategory !== undefined ? controlledCategory : internalCategory;

  const handleCategoryChange = (catKey: string) => {
    if (onSelectCategory) {
      onSelectCategory(catKey);
    } else {
      setInternalCategory(catKey);
    }
  };

  const handleCardClick = (sim: SimulationItem) => {
    openSimulationInNewTab(sim);
  };

  // All active simulation labs including standalone uploaded modules
  const activeSimulations = simulations;

  const cleanCardTitle = (title: string, category?: string): string => {
    let clean = title
      .replace(/\.html$/i, '')
      .replace(/_/g, ' ')
      .replace(/Cambridge\s+Scholar\s*[-–—]?\s*/gi, '')
      .trim();
    // Enforce English titles for all subjects except Urdu
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
      .replace(/\|\s*GEN\s+Z\s+EDTECH\s+INTERACTIVE/gi, '')
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
      return activeSimulations.length;
    }
    return activeSimulations.filter(s => s.category === categoryKey).length;
  };

  const subjectCategories = getSubjectCategories();
  const activeSubjectConfig = subjectCategories.find(c => c.key === selectedCategory) || subjectCategories[0];

  const isAllCategory = selectedCategory === 'All Simulations' || selectedCategory === 'All';

  // Simulations belonging to currently selected subject & filtered by search
  // In default "All Simulations" state, displays all simulation labs across all subjects
  const displayedSims = activeSimulations.filter(s => {
    if (!isAllCategory && s.category !== selectedCategory) return false;
    if (!matchesSearch(s)) return false;
    return true;
  });

  // Render a simulation card with full fidelity
  const renderCard = (sim: SimulationItem) => {
    const theme = getSimTheme(sim.indexNumber);
    const isActive = activeSim ? activeSim.id === sim.id : false;
    const isConceptGuide = sim.id === 'sim-ecce-curriculum-learning-areas';
    const displayTitle = cleanCardTitle(sim.title, sim.category);
    const displayGrade = cleanGradeBadge(sim.gradeLevel);
    const displaySubject = cleanCardSubject(sim.subject, sim.category);
    const displayDesc = cleanCardDescription(sim.description, sim.category);

    return (
      <div
        key={sim.id}
        onClick={(e) => {
          if ((e.target as HTMLElement).closest('button')) return;
          handleCardClick(sim);
        }}
        className={`rounded-2xl border transition-all duration-200 flex flex-col justify-between cursor-pointer group shadow-lg btn-3d relative overflow-hidden opacity-100 ${
          isActive ? 'scale-[1.01]' : ''
        }`}
        style={{
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          backgroundColor: isDarkMode ? 'rgba(10, 22, 51, 0.75)' : 'rgba(255, 255, 255, 0.92)',
          borderStyle: 'solid',
          borderTopWidth: isConceptGuide ? '5px' : '4px',
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
            {/* Realistic Visual Emblem */}
            <a
              href={getSimulationStandaloneUrl(sim)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                e.stopPropagation();
              }}
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center shrink-0 icon-tile-3d shadow-md group-hover:scale-105 transition-transform duration-200 p-1 block"
              style={{
                backgroundColor: theme.badgeBg,
                borderColor: theme.borderColor,
                borderWidth: '2px',
                borderStyle: 'solid',
                boxShadow: `0 4px 14px ${theme.glowColor}`
              }}
              title={`Open ${displayTitle} in new tab`}
            >
              <TopicRealisticIcon 
                indexNumber={sim.indexNumber}
                simId={sim.id}
                className="w-10 h-10 sm:w-11 sm:h-11 drop-shadow-sm group-hover:scale-110 transition-transform duration-200" 
              />
            </a>

            {/* Badges: Lab / Concept & Grade */}
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
                {isConceptGuide ? 'CONCEPT GUIDE' : `LAB ${sim.indexNumber}`}
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
                {displayGrade}
              </span>
            </div>
          </div>

          {/* Simulation Topic Title */}
          <h4 
            className="text-base font-black tracking-tight leading-snug line-clamp-2 group-hover:text-blue-500 transition-colors"
            style={{ color: isDarkMode ? '#ffffff' : '#0f172a' }}
          >
            <a
              href={getSimulationStandaloneUrl(sim)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                e.stopPropagation();
              }}
              className="hover:underline"
              title={`Open ${displayTitle} in new tab`}
            >
              {displayTitle}
            </a>
          </h4>

          {/* Subject & Sub-discipline */}
          <p 
            className="text-xs font-bold mt-1 line-clamp-1"
            style={{ color: isDarkMode ? '#38bdf8' : '#1d4ed8' }}
          >
            {displaySubject}
          </p>

          {/* Concept Description Intro */}
          <p 
            className="text-xs font-medium mt-2 line-clamp-2 leading-relaxed"
            style={{ color: isDarkMode ? '#cbd5e1' : '#475569' }}
          >
            {displayDesc}
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
                {cleanCardTopic(topic, sim.category)}
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
          <a
            href={getSimulationStandaloneUrl(sim)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="inline-flex items-center gap-1.5 text-xs font-black transition-all group-hover:scale-105 duration-150 px-2.5 py-1 rounded-lg text-white shadow-2xs cursor-pointer"
            style={{
              backgroundColor: theme.bgSolid,
              boxShadow: `0 2px 6px ${theme.glowColor}`
            }}
            title={isConceptGuide ? "Explore Detailed Pedagogical Concept Guide in New Tab" : "Launch Detailed Simulation Lab in New Tab"}
          >
            <ExternalLink className="w-3 h-3 text-white" />
            <span>{isConceptGuide ? 'Explore Concept' : 'Launch Lab'}</span>
          </a>

          {/* Direct Fullscreen Modal Button */}
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
            title="Launch in 4K Fullscreen View"
          >
            <Maximize2 className="w-3.5 h-3.5 text-white" />
          </button>
        </div>
      </div>
    );
  };

  return (
    <section 
      id="catalog" 
      className="w-full space-y-6 pt-2 scroll-mt-20 opacity-100"
    >
      {/* Mobile & Tablet Subject Selector (< 1024px) */}
      <div 
        className="block lg:hidden rounded-2xl p-4 sm:p-5 border shadow-xl transition-all"
        style={{
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          backgroundColor: isDarkMode ? 'rgba(10, 22, 51, 0.85)' : 'rgba(255, 255, 255, 0.95)',
          borderColor: isDarkMode ? 'rgba(56, 189, 248, 0.35)' : 'rgba(147, 197, 253, 0.7)',
          borderWidth: '1.5px',
          borderStyle: 'solid'
        }}
      >
        <div className="flex items-center gap-2 mb-3">
          <Filter className="w-4 h-4 text-blue-500" />
          <span className="text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-300">
            Select STEM Discipline
          </span>
          <span className="ml-auto text-xs font-mono font-bold px-2 py-0.5 rounded bg-blue-500/20 text-blue-400">
            {activeSimulations.length} Labs
          </span>
        </div>

        <div className="relative">
          <select
            value={selectedCategory}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="w-full py-2.5 px-3.5 pr-10 rounded-xl text-xs sm:text-sm font-black border appearance-none outline-none cursor-pointer transition-all shadow-sm"
            style={{
              backgroundColor: isDarkMode ? '#0b1633' : '#ffffff',
              borderColor: isDarkMode ? '#3b82f6' : '#93c5fd',
              color: isDarkMode ? '#ffffff' : '#0f172a'
            }}
          >
            {subjectCategories.map((cat) => (
              <option key={cat.key} value={cat.key}>
                {cat.fullTitle} ({getCategoryCount(cat.key)} {getCategoryCount(cat.key) === 1 ? 'Lab' : 'Labs'})
              </option>
            ))}
          </select>
          <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-blue-500" />
        </div>
      </div>

      {/* Two-Column Responsive Desktop Architecture (>= 1024px) */}
      <div className="flex flex-col lg:flex-row items-start gap-8 w-full">
        
        {/* =======================================================================
            SIDEBAR (STEM DISCIPLINES PANEL):
            1. "All Simulations" option as the very first item at top (Default state)
            2. Total count badge showing all available labs (e.g. 51 Labs)
            3. Appropriate STEM / layers icon matching design style
            4. Individual subjects clearly highlighted when selected
            5. Clicking back on "All Simulations" resets filter to display all labs
            ======================================================================= */}
        <aside 
          className="hidden lg:block w-72 xl:w-80 shrink-0 sticky top-20 self-start rounded-2xl border shadow-xl p-4 transition-all"
          style={{
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            backgroundColor: isDarkMode ? 'rgba(10, 22, 51, 0.88)' : 'rgba(255, 255, 255, 0.94)',
            borderColor: isDarkMode ? 'rgba(56, 189, 248, 0.3)' : 'rgba(203, 213, 225, 0.8)',
            borderWidth: '1.5px',
            borderStyle: 'solid',
            boxShadow: isDarkMode ? '0 12px 36px rgba(0, 0, 0, 0.45)' : '0 8px 32px rgba(31, 38, 135, 0.08)'
          }}
        >
          {/* Sidebar Top Header */}
          <div className="pb-3 mb-3 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-blue-500" />
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white">
                STEM Disciplines
              </h3>
            </div>
            <span className="font-mono text-[11px] font-black px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-500">
              {activeSimulations.length} Labs
            </span>
          </div>

          {/* Subjects Selector Menu (Beginning with "All Simulations" as Top Default) */}
          <div className="space-y-2">
            {subjectCategories.map((cat) => {
              const isSelectedSubject = selectedCategory === cat.key;
              const subjectCount = getCategoryCount(cat.key);

              return (
                <button
                  key={cat.key}
                  type="button"
                  onClick={() => handleCategoryChange(cat.key)}
                  className={`w-full p-3 rounded-xl flex items-center justify-between text-left cursor-pointer transition-all duration-200 group border ${
                    isSelectedSubject
                      ? 'shadow-md scale-[1.01]'
                      : 'hover:scale-[1.005]'
                  }`}
                  style={{
                    backgroundColor: isSelectedSubject
                      ? (isDarkMode ? 'rgba(37, 99, 235, 0.28)' : 'rgba(239, 246, 255, 0.95)')
                      : (isDarkMode ? 'rgba(15, 23, 42, 0.4)' : '#ffffff'),
                    borderColor: isSelectedSubject
                      ? (isDarkMode ? '#38bdf8' : '#2563eb')
                      : (isDarkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(226, 232, 240, 0.9)'),
                    borderWidth: isSelectedSubject ? '2px' : '1px'
                  }}
                  title={`Filter by ${cat.fullTitle}`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div 
                      className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 p-1.5 shadow-xs transition-transform group-hover:scale-105"
                      style={{
                        backgroundColor: isSelectedSubject ? cat.activeBorder : (isDarkMode ? '#1e293b' : cat.iconBg),
                        border: `1px solid ${cat.iconBorder}`
                      }}
                    >
                      {cat.renderIcon({
                        className: "w-5 h-5",
                        isSelected: isSelectedSubject,
                        isDark: isDarkMode
                      })}
                    </div>

                    {/* Clean Subject Name */}
                    <span 
                      className={`text-xs font-black truncate leading-tight ${
                        isSelectedSubject 
                          ? 'text-blue-600 dark:text-cyan-300' 
                          : 'text-slate-800 dark:text-slate-200 group-hover:text-blue-500'
                      }`}
                    >
                      {cat.fullTitle}
                    </span>
                  </div>

                  <span 
                    className="font-mono text-[11px] font-black px-2 py-0.5 rounded-full shrink-0 ml-2 shadow-2xs"
                    style={{
                      backgroundColor: isSelectedSubject ? '#2563eb' : (isDarkMode ? '#1e293b' : '#e2e8f0'),
                      color: isSelectedSubject ? '#ffffff' : (isDarkMode ? '#94a3b8' : '#64748b')
                    }}
                  >
                    {cat.key === 'All Simulations' ? `${subjectCount} Labs` : subjectCount}
                  </span>
                </button>
              );
            })}
          </div>
        </aside>

        {/* Right Content Area: Simulation Cards Grid */}
        <div className="flex-1 min-w-0 space-y-6">
          
          {/* Top Breadcrumb & Quick Search Filter Bar */}
          <div 
            className="rounded-2xl p-4 sm:p-5 border shadow-xl transition-all"
            style={{
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              backgroundColor: isDarkMode ? 'rgba(10, 22, 51, 0.78)' : 'rgba(255, 255, 255, 0.92)',
              borderColor: isDarkMode ? 'rgba(56, 189, 248, 0.3)' : 'rgba(255, 255, 255, 0.65)',
              borderWidth: '1.5px',
              borderStyle: 'solid',
              boxShadow: isDarkMode ? '0 8px 32px 0 rgba(0, 0, 0, 0.45)' : '0 8px 32px 0 rgba(31, 38, 135, 0.08)'
            }}
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              
              {/* Breadcrumb & Subject Header */}
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400 flex-wrap">
                  <span 
                    onClick={() => handleCategoryChange('All Simulations')}
                    className="cursor-pointer hover:text-blue-500"
                  >
                    Interactive Catalog
                  </span>
                  <span>&gt;</span>
                  <span className="text-blue-600 dark:text-blue-400 font-extrabold">
                    {isAllCategory ? 'All Simulations' : activeSubjectConfig.fullTitle}
                  </span>
                </div>

                <div className="flex items-center gap-2.5 flex-wrap">
                  <h2 
                    className="text-xl sm:text-2xl font-black tracking-tight"
                    style={{ color: isDarkMode ? '#ffffff' : '#0f172a' }}
                  >
                    {isAllCategory ? 'All STEM Simulations' : activeSubjectConfig.fullTitle}
                  </h2>
                  <span 
                    className="px-2.5 py-0.5 rounded-full text-xs font-black shadow-2xs flex items-center gap-1"
                    style={{ backgroundColor: '#2563eb', color: '#ffffff' }}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    {displayedSims.length} {displayedSims.length === 1 ? 'Lab Available' : 'Labs Available'}
                  </span>
                </div>
              </div>

              {/* Quick Search Bar to Filter Labs Instantly */}
              <div className="w-full md:w-80 shrink-0">
                <div 
                  className="relative flex items-center rounded-xl border shadow-inner transition-all"
                  style={{
                    backgroundColor: isDarkMode ? 'rgba(6, 14, 34, 0.85)' : 'rgba(248, 250, 252, 0.95)',
                    borderColor: isDarkMode ? 'rgba(56, 189, 248, 0.4)' : 'rgba(148, 163, 184, 0.6)',
                    borderWidth: '1.5px',
                    borderStyle: 'solid'
                  }}
                >
                  <Search className="w-4 h-4 ml-3 shrink-0" style={{ color: isDarkMode ? '#38bdf8' : '#2563eb' }} />
                  <input
                    type="text"
                    placeholder="Search labs across disciplines..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full py-2 px-2.5 text-xs font-bold bg-transparent outline-none"
                    style={{ color: isDarkMode ? '#ffffff' : '#0f172a' }}
                  />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm('')}
                      className="mr-2 text-xs font-black px-1.5 py-0.5 rounded cursor-pointer"
                      style={{
                        backgroundColor: isDarkMode ? '#1e293b' : '#e2e8f0',
                        color: isDarkMode ? '#ffffff' : '#0f172a'
                      }}
                      title="Clear search"
                    >
                      &times;
                    </button>
                  )}
                </div>
              </div>

            </div>
          </div>

          {/* Cards Grid: 2 or 3 Columns for Selected Subject / All Simulations */}
          {displayedSims.length > 0 ? (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
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

      </div>
    </section>
  );
};
