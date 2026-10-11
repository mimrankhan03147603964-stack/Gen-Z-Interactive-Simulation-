import { SimulationItem } from '../types';

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
    description: 'Step-by-step 4-stage Water Cycle visualizer (Evaporation, Condensation, Precipitation, Collection) alongside an interactive 3D-style Earth diurnal rotation model.',
    fileUrl: '/simulations/earth-and-space.html',
    topics: ['Hydrological Cycle Stages', 'Earth 24-Hour Axial Rotation', 'Day / Night Terminator Line', 'Atmosphere & City Lights'],
    features: ['Step-by-Step Water Stages', 'Earth Rotation Controller', 'City Lights & Atmosphere Toggles', 'Local Time Clock HUD'],
    gradeLevel: 'Elementary & Middle'
  },
  {
    id: 'sim-earth-rotation-revolution',
    slug: 'earth-rotation-revolution',
    indexNumber: '15',
    title: 'Earth Rotation & Revolution Simulator',
    subject: 'Astronomy & Geophysics',
    category: 'Earth & Space',
    iconName: 'Globe',
    accentColor: '#0284c7', // Sky Blue
    description: 'Comprehensive 3D model of Earth orbiting the Sun demonstrating the 23.5° axial tilt, equinoxes, solstices, day/night cycles, and the real mechanics of changing seasons.',
    fileUrl: '/simulations/earth-rotation-revolution.html',
    topics: ['23.5° Axial Tilt Mechanics', 'Solstices & Equinoxes', 'Diurnal Earth Rotation', 'Seasonal Sunlight Insolation'],
    features: ['3D Orbital Perspective', 'Season Jump Buttons', 'Solar Ray Tracers', 'Real-time Distance HUD'],
    gradeLevel: 'Middle & Secondary'
  },
  {
    id: 'sim-plate-tectonics-moon-phases',
    slug: 'plate-tectonics-moon-phases',
    indexNumber: '16',
    title: 'Moon Phases & Lunar Orbit Simulator',
    subject: 'Lunar Astronomy & Celestial Mechanics',
    category: 'Earth & Space',
    iconName: 'Moon',
    accentColor: '#7c3aed', // Purple
    description: 'Interactive lunar astronomy simulator featuring an 8-phase synodic lunar orbit visualizer, synchronous orbital mechanics, spring/neap tides, and direct Earth observer sky view.',
    fileUrl: '/simulations/plate-tectonics-moon-phases.html',
    topics: ['8 Synodic Lunar Phases', '29.5-Day Synodic Month', 'Earth Observer Sky View', 'Spring & Neap Tides'],
    features: ['Synodic Month Day Slider', '8 Phase Jump Selectors', 'Real-time Illumination Telemetry', 'True Fullscreen Mode'],
    gradeLevel: 'Middle & Secondary'
  },
  {
    id: 'sim-solar-lunar-eclipse',
    slug: 'solar-and-lunar-eclipse',
    indexNumber: '17',
    title: 'Solar & Lunar Eclipse Simulator',
    subject: 'Celestial Mechanics & Ray Optics',
    category: 'Earth & Space',
    iconName: 'CircleDot',
    accentColor: '#ea580c', // Orange
    description: 'Ray-traced syzygy alignment model demonstrating Umbra and Penumbra shadow cones, Total/Partial Solar Eclipses with Corona, Blood Moon Lunar Eclipses, and 5° orbital inclination.',
    fileUrl: '/simulations/solar-and-lunar-eclipse.html',
    topics: ['Umbra & Penumbra Shadow Geometry', 'Solar Corona & Diamond Ring', 'Rayleigh Scattering Blood Moon', '5.14° Lunar Orbital Inclination'],
    features: ['Solar & Lunar Dual Mode', 'Earth Observer Sky Telescope', 'Alignment & Node Sliders', 'Shadow Obscuration HUD'],
    gradeLevel: 'Middle & High School'
  },
  {
    id: 'sim-planetary-motion-keplers-laws',
    slug: 'planetary-motion-keplers-laws',
    indexNumber: '18',
    title: 'Solar System & Planetary Motion (Kepler\'s Laws)',
    subject: 'Astrophysics & Classical Mechanics',
    category: 'Physics & Motion',
    iconName: 'Orbit',
    accentColor: '#4f46e5', // Indigo
    description: 'Interactive laboratory demonstrating Kepler\'s 3 Laws of Planetary Motion: Elliptical orbits with dual foci, equal areas swept in equal time intervals, and harmonic law (T² = a³).',
    fileUrl: '/simulations/planetary-motion-keplers-laws.html',
    topics: ['1st Law: Ellipses & Eccentricity', '2nd Law: Equal Area Sweeps', '3rd Law: Harmonies (T² ∝ a³)', 'Gravitational Velocity Vectors'],
    features: ['Dynamic Area Sweeping', 'Live Velocity Vector Arrow', 'Eccentricity Range Slider', 'Planetary Harmonics Table'],
    gradeLevel: 'Secondary & High School'
  },
  {
    id: 'sim-solar-system-orbits',
    slug: 'solar-system-orbits',
    indexNumber: '19',
    title: '3D Solar System & Planetary Orbits',
    subject: 'Planetary Science & Astronomy',
    category: 'Earth & Space',
    iconName: 'Telescope',
    accentColor: '#0891b2', // Teal/Cyan
    description: 'Complete multi-planet orbital model of our Solar System featuring Mercury, Venus, Earth, Mars, Asteroid Belt, Jupiter, Saturn with rings, Uranus, and Neptune with accurate relative speeds.',
    fileUrl: '/simulations/solar-system-orbits.html',
    topics: ['8 Major Planets & Orbits', 'Keplerian Velocity Ratios', 'Asteroid Belt Dynamics', 'Planetary Atmosphere & Moons'],
    features: ['Focus Zoom on Any Planet', 'Time Warp Speed Slider', 'High-Res Planet Previews', 'Orbital Trails & Asteroid Field'],
    gradeLevel: 'All Grade Levels'
  },
  {
    id: 'sim-periodic-table-bohr',
    slug: 'periodic-table-bohr-model',
    indexNumber: '20',
    title: 'Interactive Periodic Table & Bohr Model',
    subject: 'Atomic Chemistry & Quantum Shells',
    category: 'Chemistry & Matter',
    iconName: 'Atom',
    accentColor: '#0284c7', // Sky Blue
    description: 'Dynamic periodic table with real-time electron shell orbitals (K, L, M, N), live Bohr model canvas, valence electron readouts, and atomic mass configurations.',
    fileUrl: '/simulations/periodic-table-bohr-model.html',
    topics: ['Atomic Number & Mass', 'Bohr Electron Orbits', 'Valence Electrons & Shells', 'Element Groups & Periods'],
    features: ['Interactive Element Selection', 'Live Canvas Bohr Orbits', 'Electron Shell Breakdown', 'Variable Orbit Speeds'],
    gradeLevel: 'Middle & High School'
  },
  {
    id: 'sim-sound-waves-doppler',
    slug: 'sound-waves-doppler-effect',
    indexNumber: '21',
    title: 'Sound Waves, Frequency & Doppler Effect',
    subject: 'Acoustics & Wave Physics',
    category: 'Physics & Motion',
    iconName: 'Activity',
    accentColor: '#0d9488', // Teal
    description: 'Acoustics virtual lab featuring transverse waveform graphs, longitudinal particle density compressions, live Web Audio tone synthesizer, and moving source Doppler effect.',
    fileUrl: '/simulations/sound-waves-doppler-effect.html',
    topics: ['Frequency & Pitch (v = fλ)', 'Amplitude & Loudness', 'Longitudinal Compressions', 'Doppler Frequency Shift'],
    features: ['Real Audio Tone Synthesizer', 'Air Particle Compression View', 'Moving Siren Vehicle', 'Wavelength & Pitch Readouts'],
    gradeLevel: 'Secondary & High School'
  },
  {
    id: 'sim-basic-maths-multiplication',
    slug: 'basic-maths-multiplication',
    indexNumber: '22',
    title: 'Basic Maths & Multiplication Lab',
    subject: 'Elementary Mathematics & Arithmetic',
    category: 'Mathematics & Logic',
    iconName: 'Calculator',
    accentColor: '#4f46e5', // Indigo
    description: 'Interactive visual mathematics lab featuring dynamic Area Array blocks, 12x12 times tables matrix, skip-counting number line, fact families, and speed challenge quiz.',
    fileUrl: '/simulations/basic-maths-multiplication.html',
    topics: ['Multiplication Area Model', '12×12 Times Table Matrix', 'Skip-Counting Number Line', 'Fact Families (× & ÷)'],
    features: ['Dynamic Area Array Canvas', 'Clickable Times Table Matrix', 'Animated Number Line Jumps', 'Speed Challenge Quiz'],
    gradeLevel: 'Elementary & Middle School'
  },
  {
    id: 'sim-interactive-geometry',
    slug: 'interactive-geometry-shapes',
    indexNumber: '23',
    title: 'Interactive Geometry, Shapes & Angles',
    subject: 'Geometry & Measurement',
    category: 'Mathematics & Logic',
    iconName: 'Shapes',
    accentColor: '#0284c7', // Ocean Sky Blue
    description: 'Explore 2D polygons, dynamic area & perimeter calculations, 360° protractor angle classifications, visual Pythagorean theorem proof, and coordinate geometry.',
    fileUrl: '/simulations/interactive-geometry-shapes.html',
    topics: ['2D Polygon Area & Perimeter', '360° Protractor Angles', 'Pythagorean Theorem (a²+b²=c²)', 'Cartesian Coordinate Plane'],
    features: ['Real-time Geometric Render', 'Interactive 360° Protractor', 'Visual Area Squares Proof', 'Draggable Grid Vertices'],
    gradeLevel: 'Middle & High School'
  },
  {
    id: 'sim-algebra-equation-balancer',
    slug: 'algebra-equation-balancer',
    indexNumber: '24',
    title: 'Algebra & Equation Balancing Lab',
    subject: 'Algebra & Functions',
    category: 'Mathematics & Logic',
    iconName: 'Scale',
    accentColor: '#7c3aed', // Purple
    description: 'Balance linear algebraic equations on a physical dual-pan beam scale, deduce unknown variables step-by-step, and explore linear and quadratic function graphs.',
    fileUrl: '/simulations/algebra-equation-balancer.html',
    topics: ['Dual-Pan Balance Scale', 'Linear Equation Solving', 'Slope-Intercept Form (y = mx + c)', 'Quadratic Curves & Roots'],
    features: ['Interactive Pan Balance Beam', 'Step-by-Step Algebraic Solver', 'Cartesian Graph with Slope', 'Dynamic Parabola Roots'],
    gradeLevel: 'Middle & Secondary School'
  },
  {
    id: 'sim-measurement-units-scale',
    slug: 'measurement-units-scale',
    indexNumber: '25',
    title: 'Measurement, Scale & Units Lab',
    subject: 'Applied Mathematics & Metric Units',
    category: 'Mathematics & Logic',
    iconName: 'Ruler',
    accentColor: '#059669', // Emerald
    description: 'Precision measurement lab featuring calibrated metric/imperial rulers, digital tare mass balance scale, Archimedes water displacement cylinder, and unit converters.',
    fileUrl: '/simulations/measurement-units-scale.html',
    topics: ['Metric & Imperial Ruler', 'Digital Mass Scale & Tare', 'Liquid Volume Meniscus', 'Archimedes Fluid Displacement'],
    features: ['Draggable Objects to Measure', 'Precision Electronic Scale', 'Fluid Displacement Density Test', 'Instant Unit Converter Matrix'],
    gradeLevel: 'Elementary & Middle School'
  },
  {
    id: 'sim-computer-parts-hardware',
    slug: 'computer-parts-hardware',
    indexNumber: '26',
    title: 'Computer Parts & Hardware Architecture',
    subject: 'Computer Science & System Engineering',
    category: 'Computer Science & IT',
    iconName: 'Computer',
    accentColor: '#0284c7', // Sky Cyan
    description: 'Explore motherboard anatomy, CPU socket, DDR5 memory slots, discrete GPU, NVMe SSD storage, and live animated high-speed data bus communications with thermal telemetry.',
    fileUrl: '/simulations/computer-parts-hardware.html',
    topics: ['CPU Multi-Core Microprocessor', 'DDR5 RAM Semiconductor Memory', 'PCIe 5.0 High-Speed Bus', 'Von Neumann Architecture'],
    features: ['Interactive Motherboard Anatomy', 'Live Bus Trace Packet Pulses', 'Real-time Spec Readouts', 'Form Factor Hardware Inspection'],
    gradeLevel: 'Middle & High School / IT'
  },
  {
    id: 'sim-keyboard-shortcuts-typing',
    slug: 'keyboard-shortcuts-typing',
    indexNumber: '27',
    title: 'Keyboard Shortcuts & System Hotkeys Lab',
    subject: 'Computer Science & Digital Literacy',
    category: 'Computer Science & IT',
    iconName: 'Keyboard',
    accentColor: '#7c3aed', // Purple Violet
    description: 'Interactive virtual mechanical keyboard and hotkey laboratory. Learn essential Windows, Mac, browser, and word processing shortcuts with animated keystroke feedback.',
    fileUrl: '/simulations/keyboard-shortcuts-typing.html',
    topics: ['Universal Clipboard (Ctrl+C/V/X)', 'Multitasking (Alt+Tab/Win+D)', 'History & Undo (Ctrl+Z/Y)', 'Browser Tab Navigation'],
    features: ['Interactive Virtual Keyboard', 'Live Physical Keystroke Detection', 'Shortcut Action Explainer', 'Speed Polling Feedback'],
    gradeLevel: 'Elementary, Middle & High School'
  },
  {
    id: 'sim-basic-prepositions-3d',
    slug: 'basic-prepositions-3d',
    indexNumber: '28',
    title: 'Basic Prepositions in 3D: Space, Movement & Grammar',
    subject: 'English & Grammar (Linguistics)',
    category: 'English & Grammar',
    iconName: 'BookOpen',
    accentColor: '#ec4899', // Radiant Pink / Magenta
    description: 'Explore fundamental spatial prepositions (in, on, under, behind, in front of, beside, between, over, through) in interactive 3D with 360° rotation, authentic voice pronunciation phonics, sentence builder, and dynamic mastery quiz.',
    fileUrl: '/simulations/basic-prepositions-3d.html',
    topics: ['Prepositions of Place (in, on, under, behind)', 'Direction & Motion (through, into, across, over)', 'Spatial Relational Grammar & Syntax', 'Audio Phonics Pronunciation & 3D Quiz'],
    features: ['Interactive 3D Three.js Spatial Stage', 'Natural Web Audio Speech Pronunciation', 'Custom Sentence Builder Visualizer', 'Mastery Quiz with Explanations'],
    gradeLevel: 'Elementary, Middle & Secondary English'
  }
];

export const CATEGORIES = [
  'All Simulations',
  'Physics & Motion',
  'Chemistry & Matter',
  'Biology & Life',
  'Earth & Space',
  'Mathematics & Logic',
  'Computer Science & IT',
  'English & Grammar'
] as const;


