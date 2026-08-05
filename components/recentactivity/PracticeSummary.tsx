import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
// import { recentActivityStyles as styles } from '@/assets/styles/recentactivity/recentActivityStyles';
import { getRecentActivityStyles } from '@/assets/styles/recentactivity/recentActivityStyles'
import { useTheme } from '@/constants/ThemeContext'
import { Ionicons } from '@expo/vector-icons';
import LotusBlack from '@/assets/icons/LotusBlack.svg';
import LotusWhite from '@/assets/icons/LotusWhite.svg'
import ClockSvg from '@/assets/icons/Clock.svg';
import ClockWhite from '@/assets/icons/ClockWhite.svg'
import FireSvg from '@/assets/icons/Fire.svg';
import FireWhite from '@/assets/icons/FireWhite.svg'
import StarSvg from '@/assets/icons/Star.svg';
import StarWhite from '@/assets/icons/StarWhiteEmpty.svg';
import { useActivityStore } from '@/store/activityStore';

function formatTotalTime(totalMinutes: number): string {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    if (hours === 0) return `${minutes}m`;
    return `${hours}h ${minutes}m`;
}

export default function PracticeSummary() {
    const { colors, isDark } = useTheme()
    const styles = getRecentActivityStyles(colors)
    const activities = useActivityStore((s) => s.activities);
    const sessionsCompleted = activities.filter((a) => a.isCompleted).length;
    const totalMinutes = Math.round(activities.reduce((sum, a) => sum + (a.totalPracticeDuration ?? 0), 0) / 60);
    const mudrasPracticed = activities.filter((a) => a.activityType === 'MUDRA').length;

    return (
        <View style={styles.summaryContainer}>
            <View style={styles.summaryCard}>
                <View style={styles.summaryTopRow}>
                    <Text style={styles.summaryTitle}>Your Practice Summary</Text>
                    <TouchableOpacity style={styles.summaryWeekRow} activeOpacity={0.7}>
                        <Text style={styles.summaryWeekText}>This Week</Text>
                        <Ionicons name="chevron-down" size={14} color="#0F0F0F80" />
                    </TouchableOpacity>
                </View>

                <View style={styles.summaryStatsRow}>
                    <View style={styles.statItem}>
                        {isDark ? <LotusWhite width={28} height={28} /> : <LotusBlack width={28} height={28} />}
                        <Text style={styles.statValue}>{sessionsCompleted}</Text>
                        <Text style={styles.statLabel}>Sessions{'\n'}Completed</Text>
                    </View>
                    <View style={styles.statDivider} />
                    <View style={styles.statItem}>
                        {isDark ? <ClockWhite width={28} height={28} /> : <ClockSvg width={28} height={28} />}
                        {/* <Text style={styles.statValue}>{formatTotalTime(totalMinutes)}</Text> */}
                        <Text style={styles.statValue} numberOfLines={1}>{formatTotalTime(totalMinutes)}</Text>
                        <Text style={styles.statLabel}>Total Time</Text>
                    </View>
                    <View style={styles.statDivider} />
                    <View style={styles.statItem}>
                        {isDark ? <FireWhite width={28} height={28} /> : <FireSvg width={28} height={28} />}
                        <Text style={styles.statValue}>5</Text>
                        <Text style={styles.statLabel}>Day Streak</Text>
                    </View>
                    <View style={styles.statDivider} />
                    <View style={styles.statItem}>
                        {isDark ? <StarWhite width={28} height={28} /> : <StarSvg width={28} height={28} />}
                        <Text style={styles.statValue}>{mudrasPracticed}</Text>
                        <Text style={styles.statLabel}>Mudras{'\n'}Practiced</Text>
                    </View>
                </View>
            </View>
        </View>
    );
}