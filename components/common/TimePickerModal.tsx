import React, { useState, useEffect } from 'react';
import {
    Modal,
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    Platform,
} from 'react-native';
import DateTimePicker, { type DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { useTheme } from '@/constants/ThemeContext';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const moderateScale = (size: number, factor = 0.5) =>
    size + ((SCREEN_WIDTH - 375) / 375) * size * factor;

// Builds a Date using TODAY's date with the given hour/minute — NEVER use
// year/month/day = 0,0,0. That resolves to ~Dec 31, 1899, which falls
// into a pre-standardization era for many timezones (including India's
// historical local-time offsets), causing the picker to read back
// hours/minutes several minutes off from what was actually selected.
function buildTimeDate(hour: number, minute: number): Date {
    const d = new Date();
    d.setHours(hour, minute, 0, 0);
    return d;
}

interface TimePickerModalProps {
    visible: boolean;
    hour: number;
    minute: number;
    onConfirm: (hour: number, minute: number) => void;
    onClose: () => void;
}

export default function TimePickerModal({ visible, hour, minute, onConfirm, onClose }: TimePickerModalProps) {
    const { colors } = useTheme();
    const [tempDate, setTempDate] = useState(() => buildTimeDate(hour, minute));

    // Reset the wheel to the reminder's current time each time the modal opens.
    useEffect(() => {
        if (visible) setTempDate(buildTimeDate(hour, minute));
    }, [visible, hour, minute]);

    const handleChange = (_event: DateTimePickerEvent, date?: Date) => {
        if (date) setTempDate(date);
    };

    const handleConfirm = () => {
        onConfirm(tempDate.getHours(), tempDate.getMinutes());
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

                    <Text style={[styles.title, { color: colors.text }]}>Reminder Time</Text>
                    <Text style={[styles.subtitle, { color: colors.textSub }]}>
                        Choose when this reminder should fire
                    </Text>

                    <View style={styles.pickerWrap}>
                        <DateTimePicker
                            value={tempDate}
                            mode="time"
                            is24Hour={false}
                            display="spinner"
                            onChange={handleChange}
                            textColor={Platform.OS === 'ios' ? colors.text : undefined}
                            style={styles.picker}
                        />
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
                            style={styles.confirmBtn}
                            activeOpacity={0.7}
                            onPress={handleConfirm}
                        >
                            <Text style={styles.confirmText}>Set Time</Text>
                        </TouchableOpacity>
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
        fontSize: moderateScale(20),
        marginBottom: moderateScale(4),
        textAlign: 'center',
    },
    subtitle: {
        fontFamily: 'SF-Pro-Display',
        fontWeight: '400',
        fontSize: moderateScale(13),
        marginBottom: moderateScale(12),
        textAlign: 'center',
    },
    pickerWrap: {
        alignItems: 'center',
        marginBottom: moderateScale(16),
    },
    picker: {
        width: '100%',
        height: moderateScale(180),
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
});