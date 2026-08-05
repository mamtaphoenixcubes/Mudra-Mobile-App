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

export default function PracticeNidraSection() {
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
                {NIDRA_SESSIONS.map((item) => (
                    <TouchableOpacity
                        key={item.id}
                        style={styles.nidraCard}
                        activeOpacity={0.85}
                        onPress={() => router.push('/(tabs)/nidra')}
                    >
                        <View style={styles.nidraImageWrapper}>
                            <Image source={item.image} style={styles.nidraImage} resizeMode="cover" />
                            {/* <View style={styles.nidraOverlay} /> */}
                        </View>
                        <View style={styles.nidraCardBody}>
                            <View style={styles.nidraTitleRow}>
                                <Text style={styles.nidraTitle} numberOfLines={2}>
                                    {item.title}
                                </Text>
                                <View style={styles.nidraPlayBtn}>
                                    <PlayIcon />
                                </View>
                            </View>
                            <View style={styles.nidraMetaRow}>
                                <Text style={styles.nidraMeta}>{item.duration}</Text>
                                <View style={styles.nidraMetaDot} />
                                <Text style={styles.nidraMeta}>{item.category}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    )
}