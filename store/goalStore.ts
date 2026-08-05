import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getThisWeekStats, type SessionCompletionEvent } from '@/store/streakStore';

export type GoalType = 'sessions' | 'minutes';

interface GoalStoreState {
  goalType: GoalType | null; 
  targetValue: number;
  setGoal: (goalType: GoalType, targetValue: number) => void;
  clearGoal: () => void;
}

export const useGoalStore = create<GoalStoreState>()(
  persist(
    (set) => ({
      goalType: null,
      targetValue: 5,

      setGoal: (goalType, targetValue) => set({ goalType, targetValue }),
      clearGoal: () => set({ goalType: null }),
    }),
    {
      name: 'mudras-goal-store',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

// Rolling weekly window — no explicit reset needed. Progress is always
// measured against the CURRENT week's stats from streakStore, so it
// naturally "resets" every Monday without any extra logic here.
export function getGoalProgress(
  goalType: GoalType | null,
  targetValue: number,
  events: SessionCompletionEvent[]
): { current: number; target: number; fraction: number } | null {
  if (!goalType) return null;

  const { sessionCount, totalMinutes } = getThisWeekStats(events);
  const current = goalType === 'sessions' ? sessionCount : totalMinutes;
  const fraction = targetValue > 0 ? Math.min(current / targetValue, 1) : 0;

  return { current, target: targetValue, fraction };
}