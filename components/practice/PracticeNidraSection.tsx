import React from 'react'
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import { useRouter } from 'expo-router'
import Svg, { Polygon } from 'react-native-svg'
import { Dimensions } from 'react-native'
// import { practiceStyles as styles } from '@/assets/styles/practice/practiceStyles'
import { getPracticeStyles } from '@/assets/styles/practice/practiceStyles'
import { useTheme } from '@/constants/ThemeContext'
import PracticeSectionHeader from './PracticeSectionHeader'

const { width: SCREEN_WIDTH } = Dimensions.get('window')
const moderateScale = (size: number, factor = 0.5) =>
    size + ((SCREEN_WIDTH - 375) / 375) * size * factor

const PlayIcon = () => (
    <Svg width={moderateScale(12)} height={moderateScale(12)} viewBox="0 0 24 24">
        <Polygon points="6,4 20,12 6,20" fill="#fff" />
    </Svg>
)

const NIDRA_SESSIONS = [
    { id: '1', title: 'Deep Sleep Yoga Nidra', duration: '30 min', category: 'Yoga Nidra', image: require('@/assets/images/tabIcons/DeepSleepYogaNidra.png') },
    { id: '2', title: 'Anxiety Release Yoga Nidra', duration: '25 min', category: 'Yoga Nidra', image: require('@/assets/images/tabIcons/AnxietyReleaseYogaNidra.png') },
    { id: '3', title: 'Emotional Healing Yoga Nidra', duration: '35 min', category: 'Yoga Nidra', image: require('@/assets/images/tabIcons/EmotionalHealingYogaNidra.png') },
    { id: '4', title: 'Morning Reset Yoga Nidra', duration: '20 min', category: 'Yoga Nidra', image: require('@/assets/images/tabIcons/DeepSleepYogaNidra.png') },
]

export default function PracticeNidraSection({
    nidras = [],
    onNidraPress,
}: {
    nidras?: any[]
    onNidraPress: (item: any) => void
}) {
    const router = useRouter()
    const { colors } = useTheme()
    const styles = getPracticeStyles(colors)

    return (
        <View style={styles.section}>
            <PracticeSectionHeader
                title="Yoga Nidra"
                onViewAll={() => router.push('/(tabs)/nidra')}
            />
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.nidraScrollContent}
            >
                {nidras.map((item) => {
                    const thumbnailUrl = item.NidraIntroCard?.ThumbnailImage?.[0]?.url
                    const categoryName = item.NidraIntroCard?.Category?.Name
                    const shortDescription = item.NidraIntroCard?.ShortDescription

                    return (
                        <TouchableOpacity
                            key={item.documentId}
                            style={styles.nidraCard}
                            activeOpacity={0.85}
                            onPress={() => onNidraPress?.(item)}
                        >
                            <View style={styles.nidraImageWrapper}>
                                <Image
                                    source={
                                        thumbnailUrl
                                            ? {
                                                uri: thumbnailUrl.startsWith('http')
                                                    ? thumbnailUrl
                                                    : `${process.env.EXPO_PUBLIC_IMAGE_API_URL}${thumbnailUrl}`
                                            }
                                            : require('@/assets/images/tabIcons/DeepSleepYogaNidra.png')
                                    }
                                    style={styles.nidraImage}
                                    resizeMode="cover"
                                />
                            </View>
                            <View style={styles.nidraCardBody}>
                                <View style={styles.nidraTitleRow}>
                                    <Text style={styles.nidraTitle} numberOfLines={2}>
                                        {item.Name}
                                    </Text>
                                    <View style={styles.nidraPlayBtn}>
                                        <PlayIcon />
                                    </View>
                                </View>
                                <Text style={styles.nidraDesc} numberOfLines={2} ellipsizeMode="tail">
                                    {shortDescription}
                                </Text>
                                <View style={styles.nidraMetaRow}>
                                    <Text style={styles.nidraMeta}>{item.Duration} min</Text>
                                    <View style={styles.nidraMetaDot} />
                                    <Text style={styles.nidraMeta}>{categoryName ?? item.Elements}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    )
                })}
            </ScrollView>
        </View>
    )
}