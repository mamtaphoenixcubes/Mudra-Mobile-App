import React, { useMemo, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    Dimensions,
    Alert,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/constants/ThemeContext';
import { usePlaylistStore } from '@/store/playlistStore';
import AppHeader from '@/components/common/AppHeader';
import StandaloneTabBar from '@/components/home/StandaloneTabBar';
import ConfirmModal from '@/components/common/ConfirmModal';
import CreatePlaylistModal from '@/components/playlist/CreatePlaylistModal';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const moderateScale = (size: number, factor = 0.5) =>
    size + ((SCREEN_WIDTH - 375) / 375) * size * factor;

const DANGER_COLOR = '#E24B4A';

type FilterTab = 'all' | 'audio' | 'video';

export default function PlaylistDetailScreen() {
    const { colors } = useTheme();

  const { id, playlistType } = useLocalSearchParams<{
    id: string;
    playlistType: 'audio' | 'video';
}>();
    const playlistId = typeof id === 'string' ? id : '';
    const audioPlaylists = usePlaylistStore((s) => s.audioPlaylists);
    const videoPlaylists = usePlaylistStore((s) => s.videoPlaylists);
    const removeAudiosFromPlaylist = usePlaylistStore(
        (s) => s.removeAudiosFromPlaylist
    );
    const removeVideosFromPlaylist = usePlaylistStore(
        (s) => s.removeVideosFromPlaylist
    );
    type AudioFilter = 'all' | 'mudra' | 'nidra';

    const [audioFilter, setAudioFilter] = useState<AudioFilter>('all');
    const [filterMenuVisible, setFilterMenuVisible] = useState(false);
    const deletePlaylist = usePlaylistStore((s) => s.deletePlaylist);

    const [tab, setTab] = useState<FilterTab>('all');

    const [menuVisible, setMenuVisible] = useState(false);
    const [selectionMode, setSelectionMode] = useState(false);
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
    const [deleteConfirmVisible, setDeleteConfirmVisible] = useState(false);
    const createPlaylist = usePlaylistStore((s) => s.createPlaylist);
    const [createModalVisible, setCreateModalVisible] = useState(false);

    const playlist = useMemo(() => {
        return (
            audioPlaylists.find(
                (item) => String(item.documentId || item.id) === playlistId
            ) ||
            videoPlaylists.find(
                (item) => String(item.documentId || item.id) === playlistId
            ) ||
            null
        );
    }, [audioPlaylists, videoPlaylists, playlistId]);

    const mappedSessions = useMemo(() => {
        if (!playlist) return [];

        if (playlist.audios) {
            return playlist.audios.map((audio) => ({
                id: String(audio.documentId || audio.id || ''),
                title: audio.title || 'Untitled audio',
                duration: audio.durationInSeconds
                    ? formatDuration(audio.durationInSeconds)
                    : '',
                isVideo: false,
                thumbnail: audio.thumbnail?.url || null,
                contentTypeOfAudio: audio.contentTypeOfAudio,
                media: audio,
            }));
        }

        if (playlist.videos) {
            return playlist.videos.map((video) => ({
                id: String(video.documentId || video.id || ''),
                title: video.title || 'Untitled video',
                duration: video.durationInSeconds
                    ? formatDuration(video.durationInSeconds)
                    : '',
                isVideo: true,
                thumbnail: video.thumbnail?.url || null,
                contentTypeOfAudio: undefined, // <-- add this
                media: video,
            }));
        }

        return [];
    }, [playlist]);


    const audioSessions = useMemo(() => mappedSessions.filter((s) => !s.isVideo), [mappedSessions]);
    const videoSessions = useMemo(() => mappedSessions.filter((s) => s.isVideo), [mappedSessions]);

    const handleRemove = (sessionId: string, title: string) => {
        Alert.alert(
            'Remove session?',
            `"${title}" will be removed from this playlist.`,
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Remove',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            if (playlist?.audios) {
                                await removeAudiosFromPlaylist(
                                    playlistId,
                                    [sessionId]
                                );
                            } else {
                                await removeVideosFromPlaylist(
                                    playlistId,
                                    [sessionId]
                                );
                            }
                        } catch (error) {
                            console.log(error);
                        }
                    },
                },
            ]
        );
    };



    const enterSelectionMode = () => {
        setMenuVisible(false);
        setSelectionMode(true);
        setSelectedIds(new Set());
    };

    const exitSelectionMode = () => {
        setSelectionMode(false);
        setSelectedIds(new Set());
    };

    const toggleSelectItem = (sessionId: string) => {
        setSelectedIds((prev) => {
            const next = new Set(prev);
            if (next.has(sessionId)) {
                next.delete(sessionId);
            } else {
                next.add(sessionId);
            }
            return next;
        });
    };

    const handleSelectAll = () => {
        if (selectedIds.size === visibleSessions.length) {
            setSelectedIds(new Set());
        } else {
            setSelectedIds(new Set(visibleSessions.map((s) => s.id)));
        }
    };

    const handleConfirmDeleteSelected = async () => {
        try {
            const ids = Array.from(selectedIds);

            if (playlist?.audios) {
                await removeAudiosFromPlaylist(
                    playlistId,
                    ids
                );
            } else {
                await removeVideosFromPlaylist(
                    playlistId,
                    ids
                );
            }

            setSelectedIds(new Set());
            setSelectionMode(false);
            setDeleteConfirmVisible(false);
        } catch (error) {
            console.error(error);
        }
    };
    const visibleSessions = useMemo(() => {
        let sessions =
            tab === 'audio'
                ? audioSessions
                : tab === 'video'
                    ? videoSessions
                    : mappedSessions;

        if (audioFilter === 'all') {
            return sessions;
        }

        return sessions.filter(
            (item) =>
                !item.isVideo &&
                item.contentTypeOfAudio === audioFilter
        );
    }, [
        tab,
        audioSessions,
        videoSessions,
        mappedSessions,
        audioFilter,
    ]);

    const handleDeletePlaylist = () => {
        Alert.alert(
            'Delete playlist?',
            `"${playlist?.title || 'This playlist'}" will be permanently deleted.`,
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: () => {
                        deletePlaylist(playlistId);
                        router.back();
                    },
                },
            ]
        );
    };

    if (!playlist) {
        return (
            <View style={[styles.container, { backgroundColor: colors.background }]}>
                <AppHeader />
                <View style={styles.notFoundWrap}>
                    <Text style={[styles.notFoundText, { color: colors.textSub }]}>
                        This playlist no longer exists.
                    </Text>
                </View>
                <StandaloneTabBar />
            </View>
        );
    }

    const audioCount = audioSessions.length;
    const videoCount = videoSessions.length;
    const totalCount = mappedSessions.length;



    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            {/* Header */}
            <AppHeader
                rightIcon={
                    selectionMode ? (
                        <TouchableOpacity
                            onPress={exitSelectionMode}
                            style={styles.headerActionBtn}
                            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                        >
                            <Ionicons name="close" size={22} color={colors.primary} />
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity
                            onPress={() => setMenuVisible(true)}
                            style={styles.headerActionBtn}
                            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                        >
                            <Ionicons name="ellipsis-vertical" size={20} color={colors.textSub} />
                        </TouchableOpacity>
                    )
                }
            />

            {/* Options dropdown */}
            {menuVisible && (
                <>
                    <TouchableOpacity
                        style={styles.menuBackdrop}
                        activeOpacity={1}
                        onPress={() => setMenuVisible(false)}
                    />
                    <View
                        style={[
                            styles.menuCard,
                            { backgroundColor: colors.card, borderColor: colors.dividerDark },
                        ]}
                    >
                        <TouchableOpacity
                            style={styles.menuItem}
                            activeOpacity={0.7}
                            onPress={enterSelectionMode}
                        >
                            <Ionicons name="checkmark-circle-outline" size={18} color={colors.text} />
                            <Text style={[styles.menuItemText, { color: colors.text }]}>Select</Text>
                        </TouchableOpacity>

                        <View style={[styles.menuDivider, { backgroundColor: colors.dividerDark }]} />

                        <TouchableOpacity
                            style={styles.menuItem}
                            activeOpacity={0.7}
                            onPress={() => {
                                setMenuVisible(false);
                                setFilterMenuVisible(true);
                            }}
                        >
                            <Ionicons name="filter-outline" size={18} color={colors.text} />
                            <Text style={[styles.menuItemText, { color: colors.text }]}>Filter</Text>
                        </TouchableOpacity>

                        <View style={[styles.menuDivider, { backgroundColor: colors.dividerDark }]} />

                      <TouchableOpacity
    style={styles.menuItem}
    activeOpacity={0.7}
    onPress={() => {
        setMenuVisible(false);

        router.push({
            pathname: '/playlistcategoryselect',
            params: {
                playlistId,
                playlistName: playlist?.title || '',
                playlistType: playlistType || 'audio',
            },
        });
                    }}
                >
                    <Ionicons name="add-circle-outline" size={18} color={colors.text} />

                    <Text style={[styles.menuItemText, { color: colors.text }]}>
                        {playlistType === 'video' ? 'Add Video' : 'Add Audios'}
                    </Text>
                </TouchableOpacity>
                                    </View>
                                </>
                            )}
            {filterMenuVisible && (
                <>
                    <TouchableOpacity
                        style={styles.menuBackdrop}
                        activeOpacity={1}
                        onPress={() => setFilterMenuVisible(false)}
                    />

                    <View
                        style={[
                            styles.menuCard,
                            {
                                backgroundColor: colors.card,
                                borderColor: colors.dividerDark,
                            },
                        ]}
                    >
                        {['all', 'mudra', 'nidra'].map((item) => (
                            <TouchableOpacity
                                key={item}
                                style={styles.menuItem}
                                onPress={() => {
                                    setAudioFilter(item as 'all' | 'mudra' | 'nidra');
                                    setFilterMenuVisible(false);
                                }}
                            >
                                <Text
                                    style={[
                                        styles.menuItemText,
                                        {
                                            color:
                                                audioFilter === item
                                                    ? colors.primary
                                                    : colors.text,
                                            fontWeight:
                                                audioFilter === item
                                                    ? '700'
                                                    : '500',
                                        },
                                    ]}
                                >
                                    {item.charAt(0).toUpperCase() + item.slice(1)}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </>
            )}
            {/* Title block */}
            <View style={styles.titleBlock}>
                <View style={[styles.iconCircle, { backgroundColor: colors.primaryLight }]}>
                    <Ionicons name="list" size={26} color={colors.primary} />
                </View>
                <Text style={[styles.playlistName, { color: colors.text }]} numberOfLines={2}>
                    {playlist.title}
                </Text>
                <Text style={[styles.playlistMeta, { color: colors.textSub }]}>
                    {totalCount === 0
                        ? 'Empty playlist'
                        : `${totalCount} session${totalCount > 1 ? 's' : ''}`}
                    {totalCount > 0 && audioCount > 0 && videoCount > 0
                        ? ` · ${audioCount} audio · ${videoCount} video`
                        : ''}
                </Text>
            </View>



            {/* Select All / Delete bar — only in selection mode */}
            {selectionMode && totalCount > 0 && (
                <View
                    style={[
                        styles.selectionBar,
                        { borderBottomColor: colors.dividerDark, borderTopColor: colors.dividerDark },
                    ]}
                >
                    <TouchableOpacity onPress={handleSelectAll} activeOpacity={0.7} style={styles.selectAllBtn}>
                        <View
                            style={[
                                styles.checkCircleSm,
                                selectedIds.size === visibleSessions.length && visibleSessions.length > 0
                                    ? { backgroundColor: colors.primary, borderColor: colors.primary }
                                    : { borderColor: colors.dividerDark },
                            ]}
                        >
                            {selectedIds.size === visibleSessions.length && visibleSessions.length > 0 && (
                                <Ionicons name="checkmark" size={11} color="#FFFFFF" />
                            )}
                        </View>
                        <Text style={[styles.selectAllText, { color: colors.text }]}>
                            {selectedIds.size === visibleSessions.length ? 'Deselect all' : 'Select all'}
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => setDeleteConfirmVisible(true)}
                        disabled={selectedIds.size === 0}
                        activeOpacity={0.7}
                        style={[
                            styles.deleteSelectedBtn,
                            {
                                backgroundColor:
                                    selectedIds.size === 0 ? colors.surfaceAlt : `${DANGER_COLOR}18`,
                            },
                        ]}
                    >
                        <Ionicons
                            name="trash-outline"
                            size={15}
                            color={selectedIds.size === 0 ? colors.textMuted : DANGER_COLOR}
                        />
                        <Text
                            style={[
                                styles.deleteSelectedText,
                                { color: selectedIds.size === 0 ? colors.textMuted : DANGER_COLOR },
                            ]}
                        >
                            Delete{selectedIds.size > 0 ? ` (${selectedIds.size})` : ''}
                        </Text>
                    </TouchableOpacity>
                </View>
            )}

            {/* Sessions */}
            {totalCount === 0 ? (
                <View style={styles.emptyWrap}>
                    <Text style={[styles.emptyText, { color: colors.textSub }]}>
                        No audio items in this playlist yet.
                    </Text>
                </View>
            ) : (
                <ScrollView
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                >
                    {visibleSessions.map((session, index) => {
                        const isSelected = selectedIds.has(session.id);
                        const isMudra = session.contentTypeOfAudio === 'mudra';
                        const isNidra = session.contentTypeOfAudio === 'nidra';

                        const iconBg = session.isVideo
                            ? colors.surfaceAlt
                            : isMudra
                                ? '#E8F5E9'
                                : '#E3F2FD';

                        const iconColor = session.isVideo
                            ? colors.textSub
                            : isMudra
                                ? '#2E7D32'
                                : '#1565C0';
                        return (
                            <TouchableOpacity
                                key={session.id}
                                activeOpacity={0.7}
                                onPress={() => {
                                    if (selectionMode) {
                                        toggleSelectItem(session.id);
                                        return;
                                    }

                                    router.push({
                                        pathname: '/mudrasessionplayer',
                                        params: {
                                            playlistId,
                                            mediaId: session.id,
                                            isPlaylist: 'true',
                                        },
                                    });
                                }}
                                style={[
                                    styles.row,
                                    index !== visibleSessions.length - 1 && {
                                        borderBottomWidth: 0.38,
                                        borderBottomColor: colors.dashedLine,
                                    },
                                ]}
                            >
                                {selectionMode && (
                                    <View
                                        style={[
                                            styles.checkCircle,
                                            isSelected
                                                ? { backgroundColor: colors.primary, borderColor: colors.primary }
                                                : { borderColor: colors.dividerDark },
                                        ]}
                                    >
                                        {isSelected && <Ionicons name="checkmark" size={13} color="#FFFFFF" />}
                                    </View>
                                )}

                                <View
                                    style={[
                                        styles.rowIconBox,
                                        {
                                            backgroundColor: iconBg,
                                        },
                                    ]}
                                >
                                    <Ionicons
                                        name={session.isVideo ? 'videocam' : 'musical-note'}
                                        size={17}
                                        color={iconColor}
                                    />
                                </View>

                                <View style={styles.rowMeta}>
                                    <Text style={[styles.rowTitle, { color: colors.text }]} numberOfLines={1}>
                                        {session.title}
                                    </Text>
                                    <Text style={[styles.rowSub, { color: colors.textSub }]}>
                                        {session.duration ? `${session.duration}  ·  ` : ''}
                                        {session.isVideo ? 'Video' : 'Audio'}
                                    </Text>
                                </View>

                                {!selectionMode && (
                                    <TouchableOpacity
                                        onPress={() => handleRemove(session.id, session.title)}
                                        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                                    >
                                        <Ionicons name="close-circle-outline" size={20} color={colors.textMuted} />
                                    </TouchableOpacity>
                                )}
                            </TouchableOpacity>
                        );
                    })}
                </ScrollView>
            )}

            <ConfirmModal
                visible={deleteConfirmVisible}
                type="deleteSessions"
                onConfirm={handleConfirmDeleteSelected}
                onCancel={() => setDeleteConfirmVisible(false)}
            />
            <CreatePlaylistModal
                visible={createModalVisible}
                onClose={() => setCreateModalVisible(false)}
                onCreate={(name) => {
                    createPlaylist(name, playlist?.audios ? 'audio' : 'video');
                    setCreateModalVisible(false);
                }}
            />

            <StandaloneTabBar />
        </View>
    );
}

