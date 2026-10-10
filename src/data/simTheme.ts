export interface SimColorConfig {
  id: string;
  name: string;
  bgSolid: string;
  bgGradient: string;
  borderColor: string;
  iconBg: string;
  iconBorder: string;
  iconColor: string;
  badgeBg: string;
  badgeText: string;
  badgeBorder: string;
  tagBg: string;
  tagText: string;
  glowColor: string;
}

export const SIM_COLOR_CONFIGS: Record<string, SimColorConfig> = {
  '01': {
    id: '01',
    name: 'Breathing Process',
    bgSolid: '#059669',
    bgGradient: 'linear-gradient(135deg, #10b981 0%, #047857 100%)',
    borderColor: '#34d399',
    iconBg: '#059669',
    iconBorder: '#6ee7b7',
    iconColor: '#ffffff',
    badgeBg: '#d1fae5',
    badgeText: '#065f46',
    badgeBorder: '#6ee7b7',
    tagBg: '#ecfdf5',
    tagText: '#047857',
    glowColor: 'rgba(16, 185, 129, 0.4)'
  },
  '02': {
    id: '02',
    name: 'Atoms & Waves',
    bgSolid: '#0284c7',
    bgGradient: 'linear-gradient(135deg, #0ea5e9 0%, #0369a1 100%)',
    borderColor: '#38bdf8',
    iconBg: '#0284c7',
    iconBorder: '#7dd3fc',
    iconColor: '#ffffff',
    badgeBg: '#e0f2fe',
    badgeText: '#0369a1',
    badgeBorder: '#7dd3fc',
    tagBg: '#f0f9ff',
    tagText: '#0284c7',
    glowColor: 'rgba(14, 165, 233, 0.4)'
  },
  '03': {
    id: '03',
    name: 'Electricity & Circuits',
    bgSolid: '#d97706',
    bgGradient: 'linear-gradient(135deg, #f59e0b 0%, #b45309 100%)',
    borderColor: '#fbbf24',
    iconBg: '#d97706',
    iconBorder: '#fde68a',
    iconColor: '#ffffff',
    badgeBg: '#fef3c7',
    badgeText: '#92400e',
    badgeBorder: '#fcd34d',
    tagBg: '#fffbeb',
    tagText: '#b45309',
    glowColor: 'rgba(245, 158, 11, 0.4)'
  },
  '04': {
    id: '04',
    name: 'Heat & Temperature',
    bgSolid: '#e11d48',
    bgGradient: 'linear-gradient(135deg, #f43f5e 0%, #be123c 100%)',
    borderColor: '#fb7185',
    iconBg: '#e11d48',
    iconBorder: '#fecdd3',
    iconColor: '#ffffff',
    badgeBg: '#ffe4e6',
    badgeText: '#9f1239',
    badgeBorder: '#fda4af',
    tagBg: '#fff1f2',
    tagText: '#be123c',
    glowColor: 'rgba(244, 63, 94, 0.4)'
  },
  '05': {
    id: '05',
    name: 'Kinematics',
    bgSolid: '#2563eb',
    bgGradient: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
    borderColor: '#60a5fa',
    iconBg: '#2563eb',
    iconBorder: '#93c5fd',
    iconColor: '#ffffff',
    badgeBg: '#dbeafe',
    badgeText: '#1e40af',
    badgeBorder: '#93c5fd',
    tagBg: '#eff6ff',
    tagText: '#1d4ed8',
    glowColor: 'rgba(59, 130, 246, 0.4)'
  },
  '06': {
    id: '06',
    name: 'Light & Shadows',
    bgSolid: '#ca8a04',
    bgGradient: 'linear-gradient(135deg, #eab308 0%, #a16207 100%)',
    borderColor: '#fde047',
    iconBg: '#ca8a04',
    iconBorder: '#fef08a',
    iconColor: '#ffffff',
    badgeBg: '#fef9c3',
    badgeText: '#854d0e',
    badgeBorder: '#fde047',
    tagBg: '#fefce8',
    tagText: '#a16207',
    glowColor: 'rgba(234, 179, 8, 0.4)'
  },
  '07': {
    id: '07',
    name: 'Living Things',
    bgSolid: '#0d9488',
    bgGradient: 'linear-gradient(135deg, #14b8a6 0%, #0f766e 100%)',
    borderColor: '#5eead4',
    iconBg: '#0d9488',
    iconBorder: '#99f6e4',
    iconColor: '#ffffff',
    badgeBg: '#ccfbf1',
    badgeText: '#115e59',
    badgeBorder: '#5eead4',
    tagBg: '#f0fdf4',
    tagText: '#0f766e',
    glowColor: 'rgba(20, 184, 166, 0.4)'
  },
  '08': {
    id: '08',
    name: 'Mixtures & Solutions',
    bgSolid: '#4f46e5',
    bgGradient: 'linear-gradient(135deg, #6366f1 0%, #4338ca 100%)',
    borderColor: '#818cf8',
    iconBg: '#4f46e5',
    iconBorder: '#c7d2fe',
    iconColor: '#ffffff',
    badgeBg: '#e0e7ff',
    badgeText: '#3730a3',
    badgeBorder: '#a5b4fc',
    tagBg: '#eef2ff',
    tagText: '#4338ca',
    glowColor: 'rgba(99, 102, 241, 0.4)'
  },
  '09': {
    id: '09',
    name: 'Newtons Laws',
    bgSolid: '#7c3aed',
    bgGradient: 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)',
    borderColor: '#a78bfa',
    iconBg: '#7c3aed',
    iconBorder: '#ddd6fe',
    iconColor: '#ffffff',
    badgeBg: '#ede9fe',
    badgeText: '#5b21b6',
    badgeBorder: '#c4b5fd',
    tagBg: '#f5f3ff',
    tagText: '#6d28d9',
    glowColor: 'rgba(139, 92, 246, 0.4)'
  },
  '10': {
    id: '10',
    name: 'Ohms Law',
    bgSolid: '#0284c7',
    bgGradient: 'linear-gradient(135deg, #0ea5e9 0%, #0369a1 100%)',
    borderColor: '#38bdf8',
    iconBg: '#0284c7',
    iconBorder: '#bae6fd',
    iconColor: '#ffffff',
    badgeBg: '#e0f2fe',
    badgeText: '#0369a1',
    badgeBorder: '#7dd3fc',
    tagBg: '#f0f9ff',
    tagText: '#0369a1',
    glowColor: 'rgba(14, 165, 233, 0.4)'
  },
  '11': {
    id: '11',
    name: 'Photosynthesis',
    bgSolid: '#65a30d',
    bgGradient: 'linear-gradient(135deg, #84cc16 0%, #4d7c0f 100%)',
    borderColor: '#a3e635',
    iconBg: '#65a30d',
    iconBorder: '#d9f99d',
    iconColor: '#ffffff',
    badgeBg: '#ecfccb',
    badgeText: '#3f6212',
    badgeBorder: '#bef264',
    tagBg: '#f7fee7',
    tagText: '#4d7c0f',
    glowColor: 'rgba(132, 204, 22, 0.4)'
  },
  '12': {
    id: '12',
    name: 'Simple Machines',
    bgSolid: '#ea580c',
    bgGradient: 'linear-gradient(135deg, #f97316 0%, #c2410c 100%)',
    borderColor: '#fb923c',
    iconBg: '#ea580c',
    iconBorder: '#fed7aa',
    iconColor: '#ffffff',
    badgeBg: '#ffedd5',
    badgeText: '#9a3412',
    badgeBorder: '#fdba74',
    tagBg: '#fff7ed',
    tagText: '#c2410c',
    glowColor: 'rgba(249, 115, 22, 0.4)'
  },
  '13': {
    id: '13',
    name: 'States of Matter',
    bgSolid: '#c026d3',
    bgGradient: 'linear-gradient(135deg, #d946ef 0%, #a21caf 100%)',
    borderColor: '#e879f9',
    iconBg: '#c026d3',
    iconBorder: '#f5d0fe',
    iconColor: '#ffffff',
    badgeBg: '#fae8ff',
    badgeText: '#86198f',
    badgeBorder: '#f0abfc',
    tagBg: '#fdf4ff',
    tagText: '#a21caf',
    glowColor: 'rgba(217, 70, 239, 0.4)'
  },
  '14': {
    id: '14',
    name: 'Earth & Space',
    bgSolid: '#1d4ed8',
    bgGradient: 'linear-gradient(135deg, #2563eb 0%, #1e3a8a 100%)',
    borderColor: '#60a5fa',
    iconBg: '#1d4ed8',
    iconBorder: '#bfdbfe',
    iconColor: '#ffffff',
    badgeBg: '#dbeafe',
    badgeText: '#1e40af',
    badgeBorder: '#93c5fd',
    tagBg: '#eff6ff',
    tagText: '#1e3a8a',
    glowColor: 'rgba(37, 99, 235, 0.4)'
  }
};

export const getSimTheme = (indexNumber: string): SimColorConfig => {
  return SIM_COLOR_CONFIGS[indexNumber] || SIM_COLOR_CONFIGS['01'];
};
