import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Svg, { Circle, G } from 'react-native-svg';
// import { progressInsightsStyles as styles } from '@/assets/styles/progressinsights/progressInsightsStyles';
import { getProgressInsightsStyles } from '@/assets/styles/progressinsights/progressInsightsStyles'
import { useTheme } from '@/constants/ThemeContext'
import LotusBlack from '@/assets/icons/LotusBlack.svg';
import LotusWhite from '@/assets/icons/LotusWhite.svg';
import { router } from 'expo-router';


const LEGEND = [
    { name: 'Mudra Meditation', time: '1h 20m', percent: '40%', color: '#9A85FE' },
    { name: 'Yoga Nidra', time: '1h 10m', percent: '35%', color: '#C6BAFF' },
    { name: 'Element Balance', time: '55m', percent: '25%', color: '#DED8FF' },
];

const DONUT_SIZE = 130;
const STROKE = 22;
const R = (DONUT_SIZE - STROKE) / 2;
const CIRCUMFERENCE = 2 * Math.PI * R;

const SEGMENTS = [
    { percent: 0.40, color: '#9A85FE' },
    { percent: 0.35, color: '#C6BAFF' },
    { percent: 0.25, color: '#DED8FF' },
];

function DonutChart({
    textColor,
    segments,
}: {
    textColor: string;
    segments: { percent: number; color: string }[];
}) {
    let offset = 0;
    const CENTER = DONUT_SIZE / 2;
    const LABEL_RADIUS = R + STROKE / 2 + 16;

    return (
        <View style={{ width: DONUT_SIZE + 50, height: DONUT_SIZE + 50, alignItems: 'center', justifyContent: 'center' }}>
            <Svg width={DONUT_SIZE} height={DONUT_SIZE}>
                <G rotation="-90" origin={`${CENTER}, ${CENTER}`}>
                    {segments.map((seg, i) => {
                        const dash = CIRCUMFERENCE * seg.percent;
                        const gap = CIRCUMFERENCE - dash;
                        const circle = (
                            <Circle
                                key={i}
                                cx={CENTER}
                                cy={CENTER}
                                r={R}
                                fill="none"
                                stroke={seg.color}
                                strokeWidth={STROKE}
                                strokeDasharray={`${dash} ${gap}`}
                                strokeDashoffset={-CIRCUMFERENCE * offset}
                            />
                        );
                        offset += seg.percent;
                        return circle;
                    })}
                </G>
            </Svg>

            {/* Percentage labels outside ring */}
            {(() => {
                let labelOffset = 0;
                return segments.map((seg, i) => {
                    const startAngle = -90 + labelOffset * 360;
                    const midAngle = startAngle + (seg.percent * 360) / 2;
                    const rad = (midAngle * Math.PI) / 180;
                    const x = CENTER + 25 + LABEL_RADIUS * Math.cos(rad);
                    const y = CENTER + 25 + LABEL_RADIUS * Math.sin(rad);
                    labelOffset += seg.percent;
                    return (
                        <Text
                            key={i}
                            style={{
                                position: 'absolute',
                                left: x - 14,
                                top: y - 8,
                                fontFamily: 'SF-Pro-Display',
                                fontWeight: '500',
                                fontSize: 12,
                                // color: '#0F0F0F',
                                color: textColor,
                            }}
                        >
                            {Math.round(seg.percent * 100)}%
                        </Text>
                    );
                });
            })()}
        </View>
    );
}

interface PracticeAnalysisProps {
    distribution?: {
        mudra?: {
            sessions: number;
            duration: number;
        };
        nidra?: {
            sessions: number;
            duration: number;
        };
    };
}

export default function PracticeAnalysis({
    distribution,
}: PracticeAnalysisProps) {
    const { colors, isDark } = useTheme()
    const styles = getProgressInsightsStyles(colors);
    const totalDuration =
    (distribution?.mudra?.duration ?? 0) +
    (distribution?.nidra?.duration ?? 0);

const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);

    if (hours > 0) {
        return `${hours}h ${minutes}m`;
    }

    return `${minutes}m`;
};

const LEGEND = [
    {
        name: 'Mudra Meditation',
        time: formatDuration(distribution?.mudra?.duration ?? 0),
        percent:
            totalDuration > 0
                ? `${Math.round(
                      ((distribution?.mudra?.duration ?? 0) / totalDuration) *
                          100
                  )}%`
                : '0%',
        color: '#9A85FE',
    },
    {
        name: 'Yoga Nidra',
        time: formatDuration(distribution?.nidra?.duration ?? 0),
        percent:
            totalDuration > 0
                ? `${Math.round(
                      ((distribution?.nidra?.duration ?? 0) / totalDuration) *
                          100
                  )}%`
                : '0%',
        color: '#C6BAFF',
    },
];
const SEGMENTS = [
    {
        percent:
            totalDuration > 0
                ? (distribution?.mudra?.duration ?? 0) / totalDuration
                : 0,
        color: '#9A85FE',
    },
    {
        percent:
            totalDuration > 0
                ? (distribution?.nidra?.duration ?? 0) / totalDuration
                : 0,
        color: '#C6BAFF',
    },
];
const mostPracticed =
    (distribution?.mudra?.duration ?? 0) >=
    (distribution?.nidra?.duration ?? 0)
        ? 'Mudra Meditation'
        : 'Yoga Nidra';
    return (
        <View style={styles.analysisContainer}>
            <View style={styles.sectionHeaderRow}>
                <Text style={styles.sectionTitle}>1. Practice Analysis (by Type)</Text>
                <TouchableOpacity activeOpacity={0.7}
                    onPress={() => router.push('/practiceanalysis')}>
                    <Text style={styles.sectionLink}>View All &gt;</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.analysisCard}>
                <View style={styles.analysisInner}>
                    <View style={styles.donutWrapper}>
                        <DonutChart
                            textColor={colors.text}
                            segments={SEGMENTS}
                        />
                        <View style={styles.donutLabelWrapper}>
                            {isDark
                                ? <LotusWhite width={28} height={28} />
                                : <LotusBlack width={28} height={28} />
                            }
                        </View>
                    </View>

                    <View style={styles.analysisDivider} />

                    <View style={styles.legendBlock}>
                        {LEGEND.map((item, i) => (
                            <View key={i} style={styles.legendRow}>
                                <View style={[styles.legendDot, { backgroundColor: item.color }]} />
                                <View style={styles.legendTextBlock}>
                                    <Text style={styles.legendName}>{item.name}</Text>
                                    <Text style={styles.legendTime}>{item.time}</Text>
                                </View>
                                <Text style={styles.legendPercent}>{item.percent}</Text>
                            </View>
                        ))}
                    </View>
                </View>

                <View style={styles.analysisFooter}>
                   <Text style={styles.analysisFooterText}>
                    You practice {mostPracticed} the most.
                </Text>
                </View>
            </View>
        </View>
    );
}