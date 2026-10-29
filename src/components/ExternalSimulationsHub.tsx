import React from 'react';
import { 
  ExternalLink, 
  Maximize2, 
  Globe, 
  Compass, 
  Sparkles, 
  Atom, 
  Calculator, 
  Cpu, 
  FlaskConical, 
  Activity, 
  CheckCircle2,
  Layers,
  Wrench,
  FileText,
  Target
} from 'lucide-react';
import { getThemeForIndex, getLaunchBtnStyle } from '../data/sequentialPalette';
import { ScrollReveal } from './ScrollReveal';

import {
  MultiPhetIcon,
  MultiGeoGebraIcon,
  MultiOphysicsIcon,
  MultiWalterFendtIcon,
  MultiFalstadIcon,
  MultiMolecularIcon,
  MultiMyPhysicsLabIcon,
  MultiTinkercadIcon,
  MultiMozaikIcon,
  MultiPaperMakerIcon
} from './ModernStemIcons';

export interface ExternalSimulationResource {
  id: string;
  title: string;
  description: string;
  url: string;
  category: string;
  gradeTier: string;
  badge: string;
  bgGradient: string;
  borderColor: string;
  glowColor: string;
  accentColor: string;
  topics: string[];
  icon: React.ComponentType<{ className?: string }>;
  buttonText?: string;
  isAd?: boolean;
  adLabels?: string[];
}

