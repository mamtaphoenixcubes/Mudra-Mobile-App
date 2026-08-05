import { StyleSheet, Dimensions } from 'react-native';
import { lightColors } from '@/constants/ThemeContext'

const { width } = Dimensions.get('window');
const scale = (size: number) => (width / 375) * size;
const moderateScale = (size: number, factor = 0.5) =>
    size + (scale(size) - size) * factor;

export const getPlanDetailStyles = (colors: typeof lightColors) =>
    StyleSheet.create({
        screen: { flex: 1, backgroundColor: colors.background },
        scrollContent: {
            paddingHorizontal: moderateScale(16),
            paddingBottom: moderateScale(24),
        },
        pageTitle: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '500',
            fontSize: moderateScale(20),
            color: colors.text,
            textAlign: 'center',
            marginTop: moderateScale(8),
            marginBottom: moderateScale(4),
        },
        pageSubtitle: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '400',
            fontSize: moderateScale(13),
            color: colors.textSub,
            textAlign: 'center',
            marginBottom: moderateScale(20),
        },

        priceCard: {
            backgroundColor: colors.primaryMuted,
            borderRadius: moderateScale(16),
            padding: moderateScale(20),
            alignItems: 'center',
            marginBottom: moderateScale(20),
        },
        priceCardBadge: {
            backgroundColor: colors.primary,
            borderRadius: moderateScale(20),
            paddingHorizontal: moderateScale(12),
            paddingVertical: moderateScale(4),
            marginBottom: moderateScale(10),
        },
        priceCardBadgeText: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '600',
            fontSize: moderateScale(11),
            color: '#FFFFFF',
        },
        priceCardPlanName: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '600',
            fontSize: moderateScale(16),
            color: colors.text,
            marginBottom: moderateScale(4),
        },
        priceCardPrice: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '700',
            fontSize: moderateScale(34),
            color: colors.text,
        },
        priceCardPeriod: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '400',
            fontSize: moderateScale(14),
            color: colors.textSub,
        },
        priceCardBilling: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '400',
            fontSize: moderateScale(12),
            color: colors.textSub,
            marginTop: moderateScale(6),
        },

        sectionLabel: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '600',
            fontSize: moderateScale(14),
            color: colors.text,
            marginBottom: moderateScale(12),
        },
        featuresCard: {
            backgroundColor: colors.card,
            borderRadius: moderateScale(14),
            borderWidth: 0.5,
            borderColor: colors.border,
            padding: moderateScale(16),
            marginBottom: moderateScale(24),
        },
        featureRow: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: moderateScale(10),
            paddingVertical: moderateScale(8),
        },
        featureText: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '400',
            fontSize: moderateScale(14),
            color: colors.text,
            flex: 1,
        },

        getStartedBtn: {
            backgroundColor: colors.primary,
            borderRadius: moderateScale(14),
            paddingVertical: moderateScale(16),
            alignItems: 'center',
        },
        getStartedBtnText: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '600',
            fontSize: moderateScale(16),
            color: '#FFFFFF',
        },
    });