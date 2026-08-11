// Place this file at: components/common/BackgroundMusicModal.tsx
// Structurally identical to components/common/SoundPickerModal.tsx —
// same preview/select/stop logic, wired to BG_MUSIC_OPTIONS + useBgMusicStore
// instead of SOUND_OPTIONS + useSoundStore.

import React, { useEffect, useRef, useState } from 'react';
import {
    Modal,
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@/constants/ThemeContext';
import { useBgMusicStore } from '@/store/bgMusicStore';
import { Audio } from 'expo-av';
import Svg, { Polyline, Path } from 'react-native-svg';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const moderateScale = (size: number, factor = 0.5) =>
    size + ((SCREEN_WIDTH - 375) / 375) * size * factor;

const CheckIcon = ({ color }: { color: string }) => (
    <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
        <Polyline points="20 6 9 17 4 12" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
);

const PlayIcon = ({ color }: { color: string }) => (
    <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
        <Path d="M8 5v14l11-7z" fill={color} />
    </Svg>
);

const StopIcon = ({ color }: { color: string }) => (
    <Svg width={14} height={14} viewBox="0 0 24 24" fill="none">
        <Path d="M6 6h12v12H6z" fill={color} />
    </Svg>
);

interface BackgroundMusicModalProps {
    visible: boolean;
    onClose: () => void;
}

export default function BackgroundMusicModal({ visible, onClose }: BackgroundMusicModalProps) {
    const { colors, isDark } = useTheme();
    const insets = useSafeAreaInsets();
    const selectedBgMusicId = useBgMusicStore((s) => s.selectedBgMusicId);
    const setSelectedBgMusicId = useBgMusicStore((s) => s.setSelectedBgMusicId);
const [tempSelectedBgMusicId, setTempSelectedBgMusicId] =
    useState<string | null>(null);
    const bgMusicOptions = useBgMusicStore((s) => s.bgMusicOptions);
    const fetchBgMusicOptions = useBgMusicStore((s) => s.fetchBgMusicOptions);

    const [previewingId, setPreviewingId] = useState<string | null>(null);
    const soundRef = useRef<Audio.Sound | null>(null);
    const requestIdRef = useRef(0); // guards against stale async operations racing each other

    // Stop any preview when the modal closes
    // Fetch fresh options each time the modal opens
    useEffect(() => {
        if (visible) {
            fetchBgMusicOptions();
        }
    }, [visible]);
useEffect(() => {
    if (visible) {
        fetchBgMusicOptions();
        setTempSelectedBgMusicId(selectedBgMusicId);
    }
}, [visible]);
    // Stop any preview when the modal closes
    useEffect(() => {
        if (!visible) {
            stopPreview();
        }
        return () => {
            stopPreview();
        };
    }, [visible]);

    const stopPreview = async () => {
        const myRequestId = ++requestIdRef.current;
        const soundToStop = soundRef.current;
        soundRef.current = null; // clear immediately so no other call can grab a stale reference

        if (soundToStop) {
            try {
                await soundToStop.stopAsync();
                await soundToStop.unloadAsync();
            } catch (err) {
                // no-op — sound may already be unloaded
            }
        }

        // Only clear the UI state if nothing newer started while we were stopping
        if (requestIdRef.current === myRequestId) {
            setPreviewingId(null);
        }
    };

    const handlePreviewToggle = async (id: string, file: any | null) => {
        // Tapping the currently-previewing option stops it
        if (previewingId === id) {
            await stopPreview();
            return;
        }

        const myRequestId = ++requestIdRef.current;

        // Stop whatever's currently playing (using the same requestId system,
        // so if two taps race, only the LAST one wins)
        const soundToStop = soundRef.current;
        soundRef.current = null;
        if (soundToStop) {
            try {
                await soundToStop.stopAsync();
                await soundToStop.unloadAsync();
            } catch (err) {
                // no-op
            }
        }

        if (!file) {
            // No audio file wired up for this option (or it's the "None" option) — nothing to play
            if (requestIdRef.current === myRequestId) setPreviewingId(null);
            return;
        }

        try {
            const source = typeof file === 'string' ? { uri: file } : file;
            const { sound } = await Audio.Sound.createAsync(source, { shouldPlay: true, isLooping: true });

            // If a newer request started while this one was loading, this result is stale — discard it
            if (requestIdRef.current !== myRequestId) {
                await sound.unloadAsync();
                return;
            }

            soundRef.current = sound;
            setPreviewingId(id);
        } catch (err) {
            console.log('Background music preview error:', err);
        }
    };
const handleSelect = async (id: string) => {
    await stopPreview();
    setTempSelectedBgMusicId(id);
};
const handleSave = () => {
    if (tempSelectedBgMusicId !== null) {
        setSelectedBgMusicId(tempSelectedBgMusicId);
    }

    onClose();
};

    const sheetBg = colors.card;

    const getIconBg = (isSelected: boolean) =>
        isSelected ? '#9A85FE20' : colors.surfaceAlt;

    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={onClose}
        >
            <TouchableOpacity
                style={styles.backdrop}
                activeOpacity={1}
                onPress={onClose}
            >
                <View
                    style={[styles.sheet, { backgroundColor: sheetBg, paddingBottom: insets.bottom + moderateScale(24) }]}
                    onStartShouldSetResponder={() => true}
                >
                    <View style={[styles.handle, { backgroundColor: colors.border }]} />

                    <Text style={[styles.title, { color: colors.text }]}>Background Music</Text>
                    <Text style={[styles.subtitle, { color: colors.textSub }]}>
                        Choose background music for your practice
                    </Text>
                    <View style={[styles.optionsList, { borderColor: colors.border }]}>
                        {bgMusicOptions.map((option, index) => {
                            const isSelected = tempSelectedBgMusicId === option.id;
                            const isPreviewing = previewingId === option.id;
                            const canPreview = !!option.fileUrl;

                            return (
                                <View key={option.id}>
                                    <View style={styles.row}>
                                        <TouchableOpacity
                                            style={styles.selectArea}
                                            onPress={() => handleSelect(option.id)}
                                            activeOpacity={0.7}
                                        >
                                            <View style={[styles.iconCircle, { backgroundColor: getIconBg(isSelected) }]}>
                                                <Text style={styles.emoji}>
                                                    {option.id === 'none' ? '🔇' : '🎵'}
                                                </Text>
                                            </View>

                                            <View style={styles.optionText}>
                                                <Text
                                                    style={[
                                                        styles.optionLabel,
                                                        { color: isSelected ? '#9A85FE' : colors.text },
                                                    ]}
                                                >
                                                    {option.label}
                                                </Text>
                                            </View>

                                            {isSelected && <CheckIcon color="#9A85FE" />}
                                        </TouchableOpacity>

                                        {canPreview && (
                                            <TouchableOpacity
                                                onPress={() => handlePreviewToggle(option.id, option.fileUrl)}
                                                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                                                style={[styles.previewBtn, { backgroundColor: getIconBg(isPreviewing) }]}
                                            >
                                                {isPreviewing ? (
                                                    <StopIcon color="#9A85FE" />
                                                ) : (
                                                    <PlayIcon color={colors.textSub as string} />
                                                )}
                                            </TouchableOpacity>
                                        )}
                                    </View>
                                    {index < bgMusicOptions.length - 1 && (
                                        <View style={[styles.divider, { backgroundColor: colors.divider }]} />
                                    )}
                                </View>
                            );
                        })}
                    </View>

                 <TouchableOpacity
    style={styles.saveBtn}
    activeOpacity={0.8}
    onPress={handleSave}
>
    <Text style={styles.saveText}>Save</Text>
</TouchableOpacity>

<TouchableOpacity
    style={[styles.cancelBtn, { borderColor: colors.border }]}
    activeOpacity={0.7}
    onPress={onClose}
>
    <Text style={[styles.cancelText, { color: colors.textSub }]}>
        Cancel
    </Text>
</TouchableOpacity>
                </View>
            </TouchableOpacity>
        </Modal>
    );
}

