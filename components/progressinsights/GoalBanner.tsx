import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { getProgressInsightsStyles } from '@/assets/styles/progressinsights/progressInsightsStyles'
import { useTheme } from '@/constants/ThemeContext'
import GreatSvg from '@/assets/icons/Great.svg';
// import { useGoalStore, getGoalProgress } from '@/store/goalStore';
// import { useStreakStore } from '@/store/streakStore';
import SetGoalModal from '@/components/common/SetGoalModal';

export default function GoalBanner({ goal }: { goal: any | null }) {
    const { colors } = useTheme()
    const styles = getProgressInsightsStyles(colors)

    const [modalVisible, setModalVisible] = useState(false);
    const hasActiveGoal = goal?.GoalStatus === 'ACTIVE';
    const current = goal?.CurrentProgress ?? 0;
    const target = goal?.GoalValue ?? 0;
    const unitLabel = goal?.GoalType === 'SESSION_COUNT' ? 'sessions' : 'minutes';

    const message = hasActiveGoal
        ? `You've done ${current} of ${target} ${unitLabel} this week!`
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
                    <Text style={styles.goalBtnText}>{hasActiveGoal ? 'View Goal' : 'Set New Goal'}</Text>
                </TouchableOpacity>
            </View>

            <SetGoalModal visible={modalVisible} onClose={() => setModalVisible(false)} />
        </View>
    );
}