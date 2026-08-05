// import { StyleSheet, Dimensions } from 'react-native';

// const { width } = Dimensions.get('window');
// const scale = (size: number) => (width / 375) * size;
// const moderateScale = (size: number, factor = 0.5) =>
//     size + (scale(size) - size) * factor;

// export const privacyStyles = StyleSheet.create({

//     // ── Screen ───────────────────────────────────────────────────────────────
//     screen: {
//         flex: 1,
//         backgroundColor: '#FFFFFF',
//     },

//     // ── Header ───────────────────────────────────────────────────────────────
//     header: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'space-between',
//         paddingHorizontal: moderateScale(16),
//         paddingBottom: moderateScale(12),
//         backgroundColor: '#FFFFFF',
//     },
//     headerIconBtn: {
//         width: moderateScale(40),
//         height: moderateScale(40),
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     headerTitleBlock: {
//         flex: 1,
//         alignItems: 'center',
//     },
//     headerTitle: {
//         fontFamily: 'SF-Pro-Display',
//         fontWeight: '700',
//         fontSize: moderateScale(18),
//         color: '#0F0F0F',
//     },

//     // ── Subtitle ──────────────────────────────────────────────────────────────
//     subtitle: {
//         fontFamily: 'SF-Pro-Display',
//         fontWeight: '400',
//         fontSize: moderateScale(13),
//         color: '#9A85FE',
//         textAlign: 'center',
//         paddingHorizontal: moderateScale(16),
//         marginBottom: moderateScale(16),
//         lineHeight: moderateScale(20),
//     },

//     // ── Hero Banner ───────────────────────────────────────────────────────────
//     heroContainer: {
//         paddingHorizontal: moderateScale(16),
//         marginBottom: moderateScale(20),
//     },
//     heroCard: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         backgroundColor: '#9A85FE33',
//         borderRadius: moderateScale(14),
//         padding: moderateScale(14),
//         gap: moderateScale(14),
//     },
//     heroImage: {
//         width: moderateScale(110),
//         height: moderateScale(110),
//         borderRadius: moderateScale(10),
//         flexShrink: 0,
//     },
//     heroTextBlock: {
//         flex: 1,
//         gap: moderateScale(8),
//     },
//     heroTitle: {
//         fontFamily: 'SF-Pro-Display',
//         fontWeight: '500',
//         fontSize: moderateScale(17),
//         color: '#0F0F0FCC',
//         lineHeight: moderateScale(22),
//     },
//     heroBody: {
//         fontFamily: 'SF-Pro-Display',
//         fontWeight: '400',
//         fontSize: moderateScale(13),
//         color: '#0F0F0F80',
//         lineHeight: moderateScale(20),
//     },

//     // ── Date Badge ────────────────────────────────────────────────────────────
//     dateBadgeRow: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         gap: moderateScale(8),
//         paddingHorizontal: moderateScale(16),
//         marginBottom: moderateScale(20),
//     },
//     dateBadgeText: {
//         fontFamily: 'SF-Pro-Display',
//         fontWeight: '500',
//         fontSize: moderateScale(13),
//         color: '#0F0F0F',
//     },

//     // ── Shared section wrapper ────────────────────────────────────────────────
//     sectionWrapper: {
//         paddingHorizontal: moderateScale(16),
//         marginBottom: moderateScale(20),
//     },
//     sectionTitle: {
//         fontFamily: 'SF-Pro-Display',
//         fontWeight: '500',
//         fontSize: moderateScale(16),
//         color: '#0F0F0F',
//         marginBottom: moderateScale(6),
//         lineHeight: moderateScale(22),
//     },
//     sectionBody: {
//         fontFamily: 'SF-Pro-Display',
//         fontWeight: '400',
//         fontSize: moderateScale(13),
//         color: '#0F0F0F',
//         lineHeight: moderateScale(21),
//         marginBottom: moderateScale(12),
//     },
//     sectionDivider: {
//         height: 0.6,
//         backgroundColor: '#0F0F0F66',
//         marginBottom: moderateScale(20),
//     },

//     // ── Info collect card ─────────────────────────────────────────────────────
//     infoCard: {
//         backgroundColor: '#F3F3F3',
//         borderRadius: moderateScale(6),
//         borderWidth: 0.5,
//         borderColor: '#00000033',
//         overflow: 'hidden',
//     },
//     infoRow: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         paddingHorizontal: moderateScale(14),
//         paddingVertical: moderateScale(13),
//         gap: moderateScale(12),
//         backgroundColor: '#F3F3F3',
//     },
//     infoRowDivider: {
//         height: 0.65,
//         backgroundColor: '#00000033',
//         marginHorizontal: moderateScale(14),
//     },
//     infoIconCircle: {
//         width: moderateScale(44),
//         height: moderateScale(44),
//         borderRadius: moderateScale(22),
//         backgroundColor: '#FFFFFF',
//         alignItems: 'center',
//         justifyContent: 'center',
//         flexShrink: 0,
//         borderWidth: 0.65,
//         borderColor: '#00000033',
//     },
//     infoTextBlock: {
//         flex: 1,
//         gap: moderateScale(3),
//     },
//     infoRowTitle: {
//         fontFamily: 'SF-Pro-Display',
//         fontWeight: '500',
//         fontSize: moderateScale(14),
//         color: '#0F0F0F',
//     },
//     infoRowSubtitle: {
//         fontFamily: 'SF-Pro-Display',
//         fontWeight: '400',
//         fontSize: moderateScale(12),
//         color: '#0F0F0F99',
//         lineHeight: moderateScale(17),
//     },

//     // ── Checkmark list card ───────────────────────────────────────────────────
//     checkCard: {
//         backgroundColor: '#F3F3F3',
//         borderRadius: moderateScale(6),
//         borderWidth: 0.5,
//         borderColor: '#00000033',
//         paddingVertical: moderateScale(10),
//         paddingHorizontal: moderateScale(14),
//         gap: moderateScale(10),
//     },
//     checkRow: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         gap: moderateScale(10),
//     },
//     checkText: {
//         fontFamily: 'SF-Pro-Display',
//         fontWeight: '500',
//         fontSize: moderateScale(13),
//         color: '#0F0F0FCC',
//         flex: 1,
//         lineHeight: moderateScale(19),
//     },

//     // ── Bullet list ───────────────────────────────────────────────────────────
//     bulletRow: {
//         flexDirection: 'row',
//         alignItems: 'flex-start',
//         gap: moderateScale(8),
//         marginBottom: moderateScale(5),
//     },
//     bulletDot: {
//         width: moderateScale(5),
//         height: moderateScale(5),
//         borderRadius: moderateScale(2.5),
//         backgroundColor: '#0F0F0F',
//         marginTop: moderateScale(7),
//         flexShrink: 0,
//     },
//     bulletText: {
//         fontFamily: 'SF-Pro-Display',
//         fontWeight: '400',
//         fontSize: moderateScale(13),
//         color: '#0F0F0F',
//         lineHeight: moderateScale(21),
//         flex: 1,
//     },

//     // ── Your Rights card ──────────────────────────────────────────────────────
//     rightsCard: {
//         backgroundColor: '#9A85FE1A',
//         borderRadius: moderateScale(12),
//         paddingVertical: moderateScale(16),
//         paddingHorizontal: moderateScale(8),
//         flexDirection: 'row',
//         alignItems: 'flex-start',
//     },
//     rightItem: {
//         flex: 1,
//         alignItems: 'center',
//         gap: moderateScale(10),
//         paddingHorizontal: moderateScale(4),
//     },
//     rightItemDivider: {
//         width: 0.5,
//         backgroundColor: '#00000020',
//         alignSelf: 'stretch',
//     },
//     rightIconCircle: {
//         width: moderateScale(46),
//         height: moderateScale(46),
//         borderRadius: moderateScale(23),
//         backgroundColor: '#FFFFFF',
//         alignItems: 'center',
//         justifyContent: 'center',
//         borderWidth: 0.5,
//         borderColor: '#00000020',
//     },
//     rightLabel: {
//         fontFamily: 'SF-Pro-Display',
//         fontWeight: '400',
//         fontSize: moderateScale(11),
//         color: '#0F0F0F',
//         textAlign: 'center',
//         lineHeight: moderateScale(15),
//     },

//     // ── Contact Row ───────────────────────────────────────────────────────────
//     contactContainer: {
//         paddingHorizontal: moderateScale(16),
//         paddingBottom: moderateScale(24),
//         marginTop: moderateScale(8),
//     },
//     contactCard: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         backgroundColor: '#F3F3F3',
//         borderRadius: moderateScale(12),
//         borderWidth: 0.5,
//         borderColor: '#00000033',
//         paddingVertical: moderateScale(14),
//         paddingHorizontal: moderateScale(16),
//     },
//     contactItem: {
//         flex: 1,
//         flexDirection: 'row',
//         alignItems: 'center',
//         gap: moderateScale(10),
//     },
//     contactText: {
//         fontFamily: 'SF-Pro-Display',
//         fontWeight: '500',
//         fontSize: moderateScale(13),
//         color: '#0F0F0F',
//     },
//     contactDivider: {
//         width: 0.5,
//         height: moderateScale(28),
//         backgroundColor: '#00000033',
//         marginHorizontal: moderateScale(8),
//     },
//     pageTitle: {
//         fontFamily: 'SF-Pro-Display',
//         fontWeight: '600',
//         fontSize: moderateScale(20),
//         color: '#0F0F0F',
//         textAlign: 'center',
//         marginBottom: moderateScale(4),
//         paddingHorizontal: moderateScale(16),
//     },
// });
import { StyleSheet, Dimensions } from 'react-native';
import { lightColors } from '@/constants/ThemeContext'

const { width } = Dimensions.get('window');
const scale = (size: number) => (width / 375) * size;
const moderateScale = (size: number, factor = 0.5) =>
    size + (scale(size) - size) * factor;

export const getPrivacyStyles = (colors: typeof lightColors) =>
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

        // ── Shared section wrapper ────────────────────────────────────────────────
        sectionWrapper: {
            paddingHorizontal: moderateScale(16),
            marginBottom: moderateScale(20),
        },
        sectionTitle: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '500',
            fontSize: moderateScale(16),
            color: colors.text,
            marginBottom: moderateScale(6),
            lineHeight: moderateScale(22),
        },
        sectionBody: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '400',
            fontSize: moderateScale(13),
            color: colors.text,
            lineHeight: moderateScale(21),
            marginBottom: moderateScale(12),
        },
        sectionDivider: {
            height: 0.6,
            backgroundColor: colors.privacyDivider,
            marginBottom: moderateScale(20),
        },

        // ── Info collect card ─────────────────────────────────────────────────────
        infoCard: {
            backgroundColor: colors.inputBg,
            borderRadius: moderateScale(6),
            borderWidth: 0.5,
            borderColor: '#00000033',
            overflow: 'hidden',
        },
        infoRow: {
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: moderateScale(14),
            paddingVertical: moderateScale(13),
            gap: moderateScale(12),
            backgroundColor: colors.inputBg,
        },
        infoRowDivider: {
            height: 0.65,
            backgroundColor: colors.dividerDark,
            marginHorizontal: moderateScale(14),
        },
        infoIconCircle: {
            width: moderateScale(44),
            height: moderateScale(44),
            borderRadius: moderateScale(22),
            backgroundColor: '#FFFFFF',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            borderWidth: 0.65,
            borderColor: '#00000033',
        },
        infoTextBlock: {
            flex: 1,
            gap: moderateScale(3),
        },
        infoRowTitle: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '500',
            fontSize: moderateScale(14),
            color: colors.text,
        },
        infoRowSubtitle: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '400',
            fontSize: moderateScale(12),
            color: colors.textSub,
            lineHeight: moderateScale(17),
        },

        // ── Checkmark list card ───────────────────────────────────────────────────
        checkCard: {
            backgroundColor: colors.inputBg,
            borderRadius: moderateScale(6),
            borderWidth: 0.5,
            borderColor: '#00000033',
            paddingVertical: moderateScale(10),
            paddingHorizontal: moderateScale(14),
            gap: moderateScale(10),
        },
        checkRow: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: moderateScale(10),
        },
        checkText: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '500',
            fontSize: moderateScale(13),
            color: colors.text,
            flex: 1,
            lineHeight: moderateScale(19),
        },

        // ── Bullet list ───────────────────────────────────────────────────────────
        bulletRow: {
            flexDirection: 'row',
            alignItems: 'flex-start',
            gap: moderateScale(8),
            marginBottom: moderateScale(5),
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

        // ── Your Rights card ──────────────────────────────────────────────────────
        rightsCard: {
            backgroundColor: colors.primaryLight,
            borderRadius: moderateScale(12),
            paddingVertical: moderateScale(16),
            paddingHorizontal: moderateScale(8),
            flexDirection: 'row',
            alignItems: 'flex-start',
        },
        rightItem: {
            flex: 1,
            alignItems: 'center',
            gap: moderateScale(10),
            paddingHorizontal: moderateScale(4),
        },
        rightItemDivider: {
            width: 0.5,
            backgroundColor: colors.dividerDark,
            alignSelf: 'stretch',
        },
        rightIconCircle: {
            width: moderateScale(46),
            height: moderateScale(46),
            borderRadius: moderateScale(23),
            backgroundColor: '#FFFFFF',
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 0.5,
            borderColor: '#00000020',
        },
        rightLabel: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '400',
            fontSize: moderateScale(11),
            color: colors.text,
            textAlign: 'center',
            lineHeight: moderateScale(15),
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
            backgroundColor: colors.dividerDark,
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