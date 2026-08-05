import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface NotificationLogEntry {
  id: string;
  type: 'reminder' | 'update';
  title: string;
  subtitle: string;
  timestamp: number; // Date.now() when it was delivered
  unread: boolean;
}

interface NotificationLogState {
  entries: NotificationLogEntry[];
  addEntry: (type: 'reminder' | 'update', title: string, subtitle: string) => void;
  markAllRead: () => void;
  removeEntry: (id: string) => void;
}

const MAX_ENTRIES = 50;

export const useNotificationLogStore = create<NotificationLogState>()(
  persist(
    (set) => ({
      entries: [],

      addEntry: (type, title, subtitle) =>
        set((state) => ({
          entries: [
            { id: `${Date.now()}-${Math.random()}`, type, title, subtitle, timestamp: Date.now(), unread: true },
            ...state.entries,
          ].slice(0, MAX_ENTRIES),
        })),

      markAllRead: () =>
        set((state) => ({
          entries: state.entries.map((e) => ({ ...e, unread: false })),
        })),

      removeEntry: (id) =>
        set((state) => ({
          entries: state.entries.filter((e) => e.id !== id),
        })),

    }),
    {
      name: 'mudras-notification-log',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export function formatNotificationTime(timestamp: number): string {
  const now = Date.now();
  const diffMs = now - timestamp;
  const diffMinutes = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMinutes < 1) return 'Just now';
  if (diffMinutes < 60) return `${diffMinutes}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays}d ago`;

  const date = new Date(timestamp);
  return date.toLocaleDateString();
}