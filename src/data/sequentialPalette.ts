export interface CardPaletteTheme {
  hex: string;
  headerGradient: string;
  headerColor: string;
  headerColorLight: string;
  bg: string;
  borderColor: string;
  titleColor: string;
  textColor: string;
  accentColor: string;
  badgeBg: string;
  badgeText: string;
  badgeBorder: string;
  btnBg: string;
  btnText: string;
  btnBorder: string;
  btnHoverBg: string;
  pedestalBg: string;
  pedestalBorder: string;
  tagBg: string;
  tagText: string;
  tagBorder: string;
  actionIconBg: string;
  actionIconText: string;
  actionIconBorder: string;
  isDark: boolean;
  boxShadow: string;
}

/**
 * Shell Card Palette Mappings based on Role Guide:
 * - Card body: white (#FFFFFF)
 * - Shadow: rgba(27,42,92,0.16)
 * - Card title: --title-blue (#1565C0)
 * - Description / body text: --text-soft (#3B4A73)
 * - Category / group cycles:
 *   0: Student / Science: --blue (#1E88E5) to --blue-light (#42A5F5)
 *   1: Teacher / Maths & CS: --dark-blue (#1546A8) to --dark-blue-light (#2D62D1)
 *   2: School / ECCE & Language: --red (#E53935) to --red-light (#EF5350)
 *   3: Educator / General: --gold-dark (#E58E0A) to --gold (#F5A623)
 */
export const SEQUENTIAL_PALETTE: CardPaletteTheme[] = [
  // 0. Science / Student (Blue: #1E88E5 to #42A5F5)
  {
    hex: '#1E88E5',
    headerGradient: 'linear-gradient(135deg, #1E88E5 0%, #42A5F5 100%)',
    headerColor: '#1E88E5',
    headerColorLight: '#42A5F5',
    bg: '#FFFFFF',
    borderColor: '#DDE5F3',
    titleColor: '#1565C0',
    textColor: '#3B4A73',
    accentColor: '#1E88E5',
    badgeBg: '#1E88E5',
    badgeText: '#FFFFFF',
    badgeBorder: '#42A5F5',
    btnBg: '#1E88E5',
    btnText: '#FFFFFF',
    btnBorder: '#1546A8',
    btnHoverBg: '#1546A8',
    pedestalBg: '#EEF3F9',
    pedestalBorder: '#DDE5F3',
    tagBg: '#EEF3F9',
    tagText: '#1B2A5C',
    tagBorder: '#DDE5F3',
    actionIconBg: '#EEF3F9',
    actionIconText: '#1B2A5C',
    actionIconBorder: '#DDE5F3',
    isDark: false,
    boxShadow: '0 8px 24px rgba(27, 42, 92, 0.16)'
  },
  // 1. Maths & CS / Teacher (Dark Blue: #1546A8 to #2D62D1)
  {
    hex: '#1546A8',
    headerGradient: 'linear-gradient(135deg, #1546A8 0%, #2D62D1 100%)',
    headerColor: '#1546A8',
    headerColorLight: '#2D62D1',
    bg: '#FFFFFF',
    borderColor: '#DDE5F3',
    titleColor: '#1565C0',
    textColor: '#3B4A73',
    accentColor: '#1546A8',
    badgeBg: '#1546A8',
    badgeText: '#FFFFFF',
    badgeBorder: '#2D62D1',
    btnBg: '#1546A8',
    btnText: '#FFFFFF',
    btnBorder: '#1B2A5C',
    btnHoverBg: '#1E88E5',
    pedestalBg: '#EEF3F9',
    pedestalBorder: '#DDE5F3',
    tagBg: '#EEF3F9',
    tagText: '#1B2A5C',
    tagBorder: '#DDE5F3',
    actionIconBg: '#EEF3F9',
    actionIconText: '#1B2A5C',
    actionIconBorder: '#DDE5F3',
    isDark: false,
    boxShadow: '0 8px 24px rgba(27, 42, 92, 0.16)'
  },
  // 2. School / Early Childhood & Language (Red: #E53935 to #EF5350)
  {
    hex: '#E53935',
    headerGradient: 'linear-gradient(135deg, #E53935 0%, #EF5350 100%)',
    headerColor: '#E53935',
    headerColorLight: '#EF5350',
    bg: '#FFFFFF',
    borderColor: '#DDE5F3',
    titleColor: '#1565C0',
    textColor: '#3B4A73',
    accentColor: '#E53935',
    badgeBg: '#E53935',
    badgeText: '#FFFFFF',
    badgeBorder: '#EF5350',
    btnBg: '#E53935',
    btnText: '#FFFFFF',
    btnBorder: '#B71C1C',
    btnHoverBg: '#EF5350',
    pedestalBg: '#EEF3F9',
    pedestalBorder: '#DDE5F3',
    tagBg: '#EEF3F9',
    tagText: '#1B2A5C',
    tagBorder: '#DDE5F3',
    actionIconBg: '#EEF3F9',
    actionIconText: '#1B2A5C',
    actionIconBorder: '#DDE5F3',
    isDark: false,
    boxShadow: '0 8px 24px rgba(27, 42, 92, 0.16)'
  },
  // 3. Educator / General / Main-page (Gold: #E58E0A to #F5A623)
  {
    hex: '#F5A623',
    headerGradient: 'linear-gradient(135deg, #E58E0A 0%, #F5A623 100%)',
    headerColor: '#E58E0A',
    headerColorLight: '#F5A623',
    bg: '#FFFFFF',
    borderColor: '#DDE5F3',
    titleColor: '#1565C0',
    textColor: '#3B4A73',
    accentColor: '#E58E0A',
    badgeBg: '#F5A623',
    badgeText: '#1B2A5C',
    badgeBorder: '#E58E0A',
    btnBg: '#F5A623',
    btnText: '#1B2A5C',
    btnBorder: '#E58E0A',
    btnHoverBg: '#E58E0A',
    pedestalBg: '#EEF3F9',
    pedestalBorder: '#DDE5F3',
    tagBg: '#EEF3F9',
    tagText: '#1B2A5C',
    tagBorder: '#DDE5F3',
    actionIconBg: '#EEF3F9',
    actionIconText: '#1B2A5C',
    actionIconBorder: '#DDE5F3',
    isDark: false,
    boxShadow: '0 8px 24px rgba(27, 42, 92, 0.16)'
  }
];

