import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getMudraOfTheDayStyles } from '@/assets/styles/mudraoftheday/mudraOfTheDayStyles'
import { useTheme } from '@/constants/ThemeContext'

interface Props {
    benefit: string;
}

export default function TodaysBenefit({ benefit }: Props) {
    const { colors } = useTheme()
    const styles = getMudraOfTheDayStyles(colors)

    return (
        <View style={styles.benefitContainer}>
            <View style={styles.benefitHeading}>
                <View style={styles.benefitIconCircle}>
                    <Ionicons name="star-outline" size={16} color={colors.text} />
                </View>
                <Text style={styles.benefitHeadingText}>Today's Benefit</Text>
            </View>
            <View style={styles.benefitBox}>
                <Text style={styles.benefitText}>{benefit}</Text>
            </View>
        </View>
    );
}