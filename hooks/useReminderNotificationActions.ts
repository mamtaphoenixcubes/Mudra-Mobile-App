import { useEffect } from 'react';
import * as Notifications from 'expo-notifications';
import {
    registerReminderNotificationCategory,
    REMINDER_ACTIONS_CATEGORY,
    SNOOZE_OPTIONS,
} from '@/utils/reminderNotifications';

// Call this ONCE, at the app root (app/_layout.tsx), alongside your other
// init hooks. Purely additive — registers the Snooze/Done action-button
// category once, and listens for the user tapping one of those buttons
// on a delivered reminder notification. Doesn't touch anything in the
// existing scheduling logic (syncReminderNotifications is untouched).
export function useReminderNotificationActions() {
    useEffect(() => {
        registerReminderNotificationCategory().catch((err) =>
            console.log('Notification category registration error:', err)
        );

        const subscription = Notifications.addNotificationResponseReceivedListener(async (response) => {
            const actionId = response.actionIdentifier;
            const content = response.notification.request.content;

            const snoozeOption = SNOOZE_OPTIONS.find((opt) => opt.identifier === actionId);

            if (snoozeOption) {
                // Re-fire the same reminder after whichever snooze
                // duration was tapped — a one-shot, non-repeating
                // notification, separate from the original reminder's
                // recurring schedule.
                await Notifications.scheduleNotificationAsync({
                    content: {
                        title: content.title,
                        body: content.body,
                        sound: true, // default sound — the delivered notification's `sound` field has a different, incompatible type for re-scheduling
                        categoryIdentifier: REMINDER_ACTIONS_CATEGORY, // known constant — avoids the same type mismatch as `sound` above
                        data: content.data,
                    },
                    trigger: {
                        type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
                        seconds: snoozeOption.minutes * 60,
                        repeats: false,
                    },
                });
            }

            // 'done' (and a plain tap on the notification body) need no
            // extra handling — the notification is already dismissed by
            // the OS once an action is tapped.
        });

        return () => subscription.remove();
    }, []);
}