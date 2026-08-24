import { StyleSheet, Dimensions } from 'react-native';
import { lightColors } from '@/constants/ThemeContext';

const { width } = Dimensions.get('window');
const scale = (size: number) => (width / 375) * size;
const moderateScale = (size: number, factor = 0.5) =>
    size + (scale(size) - size) * factor;

export const getMeditationStyles = (colors: typeof lightColors) =>
    StyleSheet.create({

        // ── Screen ───────────────────────────────────────────────────────────────
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

        // ── Section Headers ───────────────────────────────────────────────────────
        sectionHeader: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: moderateScale(16),
            marginBottom: moderateScale(12),
            marginTop: moderateScale(20),
        },
        sectionTitle: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '600',
            fontSize: moderateScale(17),
            color: colors.text,
        },
        viewAll: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '400',
            fontSize: moderateScale(13),
            color: colors.primary,
        },

        // ── Category Selector ─────────────────────────────────────────────────────────
        categoryContainer: {
            paddingVertical: moderateScale(10),
            backgroundColor: colors.background,
        },
        categoryHeader: {
            alignItems: 'center' as const,
            paddingHorizontal: moderateScale(20),
            marginBottom: moderateScale(16),
        },
        categoryHeaderTitle: {
            fontFamily: 'SF-Pro-Display',
            fontSize: moderateScale(15),
            fontWeight: '600' as const,
            textAlign: 'center' as const,
            letterSpacing: 0.2,
            marginBottom: moderateScale(4),
            color: colors.primary,
        },
        categoryHeaderSubtitle: {
            fontFamily: 'SF-Pro-Display',
            fontSize: moderateScale(13),
            textAlign: 'center' as const,
            lineHeight: moderateScale(18),
            opacity: 0.85,
            color: colors.primary,
        },
        categoryScrollContent: {
            paddingHorizontal: moderateScale(12),
            gap: moderateScale(8),
            alignItems: 'center' as const,
        },
        categoryBtn: {
            width: moderateScale(72),
            height: moderateScale(92),
            borderRadius: moderateScale(16),
            alignItems: 'center' as const,
            justifyContent: 'center' as const,
            paddingHorizontal: moderateScale(6),
            paddingVertical: moderateScale(10),
            gap: moderateScale(6),
        },
        categoryBtnActive: {
            backgroundColor: colors.primary,
            borderWidth: 0,
        },
        categoryBtnInactive: {
            backgroundColor: colors.card,
            borderWidth: 1,
            borderColor: colors.border,
        },
        categoryBtnLabel: {
            fontFamily: 'SF-Pro-Display',
            textAlign: 'center' as const,
            lineHeight: moderateScale(14),
        },
        categoryBtnLabelActive: {
            fontSize: moderateScale(11),
            fontWeight: '700' as const,
            color: '#FFFFFF',
        },
        categoryBtnLabelInactive: {
            fontSize: moderateScale(11),
            fontWeight: '500' as const,
            color: colors.textSub,
        },
        categoryImage: {
            width: moderateScale(38),
            height: moderateScale(38),
            opacity: 0.8,
        },
        categoryImageActive: {
            opacity: 1,
        },
        dropdownWrap: {
            paddingTop: moderateScale(24),
        },
        dropdownHeaderRow: {
            alignItems: 'flex-end' as const,
            paddingHorizontal: moderateScale(20),
            marginBottom: moderateScale(10),
        },
        dropdownResetBtn: {
            flexDirection: 'row' as const,
            alignItems: 'center' as const,
            gap: moderateScale(4),
        },
        dropdownResetText: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '500' as const,
            fontSize: moderateScale(14),
            color: colors.textSub,
        },
        subScrollContent: {
            paddingHorizontal: moderateScale(12),
            gap: moderateScale(10),
        },
        subChip: {
            borderRadius: moderateScale(30),
            paddingHorizontal: moderateScale(16),
            paddingVertical: moderateScale(10),
        },
        subChipSelected: {
            borderWidth: 1.5,
            borderColor: colors.dividerDark,
        },
        subChipText: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '400' as const,
            fontSize: moderateScale(14),
            color: '#0F0F0F',
        },

        // ── Meditatation Cards (horizontal scroll) ───────────────────────────────────────
        meditationScrollContent: {
            paddingHorizontal: moderateScale(16),
            gap: moderateScale(12),
        },
        meditationCard: {
            width: moderateScale(200),
            borderRadius: moderateScale(16),
            overflow: 'hidden',
            backgroundColor: colors.card,
        },
        meditationCardImage: {
            width: '100%',
            height: moderateScale(160),
        },
        meditationCardBody: {
            padding: moderateScale(12),
            gap: moderateScale(4),
        },
        meditationCardBadge: {
            alignSelf: 'flex-start',
            paddingHorizontal: moderateScale(8),
            paddingVertical: moderateScale(3),
            borderRadius: moderateScale(6),
            marginBottom: moderateScale(4),
        },
        meditationCardBadgeText: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '500',
            fontSize: moderateScale(10),
            color: '#0F0F0F',
        },
        meditationCardTitle: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '600',
            fontSize: moderateScale(14),
            color: colors.text,
        },
        meditationCardMeta: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: moderateScale(4),
            marginTop: moderateScale(2),
        },
        meditationCardMetaText: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '400',
            fontSize: moderateScale(11),
            color: colors.textSub,
        },

        // ── Featured Card (wide) ───────────────────────────────────────────────────
        featuredCard: {
            marginHorizontal: moderateScale(16),
            borderRadius: moderateScale(18),
            overflow: 'hidden',
            height: moderateScale(180),
            marginBottom: moderateScale(8),
        },
        featuredImage: {
            width: '100%',
            height: '100%',
        },
        featuredOverlay: {
            ...StyleSheet.absoluteFillObject,
            backgroundColor: 'rgba(0,0,0,0.35)',
            justifyContent: 'flex-end',
            padding: moderateScale(16),
        },
        featuredBadge: {
            alignSelf: 'flex-start',
            paddingHorizontal: moderateScale(10),
            paddingVertical: moderateScale(4),
            borderRadius: moderateScale(8),
            backgroundColor: 'rgba(255,255,255,0.25)',
            marginBottom: moderateScale(6),
        },
        featuredBadgeText: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '500',
            fontSize: moderateScale(11),
            color: '#FFFFFF',
        },
        featuredTitle: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '700',
            fontSize: moderateScale(18),
            color: '#FFFFFF',
        },
        featuredSubtitle: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '400',
            fontSize: moderateScale(12),
            color: 'rgba(255,255,255,0.8)',
            marginTop: moderateScale(2),
        },

        // ── Recently Played rows ───────────────────────────────────────────────────
        recentCard: {
            marginHorizontal: moderateScale(16),
            backgroundColor: colors.card,
            borderRadius: moderateScale(14),
            borderWidth: 1,
            borderColor: colors.border,
            overflow: 'hidden',
            marginBottom: moderateScale(10),
        },
        recentRow: {
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: moderateScale(12),
            paddingHorizontal: moderateScale(14),
        },
        recentImage: {
            width: moderateScale(56),
            height: moderateScale(56),
            borderRadius: moderateScale(10),
            flexShrink: 0,
        },
        recentContent: {
            flex: 1,
            paddingHorizontal: moderateScale(12),
            gap: moderateScale(3),
        },
        recentTitle: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '500',
            fontSize: moderateScale(14),
            color: colors.text,
        },
        recentMeta: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '400',
            fontSize: moderateScale(12),
            color: colors.textSub,
        },

        // ── Banner ────────────────────────────────────────────────────────────────
        banner: {
            marginHorizontal: moderateScale(16),
            borderRadius: moderateScale(14),
            padding: moderateScale(14),
            flexDirection: 'row',
            alignItems: 'center',
            gap: moderateScale(12),
            backgroundColor: '#9A85FE20',
        },
        bannerImage: {
            width: width * 0.28,
            height: width * 0.28,
            borderRadius: moderateScale(10),
            flexShrink: 0,
        },
        bannerRight: {
            flex: 1,
        },
        bannerContentRow: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: moderateScale(10),
        },
        bannerTextBlock: {
            flex: 1,
        },
        bannerTitle: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '500',
            fontSize: moderateScale(13),
            color: colors.text,
            marginBottom: moderateScale(4),
        },
        bannerDescription: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '400',
            fontSize: moderateScale(11),
            color: colors.textSub,
            lineHeight: moderateScale(16),
        },
        learnButton: {
            backgroundColor: colors.card,
            paddingHorizontal: moderateScale(12),
            paddingVertical: moderateScale(8),
            borderRadius: moderateScale(8),
            alignItems: 'center',
            flexShrink: 0,
        },
        learnButtonText: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '500',
            fontSize: moderateScale(11),
            color: colors.text,
        },
                // ── Browse by Category ───────────────────────────────────────────────────
        categoryCard: {
            marginHorizontal: moderateScale(16),
            borderRadius: moderateScale(16),
            borderWidth: 1,
            borderColor: 'rgba(0,0,0,0.05)',
            overflow: 'hidden',
        },
        categoryRow: {
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: moderateScale(14),
            paddingVertical: moderateScale(14),
            gap: moderateScale(12),
        },
        categoryRowBorder: {
            borderBottomWidth: 1,
        },
        categoryIconWrap: {
            width: moderateScale(48),
            height: moderateScale(48),
            borderRadius: moderateScale(23),
            backgroundColor: '#FFFFFF',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
        },
        categoryIcon: {
            width: moderateScale(32),
            height: moderateScale(32),
        },
        categoryIconFallback: {
            width: moderateScale(30),
            height: moderateScale(30),
            borderRadius: moderateScale(13),
            backgroundColor: 'rgba(155,143,232,0.2)',
        },
        categoryTextBlock: {
            flex: 1,
            gap: moderateScale(2),
        },
        categoryTitle: {
            fontFamily: 'SF-Pro-Display',
            fontSize: moderateScale(15),
            fontWeight: '500',
        },
        categoryDesc: {
            fontFamily: 'SF-Pro-Display',
            fontSize: moderateScale(12),
            lineHeight: moderateScale(16),
        },
        categoryRight: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: moderateScale(4),
            flexShrink: 0,
        },
        practiceCount: {
            fontFamily: 'SF-Pro-Display',
            fontSize: moderateScale(12),
            fontWeight: '500',
        },
    });