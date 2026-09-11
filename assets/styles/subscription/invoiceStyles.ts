// invoiceStyles.ts
import { StyleSheet, Dimensions } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const moderateScale = (size: number, factor = 0.5) =>
    size + ((SCREEN_WIDTH - 375) / 375) * size * factor;

const LOGO_ASPECT_RATIO = 4.29; // MudraImage.png's real width:height ratio

export function getInvoiceStyles(colors: any) {
    return StyleSheet.create({
        screen: {
            flex: 1,
        },
        scrollContent: {
            flexGrow: 1,
            justifyContent: 'center',
            paddingHorizontal: moderateScale(20),
            paddingVertical: moderateScale(32),
        },

        card: {
            backgroundColor: colors.card,
            borderRadius: moderateScale(20),
            overflow: 'hidden',
            borderWidth: 1,
            borderColor: colors.border,
        },

        // ── Banner ────────────────────────────────────────────────────────────────
        banner: {
            backgroundColor: colors.primary,
            paddingVertical: moderateScale(26),
            paddingHorizontal: moderateScale(20),
            alignItems: 'center',
        },
        brandRow: {
            marginBottom: moderateScale(16),
        },
        brandLogo: {
            height: moderateScale(22),
            width: moderateScale(22) * LOGO_ASPECT_RATIO,
        },
        successCircle: {
            width: moderateScale(50),
            height: moderateScale(50),
            borderRadius: moderateScale(25),
            backgroundColor: 'rgba(255,255,255,0.22)',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: moderateScale(12),
        },
        successTitle: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '600',
            fontSize: moderateScale(17),
            color: '#FFFFFF',
        },
        successSubtitle: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '400',
            fontSize: moderateScale(12.5),
            color: 'rgba(255,255,255,0.85)',
            marginTop: moderateScale(4),
        },

        // ── Body ──────────────────────────────────────────────────────────────────
        body: {
            padding: moderateScale(20),
        },
        invoiceLabelRow: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: moderateScale(6),
        },
        invoiceLabel: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '600',
            fontSize: moderateScale(11),
            color: colors.textMuted,
            letterSpacing: moderateScale(0.6),
        },
        invoiceNumber: {
            fontFamily: 'SF-Pro-Display',
            fontSize: moderateScale(11),
            color: colors.textMuted,
        },
        planPriceRow: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            marginBottom: moderateScale(18),
        },
        planName: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '600',
            fontSize: moderateScale(15.5),
            color: colors.text,
        },
        planPrice: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '700',
            fontSize: moderateScale(22),
            color: colors.primary,
        },

        detailsTable: {
            marginBottom: moderateScale(6),
        },
        detailRow: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingVertical: moderateScale(6),
        },
        detailLabel: {
            fontFamily: 'SF-Pro-Display',
            fontSize: moderateScale(12.5),
            color: colors.textSub,
        },
        detailValue: {
            fontFamily: 'SF-Pro-Display',
            fontSize: moderateScale(12.5),
            color: colors.text,
            maxWidth: '60%',
            textAlign: 'right',
        },
        mono: {
            fontFamily: 'SF-Pro-Display',
        },

        trustStrip: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: moderateScale(6),
            backgroundColor: colors.primaryMuted,
            borderRadius: moderateScale(10),
            paddingVertical: moderateScale(9),
            paddingHorizontal: moderateScale(11),
            marginTop: moderateScale(12),
            marginBottom: moderateScale(18),
        },
        trustText: {
            fontFamily: 'SF-Pro-Display',
            fontSize: moderateScale(11.5),
        },

        downloadBtn: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: moderateScale(6),
            borderWidth: 1,
            borderColor: colors.primary,
            borderRadius: moderateScale(12),
            paddingVertical: moderateScale(13),
            marginBottom: moderateScale(10),
        },
        downloadBtnText: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '600',
            fontSize: moderateScale(14),
        },

        homeBtn: {
            borderRadius: moderateScale(12),
            paddingVertical: moderateScale(14),
            alignItems: 'center',
        },
        homeBtnText: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '600',
            fontSize: moderateScale(14),
            color: '#FFFFFF',
        },
    });
}