
import { StyleSheet, Dimensions } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const moderateScale = (size: number, factor = 0.5) =>
    size + ((SCREEN_WIDTH - 375) / 375) * size * factor;

export function getMoodResultsStyles(colors: any, isDark: boolean) {
    return StyleSheet.create({
        screen: {
            flex: 1,
        },
        pageTitle: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '600',
            fontSize: moderateScale(20),
            color: colors.text,
            textAlign: 'center',
            paddingHorizontal: moderateScale(16),
            marginTop: moderateScale(8),
        },
        pageSubtitle: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '400',
            fontSize: moderateScale(12.5),
            color: colors.textSub,
            textAlign: 'center',
            paddingHorizontal: moderateScale(28),
            marginTop: moderateScale(4),
            marginBottom: moderateScale(16),
        },

        // Tabs
        tabRow: {
            flexDirection: 'row',
            marginHorizontal: moderateScale(16),
            backgroundColor: isDark ? 'rgba(255,255,255,0.06)' : '#F0F0F0',
            borderRadius: moderateScale(14),
            padding: moderateScale(4),
            marginBottom: moderateScale(20),
        },
        tabBtn: {
            flex: 1,
            paddingVertical: moderateScale(10),
            borderRadius: moderateScale(11),
            alignItems: 'center',
        },
        tabBtnActive: {
            backgroundColor: colors.card,
            shadowColor: '#000',
            shadowOpacity: 0.06,
            shadowRadius: 6,
            shadowOffset: { width: 0, height: 2 },
            elevation: 2,
        },
        tabLabel: {
            fontFamily: 'SF-Pro-Display',
            fontSize: moderateScale(13.5),
            fontWeight: '600',
            color: colors.textSub,
        },
        tabLabelActive: {
            color: colors.primary,
        },

        // Mudras grid — matches PracticeMudrasSection card style, laid out
        // column-wise (2 per row) instead of the horizontal scroll used there.
        mudraGrid: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            paddingHorizontal: moderateScale(16),
            gap: moderateScale(12),
        },
        mudraCard: {
            width: (SCREEN_WIDTH - moderateScale(16) * 2 - moderateScale(12)) / 2,
            borderRadius: moderateScale(20),
            paddingVertical: moderateScale(18),
            paddingHorizontal: moderateScale(12),
            alignItems: 'center',
            gap: moderateScale(8),
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 6 },
            shadowOpacity: 0.08,
            shadowRadius: 14,
            elevation: 5,
        },
        mudraImageWrapper: {
            width: moderateScale(84),
            height: moderateScale(84),
            borderRadius: moderateScale(42),
            overflow: 'hidden',
            borderWidth: moderateScale(3),
            borderColor: 'rgba(255,255,255,0.9)',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 3 },
            shadowOpacity: 0.12,
            shadowRadius: 8,
            elevation: 4,
        },
        mudraImage: {
            width: '100%',
            height: '100%',
        },
        mudraName: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '700',
            fontSize: moderateScale(13),
            color: '#0F0F0F',
            textAlign: 'center',
        },
        mudraDesc: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '400',
            fontSize: moderateScale(11),
            color: '#0F0F0F70',
            textAlign: 'center',
            lineHeight: moderateScale(15),
        },
        mudraTimeRow: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: moderateScale(4),
            backgroundColor: 'rgba(255,255,255,0.7)',
            paddingHorizontal: moderateScale(8),
            paddingVertical: moderateScale(4),
            borderRadius: moderateScale(20),
            marginTop: moderateScale(2),
        },
        mudraTime: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '500',
            fontSize: moderateScale(11),
            color: '#0F0F0F80',
        },

        // Nidras list
        nidraList: {
            backgroundColor: colors.card,
            marginHorizontal: moderateScale(16),
            borderRadius: moderateScale(16),
            borderWidth: 1,
            borderColor: isDark ? 'rgba(255,255,255,0.08)' : '#F0F0F0',
            overflow: 'hidden',
        },
        nidraRow: {
            flexDirection: 'row',
            alignItems: 'center',
            padding: moderateScale(12),
            gap: moderateScale(12),
        },
        nidraThumb: {
            width: moderateScale(56),
            height: moderateScale(56),
            borderRadius: moderateScale(12),
        },
        nidraTextBlock: {
            flex: 1,
        },
        nidraName: {
            fontFamily: 'SF-Pro-Display',
            fontSize: moderateScale(14.5),
            fontWeight: '600',
            color: colors.text,
        },
        nidraMeta: {
            fontFamily: 'SF-Pro-Display',
            fontSize: moderateScale(12),
            color: colors.textSub,
            marginTop: moderateScale(3),
        },
        nidraPlayBtn: {
            width: moderateScale(34),
            height: moderateScale(34),
            borderRadius: moderateScale(17),
            backgroundColor: isDark ? 'rgba(255,255,255,0.15)' : '#B9B9B9',
            alignItems: 'center',
            justifyContent: 'center',
        },
        nidraMoreBtn: {
            width: moderateScale(28),
            alignItems: 'center',
        },
        nidraDivider: {
            height: 1,
            backgroundColor: isDark ? 'rgba(255,255,255,0.08)' : '#F0F0F0',
            marginLeft: moderateScale(12) + moderateScale(56) + moderateScale(12),
        },
    });
}