import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Modal,
    Pressable,
    StyleSheet,
    Dimensions,
} from 'react-native';
import { useTheme } from '@/constants/ThemeContext';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const moderateScale = (size: number, factor = 0.5) =>
    size + ((SCREEN_WIDTH - 375) / 375) * size * factor;

interface CreatePlaylistModalProps {
    visible: boolean;
    onClose: () => void;
    onCreate: (name: string) => void;
}

export default function CreatePlaylistModal({
    visible,
    onClose,
    onCreate,
}: CreatePlaylistModalProps) {
    const { colors } = useTheme();

    const [newName, setNewName] = useState('');
    const [nameFocused, setNameFocused] = useState(false);

    const handleSubmit = () => {
        const trimmedName = newName.trim();

        if (!trimmedName) return;

        onCreate(trimmedName);
        setNewName('');
    };

    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={onClose}
        >
            <Pressable
                style={styles.modalBackdrop}
                onPress={onClose}
            >
                <Pressable
                    style={[
                        styles.modalCard,
                        { backgroundColor: colors.card },
                    ]}
                    onPress={(e) => e.stopPropagation()}
                >
                    <Text
                        style={[
                            styles.modalTitle,
                            { color: colors.text },
                        ]}
                    >
                        New playlist
                    </Text>

                    <Text
                        style={[
                            styles.modalSubtitle,
                            { color: colors.textSub },
                        ]}
                    >
                        Give it a name you&apos;ll recognize later
                    </Text>

                    <View
                        style={[
                            styles.modalInputCard,
                            {
                                backgroundColor: colors.inputBg,
                                borderColor: nameFocused
                                    ? colors.primary
                                    : 'transparent',
                            },
                        ]}
                    >
                        <TextInput
                            value={newName}
                            onChangeText={setNewName}
                            placeholder="My playlist"
                            placeholderTextColor={colors.textMuted}
                            style={[
                                styles.modalInput,
                                { color: colors.text },
                            ]}
                            onFocus={() => setNameFocused(true)}
                            onBlur={() => setNameFocused(false)}
                            autoFocus
                            maxLength={40}
                            returnKeyType="done"
                            onSubmitEditing={handleSubmit}
                        />
                    </View>

                    <TouchableOpacity
                        activeOpacity={0.85}
                        disabled={!newName.trim()}
                        onPress={handleSubmit}
                        style={[
                            styles.modalCreateBtn,
                            {
                                backgroundColor: newName.trim()
                                    ? colors.primary
                                    : colors.dividerDark,
                            },
                        ]}
                    >
                        <Text
                            style={[
                                styles.modalCreateBtnText,
                                { color: colors.white },
                            ]}
                        >
                            Create
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={onClose}
                        style={[
                            styles.modalCancelBtn,
                            { backgroundColor: colors.surfaceAlt },
                        ]}
                    >
                        <Text
                            style={[
                                styles.modalCancelBtnText,
                                { color: colors.text },
                            ]}
                        >
                            Cancel
                        </Text>
                    </TouchableOpacity>
                </Pressable>
            </Pressable>
        </Modal>
    );
}

const styles = StyleSheet.create({
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
});