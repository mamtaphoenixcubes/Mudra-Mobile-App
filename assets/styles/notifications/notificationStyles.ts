import { StyleSheet, Dimensions, Platform, StatusBar } from 'react-native';
import { colors, spacing, radius } from '@/constants/theme';
import { lightColors } from '@/constants/ThemeContext'

const { width } = Dimensions.get('window');
const scale = (size: number) => (width / 375) * size;

const STATUS_BAR_HEIGHT = Platform.OS === 'android'
    ? StatusBar.currentHeight ?? 24
    : 0;

export const getNotificationStyles = (themeColors: typeof lightColors) =>
    StyleSheet.create({

        // ── Screen ────────────────────────────────────────
        screen: {
            flex: 1,
            backgroundColor: themeColors.background,
        },

        // ── Header ────────────────────────────────────────
        header: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: spacing.lg,
            paddingTop: Platform.OS === 'android' ? STATUS_BAR_HEIGHT + spacing.sm : spacing.sm,
            paddingBottom: spacing.md,
            backgroundColor: themeColors.background,
        },
        headerTitle: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '600',
            fontSize: scale(17),
            color: themeColors.text,
            textAlign: 'center',
        },
        headerIcon: {
            width: scale(36),
            height: scale(36),
            alignItems: 'center',
            justifyContent: 'center',
        },

        // ── Filter Tabs ───────────────────────────────────
        tabsWrapper: {
            flexDirection: 'row',
            marginHorizontal: spacing.lg,
            marginBottom: spacing.lg,
            borderRadius: 10,
            backgroundColor: colors.primary,
            padding: scale(4),
        },
        tab: {
            flex: 1,
            paddingVertical: scale(10),
            borderRadius: 6,
            alignItems: 'center',
            justifyContent: 'center',
        },
        tabActive: {
            backgroundColor: '#FFFFFF',
            borderRadius: 6,
        },
        tabText: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '500',
            fontSize: scale(14),
            color: '#FFFFFF',
            textAlign: 'center',
        },
        tabTextActive: {
            color: colors.black,
        },

        // ── Section Header ────────────────────────────────
        sectionHeader: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: spacing.lg,
            marginBottom: spacing.sm,
            marginTop: spacing.sm,
        },
        sectionTitle: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '500',
            fontSize: scale(16),
            color: themeColors.text,
        },
        markAllRead: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '400',
            fontSize: scale(14),
            color: colors.primary,
            textDecorationLine: 'underline',
            textAlign: 'right',
        },

        // ── Notification Item ─────────────────────────────
        itemSwipeWrapper: {
            marginHorizontal: spacing.lg,
            marginBottom: spacing.sm,
        },
        itemWrapper: {
            flexDirection: 'row',
            alignItems: 'center',
            borderRadius: scale(6),
            backgroundColor: themeColors.inputBg,
            borderWidth: 0.5,
            borderColor: '#00000033',
            paddingHorizontal: spacing.md,
            paddingVertical: scale(12),
        },
        itemClearAction: {
            backgroundColor: '#E45858',
            justifyContent: 'center',
            alignItems: 'center',
            width: scale(64),
            marginLeft: spacing.sm,
            borderRadius: scale(6),
        },
        iconCircle: {
            width: scale(44),
            height: scale(44),
            borderRadius: scale(22),
            backgroundColor: '#F3F3F3',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: spacing.md,
            borderWidth: 0.5,
            borderColor: '#00000020',
        },
        itemContent: {
            flex: 1,
        },
        itemTitle: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '500',
            fontSize: scale(14),
            color: themeColors.text,
            marginBottom: 2,
        },
        itemSubtitle: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '400',
            fontSize: scale(12),
            color: themeColors.textSub,
            lineHeight: scale(17),
        },
        itemRight: {
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            alignSelf: 'stretch',
            marginLeft: spacing.sm,
            paddingVertical: 2,
        },
        itemTime: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '400',
            fontSize: scale(12),
            color: themeColors.textMuted,
            marginBottom: spacing.xs,
        },
        unreadDot: {
            width: scale(7),
            height: scale(7),
            borderRadius: scale(4),
            backgroundColor: themeColors.text,
        },

        // ── Empty State ───────────────────────────────────
        emptyState: {
            alignItems: 'center',
            paddingVertical: spacing.xxl * 2,
            paddingBottom: 100,
        },
        emptyIconCircle: {
            width: scale(64),
            height: scale(64),
            borderRadius: scale(32),
            backgroundColor: themeColors.inputBg,
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: spacing.md,
            borderWidth: 0.5,
            borderColor: '#00000020',
        },
        emptyTitle: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '500',
            fontSize: scale(15),
            color: themeColors.text,
            marginBottom: spacing.xs,
            textAlign: 'center',
        },
        emptySubtitle: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '400',
            fontSize: scale(13),
            color: themeColors.textSub,
            textAlign: 'center',
            paddingHorizontal: spacing.xxl,
        },

        // ── Scroll content ────────────────────────────────
        scrollContent: {
            paddingBottom: 120,
        },

        pageTitle: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '600',
            fontSize: 20,
            color: themeColors.text,
            textAlign: 'center',
            marginBottom: 4,
            paddingHorizontal: 16,
        },
    });