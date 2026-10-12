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
  Filter,
  Calculator,
  Shapes,
  Scale,
  Ruler,
  BookOpen,
  Computer,
  Keyboard,
  Baby,
  Dna,
  TestTube,
  Magnet,
  ExternalLink
} from 'lucide-react';

import { openSimulationInNewTab, getSimulationStandaloneUrl } from '../utils/navigation';

interface SimulationCatalogGridProps {
  simulations: SimulationItem[];
  activeSim?: SimulationItem | null;
  selectedCategory?: string;
  onSelectCategory?: (category: string) => void;
  onSelectSim: (sim: SimulationItem) => void;
  onLaunchFullscreenModal: (sim: SimulationItem) => void;
  isDarkMode?: boolean;
}

// 3D Vibrant colorful icon mapper preserving original rich colors
const renderTopicIcon = (iconName: string, iconColor?: string) => {
  const getIconColor = () => {
    if (iconColor && iconColor !== '#ffffff') return iconColor;
    switch (iconName) {
      case 'Activity': return '#10b981'; // Emerald
      case 'Atom': return '#06b6d4'; // Cyan
      case 'Zap': return '#f59e0b'; // Amber
      case 'Flame': return '#f43f5e'; // Rose
      case 'Gauge': return '#3b82f6'; // Royal Blue
      case 'Sun': return '#eab308'; // Bright Gold
      case 'Sparkles': return '#ec4899'; // Radiant Pink
      case 'FlaskConical': return '#a855f7'; // Purple
      case 'Rocket': return '#ef4444'; // Scarlet
      case 'Cpu': return '#0284c7'; // Sky Blue
      case 'Leaf': return '#22c55e'; // Green
      case 'Cog': return '#f97316'; // Orange
      case 'Layers': return '#8b5cf6'; // Violet
      case 'Globe': return '#0284c7'; // Ocean
      case 'Moon': return '#38bdf8'; // Lunar Cyan
      case 'CircleDot': return '#f43f5e'; // Rose
      case 'Orbit': return '#6366f1'; // Indigo
      case 'Telescope': return '#8b5cf6'; // Violet
      case 'Calculator': return '#4f46e5'; // Indigo
      case 'Shapes': return '#d946ef'; // Fuchsia
      case 'Scale': return '#0ea5e9'; // Cyan
      case 'Ruler': return '#f59e0b'; // Amber
      case 'Computer': return '#0284c7'; // Cyan
      case 'Keyboard': return '#7c3aed'; // Purple
      case 'BookOpen': return '#ec4899'; // Hot Pink
      case 'Baby': return '#f59e0b'; // Warm Amber
      case 'Dna': return '#10b981'; // Emerald
      case 'TestTube': return '#a855f7'; // Purple
      case 'Magnet': return '#06b6d4'; // Electric Cyan
      default: return '#3b82f6';
    }
  };
  const color = getIconColor();
  const iconProps = { 
    className: "w-5 h-5 transition-transform group-hover:scale-110",
    style: { color, stroke: color }
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
    case 'Calculator': return <Calculator {...iconProps} />;
    case 'Shapes': return <Shapes {...iconProps} />;
    case 'Scale': return <Scale {...iconProps} />;
    case 'Ruler': return <Ruler {...iconProps} />;
    case 'Computer': return <Computer {...iconProps} />;
    case 'Keyboard': return <Keyboard {...iconProps} />;
    case 'BookOpen': return <BookOpen {...iconProps} />;
    case 'Baby': return <Baby {...iconProps} />;
    case 'Dna': return <Dna {...iconProps} />;
    case 'TestTube': return <TestTube {...iconProps} />;
    case 'Magnet': return <Magnet {...iconProps} />;
    default: return <Atom {...iconProps} />;
  }
};

// Prominent Subject configuration matching all 8 disciplines + All Subjects
interface SubjectCategoryConfig {
  key: string;
  shortLabel: string;
  fullTitle: string;
  subtitle: string;
  badgeCount: number;
  colorName: string;
  iconBg: string;
  iconBorder: string;
  activeGradient: string;
  activeBorder: string;
  glowColor: string;
  lightCardBg: string;
  darkCardBg: string;
  lightBorder: string;
  darkBorder: string;
  textColorLight: string;
  textColorDark: string;
  renderIcon: (props: { className?: string; isSelected?: boolean; isDark?: boolean }) => React.ReactNode;
}

