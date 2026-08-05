import React from 'react';
import {
    Modal,
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
} from 'react-native';
import { useTheme } from '@/constants/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import type { RepeatPattern } from '@/store/reminderStore';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const moderateScale = (size: number, factor = 0.5) =>
    size + ((SCREEN_WIDTH - 375) / 375) * size * factor;

const OPTIONS: { value: RepeatPattern; label: string }[] = [
    { value: 'daily', label: 'Daily' },
    { value: 'weekdays', label: 'Weekdays (Mon–Fri)' },
    { value: 'weekends', label: 'Weekends (Sat–Sun)' },
];

interface RepeatPickerModalProps {
    visible: boolean;
    selected: RepeatPattern;
    onSelect: (value: RepeatPattern) => void;
    onClose: () => void;
}

export default function RepeatPickerModal({ visible, selected, onSelect, onClose }: RepeatPickerModalProps) {
    const { colors } = useTheme();

    const getIconBg = (isSelected: boolean) =>
        isSelected ? '#9A85FE20' : colors.surfaceAlt;

    const handleSelect = (value: RepeatPattern) => {
        onSelect(value);
        onClose();
    };

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
                    style={[styles.sheet, { backgroundColor: colors.card }]}
                    onStartShouldSetResponder={() => true}
                >
                    <View style={[styles.handle, { backgroundColor: colors.border }]} />

                    <Text style={[styles.title, { color: colors.text }]}>Repeat</Text>
                    <Text style={[styles.subtitle, { color: colors.textSub }]}>
                        Choose how often this reminder repeats
                    </Text>

                    <View style={[styles.optionsList, { borderColor: colors.border }]}>
                        {OPTIONS.map((opt, index) => {
                            const isSelected = selected === opt.value;
                            return (
                                <View key={opt.value}>
                                    <TouchableOpacity
                                        style={styles.row}
                                        onPress={() => handleSelect(opt.value)}
                                        activeOpacity={0.7}
                                    >
                                        <View style={[styles.iconCircle, { backgroundColor: getIconBg(isSelected) }]}>
                                            <Ionicons
                                                name="repeat-outline"
                                                size={20}
                                                color={isSelected ? '#9A85FE' : colors.textSub}
                                            />
                                        </View>

                                        <View style={styles.optionText}>
                                            <Text
                                                style={[
                                                    styles.optionLabel,
                                                    { color: isSelected ? '#9A85FE' : colors.text },
                                                ]}
                                            >
                                                {opt.label}
                                            </Text>
                                        </View>

                                        {isSelected && (
                                            <Ionicons name="checkmark" size={18} color="#9A85FE" />
                                        )}
                                    </TouchableOpacity>
                                    {index < OPTIONS.length - 1 && (
                                        <View style={[styles.divider, { backgroundColor: colors.divider }]} />
                                    )}
                                </View>
                            );
                        })}
                    </View>

                    <TouchableOpacity
                        style={[styles.cancelBtn, { borderColor: colors.border }]}
                        activeOpacity={0.7}
                        onPress={onClose}
                    >
                        <Text style={[styles.cancelText, { color: colors.textSub }]}>Cancel</Text>
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
        paddingBottom: moderateScale(24),
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
    iconCircle: {
        width: moderateScale(44),
        height: moderateScale(44),
        borderRadius: moderateScale(22),
        alignItems: 'center',
        justifyContent: 'center',
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
    divider: {
        height: 1,
        marginHorizontal: moderateScale(16),
    },
    cancelBtn: {
        borderWidth: 1,
        borderRadius: moderateScale(12),
        paddingVertical: moderateScale(14),
        alignItems: 'center',
    },
    cancelText: {
        fontFamily: 'SF-Pro-Display',
        fontWeight: '500',
        fontSize: moderateScale(15),
    },
});