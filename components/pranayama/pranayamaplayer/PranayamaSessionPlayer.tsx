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
import { useLocalSearchParams } from 'expo-router'
import StandaloneTabBar from '@/components/home/StandaloneTabBar'
import AppHeader from '@/components/common/AppHeader'
import BookmarkSvg from '@/assets/icons/bookmark.svg'
import MoreSvg from '@/assets/icons/More.svg'
import MudraPlayerHero from './PranayamaPlayerHero'
import MudraPlayerInfo from './PranayamaPlayerInfo'
import MudraPlayerProgress from './PranayamaPlayerProgress'
import MudraPlayerControls from './PranayamaPlayerControls'
import MudraPlayerToolbar from './PranayamaPlayerToolbar'
import MudraPlayerAbout from './PranayamaPlayerAbout'
import MudraPlayerUpNext from './PranayamaPlayerUpNext'
import MudraPlayerMiniBar from './PranayamaPlayerMiniBar'
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
import AddToPlaylistModal from '@/components/common/AddToPlaylistModal'
import { PlaylistSession, usePlaylistStore } from '@/store/playlistStore'
import { useNidraStore } from '@/store/nidraStore';
import MudraFloatingTimer from '@/components/library/mudraplayer/MudraFloatingTimer';
import { useRouter } from 'expo-router';


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

