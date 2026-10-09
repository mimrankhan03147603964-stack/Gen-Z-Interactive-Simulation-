import { SimulationItem } from '../types.ts';

export const SIMULATIONS_LIST: SimulationItem[] = [
  {
    id: 'sim-breathing',
    slug: 'breathing-process',
    indexNumber: '01',
    title: 'The Breathing Process',
    subject: 'Biology & Human Physiology',
    category: 'Biology & Life',
    iconName: 'Activity',
    accentColor: '#10b981', // Emerald green
    gradient: 'from-emerald-500 via-teal-500 to-green-600',
    glowColor: 'rgba(16, 185, 129, 0.55)',
    description: 'Interactive simulation of the human respiratory system showing animated diaphragm contraction, lung expansion, alveolar gas exchange, and O₂/CO₂ particle streams.',
    fileUrl: '/simulations/breathing-process.html',
    topics: ['Inhalation & Exhalation', 'Diaphragm Mechanics', 'Alveoli Gas Exchange', 'Respiratory Rates'],
    features: ['Auto & Manual Breathing', 'Speed Controllers', 'Real-time Gas Flow Vectors', 'Mechanism Explanations'],
    gradeLevel: 'Middle & High School'
  },
  {
    id: 'sim-atoms-light-sound',
    slug: 'atoms-light-sound-pressure',
    indexNumber: '02',
    title: 'Atoms, Light, Sound & Pressure Lab',
    subject: 'General Physics & Chemistry',
    category: 'Physics & Motion',
    iconName: 'Atom',
    accentColor: '#06b6d4', // Cyan
    gradient: 'from-cyan-400 via-sky-500 to-blue-600',
    glowColor: 'rgba(6, 182, 212, 0.55)',
    description: 'Multi-topic interactive laboratory featuring 4 live physics experiments: Atomic lattice vibrations, reflection/refraction optical benches, speaker audio waves, and piston pressure.',
    fileUrl: '/simulations/atoms-light-sound-pressure.html',
    topics: ['States of Matter Atoms', 'Reflection & Refraction Laser', 'Speaker Frequency & Tone', 'Piston Pressure Force/Area'],
    features: ['Laser Angle Sweeper', 'Web Audio Tone Generator', 'True Fullscreen Mode', 'Interactive Particle Collisions'],
    gradeLevel: 'Middle & Secondary'
  },
  {
    id: 'sim-electricity',
    slug: 'electricity-circuits',
    indexNumber: '03',
    title: 'Electricity & Circuits Simulator',
    subject: 'Physics & Electromagnetism',
    category: 'Physics & Motion',
    iconName: 'Zap',
    accentColor: '#f59e0b', // Amber/Yellow
    gradient: 'from-amber-400 via-orange-500 to-yellow-500',
    glowColor: 'rgba(245, 158, 11, 0.55)',
    description: 'Complete electrical circuit builder with multi-cell batteries, switches, resistors, and realistic filament bulbs. Toggle simple, series, and parallel circuits with animated electron flow.',
    fileUrl: '/simulations/electricity-circuits.html',
    topics: ['Ohm\'s Law Current Flow', 'Series vs Parallel Circuits', 'Electron Drift Animation', 'Bulb Glow Luminescence'],
    features: ['Series & Parallel Modes', 'Live Electron Animation', 'Switch Control', 'Voltage & Resistance Sliders'],
    gradeLevel: 'Secondary & High School'
  },
  {
    id: 'sim-heat-transfer',
    slug: 'heat-transfer-temperature',
    indexNumber: '04',
    title: 'Heat Transfer & Temperature Lab',
    subject: 'Thermal Physics',
    category: 'Chemistry & Matter',
    iconName: 'Flame',
    accentColor: '#f43f5e', // Rose/Red
    gradient: 'from-rose-500 via-red-500 to-pink-600',
    glowColor: 'rgba(244, 63, 94, 0.55)',
    description: 'Observe thermal energy transfer via Conduction in metal rods, Convection in fluid pots, and Infrared Radiation from Sun to Earth, alongside a full Celsius state-change beaker.',
    fileUrl: '/simulations/heat-transfer-temperature.html',
    topics: ['Conduction in Metals', 'Fluid Convection Currents', 'Infrared Radiation', 'Water Phase Transitions'],
    features: ['Animated Flames & Coils', 'Molecular Kinetic Vibrations', 'Interactive Thermometer', 'Phase Change Beaker'],
    gradeLevel: 'Middle & Secondary'
  },
  {
    id: 'sim-kinematics',
    slug: 'kinematics-motion-graphs',
    indexNumber: '05',
    title: 'Kinematics: Motion & Graphs',
    subject: 'Classical Mechanics',
    category: 'Physics & Motion',
    iconName: 'Gauge',
    accentColor: '#3b82f6', // Royal Blue
    gradient: 'from-blue-500 via-indigo-600 to-cyan-500',
    glowColor: 'rgba(59, 130, 246, 0.55)',
    description: 'Real-time vehicle motion synchronized with live Distance-Time and Speed-Time graph plots, plus a vacuum vs air gravitational Free Fall experiment.',
    fileUrl: '/simulations/kinematics-motion-graphs.html',
    topics: ['Distance-Time Plots', 'Speed-Time Acceleration', 'Area Under Graph', 'Free Fall Gravitational Drop'],
    features: ['Live Dynamic Graph Plotting', 'Cruise & Brake Phases', 'Vacuum Chamber Toggle', 'Gravity Planet Selectors'],
    gradeLevel: 'Secondary & High School'
  },
  {
    id: 'sim-light-shadows',
    slug: 'light-and-shadows',
    indexNumber: '06',
    title: 'Light & Shadows Interactive Lab',
    subject: 'Optics & Geometric Shadows',
    category: 'Physics & Motion',
    iconName: 'Sun',
    accentColor: '#eab308', // Bright Yellow
    gradient: 'from-yellow-400 via-amber-500 to-orange-400',
    glowColor: 'rgba(234, 179, 8, 0.55)',
    description: 'Draggable solar light source and torch mode casting mathematically accurate ray-traced shadows for trees, persons, houses, flagpoles, and spheres with distance measurements.',
    fileUrl: '/simulations/light-and-shadows.html',
    topics: ['Rectilinear Light Rays', 'Opaque Shadow Formation', 'Diurnal Sun Elevation', 'Metric Length Measurement'],
    features: ['Draggable Sun & Objects', 'Day / Night Torch Mode', 'Ray-tracing Projections', 'Preset Elevation Times'],
    gradeLevel: 'Elementary & Middle'
  },
  {
    id: 'sim-living-nonliving',
    slug: 'living-non-living',
    indexNumber: '07',
    title: 'Living vs Non-Living Things',
    subject: 'Biology & Ecology',
    category: 'Biology & Life',
    iconName: 'Sparkles',
    accentColor: '#14b8a6', // Teal
    gradient: 'from-teal-400 via-emerald-500 to-cyan-600',
    glowColor: 'rgba(20, 184, 166, 0.55)',
    description: 'Interactive classification workbench where students classify organisms and inanimate objects into living and non-living categories with instant feedback scoring.',
    fileUrl: '/simulations/living-non-living.html',
    topics: ['Biological Characteristics', 'Cellular Growth & Reproduction', 'Metabolism & Respiration', 'Organism Classification'],
    features: ['Interactive Drag & Drop', 'Visual Classification', 'Live Score Tracking', 'Classification Error Feedback'],
    gradeLevel: 'Elementary & Middle'
  },
  {
    id: 'sim-mixtures-solutions',
    slug: 'mixtures-and-solutions',
    indexNumber: '08',
    title: 'Mixtures & Solutions Chemistry Lab',
    subject: 'General Chemistry',
    category: 'Chemistry & Matter',
    iconName: 'FlaskConical',
    accentColor: '#6366f1', // Indigo
    gradient: 'from-indigo-500 via-purple-600 to-blue-600',
    glowColor: 'rgba(99, 102, 241, 0.55)',
    description: 'Virtual chemistry beaker with solute dissolving, stirring rod acceleration, saturation thresholds, and thermal burner effects across sugar, salt, sand, and oil.',
    fileUrl: '/simulations/mixtures-and-solutions.html',
    topics: ['Solute, Solvent & Solution', 'Saturation Concentration (g/L)', 'Suspensions vs Immiscible Liquids', 'Thermal Dissolution Kinetics'],
    features: ['Solute Dropper Spatula', 'Stirring Rod Animation', 'Burner Heating Control', 'Particle Solvation Dynamics'],
    gradeLevel: 'Middle & Secondary'
  },
  {
    id: 'sim-newtons-laws',
    slug: 'newtons-laws-of-motion',
    indexNumber: '09',
    title: 'Newton\'s 3 Laws of Motion',
    subject: 'Classical Mechanics & Dynamics',
    category: 'Physics & Motion',
    iconName: 'Rocket',
    accentColor: '#8b5cf6', // Purple
    gradient: 'from-violet-500 via-purple-600 to-indigo-600',
    glowColor: 'rgba(139, 92, 246, 0.55)',
    description: 'Explore the 3 laws of motion: Law 1 ball inertia with friction toggle, Law 2 F=ma mass cart acceleration, and Law 3 action-reaction exhaust rocket launch.',
    fileUrl: '/simulations/newtons-laws-of-motion.html',
    topics: ['Newton\'s 1st Law (Inertia)', 'Newton\'s 2nd Law (F = ma)', 'Newton\'s 3rd Law (Action/Reaction)', 'Friction & Acceleration'],
    features: ['Friction Control Toggle', 'Mass & Force Range Sliders', 'Rocket Exhaust Thrust', 'HUD Physics Readouts'],
    gradeLevel: 'Secondary & High School'
  },
  {
    id: 'sim-ohms-law',
    slug: 'ohms-law-lab',
    indexNumber: '10',
    title: 'Ohm\'s Law & Circuit Analysis',
    subject: 'Electronics & Circuit Physics',
    category: 'Physics & Motion',
    iconName: 'Cpu',
    accentColor: '#0ea5e9', // Sky Blue
    gradient: 'from-sky-400 via-blue-500 to-indigo-600',
    glowColor: 'rgba(14, 165, 233, 0.55)',
    description: 'Comprehensive electrical lab featuring the algebraic V-I-R formula triangle, live circuit meters, continuous V-I graph plotting, and electrical power cost calculators.',
    fileUrl: '/simulations/ohms-law-lab.html',
    topics: ['V = I × R Formula Triangle', 'Ammeter & Voltmeter Placement', 'V-I Graph Slope Resistance', 'Electrical Power (P = VI)'],
    features: ['Interactive Triangle Solver', 'Multi-Resistor Comparison', 'Series & Parallel Switcher', 'Kilowatt-Hour Cost Meter'],
    gradeLevel: 'Secondary & High School'
  },
  {
    id: 'sim-photosynthesis',
    slug: 'photosynthesis-lab',
    indexNumber: '11',
    title: 'Photosynthesis in Flowering Plants',
    subject: 'Plant Biology & Biochemistry',
    category: 'Biology & Life',
    iconName: 'Leaf',
    accentColor: '#84cc16', // Lime Green
    gradient: 'from-lime-400 via-green-500 to-emerald-600',
    glowColor: 'rgba(132, 204, 22, 0.55)',
    description: 'High-detail biological model of a flowering rose plant demonstrating solar photon absorption, root xylem water transport, leaf stomata CO₂ uptake, and O₂/glucose production.',
    fileUrl: '/simulations/photosynthesis-lab.html',
    topics: ['Light-Dependent Reactions', 'Leaf Mesophyll & Chloroplasts', 'Root Xylem Transpiration Pull', 'Stomatal Gas Exchange'],
    features: ['Solar Intensity Slider', 'Water & CO₂ Controls', 'Microscopic Leaf Cross-section', 'Chemical Reaction Readout'],
    gradeLevel: 'Secondary & High School'
  },
  {
    id: 'sim-simple-machines',
    slug: 'simple-machines',
    indexNumber: '12',
    title: 'Simple Machines (6 Mechanisms)',
    subject: 'Mechanical Engineering & Physics',
    category: 'Physics & Motion',
    iconName: 'Cog',
    accentColor: '#f97316', // Orange
    gradient: 'from-orange-500 via-amber-600 to-red-500',
    glowColor: 'rgba(249, 115, 22, 0.55)',
    description: 'Interactive simulations of all 6 classic simple machines: Class 1 Lever beam, Grooved Pulley block & tackle, Inclined Plane ramp, Splitting Wedge, Spiral Screw, and Wheel & Axle.',
    fileUrl: '/simulations/simple-machines.html',
    topics: ['Mechanical Advantage (MA)', 'Class 1 Levers & Torque', 'Pulleys & Rope Multiplication', 'Wheel & Axle Radius Ratios'],
    features: ['All 6 Machines in One Lab', 'Fulcrum Position Slider', 'Dynamic Force Vectors', 'Mechanical Advantage HUD'],
    gradeLevel: 'Middle & Secondary'
  },
  {
    id: 'sim-states-of-matter',
    slug: 'states-of-matter',
    indexNumber: '13',
    title: 'States of Matter (Solid, Liquid, Gas)',
    subject: 'Thermodynamics & Chemistry',
    category: 'Chemistry & Matter',
    iconName: 'Layers',
    accentColor: '#d946ef', // Fuchsia
    gradient: 'from-fuchsia-500 via-pink-500 to-purple-600',
    glowColor: 'rgba(217, 70, 239, 0.55)',
    description: 'Watch phase changes unfold in a laboratory beaker with realistic Bunsen burner flames, liquid boiling bubbles, crystal ice cubes, molecular inset zoom, and mercury thermometer.',
    fileUrl: '/simulations/states-of-matter.html',
    topics: ['Solid Crystal Lattice', 'Liquid Fluid Flow', 'Gas Kinetic Diffusion', 'Freezing & Boiling Points'],
    features: ['Burner Flame Simulation', 'Celsius Slider (−50°C to 150°C)', 'Molecular Inset Scope', 'True Fullscreen Viewport'],
    gradeLevel: 'Elementary & Middle'
  },
  {
    id: 'sim-earth-space',
    slug: 'earth-and-space',
    indexNumber: '14',
    title: 'Earth & Space: Water Cycle & Day/Night',
    subject: 'Earth Science & Astronomy',
    category: 'Earth & Space',
    iconName: 'Globe',
    accentColor: '#2563eb', // Vivid Blue
    gradient: 'from-blue-600 via-cyan-500 to-indigo-700',
    glowColor: 'rgba(37, 99, 235, 0.55)',
    description: 'Step-by-step 4-stage Water Cycle visualizer (Evaporation, Condensation, Precipitation, Collection) alongside an interactive 3D-style Earth diurnal rotation model.',
    fileUrl: '/simulations/earth-and-space.html',
    topics: ['Hydrological Cycle Stages', 'Earth 24-Hour Axial Rotation', 'Day / Night Terminator Line', 'Atmosphere & City Lights'],
    features: ['Step-by-Step Water Stages', 'Earth Rotation Controller', 'City Lights & Atmosphere Toggles', 'Local Time Clock HUD'],
    gradeLevel: 'Elementary & Middle'
  }
];

export const CATEGORIES = [
  'All Simulations',
  'Physics & Motion',
  'Chemistry & Matter',
  'Biology & Life',
  'Earth & Space'
] as const;
