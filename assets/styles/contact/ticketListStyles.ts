import { StyleSheet, Dimensions } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const moderateScale = (size: number, factor = 0.5) =>
    size + ((SCREEN_WIDTH - 375) / 375) * size * factor;

export function getTicketListStyles(colors: any) {
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.background,
        },

        headerSection: {
            paddingHorizontal: moderateScale(20),
            paddingTop: moderateScale(8),
            paddingBottom: moderateScale(18),
            borderBottomWidth: 1,
            borderBottomColor: colors.border,
            marginBottom: moderateScale(16),
        },
        eyebrow: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '700',
            fontSize: moderateScale(11),
            letterSpacing: moderateScale(1.6),
            color: colors.primary,
            marginBottom: moderateScale(6),
        },
        heroTitle: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '700',
            fontSize: moderateScale(23),
            color: colors.text,
        },
        accentBar: {
            width: moderateScale(36),
            height: moderateScale(3),
            borderRadius: moderateScale(2),
            backgroundColor: colors.primary,
            marginVertical: moderateScale(10),
        },
        heroSubtitle: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '400',
            fontSize: moderateScale(13),
            color: colors.textSub,
            lineHeight: moderateScale(19),
        },

        listContent: {
            paddingHorizontal: moderateScale(16),
            paddingBottom: moderateScale(40),
            gap: moderateScale(10),
        },

        ticketCard: {
            flexDirection: 'row',
            alignItems: 'flex-start',
            gap: moderateScale(12),
            backgroundColor: colors.card,
            borderRadius: moderateScale(16),
            borderWidth: 1,
            borderColor: colors.border,
            padding: moderateScale(14),
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.04,
            shadowRadius: 8,
            elevation: 1,
        },
        avatarCircle: {
            width: moderateScale(40),
            height: moderateScale(40),
            borderRadius: moderateScale(20),
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
        },
        ticketTextBlock: {
            flex: 1,
            minWidth: 0,
        },
        ticketTopRow: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: moderateScale(8),
        },
        ticketSubject: {
            flex: 1,
            fontFamily: 'SF-Pro-Display',
            fontWeight: '600',
            fontSize: moderateScale(14.5),
            color: colors.text,
        },
        ticketTime: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '500',
            fontSize: moderateScale(11),
            color: colors.textMuted,
            flexShrink: 0,
        },
        ticketPreview: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '400',
            fontSize: moderateScale(12.5),
            color: colors.textSub,
            lineHeight: moderateScale(18),
            marginTop: moderateScale(4),
        },
        ticketBottomRow: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: moderateScale(10),
            marginTop: moderateScale(10),
        },
        statusBadge: {
            paddingHorizontal: moderateScale(10),
            paddingVertical: moderateScale(4),
            borderRadius: moderateScale(20),
        },
        statusBadgeText: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '700',
            fontSize: moderateScale(10),
            letterSpacing: moderateScale(0.3),
        },
        replyCountText: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '500',
            fontSize: moderateScale(11.5),
            color: colors.textMuted,
        },

        emptyState: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            gap: moderateScale(10),
            paddingHorizontal: moderateScale(32),
            paddingTop: moderateScale(40),
        },
        emptyStateText: {
            fontFamily: 'SF-Pro-Display',
            fontSize: moderateScale(13.5),
            color: colors.textSub,
            textAlign: 'center',
        },
    });
}