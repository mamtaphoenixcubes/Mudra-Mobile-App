import React, { useRef } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Animated,
    Dimensions,
} from 'react-native'
import Svg, { Polygon, Rect } from 'react-native-svg';
import { useTheme } from '@/constants/ThemeContext'

const { width: SCREEN_WIDTH } = Dimensions.get('window')

const moderateScale = (size: number, factor = 0.5) =>
    size + ((SCREEN_WIDTH - 375) / 375) * size * factor

// ---------- AUDIO ICON ----------
const MusicNote = () => (
    <View style={styles.iconContainer}>
        <Text style={styles.noteText}>♪</Text>
    </View>
)

// ---------- VIDEO ICON ----------
const VideoIcon = () => (
    <View style={styles.iconContainer}>
        <Svg
            width={moderateScale(22)}
            height={moderateScale(22)}
            viewBox="0 0 24 24"
        >
            <Rect
                x="3"
                y="6"
                width="13"
                height="12"
                rx="2"
                fill={PURPLE}
            />
            <Polygon
                points="17,9 22,6 22,18 17,15"
                fill={PURPLE}
            />
        </Svg>
    </View>
)

const MoreIcon = () => (
    <View style={styles.moreBtn}>
        {[0, 1, 2].map(i => (
            <View
                key={i}
                style={styles.moreDot}
            />
        ))}
    </View>
)

interface QueueMudra {
    id: string | number
    title: string
    duration: string
    playlistIndex: number
    isVideo?: boolean
}

interface QueueItemProps {
    item: QueueMudra
    isLast: boolean
    onPress?: () => void
}

const QueueItem = ({
    item,
    isLast,
    onPress,
}: QueueItemProps) => {
    const { colors } = useTheme()
    const scaleAnim = useRef(
        new Animated.Value(1)
    ).current

    const handlePressIn = () =>
        Animated.spring(scaleAnim, {
            toValue: 0.97,
            useNativeDriver: true,
        }).start()

    const handlePressOut = () =>
        Animated.spring(scaleAnim, {
            toValue: 1,
            useNativeDriver: true,
        }).start()

    return (
        <Animated.View
            style={{
                transform: [
                    { scale: scaleAnim },
                ],
            }}
        >
            <TouchableOpacity
                activeOpacity={1}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                onPress={onPress}
                style={[
                    styles.queueItem,
                    !isLast &&
                    styles.queueItemBorder,
                    !isLast && { borderBottomColor: colors.dividerDark }
                ]}
            >
                {item.isVideo ? (
                    <VideoIcon />
                ) : (
                    <MusicNote />
                )}

                <View
                    style={styles.queueMeta}
                >
                    <Text
                        style={[styles.queueTitle, { color: colors.text }]}
                        numberOfLines={1}
                    >
                        {item.title}
                    </Text>

                    <View
                        style={
                            styles.queueSubRow
                        }
                    >
                        <Text
                            style={[styles.queueSub, { color: colors.textSub }]}
                        >
                            {item.duration}
                        </Text>

                        <View
                            style={
                                styles.dotSep
                            }
                        />

                        <Text
                            style={
                                styles.queueSub
                            }
                        >
                            {item.isVideo
                                ? 'Video'
                                : 'Audio'}
                        </Text>
                    </View>
                </View>

                <MoreIcon />
            </TouchableOpacity>
        </Animated.View>
    )
}

interface MudraPlayerUpNextProps {
    queue: QueueMudra[]
    onViewPlaylist?: () => void
    onItemPress?: (
        item: QueueMudra
    ) => void
}

export default function NidraPlayerUpNext({
    queue,
    onViewPlaylist,
    onItemPress,
}: MudraPlayerUpNextProps) {
    const { colors } = useTheme()
    console.log(queue, "queuequeue");

    return (
        <View>
            <View
                style={styles.cardHeader}
            >
                <Text
                    style={[styles.cardTitle, { color: colors.text }]}
                >
                    Up Next
                </Text>
                {onViewPlaylist && (
                    <TouchableOpacity onPress={onViewPlaylist}>
                        <Text style={[styles.viewPlaylistText, { color: colors.textSub }]}>
                            View Playlist  {'>'}
                        </Text>
                    </TouchableOpacity>
                )}
            </View>

            <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.dashedLine }]}>
                <View
                    style={
                        styles.queueContainer
                    }
                >
                    {queue.map(
                        (item, idx) => (
                            <QueueItem
                                key={item.id}
                                item={item}
                                isLast={
                                    idx ===
                                    queue.length -
                                    1
                                }
                                onPress={() =>
                                    onItemPress?.(
                                        item
                                    )
                                }
                            />
                        )
                    )}
                </View>
            </View>
        </View>
    )
}

const LAVENDER = '#EDE9F6'
const PURPLE = '#9A85FE'
const TEXT_PRIMARY = '#1A1A2E'
const TEXT_SEC = '#888'

const styles = StyleSheet.create({
    cardHeader: {
        flexDirection: 'row',
        justifyContent:
            'space-between',
        alignItems: 'center',
        paddingHorizontal:
            moderateScale(20),
        paddingTop:
            moderateScale(20),
        paddingBottom:
            moderateScale(12),
    },
    cardTitle: {
        fontFamily:
            'SF-Pro-Display',
        fontSize:
            moderateScale(18),
        fontWeight: '600',
        color: TEXT_PRIMARY,
        letterSpacing: -0.3,
    },
    viewPlaylistText: {
        fontFamily: 'SF-Pro-Display',
        fontSize: moderateScale(13),
        fontWeight: '400',
    },
    card: {
        backgroundColor: '#FFF',
        borderRadius:
            moderateScale(20),
        marginHorizontal:
            moderateScale(16),
        overflow: 'hidden',
        borderWidth: 0.38,
        shadowColor: '#000',
        shadowOpacity: 0.06,
        shadowRadius: 12,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        elevation: 3,
    },
    queueContainer: {
        paddingBottom:
            moderateScale(8),
    },
    queueItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal:
            moderateScale(20),
        paddingVertical:
            moderateScale(14),
        gap: moderateScale(14),
    },
    queueItemBorder: {
        borderBottomWidth:
            StyleSheet.hairlineWidth,
        borderBottomColor:
            '#272727',
    },
    iconContainer: {
        width: moderateScale(48),
        height: moderateScale(48),
        borderRadius:
            moderateScale(12),
        backgroundColor:
            LAVENDER,
        justifyContent:
            'center',
        alignItems: 'center',
    },
    noteText: {
        fontSize:
            moderateScale(22),
        color: PURPLE,
    },
    queueMeta: {
        flex: 1,
        gap: moderateScale(3),
    },
    queueTitle: {
        fontFamily:
            'SF-Pro-Display',
        fontSize:
            moderateScale(15),
        fontWeight: '600',
        color: TEXT_PRIMARY,
        letterSpacing: -0.2,
    },
    queueSubRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: moderateScale(6),
    },
    queueSub: {
        fontFamily:
            'SF-Pro-Display',
        fontSize:
            moderateScale(13),
        color: TEXT_SEC,
    },
    dotSep: {
        width: 3,
        height: 3,
        borderRadius: 2,
        backgroundColor: TEXT_SEC,
    },
    moreBtn: {
        padding: moderateScale(6),
        gap: moderateScale(3),
        alignItems: 'center',
    },
    moreDot: {
        width: 3.5,
        height: 3.5,
        borderRadius: 2,
        backgroundColor:
            '#BBBBBB',
    },
})