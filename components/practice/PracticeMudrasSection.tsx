import React from 'react'
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import { useRouter } from 'expo-router'
// import { practiceStyles as styles } from '@/assets/styles/practice/practiceStyles'
import { getPracticeStyles } from '@/assets/styles/practice/practiceStyles'
import { useTheme } from '@/constants/ThemeContext'
import PracticeSectionHeader from './PracticeSectionHeader'
import ClockSvg from '@/assets/icons/clock.svg'

const MUDRAS = [
    { id: '1', name: 'Gyan Mudra', desc: 'Focus & Clarity', duration: '15 min', image: require('@/assets/images/Pranayama_Images/GyanMudra.png'), bg: '#FFF6BF' },
    { id: '2', name: 'Anjali Mudra', desc: 'Gratitude & Peace', duration: '5 min', image: require('@/assets/images/Pranayama_Images/AnjaliMudraSaved.png'), bg: '#CBECFF' },
    { id: '3', name: 'Prithvi Mudra', desc: 'Stability & Ground', duration: '12 min', image: require('@/assets/images/Pranayama_Images/PrithviMudra.png'), bg: '#E9FFDB' },
    { id: '4', name: 'Surya Mudra', desc: 'Energy & Metabolism', duration: '10 min', image: require('@/assets/images/Pranayama_Images/SuryaMudra.png'), bg: '#FFDBE7' },
    { id: '5', name: 'Prana Mudra', desc: 'Vitality & Immunity', duration: '8 min', image: require('@/assets/images/Pranayama_Images/GyanMudra.png'), bg: '#F3E8FF' },
]

export default function PracticeMudrasSection() {
    const router = useRouter()
    const { colors } = useTheme()
    const styles = getPracticeStyles(colors)

    return (
        <View style={styles.section}>
            <PracticeSectionHeader
                title="Mudras"
                onViewAll={() => router.push('/(tabs)/library')}
            />
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.mudraScrollContent}
            >
                {MUDRAS.map((item) => (
                    <TouchableOpacity
                        key={item.id}
                        style={[styles.mudraCard, { backgroundColor: item.bg }]}
                        activeOpacity={0.85}
                        onPress={() => router.push('/(tabs)/library')}
                    >
                        <View style={styles.mudraImageWrapper}>
                            <Image source={item.image} style={styles.mudraImage} resizeMode="cover" />
                        </View>
                        <Text style={styles.mudraName}>{item.name}</Text>
                        <Text style={styles.mudraDesc}>{item.desc}</Text>
                        <View style={styles.mudraTimeRow}>
                            <ClockSvg width={11} height={11} />
                            <Text style={styles.mudraTime}>{item.duration}</Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    )
}