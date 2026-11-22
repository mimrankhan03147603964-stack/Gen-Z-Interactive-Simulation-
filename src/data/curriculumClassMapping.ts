import { SimulationItem } from '../types';

export type ClassLevelKey =
  | 'play-prep'
  | 'class-1'
  | 'class-2'
  | 'class-3'
  | 'class-4'
  | 'class-5'
  | 'class-6'
  | 'class-7'
  | 'class-8'
  | 'class-9'
  | 'class-10';

export type EmptyClassKey =
  | 'class-11'
  | 'class-12'
  | 'bachelors'
  | 'masters'
  | 'mphil'
  | 'phd';

export type SelectableClassKey = 'all' | ClassLevelKey | EmptyClassKey;

export const EMPTY_CLASS_LABELS: Record<EmptyClassKey, string> = {
  'class-11': 'Class 11',
  'class-12': 'Class 12',
  bachelors: "Bachelor's",
  masters: "Master's",
  mphil: 'MPhil',
  phd: 'PhD'
};

export const EMPTY_CLASS_MESSAGE =
  'No simulations have been added for this class yet. Please contact the developer with your topic, subject, and class, and your simulation will be uploaded to the website within 24 hours.';

export const NAV_SIMULATION_CLASS_ITEMS: Array<{ label: string; classKey: SelectableClassKey }> = [
  { label: 'All Simulations', classKey: 'all' },
  { label: 'Play Group – Early Childhood Education', classKey: 'play-prep' },
  { label: 'Nursery – Early Childhood Education', classKey: 'play-prep' },
  { label: 'Prep – Early Childhood Education', classKey: 'play-prep' },
  { label: 'Class 1 – Primary', classKey: 'class-1' },
  { label: 'Class 2 – Primary', classKey: 'class-2' },
  { label: 'Class 3 – Primary', classKey: 'class-3' },
  { label: 'Class 4 – Primary', classKey: 'class-4' },
  { label: 'Class 5 – Primary', classKey: 'class-5' },
  { label: 'Class 6 – Middle', classKey: 'class-6' },
  { label: 'Class 7 – Middle', classKey: 'class-7' },
  { label: 'Class 8 – Middle', classKey: 'class-8' },
  { label: 'Class 9 – Secondary (Matric)', classKey: 'class-9' },
  { label: 'Class 10 – Secondary (Matric)', classKey: 'class-10' },
  { label: 'Class 11 – Higher Secondary (Intermediate, 1st Year)', classKey: 'class-11' },
  { label: 'Class 12 – Higher Secondary (Intermediate, 2nd Year)', classKey: 'class-12' },
  { label: "Bachelor's – BS / BA / BSc", classKey: 'bachelors' },
  { label: "Master's – MA / MSc / MS", classKey: 'masters' },
  { label: 'MPhil – Master of Philosophy', classKey: 'mphil' },
  { label: 'PhD – Doctor of Philosophy', classKey: 'phd' }
];

export function isEmptyClassKey(key: SelectableClassKey): key is EmptyClassKey {
  return key in EMPTY_CLASS_LABELS;
}

export type CurriculumSubjectKey =
  | 'Early Childhood (ECCE)'
  | 'Science'
  | 'Physics'
  | 'Chemistry'
  | 'Biology'
  | 'Mathematics'
  | 'Computer Science'
  | 'English'
  | 'Urdu';

export interface ClassCurriculumAssignment {
  classKey: ClassLevelKey;
  subject: CurriculumSubjectKey;
}

export interface ClassPanelDefinition {
  key: ClassLevelKey;
  name: string;
  shortLabel: string;
  subtitle: string;
  color: string;
  tint: string;
  shadow: string;
  subjectOrder: CurriculumSubjectKey[];
}

export const CURRICULUM_SUBJECT_META: Record<
  CurriculumSubjectKey,
  { color: string; bg: string; border: string }
> = {
  'Early Childhood (ECCE)': { color: '#E11D48', bg: 'rgba(225, 29, 72, 0.08)', border: 'rgba(225, 29, 72, 0.25)' },
  Science: { color: '#0284C7', bg: 'rgba(2, 132, 199, 0.08)', border: 'rgba(2, 132, 199, 0.25)' },
  Physics: { color: '#2563EB', bg: 'rgba(37, 99, 235, 0.08)', border: 'rgba(37, 99, 235, 0.25)' },
  Chemistry: { color: '#9333EA', bg: 'rgba(147, 51, 234, 0.08)', border: 'rgba(147, 51, 234, 0.25)' },
  Biology: { color: '#16A34A', bg: 'rgba(22, 163, 74, 0.08)', border: 'rgba(22, 163, 74, 0.25)' },
  Mathematics: { color: '#EA580C', bg: 'rgba(234, 88, 12, 0.08)', border: 'rgba(234, 88, 12, 0.25)' },
  'Computer Science': { color: '#0D9488', bg: 'rgba(13, 148, 136, 0.08)', border: 'rgba(13, 148, 136, 0.25)' },
  English: { color: '#4F46E5', bg: 'rgba(79, 70, 229, 0.08)', border: 'rgba(79, 70, 229, 0.25)' },
  Urdu: { color: '#059669', bg: 'rgba(5, 150, 105, 0.08)', border: 'rgba(5, 150, 105, 0.25)' }
};

/**
 * Class panels ordered strictly from Play Group / Prep through Class 10
 * aligned with Pakistan's Single National Curriculum (SNC 2020) and
 * National Curriculum of Pakistan (NCP 2022-23 / 2026-27).
 *
 * - Play Group / Prep: ECCE, English, Urdu
 * - Classes 1–8: Unified "Science" subject (no Physics/Chemistry/Biology split)
 * - Classes 9–10: Separate Physics, Chemistry, and Biology subjects per SSC curriculum
 */
