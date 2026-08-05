import { StyleSheet, Dimensions } from 'react-native';
import { lightColors } from '@/constants/ThemeContext'

const { width } = Dimensions.get('window');
const scale = (size: number) => (width / 375) * size;
const moderateScale = (size: number, factor = 0.5) =>
    size + (scale(size) - size) * factor;

export const getSearchStyles = (colors: typeof lightColors) =>
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
            paddingHorizontal: moderateScale(16),
            paddingBottom: moderateScale(20),
            marginVertical: moderateScale(20),
            gap: moderateScale(10),
            backgroundColor: colors.background,
        },
        headerBackBtn: {
            width: moderateScale(36),
            height: moderateScale(36),
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
        },
        searchBar: {
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: colors.inputBg,
            borderRadius: moderateScale(12),
            borderWidth: 0.5,
            borderColor: '#00000033',
            paddingHorizontal: moderateScale(12),
            paddingVertical: moderateScale(10),
            gap: moderateScale(8),
        },
        searchInput: {
            flex: 1,
            fontFamily: 'SF-Pro-Display',
            fontWeight: '400',
            fontSize: moderateScale(14),
            color: colors.text,
            padding: 1,
        },
        searchPlaceholder: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '400',
            fontSize: moderateScale(14),
            color: colors.textMuted,
        },
        filterBtn: {
            width: moderateScale(36),
            height: moderateScale(36),
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
        },

        // ── Section Title ─────────────────────────────────────────────────────────
        sectionTitleRow: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: moderateScale(16),
            marginBottom: moderateScale(14),
        },
        sectionTitle: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '500',
            fontSize: moderateScale(16),
            color: colors.text,
        },
        clearAllText: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '400',
            fontSize: moderateScale(12),
            color: colors.primary,
            textDecorationLine: 'underline',
        },

        // ── Recent Searches ───────────────────────────────────────────────────────
        recentContainer: {
            marginBottom: moderateScale(30),
        },
        recentScrollContent: {
            paddingHorizontal: moderateScale(16),
            gap: moderateScale(8),
            paddingRight: moderateScale(24),
        },
        recentChip: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: moderateScale(6),
            backgroundColor: colors.inputBg,
            borderRadius: moderateScale(60),
            borderWidth: 0.65,
            borderColor: '#00000033',
            paddingHorizontal: moderateScale(12),
            paddingVertical: moderateScale(8),
        },
        recentChipText: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '400',
            fontSize: moderateScale(13),
            color: colors.text,
        },

        // ── Popular Searches ──────────────────────────────────────────────────────
        popularContainer: {
            paddingHorizontal: moderateScale(16),
            marginBottom: moderateScale(24),
        },
        popularWrap: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: moderateScale(8),
        },
        popularChip: {
            borderRadius: moderateScale(6),
            borderWidth: 0.5,
            borderColor: '#00000033',
            paddingHorizontal: moderateScale(14),
            paddingVertical: moderateScale(8),
            backgroundColor: colors.inputBg,
        },
        popularChipText: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '400',
            fontSize: moderateScale(13),
            color: colors.text,
            textAlign: 'center',
        },

        // ── Browse by Category ────────────────────────────────────────────────────
        browseContainer: {
            paddingHorizontal: moderateScale(16),
            marginBottom: moderateScale(30),
        },
        browseRow: {
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: moderateScale(14),
            gap: moderateScale(14),
        },
        browseRowDivider: {
            height: 1.0,
            backgroundColor: colors.dividerDark,
        },
        browseIconCircle: {
            width: moderateScale(44),
            height: moderateScale(44),
            borderRadius: moderateScale(22),
            backgroundColor: '#F3F3F3',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            borderWidth: 0.5,
            borderColor: '#00000015',
        },
        browseLabel: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '400',
            fontSize: moderateScale(15),
            color: colors.text,
            flex: 1,
        },

        // ── Try Searching For ─────────────────────────────────────────────────────
        tryContainer: {
            paddingHorizontal: moderateScale(16),
            paddingBottom: moderateScale(24),
        },
        tryCard: {
            backgroundColor: colors.inputBg,
            borderRadius: moderateScale(12),
            borderWidth: 0.5,
            borderColor: '#00000033',
            overflow: 'hidden',
        },
        tryRow: {
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: moderateScale(14),
            paddingVertical: moderateScale(14),
            gap: moderateScale(12),
        },
        tryRowDivider: {
            height: 0.5,
            backgroundColor: '#00000015',
            marginHorizontal: moderateScale(14),
        },
        tryText: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '400',
            fontSize: moderateScale(13),
            color: colors.textSub,
            flex: 1,
        },

        // ── Empty State ───────────────────────────────────────────────────────────
        emptyContainer: {
            flex: 1,
            alignItems: 'center',
            paddingHorizontal: moderateScale(32),
            paddingTop: moderateScale(32),
        },
        emptyImage: {
            width: moderateScale(180),
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
            marginBottom: moderateScale(20),
        },
        emptyRetryBtn: {
            backgroundColor: colors.inputBg,
            borderRadius: moderateScale(8),
            paddingVertical: moderateScale(12),
            paddingHorizontal: moderateScale(28),
            marginBottom: moderateScale(32),
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: moderateScale(8),
        },
        emptyRetryText: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '500',
            fontSize: moderateScale(14),
            color: colors.text,
            textAlign: 'center',
        },
        emptySuggestTitle: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '500',
            fontSize: moderateScale(15),
            color: colors.text,
            textAlign: 'center',
            marginBottom: moderateScale(14),
        },
        emptySuggestChip: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
            gap: moderateScale(12),
            paddingVertical: moderateScale(12),
            paddingHorizontal: moderateScale(0),
            marginBottom: moderateScale(8),
            width: '100%',
            borderBottomWidth: 0.5,
            borderBottomColor: colors.dividerDark,
        },
        emptySuggestChipText: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '500',
            fontSize: moderateScale(14),
            color: colors.textSub,
            textAlign: 'left',
            flex: 1,
        },
        emptySuggestIcon: {
            width: moderateScale(20),
            height: moderateScale(20),
            marginLeft: moderateScale(8),
        },

        // ── Active search filter tabs ─────────────────────────────────────────────
        filterTabsRow: {
            flexDirection: 'row',
            paddingHorizontal: moderateScale(16),
            gap: moderateScale(8),
            marginBottom: moderateScale(16),
        },
        filterTab: {
            paddingHorizontal: moderateScale(14),
            paddingVertical: moderateScale(7),
            borderRadius: moderateScale(20),
            borderWidth: 1,
            borderColor: '#00000020',
            backgroundColor: colors.inputBg,
        },
        filterTabActive: {
            borderColor: colors.primary,
            backgroundColor: colors.primaryMuted,
        },
        filterTabText: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '500',
            fontSize: moderateScale(13),
            color: colors.textSub,
        },
        filterTabTextActive: {
            color: colors.primary,
        },
    });