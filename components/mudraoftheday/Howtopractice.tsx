import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import PlayBlack from '@/assets/icons/playblack.svg';
import { getMudraOfTheDayStyles } from '@/assets/styles/mudraoftheday/mudraOfTheDayStyles'
import { useTheme } from '@/constants/ThemeContext'
import PlayBlackWhite from '@/assets/icons/playblackWhite.svg'

interface Props {
    instructions: string;
    onViewGuide?: () => void;
}

function StarIcon({ color }: { color: string }) {
    return (
        <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
            <Path
                d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                stroke={color}
                strokeWidth={1.8}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    );
}

export default function HowToPractice({ instructions, onViewGuide }: Props) {
    const { colors, isDark } = useTheme()
    const styles = getMudraOfTheDayStyles(colors)

    return (
        <View style={styles.practiceContainer}>
            <View style={styles.practiceHeading}>
                <View style={styles.practiceIconCircle}>
                    <StarIcon color={colors.text} />
                </View>
                <Text style={styles.practiceHeadingText}>How to Practice</Text>
            </View>

            <Text style={styles.practiceInstructions}>{instructions}</Text>

            <TouchableOpacity style={styles.practiceGuideBtn} onPress={onViewGuide} activeOpacity={0.75}>
                {isDark ? <PlayBlackWhite width={18} height={18} /> : <PlayBlack width={18} height={18} />}
                <Text style={styles.practiceGuideBtnText}>View How-to Guide</Text>
            </TouchableOpacity>
        </View>
    );
}