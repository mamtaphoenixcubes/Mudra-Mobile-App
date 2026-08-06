// Place this file at: assets/styles/mudra/practiceModeStyles.ts

import { StyleSheet, Dimensions } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const moderateScale = (size: number, factor = 0.5) =>
    size + ((SCREEN_WIDTH - 375) / 375) * size * factor;

export function getPracticeModeStyles(colors: any, isDark: boolean) {
    return StyleSheet.create({
        screen: {
            flex: 1,
        },
        headerBlock: {
            paddingHorizontal: moderateScale(20),
            paddingTop: moderateScale(8),
            marginBottom: moderateScale(4),
        },
        mudraName: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '500',
            fontSize: moderateScale(20),
            color: colors.text,
            textAlign: 'center',
        },
        mudraSubtitle: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '400',
            fontSize: moderateScale(12.5),
            color: colors.textSub,
            textAlign: 'center',
            marginTop: moderateScale(4),
            lineHeight: moderateScale(18),
        },

        // Tabs
        tabRow: {
            flexDirection: 'row',
            marginHorizontal: moderateScale(16),
            backgroundColor: isDark ? 'rgba(255,255,255,0.06)' : '#F0F0F0',
            borderRadius: moderateScale(14),
            padding: moderateScale(4),
            marginTop: moderateScale(18),
            marginBottom: moderateScale(6),
        },
        tabBtn: {
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: moderateScale(6),
            paddingVertical: moderateScale(10),
            borderRadius: moderateScale(11),
        },
        tabBtnActive: {
            backgroundColor: '#9A85FE',
        },
        tabLabel: {
            fontFamily: 'SF-Pro-Display',
            fontSize: moderateScale(13.5),
            fontWeight: '600',
            color: colors.textSub,
        },
        tabLabelActive: {
            color: '#FFFFFF',
        },

        // Stats row
        statsRow: {
            paddingHorizontal: moderateScale(20),
            marginBottom: moderateScale(14),
        },
        statsText: {
            fontFamily: 'SF-Pro-Display',
            fontSize: moderateScale(12.5),
            fontWeight: '500',
            color: colors.textSub,
        },

        // Variant list
        list: {
            paddingHorizontal: moderateScale(16),
            paddingBottom: moderateScale(30),
            gap: moderateScale(12),
        },
        variantCard: {
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: colors.card,
            borderRadius: moderateScale(16),
            padding: moderateScale(12),
            gap: moderateScale(12),
            borderWidth: 1,
            borderColor: isDark ? 'rgba(255,255,255,0.08)' : '#F0F0F0',
        },
        variantIconCircle: {
            width: moderateScale(48),
            height: moderateScale(48),
            borderRadius: moderateScale(24),
            alignItems: 'center',
            justifyContent: 'center',
        },
        variantTextBlock: {
            flex: 1,
            gap: moderateScale(3),
        },
        variantTitleRow: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: moderateScale(6),
        },
        variantTitle: {
            fontFamily: 'SF-Pro-Display',
            fontSize: moderateScale(14.5),
            fontWeight: '600',
            color: colors.text,
            flexShrink: 1,
        },
        recommendedBadge: {
            backgroundColor: '#9A85FE1A',
            borderRadius: moderateScale(20),
            paddingHorizontal: moderateScale(8),
            paddingVertical: moderateScale(2),
        },
        recommendedBadgeText: {
            fontFamily: 'SF-Pro-Display',
            fontSize: moderateScale(10),
            fontWeight: '700',
            color: '#9A85FE',
        },
        variantSubtitle: {
            fontFamily: 'SF-Pro-Display',
            fontSize: moderateScale(12),
            fontWeight: '400',
            color: colors.textSub,
        },
        playBtn: {
            width: moderateScale(38),
            height: moderateScale(38),
            borderRadius: moderateScale(19),
            backgroundColor: '#9A85FE',
            alignItems: 'center',
            justifyContent: 'center',
        },

        // Empty state
        emptyState: {
            alignItems: 'center',
            paddingTop: moderateScale(60),
            paddingHorizontal: moderateScale(32),
        },
        emptyStateText: {
            fontFamily: 'SF-Pro-Display',
            fontSize: moderateScale(13.5),
            color: colors.textSub,
            textAlign: 'center',
            marginTop: moderateScale(10),
        },

        playlistBadge: {
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#E1F5EE',
            borderRadius: moderateScale(20),
            paddingHorizontal: moderateScale(8),
            paddingVertical: moderateScale(2),
        },
        playlistBadgeText: {
            fontFamily: 'SF-Pro-Display',
            fontSize: moderateScale(10),
            fontWeight: '700',
            color: '#085041',
        },
    });
}