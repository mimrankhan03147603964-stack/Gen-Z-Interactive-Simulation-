import React, { useState } from 'react';
import { SimulationItem } from '../types';
import { getSimTheme, getDisciplineColor } from '../data/simTheme';
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
    fullTitle: 'Urdu Language & Linguistics',
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
  // Tier 1 Grade Level filter state ('all' | 'primary' | 'middle' | 'secondary' | 'higher')
  const [selectedGradeTier, setSelectedGradeTier] = useState<string>('all');

  // Category state (Default to 'All Simulations')
  const [internalCategory, setInternalCategory] = useState<string>('All Simulations');

  // Quick search filter term
  const [searchTerm, setSearchTerm] = useState<string>('');

  const selectedCategory = controlledCategory !== undefined ? controlledCategory : internalCategory;

  const gradeTiers = [
    { key: 'all', label: 'All Grades', short: 'All', desc: 'Pre-K to Grade 12' },
    { key: 'primary', label: 'Primary (Grades 1–5)', short: 'Grades 1–5', desc: 'Foundational STEM & ECCE' },
    { key: 'middle', label: 'Middle School (Grades 6–8)', short: 'Grades 6–8', desc: 'General Sciences & Physics' },
    { key: 'secondary', label: 'Secondary / Matric (Grades 9–10)', short: 'Matric (9–10)', desc: 'Physics, Chemistry, Bio, CS' },
    { key: 'higher', label: 'Higher Secondary / F.Sc (Grades 11–12)', short: 'F.Sc (11–12)', desc: 'Advanced Mechanics & Calculus' },
  ];

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
          borderColor: 'rgba(255, 255, 255, 0.4)',
          boxShadow: `0 12px 28px -5px ${simTheme.glowColor || 'rgba(0, 80, 180, 0.35)'}, 0 6px 12px -4px rgba(0, 0, 0, 0.2), inset 0 1px 1px rgba(255, 255, 255, 0.5)`,
          transform: 'translateZ(0)'
        }}
      >
        {/* Subtle Specular Top Sheen */}
        <div className="absolute inset-0 pointer-events-none opacity-20 bg-gradient-to-b from-white/40 via-transparent to-black/25" />

        {/* Top Header: Visual Emblem Pedestal & Badges */}
        <div className="flex items-start justify-between gap-3 mb-3 relative z-10 pt-1">
          {/* Realistic Visual Emblem Pedestal on Solid High-Contrast Surface */}
          <a
            href={getSimulationStandaloneUrl(sim)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center shrink-0 p-1.5 group-hover:scale-105 transition-transform block bg-slate-950/75 border-2 border-white/50 shadow-lg"
            title={`Open ${displayTitle} in new tab`}
          >
            <TopicRealisticIcon 
              indexNumber={sim.indexNumber} 
              simId={sim.id} 
              className="w-10 h-10 drop-shadow-sm group-hover:scale-110 transition-transform duration-200 pointer-events-none shrink-0" 
            />
          </a>

          {/* 3D Badges: Lab / Concept & Grade inside rounded pill capsules */}
          <div className="flex flex-col items-end gap-1.5">
            <span 
              className="font-mono text-xs font-black px-3 py-1 rounded-full bg-slate-950 text-white shadow-md border border-white/60"
            >
              {isConceptGuide ? 'CONCEPT GUIDE' : `LAB ${sim.indexNumber}`}
            </span>
            <span 
              className="text-[11px] font-bold px-3 py-0.5 rounded-full font-mono shadow-xs bg-black/45 text-white border border-white/40"
            >
              {displayGrade}
            </span>
          </div>
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

          {/* Concept Description in Crisp High-Contrast White */}
          <p 
            className={`text-xs sm:text-[13px] font-normal text-white/95 mt-2 line-clamp-2 leading-relaxed drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)] ${
              isUrdu ? 'font-urdu leading-[2.2]' : ''
            }`}
            dir={isUrdu ? 'rtl' : 'ltr'}
          >
            {displayDesc}
          </p>

          {/* Topic Tags in Rounded Pill Capsules */}
          <div className="flex flex-wrap gap-1.5 mt-3">
            {sim.topics.slice(0, 2).map((topic, i) => {
              const cleanT = cleanCardTopic(topic, sim.category);
              const isTopicUrdu = /[\u0600-\u06FF]/.test(cleanT);
              return (
                <span
                  key={i}
                  className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full truncate max-w-[150px] shadow-xs bg-white/20 text-white border border-white/40 font-mono backdrop-blur-none ${
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
                className="text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-xs bg-black/35 text-white border border-white/40 font-mono"
              >
                +{sim.topics.length - 2}
              </span>
            )}
          </div>
        </div>

        {/* Card Action Bar */}
        <div className="relative z-10 pt-4 mt-auto border-t border-white/25 flex items-center justify-between gap-2">
          {/* Action Button: Solid High-Contrast Dark Button with Vibrant Accent */}
          <a
            href={getSimulationStandaloneUrl(sim)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="bg-slate-950 hover:bg-amber-400 text-white hover:text-slate-950 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-black flex items-center gap-2 cursor-pointer shadow-xl border-2 border-white/70 transition-all transform active:scale-95"
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
            className="w-10 h-10 rounded-2xl bg-slate-950/80 hover:bg-amber-400 text-white hover:text-slate-950 border-2 border-white/60 transition-all cursor-pointer flex items-center justify-center shadow-md active:scale-95"
            title="Launch in 4K Fullscreen View"
          >
            <Maximize2 className="w-4 h-4 pointer-events-none shrink-0" />
          </button>
        </div>
      </div>
    );
  };

  return (
    <section 
      id="catalog" 
      className="w-full space-y-6 pt-2 scroll-mt-28 opacity-100"
    >
      {/* Tier 1 Curriculum Filter Flow: Grade Level Tabs */}
      <div className="bg-white border-2 border-slate-200 shadow-md rounded-3xl p-4 sm:p-5 text-slate-800 transition-all">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 mb-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[10px] font-mono font-black uppercase tracking-wider text-sky-700 px-2.5 py-0.5 rounded-full bg-sky-50 border border-sky-200">
              TIER 1 GRADE LEVEL FILTER
            </span>
            <span className="text-xs sm:text-sm font-black text-slate-900 font-heading">
              Curriculum Grade &amp; Academic Stage
            </span>
          </div>
          <div className="flex items-center gap-2 flex-wrap text-[11px] font-semibold text-slate-500">
            <span>Aligned with National Curriculum of Pakistan (Session 2026-27)</span>
            {selectedGradeTier !== 'all' && (
              <button 
                type="button"
                onClick={() => setSelectedGradeTier('all')}
                className="text-sky-600 hover:text-blue-700 underline cursor-pointer text-xs font-bold ml-1"
                title="Reset grade filter to show all simulations"
              >
                Reset to All {activeSimulations.length} Labs
              </button>
            )}
          </div>
        </div>

        {/* OPEN RESPONSIVE GRID - EACH GRADE BOX HAS ITS OWN DISTINCT FULL-COLOR BACKGROUND */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-3 w-full">
          {gradeTiers.map((tier) => {
            const isSelectedTier = selectedGradeTier === tier.key;
            const count = getGradeTierCount(tier.key);
            const tierStyles: Record<string, { gradient: string; activeGlow: string }> = {
              all: {
                gradient: 'linear-gradient(135deg, #1e40af 0%, #2563eb 50%, #3b82f6 100%)',
                activeGlow: 'rgba(37, 99, 235, 0.45)'
              },
              primary: {
                gradient: 'linear-gradient(135deg, #065f46 0%, #059669 50%, #10b981 100%)',
                activeGlow: 'rgba(16, 185, 129, 0.45)'
              },
              middle: {
                gradient: 'linear-gradient(135deg, #0369a1 0%, #0284c7 50%, #06b6d4 100%)',
                activeGlow: 'rgba(6, 182, 212, 0.45)'
              },
              secondary: {
                gradient: 'linear-gradient(135deg, #3730a3 0%, #4f46e5 50%, #6366f1 100%)',
                activeGlow: 'rgba(99, 102, 241, 0.45)'
              },
              higher: {
                gradient: 'linear-gradient(135deg, #5b21b6 0%, #7c3aed 50%, #a855f7 100%)',
                activeGlow: 'rgba(168, 85, 247, 0.45)'
              }
            };
            const style = tierStyles[tier.key] || tierStyles.all;

            return (
              <button
                key={tier.key}
                type="button"
                onClick={() => setSelectedGradeTier(tier.key)}
                className={`w-full p-3.5 rounded-2xl text-xs font-bold transition-all flex flex-col justify-between items-start gap-1.5 cursor-pointer relative overflow-hidden ${
                  isSelectedTier
                    ? 'text-white border-2 border-white ring-4 ring-amber-300 shadow-xl scale-[1.03]'
                    : 'text-white border-2 border-white/40 shadow-md hover:scale-[1.02] hover:border-white'
                }`}
                style={{
                  background: style.gradient,
                  boxShadow: isSelectedTier ? `0 8px 22px ${style.activeGlow}, inset 0 1px 2px rgba(255,255,255,0.4)` : '0 4px 14px rgba(0,0,0,0.1)'
                }}
                title={`${tier.label}: ${tier.desc}`}
              >
                <div className="w-full flex items-center justify-between gap-1.5">
                  <span className="font-heading font-black text-xs sm:text-sm truncate text-white drop-shadow-sm">
                    {tier.label}
                  </span>
                  <span
                    className="font-mono text-[11px] font-black px-2.5 py-0.5 rounded-full shrink-0 bg-black/40 text-white shadow-md border border-white/30"
                  >
                    {count}
                  </span>
                </div>
                <div className="text-[10px] font-bold line-clamp-1 text-left text-white/95 drop-shadow-2xs">
                  {tier.desc}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Mobile & Tablet Subject Selector (< 1024px) */}
      <div className="block lg:hidden bg-white border-2 border-slate-200 shadow-md rounded-3xl p-4 sm:p-5 transition-all text-slate-800">
        <div className="flex items-center gap-2 mb-3">
          <Filter className="w-4 h-4 text-sky-600" />
          <span className="text-xs font-black uppercase tracking-wider text-slate-800 font-heading">
            Select STEM Discipline
          </span>
          <span className="ml-auto text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-sky-50 text-sky-700 border border-sky-200">
            {activeSimulations.length} Labs
          </span>
        </div>

        <div className="relative">
          <select
            value={selectedCategory}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="w-full py-2.5 px-3.5 pr-10 rounded-2xl text-xs sm:text-sm font-bold border border-[rgba(220,235,255,0.95)] appearance-none outline-none cursor-pointer transition-all shadow-2xs bg-white text-slate-800 focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
          >
            {subjectCategories.map((cat) => (
              <option key={cat.key} value={cat.key} className="bg-white text-slate-800">
                {cat.fullTitle} ({getCategoryCount(cat.key)} {getCategoryCount(cat.key) === 1 ? 'Lab' : 'Labs'})
              </option>
            ))}
          </select>
          <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-sky-600" />
        </div>
      </div>

      {/* Two-Column Responsive Desktop Architecture (>= 1024px) */}
      <div className="flex flex-col lg:flex-row items-start gap-8 w-full">
        
        {/* STEM DISCIPLINES PANEL */}
        <aside 
          className="hidden lg:block w-72 xl:w-80 shrink-0 sticky top-24 self-start bg-white border-2 border-slate-200 shadow-md rounded-3xl p-4 transition-all text-slate-800"
        >
          {/* Sidebar Top Header */}
          <div className="pb-3 mb-3 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-sky-600" />
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-800 font-heading">
                STEM Disciplines
              </h3>
            </div>
            <span className="font-mono text-[11px] font-black px-2.5 py-0.5 rounded-full bg-sky-50 text-sky-700 border border-sky-200">
              {activeSimulations.length} Labs Total
            </span>
          </div>

          {/* Subjects Selector Menu */}
          <div className="space-y-1.5">
            {subjectCategories.map((cat) => {
              const isSelectedSubject = selectedCategory === cat.key;
              const subjectCount = getCategoryCount(cat.key);
              const disc = getDisciplineColor(cat.key);

              return (
                <button
                  key={cat.key}
                  type="button"
                  onClick={() => handleCategoryChange(cat.key)}
                  className={`w-full p-2.5 sm:p-3 rounded-2xl flex items-center justify-between text-left cursor-pointer transition-all duration-200 group border-2 relative overflow-hidden ${
                    isSelectedSubject
                      ? 'text-white border-white scale-[1.02] shadow-lg ring-2 ring-sky-300'
                      : 'bg-white border-slate-200 hover:bg-sky-50/70 text-slate-800 hover:text-sky-700 hover:border-sky-300 shadow-xs'
                  }`}
                  style={{
                    background: isSelectedSubject ? `linear-gradient(135deg, ${disc.base} 0%, ${disc.dark} 100%)` : undefined,
                    boxShadow: isSelectedSubject ? `0 6px 18px -4px ${disc.glow}` : undefined
                  }}
                  title={`Filter by ${cat.fullTitle}`}
                >
                  <div className="flex items-center gap-2.5 min-w-0 relative z-10">
                    <div 
                      className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 p-1.5 shadow-xs border ${
                        isSelectedSubject ? 'bg-white/20 border-white/40 text-white' : 'bg-slate-100 border-slate-200 text-slate-800'
                      }`}
                    >
                      {cat.renderIcon({
                        className: `w-4 h-4 ${isSelectedSubject ? 'text-white' : 'text-slate-800'}`,
                        isSelected: isSelectedSubject,
                        isDark: false
                      })}
                    </div>

                    {/* Subject Name */}
                    <span 
                      className={`text-xs font-black truncate leading-tight font-heading ${
                        isSelectedSubject ? 'text-white' : 'text-slate-900 group-hover:text-sky-700'
                      }`}
                    >
                      {cat.fullTitle}
                    </span>
                  </div>

                  <span 
                    className={`font-mono text-[11px] font-black px-2.5 py-0.5 rounded-full shrink-0 ml-2 relative z-10 ${
                      isSelectedSubject 
                        ? 'bg-black/35 text-white border border-white/40 shadow-xs' 
                        : 'bg-slate-100 text-slate-700 border border-slate-200'
                    }`}
                  >
                    {cat.key === 'All Simulations' 
                      ? (selectedGradeTier !== 'all' ? `${subjectCount} / ${activeSimulations.length}` : `${activeSimulations.length} Labs`)
                      : subjectCount}
                  </span>
                </button>
              );
            })}
          </div>
        </aside>

        {/* Right Content Area: Simulation Cards Grid */}
        <div className="flex-1 min-w-0 space-y-6">
          
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
