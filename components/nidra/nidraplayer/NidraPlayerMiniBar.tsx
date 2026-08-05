import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import Svg, { Polygon, Rect, Circle } from 'react-native-svg'

const { width: SCREEN_WIDTH } = Dimensions.get('window')

const moderateScale = (size: number, factor = 0.5) =>
    size + ((SCREEN_WIDTH - 375) / 375) * size * factor

const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
    const s = Math.floor(seconds % 60)
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
}

const SkipBackIcon = () => (
    <Svg width={moderateScale(20)} height={moderateScale(20)} viewBox="0 0 24 24">
        <Polygon points="19,5 8,12 19,19" fill="none" stroke="#222" strokeWidth="1.8" strokeLinejoin="round" />
        <Rect x="4" y="5" width="2" height="14" rx="1" fill="#222" />
    </Svg>
)

const SkipForwardIcon = () => (
    <Svg width={moderateScale(20)} height={moderateScale(20)} viewBox="0 0 24 24">
        <Polygon points="5,5 16,12 5,19" fill="none" stroke="#222" strokeWidth="1.8" strokeLinejoin="round" />
        <Rect x="18" y="5" width="2" height="14" rx="1" fill="#222" />
    </Svg>
)

const PauseIcon = () => (
    <Svg width={moderateScale(16)} height={moderateScale(16)} viewBox="0 0 24 24">
        <Rect x="5" y="3" width="4" height="18" rx="1.5" fill="#222" />
        <Rect x="15" y="3" width="4" height="18" rx="1.5" fill="#222" />
    </Svg>
)

const PlayIcon = () => (
    <Svg width={moderateScale(16)} height={moderateScale(16)} viewBox="0 0 24 24">
        <Polygon points="7,4 20,12 7,20" fill="#222" />
    </Svg>
)

interface MudraPlayerMiniBarProps {
    title: string
    currentTime: number
    totalTime: number
    isPlaying: boolean
    onTogglePlay: () => void
    onSkipBack: () => void
    onSkipForward: () => void
    bottomOffset: number
}

export default function NidraPlayerMiniBar({
    title,
    currentTime,
    totalTime,
    isPlaying,
    onTogglePlay,
    onSkipBack,
    onSkipForward,
    bottomOffset,
}: MudraPlayerMiniBarProps) {
    return (
        <View style={[styles.container, { bottom: bottomOffset }]}>
            <View style={styles.noteIcon}>
                <Text style={styles.noteText}>♪</Text>
            </View>

            <View style={styles.meta}>
                <Text style={styles.title} numberOfLines={1}>
                    {title}
                </Text>
                <Text style={styles.time}>
                    {formatTime(currentTime)} / {formatTime(totalTime)}
                </Text>
            </View>

            <View style={styles.controls}>
                <TouchableOpacity style={styles.ctrlBtn} onPress={onSkipBack} activeOpacity={0.7}>
                    <SkipBackIcon />
                </TouchableOpacity>
                <TouchableOpacity style={styles.playBtn} onPress={onTogglePlay} activeOpacity={0.85}>
                    {isPlaying ? <PauseIcon /> : <PlayIcon />}
                </TouchableOpacity>
                <TouchableOpacity style={styles.ctrlBtn} onPress={onSkipForward} activeOpacity={0.7}>
                    <SkipForwardIcon />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const LAVENDER = '#EDE9F6'
const PURPLE = '#9A85FE'

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        left: moderateScale(15),
        right: moderateScale(15),
        height: moderateScale(68),
        borderRadius: moderateScale(16),
        backgroundColor: '#F2F2F2',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: moderateScale(12),
        gap: moderateScale(12),
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: -2 },
        elevation: 8,
    },
    noteIcon: {
        width: moderateScale(44),
        height: moderateScale(44),
        borderRadius: moderateScale(10),
        backgroundColor: LAVENDER,
        justifyContent: 'center',
        alignItems: 'center',
    },
    noteText: {
        fontSize: moderateScale(18),
        color: PURPLE,
    },
    meta: {
        flex: 1,
        gap: moderateScale(2),
    },
    title: {
        fontFamily: 'SF-Pro-Display',
        fontSize: moderateScale(14),
        fontWeight: '600',
        color: '#1A1A2E',
    },
    time: {
        fontFamily: 'SF-Pro-Display',
        fontSize: moderateScale(11),
        color: '#888',
    },
    controls: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: moderateScale(4),
    },
    ctrlBtn: {
        width: moderateScale(32),
        height: moderateScale(32),
        alignItems: 'center',
        justifyContent: 'center',
    },
    playBtn: {
        width: moderateScale(36),
        height: moderateScale(36),
        borderRadius: moderateScale(18),
        borderWidth: 2,
        borderColor: '#222',
        alignItems: 'center',
        justifyContent: 'center',
    },
})