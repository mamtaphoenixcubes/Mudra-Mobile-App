import React from 'react';
import { View, Text } from 'react-native';
import { getAsanaDetailStyles } from '@/assets/styles/asana/asanaDetailStyles';
import { useTheme } from '@/constants/ThemeContext';
import DailyUpdateSvg from '@/assets/icons/DailyUpdate.svg';
import DailyUpdateWhite from '@/assets/icons/DailyUpdateWhite.svg';

const BENEFITS = [
    'Improves flexibility and posture',
    'Strengthens muscles and joints',
    'Boosts metabolism and energy',
    'Reduces stress and anxiety',
    'Enhances cardiovascular health',
];

export default function AsanaDetailBenefits() {
    const { colors, isDark } = useTheme();
    const styles = getAsanaDetailStyles(colors);

    return (
        <View style={{ paddingHorizontal: 0 }}>
            <Text style={styles.sectionTitle}>Benefits</Text>
            <View style={styles.benefitsContainer}>
                {BENEFITS.map((b, i) => (
                    <View key={i} style={styles.benefitRow}>
                        {isDark ? <DailyUpdateWhite width={18} height={18} /> : <DailyUpdateSvg width={18} height={18} />}
                        <Text style={styles.benefitText}>{b}</Text>
                    </View>
                ))}
            </View>
        </View>
    );
}