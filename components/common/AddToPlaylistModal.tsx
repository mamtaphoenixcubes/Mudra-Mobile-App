import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
    Modal,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Pressable,
    StyleSheet,
    ScrollView,
    Animated,
    Dimensions,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import axios from 'axios';
import { useTheme } from '@/constants/ThemeContext';
import { useAuthStore } from '@/store/authStore';
import { PlaylistSession, usePlaylistStore } from '@/store/playlistStore';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const moderateScale = (size: number, factor = 0.5) =>
    size + ((SCREEN_WIDTH - 375) / 375) * size * factor;

// ── Icons ─────────────────────────────────────────────────────────────────────
const CloseIcon = ({ color }: { color: string }) => (
    <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
        <Path d="M18 6L6 18M6 6L18 18" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
    </Svg>
);

const BackIcon = ({ color }: { color: string }) => (
    <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
        <Path d="M19 12H5M5 12L12 19M5 12L12 5" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
);

const SearchIcon = ({ color }: { color: string }) => (
    <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
        <Circle cx="11" cy="11" r="7" stroke={color} strokeWidth="2" />
        <Path d="M21 21L16.65 16.65" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </Svg>
);

const PlusIcon = ({ color }: { color: string }) => (
    <Svg width={19} height={19} viewBox="0 0 24 24" fill="none">
        <Path d="M12 5V19M5 12H19" stroke={color} strokeWidth="2.3" strokeLinecap="round" />
    </Svg>
);

const CheckIcon = ({ color }: { color: string }) => (
    <Svg width={12} height={12} viewBox="0 0 24 24" fill="none">
        <Path d="M20 6L9 17L4 12" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
);

const PlaylistIcon = ({ color }: { color: string }) => (
    <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
        <Path d="M4 6H15M4 12H15M4 18H10" stroke={color} strokeWidth="2" strokeLinecap="round" />
        <Circle cx="19" cy="17" r="3" stroke={color} strokeWidth="2" />
        <Path d="M19 10V14" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </Svg>
);

// ── Props ─────────────────────────────────────────────────────────────────────
interface AddToPlaylistModalProps {
    visible: boolean;
    onClose: () => void;
    session: PlaylistSession; // the audio/video session being added
}

type ScreenMode = 'list' | 'create';

interface RemotePlaylistAudio {
    id?: number;
    documentId?: string;
    title?: string;
    contentTypeOfAudio?: string;
}

interface RemotePlaylistVideo {
    id?: number;
    documentId?: string;
    title?: string;
    contentTypeOfVideo?: string;
}

interface RemotePlaylist {
    id?: number;
    documentId?: string;
    title?: string;
    description?: string | null;

    contentTypeOfAudio?: string;
    contentTypeOfVideo?: string;

