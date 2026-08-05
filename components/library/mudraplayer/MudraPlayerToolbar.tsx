import React, { useState } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
} from 'react-native'

import SpeedIcon from '@/assets/icons/speedometer.svg'
import TimerIcon from '@/assets/icons/timer.svg'
import DownloadIcon from '@/assets/icons/download.svg'
import ShareIcon from '@/assets/icons/share.svg'
import PlaylistIcon from '@/assets/icons/playlist.svg'
import SpeedPickerModal from '@/components/common/SpeedPickerModal'
import SleepTimerModal from '@/components/common/SleepTimerModal'

const { width: SCREEN_WIDTH } =
    Dimensions.get('window')

const moderateScale = (
    size: number,
    factor = 0.5
) =>
    size +
    ((SCREEN_WIDTH - 375) / 375) *
    size *
    factor

const TOOLBAR_ICONS: Record<
    string,
    any
> = {
    speed: SpeedIcon,
    timer: TimerIcon,
    download: DownloadIcon,
    share: ShareIcon,
    playlist: PlaylistIcon,
}

interface ToolbarItemProps {
    label: string
    sub?: string
    iconKey: string
    onPress?: () => void
    showDivider?: boolean
    disabled?: boolean
}

const ToolbarItem = ({
    label,
    sub,
    iconKey,
    onPress,
    showDivider,
    disabled = false,
}: ToolbarItemProps) => {
    const IconComponent =
        TOOLBAR_ICONS[iconKey]

    return (
        <View style={styles.itemWrapper}>
            <TouchableOpacity
                style={[
                    styles.item,
                    disabled && styles.disabledItem,
                ]}
                onPress={onPress}
                activeOpacity={0.7}
                disabled={disabled}
            >
                <View style={styles.circle}>
                    {IconComponent && (
                        <IconComponent
                            width={moderateScale(
                                32
                            )}
                            height={moderateScale(
                                32
                            )}
                        />
                    )}
                </View>

                <View
                    style={styles.textArea}
                >
                    <Text
                        style={
                            styles.label
                        }
                    >
                        {label}
                    </Text>

                    <View
                        style={
                            styles.subWrapper
                        }
                    >
                        <Text
                            style={[
                                styles.sub,
                                !sub &&
                                styles.subEmpty,
                            ]}
                        >
                            {sub || ''}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>

            {showDivider && (
                <View
                    style={styles.divider}
                />
            )}
        </View>
    )
}

interface MudraPlayerToolbarProps {
    speed: number
    sleepTimer: string
    //onCycleSpeed: () => void
    // onSleepTimer?: () => void
    onCycleSpeed: (speed: number) => void;
    onSleepTimer: (minutes: number) => void;
    onDownload?: () => void
    onShare?: () => void
    onPlaylist?: () => void
    playlistEnabled?: boolean
    downloaded?: boolean;
    downloading?: boolean;
}

export default function MudraPlayerToolbar({
    speed,
    sleepTimer,
    onCycleSpeed,
    onSleepTimer,
    onDownload,
    onShare,
    onPlaylist,
    playlistEnabled = true,
    downloaded,
    downloading
}: MudraPlayerToolbarProps) {
    const [speedVisible, setSpeedVisible] = useState(false)
    const [sleepVisible, setSleepVisible] = useState(false)
    return (
        <>
            <View style={styles.toolbar}>
                <ToolbarItem
                    label="Speed"
                    sub={`${speed}x`}
                    iconKey="speed"
                    // onPress={
                    //     onCycleSpeed
                    // }
                    onPress={() => setSpeedVisible(true)}
                    showDivider
                />

                <ToolbarItem
                    label="Sleep Timer"
                    sub={sleepTimer}
                    iconKey="timer"
                    // onPress={onSleepTimer}
                    onPress={() => setSleepVisible(true)}
                    showDivider
                />

                <ToolbarItem
                    label={
                        downloaded
                            ? "Downloaded"
                            : downloading
                                ? "Downloading"
                                : "Download"
                    }
                    iconKey="download"
                    onPress={onDownload}
                />

                <ToolbarItem
                    label="Share"
                    iconKey="share"
                    onPress={onShare}
                    showDivider
                />

                <ToolbarItem
                    label="Playlist"
                    iconKey="playlist"
                    onPress={
                        onPlaylist
                    }
                    disabled={
                        !playlistEnabled
                    }
                />
            </View>
            <SpeedPickerModal
                visible={speedVisible}
                currentSpeed={speed}
                onSelect={(s) => {
                    onCycleSpeed(s)
                    setSpeedVisible(false)
                }}
                onClose={() => setSpeedVisible(false)}
            />

            <SleepTimerModal
                visible={sleepVisible}
                currentTimer={typeof sleepTimer === 'string' ? parseInt(sleepTimer) : sleepTimer}
                onSelect={(minutes) => {
                    onSleepTimer(minutes)
                    setSleepVisible(false)
                }}
                onClose={() => setSleepVisible(false)}
            />
        </>
    )
}

const styles = StyleSheet.create({
    toolbar: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal:
            moderateScale(14),
        marginBottom:
            moderateScale(14),
        paddingVertical:
            moderateScale(18),
        paddingHorizontal:
            moderateScale(6),
        backgroundColor:
            '#D6EAFB',
        borderRadius:
            moderateScale(20),
    },

    itemWrapper: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },

    item: {
        flex: 1,
        alignItems: 'center',
        gap: moderateScale(6),
    },

    circle: {
        width: moderateScale(48),
        height: moderateScale(48),
        borderRadius:
            moderateScale(24),
        backgroundColor:
            '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.06,
        shadowRadius: 4,
        elevation: 2,
    },

    textArea: {
        alignItems: 'center',
        minHeight:
            moderateScale(28),
        justifyContent: 'center',
    },

    label: {
        fontFamily:
            'SF-Pro-Display',
        fontSize:
            moderateScale(11.5),
        fontWeight: '500',
        color: '#222',
        textAlign: 'center',
    },

    subWrapper: {
        height:
            moderateScale(14),
        justifyContent:
            'center',
    },

    sub: {
        fontFamily:
            'SF-Pro-Display',
        fontSize:
            moderateScale(10),
        color: '#888',
        textAlign: 'center',
        lineHeight:
            moderateScale(14),
    },

    subEmpty: {
        opacity: 0,
    },

    divider: {
        width: 1,
        height:
            moderateScale(68),
        backgroundColor:
            'rgba(180,210,240,0.75)',
    },
    disabledItem: {
        opacity: 0.35,
    },
})