import React, { useEffect, useRef, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Animated,
    Dimensions,
    PanResponder,
} from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { useTheme } from '@/constants/ThemeContext';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const moderateScale = (size: number, factor = 0.5) =>
    size + ((SCREEN_WIDTH - 375) / 375) * size * factor;

const RADIUS = 26;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

interface MudraFloatingTimerProps {
    durationInSeconds: number;
    isPlaying: boolean;
    onComplete?: () => void;
}

export default function MudraFloatingTimer({
    durationInSeconds,
    isPlaying,
    onComplete
}: MudraFloatingTimerProps) {
    const { colors, isDark } = useTheme();
    const [timeLeft, setTimeLeft] = useState(durationInSeconds);
    const [isExpanded, setIsExpanded] = useState(false);
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const expandAnim = useRef(new Animated.Value(0)).current;
    const pulseAnim = useRef(new Animated.Value(1)).current;
    const [isOnRightSide, setIsOnRightSide] = useState(true);
    const position = useRef(
        new Animated.ValueXY({
            x: SCREEN_WIDTH - moderateScale(90),
            y: SCREEN_HEIGHT * 0.45,
        }),
    ).current;
    // ── Sync with media player play/pause ────────────────────────────────────
    useEffect(() => {
        if (isPlaying) {
            startCountdown();
            startPulse();
        } else {
            stopCountdown();
            stopPulse();
        }
        return () => stopCountdown();
    }, [isPlaying]);

    // ── Reset on duration change ──────────────────────────────────────────────
    useEffect(() => {
        setTimeLeft(durationInSeconds);
    }, [durationInSeconds]);

    // ── Countdown ─────────────────────────────────────────────────────────────
    const startCountdown = () => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
        }

        timerRef.current = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    clearInterval(timerRef.current!);

                    onComplete?.();

                    return 0;
                }

                return prev - 1;
            });
        }, 1000);
    };

    const stopCountdown = () => {
        if (timerRef.current) clearInterval(timerRef.current);
    };

    // ── Pulse animation ───────────────────────────────────────────────────────
    const startPulse = () => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(pulseAnim, { toValue: 1.06, duration: 700, useNativeDriver: true }),
                Animated.timing(pulseAnim, { toValue: 1, duration: 700, useNativeDriver: true }),
            ])
        ).start();
    };

    const stopPulse = () => {
        pulseAnim.stopAnimation();
        Animated.timing(pulseAnim, { toValue: 1, duration: 150, useNativeDriver: true }).start();
    };

    // ── Expand/collapse ───────────────────────────────────────────────────────
    const toggleExpand = () => {
        const nextIsExpanded = !isExpanded;
        setIsExpanded(nextIsExpanded);

        if (isOnRightSide) {
            position.flattenOffset();
            const currentY = (position.y as any).__getValue();
            const targetX = SCREEN_WIDTH - (nextIsExpanded ? expandedWidth : collapsedWidth) - 12;

            Animated.spring(position, {
                toValue: {
                    x: targetX,
                    y: currentY,
                },
                useNativeDriver: false,
                bounciness: 6,
            }).start();
        }

        Animated.spring(expandAnim, {
            toValue: nextIsExpanded ? 1 : 0,
            useNativeDriver: false,
            bounciness: 5,
            speed: 14,
        }).start();
    };

    // ── Format time ───────────────────────────────────────────────────────────
    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    };

    const progress = durationInSeconds > 0 ? timeLeft / durationInSeconds : 0;
    const strokeDashoffset = CIRCUMFERENCE * (1 - progress);
    const isCompleted = timeLeft === 0;

    // ── Theme ─────────────────────────────────────────────────────────────────
    const bgColor = isDark ? '#1A1A2E' : '#FFFFFF';
    const borderColor = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)';
    const trackColor = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.07)';
    const progressColor = isCompleted ? '#22C55E' : '#9A85FE';
    const textColor = isDark ? '#FFFFFF' : '#0F0F0F';
    const subColor = isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.35)';

    // ── Expanded width ────────────────────────────────────────────────────────
    const collapsedWidth = moderateScale(72);
    const expandedWidth = moderateScale(180);

    const containerWidth = expandAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [collapsedWidth, expandedWidth],
    });
    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => false,

            onMoveShouldSetPanResponder: (_, gestureState) =>
                Math.abs(gestureState.dx) > 5 ||
                Math.abs(gestureState.dy) > 5,

            onPanResponderGrant: () => {
                position.extractOffset();
            },

            onPanResponderMove: Animated.event(
                [null, { dx: position.x, dy: position.y }],
                {
                    useNativeDriver: false,
                }
            ),

            onPanResponderRelease: () => {
                position.flattenOffset();

                let x = (position.x as any).__getValue();
                let y = (position.y as any).__getValue();

                const snapX =
                    x < SCREEN_WIDTH / 2
                        ? 12
                        : SCREEN_WIDTH - (isExpanded ? expandedWidth : collapsedWidth) - 12;
                setIsOnRightSide(snapX > SCREEN_WIDTH / 2);

                const maxY = SCREEN_HEIGHT - 120;

                y = Math.max(50, Math.min(y, maxY));

                Animated.spring(position, {
                    toValue: {
                        x: snapX,
                        y,
                    },
                    useNativeDriver: false,
                    bounciness: 6,
                }).start();
            },
        })
    ).current;

    return (
        <Animated.View
            {...panResponder.panHandlers}
            style={[
                styles.floatingContainer,
                {
                    transform: position.getTranslateTransform(),
                },
            ]}
        >
            <TouchableOpacity
                onPress={toggleExpand}
                activeOpacity={0.9}
            >
                <Animated.View
                    style={[
                        styles.container,
                        {
                            backgroundColor: bgColor,
                            borderColor,
                            width: isExpanded
                                ? moderateScale(180)
                                : moderateScale(72),
                        },
                    ]}
                >
                    {/* ── Ring + Timer ── */}
                    {/* Left side content (only when bubble is on the right) */}
                    {isOnRightSide && isExpanded && (
                        <View style={[styles.expandedContent, { marginLeft: moderateScale(20), marginRight: moderateScale(10) }]}>
                            <Text style={[styles.timerText, { color: textColor }]}>
                                {formatTime(timeLeft)}
                            </Text>
                            <Text style={[styles.timerLabel, { color: subColor }]}>
                                {isCompleted ? 'Done!' : isPlaying ? 'Running' : 'Paused'}
                            </Text>
                        </View>
                    )}

                    {/* Timer Bubble */}
                    <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
                        <View style={styles.ringWrapper}>
                            <Svg
                                width={moderateScale(60)}
                                height={moderateScale(60)}
                                viewBox="0 0 60 60"
                            >
                                <Circle
                                    cx={30}
                                    cy={30}
                                    r={RADIUS}
                                    stroke={trackColor}
                                    strokeWidth={4}
                                    fill="none"
                                />

                                <Circle
                                    cx={30}
                                    cy={30}
                                    r={RADIUS}
                                    stroke={progressColor}
                                    strokeWidth={4}
                                    fill="none"
                                    strokeDasharray={CIRCUMFERENCE}
                                    strokeDashoffset={strokeDashoffset}
                                    strokeLinecap="round"
                                    rotation="-90"
                                    origin="30,30"
                                />
                            </Svg>

                            <View style={styles.ringCenter}>
                                {isCompleted ? (
                                    <Text style={styles.completedEmoji}>✓</Text>
                                ) : (
                                    <Text style={[styles.timerIcon, { color: progressColor }]}>
                                        ⏱
                                    </Text>
                                )}
                            </View>
                        </View>
                    </Animated.View>

                    {/* Right side content (only when bubble is on the left) */}
                    {!isOnRightSide && isExpanded && (
                        <View style={[styles.expandedContent, { marginLeft: moderateScale(10), marginRight: moderateScale(10) }]}>
                            <Text style={[styles.timerText, { color: textColor }]}>
                                {formatTime(timeLeft)}
                            </Text>

                            <Text style={[styles.timerLabel, { color: subColor }]}>
                                {isCompleted ? 'Done!' : isPlaying ? 'Running' : 'Paused'}
                            </Text>
                        </View>
                    )}

                </Animated.View>
            </TouchableOpacity>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: moderateScale(40),
        borderWidth: 1,
        paddingVertical: moderateScale(6),
        paddingHorizontal: moderateScale(6),
        gap: moderateScale(8),
        shadowColor: '#9A85FE',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
        elevation: 6,
        overflow: 'hidden',
    },
    ringWrapper: {
        width: moderateScale(60),
        height: moderateScale(60),
        alignItems: 'center',
        justifyContent: 'center',
    },
    ringCenter: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
    },
    statusDot: {
        fontSize: moderateScale(14),
    },
    completedEmoji: {
        fontSize: moderateScale(16),
        color: '#22C55E',
        fontWeight: '700',
    },
    expandedContent: {
        flex: 1,
    },
    timerText: {
        fontFamily: 'SF-Pro-Display',
        fontSize: moderateScale(16),
        fontWeight: '700',
        letterSpacing: -0.5,
    },
    timerLabel: {
        fontFamily: 'SF-Pro-Display',
        fontSize: moderateScale(11),
        fontWeight: '400',
        marginTop: 1,
    },
    floatingContainer: {
        position: 'absolute',
        zIndex: 9999,
    },
    timerIcon: {
        fontSize: moderateScale(18),
    },
});