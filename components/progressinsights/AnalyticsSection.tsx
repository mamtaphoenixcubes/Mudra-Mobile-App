import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getProgressInsightsStyles } from '@/assets/styles/progressinsights/progressInsightsStyles'
import { useTheme } from '@/constants/ThemeContext'
import ClockSvg from '@/assets/icons/clock.svg';
import ElementalLogicSvg from '@/assets/icons/elementallogic.svg';
import BeginnerSvg from '@/assets/icons/Group.svg';
import ClockWhite from '@/assets/icons/ClockWhite.svg'
import GroupWhite from '@/assets/icons/GroupWhite.svg'
import ElementalLogicWhite from '@/assets/icons/elementallogicWhite.svg'
import {
    useStreakStore,
    getThisWeekStats,
    getThisMonthStats,
    getAllTimeStats,
    getWeekOverWeekChange,
} from '@/store/streakStore';
import { useGoalStore, getGoalProgress } from '@/store/goalStore';
import TimeRangeDropdown, { type TimeRange, timeRangeLabel } from '@/components/common/TimeRangeDropdown';

export default function AnalyticsSection() {
    const { colors, isDark } = useTheme()
    const styles = getProgressInsightsStyles(colors)

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [range, setRange] = useState<TimeRange>('week');

    const events = useStreakStore((s) => s.events);

    // The dropdown only controls "Average Session Duration"'s window —
    // "Increase vs Last Week" is inherently a weekly comparison by its own
    // label, and "Goals Completed" always reflects the current goal's own
    // weekly progress, so neither changes with this selector.
    const rangeStats =
        range === 'week' ? getThisWeekStats(events)
            : range === 'month' ? getThisMonthStats(events)
                : getAllTimeStats(events);

    const averageSessionMinutes = rangeStats.sessionCount > 0
        ? Math.round(rangeStats.totalMinutes / rangeStats.sessionCount)
        : 0;

    const weekChange = getWeekOverWeekChange(events);

    const goalType = useGoalStore((s) => s.goalType);
    const targetValue = useGoalStore((s) => s.targetValue);
    const progress = getGoalProgress(goalType, targetValue, events);

    const changeColor =
        !weekChange || weekChange.direction === 'same'
            ? colors.text
            : weekChange.direction === 'increase'
                ? '#2E7D32' // green
                : '#C62828'; // red

    const changeValue = !weekChange
        ? 'New'
        : weekChange.direction === 'same'
            ? 'No change'
            : `${weekChange.direction === 'increase' ? '+' : ''}${weekChange.percent}%`;

    const STATS = [
        {
            icon: isDark ? <ClockWhite width={26} height={26} /> : <ClockSvg width={26} height={26} />,
            value: rangeStats.sessionCount > 0 ? `${averageSessionMinutes} min` : '—',
            label: 'Average Session\nDuration',
            valueColor: colors.text,
        },
        {
            icon: isDark ? <GroupWhite width={26} height={26} /> : <BeginnerSvg width={26} height={26} />,
            value: changeValue,
            label: 'Increase vs Last\nWeek',
            valueColor: changeColor,
        },
        {
            icon: isDark ? <ElementalLogicWhite width={26} height={26} /> : <ElementalLogicSvg width={26} height={26} />,
            value: progress ? `${progress.current} / ${progress.target}` : 'Not set',
            label: 'Goals\nCompleted',
            valueColor: colors.text,
        },
    ]
    return (
        <View style={styles.analyticsContainer}>
            <View style={styles.sectionHeaderRow}>
                <Text style={styles.sectionTitle}>3. Analytics</Text>
                <TouchableOpacity
                    style={styles.overallWeekRow}
                    activeOpacity={0.7}
                    onPress={() => setDropdownOpen(true)}
                >
                    <Text style={styles.sectionLink}>{timeRangeLabel(range)}</Text>
                    <Ionicons name="chevron-down" size={14} color="#9A85FE" />
                </TouchableOpacity>
            </View>

            <View style={styles.analyticsCard}>
                {STATS.map((stat, i) => (
                    <React.Fragment key={i}>
                        <View style={styles.analyticsStatItem}>
                            {stat.icon}
                            <Text style={[styles.analyticsStatValue, { color: stat.valueColor }]}>{stat.value}</Text>
                            <Text style={styles.analyticsStatLabel}>{stat.label}</Text>
                        </View>
                        {i < STATS.length - 1 && <View style={styles.analyticsStatDivider} />}
                    </React.Fragment>
                ))}
            </View>

            <TimeRangeDropdown
                visible={dropdownOpen}
                selected={range}
                onSelect={setRange}
                onClose={() => setDropdownOpen(false)}
            />
        </View>
    );
}