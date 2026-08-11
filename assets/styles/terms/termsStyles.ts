
import { StyleSheet, Dimensions } from 'react-native';
import { lightColors } from '@/constants/ThemeContext'

const { width } = Dimensions.get('window');
const scale = (size: number) => (width / 375) * size;
const moderateScale = (size: number, factor = 0.5) =>
    size + (scale(size) - size) * factor;

export const getTermsStyles = (colors: typeof lightColors) =>
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

        // ── Subtitle ──────────────────────────────────────────────────────────────
        subtitle: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '400',
            fontSize: moderateScale(13),
            color: colors.primary,
            textAlign: 'center',
            paddingHorizontal: moderateScale(16),
            marginBottom: moderateScale(16),
            lineHeight: moderateScale(20),
        },

        // ── Hero Banner ───────────────────────────────────────────────────────────
        heroContainer: {
            paddingHorizontal: moderateScale(16),
            marginBottom: moderateScale(20),
        },
        heroCard: {
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: colors.primaryMuted,
            borderRadius: moderateScale(14),
            padding: moderateScale(14),
            gap: moderateScale(14),
        },
        heroImage: {
            width: moderateScale(110),
            height: moderateScale(110),
            borderRadius: moderateScale(10),
            flexShrink: 0,
        },
        heroTextBlock: {
            flex: 1,
            gap: moderateScale(8),
        },
        heroTitle: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '500',
            fontSize: moderateScale(17),
            color: colors.text,
            lineHeight: moderateScale(22),
        },
        heroBody: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '400',
            fontSize: moderateScale(13),
            color: colors.textSub,
            lineHeight: moderateScale(20),
        },

        // ── Date Badge ────────────────────────────────────────────────────────────
        dateBadgeRow: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: moderateScale(8),
            paddingHorizontal: moderateScale(16),
            marginBottom: moderateScale(20),
        },
        dateBadgeText: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '500',
            fontSize: moderateScale(13),
            color: colors.text,
        },

        // ── Sections ──────────────────────────────────────────────────────────────
        sectionsContainer: {
            paddingHorizontal: moderateScale(16),
        },
        section: {
            paddingBottom: moderateScale(16),
            marginBottom: moderateScale(16),
            borderBottomWidth: 0.6,
            borderBottomColor: colors.privacyDivider,
        },
        sectionTitle: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '500',
            fontSize: moderateScale(16),
            color: colors.text,
            marginBottom: moderateScale(10),
            lineHeight: moderateScale(22),
        },
        sectionBody: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '400',
            fontSize: moderateScale(13),
            color: colors.text,
            lineHeight: moderateScale(21),
        },
        bulletRow: {
            flexDirection: 'row',
            alignItems: 'flex-start',
            gap: moderateScale(8),
            marginBottom: moderateScale(6),
        },
        bulletDot: {
            width: moderateScale(5),
            height: moderateScale(5),
            borderRadius: moderateScale(2.5),
            backgroundColor: colors.text,
            marginTop: moderateScale(7),
            flexShrink: 0,
        },
        bulletText: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '400',
            fontSize: moderateScale(13),
            color: colors.text,
            lineHeight: moderateScale(21),
            flex: 1,
        },

        // ── Contact Row ───────────────────────────────────────────────────────────
        contactContainer: {
            paddingHorizontal: moderateScale(16),
            paddingBottom: moderateScale(24),
            marginTop: moderateScale(8),
        },
        contactCard: {
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: colors.inputBg,
            borderRadius: moderateScale(12),
            borderWidth: 0.5,
            borderColor: '#00000033',
            paddingVertical: moderateScale(14),
            paddingHorizontal: moderateScale(16),
        },
        contactItem: {
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            gap: moderateScale(10),
        },
        contactText: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '500',
            fontSize: moderateScale(13),
            color: colors.text,
        },
        contactDivider: {
            width: 0.5,
            height: moderateScale(28),
            backgroundColor: colors.privacyDivider,
            marginHorizontal: moderateScale(8),
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
    });