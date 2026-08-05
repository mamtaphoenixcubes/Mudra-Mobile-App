import { StyleSheet, Dimensions } from 'react-native';
import { lightColors } from '@/constants/ThemeContext'

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_PADDING = 20;
const IMAGE_SIZE = SCREEN_WIDTH * 0.52;

export const getMudraOfTheDayStyles = (colors: typeof lightColors) =>
    StyleSheet.create({

        // ── MudraOfTheDay (screen) ────────────────────────────────────────────────
        screen: {
            flex: 1,
            backgroundColor: colors.background,
        },
        scrollContent: {
            paddingTop: 12,
        },

        // ── MudraOfTheDayHeader ───────────────────────────────────────────────────
        headerContainer: {
            backgroundColor: colors.background,
            paddingHorizontal: 20,
            paddingBottom: 12,
        },
        headerRow: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingBottom: 12,
        },
        headerIconBtn: {
            width: 36,
            height: 36,
            alignItems: 'center',
            justifyContent: 'center',
        },
        headerCenterGroup: {
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
        },
        headerLogo: {
            width: 28,
            height: 28,
        },
        headerBrandTitle: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '700',
            fontSize: 18,
            color: '#9A85FE',
            letterSpacing: 1,
        },
        headerScreenTitle: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '700',
            fontSize: 18,
            color: colors.text,
            letterSpacing: 0.2,
            textAlign: 'center',
            marginBottom: 8,
        },
        headerDateRow: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 6,
        },
        headerDateText: {
            fontFamily: 'SF-Pro-Display',
            fontWeight: '400',
            fontSize: 13,
            color: '#7B6FE8',
        },

        // ── HeroCard ──────────────────────────────────────────────────────────────
        heroCard: {
            backgroundColor: colors.cardPurple,
            borderRadius: 20,
            marginHorizontal: CARD_PADDING,
            paddingVertical: 28,
            paddingHorizontal: 20,
            alignItems: 'center',
        },
        heroHeartBtn: {
            position: 'absolute',
            top: 14,
            right: 14,
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: colors.white,
            alignItems: 'center',
            justifyContent: 'center',
            shadowColor: '#000',
            shadowOpacity: 0.08,
            shadowRadius: 6,
            elevation: 2,
        },
        heroImageWrapper: {
            overflow: 'hidden',
            marginBottom: 20,
            shadowColor: '#000',
            shadowOpacity: 0.12,
            shadowRadius: 10,
            elevation: 4,
        },
        heroImage: {
            backgroundColor: '#ccc',
        },
        heroImagePlaceholder: {
            backgroundColor: '#ddd',
            alignItems: 'center',
            justifyContent: 'center',
        },
        heroName: {
            fontSize: 22,
            fontWeight: '500',
            fontFamily: 'SF Pro Display',
            color: colors.text,
            textAlign: 'center',
            marginBottom: 4,
        },
        heroSubtitle: {
            fontSize: 14,
            fontWeight: '400',
            fontFamily: 'SF Pro Display',
            color: colors.text,
            textAlign: 'center',
        },

        // ── TodaysBenefit ─────────────────────────────────────────────────────────
        benefitContainer: {
            marginHorizontal: 20,
            marginTop: 24,
        },
        benefitHeading: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            marginBottom: 14,
        },
        benefitIconCircle: {
            width: 30,
            height: 30,
            borderRadius: 15,
            borderWidth: 1.5,
            borderColor: colors.text,
            alignItems: 'center',
            justifyContent: 'center',
        },
        benefitHeadingText: {
            fontSize: 16,
            fontWeight: '500',
            fontFamily: 'SF Pro Display',
            color: colors.text,
        },
        benefitBox: {
            backgroundColor: colors.cardPurpleAlt,
            borderRadius: 14,
            paddingVertical: 18,
            paddingHorizontal: 20,
        },
        benefitText: {
            fontSize: 12,
            fontWeight: '500',
            fontFamily: 'SF Pro Display',
            color: colors.text,
            textAlign: 'center',
            lineHeight: 22,
        },

        // ── LotusDivider ──────────────────────────────────────────────────────────
        dividerContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: 20,
            marginVertical: 20,
        },
        dividerLine: {
            flex: 1,
            height: 1,
            backgroundColor: colors.border,
        },
        dividerLotus: {
            marginHorizontal: 12,
        },

        // ── HowToPractice ─────────────────────────────────────────────────────────
        practiceContainer: {
            marginHorizontal: 20,
        },
        practiceHeading: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            marginBottom: 14,
        },
        practiceIconCircle: {
            width: 30,
            height: 30,
            borderRadius: 15,
            borderWidth: 1.5,
            borderColor: colors.text,
            alignItems: 'center',
            justifyContent: 'center',
        },
        practiceHeadingText: {
            fontSize: 16,
            fontWeight: '500',
            fontFamily: 'SF Pro Display',
            color: colors.text,
        },
        practiceInstructions: {
            fontSize: 14,
            fontWeight: '500',
            fontFamily: 'SF Pro Display',
            color: colors.text,
            textAlign: 'center',
            lineHeight: 14 * 1.4,
            marginBottom: 18,
        },
        practiceGuideBtn: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            alignSelf: 'center',
            backgroundColor: colors.cardPurpleAlt,
            borderRadius: 50,
            paddingVertical: 10,
            paddingHorizontal: 22,
        },
        practiceGuideBtnText: {
            fontSize: 14,
            fontWeight: '500',
            fontFamily: 'SF Pro Display',
            color: colors.text,
        },

        // ── ActionButtons ─────────────────────────────────────────────────────────
        actionContainer: {
            marginHorizontal: 20,
            marginTop: 24,
            gap: 12,
        },
        actionExploreBtn: {
            backgroundColor: '#7B6FE8',
            borderRadius: 50,
            paddingVertical: 16,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 10,
        },
        actionExploreBtnText: {
            color: '#fff',
            fontSize: 16,
            fontWeight: '600',
        },
        actionSaveBtn: {
            borderRadius: 50,
            paddingVertical: 15,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            borderWidth: 1.5,
            borderColor: colors.border,
            backgroundColor: colors.card,
        },
        actionSaveBtnText: {
            color: colors.text,
            fontSize: 15,
            fontWeight: '500',
        },
        actionTomorrowCard: {
            backgroundColor: colors.cardPurpleAlt,
            borderRadius: 16,
            padding: 16,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 14,
        },
        actionTomorrowIconBox: {
            width: 44,
            height: 44,
            borderRadius: 12,
            backgroundColor: colors.card,
            alignItems: 'center',
            justifyContent: 'center',
        },
        actionTomorrowText: {
            flex: 1,
        },
        actionTomorrowTitle: {
            fontSize: 15,
            fontWeight: '600',
            color: colors.text,
            marginBottom: 3,
        },
        actionTomorrowSubtitle: {
            fontSize: 12,
            color: colors.textSub,
            lineHeight: 17,
        },
    });