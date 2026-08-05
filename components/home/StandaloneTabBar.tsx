import React from 'react'
import { View, TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native'
import { useRouter, usePathname } from 'expo-router'
import HomeSvg from '@/assets/icons/Home.svg'
import LibrarySvg from '@/assets/icons/Library.svg'
import PracticeSvg from '@/assets/icons/Practice.svg'
import NidraSvg from '@/assets/icons/Nidra.svg'
import ProfileSvg from '@/assets/icons/Profile.svg'

const { width: SCREEN_WIDTH } = Dimensions.get('window')

const moderateScale = (size: number, factor = 0.5) =>
    size + ((SCREEN_WIDTH - 375) / 375) * size * factor

const TABS = [
    { name: 'index', label: 'Home', route: '/(tabs)/', Icon: HomeSvg },
    { name: 'library', label: 'Library', route: '/(tabs)/library', Icon: LibrarySvg },
    { name: 'practice', label: 'Practice', route: '/(tabs)/practice', Icon: PracticeSvg },
    { name: 'nidra', label: 'Nidra', route: '/(tabs)/nidra', Icon: NidraSvg },
    { name: 'profile', label: 'Profile', route: '/(tabs)/profile', Icon: ProfileSvg },
]

const ICON_SIZE = moderateScale(24)

export default function StandaloneTabBar() {
    const router = useRouter()
    const pathname = usePathname()

    return (
        <View style={styles.container}>
            {TABS.map((tab) => {
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
                        {/* <tab.Icon
                            width={ICON_SIZE}
                            height={ICON_SIZE}
                            color="#FFFFFF"
                            opacity={isFocused ? 1 : 0.5}
                        /> */}
                        <tab.Icon
                            width={tab.name === 'practice' ? ICON_SIZE + moderateScale(6) : ICON_SIZE}
                            height={tab.name === 'practice' ? ICON_SIZE + moderateScale(6) : ICON_SIZE}
                            color="#FFFFFF"
                            opacity={isFocused ? 1 : 0.5}
                        />
                        <Text style={[styles.label, { opacity: isFocused ? 1 : 0.5 }]}>
                            {tab.label}
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