export const EXTERNAL_SIMULATION_RESOURCES: ExternalSimulationResource[] = [
  {
    id: 'phet',
    title: 'PhET Interactive Simulations',
    description: 'Free research-based interactive simulations for Physics, Chemistry, Biology, Earth Science, and Math.',
    url: 'https://phet.colorado.edu',
    category: 'Multi-Disciplinary STEM',
    gradeTier: 'Primary • Middle • Secondary • College',
    badge: 'PHET LAB',
    bgGradient: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
    borderColor: '#38bdf8',
    glowColor: 'rgba(14, 165, 233, 0.45)',
    accentColor: '#38bdf8',
    topics: ['Physics', 'Chemistry', 'Biology', 'Earth Science', 'Math'],
    icon: MultiPhetIcon
  },
  {
    id: 'geogebra',
    title: 'GeoGebra',
    description: 'Dynamic 2D and 3D interactive tools and simulations for Geometry, Algebra, and Calculus.',
    url: 'https://www.geogebra.org',
    category: 'Mathematics & Geometry',
    gradeTier: 'Middle • Secondary • Higher',
    badge: 'GEOGEBRA 3D',
    bgGradient: 'linear-gradient(135deg, #ea580c 0%, #9a3412 100%)',
    borderColor: '#fb923c',
    glowColor: 'rgba(234, 88, 12, 0.45)',
    accentColor: '#fdba74',
    topics: ['Geometry', 'Algebra', 'Calculus', '3D Tools'],
    icon: MultiGeoGebraIcon
  },
  {
    id: 'ophysics',
    title: 'oPhysics',
    description: 'Interactive physics simulations covering Kinematics, Optics, Waves, Mechanics, and Electricity.',
    url: 'https://www.ophysics.com',
    category: 'Physics & Classical Mechanics',
    gradeTier: 'Secondary • Higher Secondary',
    badge: 'OPHYSICS LAB',
    bgGradient: 'linear-gradient(135deg, #2563eb 0%, #1e3a8a 100%)',
    borderColor: '#60a5fa',
    glowColor: 'rgba(37, 99, 235, 0.45)',
    accentColor: '#93c5fd',
    topics: ['Kinematics', 'Optics', 'Waves', 'Mechanics'],
    icon: MultiOphysicsIcon
  },
  {
    id: 'walter-fendt',
    title: 'Walter Fendt Simulations',
    description: 'Lightweight interactive HTML5 physics and astronomy visual models and demonstrations.',
    url: 'https://www.walter-fendt.de/html5/phen/',
    category: 'Physics & Astronomy',
    gradeTier: 'Middle • Secondary School',
    badge: 'HTML5 PHYSICS',
    bgGradient: 'linear-gradient(135deg, #059669 0%, #064e3b 100%)',
    borderColor: '#34d399',
    glowColor: 'rgba(5, 150, 105, 0.45)',
    accentColor: '#6ee7b7',
    topics: ['HTML5 Physics', 'Astronomy', 'Mechanics', 'Optics'],
    icon: MultiWalterFendtIcon
  },
  {
    id: 'falstad',
    title: 'Falstad Simulations',
    description: 'Highly detailed electronic circuit simulators, acoustics, and physics applets.',
    url: 'https://www.falstad.com',
    category: 'Electronics & Physics',
    gradeTier: 'Secondary • Higher Education',
    badge: 'CIRCUITS & WAVES',
    bgGradient: 'linear-gradient(135deg, #7c3aed 0%, #4c1d95 100%)',
    borderColor: '#a78bfa',
    glowColor: 'rgba(124, 58, 237, 0.45)',
    accentColor: '#c4b5fd',
    topics: ['Circuit Simulator', 'Acoustics', 'Physics Applets'],
    icon: MultiFalstadIcon
  },
  {
    id: 'molecular-workbench',
    title: 'Molecular Workbench',
    description: 'Interactive visual simulations for molecular dynamics, thermodynamics, and chemistry.',
    url: 'https://mw.concord.org/modeler/',
    category: 'Chemistry & Molecular Science',
    gradeTier: 'Secondary • Higher Secondary',
    badge: 'MOLECULAR LAB',
    bgGradient: 'linear-gradient(135deg, #e11d48 0%, #881337 100%)',
    borderColor: '#fb7185',
    glowColor: 'rgba(225, 29, 72, 0.45)',
    accentColor: '#fecdd3',
    topics: ['Molecular Dynamics', 'Thermodynamics', 'Chemistry'],
    icon: MultiMolecularIcon
  },
  {
    id: 'myphysicslab',
    title: 'MyPhysicsLab',
    description: 'Real-time 2D physics engine simulations covering pendulums, springs, and kinematics.',
    url: 'https://www.myphysicslab.com',
    category: 'Kinematics & Motion',
    gradeTier: 'Middle • Secondary • College',
    badge: '2D ENGINE',
    bgGradient: 'linear-gradient(135deg, #0891b2 0%, #164e63 100%)',
    borderColor: '#22d3ee',
    glowColor: 'rgba(8, 145, 178, 0.45)',
    accentColor: '#67e8f9',
    topics: ['2D Physics Engine', 'Pendulums', 'Springs', 'Collisions'],
    icon: MultiMyPhysicsLabIcon
  },
  {
    id: 'tinkercad-circuits',
    title: 'Tinkercad Circuits',
    description: 'Virtual breadboard and electronics lab to build, simulate, and program interactive circuits.',
    url: 'https://www.tinkercad.com/circuits',
    category: 'Computer Science & Hardware',
    gradeTier: 'Primary • Middle • Secondary',
    badge: 'VIRTUAL BREADBOARD',
    bgGradient: 'linear-gradient(135deg, #d97706 0%, #78350f 100%)',
    borderColor: '#fbbf24',
    glowColor: 'rgba(217, 119, 6, 0.45)',
    accentColor: '#fde68a',
    topics: ['Virtual Breadboard', 'Circuit Simulation', 'Arduino', 'Microcontrollers'],
    icon: MultiTinkercadIcon
  },
  {
    id: 'mozaik-3d',
    title: 'Mozaik 3D',
    description: 'Interactive educational 3D scenes for science, history, geography and more.',
    url: 'https://www.mozaweb.com',
    category: 'Interactive 3D Education',
    gradeTier: 'Primary • Middle • Secondary',
    badge: 'MOZAIK 3D',
    bgGradient: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
    borderColor: '#38bdf8',
    glowColor: 'rgba(14, 165, 233, 0.45)',
    accentColor: '#38bdf8',
    topics: ['3D Scenes', 'Science', 'History', 'Geography'],
    icon: MultiMozaikIcon,
    buttonText: 'Open Mozaik 3D'
  },
  {
    id: 'paper-maker',
    title: 'Paper Maker',
    description: 'Create exam papers and worksheets quickly with our own Paper Maker software. This is a paid version and is not free.',
    url: 'https://gen-z-papermaker-1.vercel.app/',
    category: 'Assessment & Worksheets',
    gradeTier: 'Teachers • Schools • Educators',
    badge: 'PAPER MAKER',
    bgGradient: 'linear-gradient(135deg, #ea580c 0%, #9a3412 100%)',
    borderColor: '#fb923c',
    glowColor: 'rgba(234, 88, 12, 0.45)',
    accentColor: '#fdba74',
    topics: ['Exam Papers', 'Worksheets', 'Paid Software'],
    icon: MultiPaperMakerIcon,
    buttonText: 'Visit Paper Maker',
    isAd: true,
    adLabels: ['PAID VERSION']
  }
];

