import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
// import { practiceStyles as styles } from '@/assets/styles/practice/practiceStyles'
import { getPracticeStyles } from '@/assets/styles/practice/practiceStyles'
import { useTheme } from '@/constants/ThemeContext'

interface Props {
    title: string
    onViewAll?: () => void
}

export default function PracticeSectionHeader({ title, onViewAll }: Props) {
    const { colors } = useTheme()
    const styles = getPracticeStyles(colors)
    return (
        <View style={styles.sectionHeaderRow}>
            <View style={styles.sectionTitleWrap}>
                <View style={styles.sectionAccentBar} />
                <Text style={styles.sectionTitle}>{title}</Text>
            </View>
            {onViewAll && (
                <TouchableOpacity onPress={onViewAll} activeOpacity={0.7}>
                    <Text style={styles.sectionLink}>View All &gt;</Text>
                </TouchableOpacity>
            )}
        </View>
    )
}