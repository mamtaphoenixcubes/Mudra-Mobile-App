import React from 'react'
import {
    View,
    TouchableOpacity,
    Image,
    StyleSheet,
    Dimensions,
} from 'react-native'
import { VideoView, useVideoPlayer } from 'expo-video'
import Svg, { Polygon, Rect } from 'react-native-svg'

const { width: SCREEN_WIDTH } = Dimensions.get('window')

const moderateScale = (size: number, factor = 0.5) =>
    size + ((SCREEN_WIDTH - 375) / 375) * size * factor

const THUMB_HEIGHT = SCREEN_WIDTH * 0.68

const PlayIconSm = () => (
    <Svg
        width={moderateScale(20)}
        height={moderateScale(20)}
        viewBox="0 0 24 24"
    >
        <Polygon
            points="7,4 20,12 7,20"
            fill="#fff"
        />
    </Svg>
)

const PauseIconSm = () => (
    <Svg
        width={moderateScale(20)}
        height={moderateScale(20)}
        viewBox="0 0 24 24"
    >
        <Rect
            x="5"
            y="3"
            width="4"
            height="18"
            rx="1.5"
            fill="#fff"
        />
        <Rect
            x="15"
            y="3"
            width="4"
            height="18"
            rx="1.5"
            fill="#fff"
        />
    </Svg>
)

interface MudraPlayerHeroProps {
    image: any
    mediaUrl?: string | null
    type: 'audio' | 'video'
    isPlaying: boolean
    onTogglePlay: () => void
}

export default function PranayamaPlayerHero({
    image,
    mediaUrl,
    type,
    isPlaying,
    onTogglePlay,
}: MudraPlayerHeroProps) {
    const player = useVideoPlayer(
        type === 'video' && mediaUrl
            ? mediaUrl
            : null
    );

    return (
        <View style={styles.outer}>
            <View style={styles.wrapper}>
                {type === 'video' && mediaUrl ? (
                    <VideoView
                        style={styles.image}
                        player={player}
                        nativeControls
                        contentFit="cover"
                    />
                ) : (
                    <>
                        <Image
                            source={image}
                            style={styles.image}
                            resizeMode="cover"
                        />

                        <View
                            style={
                                styles.overlay
                            }
                        />
                    </>
                )}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    outer: {
        paddingHorizontal:
            moderateScale(16),
        marginBottom:
            moderateScale(18),
    },
    wrapper: {
        width: '100%',
        height: THUMB_HEIGHT,
        borderRadius:
            moderateScale(20),
        overflow: 'hidden',
        backgroundColor: '#E8E8E8',
        position: 'relative',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor:
            'rgba(0,0,0,0.18)',
    },
    playBtn: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: [
            {
                translateX:
                    -moderateScale(26),
            },
            {
                translateY:
                    -moderateScale(26),
            },
        ],
    },
    playCircle: {
        width: moderateScale(52),
        height: moderateScale(52),
        borderRadius:
            moderateScale(26),
        backgroundColor:
            'rgba(0,0,0,0.44)',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1.5,
        borderColor:
            'rgba(255,255,255,0.45)',
    },
})