const formatDuration = (seconds: number) => {
    if (!seconds || seconds <= 0) return '';

    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerActionBtn: {
        minWidth: moderateScale(32),
        height: moderateScale(32),
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    cancelText: {
        fontFamily: 'SF-Pro-Display',
        fontSize: moderateScale(14),
        fontWeight: '500',
    },

    // ── Options dropdown ──
    menuBackdrop: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 10,
    },
    menuCard: {
        position: 'absolute',
        top: moderateScale(88),
        right: moderateScale(16),
        borderRadius: moderateScale(14),
        borderWidth: 0.5,
        paddingVertical: moderateScale(4),
        zIndex: 11,
        minWidth: moderateScale(150),
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.12,
        shadowRadius: 12,
        elevation: 6,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: moderateScale(10),
        paddingVertical: moderateScale(11),
        paddingHorizontal: moderateScale(14),
    },
    menuItemText: {
        fontFamily: 'SF-Pro-Display',
        fontSize: moderateScale(14),
        fontWeight: '500',
    },

    // ── Title ──
    titleBlock: {
        alignItems: 'center',
        paddingTop: moderateScale(8),
        paddingBottom: moderateScale(16),
        paddingHorizontal: moderateScale(24),
        gap: moderateScale(4),
    },
    iconCircle: {
        width: moderateScale(64),
        height: moderateScale(64),
        borderRadius: moderateScale(18),
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: moderateScale(8),
    },
    playlistName: {
        fontFamily: 'SF-Pro-Display',
        fontSize: moderateScale(19),
        fontWeight: '700',
        textAlign: 'center',
    },
    playlistMeta: {
        fontFamily: 'SF-Pro-Display',
        fontSize: moderateScale(12.5),
        textAlign: 'center',
    },

    // ── Tabs ──
    tabRow: {
        flexDirection: 'row',
        gap: moderateScale(6),
        paddingHorizontal: moderateScale(16),
        marginBottom: moderateScale(12),
    },
    tabBtn: {
        flex: 1,
        borderRadius: moderateScale(10),
        paddingVertical: moderateScale(8),
        alignItems: 'center',
    },
    tabBtnText: {
        fontFamily: 'SF-Pro-Display',
        fontSize: moderateScale(13),
        fontWeight: '500',
    },

    // ── Selection bar ──
    selectionBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: moderateScale(20),
        paddingVertical: moderateScale(10),
        borderTopWidth: 0.38,
        borderBottomWidth: 0.38,
        marginBottom: moderateScale(4),
    },
    selectAllBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: moderateScale(8),
    },
    selectAllText: {
        fontFamily: 'SF-Pro-Display',
        fontSize: moderateScale(13),
        fontWeight: '500',
    },
    checkCircleSm: {
        width: moderateScale(18),
        height: moderateScale(18),
        borderRadius: moderateScale(9),
        borderWidth: 1.5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    deleteSelectedBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: moderateScale(6),
        paddingHorizontal: moderateScale(12),
        paddingVertical: moderateScale(7),
        borderRadius: moderateScale(10),
    },
    deleteSelectedText: {
        fontFamily: 'SF-Pro-Display',
        fontSize: moderateScale(13),
        fontWeight: '500',
    },

    // ── List ──
    listContent: {
        paddingHorizontal: moderateScale(20),
        paddingBottom: moderateScale(100),
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: moderateScale(12),
        paddingVertical: moderateScale(11),
    },
    checkCircle: {
        width: moderateScale(20),
        height: moderateScale(20),
        borderRadius: moderateScale(10),
        borderWidth: 1.5,
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
    },
    rowIconBox: {
        width: moderateScale(42),
        height: moderateScale(42),
        borderRadius: moderateScale(11),
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
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

    // ── Empty / not found ──
    emptyWrap: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: moderateScale(32),
    },
    emptyText: {
        fontFamily: 'SF-Pro-Display',
        fontSize: moderateScale(13),
        textAlign: 'center',
        lineHeight: moderateScale(19),
    },
    notFoundWrap: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    notFoundText: {
        fontFamily: 'SF-Pro-Display',
        fontSize: moderateScale(14),
    },
    menuDivider: {
        height: 0.38,
        marginHorizontal: moderateScale(4),
    },
});