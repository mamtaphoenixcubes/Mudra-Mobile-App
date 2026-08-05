import React from 'react'
import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import { useRouter } from 'expo-router'
// import { practiceStyles as styles } from '@/assets/styles/practice/practiceStyles'
import { getPracticeStyles } from '@/assets/styles/practice/practiceStyles'
import { useTheme } from '@/constants/ThemeContext'
import PracticeSectionHeader from './PracticeSectionHeader'
import EarthSvg from '@/assets/icons/earth.svg'
import WaterSvg from '@/assets/icons/water.svg'
import FireSvg from '@/assets/icons/Fire.svg'
import AirSvg from '@/assets/icons/air.svg'
import SpaceSvg from '@/assets/icons/space.svg'

const ELEMENTS = [
    { id: '1', name: 'Earth', Icon: EarthSvg, desc: 'Grounding', color: '#E9FFDB', dot: '#6DBE6D', progress: 0.75 },
    { id: '2', name: 'Water', Icon: WaterSvg, desc: 'Flow', color: '#CBECFF', dot: '#4BA3D4', progress: 0.5 },
    { id: '3', name: 'Fire', Icon: FireSvg, desc: 'Energy', color: '#FFE5CC', dot: '#F08030', progress: 0.6 },
    { id: '4', name: 'Air', Icon: AirSvg, desc: 'Breath', color: '#F3E8FF', dot: '#9A85FE', progress: 0.4 },
    { id: '5', name: 'Space', Icon: SpaceSvg, desc: 'Clarity', color: '#FFF6BF', dot: '#D4A017', progress: 0.85 },
]

export default function PracticeElementSection() {
    const router = useRouter()
    const { colors } = useTheme()
    const styles = getPracticeStyles(colors)

    return (
        <View style={styles.section}>
            <PracticeSectionHeader
                title="Element Tracker"
                onViewAll={() => router.push('/elementtracker')}
            />
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.elementScrollContent}
            >
                {ELEMENTS.map((item) => (
                    <TouchableOpacity
                        key={item.id}
                        style={[styles.elementCard, { backgroundColor: item.color }]}
                        activeOpacity={0.85}
                        onPress={() => router.push('/elementtracker')}
                    >
                        <View style={[styles.elementIconCircle, { backgroundColor: item.dot + '28' }]}>
                            <item.Icon width={28} height={28} />
                        </View>
                        <Text style={styles.elementName}>{item.name}</Text>
                        <Text style={styles.elementDesc}>{item.desc}</Text>
                        <View style={styles.elementProgressTrack}>
                            <View
                                style={[
                                    styles.elementProgressFill,
                                    { width: `${item.progress * 100}%` as any, backgroundColor: item.dot },
                                ]}
                            />
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            <TouchableOpacity
                style={styles.openTrackerBtn}
                activeOpacity={0.8}
                onPress={() => router.push('/elementtracker')}
            >
                <Text style={styles.openTrackerBtnText}>Open Full Tracker →</Text>
            </TouchableOpacity>
        </View>
    )
}