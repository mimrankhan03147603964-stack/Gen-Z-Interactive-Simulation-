import React, { useState } from 'react';
import { Search, ChevronDown, ChevronUp, Maximize2, Minimize2 } from 'lucide-react';

interface SubjectSection {
  name?: string;
  topics: { num: number; title: string }[];
}

interface LevelData {
  id: string;
  title: string;
  sections: SubjectSection[];
}

const ROADMAP_DATA: LevelData[] = [
  {
    id: 'level-1',
    title: 'LEVEL 1: PLAY GROUP, NURSERY, PREP (Ages 3-5)',
    sections: [
      {
        topics: [
          { num: 1, title: 'Shapes & Colors Sorter' },
          { num: 2, title: 'Counting Fun 1-20' },
          { num: 3, title: 'Alphabet Adventure (A-Z and Urdu Haroof-e-Tahajji)' },
          { num: 4, title: 'Animal Sounds & Homes' },
          { num: 5, title: 'My Body Parts' },
          { num: 6, title: 'Day & Night and Weather Basics' },
          { num: 7, title: 'Fruits & Vegetables Basket' },
          { num: 8, title: 'Big & Small, Long & Short' },
          { num: 9, title: 'Pattern Maker' }
        ]
      }
    ]
  },
  {
    id: 'level-2',
    title: 'LEVEL 2: CLASS 1-2 (Ages 6-7)',
    sections: [
      {
        topics: [
          { num: 1, title: 'Addition & Subtraction Blocks' },
          { num: 2, title: 'Place Value Abacus' },
          { num: 3, title: 'Clock Reading Lab' },
          { num: 4, title: 'Money & Shopping Simulator' },
          { num: 5, title: 'Skip Counting & Number Patterns' },
          { num: 6, title: 'Shapes & Measurement Lab' },
          { num: 7, title: 'Living vs Non-Living Sorter' },
          { num: 8, title: 'Parts of a Plant & Seed Growth' },
          { num: 9, title: 'Five Senses Lab' },
          { num: 10, title: 'Good Habits & Safety' },
          { num: 11, title: 'Urdu & English Word Builder' }
        ]
      }
    ]
  },
  {
    id: 'level-3',
    title: 'LEVEL 3: CLASS 3-5 (Primary)',
    sections: [
      {
        name: 'MATHEMATICS',
        topics: [
          { num: 1, title: 'Multiplication Tables Visualizer' },
          { num: 2, title: 'Division & Sharing Lab' },
          { num: 3, title: 'Fractions Pizza & Bar Model' },
          { num: 4, title: 'Decimals & Percentages Lab' },
          { num: 5, title: 'Geometry Playground' },
          { num: 6, title: 'Data Handling & Graphs' },
          { num: 7, title: 'Time, Calendar & Money Word Problems' }
        ]
      },
      {
        name: 'SCIENCE',
        topics: [
          { num: 8, title: 'States of Matter Simulator' },
          { num: 9, title: 'Water Cycle Animation' },
          { num: 10, title: 'Food Chain & Food Web Builder' },
          { num: 11, title: 'Simple Machines Lab' },
          { num: 12, title: 'Magnets Lab' },
          { num: 13, title: 'Light & Shadows' },
          { num: 14, title: 'Solar System Explorer' },
          { num: 15, title: "Day, Night, Seasons & Earth's Tilt" },
          { num: 16, title: 'Human Body Systems Intro' },
          { num: 17, title: 'Plants & Animals Classification' }
        ]
      },
      {
        name: 'SOCIAL STUDIES AND GENERAL KNOWLEDGE',
        topics: [
          { num: 18, title: 'Map of Pakistan Explorer' },
          { num: 19, title: 'Pakistan Landmarks & Culture' }
        ]
      }
    ]
  },
  {
    id: 'level-4',
    title: 'LEVEL 4: CLASS 6-8 (Middle School)',
    sections: [
      {
        name: 'GENERAL SCIENCE',
        topics: [
          { num: 1, title: 'Cell Structure Explorer (Plant vs Animal)' },
          { num: 2, title: 'Microscope Simulator' },
          { num: 3, title: 'Photosynthesis Lab' },
          { num: 4, title: 'Human Digestive System' },
          { num: 5, title: 'Respiratory & Circulatory Systems' },
          { num: 6, title: 'Atoms, Elements & Compounds' },
          { num: 7, title: 'Mixtures & Separation Techniques' },
          { num: 8, title: 'Acids, Bases & Indicators' },
          { num: 9, title: 'Physical vs Chemical Changes' },
          { num: 10, title: 'Motion & Speed Lab' },
          { num: 11, title: 'Force, Friction & Gravity' },
          { num: 12, title: 'Sound Waves Lab' },
          { num: 13, title: 'Light, Reflection & Mirrors' },
          { num: 14, title: 'Simple Electric Circuits' },
          { num: 15, title: 'Heat Transfer' },
          { num: 16, title: 'Weather, Climate & Rocks' }
        ]
      },
      {
        name: 'MATHEMATICS',
        topics: [
          { num: 17, title: 'Algebra Balance Scale' },
          { num: 18, title: 'Integers & Number Line' },
          { num: 19, title: 'Ratio & Proportion Lab' },
          { num: 20, title: 'Angles & Triangles Explorer' },
          { num: 21, title: 'Area & Volume 3D' },
          { num: 22, title: 'Percentages, Profit & Loss' },
          { num: 23, title: 'Statistics Basics' }
        ]
      },
      {
        name: 'COMPUTER SCIENCE',
        topics: [
          { num: 24, title: 'Block Coding (Scratch-style)' },
          { num: 25, title: 'Binary Number Converter' },
          { num: 26, title: 'Computer Hardware Explorer' }
        ]
      }
    ]
  },
  {
    id: 'level-5',
    title: 'LEVEL 5: CLASS 9-10 (Matric / Secondary)',
    sections: [
      {
        name: 'PHYSICS',
        topics: [
          { num: 1, title: 'Kinematics Lab' },
          { num: 2, title: 'Projectile Motion Simulator' },
          { num: 3, title: "Newton's Laws Lab" },
          { num: 4, title: 'Work, Energy & Power' },
          { num: 5, title: 'Simple Pendulum' },
          { num: 6, title: 'Reflection & Refraction' },
          { num: 7, title: 'Lens Ray Diagrams' },
          { num: 8, title: "Ohm's Law & Circuits" },
          { num: 9, title: 'Electromagnetic Induction' },
          { num: 10, title: 'Radioactivity & Half-Life' },
          { num: 11, title: 'Heat & Thermal Expansion' },
          { num: 12, title: 'Waves & Sound' }
        ]
      },
      {
        name: 'CHEMISTRY',
        topics: [
          { num: 13, title: 'Periodic Table Trends' },
          { num: 14, title: 'Chemical Bonding (Ionic, Covalent, Metallic)' },
          { num: 15, title: 'Mole Concept & Stoichiometry Calculator' },
          { num: 16, title: "Gas Laws (Boyle's, Charles's, Gay-Lussac's)" },
          { num: 17, title: 'Acid-Base Titration' },
          { num: 18, title: 'Electrolysis Lab' },
          { num: 19, title: 'Rates of Reaction' },
          { num: 20, title: 'Organic Chemistry Basics' },
          { num: 21, title: 'Metals, Reactivity Series & Corrosion' },
          { num: 22, title: 'Water, Solutions & Solubility' }
        ]
      },
      {
        name: 'BIOLOGY',
        topics: [
          { num: 23, title: 'Mitosis & Meiosis Stepper' },
          { num: 24, title: 'DNA Structure & Replication' },
          { num: 25, title: 'Mendelian Genetics (Punnett Square)' },
          { num: 26, title: 'Human Heart & Blood Circulation' },
          { num: 27, title: 'Nervous System & Reflex Arc' },
          { num: 28, title: 'Osmosis & Diffusion Lab' },
          { num: 29, title: 'Ecosystem & Population Dynamics' },
          { num: 30, title: 'Digestive Enzymes & Nutrition Tests' },
          { num: 31, title: 'Excretory System & Kidney' },
          { num: 32, title: 'Plant Tropism & Hormones' }
        ]
      },
      {
        name: 'MATHEMATICS',
        topics: [
          { num: 33, title: 'Quadratic Equation Grapher' },
          { num: 34, title: 'Trigonometry Unit Circle' },
          { num: 35, title: 'Coordinate Geometry Lab' },
          { num: 36, title: 'Circle Theorems Explorer' },
          { num: 37, title: 'Matrices & Determinants Calculator' },
          { num: 38, title: 'Sets, Venn Diagrams & Logarithms' },
          { num: 39, title: 'Algebraic Formulas & Factorization Visualizer' }
        ]
      },
      {
        name: 'COMPUTER SCIENCE',
        topics: [
          { num: 40, title: 'Logic Gates Simulator' },
          { num: 41, title: 'HTML/CSS Live Editor' },
          { num: 42, title: 'Number Systems Converter' }
        ]
      }
    ]
  },
  {
    id: 'level-6',
    title: 'LEVEL 6: FSc / INTERMEDIATE (Class 11-12)',
    sections: [
      {
        name: 'PHYSICS',
        topics: [
          { num: 1, title: 'Vectors & Resultant Lab' },
          { num: 2, title: 'Circular Motion & Centripetal Force' },
          { num: 3, title: 'Torque & Equilibrium' },
          { num: 4, title: 'Fluid Dynamics (Bernoulli & Continuity)' },
          { num: 5, title: 'Simple Harmonic Motion (Spring-Mass and Pendulum)' },
          { num: 6, title: "Wave Interference & Young's Double Slit" },
          { num: 7, title: 'Thermodynamics (PV Diagrams)' },
          { num: 8, title: 'Electric Field & Potential' },
          { num: 9, title: 'Capacitor Charging/Discharging (RC Circuits)' },
          { num: 10, title: 'Magnetic Force on Moving Charges' },
          { num: 11, title: 'AC Circuits (RLC Resonance)' },
          { num: 12, title: 'Electromagnetic Waves & Spectrum' },
          { num: 13, title: 'Photoelectric Effect' },
          { num: 14, title: 'Bohr Atom & Spectral Lines' },
          { num: 15, title: 'Semiconductors, Diodes & Transistors' },
          { num: 16, title: 'Nuclear Physics' },
          { num: 17, title: 'Oscillations, Damping & Resonance' }
        ]
      },
      {
        name: 'CHEMISTRY',
        topics: [
          { num: 18, title: 'Atomic Orbitals 3D (s, p, d)' },
          { num: 19, title: "Chemical Equilibrium & Le Chatelier's Principle" },
          { num: 20, title: 'Buffer Solutions & pH Calculator' },
          { num: 21, title: 'Electrochemical Cells' },
          { num: 22, title: 'Thermochemistry (Enthalpy Diagrams)' },
          { num: 23, title: 'Reaction Kinetics (Order & Rate Law)' },
          { num: 24, title: 'Organic Reaction Mechanisms' },
          { num: 25, title: 'Colligative Properties' },
          { num: 26, title: 'Qualitative Salt Analysis' },
          { num: 27, title: 'Molecular Geometry (VSEPR) & Hybridization' },
          { num: 28, title: 'Chemical Kinetics of Gases & Kinetic Molecular Theory' },
          { num: 29, title: 'Solutions, Ionic Equilibria & Solubility Product' },
          { num: 30, title: 'Biochemistry & Polymers' }
        ]
      },
      {
        name: 'BIOLOGY',
        topics: [
          { num: 31, title: 'Photosynthesis (Light & Dark Reactions)' },
          { num: 32, title: 'Cellular Respiration & ATP' },
          { num: 33, title: 'Protein Synthesis (Transcription & Translation)' },
          { num: 34, title: 'Human Reproduction & Embryo Development' },
          { num: 35, title: 'Enzyme Activity Lab' },
          { num: 36, title: 'Natural Selection & Evolution Simulator' },
          { num: 37, title: 'Plant Transpiration & Water Transport' },
          { num: 38, title: 'Human Nervous Impulse & Synapse' },
          { num: 39, title: 'Immunity, Hormones & Homeostasis' },
          { num: 40, title: 'Biotechnology & Genetic Engineering' },
          { num: 41, title: 'Classification & Biodiversity Explorer' }
        ]
      },
      {
        name: 'MATHEMATICS',
        topics: [
          { num: 42, title: 'Calculus: Limits & Derivatives' },
          { num: 43, title: 'Integration (Area Under Curve)' },
          { num: 44, title: 'Conic Sections Explorer' },
          { num: 45, title: 'Complex Numbers on the Argand Plane' },
          { num: 46, title: 'Permutations & Combinations' },
          { num: 47, title: 'Probability & Statistics Lab' },
          { num: 48, title: 'Sequences, Series & Binomial Theorem' },
          { num: 49, title: 'Vectors in 3D & Planes' },
          { num: 50, title: 'Differential Equations & Functions Grapher' }
        ]
      },
      {
        name: 'COMPUTER SCIENCE (ICS)',
        topics: [
          { num: 51, title: 'Sorting Algorithm Visualizer' },
          { num: 52, title: 'Python / C++ Code Playground' },
          { num: 53, title: 'Database & SQL Query Practice' },
          { num: 54, title: 'Networking Basics (OSI Model & TCP/IP)' },
          { num: 55, title: 'Data Structures Visualizer' },
          { num: 56, title: 'Boolean Algebra & Karnaugh Maps' }
        ]
      },
      {
        name: 'COMMERCE AND ECONOMICS (FA / I.Com)',
        topics: [
          { num: 57, title: 'Supply & Demand Curve' },
          { num: 58, title: 'Ledger, Trial Balance & Balance Sheet Builder' },
          { num: 59, title: 'Profit, Cost & Break-Even Analysis' }
        ]
      }
    ]
  }
];

