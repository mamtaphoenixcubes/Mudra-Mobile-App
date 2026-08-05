import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface SoundStore {
    selectedSoundId: string;
    setSelectedSoundId: (id: string) => void;
}

export const useSoundStore = create<SoundStore>()(
    persist(
        (set) => ({
            selectedSoundId: 'none',
            setSelectedSoundId: (id: string) => set({ selectedSoundId: id }),
        }),
        {
            name: '@mudras_sound_preference',
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);