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
            marginBottom: moderateScale(18),
        },

        // Tabs — icon on top, label below (Option 9)
        tabScrollContent: {
            flexDirection: 'row',
            paddingHorizontal: moderateScale(16),
            gap: moderateScale(18),
            marginBottom: moderateScale(22),
        },
        tabItem: {
            alignItems: 'center',
            gap: moderateScale(6),
            width: moderateScale(64),
        },
        tabIconCircle: {
            width: moderateScale(44),
            height: moderateScale(44),
            borderRadius: moderateScale(22),
            backgroundColor: isDark ? 'rgba(255,255,255,0.06)' : '#F0F0F0',
            alignItems: 'center',
            justifyContent: 'center',
        },
        tabIconCircleActive: {
            backgroundColor: colors.primary,
        },
        tabLabel: {
            fontFamily: 'SF-Pro-Display',
            fontSize: moderateScale(12),
            fontWeight: '500',
            color: colors.textSub,
            textAlign: 'center',
        },
        tabLabelActive: {
            fontWeight: '700',
            color: colors.primary,
        },

        // Grid — attractive card treatment, used by Mudras, Asana, Pranayama
        mudraGrid: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            paddingHorizontal: moderateScale(16),
            gap: moderateScale(14),
        },
        mudraCard: {
            width: (SCREEN_WIDTH - moderateScale(16) * 2 - moderateScale(14)) / 2,
            borderRadius: moderateScale(22),
            paddingVertical: moderateScale(20),
            paddingHorizontal: moderateScale(12),
            alignItems: 'center',
            gap: moderateScale(9),
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.1,
            shadowRadius: 16,
            elevation: 6,
        },
        mudraImageWrapper: {
            width: moderateScale(90),
            height: moderateScale(90),
            borderRadius: moderateScale(45),
            overflow: 'hidden',
            borderWidth: moderateScale(3.5),
            borderColor: 'rgba(255,255,255,0.95)',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.14,
            shadowRadius: 10,
            elevation: 5,
        },
        mudraImage: {
            width: '100%',
            height: '100%',
        },
        mudraName: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '700',
            fontSize: moderateScale(13.5),
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
            backgroundColor: 'rgba(255,255,255,0.75)',
            paddingHorizontal: moderateScale(9),
            paddingVertical: moderateScale(4.5),
            borderRadius: moderateScale(20),
            marginTop: moderateScale(2),
        },
        mudraTime: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '600',
            fontSize: moderateScale(11),
            color: '#0F0F0F80',
        },

        // List — used by Nidras, Meditation
        nidraList: {
            backgroundColor: colors.card,
            marginHorizontal: moderateScale(16),
            borderRadius: moderateScale(18),
            borderWidth: 1,
            borderColor: isDark ? 'rgba(255,255,255,0.08)' : '#F0F0F0',
            overflow: 'hidden',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.05,
            shadowRadius: 10,
            elevation: 2,
        },
        nidraRow: {
            flexDirection: 'row',
            alignItems: 'center',
            padding: moderateScale(13),
            gap: moderateScale(12),
        },
        nidraThumb: {
            width: moderateScale(58),
            height: moderateScale(58),
            borderRadius: moderateScale(14),
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
            backgroundColor: colors.primary,
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
            marginLeft: moderateScale(13) + moderateScale(58) + moderateScale(12),
        },
    });
}