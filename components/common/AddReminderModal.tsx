import React, { useState, useEffect } from 'react';
import {
    Modal,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
} from 'react-native';
import { useTheme } from '@/constants/ThemeContext';
import { useReminderStore, type RepeatPattern, type ScheduleType, type ReminderConfig } from '@/store/reminderStore';
import { renderReminderIcon, REMINDER_ICON_OPTIONS } from '@/constants/reminderIcons';
import IconPickerModal from '@/components/common/IconPickerModal';
import TimePickerModal from '@/components/common/TimePickerModal';
import RepeatPickerModal from '@/components/common/RepeatPickerModal';
import IntervalPickerModal from '@/components/common/IntervalPickerModal';
import axios from "axios";
import { useAuthStore } from '@/store/authStore';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const moderateScale = (size: number, factor = 0.5) =>
    size + ((SCREEN_WIDTH - 375) / 375) * size * factor;

const REPEAT_LABELS: Record<RepeatPattern, string> = {
    daily: 'Daily',
    weekdays: 'Weekdays',
    weekends: 'Weekends',
};

// Picking the Wellness icon automatically means an interval-based reminder
// (same icon key Hydration already uses) — every other icon stays fixed-time.
const INTERVAL_ICON_KEY = 'balance';

function formatTime(hour?: number, minute?: number) {
    const h = hour ?? 0;
    const m = minute ?? 0;

    const period = h >= 12 ? 'PM' : 'AM';
    const displayHour = h % 12 === 0 ? 12 : h % 12;

    return `${displayHour}:${m.toString().padStart(2, '0')} ${period}`;
}

function formatInterval(
    value: number,
    unit: "MINUTES" | "HOURS"
) {
    return `Every ${value} ${unit === "MINUTES"
        ? value === 1
            ? "minute"
            : "minutes"
        : value === 1
            ? "hour"
            : "hours"
        }`;
}

interface AddReminderModalProps {
    visible: boolean;
    editingReminder?: ReminderConfig | null; // null/undefined = creating new; provided = editing that reminder
    onClose: () => void;
    onUpdate?: (reminder: any) => void;
}

