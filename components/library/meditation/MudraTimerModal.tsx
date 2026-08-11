import React, { useEffect, useRef, useState } from 'react';
import {
    Modal,
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Animated,
    Easing,
} from 'react-native';
import axios from 'axios';
import { useRouter } from 'expo-router';
import { Audio } from 'expo-av';
import Svg, { Circle } from 'react-native-svg';
import { useTheme } from '@/constants/ThemeContext';

const BEEP_SOUND = require('@/assets/audio/meditationalerttune/alerttuneone.mp3')

interface MudraTimerModalProps {
    visible: boolean;
    durationInMinutes: number;
    selectedDuration: number;
    remainingDuration?: number | null;
    lastSessionDuration?: number | null;
    mudraId: string;
    mudraName: string;
    profileDocumentId: string;
    bgMusicUrl?: string | null;
    onClose: () => void;
}

const RADIUS = 90;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const MudraTimerModal = ({
    visible,
    durationInMinutes,
    selectedDuration,
    remainingDuration,
    lastSessionDuration,
    mudraId,
    mudraName,
    profileDocumentId,
    bgMusicUrl,
    onClose,
}: MudraTimerModalProps) => {
    const { isDark } = useTheme();
    const router = useRouter();

    const [timeLeft, setTimeLeft] = useState(0);
    const [totalTime, setTotalTime] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [hasStarted, setHasStarted] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);

    const hasCompletedRef = useRef(false);
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const pulseAnim = useRef(new Animated.Value(1)).current;
    const bgmSoundRef = useRef<Audio.Sound | null>(null);
    const beepSoundRef = useRef<Audio.Sound | null>(null);

    // ── Pulse animation ──────────────────────────────────────────────────────
    const startPulse = () => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(pulseAnim, { toValue: 1.04, duration: 800, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
                Animated.timing(pulseAnim, { toValue: 1, duration: 800, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
            ])
        ).start();
    };

    const stopPulse = () => {
        pulseAnim.stopAnimation();
        pulseAnim.setValue(1);
    };

    // ── BGM ──────────────────────────────────────────────────────────────────