    audios?: RemotePlaylistAudio[];
    videos?: RemotePlaylistVideo[];
}
// ── Component ─────────────────────────────────────────────────────────────────
export default function AddToPlaylistModal({
    visible,
    onClose,
    session,
}: AddToPlaylistModalProps) {
    const { colors } = useTheme();
    const insets = useSafeAreaInsets();
    const { token, user } = useAuthStore();

    const [mode, setMode] = useState<ScreenMode>('list');
    const [search, setSearch] = useState('');
    const [newName, setNewName] = useState('');
    const [nameFocused, setNameFocused] = useState(false);
    const [isCreating, setIsCreating] = useState(false);
    const [playlists, setPlaylists] = useState<RemotePlaylist[]>([]);

    const translateY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
    const opacityAnim = useRef(new Animated.Value(0)).current;

    const profileDocumentId: string = user?.id || user?.profileDocumentId || '';

    const {
    audioPlaylists,
    videoPlaylists,
    isLoadingPlaylists,
    fetchUserPlaylists,
    fetchVideoPlaylists,
} = usePlaylistStore();

   useEffect(() => {
    if (!visible) return;

    // Fetch based on media type
    if (session.isVideo) {
        fetchVideoPlaylists(profileDocumentId, token || undefined);
    } else {
        fetchUserPlaylists(profileDocumentId, token || undefined);
    }
}, [visible, profileDocumentId, token, fetchUserPlaylists, fetchVideoPlaylists, session.isVideo]);

useEffect(() => {
    setPlaylists(
        session.isVideo
            ? videoPlaylists
            : audioPlaylists
    );
}, [session.isVideo, audioPlaylists, videoPlaylists]);

    const handleShow = () => {
        setMode('list');
        setSearch('');
        setNewName('');
        setNameFocused(false);
        Animated.parallel([
            Animated.timing(opacityAnim, { toValue: 1, duration: 200, useNativeDriver: true }),
            Animated.spring(translateY, { toValue: 0, friction: 9, tension: 65, useNativeDriver: true }),
        ]).start();
    };

    const handleClose = () => {
        Animated.parallel([
            Animated.timing(opacityAnim, { toValue: 0, duration: 160, useNativeDriver: true }),
            Animated.timing(translateY, { toValue: SCREEN_HEIGHT, duration: 200, useNativeDriver: true }),
        ]).start(() => onClose());
    };

    const filteredPlaylists = useMemo(() => {
        if (!search.trim()) return playlists;
        return playlists.filter((p) =>
            (p.title || '').toLowerCase().includes(search.trim().toLowerCase())
        );
    }, [playlists, search]);

    const [selectedPlaylistId, setSelectedPlaylistId] = useState<string | null>(null);

    const toggleSession = (playlistId: string, alreadyIn: boolean) => {
        if (alreadyIn) {
            return;
        }

        setSelectedPlaylistId(playlistId);

        const playlist = playlists.find((item) => String(item.documentId || item.id) === playlistId);
        if (!playlist) return;

        // Update based on media type
        if (session.isVideo) {
            setPlaylists((prev) =>
                prev.map((item) =>
                    String(item.documentId || item.id) === playlistId
                        ? {
                            ...item,
                            videos: [...(item.videos || []), { documentId: session.id }],
                        }
                        : item
                )
            );
        } else {
            setPlaylists((prev) =>
                prev.map((item) =>
                    String(item.documentId || item.id) === playlistId
                        ? {
                            ...item,
                            audios: [...(item.audios || []), { documentId: session.id }],
                        }
                        : item
                )
            );
        }
    };

    const handleAddToSelectedPlaylist = async () => {
        if (!selectedPlaylistId || !session?.id) return;

        try {
            if (session.isVideo) {
                await axios.put(
                    `${process.env.EXPO_PUBLIC_API_URL}/video-playlists/${selectedPlaylistId}/videos`,
                    {
                        videoDocumentIds: [session.id],
                    },
                    {
                        headers: token
                            ? {
                                Authorization: `Bearer ${token}`,
                            }
                            : undefined,
                    }
                );
            } else {
                await axios.put(
                    `${process.env.EXPO_PUBLIC_API_URL}/audio-playlists/${selectedPlaylistId}/audios`,
                    {
                        audioDocumentIds: [session.id],
                        contentTypeOfAudio:[session.contentTypeOfAudio]
                    },
                    {
                        headers: token
                            ? {
                                Authorization: `Bearer ${token}`,
                            }
                            : undefined,
                    }
                );
            }

            setPlaylists((prev) =>
                prev.map((item) =>
                    String(item.documentId || item.id) === selectedPlaylistId
                        ? {
                            ...item,
                            [session.isVideo ? 'videos' : 'audios']: [
                                ...(session.isVideo ? item.videos || [] : item.audios || []),
                                { documentId: session.id },
                            ],
                        }
                        : item
                )
            );
        } catch (error: any) {
            console.log('ADD_TO_PLAYLIST_ERROR', error?.response?.data || error);
        } finally {
            handleClose();
        }
    };

    const handleCreatePlaylist = async () => {
    const trimmedName = newName.trim();
    if (!trimmedName || isCreating) return;

    const description = `${trimmedName} playlist`;
    setIsCreating(true);

    try {
        let playlistDocumentId: string | null = null;

        const createEndpoint = session.isVideo
            ? 'video-playlists/create'
            : 'audio-playlists';

        const updateEndpoint = session.isVideo
            ? 'video-playlists'
            : 'audio-playlists';

        const updateField = session.isVideo
            ? 'videos'
            : 'audios';
console.log(
    "contentTypeOfAudio:",
    session.contentTypeOfAudio,
    typeof session.contentTypeOfAudio
);
        const requestBody = session.isVideo
            ? { videoDocumentIds: [session.id],contentTypeOfAudio:session.contentTypeOfAudio }
            : { audioDocumentIds: [session.id],contentTypeOfAudio:session.contentTypeOfAudio };

        if (profileDocumentId) {
            // Create playlist
            const result = await axios.post(
                `${process.env.EXPO_PUBLIC_API_URL}/${createEndpoint}`,
                {
                    profileDocumentId,
                    title: trimmedName,
                    description,
                    contentTypeOfAudio:session.contentTypeOfAudio
                },
                {
                    headers: token
                        ? {
                              Authorization: `Bearer ${token}`,
                          }
                        : undefined,
                }
            );

            const payload =
                result?.data?.data?.data ??
                result?.data?.data ??
                result?.data;

            playlistDocumentId =
                payload?.documentId ||
                payload?.id ||
                null;

            // Add audio/video to newly created playlist
            if (playlistDocumentId && session.id) {
                await axios.put(
                    `${process.env.EXPO_PUBLIC_API_URL}/${updateEndpoint}/${playlistDocumentId}/${updateField}`,
                    requestBody,
                    {
                        headers: token
                            ? {
                                  Authorization: `Bearer ${token}`,
                              }
                            : undefined,
                    }
                );
            }

            // Update local state
            if (playlistDocumentId) {
                const newPlaylist: any = {
                    documentId: playlistDocumentId,
                    title: trimmedName,
                    description,
                };

                if (session.isVideo) {
                    newPlaylist.videos = [
                        { documentId: session.id },
                    ];
                } else {
                    newPlaylist.audios = [
                        { documentId: session.id },
                    ];
                }

                setPlaylists((prev) => [newPlaylist, ...prev]);
            }
        }
    } catch (error: any) {
        console.log(
            'CREATE_PLAYLIST_ERROR',
            error?.response?.data || error
        );
    } finally {
        setMode('list');
        setNewName('');
        setIsCreating(false);
    }
};

    return (
        <Modal
            visible={visible}
            transparent
            animationType="none"
            statusBarTranslucent
            onRequestClose={handleClose}
            onShow={handleShow}
        >
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' :  'height'}
            >
                <Animated.View style={[styles.backdropWrap, { opacity: opacityAnim }]}>
                    {/*
                      Sibling Pressable behind the sheet, NOT a wrapper around it —
                      same fix used in ImageViewerModal. A Touchable/Pressable
                      *wrapping* the ScrollView list below would fight with its
                      scroll gesture. As a sibling it only catches taps outside
                      the sheet's bounds.
                    */}
                    <Pressable
                        style={StyleSheet.absoluteFillObject}
                        onPress={handleClose}
                    />

                    <Animated.View
                        style={[
                            styles.sheet,
                            {
                                backgroundColor: colors.card,
                                paddingBottom: insets.bottom || moderateScale(16),
                                transform: [{ translateY }],
                            },
                        ]}
                    >
                        <View style={styles.grabberRow}>
                            <View style={[styles.grabber, { backgroundColor: colors.dividerDark }]} />
                        </View>

                        {mode === 'list' ? (
                            <>
                                {/* Header */}
                                <View style={styles.header}>
                                    <View style={styles.headerTextWrap}>
                                        <Text style={[styles.headerTitle, { color: colors.text }]}>
                                            Add to playlist
                                        </Text>
                                        <Text style={[styles.headerSubtitle, { color: colors.textSub }]}>
                                            Save this session to a playlist
                                        </Text>
                                    </View>
                                    <TouchableOpacity
                                        onPress={handleClose}
                                        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                                    >
                                        <CloseIcon color={colors.textSub} />
                                    </TouchableOpacity>
                                </View>

                                {/* Search */}
                                <View style={styles.searchWrap}>
                                    <View style={[styles.searchBox, { backgroundColor: colors.inputBg }]}>
                                        <SearchIcon color={colors.textMuted} />
                                        <TextInput
                                            value={search}
                                            onChangeText={setSearch}
                                            placeholder="Find a playlist"
                                            placeholderTextColor={colors.textMuted}
                                            style={[styles.searchInput, { color: colors.text }]}
                                        />
                                    </View>
                                </View>

                                {/* Create new playlist row */}
                                <TouchableOpacity
                                    activeOpacity={0.7}
                                    onPress={() => setMode('create')}
                                    style={[styles.createRow, { backgroundColor: colors.primaryLight }]}
                                >
                                    <View style={[styles.createIconCircle, { backgroundColor: colors.primary }]}>
                                        <PlusIcon color={colors.white} />
                                    </View>
                                    <Text style={[styles.createRowText, { color: colors.primary }]}>
                                        Create new playlist
                                    </Text>
                                </TouchableOpacity>

                                {/* Playlist list */}
                                <Text style={[styles.sectionLabel, { color: colors.textMuted }]}>
                                    YOUR PLAYLISTS
                                </Text>

                                <ScrollView
                                    style={styles.list}
                                    showsVerticalScrollIndicator={false}
                                    keyboardShouldPersistTaps="handled"
                                >
                                    {isLoadingPlaylists && (
                                        <Text style={[styles.emptyText, { color: colors.textSub }]}>Loading your playlists...</Text>
                                    )}

                                    {!isLoadingPlaylists && filteredPlaylists.length === 0 && (
                                        <Text style={[styles.emptyText, { color: colors.textSub }]}>
                                            {playlists.length === 0
                                                ? 'No playlists yet — create your first one above.'
                                                : 'No playlists match your search.'}
                                        </Text>
                                    )}

                                    {filteredPlaylists.map((playlist) => {
                                        const audioCount = playlist.audios?.length || 0;
                                        const videoCount = playlist.videos?.length || 0;
                                        const alreadyIn = session.isVideo 
                                            ? (playlist.videos || []).some((video) => video.documentId === session.id)
                                            : (playlist.audios || []).some((audio) => audio.documentId === session.id);
                                        const playlistId = String(playlist.documentId || playlist.id || '');

                                        return (
                                            <TouchableOpacity
                                                key={playlistId}
                                                activeOpacity={0.7}
                                                onPress={() => toggleSession(playlistId, alreadyIn)}
                                                style={[
                                                    styles.playlistRow,
                                                    { borderTopColor: colors.dashedLine },
                                                ]}
                                            >
                                                <View style={[styles.playlistIconBox, { backgroundColor: colors.primaryLight }]}>
                                                    <PlaylistIcon color={colors.primary} />
                                                </View>

                                                <View style={styles.playlistMeta}>
                                                    <Text
                                                        style={[styles.playlistName, { color: colors.text }]}
                                                        numberOfLines={1}
                                                    >
                                                        {playlist.title || 'Untitled playlist'}
                                                    </Text>
                                                    <View style={styles.badgeRow}>
                                                        {audioCount > 0 && (
                                                            <View style={[styles.badge, { backgroundColor: colors.primaryLight }]}>
                                                                <Text style={[styles.badgeText, { color: colors.primary }]}>
                                                                    {audioCount} audio
                                                                </Text>
                                                            </View>
                                                        )}
                                                        {videoCount > 0 && (
                                                            <View style={[styles.badge, { backgroundColor: colors.surfaceAlt }]}>
                                                                <Text style={[styles.badgeText, { color: colors.textSub }]}>
                                                                    {videoCount} video
                                                                </Text>
                                                            </View>
                                                        )}
                                                        {audioCount === 0 && videoCount === 0 && (
                                                            <Text style={[styles.badgeTextEmpty, { color: colors.textMuted }]}>
                                                                Empty playlist
                                                            </Text>
                                                        )}
                                                    </View>
                                                </View>

                                                <View
                                                    style={[
                                                        styles.checkCircle,
                                                        alreadyIn
                                                            ? { backgroundColor: colors.primary, borderColor: colors.primary }
                                                            : { borderColor: colors.dividerDark },
                                                    ]}
                                                >
                                                    {alreadyIn && <CheckIcon color={colors.white} />}
                                                </View>
                                            </TouchableOpacity>
                                        );
                                    })}
                                </ScrollView>

                                {/* Done */}
                                <TouchableOpacity
                                    activeOpacity={0.85}
                                    disabled={!selectedPlaylistId}
                                    onPress={() => {
                                        void handleAddToSelectedPlaylist();
                                    }}
                                    style={[
                                        styles.doneBtn,
                                        {
                                            backgroundColor: selectedPlaylistId ? colors.primary : colors.dividerDark,
                                        },
                                    ]}
                                >
                                    <Text style={[styles.doneBtnText, { color: colors.white }]}>Done</Text>
                                </TouchableOpacity>
                            </>
                        ) : (
                            <>
                                {/* Create playlist header */}
                                <View style={styles.createHeaderRow}>
                                    <TouchableOpacity
                                        onPress={() => setMode('list')}
                                        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                                        style={styles.backBtn}
                                    >
                                        <BackIcon color={colors.text} />
                                    </TouchableOpacity>
                                </View>

                                <View style={styles.createTitleWrap}>
                                    <Text style={[styles.headerTitle, { color: colors.text }]}>
                                        New playlist
                                    </Text>
                                    <Text style={[styles.headerSubtitle, { color: colors.textSub }]}>
                                        Give it a name you&apos;ll recognize later
                                    </Text>
                                </View>

                                {/* Icon preview */}
                                <View style={styles.previewRow}>
                                    <View style={[styles.previewCircle, { backgroundColor: colors.primaryLight }]}>
                                        <PlaylistIcon color={colors.primary} />
                                    </View>
                                </View>

                                {/* Name input card */}
                                <View
                                    style={[
                                        styles.nameCard,
                                        {
                                            backgroundColor: colors.inputBg,
                                            borderColor: nameFocused ? colors.primary : 'transparent',
                                            borderWidth: nameFocused ? 1.5 : 1.5,
                                        },
                                    ]}
                                >
                                    <Text style={[styles.nameLabel, { color: colors.textMuted }]}>
                                        PLAYLIST NAME
                                    </Text>
                                    <TextInput
                                        value={newName}
                                        onChangeText={setNewName}
                                        placeholder="My playlist"
                                        placeholderTextColor={colors.textMuted}
                                        style={[styles.nameInput, { color: colors.text }]}
                                        onFocus={() => setNameFocused(true)}
                                        onBlur={() => setNameFocused(false)}
                                        autoFocus
                                        maxLength={40}
                                        returnKeyType="done"
                                        onSubmitEditing={handleCreatePlaylist}
                                    />
                                </View>

                                <TouchableOpacity
                                    activeOpacity={0.85}
                                    disabled={!newName.trim() || isCreating}
                                    onPress={() => {
                                        void handleCreatePlaylist();
                                    }}
                                    style={[
                                        styles.doneBtn,
                                        {
                                            backgroundColor: newName.trim() && !isCreating ? colors.primary : colors.dividerDark,
                                            marginTop: moderateScale(20),
                                        },
                                    ]}
                                >
                                    <Text style={[styles.doneBtnText, { color: colors.white }]}>
                                        {isCreating ? 'Creating...' : 'Create playlist'}
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    activeOpacity={0.7}
                                    onPress={() => setMode('list')}
                                    style={[styles.cancelBtn, { backgroundColor: colors.surfaceAlt }]}
                                >
                                    <Text style={[styles.cancelBtnText, { color: colors.text }]}>Cancel</Text>
                                </TouchableOpacity>
                            </>
                        )}
                    </Animated.View>
                </Animated.View>
            </KeyboardAvoidingView>
        </Modal>
    );
}