const styles = StyleSheet.create({
    backdrop: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
    },
    sheet: {
        borderTopLeftRadius: moderateScale(24),
        borderTopRightRadius: moderateScale(24),
        paddingHorizontal: moderateScale(20),
        paddingTop: moderateScale(12),
    },
    handle: {
        width: moderateScale(40),
        height: moderateScale(4),
        borderRadius: moderateScale(2),
        alignSelf: 'center',
        marginBottom: moderateScale(20),
    },
    title: {
        fontFamily: 'SF-Pro-Display',
        fontWeight: '700',
        fontSize: moderateScale(20),
        marginBottom: moderateScale(4),
    },
    subtitle: {
        fontFamily: 'SF-Pro-Display',
        fontWeight: '400',
        fontSize: moderateScale(13),
        marginBottom: moderateScale(20),
    },
    optionsList: {
        borderWidth: 1,
        borderRadius: moderateScale(16),
        overflow: 'hidden',
        marginBottom: moderateScale(16),
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: moderateScale(16),
        paddingVertical: moderateScale(14),
        gap: moderateScale(10),
    },
    selectArea: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        gap: moderateScale(14),
    },
    iconCircle: {
        width: moderateScale(44),
        height: moderateScale(44),
        borderRadius: moderateScale(22),
        alignItems: 'center',
        justifyContent: 'center',
    },
    emoji: {
        fontSize: moderateScale(18),
    },
    optionText: {
        flex: 1,
        gap: moderateScale(2),
    },
    optionLabel: {
        fontFamily: 'SF-Pro-Display',
        fontWeight: '600',
        fontSize: moderateScale(15),
    },
    previewBtn: {
        width: moderateScale(32),
        height: moderateScale(32),
        borderRadius: moderateScale(16),
        alignItems: 'center',
        justifyContent: 'center',
    },
    divider: {
        height: 1,
        marginHorizontal: moderateScale(16),
    },
    cancelBtn: {
        borderWidth: 1,
        borderRadius: moderateScale(12),
        paddingVertical: moderateScale(14),
        alignItems: 'center',
        marginBottom: moderateScale(20),
    },
    cancelText: {
        fontFamily: 'SF-Pro-Display',
        fontWeight: '500',
        fontSize: moderateScale(15),
    },
    saveBtn: {
    backgroundColor: '#9A85FE',
    borderRadius: moderateScale(12),
    paddingVertical: moderateScale(14),
    alignItems: 'center',
    marginBottom: moderateScale(10),
},

saveText: {
    fontFamily: 'SF-Pro-Display',
    fontWeight: '600',
    fontSize: moderateScale(15),
    color: '#FFFFFF',
},
});