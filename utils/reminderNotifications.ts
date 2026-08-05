// import * as Notifications from 'expo-notifications';
// import type { ReminderConfig, ReminderPreferences } from '@/store/reminderStore';
// import { useSoundStore } from '@/store/soundStore';
// import { SOUND_OPTIONS } from '@/constants/soundOptions';

// // Show alerts even if the app is foregrounded when a reminder fires.
// Notifications.setNotificationHandler({
//     handleNotification: async () => ({
//         shouldPlaySound: true,
//         shouldSetBadge: false,
//         shouldShowBanner: true,
//         shouldShowList: true,
//     }),
// });

// export async function requestNotificationPermission(): Promise<boolean> {
//     const { status: existingStatus } = await Notifications.getPermissionsAsync();
//     if (existingStatus === 'granted') return true;

//     const { status } = await Notifications.requestPermissionsAsync();
//     return status === 'granted';
// }

// // Identifier for the Snooze/Done action-button category — attached to
// // every reminder notification's content below. Registering this is
// // additive: it only affects notifications that reference this category
// // identifier, nothing else changes for anyone not using it.
// export const REMINDER_ACTIONS_CATEGORY = 'reminder-actions';

// // Two selectable snooze durations, shown as separate buttons on the
// // notification — the user picks whichever one they want in the moment,
// // rather than only ever getting one fixed duration.
// export const SNOOZE_OPTIONS = [
//     { identifier: 'snooze_10', minutes: 10, buttonTitle: 'Snooze 10m' },
//     { identifier: 'snooze_15', minutes: 15, buttonTitle: 'Snooze 15m' },
// ];

// export async function registerReminderNotificationCategory(): Promise<void> {
//     await Notifications.setNotificationCategoryAsync(REMINDER_ACTIONS_CATEGORY, [
//         ...SNOOZE_OPTIONS.map((opt) => ({
//             identifier: opt.identifier,
//             buttonTitle: opt.buttonTitle,
//             options: { opensAppToForeground: false },
//         })),
//         {
//             identifier: 'done',
//             buttonTitle: 'Done',
//             options: { opensAppToForeground: false, isDestructive: true },
//         },
//     ]);
// }

// function getSelectedSoundFile(): string | undefined {
//     const selectedId = useSoundStore.getState().selectedSoundId;
//     const option = SOUND_OPTIONS.find((o) => o.id === selectedId);
//     return option?.id === 'none' || !option ? undefined : `${option.id}.wav`; // filename must match what you bundle via app.json later
// }

// // Shifts a time forward past the Do Not Disturb window if it falls inside
// // it. Simple wraparound handling for DND windows that cross midnight
// // (e.g. 23:00–06:00). Only applies to FIXED-time reminders — interval
// // reminders don't respect DND (see syncReminderNotifications below).
// function applyDndShift(
//     hour: number,
//     minute: number,
//     prefs: ReminderPreferences
// ): { hour: number; minute: number } {
//     if (!prefs.dndEnabled) return { hour, minute };

//     const toMinutes = (h: number, m: number) => h * 60 + m;
//     const target = toMinutes(hour, minute);
//     const start = toMinutes(prefs.dndStartHour, prefs.dndStartMinute);
//     const end = toMinutes(prefs.dndEndHour, prefs.dndEndMinute);

//     const crossesMidnight = start > end;
//     const insideDnd = crossesMidnight
//         ? target >= start || target < end
//         : target >= start && target < end;

//     if (!insideDnd) return { hour, minute };

//     return { hour: prefs.dndEndHour, minute: prefs.dndEndMinute };
// }

// // expo-notifications weekday: 1 = Sunday ... 7 = Saturday
// function repeatToWeekdays(repeat: ReminderConfig['repeat']): number[] | null {
//     if (repeat === 'daily') return null; // null = schedule once, fires every day
//     if (repeat === 'weekdays') return [2, 3, 4, 5, 6];
//     if (repeat === 'weekends') return [1, 7];
//     return null;
// }

// // The whole sync strategy: wipe every scheduled reminder notification,
// // then re-schedule from scratch based on current store state. Simple and
// // can't drift out of sync — call this after ANY change (toggle, time
// // edit, repeat change, interval change, DND change, pause toggle).
// //
// // IMPORTANT: calls are serialized via syncChain below. If this function
// // gets called twice in quick succession (e.g. React Strict Mode
// // double-invoking an effect in dev, or two store updates firing the
// // effect back-to-back), running the cancel+reschedule sequence
// // concurrently can interleave: call #2's cancel can wipe what call #1
// // already scheduled, but call #1 is still mid-loop and keeps scheduling
// // its remaining reminders afterward — leaving duplicates. Serializing
// // means call #2 always waits for call #1 to fully finish first.
// let syncChain: Promise<void> = Promise.resolve();

