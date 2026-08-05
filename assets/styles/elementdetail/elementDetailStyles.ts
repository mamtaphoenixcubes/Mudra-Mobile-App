import { StyleSheet, Dimensions } from 'react-native';
import { lightColors } from '@/constants/ThemeContext'

const { width } = Dimensions.get('window');
const scale = (size: number) => (width / 375) * size;
const moderateScale = (size: number, factor = 0.5) =>
    size + (scale(size) - size) * factor;

const QUALITY_CARD_SIZE = (width - moderateScale(16) * 2 - moderateScale(10) * 3) / 4;

export const getElementDetailStyles = (colors: typeof lightColors) =>
    StyleSheet.create({

        // ── Screen ───────────────────────────────────────────────────────────────
        screen: {
            flex: 1,
            backgroundColor: colors.background,
        },

        // ── Shared section title ──────────────────────────────────────────────────
        sectionTitle: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '500',
            fontSize: moderateScale(18),
            color: colors.text,
            marginBottom: moderateScale(14),
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
        headerRightIcons: {
            flexDirection: 'row',
            alignItems: 'center',
        },

        // ── Hero ─────────────────────────────────────────────────────────────────
        heroContainer: {
            paddingHorizontal: moderateScale(16),
            paddingTop: moderateScale(8),
            paddingBottom: moderateScale(20),
            backgroundColor: colors.background,
        },
        heroTopRow: {
            flexDirection: 'row',
            gap: moderateScale(14),
            alignItems: 'flex-start',
            marginBottom: moderateScale(14),
        },
        heroImageWrapper: {
            width: moderateScale(130),
            height: moderateScale(150),
            borderRadius: moderateScale(6),
            borderWidth: 0.5,
            borderColor: '#00000020',
            overflow: 'hidden',
            flexShrink: 0,
        },
        heroImage: {
            width: '100%',
            height: '100%',
        },
        heroTextBlock: {
            flex: 1,
            gap: moderateScale(6),
        },
        heroElementName: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '500',
            fontSize: moderateScale(24),
            color: colors.text,
            lineHeight: moderateScale(30),
        },
        heroKeywordsRow: {
            flexDirection: 'row',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: moderateScale(4),
        },
        heroKeyword: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '500',
            fontSize: moderateScale(12),
            color: colors.textSub,
        },
        heroDot: {
            fontSize: moderateScale(12),
            color: colors.textMuted,
        },
        heroDescription: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '400',
            fontSize: moderateScale(13),
            color: colors.text,
            lineHeight: moderateScale(20),
        },
        heroAttrsRow: {
            flexDirection: 'row',
            alignItems: 'center',
            borderTopWidth: 0.5,
            borderTopColor: colors.dividerDark,
            paddingTop: moderateScale(12),
            marginTop: moderateScale(4),
        },
        heroAttrItem: {
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: moderateScale(6),
        },
        heroAttrLabel: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '400',
            fontSize: moderateScale(12),
            color: colors.text,
        },
        heroAttrDivider: {
            width: 0.5,
            height: moderateScale(20),
            backgroundColor: colors.dividerDark,
        },

        // ── Element Insight ───────────────────────────────────────────────────────
        insightContainer: {
            paddingHorizontal: moderateScale(16),
            paddingBottom: moderateScale(24),
        },
        insightCard: {
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: colors.primaryMuted,
            borderRadius: moderateScale(12),
            borderWidth: 0.5,
            borderColor: '#00000015',
            padding: moderateScale(16),
            gap: moderateScale(14),
        },
        insightIconCircle: {
            width: moderateScale(52),
            height: moderateScale(52),
            borderRadius: moderateScale(26),
            backgroundColor: colors.white,
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            borderWidth: 0.5,
            borderColor: '#00000015',
        },
        insightTextBlock: {
            flex: 1,
            gap: moderateScale(6),
        },
        insightTitle: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '500',
            fontSize: moderateScale(14),
            color: colors.text,
        },
        insightBody: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '400',
            fontSize: moderateScale(13),
            color: colors.textSub,
            lineHeight: moderateScale(20),
        },

        // ── Qualities ─────────────────────────────────────────────────────────────
        qualitiesContainer: {
            paddingHorizontal: moderateScale(16),
            paddingBottom: moderateScale(24),
        },
        qualitiesTitle: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '600',
            fontSize: moderateScale(18),
            color: colors.text,
            marginBottom: moderateScale(14),
        },
        qualitiesRow: {
            flexDirection: 'row',
            gap: moderateScale(10),
        },
        qualityCard: {
            width: QUALITY_CARD_SIZE,
            height: QUALITY_CARD_SIZE,
            borderRadius: moderateScale(12),
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: moderateScale(6),
            gap: moderateScale(10),
        },
        qualityIconWrapper: {
            alignItems: 'center',
            justifyContent: 'center',
        },
        qualityLabel: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '400',
            fontSize: moderateScale(11),
            color: '#0F0F0F',
            textAlign: 'center',
            lineHeight: moderateScale(15),
        },

        // ── Signs of Imbalance ────────────────────────────────────────────────────
        imbalanceContainer: {
            paddingHorizontal: moderateScale(16),
            paddingBottom: moderateScale(24),
        },
        imbalanceCard: {
            flexDirection: 'row',
            backgroundColor: colors.primaryMuted,
            borderRadius: moderateScale(12),
            padding: moderateScale(16),
            gap: moderateScale(12),
        },
        imbalanceCol: {
            flex: 1,
            gap: moderateScale(8),
        },
        imbalanceHeader: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: moderateScale(8),
            marginBottom: moderateScale(4),
        },
        imbalanceIconCircle: {
            width: moderateScale(32),
            height: moderateScale(32),
            borderRadius: moderateScale(16),
            backgroundColor: colors.white,
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 0.5,
            borderColor: '#00000015',
        },
        imbalanceColTitle: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '500',
            fontSize: moderateScale(14),
            color: colors.text,
        },
        imbalanceDivider: {
            width: 1.5,
            backgroundColor: colors.dividerDark,
            alignSelf: 'stretch',
        },
        bulletRow: {
            flexDirection: 'row',
            alignItems: 'flex-start',
            gap: moderateScale(6),
        },
        bullet: {
            width: moderateScale(4),
            height: moderateScale(4),
            borderRadius: moderateScale(2),
            backgroundColor: colors.textSub,
            marginTop: moderateScale(6),
            flexShrink: 0,
        },
        bulletText: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '400',
            fontSize: moderateScale(12),
            color: colors.text,
            lineHeight: moderateScale(18),
            flex: 1,
        },

        // ── Practices ─────────────────────────────────────────────────────────────
        practicesContainer: {
            paddingHorizontal: moderateScale(16),
            paddingBottom: moderateScale(24),
        },
        practicesCard: {
            borderRadius: moderateScale(12),
            borderWidth: 0.5,
            borderColor: '#00000015',
            overflow: 'hidden',
            backgroundColor: colors.inputBg,
        },
        practiceRow: {
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: moderateScale(14),
            paddingVertical: moderateScale(14),
            gap: moderateScale(12),
        },
        practiceIconCircle: {
            width: moderateScale(44),
            height: moderateScale(44),
            borderRadius: moderateScale(22),
            backgroundColor: '#FFFFFF',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
        },
        practiceTextBlock: {
            flex: 1,
            gap: moderateScale(3),
        },
        practiceTitle: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '500',
            fontSize: moderateScale(14),
            color: colors.text,
        },
        practiceSubtitle: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '400',
            fontSize: moderateScale(12),
            color: colors.textSub,
            lineHeight: moderateScale(17),
        },
        practiceRowDivider: {
            height: 1.5,
            backgroundColor: colors.dividerDark,
            marginHorizontal: moderateScale(14),
        },

        // ── Explore Banner ────────────────────────────────────────────────────────
        exploreContainer: {
            paddingHorizontal: moderateScale(16),
            paddingBottom: moderateScale(24),
        },
        exploreCard: {
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: colors.cardPurpleAlt,
            borderRadius: moderateScale(12),
            padding: moderateScale(16),
            gap: moderateScale(12),
        },
        exploreIconCircle: {
            width: moderateScale(48),
            height: moderateScale(48),
            borderRadius: moderateScale(24),
            backgroundColor: colors.white,
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            borderWidth: 0.5,
            borderColor: '#00000015',
        },
        exploreTextBlock: {
            flex: 1,
            gap: moderateScale(4),
        },
        exploreTitle: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '500',
            fontSize: moderateScale(13),
            color: colors.text,
            lineHeight: moderateScale(18),
        },
        exploreSubtitle: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '400',
            fontSize: moderateScale(11),
            color: colors.textSub,
            lineHeight: moderateScale(16),
        },
        exploreBtn: {
            backgroundColor: '#FFFFFF',
            borderRadius: moderateScale(8),
            paddingHorizontal: moderateScale(12),
            paddingVertical: moderateScale(8),
            borderWidth: 0.5,
            borderColor: '#00000020',
            flexShrink: 0,
        },
        exploreBtnText: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '500',
            fontSize: moderateScale(12),
            color: '#0F0F0F',
        },
    });