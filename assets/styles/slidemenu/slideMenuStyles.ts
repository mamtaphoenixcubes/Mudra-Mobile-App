import { StyleSheet, Dimensions } from 'react-native';
import { lightColors } from '@/constants/ThemeContext'

const { width } = Dimensions.get('window');
const scale = (size: number) => (width / 375) * size;
const moderateScale = (size: number, factor = 0.5) =>
    size + (scale(size) - size) * factor;

export const getSlideMenuStyles = (colors: typeof lightColors) =>
    StyleSheet.create({
        overlay: {
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.5)',
        },

        menuContainer: {
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: width * 0.78,
            backgroundColor: colors.background,
            shadowColor: '#000',
            shadowOffset: { width: 6, height: 0 },
            shadowOpacity: 0.2,
            shadowRadius: 20,
            elevation: 20,
            borderTopRightRadius: moderateScale(24),
            borderBottomRightRadius: moderateScale(24),
            overflow: 'hidden',
        },

        // ── Purple Header ─────────────────────────────────────────────────────────
        header: {
            backgroundColor: '#9A85FE',
            paddingHorizontal: moderateScale(22),
            paddingBottom: moderateScale(20),
            paddingTop: moderateScale(10),
            alignItems: 'center',
        },
        closeButton: {
            alignSelf: 'flex-end',
            width: moderateScale(32),
            height: moderateScale(32),
            borderRadius: moderateScale(16),
            backgroundColor: 'rgba(255,255,255,0.2)',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: moderateScale(10),
        },

        // ── Hero image (no avatar circle) ─────────────────────────────────────────
        heroImage: {
            width: moderateScale(100),
            height: moderateScale(100),
            marginBottom: moderateScale(14),
        },

        // kept for backwards compat if used elsewhere
        avatarContainer: {
            width: moderateScale(84),
            height: moderateScale(84),
            borderRadius: moderateScale(42),
            overflow: 'hidden',
            marginBottom: moderateScale(14),
        },
        avatarWrapper: {
            alignItems: 'center',
        },
        avatarImage: {
            width: '100%',
            height: '100%',
        },
        avatarText: {
            fontSize: moderateScale(32),
        },

        welcomeText: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '700',
            fontSize: moderateScale(18),
            color: '#FFFFFF',
            marginBottom: moderateScale(4),
            textAlign: 'center',
        },
        subtitleText: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '400',
            fontSize: moderateScale(13),
            color: 'rgba(255,255,255,0.75)',
            lineHeight: moderateScale(18),
            textAlign: 'center',
        },

        // ── Scroll ────────────────────────────────────────────────────────────────
        scrollView: {
            flex: 1,
            backgroundColor: '#FFFFFF',
        },
        scrollContent: {
            paddingBottom: moderateScale(32),
        },

        // ── Section Header ────────────────────────────────────────────────────────
        sectionHeader: {
            paddingHorizontal: moderateScale(22),
            paddingTop: moderateScale(14),
            paddingBottom: moderateScale(4),
        },
        sectionHeaderText: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '700',
            fontSize: moderateScale(10),
            color: '#9A85FE',
            letterSpacing: 1.4,
            textTransform: 'uppercase',
        },

        // ── Menu Item ─────────────────────────────────────────────────────────────
        menuItem: {
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: moderateScale(12),
            paddingHorizontal: moderateScale(16),
            marginHorizontal: moderateScale(10),
            borderRadius: moderateScale(14),
            marginBottom: moderateScale(2),
        },
        menuItemActive: {
            backgroundColor: '#9A85FE12',
        },
        menuItemInactive: {
            backgroundColor: 'transparent',
        },
        menuIconContainer: {
            width: moderateScale(38),
            height: moderateScale(38),
            borderRadius: moderateScale(12),
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: moderateScale(14),
            backgroundColor: '#F5F5F5',
        },
        menuIconContainerActive: {
            backgroundColor: '#9A85FE18',
        },
        menuText: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '500',
            fontSize: moderateScale(14),
            //color: '#2A2A2A',
            color: colors.text,
            flex: 1,
        },
        menuTextActive: {
            fontWeight: '600',
            color: '#9A85FE',
        },
        menuBadge: {
            backgroundColor: '#9A85FE',
            borderRadius: moderateScale(10),
            paddingHorizontal: moderateScale(7),
            paddingVertical: moderateScale(2),
            minWidth: moderateScale(22),
            alignItems: 'center',
        },
        menuBadgeText: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '600',
            fontSize: moderateScale(10),
            color: '#FFFFFF',
        },
        activeIndicator: {
            width: moderateScale(4),
            height: moderateScale(4),
            borderRadius: moderateScale(2),
            backgroundColor: '#9A85FE',
            marginLeft: moderateScale(6),
        },

        // ── Divider ───────────────────────────────────────────────────────────────
        divider: {
            height: 0.5,
            backgroundColor: '#00000010',
            marginHorizontal: moderateScale(16),
            marginVertical: moderateScale(6),
        },

        // ── Footer ────────────────────────────────────────────────────────────────
        footer: {
            marginTop: moderateScale(10),
            paddingTop: moderateScale(10),
            borderTopWidth: 0.5,
            borderTopColor: '#00000010',
        },
        footerItem: {
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: moderateScale(11),
            paddingHorizontal: moderateScale(16),
            marginHorizontal: moderateScale(10),
            borderRadius: moderateScale(12),
            gap: moderateScale(14),
        },
        footerIconBox: {
            width: moderateScale(34),
            height: moderateScale(34),
            borderRadius: moderateScale(10),
            backgroundColor: '#F5F5F5',
            alignItems: 'center',
            justifyContent: 'center',
        },
        footerText: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '400',
            fontSize: moderateScale(13),
            color: colors.textSub,
            flex: 1,
        },
    });