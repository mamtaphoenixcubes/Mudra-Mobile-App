import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export interface PlaylistSession {
    id: string;
    title: string;
    duration: string;
    isVideo: boolean;
    thumbnail?: string | null;
    contentTypeOfAudio?: any;
}

export interface Playlist {
    id: string;
    name: string;
    description?: string;
    type: 'audio' | 'video';
    sessions: PlaylistSession[];
    createdAt: number;
}

export interface RemotePlaylistAudio {
    id?: number;
    documentId?: string;
    title?: string;
    contentTypeOfAudio?: string;
    durationInSeconds?: number;
    thumbnail?: {
        url?: string | null;
    } | null;

}

export interface RemotePlaylistVideo {
    id?: number;
    documentId?: string;
    title?: string;
    contentTypeOfVideo?: string;
    durationInSeconds?: number;
    thumbnail?: {
        url?: string | null;
    } | null;
}

export interface RemotePlaylist {
    id?: number;
    documentId?: string;
    title?: string;
    description?: string | null;
    contentTypeOfAudio?: string;
    contentTypeOfVideo?: string;
    audios?: RemotePlaylistAudio[];
    videos?: RemotePlaylistVideo[];
}

interface PlaylistStore {
    // Local playlists
    playlists: Playlist[];

    createPlaylist: (name: string, type: 'audio' | 'video', description?: string) => Playlist;
    deletePlaylist: (playlistId: string) => void;
    renamePlaylist: (
        playlistId: string,
        name: string,
        description?: string
    ) => void;

    addSessionToPlaylist: (
        playlistId: string,
        session: PlaylistSession
    ) => void;

    removeSessionFromPlaylist: (
        playlistId: string,
        sessionId: string
    ) => void;

    isSessionInPlaylist: (
        playlistId: string,
        sessionId: string
    ) => boolean;

    getPlaylistsContainingSession: (
        sessionId: string
    ) => string[];

    // Remote playlists
    audioPlaylists: RemotePlaylist[];
    videoPlaylists: RemotePlaylist[];
    isLoadingPlaylists: boolean;

    fetchUserPlaylists: (
        profileDocumentId: string,
        token?: string
    ) => Promise<void>;

    fetchVideoPlaylists: (
        profileDocumentId: string,
        token?: string
    ) => Promise<void>;

    deleteRemotePlaylist: (
        documentId: string,
        token?: string
    ) => Promise<void>;
    deleteVideoPlaylist: (
        documentId: string,
        token?: string
    ) => Promise<void>;

    addVideoToPlaylist: (
        playlistId: string,
        videoId: string,
        token?: string
    ) => Promise<void>;
    removeAudiosFromPlaylist: (
        playlistId: string,
        audioDocumentIds: string[],
        token?: string
    ) => Promise<void>;
    removeVideosFromPlaylist: (
        playlistId: string,
        videoDocumentIds: string[],
        token?: string
    ) => Promise<void>;
}

