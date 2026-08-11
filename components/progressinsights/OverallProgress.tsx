import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getProgressInsightsStyles } from '@/assets/styles/progressinsights/progressInsightsStyles'
import TimeRangeDropdown, { type TimeRange, timeRangeLabel } from '@/components/common/TimeRangeDropdown';
import { useTheme } from '@/constants/ThemeContext'
import ClockWhite from '@/assets/icons/ClockWhite.svg'
import LotusWhite from '@/assets/icons/LotusWhite.svg'
import FireWhite from '@/assets/icons/FireWhite.svg'
import StarWhite from '@/assets/icons/StarWhiteEmpty.svg'
import ClockSvg from '@/assets/icons/clock.svg';
import LotusBlack from '@/assets/icons/LotusBlack.svg';
import FireSvg from '@/assets/icons/Fire.svg';
import StarSvg from '@/assets/icons/Star.svg';

// import {
//     useStreakStore,
//     getCurrentStreak,
//     getThisWeekStats,
//     getThisMonthStats,
//     getAllTimeStats,
//     formatMinutesAsHoursMinutes,
// } from '@/store/streakStore';
// import { useGoalStore, getGoalProgress } from '@/store/goalStore';

interface OverallProgressProps {
    summary?: {
        totalCompletedSessions: number;
        totalPracticeSeconds: number;
        totalPracticeMinutes: number;
        formatted: string;
        currentStreak: number;
    };
    goal?: any | null;
}

export default function OverallProgress({
    summary,
    goal,
}: OverallProgressProps) {
    const { colors, isDark } = useTheme()
    const styles = getProgressInsightsStyles(colors)
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [range, setRange] = useState<TimeRange>('week');

    const hasActiveGoal = goal?.GoalStatus === 'ACTIVE';

    const goalCurrentRaw = goal?.CurrentProgress === false ? 0 : (goal?.CurrentProgress ?? 0);
    const goalTargetRaw = goal?.GoalValue ?? 0;

    const isDurationGoal = goal?.GoalType === 'DURATION';


    const goalCurrent = isDurationGoal ? Math.round(goalCurrentRaw / 60) : goalCurrentRaw;
    const goalTarget = isDurationGoal ? Math.round(goalTargetRaw / 60) : goalTargetRaw;


    const STATS = [
        {
            icon: isDark ? (
                <ClockWhite width={26} height={26} />
            ) : (
                <ClockSvg width={26} height={26} />
            ),
            value: summary?.formatted ?? '0m',
            label: 'Total Practice\nTime',
        },
        {
            icon: isDark ? (
                <LotusWhite width={26} height={26} />
            ) : (
                <LotusBlack width={26} height={26} />
            ),
            value: String(summary?.totalCompletedSessions ?? 0),
            label: 'Sessions\nCompleted',
        },
        {
            icon: isDark ? (
                <FireWhite width={26} height={26} />
            ) : (
                <FireSvg width={26} height={26} />
            ),
            value: String(summary?.currentStreak ?? 0),
            label: 'Day Streak\nKeep it up!',
        },
        {
            icon: isDark ? (
                <StarWhite width={26} height={26} />
            ) : (
                <StarSvg width={26} height={26} />
            ),
            value: hasActiveGoal
                ? `${goalCurrent}/${goalTarget}`
                : '—',
            label: hasActiveGoal
                ? 'Weekly Goal\nProgress'
                : 'Weekly Goal\nNot set yet',

            isDuration: hasActiveGoal && isDurationGoal,
        },
    ];
    return (
        <View style={styles.overallContainer}>
            <View style={styles.overallCard}>
                <View style={styles.overallTopRow}>
                    <Text style={styles.overallTitle}>Your Overall Progress</Text>
                    <TouchableOpacity
                        style={styles.overallWeekRow}
                        activeOpacity={0.7}
                        onPress={() => setDropdownOpen(true)}
                    >
                        <Text style={styles.overallWeekText}>{timeRangeLabel(range)}</Text>
                        <Ionicons name="chevron-down" size={14} color="#0F0F0F80" />
                    </TouchableOpacity>
                </View>
                <View style={styles.overallStatsRow}>
                    {STATS.map((stat, i) => (
                        <React.Fragment key={i}>
                            <View style={styles.overallStatItem}>
                                {stat.icon}
                                <Text style={styles.overallStatValue}>{stat.value}
                                    {stat.isDuration && (
                                        <Text style={{ fontSize: 6, fontWeight: '400' }}> Mins</Text>
                                    )}
                                </Text>
                                <Text style={styles.overallStatLabel}>{stat.label}</Text>
                            </View>
                            {i < STATS.length - 1 && <View style={styles.overallStatDivider} />}
                        </React.Fragment>
                    ))}
                </View>
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