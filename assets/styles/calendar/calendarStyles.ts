import { StyleSheet, Dimensions } from 'react-native';
import { lightColors } from '@/constants/ThemeContext'

const { width } = Dimensions.get('window');
const scale = (size: number) => (width / 375) * size;
const moderateScale = (size: number, factor = 0.5) =>
    size + (scale(size) - size) * factor;

export const getCalendarStyles = (colors: typeof lightColors) =>
    StyleSheet.create({

        screen: {
            flex: 1,
            backgroundColor: colors.background,
        },

        closeBtn: {
            position: 'absolute',
            top: moderateScale(16),
            right: moderateScale(16),
            width: moderateScale(36),
            height: moderateScale(36),
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10,
        },

        headerBlock: {
            alignItems: 'center',
            paddingTop: moderateScale(100),
            paddingHorizontal: moderateScale(24),
            marginBottom: moderateScale(20),
        },
        pageTitle: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '500',
            fontSize: moderateScale(22),
            color: colors.text,
            textAlign: 'center',
            marginBottom: moderateScale(6),
        },
        subtitle: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '400',
            fontSize: moderateScale(13),
            color: colors.textSub,
            textAlign: 'center',
        },

        // ── Month nav ─────────────────────────────────────────────────────────────
        monthNavRow: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: moderateScale(24),
            marginBottom: moderateScale(16),
        },
        monthNavBtn: {
            width: moderateScale(36),
            height: moderateScale(36),
            borderRadius: moderateScale(18),
            backgroundColor: colors.surfaceAlt,
            alignItems: 'center',
            justifyContent: 'center',
        },
        monthNavLabel: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '600',
            fontSize: moderateScale(16),
            color: colors.text,
        },

        // ── Calendar grid ─────────────────────────────────────────────────────────
        calendarContainer: {
            paddingHorizontal: moderateScale(16),
            marginBottom: moderateScale(20),
        },
        calendarCard: {
            backgroundColor: colors.inputBg,
            borderRadius: moderateScale(16),
            borderWidth: 0.5,
            borderColor: colors.border,
            padding: moderateScale(16),
        },
        weekdayHeaderRow: {
            flexDirection: 'row',
            marginBottom: moderateScale(8),
        },
        weekdayHeaderCell: {
            flex: 1,
            alignItems: 'center',
        },
        weekdayHeaderText: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '500',
            fontSize: moderateScale(11),
            color: colors.textSub,
        },
        weekRow: {
            flexDirection: 'row',
            marginBottom: moderateScale(6),
        },
        dayCell: {
            flex: 1,
            aspectRatio: 1,
            alignItems: 'center',
            justifyContent: 'center',
        },
        dayCircle: {
            width: moderateScale(30),
            height: moderateScale(30),
            borderRadius: moderateScale(15),
            alignItems: 'center',
            justifyContent: 'center',
        },
        dayCircleCompleted: {
            backgroundColor: colors.primary,
        },
        dayCircleToday: {
            borderWidth: 1.5,
            borderColor: colors.primary,
        },
        dayText: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '400',
            fontSize: moderateScale(13),
            color: colors.text,
        },
        dayTextCompleted: {
            color: '#FFFFFF',
            fontWeight: '600',
        },
        dayTextOutsideMonth: {
            color: colors.textMuted,
        },

        // ── Legend ────────────────────────────────────────────────────────────────
        legendRow: {
            flexDirection: 'row',
            justifyContent: 'center',
            gap: moderateScale(20),
            marginTop: moderateScale(8),
            marginBottom: moderateScale(24),
        },
        legendItem: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: moderateScale(6),
        },
        legendDot: {
            width: moderateScale(10),
            height: moderateScale(10),
            borderRadius: moderateScale(5),
        },
        legendText: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '400',
            fontSize: moderateScale(12),
            color: colors.textSub,
        },

        // ── Summary ───────────────────────────────────────────────────────────────
        summaryContainer: {
            paddingHorizontal: moderateScale(16),
        },
        summaryCard: {
            backgroundColor: colors.primaryMuted,
            borderRadius: moderateScale(14),
            padding: moderateScale(16),
            alignItems: 'center',
        },
        summaryText: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '500',
            fontSize: moderateScale(14),
            color: colors.text,
            textAlign: 'center',
        },

        // ── Activities modal — same structural pattern as SoundPickerModal ───────
        modalBackdrop: {
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.5)',
            justifyContent: 'flex-end',
        },
        modalSheet: {
            backgroundColor: colors.card,
            borderTopLeftRadius: moderateScale(24),
            borderTopRightRadius: moderateScale(24),
            paddingHorizontal: moderateScale(20),
            paddingTop: moderateScale(12),
        },
        modalHandle: {
            width: moderateScale(40),
            height: moderateScale(4),
            borderRadius: moderateScale(2),
            alignSelf: 'center',
            backgroundColor: colors.border,
            marginBottom: moderateScale(16),
        },
        modalCancelBtn: {
            borderWidth: 1,
            borderColor: colors.border,
            borderRadius: moderateScale(12),
            paddingVertical: moderateScale(14),
            alignItems: 'center',
            marginTop: moderateScale(16),
        },
        modalCancelText: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '500',
            fontSize: moderateScale(15),
            color: colors.textSub,
        },

        // ── Activities list content (used inside the modal) ──────────────────────
        activitiesTitle: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '600',
            fontSize: moderateScale(17),
            color: colors.text,
            marginBottom: moderateScale(12),
        },
        activityScrollArea: {
            maxHeight: moderateScale(360),
        },
        activityScrollContent: {
            gap: moderateScale(10),
            paddingBottom: moderateScale(4),
        },
        activityCard: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: moderateScale(12),
            backgroundColor: colors.surfaceAlt,
            borderRadius: moderateScale(14),
            padding: moderateScale(12),
        },
        activityIconCircle: {
            width: moderateScale(42),
            height: moderateScale(42),
            borderRadius: moderateScale(21),
            alignItems: 'center',
            justifyContent: 'center',
        },
        activityTextBlock: {
            flex: 1,
        },
        activityTitle: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '600',
            fontSize: moderateScale(14.5),
            color: colors.text,
        },
        activitySubtitle: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '400',
            fontSize: moderateScale(12),
            color: colors.textSub,
            marginTop: moderateScale(3),
        },
        durationBadge: {
            backgroundColor: colors.primaryMuted,
            borderRadius: moderateScale(20),
            paddingHorizontal: moderateScale(10),
            paddingVertical: moderateScale(5),
        },
        activityDuration: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '600',
            fontSize: moderateScale(12),
            color: colors.primary,
        },
        emptyActivityState: {
            alignItems: 'center',
            paddingVertical: moderateScale(30),
            gap: moderateScale(8),
        },
        noActivityText: {
            fontFamily: 'SF-Pro-Display',
            fontSize: moderateScale(13),
            color: colors.textSub,
            textAlign: 'center',
        },
    });