const startBgm = async () => {
    if (!bgMusicUrl) return;

    try {
        await Audio.setAudioModeAsync({
            playsInSilentModeIOS: true,
        });

        const source =
            typeof bgMusicUrl === 'string'
                ? { uri: bgMusicUrl }
                : bgMusicUrl;

        const { sound } = await Audio.Sound.createAsync(
            source,
            {
                shouldPlay: true,
                isLooping: true,
                volume: 0.4,
            }
        );

        bgmSoundRef.current = sound;

    } catch (e) {
        console.log('BGM error:', e);
    }
};

    const pauseBgm = async () => {
        try {
            await bgmSoundRef.current?.pauseAsync();
        } catch (e) { }
    };

   const resumeBgm = async () => {
    if (!bgMusicUrl) return;

    try {
        await bgmSoundRef.current?.playAsync();
    } catch (e) {
        console.log('Resume BGM error:', e);
    }
};

    const stopBgm = async () => {
        try {
            await bgmSoundRef.current?.stopAsync();
            await bgmSoundRef.current?.unloadAsync();
            bgmSoundRef.current = null;
        } catch (e) { }
    };

    // ── Beep ─────────────────────────────────────────────────────────────────
    const playBeep = async () => {
        try {
            const { sound } = await Audio.Sound.createAsync(
                BEEP_SOUND,
                { shouldPlay: true }
            );
            beepSoundRef.current = sound;
            await sound.playAsync();
        } catch (e) {
            console.log('Beep error:', e);
        }
    };

    // ── Timer ─────────────────────────────────────────────────────────────────
    const startTimer = () => {
        if (timerRef.current) clearInterval(timerRef.current);
        timerRef.current = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    clearInterval(timerRef.current!);
                    handleComplete();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };

    // ── Init ──────────────────────────────────────────────────────────────────
    useEffect(() => {
        if (!visible) return;

        const shouldResume =
            remainingDuration &&
            remainingDuration > 0 &&
            lastSessionDuration &&
            selectedDuration * 60 === lastSessionDuration;

        const totalSeconds = shouldResume
            ? remainingDuration
            : selectedDuration * 60;

        setTimeLeft(totalSeconds);
        setTotalTime(totalSeconds);
        setIsPaused(false);
        setHasStarted(false);
        setIsCompleted(false);
        hasCompletedRef.current = false;

        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
            stopPulse();
            stopBgm();
        };
    }, [visible]);

    // ── Save progress ─────────────────────────────────────────────────────────
    const saveProgress = async () => {
        if (!mudraId || !profileDocumentId) return;
        try {
            await axios.post(
                `${process.env.EXPO_PUBLIC_API_URL}/mudras/${mudraId}/progress`,
                { profileDocumentId, remainingDuration: timeLeft, sessionDuration: selectedDuration * 60 }
            );
        } catch (error) {
            console.log('SAVE_PROGRESS_ERROR', error);
        }
    };

    // ── Complete session ──────────────────────────────────────────────────────
    const handleComplete = async () => {
        if (hasCompletedRef.current) return;
        hasCompletedRef.current = true;

        setIsCompleted(true);
        stopPulse();
        await stopBgm();
        await playBeep();

        if (!mudraId || !profileDocumentId) return;
        try {
            const completeRes = await axios.post(
                `${process.env.EXPO_PUBLIC_API_URL}/mudras/${mudraId}/complete`,
                { profileDocumentId, completedDuration: durationInMinutes * 60 }
            );
            console.log(completeRes, "resss")
            console.log('COMPLETE RESPONSE:', JSON.stringify(completeRes.data));
            const activityId = completeRes?.data?.data?.activityDocumentId ?? completeRes?.data?.activityDocumentId ?? null;
            onClose();
            router.replace({
                pathname: '/sessioncomplete',
                params: {
                    mudraId,
                    title: mudraName,
                    duration: String(durationInMinutes),
                    completedAt: new Date().toISOString(),
                    activityId: activityId ?? '',
                },
            });
        } catch (error: any) {
            hasCompletedRef.current = false;
            console.log('COMPLETE_SESSION_ERROR', error.response?.data || error.message);
        }
    };

    // ── Handlers ──────────────────────────────────────────────────────────────
    const handleStart = async () => {
        setHasStarted(true);
        setIsPaused(false);
        startTimer();
        startPulse();
        await startBgm();
    };

    const handlePauseResume = async () => {
        if (isPaused) {
            startTimer();
            setIsPaused(false);
            startPulse();
            await resumeBgm();
        } else {
            if (timerRef.current) clearInterval(timerRef.current);
            setIsPaused(true);
            stopPulse();
            await pauseBgm();
            await saveProgress();
        }
    };

    const handleClose = () => {
        if (timerRef.current) clearInterval(timerRef.current);
        stopPulse();
        stopBgm();
        onClose();
    };

    // ── Helpers ───────────────────────────────────────────────────────────────
    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    };

    const progress = totalTime > 0 ? timeLeft / totalTime : 1;
    const strokeDashoffset = CIRCUMFERENCE * (1 - progress);

    // ── Theme ─────────────────────────────────────────────────────────────────
    const modalBg = isDark ? '#1A1A2E' : '#FFFFFF';
    const textColor = isDark ? '#FFFFFF' : '#0F0F0F';
    const subTextColor = isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.4)';
    const trackColor = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)';
    const closeBg = isDark ? '#2A2A3A' : '#F4F4F8';
    const checkboxBg = isDark ? '#2A2A3A' : '#F4F4F8';
    const checkboxBorder = isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.15)';

    return (
        <Modal visible={visible} transparent animationType="fade" onRequestClose={handleClose}>
            <View style={styles.overlay}>
                <View style={[styles.modal, { backgroundColor: modalBg }]}>

                    {/* Title */}
                    <Text style={[styles.title, { color: textColor }]}>
                        Meditation Timer
                    </Text>
                   <Text style={[styles.subtitle, { color: subTextColor }]}>
                        {Math.floor(durationInMinutes)} minute session
                    </Text>

                 

                    {/* Circular Progress */}
                    <View style={styles.circleWrapper}>
                        <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
                            <Svg width={220} height={220} viewBox="0 0 220 220">
                                <Circle
                                    cx={110} cy={110} r={RADIUS}
                                    stroke={trackColor}
                                    strokeWidth={10}
                                    fill="none"
                                />
                                <Circle
                                    cx={110} cy={110} r={RADIUS}
                                    stroke="#9A85FE"
                                    strokeWidth={10}
                                    fill="none"
                                    strokeDasharray={CIRCUMFERENCE}
                                    strokeDashoffset={strokeDashoffset}
                                    strokeLinecap="round"
                                    rotation="-90"
                                    origin="110, 110"
                                />
                            </Svg>
                        </Animated.View>

                        <View style={styles.timerOverlay}>
                            <Text style={[styles.timer, { color: textColor }]}>
                                {formatTime(timeLeft)}
                            </Text>
                            <Text style={[styles.timerLabel, { color: subTextColor }]}>
                                {!hasStarted ? 'Ready' : isPaused ? 'Paused' : 'Remaining'}
                            </Text>
                        </View>
                    </View>

                    {/* Buttons */}
                    <View style={styles.buttonRow}>
                        {!hasStarted ? (
                            <TouchableOpacity
                                style={styles.primaryButton}
                                onPress={handleStart}
                                activeOpacity={0.85}
                            >
                                <Text style={styles.primaryText}>Start</Text>
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity
                                style={[styles.primaryButton, isCompleted && styles.disabledButton]}
                                onPress={handlePauseResume}
                                disabled={isCompleted}
                                activeOpacity={0.85}
                            >
                                <Text style={styles.primaryText}>
                                    {isPaused ? 'Resume' : 'Pause'}
                                </Text>
                            </TouchableOpacity>
                        )}

                        <TouchableOpacity
                            style={[styles.closeButton, { backgroundColor: closeBg }]}
                            onPress={handleClose}
                            activeOpacity={0.85}
                        >
                            <Text style={[styles.closeText, { color: textColor }]}>Close</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </View>
        </Modal>
    );
};

