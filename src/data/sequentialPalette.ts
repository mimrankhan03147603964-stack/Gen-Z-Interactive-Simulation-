export interface CardPaletteTheme {
  hex: string;
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

export const SEQUENTIAL_PALETTE: CardPaletteTheme[] = [
  // 1. #0F172A (Deep Midnight Slate)
  {
    hex: '#0F172A',
    bg: '#0F172A',
    borderColor: '#334155',
    titleColor: '#FFFFFF',
    textColor: '#E2E8F0',
    accentColor: '#60A5FA',
    badgeBg: '#2563EB',
    badgeText: '#FFFFFF',
    badgeBorder: '#60A5FA',
    btnBg: '#2563EB',
    btnText: '#FFFFFF',
    btnBorder: '#60A5FA',
    btnHoverBg: '#1D4ED8',
    pedestalBg: '#1E293B',
    pedestalBorder: '#475569',
    tagBg: '#1E293B',
    tagText: '#E2E8F0',
    tagBorder: '#334155',
    actionIconBg: '#1E293B',
    actionIconText: '#60A5FA',
    actionIconBorder: '#334155',
    isDark: true,
    boxShadow: '0 8px 24px rgba(15, 23, 42, 0.45)'
  },
  // 2. #1E293B (Dark Navy Slate)
  {
    hex: '#1E293B',
    bg: '#1E293B',
    borderColor: '#475569',
    titleColor: '#FFFFFF',
    textColor: '#E2E8F0',
    accentColor: '#818CF8',
    badgeBg: '#4F46E5',
    badgeText: '#FFFFFF',
    badgeBorder: '#818CF8',
    btnBg: '#4F46E5',
    btnText: '#FFFFFF',
    btnBorder: '#818CF8',
    btnHoverBg: '#4338CA',
    pedestalBg: '#0F172A',
    pedestalBorder: '#334155',
    tagBg: '#0F172A',
    tagText: '#E2E8F0',
    tagBorder: '#475569',
    actionIconBg: '#0F172A',
    actionIconText: '#818CF8',
    actionIconBorder: '#475569',
    isDark: true,
    boxShadow: '0 8px 24px rgba(30, 41, 59, 0.45)'
  },
  // 3. #2563EB (Royal Electric Blue)
  {
    hex: '#2563EB',
    bg: '#2563EB',
    borderColor: '#60A5FA',
    titleColor: '#FFFFFF',
    textColor: '#F8FAFC',
    accentColor: '#E0E7FF',
    badgeBg: '#0F172A',
    badgeText: '#FFFFFF',
    badgeBorder: '#334155',
    btnBg: '#0F172A',
    btnText: '#FFFFFF',
    btnBorder: '#334155',
    btnHoverBg: '#1E293B',
    pedestalBg: '#1E293B',
    pedestalBorder: '#93C5FD',
    tagBg: '#1D4ED8',
    tagText: '#FFFFFF',
    tagBorder: '#93C5FD',
    actionIconBg: '#0F172A',
    actionIconText: '#FFFFFF',
    actionIconBorder: '#334155',
    isDark: true,
    boxShadow: '0 8px 24px rgba(37, 99, 235, 0.45)'
  },
  // 4. #4F46E5 (Deep Vibrant Indigo)
  {
    hex: '#4F46E5',
    bg: '#4F46E5',
    borderColor: '#818CF8',
    titleColor: '#FFFFFF',
    textColor: '#F8FAFC',
    accentColor: '#E0E7FF',
    badgeBg: '#0F172A',
    badgeText: '#FFFFFF',
    badgeBorder: '#334155',
    btnBg: '#0F172A',
    btnText: '#FFFFFF',
    btnBorder: '#334155',
    btnHoverBg: '#1E293B',
    pedestalBg: '#1E293B',
    pedestalBorder: '#C7D2FE',
    tagBg: '#4338CA',
    tagText: '#FFFFFF',
    tagBorder: '#C7D2FE',
    actionIconBg: '#0F172A',
    actionIconText: '#FFFFFF',
    actionIconBorder: '#334155',
    isDark: true,
    boxShadow: '0 8px 24px rgba(79, 70, 229, 0.45)'
  },
  // 5. #64748B (Steel Slate Gray)
  {
    hex: '#64748B',
    bg: '#64748B',
    borderColor: '#94A3B8',
    titleColor: '#FFFFFF',
    textColor: '#F8FAFC',
    accentColor: '#E2E8F0',
    badgeBg: '#0F172A',
    badgeText: '#FFFFFF',
    badgeBorder: '#1E293B',
    btnBg: '#0F172A',
    btnText: '#FFFFFF',
    btnBorder: '#1E293B',
    btnHoverBg: '#1E293B',
    pedestalBg: '#1E293B',
    pedestalBorder: '#CBD5E1',
    tagBg: '#475569',
    tagText: '#FFFFFF',
    tagBorder: '#94A3B8',
    actionIconBg: '#0F172A',
    actionIconText: '#FFFFFF',
    actionIconBorder: '#1E293B',
    isDark: true,
    boxShadow: '0 8px 24px rgba(100, 116, 139, 0.45)'
  },
  // 6. #E2E8F0 (Soft Pale Slate)
  {
    hex: '#E2E8F0',
    bg: '#E2E8F0',
    borderColor: '#CBD5E1',
    titleColor: '#0F172A',
    textColor: '#334155',
    accentColor: '#2563EB',
    badgeBg: '#2563EB',
    badgeText: '#FFFFFF',
    badgeBorder: '#1D4ED8',
    btnBg: '#2563EB',
    btnText: '#FFFFFF',
    btnBorder: '#1D4ED8',
    btnHoverBg: '#1D4ED8',
    pedestalBg: '#FFFFFF',
    pedestalBorder: '#CBD5E1',
    tagBg: '#FFFFFF',
    tagText: '#0F172A',
    tagBorder: '#CBD5E1',
    actionIconBg: '#FFFFFF',
    actionIconText: '#0F172A',
    actionIconBorder: '#CBD5E1',
    isDark: false,
    boxShadow: '0 8px 24px rgba(15, 23, 42, 0.12)'
  },
  // 7. #F8FAFC (Clean Off-White Slate)
  {
    hex: '#F8FAFC',
    bg: '#F8FAFC',
    borderColor: '#E2E8F0',
    titleColor: '#0F172A',
    textColor: '#475569',
    accentColor: '#4F46E5',
    badgeBg: '#4F46E5',
    badgeText: '#FFFFFF',
    badgeBorder: '#4338CA',
    btnBg: '#4F46E5',
    btnText: '#FFFFFF',
    btnBorder: '#4338CA',
    btnHoverBg: '#4338CA',
    pedestalBg: '#FFFFFF',
    pedestalBorder: '#E2E8F0',
    tagBg: '#E2E8F0',
    tagText: '#0F172A',
    tagBorder: '#CBD5E1',
    actionIconBg: '#FFFFFF',
    actionIconText: '#0F172A',
    actionIconBorder: '#CBD5E1',
    isDark: false,
    boxShadow: '0 8px 24px rgba(15, 23, 42, 0.12)'
  }
];

export const getThemeForIndex = (index: number): CardPaletteTheme => {
  return SEQUENTIAL_PALETTE[index % SEQUENTIAL_PALETTE.length];
};
