import React from 'react'
import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet,
    Dimensions,
    ScrollView,
    Image,
    Animated,
    NativeSyntheticEvent,
    NativeScrollEvent,
} from 'react-native'
import { useRouter, usePathname } from 'expo-router'
import HomeSvg from '@/assets/icons/Home.svg'
import LibrarySvg from '@/assets/icons/Library.svg'
import PracticeSvg from '@/assets/icons/Practice.svg'
import NidraSvg from '@/assets/icons/Nidra.svg'
import ProfileSvg from '@/assets/icons/Profile.svg'
import AsanaSvg from '@/assets/icons/Asana.svg'
import PranayamaSvg from '@/assets/icons/Pranayama.svg'
import MeditationSvg from '@/assets/icons/Meditations.svg'
import { useAuthStore } from '@/store/authStore'

const { width: SCREEN_WIDTH } = Dimensions.get('window')

const moderateScale = (size: number, factor = 0.5) =>
    size + ((SCREEN_WIDTH - 375) / 375) * size * factor

const TABS = [
    { name: 'index', label: 'Home', route: '/(tabs)/', Icon: HomeSvg },
    { name: 'library', label: 'Library', route: '/(tabs)/library', Icon: LibrarySvg },
    { name: 'practice', label: 'Practice', route: '/(tabs)/practice', Icon: PracticeSvg },
    { name: 'nidra', label: 'Nidra', route: '/(tabs)/nidra', Icon: NidraSvg },
    { name: 'asana', label: 'Asana', route: '/(tabs)/asana', Icon: AsanaSvg },
    { name: 'pranayama', label: 'Pranayama', route: '/(tabs)/pranayama', Icon: PranayamaSvg },
    { name: 'meditation', label: 'Meditation', route: '/(tabs)/meditation', Icon: MeditationSvg },
    { name: 'profile', label: 'Profile', route: '/(tabs)/profile', Icon: ProfileSvg },
]

const TAB_PAGES = [TABS.slice(0, 4), TABS.slice(4, 8)]

const ICON_SIZE = moderateScale(24)
const CONTAINER_HORIZONTAL_INSET = moderateScale(0)
const PAGE_WIDTH = SCREEN_WIDTH - CONTAINER_HORIZONTAL_INSET * 2

