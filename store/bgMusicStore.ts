// Place this file at: store/bgMusicStore.ts
// Mirrors the shape of store/soundStore.ts, extended to fetch options
// from the backend instead of a static local list.

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export interface BgMusicOption {
    id: string;
    label: string;
    fileUrl: string | number | any | null; // remote URL — null for the "None" option
}

const TEMP_PEACE_BGM = require('@/assets/audio/meditationbgm/peacebgm.mp3');
const TEMP_PEACE_BGM_LOOP = require('@/assets/audio/meditationbgm/peacebgmloop.mp3');

const TEMP_BG_MUSIC_OPTIONS: BgMusicOption[] = [
    { id: 'none', label: 'None', fileUrl: null },
    { id: 'temp_peace', label: 'Peaceful (temp)', fileUrl: TEMP_PEACE_BGM },
    { id: 'temp_peace_loop', label: 'Peaceful Loop (temp)', fileUrl: TEMP_PEACE_BGM_LOOP },
];

interface BgMusicState {
    selectedBgMusicId: string;
    bgMusicOptions: BgMusicOption[];
    loadingOptions: boolean;
    optionsError: string | null;

    setSelectedBgMusicId: (id: string) => void;
    fetchBgMusicOptions: () => Promise<void>;
}

export const useBgMusicStore = create<BgMusicState>()(
    persist(
        (set) => ({
            selectedBgMusicId: 'none',
            bgMusicOptions: [],
            loadingOptions: false,
            optionsError: null,

            setSelectedBgMusicId: (id) => set({ selectedBgMusicId: id }),

            fetchBgMusicOptions: async () => {
                try {
                    set({ loadingOptions: true, optionsError: null });

                    const response = await axios.get(
                        `${process.env.EXPO_PUBLIC_API_URL}/background-musics`
                    );

                    const fetched: BgMusicOption[] = (response.data?.data || []).map(
                        (item: any) => ({
                            id: item.documentId,
                            label: item.title,
                            fileUrl: item.audioFile?.url
                                ? `${process.env.EXPO_PUBLIC_IMAGE_API_URL}${item.audioFile.url}`
                                : null,
                        })
                    );

                    set({
                        bgMusicOptions:
                            fetched.length > 0
                                ? [{ id: 'none', label: 'None', fileUrl: null }, ...fetched]
                                : TEMP_BG_MUSIC_OPTIONS, // endpoint returned nothing — use temp data
                        loadingOptions: false,
                    });
                } catch (error: any) {
                    console.log(
                        'FETCH_BG_MUSIC_ERROR',
                        error?.response?.data || error.message
                    );

                    set({
                        loadingOptions: false,
                        optionsError:
                            error.response?.data?.message || error.message,
                        // API not ready yet — use temp data so the UI can be tested
                        bgMusicOptions: TEMP_BG_MUSIC_OPTIONS,
                    });
                }
            },
        }),
        {
            name: 'mudras-bg-music-store',
            storage: createJSONStorage(() => AsyncStorage),
            version: 1,

            // Only persist the selection — options are always refetched fresh
            // from the backend, never cached to disk.
            partialize: (state) => ({
                selectedBgMusicId: state.selectedBgMusicId,
            }),

            merge: (persistedState: any, currentState) => ({
                ...currentState,
                selectedBgMusicId:
                    persistedState?.selectedBgMusicId ?? currentState.selectedBgMusicId,
            }),

            migrate: (persistedState: any) => persistedState,
        }
    )
);