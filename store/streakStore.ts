import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type PracticeType = 'mudra' | 'nidra' | 'element';

export interface SessionCompletionEvent {
  date: string; // 'YYYY-MM-DD', local calendar day
  durationMinutes: number;
  practiceType?: PracticeType; // optional — old events won't have this
}

interface StreakStoreState {
  events: SessionCompletionEvent[];
  recordSessionCompleted: (durationMinutes: number, practiceType?: PracticeType) => void;
}

function todayKey(): string {
  return new Date().toISOString().slice(0, 10);
}

export const useStreakStore = create<StreakStoreState>()(
  persist(
    (set) => ({
      events: [],
      recordSessionCompleted: (durationMinutes, practiceType) =>
        set((state) => ({
          events: [...state.events, { date: todayKey(), durationMinutes, practiceType }],
        })),
    }),
    {
      name: 'mudras-streak-store',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

function dateKeyDaysAgo(daysAgo: number): string {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  return d.toISOString().slice(0, 10);
}

export function getCompletedDatesSet(events: SessionCompletionEvent[]): Set<string> {
  return new Set(events.map((e) => e.date));
}

export function getCurrentStreak(events: SessionCompletionEvent[]): number {
  const completed = getCompletedDatesSet(events);
  const hasToday = completed.has(todayKey());

  let streak = 0;
  let dayOffset = hasToday ? 0 : 1;

  while (completed.has(dateKeyDaysAgo(dayOffset))) {
    streak += 1;
    dayOffset += 1;
  }

  return streak;
}

export function getBestStreak(events: SessionCompletionEvent[]): number {
  const completed = Array.from(getCompletedDatesSet(events)).sort();
  if (completed.length === 0) return 0;

  let best = 1;
  let current = 1;

  for (let i = 1; i < completed.length; i++) {
    const prev = new Date(completed[i - 1]);
    const curr = new Date(completed[i]);
    const diffDays = Math.round((curr.getTime() - prev.getTime()) / 86400000);

    if (diffDays === 1) {
      current += 1;
      best = Math.max(best, current);
    } else if (diffDays > 1) {
      current = 1;
    }
  }

  return best;
}

export function getWeekCompletionMap(events: SessionCompletionEvent[]): boolean[] {
  const completed = getCompletedDatesSet(events);
  const now = new Date();
  const currentDayIndex = (now.getDay() + 6) % 7;

  const monday = new Date(now);
  monday.setDate(now.getDate() - currentDayIndex);

  const week: boolean[] = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    const key = d.toISOString().slice(0, 10);
    week.push(completed.has(key));
  }
  return week;
}

function getMondayOfWeek(offsetWeeks: number): Date {
  const now = new Date();
  const currentDayIndex = (now.getDay() + 6) % 7;
  const monday = new Date(now);
  monday.setDate(now.getDate() - currentDayIndex + offsetWeeks * 7);
  monday.setHours(0, 0, 0, 0);
  return monday;
}

export function getThisWeekStats(events: SessionCompletionEvent[]): {
  sessionCount: number;
  totalMinutes: number;
} {
  const monday = getMondayOfWeek(0);
  const weekEvents = events.filter((e) => new Date(e.date) >= monday);

  return {
    sessionCount: weekEvents.length,
    totalMinutes: weekEvents.reduce((sum, e) => sum + e.durationMinutes, 0),
  };
}

// Last week's stats — the 7-day window immediately before the current
// week's Monday. Needed for real week-over-week percentage comparisons,
// not just "this week" vs "all time".
export function getLastWeekStats(events: SessionCompletionEvent[]): {
  sessionCount: number;
  totalMinutes: number;
} {
  const thisMonday = getMondayOfWeek(0);
  const lastMonday = getMondayOfWeek(-1);

  const weekEvents = events.filter((e) => {
    const d = new Date(e.date);
    return d >= lastMonday && d < thisMonday;
  });

  return {
    sessionCount: weekEvents.length,
    totalMinutes: weekEvents.reduce((sum, e) => sum + e.durationMinutes, 0),
  };
}

// Percentage change from last week to this week. Returns null when
// there's no prior-week data to compare against (avoids a misleading
// divide-by-zero "infinite increase").
export function getWeekOverWeekChange(events: SessionCompletionEvent[]): {
  percent: number;
  direction: 'increase' | 'decrease' | 'same';
} | null {
  const thisWeek = getThisWeekStats(events);
  const lastWeek = getLastWeekStats(events);

  if (lastWeek.sessionCount === 0) return null;

  const percent = Math.round(((thisWeek.sessionCount - lastWeek.sessionCount) / lastWeek.sessionCount) * 100);
  const direction = percent > 0 ? 'increase' : percent < 0 ? 'decrease' : 'same';

  return { percent, direction };
}

export function getThisMonthStats(events: SessionCompletionEvent[]): {
  sessionCount: number;
  totalMinutes: number;
} {
  const now = new Date();
  const firstOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const monthEvents = events.filter((e) => new Date(e.date) >= firstOfMonth);

  return {
    sessionCount: monthEvents.length,
    totalMinutes: monthEvents.reduce((sum, e) => sum + e.durationMinutes, 0),
  };
}

export function getAllTimeSessionCount(events: SessionCompletionEvent[]): number {
  return events.length;
}

export function getAllTimeTotalMinutes(events: SessionCompletionEvent[]): number {
  return events.reduce((sum, e) => sum + e.durationMinutes, 0);
}

export function getAllTimeStats(events: SessionCompletionEvent[]): {
  sessionCount: number;
  totalMinutes: number;
} {
  return {
    sessionCount: getAllTimeSessionCount(events),
    totalMinutes: getAllTimeTotalMinutes(events),
  };
}

export function formatMinutesAsHoursMinutes(totalMinutes: number): string {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  if (hours === 0) return `${minutes}m`;
  return `${hours}h ${minutes}m`;
}

export type DateRange = 'today' | 'week' | 'month';

function eventsInRange(events: SessionCompletionEvent[], range: DateRange): SessionCompletionEvent[] {
  if (range === 'today') {
    const today = todayKey();
    return events.filter((e) => e.date === today);
  }
  if (range === 'week') {
    const monday = getMondayOfWeek(0);
    return events.filter((e) => new Date(e.date) >= monday);
  }
  const now = new Date();
  const firstOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  return events.filter((e) => new Date(e.date) >= firstOfMonth);
}

export interface PracticeTypeBreakdownItem {
  practiceType: PracticeType;
  sessionCount: number;
  totalMinutes: number;
  percent: number;
}

// Per-type breakdown for the given range — powers the donut chart and
// legend on the Practice Analysis detail screen. Events recorded before
// practiceType existed are excluded (unknown type), not miscounted.
export function getPracticeTypeBreakdown(
  events: SessionCompletionEvent[],
  range: DateRange
): PracticeTypeBreakdownItem[] {
  const rangeEvents = eventsInRange(events, range).filter((e) => !!e.practiceType);
  const totalMinutes = rangeEvents.reduce((sum, e) => sum + e.durationMinutes, 0);

  const types: PracticeType[] = ['mudra', 'nidra', 'element'];
  return types
    .map((type) => {
      const typeEvents = rangeEvents.filter((e) => e.practiceType === type);
      const minutes = typeEvents.reduce((sum, e) => sum + e.durationMinutes, 0);
      return {
        practiceType: type,
        sessionCount: typeEvents.length,
        totalMinutes: minutes,
        percent: totalMinutes > 0 ? Math.round((minutes / totalMinutes) * 100) : 0,
      };
    })
    .filter((item) => item.sessionCount > 0);
}

// Session counts for each of the last N days (oldest first) — powers the
// bar chart on the detail screen.
export function getDailySessionCounts(events: SessionCompletionEvent[], days: number): { date: string; count: number }[] {
  const completed = events.reduce<Record<string, number>>((acc, e) => {
    acc[e.date] = (acc[e.date] ?? 0) + 1;
    return acc;
  }, {});

  const result: { date: string; count: number }[] = [];
  for (let i = days - 1; i >= 0; i--) {
    const key = dateKeyDaysAgo(i);
    result.push({ date: key, count: completed[key] ?? 0 });
  }
  return result;
}