interface ExternalSimulationsHubProps {
  isDarkMode?: boolean;
}

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

const renderGradePill = (grade: string) => {
  const parts = grade.split(/[•·]/).map(p => p.trim()).filter(Boolean);
  if (parts.length >= 2) {
    return (
      <div className="mt-2.5 mb-2 inline-flex items-center rounded-full overflow-hidden text-xs font-bold font-sans shadow-2xs border border-[#E2E8F0] max-w-full">
        <span className="px-3 py-0.5 bg-[#FEE2E2] text-[#991B1B] truncate">
          {parts[0]}
        </span>
        <span className="px-3 py-0.5 bg-[#E0F2FE] text-[#0369A1] truncate">
          {parts.slice(1).join(' • ')}
        </span>
      </div>
    );
  }
  return (
    <div className="mt-2.5 mb-2 inline-flex items-center rounded-full overflow-hidden text-xs font-bold font-sans shadow-2xs border border-[#BFDBFE] max-w-full">
      <span className="px-3 py-0.5 bg-[#EFF6FF] text-[#1E40AF] truncate">
        {grade}
      </span>
    </div>
  );
};

const renderExternalObjectivesTooltip = (item: ExternalSimulationResource) => {
  const actionVerbs = ['Investigate', 'Analyze', 'Explore', 'Simulate', 'Experiment with'];
  const objectives = item.topics.slice(0, 3).map((topic, idx) => {
    return `${actionVerbs[idx % actionVerbs.length]} ${topic}`;
  });

  return (
    <div className="relative group/tip z-30">
      <div
        tabIndex={0}
        role="button"
        aria-label={`View learning objectives for ${item.title}`}
        className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#FEF3C7] hover:bg-[#FDE68A] text-[#92400E] border border-[#FCD34D] shadow-2xs transition-all cursor-help group-hover/tip:border-[#F59E0B] group-hover/tip:shadow-xs"
      >
        <Target className="w-3 h-3 text-[#D97706] shrink-0" />
        <span className="font-heading">Objectives</span>
      </div>

      <div
        role="tooltip"
        className="absolute bottom-[calc(100%+8px)] right-0 w-72 sm:w-80 p-3.5 rounded-2xl bg-[#0F172A] text-white border border-[#334155] shadow-2xl pointer-events-none opacity-0 invisible translate-y-1 group-hover/tip:opacity-100 group-hover/tip:visible group-hover/tip:translate-y-0 transition-all duration-200 z-50 text-left"
        style={{
          boxShadow: '0 20px 30px -10px rgba(15, 23, 42, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.1)'
        }}
      >
        <div className="absolute -bottom-1.5 right-5 w-3 h-3 bg-[#0F172A] border-r border-b border-[#334155] rotate-45" />

        <div className="flex items-center justify-between gap-2 pb-2 mb-2 border-b border-slate-700/80">
          <div className="flex items-center gap-1.5">
            <Target className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className="text-[11px] font-black uppercase tracking-wider text-amber-400 font-mono">
              Learning Objectives
            </span>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
            {item.category.split('&')[0].trim()}
          </span>
        </div>

        <p className="text-xs font-black text-white line-clamp-1 mb-2 font-heading">
          {item.title}
        </p>

        <div className="space-y-1.5 mb-2.5">
          {objectives.map((obj, i) => (
            <div key={i} className="flex items-start gap-1.5 text-xs leading-snug text-slate-200">
              <span className="text-emerald-400 font-bold shrink-0 mt-0.5">✓</span>
              <span>{obj}</span>
            </div>
          ))}
        </div>

        <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-400 font-medium">
          <span className="flex items-center gap-1 text-emerald-400 font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 animate-ping" />
            Verified Platform
          </span>
          <span className="text-amber-300 font-mono font-bold">Launch Lab ↗</span>
        </div>
      </div>
    </div>
  );
};

