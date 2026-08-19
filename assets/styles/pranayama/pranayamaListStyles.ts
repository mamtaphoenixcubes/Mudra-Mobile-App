// assets/styles/pranayama/pranayamaListStyles.ts
import { StyleSheet, Dimensions, Platform } from 'react-native';
import { lightColors } from '@/constants/ThemeContext';

const { width } = Dimensions.get('window');
const scale = (size: number) => (width / 375) * size;
const moderateScale = (size: number, factor = 0.5) =>
    size + (scale(size) - size) * factor;

const PRANAYAMA_LIST_IMAGE_SIZE = moderateScale(84);

export const getPranayamaListStyles = (colors: typeof lightColors) =>
    StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.background,
        },

        pageTitle: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '600',
            fontSize: moderateScale(20),
            color: colors.text,
            textAlign: 'center',
            paddingHorizontal: moderateScale(16),
            paddingTop: moderateScale(8),
            marginBottom: moderateScale(4),
        },

        // ── Sub-header (count row) ──────────────────────────────────────────────
        subHeaderRow: {
            paddingHorizontal: moderateScale(16),
            paddingTop: moderateScale(6),
            paddingBottom: moderateScale(4),
        },
        subHeaderText: {
            fontFamily: 'SF-Pro-Display',
            fontSize: moderateScale(12.5),
            fontWeight: '500',
            color: colors.textSub,
        },

        // ── List ──────────────────────────────────────────────────────────────
        listContent: {
            paddingHorizontal: moderateScale(16),
            paddingTop: moderateScale(8),
            paddingBottom: moderateScale(28),
        },

        // ── Card (mudra-card style: circular image, centered content) ───────────
        card: {
            marginBottom: moderateScale(16),
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
        cardImageWrapper: {
            width: PRANAYAMA_LIST_IMAGE_SIZE,
            height: PRANAYAMA_LIST_IMAGE_SIZE,
            borderRadius: PRANAYAMA_LIST_IMAGE_SIZE / 2,
            overflow: 'hidden',
            borderWidth: moderateScale(3),
            borderColor: 'rgba(255,255,255,0.9)',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 3 },
            shadowOpacity: 0.12,
            shadowRadius: 8,
            elevation: 4,
        },
        cardImage: {
            width: '100%',
            height: '100%',
        },
        cardBadge: {
            borderRadius: moderateScale(20),
            paddingHorizontal: moderateScale(9),
            paddingVertical: moderateScale(4),
        },
        cardBadgeText: {
            fontFamily: 'SF-Pro-Display',
            fontSize: moderateScale(10),
            fontWeight: '600',
        },
        cardTitle: {
            fontFamily: 'SF-Pro-Display',
            fontSize: moderateScale(13),
            fontWeight: '700',
            color: '#0F0F0F',
            textAlign: 'center',
        },
        cardSubtitle: {
            fontFamily: 'SF-Pro-Display',
            fontSize: moderateScale(11),
            fontWeight: '400',
            color: '#0F0F0F70',
            textAlign: 'center',
            lineHeight: moderateScale(15),
        },
        cardFooter: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
        },
        cardMeta: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: moderateScale(4),
            backgroundColor: 'rgba(255,255,255,0.7)',
            paddingHorizontal: moderateScale(8),
            paddingVertical: moderateScale(4),
            borderRadius: moderateScale(20),
        },
        cardMetaText: {
            fontFamily: 'SF-Pro-Display',
            fontSize: moderateScale(11),
            fontWeight: '500',
            color: '#0F0F0F80',
        },

        // ── Empty state ───────────────────────────────────────────────────────
        emptyState: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: moderateScale(90),
            gap: moderateScale(10),
        },
        emptyText: {
            fontFamily: 'SF-Pro-Display',
            fontSize: moderateScale(13),
            color: colors.textSub,
        },
    });