export const CLASS_PANELS_CONFIG: ClassPanelDefinition[] = [
  {
    key: 'play-prep',
    name: 'Play Group / Prep',
    shortLabel: 'Play Group / Prep',
    subtitle: 'Early Childhood Care & Education (ECCE) • SNC 2020 / NCP 2022–23 & 2026–27',
    color: '#E11D48',
    tint: 'rgba(225, 29, 72, 0.08)',
    shadow: 'rgba(225, 29, 72, 0.35)',
    subjectOrder: ['Early Childhood (ECCE)', 'English', 'Urdu']
  },
  {
    key: 'class-1',
    name: 'Class 1',
    shortLabel: 'Class 1',
    subtitle: 'Primary Level (Grade 1) • SNC 2020 / NCP 2022–23 & 2026–27',
    color: '#EA580C',
    tint: 'rgba(234, 88, 12, 0.08)',
    shadow: 'rgba(234, 88, 12, 0.35)',
    subjectOrder: ['Science', 'Mathematics', 'English', 'Urdu']
  },
  {
    key: 'class-2',
    name: 'Class 2',
    shortLabel: 'Class 2',
    subtitle: 'Primary Level (Grade 2) • SNC 2020 / NCP 2022–23 & 2026–27',
    color: '#D97706',
    tint: 'rgba(217, 119, 6, 0.08)',
    shadow: 'rgba(217, 119, 6, 0.35)',
    subjectOrder: ['Science', 'Mathematics', 'English', 'Urdu']
  },
  {
    key: 'class-3',
    name: 'Class 3',
    shortLabel: 'Class 3',
    subtitle: 'Primary Level (Grade 3) • SNC 2020 / NCP 2022–23 & 2026–27',
    color: '#16A34A',
    tint: 'rgba(22, 163, 74, 0.08)',
    shadow: 'rgba(22, 163, 74, 0.35)',
    subjectOrder: ['Science', 'Mathematics', 'English', 'Urdu']
  },
  {
    key: 'class-4',
    name: 'Class 4',
    shortLabel: 'Class 4',
    subtitle: 'Primary Level (Grade 4) • SNC 2020 / NCP 2022–23 & 2026–27',
    color: '#059669',
    tint: 'rgba(5, 150, 105, 0.08)',
    shadow: 'rgba(5, 150, 105, 0.35)',
    subjectOrder: ['Science', 'Mathematics', 'English', 'Urdu']
  },
  {
    key: 'class-5',
    name: 'Class 5',
    shortLabel: 'Class 5',
    subtitle: 'Primary Level (Grade 5) • SNC 2020 / NCP 2022–23 & 2026–27',
    color: '#0D9488',
    tint: 'rgba(13, 148, 136, 0.08)',
    shadow: 'rgba(13, 148, 136, 0.35)',
    subjectOrder: ['Science', 'Mathematics', 'English', 'Urdu']
  },
  {
    key: 'class-6',
    name: 'Class 6',
    shortLabel: 'Class 6',
    subtitle: 'Middle Level (Grade 6) • National Curriculum of Pakistan (NCP 2022–23 / 2026–27)',
    color: '#0284C7',
    tint: 'rgba(2, 132, 199, 0.08)',
    shadow: 'rgba(2, 132, 199, 0.35)',
    subjectOrder: ['Science', 'Mathematics', 'Computer Science', 'English', 'Urdu']
  },
  {
    key: 'class-7',
    name: 'Class 7',
    shortLabel: 'Class 7',
    subtitle: 'Middle Level (Grade 7) • National Curriculum of Pakistan (NCP 2022–23 / 2026–27)',
    color: '#2563EB',
    tint: 'rgba(37, 99, 235, 0.08)',
    shadow: 'rgba(37, 99, 235, 0.35)',
    subjectOrder: ['Science', 'Mathematics', 'Computer Science', 'English', 'Urdu']
  },
  {
    key: 'class-8',
    name: 'Class 8',
    shortLabel: 'Class 8',
    subtitle: 'Middle Level (Grade 8) • National Curriculum of Pakistan (NCP 2022–23 / 2026–27)',
    color: '#4F46E5',
    tint: 'rgba(79, 70, 229, 0.08)',
    shadow: 'rgba(79, 70, 229, 0.35)',
    subjectOrder: ['Science', 'Mathematics', 'Computer Science', 'English', 'Urdu']
  },
  {
    key: 'class-9',
    name: 'Class 9',
    shortLabel: 'Class 9',
    subtitle: 'Secondary / Matric SSC-I (Grade 9) • National Curriculum of Pakistan (NCP 2022–23 / 2026–27)',
    color: '#7C3AED',
    tint: 'rgba(124, 58, 237, 0.08)',
    shadow: 'rgba(124, 58, 237, 0.35)',
    subjectOrder: ['Physics', 'Chemistry', 'Biology', 'Mathematics', 'Computer Science', 'English', 'Urdu']
  },
  {
    key: 'class-10',
    name: 'Class 10',
    shortLabel: 'Class 10',
    subtitle: 'Secondary / Matric SSC-II (Grade 10) • National Curriculum of Pakistan (NCP 2022–23 / 2026–27)',
    color: '#1B2A5C',
    tint: 'rgba(27, 42, 92, 0.08)',
    shadow: 'rgba(27, 42, 92, 0.35)',
    subjectOrder: ['Physics', 'Chemistry', 'Biology', 'Mathematics', 'Computer Science', 'English', 'Urdu']
  }
];

