import { StyleSheet, Dimensions } from 'react-native';
import { lightColors } from '@/constants/ThemeContext';

const { width } = Dimensions.get('window');
const scale = (size: number) => (width / 375) * size;
const moderateScale = (size: number, factor = 0.5) =>
    size + (scale(size) - size) * factor;

// Content is capped and centered past this width so it doesn't
// stretch edge-to-edge on tablets / large screens.
const MAX_CONTENT_WIDTH = 600;

export const getTicketDetailStyles = (colors: typeof lightColors) =>
    StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.background,
        },
        scrollContent: {
            flexGrow: 1,
            paddingBottom: moderateScale(24),
        },

        // ── Content wrapper (handles tablet/large-screen centering) ──────────────
        contentWrapper: {
            width: '100%',
            maxWidth: MAX_CONTENT_WIDTH,
            alignSelf: 'center',
        },

        // ── Header / subject section ──────────────────────────────────────────────
        subjectSection: {
            paddingHorizontal: moderateScale(20),
            paddingTop: moderateScale(16),
        },
        eyebrow: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '600',
            fontSize: moderateScale(11),
            letterSpacing: 1,
            color: colors.primary,
            marginBottom: moderateScale(6),
        },
        subjectTitle: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '600',
            fontSize: moderateScale(20),
            color: colors.text,
            lineHeight: moderateScale(27),
        },
        accentBar: {
            width: moderateScale(36),
            height: moderateScale(3),
            borderRadius: moderateScale(2),
            backgroundColor: colors.primary,
            marginTop: moderateScale(12),
            marginBottom: moderateScale(6),
        },
        statusText: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '500',
            fontSize: moderateScale(12),
            color: colors.textSub,
            marginBottom: moderateScale(8),
        },

        // ── Message thread ───────────────────────────────────────────────────────
        threadSection: {
            paddingHorizontal: moderateScale(16),
            paddingTop: moderateScale(8),
            gap: moderateScale(14),
        },
        messageCard: {
            backgroundColor: colors.card,
            borderRadius: moderateScale(16),
            borderWidth: 1,
            borderColor: colors.border,
            padding: moderateScale(14),
        },
        replyCard: {
            backgroundColor: colors.primaryMuted ?? colors.card,
            borderRadius: moderateScale(16),
            borderWidth: 1,
            borderColor: colors.primaryBorder ?? colors.border,
            padding: moderateScale(14),
        },
        messageHeaderRow: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: moderateScale(8),
            marginBottom: moderateScale(8),
        },
        avatarCircle: {
            width: moderateScale(30),
            height: moderateScale(30),
            borderRadius: moderateScale(15),
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
        },
        senderName: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '600',
            fontSize: moderateScale(13),
            color: colors.text,
        },
        senderTime: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '400',
            fontSize: moderateScale(11),
            color: colors.textSub,
        },
        messageBody: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '400',
            fontSize: moderateScale(13.5),
            lineHeight: moderateScale(20),
            color: colors.text,
        },

        // ── Empty / loading states ───────────────────────────────────────────────
        centerState: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: moderateScale(32),
            paddingTop: moderateScale(60),
        },
        emptyStateText: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '500',
            fontSize: moderateScale(13.5),
            color: colors.textSub,
            textAlign: 'center',
            marginTop: moderateScale(12),
        },

        // ── Follow-up composer ────────────────────────────────────────────────────
        composerWrapper: {
            paddingHorizontal: moderateScale(16),
            paddingTop: moderateScale(12),
            paddingBottom: moderateScale(12),
            borderTopWidth: 1,
            borderTopColor: colors.border,
        },
        composerRow: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: moderateScale(10),
            backgroundColor: colors.inputBg,
            borderWidth: 1,
            borderColor: colors.border,
            borderRadius: moderateScale(14),
            paddingHorizontal: moderateScale(14),
            paddingVertical: moderateScale(6),
        },
        composerInput: {
            flex: 1,
            fontFamily: 'SF-Pro-Display',
            fontSize: moderateScale(13.5),
            color: colors.text,
            maxHeight: moderateScale(100),
            paddingVertical: moderateScale(8),
        },
        sendCircle: {
            width: moderateScale(32),
            height: moderateScale(32),
            borderRadius: moderateScale(16),
            backgroundColor: colors.primary,
            alignItems: 'center',
            justifyContent: 'center',
        },
        sendCircleDisabled: {
            opacity: 0.5,
        },
    });