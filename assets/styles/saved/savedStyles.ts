import { StyleSheet, Dimensions } from 'react-native';
import { lightColors } from '@/constants/ThemeContext'

const { width } = Dimensions.get('window');
const scale = (size: number) => (width / 375) * size;
const moderateScale = (size: number, factor = 0.5) =>
    size + (scale(size) - size) * factor;

export const getSavedStyles = (colors: typeof lightColors, isDark: boolean) =>
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
        headerCenter: {
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: moderateScale(6),
        },
        headerLogo: {
            width: moderateScale(24),
            height: moderateScale(24),
        },
        headerTitle: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '700',
            fontSize: moderateScale(16),
            color: colors.primary,
            letterSpacing: 1,
        },
        headerRightRow: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: moderateScale(4),
        },

        // ── Page Title ────────────────────────────────────────────────────────────
        pageTitle: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '600',
            fontSize: moderateScale(20),
            color: colors.text,
            textAlign: 'center',
            marginBottom: moderateScale(14),
        },

        // ── Tab Selector ──────────────────────────────────────────────────────────
        tabContainer: {
            marginBottom: moderateScale(20),
        },
        tabScrollContent: {
            flexDirection: 'row',
            paddingHorizontal: moderateScale(16),
            gap: moderateScale(18),
        },
        tabItem: {
            alignItems: 'center',
            gap: moderateScale(6),
            width: moderateScale(72),
        },
        tabIconCircle: {
            width: moderateScale(44),
            height: moderateScale(44),
            borderRadius: moderateScale(22),
            backgroundColor: '#F0F0F0',
            alignItems: 'center',
            justifyContent: 'center',
        },
        tabIconCircleActive: {
            backgroundColor: colors.primary,
        },
        tabText: {
            fontFamily: 'SF-Pro-Display',
            fontSize: moderateScale(12),
            fontWeight: '500',
            color: colors.textSub,
            textAlign: 'center',
        },
        tabTextActive: {
            fontWeight: '700',
            color: colors.primary,
        },

        // ── Simple 2-tab pill (used by SavedEmptyScreen) ──────────────────────────
        simpleTabContainer: {
            backgroundColor: colors.primary,
            borderRadius: moderateScale(10),
            flexDirection: 'row',
            padding: moderateScale(4),
        },
        simpleTabItem: {
            flex: 1,
            paddingVertical: moderateScale(12),
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: moderateScale(8),
        },
        simpleTabItemActive: {
            backgroundColor: '#FFFFFF',
        },
        simpleTabText: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '500',
            fontSize: moderateScale(14),
            color: '#FFFFFF',
        },
        simpleTabTextActive: {
            color: '#0F0F0F',
        },

        // ── Subtitle ──────────────────────────────────────────────────────────────
        subtitle: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '400',
            fontSize: moderateScale(13),
            color: colors.primary,
            textAlign: 'center',
            paddingHorizontal: moderateScale(24),
            marginBottom: moderateScale(24),
            lineHeight: moderateScale(20),
        },

        // ── Section Header Row ────────────────────────────────────────────────────
        sectionHeaderRow: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: moderateScale(16),
            marginBottom: moderateScale(14),
        },
        sectionTitle: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '500',
            fontSize: moderateScale(18),
            color: colors.text,
        },
        sectionLink: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '400',
            fontSize: moderateScale(13),
            color: colors.textSub,
        },

        // ── Mudra Card (horizontal scroll) ───────────────────────────────────────
        mudrasScrollContent: {
            paddingHorizontal: moderateScale(16),
            gap: moderateScale(12),
            paddingRight: moderateScale(24),
            paddingBottom: moderateScale(4),
        },
        mudraCard: {
            width: moderateScale(150),
            borderRadius: moderateScale(16),
            paddingVertical: moderateScale(16),
            paddingHorizontal: moderateScale(12),
            alignItems: 'center',
            gap: moderateScale(10),
            position: 'relative',
        },
        mudraImageWrapper: {
            width: moderateScale(100),
            height: moderateScale(100),
            borderRadius: moderateScale(50),
            overflow: 'hidden',
            alignItems: 'center',
            justifyContent: 'center',
        },
        mudraImage: {
            width: '100%',
            height: '100%',
        },
        mudraFavBtn: {
            position: 'absolute',
            top: moderateScale(8),
            right: moderateScale(10),
            width: moderateScale(28),
            height: moderateScale(28),
            borderRadius: moderateScale(14),
            alignItems: 'center',
            justifyContent: 'center',
        },
        mudraName: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '500',
            fontSize: moderateScale(14),
            color: '#0F0F0F',
            textAlign: 'center',
        },
        mudraDesc: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '500',
            fontSize: moderateScale(11),
            color: '#0F0F0F80',
            textAlign: 'center',
            lineHeight: moderateScale(15),
        },
        mudraTimeRow: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: moderateScale(4),
        },
        mudraTime: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '500',
            fontSize: moderateScale(11),
            color: '#00000080',
        },

        carouselDotsRow: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            gap: moderateScale(5),
            marginTop: moderateScale(10),
        },
        carouselDot: {
            width: moderateScale(5),
            height: moderateScale(5),
            borderRadius: moderateScale(2.5),
            backgroundColor: isDark ? 'rgba(255,255,255,0.2)' : '#D9D9D9',
        },
        carouselDotActive: {
            width: moderateScale(14),
            backgroundColor: isDark ? colors.text : '#0F0F0FCC',
        },

        // ── Sessions List ─────────────────────────────────────────────────────────
        sessionsContainer: {
            paddingHorizontal: moderateScale(16),
            marginBottom: moderateScale(24),
        },
        sessionsCard: {
            borderRadius: moderateScale(12),
            borderWidth: 0.38,
            borderColor: '#00000066',
            overflow: 'hidden',
            backgroundColor: colors.card,
        },
        sessionRow: {
            flexDirection: 'row',
            alignItems: 'flex-start',
            padding: moderateScale(12),
            gap: moderateScale(12),
        },
        sessionRowDivider: {
            height: 0.38,
            backgroundColor: colors.dividerDark,
            marginHorizontal: moderateScale(12),
        },
        sessionImage: {
            width: moderateScale(80),
            height: moderateScale(70),
            borderRadius: moderateScale(3),
            flexShrink: 0,
        },
        sessionTextBlock: {
            flex: 1,
            gap: moderateScale(3),
        },
        sessionTitle: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '500',
            fontSize: moderateScale(14),
            color: colors.text,
        },
        sessionMetaRow: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: moderateScale(4),
        },
        sessionMeta: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '500',
            fontSize: moderateScale(11),
            color: colors.textSub,
        },
        sessionMetaDot: {
            width: moderateScale(3),
            height: moderateScale(3),
            borderRadius: moderateScale(1.5),
            backgroundColor: colors.textMuted,
        },
        sessionDesc: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '500',
            fontSize: moderateScale(11),
            color: colors.textSub,
            lineHeight: moderateScale(16),
        },
        sessionActions: {
            flexDirection: 'row',
            alignItems: 'flex-start',
            gap: moderateScale(10),
            flexShrink: 0,
        },

        // ── Tip Banner ────────────────────────────────────────────────────────────
        tipContainer: {
            paddingHorizontal: moderateScale(16),
            paddingBottom: moderateScale(24),
        },
        tipCard: {
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: colors.primaryMuted,
            borderRadius: moderateScale(14),
            padding: moderateScale(16),
            gap: moderateScale(12),
        },
        tipIconCircle: {
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
        tipText: {
            flex: 1,
            fontFamily: 'SF-Pro-Display',
            fontWeight: '500',
            fontSize: moderateScale(13),
            color: colors.textSub,
            lineHeight: moderateScale(20),
        },

        // ── Empty State ───────────────────────────────────────────────────────────
        emptyContainer: {
            flex: 1,
            alignItems: 'center',
            paddingHorizontal: moderateScale(32),
            paddingTop: moderateScale(32),
        },
        emptyImage: {
            width: moderateScale(200),
            height: moderateScale(160),
            borderRadius: moderateScale(16),
            marginBottom: moderateScale(24),
        },
        emptyTitle: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '500',
            fontSize: moderateScale(20),
            color: colors.primary,
            textAlign: 'center',
            marginBottom: moderateScale(10),
        },
        emptySubtitle: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '400',
            fontSize: moderateScale(14),
            color: colors.textSub,
            textAlign: 'center',
            lineHeight: moderateScale(22),
            marginBottom: moderateScale(24),
        },
        emptyBtn: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: moderateScale(8),
            backgroundColor: colors.inputBg,
            borderRadius: moderateScale(4),
            borderWidth: 0.5,
            borderColor: '#00000020',
            paddingVertical: moderateScale(14),
            paddingHorizontal: moderateScale(32),
            marginBottom: moderateScale(32),
            width: '100%',
        },
        emptyBtnText: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '500',
            fontSize: moderateScale(14),
            color: colors.textSub,
        },
        emptyWhyTitle: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '400',
            fontSize: moderateScale(15),
            color: colors.text,
            textAlign: 'center',
            marginBottom: moderateScale(16),
        },
        emptyWhyRow: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: moderateScale(12),
            marginBottom: moderateScale(14),
            alignSelf: 'flex-start',
        },
        emptyWhyText: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '500',
            fontSize: moderateScale(14),
            color: colors.text,
        },
    });