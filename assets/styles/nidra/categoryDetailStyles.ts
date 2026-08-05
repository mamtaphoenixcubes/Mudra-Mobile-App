import { StyleSheet, Dimensions } from 'react-native';
import { lightColors } from '@/constants/ThemeContext'

const { width } = Dimensions.get('window');
const scale = (size: number) => (width / 375) * size;
const moderateScale = (size: number, factor = 0.5) =>
    size + (scale(size) - size) * factor;

export const getCategoryDetailStyles = (colors: typeof lightColors) =>
    StyleSheet.create({

        screen: { flex: 1, backgroundColor: colors.background },

        // ── Hero band — tinted panel, distinct from the plain screen bg ──────────
        heroBand: {
            backgroundColor: colors.surface,
            paddingHorizontal: moderateScale(20),
            paddingTop: moderateScale(16),
            paddingBottom: moderateScale(20),
            borderBottomLeftRadius: moderateScale(24),
            borderBottomRightRadius: moderateScale(24),
            marginBottom: moderateScale(16),
        },
        categoryTitle: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '500',
            fontSize: moderateScale(20),
            color: colors.text,
            letterSpacing: -0.4,
            marginBottom: moderateScale(6),
        },
        categoryDescription: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '400',
            fontSize: moderateScale(13.5),
            color: colors.textSub,
            lineHeight: moderateScale(19),
            marginBottom: moderateScale(16),
        },
        statsRow: {
            flexDirection: 'row',
            gap: moderateScale(10),
        },
        statChip: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: moderateScale(6),
            backgroundColor: colors.card,
            borderRadius: moderateScale(20),
            paddingHorizontal: moderateScale(14),
            paddingVertical: moderateScale(8),
        },
        statChipText: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '600',
            fontSize: moderateScale(12.5),
            color: colors.text,
        },

        // ── Practice list ─────────────────────────────────────────────────────────
        listContent: {
            paddingHorizontal: moderateScale(16),
            paddingTop: moderateScale(4),
            paddingBottom: moderateScale(24),
            gap: moderateScale(10),
        },
        practiceRow: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: moderateScale(12),
            backgroundColor: colors.card,
            borderRadius: moderateScale(14),
            borderWidth: 0.5,
            borderColor: colors.attrBorderTop,
            padding: moderateScale(12),
        },
        practiceThumbWrap: {
            width: moderateScale(58),
            height: moderateScale(58),
            borderRadius: moderateScale(12),
            overflow: 'hidden',
            flexShrink: 0,
        },
        practiceThumbImage: {
            width: '100%',
            height: '100%',
        },
        practiceThumbPlaceholder: {
            width: '100%',
            height: '100%',
            backgroundColor: colors.primaryMuted,
            alignItems: 'center',
            justifyContent: 'center',
        },
        practiceTextBlock: {
            flex: 1,
            minWidth: 0,
            gap: moderateScale(3),
        },
        practiceTitle: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '600',
            fontSize: moderateScale(14.5),
            color: colors.text,
        },
        practiceMetaRow: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: moderateScale(6),
        },
        practiceMetaText: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '400',
            fontSize: moderateScale(12),
            color: colors.textSub,
        },
        metaDot: {
            width: moderateScale(3),
            height: moderateScale(3),
            borderRadius: moderateScale(1.5),
            backgroundColor: colors.textMuted,
        },

        // ── Empty / loading / error ───────────────────────────────────────────────
        emptyContainer: {
            paddingVertical: moderateScale(60),
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: moderateScale(24),
        },
        emptyText: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '500',
            fontSize: moderateScale(14),
            color: colors.textSub,
            textAlign: 'center',
        },
    });