export const ExternalSimulationsHub: React.FC<ExternalSimulationsHubProps> = () => {
  return (
    <section 
      id="external-simulations" 
      className="w-full relative z-10 space-y-6 scroll-mt-24 select-none"
    >
      {/* Top Banner / Section Header: Sequential Palette Fill */}
      <div 
        className="border shadow-lg rounded-2xl p-5 sm:p-7 text-white transition-all"
        style={{
          backgroundColor: '#1B2A5C',
          borderColor: '#F5A623',
          boxShadow: '0 8px 30px rgba(27, 42, 92, 0.25)'
        }}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 flex-wrap">
              <span 
                className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider px-3.5 py-1 rounded-md border"
                style={{
                  backgroundColor: '#F5A623',
                  color: '#1B2A5C',
                  borderColor: '#E58E0A'
                }}
              >
                <Globe className="w-3.5 h-3.5 text-[#1B2A5C]" />
                SIMULATION HUB
              </span>
              <span 
                className="px-3 py-1 rounded-full text-xs font-bold border flex items-center gap-1.5 font-mono"
                style={{
                  backgroundColor: '#1546A8',
                  color: '#DBE4F7',
                  borderColor: '#2D62D1'
                }}
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-[#F5A623] shrink-0" />
                8 Curated Global STEM Repositories
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight text-white font-heading">
              External Interactive Simulation Platforms
            </h2>
            <p className="text-xs sm:text-sm font-normal max-w-3xl leading-relaxed" style={{ color: '#DBE4F7' }}>
              Explore leading research-grade physics, chemistry, engineering, and mathematics interactive simulation engines worldwide with instant direct access.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <div 
              className="px-4 py-2 rounded-xl border flex items-center gap-2 text-xs font-bold"
              style={{
                backgroundColor: '#1546A8',
                borderColor: '#2D62D1',
                color: '#DBE4F7'
              }}
            >
              <Sparkles className="w-4 h-4 text-[#F5A623] shrink-0" />
              <span>Direct External Access</span>
            </div>
          </div>
        </div>
      </div>

      {/* 8 External Simulation Cards Grid - Optimized for PC & Laptops */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
        {EXTERNAL_SIMULATION_RESOURCES.map((item, index) => {
          const IconComponent = item.icon;

          return (
            <ScrollReveal
              key={item.id}
              direction="up"
              distance={24}
              duration={500}
              delay={(index % 4) * 80}
              className="h-full flex flex-col"
            >
              <div
                className="rounded-3xl p-5 sm:p-5.5 flex flex-col justify-between relative overflow-hidden group select-none transition-all duration-200 border bg-[#F8FAFC] border-[#E2E8F0] shadow-sm hover:-translate-y-1 hover:shadow-xl hover:border-[#CBD5E1] h-full flex-1"
              >
                {/* Top Header: Visual Emblem Pedestal & Resource Badge */}
                <div className="flex items-center justify-between gap-2.5 relative z-10 pt-0.5">
                  {/* Visual Emblem Pedestal */}
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center shrink-0 p-1.5 group-hover:scale-105 transition-transform block border border-[#E2E8F0] bg-[#EEF5F8] shadow-2xs"
                    title={`Open ${item.title} in new tab`}
                  >
                    <IconComponent className="w-8 h-8 sm:w-9 sm:h-9 group-hover:scale-110 transition-transform duration-200 pointer-events-none shrink-0" />
                  </a>

                  {/* Resource Badge */}
                  {item.isAd && item.adLabels && item.adLabels.length > 0 ? (
                    <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap justify-end relative z-20">
                      <style>{`
                        @keyframes fx-paid-pulse {
                          0%, 100% {
                            transform: scale(1);
                            box-shadow: 0 0 0 0 rgba(22, 163, 74, 0.7);
                            filter: brightness(1);
                          }
                          50% {
                            transform: scale(1.07);
                            box-shadow: 0 0 16px 4px rgba(34, 197, 94, 0.65);
                            filter: brightness(1.22);
                          }
                        }
                        .fx-paid-badge {
                          animation: fx-paid-pulse 1.8s ease-in-out infinite;
                        }
                        @media (prefers-reduced-motion: reduce) {
                          .fx-paid-badge {
                            animation: none !important;
                          }
                        }
                      `}</style>
                      {item.adLabels.map((lbl, li) => (
                        <span 
                          key={li}
                          className="fx-paid-badge inline-flex items-center justify-center font-heading font-black text-xs sm:text-sm px-3.5 sm:px-4 py-1.5 rounded-xl border-2 shrink-0 tracking-wider uppercase select-none"
                          style={{
                            backgroundColor: '#16a34a',
                            color: '#FFFFFF',
                            borderColor: '#86efac',
                            boxShadow: '0 4px 14px rgba(2, 163, 74, 0.4)'
                          }}
                        >
                          {lbl}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <span 
                      className="font-mono text-xs font-black px-3.5 py-1 rounded-full border border-indigo-900/30 text-white bg-[#312E81] shrink-0 tracking-wider uppercase shadow-xs"
                    >
                      {item.badge}
                    </span>
                  )}
                </div>

                {/* Dedicated Grade / Class Level Area & Objectives Tooltip */}
                <div className="relative z-10 flex items-center justify-between gap-1.5 mt-2.5 mb-1.5">
                  {renderGradePill(item.gradeTier)}
                  {renderExternalObjectivesTooltip(item)}
                </div>

                {/* Content: Title, Subject, Description, Topics */}
                <div className="relative z-10 flex flex-col flex-1">
                  {/* Title - Full Topic Name ALWAYS Displayed Completely */}
                  <h4 className="text-base sm:text-lg font-black tracking-tight font-heading leading-snug text-[#0F172A] group-hover:text-[#0284C7] transition-colors break-words">
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline transition-colors text-[#0F172A] group-hover:text-[#0284C7]"
                      title={`Open ${item.title} in new tab`}
                    >
                      {item.title}
                    </a>
                  </h4>

                  {/* Subject & Sub-discipline */}
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#0284C7] shrink-0" />
                    <span className="text-xs sm:text-sm font-bold text-[#1E293B] truncate">{item.category}</span>
                  </div>

                  {/* Concise Description - Compact without large empty gaps */}
                  {item.description && (
                    <p className="text-xs font-normal leading-relaxed text-[#475569] line-clamp-2 mt-2" title={item.description}>
                      {item.description}
                    </p>
                  )}

                  {/* Topic Tags (Pastel pills - Shortened & Truncated) */}
                  <div className="flex flex-wrap gap-1.5 mt-2.5">
                    {item.topics.slice(0, 3).map((topic, i) => (
                      <span
                        key={i}
                        className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border shadow-2xs max-w-[120px] truncate ${getPastelTagStyle(i)}`}
                        title={topic}
                      >
                        {topic}
                      </span>
                    ))}
                    {item.topics.length > 3 && (
                      <span 
                        className="text-[11px] font-bold px-2 py-0.5 rounded-full border shadow-2xs bg-[#E0F2FE] text-[#0369A1] border-[#BAE6FD] shrink-0"
                      >
                        +{item.topics.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Action Bar (Teal-to-Cyan Gradient Button + Maximize Button) */}
                <div className="relative z-10 pt-4 mt-3.5 border-t border-slate-200/80 flex items-center justify-between gap-2.5">
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 min-w-0 h-11 sm:h-12 rounded-2xl flex items-center justify-center gap-2 text-xs sm:text-sm font-black text-white shadow-md hover:shadow-lg hover:brightness-110 transition-all transform active:scale-98 cursor-pointer select-none"
                    style={{
                      background: getLaunchBtnStyle(index).bg,
                      boxShadow: getLaunchBtnStyle(index).shadow,
                      color: '#FFFFFF'
                    }}
                    title={`Open ${item.title} in new tab`}
                  >
                    <ExternalLink className="w-4 h-4 pointer-events-none shrink-0 text-white" />
                    <span className="font-black text-white truncate" style={{ color: '#FFFFFF' }}>{item.buttonText || 'Launch Lab'}</span>
                  </a>

                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 shadow-sm transition-all cursor-pointer flex items-center justify-center active:scale-95 shrink-0"
                    title={`Explore ${item.title} Now`}
                  >
                    <Maximize2 className="w-4 h-4 pointer-events-none shrink-0 text-slate-700" />
                  </a>
                </div>
              </div>
            </ScrollReveal>
          );
        })}
      </div>
    </section>
  );
};
