import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
// import { recentActivityStyles as styles } from '@/assets/styles/recentactivity/recentActivityStyles';
import { getRecentActivityStyles } from '@/assets/styles/recentactivity/recentActivityStyles'
import { useTheme } from '@/constants/ThemeContext'
import CalenderRight from '@/assets/icons/CalenderRight.svg';

export default function MotivationBanner() {
    const { colors } = useTheme()
    const styles = getRecentActivityStyles(colors)
    return (
        <View style={styles.motivationContainer}>
            <View style={styles.motivationCard}>
                <View style={styles.motivationIconCircle}>
                    <CalenderRight width={26} height={26} />
                </View>
                <View style={styles.motivationTextBlock}>
                    <Text style={styles.motivationTitle}>Keep practicing consistently!</Text>
                    <Text style={styles.motivationSubtitle}>
                        Regular practice brings lasting transformation.
                    </Text>
                </View>
                <TouchableOpacity style={styles.motivationBtn} activeOpacity={0.8}>
                    <Text style={styles.motivationBtnText}>View Progress</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}