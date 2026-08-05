import React, { useState, useEffect } from 'react';
import {
    Modal,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { useTheme } from '@/constants/ThemeContext';
import { Ionicons } from '@expo/vector-icons';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const moderateScale = (size: number, factor = 0.5) =>
    size + ((SCREEN_WIDTH - 375) / 375) * size * factor;

// Quick-tap shortcuts that just fill the input — not a hard limit on
// what the user can set. Anything from MIN_MINUTES to MAX_MINUTES works.
const QUICK_PRESETS = [15, 30, 60];
const MIN_MINUTES = 1;
const MAX_MINUTES = 1440; // 24 hours

interface IntervalPickerModalProps {
    visible: boolean;
    selected: number;
    selectedUnit: "MINUTES" | "HOURS";
    onSelect: (
        value: number,
        unit: "MINUTES" | "HOURS"
    ) => void;
    onClose: () => void;
}

export default function IntervalPickerModal({
    visible,
    selected,
    selectedUnit,
    onSelect,
    onClose,
}: IntervalPickerModalProps) {
    const { colors } = useTheme();
const [inputValue, setInputValue] = useState(String(selected));
const [unit, setUnit] = useState<"MINUTES" | "HOURS">(selectedUnit);
useEffect(() => {
    if (visible) {
        setInputValue(String(selected));
        setUnit(selectedUnit);
    }
}, [visible, selected, selectedUnit]);
    // Reset the input to the reminder's current value each time the
    // modal opens, so it doesn't show stale text from a previous edit.
    useEffect(() => {
        if (visible) setInputValue(String(selected));
    }, [visible, selected]);

const parsed = parseInt(inputValue, 10);

const max =
    unit === "MINUTES"
        ? 1440
        : 24;

const isValid =
    !Number.isNaN(parsed) &&
    parsed >= 1 &&
    parsed <= max;
    


   const handleConfirm = () => {
    if (!isValid) return;

    onSelect(parsed, unit);
    onClose();
};

    const handlePreset = (value: number) => {
        setInputValue(String(value));
    };

  const summaryLabel = isValid
    ? `Every ${parsed} ${
          unit === "MINUTES"
              ? parsed === 1
                  ? "minute"
                  : "minutes"
              : parsed === 1
              ? "hour"
              : "hours"
      }`
    : `Enter a value between 1 and ${max}`;
        

    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={onClose}
        >
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
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

                        <Text style={[styles.title, { color: colors.text }]}>Reminder Interval</Text>
                        <Text style={[styles.subtitle, { color: colors.textSub }]}>
                            Repeats continuously at this interval
                        </Text>

                        <View style={[styles.inputRow, { backgroundColor: colors.surfaceAlt, borderColor: colors.border }]}>
                            <Ionicons name="time-outline" size={20} color={colors.textSub} />
                            <TextInput
                                style={[styles.input, { color: colors.text }]}
                                value={inputValue}
                                onChangeText={setInputValue}
                                keyboardType="number-pad"
                                placeholder="e.g. 45"
                                placeholderTextColor={colors.textMuted}
                                maxLength={4}
                            />
                          <View style={styles.unitContainer}>
    <TouchableOpacity
        onPress={() => setUnit("MINUTES")}
        style={[
            styles.unitButton,
            unit === "MINUTES" && styles.activeUnit,
        ]}
    >
        <Text
            style={[
                styles.unitText,
                unit === "MINUTES" && styles.activeUnitText,
            ]}
        >
            Min
        </Text>
    </TouchableOpacity>

    <TouchableOpacity
        onPress={() => setUnit("HOURS")}
        style={[
            styles.unitButton,
            unit === "HOURS" && styles.activeUnit,
        ]}
    >
        <Text
            style={[
                styles.unitText,
                unit === "HOURS" && styles.activeUnitText,
            ]}
        >
            Hr
        </Text>
    </TouchableOpacity>
</View>
                        </View>

                        <Text
                            style={[
                                styles.summaryText,
                                { color: isValid ? '#9A85FE' : '#E45858' },
                            ]}
                        >
                            {summaryLabel}
                        </Text>

                        <View style={styles.presetRow}>
                            {QUICK_PRESETS.map((value) => {
                                const isActive = parsed === value;
                                return (
                                    <TouchableOpacity
                                        key={value}
                                        style={[
                                            styles.presetChip,
                                            {
                                                backgroundColor: isActive ? '#9A85FE20' : colors.surfaceAlt,
                                                borderColor: isActive ? '#9A85FE' : colors.border,
                                            },
                                        ]}
                                        activeOpacity={0.7}
                                        onPress={() => handlePreset(value)}
                                    >
                                        <Text
                                            style={[
                                                styles.presetChipText,
                                                { color: isActive ? '#9A85FE' : colors.text },
                                            ]}
                                        >
                                            {value < 60 ? `${value}m` : `${value / 60}h`}
                                        </Text>
                                    </TouchableOpacity>
                                );
                            })}
                        </View>

                        <View style={styles.buttonRow}>
                            <TouchableOpacity
                                style={[styles.cancelBtn, { borderColor: colors.border }]}
                                activeOpacity={0.7}
                                onPress={onClose}
                            >
                                <Text style={[styles.cancelText, { color: colors.textSub }]}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.confirmBtn, { opacity: isValid ? 1 : 0.5 }]}
                                activeOpacity={0.7}
                                onPress={handleConfirm}
                                disabled={!isValid}
                            >
                                <Text style={styles.confirmText}>Set</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableOpacity>
            </KeyboardAvoidingView>
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
    inputRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: moderateScale(10),
        borderWidth: 1,
        borderRadius: moderateScale(14),
        paddingHorizontal: moderateScale(16),
        paddingVertical: moderateScale(4),
    },
    input: {
        flex: 1,
        fontFamily: 'SF-Pro-Display',
        fontSize: moderateScale(24),
        fontWeight: '600',
        paddingVertical: moderateScale(10),
    },
    inputSuffix: {
        fontFamily: 'SF-Pro-Display',
        fontSize: moderateScale(14),
        fontWeight: '500',
    },
    summaryText: {
        fontFamily: 'SF-Pro-Display',
        fontSize: moderateScale(13),
        fontWeight: '500',
        marginTop: moderateScale(10),
        marginBottom: moderateScale(16),
    },
    presetRow: {
        flexDirection: 'row',
        gap: moderateScale(10),
        marginBottom: moderateScale(20),
    },
    presetChip: {
        flex: 1,
        borderWidth: 1,
        borderRadius: moderateScale(12),
        paddingVertical: moderateScale(10),
        alignItems: 'center',
    },
    presetChipText: {
        fontFamily: 'SF-Pro-Display',
        fontSize: moderateScale(13),
        fontWeight: '600',
    },
    buttonRow: {
        flexDirection: 'row',
        gap: moderateScale(12),
    },
    cancelBtn: {
        flex: 1,
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
    confirmBtn: {
        flex: 1,
        backgroundColor: '#9A85FE',
        borderRadius: moderateScale(12),
        paddingVertical: moderateScale(14),
        alignItems: 'center',
    },
    confirmText: {
        fontFamily: 'SF-Pro-Display',
        fontWeight: '600',
        fontSize: moderateScale(15),
        color: '#FFFFFF',
    },
    unitContainer: {
    flexDirection: "row",
    borderRadius: 10,
    overflow: "hidden",
},

unitButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "#F1F1F1",
},

activeUnit: {
    backgroundColor: "#9A85FE",
},

unitText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#666",
},

activeUnitText: {
    color: "#FFF",
},
});