export default function StandaloneTabBar() {
    const router = useRouter()
    const pathname = usePathname()
    const user = useAuthStore((s) => s.user)

    const profileIncomplete =
        user?.profileComplete !== true &&
        Number(user?.profileCompletionPercentage ?? 0) < 100

    const blinkAnim = React.useRef(new Animated.Value(1)).current

    React.useEffect(() => {
        if (!profileIncomplete) {
            blinkAnim.setValue(1)
            return
        }

        const animation = Animated.loop(
            Animated.sequence([
                Animated.timing(blinkAnim, {
                    toValue: 0.2,
                    duration: 600,
                    useNativeDriver: true,
                }),
                Animated.timing(blinkAnim, {
                    toValue: 1,
                    duration: 600,
                    useNativeDriver: true,
                }),
            ])
        )

        animation.start()

        return () => {
            animation.stop()
        }
    }, [profileIncomplete])

    const profileImageUri = user?.profileImage?.url
        ? (user.profileImage.url.startsWith('http')
            ? user.profileImage.url
            : `${process.env.EXPO_PUBLIC_IMAGE_API_URL}${user.profileImage.url}`)
        : null

    const [activePage, setActivePage] = React.useState(0)

    const handleScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
        const page = Math.round(e.nativeEvent.contentOffset.x / PAGE_WIDTH)
        setActivePage(page)
    }

    return (
        <View style={styles.container}>
            <ScrollView
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onMomentumScrollEnd={handleScrollEnd}
            >
                {TAB_PAGES.map((page, pageIndex) => (
                    <View key={pageIndex} style={styles.page}>
                        {page.map((tab) => {
                            const isFocused =
                                tab.name === 'index'
                                    ? pathname === '/' || pathname === '/(tabs)' || pathname === '/(tabs)/'
                                    : pathname.includes(tab.name)

                            return (
                                <TouchableOpacity
                                    key={tab.name}
                                    onPress={() => router.push(tab.route as any)}
                                    style={styles.tab}
                                    activeOpacity={0.7}
                                >
                                    <View style={styles.profileIconContainer}>
                                        {tab.name === 'profile' && profileImageUri ? (
                                            <Image
                                                source={{ uri: profileImageUri }}
                                                style={{
                                                    width: ICON_SIZE,
                                                    height: ICON_SIZE,
                                                    borderRadius: ICON_SIZE / 2,
                                                    opacity: isFocused ? 1 : 0.5,
                                                    borderWidth: isFocused ? 1.5 : 0,
                                                    borderColor: '#FFFFFF',
                                                }}
                                            />
                                        ) : (
                                            <tab.Icon
                                                width={tab.name === 'practice' ? ICON_SIZE + moderateScale(6) : ICON_SIZE}
                                                height={tab.name === 'practice' ? ICON_SIZE + moderateScale(6) : ICON_SIZE}
                                                color="#FFFFFF"
                                                opacity={isFocused ? 1 : 0.5}
                                            />
                                        )}

                                        {tab.name === 'profile' && profileIncomplete && (
                                            <Animated.View
                                                style={[
                                                    styles.profileIncompleteIndicator,
                                                    { opacity: blinkAnim },
                                                ]}
                                            />
                                        )}
                                    </View>
                                    <Text style={[styles.label, { opacity: isFocused ? 1 : 0.5 }]}>
                                        {tab.label}
                                    </Text>
                                    {isFocused && <View style={styles.activeIndicator} />}
                                </TouchableOpacity>
                            )
                        })}
                    </View>
                ))}
            </ScrollView>

            {TAB_PAGES.length > 1 && (
                <View style={styles.dotsRow}>
                    {TAB_PAGES.map((_, i) => (
                        <View
                            key={i}
                            style={[styles.dot, activePage === i && styles.dotActive]}
                        />
                    ))}
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: moderateScale(0),
        left: CONTAINER_HORIZONTAL_INSET,
        right: CONTAINER_HORIZONTAL_INSET,
        borderRadius: moderateScale(10),
        backgroundColor: '#9A85FE',
        elevation: 10,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 4 },
        overflow: 'hidden',
    },
    tab: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        paddingVertical: moderateScale(8),
    },
    page: {
        width: PAGE_WIDTH,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingTop: moderateScale(14),
        paddingBottom: moderateScale(8),
    },
    dotsRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: moderateScale(6),
        paddingBottom: moderateScale(10),
    },
    dot: {
        width: moderateScale(5),
        height: moderateScale(5),
        borderRadius: moderateScale(2.5),
        backgroundColor: 'rgba(255,255,255,0.4)',
    },
    dotActive: {
        width: moderateScale(14),
        backgroundColor: '#FFFFFF',
    },
    label: {
        fontFamily: 'SF-Pro-Display',
        fontWeight: '400',
        fontSize: moderateScale(12),
        color: '#FFFFFF',
        marginTop: moderateScale(4),
        textAlign: 'center',
    },
    activeIndicator: {
        position: 'absolute',
        bottom: moderateScale(2),
        width: moderateScale(20),
        height: moderateScale(3),
        borderRadius: moderateScale(2),
        backgroundColor: '#FFFFFF',
    },
    profileIconContainer: {
        position: 'relative',
        width: ICON_SIZE,
        height: ICON_SIZE,
        alignItems: 'center',
        justifyContent: 'center',
    },
    profileIncompleteIndicator: {
        position: 'absolute',
        top: moderateScale(-3),
        right: moderateScale(-3),
        width: moderateScale(8),
        height: moderateScale(8),
        borderRadius: moderateScale(4),
        backgroundColor: '#FF3B30',
        borderWidth: 1.5,
        borderColor: '#9A85FE',
    },
})