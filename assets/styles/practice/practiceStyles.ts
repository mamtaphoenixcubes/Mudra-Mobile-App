import { StyleSheet, Dimensions } from 'react-native'
import { lightColors } from '@/constants/ThemeContext'

const { width: SCREEN_WIDTH } = Dimensions.get('window')

const moderateScale = (size: number, factor = 0.5) =>
    size + ((SCREEN_WIDTH - 375) / 375) * size * factor

export const getPracticeStyles = (colors: typeof lightColors) =>
    StyleSheet.create({

        // ── Screen ─────────────────────────────────────────────
        container: {
            flex: 1,
            //backgroundColor: '#FFFFFF',
            backgroundColor: colors.background,
        },
        scrollContent: {
            paddingTop: moderateScale(8),
        },

        // ── Page Title ──────────────────────────────────────────
        pageTitle: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '700',
            fontSize: moderateScale(20),
            // color: '#0F0F0F',
            color: colors.text,
            textAlign: 'center',
            marginBottom: moderateScale(6),
            paddingHorizontal: moderateScale(16),
        },
        subtitle: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '400',
            fontSize: moderateScale(13),
            //color: '#9A85FE',
            color: colors.primary,
            textAlign: 'center',
            paddingHorizontal: moderateScale(32),
            marginBottom: moderateScale(28),
            lineHeight: moderateScale(20),
        },

        // ── Section Header ──────────────────────────────────────
        sectionHeaderRow: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: moderateScale(16),
            marginBottom: moderateScale(14),
        },
        sectionTitleWrap: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: moderateScale(8),
        },
        sectionAccentBar: {
            width: moderateScale(4),
            height: moderateScale(18),
            borderRadius: moderateScale(2),
            //backgroundColor: '#9A85FE',
            backgroundColor: colors.primary,
        },
        sectionTitle: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '700',
            fontSize: moderateScale(18),
            //color: '#0F0F0F',
            color: colors.text,
        },
        sectionLink: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '500',
            fontSize: moderateScale(13),
            //color: '#9A85FE',
            color: colors.primary,
        },

        // ── Section Wrapper ─────────────────────────────────────
        section: {
            marginBottom: moderateScale(28),
        },

        // ── Mudra Cards ─────────────────────────────────────────
        mudraScrollContent: {
            paddingHorizontal: moderateScale(16),
            paddingRight: moderateScale(24),
            paddingBottom: moderateScale(8),
            gap: moderateScale(12),
        },
        mudraCard: {
            width: moderateScale(138),
            borderRadius: moderateScale(20),
            paddingVertical: moderateScale(18),
            paddingHorizontal: moderateScale(12),
            alignItems: 'center',
            gap: moderateScale(8),
            shadowColor: '#000',
            // shadowColor: colors.shadow,
            shadowOffset: { width: 0, height: 6 },
            shadowOpacity: 0.08,
            shadowRadius: 14,
            elevation: 5,
        },
        mudraImageWrapper: {
            width: moderateScale(84),
            height: moderateScale(84),
            borderRadius: moderateScale(42),
            overflow: 'hidden',
            borderWidth: moderateScale(3),
            borderColor: 'rgba(255,255,255,0.9)',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 3 },
            shadowOpacity: 0.12,
            shadowRadius: 8,
            elevation: 4,
        },
        mudraImage: {
            width: '100%',
            height: '100%',
        },
        mudraName: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '700',
            fontSize: moderateScale(13),
            color: '#0F0F0F',
            //color: colors.text,
            textAlign: 'center',
        },
        mudraDesc: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '400',
            fontSize: moderateScale(11),
            color: '#0F0F0F70',
            //color: colors.textSub,
            textAlign: 'center',
            lineHeight: moderateScale(15),
        },
        mudraTimeRow: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: moderateScale(4),
            backgroundColor: 'rgba(255,255,255,0.7)',
            paddingHorizontal: moderateScale(8),
            paddingVertical: moderateScale(4),
            borderRadius: moderateScale(20),
            marginTop: moderateScale(2),
        },
        mudraTime: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '500',
            fontSize: moderateScale(11),
            color: '#0F0F0F80',
            //color: colors.textMuted,
        },

        // ── Element Cards ───────────────────────────────────────
        elementScrollContent: {
            paddingHorizontal: moderateScale(16),
            paddingRight: moderateScale(24),
            paddingBottom: moderateScale(8),
            gap: moderateScale(12),
        },
        elementCard: {
            width: moderateScale(116),
            borderRadius: moderateScale(20),
            padding: moderateScale(16),
            alignItems: 'center',
            gap: moderateScale(8),
            shadowColor: '#000',
            //shadowColor: colors.shadow,
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.07,
            shadowRadius: 10,
            elevation: 4,
        },
        elementIconCircle: {
            width: moderateScale(56),
            height: moderateScale(56),
            borderRadius: moderateScale(28),
            alignItems: 'center',
            justifyContent: 'center',
        },
        elementEmoji: {
            fontSize: moderateScale(26),
        },
        elementName: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '700',
            fontSize: moderateScale(13),
            color: '#0F0F0F',
            //color: colors.text,
            textAlign: 'center',
        },
        elementDesc: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '400',
            fontSize: moderateScale(11),
            color: '#0F0F0F70',
            //color: colors.textSub,
            textAlign: 'center',
        },
        elementProgressTrack: {
            width: '100%',
            height: moderateScale(4),
            backgroundColor: 'rgba(0,0,0,0.08)',
            borderRadius: moderateScale(2),
            overflow: 'hidden',
            marginTop: moderateScale(4),
        },
        elementProgressFill: {
            height: '100%',
            borderRadius: moderateScale(2),
        },

        // ── Open Tracker Btn ────────────────────────────────────
        openTrackerBtn: {
            marginHorizontal: moderateScale(16),
            marginTop: moderateScale(16),
            borderRadius: moderateScale(14),
            //backgroundColor: '#9A85FE',
            backgroundColor: colors.primary,
            paddingVertical: moderateScale(14),
            alignItems: 'center',
            shadowColor: '#9A85FE',
            shadowOffset: { width: 0, height: 6 },
            shadowOpacity: 0.35,
            shadowRadius: 12,
            elevation: 5,
        },
        openTrackerBtnText: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '600',
            fontSize: moderateScale(14),
            //color: '#FFFFFF',
            color: colors.white,
            letterSpacing: 0.3,
        },

        // ── Nidra Cards ─────────────────────────────────────────
        nidraScrollContent: {
            paddingHorizontal: moderateScale(16),
            paddingRight: moderateScale(24),
            paddingBottom: moderateScale(8),
            gap: moderateScale(12),
        },
        nidraCard: {
            width: moderateScale(210),
            borderRadius: moderateScale(20),
            overflow: 'hidden',
            backgroundColor: '#1C1B3A',
            //shadowColor: '#000',
            shadowColor: colors.shadow,
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.18,
            shadowRadius: 16,
            elevation: 6,
        },
        nidraImageWrapper: {
            width: '100%',
            height: moderateScale(120),
            position: 'relative',
        },
        nidraImage: {
            width: '100%',
            height: moderateScale(120),
        },
        //   nidraOverlay: {
        //     position: 'absolute',
        //     bottom: 0,
        //     left: 0,
        //     right: 0,
        //     height: '65%',
        //     backgroundColor: 'rgba(28,27,58,0.55)',
        //   },
        nidraCardBody: {
            padding: moderateScale(14),
            gap: moderateScale(6),
        },
        nidraTitleRow: {
            flexDirection: 'row',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            gap: moderateScale(8),
        },
        nidraTitle: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '600',
            fontSize: moderateScale(13),
            color: '#FFFFFF',
            flex: 1,
            lineHeight: moderateScale(18),
        },
        nidraPlayBtn: {
            width: moderateScale(30),
            height: moderateScale(30),
            borderRadius: moderateScale(15),
            //backgroundColor: '#9A85FE',
            backgroundColor: colors.primary,
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
        },
        nidraMetaRow: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: moderateScale(6),
        },
        nidraMeta: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '400',
            fontSize: moderateScale(11),
            color: 'rgba(255,255,255,0.55)',
        },
        nidraMetaDot: {
            width: moderateScale(3),
            height: moderateScale(3),
            borderRadius: moderateScale(1.5),
            backgroundColor: 'rgba(255,255,255,0.3)',
        },

        // ── Divider ─────────────────────────────────────────────
        divider: {
            height: 1,
            //backgroundColor: '#E8E7F5',
            backgroundColor: colors.divider,
            marginHorizontal: moderateScale(16),
            marginBottom: moderateScale(28),
        },
    })
