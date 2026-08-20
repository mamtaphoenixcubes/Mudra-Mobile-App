import { StyleSheet, Dimensions } from 'react-native';
import { lightColors } from '@/constants/ThemeContext';

const { width } = Dimensions.get('window');
const scale = (size: number) => (width / 375) * size;
const moderateScale = (size: number, factor = 0.5) =>
    size + (scale(size) - size) * factor;

export const getPranayamaDetailStyles = (colors: typeof lightColors) =>
    StyleSheet.create({

        // ── Screen ───────────────────────────────────────────────────────────────
        screen: {
            flex: 1,
            backgroundColor: colors.background,
        },

        // ── Header ───────────────────────────────────────────────────────────────
        header: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: moderateScale(16),
            paddingBottom: moderateScale(12),
            backgroundColor: colors.background,
        },
        headerIconBtn: {
            width: moderateScale(40),
            height: moderateScale(40),
            alignItems: 'center',
            justifyContent: 'center',
        },
        headerCenter: {
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: moderateScale(8),
        },
        headerLogo: {
            width: moderateScale(28),
            height: moderateScale(28),
        },
        headerTitle: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '700',
            fontSize: moderateScale(18),
            color: '#9A85FE',
            letterSpacing: 1,
        },
        headerRightRow: {
            flexDirection: 'row',
            alignItems: 'center',
        },

        // ── Hero ─────────────────────────────────────────────────────────────────
        heroContainer: {
            paddingHorizontal: moderateScale(16),
            paddingTop: moderateScale(8),
            paddingBottom: moderateScale(20),
            backgroundColor: colors.background,
        },
        heroTopRow: {
            flexDirection: 'row',
            gap: moderateScale(14),
            alignItems: 'flex-start',
            marginBottom: moderateScale(14),
        },
        heroImageWrapper: {
            width: moderateScale(130),
            height: moderateScale(150),
            borderRadius: moderateScale(14),
            overflow: 'hidden',
            flexShrink: 0,
        },
        heroImage: {
            width: '100%',
            height: '100%',
        },
        heroTextBlock: {
            flex: 1,
            gap: moderateScale(6),
        },
        heroBadge: {
            alignSelf: 'flex-start',
            backgroundColor: colors.primaryMuted,
            paddingHorizontal: moderateScale(10),
            paddingVertical: moderateScale(4),
            borderRadius: moderateScale(8),
        },
        heroBadgeText: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '500',
            fontSize: moderateScale(11),
            color: colors.primary,
        },
        heroTitle: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '500',
            fontSize: moderateScale(18),
            color: colors.text,
            lineHeight: moderateScale(26),
        },
        heroSubtitle: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '400',
            fontSize: moderateScale(13),
            color: colors.textSub,
            lineHeight: moderateScale(19),
        },
        heroAttrsRow: {
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
            borderTopWidth: 0.5,
            borderTopColor: colors.attrBorderTop,
            paddingTop: moderateScale(12),
            marginTop: moderateScale(4),
        },
        heroAttrItem: {
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: moderateScale(5),
        },
        heroAttrLabel: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '400',
            fontSize: moderateScale(12),
            color: colors.text,
        },
        heroAttrDivider: {
            width: 0.5,
            height: moderateScale(20),
            backgroundColor: colors.attrDivider,
        },

        // ── Info Banner ───────────────────────────────────────────────────────────
        infoBannerContainer: {
            paddingHorizontal: moderateScale(16),
            paddingBottom: moderateScale(20),
        },
        infoBannerCard: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: moderateScale(14),
            backgroundColor: colors.primaryMuted,
            borderRadius: moderateScale(14),
            padding: moderateScale(16),
        },
        infoBannerIconCircle: {
            width: moderateScale(48),
            height: moderateScale(48),
            borderRadius: moderateScale(24),
            backgroundColor: colors.white,
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            borderWidth: 0.5,
            borderColor: colors.border,
        },
        infoBannerText: {
            flex: 1,
            fontFamily: 'SF-Pro-Display',
            fontWeight: '400',
            fontSize: moderateScale(13),
            color: colors.text,
            lineHeight: moderateScale(20),
        },

        // ── Section Title ─────────────────────────────────────────────────────────
        sectionTitle: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '600',
            fontSize: moderateScale(17),
            color: colors.text,
            paddingHorizontal: moderateScale(16),
            marginBottom: moderateScale(14),
        },

        // ── Section Divider ───────────────────────────────────────────────────────
        sectionDivider: {
            height: 0.5,
            backgroundColor: colors.attrDivider,
            marginHorizontal: moderateScale(16),
            marginVertical: moderateScale(20),
        },

        // ── What to Expect ────────────────────────────────────────────────────────
        expectContainer: {
            paddingBottom: moderateScale(4),
        },
        expectRow: {
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: moderateScale(16),
        },
        expectItem: {
            flex: 1,
            alignItems: 'center',
            gap: moderateScale(8),
        },
        expectLabel: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '500',
            fontSize: moderateScale(12),
            color: colors.text,
            textAlign: 'center',
            lineHeight: moderateScale(16),
        },
        expectDivider: {
            width: 1.5,
            height: moderateScale(70),
            backgroundColor: colors.attrDivider,
            marginTop: moderateScale(10),
        },

        // ── Benefits ─────────────────────────────────────────────────────────────
        benefitsContainer: {
            paddingHorizontal: moderateScale(16),
            gap: moderateScale(10),
        },
        benefitRow: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: moderateScale(10),
        },
        benefitText: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '400',
            fontSize: moderateScale(14),
            color: colors.text,
            flex: 1,
            lineHeight: moderateScale(20),
        },

        // ── About ─────────────────────────────────────────────────────────────────
        aboutContainer: {
            paddingHorizontal: moderateScale(16),
        },
        aboutText: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '400',
            fontSize: moderateScale(14),
            color: colors.textSub,
            lineHeight: moderateScale(22),
            marginBottom: moderateScale(20),
        },
        aboutRow: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: moderateScale(12),
            paddingVertical: moderateScale(12),
        },
        aboutRowLabel: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '400',
            fontSize: moderateScale(13),
            color: colors.textSub,
            flex: 1,
        },
        aboutRowValue: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '500',
            fontSize: moderateScale(13),
            color: colors.text,
        },
        aboutRowDivider: {
            height: 0.5,
            backgroundColor: colors.privacyDivider,
        },


        // ── You'll Also Love ──────────────────────────────────────────────────────
        alsoLoveContainer: {
            marginBottom: moderateScale(24),
        },
        alsoLoveScrollContent: {
            paddingHorizontal: moderateScale(16),
            gap: moderateScale(12),
            paddingRight: moderateScale(24),
        },
        alsoLoveCard: {
            width: moderateScale(170),
            borderRadius: moderateScale(12),
            overflow: 'hidden',
            flexDirection: 'row',
            alignItems: 'center',
            padding: moderateScale(10),
            gap: moderateScale(10),
        },
        alsoLoveImage: {
            width: moderateScale(60),
            height: moderateScale(60),
            borderRadius: moderateScale(8),
            flexShrink: 0,
        },
        alsoLoveTextBlock: {
            flex: 1,
            gap: moderateScale(6),
        },
        alsoLoveTitle: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '500',
            fontSize: moderateScale(13),
            color: '#0F0F0F',
            lineHeight: moderateScale(18),
        },
        alsoLoveMetaRow: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        alsoLoveMeta: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: moderateScale(4),
        },
        alsoLoveMetaText: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '400',
            fontSize: moderateScale(11),
            color: '#0F0F0F',
        },


        // ── Start Button ──────────────────────────────────────────────────────────
        startBtnContainer: {
            paddingHorizontal: moderateScale(16),
            paddingVertical: moderateScale(20),
        },
        startBtn: {
            backgroundColor: colors.primary,
            borderRadius: moderateScale(14),
            paddingVertical: moderateScale(16),
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: moderateScale(10),
        },
        startBtnText: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '600',
            fontSize: moderateScale(16),
            color: '#FFFFFF',
        },
        pageTitle: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '600',
            fontSize: moderateScale(20),
            color: colors.text,
            textAlign: 'center',
            marginBottom: moderateScale(12),
        },
    });