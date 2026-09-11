import { StyleSheet, Dimensions } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const moderateScale = (size: number, factor = 0.5) =>
    size + ((SCREEN_WIDTH - 375) / 375) * size * factor;

export function getRecommendedListStyles(colors: any) {
    return StyleSheet.create({
        screen: {
            flex: 1,
        },

        headerSection: {
            paddingHorizontal: moderateScale(20),
            paddingTop: moderateScale(8),
            marginBottom: moderateScale(16),
        },
        pageTitle: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '700',
            fontSize: moderateScale(20),
            color: colors.text,
            textAlign: 'center',
            paddingHorizontal: moderateScale(16),
            paddingTop: moderateScale(8),
            marginBottom: moderateScale(4),
        },
        pageSubtitle: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '400',
            fontSize: moderateScale(13),
            color: colors.textSub,
            lineHeight: moderateScale(19),
            marginTop: moderateScale(4),
        },

        listContent: {
            paddingHorizontal: moderateScale(16),
            paddingBottom: moderateScale(40),
            gap: moderateScale(12),
        },

        card: {
            flexDirection: 'row',
            alignItems: 'flex-start',
            gap: moderateScale(12),
            borderRadius: moderateScale(16),
            padding: moderateScale(12),
            borderWidth: 1,
            borderColor: 'rgba(0,0,0,0.05)',
        },
        thumb: {
            width: moderateScale(76),
            height: moderateScale(76),
            borderRadius: moderateScale(12),
            flexShrink: 0,
        },
        thumbPlaceholder: {
            backgroundColor: 'rgba(0,0,0,0.08)',
        },

        cardBody: {
            flex: 1,
            minWidth: 0,
            gap: moderateScale(4),
        },
        cardTitle: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '700',
            fontSize: moderateScale(14),
            color: '#1A1A1A',
        },
        metaRow: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: moderateScale(6),
        },
        metaText: {
            fontFamily: 'SF-Pro-Display',
            fontSize: moderateScale(11),
            color: 'rgba(0,0,0,0.45)',
        },
        dot: {
            width: moderateScale(3),
            height: moderateScale(3),
            borderRadius: moderateScale(1.5),
            backgroundColor: 'rgba(0,0,0,0.25)',
        },
        cardDesc: {
            fontFamily: 'SF-Pro-Display',
            fontSize: moderateScale(11),
            color: 'rgba(0,0,0,0.5)',
            lineHeight: moderateScale(15.5),
        },
        badge: {
            alignSelf: 'flex-start',
            borderRadius: moderateScale(20),
            paddingHorizontal: moderateScale(10),
            paddingVertical: moderateScale(3),
            marginTop: moderateScale(2),
        },
        badgeText: {
            fontFamily: 'SF-Pro-Display',
            fontSize: moderateScale(10),
            fontWeight: '500',
        },

        bookmarkBtn: {
            width: moderateScale(28),
            height: moderateScale(28),
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
        },

        emptyContainer: {
            paddingVertical: moderateScale(40),
            alignItems: 'center',
            justifyContent: 'center',
        },
        emptyText: {
            fontFamily: 'SF-Pro-Display',
            fontSize: moderateScale(15),
            fontWeight: '500',
            color: colors.textSub,
            textAlign: 'center',
        },
    });
}