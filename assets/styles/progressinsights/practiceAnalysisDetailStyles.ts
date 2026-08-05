import { StyleSheet, Dimensions } from 'react-native';
import { lightColors } from '@/constants/ThemeContext'

const { width } = Dimensions.get('window');
const scale = (size: number) => (width / 375) * size;
const moderateScale = (size: number, factor = 0.5) =>
    size + (scale(size) - size) * factor;

export const getPracticeAnalysisDetailStyles = (colors: typeof lightColors) =>
    StyleSheet.create({
        screen: { flex: 1, backgroundColor: colors.background },
        scrollContent: {
            paddingHorizontal: moderateScale(16),
            paddingBottom: moderateScale(40),
        },
        pageTitle: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '500',
            fontSize: moderateScale(20),
            color: colors.text,
            textAlign: 'center',
            marginTop: moderateScale(8),
            marginBottom: moderateScale(16),
        },

        // ── Tab selector ──
        tabRow: {
            flexDirection: 'row',
            gap: moderateScale(6),
            backgroundColor: colors.surfaceAlt,
            borderRadius: moderateScale(10),
            padding: moderateScale(4),
            marginBottom: moderateScale(20),
        },
        tabBtn: {
            flex: 1,
            paddingVertical: moderateScale(8),
            borderRadius: moderateScale(8),
            alignItems: 'center',
        },
        tabBtnActive: {
            backgroundColor: colors.primaryMuted,
        },
        tabText: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '400',
            fontSize: moderateScale(13),
            color: colors.textSub,
        },
        tabTextActive: {
            fontWeight: '600',
            color: colors.text,
        },

        // ── Section label ──
        sectionLabel: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '600',
            fontSize: moderateScale(13),
            color: colors.textSub,
            marginBottom: moderateScale(8),
        },

        // ── Summary tiles ──
        summaryRow: {
            flexDirection: 'row',
            gap: moderateScale(10),
            marginBottom: moderateScale(20),
        },
        summaryTile: {
            flex: 1,
            borderRadius: moderateScale(12),
            padding: moderateScale(12),
        },
        summaryLabel: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '400',
            fontSize: moderateScale(11),
        },
        summaryValue: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '600',
            fontSize: moderateScale(20),
            marginTop: moderateScale(4),
        },

        // ── Donut + legend ──
        donutRow: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: moderateScale(16),
            marginBottom: moderateScale(20),
        },
        legendCol: {
            flex: 1,
            gap: moderateScale(8),
        },
        legendItem: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: moderateScale(8),
        },
        legendDot: {
            width: moderateScale(10),
            height: moderateScale(10),
            borderRadius: moderateScale(5),
        },
        legendText: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '400',
            fontSize: moderateScale(12),
            color: colors.textSub,
            flex: 1,
        },
        emptyText: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '400',
            fontSize: moderateScale(13),
            color: colors.textMuted,
            textAlign: 'center',
            paddingVertical: moderateScale(20),
        },

        // ── Bar chart ──
        barChartSectionLabel: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '600',
            fontSize: moderateScale(13),
            color: colors.textSub,
            marginBottom: moderateScale(20),
        },
        barChartRow: {
            flexDirection: 'row',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            height: moderateScale(100),
            marginBottom: moderateScale(8),
            paddingHorizontal: moderateScale(4),
        },
        barCol: {
            alignItems: 'center',
            flex: 1,
            height: '100%',
            justifyContent: 'flex-end',
        },
        bar: {
            width: moderateScale(18),
            borderRadius: moderateScale(4),
            minHeight: moderateScale(3),
        },
        barLabel: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '400',
            fontSize: moderateScale(10),
            color: colors.textMuted,
            marginTop: moderateScale(6),
        },

        // ── Consistency tiles ──
        consistencyRow: {
            flexDirection: 'row',
            gap: moderateScale(10),
            marginBottom: moderateScale(12),
        },
        consistencyTile: {
            flex: 1,
            borderRadius: moderateScale(12),
            padding: moderateScale(12),
            alignItems: 'center',
        },
        consistencyValue: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '600',
            fontSize: moderateScale(18),
            marginTop: moderateScale(6),
        },
        consistencyLabel: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '400',
            fontSize: moderateScale(11),
            marginTop: moderateScale(2),
        },

        // ── Fixed footer (Consistency, pinned to bottom, not scrolling) ──
        footerContainer: {
            paddingHorizontal: moderateScale(16),
            paddingTop: moderateScale(12),
            borderTopWidth: 0.5,
            borderTopColor: colors.attrBorderTop,
            backgroundColor: colors.background,
        },
    });