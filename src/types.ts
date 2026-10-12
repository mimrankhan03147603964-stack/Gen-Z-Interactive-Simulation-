export interface SimulationItem {
  id: string;
  slug: string;
  indexNumber: string; // e.g. "01", "02"
  title: string;
  subject: string;
  category: 'Physics & Motion' | 'Chemistry & Matter' | 'Biology & Life' | 'Earth & Space' | 'Mathematics & Logic' | 'Computer Science & IT' | 'English & Grammar' | 'Early Childhood (ECCE)';
  description: string;
  fileUrl: string;
  thumbnail?: string;
  iconName: string;
  accentColor: string;
  gradient?: string;
  glowColor?: string;
  topics: string[];
  features: string[];
  gradeLevel: string;
}

export type CategoryFilter = 'All Simulations' | 'Physics & Motion' | 'Chemistry & Matter' | 'Biology & Life' | 'Earth & Space' | 'Mathematics & Logic' | 'Computer Science & IT' | 'English & Grammar' | 'Early Childhood (ECCE)';