export default function AddReminderModal({ visible, editingReminder, onClose, onUpdate }: AddReminderModalProps) {
    const { colors } = useTheme();
    const addReminder = useReminderStore((s) => s.addReminder);
    const updateReminder = useReminderStore((s) => s.updateReminder);
    const fetchReminders = useReminderStore((s) => s.fetchReminders);
    const isEditing = !!editingReminder;
    const [intervalUnit, setIntervalUnit] = useState<"MINUTES" | "HOURS">("HOURS");
    const [title, setTitle] = useState('');
    const [label, setLabel] = useState('');
    const [icon, setIcon] = useState('');
    const { user } = useAuthStore();
    const profileDocumentId = user?.id;

    const [hour, setHour] = useState(9);
    const [minute, setMinute] = useState(0);
    const [repeat, setRepeat] = useState<RepeatPattern>('daily');
    const [intervalMinutes, setIntervalMinutes] = useState(60);

    const [iconPickerOpen, setIconPickerOpen] = useState(false);
    const [timePickerOpen, setTimePickerOpen] = useState(false);
    const [repeatPickerOpen, setRepeatPickerOpen] = useState(false);
    const [intervalPickerOpen, setIntervalPickerOpen] = useState(false);

    // Pre-fill every field from the reminder being edited each time the
    // modal opens for it — otherwise it'd show whatever was left over
    // from the last "create new" session.
    useEffect(() => {
        if (visible && editingReminder) {
            const selectedIcon = REMINDER_ICON_OPTIONS.find(
                (item) => item.label.toUpperCase() === editingReminder.reminderType
            );

            setTitle(editingReminder.title);
            setLabel(editingReminder.label ?? '');
            setIcon(selectedIcon?.key ?? 'bell');
            setHour(editingReminder.hour);
            setMinute(editingReminder.minute);
            setRepeat(editingReminder.repeat);
            setIntervalMinutes(editingReminder.intervalMinutes ?? 60);

            setIntervalUnit(
                editingReminder.intervalUnit ?? "MINUTES"
            );
        } else if (visible && !editingReminder) {
            setTitle('');
            setLabel('');
            setIcon('bell');
            setHour(9);
            setMinute(0);
            setRepeat('daily');
            setIntervalMinutes(60);
            setIntervalUnit("HOURS");
        }
    }, [visible, editingReminder]);

    // Derived, not a separate toggle — the icon choice IS the schedule
    // type signal. No manual Fixed/Interval switch anymore.
    const scheduleType: ScheduleType = icon === INTERVAL_ICON_KEY ? 'interval' : 'fixed';

    const outerVisible =
        visible && !iconPickerOpen && !timePickerOpen && !repeatPickerOpen && !intervalPickerOpen;

    const handleSave = async () => {
        const trimmed = title.trim();
        if (!trimmed) return;

        if (isEditing) {
            try {
                const time = `${hour.toString().padStart(2, "0")}:${minute
                    .toString()
                    .padStart(2, "0")}`;
                const selectedIcon = REMINDER_ICON_OPTIONS.find(
                    (item) => item.key === icon
                );

                const reminderType = selectedIcon?.label.toUpperCase() ?? 'GENERAL';
                const payload: any = {
                    profileDocumentId: editingReminder.profileDocumentId,

                    Title: trimmed,
                    Subtitle: label.trim(),

                    ReminderType: reminderType,
                    RepeatType: repeat.toUpperCase(),

                    IsEnabled: editingReminder.enabled,
                    Vibration: editingReminder.vibration,
                    DNDEnabled: editingReminder.dndEnabled,

                    DNDStart: editingReminder.dndStart,
                    DNDEnd: editingReminder.dndEnd,

                    IsPaused: editingReminder.isPaused,
                };
                if (repeat.toUpperCase() === "INTERVAL") {
                    payload.IntervalValue = intervalMinutes;
                    payload.IntervalUnit = intervalUnit;
                } else {
                    payload.Time = time;
                }
                await axios.put(
                    `${process.env.EXPO_PUBLIC_API_URL}/reminders/${editingReminder.documentId}`,
                    payload
                );
                const updatedReminder = {
                    ...editingReminder,

                    title: trimmed,
                    subtitle: label.trim(),

                    reminderType,
                    repeatType: repeat.toUpperCase(),

                    time,
                    hour,
                    minute,

                    intervalValue: intervalMinutes,
                    intervalMinutes,
                    intervalUnit,
                    icon,
                    label: label.trim(),
                };

                if (editingReminder.profileDocumentId) {
                    await fetchReminders(editingReminder.profileDocumentId);
                }

                onUpdate?.(updatedReminder);
                onClose();
            } catch (err) {
                console.log("Update reminder failed", err);
            }

            return;
        } else {
            try {
                const selectedIcon = REMINDER_ICON_OPTIONS.find(
                    (item) => item.key === icon
                );

                const reminderType =
                    selectedIcon?.label.toUpperCase() ?? "GENERAL";

                const repeatType = repeat.toUpperCase();

                const time = `${hour.toString().padStart(2, "0")}:${minute
                    .toString()
                    .padStart(2, "0")}`;

                const payload: any = {
                    profileDocumentId,

                    Title: trimmed,
                    Subtitle: label.trim(),

                    ReminderType: reminderType,
                    RepeatType: repeatType,

                    IsEnabled: true,
                    Vibration: true,
                    DNDEnabled: false,
                    IsPaused: false,
                };

                // DAILY / WEEKDAYS / WEEKENDS
                if (
                    repeatType === "DAILY" ||
                    repeatType === "WEEKDAYS" ||
                    repeatType === "WEEKENDS"
                ) {
                    payload.Time = time;
                }
                console.log(repeatType, "repeatTyperepeatType");

                // INTERVAL
                if (repeatType === "INTERVAL") {
                    payload.IntervalValue = intervalMinutes;
                    payload.IntervalUnit = intervalUnit;
                }

                // ONCE
                if (repeatType === "ONCE") {
                    payload.Time = time;

                    // Replace with your selected date when you add date picker
                    payload.ReminderDate = new Date()
                        .toISOString()
                        .split("T")[0];
                }

                await axios.post(
                    `${process.env.EXPO_PUBLIC_API_URL}/reminders`,
                    payload
                );
                if (profileDocumentId) {
                    await fetchReminders(profileDocumentId);
                }
                onClose();
            } catch (err) {
                console.log("Create reminder failed", err);
            }

            return;
        }
    };

    return (
        <>
            <Modal visible={outerVisible} transparent animationType="fade" onRequestClose={onClose}>
                <TouchableOpacity style={styles.backdrop} activeOpacity={1} onPress={onClose}>
                    <View
                        style={[styles.sheet, { backgroundColor: colors.card }]}
                        onStartShouldSetResponder={() => true}
                    >
                        <View style={[styles.handle, { backgroundColor: colors.border }]} />
                        <Text style={[styles.title, { color: colors.text }]}>
                            {isEditing ? 'Edit Reminder' : 'New Reminder'}
                        </Text>

                        <Text style={[styles.label, { color: colors.textSub }]}>Title</Text>
                        <TextInput
                            style={[styles.input, { backgroundColor: colors.surfaceAlt, color: colors.text }]}
                            placeholder="e.g. Weekly Reflection"
                            placeholderTextColor={colors.textMuted}
                            value={title}
                            onChangeText={setTitle}
                        />

                        <Text style={[styles.label, { color: colors.textSub }]}>Label</Text>
                        <TextInput
                            style={[styles.input, { backgroundColor: colors.surfaceAlt, color: colors.text }]}
                            placeholder="e.g. Health, Work, Personal"
                            placeholderTextColor={colors.textMuted}
                            value={label}
                            onChangeText={setLabel}
                        />

                        <Text style={[styles.label, { color: colors.textSub }]}>Icon</Text>
                        <TouchableOpacity
                            style={[styles.row, { backgroundColor: colors.surfaceAlt }]}
                            activeOpacity={0.7}
                            onPress={() => setIconPickerOpen(true)}
                        >
                            {renderReminderIcon(icon, 22)}
                            <Text style={[styles.rowText, { color: colors.text }]}>Tap to change</Text>
                        </TouchableOpacity>

                        {scheduleType === 'fixed' ? (
                            <>
                                <Text style={[styles.label, { color: colors.textSub }]}>Time</Text>
                                <TouchableOpacity
                                    style={[styles.row, { backgroundColor: colors.surfaceAlt }]}
                                    activeOpacity={0.7}
                                    onPress={() => setTimePickerOpen(true)}
                                >
                                    <Text style={[styles.rowText, { color: colors.text }]}>{formatTime(hour, minute)}</Text>
                                </TouchableOpacity>

                                <Text style={[styles.label, { color: colors.textSub }]}>Repeat</Text>
                                <TouchableOpacity
                                    style={[styles.row, { backgroundColor: colors.surfaceAlt }]}
                                    activeOpacity={0.7}
                                    onPress={() => setRepeatPickerOpen(true)}
                                >
                                    <Text style={[styles.rowText, { color: colors.text }]}>{REPEAT_LABELS[repeat]}</Text>
                                </TouchableOpacity>
                            </>
                        ) : (
                            <>
                                <Text style={[styles.label, { color: colors.textSub }]}>Frequency</Text>
                                <TouchableOpacity
                                    style={[styles.row, { backgroundColor: colors.surfaceAlt }]}
                                    activeOpacity={0.7}
                                    onPress={() => setIntervalPickerOpen(true)}
                                >
                                    <Text style={[styles.rowText, { color: colors.text }]}>
                                        {formatInterval(intervalMinutes, intervalUnit)}
                                    </Text>
                                </TouchableOpacity>
                            </>
                        )}

                        <View style={styles.buttonRow}>
                            <TouchableOpacity
                                style={[styles.cancelBtn, { borderColor: colors.border }]}
                                activeOpacity={0.7}
                                onPress={onClose}
                            >
                                <Text style={[styles.cancelText, { color: colors.textSub }]}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.saveBtn, { opacity: title.trim() ? 1 : 0.5 }]}
                                activeOpacity={0.7}
                                onPress={handleSave}
                                disabled={!title.trim()}
                            >
                                <Text style={styles.saveText}>{isEditing ? 'Save Changes' : 'Save'}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableOpacity>
            </Modal>

            <IconPickerModal
                visible={iconPickerOpen}
                selected={icon}
                onSelect={(selectedIcon) => {
                    setIcon(selectedIcon);

                    if (selectedIcon === INTERVAL_ICON_KEY) {
                        // Wellness -> Interval
                        setRepeat("interval" as any);
                        setIntervalPickerOpen(true);
                    } else {
                        // Other reminder types default to Daily
                        if (repeat === ("interval" as any)) {
                            setRepeat("daily");
                        }
                    }
                }}
                onClose={() => setIconPickerOpen(false)}
            />
            <TimePickerModal
                visible={timePickerOpen}
                hour={hour}
                minute={minute}
                onConfirm={(h, m) => {
                    setHour(h);
                    setMinute(m);
                }}
                onClose={() => setTimePickerOpen(false)}
            />
            <RepeatPickerModal
                visible={repeatPickerOpen}
                selected={repeat}
                onSelect={setRepeat}
                onClose={() => setRepeatPickerOpen(false)}
            />
            <IntervalPickerModal
                visible={intervalPickerOpen}
                selected={intervalMinutes}
                selectedUnit={intervalUnit}
                onSelect={(value, unit) => {
                    setIntervalMinutes(value);
                    setIntervalUnit(unit);
                }}
                onClose={() => setIntervalPickerOpen(false)}
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
        marginBottom: moderateScale(16),
    },
    label: {
        fontFamily: 'SF-Pro-Display',
        fontSize: moderateScale(12),
        fontWeight: '600',
        marginBottom: moderateScale(6),
        marginTop: moderateScale(12),
    },
    input: {
        borderRadius: moderateScale(12),
        paddingHorizontal: moderateScale(14),
        paddingVertical: moderateScale(12),
        fontFamily: 'SF-Pro-Display',
        fontSize: moderateScale(14),
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: moderateScale(10),
        borderRadius: moderateScale(12),
        paddingHorizontal: moderateScale(14),
        paddingVertical: moderateScale(12),
    },
    rowText: {
        fontFamily: 'SF-Pro-Display',
        fontSize: moderateScale(14),
        fontWeight: '500',
    },
    buttonRow: {
        flexDirection: 'row',
        gap: moderateScale(12),
        marginTop: moderateScale(24),
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
    saveBtn: {
        flex: 1,
        backgroundColor: '#9A85FE',
        borderRadius: moderateScale(12),
        paddingVertical: moderateScale(14),
        alignItems: 'center',
    },
    saveText: {
        fontFamily: 'SF-Pro-Display',
        fontWeight: '600',
        fontSize: moderateScale(15),
        color: '#FFFFFF',
    },
});