import { Dimensions } from 'react-native';

export const SCREEN_WIDTH = Dimensions.get('window').width;

// ── Colors ──────────────────────────────────────────────────────────────────
export const colors = {
  primary: '#9A85FE',
  primaryLight: '#9A85FE33',
  primaryText: '#9A85FECC',
  black: '#0F0F0F',
  blackMid: '#0F0F0F80',
  blackLight: '#0F0F0F40',
  text: '#1A1A1A',
  textMid: '#3A3A3A',
  textLight: '#555',
  textMuted: '#888',
  white: '#FFFFFF',
  divider: '#00000020',

  // Card backgrounds
  cardOrange: '#FFDBA7',
  cardPurple: '#EBCFFF',
  cardGreen: '#E9FFDB',
  cardYellow: '#FFF6BF',
  cardBlue: '#CBECFF',
  cardPink: '#FFDBE7',
  cardPeach: '#FFD4C4',
};

// ── Typography ───────────────────────────────────────────────────────────────
export const typography = {
  h1: {
    fontFamily: 'SF-Pro-Display',
    fontWeight: '700' as const,
    fontSize: 24,
    lineHeight: 30,
    color: colors.text,
  },
  h2: {
    fontFamily: 'SF-Pro-Display',
    fontWeight: '600' as const,
    fontSize: 20,
    lineHeight: 26,
    color: colors.text,
  },
  h3: {
    fontFamily: 'SF-Pro-Display',
    fontWeight: '500' as const,
    fontSize: 18,
    lineHeight: 24,
    color: colors.text,
  },
  h4: {
    fontFamily: 'SF-Pro-Display',
    fontWeight: '500' as const,
    fontSize: 16,
    lineHeight: 22,
    color: colors.text,
  },
  body: {
    fontFamily: 'SF-Pro-Display',
    fontWeight: '400' as const,
    fontSize: 14,
    lineHeight: 20,
    color: colors.textLight,
  },
  bodySmall: {
    fontFamily: 'SF-Pro-Display',
    fontWeight: '400' as const,
    fontSize: 12,
    lineHeight: 17,
    color: colors.textLight,
  },
  caption: {
    fontFamily: 'SF-Pro-Display',
    fontWeight: '400' as const,
    fontSize: 10,
    lineHeight: 14,
    color: colors.textMuted,
  },
  label: {
    fontFamily: 'SF-Pro-Display',
    fontWeight: '500' as const,
    fontSize: 13,
    lineHeight: 18,
    color: colors.text,
  },
};

// ── Spacing ──────────────────────────────────────────────────────────────────
export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
};

// ── Border Radius ────────────────────────────────────────────────────────────
export const radius = {
  sm: 6,
  md: 10,
  lg: 14,
  xl: 20,
  pill: 60,
};

// ── Common reusable styles ───────────────────────────────────────────────────
export const common = {
  row: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
  },
  rowBetween: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    justifyContent: 'space-between' as const,
  },
  card: {
    borderRadius: radius.lg,
    padding: spacing.md,
  },
  tagPill: {
    alignSelf: 'flex-start' as const,
    borderRadius: radius.pill,
    borderWidth: 0.5,
    borderColor: '#00000040',
    paddingHorizontal: spacing.sm + 2,
    paddingVertical: 3,
    backgroundColor: colors.white,
  },
  sectionHeader: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const,
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  divider: {
    height: 0.5,
    backgroundColor: '#00000020',
    marginHorizontal: spacing.lg,
  },
  iconCircle: {
    backgroundColor: colors.white,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  },
};