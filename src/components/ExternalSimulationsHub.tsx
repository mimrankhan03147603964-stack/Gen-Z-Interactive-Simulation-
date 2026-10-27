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
  Wrench
} from 'lucide-react';

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
    icon: Atom
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
    icon: Calculator
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
    icon: Compass
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
    icon: Globe
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
    icon: Cpu
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
    icon: FlaskConical
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
    icon: Activity
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
    icon: Wrench
  }
];

interface ExternalSimulationsHubProps {
  isDarkMode?: boolean;
}

export const ExternalSimulationsHub: React.FC<ExternalSimulationsHubProps> = () => {
  return (
    <section 
      id="external-simulations" 
      className="w-full relative z-10 space-y-6 scroll-mt-24 select-none"
    >
      {/* Top Banner / Section Header */}
      <div className="bg-white border border-[#BDD8E9] shadow-sm rounded-2xl p-5 sm:p-7 text-[#001D39] transition-all">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-[#001D39] px-3.5 py-1 rounded-md bg-[#BDD8E9] border border-[#6EA2B3]">
                <Globe className="w-3.5 h-3.5 text-[#0A4174]" />
                SIMULATION HUB
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#BDD8E9]/50 text-[#0A4174] border border-[#7BBDE8] shadow-2xs flex items-center gap-1.5 font-mono">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#4E8EA2] shrink-0" />
                8 Curated Global STEM Repositories
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight text-[#001D39] font-heading">
              External Interactive Simulation Platforms
            </h2>
            <p className="text-xs sm:text-sm text-[#49769F] font-normal max-w-3xl leading-relaxed">
              Explore leading research-grade physics, chemistry, engineering, and mathematics interactive simulation engines worldwide with instant direct access.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <div className="px-4 py-2 rounded-xl bg-[#BDD8E9]/30 border border-[#BDD8E9] shadow-2xs flex items-center gap-2 text-xs font-bold text-[#001D39]">
              <Sparkles className="w-4 h-4 text-[#0A4174] shrink-0" />
              <span>Direct External Access</span>
            </div>
          </div>
        </div>
      </div>

      {/* 8 External Simulation Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6 w-full">
        {EXTERNAL_SIMULATION_RESOURCES.map((item) => {
          const IconComponent = item.icon;

          return (
            <div
              key={item.id}
              className="rounded-2xl p-5 flex flex-col justify-between relative overflow-hidden group select-none transition-all duration-200 bg-white border border-[#BDD8E9] shadow-sm hover:shadow-md hover:border-[#4E8EA2] hover:-translate-y-1 text-[#49769F]"
            >
              {/* Top Header: Visual Emblem Pedestal & Resource Badge */}
              <div className="flex items-center justify-between gap-3 relative z-10 pt-1">
                {/* Visual Emblem Pedestal (Icon 100% untouched) */}
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center shrink-0 p-1.5 group-hover:scale-105 transition-transform block bg-[#BDD8E9]/30 border border-[#BDD8E9] shadow-xs"
                  title={`Open ${item.title} in new tab`}
                >
                  <IconComponent className="w-8 h-8 sm:w-9 sm:h-9 text-[#0A4174] group-hover:scale-110 transition-transform duration-200 pointer-events-none shrink-0" />
                </a>

                {/* Resource Badge */}
                <span 
                  className="font-mono text-xs font-bold px-3 py-1 rounded-full bg-[#BDD8E9] text-[#001D39] border border-[#6EA2B3] shrink-0 tracking-wide"
                >
                  {item.badge}
                </span>
              </div>

              {/* Dedicated Grade / Class Level Area */}
              <div className="relative z-10 mt-2.5 mb-2.5 flex items-center">
                <span 
                  className="text-[11px] font-bold px-3 py-1 rounded-full font-mono bg-[#BDD8E9]/50 text-[#0A4174] border border-[#7BBDE8] leading-normal inline-block max-w-full break-words text-left"
                  title={item.gradeTier}
                >
                  {item.gradeTier}
                </span>
              </div>

              {/* Content: Title, Subject, Description, Topics */}
              <div className="relative z-10 flex-1 flex flex-col">
                {/* Title */}
                <h4 
                  className="text-base sm:text-lg font-bold tracking-tight text-[#001D39] font-heading leading-snug line-clamp-2"
                >
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#0A4174] transition-colors"
                    title={`Open ${item.title} in new tab`}
                  >
                    {item.title}
                  </a>
                </h4>

                {/* Subject & Sub-discipline */}
                <p className="text-xs font-bold mt-1.5 line-clamp-1 flex items-center gap-1.5 text-[#0A4174]">
                  <span className="w-2 h-2 rounded-full bg-[#4E8EA2] inline-block shrink-0" />
                  <span className="text-[#0A4174] font-bold">{item.category}</span>
                </p>

                {/* Concept Description */}
                <div className="mt-2 flex-1">
                  <p 
                    className="text-xs sm:text-[13px] font-normal text-[#49769F] leading-relaxed line-clamp-3"
                  >
                    {item.description}
                  </p>
                </div>

                {/* Topic Tags */}
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {item.topics.slice(0, 3).map((topic, i) => (
                    <span
                      key={i}
                      className="text-[11px] font-medium px-2.5 py-0.5 rounded-md truncate max-w-[150px] bg-[#BDD8E9]/35 text-[#0A4174] border border-[#BDD8E9] font-mono"
                      title={topic}
                    >
                      {topic}
                    </span>
                  ))}
                  {item.topics.length > 3 && (
                    <span 
                      className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-[#BDD8E9] text-[#001D39] border border-[#6EA2B3] font-mono"
                    >
                      +{item.topics.length - 3}
                    </span>
                  )}
                </div>
              </div>

              {/* Card Action Bar */}
              <div className="relative z-10 pt-4 mt-4 border-t border-[#BDD8E9] flex items-center justify-between gap-2">
                {/* Action Button: Navy Blue Button with Crisp White Typography */}
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-[#0A4174] hover:bg-[#001D39] text-white px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 cursor-pointer shadow-xs border border-[#001D39] transition-all transform active:scale-95"
                  title={`Launch ${item.title} in new tab`}
                >
                  <ExternalLink className="w-3.5 h-3.5 text-white pointer-events-none shrink-0" />
                  <span className="text-white font-bold">Launch Lab</span>
                </a>

                {/* Direct External Link Icon Button */}
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-white hover:bg-[#BDD8E9] text-[#0A4174] border border-[#BDD8E9] transition-all cursor-pointer flex items-center justify-center shadow-xs active:scale-95 shrink-0"
                  title={`Explore ${item.title} Now`}
                >
                  <Maximize2 className="w-4 h-4 text-[#0A4174] pointer-events-none shrink-0" />
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
