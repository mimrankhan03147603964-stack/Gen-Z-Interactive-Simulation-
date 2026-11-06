import React from 'react';
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
} from '../components/ModernStemIcons';

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
    glowColor: 'rgba(14, 165, 233, 0.35)',
    accentColor: '#0284c7',
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
    glowColor: 'rgba(234, 88, 12, 0.35)',
    accentColor: '#ea580c',
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
    glowColor: 'rgba(37, 99, 235, 0.35)',
    accentColor: '#2563eb',
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
    glowColor: 'rgba(5, 150, 105, 0.35)',
    accentColor: '#059669',
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
    glowColor: 'rgba(124, 58, 237, 0.35)',
    accentColor: '#7c3aed',
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
    glowColor: 'rgba(225, 29, 72, 0.35)',
    accentColor: '#e11d48',
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
    glowColor: 'rgba(8, 145, 178, 0.35)',
    accentColor: '#0891b2',
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
    glowColor: 'rgba(217, 119, 6, 0.35)',
    accentColor: '#d97706',
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
    glowColor: 'rgba(14, 165, 233, 0.35)',
    accentColor: '#0284c7',
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
    bgGradient: 'linear-gradient(135deg, #16a34a 0%, #14532d 100%)',
    borderColor: '#4ade80',
    glowColor: 'rgba(22, 163, 74, 0.35)',
    accentColor: '#16a34a',
    topics: ['Exam Papers', 'Worksheets', 'Paid Software'],
    icon: MultiPaperMakerIcon,
    buttonText: 'Visit Paper Maker',
    isAd: true,
    adLabels: ['PAID VERSION']
  }
];
