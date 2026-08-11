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

// import { useSafeAreaInsets } from 'react-native-safe-area-context';

import MeditationHero from './MeditationHero';
import PracticeSteps from './PracticeSteps';
import AffirmationDuration from './AffirmationDuration';
import TipCard from './TipCard';
import MeditationFooter from './MeditationFooter';
import MudraTimerModal from './MudraTimerModal';
import BackgroundMusicModal from '@/components/common/BackgroundMusicModal';
import { useBgMusicStore } from '@/store/bgMusicStore';
import { useMudraStore } from '@/store/mudraStore';
import MudraDetailSkeleton from '@/components/common/skeletons/MudraDetailSkeleton';
import { useAuthStore } from '@/store/authStore';
import { useTheme } from '@/constants/ThemeContext'
import AppHeader from '@/components/common/AppHeader'

export default function MudraMeditation() {
    const { colors } = useTheme()
    const router = useRouter();
    // const insets = useSafeAreaInsets();

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
    console.log(profileDocumentId, "profileDocumentIdprofileDocumentIdprofileDocumentId");

    const fetchMudraById = useMudraStore(
        (s) => s.fetchMudraById
    );

    const selectedMudra = useMudraStore(
        (s) => s.selectedMudra
    );

    const mudra =
        selectedMudra?.data ??
        selectedMudra;
    console.log(mudra, "mudraaaaaaaaaaaaa");

    const currentUserActivity = mudra?.userMudraActivities?.find(
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

    // const [selectedDuration, setSelectedDuration] =
    //     useState(currentUserActivity?.sessionDuration / 60 || 5);
    const [selectedDuration, setSelectedDuration] = useState(5);

    useEffect(() => {
        if (!id) return;

        setIsLoading(true);

        fetchMudraById(id as string)
            .finally(() =>
                setIsLoading(false)
            );
    }, [id]);

    useEffect(() => {
        const durationCard = mudra?.durationPickerCard;

        if (!durationCard) return;

        // Pick the first available duration (Beginner -> Intermediate -> Expert -> Advanced)
        const firstDuration =
            durationCard.beginnerDuration ??
            durationCard.intermediateDuration ??
            durationCard.expertDuration ??
            durationCard.advancedDuration ??
            5;

        setSelectedDuration(firstDuration);
    }, [mudra]);

    const onRefresh =
        useCallback(async () => {
            try {
                if (!id) return;

                setRefreshing(true);

                await fetchMudraById(
                    id as string
                );
            } catch (error) {
                console.log(
                    'REFRESH_MUDRA_ERROR',
                    error
                );
            } finally {
                setRefreshing(false);
            }
        }, [
            id,
            fetchMudraById,
        ]);

    const hasAudioContent =
        (mudra?.audioSingleSessions
            ?.length ?? 0) > 0 ||
        (mudra?.audio_playlists
            ?.length ?? 0) > 0;

    const openTimer = (duration: number) => {
        // remainingDuration is stored in seconds
        if (remainingDuration) {
            setTimerDuration(remainingDuration / 60);
        } else {
            setTimerDuration(duration);
        }

        setTimerVisible(true);
    };
    const mediaType = mudra?.mediaType;


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
                    //pathname: '/mudrasessionplayer',
                    pathname: '/practicemode',
                    params: {
                        id: mudra?.documentId,
                        passduration: selectedDuration,
                    },
                });
                break;

            default:
                openTimer(selectedDuration);
        }
    };

    if (isLoading) {
        return (
            <MudraDetailSkeleton />
        );
    }

    return (
        <View
            style={[styles.container, { backgroundColor: colors.background }]}
        >
            {/* Header */}
            {/* <View
                style={styles.header}
            >
                <TouchableOpacity
                    onPress={() =>
                        router.back()
                    }
                    hitSlop={8}
                >
                    <Ionicons
                        name="arrow-back"
                        size={24}
                        color="#000"
                    />
                </TouchableOpacity>

                <Text
                    style={
                        styles.headerTitle
                    }
                >
                    Mudra Meditation
                </Text>

                <View
                    style={
                        styles.headerRight
                    }
                >
                  
                    <TouchableOpacity
                        hitSlop={8}
                    >
                        <Ionicons
                            name="ellipsis-horizontal"
                            size={24}
                            color="#000"
                        />
                    </TouchableOpacity>
                </View>
            </View> */}
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


            {/* Content */}
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
                <Text style={[styles.pageTitle, { color: colors.text }]}>Mudra Meditation</Text>
                <MeditationHero
                    mudra={mudra}
                />

                <PracticeSteps
                    mudra={mudra}
                />

                <AffirmationDuration
                    mudra={mudra}
                    selectedDuration={selectedDuration}
                    onDurationChange={setSelectedDuration}
                    onDurationPress={(duration) => {
                        setSelectedDuration(duration);
                        openTimer(duration);
                    }}
                />

                <TipCard
                    mudra={mudra}
                />
            </ScrollView>

            <MeditationFooter
                onSettingsPress={() => { }}
                onBackgroundMusicPress={() => setBgMusicModalVisible(true)}
                onStartPress={
                    handleStartPractice
                }
            />



        <MudraTimerModal
    visible={timerVisible}
    durationInMinutes={timerDuration}
    selectedDuration={selectedDuration}
    remainingDuration={remainingDuration}
    lastSessionDuration={currentUserActivity?.sessionDuration}
    mudraId={mudra?.documentId}
    mudraName={mudra?.name}
    profileDocumentId={profileDocumentId}
    bgMusicUrl={selectedBgMusic?.fileUrl ?? null}
    onClose={() => setTimerVisible(false)}
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

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:
            'space-between',
        paddingHorizontal: 16,
        paddingVertical: 14,
        backgroundColor: '#fff',
    },

    headerTitle: {
        fontFamily:
            'SF-Pro-Display',
        fontWeight: '700',
        fontSize: 18,
        color: '#000',
    },

    headerRight: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
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