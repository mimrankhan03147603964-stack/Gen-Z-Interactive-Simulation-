import React, { useState, useMemo } from 'react';
import { Search, ChevronDown, ChevronUp, Layers, BookOpen, GraduationCap, Sparkles } from 'lucide-react';

interface SubjectSection {
  name: string;
  topics: string[];
}

interface LevelData {
  id: string;
  shortLabel: string;
  badge: string;
  title: string;
  subjects: SubjectSection[];
}

// Curated concise, high-yield key topics for each grade and subject
// Exact topics preserved intact without adding or removing any content.
const ROADMAP_DATA: LevelData[] = [
  {
    id: 'level-1',
    shortLabel: 'Play / KG',
    badge: 'PRE-PRIMARY',
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
    badge: 'GRADES 1–5',
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
    badge: 'GRADES 6–8',
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
    badge: 'GRADES 9–10',
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
    badge: 'F.SC (11–12)',
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
    badge: 'FUTURE STEM',
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

// Helper to provide discipline-aligned subtle colors matching the main portal
const getSubjectColor = (subjectName: string): { border: string; bullet: string; tag: string } => {
  const s = subjectName.toLowerCase();
  if (s.includes('physics')) {
    return { border: '#2563EB', bullet: '#2563EB', tag: 'bg-blue-50 text-blue-700 border-blue-200' };
  }
  if (s.includes('chemistry')) {
    return { border: '#9333EA', bullet: '#9333EA', tag: 'bg-purple-50 text-purple-700 border-purple-200' };
  }
  if (s.includes('biology')) {
    return { border: '#16A34A', bullet: '#16A34A', tag: 'bg-emerald-50 text-emerald-700 border-emerald-200' };
  }
  if (s.includes('mathematics') || s.includes('numeracy')) {
    return { border: '#EA580C', bullet: '#EA580C', tag: 'bg-amber-50 text-amber-700 border-amber-200' };
  }
  if (s.includes('computer') || s.includes('coding') || s.includes('technology')) {
    return { border: '#0D9488', bullet: '#0D9488', tag: 'bg-teal-50 text-teal-700 border-teal-200' };
  }
  if (s.includes('urdu')) {
    return { border: '#059669', bullet: '#059669', tag: 'bg-green-50 text-green-700 border-green-200' };
  }
  if (s.includes('english') || s.includes('phonics')) {
    return { border: '#D97706', bullet: '#D97706', tag: 'bg-orange-50 text-orange-700 border-orange-200' };
  }
  if (s.includes('commerce') || s.includes('economics')) {
    return { border: '#0284C7', bullet: '#0284C7', tag: 'bg-sky-50 text-sky-700 border-sky-200' };
  }
  return { border: '#1546A8', bullet: '#1546A8', tag: 'bg-indigo-50 text-indigo-700 border-indigo-200' };
};

export const SimulationRoadmapSection: React.FC = () => {
  const [selectedLevelId, setSelectedLevelId] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // By default, keep Level 1 open and Levels 2-5 collapsed so page opens instantly without long scrolling
  const [collapsedBlocks, setCollapsedBlocks] = useState<Record<string, boolean>>({
    'level-2': true,
    'level-3': true,
    'level-4': true,
    'level-5': true
  });

  const toggleBlock = (id: string) => {
    setCollapsedBlocks((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const collapseAll = () => {
    const allCol: Record<string, boolean> = {};
    ROADMAP_DATA.forEach(lvl => {
      allCol[lvl.id] = true;
    });
    setCollapsedBlocks(allCol);
  };

  const expandAll = () => {
    setCollapsedBlocks({});
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
    <section 
      id="simulation-roadmap"
      className="w-full relative z-10 rounded-2xl sm:rounded-3xl border shadow-lg transition-all overflow-hidden"
      style={{
        backgroundColor: '#FFFFFF',
        borderColor: '#DDE5F3',
        boxShadow: '0 8px 24px rgba(27, 42, 92, 0.08)'
      }}
    >
      <div className="p-5 sm:p-6 lg:p-8 space-y-6">
        
        {/* Header Bar matching the website's SectionViewHeader and Grade Filter panel */}
        <div 
          className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 sm:px-6 sm:py-4 rounded-2xl border shadow-xs"
          style={{
            backgroundColor: '#F8FAFC',
            borderColor: '#DDE5F3'
          }}
        >
          <div className="space-y-1">
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="text-[11px] font-mono font-black uppercase tracking-wider text-white px-3 py-1 rounded-md bg-[#1B2A5C] border border-[#1546A8] shrink-0">
                CURRICULUM ROADMAP
              </span>
              <h2 className="text-base sm:text-lg md:text-xl font-black text-[#1B2A5C] font-heading tracking-tight">
                Interactive Simulation Roadmap (Play Class to FSc)
              </h2>
            </div>
            <p className="text-xs sm:text-sm font-medium text-[#5A6E85]">
              Curated high-yield topics across the Pakistani curriculum — Play Group to FSc (Pre-Primary, Primary, Middle, Secondary &amp; Intermediate).
            </p>
          </div>

          {/* Search Box matching the portal search design */}
          <div className="relative w-full md:w-72 shrink-0">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-[#1546A8]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search key topic or subject..."
              className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-xl border border-[#DDE5F3] bg-white text-[#1B2A5C] placeholder-[#94A3B8] shadow-2xs focus:outline-none focus:border-[#1546A8] focus:ring-1 focus:ring-[#1546A8] transition-all"
            />
          </div>
        </div>

        {/* Grade Level Filter Tabs: Identical styling to the portal's Grade Level Filter buttons */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-[#1B2A5C]">
            <Layers className="w-4 h-4 text-[#1546A8]" />
            <span>Filter by Academic Stage:</span>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setSelectedLevelId('all')}
                className={`px-3.5 py-2 text-xs sm:text-sm font-black rounded-xl transition-all cursor-pointer ${
                  selectedLevelId === 'all'
                    ? 'bg-[#1B2A5C] text-white border-2 border-[#1546A8] shadow-md scale-[1.02]'
                    : 'bg-[#FFFFFF] hover:bg-[#F5F8FC] text-[#1B2A5C] hover:text-[#1546A8] border border-[#DDE5F3] hover:border-[#CBD5E1] shadow-xs'
                }`}
              >
                All Grades
              </button>

              {ROADMAP_DATA.map((lvl) => (
                <button
                  key={`tab-${lvl.id}`}
                  type="button"
                  onClick={() => {
                    setSelectedLevelId(lvl.id);
                    setCollapsedBlocks(prev => ({ ...prev, [lvl.id]: false }));
                  }}
                  className={`px-3.5 py-2 text-xs sm:text-sm font-black rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                    selectedLevelId === lvl.id
                      ? 'bg-[#1B2A5C] text-white border-2 border-[#1546A8] shadow-md scale-[1.02]'
                      : 'bg-[#FFFFFF] hover:bg-[#F5F8FC] text-[#1B2A5C] hover:text-[#1546A8] border border-[#DDE5F3] hover:border-[#CBD5E1] shadow-xs'
                  }`}
                >
                  <span>{lvl.shortLabel}</span>
                </button>
              ))}
            </div>

            {/* Quick Expand / Collapse All for Roadmap */}
            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#EEF3F9] border border-[#DDE5F3]">
              <button
                type="button"
                onClick={collapseAll}
                className="px-2.5 py-1.5 rounded-lg text-xs font-bold text-[#1B2A5C] hover:bg-white hover:text-[#1546A8] transition-all cursor-pointer flex items-center gap-1"
                title="Collapse all levels"
              >
                <ChevronDown className="w-3.5 h-3.5 text-[#1546A8]" />
                <span>Collapse All</span>
              </button>
              <span className="w-px h-4 bg-[#CBD5E1]" />
              <button
                type="button"
                onClick={expandAll}
                className="px-2.5 py-1.5 rounded-lg text-xs font-bold text-[#1B2A5C] hover:bg-white hover:text-[#1546A8] transition-all cursor-pointer flex items-center gap-1"
                title="Expand all levels"
              >
                <ChevronUp className="w-3.5 h-3.5 text-[#1546A8]" />
                <span>Expand All</span>
              </button>
            </div>
          </div>
        </div>

        {/* Roadmap Level Cards matching the portal's card architecture */}
        <div className="space-y-4 pt-2">
          {visibleLevels.length === 0 ? (
            <div className="p-8 text-center rounded-2xl border border-[#DDE5F3] bg-[#F8FAFC]">
              <p className="text-sm font-medium text-[#5A6E85]">
                No topics found matching your search. Please try another query.
              </p>
            </div>
          ) : (
            visibleLevels.map((level) => {
              const isCollapsed = !searchQuery.trim() && !!collapsedBlocks[level.id];

              return (
                <div 
                  key={level.id} 
                  className="rounded-2xl border transition-all overflow-hidden shadow-xs hover:shadow-md"
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderColor: '#DDE5F3'
                  }}
                >
                  {/* Level Header Bar */}
                  <div
                    className="flex items-center justify-between gap-3 p-4 sm:px-5 bg-[#F8FAFC] hover:bg-[#F1F5F9] border-b border-[#DDE5F3] cursor-pointer select-none transition-colors"
                    onClick={() => toggleBlock(level.id)}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="text-[10px] sm:text-[11px] font-mono font-black uppercase tracking-wider text-[#1546A8] bg-[#EEF3F9] border border-[#DDE5F3] px-2.5 py-1 rounded-md shrink-0">
                        {level.badge}
                      </span>
                      <h3 className="text-sm sm:text-base font-black text-[#1B2A5C] font-heading truncate">
                        {level.title}
                      </h3>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleBlock(level.id);
                      }}
                      className="p-1.5 rounded-lg text-[#1546A8] hover:bg-white border border-[#DDE5F3] shadow-2xs transition-colors shrink-0"
                      aria-label="Toggle level"
                    >
                      {isCollapsed ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
                    </button>
                  </div>

                  {/* Level Subjects & Key Topics Grid */}
                  {!isCollapsed && (
                    <div className="p-4 sm:p-6 space-y-6 bg-white">
                      {level.filteredSubjects.map((subj, idx) => {
                        const styleConfig = getSubjectColor(subj.name);

                        return (
                          <div key={`${level.id}-subj-${idx}`} className="space-y-2.5">
                            {/* Subject Header with Discipline Accent Tag */}
                            <div className="flex items-center gap-2">
                              <span 
                                className="w-2 h-2 rounded-full shrink-0"
                                style={{ backgroundColor: styleConfig.bullet }}
                              />
                              <h4 className="text-xs sm:text-sm font-black text-[#1B2A5C] uppercase tracking-wide">
                                {subj.name}
                              </h4>
                              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border shrink-0 ${styleConfig.tag}`}>
                                {subj.topics.length} Key Topics
                              </span>
                            </div>

                            {/* Topics Grid with hover highlights */}
                            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 pl-0 list-none text-xs sm:text-sm">
                              {subj.topics.map((topic, tIdx) => (
                                <li 
                                  key={`${level.id}-${idx}-${tIdx}`} 
                                  className="flex items-center gap-2.5 p-2 rounded-xl border border-transparent hover:border-[#DDE5F3] hover:bg-[#F8FAFC] transition-all group"
                                >
                                  <span 
                                    className="w-1.5 h-1.5 rounded-full shrink-0 transition-transform group-hover:scale-125"
                                    style={{ backgroundColor: styleConfig.bullet }}
                                  />
                                  <span className="text-[#1B2A5C] font-medium leading-snug group-hover:text-[#1546A8] transition-colors">
                                    {topic}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        );
                      })}
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
