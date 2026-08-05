import { StyleSheet, Dimensions } from 'react-native';
import { lightColors } from '@/constants/ThemeContext'

const { width } = Dimensions.get('window');
const scale = (size: number) => (width / 375) * size;
const moderateScale = (size: number, factor = 0.5) =>
    size + (scale(size) - size) * factor;

export const getReminderStyles = (colors: typeof lightColors) =>
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

        // ── Overview Card ─────────────────────────────────────────────────────────
        overviewContainer: {
            paddingHorizontal: moderateScale(16),
            marginBottom: moderateScale(24),
        },
        overviewCard: {
            backgroundColor: colors.primaryMuted,
            borderRadius: moderateScale(14),
            padding: moderateScale(16),
        },
        overviewTitle: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '500',
            fontSize: moderateScale(14),
            color: colors.text,
            marginBottom: moderateScale(16),
        },
        overviewStatsRow: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        overviewStatItem: {
            flex: 1,
            alignItems: 'center',
            gap: moderateScale(6),
        },
        overviewStatDivider: {
            width: 1.5,
            height: moderateScale(100),
            backgroundColor: colors.reminderDivider,
        },
        overviewIconCircle: {
            width: moderateScale(44),
            height: moderateScale(44),
            borderRadius: moderateScale(22),
            backgroundColor: '#FFFFFF',
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 0.5,
            borderColor: '#00000015',
        },
        overviewStatValue: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '500',
            fontSize: moderateScale(20),
            color: colors.text,
        },
        overviewStatLabel: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '600',
            fontSize: moderateScale(11),
            color: colors.textSub,
            textAlign: 'center',
            lineHeight: moderateScale(15),
        },

        // ── Section Title ─────────────────────────────────────────────────────────
        sectionTitle: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '500',
            fontSize: moderateScale(18),
            color: colors.text,
            paddingHorizontal: moderateScale(16),
            marginBottom: moderateScale(12),
        },

        // ── Reminder Type Card ────────────────────────────────────────────────────
        reminderTypeContainer: {
            paddingHorizontal: moderateScale(16),
            marginBottom: moderateScale(24),
            gap: moderateScale(12),
        },
        reminderCard: {
            backgroundColor: colors.inputBg,
            borderRadius: moderateScale(12),
            overflow: 'hidden',
            borderWidth: 0.5,
            borderColor: '#00000015',
        },
        reminderCardTop: {
            flexDirection: 'row',
            alignItems: 'center',
            padding: moderateScale(14),
            gap: moderateScale(12),
        },
        reminderIconBox: {
            width: moderateScale(52),
            height: moderateScale(52),
            borderRadius: moderateScale(4),
            backgroundColor: '#FFFFFF',
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 0.6,
            borderColor: '#0F0F0F66',
            flexShrink: 0,
        },
        reminderTextBlock: {
            flex: 1,
            gap: moderateScale(3),
        },
        reminderCardTitle: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '500',
            fontSize: moderateScale(15),
            color: colors.text,
        },
        reminderCardSubtitle: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '400',
            fontSize: moderateScale(12),
            color: colors.textSub,
            lineHeight: moderateScale(17),
        },
        reminderRowDivider: {
            height: 0.6,
            backgroundColor: colors.dividerDark,
            marginHorizontal: moderateScale(14),
        },
        reminderRow: {
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: moderateScale(14),
            paddingVertical: moderateScale(12),
            gap: moderateScale(10),
        },
        reminderRowLabel: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '400',
            fontSize: moderateScale(13),
            color: colors.text,
            flex: 1,
        },
        reminderRowValue: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '500',
            fontSize: moderateScale(13),
            color: colors.text,
            marginRight: moderateScale(6),
        },
        reminderTimeBox: {
            borderWidth: 0.6,
            borderColor: '#0F0F0F66',
            borderRadius: moderateScale(4),
            paddingHorizontal: moderateScale(8),
            paddingVertical: moderateScale(4),
            marginRight: moderateScale(6),
            backgroundColor: colors.white,
        },
        reminderTimeText: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '500',
            fontSize: moderateScale(13),
            color: '#0F0F0F',
        },

        // ── Preferences Card ──────────────────────────────────────────────────────
        prefsContainer: {
            paddingHorizontal: moderateScale(16),
            marginBottom: moderateScale(24),
        },
        prefsCard: {
            backgroundColor: colors.inputBg,
            borderRadius: moderateScale(12),
            borderWidth: 0.5,
            borderColor: '#00000015',
            overflow: 'hidden',
        },
        prefsRow: {
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: moderateScale(14),
            paddingVertical: moderateScale(14),
            gap: moderateScale(12),
        },
        prefsRowDivider: {
            height: 0.6,
            backgroundColor: colors.dividerDark,
            marginHorizontal: moderateScale(14),
        },
        prefsRowLabel: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '400',
            fontSize: moderateScale(14),
            color: colors.text,
            flex: 1,
        },
        prefsRowValue: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '400',
            fontSize: moderateScale(13),
            color: colors.text,
            marginRight: moderateScale(6),
        },
        prefsRowSubtext: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '400',
            fontSize: moderateScale(11),
            color: colors.textSub,
            lineHeight: moderateScale(15),
            marginTop: moderateScale(2),
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