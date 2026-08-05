import { StyleSheet, Dimensions } from 'react-native';
import { lightColors } from '@/constants/ThemeContext'

const { width } = Dimensions.get('window');
const scale = (size: number) => (width / 375) * size;
const moderateScale = (size: number, factor = 0.5) =>
    size + (scale(size) - size) * factor;

export const getStreakStyles = (colors: typeof lightColors) =>
    StyleSheet.create({

        screen: {
            flex: 1,
            backgroundColor: colors.background,
        },

        // ── Close Button ──────────────────────────────────────────────────────────
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

        // ── Hero ──────────────────────────────────────────────────────────────────
        heroContainer: {
            alignItems: 'center',
            paddingTop: moderateScale(100),
            paddingHorizontal: moderateScale(24),
            marginBottom: moderateScale(24),
        },
        heroImage: {
            width: moderateScale(180),
            height: moderateScale(140),
            borderRadius: moderateScale(6),
            borderWidth: 0.5,
            borderColor: '#00000033',
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

        // ── Streak Card ───────────────────────────────────────────────────────────
        streakCardContainer: {
            paddingHorizontal: moderateScale(16),
            marginBottom: moderateScale(16),
        },
        streakCard: {
            backgroundColor: colors.inputBg,
            borderRadius: moderateScale(6),
            borderWidth: 0.5,
            borderColor: '#00000033',
            padding: moderateScale(20),
            alignItems: 'center',
            gap: moderateScale(8),
        },
        streakCardLabel: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '500',
            fontSize: moderateScale(14),
            color: colors.text,
            textAlign: 'center',
        },
        streakNumber: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '500',
            fontSize: moderateScale(52),
            color: colors.text,
            lineHeight: moderateScale(60),
        },
        streakDaysLabel: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '400',
            fontSize: moderateScale(14),
            color: colors.textSub,
            marginBottom: moderateScale(8),
        },
        streakDivider: {
            height: 0.38,
            backgroundColor: colors.dividerDark,
            alignSelf: 'stretch',
        },

        // ── Week Days Row ─────────────────────────────────────────────────────────
        weekRow: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignSelf: 'stretch',
            paddingHorizontal: moderateScale(4),
            marginVertical: moderateScale(4),
        },
        weekDayCol: {
            alignItems: 'center',
            gap: moderateScale(8),
        },
        weekDayLabel: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '500',
            fontSize: moderateScale(12),
            color: colors.text,
            textAlign: 'center',
        },
        weekDayCircle: {
            width: moderateScale(28),
            height: moderateScale(28),
            borderRadius: moderateScale(14),
            borderWidth: 0.38,
            borderColor: colors.weekDayCircleBorder,
            alignItems: 'center',
            justifyContent: 'center',
        },

        // ── Sessions Completed ────────────────────────────────────────────────────
        sessionsLabel: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '500',
            fontSize: moderateScale(14),
            color: colors.text,
            textAlign: 'center',
            marginTop: moderateScale(8),
        },
        sessionsNumber: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '500',
            fontSize: moderateScale(36),
            color: colors.text,
        },
        sessionsUnit: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '400',
            fontSize: moderateScale(13),
            color: colors.textSub,
        },

        // ── Stats Row ─────────────────────────────────────────────────────────────
        statsContainer: {
            paddingHorizontal: moderateScale(16),
            marginBottom: moderateScale(16),
        },
        statsCard: {
            backgroundColor: colors.primaryMuted,
            borderRadius: moderateScale(12),
            paddingVertical: moderateScale(18),
            paddingHorizontal: moderateScale(8),
            flexDirection: 'row',
            alignItems: 'center',
        },
        statItem: {
            flex: 1,
            alignItems: 'center',
            gap: moderateScale(6),
        },
        statDivider: {
            width: 0.5,
            height: moderateScale(60),
            backgroundColor: colors.reminderDivider,
        },
        statIconCircle: {
            width: moderateScale(44),
            height: moderateScale(44),
            borderRadius: moderateScale(22),
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
            color: colors.text,
            textAlign: 'center',
        },
        statValue: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '500',
            fontSize: moderateScale(16),
            color: colors.text,
            textAlign: 'center',
        },
        statSubLabel: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '400',
            fontSize: moderateScale(10),
            color: colors.text,
            textAlign: 'center',
        },

        // ── Quote Card ────────────────────────────────────────────────────────────
        quoteContainer: {
            paddingHorizontal: moderateScale(16),
            marginBottom: moderateScale(24),
        },
        quoteCard: {
            flexDirection: 'row',
            alignItems: 'flex-start',
            backgroundColor: colors.inputBg,
            borderRadius: moderateScale(12),
            borderWidth: 0.5,
            borderColor: '#00000015',
            padding: moderateScale(16),
            gap: moderateScale(12),
        },
        quoteIconCircle: {
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
        quoteTextBlock: {
            flex: 1,
            gap: moderateScale(4),
        },
        quoteText: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '400',
            fontSize: moderateScale(13),
            color: colors.text,
            lineHeight: moderateScale(20),
        },
        quoteAttribution: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '400',
            fontSize: moderateScale(12),
            color: colors.textSub,
            marginTop: moderateScale(4),
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
        viewProgressBtn: {
            alignItems: 'center',
            paddingBottom: moderateScale(24),
        },
        viewProgressText: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '400',
            fontSize: moderateScale(14),
            color: colors.text,
            textDecorationLine: 'underline',
        },
    });