// export function syncReminderNotifications(
//     reminders: ReminderConfig[],
//     prefs: ReminderPreferences
// ): Promise<void> {
//     syncChain = syncChain
//         .then(() => runSync(reminders, prefs))
//         .catch((err) => console.log('Reminder sync error:', err));
//     return syncChain;
// }

// async function runSync(
//     reminders: ReminderConfig[],
//     prefs: ReminderPreferences
// ): Promise<void> {
//     await Notifications.cancelAllScheduledNotificationsAsync();

//     if (prefs.paused) return;

//     const enabledReminders = reminders.filter((r) => r.enabled);
//     if (enabledReminders.length === 0) return;

//     const hasPermission = await requestNotificationPermission();
//     if (!hasPermission) return;

//     const soundFile = getSelectedSoundFile();

//     for (const reminder of enabledReminders) {
//         const content = {
//             title: reminder.title,
//             body: reminder.subtitle,
//             sound: soundFile ?? true, // true = default system sound; custom filename only works in a real dev build
//             categoryIdentifier: REMINDER_ACTIONS_CATEGORY,
//             data: { reminderId: reminder.id }, // lets the action handler know which reminder to re-snooze
//         };

//         const scheduleType = reminder.scheduleType ?? 'fixed'; // backward-compatible fallback

//         if (scheduleType === 'interval') {
//             // NOTE: fires every N minutes from whenever this was scheduled —
//             // NOT anchored to the clock (not "on the hour"). Does not respect
//             // Do Not Disturb — deliberate simplification, see reminderStore.ts.
//             const intervalMinutes = reminder.intervalMinutes ?? 60;
//             await Notifications.scheduleNotificationAsync({
//                 content,
//                 trigger: {
//                     type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
//                     seconds: intervalMinutes * 60,
//                     repeats: true,
//                 },
//             });
//             continue;
//         }

//         // scheduleType === 'fixed'
//         // NOTE: CALENDAR-type triggers are iOS-only in expo-notifications —
//         // Android throws "Trigger of type: calendar is not supported".
//         // DAILY and WEEKLY are the cross-platform equivalents.
//         const { hour, minute } = applyDndShift(reminder.hour, reminder.minute, prefs);
//         const weekdays = repeatToWeekdays(reminder.repeat);

//         if (weekdays === null) {
//             await Notifications.scheduleNotificationAsync({
//                 content,
//                 trigger: {
//                     type: Notifications.SchedulableTriggerInputTypes.DAILY,
//                     hour,
//                     minute,
//                 },
//             });
//         } else {
//             for (const weekday of weekdays) {
//                 await Notifications.scheduleNotificationAsync({
//                     content,
//                     trigger: {
//                         type: Notifications.SchedulableTriggerInputTypes.WEEKLY,
//                         weekday,
//                         hour,
//                         minute,
//                     },
//                 });
//             }
//         }
//     }
// }
import * as Notifications from 'expo-notifications';
import type { Reminder, ReminderPreferences } from '@/store/reminderStore';
import { useSoundStore } from '@/store/soundStore';
import { SOUND_OPTIONS } from '@/constants/soundOptions';

// Show alerts even if the app is foregrounded when a reminder fires.
Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldPlaySound: true,
        shouldSetBadge: false,
        shouldShowBanner: true,
        shouldShowList: true,
    }),
});

export async function requestNotificationPermission(): Promise<boolean> {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    if (existingStatus === 'granted') return true;

    const { status } = await Notifications.requestPermissionsAsync();
    return status === 'granted';
}

export const REMINDER_ACTIONS_CATEGORY = 'reminder-actions';

export const SNOOZE_OPTIONS = [
    { identifier: 'snooze_10', minutes: 10, buttonTitle: 'Snooze 10m' },
    { identifier: 'snooze_15', minutes: 15, buttonTitle: 'Snooze 15m' },
];

export async function registerReminderNotificationCategory(): Promise<void> {
    await Notifications.setNotificationCategoryAsync(REMINDER_ACTIONS_CATEGORY, [
        ...SNOOZE_OPTIONS.map((opt) => ({
            identifier: opt.identifier,
            buttonTitle: opt.buttonTitle,
            options: { opensAppToForeground: false },
        })),
        {
            identifier: 'done',
            buttonTitle: 'Done',
            options: { opensAppToForeground: false, isDestructive: true },
        },
    ]);
}

function getSelectedSoundFile(): string | undefined {
    const selectedId = useSoundStore.getState().selectedSoundId;
    const option = SOUND_OPTIONS.find((o) => o.id === selectedId);
    return option?.id === 'none' || !option ? undefined : `${option.id}.wav`;
}

