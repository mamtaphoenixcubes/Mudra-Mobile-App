import React from 'react'
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  Animated,
  ScrollView,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native'
import { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import HomeSvg from '@/assets/icons/Home.svg'
import LibrarySvg from '@/assets/icons/Library.svg'
import PracticeSvg from '@/assets/icons/Practice.svg'
import NidraSvg from '@/assets/icons/Nidra.svg'
import ProfileSvg from '@/assets/icons/Profile.svg'
import { useAuthStore } from '@/store/authStore'
import AsanaSvg from '@/assets/icons/Asana.svg'
import PranayamaSvg from '@/assets/icons/Pranayama.svg'
import MeditationSvg from '@/assets/icons/Meditations.svg'

const { width: SCREEN_WIDTH } = Dimensions.get('window')

const moderateScale = (size: number, factor = 0.5) =>
  size + ((SCREEN_WIDTH - 375) / 375) * size * factor

const TAB_ICONS: Record<string, any> = {
  index: HomeSvg,
  library: LibrarySvg,
  practice: PracticeSvg,
  nidra: NidraSvg,
  profile: ProfileSvg,
  asana: AsanaSvg,
  pranayama: PranayamaSvg,
  meditation: MeditationSvg,
}

const TAB_LABELS: Record<string, string> = {
  index: 'Home',
  library: 'Library',
  practice: 'Practice',
  nidra: 'Nidra',
  profile: 'Profile',
  asana: 'Asana',
  pranayama: 'Pranayama',
  meditation: 'Meditation',
}

const ICON_SIZE = moderateScale(24)
const CONTAINER_HORIZONTAL_INSET = moderateScale(0)
const PAGE_WIDTH = SCREEN_WIDTH - CONTAINER_HORIZONTAL_INSET * 2

export default function CustomTabBar({ state, navigation }: BottomTabBarProps) {

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

  const visibleRoutes = state.routes.filter((r) => TAB_ICONS[r.name])
  const routePages = [visibleRoutes.slice(0, 4), visibleRoutes.slice(4, 8)]

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
        {routePages.map((page, pageIndex) => (
          <View key={pageIndex} style={styles.page}>
            {page.map((route) => {
              const index = state.routes.indexOf(route)
              const Icon = TAB_ICONS[route.name]
              const label = TAB_LABELS[route.name]
              const isFocused = state.index === index

              return (
                <TouchableOpacity
                  key={route.name}
                  onPress={() => navigation.navigate(route.name)}
                  style={styles.tab}
                  activeOpacity={0.7}
                >
                  <View style={styles.profileIconContainer}>
                    {route.name === 'profile' && profileImageUri ? (
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
                      <Icon
                        width={route.name === 'practice' ? moderateScale(30) : ICON_SIZE}
                        height={route.name === 'practice' ? moderateScale(30) : ICON_SIZE}
                        color="#FFFFFF"
                        opacity={isFocused ? 1 : 0.5}
                      />
                    )}

                    {route.name === 'profile' && profileIncomplete && (
                      <Animated.View
                        style={[
                          styles.profileIncompleteIndicator,
                          {
                            opacity: blinkAnim,
                          },
                        ]}
                      />
                    )}
                  </View>
                  <Text style={[styles.label, { opacity: isFocused ? 1 : 0.5 }]}>
                    {label}
                  </Text>
                  {isFocused && <View style={styles.activeIndicator} />}
                </TouchableOpacity>
              )
            })}
          </View>
        ))}
      </ScrollView>

      {routePages.length > 1 && (
        <View style={styles.dotsRow}>
          {routePages.map((_, i) => (
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