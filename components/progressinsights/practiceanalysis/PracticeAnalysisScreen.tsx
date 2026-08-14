import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Animated, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { PinchGestureHandler } from 'react-native-gesture-handler';
import Svg, { Circle, G, Line, Polyline, Text as SvgText, Defs, LinearGradient, Stop, Polygon, Rect } from 'react-native-svg';
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
const LINE_CHART_HEIGHT = 200;
const LINE_CHART_WIDTH = 300;
const LINE_CHART_LEFT = 30;
const LINE_CHART_RIGHT = 10;
const LINE_CHART_TOP = 15;
const LINE_CHART_BOTTOM = 18;
const MIN_CHART_ZOOM = 1;
const MAX_CHART_ZOOM = 2.2;
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
    const [selectedPoint, setSelectedPoint] = useState<number | null>(null);
    const [chartZoom, setChartZoom] = useState(1);
    const pinchStartScaleRef = useRef(1);
    const chartZoomAnim = useRef(new Animated.Value(1));
    const scrollViewRef = useRef<ScrollView | null>(null);

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
    useEffect(() => {
        setSelectedPoint(null);
        // compute initial fit scale for month view so whole chart fits on mobile
        pinchStartScaleRef.current = 1;
        if (range === 'month' && chartData.length > 0) {
            const today = new Date();
            // find last index <= today
            let lastVisibleIndex = -1;
            for (let i = 0; i < chartData.length; i++) {
                const d = new Date(chartData[i].date);
                if (d <= today) lastVisibleIndex = i;
            }
            const visibleCount = Math.max(1, lastVisibleIndex + 1);

           const totalBaseWidth = Math.max(
                LINE_CHART_WIDTH,
                chartData.length * 12
            );

            const visibleBaseWidth = Math.max(
                LINE_CHART_WIDTH,
                visibleCount * 12
            );
            const deviceWidth = Dimensions.get('window').width - 28;

            const fitScale = Math.min(MAX_CHART_ZOOM, Math.max(MIN_CHART_ZOOM, Number((deviceWidth / visibleBaseWidth).toFixed(2))));
            pinchStartScaleRef.current = fitScale;

            Animated.timing(chartZoomAnim.current, {
                toValue: fitScale,
                duration: 300,
                useNativeDriver: false,
            }).start(() => {
                // after zoom applied, scroll so the visible range ends at today's point
                const totalChartWidth = totalBaseWidth * fitScale;
                const scrollX = Math.max(0, totalChartWidth - deviceWidth + LINE_CHART_RIGHT);
                if (scrollViewRef.current && typeof scrollViewRef.current.scrollTo === 'function') {
                    // small delay to ensure layout
                    setTimeout(() => scrollViewRef.current?.scrollTo({ x: scrollX, animated: false }), 50);
                }
            });
        } else {
            Animated.timing(chartZoomAnim.current, {
                toValue: 1,
                duration: 250,
                useNativeDriver: false,
            }).start();
        }
    }, [range, chartData]);

    // keep chartZoom state in sync with animated value for non-animated consumers
    useEffect(() => {
        const id = chartZoomAnim.current.addListener(({ value }) => {
            setChartZoom(Number(value.toFixed(2)));
        });
        return () => chartZoomAnim.current.removeListener(id);
    }, []);
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

        {range === 'month' ? (
            (() => {
              const baseChartWidth = Math.max(
                LINE_CHART_WIDTH,
                chartData.length * 12
            );
                const chartWidth = Math.max(
                    baseChartWidth,
                    baseChartWidth * chartZoom
                );

                const graphWidth =
                    chartWidth - LINE_CHART_LEFT - LINE_CHART_RIGHT;

                const graphHeight =
                    LINE_CHART_HEIGHT - LINE_CHART_TOP - LINE_CHART_BOTTOM;

                const maxValue = Math.max(maxChartValue, 1);

                const points = chartData.map((item, index) => {
                    const count = Number(item.sessions ?? 0);

                    const x =
                        LINE_CHART_LEFT +
                        (chartData.length === 1
                            ? graphWidth / 2
                            : (index / (chartData.length - 1)) * graphWidth);

                    const y =
                        LINE_CHART_TOP +
                        graphHeight -
                        (count / maxValue) * graphHeight;

                    return {
                        x,
                        y,
                        count,
                        date: item.date,
                    };
                });

                const pointsString = points
                    .map((point) => `${point.x},${point.y}`)
                    .join(' ');

                const polygonPointsString = `${pointsString} ${chartWidth - LINE_CHART_RIGHT},${LINE_CHART_TOP + graphHeight} ${LINE_CHART_LEFT},${LINE_CHART_TOP + graphHeight}`;

                const labelInterval = Math.max(1, Math.ceil(points.length / 8));

                const yAxisSteps = Math.min(maxValue, 5);

                const handlePinchGesture = (event: any) => {
                    const nextZoom = Math.min(
                        MAX_CHART_ZOOM,
                        Math.max(
                            MIN_CHART_ZOOM,
                            Number((pinchStartScaleRef.current * event.nativeEvent.scale).toFixed(2))
                        )
                    );
                    // update animated value for smooth render
                    chartZoomAnim.current.setValue(nextZoom);
                };

                const handlePinchStateChange = (event: any) => {
                    // state 5 === ACTIVE end in gesture-handler v1 compat; set base scale
                    if (event.nativeEvent.state === 5) {
                        pinchStartScaleRef.current = chartZoom;
                        // snap to bounds smoothly if out of range
                        const clamped = Math.min(MAX_CHART_ZOOM, Math.max(MIN_CHART_ZOOM, chartZoom));
                        Animated.spring(chartZoomAnim.current, {
                            toValue: clamped,
                            useNativeDriver: false,
                            bounciness: 4,
                        }).start();
                    }
                };

                return (
                    <PinchGestureHandler
                        onGestureEvent={handlePinchGesture}
                        onHandlerStateChange={handlePinchStateChange}
                    >
                        <View>
                            <Text style={{
                                alignSelf: 'flex-end',
                                marginBottom: 8,
                                fontSize: 11,
                                color: '#667085',
                            }}>
                                Pinch to zoom
                            </Text>

                            <ScrollView
                                ref={(r) => { scrollViewRef.current = r; }}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                style={{ width: '100%' }}
                                contentContainerStyle={{ paddingRight: 8 }}
                            >
                                <View style={{ width: chartWidth }}>
                                    <Svg
                                        width={chartWidth}
                                        height={LINE_CHART_HEIGHT}
                                    >
                                {/* Horizontal grid lines + Y-axis labels */}
                                {Array.from(
                                    { length: yAxisSteps + 1 },
                                    (_, index) => {
                                        const value = Math.round(
                                            (maxValue / yAxisSteps) *
                                                (yAxisSteps - index)
                                        );

                                        const y =
                                            LINE_CHART_TOP +
                                            (index / yAxisSteps) *
                                                graphHeight;

                                        return (
                                            <G key={`y-${index}`}>
                                                <Line
                                                    x1={LINE_CHART_LEFT}
                                                    y1={y}
                                                    x2={
                                                        chartWidth -
                                                        LINE_CHART_RIGHT
                                                    }
                                                    y2={y}
                                                    stroke="#E5E5E5"
                                                    strokeWidth="1"
                                                />

                                                <SvgText
                                                    x={LINE_CHART_LEFT - 8}
                                                    y={y + 4}
                                                    fontSize="11"
                                                    fill="#777"
                                                    textAnchor="end"
                                                >
                                                    {value}
                                                </SvgText>
                                            </G>
                                        );
                                    }
                                )}

                                {/* X-axis */}
                                <Line
                                    x1={LINE_CHART_LEFT}
                                    y1={
                                        LINE_CHART_TOP +
                                        graphHeight
                                    }
                                    x2={
                                        chartWidth -
                                        LINE_CHART_RIGHT
                                    }
                                    y2={
                                        LINE_CHART_TOP +
                                        graphHeight
                                    }
                                    stroke="#999"
                                    strokeWidth="1"
                                />

                                <Defs>
                                    <LinearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                                        <Stop offset="0" stopColor="#4A6FA5" stopOpacity="0.16" />
                                        <Stop offset="1" stopColor="#4A6FA5" stopOpacity="0" />
                                    </LinearGradient>
                                </Defs>

                                {/* Area under the line for better visual weight */}
                                <Polygon
                                    points={polygonPointsString}
                                    fill="url(#grad)"
                                />

                                {/* Line */}
                             <Polyline
                                    points={pointsString}
                                    fill="none"
                                    stroke="#2F4E7A"
                                    strokeWidth="3"
                                    strokeLinejoin="round"
                                    strokeLinecap="round"
                                    onPress={(event) => {
                                        const { locationX } = event.nativeEvent;

                                        let closestIndex = 0;
                                        let closestDistance = Infinity;

                                        points.forEach((point, index) => {
                                            const distance = Math.abs(point.x - locationX);

                                            if (distance < closestDistance) {
                                                closestDistance = distance;
                                                closestIndex = index;
                                            }
                                        });

                                        setSelectedPoint(closestIndex);
                                    }}
                                />

                                {/* Data points with interaction */}
                               {/* Data points with responsive interaction */}
{points.map((point, index) => {
    const tooltipWidth = 86;
    const tooltipHeight = 42;

    // Keep tooltip inside the chart horizontally
    const tooltipX = Math.max(
        tooltipWidth / 2,
        Math.min(
            chartWidth - tooltipWidth / 2,
            point.x
        )
    );

    // Keep tooltip below the top edge
    const tooltipY = Math.max(
        tooltipHeight + 4,
        point.y - 12
    );

    return (
        <G key={`point-${index}`}>

            {/* Large invisible touch area */}
            <Circle
                cx={point.x}
                cy={point.y}
                r={16}
                fill="transparent"
                onPress={() => setSelectedPoint(index)}
            />

            {/* Visible point */}
            <Circle
                cx={point.x}
                cy={point.y}
                r={selectedPoint === index ? 6 : 4}
                fill="#2F4E7A"
                stroke="#ffffff"
                strokeWidth={selectedPoint === index ? 2 : 1}
                pointerEvents="none"
            />

            {/* X-axis date */}
            {index % labelInterval === 0 && (
                <SvgText
                    x={point.x}
                    y={
                        LINE_CHART_TOP +
                        graphHeight +
                        12
                    }
                    fontSize="8"
                    fill="#666"
                    textAnchor="middle"
                    pointerEvents="none"
                >
                    {new Date(point.date).toLocaleDateString(
                        undefined,
                        {
                            day: 'numeric',
                            month: 'short',
                        }
                    )}
                </SvgText>
            )}

            {/* Responsive tooltip */}
            {selectedPoint === index && (
                <G pointerEvents="none">

                    <Rect
                        x={tooltipX - tooltipWidth / 2}
                        y={tooltipY - tooltipHeight}
                        rx={7}
                        ry={7}
                        width={tooltipWidth}
                        height={tooltipHeight}
                        fill="#ffffff"
                        stroke="#E0E6EF"
                        strokeWidth={1}
                    />

                    <SvgText
                        x={tooltipX}
                        y={tooltipY - 25}
                        fontSize="13"
                        fontWeight="600"
                        fill="#1f2d3d"
                        textAnchor="middle"
                    >
                        {point.count}
                    </SvgText>

                    <SvgText
                        x={tooltipX}
                        y={tooltipY - 10}
                        fontSize="9"
                        fill="#667086"
                        textAnchor="middle"
                    >
                        {new Date(point.date).toLocaleDateString(
                            undefined,
                            {
                                day: 'numeric',
                                month: 'short',
                            }
                        )}
                    </SvgText>

                </G>
            )}
        </G>
    );
})}
                                    </Svg>
                                </View>
                            </ScrollView>
                        </View>
                    </PinchGestureHandler>
                );
            })()
        ) : (
            <View style={styles.barChartRow}>
                {chartData.map((day, index) => {
                    const count = Number(day.sessions ?? 0);

                    const heightPct =
                        maxChartValue > 0
                            ? (count / maxChartValue) * 100
                            : 0;

                    const label =
                        typeof day.day === 'string'
                            ? day.day.slice(0, 3)
                            : typeof day.day === 'number'
                                ? String(day.day)
                                : new Date(
                                      day.date
                                  ).toLocaleDateString(
                                      undefined,
                                      {
                                          weekday: 'narrow',
                                      }
                                  );

                    const barColors = [
                        '#FFF6BF',
                        '#CBECFF',
                        '#FFD4C4',
                        '#E9FFDB',
                        '#FFDBE7',
                        '#CBECFF',
                        '#E9FFDB',
                    ];

                    return (
                        <View
                            key={`${day.date}-${index}`}
                            style={styles.barCol}
                        >
                            <View
                                style={[
                                    styles.bar,
                                    {
                                        height: `${heightPct}%`,
                                        backgroundColor:
                                            barColors[
                                                index %
                                                    barColors.length
                                            ],
                                    },
                                ]}
                            />

                            <Text style={styles.barLabel}>
                                {label}
                            </Text>
                        </View>
                    );
                })}
            </View>
        )}
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
                        {/* Show session count and duration according to which goals are set.
                            - If sessionCount.hasGoal: show current/target sessions
                            - Else: show current sessions
                            - If duration.hasGoal: show current (seconds) converted to minutes (and target if available)
                            - Else: show current duration in minutes
                        */}
                        {(() => {
                            const sessionCount = goal?.sessionCount;
                            const duration = goal?.duration;

                            const sessionHasGoal = !!sessionCount?.hasGoal;
                            const durationHasGoal = !!duration?.hasGoal;

                            const sessionCurrent = sessionCount?.current ?? 0;
                            const sessionTarget = sessionCount?.target ?? 0;

                            const durationCurrentSec = duration?.current ?? 0;
                            const durationTargetSec = duration?.target ?? 0;
                            const durationCurrentMin = Math.round(durationCurrentSec / 60);
                            const durationTargetMin = Math.round(durationTargetSec / 60);

                            const sessionCompleted = !!sessionCount?.completed;
                            const durationCompleted = !!duration?.completed;

                            const periodLabel = range === 'week' ? 'week' : range === 'month' ? 'month' : 'day';

                            // If exactly one goal is set, show that metric in a clear card with completed and target lines + ticks.
                            if (sessionHasGoal && !durationHasGoal) {
                                return (
                                    <View style={{ alignItems: 'center' }}>
                                        <Text style={[styles.consistencyValue, { color: '#4B1528', fontSize: 20 }]}>{sessionCurrent}</Text>
                                        <Text style={[styles.consistencyLabel, { color: '#4B1528' }]}>session completed</Text>

                                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
                                            <Text style={[styles.consistencyLabel, { color: '#64748B' }]}>{sessionTarget} session {periodLabel} target</Text>
                                            <View style={{ width: 8 }} />
                                            {sessionCompleted ? (
                                                <Ionicons name="checkmark-circle" size={18} color="#16A34A" />
                                            ) : (
                                                <Ionicons name="ellipse" size={14} color="#CBD5E1" />
                                            )}
                                        </View>
                                    </View>
                                );
                            }

                            if (durationHasGoal && !sessionHasGoal) {
                                return (
                                    <View style={{ alignItems: 'center' }}>
                                        <Text style={[styles.consistencyValue, { color: '#4B1528', fontSize: 20 }]}>{durationCurrentMin}m</Text>
                                        <Text style={[styles.consistencyLabel, { color: '#4B1528' }]}>duration completed</Text>

                                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
                                            <Text style={[styles.consistencyLabel, { color: '#64748B' }]}>{durationTargetMin}m {periodLabel} target</Text>
                                            <View style={{ width: 8 }} />
                                            {durationCompleted ? (
                                                <Ionicons name="checkmark-circle" size={18} color="#16A34A" />
                                            ) : (
                                                <Ionicons name="ellipse" size={14} color="#CBD5E1" />
                                            )}
                                        </View>
                                    </View>
                                );
                            }

                            // Otherwise (both false or both true) show both metrics compactly.
                            return (
                                <View style={{ alignItems: 'center' }}>
                                    <Text style={[styles.consistencyValue, { color: '#4B1528', fontSize: 16 }]}>{sessionCurrent} sessions</Text>
                                    <Text style={[styles.consistencyLabel, { color: '#4B1528' }]}>{durationCurrentMin}m duration</Text>
                                </View>
                            );
                        })()}
                    </View>
                </View>
            </View>
        </View>
    );
}
