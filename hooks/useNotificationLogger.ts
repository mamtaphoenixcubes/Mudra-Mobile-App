import { useEffect } from 'react';
import * as Notifications from 'expo-notifications';
import { useNotificationLogStore } from '@/store/notificationLogStore';

// Call this ONCE, at the app root (app/_layout.tsx), alongside your other
// init hooks. Catches EVERY notification actually delivered to the
// phone — both reminder notifications (syncReminderNotifications) and
// anything else (like the chat-assignment notification from
// useChatAssignmentNotifier) — and logs it so the in-app Notifications
// screen can show real history instead of mock data.
export function useNotificationLogger() {
    useEffect(() => {
        const subscription = Notifications.addNotificationReceivedListener((notification) => {
            const content = notification.request.content;

            // Reminder notifications carry data.reminderId (set in
            // reminderNotifications.ts) — anything without it is treated
            // as a generic "update" (matches the existing type union).
            const isReminder = !!(content.data as any)?.reminderId;

            useNotificationLogStore.getState().addEntry(
                isReminder ? 'reminder' : 'update',
                content.title ?? '',
                content.body ?? ''
            );
        });

        return () => subscription.remove();
    }, []);
}