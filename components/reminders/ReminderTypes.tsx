import React, { useState } from 'react';
import { View, Text, Switch, TouchableOpacity, Dimensions, Platform } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { getReminderStyles } from '@/assets/styles/reminders/reminderStyles';
import { useTheme } from '@/constants/ThemeContext';
import { renderReminderIcon, REMINDER_ICON_OPTIONS } from '@/constants/reminderIcons';
import TimePickerModal from '@/components/common/TimePickerModal';
import RepeatPickerModal from '@/components/common/RepeatPickerModal';
import IntervalPickerModal from '@/components/common/IntervalPickerModal';
import AddReminderModal from '@/components/common/AddReminderModal';
import ClockSvg from '@/assets/icons/clock.svg';
import RepeatSvg from '@/assets/icons/Repeat.svg';
import RightArrowSvg from '@/assets/icons/RightArrow.svg';
import ClockWhite from '@/assets/icons/ClockWhite.svg';
import RightArrowWhite from '@/assets/icons/RightArrowWhite.svg';
import RepeatWhite from '@/assets/icons/RepeatWhite.svg';
import axios from 'axios';
import { useAuthStore } from '@/store/authStore';
import { useReminderStore } from '@/store/reminderStore';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const moderateScale = (size: number, factor = 0.5) =>
    size + ((SCREEN_WIDTH - 375) / 375) * size * factor;

const REPEAT_LABELS = {
    DAILY: 'Daily',
    WEEKDAYS: 'Weekdays',
    WEEKENDS: 'Weekends',
    INTERVAL: 'Interval',
    CUSTOM_DAYS: 'Custom Days',
};

function formatTime(hour: number, minute: number) {
    const period = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 === 0 ? 12 : hour % 12;
    const displayMinute = minute.toString().padStart(2, '0');
    return `${displayHour}:${displayMinute} ${period}`;
}

