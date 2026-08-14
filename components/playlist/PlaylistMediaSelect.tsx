import React, { useMemo, useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    ScrollView,
    StyleSheet,
    Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/constants/ThemeContext';
import AppHeader from '@/components/common/AppHeader';
import { usePlaylistStore, type PlaylistSession } from '@/store/playlistStore';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const moderateScale = (size: number, factor = 0.5) =>
    size + ((SCREEN_WIDTH - 375) / 375) * size * factor;

interface FlatMediaItem extends PlaylistSession {
    groupLabel?: string;
}

interface PlaylistMediaSelectProps {
    playlistId: string;
    rawItem: any;
    category: 'mudra' | 'nidra';
    onBack: () => void;
}

const readTitle = (obj: any, fallback: string) =>
    obj?.title ?? obj?.Title ?? obj?.name ?? obj?.Name ?? fallback;

const readDurationLabel = (obj: any) => {
    const seconds = obj?.durationInSeconds ?? obj?.DurationInSeconds;
    if (seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }
    if (obj?.duration) return String(obj.duration);
    if (obj?.Duration) return `${obj.Duration} min`;
    return '';
};

const readThumbnail = (obj: any) =>
    obj?.thumbnail?.url ?? obj?.Thumbnail?.url ?? obj?.image?.[0]?.url ?? null;

export default function PlaylistMediaSelect({
    playlistId,
    rawItem,
    category,
    onBack,
}: PlaylistMediaSelectProps) {
    const { colors } = useTheme();

    // Subscribing to the reactive `playlists` array itself — needed both so
    // the +/- toggle re-renders instantly, and so we can look up which
    // audio/video type THIS playlist was created as.
    const playlists = usePlaylistStore((s) => s.playlists);
    const isSessionInPlaylist = usePlaylistStore((s) => s.isSessionInPlaylist);
    const addSessionToPlaylist = usePlaylistStore((s) => s.addSessionToPlaylist);
    const removeSessionFromPlaylist = usePlaylistStore((s) => s.removeSessionFromPlaylist);

    const targetPlaylist = useMemo(
        () => playlists.find((p) => p.id === playlistId),
        [playlists, playlistId]
    );

    const [addedIds, setAddedIds] = useState<Set<string>>(
        () => new Set(targetPlaylist?.sessions.map((s) => s.id) ?? [])
    );

    // Keep local state in sync if the underlying playlist changes from elsewhere
    useEffect(() => {
        setAddedIds(new Set(targetPlaylist?.sessions.map((s) => s.id) ?? []));
    }, [targetPlaylist]);

    console.log('playlistId received:', playlistId, 'targetPlaylist found:', targetPlaylist, 'all local playlists:', playlists);
    
    const playlistType: 'audio' | 'video' = targetPlaylist?.type ?? 'audio';

    // ── Flatten this mudra/nidra's content, filtered to match the playlist's type ──
    const sections = useMemo(() => {
        if (category === 'nidra') {
            const isNidraVideo =
                rawItem.MediaType === 'VIDEO_SINGLE' || rawItem.MediaType === 'VIDEO_PLAYLIST';

            // Only show this nidra as addable if its media type matches
            // the target playlist's type (audio playlist ↔ audio nidra, etc).
            if ((playlistType === 'video') !== isNidraVideo) {
                return [];
            }

            const single: FlatMediaItem = {
                id: String(rawItem.documentId ?? rawItem.id),
                title: readTitle(rawItem, 'Untitled nidra'),
                duration: rawItem.Duration ? `${rawItem.Duration} min` : '',
                isVideo: isNidraVideo,
                thumbnail: rawItem.NidraIntroCard?.ThumbnailImage?.[0]?.url ?? null,
                contentTypeOfAudio: 'nidra',
            };
            return [{ label: 'Session', data: [single] }];
        }

        // mudra: only build the sections matching the playlist's type
        if (playlistType === 'audio') {
            const audioSingles: FlatMediaItem[] = (
                Array.isArray(rawItem.audioSingleSessions) ? rawItem.audioSingleSessions : []
            ).map((a: any) => ({
                id: String(a.documentId ?? a.id),
                title: readTitle(a, 'Untitled audio'),
                duration: readDurationLabel(a),
                isVideo: false,
                thumbnail: readThumbnail(a),
                contentTypeOfAudio: 'mudra',
            }));

            const audioFromPlaylists: FlatMediaItem[] = (
                Array.isArray(rawItem.audio_playlists) ? rawItem.audio_playlists : []
            ).flatMap((pl: any) =>
                (Array.isArray(pl.audios) ? pl.audios : []).map((a: any) => ({
                    id: String(a.documentId ?? a.id),
                    title: readTitle(a, 'Untitled audio'),
                    duration: readDurationLabel(a),
                    isVideo: false,
                    thumbnail: readThumbnail(a),
                    contentTypeOfAudio: 'mudra',
                    groupLabel: readTitle(pl, 'Playlist'),
                }))
            );

            const result = [];
            if (audioSingles.length) result.push({ label: 'Audio Sessions', data: audioSingles });
            if (audioFromPlaylists.length) result.push({ label: 'Audio Playlists', data: audioFromPlaylists });
            return result;
        }

        // playlistType === 'video'
        const videoSingles: FlatMediaItem[] = (
            Array.isArray(rawItem.videoSingleSessions) ? rawItem.videoSingleSessions : []
        ).map((v: any) => ({
            id: String(v.documentId ?? v.id),
            title: readTitle(v, 'Untitled video'),
            duration: readDurationLabel(v),
            isVideo: true,
            thumbnail: readThumbnail(v),
            contentTypeOfAudio: 'mudra',
        }));

        const videoFromPlaylists: FlatMediaItem[] = (
            Array.isArray(rawItem.video_playlists) ? rawItem.video_playlists : []
        ).flatMap((pl: any) =>
            (Array.isArray(pl.videos) ? pl.videos : []).map((v: any) => ({
                id: String(v.documentId ?? v.id),
                title: readTitle(v, 'Untitled video'),
                duration: readDurationLabel(v),
                isVideo: true,
                thumbnail: readThumbnail(v),
                contentTypeOfAudio: 'mudra',
                groupLabel: readTitle(pl, 'Playlist'),
            }))
        );

        const result = [];
        if (videoSingles.length) result.push({ label: 'Video Sessions', data: videoSingles });
        if (videoFromPlaylists.length) result.push({ label: 'Video Playlists', data: videoFromPlaylists });
        return result;
    }, [category, rawItem, playlistType]);

    const totalCount = sections.reduce((sum, s) => sum + s.data.length, 0);
    const selectedCount = sections.reduce(
        (sum, s) => sum + s.data.filter((item) => addedIds.has(item.id)).length,
        0
    );

    const handleToggle = (session: FlatMediaItem) => {
        setAddedIds((prev) => {
            const next = new Set(prev);
            if (next.has(session.id)) {
                next.delete(session.id);
                removeSessionFromPlaylist(playlistId, session.id);
            } else {
                next.add(session.id);
                addSessionToPlaylist(playlistId, session);
            }
            return next;
        });
    };

    const resolveThumbnailUri = (thumbnail?: string | null) => {
        if (!thumbnail) return undefined;
        return thumbnail.startsWith('http')
            ? thumbnail
            : `${process.env.EXPO_PUBLIC_IMAGE_API_URL}${thumbnail}`;
    };

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <AppHeader onBackPress={onBack} />

            <Text style={[styles.pageTitle, { color: colors.text }]} numberOfLines={1}>
                {readTitle(rawItem, 'Session')}
            </Text>
            <Text style={[styles.pageSubtitle, { color: colors.textSub }]}>
                {totalCount === 0
                    ? `No ${playlistType} content found`
                    : `${totalCount} ${playlistType} item${totalCount > 1 ? 's' : ''} available`}
            </Text>

            {totalCount === 0 ? (
                <View style={styles.emptyWrap}>
                    <Ionicons name="alert-circle-outline" size={26} color={colors.textMuted as string} />
                    <Text style={[styles.emptySub, { color: colors.textSub }]}>
                        This item doesn&apos;t have any linked {playlistType} content matching this playlist.
                    </Text>
                </View>
            ) : (
                <>
                    <ScrollView
                        contentContainerStyle={styles.listContent}
                        showsVerticalScrollIndicator={false}
                    >
                        {sections.map((section) => (
                            <View key={section.label} style={styles.section}>
                                <Text style={[styles.sectionLabel, { color: colors.textMuted as string }]}>
                                    {section.label.toUpperCase()}
                                </Text>

                                {section.data.map((item, index) => {
                                    const added = addedIds.has(item.id);
                                    const uri = resolveThumbnailUri(item.thumbnail);

                                    return (
                                        <View
                                            key={`${section.label}-${item.id}-${index}`}
                                            style={[
                                                styles.row,
                                                index !== section.data.length - 1 && {
                                                    borderBottomWidth: 0.38,
                                                    borderBottomColor: colors.dashedLine,
                                                },
                                            ]}
                                        >
                                            <View style={[styles.thumbWrap, { backgroundColor: colors.surfaceAlt }]}>
                                                {uri ? (
                                                    <Image source={{ uri }} style={styles.thumb} resizeMode="cover" />
                                                ) : (
                                                    <Ionicons
                                                        name={item.isVideo ? 'videocam' : 'musical-note'}
                                                        size={17}
                                                        color={colors.textMuted as string}
                                                    />
                                                )}
                                            </View>

                                            <View style={styles.rowMeta}>
                                                <Text style={[styles.rowTitle, { color: colors.text }]} numberOfLines={1}>
                                                    {item.title}
                                                </Text>
                                                <Text style={[styles.rowSub, { color: colors.textSub }]} numberOfLines={1}>
                                                    {item.duration ? `${item.duration}  ·  ` : ''}
                                                    {item.isVideo ? 'Video' : 'Audio'}
                                                    {item.groupLabel ? `  ·  ${item.groupLabel}` : ''}
                                                </Text>
                                            </View>

                                            <TouchableOpacity
                                                key={`${item.id}-${added}`}
                                                onPress={() => handleToggle(item)}
                                                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                                                style={[
                                                    styles.toggleBtn,
                                                    { backgroundColor: added ? colors.primary : colors.primaryLight },
                                                ]}
                                            >
                                                <Ionicons
                                                    name={added ? 'remove' : 'add'}
                                                    size={18}
                                                    color={added ? '#FFFFFF' : (colors.primary as string)}
                                                />
                                            </TouchableOpacity>
                                        </View>
                                    );
                                })}
                            </View>
                        ))}
                    </ScrollView>

                    <View style={[styles.doneBar, { backgroundColor: colors.background, borderTopColor: colors.dashedLine }]}>
                        <Text style={[styles.doneBarCount, { color: colors.textSub }]}>
                            {selectedCount} selected
                        </Text>
                        <TouchableOpacity
                            activeOpacity={0.85}
                            onPress={onBack}
                            style={[styles.doneBtn, { backgroundColor: colors.primary }]}
                        >
                            <Text style={styles.doneBtnText}>Done</Text>
                        </TouchableOpacity>
                    </View>
                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    pageTitle: {
        fontFamily: 'SF-Pro-Display',
        fontWeight: '600',
        fontSize: moderateScale(19),
        textAlign: 'center',
        paddingHorizontal: moderateScale(24),
        marginTop: moderateScale(4),
    },
    pageSubtitle: {
        fontFamily: 'SF-Pro-Display',
        fontWeight: '400',
        fontSize: moderateScale(12.5),
        textAlign: 'center',
        marginTop: moderateScale(4),
        marginBottom: moderateScale(16),
    },
    listContent: {
        paddingHorizontal: moderateScale(16),
        paddingBottom: moderateScale(24),
    },
    section: {
        marginBottom: moderateScale(18),
    },
    sectionLabel: {
        fontFamily: 'SF-Pro-Display',
        fontSize: moderateScale(11),
        fontWeight: '600',
        letterSpacing: 0.4,
        marginBottom: moderateScale(6),
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: moderateScale(12),
        paddingVertical: moderateScale(10),
    },
    thumbWrap: {
        width: moderateScale(44),
        height: moderateScale(44),
        borderRadius: moderateScale(11),
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        flexShrink: 0,
    },
    thumb: {
        width: '100%',
        height: '100%',
    },
    rowMeta: {
        flex: 1,
        minWidth: 0,
        gap: moderateScale(3),
    },
    rowTitle: {
        fontFamily: 'SF-Pro-Display',
        fontSize: moderateScale(14),
        fontWeight: '500',
    },
    rowSub: {
        fontFamily: 'SF-Pro-Display',
        fontSize: moderateScale(12),
    },
    toggleBtn: {
        width: moderateScale(32),
        height: moderateScale(32),
        borderRadius: moderateScale(16),
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
    },
    emptyWrap: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: moderateScale(32),
        gap: moderateScale(10),
    },
    emptySub: {
        fontFamily: 'SF-Pro-Display',
        fontSize: moderateScale(13),
        textAlign: 'center',
        lineHeight: moderateScale(19),
    },
    doneBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: moderateScale(20),
        paddingTop: moderateScale(12),
        paddingBottom: moderateScale(20),
        borderTopWidth: 0.5,
    },
    doneBarCount: {
        fontFamily: 'SF-Pro-Display',
        fontSize: moderateScale(13),
        fontWeight: '500',
    },
    doneBtn: {
        borderRadius: moderateScale(14),
        paddingHorizontal: moderateScale(28),
        paddingVertical: moderateScale(11),
    },
    doneBtnText: {
        fontFamily: 'SF-Pro-Display',
        fontWeight: '600',
        fontSize: moderateScale(14),
        color: '#FFFFFF',
    },
});