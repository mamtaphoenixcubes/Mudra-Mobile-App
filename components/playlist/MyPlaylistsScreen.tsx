import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    ScrollView,
    Modal,
    Pressable,
    StyleSheet,
    Dimensions,
    RefreshControl,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/constants/ThemeContext';
import { useAuthStore } from '@/store/authStore';
import { usePlaylistStore } from '@/store/playlistStore';
import AppHeader from '@/components/common/AppHeader';
import StandaloneTabBar from '@/components/home/StandaloneTabBar';
import ConfirmModal from '@/components/common/ConfirmModal';
import { useMudraStore } from '@/store/mudraStore';
const { width: SCREEN_WIDTH } = Dimensions.get('window');
const moderateScale = (size: number, factor = 0.5) =>
    size + ((SCREEN_WIDTH - 375) / 375) * size * factor;

export default function MyPlaylistsScreen() {
    const { colors } = useTheme();
    const { token, user } = useAuthStore();
    const [refreshing, setRefreshing] = useState(false);
    const audioPlaylists = usePlaylistStore((s) => s.audioPlaylists);
    const videoPlaylists = usePlaylistStore((s) => s.videoPlaylists);
    const isLoadingPlaylists = usePlaylistStore((s) => s.isLoadingPlaylists);
    const createPlaylist = usePlaylistStore((s) => s.createPlaylist);
    const fetchUserPlaylists = usePlaylistStore((s) => s.fetchUserPlaylists);
    const fetchVideoPlaylists = usePlaylistStore(
        (s) => s.fetchVideoPlaylists
    );
    const [selectedTab, setSelectedTab] = useState<'audio' | 'video'>('audio');
    const [createVisible, setCreateVisible] = useState(false);
    const [newName, setNewName] = useState('');
    const [nameFocused, setNameFocused] = useState(false);
    const clearMudras = useMudraStore((state) => state.clearSelectedMudra);
    const deleteRemotePlaylist = usePlaylistStore((s) => s.deleteRemotePlaylist);
    const deleteVideoPlaylist = usePlaylistStore(
        (s) => s.deleteVideoPlaylist
    );
    const [deleteTarget, setDeleteTarget] = useState<{ id: string; title: string } | null>(null);
    useEffect(() => {
        clearMudras();
    }, []);
    const handleConfirmDelete = async () => {
        if (!deleteTarget) return;

        try {
            if (selectedTab === 'audio') {
                await deleteRemotePlaylist(
                    deleteTarget.id,
                    token || undefined
                );
            } else {
                await deleteVideoPlaylist(
                    deleteTarget.id,
                    token || undefined
                );
            }

            setDeleteTarget(null);
        } catch (error) {
            console.log(error);
        }
    };

    const profileDocumentId: string = user?.id || user?.profileDocumentId || '';

    useEffect(() => {
        if (!profileDocumentId) return;
        fetchUserPlaylists(profileDocumentId, token || undefined);
    }, [profileDocumentId, token, fetchUserPlaylists]);
    useEffect(() => {
        if (!profileDocumentId) return;

        if (selectedTab === 'audio') {
            fetchUserPlaylists(
                profileDocumentId,
                token || undefined
            );
        } else {
            fetchVideoPlaylists(
                profileDocumentId,
                token || undefined
            );
        }
    }, [
        selectedTab,
        profileDocumentId,
        token,
    ]);

    const playlists =
        selectedTab === 'audio'
            ? audioPlaylists
            : videoPlaylists;

    const handleCreate = async () => {
        if (!newName.trim()) return;
        const created = createPlaylist(newName, selectedTab); // local createPlaylist is synchronous, not async — returns Playlist directly
        setNewName('');
        setCreateVisible(false);

        router.push({
            pathname: '/playlistcategoryselect',
            params: {
                playlistId: created.id,
                playlistName: newName.trim(),
            },
        });
    };
    const onRefresh = async () => {
        if (!profileDocumentId) return;

        try {
            setRefreshing(true);

            if (selectedTab === 'audio') {
                await fetchUserPlaylists(
                    profileDocumentId,
                    token || undefined
                );
            } else {
                await fetchVideoPlaylists(
                    profileDocumentId,
                    token || undefined
                );
            }
        } catch (error) {
            console.log(error);
        } finally {
            setRefreshing(false);
        }
    };
    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            {/* Header */}
            <AppHeader
                rightIcon={
                    <TouchableOpacity
                        onPress={() => setCreateVisible(true)}
                        style={styles.addBtn}
                        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                    >
                        <Ionicons name="add" size={24} color={colors.primary} />
                    </TouchableOpacity>
                }
            />

            <Text style={[styles.pageTitle, { color: colors.text }]}>My Playlists</Text>
            <View style={styles.tabsContainer}>
                <TouchableOpacity
                    style={[
                        styles.tab,
                        { backgroundColor: selectedTab === 'audio' ? colors.primaryLight : 'transparent' },
                    ]}
                    onPress={() => setSelectedTab('audio')}
                >
                    <Text
                        style={[
                            styles.tabText,
                            { color: selectedTab === 'audio' ? colors.primary : colors.textSub },
                        ]}
                    >
                        Audio
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[
                        styles.tab,
                        { backgroundColor: selectedTab === 'video' ? colors.primaryLight : 'transparent' },
                    ]}
                    onPress={() => setSelectedTab('video')}
                >
                    <Text
                        style={[
                            styles.tabText,
                            { color: selectedTab === 'video' ? colors.primary : colors.textSub },
                        ]}
                    >
                        Video
                    </Text>
                </TouchableOpacity>
            </View>

            {/* List */}
            {isLoadingPlaylists ? (
                <View style={styles.emptyWrap}>
                    <Text style={[styles.emptyTitle, { color: colors.text }]}>Loading playlists...</Text>
                </View>
            ) : playlists.length === 0 ? (
                <View style={styles.emptyWrap}>
                    <View style={[styles.emptyIconCircle, { backgroundColor: colors.primaryLight }]}>
                        <Ionicons name="musical-notes-outline" size={28} color={colors.primary} />
                    </View>
                    <Text style={[styles.emptyTitle, { color: colors.text }]}>No playlists yet</Text>
                    <Text style={[styles.emptySub, { color: colors.textSub }]}>
                        Your API playlists will appear here after they are fetched.
                    </Text>
                </View>
            ) : (
                <ScrollView
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                            tintColor={colors.primary}
                            colors={[colors.primary]}
                        />
                    }
                >
                    {playlists.map((playlist) => {
                        const total =
                            selectedTab === 'audio'
                                ? (playlist.audios?.length || 0)
                                : (playlist.videos?.length || 0);
                        const playlistId = String(playlist.documentId || playlist.id || '');

                        return (
                            <View
                                key={playlistId}
                                style={[styles.card, { backgroundColor: colors.card, borderColor: colors.dashedLine }]}
                            >
                                <TouchableOpacity
                                    style={styles.cardBody}
                                    activeOpacity={0.7}
                                    onPress={() =>
                                        router.push({
                                            pathname: '/playlistdetail',
                                            params: { id: playlistId },
                                        })
                                    }
                                >
                                    <View style={[styles.cardIconBox, { backgroundColor: colors.primaryLight }]}>
                                        <Ionicons name="list" size={20} color={colors.primary} />
                                    </View>

                                    <View style={styles.cardMeta}>
                                        <Text style={[styles.cardName, { color: colors.text }]} numberOfLines={1}>
                                            {playlist.title || 'Untitled playlist'}
                                        </Text>
                                        <Text style={[styles.cardSub, { color: colors.textSub }]}>
                                            {total === 0
                                                ? `Empty ${selectedTab} playlist`
                                                : `${total} ${selectedTab === 'audio' ? 'audio' : 'video'}${total > 1 ? 's' : ''}`}
                                        </Text>
                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={styles.moreBtn}
                                    hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                                    onPress={() =>
                                        setDeleteTarget({
                                            id: playlistId,
                                            title: playlist.title || 'Untitled playlist',
                                        })
                                    }
                                >
                                    <Ionicons name="trash-outline" size={18} color={colors.textMuted} />
                                </TouchableOpacity>
                            </View>
                        );
                    })}
                </ScrollView>
            )}

            {/* Create playlist modal */}
            <Modal visible={createVisible} transparent animationType="fade">
                <Pressable
                    style={styles.modalBackdrop}
                    onPress={() => setCreateVisible(false)}
                >
                    <Pressable style={[styles.modalCard, { backgroundColor: colors.card }]}>
                        <Text style={[styles.modalTitle, { color: colors.text }]}>New playlist</Text>
                        <Text style={[styles.modalSubtitle, { color: colors.textSub }]}>
                            Give it a name you&apos;ll recognize later
                        </Text>

                        <View
                            style={[
                                styles.modalInputCard,
                                {
                                    backgroundColor: colors.inputBg,
                                    borderColor: nameFocused ? colors.primary : 'transparent',
                                },
                            ]}
                        >
                            <TextInput
                                value={newName}
                                onChangeText={setNewName}
                                placeholder="My playlist"
                                placeholderTextColor={colors.textMuted}
                                style={[styles.modalInput, { color: colors.text }]}
                                onFocus={() => setNameFocused(true)}
                                onBlur={() => setNameFocused(false)}
                                autoFocus
                                maxLength={40}
                                returnKeyType="done"
                                onSubmitEditing={handleCreate}
                            />
                        </View>

                        <TouchableOpacity
                            activeOpacity={0.85}
                            disabled={!newName.trim()}
                            onPress={handleCreate}
                            style={[
                                styles.modalCreateBtn,
                                { backgroundColor: newName.trim() ? colors.primary : colors.dividerDark },
                            ]}
                        >
                            <Text style={[styles.modalCreateBtnText, { color: colors.white }]}>Create</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            activeOpacity={0.7}
                            onPress={() => setCreateVisible(false)}
                            style={[styles.modalCancelBtn, { backgroundColor: colors.surfaceAlt }]}
                        >
                            <Text style={[styles.modalCancelBtnText, { color: colors.text }]}>Cancel</Text>
                        </TouchableOpacity>
                    </Pressable>
                </Pressable>
            </Modal>
            <ConfirmModal
                visible={!!deleteTarget}
                type="deletePlaylist"
                onConfirm={handleConfirmDelete}
                onCancel={() => setDeleteTarget(null)}
            />

            <StandaloneTabBar />
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
        fontSize: moderateScale(20),
        textAlign: 'center',
        marginBottom: moderateScale(10),
        paddingHorizontal: moderateScale(16),
    },
    addBtn: {
        width: moderateScale(32),
        height: moderateScale(32),
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    listContent: {
        paddingHorizontal: moderateScale(16),
        paddingTop: moderateScale(8),
        paddingBottom: moderateScale(100),
        gap: moderateScale(10),
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: moderateScale(12),
        borderRadius: moderateScale(16),
        borderWidth: 0.38,
        padding: moderateScale(12),
    },
    cardBody: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        gap: moderateScale(12),
    },
    moreBtn: {
        width: moderateScale(32),
        height: moderateScale(32),
        alignItems: 'center',
        justifyContent: 'center',
    },
    cardIconBox: {
        width: moderateScale(46),
        height: moderateScale(46),
        borderRadius: moderateScale(12),
        alignItems: 'center',
        justifyContent: 'center',
    },
    cardMeta: {
        flex: 1,
        minWidth: 0,
        gap: moderateScale(3),
    },
    cardName: {
        fontFamily: 'SF-Pro-Display',
        fontSize: moderateScale(15),
        fontWeight: '500',
    },
    cardSub: {
        fontFamily: 'SF-Pro-Display',
        fontSize: moderateScale(12),
    },
    emptyWrap: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: moderateScale(32),
        gap: moderateScale(6),
    },
    emptyIconCircle: {
        width: moderateScale(64),
        height: moderateScale(64),
        borderRadius: moderateScale(18),
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: moderateScale(10),
    },
    emptyTitle: {
        fontFamily: 'SF-Pro-Display',
        fontSize: moderateScale(16),
        fontWeight: '600',
    },
    emptySub: {
        fontFamily: 'SF-Pro-Display',
        fontSize: moderateScale(13),
        textAlign: 'center',
        lineHeight: moderateScale(19),
        marginBottom: moderateScale(16),
    },
    emptyCreateBtn: {
        borderRadius: moderateScale(14),
        paddingHorizontal: moderateScale(24),
        paddingVertical: moderateScale(13),
    },
    emptyCreateBtnText: {
        fontFamily: 'SF-Pro-Display',
        fontSize: moderateScale(14),
        fontWeight: '500',
    },
    modalBackdrop: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: moderateScale(28),
    },
    modalCard: {
        width: '100%',
        borderRadius: moderateScale(20),
        padding: moderateScale(20),
    },
    modalTitle: {
        fontFamily: 'SF-Pro-Display',
        fontSize: moderateScale(18),
        fontWeight: '700',
    },
    modalSubtitle: {
        fontFamily: 'SF-Pro-Display',
        fontSize: moderateScale(12.5),
        fontWeight: '400',
        marginTop: moderateScale(2),
        marginBottom: moderateScale(16),
    },
    modalInputCard: {
        borderRadius: moderateScale(14),
        borderWidth: 1.5,
        paddingHorizontal: moderateScale(14),
        paddingVertical: moderateScale(12),
    },
    modalInput: {
        fontFamily: 'SF-Pro-Display',
        fontSize: moderateScale(15),
        fontWeight: '500',
        padding: 0,
    },
    modalCreateBtn: {
        borderRadius: moderateScale(14),
        paddingVertical: moderateScale(13),
        alignItems: 'center',
        marginTop: moderateScale(16),
    },
    modalCreateBtnText: {
        fontFamily: 'SF-Pro-Display',
        fontSize: moderateScale(14),
        fontWeight: '500',
    },
    modalCancelBtn: {
        borderRadius: moderateScale(14),
        paddingVertical: moderateScale(13),
        alignItems: 'center',
        marginTop: moderateScale(8),
    },
    modalCancelBtnText: {
        fontFamily: 'SF-Pro-Display',
        fontSize: moderateScale(14),
        fontWeight: '500',
    },

    tabsContainer: {
        flexDirection: 'row',
        gap: moderateScale(6),
        marginHorizontal: moderateScale(16),
        marginBottom: moderateScale(12),
    },

    tab: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: moderateScale(8),
        borderRadius: moderateScale(10),
    },
    tabText: {
        fontFamily: 'SF-Pro-Display',
        fontSize: moderateScale(14),
        fontWeight: '500',
    },
});