// Place this file at: components/mudra/practicemode/PracticeModeScreen.tsx

import React, { useMemo, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@/constants/ThemeContext';
import AppHeader from '@/components/common/AppHeader';
import { useMudraStore } from '@/store/mudraStore';
import { getPracticeModeStyles } from '@/assets/styles/library/practiceModeStyles';

type TabKey = 'audio' | 'video';

// Same icon per media type — only the background color cycles per row
const AUDIO_PALETTE = [
    { bg: '#FFF6BF', icon: 'musical-notes' as const },
    { bg: '#CBECFF', icon: 'musical-notes' as const },
    { bg: '#E9FFDB', icon: 'musical-notes' as const },
];
const VIDEO_PALETTE = [
    { bg: '#FFDBE7', icon: 'videocam' as const },
    { bg: '#F3E8FF', icon: 'videocam' as const },
    { bg: '#CBECFF', icon: 'videocam' as const },
];

function formatDuration(seconds?: number | null) {
    if (!seconds) return 'Guided practice';
    if (seconds < 60) return `${seconds} sec`;
    return `${Math.round(seconds / 60)} min`;
}

function getPlainDescription(description: any): string {
    return description?.[0]?.children?.[0]?.text ?? '';
}

export default function PracticeModeScreen() {
    const { colors, isDark } = useTheme();
    const insets = useSafeAreaInsets();
    const styles = getPracticeModeStyles(colors, isDark);

    const { passduration } = useLocalSearchParams<{
        id?: string;
        passduration?: string;
    }>();

    const selectedMudra = useMudraStore((s) => s.selectedMudra);
    const mudra = selectedMudra?.data ?? selectedMudra;

    // ── Flatten every playable variant across singles + playlists ──
    // Filtered to contentTypeOfAudio/contentTypeOfVideo === 'mudra' only —
    // excludes nidra-tagged items that can appear inside a mudra's own
    // audio_playlists / video_playlists. De-duped by documentId since the
    // same track can appear both as a standalone single session and
    // inside a playlist.
    const audioVariants = useMemo(() => {
        const singles = (mudra?.audioSingleSessions || [])
            .filter((item: any) => item.contentTypeOfAudio === 'mudra')
            .map((item: any) => ({ ...item, kind: 'single' as const }));

        const fromPlaylists = (mudra?.audio_playlists || []).flatMap((playlist: any) =>
            (playlist.audios || [])
                .filter((audio: any) => audio.contentTypeOfAudio === 'mudra')
                .map((audio: any) => ({
                    ...audio,
                    kind: 'playlist' as const,
                    playlistTitle: playlist.title,
                }))
        );

        const seen = new Set<string>();
        return [...singles, ...fromPlaylists].filter((item) => {
            if (seen.has(item.documentId)) return false;
            seen.add(item.documentId);
            return true;
        });
    }, [mudra]);

    const videoVariants = useMemo(() => {
        const singles = (mudra?.videoSingleSessions || [])
            .filter((item: any) => item.contentTypeOfVideo === 'mudra')
            .map((item: any) => ({ ...item, kind: 'single' as const }));

        const fromPlaylists = (mudra?.video_playlists || []).flatMap((playlist: any) =>
            (playlist.videos || [])
                .filter((video: any) => video.contentTypeOfVideo === 'mudra')
                .map((video: any) => ({
                    ...video,
                    kind: 'playlist' as const,
                    playlistTitle: playlist.title,
                }))
        );

        const seen = new Set<string>();
        return [...singles, ...fromPlaylists].filter((item) => {
            if (seen.has(item.documentId)) return false;
            seen.add(item.documentId);
            return true;
        });
    }, [mudra]);

    const [activeTab, setActiveTab] = useState<TabKey>(
        audioVariants.length > 0 ? 'audio' : 'video'
    );

    const activeVariants = activeTab === 'audio' ? audioVariants : videoVariants;

    const totalSeconds = activeVariants.reduce(
        (sum: number, item: any) => sum + (item.durationInSeconds || 0),
        0
    );

    const statsLabel =
        activeVariants.length === 0
            ? ''
            : totalSeconds > 0
                ? `${activeVariants.length} ${activeTab} option${activeVariants.length > 1 ? 's' : ''} · ${Math.round(totalSeconds / 60)} min total`
                : `${activeVariants.length} ${activeTab} option${activeVariants.length > 1 ? 's' : ''}`;

    const handleSelectVariant = (item: any) => {
        const mediaType =
            item.kind === 'single'
                ? activeTab === 'audio'
                    ? 'AUDIO_SINGLE'
                    : 'VIDEO_SINGLE'
                : activeTab === 'audio'
                    ? 'AUDIO_PLAYLIST'
                    : 'VIDEO_PLAYLIST';

        const minutesFromItem = item.durationInSeconds
            ? Math.max(1, Math.round(item.durationInSeconds / 60))
            : passduration
                ? Number(passduration)
                : 5;

        router.push({
            pathname: '/mudrasessionplayer',
            params: {
                id: mudra?.documentId,
                mediaId: item.documentId,
                selectedMediaType: mediaType,
                passduration: minutesFromItem,
            },
        });
    };

    return (
        <View style={[styles.screen, { backgroundColor: colors.background }]}>
            <AppHeader />

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: insets.bottom + 40 }}
            >
                <View style={styles.headerBlock}>
                    <Text style={styles.mudraName}>{mudra?.name}</Text>
                    <Text style={styles.mudraSubtitle} numberOfLines={2}>
                        {mudra?.introCard?.introCardText}
                    </Text>
                </View>

                {/* ── Audio / Video tabs — only shown when both exist ── */}
                {audioVariants.length > 0 && videoVariants.length > 0 && (
                    <View style={styles.tabRow}>
                        <TouchableOpacity
                            style={[styles.tabBtn, activeTab === 'audio' && styles.tabBtnActive]}
                            activeOpacity={0.85}
                            onPress={() => setActiveTab('audio')}
                        >
                            <Ionicons
                                name="headset-outline"
                                size={16}
                                color={activeTab === 'audio' ? '#FFFFFF' : colors.textSub}
                            />
                            <Text style={[styles.tabLabel, activeTab === 'audio' && styles.tabLabelActive]}>
                                Audio
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.tabBtn, activeTab === 'video' && styles.tabBtnActive]}
                            activeOpacity={0.85}
                            onPress={() => setActiveTab('video')}
                        >
                            <Ionicons
                                name="videocam-outline"
                                size={16}
                                color={activeTab === 'video' ? '#FFFFFF' : colors.textSub}
                            />
                            <Text style={[styles.tabLabel, activeTab === 'video' && styles.tabLabelActive]}>
                                Video
                            </Text>
                        </TouchableOpacity>
                    </View>
                )}

                {!!statsLabel && (
                    <View style={styles.statsRow}>
                        <Text style={styles.statsText}>{statsLabel}</Text>
                    </View>
                )}

                {activeVariants.length === 0 ? (
                    <View style={styles.emptyState}>
                        <Ionicons
                            name={activeTab === 'audio' ? 'headset-outline' : 'videocam-outline'}
                            size={32}
                            color={colors.textSub}
                        />
                        <Text style={styles.emptyStateText}>
                            No {activeTab} sessions available for this mudra yet.
                        </Text>
                    </View>
                ) : (
                    <View style={styles.list}>
                        {activeVariants.map((item: any, index: number) => {
                            const palette = activeTab === 'audio' ? AUDIO_PALETTE : VIDEO_PALETTE;
                            const style_ = palette[index % palette.length];
                            const isRecommended = index === 0;
                            const isPlaylistItem = item.kind === 'playlist';
                            const description = getPlainDescription(item.description);

                            // Playlist items show which playlist they belong to;
                            // standalone items just say "Single session".
                            const sourceLabel = isPlaylistItem ? item.playlistTitle : 'Single session';

                            return (
                                <TouchableOpacity
                                    key={item.documentId}
                                    style={styles.variantCard}
                                    activeOpacity={0.85}
                                    onPress={() => handleSelectVariant(item)}
                                >
                                    <View style={[styles.variantIconCircle, { backgroundColor: style_.bg }]}>
                                        <Ionicons name={style_.icon} size={22} color="#1A1A1A" />
                                    </View>

                                    <View style={styles.variantTextBlock}>
                                        <View style={styles.variantTitleRow}>
                                            <Text style={styles.variantTitle} numberOfLines={1}>
                                                {item.title}
                                            </Text>

                                            {isPlaylistItem && (
                                                <View style={styles.playlistBadge}>
                                                    <Ionicons
                                                        name="list"
                                                        size={11}
                                                        color={styles.playlistBadgeText.color}
                                                        style={{ marginRight: 3 }}
                                                    />
                                                    <Text style={styles.playlistBadgeText}>Playlist</Text>
                                                </View>
                                            )}

                                            {isRecommended && (
                                                <View style={styles.recommendedBadge}>
                                                    <Text style={styles.recommendedBadgeText}>Recommended</Text>
                                                </View>
                                            )}
                                        </View>
                                        <Text style={styles.variantSubtitle} numberOfLines={1}>
                                            {description || sourceLabel}
                                            {`  ·  ${formatDuration(item.durationInSeconds)}`}
                                        </Text>
                                    </View>

                                    <TouchableOpacity
                                        style={styles.playBtn}
                                        activeOpacity={0.8}
                                        onPress={() => handleSelectVariant(item)}
                                    >
                                        <Ionicons name="play" size={16} color="#FFFFFF" />
                                    </TouchableOpacity>
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                )}
            </ScrollView>
        </View>
    );
}