function formatInterval(minutes: number) {
    if (minutes === 60) return 'Every 1 hour';
    return `Every ${minutes} min`;
}
interface Props {
    reminders: any[];
    loading?: boolean;
}
export default function ReminderTypes({
    reminders,
    loading,
}: Props) {

    const { colors, isDark } = useTheme();
    const styles = getReminderStyles(colors);

    const parseTime = (time?: string | null) => {
        if (!time) {
            return {
                hour: 0,
                minute: 0,
            };
        }

        const [hour, minute] = time.split(':').map(Number);

        return {
            hour,
            minute,
        };
    };
    const [selectedReminder, setSelectedReminder] = useState<any>(null);
    const [editingTimeFor, setEditingTimeFor] = useState<string | null>(null);
    const [editingRepeatFor, setEditingRepeatFor] = useState<string | null>(null);
    const [editingIntervalFor, setEditingIntervalFor] = useState<string | null>(null);
    // null = closed, 'new' = create flow, otherwise = editing that reminder's id
    const [reminderModalTarget, setReminderModalTarget] = useState<'new' | string | null>(null);


    const { user } = useAuthStore();
    const fetchReminders = useReminderStore((s) => s.fetchReminders);
    const profileDocumentId = user?.id;
    const [reminderList, setReminderList] = useState(reminders);

    React.useEffect(() => {
        setReminderList(reminders);
    }, [reminders]);

    const activeReminder = reminderList.find(
        (r) => r.documentId === editingTimeFor
    );
    console.log(reminderList, "reindersssss");

    const activeTime = parseTime(activeReminder?.time);

    const renderDeleteAction = (id: string) => (
        <TouchableOpacity
            style={{
                backgroundColor: '#E45858',
                justifyContent: 'center',
                alignItems: 'center',
                width: moderateScale(72),
                borderRadius: moderateScale(16),
                marginLeft: moderateScale(8),
            }}
            onPress={() => removeReminder(id)}
        >
            <Ionicons name="trash-outline" size={moderateScale(22)} color="#FFFFFF" />
        </TouchableOpacity>
    );
    const toggleReminder = async (
        documentId: string,
        isEnabled: boolean
    ) => {
        try {
            await axios.put(
                `${process.env.EXPO_PUBLIC_API_URL}/reminders/${documentId}/toggle`,
                {
                    profileDocumentId,
                    IsEnabled: isEnabled,
                }
            );

            console.log('Reminder updated');
            await fetchReminders(profileDocumentId);
        } catch (error) {
            console.log('Toggle failed', error);

            // revert UI
            setReminderList((prev) =>
                prev.map((item) =>
                    item.documentId === documentId
                        ? { ...item, enabled: !isEnabled }
                        : item
                )
            );
        }
    };
    const setReminderTime = async (
        documentId: string,
        hour: number,
        minute: number
    ) => {
        const time = `${hour.toString().padStart(2, "0")}:${minute
            .toString()
            .padStart(2, "0")}`;

        // Optimistic UI update
        setReminderList((prev) =>
            prev.map((item) =>
                item.documentId === documentId
                    ? { ...item, time }
                    : item
            )
        );

        try {
            await axios.put(
                `${process.env.EXPO_PUBLIC_API_URL}/reminders/${documentId}`,
                {
                    profileDocumentId,
                    Time: time,
                }
            );

            console.log("Reminder time updated");
            await fetchReminders(profileDocumentId);
        } catch (error) {
            console.log("Update reminder time failed", error);

            // Optional: reload reminders here if you want to revert UI
        }

        setEditingTimeFor(null);
    };
    const setReminderRepeat = async (
        documentId: string,
        repeatType: string
    ) => {
        const updatedRepeatType = repeatType.toUpperCase();

        try {
            await axios.put(
                `${process.env.EXPO_PUBLIC_API_URL}/reminders/${documentId}`,
                {
                    profileDocumentId,
                    RepeatType: updatedRepeatType,
                }
            );

            // Update local state after success
            setReminderList((prev) =>
                prev.map((item) =>
                    item.documentId === documentId
                        ? {
                            ...item,
                            repeatType: updatedRepeatType,
                        }
                        : item
                )
            );

            setEditingRepeatFor(null);

            console.log("Reminder repeat updated");
            await fetchReminders(profileDocumentId);
        } catch (error) {
            console.log("Update repeat failed", error);
        }
    };
    const setReminderInterval = async (
        documentId: string,
        intervalValue: number
    ) => {
        // Optimistic UI
        setReminderList((prev) =>
            prev.map((item) =>
                item.documentId === documentId
                    ? { ...item, intervalValue }
                    : item
            )
        );

        try {
            await axios.put(
                `${process.env.EXPO_PUBLIC_API_URL}/reminders/${documentId}`,
                {
                    profileDocumentId,
                    IntervalValue: intervalValue,
                }
            );

            console.log("Reminder interval updated");
            await fetchReminders(profileDocumentId);
        } catch (error) {
            console.log("Update interval failed", error);
        }

        setEditingIntervalFor(null);
    };

    const removeReminder = async (documentId: string) => {
        try {
            await axios.delete(
                `${process.env.EXPO_PUBLIC_API_URL}/reminders/${documentId}`,
                {
                    params: {
                        profileDocumentId,
                    },
                }
            );

            // Fetch latest reminders from server
            await fetchReminders(profileDocumentId);

            console.log("Reminder deleted");
        } catch (error) {
            console.log("Delete reminder failed", error);
        }
    };
    return (
        <>
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingHorizontal: moderateScale(16),
                    marginBottom: moderateScale(4),
                }}
            >
                <Text style={styles.sectionTitle}>Reminder Types</Text>
                <TouchableOpacity
                    onPress={() => setReminderModalTarget('new')}
                    hitSlop={{
                        top: moderateScale(8),
                        bottom: moderateScale(8),
                        left: moderateScale(8),
                        right: moderateScale(8),
                    }}
                >
                    <Ionicons name="add-circle" size={moderateScale(26)} color="#9A85FE" />
                </TouchableOpacity>
            </View>

            <View style={styles.reminderTypeContainer}>
                {reminderList.map((item) => {
                    const isInterval = item.repeatType === 'INTERVAL';
                    const matchedIcon = REMINDER_ICON_OPTIONS.find(
                        option => option.label.toUpperCase() === item.reminderType
                    );

                    const iconKey = matchedIcon?.key ?? "bell";
                    const { hour, minute } = parseTime(item.time);

                    return (
                        <Swipeable
                            key={item.documentId}
                            renderRightActions={() => renderDeleteAction(item.documentId)}
                            overshootRight={false}
                        >
                            <View style={styles.reminderCard}>
                                {/* Top row */}
                                <View style={styles.reminderCardTop}>
                                    <TouchableOpacity
                                        style={{ flexDirection: 'row', alignItems: 'center', flex: 1, gap: moderateScale(12) }}
                                        activeOpacity={0.7}
                                        onPress={() => {
                                            const [hour, minute] = (item.time ?? "00:00:00")
                                                .split(":")
                                                .map(Number);

                                            setSelectedReminder({
                                                ...item,

                                                hour,
                                                minute,

                                                icon: item.reminderType.toLowerCase(),
                                                repeat: item.repeatType.toLowerCase(),

                                                intervalMinutes: item.intervalValue ?? 60,
                                                intervalUnit: item.intervalUnit ?? "MINUTES",   // <-- ADD THIS

                                                label: item.subtitle ?? "",

                                                scheduleType:
                                                    item.repeatType === "INTERVAL" ? "interval" : "fixed",

                                                enabled: item.enabled,
                                                vibration: item.vibration,
                                                dndEnabled: item.dndEnabled,
                                                dndStart: item.dndStart,
                                                dndEnd: item.dndEnd,
                                                isPaused: item.isPaused,

                                                documentId: item.documentId,
                                                profileDocumentId,
                                            });

                                            setReminderModalTarget(item.documentId);
                                        }}
                                    >
                                        <View style={styles.reminderIconBox}>
                                            {renderReminderIcon(iconKey, moderateScale(28))}
                                        </View>
                                        <View style={styles.reminderTextBlock}>
                                            <Text style={styles.reminderCardTitle}>{item.title}</Text>
                                            <Text style={styles.reminderCardSubtitle}>{item.subtitle}</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <Switch
                                        value={item.enabled}
                                        onValueChange={(value) => {
                                            // Optimistic UI
                                            setReminderList((prev) =>
                                                prev.map((reminder) =>
                                                    reminder.documentId === item.documentId
                                                        ? {
                                                            ...reminder,
                                                            enabled: value,
                                                        }
                                                        : reminder
                                                )
                                            );

                                            toggleReminder(item.documentId, value);
                                        }}
                                        trackColor={{ false: '#E0E0E0', true: '#9A85FE' }}
                                        thumbColor="#FFFFFF"
                                        style={{
                                            transform: [
                                                {
                                                    scale: Platform.OS === 'android' ? 1 : 0.8,
                                                },
                                            ],
                                        }}
                                    />
                                </View>

                                {/* Reminder Time / Interval row */}
                                <View style={styles.reminderRowDivider} />
                                <TouchableOpacity
                                    style={styles.reminderRow}
                                    activeOpacity={0.7}
                                    onPress={() =>
                                        isInterval
                                            ? setEditingIntervalFor(item.documentId)
                                            : setEditingTimeFor(item.documentId)
                                    }
                                >
                                    {isDark ? (
                                        <ClockWhite width={moderateScale(16)} height={moderateScale(16)} />
                                    ) : (
                                        <ClockSvg width={moderateScale(16)} height={moderateScale(16)} />
                                    )}
                                    <Text style={styles.reminderRowLabel}>
                                        {isInterval ? 'Frequency' : 'Reminder Time'}
                                    </Text>
                                    <View style={styles.reminderTimeBox}>
                                        <Text style={styles.reminderTimeText}>
                                            {isInterval
                                                ? formatInterval(item.intervalValue ?? 60)
                                                : formatTime(hour, minute)}
                                        </Text>
                                    </View>
                                    {isDark ? (
                                        <RightArrowWhite width={moderateScale(12)} height={moderateScale(12)} />
                                    ) : (
                                        <RightArrowSvg width={moderateScale(12)} height={moderateScale(12)} />
                                    )}
                                </TouchableOpacity>

                                {/* Repeat row — only meaningful for fixed-time reminders */}
                                {!isInterval && (
                                    <>
                                        <View style={styles.reminderRowDivider} />
                                        <TouchableOpacity
                                            style={styles.reminderRow}
                                            activeOpacity={0.7}
                                            onPress={() => setEditingRepeatFor(item.documentId)}
                                        >
                                            {isDark ? (
                                                <RepeatWhite width={moderateScale(16)} height={moderateScale(16)} />
                                            ) : (
                                                <RepeatSvg width={moderateScale(16)} height={moderateScale(16)} />
                                            )}
                                            <Text style={styles.reminderRowLabel}>Repeat</Text>
                                            <Text style={styles.reminderRowValue}>{REPEAT_LABELS[item.repeatType]}</Text>
                                            {isDark ? (
                                                <RightArrowWhite width={moderateScale(12)} height={moderateScale(12)} />
                                            ) : (
                                                <RightArrowSvg width={moderateScale(12)} height={moderateScale(12)} />
                                            )}
                                        </TouchableOpacity>
                                    </>
                                )}
                            </View>
                        </Swipeable>
                    );
                })}
            </View>

            {activeReminder && (
                <TimePickerModal
                    visible={!!editingTimeFor}
                    hour={activeTime.hour}
                    minute={activeTime.minute}
                    onConfirm={(hour, minute) => setReminderTime(editingTimeFor!, hour, minute)}
                    onClose={() => setEditingTimeFor(null)}
                />
            )}

            {editingRepeatFor && (
                <RepeatPickerModal
                    visible={!!editingRepeatFor}
                    selected={
                        reminderList.find(
                            (r) => r.documentId === editingRepeatFor
                        )?.repeatType ?? 'DAILY'
                    }
                    onSelect={(value) => setReminderRepeat(editingRepeatFor, value)}
                    onClose={() => setEditingRepeatFor(null)}
                />
            )}

            {editingIntervalFor && (
                <IntervalPickerModal
                    visible={!!editingIntervalFor}
                    selected={
                        reminders.find(
                            (r) => r.documentId === editingIntervalFor
                        )?.intervalValue ?? 60
                    }
                    onSelect={(value) => setReminderInterval(editingIntervalFor, value)}
                    onClose={() => setEditingIntervalFor(null)}
                />
            )}

            <AddReminderModal
                visible={reminderModalTarget !== null}
                editingReminder={selectedReminder}
                onUpdate={(updatedReminder) => {
                    setReminderList(prev =>
                        prev.map(item =>
                            item.documentId === updatedReminder.documentId
                                ? {
                                    ...item,
                                    ...updatedReminder,
                                }
                                : item
                        )
                    );
                }}
                onClose={() => {
                    setReminderModalTarget(null);
                    setSelectedReminder(null);
                }}
            />
        </>
    );
}