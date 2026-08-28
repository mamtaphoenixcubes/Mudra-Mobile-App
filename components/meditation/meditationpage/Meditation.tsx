import React, {
    useEffect,
    useState,
    useCallback,
} from 'react';

import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    RefreshControl,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import {
    useRouter,
    useLocalSearchParams,
} from 'expo-router';




import MeditationTipCard from './MeditationTipCard';

import MeditationTimerModal from './MeditationTimerModal';
import BackgroundMusicModal from '@/components/common/BackgroundMusicModal';
import { useBgMusicStore } from '@/store/bgMusicStore';
import MudraDetailSkeleton from '@/components/common/skeletons/MudraDetailSkeleton';
import { useAuthStore } from '@/store/authStore';
import { useTheme } from '@/constants/ThemeContext'
import AppHeader from '@/components/common/AppHeader'
import MeditationPracticeSteps from './MeditationPracticeSteps';
import MeditationHero from './MeditationHero';
import MeditationAffirmationDuration from './MeditationAffirmationDuration';
import MeditationFooter from './MeditationFooter';

export default function Meditation() {
    const { colors } = useTheme()
    const router = useRouter();

    const { id } = useLocalSearchParams();
    const { user } = useAuthStore();
    const selectedBgMusicId = useBgMusicStore(
        (s) => s.selectedBgMusicId
    );

    const bgMusicOptions = useBgMusicStore(
        (s) => s.bgMusicOptions
    );

    const selectedBgMusic = bgMusicOptions.find(
        (option) => option.id === selectedBgMusicId
    );
    const profileDocumentId =
        user?.id || user?.profileDocumentId;

    // const fetchPranayamaById = usePranayamaStore(
    //     (s) => s.fetchPranayamaById
    // );

    // const selectedPranayama = usePranayamaStore(
    //     (s) => s.selectedPranayama
    // );

    // const meditation =
    //     selectedPranayama?.data ??
    //     selectedPranayama;
    const fetchMeditationById = async (_id: string) => { };
    const meditation: any = {
        documentId: 'static-body-scan',
        name: 'Body Scan Meditation',
        description: 'A guided practice that brings gentle attention through each part of the body to release tension and settle the mind.',
        element: 'Earth',
        level: 'Beginner',
        type: 'Guided',
        intentions: [{ name: 'Relax' }, { name: 'Awareness' }, { name: 'Calm' }],
        image: true,
        mediaType: 'TIMER',
        practiceSteps: [
            {
                id: 1,
                nameOfTheSteps: 'Get Comfortable',
                describeTheStep: 'Lie down or sit comfortably, letting your body fully relax.',
            },
            {
                id: 2,
                nameOfTheSteps: 'Close Your Eyes',
                describeTheStep: 'Take three slow, deep breaths to settle into the present moment.',
            },
            {
                id: 3,
                nameOfTheSteps: 'Scan From Feet to Head',
                describeTheStep: 'Slowly bring your attention through each part of the body, noticing any tension.',
            },
            {
                id: 4,
                nameOfTheSteps: 'Release and Rest',
                describeTheStep: 'Let each area soften as you exhale, resting in full-body awareness.',
            },
        ],
        affirmationCard: {
            cardText: 'I release tension and welcome deep, restful calm.',
        },
        durationPickerCard: {
            beginnerDuration: 5,
            intermediateDuration: 10,
            expertDuration: 15,
            advancedDuration: 20,
        },
        tipCard: {
            cardText: 'Practice somewhere quiet where you won\'t be disturbed for the full session.',
        },
    };

    const currentUserActivity = meditation?.userPranayamaActivities?.find(
        (activity: any) =>
            activity?.user?.documentId === profileDocumentId ||
            activity?.user?.id === profileDocumentId
    );
    const [isLoading, setIsLoading] =
        useState(true);

    const [refreshing, setRefreshing] =
        useState(false);

    const [timerVisible, setTimerVisible] =
        useState(false);

    const [bgMusicModalVisible, setBgMusicModalVisible] =
        useState(false);

    const [timerDuration, setTimerDuration] =
        useState(currentUserActivity?.sessionDuration / 60 || 5);

    const [selectedDuration, setSelectedDuration] = useState(5);

    // useEffect(() => {
    //     if (!id) return;

    //     setIsLoading(true);

    //     fetchPranayamaById(id as string)
    //         .finally(() =>
    //             setIsLoading(false)
    //         );
    // }, [id]);
    useEffect(() => {
        setIsLoading(false);
    }, [id]);

    useEffect(() => {
        const durationCard = meditation?.durationPickerCard;

        if (!durationCard) return;

        const firstDuration =
            durationCard.beginnerDuration ??
            durationCard.intermediateDuration ??
            durationCard.expertDuration ??
            durationCard.advancedDuration ??
            5;

        setSelectedDuration(firstDuration);
    }, [meditation]);

    const onRefresh =
        useCallback(async () => {
            try {
                if (!id) return;

                setRefreshing(true);

                await fetchMeditationById(
                    id as string
                );
            } catch (error) {
                console.log(
                    'REFRESH_MEDITATION_ERROR',
                    error
                );
            } finally {
                setRefreshing(false);
            }
        }, [
            id,
            fetchMeditationById,
        ]);

    const openTimer = (duration: number) => {
        if (remainingDuration) {
            setTimerDuration(remainingDuration / 60);
        } else {
            setTimerDuration(duration);
        }

        setTimerVisible(true);
    };
    const mediaType = meditation?.mediaType;

    const remainingDuration =
        currentUserActivity &&
            (
                !currentUserActivity.isCompleted ||
                currentUserActivity.remainingDuration > 0
            )
            ? currentUserActivity.remainingDuration
            : null;

    const handleStartPractice = () => {
        switch (mediaType) {
            case 'TIMER':
                openTimer(selectedDuration);
                break;

            case 'AUDIO_SINGLE':
            case 'AUDIO_PLAYLIST':
            case 'VIDEO_SINGLE':
            case 'VIDEO_PLAYLIST':
                router.push({
                    pathname: '/pranayamapracticemode',
                    params: {
                        id: meditation?.documentId,
                        passduration: selectedDuration,
                    },
                });
                break;

            default:
                openTimer(selectedDuration);
        }
    };

    // const handleStartPractice = () => {
    //     router.push({
    //         pathname: '/pranayamapracticemode',
    //         params: {
    //             id: meditation?.documentId,
    //             passduration: selectedDuration,
    //         },
    //     });
    // };

    if (isLoading) {
        return (
            <MudraDetailSkeleton />
        );
    }

    return (
        <View
            style={[styles.container, { backgroundColor: colors.background }]}
        >
            <AppHeader
                rightIcon={
                    <TouchableOpacity
                        style={{ width: 40, height: 40, alignItems: 'center', justifyContent: 'center' }}
                        hitSlop={8}
                    >
                        <Ionicons name="ellipsis-horizontal" size={24} color={colors.text} />
                    </TouchableOpacity>
                }
            />

            <ScrollView
                showsVerticalScrollIndicator={
                    false
                }
                contentContainerStyle={
                    styles.scrollContent
                }
                refreshControl={
                    <RefreshControl
                        refreshing={
                            refreshing
                        }
                        onRefresh={
                            onRefresh
                        }
                    />
                }
            >
                <Text style={[styles.pageTitle, { color: colors.text }]}>Meditation Practice</Text>
                <MeditationHero
                    meditation={meditation}
                />

                <MeditationPracticeSteps
                    meditation={meditation}
                />

                <MeditationAffirmationDuration
                    meditation={meditation}
                    selectedDuration={selectedDuration}
                    onDurationChange={setSelectedDuration}
                    onDurationPress={(duration) => {
                        setSelectedDuration(duration);
                        openTimer(duration);
                    }}
                />

                <MeditationTipCard
                    meditation={meditation}
                />
            </ScrollView>

            <MeditationFooter
                onSettingsPress={() => { }}
                onBackgroundMusicPress={() => setBgMusicModalVisible(true)}
                onStartPress={
                    handleStartPractice
                }
            />

            <MeditationTimerModal
                visible={timerVisible}
                durationInMinutes={timerDuration}
                selectedDuration={selectedDuration}
                remainingDuration={remainingDuration}
                lastSessionDuration={currentUserActivity?.sessionDuration}
                meditationId={meditation?.documentId}
                meditationName={meditation?.name}
                profileDocumentId={profileDocumentId}
                bgMusicUrl={selectedBgMusic?.fileUrl ?? null}
                onClose={() => setTimerVisible(false)}
                onProgressSaved={async () => {
                    if (!id) return;

                    await fetchMeditationById(id as string);
                }}
            />

            <BackgroundMusicModal
                visible={bgMusicModalVisible}
                onClose={() => setBgMusicModalVisible(false)}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollContent: {
        paddingBottom: 120,
    },
    pageTitle: {
        fontFamily: 'SF-Pro-Display',
        fontWeight: '600',
        fontSize: 20,
        textAlign: 'center',
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
});