import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Circle, G } from 'react-native-svg';
import AppHeader from '@/components/common/AppHeader';
import { useTheme } from '@/constants/ThemeContext';
import { getPracticeAnalysisDetailStyles } from '@/assets/styles/progressinsights/practiceAnalysisDetailStyles';
import {
    useStreakStore,
    getCurrentStreak,
    getPracticeTypeBreakdown,
    getDailySessionCounts,
    formatMinutesAsHoursMinutes,
    type PracticeType,
} from '@/store/streakStore';
import { useGoalStore, getGoalProgress } from '@/store/goalStore';

type RangeTab = 'today' | 'week' | 'month';

const TYPE_LABELS: Record<PracticeType, string> = {
    mudra: 'Mudra Meditation',
    nidra: 'Yoga Nidra',
    element: 'Element Balance',
};

const TYPE_COLORS: Record<PracticeType, string> = {
    mudra: '#FFDBE7',
    nidra: '#CBECFF',
    element: '#E9FFDB',
};

const DONUT_SIZE = 110;
const STROKE = 18;
const R = (DONUT_SIZE - STROKE) / 2;
const CIRCUMFERENCE = 2 * Math.PI * R;

const TABS: { value: RangeTab; label: string }[] = [
    { value: 'today', label: 'Daily' },
    { value: 'week', label: 'Weekly' },
    { value: 'month', label: 'Monthly' },
];

