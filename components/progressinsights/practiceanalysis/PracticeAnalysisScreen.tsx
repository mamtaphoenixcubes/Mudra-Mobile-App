import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Circle, G } from 'react-native-svg';
import AppHeader from '@/components/common/AppHeader';
import { useTheme } from '@/constants/ThemeContext';
import { getPracticeAnalysisDetailStyles } from '@/assets/styles/progressinsights/practiceAnalysisDetailStyles';
import { useProgressInsightStore } from '@/store/progressInsightStore';
import { useAuthStore } from '@/store/authStore';

type RangeTab = 'today' | 'week' | 'month';

type PracticeDistributionItem = {
    type: string;
    sessions: number;
    percentage: number;
};

type ChartPoint = {
    date: string;
    day?: string | number;
    sessions?: number;
    durationSeconds?: number;
};

const TYPE_LABELS: Record<string, string> = {
    MUDRA: 'Mudra Meditation',
    YOGA_NIDRA: 'Yoga Nidra',
    ELEMENT: 'Element Balance',
    ELEMENT_BALANCE: 'Element Balance',
};

const TYPE_COLORS: Record<string, string> = {
    MUDRA: '#FFDBE7',
    YOGA_NIDRA: '#CBECFF',
    ELEMENT: '#E9FFDB',
    ELEMENT_BALANCE: '#E9FFDB',
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

    const { user } = useAuthStore();
    const profileDocumentId = user?.profileDocumentId || user?.id;

    const fetchAnalysis = useProgressInsightStore((state) => state.fetchAnalysis);
    const analysis = useProgressInsightStore((state) => state.analysis);
    const loading = useProgressInsightStore((state) => state.loading);

    useEffect(() => {
        if (!profileDocumentId) return;

        const typeMap: Record<RangeTab, string> = {
            today: 'daily',
            week: 'weekly',
            month: 'monthly',
        };

        fetchAnalysis(profileDocumentId, typeMap[range]);
    }, [profileDocumentId, range, fetchAnalysis]);

    const summary = analysis?.summary;
    const totalSessions = summary?.totalSessions ?? 0;
    const formattedTime = summary?.formatted ?? '0m';
    const currentStreak = analysis?.dailyStreak ?? 0;
    const goal = analysis?.goal;
    const practiceDistribution: PracticeDistributionItem[] = analysis?.practiceDistribution ?? [];
    const chart = analysis?.chart;
    const chartData: ChartPoint[] = Array.isArray(chart?.data) ? chart.data : [];
    const chartTitle =
        analysis?.type === 'MONTHLY'
            ? 'Sessions this month'
            : analysis?.type === 'DAILY'
                ? 'Sessions today'
                : 'Sessions this week';
    const goalLabel = goal?.resetType ? `${String(goal.resetType).toLowerCase()} goal` : 'goal';
    const maxChartValue = chartData.reduce((max, item) => {
        const value = Number(item.sessions ?? 0);
        return Math.max(max, value);
    }, 0);
    let offset = 0;
    const center = DONUT_SIZE / 2;

    return (
        <View style={styles.screen}>
            <AppHeader />

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                <Text style={styles.pageTitle}>Practice Analysis</Text>

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

                {loading ? (
                    <Text style={styles.emptyText}>Loading practice analysis...</Text>
                ) : (
                    <>
                        <View style={styles.summaryRow}>
                            <View style={[styles.summaryTile, { backgroundColor: '#FFF6BF' }]}>
                                <Text style={[styles.summaryLabel, { color: '#412402' }]}>Total sessions</Text>
                                <Text style={[styles.summaryValue, { color: '#412402' }]}>{totalSessions}</Text>
                            </View>
                            <View style={[styles.summaryTile, { backgroundColor: '#CBECFF' }]}>
                                <Text style={[styles.summaryLabel, { color: '#042C53' }]}>Total time</Text>
                                <Text style={[styles.summaryValue, { color: '#042C53' }]}>{formattedTime}</Text>
                            </View>
                        </View>

                        <Text style={styles.sectionLabel}>By practice type</Text>
                        {practiceDistribution.length === 0 ? (
                            <Text style={styles.emptyText}>No practices recorded for this period yet.</Text>
                        ) : (
                            <View style={styles.donutRow}>
                                <Svg width={DONUT_SIZE} height={DONUT_SIZE}>
                                    <G rotation="-90" origin={`${center}, ${center}`}>
                                        {practiceDistribution.map((item, index) => {
                                            const fraction = Math.max(Number(item.percentage ?? 0) / 100, 0);
                                            const dash = CIRCUMFERENCE * fraction;
                                            const gap = CIRCUMFERENCE - dash;
                                            const stroke = TYPE_COLORS[String(item.type)] ?? '#D9D9D9';
                                            const circle = (
                                                <Circle
                                                    key={`${item.type}-${index}`}
                                                    cx={center}
                                                    cy={center}
                                                    r={R}
                                                    fill="none"
                                                    stroke={stroke}
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
                                    {practiceDistribution.map((item, index) => (
                                        <View key={`${item.type}-${index}`} style={styles.legendItem}>
                                            <View
                                                style={[
                                                    styles.legendDot,
                                                    { backgroundColor: TYPE_COLORS[String(item.type)] ?? '#D9D9D9' },
                                                ]}
                                            />
                                            <Text style={styles.legendText} numberOfLines={1}>
                                                {TYPE_LABELS[String(item.type)] ?? String(item.type).replace(/_/g, ' ')} {item.percentage}%
                                            </Text>
                                        </View>
                                    ))}
                                </View>
                            </View>
                        )}

                        {chartData.length > 0 && (
                            <>
                                <Text style={styles.barChartSectionLabel}>{chartTitle}</Text>
                                <View style={styles.barChartRow}>
                                    {chartData.map((day, index) => {
                                        const count = Number(day.sessions ?? 0);
                                        const heightPct = maxChartValue > 0 ? (count / maxChartValue) * 100 : 0;
                                        const label =
                                            typeof day.day === 'string'
                                                ? day.day.slice(0, 3)
                                                : typeof day.day === 'number'
                                                    ? String(day.day)
                                                    : new Date(day.date).toLocaleDateString(undefined, { weekday: 'narrow' });
                                        const barColors = ['#FFF6BF', '#CBECFF', '#FFD4C4', '#E9FFDB', '#FFDBE7', '#CBECFF', '#E9FFDB'];

                                        return (
                                            <View key={`${day.date}-${index}`} style={styles.barCol}>
                                                <View
                                                    style={[
                                                        styles.bar,
                                                        { height: `${heightPct}%`, backgroundColor: barColors[index % barColors.length] },
                                                    ]}
                                                />
                                                <Text style={styles.barLabel}>{label}</Text>
                                            </View>
                                        );
                                    })}
                                </View>
                            </>
                        )}
                    </>
                )}
            </ScrollView>

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
                            {goal?.hasGoal ? `${goal.current ?? 0}/${goal.target ?? 0}` : 'Not set'}
                        </Text>
                        <Text style={[styles.consistencyLabel, { color: '#4B1528' }]}>{goalLabel}</Text>
                    </View>
                </View>
            </View>
        </View>
    );
}
