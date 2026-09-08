import { StyleSheet, Dimensions } from 'react-native';
import { lightColors } from '@/constants/ThemeContext';

const { width } = Dimensions.get('window');
const scale = (size: number) => (width / 375) * size;
const moderateScale = (size: number, factor = 0.5) =>
    size + (scale(size) - size) * factor;

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

        contentWrapper: {
            width: '100%',
            maxWidth: MAX_CONTENT_WIDTH,
            alignSelf: 'center',
        },

        subjectSection: {
            paddingHorizontal: moderateScale(20),
            paddingTop: moderateScale(16),
            paddingBottom: moderateScale(16),
            borderBottomWidth: 1,
            borderBottomColor: colors.border,
        },
        eyebrow: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '700',
            fontSize: moderateScale(11),
            letterSpacing: moderateScale(1.4),
            color: colors.primary,
            marginBottom: moderateScale(6),
        },
        subjectTitle: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '700',
            fontSize: moderateScale(19),
            color: colors.text,
            lineHeight: moderateScale(26),
        },
        accentBar: {
            width: moderateScale(32),
            height: moderateScale(3),
            borderRadius: moderateScale(2),
            backgroundColor: colors.primary,
            marginTop: moderateScale(10),
            marginBottom: moderateScale(8),
        },
        statusText: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '600',
            fontSize: moderateScale(11.5),
            color: colors.textSub,
        },

        threadSection: {
            paddingHorizontal: moderateScale(16),
            paddingTop: moderateScale(16),
            gap: moderateScale(12),
        },
        messageCard: {
            backgroundColor: colors.card,
            borderRadius: moderateScale(18),
            borderWidth: 1,
            borderColor: colors.border,
            padding: moderateScale(14),
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.03,
            shadowRadius: 6,
            elevation: 1,
        },
        replyCard: {
            backgroundColor: colors.primaryMuted ?? colors.card,
            borderRadius: moderateScale(18),
            borderWidth: 1,
            borderColor: colors.primaryBorder ?? colors.border,
            padding: moderateScale(14),
        },
        messageHeaderRow: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: moderateScale(10),
            marginBottom: moderateScale(8),
        },
        avatarCircle: {
            width: moderateScale(32),
            height: moderateScale(32),
            borderRadius: moderateScale(16),
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
        },
        senderName: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '700',
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
            lineHeight: moderateScale(20.5),
            color: colors.text,
        },

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

        composerWrapper: {
            paddingHorizontal: moderateScale(16),
            paddingTop: moderateScale(12),
            paddingBottom: moderateScale(12),
            backgroundColor: colors.background,
            borderTopWidth: 1,
            borderTopColor: colors.border,
        },
        composerRow: {
            flexDirection: 'row',
            alignItems: 'flex-end',
            gap: moderateScale(10),
            backgroundColor: colors.card,
            borderWidth: 1,
            borderColor: colors.border,
            borderRadius: moderateScale(20),
            paddingHorizontal: moderateScale(14),
            paddingVertical: moderateScale(6),
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.05,
            shadowRadius: 8,
            elevation: 2,
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
            width: moderateScale(34),
            height: moderateScale(34),
            borderRadius: moderateScale(17),
            backgroundColor: colors.primary,
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: moderateScale(2),
        },
        sendCircleDisabled: {
            opacity: 0.5,
        },
    });