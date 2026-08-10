import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { getProgressInsightsStyles } from '@/assets/styles/progressinsights/progressInsightsStyles'
import { useTheme } from '@/constants/ThemeContext'
import GreatSvg from '@/assets/icons/Great.svg';
import { useGoalStore, getGoalProgress } from '@/store/goalStore';
import { useStreakStore } from '@/store/streakStore';
import SetGoalModal from '@/components/common/SetGoalModal';

export default function GoalBanner() {
    const { colors } = useTheme()
    const styles = getProgressInsightsStyles(colors)

    const [modalVisible, setModalVisible] = useState(false);
    const goalType = useGoalStore((s) => s.goalType);
    const targetValue = useGoalStore((s) => s.targetValue);
    const events = useStreakStore((s) => s.events);
    const progress = getGoalProgress(goalType, targetValue, events);

    const message = progress
        ? `You've done ${progress.current} of ${progress.target} ${goalType === 'sessions' ? 'sessions' : 'minutes'} this week!`
        : "Great progress! You're building a beautiful habit of self-care.";

    return (
        <View style={styles.goalContainer}>
            <View style={styles.goalCard}>
                <View style={styles.goalIconCircle}>
                    <GreatSvg width={26} height={26} />
                </View>
                <View style={styles.goalTextBlock}>
                    <Text style={styles.goalText}>
                        {message}
                    </Text>
                </View>
                <TouchableOpacity style={styles.goalBtn} activeOpacity={0.8} onPress={() => setModalVisible(true)}>
                    <Text style={styles.goalBtnText}>{progress ? 'View Goal' : 'Set New Goal'}</Text>
                </TouchableOpacity>
            </View>

            <SetGoalModal visible={modalVisible} onClose={() => setModalVisible(false)} />
        </View>
    );
}