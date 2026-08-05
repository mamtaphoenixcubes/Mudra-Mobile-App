import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Image,
} from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
// import { sessionCompleteStyles as styles } from '@/assets/styles/sessioncomplete/sessionCompleteStyles';
import { getSessionCompleteStyles } from '@/assets/styles/sessioncomplete/sessionCompleteStyles'
import { useTheme } from '@/constants/ThemeContext'
import { Ionicons } from '@expo/vector-icons';
import ClockSvg from '@/assets/icons/clock.svg';
import LotusBlack from '@/assets/icons/LotusBlack.svg';
import CalenderIcon from '@/assets/icons/CalenderIcon.svg';
import FavouriteSvg from '@/assets/icons/Favourite.svg';
import RateSvg from '@/assets/icons/rate.svg';
import BookmarkSvg from '@/assets/icons/bookmark.svg';
import ShareSvg from '@/assets/icons/share.svg';
import AmazingSvg from '@/assets/icons/Amazing.svg';
import GoodSvg from '@/assets/icons/Good.svg';
import OkaySvg from '@/assets/icons/Okay.svg';
import NotGoodSvg from '@/assets/icons/NotGood.svg';
import BadSvg from '@/assets/icons/bad.svg';
import HomeSvg from '@/assets/icons/home.svg';
import StandaloneTabBar from '@/components/home/StandaloneTabBar';
import ClockWhite from '@/assets/icons/ClockWhite.svg'
import LotusWhite from '@/assets/icons/LotusWhite.svg'
import CalenderIconWhite from '@/assets/icons/CalenderIconWhite.svg'
import FavouriteWhite from '@/assets/icons/FavouriteWhite.svg'
import RateWhite from '@/assets/icons/rateWhite.svg'
import BookmarkWhite from '@/assets/icons/bookmarkWhite.svg'
import ShareWhite from '@/assets/icons/shareWhite.svg'
import HomeWhite from '@/assets/icons/homeWhite.svg'
import { useLocalSearchParams } from 'expo-router';
import { useMudraStore } from '@/store/mudraStore';
import { useStreakStore } from '@/store/streakStore';
import axios from 'axios';

const MOODS = [
    { id: 'amazing', label: 'Amazing', icon: <AmazingSvg width={26} height={26} /> },
    { id: 'good', label: 'Good', icon: <GoodSvg width={26} height={26} /> },
    { id: 'okay', label: 'Okay', icon: <OkaySvg width={26} height={26} /> },
    { id: 'notgood', label: 'Not Good', icon: <NotGoodSvg width={26} height={26} /> },
    { id: 'bad', label: 'Bad', icon: <BadSvg width={26} height={26} /> },
];

const MOOD_TO_RATING: Record<string, string> = {
    amazing: 'AMAZING',
    good: 'GOOD',
    okay: 'OKAY',
    notgood: 'NOT_GOOD',
    bad: 'BAD',
};



