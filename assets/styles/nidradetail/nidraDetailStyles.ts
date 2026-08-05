import { StyleSheet, Dimensions } from 'react-native';
import { lightColors } from '@/constants/ThemeContext'

const { width } = Dimensions.get('window');
const scale = (size: number) => (width / 375) * size;
const moderateScale = (size: number, factor = 0.5) =>
    size + (scale(size) - size) * factor;

export const getNidraDetailStyles = (colors: typeof lightColors) =>
    StyleSheet.create({

        screen: { flex: 1, backgroundColor: colors.background },

        // ── Header ───────────────────────────────────────────────────────────────
        header: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: moderateScale(16),
            paddingBottom: moderateScale(12),
            backgroundColor: colors.background
        },
        headerIconBtn: {
            width: moderateScale(40),
            height: moderateScale(40),
            alignItems: 'center',
            justifyContent: 'center',
        },
        headerCenter: {
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: moderateScale(8),
        },
        headerLogo: { width: moderateScale(24), height: moderateScale(24) },
        headerTitle: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '700',
            fontSize: moderateScale(18),
            color: '#9A85FE',
            letterSpacing: 1,
        },
        headerRightRow: {
            flexDirection: 'row',
            alignItems: 'center',
        },

        // ── Hero ─────────────────────────────────────────────────────────────────
        heroContainer: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            paddingHorizontal: moderateScale(16),
            paddingBottom: moderateScale(20),
            gap: moderateScale(14),
            alignItems: 'flex-start',
        },
        heroImage: {
            width: moderateScale(130),
            height: moderateScale(160),
            borderRadius: moderateScale(10),
            flexShrink: 0,
        },
        heroTextBlock: {
            flex: 1,
            gap: moderateScale(6),
        },
        heroBadge: {
            alignSelf: 'flex-start',
            borderRadius: moderateScale(4),
            borderWidth: 0.5,
            borderColor: '#00000033',
            paddingHorizontal: moderateScale(8),
            paddingVertical: moderateScale(3),
            backgroundColor: '#FFFFFF',
            marginBottom: moderateScale(4),
        },
        heroBadgeText: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '400',
            fontSize: moderateScale(11),
            color: '#0F0F0F80',
        },
        heroTitle: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '500',
            fontSize: moderateScale(18),
            color: colors.text,
            lineHeight: moderateScale(26),
        },
        heroSubtitle: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '400',
            fontSize: moderateScale(13),
            color: colors.text,
            lineHeight: moderateScale(19),
        },

        // ── Hero Attr row — full width below image + text ─────────────────────────
        heroAttrsRow: {
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
            borderTopWidth: 0.5,
            borderTopColor: colors.attrBorderTop,
            paddingTop: moderateScale(12),
            marginTop: moderateScale(4),
        },
        heroAttrItem: {
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: moderateScale(5),
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
            backgroundColor: colors.attrDivider,
        },

        // ── Info Banner ───────────────────────────────────────────────────────────
        infoBannerContainer: {
            paddingHorizontal: moderateScale(16),
            marginBottom: moderateScale(24),
        },
        infoBannerCard: {
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#9A85FE33',
            borderRadius: moderateScale(12),
            padding: moderateScale(14),
            gap: moderateScale(12),
        },
        infoBannerIconCircle: {
            width: moderateScale(44),
            height: moderateScale(44),
            borderRadius: moderateScale(22),
            backgroundColor: '#FFFFFF',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            borderWidth: 0.5,
            borderColor: '#00000015',
        },
        infoBannerText: {
            flex: 1,
            fontFamily: 'SF-Pro-Display',
            fontWeight: '400',
            fontSize: moderateScale(13),
            color: colors.textSub,
            lineHeight: moderateScale(20),
        },

        // ── Section Title — consistent left padding ───────────────────────────────
        sectionTitle: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '500',
            fontSize: moderateScale(18),
            color: colors.text,
            paddingHorizontal: moderateScale(16),
            marginBottom: moderateScale(16),
        },

        // ── What to Expect ────────────────────────────────────────────────────────
        expectContainer: {
            paddingHorizontal: moderateScale(8),
            marginBottom: moderateScale(16),
        },
        expectRow: {
            flexDirection: 'row',
            alignItems: 'flex-start',
        },
        expectItem: {
            flex: 1,
            alignItems: 'center',
            gap: moderateScale(10),
            paddingHorizontal: moderateScale(4),
        },
        expectDivider: {
            width: 1.5,
            height: moderateScale(70),
            backgroundColor: colors.attrDivider,
            marginTop: moderateScale(10),
        },
        expectLabel: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '400',
            fontSize: moderateScale(12),
            color: colors.text,
            textAlign: 'center',
            lineHeight: moderateScale(16),
        },

        // ── Benefits ──────────────────────────────────────────────────────────────
        benefitsContainer: {
            paddingHorizontal: moderateScale(20),
            marginBottom: moderateScale(8),
            gap: moderateScale(12),
        },
        benefitRow: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: moderateScale(10),
        },
        benefitText: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '500',
            fontSize: moderateScale(14),
            color: colors.text,
            flex: 1,
        },
        sectionDivider: {
            height: 0.5,
            backgroundColor: colors.attrDivider,
            marginHorizontal: moderateScale(16),
            marginVertical: moderateScale(20),
        },

        // ── About This Session ────────────────────────────────────────────────────
        aboutContainer: {
            paddingHorizontal: moderateScale(16),
            marginBottom: moderateScale(20),
        },
        aboutText: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '400',
            fontSize: moderateScale(14),
            color: colors.text,
            lineHeight: moderateScale(22),
            marginBottom: moderateScale(16),
        },
        aboutRow: {
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: moderateScale(12),
            gap: moderateScale(10),
        },
        aboutRowDivider: {
            height: 0.5,
            backgroundColor: colors.privacyDivider,
        },
        aboutRowLabel: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '500',
            fontSize: moderateScale(14),
            color: colors.text,
            flex: 1,
        },
        aboutRowValue: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '500',
            fontSize: moderateScale(14),
            color: colors.text,
            textAlign: 'right',
        },

        // ── You'll Also Love ──────────────────────────────────────────────────────
        alsoLoveContainer: {
            marginBottom: moderateScale(24),
        },
        alsoLoveScrollContent: {
            paddingHorizontal: moderateScale(16),
            gap: moderateScale(12),
            paddingRight: moderateScale(24),
        },
        alsoLoveCard: {
            width: moderateScale(170),
            borderRadius: moderateScale(12),
            overflow: 'hidden',
            flexDirection: 'row',
            alignItems: 'center',
            padding: moderateScale(10),
            gap: moderateScale(10),
        },
        alsoLoveImage: {
            width: moderateScale(60),
            height: moderateScale(60),
            borderRadius: moderateScale(8),
            flexShrink: 0,
        },
        alsoLoveTextBlock: {
            flex: 1,
            gap: moderateScale(6),
        },
        alsoLoveTitle: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '500',
            fontSize: moderateScale(13),
            color: '#0F0F0F',
            lineHeight: moderateScale(18),
        },
        alsoLoveMetaRow: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        alsoLoveMeta: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: moderateScale(4),
        },
        alsoLoveMetaText: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '400',
            fontSize: moderateScale(11),
            color: '#0F0F0F',
        },

        // ── Start Practice Button ─────────────────────────────────────────────────
        startBtnContainer: {
            paddingHorizontal: moderateScale(16),
            paddingBottom: moderateScale(24),
        },
        startBtn: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: moderateScale(10),
            backgroundColor: '#9A85FE',
            borderRadius: moderateScale(14),
            paddingVertical: moderateScale(18),
        },
        startBtnText: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '500',
            fontSize: moderateScale(17),
            color: '#FFFFFF',
            textAlign: 'center',
        },
        
    });