// Parses the API's "HH:MM:SS" or "HH:MM" time string into numbers.
// Returns null if the reminder has no time set at all.
function parseTimeString(time: string | null): { hour: number; minute: number } | null {
    if (!time) return null;
    const [hourStr, minuteStr] = time.split(':');
    const hour = parseInt(hourStr, 10);
    const minute = parseInt(minuteStr, 10);
    if (Number.isNaN(hour) || Number.isNaN(minute)) return null;
    return { hour, minute };
}

// Shifts a time forward past the Do Not Disturb window if it falls inside
// it — GLOBAL preferences, exactly as originally built (not per-reminder).
// Simple wraparound handling for DND windows that cross midnight
// (e.g. 23:00–06:00). Only applies to FIXED-time reminders.
function applyDndShift(
    hour: number,
    minute: number,
    prefs: ReminderPreferences
): { hour: number; minute: number } {
    if (!prefs.dndEnabled) return { hour, minute };

    const toMinutes = (h: number, m: number) => h * 60 + m;
    const target = toMinutes(hour, minute);
    const start = toMinutes(prefs.dndStartHour, prefs.dndStartMinute);
    const end = toMinutes(prefs.dndEndHour, prefs.dndEndMinute);

    const crossesMidnight = start > end;
    const insideDnd = crossesMidnight
        ? target >= start || target < end
        : target >= start && target < end;

    if (!insideDnd) return { hour, minute };

    return { hour: prefs.dndEndHour, minute: prefs.dndEndMinute };
}

// expo-notifications weekday: 1 = Sunday ... 7 = Saturday
function repeatToWeekdays(repeatType: string): number[] | null {
    if (repeatType === 'DAILY') return null; // null = schedule once, fires every day
    if (repeatType === 'WEEKDAYS') return [2, 3, 4, 5, 6];
    if (repeatType === 'WEEKENDS') return [1, 7];
    // TODO: CUSTOM_DAYS needs reminder.customDays mapped to weekday
    // numbers once the exact string format from the backend is confirmed.
    return null;
}

let syncChain: Promise<void> = Promise.resolve();

export function syncReminderNotifications(
    reminders: Reminder[],
    prefs: ReminderPreferences
): Promise<void> {
    syncChain = syncChain
        .then(() => runSync(reminders, prefs))
        .catch((err) => console.log('Reminder sync error:', err));
    return syncChain;
}

async function runSync(
    reminders: Reminder[],
    prefs: ReminderPreferences
): Promise<void> {
    await Notifications.cancelAllScheduledNotificationsAsync();

    //console.log('SYNC RUNNING — reminders:', JSON.stringify(reminders.map(r => ({ title: r.title, time: r.time, repeatType: r.repeatType, enabled: r.enabled }))));

    if (prefs.paused) return;

    const enabledReminders = reminders.filter((r) => r.enabled);
    if (enabledReminders.length === 0) return;

    const hasPermission = await requestNotificationPermission();
    console.log('PERMISSION GRANTED:', hasPermission);
    if (!hasPermission) return;

    const soundFile = getSelectedSoundFile();

    for (const reminder of enabledReminders) {
        const content = {
            title: reminder.title,
            body: reminder.subtitle,
            sound: soundFile ?? true,
            categoryIdentifier: REMINDER_ACTIONS_CATEGORY,
            data: { reminderId: reminder.documentId },
        };

        if (reminder.repeatType === 'INTERVAL') {
            // NOTE: assumes intervalValue is in MINUTES — confirm if
            // reminder.intervalUnit can vary (e.g. 'HOURS').
            const intervalMinutes = reminder.intervalValue ?? 60;
            await Notifications.scheduleNotificationAsync({
                content,
                trigger: {
                    type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
                    seconds: intervalMinutes * 60,
                    repeats: true,
                },
            });
            continue;
        }

        // Fixed-time reminder — needs a valid parsed time to schedule.
        const parsedTime = parseTimeString(reminder.time);
        if (!parsedTime) {
            console.log(`Reminder "${reminder.title}" has no valid time set — skipping.`);
            continue;
        }

        const { hour, minute } = applyDndShift(parsedTime.hour, parsedTime.minute, prefs);
        const weekdays = repeatToWeekdays(reminder.repeatType);

        if (weekdays === null) {
            await Notifications.scheduleNotificationAsync({
                content,
                trigger: {
                    type: Notifications.SchedulableTriggerInputTypes.DAILY,
                    hour,
                    minute,
                },
            });
        } else {
            //console.log('SCHEDULING WEEKLY:', weekdays, 'for hour/minute:', hour, minute);
            for (const weekday of weekdays) {
                await Notifications.scheduleNotificationAsync({
                    content,
                    trigger: {
                        type: Notifications.SchedulableTriggerInputTypes.WEEKLY,
                        weekday,
                        hour,
                        minute,
                    },
                });
            }
        }
    }
}