export default function SessionCompleteScreen() {
    const insets = useSafeAreaInsets();
    const [selectedMood, setSelectedMood] = useState<string | null>(null);
    const [submittingFeedback, setSubmittingFeedback] = useState(false);
    const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
    const hasRecordedSession = useRef(false);

    const { activityId } = useLocalSearchParams<{ activityId?: string }>();
    const { colors, isDark } = useTheme()
    const styles = getSessionCompleteStyles(colors);
    const { title, duration, completedAt } = useLocalSearchParams<{
        title?: string;
        duration?: string;
        completedAt?: string;
    }>();

    const selectedMudra = useMudraStore((s) => s.selectedMudra);
    const mudraName = title ?? selectedMudra?.name ?? 'Session';

    const formattedDuration = duration ? `${duration} min` : '';

    useEffect(() => {
        if (hasRecordedSession.current) return;
        hasRecordedSession.current = true;

        const minutes = Number(duration);
        console.log('RECORDING SESSION:', minutes);
        // useStreakStore.getState().recordSessionCompleted(Number.isNaN(minutes) ? 0 : minutes);
        useStreakStore.getState().recordSessionCompleted(Number.isNaN(minutes) ? 0 : minutes, 'mudra');
    }, [duration]);

    const formattedDate = completedAt
        ? new Date(completedAt).toLocaleString(undefined, {
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
        })
        : '';

    const INSIGHTS = [
        { icon: isDark ? <ClockWhite width={18} height={18} /> : <ClockSvg width={18} height={18} />, label: 'Time Spent', value: duration ? `${duration}:00` : '20:00' },
        { icon: isDark ? <FavouriteWhite width={18} height={18} /> : <FavouriteSvg width={18} height={18} />, label: 'Average Heart Rate', value: '72 bpm' },
        { icon: isDark ? <RateWhite width={18} height={18} /> : <RateSvg width={18} height={18} />, label: 'Breathing Rate', value: '12 breaths/min' },
    ]

    // const handleSubmitFeedback = async () => {
    //     console.log('DEBUG - selectedMood:', selectedMood, '| activityId:', activityId, '| submitting:', submittingFeedback);
    //     if (!selectedMood || !activityId || submittingFeedback) return;

    //     try {
    //         setSubmittingFeedback(true);
    //         await axios.post(
    //             `${process.env.EXPO_PUBLIC_API_URL}/user-mudra-activities/${activityId}/feedback`,
    //             { experienceRating: MOOD_TO_RATING[selectedMood] }
    //         );
    //     } catch (error: any) {
    //         console.log('FEEDBACK_SUBMIT_ERROR', error.response?.data || error.message);
    //     } finally {
    //         setSubmittingFeedback(false);
    //         router.replace('/(tabs)');
    //     }
    // };
    const handleSubmitFeedback = async () => {
        if (!selectedMood || !activityId || submittingFeedback) return;

        try {
            setSubmittingFeedback(true);
            await axios.post(
                `${process.env.EXPO_PUBLIC_API_URL}/user-mudra-activities/${activityId}/feedback`,
                { experienceRating: MOOD_TO_RATING[selectedMood] }
            );

            setSubmittingFeedback(false);
            setFeedbackSubmitted(true);

            setTimeout(() => {
                router.replace('/(tabs)');
            }, 1400);
        } catch (error: any) {
            console.log('FEEDBACK_SUBMIT_ERROR', error.response?.data || error.message);
            setSubmittingFeedback(false);
        }
    };


    return (
        <View style={styles.screen}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: insets.bottom + 120 }}
            >
                {/* Top row — close + share */}
                <View style={[styles.topRow, { paddingTop: insets.top + 8 }]}>
                    <TouchableOpacity
                        style={styles.topIconBtn}
                        onPress={() => router.back()}
                        activeOpacity={0.7}
                    >
                        <Ionicons name="close" size={24} color={colors.text} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.topIconBtn} activeOpacity={0.7}>
                        {isDark ? <ShareWhite width={22} height={22} /> : <ShareSvg width={22} height={22} />}
                    </TouchableOpacity>
                </View>

                {/* Hero */}
                <View style={styles.heroContainer}>
                    <Image
                        source={require('@/assets/images/Pranayama_Images/SessionComplete.png')}
                        style={styles.heroImage}
                        resizeMode="cover"
                    />
                    <Text style={styles.heroTitle}>Session Complete!</Text>
                    <Text style={styles.heroSubtitle}>
                        Great job! You have taken a mindful step{'\n'}towards your well-being.
                    </Text>
                </View>

                {/* Stats Card */}
                <View style={styles.statsContainer}>
                    <View style={styles.statsCard}>
                        {/* Duration */}
                        <View style={styles.statItem}>
                            <View style={styles.statIconCircle}>
                                <ClockSvg width={22} height={22} />
                            </View>
                            <Text style={styles.statLabel}>Duration</Text>
                            <Text style={styles.statValue}>{formattedDuration || '20:00'}</Text>
                        </View>

                        <View style={styles.statDivider} />

                        {/* Session */}
                        <View style={styles.statItem}>
                            <View style={styles.statIconCircle}>
                                <LotusBlack width={22} height={22} />
                            </View>
                            <Text style={styles.statLabel}>Session</Text>
                            <Text style={styles.statValue}>
                                {mudraName}
                            </Text>
                        </View>

                        <View style={styles.statDivider} />

                        {/* Date */}
                        <View style={styles.statItem}>
                            <View style={styles.statIconCircle}>
                                <CalenderIcon width={22} height={22} />
                            </View>
                            <Text style={styles.statLabel}>Date</Text>
                            <Text style={styles.statValue}>
                                {formattedDate || 'May 15, 2024\n10:30 AM'}
                            </Text>
                        </View>
                    </View>
                </View>

                {/* Mood Rating */}
                <View style={styles.moodContainer}>

                    {feedbackSubmitted ? (
                        <View style={styles.feedbackInline}>
                            <View style={[styles.feedbackInlineCheckCircle, { borderColor: colors.primary }]}>
                                <Ionicons name="checkmark" size={28} color={colors.primary} />
                            </View>
                            <Text style={[styles.feedbackInlineTitle, { color: colors.primary }]}>
                                Feedback submitted
                            </Text>
                            <Text style={styles.feedbackInlineSubtitle}>
                                Thank you for sharing your thoughts
                            </Text>
                        </View>
                    ) : (
                        <>
                            <Text style={styles.moodTitle}>How do you feel?</Text>
                            <Text style={styles.moodSubtitle}>Rate your experience</Text>
                            {/* <View style={styles.moodRow}>
                        {MOODS.map((mood) => (
                            <TouchableOpacity
                                key={mood.id}
                                style={styles.moodItem}
                                onPress={() => setSelectedMood(mood.id)}
                                activeOpacity={0.7}
                            >
                                <View style={[
                                    styles.moodCircle,
                                    selectedMood === mood.id && styles.moodCircleSelected,
                                ]}>
                                    {mood.icon}
                                </View>
                                <Text style={styles.moodLabel}>{mood.label}</Text>
                            </TouchableOpacity>
                        ))}
                    </View> */}
                            <View style={styles.moodRow}>
                                {MOODS.map((mood) => (
                                    <TouchableOpacity
                                        key={mood.id}
                                        style={styles.moodItem}
                                        onPress={() => setSelectedMood(mood.id)}
                                        activeOpacity={0.7}
                                    >
                                        <View style={[
                                            styles.moodCircle,
                                            selectedMood === mood.id && styles.moodCircleSelected,
                                        ]}>
                                            {mood.icon}
                                        </View>
                                        <Text style={styles.moodLabel}>{mood.label}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>

                            <TouchableOpacity
                                style={[
                                    styles.submitBtn,
                                    (!selectedMood || submittingFeedback) && styles.submitBtnDisabled,
                                ]}
                                disabled={!selectedMood || submittingFeedback}
                                onPress={handleSubmitFeedback}
                                activeOpacity={0.85}
                            >
                                <Text style={styles.submitBtnText}>
                                    {submittingFeedback ? 'Submitting...' : 'Submit'}
                                </Text>
                            </TouchableOpacity>
                        </>
                    )}
                </View>

                {/* Session Insights */}
                <View style={styles.insightsContainer}>
                    <View style={styles.insightsCard}>
                        <Text style={styles.insightsTitle}>Your Session Insights</Text>
                        {INSIGHTS.map((item, i) => (
                            <React.Fragment key={i}>
                                <View style={styles.insightsDivider} />
                                <View style={styles.insightRow}>
                                    {item.icon}
                                    <Text style={styles.insightLabel}>{item.label}</Text>
                                    <Text style={styles.insightValue}>{item.value}</Text>
                                </View>
                            </React.Fragment>
                        ))}
                    </View>
                </View>

                {/* Keep Going Banner */}
                <View style={styles.keepGoingContainer}>
                    <View style={styles.keepGoingCard}>
                        <View style={styles.keepGoingIconCircle}>
                            <FavouriteSvg width={22} height={22} />
                        </View>
                        <View style={styles.keepGoingTextBlock}>
                            <Text style={styles.keepGoingTitle}>Keep Going!</Text>
                            <Text style={styles.keepGoingSubtitle}>
                                Consistency is the key to transformation{'\n'}You're doing great!
                            </Text>
                        </View>
                    </View>
                </View>

                {/* Action Buttons */}
                <View style={styles.actionsContainer}>
                    <TouchableOpacity
                        style={styles.actionBtn}
                        onPress={() => router.push('/browse')}
                        activeOpacity={0.8}
                    >
                        {isDark ? <BookmarkWhite width={20} height={20} /> : <BookmarkSvg width={20} height={20} />}
                        <Text style={styles.actionBtnText}>Explore Mudra Library</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.actionBtn}
                        onPress={() => router.replace('/(tabs)')}
                        activeOpacity={0.8}
                    >
                        {isDark ? <HomeWhite width={20} height={20} /> : <HomeSvg width={20} height={20} />}
                        <Text style={styles.actionBtnText}>Back to Home</Text>
                    </TouchableOpacity>
                </View>

                {/* View Session History */}
                <TouchableOpacity
                    style={styles.viewHistoryBtn}
                    onPress={() => router.push('/recentactivity')}
                    activeOpacity={0.7}
                >
                    <Text style={styles.viewHistoryText}>View Session History</Text>
                </TouchableOpacity>
            </ScrollView>

            <StandaloneTabBar />
        </View>
    );
}