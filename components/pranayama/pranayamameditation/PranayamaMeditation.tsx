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

import PranayamaMeditationHero from './PranayamaMeditationHero';
import PranayamaPracticeSteps from './PranayamaPracticeSteps';
import PranayamaAffirmationDuration from './PranayamaAffirmationDuration';
import PranayamaTipCard from './PranayamaTipCard';
import PranayamaMeditationFooter from './PranayamaMeditationFooter';
import PranayamaTimerModal from './PranayamaTimerModal';
import BackgroundMusicModal from '@/components/common/BackgroundMusicModal';
import { useBgMusicStore } from '@/store/bgMusicStore';
// import { usePranayamaStore } from '@/store/pranayamaStore';
import MudraDetailSkeleton from '@/components/common/skeletons/MudraDetailSkeleton';
import { useAuthStore } from '@/store/authStore';
import { useTheme } from '@/constants/ThemeContext'
import AppHeader from '@/components/common/AppHeader'

export default function PranayamaMeditation() {
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

    // const pranayama =
    //     selectedPranayama?.data ??
    //     selectedPranayama;
    const fetchPranayamaById = async (_id: string) => { };
    const pranayama: any = {
        documentId: 'static-nadi-shodhana',
        name: 'Nadi Shodhana',
        description: 'A calming alternate-nostril breathing technique that balances the nervous system and clears the mind.',
        element: 'Air',
        level: 'Beginner',
        type: 'Breathing',
        intentions: [{ name: 'Calm' }, { name: 'Balance' }, { name: 'Focus' }],
        image: true,
        mediaType: 'TIMER',
        practiceSteps: [
            {
                id: 1,
                nameOfTheSteps: 'Get Comfortable',
                describeTheStep: 'Sit comfortably with your spine erect and shoulders relaxed.',
            },
            {
                id: 2,
                nameOfTheSteps: 'Close Right Nostril',
                describeTheStep: 'Use your right thumb to close your right nostril, inhale slowly through the left.',
            },
            {
                id: 3,
                nameOfTheSteps: 'Switch Sides',
                describeTheStep: 'Close the left nostril with your ring finger, release the right, and exhale.',
            },
            {
                id: 4,
                nameOfTheSteps: 'Repeat the Cycle',
                describeTheStep: 'Continue alternating sides for 5-10 minutes, breathing slowly and evenly.',
            },
        ],
        affirmationCard: {
            cardText: 'I am calm, balanced, and centered with every breath.',
        },
        durationPickerCard: {
            beginnerDuration: 5,
            intermediateDuration: 10,
            expertDuration: 15,
            advancedDuration: 20,
        },
        tipCard: {
            cardText: 'Practice on an empty stomach, ideally in the morning, for best results.',
        },
    };

    const currentUserActivity = pranayama?.userPranayamaActivities?.find(
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
        const durationCard = pranayama?.durationPickerCard;

        if (!durationCard) return;

        const firstDuration =
            durationCard.beginnerDuration ??
            durationCard.intermediateDuration ??
            durationCard.expertDuration ??
            durationCard.advancedDuration ??
            5;

        setSelectedDuration(firstDuration);
    }, [pranayama]);

    const onRefresh =
        useCallback(async () => {
            try {
                if (!id) return;

                setRefreshing(true);

                await fetchPranayamaById(
                    id as string
                );
            } catch (error) {
                console.log(
                    'REFRESH_PRANAYAMA_ERROR',
                    error
                );
            } finally {
                setRefreshing(false);
            }
        }, [
            id,
            fetchPranayamaById,
        ]);

    const openTimer = (duration: number) => {
        if (remainingDuration) {
            setTimerDuration(remainingDuration / 60);
        } else {
            setTimerDuration(duration);
        }

        setTimerVisible(true);
    };
    const mediaType = pranayama?.mediaType;

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
                        id: pranayama?.documentId,
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
    //             id: pranayama?.documentId,
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
                <Text style={[styles.pageTitle, { color: colors.text }]}>Pranayama Practice</Text>
                <PranayamaMeditationHero
                    pranayama={pranayama}
                />

                <PranayamaPracticeSteps
                    pranayama={pranayama}
                />

                <PranayamaAffirmationDuration
                    pranayama={pranayama}
                    selectedDuration={selectedDuration}
                    onDurationChange={setSelectedDuration}
                    onDurationPress={(duration) => {
                        setSelectedDuration(duration);
                        openTimer(duration);
                    }}
                />

                <PranayamaTipCard
                    pranayama={pranayama}
                />
            </ScrollView>

            <PranayamaMeditationFooter
                onSettingsPress={() => { }}
                onBackgroundMusicPress={() => setBgMusicModalVisible(true)}
                onStartPress={
                    handleStartPractice
                }
            />

            <PranayamaTimerModal
                visible={timerVisible}
                durationInMinutes={timerDuration}
                selectedDuration={selectedDuration}
                remainingDuration={remainingDuration}
                lastSessionDuration={currentUserActivity?.sessionDuration}
                pranayamaId={pranayama?.documentId}
                pranayamaName={pranayama?.name}
                profileDocumentId={profileDocumentId}
                bgMusicUrl={selectedBgMusic?.fileUrl ?? null}
                onClose={() => setTimerVisible(false)}
                onProgressSaved={async () => {
                    if (!id) return;

                    await fetchPranayamaById(id as string);
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