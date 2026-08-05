import { useEffect, useRef } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import * as Notifications from 'expo-notifications';
import { db } from '@/constants/firebase';
import { useAnonAuthStore } from '@/store/anonAuthStore';
import { requestNotificationPermission } from '@/utils/reminderNotifications';

// Call this ONCE, at the app root (app/_layout.tsx), alongside
// useInitAnonymousAuth. Watches this user's supportChats/{uid} parent doc
// for the moment assignedToName goes from empty to set — i.e. an
// executive accepted the chat — and fires a real notification
// regardless of which screen the user is currently on. This is
// DIFFERENT from the "Connected with [Name]" status text already shown
// inside HelpSupportChat.tsx — that only works while that screen is
// open; this works everywhere, including if the app is backgrounded.
export function useChatAssignmentNotifier() {
  const uid = useAnonAuthStore((s) => s.uid);
  const previousAssignedRef = useRef<string | null | undefined>(undefined);

  useEffect(() => {
    if (!uid) return;

    const chatDocRef = doc(db, 'supportChats', uid);

    const unsubscribe = onSnapshot(chatDocRef, async (snapshot) => {
      const assignedToName: string | null = snapshot.data()?.assignedToName ?? null;
      const previous = previousAssignedRef.current;

      // First snapshot for this uid — just record the baseline, don't
      // notify. Otherwise reopening the app with an already-assigned
      // chat would incorrectly re-fire the "joined" notification every
      // launch.
      if (previous === undefined) {
        previousAssignedRef.current = assignedToName;
        return;
      }

      const justJoined = !previous && !!assignedToName;
      previousAssignedRef.current = assignedToName;

      if (!justJoined) return;

      const hasPermission = await requestNotificationPermission();
      if (!hasPermission) return;

      await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Support',
          body: `${assignedToName} has joined your chat.`,
          sound: true,
        },
        trigger: null, // null = fire immediately, not scheduled for later
      });
    });

    return unsubscribe;
  }, [uid]);
}