const SHEET_MAX_HEIGHT = SCREEN_HEIGHT * 0.82;

const styles = StyleSheet.create({
    backdropWrap: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    sheet: {
        borderTopLeftRadius: moderateScale(24),
        borderTopRightRadius: moderateScale(24),
        maxHeight: SHEET_MAX_HEIGHT,
        paddingHorizontal: moderateScale(20),
    },
    grabberRow: {
        alignItems: 'center',
        paddingTop: moderateScale(10),
        paddingBottom: moderateScale(4),
    },
    grabber: {
        width: moderateScale(36),
        height: 4,
        borderRadius: 2,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: moderateScale(14),
        gap: moderateScale(10),
    },
    headerTextWrap: {
        flex: 1,
        gap: moderateScale(2),
    },
    createHeaderRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: moderateScale(6),
    },
    backBtn: {
        width: moderateScale(32),
        height: moderateScale(32),
        justifyContent: 'center',
    },
    createTitleWrap: {
        paddingTop: moderateScale(4),
        paddingBottom: moderateScale(4),
        gap: moderateScale(2),
    },
    previewRow: {
        alignItems: 'center',
        paddingVertical: moderateScale(18),
    },
    previewCircle: {
        width: moderateScale(64),
        height: moderateScale(64),
        borderRadius: moderateScale(18),
        alignItems: 'center',
        justifyContent: 'center',
    },
    cancelBtn: {
        borderRadius: moderateScale(14),
        paddingVertical: moderateScale(13),
        alignItems: 'center',
        marginTop: moderateScale(10),
        marginBottom: moderateScale(4),
    },
    cancelBtnText: {
        fontFamily: 'SF-Pro-Display',
        fontSize: moderateScale(14),
        fontWeight: '500',
    },
    headerTitle: {
        fontFamily: 'SF-Pro-Display',
        fontSize: moderateScale(20),
        fontWeight: '700',
    },
    headerSubtitle: {
        fontFamily: 'SF-Pro-Display',
        fontSize: moderateScale(13),
        fontWeight: '400',
        marginTop: moderateScale(2),
    },
    searchWrap: {
        paddingBottom: moderateScale(14),
    },
    searchBox: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: moderateScale(8),
        borderRadius: moderateScale(10),
        paddingHorizontal: moderateScale(12),
        height: moderateScale(40),
    },
    searchInput: {
        flex: 1,
        fontFamily: 'SF-Pro-Display',
        fontSize: moderateScale(13),
        padding: 0,
    },
    createRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: moderateScale(12),
        borderRadius: moderateScale(14),
        padding: moderateScale(10),
        marginBottom: moderateScale(10),
    },
    createIconCircle: {
        width: moderateScale(40),
        height: moderateScale(40),
        borderRadius: moderateScale(11),
        alignItems: 'center',
        justifyContent: 'center',
    },
    createRowText: {
        fontFamily: 'SF-Pro-Display',
        fontSize: moderateScale(14),
        fontWeight: '500',
    },
    sectionLabel: {
        fontFamily: 'SF-Pro-Display',
        fontSize: moderateScale(11),
        fontWeight: '500',
        letterSpacing: 0.4,
        marginBottom: moderateScale(6),
    },
    list: {
        flexGrow: 0,
    },
    emptyText: {
        fontFamily: 'SF-Pro-Display',
        fontSize: moderateScale(13),
        textAlign: 'center',
        paddingVertical: moderateScale(24),
    },
    playlistRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: moderateScale(12),
        paddingVertical: moderateScale(10),
        borderTopWidth: 0.38,
    },
    playlistIconBox: {
        width: moderateScale(44),
        height: moderateScale(44),
        borderRadius: moderateScale(11),
        alignItems: 'center',
        justifyContent: 'center',
    },
    playlistMeta: {
        flex: 1,
        minWidth: 0,
        gap: moderateScale(3),
    },
    playlistName: {
        fontFamily: 'SF-Pro-Display',
        fontSize: moderateScale(14),
        fontWeight: '500',
    },
    badgeRow: {
        flexDirection: 'row',
        gap: moderateScale(6),
    },
    badge: {
        borderRadius: moderateScale(5),
        paddingHorizontal: moderateScale(6),
        paddingVertical: moderateScale(2),
    },
    badgeText: {
        fontFamily: 'SF-Pro-Display',
        fontSize: moderateScale(11),
        fontWeight: '500',
    },
    badgeTextEmpty: {
        fontFamily: 'SF-Pro-Display',
        fontSize: moderateScale(11),
    },
    checkCircle: {
        width: moderateScale(22),
        height: moderateScale(22),
        borderRadius: moderateScale(11),
        borderWidth: 1.5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    doneBtn: {
        borderRadius: moderateScale(14),
        paddingVertical: moderateScale(13),
        alignItems: 'center',
        marginTop: moderateScale(12),
        marginBottom: moderateScale(4),
    },
    doneBtnText: {
        fontFamily: 'SF-Pro-Display',
        fontSize: moderateScale(14),
        fontWeight: '500',
    },
    nameCard: {
        borderRadius: moderateScale(14),
        paddingHorizontal: moderateScale(14),
        paddingTop: moderateScale(10),
        paddingBottom: moderateScale(12),
    },
    nameLabel: {
        fontFamily: 'SF-Pro-Display',
        fontSize: moderateScale(10.5),
        fontWeight: '600',
        letterSpacing: 0.5,
        marginBottom: moderateScale(6),
    },
    nameInput: {
        fontFamily: 'SF-Pro-Display',
        fontSize: moderateScale(16),
        fontWeight: '500',
        padding: 0,
    },
});