/**
 * Multi-class & curriculum-subject mapping for all 147 simulations.
 * Aligned with Pakistan's Single National Curriculum (SNC 2020) and
 * National Curriculum of Pakistan (NCP 2022–23 / 2026–27).
 *
 * - Every simulation keeps its existing class placement and is reused by reference
 *   in every additional class where the curriculum includes that topic, under the
 *   appropriate subject for each class (unified Science in Classes 1–8; separate
 *   Physics, Chemistry, Biology in Classes 9–10).
 * - Zero simulation code or objects are duplicated; no topic names are modified.
 */
export const SIMULATION_CLASS_MAPPING: Record<string, ClassCurriculumAssignment[]> = {
  // =========================================================================
  // EARLY CHILDHOOD (PLAY GROUP / PREP) & EARLY LITERACY BRIDGES
  // =========================================================================
  'sim-early-childhood-care-education': [
    { classKey: 'play-prep', subject: 'Early Childhood (ECCE)' }
  ],
  'sim-color-mixing-shapes-playground': [
    { classKey: 'play-prep', subject: 'Early Childhood (ECCE)' }
  ],
  'sim-ecce-curriculum-learning-areas': [
    { classKey: 'play-prep', subject: 'Early Childhood (ECCE)' }
  ],
  'sim-ecce-learning-world': [
    { classKey: 'play-prep', subject: 'Early Childhood (ECCE)' }
  ],
  'sim-learning-areas-ecce-38-standards': [
    { classKey: 'play-prep', subject: 'Early Childhood (ECCE)' }
  ],
  'sim-play-group-fun-lab': [
    { classKey: 'play-prep', subject: 'Early Childhood (ECCE)' }
  ],
  'sim-nursery-fun-lab': [
    { classKey: 'play-prep', subject: 'Early Childhood (ECCE)' }
  ],
  'sim-prep-fun-lab': [
    { classKey: 'play-prep', subject: 'Early Childhood (ECCE)' }
  ],
  'sim-abc-real-objects-learning': [
    { classKey: 'play-prep', subject: 'English' },
    { classKey: 'class-1', subject: 'English' }
  ],
  'sim-alphabet-phonics-soundboard': [
    { classKey: 'play-prep', subject: 'English' },
    { classKey: 'class-1', subject: 'English' }
  ],
  'sim-haroof-e-tahajji-sound-lab': [
    { classKey: 'play-prep', subject: 'Urdu' },
    { classKey: 'class-1', subject: 'Urdu' }
  ],

  // =========================================================================
  // CLASS 1 PRIMARY CORE (WITH MULTI-CLASS PROGRESSION)
  // =========================================================================
  'sim-living-nonliving': [
    { classKey: 'class-1', subject: 'Science' },
    { classKey: 'class-2', subject: 'Science' },
    { classKey: 'class-3', subject: 'Science' }
  ],
  'sim-class1-maths-lab': [
    { classKey: 'class-1', subject: 'Mathematics' }
  ],
  'sim-basic-maths-multiplication': [
    { classKey: 'class-1', subject: 'Mathematics' },
    { classKey: 'class-2', subject: 'Mathematics' },
    { classKey: 'class-3', subject: 'Mathematics' },
    { classKey: 'class-4', subject: 'Mathematics' }
  ],
  'sim-basic-prepositions-3d': [
    { classKey: 'class-1', subject: 'English' },
    { classKey: 'class-2', subject: 'English' },
    { classKey: 'class-3', subject: 'English' },
    { classKey: 'class-4', subject: 'English' }
  ],

  // =========================================================================
  // CLASS 2 PRIMARY CORE (WITH MULTI-CLASS PROGRESSION)
  // =========================================================================
  'sim-earth-space': [
    { classKey: 'class-2', subject: 'Science' },
    { classKey: 'class-3', subject: 'Science' },
    { classKey: 'class-4', subject: 'Science' }
  ],
  'sim-light-shadows': [
    { classKey: 'class-2', subject: 'Science' },
    { classKey: 'class-3', subject: 'Science' },
    { classKey: 'class-4', subject: 'Science' },
    { classKey: 'class-5', subject: 'Science' }
  ],
  'sim-class2-maths-lab': [
    { classKey: 'class-2', subject: 'Mathematics' }
  ],
  'sim-measurement-units-scale': [
    { classKey: 'class-2', subject: 'Mathematics' },
    { classKey: 'class-3', subject: 'Mathematics' },
    { classKey: 'class-4', subject: 'Mathematics' },
    { classKey: 'class-5', subject: 'Mathematics' }
  ],

  // =========================================================================
  // CLASS 3 PRIMARY CORE (WITH MULTI-CLASS PROGRESSION)
  // =========================================================================
  'sim-herbivores-carnivores-omnivores-simulation': [
    { classKey: 'class-3', subject: 'Science' },
    { classKey: 'class-4', subject: 'Science' },
    { classKey: 'class-5', subject: 'Science' }
  ],
  'sim-life-cycle-simulation': [
    { classKey: 'class-3', subject: 'Science' },
    { classKey: 'class-4', subject: 'Science' },
    { classKey: 'class-5', subject: 'Science' }
  ],
  'sim-push-and-pull-forces': [
    { classKey: 'class-3', subject: 'Science' },
    { classKey: 'class-4', subject: 'Science' },
    { classKey: 'class-5', subject: 'Science' }
  ],
  'sim-states-of-matter-solid-liquid-gas': [
    { classKey: 'class-3', subject: 'Science' },
    { classKey: 'class-4', subject: 'Science' },
    { classKey: 'class-5', subject: 'Science' },
    { classKey: 'class-6', subject: 'Science' },
    { classKey: 'class-9', subject: 'Chemistry' }
  ],
  'sim-water-cycle-simulation': [
    { classKey: 'class-3', subject: 'Science' },
    { classKey: 'class-4', subject: 'Science' },
    { classKey: 'class-5', subject: 'Science' },
    { classKey: 'class-6', subject: 'Science' }
  ],
  'sim-class3-maths-lab': [
    { classKey: 'class-3', subject: 'Mathematics' }
  ],
  'sim-2d-3d-shapes-builder': [
    { classKey: 'class-2', subject: 'Mathematics' },
    { classKey: 'class-3', subject: 'Mathematics' },
    { classKey: 'class-4', subject: 'Mathematics' },
    { classKey: 'class-5', subject: 'Mathematics' },
    { classKey: 'class-6', subject: 'Mathematics' }
  ],
  'sim-parts-of-speech-lab': [
    { classKey: 'class-3', subject: 'English' },
    { classKey: 'class-4', subject: 'English' },
    { classKey: 'class-5', subject: 'English' },
    { classKey: 'class-6', subject: 'English' }
  ],

  // =========================================================================
  // CLASS 4 PRIMARY CORE (WITH MULTI-CLASS PROGRESSION)
  // =========================================================================
  'sim-vertebrates-invertebrates-simulation': [
    { classKey: 'class-4', subject: 'Science' },
    { classKey: 'class-5', subject: 'Science' },
    { classKey: 'class-9', subject: 'Biology' }
  ],
  'sim-parts-of-flowering-plant': [
    { classKey: 'class-2', subject: 'Science' },
    { classKey: 'class-3', subject: 'Science' },
    { classKey: 'class-4', subject: 'Science' },
    { classKey: 'class-5', subject: 'Science' },
    { classKey: 'class-6', subject: 'Science' }
  ],
  'sim-ecosystem-environment-simulation': [
    { classKey: 'class-4', subject: 'Science' },
    { classKey: 'class-5', subject: 'Science' },
    { classKey: 'class-6', subject: 'Science' },
    { classKey: 'class-8', subject: 'Science' },
    { classKey: 'class-10', subject: 'Biology' }
  ],
  'sim-states-of-matter': [
    { classKey: 'class-4', subject: 'Science' },
    { classKey: 'class-5', subject: 'Science' },
    { classKey: 'class-6', subject: 'Science' },
    { classKey: 'class-9', subject: 'Chemistry' }
  ],
  'sim-ice-to-water-to-steam-simulation': [
    { classKey: 'class-4', subject: 'Science' },
    { classKey: 'class-5', subject: 'Science' },
    { classKey: 'class-6', subject: 'Science' },
    { classKey: 'class-9', subject: 'Chemistry' }
  ],
  'sim-soluble-vs-insoluble-substances': [
    { classKey: 'class-4', subject: 'Science' },
    { classKey: 'class-5', subject: 'Science' },
    { classKey: 'class-6', subject: 'Science' },
    { classKey: 'class-9', subject: 'Chemistry' }
  ],
  'sim-shadow-formation-light-sources': [
    { classKey: 'class-4', subject: 'Science' },
    { classKey: 'class-5', subject: 'Science' },
    { classKey: 'class-6', subject: 'Science' }
  ],
  'sim-simple-machines': [
    { classKey: 'class-4', subject: 'Science' },
    { classKey: 'class-5', subject: 'Science' },
    { classKey: 'class-6', subject: 'Science' }
  ],
  'sim-earth-rotation-revolution': [
    { classKey: 'class-4', subject: 'Science' },
    { classKey: 'class-5', subject: 'Science' },
    { classKey: 'class-6', subject: 'Science' }
  ],
  'sim-solar-system-simulation': [
    { classKey: 'class-4', subject: 'Science' },
    { classKey: 'class-5', subject: 'Science' },
    { classKey: 'class-6', subject: 'Science' }
  ],
  'sim-class4-maths-lab': [
    { classKey: 'class-4', subject: 'Mathematics' }
  ],
  'sim-parts-of-speech-grammar-quest': [
    { classKey: 'class-4', subject: 'English' },
    { classKey: 'class-5', subject: 'English' },
    { classKey: 'class-6', subject: 'English' },
    { classKey: 'class-7', subject: 'English' },
    { classKey: 'class-8', subject: 'English' }
  ],
  'sim-urdu-grammar': [
    { classKey: 'class-3', subject: 'Urdu' },
    { classKey: 'class-4', subject: 'Urdu' },
    { classKey: 'class-5', subject: 'Urdu' },
    { classKey: 'class-6', subject: 'Urdu' },
    { classKey: 'class-7', subject: 'Urdu' },
    { classKey: 'class-8', subject: 'Urdu' }
  ],

  // =========================================================================
  // CLASS 5 PRIMARY CORE (WITH MULTI-CLASS PROGRESSION)
  // =========================================================================
  'sim-microorganisms-viewer': [
    { classKey: 'class-5', subject: 'Science' },
    { classKey: 'class-6', subject: 'Science' },
    { classKey: 'class-9', subject: 'Biology' }
  ],
  'sim-flower-simulation': [
    { classKey: 'class-4', subject: 'Science' },
    { classKey: 'class-5', subject: 'Science' },
    { classKey: 'class-6', subject: 'Science' },
    { classKey: 'class-7', subject: 'Science' },
    { classKey: 'class-10', subject: 'Biology' }
  ],
  'sim-photosynthesis-process-simulation': [
    { classKey: 'class-5', subject: 'Science' },
    { classKey: 'class-6', subject: 'Science' },
    { classKey: 'class-7', subject: 'Science' },
    { classKey: 'class-9', subject: 'Biology' }
  ],
  'sim-balanced-unbalanced-forces-tug-of-war': [
    { classKey: 'class-5', subject: 'Science' },
    { classKey: 'class-7', subject: 'Science' },
    { classKey: 'class-8', subject: 'Science' },
    { classKey: 'class-9', subject: 'Physics' }
  ],
  'sim-electricity': [
    { classKey: 'class-4', subject: 'Science' },
    { classKey: 'class-5', subject: 'Science' },
    { classKey: 'class-6', subject: 'Science' },
    { classKey: 'class-7', subject: 'Science' },
    { classKey: 'class-8', subject: 'Science' },
    { classKey: 'class-10', subject: 'Physics' }
  ],
  'sim-plate-tectonics-moon-phases': [
    { classKey: 'class-5', subject: 'Science' },
    { classKey: 'class-6', subject: 'Science' },
    { classKey: 'class-8', subject: 'Science' }
  ],
  'sim-solar-lunar-eclipse': [
    { classKey: 'class-5', subject: 'Science' },
    { classKey: 'class-6', subject: 'Science' },
    { classKey: 'class-7', subject: 'Science' }
  ],
  'sim-class5-maths-lab': [
    { classKey: 'class-5', subject: 'Mathematics' }
  ],
  'sim-english-grammar': [
    { classKey: 'class-5', subject: 'English' },
    { classKey: 'class-6', subject: 'English' },
    { classKey: 'class-7', subject: 'English' },
    { classKey: 'class-8', subject: 'English' },
    { classKey: 'class-9', subject: 'English' }
  ],
  'sim-urdu-grammar-sifat-ki-aqsam': [
    { classKey: 'class-4', subject: 'Urdu' },
    { classKey: 'class-5', subject: 'Urdu' },
    { classKey: 'class-6', subject: 'Urdu' },
    { classKey: 'class-7', subject: 'Urdu' },
    { classKey: 'class-8', subject: 'Urdu' }
  ],

  // =========================================================================
  // CLASS 6 MIDDLE CORE (WITH MULTI-CLASS PROGRESSION)
  // =========================================================================
  'sim-five-senses-simulation': [
    { classKey: 'class-1', subject: 'Science' },
    { classKey: 'class-2', subject: 'Science' },
    { classKey: 'class-6', subject: 'Science' }
  ],
  'sim-parts-of-a-plant-3d-simulation': [
    { classKey: 'class-4', subject: 'Science' },
    { classKey: 'class-5', subject: 'Science' },
    { classKey: 'class-6', subject: 'Science' },
    { classKey: 'class-7', subject: 'Science' }
  ],
  'sim-pollination-fertilization-simulation': [
    { classKey: 'class-5', subject: 'Science' },
    { classKey: 'class-6', subject: 'Science' },
    { classKey: 'class-7', subject: 'Science' },
    { classKey: 'class-10', subject: 'Biology' }
  ],
  'sim-mixtures-solutions': [
    { classKey: 'class-5', subject: 'Science' },
    { classKey: 'class-6', subject: 'Science' },
    { classKey: 'class-7', subject: 'Science' },
    { classKey: 'class-9', subject: 'Chemistry' }
  ],
  'sim-energy-forms-and-changes': [
    { classKey: 'class-5', subject: 'Science' },
    { classKey: 'class-6', subject: 'Science' },
    { classKey: 'class-7', subject: 'Science' },
    { classKey: 'class-9', subject: 'Physics' }
  ],
  'sim-solar-system-orbits': [
    { classKey: 'class-5', subject: 'Science' },
    { classKey: 'class-6', subject: 'Science' },
    { classKey: 'class-8', subject: 'Science' }
  ],
  'sim-solar-lunar-eclipse-interactive': [
    { classKey: 'class-5', subject: 'Science' },
    { classKey: 'class-6', subject: 'Science' },
    { classKey: 'class-7', subject: 'Science' }
  ],
  'sim-class-6-maths-laboratory': [
    { classKey: 'class-6', subject: 'Mathematics' }
  ],
  'sim-interactive-geometry': [
    { classKey: 'class-5', subject: 'Mathematics' },
    { classKey: 'class-6', subject: 'Mathematics' },
    { classKey: 'class-7', subject: 'Mathematics' },
    { classKey: 'class-8', subject: 'Mathematics' }
  ],
  'sim-computer-parts-hardware': [
    { classKey: 'class-6', subject: 'Computer Science' },
    { classKey: 'class-7', subject: 'Computer Science' },
    { classKey: 'class-9', subject: 'Computer Science' }
  ],
  'sim-keyboard-shortcuts-typing': [
    { classKey: 'class-6', subject: 'Computer Science' },
    { classKey: 'class-7', subject: 'Computer Science' },
    { classKey: 'class-8', subject: 'Computer Science' }
  ],
  'sim-english-verb-tenses-timeline': [
    { classKey: 'class-5', subject: 'English' },
    { classKey: 'class-6', subject: 'English' },
    { classKey: 'class-7', subject: 'English' },
    { classKey: 'class-8', subject: 'English' },
    { classKey: 'class-9', subject: 'English' },
    { classKey: 'class-10', subject: 'English' }
  ],

  // =========================================================================
  // CLASS 7 MIDDLE CORE (WITH MULTI-CLASS PROGRESSION)
  // =========================================================================
  'sim-plant-respiration-simulation': [
    { classKey: 'class-6', subject: 'Science' },
    { classKey: 'class-7', subject: 'Science' },
    { classKey: 'class-9', subject: 'Biology' }
  ],
  'sim-breathing-process-simulation': [
    { classKey: 'class-7', subject: 'Science' },
    { classKey: 'class-10', subject: 'Biology' }
  ],
  'sim-human-respiratory-system-simulation': [
    { classKey: 'class-6', subject: 'Science' },
    { classKey: 'class-7', subject: 'Science' },
    { classKey: 'class-10', subject: 'Biology' }
  ],
  'sim-human-heart-simulation': [
    { classKey: 'class-7', subject: 'Science' },
    { classKey: 'class-9', subject: 'Biology' }
  ],
  'sim-atoms-molecules-builder': [
    { classKey: 'class-6', subject: 'Science' },
    { classKey: 'class-7', subject: 'Science' },
    { classKey: 'class-8', subject: 'Science' },
    { classKey: 'class-9', subject: 'Chemistry' }
  ],
  'sim-heat-transfer': [
    { classKey: 'class-4', subject: 'Science' },
    { classKey: 'class-7', subject: 'Science' },
    { classKey: 'class-9', subject: 'Physics' }
  ],
  'sim-speed-of-sound-solids-liquids-gases': [
    { classKey: 'class-6', subject: 'Science' },
    { classKey: 'class-7', subject: 'Science' },
    { classKey: 'class-10', subject: 'Physics' }
  ],
  'sim-white-light-prism-dispersion': [
    { classKey: 'class-7', subject: 'Science' },
    { classKey: 'class-8', subject: 'Science' },
    { classKey: 'class-10', subject: 'Physics' }
  ],
  'sim-rainbow-dispersion-droplets': [
    { classKey: 'class-7', subject: 'Science' },
    { classKey: 'class-8', subject: 'Science' },
    { classKey: 'class-10', subject: 'Physics' }
  ],
  'sim-moon-phases-tides-orbit': [
    { classKey: 'class-5', subject: 'Science' },
    { classKey: 'class-7', subject: 'Science' },
    { classKey: 'class-8', subject: 'Science' }
  ],
  'sim-class-7-maths-laboratory': [
    { classKey: 'class-7', subject: 'Mathematics' }
  ],
  'sim-interactive-geometry-shapes-lab': [
    { classKey: 'class-6', subject: 'Mathematics' },
    { classKey: 'class-7', subject: 'Mathematics' },
    { classKey: 'class-8', subject: 'Mathematics' },
    { classKey: 'class-9', subject: 'Mathematics' }
  ],
  'sim-english-syntax-tree-grammar': [
    { classKey: 'class-6', subject: 'English' },
    { classKey: 'class-7', subject: 'English' },
    { classKey: 'class-8', subject: 'English' },
    { classKey: 'class-9', subject: 'English' },
    { classKey: 'class-10', subject: 'English' }
  ],

  // =========================================================================
  // CLASS 8 MIDDLE CORE (WITH MULTI-CLASS PROGRESSION)
  // =========================================================================
  'sim-carbon-nitrogen-cycle-simulation': [
    { classKey: 'class-8', subject: 'Science' },
    { classKey: 'class-10', subject: 'Biology' }
  ],
  'sim-greenhouse-effect-lab': [
    { classKey: 'class-5', subject: 'Science' },
    { classKey: 'class-8', subject: 'Science' },
    { classKey: 'class-10', subject: 'Chemistry' }
  ],
  'sim-anatomy-of-human-brain-simulation': [
    { classKey: 'class-8', subject: 'Science' },
    { classKey: 'class-10', subject: 'Biology' }
  ],
  'sim-periodic-table-bohr': [
    { classKey: 'class-7', subject: 'Science' },
    { classKey: 'class-8', subject: 'Science' },
    { classKey: 'class-9', subject: 'Chemistry' }
  ],
  'sim-conservation-of-mass-lab': [
    { classKey: 'class-8', subject: 'Science' },
    { classKey: 'class-9', subject: 'Chemistry' },
    { classKey: 'class-10', subject: 'Chemistry' }
  ],
  'sim-exothermic-endothermic-reactions': [
    { classKey: 'class-8', subject: 'Science' },
    { classKey: 'class-9', subject: 'Chemistry' },
    { classKey: 'class-10', subject: 'Chemistry' }
  ],
  'sim-acids-bases-ph-titration': [
    { classKey: 'class-8', subject: 'Science' },
    { classKey: 'class-10', subject: 'Chemistry' }
  ],
  'sim-atoms-light-sound': [
    { classKey: 'class-7', subject: 'Science' },
    { classKey: 'class-8', subject: 'Science' },
    { classKey: 'class-10', subject: 'Physics' }
  ],
  'sim-light-explorer-refraction-lenses': [
    { classKey: 'class-8', subject: 'Science' },
    { classKey: 'class-10', subject: 'Physics' }
  ],
  'sim-volcano-magma-dynamics': [
    { classKey: 'class-5', subject: 'Science' },
    { classKey: 'class-8', subject: 'Science' }
  ],
  'sim-plate-tectonics-moon-phases-studio': [
    { classKey: 'class-6', subject: 'Science' },
    { classKey: 'class-8', subject: 'Science' }
  ],
  'sim-class-8-maths-laboratory': [
    { classKey: 'class-8', subject: 'Mathematics' }
  ],
  'sim-algebra-equation-balancer': [
    { classKey: 'class-6', subject: 'Mathematics' },
    { classKey: 'class-7', subject: 'Mathematics' },
    { classKey: 'class-8', subject: 'Mathematics' },
    { classKey: 'class-9', subject: 'Mathematics' }
  ],
  'sim-pythagorean-theorem-geometry': [
    { classKey: 'class-8', subject: 'Mathematics' },
    { classKey: 'class-9', subject: 'Mathematics' },
    { classKey: 'class-10', subject: 'Mathematics' }
  ],
  'sim-sorting-algorithms-visualizer': [
    { classKey: 'class-8', subject: 'Computer Science' },
    { classKey: 'class-9', subject: 'Computer Science' },
    { classKey: 'class-10', subject: 'Computer Science' }
  ],
  'sim-active-passive-voice-tense-timeline': [
    { classKey: 'class-7', subject: 'English' },
    { classKey: 'class-8', subject: 'English' },
    { classKey: 'class-9', subject: 'English' },
    { classKey: 'class-10', subject: 'English' }
  ],

  // =========================================================================
  // CLASS 9 (SSC-I / MATRIC PART 1 — SEPARATE PHYSICS, CHEMISTRY, BIOLOGY)
  // =========================================================================
  // Physics (Class 9)
  'sim-vernier-micrometer-simulation': [
    { classKey: 'class-8', subject: 'Science' },
    { classKey: 'class-9', subject: 'Physics' }
  ],
  'sim-kinematics': [
    { classKey: 'class-9', subject: 'Physics' }
  ],
  'sim-kinematics-simulation': [
    { classKey: 'class-9', subject: 'Physics' }
  ],
  'sim-projectile-motion-gravity': [
    { classKey: 'class-9', subject: 'Physics' }
  ],
  'sim-newtons-laws': [
    { classKey: 'class-8', subject: 'Science' },
    { classKey: 'class-9', subject: 'Physics' }
  ],
  'sim-newtons-first-law-simulation': [
    { classKey: 'class-8', subject: 'Science' },
    { classKey: 'class-9', subject: 'Physics' }
  ],
  'sim-newtons-second-law-simulation': [
    { classKey: 'class-8', subject: 'Science' },
    { classKey: 'class-9', subject: 'Physics' }
  ],
  'sim-newtons-third-law-simulation': [
    { classKey: 'class-8', subject: 'Science' },
    { classKey: 'class-9', subject: 'Physics' }
  ],
  'sim-atwood-machine-simulation': [
    { classKey: 'class-9', subject: 'Physics' }
  ],
  'sim-torque-seesaw-lab': [
    { classKey: 'class-9', subject: 'Physics' }
  ],
  'sim-planetary-motion-keplers-laws': [
    { classKey: 'class-9', subject: 'Physics' }
  ],
  'sim-black-hole-explorer': [
    { classKey: 'class-9', subject: 'Physics' }
  ],
  'sim-hookes-law-lab': [
    { classKey: 'class-8', subject: 'Science' },
    { classKey: 'class-9', subject: 'Physics' }
  ],
  'sim-pascals-principle-hydraulic-lift': [
    { classKey: 'class-8', subject: 'Science' },
    { classKey: 'class-9', subject: 'Physics' }
  ],

  // Chemistry (Class 9)
  'sim-rutherford-bohr-atomic-models': [
    { classKey: 'class-7', subject: 'Science' },
    { classKey: 'class-9', subject: 'Chemistry' }
  ],
  'sim-electronic-configuration-aufbau': [
    { classKey: 'class-8', subject: 'Science' },
    { classKey: 'class-9', subject: 'Chemistry' }
  ],
  'sim-interactive-periodic-table-elements': [
    { classKey: 'class-7', subject: 'Science' },
    { classKey: 'class-8', subject: 'Science' },
    { classKey: 'class-9', subject: 'Chemistry' }
  ],
  'sim-chemical-bonding-studio': [
    { classKey: 'class-7', subject: 'Science' },
    { classKey: 'class-8', subject: 'Science' },
    { classKey: 'class-9', subject: 'Chemistry' }
  ],
  'sim-intermolecular-forces-simulation': [
    { classKey: 'class-9', subject: 'Chemistry' }
  ],
  'sim-charles-law-lab': [
    { classKey: 'class-9', subject: 'Chemistry' }
  ],
  'sim-gas-laws-boyles-charles': [
    { classKey: 'class-9', subject: 'Chemistry' }
  ],
  'sim-ideal-gas-laws': [
    { classKey: 'class-9', subject: 'Chemistry' }
  ],
  'sim-electrochemistry-lab': [
    { classKey: 'class-9', subject: 'Chemistry' }
  ],

  // Biology (Class 9)
  'sim-biology-branches-classification': [
    { classKey: 'class-8', subject: 'Science' },
    { classKey: 'class-9', subject: 'Biology' }
  ],
  'sim-plant-vs-animal-cell-simulation': [
    { classKey: 'class-6', subject: 'Science' },
    { classKey: 'class-7', subject: 'Science' },
    { classKey: 'class-9', subject: 'Biology' }
  ],
  'sim-photosynthesis-chloroplast-engine': [
    { classKey: 'class-7', subject: 'Science' },
    { classKey: 'class-9', subject: 'Biology' }
  ],
  'sim-photosynthesis-simulation': [
    { classKey: 'class-6', subject: 'Science' },
    { classKey: 'class-7', subject: 'Science' },
    { classKey: 'class-9', subject: 'Biology' }
  ],
  'sim-human-heart-circulation-lab': [
    { classKey: 'class-7', subject: 'Science' },
    { classKey: 'class-9', subject: 'Biology' }
  ],
  'sim-blood-group-picture-simulation': [
    { classKey: 'class-9', subject: 'Biology' },
    { classKey: 'class-10', subject: 'Biology' }
  ],
  'sim-blood-group-simulation': [
    { classKey: 'class-9', subject: 'Biology' },
    { classKey: 'class-10', subject: 'Biology' }
  ],
  'sim-transpiration-water-transport-simulation': [
    { classKey: 'class-7', subject: 'Science' },
    { classKey: 'class-9', subject: 'Biology' }
  ],

  // Computer Science (Class 9)
  'sim-logic-gates-binary-circuit-builder': [
    { classKey: 'class-8', subject: 'Computer Science' },
    { classKey: 'class-9', subject: 'Computer Science' },
    { classKey: 'class-10', subject: 'Physics' }
  ],

  // =========================================================================
  // CLASS 10 (SSC-II / MATRIC PART 2 — SEPARATE PHYSICS, CHEMISTRY, BIOLOGY)
  // =========================================================================
  // Physics (Class 10)
  'sim-pendulum-harmonic-motion': [
    { classKey: 'class-10', subject: 'Physics' }
  ],
  'sim-simple-pendulum-simulation': [
    { classKey: 'class-10', subject: 'Physics' }
  ],
  'sim-wave-optics-double-slit': [
    { classKey: 'class-10', subject: 'Physics' }
  ],
  'sim-sound-waves-doppler': [
    { classKey: 'class-10', subject: 'Physics' }
  ],
  'sim-doppler-effect-sound-observers': [
    { classKey: 'class-10', subject: 'Physics' }
  ],
  'sim-ohms-law': [
    { classKey: 'class-8', subject: 'Science' },
    { classKey: 'class-10', subject: 'Physics' }
  ],
  'sim-electromagnetic-induction-lab': [
    { classKey: 'class-8', subject: 'Science' },
    { classKey: 'class-10', subject: 'Physics' }
  ],
  'sim-dc-motor-ac-generator': [
    { classKey: 'class-10', subject: 'Physics' }
  ],
  'sim-nuclear-fission-fusion-halflife': [
    { classKey: 'class-10', subject: 'Physics' }
  ],
  'sim-special-relativity-lab': [
    { classKey: 'class-10', subject: 'Physics' }
  ],

  // Chemistry (Class 10)
  'sim-chemical-reaction-kinetics': [
    { classKey: 'class-10', subject: 'Chemistry' }
  ],
  'sim-theories-of-acids-and-bases': [
    { classKey: 'class-10', subject: 'Chemistry' }
  ],
  'sim-hydrocarbons-functional-groups-3d': [
    { classKey: 'class-10', subject: 'Chemistry' }
  ],

  // Biology (Class 10)
  'sim-mechanism-of-breathing-physiology': [
    { classKey: 'class-7', subject: 'Science' },
    { classKey: 'class-10', subject: 'Biology' }
  ],
  'sim-excretory-system-kidney-filtration': [
    { classKey: 'class-8', subject: 'Science' },
    { classKey: 'class-10', subject: 'Biology' }
  ],
  'sim-nervous-system-simulation': [
    { classKey: 'class-8', subject: 'Science' },
    { classKey: 'class-10', subject: 'Biology' }
  ],
  'sim-eye-structure-simulation': [
    { classKey: 'class-6', subject: 'Science' },
    { classKey: 'class-10', subject: 'Biology' }
  ],
  'sim-human-ear-structure-acoustics': [
    { classKey: 'class-6', subject: 'Science' },
    { classKey: 'class-10', subject: 'Biology' }
  ],
  'sim-bones-and-muscles-simulation': [
    { classKey: 'class-4', subject: 'Science' },
    { classKey: 'class-8', subject: 'Science' },
    { classKey: 'class-10', subject: 'Biology' }
  ],
  'sim-dna-genetics-punnett-square': [
    { classKey: 'class-8', subject: 'Science' },
    { classKey: 'class-10', subject: 'Biology' }
  ],
  'sim-dna-structure-genetics': [
    { classKey: 'class-8', subject: 'Science' },
    { classKey: 'class-10', subject: 'Biology' }
  ],
  'sim-immune-response-simulation': [
    { classKey: 'class-7', subject: 'Science' },
    { classKey: 'class-10', subject: 'Biology' }
  ],

  // Mathematics (Class 10)
  'sim-unit-circle-trigonometry': [
    { classKey: 'class-9', subject: 'Mathematics' },
    { classKey: 'class-10', subject: 'Mathematics' }
  ],

  // Computer Science (Class 10)
  'sim-logic-gates-circuit-designer': [
    { classKey: 'class-9', subject: 'Computer Science' },
    { classKey: 'class-10', subject: 'Computer Science' }
  ]
};

