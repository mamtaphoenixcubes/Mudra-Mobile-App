import { StyleSheet, Dimensions } from 'react-native';
import { lightColors } from '@/constants/ThemeContext'

const { width } = Dimensions.get('window');
const scale = (size: number) => (width / 375) * size;
const moderateScale = (size: number, factor = 0.5) =>
    size + (scale(size) - size) * factor;

export const getHelpSupportStyles = (colors: typeof lightColors) =>
    StyleSheet.create({

        // ── Screen ───────────────────────────────────────────────────────────────
        screen: {
            flex: 1,
            backgroundColor: colors.background,
        },

        // ── Header ───────────────────────────────────────────────────────────────
        header: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: moderateScale(16),
            paddingBottom: moderateScale(12),
            backgroundColor: colors.background,
        },
        headerIconBtn: {
            width: moderateScale(40),
            height: moderateScale(40),
            alignItems: 'center',
            justifyContent: 'center',
        },
        headerTitleBlock: {
            flex: 1,
            alignItems: 'center',
        },
        headerTitle: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '700',
            fontSize: moderateScale(18),
            color: colors.text,
        },
        headerSubtitle: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '400',
            fontSize: moderateScale(13),
            color: colors.primary,
            textAlign: 'center',
            paddingHorizontal: moderateScale(16),
            marginBottom: moderateScale(4),
        },
        headerPlaceholder: {
            width: moderateScale(40),
        },

        // ── Banner ────────────────────────────────────────────────────────────────
        bannerContainer: {
            paddingHorizontal: moderateScale(16),
            paddingBottom: moderateScale(24),
        },
        bannerCard: {
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: colors.inputBg,
            borderRadius: moderateScale(12),
            borderWidth: 0.65,
            borderColor: '#00000033',
            padding: moderateScale(14),
            gap: moderateScale(12),
        },
        bannerIconCircle: {
            width: moderateScale(50),
            height: moderateScale(50),
            borderRadius: moderateScale(25),
            backgroundColor: '#FFFFFF',       // ← keep as is
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            borderWidth: 0.65,
            borderColor: '#00000033',
        },
        bannerTextBlock: {
            flex: 1,
            gap: moderateScale(3),
        },
        bannerTitle: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '500',
            fontSize: moderateScale(15),
            color: colors.text,
        },
        bannerSubtitle: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '400',
            fontSize: moderateScale(12),
            color: colors.textSub,
        },
        bannerBtn: {
            backgroundColor: colors.primary,
            borderRadius: moderateScale(10),
            paddingHorizontal: moderateScale(14),
            paddingVertical: moderateScale(10),
            flexDirection: 'row',
            alignItems: 'center',
            gap: moderateScale(6),
            flexShrink: 0,
        },
        bannerBtnText: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '500',
            fontSize: moderateScale(13),
            color: colors.white,
        },

        // ── Section label ─────────────────────────────────────────────────────────
        sectionLabel: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '600',
            fontSize: moderateScale(18),
            color: colors.text,
            paddingHorizontal: moderateScale(16),
            marginBottom: moderateScale(12),
        },

        // ── List card ─────────────────────────────────────────────────────────────
        listContainer: {
            paddingHorizontal: moderateScale(16),
            paddingBottom: moderateScale(24),
        },
        listCard: {
            backgroundColor: colors.inputBg,
            borderRadius: moderateScale(14),
            borderWidth: 0.65,
            borderColor: '#00000033',
            overflow: 'hidden',
        },
        listRow: {
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: moderateScale(14),
            paddingVertical: moderateScale(14),
            gap: moderateScale(12),
            backgroundColor: colors.inputBg,
        },
        listRowDivider: {
            height: 0.8,
            //backgroundColor: '#00000033',
            backgroundColor: colors.dividerDark,
            marginHorizontal: moderateScale(14),
        },
        listIconCircle: {
            width: moderateScale(46),
            height: moderateScale(46),
            borderRadius: moderateScale(23),
            backgroundColor: '#FFFFFF',       // ← keep as is
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            borderWidth: 0.65,
            borderColor: '#00000033',
        },
        listTextBlock: {
            flex: 1,
            gap: moderateScale(3),
        },
        listRowTitle: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '500',
            fontSize: moderateScale(15),
            color: colors.text,
        },
        listRowSubtitle: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '400',
            fontSize: moderateScale(12),
            color: colors.textSub,
            lineHeight: moderateScale(17),
        },
        listRowMeta: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '400',
            fontSize: moderateScale(12),
            color: colors.primary,
            flexShrink: 0,
            marginRight: moderateScale(4),
        },
        listArrow: {
            flexShrink: 0,
        },

        // ── Feedback Banner ───────────────────────────────────────────────────────
        feedbackContainer: {
            paddingHorizontal: moderateScale(16),
            paddingBottom: moderateScale(24),
        },
        feedbackCard: {
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: colors.primaryMuted,
            borderRadius: moderateScale(14),
            borderWidth: 0.65,
            borderColor: '#00000033',
            padding: moderateScale(16),
            gap: moderateScale(12),
        },
        feedbackIconCircle: {
            width: moderateScale(48),
            height: moderateScale(48),
            borderRadius: moderateScale(24),
            backgroundColor: '#FFFFFF',       // ← keep as is
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            borderWidth: 0.65,
            borderColor: '#00000033',
        },
        feedbackTextBlock: {
            flex: 1,
            gap: moderateScale(4),
        },
        feedbackTitle: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '500',
            fontSize: moderateScale(14),
            color: colors.text,
        },
        feedbackSubtitle: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '400',
            fontSize: moderateScale(12),
            color: colors.textSub,
            lineHeight: moderateScale(17),
        },
        feedbackBtn: {
            backgroundColor: '#FFFFFF',       // ← keep as is
            borderRadius: moderateScale(8),
            paddingHorizontal: moderateScale(12),
            paddingVertical: moderateScale(9),
            borderWidth: 0.65,
            borderColor: '#9A85FE60',
            flexShrink: 0,
        },
        feedbackBtnText: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '500',
            fontSize: moderateScale(12),
            color: colors.primary,
        },
        pageTitle: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '600',
            fontSize: moderateScale(20),
            color: colors.text,
            textAlign: 'center',
            marginBottom: moderateScale(4),
            paddingHorizontal: moderateScale(16),
        },
         // ── Help Article screen ──────────────────────────────────────────────────
        articleHeaderBlock: {
            alignItems: 'center',
            paddingTop: moderateScale(4),
            paddingBottom: moderateScale(20),
            gap: moderateScale(4),
        },
        articleHeaderIconCircle: {
            width: moderateScale(56),
            height: moderateScale(56),
            borderRadius: moderateScale(16),
            backgroundColor: colors.primaryLight,
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: moderateScale(8),
        },
        articlePageSubtitle: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '400',
            fontSize: moderateScale(13),
            color: colors.textSub,
            textAlign: 'center',
        },
        articleItemsWrap: {
            gap: moderateScale(12),
        },
        articleCard: {
            borderRadius: moderateScale(14),
            padding: moderateScale(16),
            backgroundColor: colors.card,
            shadowColor: '#000',
            shadowOpacity: 0.05,
            shadowRadius: 10,
            shadowOffset: { width: 0, height: 3 },
            elevation: 2,
        },
        articleFaqHeaderRow: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: moderateScale(10),
        },
        articleFaqQuestion: {
            flex: 1,
            fontFamily: 'SF-Pro-Display',
            fontWeight: '600',
            fontSize: moderateScale(14.5),
            color: colors.text,
        },
        articleChevronCircle: {
            width: moderateScale(24),
            height: moderateScale(24),
            borderRadius: moderateScale(12),
            backgroundColor: colors.surfaceAlt,
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
        },
        articleFaqAnswer: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '400',
            fontSize: moderateScale(13.5),
            color: colors.textSub,
            lineHeight: moderateScale(20),
            marginTop: moderateScale(10),
        },
        articleTimelineRow: {
            flexDirection: 'row',
            gap: moderateScale(12),
        },
        articleTimelineRail: {
            alignItems: 'center',
            width: moderateScale(28),
        },
        articleTimelineNumber: {
            width: moderateScale(28),
            height: moderateScale(28),
            borderRadius: moderateScale(14),
            backgroundColor: colors.primary,
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
        },
        articleTimelineNumberText: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '700',
            fontSize: moderateScale(13),
            color: '#FFFFFF',
        },
        articleTimelineLine: {
            width: 2,
            flex: 1,
            backgroundColor: colors.dividerDark,
            marginTop: moderateScale(4),
            marginBottom: moderateScale(-12),
        },
        articleTimelineCard: {
            flex: 1,
            marginBottom: moderateScale(4),
        },
        articleIconListCard: {
            flexDirection: 'row',
            gap: moderateScale(12),
        },
        articleIconListBadge: {
            width: moderateScale(32),
            height: moderateScale(32),
            borderRadius: moderateScale(16),
            backgroundColor: colors.primaryLight,
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
        },
        articleSectionTextBlock: {
            flex: 1,
            gap: moderateScale(4),
        },
        articleSectionTitle: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '600',
            fontSize: moderateScale(14.5),
            color: colors.text,
            marginBottom: moderateScale(4),
        },
        articleSectionDescription: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '400',
            fontSize: moderateScale(13),
            color: colors.textSub,
            lineHeight: moderateScale(19),
        },
    });