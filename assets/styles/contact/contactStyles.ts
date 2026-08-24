import { StyleSheet, Dimensions } from 'react-native';
import { lightColors } from '@/constants/ThemeContext';

const { width } = Dimensions.get('window');
const scale = (size: number) => (width / 375) * size;
const moderateScale = (size: number, factor = 0.5) =>
    size + (scale(size) - size) * factor;

export const getContactStyles = (colors: typeof lightColors) =>
    StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.background,
        },
        scrollContent: {
            paddingBottom: moderateScale(40),
        },

        // ── Info Section ─────────────────────────────────────────────────────────
        infoSection: {
            paddingHorizontal: moderateScale(20),
            paddingTop: moderateScale(16),
        },
        featuresSection: {
            paddingHorizontal: moderateScale(20),
            marginTop: moderateScale(8),
        },
        eyebrow: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '600',
            fontSize: moderateScale(11),
            letterSpacing: 1,
            color: colors.textSub,
            marginBottom: moderateScale(8),
        },
        heroTitle: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '600',
            fontSize: moderateScale(26),
            color: colors.primary,
            lineHeight: moderateScale(34),
        },
        accentBar: {
            width: moderateScale(48),
            height: moderateScale(4),
            borderRadius: moderateScale(2),
            backgroundColor: colors.primary,
            marginTop: moderateScale(12),
            marginBottom: moderateScale(16),
        },
        heroSubtitle: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '500',
            fontSize: moderateScale(15),
            color: colors.text,
            lineHeight: moderateScale(22),
            marginBottom: moderateScale(24),
        },

        // ── Feature Rows ──────────────────────────────────────────────────────────
        featureRow: {
            flexDirection: 'row',
            alignItems: 'flex-start',
            gap: moderateScale(14),
            marginBottom: moderateScale(20),
        },
        featureIconCircle: {
            width: moderateScale(44),
            height: moderateScale(44),
            borderRadius: moderateScale(22),
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
        },
        featureTextBlock: {
            flex: 1,
            paddingTop: moderateScale(2),
        },
        featureTitle: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '600',
            fontSize: moderateScale(14.5),
            color: colors.text,
            marginBottom: moderateScale(3),
        },
        featureDesc: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '400',
            fontSize: moderateScale(12.5),
            color: colors.textSub,
            lineHeight: moderateScale(18),
        },

        // ── Form Card ─────────────────────────────────────────────────────────────
        formCard: {
            marginHorizontal: moderateScale(20),
            marginTop: moderateScale(8),
            backgroundColor: colors.card,
            borderRadius: moderateScale(18),
            borderWidth: 1,
            borderColor: colors.border,
            padding: moderateScale(18),
        },
        formTitle: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '700',
            fontSize: moderateScale(18),
            color: colors.primary,
            marginBottom: moderateScale(4),
        },
        formSubtitle: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '400',
            fontSize: moderateScale(12.5),
            color: colors.textSub,
            marginBottom: moderateScale(18),
        },
        nameRow: {
            flexDirection: 'row',
            gap: moderateScale(10),
            marginBottom: moderateScale(12),
        },
        inputWrapper: {
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            gap: moderateScale(8),
            backgroundColor: colors.inputBg,
            borderWidth: 1,
            borderColor: colors.border,
            borderRadius: moderateScale(12),
            paddingHorizontal: moderateScale(12),
        },
        fullWidthWrapper: {
            marginBottom: moderateScale(12),
        },
        messageWrapper: {
            alignItems: 'flex-start',
            paddingVertical: moderateScale(10),
            marginBottom: moderateScale(18),
        },
        input: {
            flex: 1,
            fontFamily: 'SF-Pro-Display',
            fontSize: moderateScale(13.5),
            color: colors.text,
            paddingVertical: moderateScale(12),
        },
        messageInput: {
            minHeight: moderateScale(90),
            textAlignVertical: 'top',
            paddingTop: 0,
        },
        sendBtn: {
            backgroundColor: colors.primary,
            borderRadius: moderateScale(12),
            paddingVertical: moderateScale(15),
            alignItems: 'center',
            justifyContent: 'center',
        },
        sendBtnText: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '600',
            fontSize: moderateScale(15),
            color: '#FFFFFF',
        },
        sendBtnDisabled: {
            opacity: 0.6,
        },
        errorText: {
            fontFamily: 'SF-Pro-Display',
            fontSize: moderateScale(12.5),
            color: '#E53935',
            marginBottom: moderateScale(10),
            textAlign: 'center',
        },
        successText: {
            fontFamily: 'SF-Pro-Display',
            fontSize: moderateScale(12.5),
            color: '#2E7D32',
            marginBottom: moderateScale(10),
            textAlign: 'center',
        },
    });