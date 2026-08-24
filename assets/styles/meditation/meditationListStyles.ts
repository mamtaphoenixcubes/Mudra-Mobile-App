
import { StyleSheet, Dimensions, Platform } from 'react-native';
import { lightColors } from '@/constants/ThemeContext';

const { width } = Dimensions.get('window');
const scale = (size: number) => (width / 375) * size;
const moderateScale = (size: number, factor = 0.5) =>
    size + (scale(size) - size) * factor;

export const getMeditationListStyles = (colors: typeof lightColors) =>
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

        // ── Card ──────────────────────────────────────────────────────────────
        card: {
            marginBottom: moderateScale(16),
            borderRadius: moderateScale(18),
            backgroundColor: colors.card,
            borderWidth: 1,
            borderColor: colors.border,
            overflow: 'hidden',
            ...Platform.select({
                ios: {
                    shadowColor: '#000',
                    shadowOpacity: 0.06,
                    shadowRadius: moderateScale(8),
                    shadowOffset: { width: 0, height: moderateScale(3) },
                },
                android: {
                    elevation: 2,
                },
            }),
        },
        cardImageWrapper: {
            width: '100%',
            aspectRatio: 1.15,
        },
        cardImage: {
            width: '100%',
            height: '100%',
        },
        cardBody: {
            padding: moderateScale(12),
        },
        cardBadge: {
            alignSelf: 'flex-start',
            borderRadius: moderateScale(20),
            paddingHorizontal: moderateScale(9),
            paddingVertical: moderateScale(4),
            marginBottom: moderateScale(8),
        },
        cardBadgeText: {
            fontFamily: 'SF-Pro-Display',
            fontSize: moderateScale(10),
            fontWeight: '600',
        },
        cardTitle: {
            fontFamily: 'SF-Pro-Display',
            fontSize: moderateScale(14.5),
            fontWeight: '600',
            color: colors.text,
            marginBottom: moderateScale(2),
        },
        cardSubtitle: {
            fontFamily: 'SF-Pro-Display',
            fontSize: moderateScale(11.5),
            fontWeight: '400',
            color: colors.textSub,
            marginBottom: moderateScale(10),
        },
        cardFooter: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        cardMeta: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: moderateScale(4),
        },
        cardMetaText: {
            fontFamily: 'SF-Pro-Display',
            fontSize: moderateScale(11.5),
            fontWeight: '500',
            color: colors.textSub,
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