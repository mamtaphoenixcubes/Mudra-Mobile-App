import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import {
    TouchableOpacity,
    View,
    ScrollView,
    StyleSheet,
    Text,
    Dimensions,
    RefreshControl,
    ActivityIndicator,
    Share,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useLocalSearchParams, router } from 'expo-router'
import StandaloneTabBar from '@/components/home/StandaloneTabBar'
import AppHeader from '@/components/common/AppHeader'
import BookmarkSvg from '@/assets/icons/bookmark.svg'
import MoreSvg from '@/assets/icons/More.svg'
import { useMudraStore } from '@/store/mudraStore';
import MudraPlayerHero from './MudraPlayerHero'
import MudraPlayerInfo from './MudraPlayerInfo'
import MudraPlayerProgress from './MudraPlayerProgress'
import MudraPlayerControls from './MudraPlayerControls'
import MudraPlayerToolbar from './MudraPlayerToolbar'
import MudraPlayerAbout from './MudraPlayerAbout'
import MudraPlayerUpNext from './MudraPlayerUpNext'
import MudraPlayerMiniBar from './MudraPlayerMiniBar'
import { Audio } from 'expo-av';
import { useAuthStore } from '@/store/authStore';
import { useTheme } from '@/constants/ThemeContext';
import BookmarkWhite from '@/assets/icons/bookmarkWhite.svg'
import MoreWhite from '@/assets/icons/MoreWhite.svg'
import axios from 'axios';
import {
    downloadAudio,
    isAudioDownloaded,
} from "@/services/downloadService";
import MudraFloatingTimer from './MudraFloatingTimer';
import AddToPlaylistModal from '@/components/common/AddToPlaylistModal'
import { PlaylistSession, usePlaylistStore } from '@/store/playlistStore'

const { width: SCREEN_WIDTH } = Dimensions.get('window')

const moderateScale = (size: number, factor = 0.5) =>
    size + ((SCREEN_WIDTH - 375) / 375) * size * factor

const parseDuration = (dur: string): number => {
    const match = dur?.match(/(\d+)/)
    return match ? parseInt(match[1], 10) * 60 : 600
}

const MUDRA_IMAGE_MAP: Record<string, any> = {
    '1': require('@/assets/images/Pranayama_Images/AnxietyReleaseYogaNidra.png'),
}

const TAB_BAR_HEIGHT = moderateScale(80)
const TAB_BAR_BOTTOM = moderateScale(20)
const MINI_BAR_HEIGHT = moderateScale(68)
const MINI_BAR_GAP = moderateScale(10)

