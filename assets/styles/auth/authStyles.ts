import { StyleSheet, Platform, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

// Responsive size calculations
const responsiveWidth = width * 0.45;
const responsiveHeight = responsiveWidth * 0.75;

export const AUTH_COLORS = {
    primary: '#9A85FE',
    white: '#FFFFFF',
    background: '#FFFFFF',
    text: '#0F0F0F',
    textLight: 'rgba(15, 15, 15, 0.6)',
    placeholder: 'rgba(0,0,0,0.35)',
    border: 'rgba(0,0,0,0.1)',
    googleBorder: 'rgba(0,0,0,0.2)',
    error: '#FF3B30',
    success: '#34C759',
};

export const AUTH_FONTS = {
    regular: {
        fontFamily: Platform.OS === 'ios' ? 'SF-Pro-Display' : 'sans-serif',
        fontWeight: '400' as const,
    },
    medium: {
        fontFamily: Platform.OS === 'ios' ? 'SF-Pro-Display' : 'sans-serif-medium',
        fontWeight: '500' as const,
    },
    semibold: {
        fontFamily: Platform.OS === 'ios' ? 'SF-Pro-Display' : 'sans-serif-medium',
        fontWeight: '600' as const,
    },
    bold: {
        fontFamily: Platform.OS === 'ios' ? 'SF-Pro-Display' : 'sans-serif-bold',
        fontWeight: '700' as const,
    },
};

export const authStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: AUTH_COLORS.background,
    },
    inner: {
        flex: 1,
        paddingHorizontal: 24,
        paddingBottom: 10,
        paddingTop: Platform.OS === 'ios' ? 40 : 20,
    },
    scrollContent: {
        flexGrow: 1,
        paddingBottom: 20,
    },

    // backBtn: {
    //     marginTop: Platform.OS === 'ios' ? 16 : 24,
    //     marginBottom: 8,
    //     width: 40,
    //     height: 40,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     zIndex: 10,
    // },
    backBtn: {
        marginTop: Platform.OS === 'ios' ? 16 : 24,
        marginBottom: 8,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
    },
    fixedHeader: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 20,
        paddingHorizontal: 14,
        //paddingBottom: 2,
    },

    heroImage: {
        width: responsiveWidth,
        height: responsiveHeight,
        maxWidth: 280,
        minWidth: 180,
        maxHeight: 210,
        minHeight: 135,
        borderRadius: 20,
        alignSelf: 'center',
        marginBottom: 28,
        marginTop: 24,
        //backgroundColor: 'rgba(154, 133, 254, 0.05)',
    },

    title: {
        fontFamily: AUTH_FONTS.medium.fontFamily,
        fontWeight: AUTH_FONTS.medium.fontWeight,
        fontSize: 28,
        color: AUTH_COLORS.primary,
        textAlign: 'center',
        marginBottom: 8,
    },

    subtitle: {
        fontFamily: AUTH_FONTS.regular.fontFamily,
        fontWeight: AUTH_FONTS.regular.fontWeight,
        fontSize: 14,
        color: AUTH_COLORS.text,
        textAlign: 'center',
        marginBottom: 32,
        lineHeight: 20,
        paddingHorizontal: 16,
        maxWidth: '90%',
        alignSelf: 'center'
    },

    // Input fields - No labels above
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
        borderRadius: 12,
        paddingHorizontal: 16,
        height: 52,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: AUTH_COLORS.border,
        gap: 12,
    },
    inputWrapperFocused: {
        borderColor: AUTH_COLORS.primary,
        borderWidth: 2,
        backgroundColor: '#FFFFFF',
    },
    input: {
        flex: 1,
        fontFamily: AUTH_FONTS.regular.fontFamily,
        fontWeight: AUTH_FONTS.regular.fontWeight,
        fontSize: 15,
        color: AUTH_COLORS.text,
        paddingVertical: Platform.OS === 'ios' ? 12 : 8,
    },

    checkboxRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 24,
        marginTop: 8,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkbox: {
        width: 20,
        height: 20,
        borderRadius: 4,
        borderWidth: 2,
        borderColor: AUTH_COLORS.border,
        marginRight: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkboxChecked: {
        backgroundColor: AUTH_COLORS.primary,
        borderColor: AUTH_COLORS.primary,
    },
    checkboxText: {
        fontFamily: AUTH_FONTS.regular.fontFamily,
        fontWeight: AUTH_FONTS.regular.fontWeight,
        fontSize: 14,
        color: AUTH_COLORS.text,
    },
    forgotPassword: {
        fontFamily: AUTH_FONTS.medium.fontFamily,
        fontWeight: AUTH_FONTS.medium.fontWeight,
        fontSize: 14,
        color: AUTH_COLORS.primary,
        textDecorationLine: 'underline',
    },

    primaryBtn: {
        backgroundColor: AUTH_COLORS.primary,
        borderRadius: 12,
        height: 52,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 8,
        marginBottom: 16,
    },
    primaryBtnText: {
        fontFamily: AUTH_FONTS.medium.fontFamily,
        fontWeight: AUTH_FONTS.medium.fontWeight,
        fontSize: 16,
        color: AUTH_COLORS.white,
    },

    dividerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20,
        gap: 12,
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: AUTH_COLORS.border,
    },
    dividerText: {
        fontFamily: AUTH_FONTS.regular.fontFamily,
        fontWeight: AUTH_FONTS.regular.fontWeight,
        fontSize: 13,
        color: 'rgba(0,0,0,0.4)',
    },

    socialBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
        height: 52,
        borderWidth: 1,
        borderColor: AUTH_COLORS.googleBorder,
        marginBottom: 12,
        gap: 12,
        backgroundColor: AUTH_COLORS.white,
    },
    socialBtnText: {
        fontFamily: AUTH_FONTS.regular.fontFamily,
        fontWeight: AUTH_FONTS.regular.fontWeight,
        fontSize: 15,
        color: AUTH_COLORS.text,
    },

    bottomRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        gap: 4,
    },
    bottomText: {
        fontFamily: AUTH_FONTS.medium.fontFamily,
        fontWeight: AUTH_FONTS.medium.fontWeight,
        fontSize: 14,
        color: AUTH_COLORS.text,
    },
    bottomLink: {
        fontFamily: AUTH_FONTS.medium.fontFamily,
        fontWeight: AUTH_FONTS.medium.fontWeight,
        fontSize: 14,
        color: AUTH_COLORS.primary,
        textDecorationLine: 'underline',
    },
    termsText: {
        fontFamily: AUTH_FONTS.regular.fontFamily,
        fontWeight: AUTH_FONTS.regular.fontWeight,
        fontSize: 13,
        color: AUTH_COLORS.text,
        flex: 1,
        marginLeft: 8,
        lineHeight: 18,
    },
    termsLink: {
        fontFamily: AUTH_FONTS.medium.fontFamily,
        fontWeight: AUTH_FONTS.medium.fontWeight,
        color: AUTH_COLORS.primary,
        textDecorationLine: 'underline',
    },
    activeMethodBtn: {
        backgroundColor: 'rgba(154, 133, 254, 0.05)',
        borderColor: AUTH_COLORS.primary,
        borderWidth: 2,
    },
    emailText: {
        fontFamily: AUTH_FONTS.medium.fontFamily,
        fontWeight: AUTH_FONTS.medium.fontWeight,
        fontSize: 14,
        color: AUTH_COLORS.primary,
        textAlign: 'center',
        marginBottom: 24,
        marginTop: -20, // To bring it closer to subtitle
    },

    // OTP Container
    otpContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
        gap: 8,
    },

    // OTP Input Box
    otpInput: {
        width: Platform.OS === 'ios' ? 48 : 44,
        height: Platform.OS === 'ios' ? 56 : 52,
        backgroundColor: '#F5F5F5',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: AUTH_COLORS.border,
        fontSize: 20,
        fontFamily: AUTH_FONTS.medium.fontFamily,
        fontWeight: AUTH_FONTS.medium.fontWeight,
        color: AUTH_COLORS.text,
        textAlign: 'center',
        paddingVertical: Platform.OS === 'ios' ? 12 : 8,
    },

    // Focused OTP Input
    otpInputFocused: {
        borderColor: AUTH_COLORS.primary,
        borderWidth: 2,
        backgroundColor: '#FFFFFF',
    },
    otpLabel: {
        fontFamily: AUTH_FONTS.medium.fontFamily,
        fontWeight: AUTH_FONTS.medium.fontWeight,
        fontSize: 14,
        color: AUTH_COLORS.text,
        marginBottom: 12,
        marginLeft: 4,
    },

    // Resend Container
    resendContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 32,
        flexWrap: 'wrap',
    },

    // Resend Text
    resendText: {
        fontFamily: AUTH_FONTS.regular.fontFamily,
        fontWeight: AUTH_FONTS.regular.fontWeight,
        fontSize: 14,
        color: AUTH_COLORS.text,
    },

    // Resend Link
    resendLink: {
        fontFamily: AUTH_FONTS.medium.fontFamily,
        fontWeight: AUTH_FONTS.medium.fontWeight,
        fontSize: 14,
        color: AUTH_COLORS.primary,
        textDecorationLine: 'underline',
    },

    // Resend Link Disabled
    resendLinkDisabled: {
        color: AUTH_COLORS.placeholder,
        textDecorationLine: 'none',
    },
    passwordRequirement: {
        fontFamily: AUTH_FONTS.regular.fontFamily,
        fontWeight: AUTH_FONTS.regular.fontWeight,
        fontSize: 12,
        color: AUTH_COLORS.textLight,
        marginBottom: 16,
        marginTop: -8,
        marginLeft: 4,
        lineHeight: 16,
    },
    successIconContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 24,
        marginTop: 20,
    },

    // Success Circle Background
    successCircle: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: AUTH_COLORS.success,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#34C759',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
    },

    // Success Message Text
    successMessage: {
        fontFamily: AUTH_FONTS.medium.fontFamily,
        fontWeight: AUTH_FONTS.medium.fontWeight,
        fontSize: 16,
        color: AUTH_COLORS.text,
        textAlign: 'center',
        marginBottom: 16,
        paddingHorizontal: 20,
        lineHeight: 24,
    },

    // ── Personalisation ───────────────────────────────────────────────────────
    personalisationHeroImage: {
        width: 160,
        height: 130,
        borderRadius: 14,
        alignSelf: 'center',
        marginBottom: 20,
    },
    personalisationTitle: {
        fontFamily: AUTH_FONTS.medium.fontFamily,
        fontWeight: AUTH_FONTS.medium.fontWeight,
        fontSize: 22,
        color: AUTH_COLORS.primary,
        textAlign: 'center',
        marginBottom: 8,
    },
    personalisationSubtitle: {
        fontFamily: AUTH_FONTS.regular.fontFamily,
        fontWeight: AUTH_FONTS.regular.fontWeight,
        fontSize: 14,
        color: AUTH_COLORS.text,
        textAlign: 'center',
        lineHeight: 22,
        marginBottom: 24,
        paddingHorizontal: 12,
    },
    personalisationSectionLabel: {
        fontFamily: AUTH_FONTS.medium.fontFamily,
        fontWeight: AUTH_FONTS.medium.fontWeight,
        fontSize: 15,
        color: AUTH_COLORS.text,
        marginBottom: 12,
    },
    personalisationCard: {
        backgroundColor: '#F3F3F3',
        borderRadius: 6,
        borderWidth: 0.5,
        borderColor: 'rgba(0,0,0,0.2)',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 18,
        paddingHorizontal: 8,
        gap: 8,
    },
    personalisationCardActive: {
        backgroundColor: '#E2DBFF',
        borderColor: AUTH_COLORS.primary,
        borderWidth: 1,
    },
    personalisationCardLabel: {
        fontFamily: AUTH_FONTS.regular.fontFamily,
        fontWeight: AUTH_FONTS.regular.fontWeight,
        fontSize: 11,
        color: AUTH_COLORS.text,
        textAlign: 'center',
        lineHeight: 17,
    },
    personalisationCardLabelActive: {
        color: '#7A64E2',
        fontWeight: '500' as const,
    },
    personalisationContinueBtn: {
        backgroundColor: AUTH_COLORS.primary,
        borderRadius: 12,
        paddingVertical: 16,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 14,
        marginTop: 8,
    },
    personalisationContinueBtnText: {
        fontFamily: AUTH_FONTS.medium.fontFamily,
        fontWeight: AUTH_FONTS.medium.fontWeight,
        fontSize: 16,
        color: AUTH_COLORS.white,
        textAlign: 'center',
    },
    personalisationSkipText: {
        fontFamily: AUTH_FONTS.regular.fontFamily,
        fontWeight: AUTH_FONTS.regular.fontWeight,
        fontSize: 14,
        color: AUTH_COLORS.text,
        textDecorationLine: 'underline',
        textAlign: 'center',
    },
});