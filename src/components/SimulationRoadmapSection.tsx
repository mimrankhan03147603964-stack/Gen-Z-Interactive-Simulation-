import React, { useState, useMemo } from 'react';
import { Search, ChevronDown, ChevronUp, Layers } from 'lucide-react';

interface SubjectSection {
  name: string;
  topics: string[];
}

interface LevelData {
  id: string;
  shortLabel: string;
  title: string;
  subjects: SubjectSection[];
}

// Curated concise, high-yield key topics for each grade and subject
// Designed to keep page lightweight, fast-loading, and completely free of crowding/clutter.
const ROADMAP_DATA: LevelData[] = [
  {
    id: 'level-1',
    shortLabel: 'Play / KG',
    title: 'LEVEL 1: EARLY CHILDHOOD & PRE-PRIMARY (Play Group, Nursery, Prep / KG)',
    subjects: [
      {
        name: 'Early Mathematics & Numeracy',
        topics: [
          'Counting 1 to 10 with Real Animated Objects',
          '2D Shapes & Primary Colors Sorter',
          'Big vs Small, Long vs Short Comparisons',
          'Missing Numbers on a Visual Number Line',
          'Simple Picture Addition & Subtraction (1 to 10)'
        ]
      },
      {
        name: 'English Language & Phonics',
        topics: [
          'A to Z Letter Recognition & Phonics Sounds',
          'CVC 3-Letter Word Blending (cat, dog, sun)',
          'Early Sight Words & Picture Vocabulary'
        ]
      },
      {
        name: 'Urdu Language (اردو)',
        topics: [
          'اردو حروفِ تہجی و بنیادی اشکال کی پہچان',
          'اردو سادہ الفاظ اور جوڑ توڑ'
        ]
      },
      {
        name: 'Nature, Senses & Good Habits',
        topics: [
          'Human Body Parts & Five Senses',
          'Living vs Non-Living Things',
          'Day, Night & Four Seasons Explorer',
          'Good Manners, Cleanliness & Healthy Habits'
        ]
      }
    ]
  },
  {
    id: 'level-2',
    shortLabel: 'Primary (1-5)',
    title: 'LEVEL 2: PRIMARY SCHOOL (Classes 1 to 5)',
    subjects: [
      {
        name: 'Mathematics',
        topics: [
          'Place Value, Addition & Subtraction (up to 4 Digits)',
          'Multiplication Tables & Long Division',
          'Visual Fractions: Halves, Thirds & Quarters',
          'Geometry: Angles, Perimeter & Area of 2D Shapes',
          'Measurement: Length, Mass, Volume & Time',
          'Pictographs & Bar Graphs'
        ]
      },
      {
        name: 'General Science',
        topics: [
          'Plant Life Cycle & Photosynthesis Basics',
          'Animal Habitats, Food Chains & Adaptations',
          'Three States of Matter: Solid, Liquid & Gas',
          'The Water Cycle & Weather Systems',
          'Simple Electric Circuit, Switch & Bulb',
          'The Solar System & Orbit of Planets'
        ]
      },
      {
        name: 'Social Studies & Digital Literacy',
        topics: [
          'Maps, Compasses, Continents & Oceans',
          'Provinces, Geography & Culture of Pakistan',
          'Computer Hardware Basics & Safe Internet Habits',
          'Visual Block Coding & Logic Puzzles'
        ]
      },
      {
        name: 'Urdu Language (اردو)',
        topics: [
          'اردو قواعد: اسم، فعل، صفت اور متضاد الفاظ',
          'جملہ سازی، واحد جمع، اور املا کی مشق'
        ]
      }
    ]
  },
  {
    id: 'level-3',
    shortLabel: 'Middle (6-8)',
    title: 'LEVEL 3: MIDDLE SCHOOL (Classes 6 to 8)',
    subjects: [
      {
        name: 'Mathematics',
        topics: [
          'Integers, Rational Numbers & Number Line',
          'Linear Equations & Algebraic Expressions',
          'Ratio, Proportion & Financial Arithmetic',
          'Pythagorean Theorem & Triangle Angles',
          'Surface Area & Volume of Cylinders and Prisms',
          'Probability, Mean, Median & Mode'
        ]
      },
      {
        name: 'General Science',
        topics: [
          'Microscopic Cell Structure: Plant vs Animal Cells',
          'Human Digestive, Circulatory & Respiratory Systems',
          'Atoms, Elements, Compounds & Mixtures',
          'Acids, Bases, Salts & Universal Indicator',
          'Forces, Friction, Gravity & Work',
          'Light: Reflection, Refraction & Convex/Concave Lenses',
          'Sound Waves: Pitch, Frequency & Resonance'
        ]
      },
      {
        name: 'Computer Science & Geography',
        topics: [
          'Algorithms, Flowcharts & Python / Scratch Basics',
          'Earth’s Internal Structure, Plate Tectonics & Faults',
          'Climate Change, Atmosphere & Conservation'
        ]
      },
      {
        name: 'Urdu Language & Literature (اردو)',
        topics: [
          'اردو قواعد و انشاء: خطوط نویسی، درخواست اور مکالمہ نگاری',
          'اصنافِ سخن، نظم و غزل کی بنیادی تفہیم'
        ]
      }
    ]
  },
  {
    id: 'level-4',
    shortLabel: 'Matric (9-10)',
    title: 'LEVEL 4: SECONDARY / MATRICULATION (Classes 9 & 10)',
    subjects: [
      {
        name: 'Physics (Classes 9 & 10)',
        topics: [
          'Kinematics: Equations of Motion & Velocity-Time Graphs',
          'Newton’s Laws of Motion, Momentum & Friction',
          'Work, Energy, Kinetic/Potential Energy & Efficiency',
          'Thermal Properties of Matter, Latent Heat & Phase Changes',
          'Geometrical Optics: Snell’s Law, Reflection & Ray Diagrams',
          'Current Electricity: Ohm’s Law, Series & Parallel Circuits',
          'Electromagnetism, Magnetic Fields & Motor Effect'
        ]
      },
      {
        name: 'Chemistry (Classes 9 & 10)',
        topics: [
          'Atomic Structure: Rutherford & Bohr Atomic Models',
          'Periodic Table Trends: Electronegativity & Ionization Energy',
          'Chemical Bonding: Ionic, Covalent & Metallic Bonds',
          'Chemical Equilibrium & Le Chatelier’s Principle',
          'Acids, Bases, pH Scale & Neutralization Titration',
          'Electrochemistry: Galvanic & Electrolytic Cells',
          'Hydrocarbons: Alkanes, Alkenes & Functional Groups'
        ]
      },
      {
        name: 'Biology (Classes 9 & 10)',
        topics: [
          'Cell Division: Mitosis vs Meiosis Stages',
          'Enzyme Action & Active Site Kinetics',
          'Photosynthesis Light/Dark Reactions & ATP Respiration',
          'Human Heart Structure, Blood Pressure & Circulation',
          'Human Nervous System, Reflex Arc & Sense Organs',
          'Genetics: Mendel’s Laws of Inheritance & DNA Structure'
        ]
      },
      {
        name: 'Mathematics & Computer Science (9 & 10)',
        topics: [
          'Matrices, Determinants & Cramer’s Rule',
          'Quadratic Equations & Quadratic Formula',
          'Trigonometric Ratios & Practical Heights/Distances',
          'Coordinate Geometry: Distance & Midpoint Formulae',
          'Programming Fundamentals: Variables, Loops & Functions',
          'Logic Gates: AND, OR, NOT, NAND, NOR Truth Tables'
        ]
      },
      {
        name: 'Urdu Compulsory (اردو لازمی)',
        topics: [
          'اردو گرامر، محاورات اور ضرب الامثال کا درست استعمال',
          'اشعار کی تشریح، خلاصہ نگاری اور مضامین'
        ]
      }
    ]
  },
  {
    id: 'level-5',
    shortLabel: 'FSc (11-12)',
    title: 'LEVEL 5: INTERMEDIATE / FSc / ICS / I.Com (Classes 11 & 12)',
    subjects: [
      {
        name: 'FSc Physics (Classes 11 & 12)',
        topics: [
          'Vectors, Equilibrium & Torque in Rigid Bodies',
          'Projectile Motion & 2D Trajectory with Air Resistance',
          'Simple Harmonic Motion, Simple Pendulum & Damped Oscillations',
          'Wave Optics: Young’s Double Slit & Diffraction Grating',
          'Thermodynamics: First Law, Heat Engines & Carnot Cycle',
          'Coulomb’s Law, Electric Fields & Parallel Plate Capacitors',
          'Electromagnetic Induction, Faraday’s Law & AC Generator',
          'Modern Physics: Photoelectric Effect & Nuclear Fission/Fusion'
        ]
      },
      {
        name: 'FSc Chemistry (Classes 11 & 12)',
        topics: [
          'Gas Laws: Boyle’s, Charles’s & Ideal Gas Law (PV=nRT)',
          'Chemical Kinetics: Rate Laws & Activation Energy',
          'Chemical Equilibrium: Kc, Kp & Haber Process',
          'Electrochemistry: Nernst Equation & Standard Electrode Potentials',
          'Reaction Mechanisms: SN1, SN2, E1 & E2 Pathways',
          'Benzene, Aromatic Substitution & Organic Synthesis'
        ]
      },
      {
        name: 'FSc Biology (Pre-Medical)',
        topics: [
          'Biological Macromolecules: Proteins, Lipids & Carbohydrates',
          'Cellular Respiration: Glycolysis, Krebs Cycle & Electron Transport',
          'DNA Replication, Transcription & Protein Translation',
          'Nerve Impulse Conduction & Synaptic Neurotransmission',
          'Immune Response: Antigens, B-Cells, T-Cells & Antibodies',
          'Biotechnology: Recombinant DNA & Genetic Engineering'
        ]
      },
      {
        name: 'FSc Mathematics & ICS Computer Science',
        topics: [
          'Functions, Limits & Continuity Analysis',
          'Derivatives & Differentiation Rules with Tangent Slopes',
          'Definite & Indefinite Integration (Area Under Curves)',
          'Conic Sections: Parabola, Ellipse & Hyperbola',
          'Data Structures: Arrays, Linked Lists, Stacks & Queues',
          'Object-Oriented Programming (OOP) & SQL Database Queries'
        ]
      },
      {
        name: 'I.Com Commerce & Economics',
        topics: [
          'Accounting Cycle: Journal Entries, General Ledger & Trial Balance',
          'Financial Statements: Profit & Loss Account & Balance Sheet',
          'Market Economics: Supply, Demand Curves & Equilibrium Price',
          'Banking Systems, Monetary Policy & Trade Balances'
        ]
      }
    ]
  },
  {
    id: 'level-tech',
    shortLabel: 'Emerging Tech',
    title: 'APPLIED & EMERGING STEM SIMULATIONS',
    subjects: [
      {
        name: 'Modern Technology & Applied Science',
        topics: [
          'Artificial Intelligence & Neural Network Perceptrons',
          'Robotics: Kinematics, Actuators & Sensor Feedback Loops',
          'Renewable Green Energy: Photovoltaic Solar Cells & Wind Turbines',
          'Astronomy: Gravitational Orbits, Kepler’s Laws & Satellite Trajectories'
        ]
      }
    ]
  }
];