export const getThemeForCategory = (category: string): CardPaletteTheme => {
  switch (category) {
    case 'Physics & Motion':
    case 'Chemistry & Matter':
    case 'Biology & Life':
    case 'Earth & Space':
      return SEQUENTIAL_PALETTE[0]; // Science: Blue
    case 'Mathematics & Logic':
    case 'Computer Science & IT':
      return SEQUENTIAL_PALETTE[1]; // Maths & CS: Dark Blue
    case 'English & Grammar':
    case 'Early Childhood (ECCE)':
    case 'Urdu & Linguistics':
      return SEQUENTIAL_PALETTE[2]; // School / Language / ECCE: Red
    default:
      return SEQUENTIAL_PALETTE[3]; // Educator / General: Gold
  }
};

export const getThemeForIndex = (index: number, category?: string): CardPaletteTheme => {
  if (category) {
    return getThemeForCategory(category);
  }
  return SEQUENTIAL_PALETTE[Math.abs(index) % SEQUENTIAL_PALETTE.length];
};

/**
 * 16 Deep, High-Contrast Distinct Gradients for "Launch Lab" Card Action Buttons
 * Guaranteed high contrast against crisp pure white (#FFFFFF) text.
 * No light, white, or pastel tones so text never matches or washes out.
 */
export interface LaunchBtnStyle {
  bg: string;
  shadow: string;
}

export const CARD_LAUNCH_BTN_PALETTES: LaunchBtnStyle[] = [
  { bg: 'linear-gradient(135deg, #0284C7 0%, #0369A1 100%)', shadow: '0 4px 14px rgba(2, 132, 199, 0.38)' }, // Royal Azure
  { bg: 'linear-gradient(135deg, #059669 0%, #047857 100%)', shadow: '0 4px 14px rgba(5, 150, 105, 0.38)' }, // Emerald
  { bg: 'linear-gradient(135deg, #7C3AED 0%, #6D28D9 100%)', shadow: '0 4px 14px rgba(124, 58, 237, 0.38)' }, // Deep Violet
  { bg: 'linear-gradient(135deg, #DC2626 0%, #B91C1C 100%)', shadow: '0 4px 14px rgba(220, 38, 38, 0.38)' }, // Crimson
  { bg: 'linear-gradient(135deg, #0D9488 0%, #0F766E 100%)', shadow: '0 4px 14px rgba(13, 148, 136, 0.38)' }, // Deep Teal
  { bg: 'linear-gradient(135deg, #EA580C 0%, #C2410C 100%)', shadow: '0 4px 14px rgba(234, 88, 12, 0.38)' }, // Burnt Orange
  { bg: 'linear-gradient(135deg, #4F46E5 0%, #4338CA 100%)', shadow: '0 4px 14px rgba(79, 70, 229, 0.38)' }, // Indigo Blue
  { bg: 'linear-gradient(135deg, #C026D3 0%, #A21CAF 100%)', shadow: '0 4px 14px rgba(192, 38, 211, 0.38)' }, // Vivid Magenta
  { bg: 'linear-gradient(135deg, #0891B2 0%, #0E7490 100%)', shadow: '0 4px 14px rgba(8, 145, 178, 0.38)' }, // Deep Cyan
  { bg: 'linear-gradient(135deg, #16A34A 0%, #15803D 100%)', shadow: '0 4px 14px rgba(22, 163, 74, 0.38)' }, // Forest Green
  { bg: 'linear-gradient(135deg, #E11D48 0%, #BE123C 100%)', shadow: '0 4px 14px rgba(225, 29, 72, 0.38)' }, // Carmine Ruby
  { bg: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)', shadow: '0 4px 14px rgba(37, 99, 235, 0.38)' }, // Cobalt Sapphire
  { bg: 'linear-gradient(135deg, #9333EA 0%, #7E22CE 100%)', shadow: '0 4px 14px rgba(147, 51, 234, 0.38)' }, // Dark Plum
  { bg: 'linear-gradient(135deg, #D97706 0%, #B45309 100%)', shadow: '0 4px 14px rgba(217, 119, 6, 0.38)' }, // Dark Amber Bronze
  { bg: 'linear-gradient(135deg, #1E40AF 0%, #1E3A8A 100%)', shadow: '0 4px 14px rgba(30, 64, 175, 0.38)' }, // Midnight Navy
  { bg: 'linear-gradient(135deg, #047857 0%, #065F46 100%)', shadow: '0 4px 14px rgba(4, 120, 87, 0.38)' }, // Deep Jade
];

export const getLaunchBtnStyle = (index: number): LaunchBtnStyle => {
  return CARD_LAUNCH_BTN_PALETTES[Math.abs(index) % CARD_LAUNCH_BTN_PALETTES.length];
};

