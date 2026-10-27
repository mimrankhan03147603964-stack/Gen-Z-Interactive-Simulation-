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

/**
 * Sequential 7-Color Palette extracted exactly from user's image:
 * WhatsApp Image 2026-10-27 at 12.39.38 PM.jpeg
 * 1. #1B1C2E - Deep Midnight Charcoal (Writing: White)
 * 2. #3A1F5D - Royal Deep Violet (Writing: White)
 * 3. #8B1E5F - Rich Magenta Berry (Writing: White)
 * 4. #E63946 - Vibrant Crimson Coral Red (Writing: White)
 * 5. #F4A261 - Warm Honey Amber Peach (Writing: Dark #1B1C2E as in image)
 * 6. #2A9D8F - Teal Sea Green (Writing: Dark #1B1C2E as in image)
 * 7. #E0F2F1 - Pale Mint Ice Cyan (Writing: Dark #1B1C2E as in image)
 */
export const SEQUENTIAL_PALETTE: CardPaletteTheme[] = [
  // 1. #1B1C2E (Deep Midnight Charcoal) - Writing: White
  {
    hex: '#1B1C2E',
    bg: '#1B1C2E',
    borderColor: '#3A1F5D',
    titleColor: '#FFFFFF',
    textColor: '#E0F2F1',
    accentColor: '#F4A261',
    badgeBg: '#E63946',
    badgeText: '#FFFFFF',
    badgeBorder: '#F4A261',
    btnBg: '#E63946',
    btnText: '#FFFFFF',
    btnBorder: '#FFA5A5',
    btnHoverBg: '#D62839',
    pedestalBg: '#3A1F5D',
    pedestalBorder: '#8B1E5F',
    tagBg: '#3A1F5D',
    tagText: '#FFFFFF',
    tagBorder: '#8B1E5F',
    actionIconBg: '#3A1F5D',
    actionIconText: '#FFFFFF',
    actionIconBorder: '#8B1E5F',
    isDark: true,
    boxShadow: '0 8px 24px rgba(27, 28, 46, 0.45)'
  },
  // 2. #3A1F5D (Royal Deep Violet) - Writing: White
  {
    hex: '#3A1F5D',
    bg: '#3A1F5D',
    borderColor: '#8B1E5F',
    titleColor: '#FFFFFF',
    textColor: '#E0F2F1',
    accentColor: '#F4A261',
    badgeBg: '#8B1E5F',
    badgeText: '#FFFFFF',
    badgeBorder: '#E63946',
    btnBg: '#8B1E5F',
    btnText: '#FFFFFF',
    btnBorder: '#E63946',
    btnHoverBg: '#70144B',
    pedestalBg: '#1B1C2E',
    pedestalBorder: '#8B1E5F',
    tagBg: '#1B1C2E',
    tagText: '#FFFFFF',
    tagBorder: '#8B1E5F',
    actionIconBg: '#1B1C2E',
    actionIconText: '#FFFFFF',
    actionIconBorder: '#8B1E5F',
    isDark: true,
    boxShadow: '0 8px 24px rgba(58, 31, 93, 0.45)'
  },
  // 3. #8B1E5F (Rich Magenta Berry) - Writing: White
  {
    hex: '#8B1E5F',
    bg: '#8B1E5F',
    borderColor: '#E63946',
    titleColor: '#FFFFFF',
    textColor: '#FDE8E9',
    accentColor: '#F4A261',
    badgeBg: '#1B1C2E',
    badgeText: '#FFFFFF',
    badgeBorder: '#F4A261',
    btnBg: '#1B1C2E',
    btnText: '#FFFFFF',
    btnBorder: '#F4A261',
    btnHoverBg: '#2A1A3D',
    pedestalBg: '#3A1F5D',
    pedestalBorder: '#F4A261',
    tagBg: '#3A1F5D',
    tagText: '#FFFFFF',
    tagBorder: '#E63946',
    actionIconBg: '#1B1C2E',
    actionIconText: '#FFFFFF',
    actionIconBorder: '#F4A261',
    isDark: true,
    boxShadow: '0 8px 24px rgba(139, 30, 95, 0.45)'
  },
  // 4. #E63946 (Vivid Crimson Coral Red) - Writing: White
  {
    hex: '#E63946',
    bg: '#E63946',
    borderColor: '#F4A261',
    titleColor: '#FFFFFF',
    textColor: '#FFFFFF',
    accentColor: '#E0F2F1',
    badgeBg: '#1B1C2E',
    badgeText: '#FFFFFF',
    badgeBorder: '#3A1F5D',
    btnBg: '#1B1C2E',
    btnText: '#FFFFFF',
    btnBorder: '#3A1F5D',
    btnHoverBg: '#3A1F5D',
    pedestalBg: '#1B1C2E',
    pedestalBorder: '#F4A261',
    tagBg: '#1B1C2E',
    tagText: '#FFFFFF',
    tagBorder: '#F4A261',
    actionIconBg: '#1B1C2E',
    actionIconText: '#FFFFFF',
    actionIconBorder: '#F4A261',
    isDark: true,
    boxShadow: '0 8px 24px rgba(230, 57, 70, 0.45)'
  },
  // 5. #F4A261 (Warm Honey Amber Peach) - Writing: Dark #1B1C2E
  {
    hex: '#F4A261',
    bg: '#F4A261',
    borderColor: '#E76F51',
    titleColor: '#1B1C2E',
    textColor: '#1B1C2E',
    accentColor: '#8B1E5F',
    badgeBg: '#1B1C2E',
    badgeText: '#FFFFFF',
    badgeBorder: '#3A1F5D',
    btnBg: '#1B1C2E',
    btnText: '#FFFFFF',
    btnBorder: '#3A1F5D',
    btnHoverBg: '#3A1F5D',
    pedestalBg: '#FFFFFF',
    pedestalBorder: '#E76F51',
    tagBg: '#FFFFFF',
    tagText: '#1B1C2E',
    tagBorder: '#E76F51',
    actionIconBg: '#FFFFFF',
    actionIconText: '#1B1C2E',
    actionIconBorder: '#E76F51',
    isDark: false,
    boxShadow: '0 8px 24px rgba(244, 162, 97, 0.45)'
  },
  // 6. #2A9D8F (Teal Sea Green) - Writing: Dark #1B1C2E
  {
    hex: '#2A9D8F',
    bg: '#2A9D8F',
    borderColor: '#21867A',
    titleColor: '#1B1C2E',
    textColor: '#1B1C2E',
    accentColor: '#1B1C2E',
    badgeBg: '#1B1C2E',
    badgeText: '#FFFFFF',
    badgeBorder: '#3A1F5D',
    btnBg: '#1B1C2E',
    btnText: '#FFFFFF',
    btnBorder: '#3A1F5D',
    btnHoverBg: '#3A1F5D',
    pedestalBg: '#E0F2F1',
    pedestalBorder: '#21867A',
    tagBg: '#E0F2F1',
    tagText: '#1B1C2E',
    tagBorder: '#21867A',
    actionIconBg: '#E0F2F1',
    actionIconText: '#1B1C2E',
    actionIconBorder: '#21867A',
    isDark: false,
    boxShadow: '0 8px 24px rgba(42, 157, 143, 0.45)'
  },
  // 7. #E0F2F1 (Pale Mint Ice Cyan) - Writing: Dark #1B1C2E
  {
    hex: '#E0F2F1',
    bg: '#E0F2F1',
    borderColor: '#B2DFDB',
    titleColor: '#1B1C2E',
    textColor: '#264653',
    accentColor: '#2A9D8F',
    badgeBg: '#2A9D8F',
    badgeText: '#FFFFFF',
    badgeBorder: '#21867A',
    btnBg: '#2A9D8F',
    btnText: '#FFFFFF',
    btnBorder: '#21867A',
    btnHoverBg: '#21867A',
    pedestalBg: '#FFFFFF',
    pedestalBorder: '#B2DFDB',
    tagBg: '#FFFFFF',
    tagText: '#1B1C2E',
    tagBorder: '#B2DFDB',
    actionIconBg: '#FFFFFF',
    actionIconText: '#1B1C2E',
    actionIconBorder: '#B2DFDB',
    isDark: false,
    boxShadow: '0 8px 24px rgba(42, 157, 143, 0.25)'
  }
];

export const getThemeForIndex = (index: number): CardPaletteTheme => {
  return SEQUENTIAL_PALETTE[Math.abs(index) % SEQUENTIAL_PALETTE.length];
};
