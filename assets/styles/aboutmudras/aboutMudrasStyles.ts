import { StyleSheet, Dimensions } from 'react-native';
import { lightColors } from '@/constants/ThemeContext'

const { width } = Dimensions.get('window');
const scale = (size: number) => (width / 375) * size;
const moderateScale = (size: number, factor = 0.5) =>
    size + (scale(size) - size) * factor;

const MUDRA_TYPE_CARD_WIDTH = (width - moderateScale(16) * 2 - moderateScale(10) * 3) / 4;

export const getAboutMudrasStyles = (colors: typeof lightColors) =>
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
        headerTitle: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '700',
            fontSize: moderateScale(18),
            color: colors.primary,
            letterSpacing: 1,
        },

        // ── Page Title ────────────────────────────────────────────────────────────
        pageTitleContainer: {
            alignItems: 'center',
            paddingHorizontal: moderateScale(24),
            marginBottom: moderateScale(16),
        },
        pageTitle: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '600',
            fontSize: moderateScale(20),
            color: colors.text,
            textAlign: 'center',
            marginBottom: moderateScale(8),
        },
        pageSubtitle: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '400',
            fontSize: moderateScale(14),
            color: colors.primary,
            textAlign: 'center',
            lineHeight: moderateScale(22),
        },

        // ── Hero Banner ───────────────────────────────────────────────────────────
        heroContainer: {
            paddingHorizontal: moderateScale(16),
            marginBottom: moderateScale(28),
        },
        heroCard: {
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: colors.primaryMuted,
            borderRadius: moderateScale(14),
            padding: moderateScale(14),
            gap: moderateScale(14),
        },
        heroImage: {
            width: moderateScale(110),
            height: moderateScale(110),
            borderRadius: moderateScale(10),
            flexShrink: 0,
        },
        heroTextBlock: {
            flex: 1,
            gap: moderateScale(8),
        },
        heroTitle: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '500',
            fontSize: moderateScale(17),
            color: colors.text,
            lineHeight: moderateScale(22),
        },
        heroBody: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '400',
            fontSize: moderateScale(13),
            color: colors.textSub,
            lineHeight: moderateScale(20),
        },

        // ── Section Title ─────────────────────────────────────────────────────────
        sectionTitleContainer: {
            paddingHorizontal: moderateScale(16),
            marginBottom: moderateScale(16),
        },
        sectionTitle: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '500',
            fontSize: moderateScale(18),
            color: colors.text,
        },

        // ── Why Practice — 5 cols ─────────────────────────────────────────────────
        whyContainer: {
            marginBottom: moderateScale(28),
        },
        whyScrollContent: {
            paddingHorizontal: moderateScale(16),
            paddingRight: moderateScale(24),
            alignItems: 'flex-start',
            gap: moderateScale(0),
        },
        whyItem: {
            width: moderateScale(90),
            alignItems: 'center',
            gap: moderateScale(10),
            paddingHorizontal: moderateScale(4),
        },
        whyDivider: {
            width: 1,
            height: moderateScale(150),
            //backgroundColor: '#00000018',
            backgroundColor: colors.dividerDark,
            marginTop: moderateScale(6),
            alignSelf: 'center',
        },
        whyIconCircle: {
            width: moderateScale(52),
            height: moderateScale(52),
            borderRadius: moderateScale(26),
            backgroundColor: '#F3F3F3',
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 0.5,
            borderColor: '#00000020',
        },
        whyLabel: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '500',
            fontSize: moderateScale(12),
            color: colors.text,
            textAlign: 'center',
            lineHeight: moderateScale(17),
        },
        whySubLabel: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '400',
            fontSize: moderateScale(10),
            color: colors.textSub,
            textAlign: 'center',
            lineHeight: moderateScale(15),
        },

        // ── How Mudras Work ───────────────────────────────────────────────────────
        howContainer: {
            paddingHorizontal: moderateScale(16),
            marginBottom: moderateScale(28),
        },
        howCard: {
            backgroundColor: colors.inputBg,
            borderRadius: moderateScale(12),
            borderWidth: 0.5,
            borderColor: '#00000033',
            overflow: 'hidden',
            position: 'relative',
        },
        howVerticalLine: {
            position: 'absolute',
            left: moderateScale(16) + moderateScale(17),
            top: moderateScale(16) + moderateScale(34),
            bottom: moderateScale(16) + moderateScale(34),
            width: 2,
            backgroundColor: '#9A85FE60',
            zIndex: 0,
        },
        howRow: {
            flexDirection: 'row',
            alignItems: 'flex-start',
            padding: moderateScale(16),
            gap: moderateScale(14),
        },
        howRowDivider: {
            height: 0.6,
            backgroundColor: '#0F0F0F40',
            marginHorizontal: moderateScale(16),
        },
        howNumberCircle: {
            width: moderateScale(34),
            height: moderateScale(34),
            borderRadius: moderateScale(17),
            backgroundColor: colors.primary,
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            zIndex: 1,
        },
        howNumber: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '700',
            fontSize: moderateScale(15),
            color: colors.white,
        },
        howTextBlock: {
            flex: 1,
            gap: moderateScale(4),
        },
        howStepTitle: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '500',
            fontSize: moderateScale(15),
            color: colors.text,
        },
        howStepBody: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '400',
            fontSize: moderateScale(13),
            color: colors.textSub,
            lineHeight: moderateScale(20),
        },

        // ── Types of Mudras ───────────────────────────────────────────────────────
        typesContainer: {
            marginBottom: moderateScale(28),
        },
        typesScrollContent: {
            paddingHorizontal: moderateScale(16),
            gap: moderateScale(12),
            paddingRight: moderateScale(16),
        },
        typeCard: {
            width: moderateScale(155),
            height: moderateScale(210),
            borderRadius: moderateScale(16),
            borderWidth: 0.5,
            borderColor: '#00000033',
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: moderateScale(24),
            paddingHorizontal: moderateScale(14),
            gap: moderateScale(14),
        },
        typeIconCircle: {
            width: moderateScale(56),
            height: moderateScale(56),
            borderRadius: moderateScale(28),
            backgroundColor: '#FFFFFF',
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 0.5,
            borderColor: '#00000020',
        },
        typeLabel: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '500',
            fontSize: moderateScale(15),
            color: '#0F0F0F',
            textAlign: 'center',
            lineHeight: moderateScale(20),
        },
        typeSubLabel: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '400',
            fontSize: moderateScale(12),
            color: '#0F0F0F80',
            textAlign: 'center',
            lineHeight: moderateScale(17),
        },

        // ── Our Approach ──────────────────────────────────────────────────────────
        approachContainer: {
            paddingHorizontal: moderateScale(16),
            marginBottom: moderateScale(16),
            gap: moderateScale(12),
        },
        approachCard: {
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: colors.inputBg,
            borderRadius: moderateScale(12),
            borderWidth: 0.5,
            borderColor: '#00000033',
            padding: moderateScale(16),
            gap: moderateScale(14),
        },
        approachIconCircle: {
            width: moderateScale(52),
            height: moderateScale(52),
            borderRadius: moderateScale(26),
            backgroundColor: colors.white,
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            borderWidth: 0.5,
            borderColor: '#00000020',
        },
        approachText: {
            flex: 1,
            fontFamily: 'SF-Pro-Display',
            fontWeight: '400',
            fontSize: moderateScale(13),
            color: colors.textSub,
            lineHeight: moderateScale(20),
        },

        // ── Explore Banner ────────────────────────────────────────────────────────
        exploreContainer: {
            paddingHorizontal: moderateScale(16),
            paddingBottom: moderateScale(24),
        },
        exploreCard: {
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: colors.primaryMuted,
            borderRadius: moderateScale(14),
            padding: moderateScale(16),
            gap: moderateScale(12),
        },
        exploreIconCircle: {
            width: moderateScale(50),
            height: moderateScale(50),
            borderRadius: moderateScale(25),
            backgroundColor: colors.white,
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            borderWidth: 0.5,
            borderColor: '#00000015',
        },
        exploreTextBlock: {
            flex: 1,
            gap: moderateScale(4),
        },
        exploreTitle: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '500',
            fontSize: moderateScale(14),
            color: colors.text,
        },
        exploreSubtitle: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '400',
            fontSize: moderateScale(12),
            color: colors.textSub,
            lineHeight: moderateScale(17),
        },
        exploreBtn: {
            backgroundColor: colors.white,
            borderRadius: moderateScale(8),
            paddingHorizontal: moderateScale(14),
            paddingVertical: moderateScale(9),
            borderWidth: 0.5,
            borderColor: '#7A64E260',
            flexShrink: 0,
        },
        exploreBtnText: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '500',
            fontSize: moderateScale(12),
            color: '#7A64E2',
            textAlign: 'center',
        },
    });