const generateId = () =>
    `pl_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;

export const usePlaylistStore = create<PlaylistStore>()(
    persist(
        (set, get) => ({
            // -----------------------------------------------------------------
            // Local playlists
            // -----------------------------------------------------------------
            playlists: [],

            createPlaylist: (name, type, description) => {
                const newPlaylist: Playlist = {
                    id: generateId(),
                    name: name.trim() || 'My playlist',
                    description: description?.trim() || '',
                    type,
                    sessions: [],
                    createdAt: Date.now(),
                };

                set((state) => ({
                    playlists: [newPlaylist, ...state.playlists],
                }));

                return newPlaylist;
            },

            deletePlaylist: (playlistId) => {
                set((state) => ({
                    playlists: state.playlists.filter(
                        (p) => p.id !== playlistId
                    ),
                }));
            },

            renamePlaylist: (
                playlistId,
                name,
                description
            ) => {
                set((state) => ({
                    playlists: state.playlists.map((p) =>
                        p.id === playlistId
                            ? {
                                ...p,
                                name: name.trim() || p.name,
                                description:
                                    description?.trim() ??
                                    p.description,
                            }
                            : p
                    ),
                }));
            },

            addSessionToPlaylist: (
                playlistId,
                session
            ) => {
                set((state) => ({
                    playlists: state.playlists.map((p) => {
                        if (p.id !== playlistId) return p;

                        if (
                            p.sessions.some(
                                (s) => s.id === session.id
                            )
                        ) {
                            return p;
                        }

                        return {
                            ...p,
                            sessions: [...p.sessions, session],
                        };
                    }),
                }));
            },

            removeSessionFromPlaylist: (
                playlistId,
                sessionId
            ) => {
                set((state) => ({
                    playlists: state.playlists.map((p) =>
                        p.id === playlistId
                            ? {
                                ...p,
                                sessions: p.sessions.filter(
                                    (s) =>
                                        s.id !== sessionId
                                ),
                            }
                            : p
                    ),
                }));
            },

            isSessionInPlaylist: (
                playlistId,
                sessionId
            ) => {
                const playlist = get().playlists.find(
                    (p) => p.id === playlistId
                );

                return !!playlist?.sessions.some(
                    (s) => s.id === sessionId
                );
            },

            getPlaylistsContainingSession: (
                sessionId
            ) => {
                return get()
                    .playlists.filter((p) =>
                        p.sessions.some(
                            (s) => s.id === sessionId
                        )
                    )
                    .map((p) => p.id);
            },

            // -----------------------------------------------------------------
            // Remote playlists
            // -----------------------------------------------------------------
            audioPlaylists: [],
            videoPlaylists: [],
            isLoadingPlaylists: false,

            fetchUserPlaylists: async (
                profileDocumentId,
                token
            ) => {
                if (!profileDocumentId) return;

                set({
                    isLoadingPlaylists: true,
                });

                try {
                    const result = await axios.get(
                        `${process.env.EXPO_PUBLIC_API_URL}/audio-playlists/profile/${profileDocumentId}`,
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

                    set({
                        audioPlaylists: Array.isArray(payload) ? payload : [],
                    });
                } catch (error: any) {
                    console.log(
                        'FETCH_AUDIO_PLAYLISTS_ERROR',
                        error?.response?.data || error
                    );

                    set({
                        audioPlaylists: [],
                    });
                } finally {
                    set({
                        isLoadingPlaylists: false,
                    });
                }
            },

            fetchVideoPlaylists: async (
                profileDocumentId,
                token
            ) => {
                if (!profileDocumentId) return;

                set({
                    isLoadingPlaylists: true,
                });

                try {
                    const result = await axios.get(
                        `${process.env.EXPO_PUBLIC_API_URL}/video-playlists/profile/${profileDocumentId}`,
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

                    set({
                        videoPlaylists: Array.isArray(payload) ? payload : [],
                    });
                } catch (error: any) {
                    console.log(
                        'FETCH_VIDEO_PLAYLISTS_ERROR',
                        error?.response?.data || error
                    );

                    set({
                        videoPlaylists: [],
                    });
                } finally {
                    set({
                        isLoadingPlaylists: false,
                    });
                }
            },
            deleteRemotePlaylist: async (
                documentId,
                token
            ) => {
                const previous = get().audioPlaylists;

                // Optimistically remove from UI
                set({
                    audioPlaylists: previous.filter(
                        (playlist) =>
                            String(playlist.documentId ?? playlist.id) !==
                            String(documentId)
                    ),
                });

                try {
                    await axios.delete(
                        `${process.env.EXPO_PUBLIC_API_URL}/audio-playlists/delete/${documentId}`,
                        {
                            headers: token
                                ? {
                                    Authorization: `Bearer ${token}`,
                                }
                                : undefined,
                        }
                    );
                } catch (error: any) {
                    console.log(
                        'DELETE_AUDIO_PLAYLIST_ERROR',
                        error?.response?.data || error
                    );

                    // Restore previous state if API fails
                    set({
                        audioPlaylists: previous,
                    });

                    throw error;
                }
            },
            deleteVideoPlaylist: async (
                documentId,
                token
            ) => {
                const previous = get().videoPlaylists;

                set({
                    videoPlaylists: previous.filter(
                        (playlist) =>
                            String(playlist.documentId ?? playlist.id) !==
                            String(documentId)
                    ),
                });

                try {
                    await axios.delete(
                        `${process.env.EXPO_PUBLIC_API_URL}/video-playlists/delete/${documentId}`,
                        {
                            headers: token
                                ? {
                                    Authorization: `Bearer ${token}`,
                                }
                                : undefined,
                        }
                    );
                } catch (error: any) {
                    console.log(
                        'DELETE_VIDEO_PLAYLIST_ERROR',
                        error?.response?.data || error
                    );

                    set({
                        videoPlaylists: previous,
                    });

                    throw error;
                }
            },

            addVideoToPlaylist: async (
                playlistId,
                videoId,
                token
            ) => {
                try {
                    await axios.put(
                        `${process.env.EXPO_PUBLIC_API_URL}/video-playlists/${playlistId}/videos`,
                        {
                            videoDocumentIds: [videoId],
                        },
                        {
                            headers: token
                                ? {
                                    Authorization: `Bearer ${token}`,
                                }
                                : undefined,
                        }
                    );
                } catch (error: any) {
                    console.log(
                        'ADD_VIDEO_TO_PLAYLIST_ERROR',
                        error?.response?.data || error
                    );
                    throw error;
                }
            },
            removeAudiosFromPlaylist: async (
                playlistId,
                audioDocumentIds,
                token
            ) => {
                try {
                    await axios.put(
                        `${process.env.EXPO_PUBLIC_API_URL}/audio-playlists/${playlistId}/remove-audios`,
                        {
                            audioDocumentIds,
                        },
                        {
                            headers: token
                                ? {
                                    Authorization: `Bearer ${token}`,
                                }
                                : undefined,
                        }
                    );

                    set((state) => ({
                        audioPlaylists: state.audioPlaylists.map((playlist) => {
                            if (
                                String(playlist.documentId ?? playlist.id) !==
                                String(playlistId)
                            ) {
                                return playlist;
                            }

                            return {
                                ...playlist,
                                audios:
                                    playlist.audios?.filter(
                                        (audio) =>
                                            !audioDocumentIds.includes(
                                                String(audio.documentId ?? audio.id)
                                            )
                                    ) ?? [],
                            };
                        }),
                    }));
                } catch (error: any) {
                    console.log(
                        'REMOVE_AUDIOS_FROM_PLAYLIST_ERROR',
                        error?.response?.data || error
                    );
                    throw error;
                }
            },
            removeVideosFromPlaylist: async (
                playlistId,
                videoDocumentIds,
                token
            ) => {
                try {
                    await axios.put(
                        `${process.env.EXPO_PUBLIC_API_URL}/video-playlists/${playlistId}/remove-videos`,
                        {
                            videoDocumentIds,
                        },
                        {
                            headers: token
                                ? {
                                    Authorization: `Bearer ${token}`,
                                }
                                : undefined,
                        }
                    );

                    set((state) => ({
                        videoPlaylists: state.videoPlaylists.map((playlist) => {
                            if (
                                String(playlist.documentId ?? playlist.id) !==
                                String(playlistId)
                            ) {
                                return playlist;
                            }

                            return {
                                ...playlist,
                                videos:
                                    playlist.videos?.filter(
                                        (video) =>
                                            !videoDocumentIds.includes(
                                                String(video.documentId ?? video.id)
                                            )
                                    ) ?? [],
                            };
                        }),
                    }));
                } catch (error: any) {
                    console.log(
                        'REMOVE_VIDEOS_FROM_PLAYLIST_ERROR',
                        error?.response?.data || error
                    );
                    throw error;
                }
            },
        }),
        {
            name: '@mudras_playlists',
            storage: createJSONStorage(
                () => AsyncStorage
            ),
        }
    )
);