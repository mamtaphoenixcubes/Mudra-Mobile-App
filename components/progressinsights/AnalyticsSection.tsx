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
import TimeRangeDropdown, { type TimeRange, timeRangeLabel } from '@/components/common/TimeRangeDropdown';

interface AnalyticsSectionProps {
    analytics: any;
}

export default function AnalyticsSection({
    analytics,
}: AnalyticsSectionProps) {
    const { colors, isDark } = useTheme()
    const styles = getProgressInsightsStyles(colors)

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [range, setRange] = useState<TimeRange>('week');

    const averageSession =
        analytics?.averageSessionDuration?.formatted ?? '--';

    const weeklyComparison = analytics?.weeklyComparison;

    const goalCompletion = analytics?.goalCompletion;


    const changeColor =
        weeklyComparison?.trend === 'UP'
            ? '#2E7D32'
            : weeklyComparison?.trend === 'DOWN'
                ? '#C62828'
                : colors.text;

    const changeValue =
        weeklyComparison?.trend === 'UP'
            ? `+${weeklyComparison?.percentage ?? 0}%`
            : weeklyComparison?.trend === 'DOWN'
                ? `-${weeklyComparison?.percentage ?? 0}%`
                : 'No Change';

    const isDurationGoal = goalCompletion?.goalType === 'DURATION';

    const goalValue = goalCompletion?.hasGoal
        ? `${isDurationGoal
            ? ((goalCompletion.current === false ? 0 : (goalCompletion.current ?? 0)) / 60).toFixed(1)
            : (goalCompletion.current === false ? 0 : (goalCompletion.current ?? 0))
        } / ${isDurationGoal
            ? (goalCompletion.target / 60).toFixed(1)
            : goalCompletion.target
        }`
        : 'Not Set';

    const STATS = [
        {
            icon: isDark
                ? <ClockWhite width={26} height={26} />
                : <ClockSvg width={26} height={26} />,
            value: averageSession,
            label: 'Average Session\nDuration',
            valueColor: colors.text,
        },
        {
            icon: isDark
                ? <GroupWhite width={26} height={26} />
                : <BeginnerSvg width={26} height={26} />,
            value: changeValue,
            label: 'Increase vs Last\nWeek',
            valueColor: changeColor,
        },
        {
            icon: isDark
                ? <ElementalLogicWhite width={26} height={26} />
                : <ElementalLogicSvg width={26} height={26} />,
            value: goalValue,
            label: 'Goals\nCompleted',
            valueColor: colors.text,
            isDuration: isDurationGoal && goalCompletion?.hasGoal,
        },
    ];
    return (
        <View style={styles.analyticsContainer}>
            <View style={styles.sectionHeaderRow}>
                <Text style={styles.sectionTitle}>3. Analytics</Text>
                {/* <TouchableOpacity
                    style={styles.overallWeekRow}
                    activeOpacity={0.7}
                    onPress={() => setDropdownOpen(true)}
                >
                    <Text style={styles.sectionLink}>{timeRangeLabel(range)}</Text>
                    <Ionicons name="chevron-down" size={14} color="#9A85FE" />
                </TouchableOpacity> */}
            </View>

            <View style={styles.analyticsCard}>
                {STATS.map((stat, i) => (
                    <React.Fragment key={i}>
                        <View style={styles.analyticsStatItem}>
                            {stat.icon}
                            <Text style={[styles.analyticsStatValue, { color: stat.valueColor }]}>{stat.value}
                                {stat.isDuration && (
                                    <Text style={{ fontSize: 8, fontWeight: '500' }}> Mins</Text>
                                )}
                            </Text>
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