const getSubjectCategories = (totalSims: number, getCategoryCount: (cat: string) => number): SubjectCategoryConfig[] => [
  {
    key: 'All',
    shortLabel: 'All Subjects',
    fullTitle: 'All STEM Disciplines',
    subtitle: 'Comprehensive 33-Lab Suite',
    badgeCount: totalSims,
    colorName: 'Colorful Dashboard',
    iconBg: 'rgba(59, 130, 246, 0.16)',
    iconBorder: '#60a5fa',
    activeGradient: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 50%, #4338ca 100%)',
    activeBorder: '#93c5fd',
    glowColor: 'rgba(37, 99, 235, 0.45)',
    lightCardBg: 'rgba(255, 255, 255, 0.95)',
    darkCardBg: 'rgba(10, 22, 51, 0.85)',
    lightBorder: 'rgba(147, 197, 253, 0.8)',
    darkBorder: 'rgba(59, 130, 246, 0.4)',
    textColorLight: '#1e3a8a',
    textColorDark: '#93c5fd',
    renderIcon: ({ className = "w-7 h-7" }) => (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1.5" className="text-blue-500 fill-blue-500/20" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" className="text-purple-500 fill-purple-500/20" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" className="text-emerald-500 fill-emerald-500/20" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" className="text-amber-500 fill-amber-500/20" />
      </svg>
    )
  },
  {
    key: 'Physics & Motion',
    shortLabel: 'Physics & Motion',
    fullTitle: 'Physics & Classical Mechanics',
    subtitle: 'Kinematics, Optics & Energy',
    badgeCount: getCategoryCount('Physics & Motion'),
    colorName: 'Electric Blue',
    iconBg: 'rgba(37, 99, 235, 0.16)',
    iconBorder: '#3b82f6',
    activeGradient: 'linear-gradient(135deg, #1d4ed8 0%, #2563eb 50%, #0284c7 100%)',
    activeBorder: '#60a5fa',
    glowColor: 'rgba(37, 99, 235, 0.45)',
    lightCardBg: 'rgba(239, 246, 255, 0.95)',
    darkCardBg: 'rgba(12, 27, 65, 0.85)',
    lightBorder: '#93c5fd',
    darkBorder: 'rgba(59, 130, 246, 0.45)',
    textColorLight: '#1d4ed8',
    textColorDark: '#60a5fa',
    renderIcon: ({ className = "w-7 h-7" }) => (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(30 12 12)" className="text-blue-400" />
        <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(-30 12 12)" className="text-cyan-400" />
        <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(90 12 12)" className="text-sky-400" />
        <circle cx="12" cy="12" r="2.5" className="fill-blue-500 text-blue-600" />
      </svg>
    )
  },
  {
    key: 'Chemistry & Matter',
    shortLabel: 'Chemistry & Matter',
    fullTitle: 'Chemistry & Molecular Science',
    subtitle: 'Reactions, Acids & Atoms',
    badgeCount: getCategoryCount('Chemistry & Matter'),
    colorName: 'Vibrant Purple',
    iconBg: 'rgba(168, 85, 247, 0.16)',
    iconBorder: '#a855f7',
    activeGradient: 'linear-gradient(135deg, #7e22ce 0%, #9333ea 50%, #c026d3 100%)',
    activeBorder: '#d8b4fe',
    glowColor: 'rgba(147, 51, 234, 0.45)',
    lightCardBg: 'rgba(250, 245, 255, 0.95)',
    darkCardBg: 'rgba(34, 13, 62, 0.85)',
    lightBorder: '#d8b4fe',
    darkBorder: 'rgba(168, 85, 247, 0.45)',
    textColorLight: '#7e22ce',
    textColorDark: '#c084fc',
    renderIcon: ({ className = "w-7 h-7" }) => (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 2v5.5L4.4 17.5A3 3 0 0 0 7 22h10a3 3 0 0 0 2.6-4.5L14 7.5V2" className="text-purple-500" />
        <path d="M8.5 2h7" className="text-purple-400" />
        <path d="M6 16c2 1 4-1 6 0s4 1 6 0" className="text-fuchsia-400 stroke-dasharray-1" />
        <circle cx="9" cy="18" r="1" className="fill-purple-400 text-purple-400" />
        <circle cx="14" cy="17" r="1.5" className="fill-fuchsia-400 text-fuchsia-400" />
      </svg>
    )
  },
  {
    key: 'Biology & Life',
    shortLabel: 'Biology & Life',
    fullTitle: 'Biology & Living Systems',
    subtitle: 'Genetics, Plants & Organisms',
    badgeCount: getCategoryCount('Biology & Life'),
    colorName: 'Vibrant Green',
    iconBg: 'rgba(34, 197, 94, 0.16)',
    iconBorder: '#22c55e',
    activeGradient: 'linear-gradient(135deg, #15803d 0%, #16a34a 50%, #059669 100%)',
    activeBorder: '#86efac',
    glowColor: 'rgba(22, 163, 74, 0.45)',
    lightCardBg: 'rgba(240, 253, 244, 0.95)',
    darkCardBg: 'rgba(10, 38, 24, 0.85)',
    lightBorder: '#86efac',
    darkBorder: 'rgba(34, 197, 94, 0.45)',
    textColorLight: '#15803d',
    textColorDark: '#4ade80',
    renderIcon: ({ className = "w-7 h-7" }) => (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 15c6.667-6 13.333 0 20-6" className="text-emerald-500" />
        <path d="M9 22c1.798-1.998 2.518-3.995 2.807-5.993" className="text-green-500" />
        <path d="M15 2c-1.798 1.998-2.518 3.995-2.807 5.993" className="text-teal-400" />
        <path d="M17 6l-2.5 2.5" className="text-emerald-400" />
        <path d="M14 8l-4 4" className="text-green-400" />
        <path d="M7 15l-2.5 2.5" className="text-emerald-500" />
        <circle cx="12" cy="12" r="2" className="fill-emerald-400 text-emerald-500" />
      </svg>
    )
  },
  {
    key: 'Earth & Space',
    shortLabel: 'Earth & Space',
    fullTitle: 'Earth & Space Exploration',
    subtitle: 'Planets, Tectonics & Orbits',
    badgeCount: getCategoryCount('Earth & Space'),
    colorName: 'Sky Blue',
    iconBg: 'rgba(2, 132, 199, 0.16)',
    iconBorder: '#0284c7',
    activeGradient: 'linear-gradient(135deg, #0369a1 0%, #0284c7 50%, #0891b2 100%)',
    activeBorder: '#7dd3fc',
    glowColor: 'rgba(2, 132, 199, 0.45)',
    lightCardBg: 'rgba(240, 249, 255, 0.95)',
    darkCardBg: 'rgba(8, 29, 58, 0.85)',
    lightBorder: '#7dd3fc',
    darkBorder: 'rgba(2, 132, 199, 0.45)',
    textColorLight: '#0369a1',
    textColorDark: '#38bdf8',
    renderIcon: ({ className = "w-7 h-7" }) => (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" className="text-sky-500" />
        <path d="M3.6 9h16.8" className="text-sky-400" />
        <path d="M3.6 15h16.8" className="text-sky-400" />
        <ellipse cx="12" cy="12" rx="4.5" ry="9" className="text-cyan-400" />
      </svg>
    )
  },
  {
    key: 'Mathematics & Logic',
    shortLabel: 'Mathematics & Logic',
    fullTitle: 'Mathematics & Geometry',
    subtitle: 'Equations, Algebra & Shapes',
    badgeCount: getCategoryCount('Mathematics & Logic'),
    colorName: 'Amber / Orange',
    iconBg: 'rgba(245, 158, 11, 0.16)',
    iconBorder: '#f59e0b',
    activeGradient: 'linear-gradient(135deg, #c2410c 0%, #ea580c 50%, #d97706 100%)',
    activeBorder: '#fdba74',
    glowColor: 'rgba(234, 88, 12, 0.45)',
    lightCardBg: 'rgba(255, 247, 237, 0.95)',
    darkCardBg: 'rgba(48, 21, 9, 0.85)',
    lightBorder: '#fed7aa',
    darkBorder: 'rgba(245, 158, 11, 0.45)',
    textColorLight: '#c2410c',
    textColorDark: '#fb923c',
    renderIcon: ({ className = "w-7 h-7" }) => (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="2" width="16" height="20" rx="2" className="text-amber-500" />
        <line x1="8" y1="6" x2="16" y2="6" className="text-orange-400" />
        <line x1="16" y1="14" x2="16" y2="18" className="text-amber-500" />
        <path d="M16 10h.01M12 10h.01M8 10h.01M12 14h.01M8 14h.01M12 18h.01M8 18h.01" className="text-amber-600 stroke-width-3" />
      </svg>
    )
  },
  {
    key: 'Computer Science & IT',
    shortLabel: 'Computer Science & IT',
    fullTitle: 'Computer Science & Hardware',
    subtitle: 'Binary, CPU & Peripherals',
    badgeCount: getCategoryCount('Computer Science & IT'),
    colorName: 'Teal',
    iconBg: 'rgba(20, 184, 166, 0.16)',
    iconBorder: '#14b8a6',
    activeGradient: 'linear-gradient(135deg, #0f766e 0%, #0d9488 50%, #0284c7 100%)',
    activeBorder: '#5eead4',
    glowColor: 'rgba(13, 148, 136, 0.45)',
    lightCardBg: 'rgba(240, 253, 250, 0.95)',
    darkCardBg: 'rgba(7, 39, 36, 0.85)',
    lightBorder: '#99f6e4',
    darkBorder: 'rgba(20, 184, 166, 0.45)',
    textColorLight: '#0f766e',
    textColorDark: '#2dd4bf',
    renderIcon: ({ className = "w-7 h-7" }) => (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" className="text-teal-500" />
        <line x1="8" y1="21" x2="16" y2="21" className="text-teal-400" />
        <line x1="12" y1="17" x2="12" y2="21" className="text-teal-400" />
        <path d="M6 8l3 3-3 3" className="text-emerald-400" />
        <line x1="11" y1="14" x2="16" y2="14" className="text-teal-300" />
      </svg>
    )
  },
  {
    key: 'English & Grammar',
    shortLabel: 'English & Grammar',
    fullTitle: 'English & Spatial Linguistics',
    subtitle: '3D Prepositions & Vocabulary',
    badgeCount: getCategoryCount('English & Grammar'),
    colorName: 'Violet',
    iconBg: 'rgba(139, 92, 246, 0.16)',
    iconBorder: '#8b5cf6',
    activeGradient: 'linear-gradient(135deg, #5b21b6 0%, #7c3aed 50%, #9333ea 100%)',
    activeBorder: '#c4b5fd',
    glowColor: 'rgba(124, 58, 237, 0.45)',
    lightCardBg: 'rgba(245, 243, 255, 0.95)',
    darkCardBg: 'rgba(28, 15, 59, 0.85)',
    lightBorder: '#ddd6fe',
    darkBorder: 'rgba(139, 92, 246, 0.45)',
    textColorLight: '#6d28d9',
    textColorDark: '#a78bfa',
    renderIcon: ({ className = "w-7 h-7" }) => (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" className="text-violet-400" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" className="text-violet-500" />
        <path d="M9 7h6M9 11h4" className="text-purple-300" />
      </svg>
    )
  },
  {
    key: 'Early Childhood (ECCE)',
    shortLabel: 'Early Childhood (ECCE)',
    fullTitle: 'Early Childhood Care & Education',
    subtitle: 'Sensory Blocks, Shapes & Color',
    badgeCount: getCategoryCount('Early Childhood (ECCE)'),
    colorName: 'Pink',
    iconBg: 'rgba(236, 72, 153, 0.16)',
    iconBorder: '#ec4899',
    activeGradient: 'linear-gradient(135deg, #be185d 0%, #db2777 50%, #e11d48 100%)',
    activeBorder: '#fbcfe8',
    glowColor: 'rgba(219, 39, 119, 0.45)',
    lightCardBg: 'rgba(253, 242, 248, 0.95)',
    darkCardBg: 'rgba(49, 13, 31, 0.85)',
    lightBorder: '#fbcfe8',
    darkBorder: 'rgba(236, 72, 153, 0.45)',
    textColorLight: '#be185d',
    textColorDark: '#f472b6',
    renderIcon: ({ className = "w-7 h-7" }) => (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="8" height="8" rx="2" className="text-pink-500 fill-pink-500/20" />
        <rect x="13" y="3" width="8" height="8" rx="2" className="text-rose-400 fill-rose-400/20" />
        <rect x="3" y="13" width="8" height="8" rx="2" className="text-fuchsia-400 fill-fuchsia-400/20" />
        <circle cx="17" cy="17" r="4" className="text-pink-400 fill-pink-400/30" />
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
  onLaunchFullscreenModal,
  isDarkMode = false
}) => {
  // By default, 'All' must be selected when the page opens, displaying all 33 simulation topic cards neatly organized below
  const [internalCategory, setInternalCategory] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const selectedCategory = controlledCategory !== undefined ? controlledCategory : internalCategory;

  const handleCategoryChange = (cat: string) => {
    if (onSelectCategory) {
      onSelectCategory(cat);
    } else {
      setInternalCategory(cat);
    }
  };

  const handleCardClick = (sim: SimulationItem) => {
    // Open in separate new tab/window leaving main catalog portal completely clean & active
    openSimulationInNewTab(sim);
    onSelectSim(sim);
  };

  const matchesSearch = (sim: SimulationItem) => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return (
      sim.title.toLowerCase().includes(term) ||
      sim.indexNumber.includes(term) ||
      sim.subject.toLowerCase().includes(term) ||
      sim.description.toLowerCase().includes(term)
    );
  };

  const getCategoryCount = (categoryKey: string) => {
    return simulations.filter(s => s.category === categoryKey).length;
  };

  const subjectCategories = getSubjectCategories(simulations.length, getCategoryCount);

  // Determine active subject configuration for visual summary
  const activeSubjectConfig = subjectCategories.find(c => c.key === selectedCategory) || subjectCategories[0];

  return (
    <section 
      id="catalog" 
      className="w-full space-y-8 pt-4 scroll-mt-20 opacity-100"
    >
      {/* 1. Website Section Header with Search Bar */}
      <div 
        className="rounded-2xl p-6 sm:p-8 border shadow-xl transition-all"
        style={{
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          backgroundColor: isDarkMode ? 'rgba(10, 22, 51, 0.78)' : 'rgba(255, 255, 255, 0.88)',
          borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.14)' : 'rgba(255, 255, 255, 0.65)',
          borderWidth: '1px',
          borderStyle: 'solid',
          boxShadow: isDarkMode ? '0 8px 32px 0 rgba(0, 0, 0, 0.45)' : '0 8px 32px 0 rgba(31, 38, 135, 0.08)',
          color: isDarkMode ? '#ffffff' : '#0f172a'
        }}
      >
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span 
                className="px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider shadow-2xs flex items-center gap-1.5"
                style={{
                  backgroundColor: isDarkMode ? 'rgba(15, 41, 99, 0.75)' : 'rgba(239, 246, 255, 0.9)',
                  color: isDarkMode ? '#38bdf8' : '#1d4ed8',
                  borderColor: isDarkMode ? 'rgba(59, 130, 246, 0.45)' : 'rgba(147, 197, 253, 0.7)',
                  borderWidth: '1px',
                  borderStyle: 'solid'
                }}
              >
                <Sparkles className="w-3.5 h-3.5 text-blue-500" />
                Curriculum Subject Filtering
              </span>
              <span 
                className="px-3 py-1 rounded-full text-xs font-black shadow-xs flex items-center gap-1"
                style={{ backgroundColor: '#2563eb', color: '#ffffff' }}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                {simulations.length} Labs Available
              </span>
            </div>

            <h2 
              className="text-2xl sm:text-3xl font-black tracking-tight"
              style={{ color: isDarkMode ? '#ffffff' : '#0f172a' }}
            >
              Interactive STEM Simulations Catalog
            </h2>
            <p 
              className="text-xs sm:text-sm font-bold mt-1.5 max-w-3xl leading-relaxed"
              style={{ color: isDarkMode ? '#94a3b8' : '#475569' }}
            >
              Select any subject card below to dynamically filter its dedicated labs. Click any simulation card to launch the interactive physics engine in a dedicated, isolated workspace tab.
            </p>
          </div>

          {/* Quick Search Input */}
          <div className="w-full lg:w-80 shrink-0">
            <div 
              className="relative flex items-center rounded-xl border shadow-inner transition-all"
              style={{
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                backgroundColor: isDarkMode ? 'rgba(6, 14, 34, 0.85)' : 'rgba(248, 250, 252, 0.85)',
                borderColor: isDarkMode ? 'rgba(59, 130, 246, 0.45)' : 'rgba(148, 163, 184, 0.6)',
                borderWidth: '1.5px',
                borderStyle: 'solid'
              }}
            >
              <Search className="w-4 h-4 ml-3 shrink-0" style={{ color: isDarkMode ? '#38bdf8' : '#2563eb' }} />
              <input
                type="text"
                placeholder="Search labs (e.g., 01, Optics, Bohr, DNA)..."
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
                  className="mr-3 text-xs font-black px-1.5 py-0.5 rounded cursor-pointer transition-transform hover:scale-110"
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

        {/* 2. PROMINENT & LARGE SUBJECT BUTTONS (VISUAL HIGHLIGHT) */}
        <div className="mt-8 pt-6 border-t" style={{ borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(226, 232, 240, 0.9)' }}>
          <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase tracking-wider flex items-center gap-1.5" style={{ color: isDarkMode ? '#94a3b8' : '#64748b' }}>
                <Filter className="w-3.5 h-3.5 text-blue-500" />
                Select Discipline to Filter:
              </span>
              <span 
                className="text-[11px] font-black px-2.5 py-0.5 rounded-full"
                style={{
                  backgroundColor: isDarkMode ? 'rgba(30, 58, 138, 0.4)' : '#e0e7ff',
                  color: isDarkMode ? '#93c5fd' : '#3730a3'
                }}
              >
                Showing: {selectedCategory === 'All' ? `All Subjects (${simulations.length})` : `${selectedCategory} (${getCategoryCount(selectedCategory)})`}
              </span>
            </div>

            {selectedCategory !== 'All' && (
              <button
                onClick={() => handleCategoryChange('All')}
                className="text-xs font-black px-3 py-1 rounded-lg flex items-center gap-1.5 transition-all hover:scale-105 cursor-pointer shadow-xs"
                style={{
                  backgroundColor: isDarkMode ? '#1e293b' : '#f1f5f9',
                  borderColor: isDarkMode ? '#3b82f6' : '#94a3b8',
                  borderWidth: '1px',
                  borderStyle: 'solid',
                  color: isDarkMode ? '#60a5fa' : '#2563eb'
                }}
              >
                &larr; Reset to All Subjects ({simulations.length})
              </button>
            )}
          </div>

          {/* Large, Prominent, Side-by-Side Subject Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-9 gap-3 sm:gap-3.5">
            {subjectCategories.map((cat) => {
              const isSelected = selectedCategory === cat.key;
              
              return (
                <button
                  key={cat.key}
                  type="button"
                  onClick={() => handleCategoryChange(cat.key)}
                  aria-pressed={isSelected}
                  className={`group relative rounded-2xl p-3.5 flex flex-col items-center text-center justify-between transition-all duration-200 cursor-pointer select-none btn-3d ${
                    isSelected ? 'scale-[1.03] z-10' : 'hover:scale-[1.02]'
                  }`}
                  style={{
                    minHeight: '128px',
                    backgroundImage: isSelected ? cat.activeGradient : 'none',
                    backgroundColor: isSelected 
                      ? 'transparent' 
                      : (isDarkMode ? cat.darkCardBg : cat.lightCardBg),
                    borderColor: isSelected 
                      ? cat.activeBorder 
                      : (isDarkMode ? cat.darkBorder : cat.lightBorder),
                    borderWidth: isSelected ? '2.5px' : '1.5px',
                    borderStyle: 'solid',
                    color: isSelected ? '#ffffff' : (isDarkMode ? '#ffffff' : '#0f172a'),
                    boxShadow: isSelected 
                      ? `0 12px 28px -4px ${cat.glowColor}, 0 0 16px ${cat.glowColor}, inset 0 1px 2px rgba(255, 255, 255, 0.4)` 
                      : (isDarkMode ? '0 4px 14px rgba(0, 0, 0, 0.35)' : '0 4px 14px rgba(0, 0, 0, 0.04)')
                  }}
                  title={`Filter by ${cat.fullTitle} (${cat.badgeCount} labs)`}
                >
                  {/* Top: Large Colorful Discipline Icon */}
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-200 group-hover:scale-110 shadow-md shrink-0 mb-2"
                    style={{
                      backgroundColor: isSelected 
                        ? 'rgba(255, 255, 255, 0.22)' 
                        : (isDarkMode ? 'rgba(15, 23, 42, 0.9)' : cat.iconBg),
                      borderColor: isSelected 
                        ? 'rgba(255, 255, 255, 0.5)' 
                        : cat.iconBorder,
                      borderWidth: '1.5px',
                      borderStyle: 'solid',
                      boxShadow: isSelected ? '0 4px 12px rgba(0, 0, 0, 0.25)' : `0 2px 8px ${cat.glowColor}`
                    }}
                  >
                    {cat.renderIcon({
                      className: `w-7 h-7 ${isSelected ? 'text-white' : ''}`,
                      isSelected,
                      isDark: isDarkMode
                    })}
                  </div>

                  {/* Center: Bold Subject Title */}
                  <div className="w-full">
                    <span 
                      className="block text-xs sm:text-[13px] font-black tracking-tight leading-tight line-clamp-2"
                      style={{
                        color: isSelected ? '#ffffff' : (isDarkMode ? '#ffffff' : '#0f172a')
                      }}
                    >
                      {cat.shortLabel}
                    </span>
                  </div>

                  {/* Bottom: Clear Badge Counter Showing Number of Labs */}
                  <div className="mt-2 w-full flex items-center justify-center">
                    <span 
                      className="inline-flex items-center justify-center px-2.5 py-0.5 rounded-full font-mono text-[11px] font-black transition-all shadow-xs"
                      style={{
                        backgroundColor: isSelected 
                          ? 'rgba(255, 255, 255, 0.95)' 
                          : (isDarkMode ? 'rgba(30, 41, 59, 0.9)' : '#ffffff'),
                        color: isSelected 
                          ? '#0f172a' 
                          : (isDarkMode ? cat.textColorDark : cat.textColorLight),
                        borderColor: isSelected 
                          ? '#ffffff' 
                          : (isDarkMode ? cat.darkBorder : cat.lightBorder),
                        borderWidth: '1px',
                        borderStyle: 'solid',
                        boxShadow: isSelected ? '0 2px 6px rgba(0, 0, 0, 0.2)' : 'none'
                      }}
                    >
                      {cat.badgeCount} {cat.badgeCount === 1 ? 'Lab' : 'Labs'}
                    </span>
                  </div>

                  {/* Active Selection Indicator Pip */}
                  {isSelected && (
                    <div 
                      className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-white text-blue-700 flex items-center justify-center shadow-md animate-pulse border-2 border-blue-600"
                      title="Currently Active Filter"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 3. STRICT SUBJECT FILTERING: SYSTEMATIC SIMULATION MODULE CARDS */}
      <div className="space-y-10">
        {subjectCategories
          .filter(cat => cat.key !== 'All') // Only iterate over actual subjects for grouping
          .filter(cat => selectedCategory === 'All' || selectedCategory === cat.key) // Strict Filtering
          .map((cat) => {
            const categorySims = simulations.filter(s => s.category === cat.key && matchesSearch(s));
            if (categorySims.length === 0) return null;

            return (
              <div key={cat.key} className="space-y-4">
                {/* Subject Category Group Header */}
                <div 
                  className="px-5 py-4 rounded-2xl border flex items-center justify-between gap-3 shadow-md transition-all"
                  style={{
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    backgroundColor: isDarkMode ? 'rgba(9, 24, 56, 0.85)' : 'rgba(248, 250, 252, 0.92)',
                    borderColor: isDarkMode ? cat.darkBorder : cat.lightBorder,
                    borderWidth: '1.5px',
                    borderLeftWidth: '6px',
                    borderLeftColor: cat.iconBorder,
                    borderStyle: 'solid',
                    boxShadow: isDarkMode ? '0 8px 24px 0 rgba(0, 0, 0, 0.25)' : '0 4px 20px 0 rgba(31, 38, 135, 0.05)'
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-10 h-10 rounded-xl flex items-center justify-center shadow-xs shrink-0"
                      style={{
                        backgroundColor: isDarkMode ? 'rgba(15, 23, 42, 0.8)' : cat.iconBg,
                        borderColor: cat.iconBorder,
                        borderWidth: '1.5px',
                        borderStyle: 'solid'
                      }}
                    >
                      {cat.renderIcon({ className: "w-6 h-6", isSelected: false, isDark: isDarkMode })}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 
                          className="text-base sm:text-lg font-black tracking-tight"
                          style={{ color: isDarkMode ? '#ffffff' : '#0f172a' }}
                        >
                          {cat.fullTitle}
                        </h3>
                        <span 
                          className="text-[10px] font-mono font-black px-2 py-0.5 rounded shadow-2xs"
                          style={{
                            backgroundColor: cat.iconBg,
                            color: isDarkMode ? cat.textColorDark : cat.textColorLight,
                            borderColor: cat.iconBorder,
                            borderWidth: '1px',
                            borderStyle: 'solid'
                          }}
                        >
                          {cat.colorName}
                        </span>
                      </div>
                      <p 
                        className="text-[11px] font-extrabold mt-0.5"
                        style={{ color: isDarkMode ? cat.textColorDark : cat.textColorLight }}
                      >
                        {cat.subtitle} &bull; {categorySims.length} Active Modules
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span 
                      className="px-3 py-1 rounded-full text-xs font-black shadow-2xs"
                      style={{
                        backgroundColor: isDarkMode ? 'rgba(30, 41, 59, 0.8)' : '#ffffff',
                        color: isDarkMode ? cat.textColorDark : cat.textColorLight,
                        borderColor: isDarkMode ? cat.darkBorder : cat.lightBorder,
                        borderWidth: '1px',
                        borderStyle: 'solid'
                      }}
                    >
                      {categorySims.length} {categorySims.length === 1 ? 'Lab' : 'Labs'}
                    </span>
                  </div>
                </div>

                {/* Grid of Simulation Cards under this Subject */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                  {categorySims.map((sim) => {
                    const theme = getSimTheme(sim.indexNumber);
                    const isActive = activeSim ? activeSim.id === sim.id : false;

                    return (
                      <div
                        key={sim.id}
                        onClick={() => handleCardClick(sim)}
                        className={`rounded-2xl border transition-all duration-200 flex flex-col justify-between cursor-pointer group shadow-lg btn-3d relative overflow-hidden opacity-100 ${
                          isActive ? 'ring-2 ring-offset-2' : ''
                        }`}
                        style={{
                          backdropFilter: 'blur(12px)',
                          WebkitBackdropFilter: 'blur(12px)',
                          backgroundColor: isDarkMode ? 'rgba(10, 22, 51, 0.75)' : 'rgba(255, 255, 255, 0.92)',
                          borderStyle: 'solid',
                          borderTopWidth: '4px',
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
                            {/* Colorful 3D Icon Tile */}
                            <div 
                              className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 icon-tile-3d shadow-md group-hover:scale-105 transition-transform"
                              style={{
                                backgroundColor: theme.badgeBg,
                                borderColor: theme.borderColor,
                                borderWidth: '2px',
                                borderStyle: 'solid',
                                boxShadow: `0 4px 12px ${theme.glowColor}`
                              }}
                            >
                              {renderTopicIcon(sim.iconName, theme.iconBg || theme.bgSolid)}
                            </div>

                            {/* Badges: Lab Number & Grade */}
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
                                {sim.gradeLevel}
                              </span>
                            </div>
                          </div>

                          {/* Simulation Topic Title */}
                          <h4 
                            className="text-base font-black tracking-tight leading-snug line-clamp-1 group-hover:text-blue-500 transition-colors"
                            style={{ color: isDarkMode ? '#ffffff' : '#0f172a' }}
                          >
                            {sim.title}
                          </h4>

                          {/* Subject & Sub-discipline */}
                          <p 
                            className="text-xs font-bold mt-1 line-clamp-1"
                            style={{ color: isDarkMode ? '#38bdf8' : '#1d4ed8' }}
                          >
                            {sim.subject}
                          </p>

                          {/* Concept Description Intro */}
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
                                  backgroundColor: isDarkMode ? '#060e22' : theme.tagBg,
                                  color: isDarkMode ? '#cbd5e1' : theme.tagText,
                                  borderColor: isDarkMode ? '#1e3a8a' : theme.badgeBorder,
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
                              onSelectSim(sim);
                            }}
                            className="inline-flex items-center gap-1.5 text-xs font-black transition-all group-hover:scale-105 duration-150 px-2.5 py-1 rounded-lg text-white shadow-2xs cursor-pointer"
                            style={{
                              backgroundColor: theme.bgSolid,
                              boxShadow: `0 2px 6px ${theme.glowColor}`
                            }}
                            title="Open Lab in Dedicated New Tab"
                          >
                            <ExternalLink className="w-3 h-3 text-white" />
                            <span>Launch Lab</span>
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
                            title="Launch in 4K Fullscreen Modal"
                          >
                            <Maximize2 className="w-3.5 h-3.5 text-white" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

      {/* Empty State when Search Yields No Results */}
      {simulations.filter(matchesSearch).length === 0 && (
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
            Try searching for another keyword or select &ldquo;All Subjects&rdquo;.
          </p>
          <button
            onClick={() => {
              handleCategoryChange('All');
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
