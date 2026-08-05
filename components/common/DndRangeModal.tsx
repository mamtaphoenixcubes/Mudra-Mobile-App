import React, { useState } from 'react';
import {
    Modal,
    View,
    Text,
    TouchableOpacity,
    Switch,
    StyleSheet,
    Dimensions,
} from 'react-native';
import { useTheme } from '@/constants/ThemeContext';
import TimePickerModal from '@/components/common/TimePickerModal';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const moderateScale = (size: number, factor = 0.5) =>
    size + ((SCREEN_WIDTH - 375) / 375) * size * factor;

function formatTime(hour: number, minute: number) {
    const period = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 === 0 ? 12 : hour % 12;
    const displayMinute = minute.toString().padStart(2, '0');
    return `${displayHour}:${displayMinute} ${period}`;
}

interface DndRangeModalProps {
    visible: boolean;
    enabled: boolean;
    startHour: number;
    startMinute: number;
    endHour: number;
    endMinute: number;
    onToggleEnabled: (enabled: boolean) => void;
    onChangeRange: (startHour: number, startMinute: number, endHour: number, endMinute: number) => void;
    onClose: () => void;
}

export default function DndRangeModal({
    visible,
    enabled,
    startHour,
    startMinute,
    endHour,
    endMinute,
    onToggleEnabled,
    onChangeRange,
    onClose,
}: DndRangeModalProps) {
    const { colors } = useTheme();
    const [editingField, setEditingField] = useState<'start' | 'end' | null>(null);

    const handleConfirmTime = (hour: number, minute: number) => {
        if (editingField === 'start') {
            onChangeRange(hour, minute, endHour, endMinute);
        } else if (editingField === 'end') {
            onChangeRange(startHour, startMinute, hour, minute);
        }
    };

    return (
        <>
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

                        <Text style={[styles.title, { color: colors.text }]}>Do Not Disturb</Text>
                        <Text style={[styles.subtitle, { color: colors.textSub }]}>
                            Reminders won't fire during this window
                        </Text>

                        <View style={[styles.optionsList, { borderColor: colors.border }]}>
                            <View style={styles.row}>
                                <Text style={[styles.rowLabel, { color: colors.text }]}>Enabled</Text>
                                <Switch
                                    value={enabled}
                                    onValueChange={onToggleEnabled}
                                    trackColor={{ false: '#E0E0E0', true: '#9A85FE' }}
                                    thumbColor="#FFFFFF"
                                />
                            </View>

                            <View style={[styles.divider, { backgroundColor: colors.divider }]} />

                            <TouchableOpacity
                                style={styles.row}
                                activeOpacity={0.7}
                                disabled={!enabled}
                                onPress={() => setEditingField('start')}
                            >
                                <Text style={[styles.rowLabel, { color: enabled ? colors.text : colors.textMuted }]}>
                                    Starts
                                </Text>
                                <Text style={[styles.rowValue, { color: enabled ? '#9A85FE' : colors.textMuted }]}>
                                    {formatTime(startHour, startMinute)}
                                </Text>
                            </TouchableOpacity>

                            <View style={[styles.divider, { backgroundColor: colors.divider }]} />

                            <TouchableOpacity
                                style={styles.row}
                                activeOpacity={0.7}
                                disabled={!enabled}
                                onPress={() => setEditingField('end')}
                            >
                                <Text style={[styles.rowLabel, { color: enabled ? colors.text : colors.textMuted }]}>
                                    Ends
                                </Text>
                                <Text style={[styles.rowValue, { color: enabled ? '#9A85FE' : colors.textMuted }]}>
                                    {formatTime(endHour, endMinute)}
                                </Text>
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity
                            style={[styles.cancelBtn, { borderColor: colors.border }]}
                            activeOpacity={0.7}
                            onPress={onClose}
                        >
                            <Text style={[styles.cancelText, { color: colors.textSub }]}>Done</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </Modal>

            <TimePickerModal
                visible={editingField !== null}
                hour={editingField === 'start' ? startHour : endHour}
                minute={editingField === 'start' ? startMinute : endMinute}
                onConfirm={handleConfirmTime}
                onClose={() => setEditingField(null)}
            />
        </>
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
        justifyContent: 'space-between',
        paddingHorizontal: moderateScale(16),
        paddingVertical: moderateScale(14),
    },
    rowLabel: {
        fontFamily: 'SF-Pro-Display',
        fontWeight: '600',
        fontSize: moderateScale(15),
    },
    rowValue: {
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