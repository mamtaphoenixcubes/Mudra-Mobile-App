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

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const moderateScale = (size: number, factor = 0.5) =>
    size + ((SCREEN_WIDTH - 375) / 375) * size * factor;

export type TimeRange = 'week' | 'month' | 'all';

const OPTIONS: { value: TimeRange; label: string }[] = [
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'all', label: 'All Time' },
];

export function timeRangeLabel(range: TimeRange): string {
    return OPTIONS.find((o) => o.value === range)?.label ?? 'This Week';
}

interface TimeRangeDropdownProps {
    visible: boolean;
    selected: TimeRange;
    onSelect: (value: TimeRange) => void;
    onClose: () => void;
}

export default function TimeRangeDropdown({ visible, selected, onSelect, onClose }: TimeRangeDropdownProps) {
    const { colors } = useTheme();

    const handleSelect = (value: TimeRange) => {
        onSelect(value);
        onClose();
    };

    return (
        <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
            <TouchableOpacity style={styles.backdrop} activeOpacity={1} onPress={onClose}>
                <View
                    style={[styles.sheet, { backgroundColor: colors.card }]}
                    onStartShouldSetResponder={() => true}
                >
                    <View style={[styles.handle, { backgroundColor: colors.border }]} />
                    <Text style={[styles.title, { color: colors.text }]}>Time Range</Text>

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
                                        <Text
                                            style={[
                                                styles.optionLabel,
                                                { color: isSelected ? '#9A85FE' : colors.text },
                                            ]}
                                        >
                                            {opt.label}
                                        </Text>
                                        {isSelected && <Ionicons name="checkmark" size={18} color="#9A85FE" />}
                                    </TouchableOpacity>
                                    {index < OPTIONS.length - 1 && (
                                        <View style={[styles.divider, { backgroundColor: colors.divider }]} />
                                    )}
                                </View>
                            );
                        })}
                    </View>
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
        fontSize: moderateScale(18),
        marginBottom: moderateScale(16),
    },
    optionsList: {
        borderWidth: 1,
        borderRadius: moderateScale(16),
        overflow: 'hidden',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: moderateScale(16),
        paddingVertical: moderateScale(16),
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
});