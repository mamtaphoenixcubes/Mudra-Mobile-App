import React from 'react'
import { View, TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import SettingsSvg from '@/assets/icons/setting.svg'
import PlayWhiteSvg from '@/assets/icons/PlayWhite.svg'
import TuneWhiteSvg from '@/assets/icons/TuneWhite.svg'

const { width: SCREEN_WIDTH } = Dimensions.get('window')

const moderateScale = (size: number, factor = 0.5) =>
    size + ((SCREEN_WIDTH - 375) / 375) * size * factor

interface MeditationFooterProps {
    onSettingsPress?: () => void
    onStartPress?: () => void
    onBackgroundMusicPress?: () => void
}

export default function MeditationFooter({
    onSettingsPress,
    onStartPress,
    onBackgroundMusicPress,
}: MeditationFooterProps) {
    const insets = useSafeAreaInsets()

    return (
        <View style={[styles.container, { bottom: moderateScale(20) }]}>
            <TouchableOpacity style={styles.tab} onPress={onSettingsPress} activeOpacity={0.7}>
                <SettingsSvg width={moderateScale(24)} height={moderateScale(24)} />
                <Text style={styles.label}>Settings</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.centerTab} onPress={onStartPress} activeOpacity={0.8}>
                <View style={styles.playButton}>
                    <PlayWhiteSvg width={moderateScale(28)} height={moderateScale(28)} />
                </View>
                <Text style={styles.label}>Start Practice</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.tab} onPress={onBackgroundMusicPress} activeOpacity={0.7}>
                <TuneWhiteSvg width={moderateScale(24)} height={moderateScale(24)} />
                <Text style={styles.label}>Background{'\n'}music</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
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
        paddingHorizontal: moderateScale(10),
    },
    tab: {
        alignItems: 'center',
        flex: 1,
    },
    centerTab: {
        alignItems: 'center',
        flex: 1,
    },
    playButton: {
        width: moderateScale(48),
        height: moderateScale(48),
        borderRadius: moderateScale(24),
        backgroundColor: 'rgba(255,255,255,0.25)',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: moderateScale(2),
    },
    label: {
        color: '#C2B6FE',
        fontSize: moderateScale(12),
        fontFamily: 'SF-Pro-Display',
        fontWeight: '400',
        textAlign: 'center',
        marginTop: moderateScale(4),
    },
})