export default function PracticeAnalysisScreen() {
    const { colors } = useTheme();
    const styles = getPracticeAnalysisDetailStyles(colors);
    const insets = useSafeAreaInsets();

    const [range, setRange] = useState<RangeTab>('week');

    const events = useStreakStore((s) => s.events);
    const breakdown = getPracticeTypeBreakdown(events, range);
    const dailyCounts = getDailySessionCounts(events, 7);
    const currentStreak = getCurrentStreak(events);

    const goalType = useGoalStore((s) => s.goalType);
    const targetValue = useGoalStore((s) => s.targetValue);
    const goalProgress = getGoalProgress(goalType, targetValue, events);

    const totalSessions = breakdown.reduce((sum, b) => sum + b.sessionCount, 0);
    const totalMinutes = breakdown.reduce((sum, b) => sum + b.totalMinutes, 0);
    const maxDailyCount = Math.max(...dailyCounts.map((d) => d.count), 1);

    let offset = 0;
    const CENTER = DONUT_SIZE / 2;

    return (
        <View style={styles.screen}>
            <AppHeader />

            {/* Scrollable content — Consistency is OUTSIDE this, as a
                fixed footer, so it doesn't scroll with everything else. */}
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                <Text style={styles.pageTitle}>Practice Analysis</Text>

                {/* Daily / Weekly / Monthly tabs — now actually change the data below */}
                <View style={styles.tabRow}>
                    {TABS.map((tab) => (
                        <TouchableOpacity
                            key={tab.value}
                            style={[styles.tabBtn, range === tab.value && styles.tabBtnActive]}
                            onPress={() => setRange(tab.value)}
                            activeOpacity={0.7}
                        >
                            <Text style={[styles.tabText, range === tab.value && styles.tabTextActive]}>
                                {tab.label}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Summary tiles */}
                <View style={styles.summaryRow}>
                    <View style={[styles.summaryTile, { backgroundColor: '#FFF6BF' }]}>
                        <Text style={[styles.summaryLabel, { color: '#412402' }]}>Total sessions</Text>
                        <Text style={[styles.summaryValue, { color: '#412402' }]}>{totalSessions}</Text>
                    </View>
                    <View style={[styles.summaryTile, { backgroundColor: '#CBECFF' }]}>
                        <Text style={[styles.summaryLabel, { color: '#042C53' }]}>Total time</Text>
                        <Text style={[styles.summaryValue, { color: '#042C53' }]}>{formatMinutesAsHoursMinutes(totalMinutes)}</Text>
                    </View>
                </View>

                {/* Donut + legend */}
                <Text style={styles.sectionLabel}>By practice type</Text>
                {breakdown.length === 0 ? (
                    <Text style={styles.emptyText}>No practices recorded for this period yet.</Text>
                ) : (
                    <View style={styles.donutRow}>
                        <Svg width={DONUT_SIZE} height={DONUT_SIZE}>
                            <G rotation="-90" origin={`${CENTER}, ${CENTER}`}>
                                {breakdown.map((item) => {
                                    const fraction = totalMinutes > 0 ? item.totalMinutes / totalMinutes : 0;
                                    const dash = CIRCUMFERENCE * fraction;
                                    const gap = CIRCUMFERENCE - dash;
                                    const circle = (
                                        <Circle
                                            key={item.practiceType}
                                            cx={CENTER}
                                            cy={CENTER}
                                            r={R}
                                            fill="none"
                                            stroke={TYPE_COLORS[item.practiceType]}
                                            strokeWidth={STROKE}
                                            strokeDasharray={`${dash} ${gap}`}
                                            strokeDashoffset={-CIRCUMFERENCE * offset}
                                        />
                                    );
                                    offset += fraction;
                                    return circle;
                                })}
                            </G>
                        </Svg>

                        <View style={styles.legendCol}>
                            {breakdown.map((item) => (
                                <View key={item.practiceType} style={styles.legendItem}>
                                    <View style={[styles.legendDot, { backgroundColor: TYPE_COLORS[item.practiceType] }]} />
                                    <Text style={styles.legendText} numberOfLines={1}>
                                        {TYPE_LABELS[item.practiceType]} {item.percent}%
                                    </Text>
                                </View>
                            ))}
                        </View>
                    </View>
                )}

                {/* Bar chart — last 7 days */}
                <Text style={styles.barChartSectionLabel}>Sessions this week</Text>
                <View style={styles.barChartRow}>
                    {dailyCounts.map((day, i) => {
                        const heightPct = (day.count / maxDailyCount) * 100;
                        const barColors = ['#FFF6BF', '#CBECFF', '#FFD4C4', '#E9FFDB', '#FFDBE7', '#CBECFF', '#E9FFDB'];
                        return (
                            <View key={day.date} style={styles.barCol}>
                                <View
                                    style={[
                                        styles.bar,
                                        { height: `${heightPct}%`, backgroundColor: barColors[i % barColors.length] },
                                    ]}
                                />
                                <Text style={styles.barLabel}>
                                    {new Date(day.date).toLocaleDateString(undefined, { weekday: 'narrow' })}
                                </Text>
                            </View>
                        );
                    })}
                </View>
            </ScrollView>

            {/* Fixed footer — Consistency cards, pinned to the bottom of the
                screen, always visible regardless of scroll position. */}
            <View style={[styles.footerContainer, { paddingBottom: insets.bottom + 12 }]}>
                <Text style={styles.sectionLabel}>Consistency</Text>
                <View style={styles.consistencyRow}>
                    <View style={[styles.consistencyTile, { backgroundColor: '#FFD4C4' }]}>
                        <Ionicons name="flame-outline" size={18} color="#4A1B0C" />
                        <Text style={[styles.consistencyValue, { color: '#4A1B0C' }]}>{currentStreak}</Text>
                        <Text style={[styles.consistencyLabel, { color: '#4A1B0C' }]}>day streak</Text>
                    </View>
                    <View style={[styles.consistencyTile, { backgroundColor: '#FFDBE7' }]}>
                        <Ionicons name="flag-outline" size={18} color="#4B1528" />
                        <Text style={[styles.consistencyValue, { color: '#4B1528' }]}>
                            {goalProgress ? `${goalProgress.current}/${goalProgress.target}` : 'Not set'}
                        </Text>
                        <Text style={[styles.consistencyLabel, { color: '#4B1528' }]}>weekly goal</Text>
                    </View>
                </View>
            </View>
        </View>
    );
}