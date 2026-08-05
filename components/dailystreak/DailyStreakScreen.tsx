import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Share } from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getStreakStyles } from '@/assets/styles/streak/streakStyles';
import { useTheme } from '@/constants/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import ClockSvg from '@/assets/icons/clock.svg';
import LotusBlack from '@/assets/icons/LotusBlack.svg';
import FireSvg from '@/assets/icons/Fire.svg';
import QuoteSvg from '@/assets/icons/Quote.svg';
import ShareSvg from '@/assets/icons/share.svg';
import BookmarkSvg from '@/assets/icons/bookmark.svg';
import DailyUpdateSvg from '@/assets/icons/DailyUpdate.svg';
import StandaloneTabBar from '@/components/home/StandaloneTabBar';
import ShareWhite from '@/assets/icons/shareWhite.svg';
import BookmarkWhite from '@/assets/icons/bookmarkWhite.svg';
import DailyUpdateWhite from '@/assets/icons/DailyUpdateWhite.svg';
import {
    useStreakStore,
    getCurrentStreak,
    getBestStreak,
    getWeekCompletionMap,
    getThisWeekStats,
    getAllTimeSessionCount,
    formatMinutesAsHoursMinutes,
} from '@/store/streakStore';

const DAY_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export default function DailyStreakScreen() {
    const insets = useSafeAreaInsets();
    const { colors, isDark } = useTheme();
    const styles = getStreakStyles(colors);

    const events = useStreakStore((s) => s.events);

    const currentStreak = getCurrentStreak(events);
    const bestStreak = getBestStreak(events);
    const weekCompletionMap = getWeekCompletionMap(events);
    const { sessionCount: sessionsThisWeek, totalMinutes: minutesThisWeek } = getThisWeekStats(events);
    const allTimeSessions = getAllTimeSessionCount(events);

    const handleShare = async () => {
        try {
            await Share.share({
                message: `I'm on a ${currentStreak}-day streak with my Mudras practice! 🔥`,
            });
        } catch (err) {
            console.log('Share error:', err);
        }
    };

    const handleBackToHome = () => {
        router.replace('/(tabs)');
    };

    const STATS = [
        {
            icon: <ClockSvg width={22} height={22} />,
            label: 'Total Time',
            value: formatMinutesAsHoursMinutes(minutesThisWeek),
            sub: 'This Week',
        },
        {
            icon: <LotusBlack width={22} height={22} />,
            label: 'Session',
            value: String(sessionsThisWeek),
            sub: 'This Week',
        },
        {
            icon: <FireSvg width={22} height={22} />,
            label: 'Current Streak',
            value: `${currentStreak} Days`,
            sub: `Best: ${bestStreak} Days`,
        },
    ];

    return (
        <View style={styles.screen}>
            {/* Close button */}
            <TouchableOpacity
                style={[styles.closeBtn, { top: insets.top + 12 }]}
                onPress={() => router.back()}
                activeOpacity={0.7}
            >
                <Ionicons name="close" size={24} color={colors.text} />
            </TouchableOpacity>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: insets.bottom + 120 }}
            >
                {/* Hero */}
                <View style={styles.heroContainer}>
                    <Image
                        source={require('@/assets/images/Pranayama_Images/DailyStreak.png')}
                        style={styles.heroImage}
                        resizeMode="cover"
                    />
                    <Text style={styles.heroTitle}>Amazing Streak!</Text>
                    <Text style={styles.heroSubtitle}>
                        You're building a beautiful habit.{'\n'}Keep going!
                    </Text>
                </View>

                {/* Streak Card */}
                <View style={styles.streakCardContainer}>
                    <View style={styles.streakCard}>
                        <Text style={styles.streakCardLabel}>
                            You've maintained your streak for
                        </Text>
                        <Text style={styles.streakNumber}>{currentStreak}</Text>
                        <Text style={styles.streakDaysLabel}>Days in a row!</Text>

                        <View style={styles.streakDivider} />

                        {/* Week days */}
                        <View style={styles.weekRow}>
                            {DAY_LABELS.map((day, i) => (
                                <View key={i} style={styles.weekDayCol}>
                                    <Text style={styles.weekDayLabel}>{day}</Text>
                                    <View style={styles.weekDayCircle}>
                                        {weekCompletionMap[i] && (
                                            isDark
                                                ? <DailyUpdateWhite width={16} height={16} />
                                                : <DailyUpdateSvg width={16} height={16} />
                                        )}
                                    </View>
                                </View>
                            ))}
                        </View>

                        <View style={styles.streakDivider} />

                        {/* Sessions */}
                        <Text style={styles.sessionsLabel}>Total Sessions Completed</Text>
                        <Text style={styles.sessionsNumber}>{allTimeSessions}</Text>
                        <Text style={styles.sessionsUnit}>Sessions</Text>
                    </View>
                </View>

                {/* Stats Row */}
                <View style={styles.statsContainer}>
                    <View style={styles.statsCard}>
                        {STATS.map((stat, i) => (
                            <React.Fragment key={i}>
                                <View style={styles.statItem}>
                                    <View style={styles.statIconCircle}>
                                        {stat.icon}
                                    </View>
                                    <Text style={styles.statLabel}>{stat.label}</Text>
                                    <Text style={styles.statValue}>{stat.value}</Text>
                                    <Text style={styles.statSubLabel}>{stat.sub}</Text>
                                </View>
                                {i < STATS.length - 1 && <View style={styles.statDivider} />}
                            </React.Fragment>
                        ))}
                    </View>
                </View>

                {/* Quote Card */}
                <View style={styles.quoteContainer}>
                    <View style={styles.quoteCard}>
                        <View style={styles.quoteIconCircle}>
                            <QuoteSvg width={22} height={22} />
                        </View>
                        <View style={styles.quoteTextBlock}>
                            <Text style={styles.quoteText}>
                                Consistency is the bridge{'\n'}
                                between intention and transformation.
                            </Text>
                            <Text style={styles.quoteAttribution}>
                                - Keep showing up for yourself.
                            </Text>
                        </View>
                    </View>
                </View>

                {/* Action Buttons */}
                <View style={styles.actionsContainer}>
                    <TouchableOpacity style={styles.actionBtn} activeOpacity={0.8} onPress={handleShare}>
                        {isDark ? <ShareWhite width={20} height={20} /> : <ShareSvg width={20} height={20} />}
                        <Text style={styles.actionBtnText}>Share My Streak</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.actionBtn} activeOpacity={0.8} onPress={handleBackToHome}>
                        {isDark ? <BookmarkWhite width={20} height={20} /> : <BookmarkSvg width={20} height={20} />}
                        <Text style={styles.actionBtnText}>Back to Home</Text>
                    </TouchableOpacity>
                </View>

                {/* View Progress */}
                <TouchableOpacity
                    style={styles.viewProgressBtn}
                    onPress={() => router.push('/progressinsights')}
                    activeOpacity={0.7}
                >
                    <Text style={styles.viewProgressText}>View My Progress</Text>
                </TouchableOpacity>
            </ScrollView>

            <StandaloneTabBar />
        </View>
    );
}