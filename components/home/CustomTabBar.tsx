import React from 'react'
import { View, TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native'
import { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import HomeSvg from '@/assets/icons/Home.svg'
import LibrarySvg from '@/assets/icons/Library.svg'
import PracticeSvg from '@/assets/icons/Practice.svg'
import NidraSvg from '@/assets/icons/Nidra.svg'
import ProfileSvg from '@/assets/icons/Profile.svg'

const { width: SCREEN_WIDTH } = Dimensions.get('window')

const moderateScale = (size: number, factor = 0.5) =>
  size + ((SCREEN_WIDTH - 375) / 375) * size * factor

const TAB_ICONS: Record<string, any> = {
  index: HomeSvg,
  library: LibrarySvg,
  practice: PracticeSvg,
  nidra: NidraSvg,
  profile: ProfileSvg,
}

const TAB_LABELS: Record<string, string> = {
  index: 'Home',
  library: 'Library',
  practice: 'Practice',
  nidra: 'Nidra',
  profile: 'Profile',
}

const ICON_SIZE = moderateScale(24)

export default function CustomTabBar({ state, navigation }: BottomTabBarProps) {
  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const Icon = TAB_ICONS[route.name]
        const label = TAB_LABELS[route.name]
        if (!Icon || !label) return null

        const isFocused = state.index === index

        return (
          <TouchableOpacity
            key={route.name}
            onPress={() => navigation.navigate(route.name)}
            style={styles.tab}
            activeOpacity={0.7}
          >
            {/* <Icon
              width={ICON_SIZE}
              height={ICON_SIZE}
              color="#FFFFFF"
              opacity={isFocused ? 1 : 0.5}
            /> */}
            <Icon
              width={route.name === 'practice' ? moderateScale(30) : ICON_SIZE}
              height={route.name === 'practice' ? moderateScale(30) : ICON_SIZE}
              color="#FFFFFF"
              opacity={isFocused ? 1 : 0.5}
            />
            <Text style={[styles.label, { opacity: isFocused ? 1 : 0.5 }]}>
              {label}
            </Text>
            {isFocused && <View style={styles.activeIndicator} />}
          </TouchableOpacity>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: moderateScale(10),
    left: moderateScale(15),
    right: moderateScale(15),
    height: moderateScale(80),
    borderRadius: moderateScale(30),
    backgroundColor: '#9A85FE',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  tab: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingVertical: moderateScale(8),
  },
  label: {
    fontFamily: 'SF-Pro-Display',
    fontWeight: '600',
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
})