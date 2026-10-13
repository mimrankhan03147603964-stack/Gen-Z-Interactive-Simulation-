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
import { TopicRealisticIcon } from './TopicRealisticIcon';

interface SimulationCatalogGridProps {
  simulations: SimulationItem[];
  activeSim?: SimulationItem | null;
  selectedCategory?: string;
  onSelectCategory?: (category: string) => void;
  onSelectSim: (sim: SimulationItem) => void;
  onLaunchFullscreenModal: (sim: SimulationItem) => void;
  isDarkMode?: boolean;
}

// Topic-specific realistic visual icon renderer for simulation badges
const renderTopicIcon = (iconName: string, iconColor?: string, indexNumber?: string, simId?: string) => {
  return (
    <TopicRealisticIcon 
      indexNumber={indexNumber || '01'} 
      simId={simId} 
      className="w-10 h-10 sm:w-11 sm:h-11 drop-shadow-sm group-hover:scale-110 transition-transform duration-200" 
    />
  );
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

const getSubjectCategories = (getCategoryCount: (cat: string) => number): SubjectCategoryConfig[] => [
  {
    key: 'Physics & Motion',
    shortLabel: 'Physics & Motion',
    fullTitle: 'Physics & Classical Mechanics',
    subtitle: 'Kinematics, Optics & Energy',
    badgeCount: getCategoryCount('Physics & Motion'),
    colorName: 'Electric Blue & Cyan',
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
    renderIcon: ({ isSelected, className }) => (
      /* Glowing 3D Rutherford-Bohr atom model with revolving electrons and force trajectories */
      <svg className={className || "w-20 h-20 sm:w-24 sm:h-24"} viewBox="0 0 72 72" fill="none">
        <defs>
          <radialGradient id="physNucleus" cx="40%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="35%" stopColor="#38bdf8" />
            <stop offset="70%" stopColor="#2563eb" />
            <stop offset="100%" stopColor="#1e3a8a" />
          </radialGradient>
          <linearGradient id="orbitGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00f5ff" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
          <linearGradient id="orbitGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#6366f1" />
          </linearGradient>
        </defs>
        {/* Quantum Orbital Glow Field */}
        <circle cx="36" cy="36" r="30" fill="url(#physNucleus)" opacity="0.15" />
        {/* Orbital 1: Trajectory 30 deg */}
        <ellipse cx="36" cy="36" rx="29" ry="11" transform="rotate(30 36 36)" stroke={isSelected ? '#ffffff' : 'url(#orbitGrad1)'} strokeWidth="2.2" opacity="0.9" />
        {/* Electron 1 on Orbit 1 with Cyan Glow */}
        <circle cx="58" cy="49" r="4.2" fill={isSelected ? '#ffffff' : '#00f5ff'} />
        <circle cx="58" cy="49" r="6" stroke="#00f5ff" strokeWidth="1" opacity="0.6" />
        {/* Orbital 2: Trajectory -30 deg */}
        <ellipse cx="36" cy="36" rx="29" ry="11" transform="rotate(-30 36 36)" stroke={isSelected ? '#ffffff' : 'url(#orbitGrad2)'} strokeWidth="2.2" opacity="0.9" />
        {/* Electron 2 on Orbit 2 with Blue Glow */}
        <circle cx="15" cy="49" r="4.2" fill={isSelected ? '#ffffff' : '#38bdf8'} />
        <circle cx="15" cy="49" r="6" stroke="#38bdf8" strokeWidth="1" opacity="0.6" />
        {/* Orbital 3: Vertical Trajectory 90 deg */}
        <ellipse cx="36" cy="36" rx="29" ry="11" transform="rotate(90 36 36)" stroke={isSelected ? '#e0f2fe' : '#60a5fa'} strokeWidth="2.2" opacity="0.85" />
        {/* Electron 3 on Orbit 3 */}
        <circle cx="36" cy="8" r="4.2" fill={isSelected ? '#ffffff' : '#7dd3fc'} />
        <circle cx="36" cy="64" r="3.2" fill={isSelected ? '#ffffff' : '#93c5fd'} opacity="0.8" />
        {/* Multi-proton / Neutron Dense 3D Nucleus */}
        <circle cx="36" cy="36" r="10" fill="url(#physNucleus)" filter="drop-shadow(0 0 6px rgba(56, 189, 248, 0.8))" />
        <circle cx="33" cy="33" r="3.5" fill="#ffffff" opacity="0.9" />
        <circle cx="38" cy="37" r="2.5" fill="#93c5fd" opacity="0.8" />
        {/* Vector Force Arrow Vector */}
        <path d="M50 18L58 12M58 12L53 12M58 12L58 17" stroke={isSelected ? '#ffffff' : '#38bdf8'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  },
  {
    key: 'Chemistry & Matter',
    shortLabel: 'Chemistry & Matter',
    fullTitle: 'Chemistry & Molecular Science',
    subtitle: 'Reactions, Acids & Atoms',
    badgeCount: getCategoryCount('Chemistry & Matter'),
    colorName: 'Vibrant Violet / Purple',
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
    renderIcon: ({ isSelected, className }) => (
      /* Realistic laboratory conical flask with bubbling colorful reagents and molecular structures */
      <svg className={className || "w-20 h-20 sm:w-24 sm:h-24"} viewBox="0 0 72 72" fill="none">
        <defs>
          <linearGradient id="chemFluidGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#e879f9" />
            <stop offset="50%" stopColor="#a855f7" />
            <stop offset="100%" stopColor="#7e22ce" />
          </linearGradient>
          <linearGradient id="glassGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
            <stop offset="30%" stopColor="#c084fc" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.6" />
          </linearGradient>
        </defs>
        {/* Outer Flask Glass Contour */}
        <path d="M30 6 H42 V22 L59 55 C61 59 58 64 53 64 H19 C14 64 11 59 13 55 L30 22 V6 Z" 
          stroke={isSelected ? '#ffffff' : '#d8b4fe'} 
          strokeWidth="2.5" 
          strokeLinejoin="round" 
          fill="rgba(168, 85, 247, 0.08)" 
        />
        {/* Flask Lip Rim */}
        <rect x="27" y="4" width="18" height="3.5" rx="1.5" fill={isSelected ? '#ffffff' : '#c084fc'} />
        {/* Bubbling Fluid Liquid Volume */}
        <path d="M19 44 Q28 41 36 45 T53 43 L57 55 C58 58 56 62 52 62 H20 C16 62 14 58 15 55 Z" 
          fill="url(#chemFluidGrad)" 
        />
        {/* Surface Wave Highlight */}
        <path d="M19 44 Q28 41 36 45 T53 43" stroke="#f0abfc" strokeWidth="2" strokeLinecap="round" />
        {/* Bubbling Effervescent Reagent Bubbles */}
        <circle cx="30" cy="51" r="3.2" fill="#ffffff" opacity="0.9" />
        <circle cx="41" cy="55" r="2.5" fill="#fdf4ff" opacity="0.8" />
        <circle cx="36" cy="38" r="3.5" fill="#e879f9" stroke="#ffffff" strokeWidth="1" />
        <circle cx="28" cy="32" r="2.8" fill="#c084fc" />
        <circle cx="43" cy="28" r="2" fill="#d8b4fe" />
        <circle cx="34" cy="20" r="1.8" fill="#f0abfc" />
        {/* Glass Reflection Highlight on Left Edge */}
        <path d="M19 55 L33 26" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" opacity="0.75" />
        {/* Molecular Structure Attachment / Orbit */}
        <g transform="translate(48, 10)">
          <line x1="0" y1="8" x2="12" y2="2" stroke={isSelected ? '#ffffff' : '#f0abfc'} strokeWidth="1.8" />
          <line x1="12" y1="2" x2="12" y2="14" stroke={isSelected ? '#ffffff' : '#f0abfc'} strokeWidth="1.8" />
          <circle cx="0" cy="8" r="3.5" fill="#e879f9" />
          <circle cx="12" cy="2" r="3" fill="#c084fc" />
          <circle cx="12" cy="14" r="3" fill="#a855f7" />
        </g>
      </svg>
    )
  },
  {
    key: 'Biology & Life',
    shortLabel: 'Biology & Life',
    fullTitle: 'Biology & Living Systems',
    subtitle: 'Genetics, Plants & Organisms',
    badgeCount: getCategoryCount('Biology & Life'),
    colorName: 'Vivid Green',
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
    renderIcon: ({ isSelected, className }) => (
      /* Detailed colorful DNA double helix paired with a lush botanical leaf and microscopic cell */
      <svg className={className || "w-20 h-20 sm:w-24 sm:h-24"} viewBox="0 0 72 72" fill="none">
        <defs>
          <linearGradient id="dnaStrand1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#34d399" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>
          <linearGradient id="dnaStrand2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#a7f3d0" />
            <stop offset="100%" stopColor="#10b981" />
          </linearGradient>
          <linearGradient id="bioLeaf" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#86efac" />
            <stop offset="60%" stopColor="#22c55e" />
            <stop offset="100%" stopColor="#15803d" />
          </linearGradient>
        </defs>
        {/* Botanical Organic Leaf in background */}
        <path d="M38 12 C49 14 62 25 60 44 C58 56 46 62 34 60 C32 50 31 38 38 12 Z" 
          fill="url(#bioLeaf)" 
          opacity="0.85" 
          stroke={isSelected ? '#ffffff' : '#86efac'} 
          strokeWidth="1.5" 
        />
        {/* Leaf Vein Structure */}
        <path d="M38 15 Q43 38 35 59" stroke={isSelected ? '#ffffff' : '#bbf7d0'} strokeWidth="1.8" strokeLinecap="round" />
        <path d="M41 28 Q48 30 54 28" stroke={isSelected ? '#ffffff' : '#bbf7d0'} strokeWidth="1.2" />
        <path d="M40 38 Q48 42 53 40" stroke={isSelected ? '#ffffff' : '#bbf7d0'} strokeWidth="1.2" />
        <path d="M38 48 Q44 52 48 50" stroke={isSelected ? '#ffffff' : '#bbf7d0'} strokeWidth="1.2" />
        
        {/* DNA Double Helix Structure foreground (Left side) */}
        {/* Helix base rungs connecting strands */}
        <line x1="12" y1="18" x2="26" y2="18" stroke={isSelected ? '#ffffff' : '#86efac'} strokeWidth="2.2" strokeLinecap="round" />
        <line x1="10" y1="28" x2="28" y2="28" stroke={isSelected ? '#ffffff' : '#a7f3d0'} strokeWidth="2.2" strokeLinecap="round" />
        <line x1="14" y1="38" x2="24" y2="38" stroke={isSelected ? '#ffffff' : '#34d399'} strokeWidth="2.2" strokeLinecap="round" />
        <line x1="10" y1="48" x2="28" y2="48" stroke={isSelected ? '#ffffff' : '#86efac'} strokeWidth="2.2" strokeLinecap="round" />
        <line x1="12" y1="58" x2="26" y2="58" stroke={isSelected ? '#ffffff' : '#a7f3d0'} strokeWidth="2.2" strokeLinecap="round" />
        
        {/* Base Pair Nucleotide Nodes */}
        <circle cx="12" cy="18" r="3" fill="#22c55e" />
        <circle cx="26" cy="18" r="3" fill="#3b82f6" />
        <circle cx="19" cy="28" r="3.2" fill="#fbbf24" />
        <circle cx="10" cy="48" r="3" fill="#3b82f6" />
        <circle cx="28" cy="48" r="3" fill="#22c55e" />
        
        {/* Strand 1 Sine Wave */}
        <path d="M12 12 Q28 23 19 33 Q10 43 28 53 Q19 63 12 68" 
          stroke={isSelected ? '#ffffff' : 'url(#dnaStrand1)'} 
          strokeWidth="3.2" 
          strokeLinecap="round" 
          fill="none" 
        />
        {/* Strand 2 Cosine Wave */}
        <path d="M26 12 Q10 23 19 33 Q28 43 10 53 Q19 63 26 68" 
          stroke={isSelected ? '#e0f2fe' : 'url(#dnaStrand2)'} 
          strokeWidth="3.2" 
          strokeLinecap="round" 
          fill="none" 
        />
        {/* Microscopic Living Cell with Nucleus (Bottom Right) */}
        <circle cx="54" cy="54" r="8" fill="rgba(34, 197, 94, 0.4)" stroke="#86efac" strokeWidth="1.5" />
        <circle cx="54" cy="54" r="3.5" fill="#15803d" />
      </svg>
    )
  },
  {
    key: 'Earth & Space',
    shortLabel: 'Earth & Space',
    fullTitle: 'Earth & Space Exploration',
    subtitle: 'Planets, Tectonics & Orbits',
    badgeCount: getCategoryCount('Earth & Space'),
    colorName: 'Deep Blue & Golden Amber',
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
    renderIcon: ({ isSelected, className }) => (
      /* Photorealistic 3D planet Earth showing atmospheric glow, continents, and planetary orbit rings */
      <svg className={className || "w-20 h-20 sm:w-24 sm:h-24"} viewBox="0 0 72 72" fill="none">
        <defs>
          <radialGradient id="earthGlobe" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#7dd3fc" />
            <stop offset="25%" stopColor="#38bdf8" />
            <stop offset="60%" stopColor="#0284c7" />
            <stop offset="85%" stopColor="#0369a1" />
            <stop offset="100%" stopColor="#082f49" />
          </radialGradient>
          <linearGradient id="saturnRing" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="50%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#d97706" />
          </linearGradient>
          <radialGradient id="atmoGlow" cx="50%" cy="50%" r="50%">
            <stop offset="70%" stopColor="#38bdf8" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#0284c7" stopOpacity="0" />
          </radialGradient>
        </defs>
        {/* Planetary Atmosphere Outer Glow */}
        <circle cx="36" cy="36" r="28" fill="url(#atmoGlow)" />
        {/* Planetary Back Orbit Ring */}
        <ellipse cx="36" cy="36" rx="34" ry="12" transform="rotate(-22 36 36)" stroke="url(#saturnRing)" strokeWidth="3" opacity="0.6" strokeDasharray="38 40" />
        
        {/* Spherical Earth Globe Body */}
        <circle cx="36" cy="36" r="22" fill="url(#earthGlobe)" stroke={isSelected ? '#ffffff' : '#7dd3fc'} strokeWidth="1.5" />
        
        {/* Continents & Landmasses (Green & Emerald Shapes) */}
        {/* Eurasia / Africa Continent */}
        <path d="M26 24 C28 20 38 21 42 24 C45 27 47 33 43 36 C39 39 34 35 32 37 C29 39 27 33 26 24 Z" 
          fill="#22c55e" 
          opacity="0.9" 
        />
        {/* Americas / Archipelago */}
        <path d="M20 28 C22 26 25 30 23 35 C22 38 18 42 19 46 C21 48 24 50 22 52 C19 50 17 44 18 36 Z" 
          fill="#16a34a" 
          opacity="0.85" 
        />
        {/* Australia / Oceania */}
        <circle cx="48" cy="44" r="3.5" fill="#22c55e" opacity="0.85" />
        {/* Cloud Layer / Swirls */}
        <path d="M22 22 Q32 26 44 20" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" opacity="0.75" />
        <path d="M28 42 Q38 38 48 42" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" opacity="0.75" />
        
        {/* Planetary Front Orbit Ring with Golden Amber Sheen */}
        <ellipse cx="36" cy="36" rx="34" ry="12" transform="rotate(-22 36 36)" stroke={isSelected ? '#ffffff' : 'url(#saturnRing)'} strokeWidth="3.2" strokeDasharray="40 38" />
        {/* Orbiting Satellite / Moon */}
        <circle cx="62" cy="24" r="3.8" fill={isSelected ? '#ffffff' : '#fbbf24'} />
        <circle cx="62" cy="24" r="5" stroke="#f59e0b" strokeWidth="1" opacity="0.7" />
        {/* Stars in Space */}
        <circle cx="10" cy="14" r="1.2" fill="#ffffff" />
        <circle cx="64" cy="56" r="1.2" fill="#ffffff" />
        <circle cx="12" cy="60" r="1" fill="#7dd3fc" />
      </svg>
    )
  },
  {
    key: 'Mathematics & Logic',
    shortLabel: 'Mathematics & Logic',
    fullTitle: 'Mathematics & Geometry',
    subtitle: 'Equations, Algebra & Shapes',
    badgeCount: getCategoryCount('Mathematics & Logic'),
    colorName: 'Vibrant Amber / Orange',
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
    renderIcon: ({ isSelected, className }) => (
      /* 3D geometric compass, golden ratio spiral, and calculus coordinate curves */
      <svg className={className || "w-20 h-20 sm:w-24 sm:h-24"} viewBox="0 0 72 72" fill="none">
        <defs>
          <linearGradient id="mathAmber" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="50%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#ea580c" />
          </linearGradient>
          <linearGradient id="compassMetal" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fed7aa" />
            <stop offset="100%" stopColor="#c2410c" />
          </linearGradient>
        </defs>
        {/* Background Coordinate Axis Grid */}
        <line x1="8" y1="56" x2="64" y2="56" stroke={isSelected ? '#ffffff' : '#fb923c'} strokeWidth="1.8" strokeLinecap="round" opacity="0.6" />
        <line x1="14" y1="8" x2="14" y2="64" stroke={isSelected ? '#ffffff' : '#fb923c'} strokeWidth="1.8" strokeLinecap="round" opacity="0.6" />
        
        {/* Calculus Coordinate Curve (Sinusoidal Polynomial) */}
        <path d="M14 56 Q28 16 42 42 T64 18" stroke={isSelected ? '#ffffff' : '#f59e0b'} strokeWidth="2.8" strokeLinecap="round" fill="none" />
        
        {/* Golden Ratio Logarithmic Spiral */}
        <path d="M50 38 A6 6 0 0 1 44 44 A12 12 0 0 1 32 32 A20 20 0 0 1 52 12" 
          stroke={isSelected ? '#fef08a' : '#ea580c'} 
          strokeWidth="2.2" 
          strokeLinecap="round" 
          fill="none" 
          strokeDasharray="2 3"
        />
        
        {/* 3D Drafting Compass Instrument */}
        {/* Hinge Head */}
        <circle cx="36" cy="14" r="4.5" fill="url(#mathAmber)" stroke={isSelected ? '#ffffff' : '#7c2d12'} strokeWidth="1.5" />
        <circle cx="36" cy="14" r="2" fill="#ffffff" />
        {/* Compass Left Leg */}
        <path d="M34 16 L22 52" stroke={isSelected ? '#ffffff' : 'url(#compassMetal)'} strokeWidth="3" strokeLinecap="round" />
        {/* Compass Right Leg with Needle Tip */}
        <path d="M38 16 L50 52" stroke={isSelected ? '#ffffff' : 'url(#compassMetal)'} strokeWidth="3" strokeLinecap="round" />
        {/* Center Adjustment Spindle */}
        <line x1="27" y1="36" x2="45" y2="36" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" />
        <circle cx="36" cy="36" r="2" fill="#ffffff" />
        {/* Sharp Tips on Paper */}
        <polygon points="22,52 20,56 24,56" fill={isSelected ? '#ffffff' : '#ea580c'} />
        <polygon points="50,52 48,56 52,56" fill={isSelected ? '#ffffff' : '#ea580c'} />
        
        {/* Mathematical Sigma Symbol badge (Top Right) */}
        <text x="50" y="24" fill={isSelected ? '#ffffff' : '#ea580c'} fontSize="15" fontWeight="900" fontFamily="serif">∑</text>
      </svg>
    )
  },
  {
    key: 'Computer Science & IT',
    shortLabel: 'Computer Science & IT',
    fullTitle: 'Computer Science & Hardware',
    subtitle: 'Binary, CPU & Peripherals',
    badgeCount: getCategoryCount('Computer Science & IT'),
    colorName: 'Teal / Neon Cyan',
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
    renderIcon: ({ isSelected, className }) => (
      /* Modern 3D workstation display showing glowing colored code, microchip processor, and binary stream */
      <svg className={className || "w-20 h-20 sm:w-24 sm:h-24"} viewBox="0 0 72 72" fill="none">
        <defs>
          <linearGradient id="monitorGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#14b8a6" />
            <stop offset="100%" stopColor="#0f766e" />
          </linearGradient>
          <linearGradient id="chipGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2dd4bf" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
        </defs>
        {/* Workstation Monitor Outer Chassis */}
        <rect x="10" y="8" width="52" height="36" rx="4" 
          fill="rgba(15, 23, 42, 0.92)" 
          stroke={isSelected ? '#ffffff' : '#2dd4bf'} 
          strokeWidth="2.5" 
        />
        {/* Terminal Screen Screen Glow */}
        <rect x="13" y="11" width="46" height="30" rx="2" fill="rgba(6, 78, 70, 0.4)" />
        
        {/* Code Syntax Lines on Terminal Display */}
        <line x1="17" y1="18" x2="30" y2="18" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="33" y1="18" x2="44" y2="18" stroke="#34d399" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="21" y1="24" x2="38" y2="24" stroke="#a78bfa" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="41" y1="24" x2="48" y2="24" stroke="#fbbf24" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="21" y1="30" x2="32" y2="30" stroke="#2dd4bf" strokeWidth="2.5" strokeLinecap="round" />
        
        {/* Blinking CLI Cursor */}
        <rect x="35" y="28" width="4" height="4" fill={isSelected ? '#ffffff' : '#2dd4bf'} />
        
        {/* Monitor Ergonomic Stand */}
        <path d="M31 44 L30 52 H42 L41 44" fill={isSelected ? '#ffffff' : '#0d9488'} />
        <rect x="24" y="52" width="24" height="3.5" rx="1.5" fill={isSelected ? '#ffffff' : '#14b8a6'} />
        
        {/* Floating 3D Microchip Silicon Processor (Bottom Right) */}
        <g transform="translate(42, 38)">
          <rect x="2" y="2" width="20" height="20" rx="3" fill="#042f2e" stroke="#5eead4" strokeWidth="2" />
          <rect x="7" y="7" width="10" height="10" rx="1" fill="url(#chipGrad)" />
          {/* Chip Pins */}
          <line x1="6" y1="0" x2="6" y2="2" stroke="#5eead4" strokeWidth="1.8" />
          <line x1="12" y1="0" x2="12" y2="2" stroke="#5eead4" strokeWidth="1.8" />
          <line x1="18" y1="0" x2="18" y2="2" stroke="#5eead4" strokeWidth="1.8" />
          <line x1="0" y1="7" x2="2" y2="7" stroke="#5eead4" strokeWidth="1.8" />
          <line x1="0" y1="13" x2="2" y2="13" stroke="#5eead4" strokeWidth="1.8" />
          <line x1="22" y1="7" x2="24" y2="7" stroke="#5eead4" strokeWidth="1.8" />
          <line x1="22" y1="13" x2="24" y2="13" stroke="#5eead4" strokeWidth="1.8" />
          <line x1="6" y1="22" x2="6" y2="24" stroke="#5eead4" strokeWidth="1.8" />
          <line x1="12" y1="22" x2="12" y2="24" stroke="#5eead4" strokeWidth="1.8" />
          <line x1="18" y1="22" x2="18" y2="24" stroke="#5eead4" strokeWidth="1.8" />
        </g>
        
        {/* Binary Stream (Left Column: 0101) */}
        <text x="6" y="58" fill={isSelected ? '#ffffff' : '#2dd4bf'} fontSize="9" fontWeight="900" fontFamily="monospace">01</text>
        <text x="6" y="66" fill={isSelected ? '#ffffff' : '#0d9488'} fontSize="9" fontWeight="900" fontFamily="monospace">10</text>
      </svg>
    )
  },
  {
    key: 'English & Grammar',
    shortLabel: 'English & Grammar',
    fullTitle: 'English & Spatial Linguistics',
    subtitle: '3D Prepositions & Vocabulary',
    badgeCount: getCategoryCount('English & Grammar'),
    colorName: 'Deep Indigo & Gold',
    iconBg: 'rgba(139, 92, 246, 0.16)',
    iconBorder: '#8b5cf6',
    activeGradient: 'linear-gradient(135deg, #4338ca 0%, #6366f1 50%, #7c3aed 100%)',
    activeBorder: '#c4b5fd',
    glowColor: 'rgba(99, 102, 241, 0.45)',
    lightCardBg: 'rgba(245, 243, 255, 0.95)',
    darkCardBg: 'rgba(28, 15, 59, 0.85)',
    lightBorder: '#ddd6fe',
    darkBorder: 'rgba(139, 92, 246, 0.45)',
    textColorLight: '#4338ca',
    textColorDark: '#a5b4fc',
    renderIcon: ({ isSelected, className }) => (
      /* Beautifully detailed open hardbound book with glowing golden typography letters */
      <svg className={className || "w-20 h-20 sm:w-24 sm:h-24"} viewBox="0 0 72 72" fill="none">
        <defs>
          <linearGradient id="bookCoverGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#312e81" />
            <stop offset="100%" stopColor="#1e1b4b" />
          </linearGradient>
          <linearGradient id="goldFontGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="50%" stopColor="#facc15" />
            <stop offset="100%" stopColor="#ca8a04" />
          </linearGradient>
          <linearGradient id="pageGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#f8fafc" />
          </linearGradient>
        </defs>
        {/* Hardbound Book Spine & Outer Binding */}
        <path d="M36 54 C26 49 14 49 8 51 V21 C14 19 26 19 36 24 C46 19 58 19 64 21 V51 C58 49 46 49 36 54 Z" 
          fill="url(#bookCoverGrad)" 
          stroke={isSelected ? '#ffffff' : '#fbbf24'} 
          strokeWidth="2.5" 
          strokeLinejoin="round" 
        />
        {/* Open Book Left Pages Deck */}
        <path d="M36 51 C27 46 16 46 10 48 V18 C16 16 27 16 36 21 Z" 
          fill="url(#pageGrad)" 
          stroke="#cbd5e1" 
          strokeWidth="1.5" 
        />
        {/* Open Book Right Pages Deck */}
        <path d="M36 51 C45 46 56 46 62 48 V18 C56 16 45 16 36 21 Z" 
          fill="url(#pageGrad)" 
          stroke="#cbd5e1" 
          strokeWidth="1.5" 
        />
        {/* Center Ribbon Bookmark in Scarlet */}
        <path d="M36 21 V45 L40 41 L44 45 V21" fill="#ef4444" />
        
        {/* Left Page Elegant Typography Text Lines */}
        <line x1="15" y1="26" x2="31" y2="26" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />
        <line x1="15" y1="32" x2="29" y2="32" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />
        <line x1="15" y1="38" x2="31" y2="38" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />
        <line x1="15" y1="44" x2="25" y2="44" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />
        
        {/* Right Page Elegant Typography Text Lines */}
        <line x1="41" y1="26" x2="57" y2="26" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />
        <line x1="41" y1="32" x2="55" y2="32" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />
        <line x1="41" y1="38" x2="57" y2="38" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />
        
        {/* Floating Glowing Golden Typography Letters (A, B, C) */}
        {/* Golden 'A' */}
        <g transform="translate(18, 2)">
          <circle cx="10" cy="10" r="9" fill="url(#goldFontGrad)" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.3))" />
          <text x="6" y="14" fill="#1e1b4b" fontSize="13" fontWeight="900" fontFamily="serif">A</text>
        </g>
        {/* Golden 'B' */}
        <g transform="translate(42, 4)">
          <circle cx="9" cy="9" r="8" fill="url(#goldFontGrad)" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.3))" />
          <text x="5" y="13" fill="#1e1b4b" fontSize="12" fontWeight="900" fontFamily="serif">B</text>
        </g>
        {/* Magic Glowing Sparkles from the Book */}
        <polygon points="36,7 37,10 40,11 37,12 36,15 35,12 32,11 35,10" fill={isSelected ? '#ffffff' : '#facc15'} />
        <polygon points="58,16 59,18 61,19 59,20 58,22 57,20 55,19 57,18" fill={isSelected ? '#ffffff' : '#facc15'} />
      </svg>
    )
  },
  {
    key: 'Early Childhood (ECCE)',
    shortLabel: 'Early Childhood (ECCE)',
    fullTitle: 'Early Childhood Care & Education',
    subtitle: 'Sensory Blocks, Shapes & Color',
    badgeCount: getCategoryCount('Early Childhood (ECCE)'),
    colorName: 'Vibrant Coral / Pink',
    iconBg: 'rgba(244, 63, 94, 0.16)',
    iconBorder: '#f43f5e',
    activeGradient: 'linear-gradient(135deg, #e11d48 0%, #f43f5e 50%, #fb7185 100%)',
    activeBorder: '#fecdd3',
    glowColor: 'rgba(244, 63, 94, 0.45)',
    lightCardBg: 'rgba(255, 241, 242, 0.95)',
    darkCardBg: 'rgba(49, 13, 26, 0.85)',
    lightBorder: '#fecdd3',
    darkBorder: 'rgba(244, 63, 94, 0.45)',
    textColorLight: '#e11d48',
    textColorDark: '#fb7185',
    renderIcon: ({ isSelected, className }) => (
      /* Bright 3D alphabet learning blocks (A-B-C) with playful geometric shapes */
      <svg className={className || "w-20 h-20 sm:w-24 sm:h-24"} viewBox="0 0 72 72" fill="none">
        <defs>
          <linearGradient id="blockAGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fb7185" />
            <stop offset="100%" stopColor="#e11d48" />
          </linearGradient>
          <linearGradient id="blockBGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#0284c7" />
          </linearGradient>
          <linearGradient id="blockCGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#facc15" />
            <stop offset="100%" stopColor="#eab308" />
          </linearGradient>
        </defs>
        
        {/* Playful Geometric Cylinder / Cone Background Element */}
        <circle cx="16" cy="18" r="8" fill="#a78bfa" stroke={isSelected ? '#ffffff' : '#c4b5fd'} strokeWidth="1.5" />
        <polygon points="56,8 64,22 48,22" fill="#34d399" stroke={isSelected ? '#ffffff' : '#86efac'} strokeWidth="1.5" />
        
        {/* Block A: Isometric 3D Coral / Pink Block (Bottom Left) */}
        <g transform="translate(6, 32)">
          {/* Top Face */}
          <polygon points="16,0 30,7 16,14 2,7" fill="#fda4af" stroke={isSelected ? '#ffffff' : '#fb7185'} strokeWidth="1.5" />
          {/* Left Face */}
          <polygon points="2,7 16,14 16,30 2,23" fill="#e11d48" stroke={isSelected ? '#ffffff' : '#fb7185'} strokeWidth="1.5" />
          {/* Right Face */}
          <polygon points="16,14 30,7 30,23 16,30" fill="#be123c" stroke={isSelected ? '#ffffff' : '#fb7185'} strokeWidth="1.5" />
          {/* Letter A on Left Face */}
          <text x="5" y="24" fill="#ffffff" fontSize="13" fontWeight="900" fontFamily="sans-serif">A</text>
        </g>
        
        {/* Block B: Isometric 3D Blue Block (Bottom Right) */}
        <g transform="translate(36, 34)">
          {/* Top Face */}
          <polygon points="15,0 28,6 15,13 2,6" fill="#7dd3fc" stroke={isSelected ? '#ffffff' : '#0284c7'} strokeWidth="1.5" />
          {/* Left Face */}
          <polygon points="2,6 15,13 15,28 2,21" fill="#0284c7" stroke={isSelected ? '#ffffff' : '#0284c7'} strokeWidth="1.5" />
          {/* Right Face */}
          <polygon points="15,13 28,6 28,21 15,28" fill="#0369a1" stroke={isSelected ? '#ffffff' : '#0284c7'} strokeWidth="1.5" />
          {/* Letter B on Left Face */}
          <text x="5" y="23" fill="#ffffff" fontSize="13" fontWeight="900" fontFamily="sans-serif">B</text>
        </g>
        
        {/* Block C: Isometric 3D Golden Yellow Block (Stacked in Center) */}
        <g transform="translate(22, 10)">
          {/* Top Face */}
          <polygon points="15,0 28,6 15,13 2,6" fill="#fef08a" stroke={isSelected ? '#ffffff' : '#ca8a04'} strokeWidth="1.5" />
          {/* Left Face */}
          <polygon points="2,6 15,13 15,28 2,21" fill="#eab308" stroke={isSelected ? '#ffffff' : '#ca8a04'} strokeWidth="1.5" />
          {/* Right Face */}
          <polygon points="15,13 28,6 28,21 15,28" fill="#ca8a04" stroke={isSelected ? '#ffffff' : '#ca8a04'} strokeWidth="1.5" />
          {/* Letter C on Left Face */}
          <text x="5" y="23" fill="#ffffff" fontSize="13" fontWeight="900" fontFamily="sans-serif">C</text>
        </g>
        
        {/* Playful Floating Star */}
        <polygon points="36,4 37,7 40,7 38,9 39,12 36,10 33,12 34,9 32,7 35,7" fill="#f43f5e" />
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
  // By default, the first subject 'Physics & Motion' is selected when the page opens
  const [internalCategory, setInternalCategory] = useState<string>('Physics & Motion');
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

  const subjectCategories = getSubjectCategories(getCategoryCount);

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

        {/* 2. PROMINENT & LARGE SUBJECT BUTTONS (STRICT 2-COLUMN GRID) */}
        <div className="mt-8 pt-6 border-t" style={{ borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(226, 232, 240, 0.9)' }}>
          <div className="flex items-center justify-between mb-5 flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <span className="text-sm font-black uppercase tracking-wider flex items-center gap-1.5" style={{ color: isDarkMode ? '#94a3b8' : '#475569' }}>
                <Filter className="w-4 h-4 text-blue-500" />
                Curriculum Subject Filtering:
              </span>
              <span 
                className="text-xs font-black px-3 py-1 rounded-full shadow-xs"
                style={{
                  backgroundColor: isDarkMode ? 'rgba(30, 58, 138, 0.55)' : '#dbeafe',
                  color: isDarkMode ? '#60a5fa' : '#1d4ed8',
                  border: isDarkMode ? '1px solid rgba(59, 130, 246, 0.4)' : '1px solid #bfdbfe'
                }}
              >
                Active Discipline: {selectedCategory} ({getCategoryCount(selectedCategory)} {getCategoryCount(selectedCategory) === 1 ? 'Lab' : 'Labs'})
              </span>
            </div>
          </div>

          {/* Strict 2-Column Grid on Desktops & Tablets, 1-Column on Mobile */}
          <div 
            className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full"
            style={{
              display: 'grid',
              gap: '1.5rem'
            }}
          >
            {subjectCategories.map((cat) => {
              const isSelected = selectedCategory === cat.key;
              
              return (
                <button
                  key={cat.key}
                  type="button"
                  onClick={() => handleCategoryChange(cat.key)}
                  aria-pressed={isSelected}
                  className={`group relative rounded-3xl p-6 sm:p-7 flex flex-col sm:flex-row items-center sm:items-center text-center sm:text-left justify-between transition-all duration-300 cursor-pointer select-none btn-3d w-full ${
                    isSelected ? 'scale-[1.02] z-10' : 'hover:scale-[1.01]'
                  }`}
                  style={{
                    minHeight: '168px',
                    backgroundImage: isSelected ? cat.activeGradient : 'none',
                    backgroundColor: isSelected 
                      ? 'transparent' 
                      : (isDarkMode ? cat.darkCardBg : cat.lightCardBg),
                    borderColor: isSelected 
                      ? cat.activeBorder 
                      : (isDarkMode ? cat.darkBorder : cat.lightBorder),
                    borderWidth: isSelected ? '3px' : '2px',
                    borderStyle: 'solid',
                    color: isSelected ? '#ffffff' : (isDarkMode ? '#ffffff' : '#0f172a'),
                    boxShadow: isSelected 
                      ? `0 20px 40px -8px ${cat.glowColor}, 0 0 28px ${cat.glowColor}, inset 0 2px 4px rgba(255, 255, 255, 0.45)` 
                      : (isDarkMode ? '0 8px 24px rgba(0, 0, 0, 0.4)' : '0 6px 20px rgba(0, 0, 0, 0.05)')
                  }}
                  title={`Filter by ${cat.fullTitle} (${cat.badgeCount} labs)`}
                >
                  <div className="flex flex-col sm:flex-row items-center sm:items-center gap-5 sm:gap-6 w-full">
                    {/* Significantly Enlarged Subject Icon (84px - 96px width/height) */}
                    <div 
                      className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl sm:rounded-3xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 shadow-xl shrink-0 p-2"
                      style={{
                        backgroundColor: isSelected 
                          ? 'rgba(255, 255, 255, 0.22)' 
                          : (isDarkMode ? 'rgba(15, 23, 42, 0.94)' : cat.iconBg),
                        borderColor: isSelected 
                          ? 'rgba(255, 255, 255, 0.65)' 
                          : cat.iconBorder,
                        borderWidth: '2.5px',
                        borderStyle: 'solid',
                        boxShadow: isSelected ? '0 8px 24px rgba(0, 0, 0, 0.4)' : `0 6px 20px ${cat.glowColor}`
                      }}
                    >
                      {cat.renderIcon({
                        className: "w-16 h-16 sm:w-20 sm:h-20",
                        isSelected,
                        isDark: isDarkMode
                      })}
                    </div>

                    {/* Center: Large & Bold Typography + Subtitle */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-center sm:justify-start gap-2 mb-1 flex-wrap">
                        <span 
                          className="text-[11px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-md"
                          style={{
                            backgroundColor: isSelected ? 'rgba(255, 255, 255, 0.25)' : (isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.06)'),
                            color: isSelected ? '#ffffff' : (isDarkMode ? '#cbd5e1' : '#64748b')
                          }}
                        >
                          {cat.colorName}
                        </span>
                      </div>

                      <h3 
                        className="text-xl sm:text-2xl font-black tracking-tight leading-snug"
                        style={{
                          fontSize: '1.4rem',
                          fontWeight: 800,
                          color: isSelected ? '#ffffff' : (isDarkMode ? '#ffffff' : '#0f172a'),
                          textShadow: isSelected ? '0 2px 8px rgba(0, 0, 0, 0.4)' : 'none'
                        }}
                      >
                        {cat.fullTitle}
                      </h3>
                      
                      <p 
                        className="text-xs sm:text-sm font-semibold mt-1 line-clamp-1"
                        style={{
                          color: isSelected ? 'rgba(255, 255, 255, 0.9)' : (isDarkMode ? '#94a3b8' : '#64748b')
                        }}
                      >
                        {cat.subtitle}
                      </p>

                      {/* Prominent Lab Count Badge cleanly positioned below the title */}
                      <div className="mt-3 flex items-center justify-center sm:justify-start">
                        <span 
                          className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full font-mono text-xs font-black transition-all shadow-sm"
                          style={{
                            backgroundColor: isSelected 
                              ? 'rgba(255, 255, 255, 0.22)' 
                              : (isDarkMode ? 'rgba(30, 41, 59, 0.95)' : '#ffffff'),
                            color: isSelected 
                              ? '#ffffff' 
                              : (isDarkMode ? cat.textColorDark : cat.textColorLight),
                            borderColor: isSelected 
                              ? 'rgba(255, 255, 255, 0.45)' 
                              : (isDarkMode ? cat.darkBorder : cat.lightBorder),
                            borderWidth: '1.5px',
                            borderStyle: 'solid',
                            boxShadow: isSelected ? '0 3px 8px rgba(0, 0, 0, 0.25)' : 'none'
                          }}
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          {cat.badgeCount} {cat.badgeCount === 1 ? 'Simulation Lab' : 'Simulation Labs'}
                        </span>
                      </div>
                    </div>
                  </div>
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
                {/* Grid of Simulation Cards under this Subject */}

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
                          isActive ? 'scale-[1.01]' : ''
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
                            {/* Prominent, Large, Colorful Realistic Visual Emblem */}
                            <div 
                              className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center shrink-0 icon-tile-3d shadow-md group-hover:scale-105 transition-transform duration-200 p-1"
                              style={{
                                backgroundColor: theme.badgeBg,
                                borderColor: theme.borderColor,
                                borderWidth: '2px',
                                borderStyle: 'solid',
                                boxShadow: `0 4px 14px ${theme.glowColor}`
                              }}
                            >
                              <TopicRealisticIcon 
                                indexNumber={sim.indexNumber}
                                simId={sim.id}
                                className="w-10 h-10 sm:w-11 sm:h-11 drop-shadow-sm group-hover:scale-110 transition-transform duration-200"
                              />
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
            Try searching for another keyword or clear your search input.
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
            }}
            className="btn-3d mt-4 px-4 py-2 rounded-xl text-xs font-black text-white"
            style={{
              backgroundColor: '#2563eb',
              borderColor: '#60a5fa',
              borderWidth: '1px'
            }}
          >
            Clear Search
          </button>
        </div>
      )}
    </section>
  );
};
