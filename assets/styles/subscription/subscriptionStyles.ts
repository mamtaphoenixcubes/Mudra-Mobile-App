import { StyleSheet, Dimensions } from 'react-native';
import { lightColors } from '@/constants/ThemeContext'

const { width } = Dimensions.get('window');
const scale = (size: number) => (width / 375) * size;
const moderateScale = (size: number, factor = 0.5) =>
    size + (scale(size) - size) * factor;

const PLAN_CARD_WIDTH = moderateScale(160);

export const getSubscriptionStyles = (colors: typeof lightColors) =>
    StyleSheet.create({

        screen: { flex: 1, backgroundColor: colors.background },

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
            gap: moderateScale(6),
        },
        headerLogo: { width: moderateScale(28), height: moderateScale(28) },
        headerTitle: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '700',
            fontSize: moderateScale(18),
            color: colors.primary,
            letterSpacing: 1,
        },

        // ── Page Title ────────────────────────────────────────────────────────────
        pageTitle: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '600',
            fontSize: moderateScale(20),
            color: colors.text,
            textAlign: 'center',
            marginBottom: moderateScale(6),
        },
        pageSubtitle: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '400',
            fontSize: moderateScale(13),
            color: colors.primary,
            textAlign: 'center',
            paddingHorizontal: moderateScale(24),
            marginBottom: moderateScale(20),
            lineHeight: moderateScale(20),
        },

        // ── Hero Banner ───────────────────────────────────────────────────────────
        heroBannerContainer: {
            paddingHorizontal: moderateScale(16),
            marginBottom: moderateScale(24),
        },
        heroBannerCard: {
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: colors.inputBg,
            borderRadius: moderateScale(12),
            borderWidth: 0.5,
            borderColor: '#00000020',
            padding: moderateScale(14),
            gap: moderateScale(12),
        },
        heroBannerIconCircle: {
            width: moderateScale(50),
            height: moderateScale(50),
            borderRadius: moderateScale(25),
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            borderColor: '#00000015',
        },
        heroBannerTextBlock: { flex: 1, gap: moderateScale(4) },
        heroBannerTitle: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '500',
            fontSize: moderateScale(15),
            color: colors.text,
        },
        heroBannerSubtitle: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '400',
            fontSize: moderateScale(10),
            color: colors.textSub,
            lineHeight: moderateScale(15),
        },
        heroBannerBtn: {
            backgroundColor: colors.primary,
            borderRadius: moderateScale(8),
            paddingHorizontal: moderateScale(12),
            paddingVertical: moderateScale(10),
            flexDirection: 'row',
            alignItems: 'center',
            gap: moderateScale(6),
            flexShrink: 0,
        },
        heroBannerBtnText: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '500',
            fontSize: moderateScale(12),
            color: '#FFFFFF',
        },

        // ── Section Title ─────────────────────────────────────────────────────────
        sectionTitle: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '500',
            fontSize: moderateScale(18),
            color: colors.text,
            paddingHorizontal: moderateScale(16),
            marginBottom: moderateScale(14),
        },

        // ── Plan Cards ────────────────────────────────────────────────────────────
        plansScrollContent: {
            paddingHorizontal: moderateScale(16),
            gap: moderateScale(12),
            paddingRight: moderateScale(24),
            alignItems: 'flex-start',
        },
        planCard: {
            width: moderateScale(185),
            backgroundColor: colors.inputBg,
            borderRadius: moderateScale(12),
            borderWidth: 0.5,
            borderColor: '#00000033',
            padding: moderateScale(14),
            gap: moderateScale(8),
            position: 'relative',
        },
        planCardSelected: {
            borderColor: colors.primary,
            borderWidth: 1.5,
            backgroundColor: colors.card,
        },
        planMostPopularBadge: {
            position: 'absolute',
            top: -moderateScale(4),
            left: '60%',
            transform: [{ translateX: '-50%' }],
            backgroundColor: colors.primary,
            borderRadius: moderateScale(20),
            paddingHorizontal: moderateScale(12),
            paddingVertical: moderateScale(4),
        },
        planMostPopularText: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '500',
            fontSize: moderateScale(11),
            color: '#FFFFFF',
        },
        planHeaderRow: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: moderateScale(8),
        },
        planName: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '500',
            fontSize: moderateScale(18),
            color: colors.text,
        },
        planRadio: {
            width: moderateScale(20),
            height: moderateScale(20),
            borderRadius: moderateScale(10),
            borderWidth: 1.5,
            borderColor: '#00000040',
            alignItems: 'center',
            justifyContent: 'center',
        },
        planRadioSelected: { borderColor: colors.primary },
        planRadioDot: {
            width: moderateScale(10),
            height: moderateScale(10),
            borderRadius: moderateScale(5),
            backgroundColor: colors.primary,
        },
        planPrice: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '700',
            fontSize: moderateScale(24),
            color: colors.text,
        },
        planPricePeriod: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '400',
            fontSize: moderateScale(12),
            color: colors.textSub,
        },
        planBilling: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '400',
            fontSize: moderateScale(12),
            color: colors.textSub,
        },
        planSaveBadge: {
            alignSelf: 'flex-start',
            backgroundColor: '#CAF1E3',
            borderRadius: moderateScale(4),
            paddingHorizontal: moderateScale(8),
            paddingVertical: moderateScale(3),
        },
        planSaveText: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '500',
            fontSize: moderateScale(11),
            color: '#308855',
        },
        planFeatureRow: {
            flexDirection: 'row',
            alignItems: 'flex-start',
            gap: moderateScale(6),
            marginTop: moderateScale(2),
        },
        planFeatureText: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '400',
            fontSize: moderateScale(12),
            color: colors.text,
            flex: 1,
            lineHeight: moderateScale(18),
        },

        statsContainer: {
            paddingHorizontal: moderateScale(16),
            marginBottom: moderateScale(24),
            marginTop: moderateScale(20),
            width: '100%',
        },
        statsScrollContent: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: moderateScale(8),
            paddingRight: moderateScale(16),
        },
        statsCard: {
            backgroundColor: colors.primaryMuted,
            borderRadius: moderateScale(14),
            paddingVertical: moderateScale(16),
            paddingHorizontal: moderateScale(8),
            flexDirection: 'row',
            alignItems: 'center',
        },
        statItem: {
            minWidth: moderateScale(100),
            alignItems: 'center',
            justifyContent: 'center',
            gap: moderateScale(8),
            paddingHorizontal: moderateScale(4),
        },
        statDivider: {
            width: 1.5,
            height: moderateScale(100),
            backgroundColor: colors.reminderDivider,
            marginHorizontal: moderateScale(4),
        },
        statValue: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '600',
            fontSize: moderateScale(15),
            color: colors.text,
            textAlign: 'center',
            letterSpacing: -0.3,
        },
        statLabel: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '400',
            fontSize: moderateScale(11),
            color: colors.text,
            textAlign: 'center',
            lineHeight: moderateScale(15),
        },
        statIconContainer: {
            width: moderateScale(44),
            height: moderateScale(44),
            borderRadius: moderateScale(22),
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: moderateScale(4),
        },

        // ── Premium Features ──────────────────────────────────────────────────────
        featuresContainer: {
            paddingHorizontal: moderateScale(16),
            marginBottom: moderateScale(24),
        },
        featuresCard: {
            backgroundColor: colors.inputBg,
            borderRadius: moderateScale(6),
            borderWidth: 0.5,
            borderColor: '#00000033',
            overflow: 'hidden',
        },
        featureRow: {
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: moderateScale(14),
            paddingVertical: moderateScale(14),
            gap: moderateScale(12),
        },
        featureRowDivider: {
            height: 0.5,
            backgroundColor: '#00000020',
            marginHorizontal: moderateScale(14),
        },
        featureIconCircle: {
            width: moderateScale(44),
            height: moderateScale(44),
            borderRadius: moderateScale(22),
            backgroundColor: '#FFFFFF',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            borderWidth: 0.5,
            borderColor: '#00000015',
        },
        featureTextBlock: { flex: 1, gap: moderateScale(3) },
        featureTitle: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '500',
            fontSize: moderateScale(14),
            color: colors.text,
        },
        featureSubtitle: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '400',
            fontSize: moderateScale(12),
            color: colors.textSub,
            lineHeight: moderateScale(17),
        },

        // ── Trial Banner ──────────────────────────────────────────────────────────
        trialContainer: {
            paddingHorizontal: moderateScale(16),
            marginBottom: moderateScale(16),
        },
        trialCard: {
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: colors.primaryMuted,
            borderRadius: moderateScale(12),
            padding: moderateScale(16),
            gap: moderateScale(12),
        },
        trialIconCircle: {
            width: moderateScale(50),
            height: moderateScale(50),
            borderRadius: moderateScale(25),
            backgroundColor: '#FFFFFF',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            borderWidth: 0.5,
            borderColor: '#00000015',
        },
        trialTextBlock: { flex: 1, gap: moderateScale(3) },
        trialTitle: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '500',
            fontSize: moderateScale(14),
            color: colors.text,
        },
        trialSubtitle: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '400',
            fontSize: moderateScale(12),
            color: colors.textSub,
            lineHeight: moderateScale(17),
        },
        trialBtn: {
            backgroundColor: colors.white,
            borderRadius: moderateScale(8),
            paddingHorizontal: moderateScale(12),
            paddingVertical: moderateScale(9),
            borderWidth: 0.5,
            borderColor: '#00000020',
            flexShrink: 0,
        },
        trialBtnText: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '500',
            fontSize: moderateScale(12),
            color: '#0F0F0F',
            textAlign: 'center',
        },

        // ── Auto-renew Note ───────────────────────────────────────────────────────
        renewNote: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '400',
            fontSize: moderateScale(12),
            color: colors.primary,
            textAlign: 'center',
            paddingHorizontal: moderateScale(24),
            lineHeight: moderateScale(20),
            marginBottom: moderateScale(20),
        },

        // ── Trust Row ─────────────────────────────────────────────────────────────
        trustRow: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: moderateScale(16),
            paddingBottom: moderateScale(24),
            gap: moderateScale(4),
        },
        trustItem: {
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: moderateScale(5),
        },
        trustDivider: {
            width: 0.5,
            height: moderateScale(20),
            backgroundColor: colors.trustDivider,
        },
        trustText: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '400',
            fontSize: moderateScale(11),
            color: colors.textSub,
        },
    });