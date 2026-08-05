import { useEffect } from 'react';
import { auth } from '@/constants/firebase';
import { signInAnonymously, onAuthStateChanged } from 'firebase/auth';
import { useAnonAuthStore } from '@/store/anonAuthStore';

// Call this ONCE, at the app root (app/_layout.tsx). Signs the user in
// anonymously the moment the app opens, rather than waiting until they
// happen to open the chat screen. This means the uid — and therefore the
// chat-assignment notifier — is available from launch, so a user can get
// notified an executive joined even if they've never opened Live Chat
// yet in this session.
export function useInitAnonymousAuth() {
  const setUid = useAnonAuthStore((s) => s.setUid);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUid(firebaseUser.uid);
      } else {
        signInAnonymously(auth).catch((err) => {
          console.log('Anonymous sign-in error:', err);
        });
      }
    });
    return unsubscribe;
  }, [setUid]);
}