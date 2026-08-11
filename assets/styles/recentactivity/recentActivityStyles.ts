import { StyleSheet, Dimensions } from 'react-native';
import { lightColors } from '@/constants/ThemeContext'

const { width } = Dimensions.get('window');
const scale = (size: number) => (width / 375) * size;
const moderateScale = (size: number, factor = 0.5) =>
    size + (scale(size) - size) * factor;

export const getRecentActivityStyles = (colors: typeof lightColors) =>
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
            marginBottom: moderateScale(20),
            lineHeight: moderateScale(20),
        },

        // ── Practice Summary Card ─────────────────────────────────────────────────
        summaryContainer: {
            paddingHorizontal: moderateScale(16),
            marginBottom: moderateScale(24),
        },
        summaryCard: {
            backgroundColor: colors.primaryLight,
            borderRadius: moderateScale(14),
            padding: moderateScale(16),
        },
        summaryTopRow: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: moderateScale(16),
        },
        summaryTitle: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '500',
            fontSize: moderateScale(15),
            color: colors.text,
        },
        summaryWeekRow: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: moderateScale(4),
        },
        summaryWeekText: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '400',
            fontSize: moderateScale(13),
            color: colors.textSub,
        },
        summaryStatsRow: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        statItem: {
            flex: 1,
            alignItems: 'center',
            gap: moderateScale(6),
        },
        statDivider: {
            width: 1.5,
            height: moderateScale(90),
            backgroundColor: colors.reminderDivider,
        },
        statValue: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '700',
            fontSize: moderateScale(20),
            color: colors.text,
        },
        statLabel: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '400',
            fontSize: moderateScale(11),
            color: colors.textSub,
            textAlign: 'center',
            lineHeight: moderateScale(15),
        },

        // ── Section Group ─────────────────────────────────────────────────────────
        groupContainer: {
            paddingHorizontal: moderateScale(16),
            marginBottom: moderateScale(20),
        },
        groupTitle: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '500',
            fontSize: moderateScale(18),
            color: colors.text,
            marginBottom: moderateScale(12),
        },

        activityCard: {
            flexDirection: 'row',
            alignItems: 'center',
            borderRadius: moderateScale(12),
            marginBottom: moderateScale(10),
            padding: moderateScale(14),
            gap: moderateScale(12),
            minHeight: moderateScale(110),
        },
        activityImage: {
            width: moderateScale(90),
            height: moderateScale(90),
            borderRadius: moderateScale(8),
            flexShrink: 0,
        },
        activityContent: {
            flex: 1,
            gap: moderateScale(5),
        },
        activityTitleRow: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: moderateScale(8),
            flexWrap: 'wrap',
        },
        activityTitle: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '600',
            fontSize: moderateScale(12),
            color: '#0F0F0F',
        },
        activityBadge: {
            borderRadius: moderateScale(3),
            borderWidth: 0.38,
            borderColor: '#00000066',
            paddingHorizontal: moderateScale(6),
            paddingVertical: moderateScale(2),
            backgroundColor: '#FFFFFF',
        },
        activityBadgeText: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '400',
            fontSize: moderateScale(10),
            color: '#00000080',
        },
        activitySubtitleRow: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: moderateScale(6),
        },
        activitySubtitle: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '400',
            fontSize: moderateScale(12),
            color: '#0F0F0F99',
        },
        activityMetaRow: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: moderateScale(4),
        },
        activityMeta: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '400',
            fontSize: moderateScale(11),
            color: '#0F0F0F80',
        },
        activityDot: {
            width: moderateScale(3),
            height: moderateScale(3),
            borderRadius: moderateScale(1.5),
            backgroundColor: colors.textMuted,
        },
        activityActions: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: moderateScale(10),
            flexShrink: 0,
        },
        playBtn: {
            width: moderateScale(34),
            height: moderateScale(34),
            borderRadius: moderateScale(17),
            backgroundColor: '#00000020',
            alignItems: 'center',
            justifyContent: 'center',
        },

        // ── Motivational Banner ───────────────────────────────────────────────────
        motivationContainer: {
            paddingHorizontal: moderateScale(16),
            paddingBottom: moderateScale(24),
        },
        motivationCard: {
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: colors.primaryMuted,
            borderRadius: moderateScale(14),
            padding: moderateScale(16),
            gap: moderateScale(12),
        },
        motivationIconCircle: {
            width: moderateScale(52),
            height: moderateScale(52),
            borderRadius: moderateScale(26),
            backgroundColor: '#FFFFFF',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            borderWidth: 0.5,
            borderColor: '#00000015',
        },
        motivationTextBlock: {
            flex: 1,
            gap: moderateScale(4),
        },
        motivationTitle: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '500',
            fontSize: moderateScale(14),
            color: colors.text,
        },
        motivationSubtitle: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '400',
            fontSize: moderateScale(12),
            color: colors.textSub,
            lineHeight: moderateScale(17),
        },
        motivationBtn: {
            backgroundColor: '#FFFFFF',
            borderRadius: moderateScale(8),
            paddingHorizontal: moderateScale(12),
            paddingVertical: moderateScale(9),
            borderWidth: 0.5,
            borderColor: '#00000020',
            flexShrink: 0,
        },
        motivationBtnText: {
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