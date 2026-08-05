import { StyleSheet, Dimensions, Platform, StatusBar } from 'react-native';
import { lightColors } from '@/constants/ThemeContext'

const { width, height } = Dimensions.get('window');
const scale = (size: number) => (width / 375) * size;
const moderateScale = (size: number, factor = 0.5) =>
    size + (scale(size) - size) * factor;

const STATUS_BAR_HEIGHT = Platform.OS === 'android'
    ? StatusBar.currentHeight ?? 24
    : 0;
const IMAGE_WIDTH = Dimensions.get('window').width * 0.42;
export const getNeedDetailStyles = (colors: typeof lightColors) =>
    StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: colors.background
    },
    scrollContent: {
        paddingBottom: moderateScale(100),
    },
    

    // Header - Fixed to prevent duplicate headers
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: moderateScale(16),
        //paddingTop: Platform.OS === 'ios' ? moderateScale(8) : STATUS_BAR_HEIGHT + moderateScale(8),
        paddingBottom: moderateScale(12),
        backgroundColor: '#FFFFFF',
        zIndex: 10,
    },
    headerIconBtn: {
        width: moderateScale(40),
        height: moderateScale(40),
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerRightIcons: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: moderateScale(8),
    },

    // Hero Section
    hero: {
        paddingHorizontal: moderateScale(16),
        paddingTop: moderateScale(8),
        paddingBottom: moderateScale(20),
        backgroundColor: colors.background ,
    },
    heroRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: moderateScale(16),
    },
    heroImageWrapper: {
        width: moderateScale(100),
        height: moderateScale(100),
        borderRadius: moderateScale(12),
        overflow: 'hidden',
        flexShrink: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    heroImage: {
        width: '100%',
        height: '100%',
        borderRadius: 20,
    },
    heroTextBlock: {
        flex: 1,
        gap: moderateScale(6),
    },
    heroTitle: {
        fontFamily: 'SF-Pro-Display',
        fontWeight: '500',
        fontSize: moderateScale(20),
        color: colors.text,
        lineHeight: moderateScale(26),
    },
    heroSubtitle: {
        fontFamily: 'SF-Pro-Display',
        fontWeight: '400',
        fontSize: moderateScale(13),
        color: colors.text,
        lineHeight: moderateScale(19),
    },
    heroFollowersRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: moderateScale(6),
        marginTop: moderateScale(4),
    },
    heroFollowersText: {
        fontFamily: 'SF-Pro-Display',
        fontWeight: '400',
        fontSize: moderateScale(12),
        color: colors.text,
    },

    // Insight Card
    insightCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#9A85FE33',
        borderRadius: moderateScale(12),
        marginHorizontal: moderateScale(16),
        marginBottom: moderateScale(24),
        padding: moderateScale(16),
        gap: moderateScale(14),
    },
    insightIconCircle: {
        width: moderateScale(60),
        height: moderateScale(60),
        borderRadius: moderateScale(30),
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
    },
    insightText: {
        flex: 1,
        fontFamily: 'SF-Pro-Display',
        fontWeight: '400',
        fontSize: moderateScale(13),
        color: colors.textSub,
        lineHeight: moderateScale(20),
    },

    // Benefits Section - Horizontal Scroll
    benefitsContainer: {
        paddingHorizontal: moderateScale(16),
        marginBottom: moderateScale(24),
    },
    benefitsTitle: {
        fontFamily: 'SF-Pro-Display',
        fontWeight: '500',
        fontSize: moderateScale(18),
        color: colors.text,
        marginBottom: moderateScale(14),
    },
    benefitsScrollContent: {
        gap: moderateScale(12),  // Increase gap between cards
        paddingRight: moderateScale(16),
    },
    benefitItem: {
        width: moderateScale(100),      // Width of each benefit card
        backgroundColor: '#FFF6BF',
        borderRadius: moderateScale(12),
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: moderateScale(18),   // Vertical padding (height)
        paddingHorizontal: moderateScale(8),
        gap: moderateScale(10),
        minHeight: moderateScale(105),        // Minimum height
    },
    benefitLabel: {
        fontFamily: 'SF-Pro-Display',
        fontWeight: '400',
        fontSize: moderateScale(12),     // Increase font size if needed
        color: '#0F0F0F',
        textAlign: 'center',
        lineHeight: moderateScale(16),
    },

    // About Section
    aboutContainer: {
        paddingHorizontal: moderateScale(16),
        marginBottom: moderateScale(24),
    },
    aboutTitle: {
        fontFamily: 'SF-Pro-Display',
        fontWeight: '500',
        fontSize: moderateScale(18),
        color: colors.text,
        marginBottom: moderateScale(10),
    },
    aboutText: {
        fontFamily: 'SF-Pro-Display',
        fontWeight: '400',
        fontSize: moderateScale(14),
        color: colors.text,
        lineHeight: moderateScale(22),
        marginBottom: moderateScale(16),
    },
    // Add these to your needDetailStyles.ts file:

    howItHelpsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F3F3F3',
        borderRadius: moderateScale(12),
        borderWidth: 0.6,
        borderColor: '#00000033',
        padding: moderateScale(12),
        gap: moderateScale(12),
    },
    howItHelpsIconCircle: {
        width: moderateScale(44),
        height: moderateScale(44),
        borderRadius: moderateScale(22),
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 0.5,
        borderColor: '#00000015',
        flexShrink: 0,
    },
    howItHelpsTextBlock: {
        flex: 1,
    },
    howItHelpsTitle: {
        fontFamily: 'SF-Pro-Display',
        fontWeight: '500',
        fontSize: moderateScale(14),
        color: '#0F0F0F',
        marginBottom: moderateScale(3),
    },
    howItHelpsSubtitle: {
        fontFamily: 'SF-Pro-Display',
        fontWeight: '400',
        fontSize: moderateScale(12),
        color: '#0F0F0F80',
        lineHeight: moderateScale(17),
    },
    // Divider
    divider: {
        height: 0.5,
        backgroundColor: colors.dividerDark,
        marginHorizontal: moderateScale(16),
        marginVertical: moderateScale(16),
    },

    // Mudras Section
    mudrasContainer: {
        paddingHorizontal: moderateScale(16),
        marginBottom: moderateScale(24),
    },
    mudrasSectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: moderateScale(16),
    },
    mudrasSectionTitle: {
        fontFamily: 'SF-Pro-Display',
        fontWeight: '500',
        fontSize: moderateScale(18),
        color: colors.text,
        flex: 1,
        paddingRight: moderateScale(8),
    },
    mudrasViewAll: {
        fontFamily: 'SF-Pro-Display',
        fontWeight: '400',
        fontSize: moderateScale(13),
        color: '#9A85FE',
        textDecorationLine: 'underline',
    },
    mudraCard: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        borderRadius: moderateScale(12),
        marginBottom: moderateScale(12),
        overflow: 'hidden',
        padding: moderateScale(12),
        minHeight: moderateScale(120),
    },
    mudraImage: {
        width: moderateScale(90),
        height: moderateScale(100),
        borderRadius: moderateScale(8),
        resizeMode: 'cover',
        flexShrink: 0,
    },
    mudraContent: {
        flex: 1,
        paddingHorizontal: moderateScale(12),
        gap: moderateScale(6),
        minWidth: 0,
        paddingTop: moderateScale(2),
    },
    mudraName: {
        fontFamily: 'SF-Pro-Display',
        fontWeight: '500',
        fontSize: moderateScale(16),
        color: '#0F0F0F',
    },
    mudraSubtitle: {
        fontFamily: 'SF-Pro-Display',
        fontWeight: '400',
        fontSize: moderateScale(12),
        color: '#0F0F0F80',
    },
    mudraTagsRow: {
        flexDirection: 'row',
        gap: moderateScale(6),
        flexWrap: 'nowrap',
        marginTop: moderateScale(4),
    },
    mudraTag: {
        paddingHorizontal: moderateScale(12),
        paddingVertical: moderateScale(4),
        borderRadius: moderateScale(6),
        backgroundColor: '#FFFFFF',
        borderWidth: 0.5,
        borderColor: '#00000030',
    },
    mudraTagText: {
        fontFamily: 'SF-Pro-Display',
        fontWeight: '500',
        fontSize: moderateScale(10),
        color: '#0F0F0F',
        textAlign: 'center',
    },
    mudraRight: {
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        alignSelf: 'stretch',
        paddingVertical: moderateScale(8),
        gap: moderateScale(12),
    },
    mudraTimeRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: moderateScale(4),
    },
    mudraTime: {
        fontFamily: 'SF-Pro-Display',
        fontWeight: '400',
        fontSize: moderateScale(12),
        color: '#0F0F0F80',
    },

    // Guided Banner
    guidedBanner: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: moderateScale(16),
        marginBottom: moderateScale(24),
        backgroundColor: '#9A85FE1A',
        borderRadius: moderateScale(12),
        padding: moderateScale(16),
        gap: moderateScale(12),
    },
    guidedIconCircle: {
        width: moderateScale(48),
        height: moderateScale(48),
        borderRadius: moderateScale(24),
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
    },
    guidedTextBlock: {
        flex: 1,
    },
    guidedTitle: {
        fontFamily: 'SF-Pro-Display',
        fontWeight: '500',
        fontSize: moderateScale(14),
        color: colors.text,
        marginBottom: moderateScale(4),
    },
    guidedSubtitle: {
        fontFamily: 'SF-Pro-Display',
        fontWeight: '400',
        fontSize: moderateScale(12),
        color: colors.textSub,
        lineHeight: moderateScale(17),
    },
    guidedBtn: {
        backgroundColor: '#FFFFFF',
        borderRadius: moderateScale(8),
        paddingHorizontal: moderateScale(16),
        paddingVertical: moderateScale(10),
        borderWidth: 0.5,
        borderColor: '#00000020',
    },
    guidedBtnText: {
        fontFamily: 'SF-Pro-Display',
        fontWeight: '500',
        fontSize: moderateScale(13),
        color: '#0F0F0F',
    },

    badge: {
        position: 'absolute',
        bottom: 10,
        right: 10,
        backgroundColor: 'rgba(0,0,0,0.5)',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
    },

    badgeText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '600',
    },
    imageSlide: {
        width: IMAGE_WIDTH,
        height: '100%',
    },
});