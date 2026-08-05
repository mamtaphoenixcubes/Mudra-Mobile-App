export interface SoundOption {
    id: string;
    label: string;
    file: any | null;
}

export const SOUND_OPTIONS: SoundOption[] = [
    { id: 'none', label: 'None (Silence)', file: null },
    { id: 'rain', label: 'Rain', file: require('@/assets/audio/sounds/rainsound.mp3') },
    { id: 'ocean', label: 'Ocean Waves', file: require('@/assets/audio/sounds/OceanWaves.mp3') },
    { id: 'forest', label: 'Forest', file: require('@/assets/audio/sounds/Forest.mp3') },
    { id: 'piano', label: 'Soft Piano', file: require('@/assets/audio/sounds/softpiano.mp3') },
];