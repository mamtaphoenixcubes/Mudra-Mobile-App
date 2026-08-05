import { StyleSheet, Dimensions } from 'react-native';
import { lightColors } from '@/constants/ThemeContext'

const { width } = Dimensions.get('window');
const scale = (size: number) => (width / 375) * size;
const moderateScale = (size: number, factor = 0.5) =>
    size + (scale(size) - size) * factor;

export const getProgressInsightsStyles = (colors: typeof lightColors) =>
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
        headerTitleBlock: {
            flex: 1,
            alignItems: 'center',
        },
        headerTitle: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '700',
            fontSize: moderateScale(18),
            color: colors.text,
        },

        // ── Subtitle ──────────────────────────────────────────────────────────────
        subtitle: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '400',
            fontSize: moderateScale(13),
            color: colors.primary,
            textAlign: 'center',
            paddingHorizontal: moderateScale(24),
            marginBottom: moderateScale(16),
            lineHeight: moderateScale(20),
        },

        // ── Tab Selector ──────────────────────────────────────────────────────────
        tabContainer: {
            marginHorizontal: moderateScale(16),
            marginBottom: moderateScale(20),
            backgroundColor: colors.primary,
            borderRadius: moderateScale(6),
            flexDirection: 'row',
            padding: moderateScale(4),
        },
        tabItem: {
            flex: 1,
            paddingVertical: moderateScale(10),
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: moderateScale(4),
        },
        tabItemActive: {
            backgroundColor: '#FFFFFF',
        },
        tabText: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '500',
            fontSize: moderateScale(14),
            color: '#FFFFFF',
        },
        tabTextActive: {
            color: '#0F0F0F',
        },

        // ── Overall Progress Card ─────────────────────────────────────────────────
        overallContainer: {
            paddingHorizontal: moderateScale(16),
            marginBottom: moderateScale(24),
        },
        overallCard: {
            backgroundColor: colors.primaryMuted,
            borderRadius: moderateScale(14),
            padding: moderateScale(16),
        },
        overallTopRow: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: moderateScale(16),
        },
        overallTitle: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '500',
            fontSize: moderateScale(15),
            color: colors.text,
        },
        overallWeekRow: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: moderateScale(4),
        },
        overallWeekText: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '400',
            fontSize: moderateScale(13),
            color: colors.textSub,
        },
        overallStatsRow: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        overallStatItem: {
            flex: 1,
            alignItems: 'center',
            gap: moderateScale(6),
        },
        overallStatDivider: {
            width: 1.5,
            height: moderateScale(90),
            backgroundColor: '#00000020',
        },
        overallStatValue: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '700',
            fontSize: moderateScale(18),
            color: colors.text,
        },
        overallStatLabel: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '400',
            fontSize: moderateScale(11),
            color: colors.textSub,
            textAlign: 'center',
            lineHeight: moderateScale(15),
        },

        // ── Section Header Row ────────────────────────────────────────────────────
        sectionHeaderRow: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: moderateScale(16),
            marginBottom: moderateScale(12),
        },
        sectionTitle: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '500',
            fontSize: moderateScale(16),
            color: colors.text,
        },
        sectionLink: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '400',
            fontSize: moderateScale(13),
            color: colors.primary,
        },

        // ── Practice Analysis Card ────────────────────────────────────────────────
        analysisContainer: {
            paddingHorizontal: moderateScale(16),
            marginBottom: moderateScale(24),
        },
        analysisCard: {
            backgroundColor: colors.inputBg,
            borderRadius: moderateScale(12),
            borderWidth: 0.5,
            borderColor: '#00000015',
            overflow: 'hidden',
        },
        analysisInner: {
            flexDirection: 'row',
            alignItems: 'center',
            padding: moderateScale(16),
            gap: moderateScale(8),
        },
        donutWrapper: {
            width: moderateScale(140),
            height: moderateScale(140),
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
        },
        donutLabelWrapper: {
            position: 'absolute',
            alignItems: 'center',
            justifyContent: 'center',
        },
        analysisDivider: {
            width: 1.5,
            height: moderateScale(130),
            backgroundColor: '#00000020',
            marginHorizontal: moderateScale(8),
        },
        legendBlock: {
            flex: 1,
            gap: moderateScale(12),
        },
        legendRow: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: moderateScale(8),
        },
        legendDot: {
            width: moderateScale(20),
            height: moderateScale(20),
            borderRadius: moderateScale(4),
            flexShrink: 0,
        },
        legendTextBlock: {
            flex: 1,
        },
        legendName: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '500',
            fontSize: moderateScale(12),
            color: colors.text,
        },
        legendTime: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '400',
            fontSize: moderateScale(11),
            color: colors.textSub,
        },
        legendPercent: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '500',
            fontSize: moderateScale(12),
            color: colors.textSub,
            flexShrink: 0,
        },
        analysisFooter: {
            paddingVertical: moderateScale(10),
            paddingHorizontal: moderateScale(16),
            borderTopWidth: 0.5,
            borderTopColor: '#00000015',
            alignItems: 'center',
        },
        analysisFooterText: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '400',
            fontSize: moderateScale(12),
            color: colors.textSub,
            textAlign: 'center',
        },

        // ── Consistency Card ──────────────────────────────────────────────────────
        consistencyContainer: {
            paddingHorizontal: moderateScale(16),
            marginBottom: moderateScale(24),
        },
        consistencyCard: {
            backgroundColor: colors.inputBg,
            borderRadius: moderateScale(12),
            borderWidth: 0.5,
            borderColor: '#00000015',
            padding: moderateScale(16),
            minHeight: moderateScale(160),
            flexDirection: 'row',
            alignItems: 'flex-start',
            gap: moderateScale(12),
        },
        streakBlock: {
            alignItems: 'center',
            gap: moderateScale(14),
            flexShrink: 0,
        },
        streakLabel: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '500',
            fontSize: moderateScale(14),
            color: colors.text,
        },
        streakCircle: {
            width: moderateScale(80),
            height: moderateScale(80),
            borderRadius: moderateScale(40),
            backgroundColor: colors.white,
            borderWidth: 0.5,
            borderColor: '#00000020',
            alignItems: 'center',
            justifyContent: 'center',
            gap: moderateScale(3),
        },
        streakValue: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '700',
            fontSize: moderateScale(22),
            color: '#0F0F0F',
        },
        streakDaysText: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '400',
            fontSize: moderateScale(11),
            color: '#0F0F0F80',
        },
        consistencyDivider: {
            width: 0.5,
            backgroundColor: '#00000020',
            alignSelf: 'stretch',
        },
        weekBlock: {
            flex: 1,
            gap: moderateScale(14),
        },
        weekTitle: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '500',
            fontSize: moderateScale(14),
            color: colors.text,
            textAlign: 'center',
        },
        weekDaysRow: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            gap: moderateScale(2),
        },
        weekDayCol: {
            alignItems: 'center',
            gap: moderateScale(10),
        },
        weekDayLabel: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '400',
            fontSize: moderateScale(12),
            color: colors.text,
        },
        weekDayCircle: {
            width: moderateScale(28),
            height: moderateScale(28),
            borderRadius: moderateScale(14),
            borderWidth: 1.5,
            borderColor: '#00000030',
            alignItems: 'center',
            justifyContent: 'center',
        },
        weekDayCircleCompleted: {
            borderColor: colors.primary,
        },
        legendRowSmall: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: moderateScale(14),
        },
        legendItemSmall: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: moderateScale(8),
        },
        legendItemText: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '400',
            fontSize: moderateScale(11),
            color: colors.text,
        },

        // ── Analytics Card ────────────────────────────────────────────────────────
        analyticsContainer: {
            paddingHorizontal: moderateScale(16),
            marginBottom: moderateScale(24),
        },
        analyticsCard: {
            backgroundColor: colors.inputBg,
            borderRadius: moderateScale(12),
            borderWidth: 0.5,
            borderColor: '#00000015',
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: moderateScale(20),
        },
        analyticsStatItem: {
            flex: 1,
            alignItems: 'center',
            gap: moderateScale(8),
            paddingHorizontal: moderateScale(8),
        },
        analyticsStatDivider: {
            width: 1.5,
            height: moderateScale(80),
            backgroundColor: '#00000020',
        },
        analyticsStatValue: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '500',
            fontSize: moderateScale(18),
            color: colors.text,
        },
        analyticsStatLabel: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '400',
            fontSize: moderateScale(11),
            color: colors.textSub,
            textAlign: 'center',
            lineHeight: moderateScale(15),
        },

        // ── Goal Banner ───────────────────────────────────────────────────────────
        goalContainer: {
            paddingHorizontal: moderateScale(16),
            paddingBottom: moderateScale(24),
        },
        goalCard: {
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: colors.primaryMuted,
            borderRadius: moderateScale(14),
            padding: moderateScale(16),
            gap: moderateScale(12),
        },
        goalIconCircle: {
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
        goalTextBlock: {
            flex: 1,
        },
        goalText: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '400',
            fontSize: moderateScale(13),
            color: colors.text,
            lineHeight: moderateScale(20),
        },
        goalBtn: {
            backgroundColor: colors.white,
            borderRadius: moderateScale(8),
            paddingHorizontal: moderateScale(12),
            paddingVertical: moderateScale(9),
            borderWidth: 0.5,
            borderColor: '#00000020',
            flexShrink: 0,
        },
        goalBtnText: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '500',
            fontSize: moderateScale(12),
            color: '#0F0F0F',
            textAlign: 'center',
        },

        pageTitle: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '600',
            fontSize: moderateScale(20),
            color: colors.text,
            textAlign: 'center',
            marginBottom: moderateScale(4),
            paddingHorizontal: moderateScale(16),
        },
    });