export const SimulationRoadmapSection: React.FC = () => {
  const [selectedLevelId, setSelectedLevelId] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  // By default, keep accordion open or toggleable
  const [collapsedBlocks, setCollapsedBlocks] = useState<Record<string, boolean>>({});

  const toggleBlock = (id: string) => {
    setCollapsedBlocks((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const matchesSearch = (text: string) => {
    if (!searchQuery.trim()) return true;
    return text.toLowerCase().includes(searchQuery.toLowerCase());
  };

  // Filtered levels based on level-tab selection and search
  const visibleLevels = useMemo(() => {
    return ROADMAP_DATA.filter((level) => {
      if (selectedLevelId !== 'all' && level.id !== selectedLevelId) {
        return false;
      }
      return true;
    }).map((level) => {
      const filteredSubjects = level.subjects.map((subj) => ({
        ...subj,
        topics: subj.topics.filter(
          (t) => matchesSearch(t) || matchesSearch(subj.name) || matchesSearch(level.title)
        )
      })).filter((subj) => subj.topics.length > 0);

      return {
        ...level,
        filteredSubjects
      };
    }).filter((lvl) => lvl.filteredSubjects.length > 0);
  }, [selectedLevelId, searchQuery]);

  return (
    <section className="w-full bg-white text-black py-8 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Header & Controls */}
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-300 pb-3">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-black tracking-tight">
                Interactive Simulation Roadmap (Play Class to FSc)
              </h2>
              <p className="text-xs sm:text-sm text-black mt-1">
                Curated high-yield topics across the Pakistani curriculum — Play Group to FSc (Pre-Primary, Primary, Middle, Secondary & Intermediate).
              </p>
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-64 shrink-0">
              <Search className="w-4 h-4 absolute left-2.5 top-2.5 text-black" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search key topic..."
                className="w-full pl-8 pr-3 py-1.5 text-xs rounded border border-slate-400 bg-white text-black placeholder-slate-600 focus:outline-none focus:border-black"
              />
            </div>
          </div>

          {/* Quick Level Filter Tabs: Prevents clutter, allows user to quickly jump without page lag */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            <span className="text-xs font-bold text-black mr-1 flex items-center gap-1">
              <Layers className="w-3.5 h-3.5" />
              Filter by Level:
            </span>
            <button
              type="button"
              onClick={() => setSelectedLevelId('all')}
              className={`px-2.5 py-1 text-xs font-bold rounded cursor-pointer transition-colors ${
                selectedLevelId === 'all'
                  ? 'bg-black text-white'
                  : 'bg-slate-100 text-black hover:bg-slate-200 border border-slate-300'
              }`}
            >
              All Grades
            </button>
            {ROADMAP_DATA.map((lvl) => (
              <button
                key={`tab-${lvl.id}`}
                type="button"
                onClick={() => setSelectedLevelId(lvl.id)}
                className={`px-2.5 py-1 text-xs font-bold rounded cursor-pointer transition-colors ${
                  selectedLevelId === lvl.id
                    ? 'bg-black text-white'
                    : 'bg-slate-100 text-black hover:bg-slate-200 border border-slate-300'
                }`}
              >
                {lvl.shortLabel}
              </button>
            ))}
          </div>
        </div>

        {/* Lightweight Curated Topic Sections (Plain Black Ink on Pure White Background) */}
        <div className="space-y-6 pt-2">
          {visibleLevels.length === 0 ? (
            <p className="text-sm text-black py-4">No topics found matching your search. Please try another query.</p>
          ) : (
            visibleLevels.map((level) => {
              const isCollapsed = !!collapsedBlocks[level.id];

              return (
                <div key={level.id} className="border-b border-slate-200 pb-5 last:border-b-0">
                  {/* Level Title Bar */}
                  <div
                    className="flex items-center justify-between gap-2 cursor-pointer select-none py-1"
                    onClick={() => toggleBlock(level.id)}
                  >
                    <h3 className="text-sm sm:text-base font-black text-black uppercase tracking-wide">
                      {level.title}
                    </h3>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleBlock(level.id);
                      }}
                      className="p-1 text-black hover:bg-slate-100 rounded"
                      aria-label="Toggle section"
                    >
                      {isCollapsed ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
                    </button>
                  </div>

                  {/* Curated Key Topics List (Extremely light DOM, quick render) */}
                  {!isCollapsed && (
                    <div className="mt-3 space-y-4">
                      {level.filteredSubjects.map((subj, idx) => (
                        <div key={`${level.id}-subj-${idx}`} className="space-y-1.5">
                          <h4 className="text-xs font-bold text-black uppercase tracking-wider border-b border-slate-200 pb-1">
                            {subj.name}
                          </h4>
                          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-1.5 pl-0 list-none text-xs sm:text-sm text-black">
                            {subj.topics.map((topic, tIdx) => (
                              <li key={`${level.id}-${idx}-${tIdx}`} className="flex items-baseline gap-2 py-0.5">
                                <span className="font-bold text-black shrink-0">•</span>
                                <span className="text-black font-medium leading-snug">{topic}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

      </div>
    </section>
  );
};
