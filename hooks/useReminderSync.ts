import { useEffect } from 'react';
import { useReminderStore } from '@/store/reminderStore';
import { syncReminderNotifications } from '@/utils/reminderNotifications';

// Call this ONCE, at the top of ReminderScreen. Components never call
// syncReminderNotifications directly — they just call store actions
// (setReminderEnabled, setReminderTime, etc.), and this effect reacts to
// the resulting state change and re-syncs real scheduled notifications
// to match. Also runs on mount, which re-establishes schedules if the OS
// ever cleared them (e.g. after an app update).
export function useReminderSync() {
  const reminders = useReminderStore((s) => s.reminders);
  const preferences = useReminderStore((s) => s.preferences);

  useEffect(() => {
    syncReminderNotifications(reminders, preferences).catch((err) =>
      console.log('Reminder sync error:', err)
    );
  }, [reminders, preferences]);
}