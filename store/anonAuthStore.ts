import { create } from 'zustand';

interface AnonAuthState {
  uid: string | null;
  setUid: (uid: string | null) => void;
}

// Not persisted — Firebase's own SDK already keeps the anonymous session
// alive across app restarts via onAuthStateChanged. This store just makes
// the current uid readable from anywhere in the app without prop-drilling
// or every screen re-running its own sign-in logic.
export const useAnonAuthStore = create<AnonAuthState>((set) => ({
  uid: null,
  setUid: (uid) => set({ uid }),
}));