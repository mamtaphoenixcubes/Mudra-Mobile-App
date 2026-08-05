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

function DonutChart({ textColor }: { textColor: string }) {
    let offset = 0;
    const CENTER = DONUT_SIZE / 2;
    const LABEL_RADIUS = R + STROKE / 2 + 16;

    return (
        <View style={{ width: DONUT_SIZE + 50, height: DONUT_SIZE + 50, alignItems: 'center', justifyContent: 'center' }}>
            <Svg width={DONUT_SIZE} height={DONUT_SIZE}>
                <G rotation="-90" origin={`${CENTER}, ${CENTER}`}>
                    {SEGMENTS.map((seg, i) => {
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
                return SEGMENTS.map((seg, i) => {
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

export default function PracticeAnalysis() {
    const { colors, isDark } = useTheme()
    const styles = getProgressInsightsStyles(colors)
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
                        <DonutChart textColor={colors.text} />
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
                        You practice Mudra Meditation the most.
                    </Text>
                </View>
            </View>
        </View>
    );
}