import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import Svg, { Path, Circle, Rect } from 'react-native-svg'
import { useTheme } from '@/constants/ThemeContext'

const { width: SCREEN_WIDTH } = Dimensions.get('window')

const moderateScale = (size: number, factor = 0.5) =>
    size + ((SCREEN_WIDTH - 375) / 375) * size * factor

const HeartIcon = ({ filled }: { filled: boolean }) => (
    <Svg width={moderateScale(24)} height={moderateScale(24)} viewBox="0 0 24 24">
        <Path
            d="M12 21C12 21 3 14.5 3 8.5C3 5.42 5.42 3 8.5 3C10.24 3 11.81 3.89 12 5C12.19 3.89 13.76 3 15.5 3C18.58 3 21 5.42 21 8.5C21 14.5 12 21 12 21Z"
            fill={filled ? '#E05252' : 'none'}
            stroke={filled ? '#E05252' : '#AAAAAA'}
            strokeWidth="1.8"
            strokeLinejoin="round"
        />
    </Svg>
)

const ClockIcon = () => (
    <Svg width={moderateScale(13)} height={moderateScale(13)} viewBox="0 0 24 24">
        <Circle cx="12" cy="12" r="9" fill="none" stroke="#999" strokeWidth="1.8" />
        <Path d="M12 7v5l3 3" stroke="#999" strokeWidth="1.8" strokeLinecap="round" />
    </Svg>
)

const HeadphonesIcon = () => (
    <Svg width={moderateScale(13)} height={moderateScale(13)} viewBox="0 0 24 24">
        <Path d="M3 18v-6a9 9 0 0 1 18 0v6" fill="none" stroke="#999" strokeWidth="1.8" strokeLinecap="round" />
        <Path d="M3 18a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3v5zm16 0a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3v5z" fill="none" stroke="#999" strokeWidth="1.8" />
    </Svg>
)

const BarChartIcon = () => (
    <Svg width={moderateScale(13)} height={moderateScale(13)} viewBox="0 0 24 24">
        <Rect x="3" y="12" width="4" height="9" rx="1" fill="#999" />
        <Rect x="10" y="7" width="4" height="14" rx="1" fill="#999" />
        <Rect x="17" y="3" width="4" height="18" rx="1" fill="#999" />
    </Svg>
)

const PlaylistIcon = () => (
    <Svg width={moderateScale(20)} height={moderateScale(20)} viewBox="0 0 24 24">
        <Path d="M4 6h12" stroke="#666" strokeWidth="1.8" strokeLinecap="round" />
        <Path d="M4 12h8" stroke="#666" strokeWidth="1.8" strokeLinecap="round" />
        <Path d="M4 18h6" stroke="#666" strokeWidth="1.8" strokeLinecap="round" />
        <Path d="M16 15v-4" stroke="#666" strokeWidth="1.8" strokeLinecap="round" />
        <Path d="M14 13l4-2l-4-2" stroke="#666" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
)

interface MudraPlayerInfoProps {
    title: string
    description: string
    duration: string
    type: string
    level: string
    mediaType?: string
    isLiked: boolean
    onToggleLike: () => void
    onPlaylist?: () => void
    playlistEnabled?: boolean
}

export default function NidraPlayerInfo({
    title,
    description,
    duration,
    type,
    level,
    mediaType,
    isLiked,
    onToggleLike,
    onPlaylist,
    playlistEnabled = true,
}: MudraPlayerInfoProps) {
    const { colors } = useTheme()
    return (
        <View>
            <View style={styles.infoRow}>
                <View style={styles.infoLeft}>
                    <Text style={[styles.title, { color: colors.text }]} numberOfLines={2}>
                        {title}
                    </Text>
                    <Text style={[styles.subtitle, { color: colors.textSub }]} numberOfLines={2}>
                        {description}
                    </Text>
                </View>
                <View style={styles.actionsRow}>
                    {(mediaType === 'VIDEO_SINGLE' ||
                        mediaType === 'VIDEO_PLAYLIST') && (
                        <TouchableOpacity
                            onPress={onPlaylist}
                            activeOpacity={0.7}
                            style={[styles.iconBtn, !playlistEnabled && styles.disabledBtn]}
                            disabled={!playlistEnabled}
                        >
                            <PlaylistIcon />
                        </TouchableOpacity>
                    )}

                    <TouchableOpacity
                        onPress={onToggleLike}
                        activeOpacity={0.7}
                        style={styles.heartBtn}
                    >
                        <HeartIcon filled={isLiked} />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.metaRow}>
                <View style={styles.metaItem}>
                    <ClockIcon />
                    <Text style={[styles.metaText, { color: colors.textSub }]}>{duration}</Text>
                </View>
                <View style={styles.metaDivider} />
                <View style={styles.metaItem}>
                    <HeadphonesIcon />
                    <Text style={[styles.metaText, { color: colors.textSub }]}>{type}</Text>
                </View>
                <View style={styles.metaDivider} />
                <View style={styles.metaItem}>
                    <BarChartIcon />
                    <Text style={[styles.metaText, { color: colors.textSub }]}>{level}</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    infoRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        paddingHorizontal: moderateScale(16),
        marginBottom: moderateScale(8),
        gap: moderateScale(12),
    },
    infoLeft: {
        flex: 1,
    },
    actionsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: moderateScale(8),
    },
    iconBtn: {
        paddingTop: moderateScale(2),
        paddingLeft: moderateScale(4),
    },
    heartBtn: {
        paddingTop: moderateScale(2),
        paddingLeft: moderateScale(4),
    },
    disabledBtn: {
        opacity: 0.35,
    },
    title: {
        fontFamily: 'SF-Pro-Display',
        fontSize: moderateScale(21),
        fontWeight: '700',
        color: '#0F0F0F',
        lineHeight: moderateScale(27),
        marginBottom: moderateScale(4),
    },
    subtitle: {
        fontFamily: 'SF-Pro-Display',
        fontSize: moderateScale(13),
        color: '#888888',
        lineHeight: moderateScale(18),
    },
    metaRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: moderateScale(16),
        marginBottom: moderateScale(14),
        gap: moderateScale(8),
    },
    metaItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: moderateScale(5),
    },
    metaText: {
        fontFamily: 'SF-Pro-Display',
        fontSize: moderateScale(12),
        color: '#999999',
        fontWeight: '400',
    },
    metaDivider: {
        width: 1,
        height: moderateScale(12),
        backgroundColor: '#DDDDDD',
    },
})