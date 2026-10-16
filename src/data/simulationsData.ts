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
  },
  {
    id: 'sim-atoms-molecules-builder',
    slug: 'atoms-and-molecules-builder',
    indexNumber: '29',
    title: 'Atoms & Molecules: Interactive Chemistry Lab',
    subject: 'Chemistry & Molecular Science',
    category: 'Chemistry & Matter',
    iconName: 'Atom',
    accentColor: '#0284c7', // Sky Cyan Blue
    description: 'Interactive chemistry laboratory simulation. Construct custom atoms with protons, neutrons, and orbiting electron shells, calculate net charge and isotopes, and explore 3D ball-and-stick covalent molecules (H₂O, CO₂, CH₄, NH₃, O₂, NaCl).',
    fileUrl: '/simulations/atoms-and-molecules-builder.html',
    topics: ['Protons, Neutrons & Electron Orbitals', 'Pauli Exclusion & Bohr Shells (K, L, M)', 'Covalent & Ionic Molecules (H₂O, CO₂, CH₄)', 'Isotopes & Nuclear Stability'],
    features: ['Interactive Subatomic Particle Steppers', 'Real-time Animated Electron Orbitals', '3D Ball-and-Stick Molecule Viewer', 'Atomic & Molecular Orbital Theory'],
    gradeLevel: 'Middle & Secondary School Chemistry'
  },
  {
    id: 'sim-early-childhood-care-education',
    slug: 'early-childhood-care-education',
    indexNumber: '30',
    title: 'Early Childhood Care & Education (ECCE) Discovery Academy',
    subject: 'Early Childhood & Foundation Stage (ECCE / Pre-K)',
    category: 'Early Childhood (ECCE)',
    iconName: 'Baby',
    accentColor: '#f59e0b', // Radiant Amber / Gold
    description: 'Interactive early childhood discovery studio for foundational early learners. Explore alphabet phonics with natural speech & letter tracing, Montessori 1–10 counting & Ten-Frames, shapes & primary color mixing, animal sounds & habitats, daily hygiene routines, and emotional wellness.',
    fileUrl: '/simulations/early-childhood-care-education.html',
    topics: ['Phonics Alphabet & Handwriting Tracing', 'Montessori Ten-Frame & Tactile Counting', '2D Geometric Shapes & Color Mixing', 'Animal Sounds, Babies & Habitats', 'Daily Hygiene & Emotional Care', 'Multi-Sensory Star Quiz Challenge'],
    features: ['Phonetic Web Audio & Voice Pronunciation', 'Interactive Letter Tracing & Magic Canvas', 'Montessori Ten-Frame & Quantity Balancer', '20-Second Handwashing & Routine Timers', 'Star Quiz & Star Explorer Certificate'],
    gradeLevel: 'Pre-K, Nursery, Kindergarten & Early Primary (Ages 3–7)'
  },
  {
    id: 'sim-dna-genetics-punnett-square',
    slug: 'dna-genetics-punnett-square',
    indexNumber: '31',
    title: 'Genetics, DNA & Punnett Square Lab',
    subject: 'Cellular Biology & Genetics',
    category: 'Biology & Life',
    iconName: 'Dna',
    accentColor: '#10b981', // Emerald Green
    description: 'Explore molecular genetics, DNA double helix structure, base pairing (A-T, C-G), transcription to mRNA, Mendelian monohybrid/dihybrid Punnett squares, and pedigree genetic disease tracing.',
    fileUrl: '/simulations/dna-genetics-punnett-square.html',
    topics: ['DNA Double Helix & Nitrogenous Bases', 'Transcription & Protein Synthesis', 'Mendelian Genetics & Punnett Squares', 'Pedigree Charts & Hereditary Diseases'],
    features: ['Interactive 3D-Style DNA Helix Visualizer', 'Dynamic Monohybrid & Dihybrid Matrix Solver', 'Family Tree Pedigree Genetic Tracker', 'Real-Time Phenotype & Genotype Calculator'],
    gradeLevel: 'Middle, Secondary & Advanced High School Biology'
  },
  {
    id: 'sim-acids-bases-ph-titration',
    slug: 'acids-bases-ph-titration',
    indexNumber: '32',
    title: 'Acids, Bases & pH Titration Lab',
    subject: 'Chemistry & Solution Science',
    category: 'Chemistry & Matter',
    iconName: 'TestTube',
    accentColor: '#a855f7', // Purple Orchid
    description: 'Interactive analytical chemistry laboratory. Investigate pH scale (0–14), hydronium [H₃O⁺] and hydroxide [OH⁻] concentrations, universal indicator color transitions, and perform precision burette acid-base neutralization titrations with real-time equivalence point curve plotting.',
    fileUrl: '/simulations/acids-bases-ph-titration.html',
    topics: ['pH Scale & Logarithmic Concentration', 'Arrhenius & Brønsted-Lowry Acids/Bases', 'Burette Acid-Base Neutralization Titration', 'Universal Indicator & Phenolphthalein Endpoints'],
    features: ['Interactive pH Meter & Universal Color Probe', 'Precision Volumetric Burette Titration Simulator', 'Real-Time Equivalence Point & pH Curve Plotter', 'Household & Laboratory Chemical Solutions Catalog'],
    gradeLevel: 'Middle, Secondary & High School Chemistry'
  },
  {
    id: 'sim-electromagnetic-induction-lab',
    slug: 'electromagnetic-induction-lab',
    indexNumber: '33',
    title: 'Electromagnetic Induction & Faraday\'s Law Lab',
    subject: 'Physics & Electrodynamics',
    category: 'Physics & Motion',
    iconName: 'Magnet',
    accentColor: '#06b6d4', // Royal Electric Cyan
    description: 'Comprehensive electrodynamics simulation laboratory. Thrust bar magnets through multi-turn copper coils to observe Faraday\'s induction and Lenz\'s Law opposition, map magnetic vector field streamlines with compass needles, configure step-up/step-down AC transformers, and trace Lorentz force charged particle deflection in magnetic fields.',
    fileUrl: '/simulations/electromagnetic-induction-lab.html',
    topics: ['Faraday\'s Law & Rate of Magnetic Flux Change', 'Lenz\'s Law & Opposing Induced Fields', 'Magnetic Field Mapping & Compass Array', 'AC Mutual Induction & Step-Up/Down Transformers', 'Lorentz Force & Cyclotron Particle Deflection'],
    features: ['Dual-Sided Bar Magnet Coil Thrust Simulator', 'Interactive Compass Needle Vector Array Probe', 'Laminated Iron Core AC Transformer Configurator', 'Lorentz Force Charged Particle Deflection Chamber', 'Interactive Electromagnetism Mastery Quiz'],
    gradeLevel: 'Middle, Secondary & Advanced High School Physics'
  },
  {
    id: 'sim-projectile-motion-gravity',
    slug: 'projectile-motion-gravity',
    indexNumber: '34',
    title: 'Projectile Motion & Gravitational Trajectory Lab',
    subject: 'Classical Mechanics & Kinematics',
    category: 'Physics & Motion',
    iconName: 'Compass',
    accentColor: '#0284c7', // Sky Blue
    description: 'Launch cannon projectiles across multiple planetary gravitational fields (Earth, Moon, Mars, Jupiter). Investigate launch angle optimization, velocity vector decomposition (Vx, Vy), peak flight altitude, and real-time parabolic trajectories.',
    fileUrl: '/simulations/projectile-motion-gravity.html',
    topics: ['2D Projectile Trajectory', 'Horizontal vs Vertical Velocity', 'Launch Angle & Max Range', 'Planetary Gravity Field Variations'],
    features: ['Adjustable Angle & Initial Velocity', 'Planetary Gravity Presets (Earth, Moon, Mars, Jupiter)', 'Real-Time Velocity Vector Display', 'Parabolic Theoretical Path Tracing'],
    gradeLevel: 'Middle & High School Physics'
  },
  {
    id: 'sim-chemical-reaction-kinetics',
    slug: 'chemical-reaction-kinetics',
    indexNumber: '35',
    title: 'Chemical Reaction Kinetics & Catalysis Lab',
    subject: 'Physical & Molecular Chemistry',
    category: 'Chemistry & Matter',
    iconName: 'FlaskConical',
    accentColor: '#9333ea', // Purple
    description: 'Investigate collision theory and reaction kinetics. Alter temperature, reactant concentrations, and activate enzymatic catalysts to lower activation energy (Ea) and observe real-time molecular product formation with dynamic rate curve plotting.',
    fileUrl: '/simulations/chemical-reaction-kinetics.html',
    topics: ['Collision Theory & Activation Energy', 'Temperature Effects on Reaction Rates', 'Catalytic Mechanisms & Energy Barriers', 'Concentration vs Product Yield'],
    features: ['Dynamic Particle Collision Engine', 'Interactive Catalyst Activation Toggle', 'Thermodynamic Temperature Controls', 'Live Concentration Progress Curve Plotter'],
    gradeLevel: 'Secondary & High School Chemistry'
  },
  {
    id: 'sim-photosynthesis-chloroplast-engine',
    slug: 'photosynthesis-chloroplast-engine',
    indexNumber: '36',
    title: 'Photosynthesis & Cellular Chloroplast Engine',
    subject: 'Cellular Biology & Bioenergetics',
    category: 'Biology & Life',
    iconName: 'Leaf',
    accentColor: '#16a34a', // Emerald Green
    description: 'Interactive chloroplast bioenergetics simulator. Control solar photon flux, water intake, and stomatal CO₂ levels to drive thylakoid light-dependent reactions, photolysis, and the Calvin cycle stroma synthesis of organic glucose and oxygen gas.',
    fileUrl: '/simulations/photosynthesis-chloroplast-engine.html',
    topics: ['Light-Dependent Reactions & Photolysis', 'Thylakoid Membrane Energy Transport', 'Calvin Cycle Dark Reactions & Carbon Fixation', 'Environmental Limiting Factors'],
    features: ['Solar Photon Radiation Slider', 'H₂O & CO₂ Environmental Gas Regulators', 'Animated Thylakoid Grana & Calvin Stroma', 'Live O₂ Bubble & Glucose Output Metrics'],
    gradeLevel: 'Middle & Secondary School Biology'
  },
  {
    id: 'sim-moon-phases-tides-orbit',
    slug: 'moon-phases-tides-orbit',
    indexNumber: '37',
    title: 'Moon Phases, Tides & Lunar Orbit Simulator',
    subject: 'Astronomy & Planetary Science',
    category: 'Earth & Space',
    iconName: 'Moon',
    accentColor: '#0284c7', // Deep Sky Blue
    description: 'Explore the 29.5-day synodic lunar cycle and gravitational ocean tides. Observe the Moon’s 3D orbit around Earth from both space and an Earth-based telescope portal, correlating orbital positions with Spring and Neap tidal bulges.',
    fileUrl: '/simulations/moon-phases-tides-orbit.html',
    topics: ['8 Synodic Lunar Phases', 'Waxing & Waning Cycles', 'Gravitational Ocean Tidal Bulges', 'Spring vs Neap Tides Alignment'],
    features: ['Dual Spatial & Telescope Viewports', 'Interactive Phase Jumper (New, Quarter, Full)', 'Live Ocean Tidal Bulge Deformation', 'Day-by-Day Orbital Tracking Engine'],
    gradeLevel: 'Elementary, Middle & Secondary Astronomy'
  },
  {
    id: 'sim-pythagorean-theorem-geometry',
    slug: 'pythagorean-theorem-geometry',
    indexNumber: '38',
    title: 'Pythagorean Theorem & Geometric Distance Engine',
    subject: 'Euclidean Geometry & Algebra',
    category: 'Mathematics & Logic',
    iconName: 'Compass',
    accentColor: '#ea580c', // Vibrant Orange
    description: 'Visual mathematical proof of the Pythagorean Theorem (a² + b² = c²). Dynamically scale triangle leg lengths, test classic Pythagorean integer triples (3-4-5, 5-12-13, 8-15-17), and observe the physical area conservation of square surfaces.',
    fileUrl: '/simulations/pythagorean-theorem-geometry.html',
    topics: ['Right-Angled Triangle Geometry', 'Pythagorean Theorem & Distance Formula', 'Area Geometric Proofs (a², b², c²)', 'Integer Triples & Non-Euclidean Approximations'],
    features: ['Dynamic Leg Length Drag & Sliders', 'Instant Pythagorean Triple Presets', 'Rotated Hypotenuse Square Surface Visualizer', 'Step-by-Step Algebraic Proof Card'],
    gradeLevel: 'Middle & High School Mathematics'
  },
  {
    id: 'sim-sorting-algorithms-visualizer',
    slug: 'sorting-algorithms-visualizer',
    indexNumber: '39',
    title: 'Sorting Algorithms & Computational Complexity Workbench',
    subject: 'Algorithms & Data Structures',
    category: 'Computer Science & IT',
    iconName: 'Cpu',
    accentColor: '#0d9488', // Teal
    description: 'Interactive computer science algorithms lab. Visualize and compare Bubble Sort, Quick Sort, and Insertion Sort in real time with step-by-step execution, dynamic pivot pointers, comparison counters, and computational complexity metrics.',
    fileUrl: '/simulations/sorting-algorithms-visualizer.html',
    topics: ['Sorting Algorithms Mechanics', 'Time Complexity (O(N²) vs O(N log N))', 'Pivot Selection & Partitioning', 'Array In-Place Swapping & Comparisons'],
    features: ['Real-Time Step-by-Step Generator Engine', 'Bubble, Quick & Insertion Sort Algorithms', 'Dynamic Array Size & Speed Controls', 'Live Operations & Comparison Counter'],
    gradeLevel: 'Middle, High School & Introductory CS'
  },
  {
    id: 'sim-english-syntax-tree-grammar',
    slug: 'english-syntax-tree-grammar',
    indexNumber: '40',
    title: 'English Sentence Structure & Syntax Tree Builder',
    subject: 'English Grammar & Linguistics',
    category: 'English & Grammar',
    iconName: 'BookOpen',
    accentColor: '#4f46e5', // Royal Indigo
    description: 'Interactive linguistics and grammar laboratory. Dissect English sentences into hierarchical constituent syntax trees (Sentence ➔ Noun Phrase + Verb Phrase), label parts of speech, and transform tenses across Present, Past, and Future simple forms.',
    fileUrl: '/simulations/english-syntax-tree-grammar.html',
    topics: ['Sentence Constituent Analysis', 'Phrase Structure Rules (NP, VP, PP)', 'Parts of Speech Labeling (Nouns, Verbs, Adjectives)', 'Tense & Voice Grammatical Transformations'],
    features: ['Interactive Hierarchical Tree Diagram Engine', 'Live Tense Shifter (Present, Past, Future)', 'Color-Coded Parts of Speech Tags', 'Multiple Syntactic Sentence Complexity Models'],
    gradeLevel: 'Elementary, Middle & Secondary English Arts'
  },
  {
    id: 'sim-color-mixing-shapes-playground',
    slug: 'color-mixing-shapes-playground',
    indexNumber: '41',
    title: 'Vibrant Color Mixing & Geometric Sorting Playground',
    subject: 'Sensory Arts & Early Cognitive Development',
    category: 'Early Childhood (ECCE)',
    iconName: 'Sparkles',
    accentColor: '#e11d48', // Bright Coral Red
    description: '100% colorful, joyful, and multi-sensory preschool playground. Children blend primary colors (Red, Yellow, Blue) to discover secondary hues (Orange, Green, Purple) while sorting cheerful smiling geometric shapes with playful confetti celebrations.',
    fileUrl: '/simulations/color-mixing-shapes-playground.html',
    topics: ['Primary & Secondary Color Blending', 'Geometric 2D Shapes (Stars, Circles, Squares, Triangles)', 'Sensory Cognitive Recognition', 'Positive Reinforcement & Fine Motor Coordination'],
    features: ['100% Vibrant Color Palette (No Monochrome)', 'Interactive Happy-Face Smiling Shapes', 'Magic Color Mixing Splashes', 'Celebratory Confetti & Star Rewards Engine'],
    gradeLevel: 'Pre-K, Nursery & Kindergarten (Ages 3–6)'
  },
  {
    id: 'sim-pendulum-harmonic-motion',
    slug: 'pendulum-harmonic-motion',
    indexNumber: '42',
    title: 'Simple Harmonic Motion & Pendulum Conservation',
    subject: 'Classical Mechanics & Oscillations',
    category: 'Physics & Motion',
    iconName: 'Gauge',
    accentColor: '#0284c7', // Electric Cyan / Blue
    description: 'Explore simple harmonic motion, period periodicity (T = 2π√(L/g)), and mechanical energy conservation (Kinetic Ek vs Potential Ep). Drag and release the glowing pendulum bob across Earth, Moon, Mars, and Jupiter gravity fields.',
    fileUrl: '/simulations/pendulum-harmonic-motion.html',
    topics: ['Simple Harmonic Oscillations', 'Kinetic vs Gravitational Potential Energy', 'Planetary Gravity Variations', 'Force Vector Decomposition (Tension & mg)'],
    features: ['Interactive Drag & Release Pendulum Bob', 'Live Mechanical Energy Conservation Bar Chart', 'Planetary Gravity Presets (Earth, Moon, Mars, Jupiter)', 'Real-Time Dynamic Force & Velocity Vectors'],
    gradeLevel: 'Middle & High School Physics'
  },
  {
    id: 'sim-ideal-gas-laws',
    slug: 'ideal-gas-laws',
    indexNumber: '43',
    title: 'Ideal Gas Laws & Kinetic Molecular Theory Engine',
    subject: 'Physical & Thermal Chemistry',
    category: 'Chemistry & Matter',
    iconName: 'FlaskConical',
    accentColor: '#9333ea', // Royal Purple
    description: 'Kinetic molecular simulation of gas particles in an adjustable cylinder. Test Boyle’s Law (P ∝ 1/V), Charles’s Law (V ∝ T), and Gay-Lussac’s Law with live manometer pressure gauges, burner heating, ice cooling, and particle pumps.',
    fileUrl: '/simulations/ideal-gas-laws.html',
    topics: ['Ideal Gas Law (PV = nRT)', 'Kinetic Molecular Theory & v_rms', 'Boyle, Charles & Gay-Lussac Laws', 'Molecular Collision Pressure Dynamics'],
    features: ['Interactive Adjustable Volume Piston Cylinder', 'Flame Burner & Ice Cooling Temperature Regulator', 'Live Manometer Gauge (atm & v_rms m/s)', 'Molecular Particle Pump & Vent Valves'],
    gradeLevel: 'Secondary & High School Chemistry'
  },
  {
    id: 'sim-volcano-magma-dynamics',
    slug: 'volcano-magma-dynamics',
    indexNumber: '45',
    title: 'Volcano Anatomy, Magma Chambers & Eruption Dynamics',
    subject: 'Geology & Volcanology',
    category: 'Earth & Space',
    iconName: 'Flame',
    accentColor: '#ea580c', // Fiery Orange
    description: 'Interactive geological cross-section of an active stratovolcano. Regulate sub-crustal magma overpressure, magma viscosity (Basaltic vs Rhyolitic), and dissolved volatiles (H₂O/CO₂) to trigger catastrophic Plinian eruptions and monitor seismographs.',
    fileUrl: '/simulations/volcano-magma-dynamics.html',
    topics: ['Stratovolcano Geological Cross-Section', 'Magma Chamber Overpressure & Volatiles', 'Magma Viscosity & Eruption Styles', 'Seismic Harmonic Tremor Monitoring'],
    features: ['Dynamic Sub-Crustal Magma Chamber Accumulator', 'Live Harmonic Tremor Seismograph Monitor', 'Interactive Catastrophic Eruption Trigger', 'Parabolic Volcanic Bombs & Stratospheric Plumes'],
    gradeLevel: 'Middle & Secondary Earth Science'
  },
  {
    id: 'sim-unit-circle-trigonometry',
    slug: 'unit-circle-trigonometry',
    indexNumber: '46',
    title: 'Interactive Unit Circle & Trigonometric Functions',
    subject: 'Trigonometry & Analytic Geometry',
    category: 'Mathematics & Logic',
    iconName: 'Orbit',
    accentColor: '#0284c7', // Sky Blue
    description: 'Interactive unit circle (R = 1) coordinate engine. Rotate the angle arm θ to visualize sine (vertical projection), cosine (horizontal base), and tangent in real time, accompanied by a synchronous harmonic sine wave generator and exact values.',
    fileUrl: '/simulations/unit-circle-trigonometry.html',
    topics: ['Unit Circle Coordinate Plane (x=cos θ, y=sin θ)', 'Pythagorean Identity (sin²θ + cos²θ = 1)', 'Degree & Radian Equivalence (0 to 2π)', 'Harmonic Continuous Wave Generation'],
    features: ['Interactive Rotating Angle Arm & Slider', 'Synchronized Live Sine Wave Curve Plotter', 'Degree & Radian Quick Jumper Presets', 'Color-Coded Geometric Projections (Sin, Cos, Tan)'],
    gradeLevel: 'High School Geometry & Trigonometry'
  },
  {
    id: 'sim-logic-gates-circuit-designer',
    slug: 'logic-gates-circuit-designer',
    indexNumber: '47',
    title: 'Digital Logic Gates & Boolean Circuit Designer',
    subject: 'Digital Electronics & Computer Architecture',
    category: 'Computer Science & IT',
    iconName: 'Cpu',
    accentColor: '#0d9488', // Emerald Teal
    description: 'Interactive digital electronics workbench. Build and evaluate ANSI logic gates (AND, OR, NOT, NAND, NOR, XOR, XNOR) and Half Adders. Toggle 5V High/Low input switches with real-time glowing wires, dynamic truth tables, and output LED lamps.',
    fileUrl: '/simulations/logic-gates-circuit-designer.html',
    topics: ['Boolean Logic & Gate Schematics', 'Binary Digital Voltage States (1 / 0)', 'Dynamic Truth Table Evaluation', 'Arithmetic Half Adder Circuits'],
    features: ['Interactive Toggleable Input Switches (A & B)', 'All 7 Standard Logic Gates + Half Adder', 'Real-Time Glowing High/Low Voltage Wires', 'Active Truth Table Row Highlighting & LED Lamp'],
    gradeLevel: 'Middle, High School & Introductory IT'
  },
  {
    id: 'sim-parts-of-speech-grammar-quest',
    slug: 'parts-of-speech-grammar-quest',
    indexNumber: '48',
    title: 'Parts of Speech Explorer & Grammar Quest Engine',
    subject: 'Grammar, Syntax & Lexicology',
    category: 'English & Grammar',
    iconName: 'BookOpen',
    accentColor: '#4f46e5', // Indigo
    description: 'Interactive English grammar dissector. Click words across diverse sentence structures to identify Nouns, Verbs, Adjectives, Adverbs, Pronouns, Prepositions, and Conjunctions with instant linguistic definitions, color-coded tags, and grammar rules.',
    fileUrl: '/simulations/parts-of-speech-grammar-quest.html',
    topics: ['8 Standard Parts of Speech', 'Sentence Syntactic Constituent Roles', 'Modifiers, Determiners & Prepositional Phrases', 'Word Classes & Morphological Definitions'],
    features: ['Interactive Click-to-Inspect Word Cards', 'Color-Coded Linguistic Badges & Legend', 'Multi-Genre Curated Sentence Library', 'Comprehensive Lexicology Definition Card'],
    gradeLevel: 'Elementary, Middle & Secondary English'
  },
  {
    id: 'sim-animal-safari-habitats',
    slug: 'animal-safari-habitats',
    indexNumber: '49',
    title: 'Animal Kingdom & Safari Discovery Academy',
    subject: 'Early Cognitive Science & Nature Exploration',
    category: 'Early Childhood (ECCE)',
    iconName: 'Sparkles',
    accentColor: '#ea580c', // Bright Safari Orange
    description: 'Joyful 100% colorful multi-sensory preschool safari across 4 rich habitats: African Savannah, Tropical Jungle, Deep Blue Ocean, and Snowy Arctic. Tap smiling animals for cheerful greetings, fun facts, balloon confetti, and friendly audio chimes.',
    fileUrl: '/simulations/animal-safari-habitats.html',
    topics: ['4 Global Wildlife Habitats (Savannah, Jungle, Ocean, Arctic)', 'Animal Names, Sounds & Recognitions', 'Diet & Behavioral Adaptations', 'Multi-Sensory Fine Motor Coordination'],
    features: ['Interactive Bouncy Cartoon Animals with Sounds', '4 High-Contrast Vibrant Biome Landscapes', 'Pop-able Celebratory Balloon Confetti', 'Web-Audio Synthesized Friendly Musical Chimes'],
    gradeLevel: 'Pre-K, Nursery & Kindergarten (Ages 3–6)'
  },
  {
    id: 'sim-ecce-curriculum-learning-areas',
    slug: 'ecce-curriculum-learning-areas',
    indexNumber: '50',
    title: 'ECCE Seven Learning Areas: Teacher Conceptual Framework & Curriculum Standards (NCP 2022–23)',
    subject: 'ECCE Teacher Pedagogical Concept & Learning Areas Framework',
    category: 'Early Childhood (ECCE)',
    iconName: 'BookOpen',
    accentColor: '#1677ff', // Vibrant Royal Blue
    description: 'Comprehensive pedagogical concept and curriculum standard framework for Early Childhood Care and Education (NCP 2022–23). Covers all Seven Learning Areas (PSED, Language & Literacy, Physical Development, Health & Safety, Basic Mathematics, Creative Arts, World Around Us) with full pictorial standard explanations, classroom practice steps, and teacher-parent tips.',
    fileUrl: '/simulations/ecce-curriculum-learning-areas.html',
    topics: ['7 ECCE Learning Areas (PSED, LL, PD, HHS, BMS, CA, WAU)', 'All Learning Standards with Pictorial Explanations', 'How to Practise Classroom Steps for Teachers', 'Teacher & Parent Guidance Tips for Early Development'],
    features: ['Pedagogical Concept & Curriculum Framework Guide', 'Interactive 7 Domain Explorers with Real SVG Graphics', 'Standard-by-Standard Interactive Modal Explanations', 'Designed for Teachers, Educators & Early Learners'],
    gradeLevel: 'ECCE, Nursery, Kindergarten & Teacher Professional Training'
  },
  {
    id: 'sim-wave-optics-double-slit',
    slug: 'wave-optics-double-slit-interference',
    indexNumber: '51',
    title: 'Wave Optics & Double-Slit Interference Lab',
    subject: 'Optics & Quantum Wave Physics',
    category: 'Physics & Motion',
    iconName: 'Sun',
    accentColor: '#06b6d4', // Cyan
    description: "Interactive Young's double-slit experiment and wave optics laboratory. Investigate laser wavelengths (Red 650nm, Green 532nm, Blue 450nm, Violet 405nm), continuous wave fronts, quantum photon accumulation, slit separation, and real-time fringe spacing formula (Δy = λD/d).",
    fileUrl: '/simulations/wave-optics-double-slit-interference.html',
    topics: ["Young's Double-Slit Experiment", 'Constructive & Destructive Interference', 'Fringe Spacing (Δy = λD/d)', 'Quantum Photon Probability Distribution'],
    features: ['Multi-Wavelength Laser Emitters', 'Continuous Wave vs Quantum Photons', 'Adjustable Slit Separation & Screen Distance', 'Live Fringe Width Mathematical Telemetry'],
    gradeLevel: 'Secondary & High School Physics'
  },
  {
    id: 'sim-active-passive-voice-tense-timeline',
    slug: 'active-passive-voice-tense-timeline',
    indexNumber: '52',
    title: 'Active vs. Passive Voice & Verb Tenses Timeline Studio',
    subject: 'English Grammar, Voice & Tense Syntax',
    category: 'English & Grammar',
    iconName: 'BookOpen',
    accentColor: '#6366f1', // Indigo
    description: 'Interactive linguistics and English grammar laboratory. Transform sentences between Active and Passive voice with dynamic subject-object swaps, auxiliary verb "be" agreements, past participle shifts, and explore transformations across a 12-tense timeline matrix.',
    fileUrl: '/simulations/active-passive-voice-tense-timeline.html',
    topics: ['Active Voice (Subject Performs Action)', 'Passive Voice (Object Receives Action)', 'Auxiliary Verb "be" + Past Participle V3', '12 English Verb Tense Timeline Matrices'],
    features: ['Interactive Voice Shifter with Animated Swaps', '12-Tense Timeline Matrix Selector', 'Color-Coded Subject/Verb/Object Grammatical Tags', 'Curated Syntactic Sentence Examples & Explanations'],
    gradeLevel: 'Elementary, Middle & Secondary English'
  },
  {
    id: 'sim-english-grammar',
    slug: 'english-grammar',
    indexNumber: '54',
    title: 'English Grammar',
    subject: 'English Grammar (Parts of Speech & Syntax)',
    category: 'English & Grammar',
    iconName: 'BookOpen',
    accentColor: '#00c6ff', // Vibrant Electric Cyan & Royal Gradient
    description: 'Interactive English Grammar 3D studio. Learn the 8 parts of speech with animated 3D cubes, interactive dynamic cards with 3D tilt effects, real-world examples, and key points.',
    fileUrl: '/simulations/English_Grammar.html',
    topics: ['Parts of Speech', '8 Core Word Classes', 'Interactive 3D Cards', 'Grammar Rules & Examples'],
    features: ['100% Offline Standalone Chrome-Ready Lab', '3D Perspective Orbiting Polyhedra Animation', 'Interactive Card Hover 3D Tilt Mechanics', 'Comprehensive Grammar Classification & Rules'],
    gradeLevel: 'Elementary, Middle & Secondary English'
  },
  {
    id: 'sim-ecce-learning-world',
    slug: 'ecce-learning-world',
    indexNumber: '56',
    title: 'ECCE Learning World',
    subject: 'Early Childhood Care & Education (Alphabet, Numbers, Urdu & Calendar)',
    category: 'Early Childhood (ECCE)',
    iconName: 'Sparkles',
    accentColor: '#ff4d6d',
    description: 'Interactive ECCE learning academy for early childhood education. Features English Capital & Small Letters with phonics, Days of the Week, Months of the Year, Numbers 1 to 20 with tap-to-count items, Urdu Alphabet (اردو حروف تہجی), interactive drawing pad, and audio voice quiz game.',
    fileUrl: '/simulations/ecce-learning-world.html',
    topics: ['English Alphabet (Capital & Small Letters)', 'Urdu Alphabet (اردو حروف تہجی)', 'Numbers 1 to 20 & Item Counting', 'Days of the Week & Calendar Months', 'Interactive Tracing & Writing Pad', 'Voice Speech & Interactive Quiz Game'],
    features: ['100% Offline Standalone Chrome-Ready Lab', 'Full English & Urdu Voice Pronunciation', 'Touch-Friendly Tracing & Drawing Canvas', 'Interactive 10-Question Audio Quiz with Star Rewards', 'Clean & Responsive 1280x720 Scaled Viewport'],
    gradeLevel: 'Pre-K, Nursery & Kindergarten (Ages 3–6)'
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
  'English & Grammar',
  'Early Childhood (ECCE)'
] as const;


