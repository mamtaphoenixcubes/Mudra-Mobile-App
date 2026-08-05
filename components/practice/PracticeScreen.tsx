import React from 'react'
import { View, Text, ScrollView } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import StandaloneTabBar from '@/components/home/StandaloneTabBar'
import PracticeMudrasSection from './PracticeMudrasSection'
import PracticeElementSection from './PracticeElementSection'
import PracticeNidraSection from './PracticeNidraSection'
import { getPracticeStyles } from '@/assets/styles/practice/practiceStyles'
import { useTheme } from '@/constants/ThemeContext'

export default function PracticeScreen() {
    const insets = useSafeAreaInsets()
    const { colors } = useTheme()
    const styles = getPracticeStyles(colors)

    return (
        <View style={styles.container}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={[
                    styles.scrollContent,
                    { paddingBottom: insets.bottom + 80 },
                ]}
            >
                <Text style={styles.pageTitle}>Practice</Text>
                <Text style={styles.subtitle}>
                    Explore mudras, balance your elements{'\n'}and restore with yoga nidra.
                </Text>

                <PracticeMudrasSection />
                <View style={styles.divider} />

                <PracticeNidraSection />

                <PracticeElementSection />
                <View style={styles.divider} />


            </ScrollView>
            <StandaloneTabBar />
        </View>
    )
}