import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getProgressInsightsStyles } from '@/assets/styles/progressinsights/progressInsightsStyles'
import { useTheme } from '@/constants/ThemeContext'
import FireSvg from '@/assets/icons/Fire.svg';
import { useStreakStore, getCurrentStreak, getWeekCompletionMap } from '@/store/streakStore';
import { router } from 'expo-router';

const DAY_LABELS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

interface ConsistencySectionProps {
    overview?: {
        currentStreak: number;
        calendar?: {
            calendar: {
                date: string;
                completed: boolean;
                sessions: any[];
            }[];
        };
    };
}

export default function ConsistencySection({
    overview,
}: ConsistencySectionProps) {
    const { colors } = useTheme()
    const styles = getProgressInsightsStyles(colors)

 

    const calendar = overview?.calendar?.calendar ?? [];

    // Parse dates as local (avoid timezone shift) and map only dates within the current week
    const parseDate = (dateStr: string) => {
        const parts = dateStr?.split('-').map(Number) ?? [];
        if (parts.length !== 3) return new Date(dateStr);
        const [y, m, d] = parts;
        return new Date(y, m - 1, d);
    };

    // Use provided `today`; otherwise fall back to the latest date present in the calendar array,
    // or to the current local date if nothing is available.
    let todayStr = overview?.calendar?.today;
    if (!todayStr) {
        const dates = calendar.map((it) => it?.date).filter(Boolean) as string[];
        if (dates.length) {
            const latest = dates.reduce((a, b) => (parseDate(a) > parseDate(b) ? a : b));
            todayStr = latest;
        } else {
            todayStr = new Date().toISOString().slice(0, 10);
        }
    }
    const todayDate = parseDate(todayStr);
    const todayDayIndex = (todayDate.getDay() + 6) % 7; // Monday=0 .. Sunday=6
    const weekStart = new Date(todayDate);
    weekStart.setDate(todayDate.getDate() - todayDayIndex);
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);

    const weekCompletionMap = Array(7).fill(false);

    calendar.forEach((item) => {
        if (!item?.date) return;
        const itemDate = parseDate(item.date);
        // consider only dates that fall in this week (Mon..Sun)
        if (itemDate >= weekStart && itemDate <= weekEnd) {
            const dayIndex = (itemDate.getDay() + 6) % 7;
            weekCompletionMap[dayIndex] = item.completed;
        }
    });

const currentStreak = overview?.currentStreak ?? 0;

    return (
        <View style={styles.consistencyContainer}>
            <View style={styles.sectionHeaderRow}>
                <Text style={styles.sectionTitle}>2. Consistency</Text>
                <TouchableOpacity activeOpacity={0.7} onPress={() => router.push('/calendar')}>
                    <Text style={styles.sectionLink}>View Calendar &gt;</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.consistencyCard} activeOpacity={0.8} onPress={() => router.push('/dailystreak')}>
                {/* Streak */}
                <View style={styles.streakBlock}>
                    <Text style={styles.streakLabel}>Current Streak</Text>
                    <View style={styles.streakCircle}>
                        <FireSvg width={20} height={20} />
                        <Text style={styles.streakValue}>
                            {overview?.currentStreak ?? 0}
                        </Text>
                        <Text style={styles.streakDaysText}>Days</Text>
                    </View>
                </View>

                <View style={styles.consistencyDivider} />

                {/* Week */}
                <View style={styles.weekBlock}>
                    <Text style={styles.weekTitle}>Your Practice This Week</Text>
                    <View style={styles.weekDaysRow}>
                        {DAY_LABELS.map((day, i) => (
                            <View key={i} style={styles.weekDayCol}>
                                <Text style={styles.weekDayLabel}>{day}</Text>
                                <View style={[
                                    styles.weekDayCircle,
                                    weekCompletionMap[i] && styles.weekDayCircleCompleted,
                                    !weekCompletionMap[i] && { borderColor: colors.textMuted }
                                ]}>
                                    {weekCompletionMap[i] && (
                                        <Ionicons name="checkmark" size={14} color="#9A85FE" />
                                    )}
                                </View>
                            </View>
                        ))}
                    </View>

                    <View style={styles.legendRowSmall}>
                        <View style={styles.legendItemSmall}>
                            <Ionicons name="checkmark-circle-outline" size={14} color="#9A85FE" />
                            <Text style={styles.legendItemText}>Completed</Text>
                        </View>
                        <View style={styles.legendItemSmall}>
                            <Ionicons name="ellipse-outline" size={14} color={colors.textMuted} />
                            <Text style={styles.legendItemText}>Missed</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
}