/**
 * Resolves all class & curriculum-subject placements for any SimulationItem
 * (including dynamically generated simulations as a safe fallback).
 */
export function getSimulationClassAssignments(sim: SimulationItem): ClassCurriculumAssignment[] {
  const mapped = SIMULATION_CLASS_MAPPING[sim.id];
  if (mapped && mapped.length > 0) return mapped;

  // Fallback for dynamically generated AI simulations
  switch (sim.category) {
    case 'Early Childhood (ECCE)':
      return [{ classKey: 'play-prep', subject: 'Early Childhood (ECCE)' }];
    case 'Physics & Motion':
      return [{ classKey: 'class-9', subject: 'Physics' }];
    case 'Chemistry & Matter':
      return [{ classKey: 'class-9', subject: 'Chemistry' }];
    case 'Biology & Life':
      return [{ classKey: 'class-9', subject: 'Biology' }];
    case 'Mathematics & Logic':
      return [{ classKey: 'class-8', subject: 'Mathematics' }];
    case 'Computer Science & IT':
      return [{ classKey: 'class-9', subject: 'Computer Science' }];
    case 'English & Grammar':
      return [{ classKey: 'class-6', subject: 'English' }];
    case 'Urdu & Linguistics':
      return [{ classKey: 'class-5', subject: 'Urdu' }];
    case 'Earth & Space':
    default:
      return [{ classKey: 'class-6', subject: 'Science' }];
  }
}

export function getSimulationClassAssignment(sim: SimulationItem): ClassCurriculumAssignment {
  return getSimulationClassAssignments(sim)[0];
}