export default function PranayamaSessionPlayer() {
    const { colors, isDark } = useTheme()
    const insets = useSafeAreaInsets();
    const soundRef = useRef<Audio.Sound | null>(null);
    const router = useRouter();

    const repeatRef = useRef(false);
    const shouldAutoPlayRef = useRef(false);

    const selectedMudra = useNidraStore((s) => s.selectedNidra);
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


    const nidra = selectedMudra?.data ?? selectedMudra;

    const selectedPlaylist = useMemo(() => {
        if (!playlistId) return localPlaylist ?? null;

        const nidraPlaylist =
            nidra?.audio_playlists?.find(
                (p: any) => String(p.documentId) === String(playlistId)
            ) ??
            nidra?.video_playlists?.find(
                (p: any) => String(p.documentId) === String(playlistId)
            ) ??
            nidra?.AudioPlaylist?.find(
                (p: any) => String(p.documentId) === String(playlistId)
            ) ??
            null;

        return nidraPlaylist ?? localPlaylist ?? null;
    }, [nidra, localPlaylist, playlistId]);

    const mediaType =
        nidra?.MediaType ||
        nidra?.mediaType ||
        (selectedPlaylist?.audios
            ? 'AUDIO_PLAYLIST'
            : selectedPlaylist?.videos
                ? 'VIDEO_PLAYLIST'
                : undefined);
    const floatingTimerRunningRef = useRef(true);


    const playlistItems = useMemo(() => {
        if (selectedPlaylist?.audios) {
            return selectedPlaylist.audios;
        }

        if (selectedPlaylist?.videos) {
            return selectedPlaylist.videos;
        }

        if (nidra) {
            // Audio Playlist
            if (mediaType === 'AUDIO_PLAYLIST') {
                return (
                    nidra?.AudioPlaylist?.find(
                        (playlist: any) => String(playlist.documentId) === String(playlistId)
                    )?.audios ||
                    nidra?.AudioPlaylist?.[0]?.audios ||
                    nidra?.media?.audios ||
                    []
                );
            }

            // Video Playlist
            if (mediaType === 'VIDEO_PLAYLIST') {
                return (
                    nidra?.video_playlists?.find(
                        (playlist: any) => String(playlist.documentId) === String(playlistId)
                    )?.videos ||
                    nidra?.video_playlists?.[0]?.videos ||
                    nidra?.media?.videos ||
                    []
                );
            }
        }

        // Playlist Screen flow
        if (localPlaylist?.audios) {
            return localPlaylist.audios;
        }

        if (localPlaylist?.videos) {
            return localPlaylist.videos;
        }

        return [];
    }, [nidra, mediaType, localPlaylist, selectedPlaylist, playlistId]);
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

    useEffect(() => {
        const nextIndex = mediaId && playlistItems.length
            ? playlistItems.findIndex((item: any) => String(item.documentId) === String(mediaId))
            : 0;

        setCurrentIndex(nextIndex >= 0 ? nextIndex : 0);
    }, [mediaId, playlistId, playlistItems]);
    const singleItem =
        mediaType === 'AUDIO_SINGLE'
            ? (
                // Existing Nidra Detail flow
                nidra?.AudioSingleSessions?.[0] ||

                // Recently Played flow
                nidra?.media ||

                null
            )
            : mediaType === 'VIDEO_SINGLE'
                ? (
                    nidra?.videoSingleSessions?.[0] ||

                    nidra?.media ||

                    null
                )
                : null;

    const isAudio = mediaType === 'AUDIO_SINGLE' || mediaType === 'AUDIO_PLAYLIST';

    const isVideo = mediaType === 'VIDEO_SINGLE' || mediaType === 'VIDEO_PLAYLIST';

    const isPlaylist = mediaType === 'AUDIO_PLAYLIST' || mediaType === 'VIDEO_PLAYLIST';



    const currentIndexRef = useRef(0);

    useEffect(() => {
        currentIndexRef.current = currentIndex;
    }, [currentIndex]);
    const activeMedia = isPlaylist
        ? playlistItems[currentIndex]
        : singleItem;

    const media = activeMedia;
    const title =
        media?.title ||
        nidra?.Name ||
        nidra?.name ||
        'Yoga Nidra';

    const description = useMemo(() => {
        // Audio Playlist description
        if (mediaType === 'AUDIO_PLAYLIST') {
            return (
                nidra?.AudioPlaylist?.[0]?.description?.[0]?.children?.[0]?.text ||

                nidra?.media?.description?.[0]?.children?.[0]?.text ||

                ''
            );
        }

        // Audio/Video Single description
        return media?.description?.[0]?.children?.[0]?.text || "";
    }, [mediaType, media, nidra, localPlaylist]);

    const mudraImage =
        media?.thumbnail?.url
            ? {
                uri:
                    process.env.EXPO_PUBLIC_IMAGE_API_URL +
                    media.thumbnail.url,
            }
            : nidra?.media?.thumbnail?.url
                ? {
                    uri:
                        process.env.EXPO_PUBLIC_IMAGE_API_URL +
                        nidra.media.thumbnail.url,
                }
                : MUDRA_IMAGE_MAP['1'];

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

    const userActivity = nidra?.userMudraActivities?.find(
        (activity: any) =>
            activity?.user?.documentId === profileDocumentId
    );

    const isSaved = nidra?.userActivity?.IsSaved ?? false;

    const [saved, setSaved] = useState(isSaved);

    useEffect(() => {
        setSaved(isSaved);
    }, [isSaved]);

    const handleSaveMudra = async () => {
        try {
            if (
                !profileDocumentId ||
                !nidra?.documentId ||
                saving
            ) {
                return;
            }

            setSaving(true);

            await axios.post(
                `${process.env.EXPO_PUBLIC_API_URL}/yoga-nidras/${nidra.documentId}/save`,
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

            // Update UI immediately
            setSaved((prev) => !prev);
        } catch (error: any) {
            console.log(
                "SAVE_NIDRA_ERROR",
                error?.response?.data || error
            );
        } finally {
            setSaving(false);
        }
    };


    const isLiked = nidra?.userActivity?.IsLiked ?? false;

    const [liked, setLiked] = useState(isLiked);

    const [liking, setLiking] = useState(false);
    const completedRef = useRef(false);

    useEffect(() => {
        completedRef.current = false;
    }, [media?.documentId]);
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
            !nidra?.documentId ||
            liking
        ) {
            return;
        }

        const previousState = liked;
        setLiked(!previousState);

        try {
            setLiking(true);

            await axios.post(
                `${process.env.EXPO_PUBLIC_API_URL}/yoga-nidras/${nidra.documentId}/like`,
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
            // Roll back UI on failure
            setLiked(previousState);

            console.log(
                "LIKE_NIDRA_ERROR",
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
                `${process.env.EXPO_PUBLIC_API_URL}/yoga-nidras/media-progress`,
                {
                    profileDocumentId,
                    mediaType,
                    mediaDocumentId: media?.documentId,
                    yogaNidraDocumentId: nidra?.documentId,
                    remainingDuration,
                    sessionDuration: timerDuration,
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
            const response = await axios.post(
                `${process.env.EXPO_PUBLIC_API_URL}/yoga-nidras/media-complete`,
                {
                    profileDocumentId,
                    mediaType,
                    mediaDocumentId: media?.documentId,
                    yogaNidraDocumentId: nidra?.documentId,
                    completedDuration,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            return response.data;
        } catch (error: any) {
            console.log(
                "MEDIA_COMPLETE_ERROR",
                error?.response?.data || error
            );
            return null;
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
            contentTypeOfAudio: "nidra",
        }
        : null;

    const type =
        nidra?.type ??
        'Yoga Nidra';

    const level =
        nidra?.level ??
        'Beginner';

    const handleShare = async () => {
        try {
            const mudraUrl = `${process.env.EXPO_PUBLIC_WEB_URL}/mudradetail?id=${nidra.documentId}`;

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
        !!nidra?.AudioPlaylist?.length;

    // const handleFloatingTimerComplete = async () => {
    //     floatingTimerRunningRef.current = false;

    //     if (soundRef.current) {
    //         await soundRef.current.pauseAsync();
    //     }

    //     setIsPlaying(false);
    // };
    const handleFloatingTimerComplete = async () => {
        floatingTimerRunningRef.current = false;

        if (soundRef.current) {
            await soundRef.current.pauseAsync();
        }

        setIsPlaying(false);

        if (completedRef.current) return;

        completedRef.current = true;

        const response = await completeMedia(timerDuration);


        if (response) {
            router.replace({
                pathname: "/sessioncomplete",
                params: {
                    mudraId: response?.data.yogaNidra.documentId,
                    title: response?.data.yogaNidra.name,
                    duration: String(response?.data.lastSessionDuration),
                    completedAt: response?.data.completedAt,
                    activityId: response?.data.activityDocumentId,
                },
            });
        }
    };

    return (
        <View style={[styles.container, { backgroundColor: colors.background, position: 'relative' }]}>

            {!isVideo && timerDuration > 0 && (
                <MudraFloatingTimer
                    durationInSeconds={timerDuration}
                    isPlaying={isPlaying}
                    onComplete={handleFloatingTimerComplete}
                />
            )}

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
        top: moderateScale(120),
        right: moderateScale(16),
        zIndex: 99,
    },
})