export default function MudraSessionPlayer() {
    const { colors, isDark } = useTheme()
    const insets = useSafeAreaInsets();
    const soundRef = useRef<Audio.Sound | null>(null);

    const repeatRef = useRef(false);
    const shouldAutoPlayRef = useRef(false);
    const selectedMudra = useMudraStore(
        (s) => s.selectedMudra
    );
    const [audioDuration, setAudioDuration] = useState(0);

    const { mediaId, id, playlistId, passduration } = useLocalSearchParams()
    const timerDuration = passduration ? Number(passduration) : 0
    const audioPlaylists = usePlaylistStore((s) => s.audioPlaylists);
    const videoPlaylists = usePlaylistStore((s) => s.videoPlaylists);

    const localPlaylist = useMemo(() => {
        return (
            audioPlaylists.find(
                p => String(p.documentId) === String(playlistId)
            ) ||
            videoPlaylists.find(
                p => String(p.documentId) === String(playlistId)
            ) ||
            null
        );
    }, [audioPlaylists, videoPlaylists, playlistId]);


    const mudra = selectedMudra?.data ?? selectedMudra;
    console.log(mudra, "selectedMudraselectedMudra");

    const mediaType =
        mudra?.mediaType ??
        (localPlaylist?.audios
            ? 'AUDIO_PLAYLIST'
            : localPlaylist?.videos
                ? 'VIDEO_PLAYLIST'
                : undefined);
    const floatingTimerRunningRef = useRef(true);


    const playlistItems = useMemo(() => {
        // Existing flow (Mudra -> Session Player)
        if (mudra) {
            if (mediaType === 'AUDIO_PLAYLIST') {
                return mudra.audio_playlists?.[0]?.audios || [];
            }

            if (mediaType === 'VIDEO_PLAYLIST') {
                return mudra.video_playlists?.[0]?.videos || [];
            }
        }

        // NEW flow (PlaylistDetail -> Session Player)
        if (localPlaylist?.audios) {
            return localPlaylist.audios;
        }

        if (localPlaylist?.videos) {
            return localPlaylist.videos;
        }

        return [];
    }, [mudra, mediaType, localPlaylist]);
    const initialIndex = useMemo(() => {
        if (!mediaId || !playlistItems.length) {
            return 0;
        }

        const index = playlistItems.findIndex(
            (item: any) =>
                String(item.documentId) === String(mediaId)
        );

        return index >= 0 ? index : 0;
    }, [mediaId, playlistItems]);

    const [currentIndex, setCurrentIndex] =
        useState(initialIndex);
    const singleItem =
        mediaType === 'AUDIO_SINGLE'
            ? mudra?.audioSingleSessions?.[0]
            : mediaType === 'VIDEO_SINGLE'
                ? mudra?.videoSingleSessions?.[0]
                : null;

    const isAudio = mediaType === 'AUDIO_SINGLE' || mediaType === 'AUDIO_PLAYLIST';

    const isVideo = mediaType === 'VIDEO_SINGLE' || mediaType === 'VIDEO_PLAYLIST';

    const isPlaylist = mediaType === 'AUDIO_PLAYLIST' || mediaType === 'VIDEO_PLAYLIST';



    const currentIndexRef = useRef(0);

    useEffect(() => {
        currentIndexRef.current = currentIndex;
    }, [currentIndex]);

    const activeMedia = singleItem || playlistItems[currentIndex];

    const media = activeMedia;
    const title = media?.title || mudra?.name || 'Mudra Session';

    const description = media?.description?.[0]?.children?.[0]?.text || '';

    const mudraImage = media?.thumbnail?.url ? { uri: `${process.env.EXPO_PUBLIC_IMAGE_API_URL}${media.thumbnail.url}`, } : MUDRA_IMAGE_MAP['1'];

    const mediaUrl =
        media?.audioFile?.url
            ? `${process.env.EXPO_PUBLIC_IMAGE_API_URL}${media.audioFile.url}`
            : media?.videoFile?.url
                ? `${process.env.EXPO_PUBLIC_IMAGE_API_URL}${media.videoFile.url}`
                : null;

    const [saving, setSaving] = useState(false);

    const { token, user } = useAuthStore();

    const profileDocumentId =
        user?.id || user?.profileDocumentId;

    const userActivity = mudra?.userMudraActivities?.find(
        (activity: any) =>
            activity?.user?.documentId === profileDocumentId
    );

    const isSaved = userActivity?.isSaved ?? false;

    const [saved, setSaved] = useState(isSaved);

    useEffect(() => {
        setSaved(isSaved);
    }, [isSaved]);
    useEffect(() => {
        if (!isVideo || !videoPlayerRef.current) return;

        const player = videoPlayerRef.current;

        const subscription = player.addListener(
            "playToEnd",
            async () => {

                // If timer already ended, stop everything
                if (!floatingTimerRunningRef.current) {
                    setIsPlaying(false);
                    return;
                }

                // VIDEO SINGLE
                if (mediaType === "VIDEO_SINGLE") {
                    player.currentTime = 0;
                    player.play();
                    return;
                }

                // VIDEO PLAYLIST
                if (mediaType === "VIDEO_PLAYLIST") {
                    if (currentIndexRef.current < playlistItems.length - 1) {
                        setCurrentIndex(prev => prev + 1);
                    } else {
                        setCurrentIndex(0);
                    }
                }
            }
        );

        return () => subscription.remove();

    }, [
        isVideo,
        mediaType,
        playlistItems,
        media
    ]);
    useEffect(() => {
        if (!isVideo || !videoPlayerRef.current) return;

        videoPlayerRef.current.play();

    }, [currentIndex, mediaUrl]);
    const handleSaveMudra = async () => {
        try {
            if (
                !profileDocumentId ||
                !mudra?.documentId ||
                saving
            ) {
                return;
            }

            setSaving(true);

            await axios.post(
                `${process.env.EXPO_PUBLIC_API_URL}/mudras/${mudra.documentId}/save`,
                {
                    profileDocumentId,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            // Instant UI update
            setSaved((prev: boolean) => !prev);
        } catch (error: any) {
            console.log(
                'SAVE_MUDRA_ERROR',
                error?.response?.data || error
            );
        } finally {
            setSaving(false);
        }
    };


    const isLiked = userActivity?.isLiked ?? false;

    const [liked, setLiked] = useState(isLiked);

    const [liking, setLiking] = useState(false);
    const completedRef = useRef(false);
    const videoPlayerRef = useRef<any>(null);
    useEffect(() => {
        completedRef.current = false;
    }, [id]); // or [timerDuration]
    const [downloaded, setDownloaded] =
        useState(false);

    const [downloading, setDownloading] =
        useState(false);

    useEffect(() => {

        const check = async () => {

            if (!media?.documentId)
                return;

            const exists =
                (await isAudioDownloaded(
                    media.documentId
                )) as boolean | undefined;

            setDownloaded(!!exists);

        };

        check();

    }, [media]);

    const handleDownload = async () => {
        if (downloading || !mediaUrl) return;

        try {
            setDownloading(true);
            const uri = await downloadAudio(
                media.documentId,
                mediaUrl
            );
            setDownloaded(true);
        } catch (err) {
            console.log("DOWNLOAD ERROR");
            console.log(err);
        } finally {
            setDownloading(false);
        }
    };

    useEffect(() => {
        setLiked(isLiked);
    }, [isLiked]);


    const handleLikeMudra = async () => {
        if (
            !profileDocumentId ||
            !mudra?.documentId ||
            liking
        ) {
            return;
        }

        const previousState = liked;
        setLiked(!previousState);

        try {
            setLiking(true);

            await axios.post(
                `${process.env.EXPO_PUBLIC_API_URL}/mudras/${mudra.documentId}/like`,
                {
                    profileDocumentId,
                },
                {
                    headers: token
                        ? {
                            Authorization: `Bearer ${token}`,
                        }
                        : {},
                }
            );
        } catch (error: any) {
            // Rollback on failure
            setLiked(previousState);

            console.log(
                'LIKE_MUDRA_ERROR',
                error?.response?.data || error
            );
        } finally {
            setLiking(false);
        }
    };

    useEffect(() => {
        if (!isAudio || !mediaUrl) return;

        let mounted = true;

        const loadAudio = async () => {
            try {
                if (soundRef.current) {
                    await soundRef.current.unloadAsync();
                }

                const { sound, status } =
                    await Audio.Sound.createAsync(
                        { uri: mediaUrl },
                        {
                            shouldPlay: shouldAutoPlayRef.current,
                        },
                        onPlaybackStatusUpdate
                    );

                shouldAutoPlayRef.current = false;

                soundRef.current = sound;

                setIsPlaying(shouldAutoPlayRef.current);

                await sound.setIsLoopingAsync(isRepeat);
                await sound.setRateAsync(speed, true);

                if (mounted && status.isLoaded) {
                    setAudioDuration(
                        Math.floor((status.durationMillis || 0) / 1000)
                    );
                }
            } catch (err) {
                console.log(err);
            }
        };

        loadAudio();

        return () => {
            mounted = false;

            if (soundRef.current) {
                soundRef.current.unloadAsync();
            }
        };
    }, [mediaUrl]);

    const onPlaybackStatusUpdate = async (status: any) => {
        if (!status.isLoaded) return;

        setCurrentTime(
            Math.floor(status.positionMillis / 1000)
        );

        setAudioDuration(
            Math.floor((status.durationMillis || 0) / 1000)
        );

        setIsPlaying(status.isPlaying);

        if (!status.didJustFinish) return;

        // Prevent duplicate API calls
        if (!completedRef.current) {
            completedRef.current = true;

            await completeMedia(
                Math.floor((status.durationMillis || 0) / 1000)
            );
        }

        // If floating timer has finished,
        // don't continue playing anything.
        if (!floatingTimerRunningRef.current) {
            setIsPlaying(false);
            return;
        }

        // --------------------------------------------------
        // AUDIO SINGLE
        // Keep replaying forever until timer becomes 00:00
        // --------------------------------------------------
        if (mediaType === "AUDIO_SINGLE") {
            try {
                await soundRef.current?.setPositionAsync(0);
                await soundRef.current?.playAsync();
            } catch (err) {
                console.log(err);
            }

            completedRef.current = false;
            return;
        }

        // --------------------------------------------------
        // AUDIO PLAYLIST
        // Keep cycling forever until timer becomes 00:00
        // --------------------------------------------------
        if (mediaType === "AUDIO_PLAYLIST") {
            shouldAutoPlayRef.current = true;

            completedRef.current = false;

            if (currentIndexRef.current < playlistItems.length - 1) {
                setCurrentIndex(prev => prev + 1);
            } else {
                // Last song -> restart playlist
                setCurrentIndex(0);
            }

            return;
        }

        // Videos
        setIsPlaying(false);
    };
    const saveMediaProgress = async (
        remainingDuration: number
    ) => {
        try {
            await axios.post(
                `${process.env.EXPO_PUBLIC_API_URL}/user-mudra-activities/media-progress`,
                {
                    profileDocumentId,
                    mediaType,
                    mediaDocumentId: media?.documentId,
                    mudraDocumentId: mudra?.documentId,
                    remainingDuration,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
        } catch (error: any) {
            console.log(
                "MEDIA_PROGRESS_ERROR",
                error?.response?.data || error
            );
        }
    };

    const togglePlayPause = async () => {
        if (!soundRef.current) return;

        const status =
            await soundRef.current.getStatusAsync();

        if (!status.isLoaded) return;

        // Pause
        if (status.isPlaying) {

            await soundRef.current.pauseAsync();

            setIsPlaying(false);

            const remainingDuration =
                Math.max(
                    0,
                    Math.floor(
                        ((status.durationMillis || 0) -
                            status.positionMillis) / 1000
                    )
                );

            await saveMediaProgress(
                remainingDuration
            );

            return;
        }

        // Finished
        if (
            status.positionMillis >=
            (status.durationMillis || 0)
        ) {
            await soundRef.current.setPositionAsync(
                0
            );

            setCurrentTime(0);
        }

        await soundRef.current.playAsync();

        setIsPlaying(true);
    };

    const completeMedia = async (
        completedDuration: number
    ) => {
        try {
            const completeRes = await axios.post(
                `${process.env.EXPO_PUBLIC_API_URL}/user-mudra-activities/media-complete`,
                {
                    profileDocumentId,
                    mediaType,
                    mediaDocumentId: media?.documentId,
                    mudraDocumentId: mudra?.documentId,
                    completedDuration,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            console.log("MEDIA_COMPLETED");

            // const activityId =
            //     completeRes?.data?.data?.activityDocumentId ??
            //     completeRes?.data?.activityDocumentId ??
            //     null;

            const activityId =
                completeRes?.data?.data?.data?.activityDocumentId ??
                completeRes?.data?.data?.activityDocumentId ??
                completeRes?.data?.activityDocumentId ??
                null;

            console.log('MEDIA_COMPLETE_RESPONSE:', JSON.stringify(completeRes?.data, null, 2));
            console.log('EXTRACTED_ACTIVITY_ID:', activityId);

            router.replace({
                pathname: '/sessioncomplete',
                params: {
                    mudraId: mudra?.documentId ?? '',
                    title: title ?? '',
                    duration: String(Math.round(completedDuration / 60)),
                    completedAt: new Date().toISOString(),
                    activityId: activityId ?? '',
                },
            });


        } catch (error: any) {
            console.log(
                "MEDIA_COMPLETE_ERROR",
                error?.response?.data || error
            );
        }
    };

    const seekAudio = async (
        seconds: number
    ) => {
        if (!soundRef.current) return;

        await soundRef.current.setPositionAsync(
            seconds * 1000
        );

        setCurrentTime(seconds);
    };
    const handleSeekPreview = (
        seconds: number
    ) => {
        setCurrentTime(seconds);
    };

    const handleSeekComplete =
        async (
            seconds: number
        ) => {
            if (!soundRef.current)
                return;

            try {
                await soundRef.current.setPositionAsync(
                    seconds * 1000
                );

                setCurrentTime(seconds);
            } catch (err) {
                console.log(
                    'Seek error:',
                    err
                );
            }
        };


    const skipBack = async () => {
        if (mediaType !== 'AUDIO_PLAYLIST') return;

        if (currentIndex > 0) {
            shouldAutoPlayRef.current = true;
            setCurrentIndex(prev => prev - 1);
        }
    };

    const skipForward = async () => {
        if (mediaType !== 'AUDIO_PLAYLIST') return;

        if (currentIndex < playlistItems.length - 1) {
            shouldAutoPlayRef.current = true;
            setCurrentIndex(prev => prev + 1);
        }
    };

    const formatDuration = (seconds: any) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${String(secs).padStart(2, '0')}`;
    };

    const duration = formatDuration(audioDuration);

    const TOTAL = audioDuration || 0;

    const currentPlaylistSession: PlaylistSession | null = media?.documentId
        ? {
            id: media.documentId,
            title: title as string,
            duration: duration || '',
            isVideo,
            contentTypeOfAudio: "mudra",
        }
        : null;

    const type =
        mudra?.type ??
        'Mudra';

    const level =
        mudra?.level ??
        'Beginner';

    const handleShare = async () => {
        try {
            const mudraUrl = `${process.env.EXPO_PUBLIC_WEB_URL}/mudradetail?id=${mudra.documentId}`;

            await Share.share({
                title,
                message: `${title}

        ${description}

        Practice this Mudra:
        ${mudraUrl}`,
                url: mudraUrl,
            });
        } catch (error) {
            console.log("Share error:", error);
        }
    };



    const [currentTime, setCurrentTime] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isShuffle, setIsShuffle] = useState(false);
    const [isRepeat, setIsRepeat] = useState(false);
    const [speed, setSpeed] = useState(1.0);
    const [sleepTimer, setSleepTimer] = useState('Off');
    const [playlistModalVisible, setPlaylistModalVisible] = useState(false);
    const sleepTimeoutRef = useRef<NodeJS.Timeout | null>(null);


    const setSleepTimerDuration = (minutes: number | null) => {
        if (sleepTimeoutRef.current) {
            clearTimeout(sleepTimeoutRef.current);
            sleepTimeoutRef.current = null;
        }

        if (minutes === null) {
            setSleepTimer('Off');
            return;
        }

        setSleepTimer(`${minutes} min`);

        sleepTimeoutRef.current = setTimeout(async () => {
            if (soundRef.current) {
                try {
                    await soundRef.current.pauseAsync();
                    setIsPlaying(false);
                } catch (err) {
                    console.log(err);
                }
            }

            setSleepTimer('Off');
            sleepTimeoutRef.current = null;
        }, minutes * 60 * 1000);
    };

    useEffect(() => {
        return () => {
            if (sleepTimeoutRef.current) {
                clearTimeout(sleepTimeoutRef.current);
            }
        };
    }, []);

    const handleSleepTimerSelect = (minutes: number) => {
        // Convert 0 (from modal's "Off" option) to null
        setSleepTimerDuration(minutes === 0 ? null : minutes);
    };

    useEffect(() => {
        repeatRef.current = isRepeat;
    }, [isRepeat]);

    useEffect(() => {
        const setLooping = async () => {
            if (!soundRef.current) return;

            try {
                const status =
                    await soundRef.current.getStatusAsync();

                if (
                    status.isLoaded
                ) {
                    await soundRef.current.setIsLoopingAsync(
                        isRepeat
                    );
                }
            } catch (err) {
                console.log(
                    'Looping error:',
                    err
                );
            }
        };
        setLooping();
    }, [isRepeat]);

    const cycleSpeed = async (selectedSpeed: number) => {
        setSpeed(selectedSpeed);

        if (soundRef.current) {
            try {
                await soundRef.current.setRateAsync(
                    selectedSpeed,
                    true
                );
            } catch (err) {
                console.log("Speed change error:", err);
            }
        }
    };


    const queue = isPlaylist
        ? playlistItems
            .filter((_: any, index: number) => index !== currentIndex)
            .map((_: any, order: number) => {
                const playlistIndex =
                    (currentIndex + order + 1) %
                    playlistItems.length

                const item =
                    playlistItems[playlistIndex]

                return {
                    id: item.documentId,
                    title: item.title,
                    duration: item.durationInSeconds
                        ? `${Math.floor(
                            item.durationInSeconds / 60
                        )} min`
                        : '',
                    playlistIndex,
                    isVideo:
                        mediaType ===
                        'VIDEO_SINGLE' ||
                        mediaType ===
                        'VIDEO_PLAYLIST',
                }
            })
        : []

    const miniBarBottom = TAB_BAR_BOTTOM + TAB_BAR_HEIGHT + MINI_BAR_GAP
    const scrollBottomPadding = miniBarBottom + MINI_BAR_HEIGHT + moderateScale(20);

    const isPlaylistPlayer =
        mediaType === 'AUDIO_PLAYLIST' ||
        mediaType === 'VIDEO_PLAYLIST';


    const isPreviousDisabled =
        !isPlaylistPlayer || currentIndex === 0;

    const isNextDisabled =
        !isPlaylistPlayer ||
        currentIndex === playlistItems.length - 1;

    const isShuffleDisabled =
        !isPlaylistPlayer;

    const isPlaylistMode =
        !!mudra?.audio_playlists?.length;

    const handleFloatingTimerComplete = async () => {
        floatingTimerRunningRef.current = false;

        // Call media completion only once
        if (!completedRef.current) {
            completedRef.current = true;

            await completeMedia(
                timerDuration * 60
            );
        }

        // Pause audio
        // if (soundRef.current) {
        //     await soundRef.current.pauseAsync();
        // }

        // // Pause video
        // if (videoPlayerRef.current) {
        //     videoPlayerRef.current.pause();
        // }

        try {
            if (soundRef.current) {
                await soundRef.current.pauseAsync();
            }
        } catch (err) {
            console.log('Audio pause skipped (player already released):', err);
        }

        // Pause video — same reasoning as above.
        try {
            if (videoPlayerRef.current) {
                videoPlayerRef.current.pause();
            }
        } catch (err) {
            console.log('Video pause skipped (player already released):', err);
        }




        setIsPlaying(false);
    };
    console.log({
        mediaType,
        isAudio,
        mediaUrl,
    });
    return (
        <View style={[styles.container, { backgroundColor: colors.background, position: 'relative' }]}>
            <AppHeader
                rightIcon={
                    <View style={styles.headerRight}>
                        <TouchableOpacity
                            style={styles.iconBtn}
                            activeOpacity={0.7}
                            disabled={saving}
                            onPress={handleSaveMudra}
                        >
                            {isDark ? <BookmarkWhite width={moderateScale(22)} height={moderateScale(22)} /> : <BookmarkSvg
                                width={moderateScale(22)}
                                height={moderateScale(22)}
                                fill={saved ? '#8B5CF6' : 'none'}
                            />}
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.iconBtn} activeOpacity={0.7}>
                            {isDark ? <MoreWhite width={moderateScale(22)} height={moderateScale(22)} /> : <MoreSvg width={moderateScale(22)} height={moderateScale(22)} />}
                        </TouchableOpacity>
                    </View>
                }
            />
            <ScrollView
                contentContainerStyle={{
                    paddingBottom:
                        scrollBottomPadding,
                }}
                showsVerticalScrollIndicator={
                    false
                }
            >
                <Text style={[styles.pageTitle, { color: colors.text }]}>Session Player</Text>

                <MudraPlayerHero
                    type={isVideo ? 'video' : 'audio'}
                    image={mudraImage}
                    mediaUrl={mediaUrl}
                    isPlaying={isPlaying}
                    onTogglePlay={togglePlayPause}
                    onVideoPlayingChange={setIsPlaying}
                    playerRef={(player) => {
                        videoPlayerRef.current = player;
                    }}
                />
                <MudraPlayerInfo
                    title={title}
                    description={description}
                    duration={duration}
                    type={type}
                    level={level}
                    mediaType={mediaType}
                    isLiked={liked}
                    onToggleLike={handleLikeMudra}
                    onPlaylist={() => setPlaylistModalVisible(true)}
                    playlistEnabled={!!currentPlaylistSession}
                />

                {/* Floating Timer */}

                {!isVideo && (
                    <MudraPlayerProgress
                        current={currentTime}
                        total={TOTAL}
                        onChange={
                            handleSeekPreview
                        }
                        onSeekComplete={
                            handleSeekComplete
                        }
                    />
                )}
                {!isVideo && (
                    <MudraPlayerControls
                        isPlaying={isPlaying}
                        isShuffle={isShuffle}
                        isRepeat={isRepeat}
                        isPreviousDisabled={isPreviousDisabled}
                        isNextDisabled={isNextDisabled}
                        isShuffleDisabled={isShuffleDisabled}
                        onTogglePlay={togglePlayPause}
                        onToggleShuffle={() =>
                            setIsShuffle(v => !v)
                        }
                        onToggleRepeat={() =>
                            setIsRepeat(v => !v)
                        }
                        onSkipBack={skipBack}
                        onSkipForward={skipForward}
                    />
                )}


                {!isVideo && (

                    <MudraPlayerToolbar
                        speed={speed}
                        sleepTimer={sleepTimer}
                        onCycleSpeed={cycleSpeed}
                        onSleepTimer={handleSleepTimerSelect}
                        onShare={handleShare}
                        onDownload={handleDownload}
                        onPlaylist={() => setPlaylistModalVisible(true)}
                        playlistEnabled={!!currentPlaylistSession}
                    />


                )}

                <View style={styles.aboutWrapper}>
                    <MudraPlayerAbout description={description as string} />
                </View>
                {isPlaylist && (
                    <View style={styles.upNextWrapper}>
                        <MudraPlayerUpNext
                            queue={queue}
                            onItemPress={(item) => {
                                shouldAutoPlayRef.current = true;
                                setCurrentTime(0);
                                setCurrentIndex(item.playlistIndex);
                            }}
                        />
                    </View>
                )}
            </ScrollView>
            {!isVideo && (
                <MudraPlayerMiniBar
                    title={title as string}
                    currentTime={currentTime}
                    totalTime={TOTAL}
                    isPlaying={isPlaying}
                    onTogglePlay={togglePlayPause}
                    onSkipBack={skipBack}
                    onSkipForward={skipForward}
                    bottomOffset={miniBarBottom}
                />
            )}
            {/* Floating Timer — outside ScrollView */}
            {timerDuration > 0 && (
                <MudraFloatingTimer
                    durationInSeconds={timerDuration * 60}
                    isPlaying={isPlaying}
                    onComplete={handleFloatingTimerComplete}
                />
            )}

            <StandaloneTabBar />
            {currentPlaylistSession && (
                <AddToPlaylistModal
                    visible={playlistModalVisible}
                    session={currentPlaylistSession}
                    onClose={() => setPlaylistModalVisible(false)}
                />
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    pageTitle: {
        fontFamily: 'SF-Pro-Display',
        fontWeight: '600',
        fontSize: moderateScale(20),
        color: '#0F0F0F',
        textAlign: 'center',
        marginBottom: moderateScale(10),
        paddingHorizontal: moderateScale(16),
    },
    headerRight: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconBtn: {
        padding: moderateScale(6),
    },
    aboutWrapper: {
        marginBottom: moderateScale(14),
    },
    upNextWrapper: {
        marginBottom: moderateScale(8),
    },
    floatingTimerWrapper: {
        position: 'absolute',
        top: moderateScale(120),  // ← above toolbar
        right: moderateScale(16),
        zIndex: 99,
    },
})