import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export interface Reminder {
    id: number;
    documentId: string;

    title: string;
    subtitle: string;

    reminderType: string;

    enabled: boolean;
    vibration: boolean;

    dndEnabled: boolean;
    dndStart: string | null;
    dndEnd: string | null;

    dndStartHour: number | null;
    dndStartMinute: number | null;
    dndEndHour: number | null;
    dndEndMinute: number | null;

    isPaused: boolean;

    repeatType: string;

    time: string | null;

    intervalValue: number | null;
    intervalUnit: string | null;

    customDays: string[] | null;

    date: string | null;

    lastTriggeredAt: string | null;
    nextTriggerAt: string | null;

    createdAt: string;
    updatedAt: string;
    publishedAt: string;
}

export interface ReminderPreferences {
    vibration: boolean;
    dndEnabled: boolean;
    dndStartHour: number;
    dndStartMinute: number;
    dndEndHour: number;
    dndEndMinute: number;
    paused: boolean;
}

const DEFAULT_PREFERENCES: ReminderPreferences = {
    vibration: true,
    dndEnabled: true,
    dndStartHour: 23,
    dndStartMinute: 0,
    dndEndHour: 6,
    dndEndMinute: 0,
    paused: false,
};

interface ReminderStore {
    reminders: Reminder[];
    selectedReminder: Reminder | null;

    preferences: ReminderPreferences;

    loading: boolean;
    loadingReminder: boolean;

    error: string | null;
    reminderError: string | null;

    fetchReminders: (
        profileDocumentId: string
    ) => Promise<void>;

    fetchReminderById: (
        documentId: string
    ) => Promise<void>;

    setSelectedReminder: (
        reminder: Reminder | null
    ) => void;

    clearSelectedReminder: () => void;

    setVibration: (vibration: boolean) => void;
    setDndEnabled: (enabled: boolean) => void;
    setDndRange: (
        startHour: number,
        startMinute: number,
        endHour: number,
        endMinute: number
    ) => void;
    setPaused: (paused: boolean) => void;
    setReminderEnabled: (documentId: string, enabled: boolean, profileDocumentId?: string) => Promise<void>;
}

export const useReminderStore = create<ReminderStore>()(
    persist(
        (set, get) => ({
            reminders: [],

            selectedReminder: null,

            preferences: DEFAULT_PREFERENCES,

            loading: false,

            loadingReminder: false,

            error: null,

            reminderError: null,

            setSelectedReminder: (reminder) =>
                set({
                    selectedReminder: reminder,
                }),

            fetchReminders: async (
                profileDocumentId: string
            ) => {
                try {
                    set({
                        loading: true,
                        error: null,
                    });

                    const response = await axios.get(
                        `${process.env.EXPO_PUBLIC_API_URL}/reminders?profileDocumentId=${profileDocumentId}`
                    );

                    const reminders: Reminder[] =
                        (response.data?.data?.data || []).map(
                            (item: any) => ({
                                id: item.id,
                                documentId: item.documentId,

                                title: item.Title,
                                subtitle: item.Subtitle,

                                reminderType:
                                    item.ReminderType,

                                enabled: item.IsEnabled,
                                vibration: item.Vibration,

                                dndEnabled:
                                    item.dndEnabled,
                                dndStart:
                                    item.DNDStart,
                                dndEnd: item.DNDEnd,

                                dndStartHour:
                                    item.dndStartHour,
                                dndStartMinute:
                                    item.dndStartMinute,
                                dndEndHour:
                                    item.dndEndHour,
                                dndEndMinute:
                                    item.dndEndMinute,

                                isPaused:
                                    item.IsPaused,

                                repeatType:
                                    item.RepeatType,

                                time: item.Time,

                                intervalValue:
                                    item.IntervalValue,
                                intervalUnit:
                                    item.IntervalUnit,

                                customDays:
                                    item.CustomDays,

                                date: item.Date,

                                lastTriggeredAt:
                                    item.LastTriggeredAt,
                                nextTriggerAt:
                                    item.NextTriggerAt,

                                createdAt:
                                    item.createdAt,
                                updatedAt:
                                    item.updatedAt,
                                publishedAt:
                                    item.publishedAt,
                            })
                        );

                    set({
                        reminders,
                        loading: false,
                    });
                } catch (error: any) {
                    console.log(
                        'FETCH REMINDERS ERROR:',
                        error
                    );

                    set({
                        loading: false,
                        error:
                            error.response?.data
                                ?.message ||
                            error.message,
                    });
                }
            },

            fetchReminderById: async (
                documentId: string
            ) => {
                try {
                    set({
                        loadingReminder: true,
                        reminderError: null,
                    });

                    const reminder =
                        get().reminders.find(
                            (item) =>
                                item.documentId ===
                                documentId
                        ) || null;

                    set({
                        selectedReminder:
                            reminder,
                        loadingReminder: false,
                    });
                } catch (error: any) {
                    console.log(
                        'FETCH REMINDER ERROR:',
                        error
                    );

                    set({
                        loadingReminder: false,
                        reminderError:
                            error.response?.data
                                ?.message ||
                            error.message,
                    });
                }
            },

            clearSelectedReminder: () =>
                set({
                    selectedReminder: null,
                }),

            // Local preferences only
            setVibration: (vibration) =>
                set((state) => ({
                    preferences: {
                        ...state.preferences,
                        vibration,
                    },
                })),

            setDndEnabled: (dndEnabled) =>
                set((state) => ({
                    preferences: {
                        ...state.preferences,
                        dndEnabled,
                    },
                })),

            setDndRange: (
                dndStartHour,
                dndStartMinute,
                dndEndHour,
                dndEndMinute
            ) =>
                set((state) => ({
                    preferences: {
                        ...state.preferences,
                        dndStartHour,
                        dndStartMinute,
                        dndEndHour,
                        dndEndMinute,
                    },
                })),

            setPaused: (paused) =>
                set((state) => ({
                    preferences: {
                        ...state.preferences,
                        paused,
                    },
                })),
            setReminderEnabled: async (documentId, enabled, profileDocumentId) => {
                set((state) => ({
                    reminders: state.reminders.map((r) =>
                        r.documentId === documentId ? { ...r, enabled } : r
                    ),
                }));
                try {
                    await axios.put(
                        `${process.env.EXPO_PUBLIC_API_URL}/reminders/${documentId}/toggle`,
                        { profileDocumentId, IsEnabled: enabled }
                    );
                } catch (error) {
                    console.log('Toggle failed', error);
                    set((state) => ({
                        reminders: state.reminders.map((r) =>
                            r.documentId === documentId ? { ...r, enabled: !enabled } : r
                        ),
                    }));
                }
            },
        }),
        {
            name: 'mudras-reminder-store',
            storage: createJSONStorage(() => AsyncStorage),

            partialize: (state) => ({
                preferences: state.preferences,
            }),

            merge: (persistedState: any, currentState) => ({
                ...currentState,
                preferences:
                    persistedState?.preferences ??
                    DEFAULT_PREFERENCES,
            }),
        }
    )
);