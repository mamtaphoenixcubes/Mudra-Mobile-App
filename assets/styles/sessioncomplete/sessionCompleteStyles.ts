import { StyleSheet, Dimensions } from 'react-native';
import { lightColors } from '@/constants/ThemeContext'

const { width } = Dimensions.get('window');
const scale = (size: number) => (width / 375) * size;
const moderateScale = (size: number, factor = 0.5) =>
    size + (scale(size) - size) * factor;

export const getSessionCompleteStyles = (colors: typeof lightColors) =>
    StyleSheet.create({

        screen: {
            flex: 1,
            backgroundColor: colors.background,
        },

        // ── Top Buttons ───────────────────────────────────────────────────────────
        topRow: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: moderateScale(16),
            paddingBottom: moderateScale(8),
        },
        topIconBtn: {
            width: moderateScale(36),
            height: moderateScale(36),
            alignItems: 'center',
            justifyContent: 'center',
        },

        // ── Hero ──────────────────────────────────────────────────────────────────
        heroContainer: {
            alignItems: 'center',
            paddingHorizontal: moderateScale(24),
            marginBottom: moderateScale(20),
        },
        heroImage: {
            width: moderateScale(200),
            height: moderateScale(160),
            borderRadius: moderateScale(12),
            marginBottom: moderateScale(20),
        },
        heroTitle: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '500',
            fontSize: moderateScale(26),
            color: colors.primary,
            textAlign: 'center',
            marginBottom: moderateScale(10),
        },
        heroSubtitle: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '400',
            fontSize: moderateScale(14),
            color: colors.text,
            textAlign: 'center',
            lineHeight: moderateScale(22),
        },

        // ── Stats Card ────────────────────────────────────────────────────────────
        statsContainer: {
            paddingHorizontal: moderateScale(16),
            marginBottom: moderateScale(24),
        },
        statsCard: {
            backgroundColor: colors.primaryMuted,
            borderRadius: moderateScale(14),
            paddingVertical: moderateScale(20),
            paddingHorizontal: moderateScale(8),
            flexDirection: 'row',
            alignItems: 'flex-start',
        },
        statItem: {
            flex: 1,
            alignItems: 'center',
            gap: moderateScale(8),
        },
        statDivider: {
            width: 1.0,
            height: moderateScale(120),
            backgroundColor: colors.reminderDivider,
            alignSelf: 'center',
        },
        statIconCircle: {
            width: moderateScale(48),
            height: moderateScale(48),
            borderRadius: moderateScale(24),
            backgroundColor: colors.white,
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 0.5,
            borderColor: '#00000015',
        },
        statLabel: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '400',
            fontSize: moderateScale(11),
            color: colors.textSub,
            textAlign: 'center',
        },
        statValue: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '500',
            fontSize: moderateScale(14),
            color: colors.text,
            textAlign: 'center',
            lineHeight: moderateScale(20),
        },

        // ── Mood Rating ───────────────────────────────────────────────────────────
        moodContainer: {
            paddingHorizontal: moderateScale(16),
            marginBottom: moderateScale(24),
            alignItems: 'center',
        },
        moodTitle: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '500',
            fontSize: moderateScale(14),
            color: colors.text,
            textAlign: 'center',
            marginBottom: moderateScale(4),
        },
        moodSubtitle: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '400',
            fontSize: moderateScale(13),
            color: colors.text,
            textAlign: 'center',
            marginBottom: moderateScale(16),
        },
        moodRow: {
            flexDirection: 'row',
            justifyContent: 'center',
            gap: moderateScale(16),
        },
        moodItem: {
            alignItems: 'center',
            gap: moderateScale(6),
        },
        moodCircle: {
            width: moderateScale(52),
            height: moderateScale(52),
            borderRadius: moderateScale(26),
            backgroundColor: '#F3F3F3',
            borderWidth: 0.65,
            borderColor: '#00000033',
            alignItems: 'center',
            justifyContent: 'center',
        },
        moodCircleSelected: {
            backgroundColor: colors.primaryMuted,
            borderColor: colors.primary,
        },
        moodLabel: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '500',
            fontSize: moderateScale(11),
            color: colors.text,
            textAlign: 'center',
        },

        // ── Session Insights ──────────────────────────────────────────────────────
        insightsContainer: {
            paddingHorizontal: moderateScale(16),
            marginBottom: moderateScale(16),
        },
        insightsCard: {
            backgroundColor: colors.inputBg,
            borderRadius: moderateScale(6),
            borderWidth: 0.5,
            borderColor: '#00000033',
            overflow: 'hidden',
        },
        insightsTitle: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '500',
            fontSize: moderateScale(14),
            color: colors.text,
            padding: moderateScale(14),
            paddingBottom: moderateScale(10),
        },
        insightsDivider: {
            height: 0.5,
            backgroundColor: colors.dividerDark,
            marginHorizontal: moderateScale(14),
        },
        insightRow: {
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: moderateScale(14),
            paddingVertical: moderateScale(12),
            gap: moderateScale(10),
        },
        insightLabel: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '400',
            fontSize: moderateScale(13),
            color: colors.text,
            flex: 1,
        },
        insightValue: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '400',
            fontSize: moderateScale(13),
            color: colors.text,
        },

        // ── Keep Going Banner ─────────────────────────────────────────────────────
        keepGoingContainer: {
            paddingHorizontal: moderateScale(16),
            marginBottom: moderateScale(24),
        },
        keepGoingCard: {
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: colors.inputBg,
            borderRadius: moderateScale(6),
            borderWidth: 0.5,
            borderColor: '#00000015',
            padding: moderateScale(14),
            gap: moderateScale(12),
        },
        keepGoingIconCircle: {
            width: moderateScale(44),
            height: moderateScale(44),
            borderRadius: moderateScale(22),
            backgroundColor: colors.white,
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            borderWidth: 0.5,
            borderColor: '#00000015',
        },
        keepGoingTextBlock: {
            flex: 1,
            gap: moderateScale(3),
        },
        keepGoingTitle: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '500',
            fontSize: moderateScale(14),
            color: colors.text,
        },
        keepGoingSubtitle: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '400',
            fontSize: moderateScale(12),
            color: colors.textSub,
            lineHeight: moderateScale(17),
        },

        // ── Action Buttons ────────────────────────────────────────────────────────
        actionsContainer: {
            paddingHorizontal: moderateScale(16),
            gap: moderateScale(12),
            marginBottom: moderateScale(16),
        },
        actionBtn: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: moderateScale(10),
            backgroundColor: colors.inputBg,
            borderRadius: moderateScale(12),
            paddingVertical: moderateScale(16),
            borderWidth: 0.5,
            borderColor: '#00000015',
        },
        actionBtnText: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '500',
            fontSize: moderateScale(15),
            color: colors.text,
        },
        viewHistoryBtn: {
            alignItems: 'center',
            paddingBottom: moderateScale(24),
        },
        viewHistoryText: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '400',
            fontSize: moderateScale(14),
            color: colors.text,
            textDecorationLine: 'underline',
        },
        submitBtn: {
            backgroundColor: colors.primary,
            borderRadius: moderateScale(10),
            paddingVertical: moderateScale(14),
            alignItems: 'center',
            alignSelf: 'stretch',
            marginTop: moderateScale(20),
            marginHorizontal: moderateScale(40),
        },
        submitBtnDisabled: {
            opacity: 0.5,
        },
        submitBtnText: {
            color: colors.white,
            fontFamily: 'SF-Pro-Display',
            fontWeight: '600',
            fontSize: moderateScale(15),
        },

        feedbackInline: {
            alignItems: 'center',
            paddingVertical: 20,
        },
        feedbackInlineCheckCircle: {
            width: 56,
            height: 56,
            borderRadius: 28,
            borderWidth: 2,
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 14,
        },
        feedbackInlineTitle: {
            fontFamily: 'SF-Pro-Display',
            fontSize: 16,
            fontWeight: '700',
            marginBottom: 4,
        },
        feedbackInlineSubtitle: {
            fontFamily: 'SF-Pro-Display',
            fontSize: 13,
            color: '#888',
            textAlign: 'center',
        },
    });