export default MudraTimerModal;

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.6)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modal: {
        width: '88%',
        borderRadius: 28,
        paddingHorizontal: 28,
        paddingTop: 32,
        paddingBottom: 28,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.2,
        shadowRadius: 20,
        elevation: 10,
    },
    title: {
        fontFamily: 'SF-Pro-Display',
        fontSize: 20,
        fontWeight: '700',
        marginBottom: 4,
    },
    subtitle: {
        fontFamily: 'SF-Pro-Display',
        fontSize: 13,
        fontWeight: '400',
        marginBottom: 20,
    },
    bgmRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        borderWidth: 1,
        borderRadius: 12,
        paddingHorizontal: 14,
        paddingVertical: 12,
        marginBottom: 20,
        width: '100%',
    },
    checkbox: {
        width: 22,
        height: 22,
        borderRadius: 6,
        borderWidth: 1.5,
        borderColor: '#9A85FE',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
    },
    checkboxActive: {
        backgroundColor: '#9A85FE',
        borderColor: '#9A85FE',
    },
    checkmark: {
        color: '#FFFFFF',
        fontSize: 13,
        fontWeight: '700',
    },
    bgmLabel: {
        fontFamily: 'SF-Pro-Display',
        fontSize: 14,
        fontWeight: '400',
        flex: 1,
    },
    circleWrapper: {
        width: 220,
        height: 220,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 28,
    },
    timerOverlay: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
    },
    timer: {
        fontFamily: 'SF-Pro-Display',
        fontSize: 48,
        fontWeight: '700',
        letterSpacing: -1,
    },
    timerLabel: {
        fontFamily: 'SF-Pro-Display',
        fontSize: 13,
        fontWeight: '400',
        marginTop: 4,
    },
    buttonRow: {
        flexDirection: 'row',
        gap: 12,
        width: '100%',
    },
    primaryButton: {
        flex: 1,
        backgroundColor: '#9A85FE',
        paddingVertical: 14,
        borderRadius: 14,
        alignItems: 'center',
    },
    primaryText: {
        fontFamily: 'SF-Pro-Display',
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },
    disabledButton: {
        opacity: 0.4,
    },
    closeButton: {
        flex: 1,
        paddingVertical: 14,
        borderRadius: 14,
        alignItems: 'center',
    },
    closeText: {
        fontFamily: 'SF-Pro-Display',
        fontSize: 16,
        fontWeight: '600',
    },
});