const CROSS_LEVEL_TOPICS = [
  'Geography',
  'Pakistan Studies & History',
  'Islamiat',
  'English Language',
  'Urdu Language',
  'General Knowledge & Current Affairs',
  'Environmental Science'
];

export const SimulationRoadmapSection: React.FC = () => {
  // Always expanded by default
  const [expandedBlocks, setExpandedBlocks] = useState<Record<string, boolean>>({
    'level-1': true,
    'level-2': true,
    'level-3': true,
    'level-4': true,
    'level-5': true,
    'level-6': true,
    'cross-level': true
  });

  const [searchQuery, setSearchQuery] = useState<string>('');
  const allBlocksExpanded = Object.values(expandedBlocks).every(Boolean);

  const toggleBlock = (blockId: string) => {
    setExpandedBlocks((prev) => ({
      ...prev,
      [blockId]: !prev[blockId]
    }));
  };

  const handleToggleAll = () => {
    const nextState = !allBlocksExpanded;
    setExpandedBlocks({
      'level-1': nextState,
      'level-2': nextState,
      'level-3': nextState,
      'level-4': nextState,
      'level-5': nextState,
      'level-6': nextState,
      'cross-level': nextState
    });
  };

  const matchesSearch = (text: string) => {
    if (!searchQuery.trim()) return true;
    return text.toLowerCase().includes(searchQuery.toLowerCase().trim());
  };

  return (
    <section 
      aria-label="Simulation Roadmap"
      className="gz-roadmap-section w-full my-6 sm:my-8 rounded-2xl border border-slate-300 shadow-sm relative z-10 font-sans"
      style={{
        backgroundColor: '#FFFFFF',
        color: '#000000'
      }}
    >
      <div className="p-6 sm:p-10 lg:p-12 space-y-8 bg-white text-black">
        
        {/* Section Header */}
        <div className="space-y-4 border-b border-slate-300 pb-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="text-xs font-bold uppercase tracking-wider text-black bg-slate-100 px-3 py-1 rounded border border-slate-300">
              Roadmap
            </span>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-64">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter topics..."
                  className="w-full pl-8 pr-3 py-1.5 text-xs rounded border border-slate-300 bg-white text-black placeholder-slate-500 focus:outline-none focus:border-black"
                />
              </div>

              <button
                type="button"
                onClick={handleToggleAll}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-bold border border-slate-400 bg-slate-100 hover:bg-slate-200 text-black shadow-xs transition-colors cursor-pointer shrink-0"
              >
                {allBlocksExpanded ? (
                  <>
                    <Minimize2 className="w-3.5 h-3.5" />
                    <span>Collapse All</span>
                  </>
                ) : (
                  <>
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>Expand All</span>
                  </>
                )}
              </button>
            </div>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-black tracking-tight leading-tight">
            Complete Interactive Simulation Roadmap: Play Class to FSc
          </h2>

          <p className="text-sm sm:text-base text-black leading-relaxed">
            Gen Z Interactive Simulations covers every subject of the Pakistani curriculum, from Play Group all the way to FSc (Intermediate, Class 11-12). Below is the complete roadmap of topics across all grade levels on which interactive simulations are available and can be created:
          </p>
        </div>

        {/* Grade-Level Roadmap Blocks (Pure black text, clean document layout, no cards) */}
        <div className="space-y-8">
          {ROADMAP_DATA.map((level) => {
            const isExpanded = !!expandedBlocks[level.id];

            const filteredSections = level.sections.map((sec) => ({
              ...sec,
              topics: sec.topics.filter(
                (t) => matchesSearch(t.title) || (sec.name && matchesSearch(sec.name))
              )
            })).filter((sec) => sec.topics.length > 0);

            if (searchQuery.trim() && filteredSections.length === 0) {
              return null;
            }

            return (
              <div key={level.id} className="border-b border-slate-200 pb-7 last:border-b-0">
                {/* Level Title Header */}
                <div 
                  className="flex items-center justify-between gap-3 cursor-pointer select-none pb-2"
                  onClick={() => toggleBlock(level.id)}
                >
                  <h3 className="text-base sm:text-lg font-black text-black uppercase tracking-wide">
                    {level.title}
                  </h3>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleBlock(level.id);
                    }}
                    className="p-1 rounded text-black hover:bg-slate-100 transition-colors"
                    aria-label={isExpanded ? 'Collapse' : 'Expand'}
                  >
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </button>
                </div>

                {isExpanded && (
                  <div className="mt-3 space-y-5">
                    {filteredSections.map((sec, sIdx) => (
                      <div key={`${level.id}-sec-${sIdx}`} className="space-y-2">
                        {sec.name && (
                          <h4 className="text-xs sm:text-sm font-black text-black uppercase tracking-wider pt-2 border-b border-slate-200 pb-1">
                            {sec.name}
                          </h4>
                        )}

                        {/* Clean multi-column readable plain text list, no cards or boxes */}
                        <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-2 pl-0 list-none text-sm text-black">
                          {sec.topics.map((t) => (
                            <li key={`${level.id}-${t.num}`} className="flex items-baseline gap-2 py-0.5">
                              <span className="font-bold text-black shrink-0">{t.num}.</span>
                              <span className="text-black font-medium">{t.title}</span>
                            </li>
                          ))}
                        </ol>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          {/* CROSS-LEVEL SUBJECTS */}
          {(!searchQuery.trim() || CROSS_LEVEL_TOPICS.some(t => matchesSearch(t))) && (
            <div className="pb-4">
              <div 
                className="flex items-center justify-between gap-3 cursor-pointer select-none pb-2"
                onClick={() => toggleBlock('cross-level')}
              >
                <h3 className="text-base sm:text-lg font-black text-black uppercase tracking-wide">
                  CROSS-LEVEL SUBJECTS
                </h3>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleBlock('cross-level');
                  }}
                  className="p-1 rounded text-black hover:bg-slate-100 transition-colors"
                  aria-label={expandedBlocks['cross-level'] ? 'Collapse' : 'Expand'}
                >
                  {expandedBlocks['cross-level'] ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
              </div>

              {expandedBlocks['cross-level'] && (
                <div className="mt-3">
                  <p className="text-sm text-black mb-3">
                    These subjects can be used at multiple levels with difficulty adjusted by class:
                  </p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-2 pl-5 list-disc text-sm text-black font-medium">
                    {CROSS_LEVEL_TOPICS
                      .filter((t) => matchesSearch(t))
                      .map((t, idx) => (
                        <li key={`cross-${idx}`}>
                          {t}
                        </li>
                      ))}
                  </ul>
                </div>
              )}
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
