import React from 'react';
import LotusBlack from '@/assets/icons/LotusBlack.svg';
import MoonSvg from '@/assets/icons/Moon.svg';
import BalanceSvg from '@/assets/icons/Balance.svg';
import ClockSvg from '@/assets/icons/clock.svg';
import CalenderIconSvg from '@/assets/icons/CalenderIcon.svg';
import NotificationSvg from '@/assets/icons/Notification.svg';

export interface ReminderIconOption {
  key: string;
  label: string;
  Icon: React.FC<{ width?: number; height?: number }>;
}

// Reuses icons already bundled elsewhere in the reminders feature —
// nothing new to add to assets. Add more here later if you want a wider
// selection; every reminder just stores the `key` string, not the
// component itself, so old data stays valid as long as keys aren't renamed.
export const REMINDER_ICON_OPTIONS: ReminderIconOption[] = [
  { key: 'lotus', label: 'Practice', Icon: LotusBlack },
  { key: 'moon', label: 'Sleep', Icon: MoonSvg },
  { key: 'balance', label: 'Wellness', Icon: BalanceSvg },
  { key: 'clock', label: 'Time', Icon: ClockSvg },
  { key: 'calendar', label: 'Schedule', Icon: CalenderIconSvg },
  { key: 'bell', label: 'General', Icon: NotificationSvg },
];

const ICON_LOOKUP: Record<string, ReminderIconOption['Icon']> = REMINDER_ICON_OPTIONS.reduce(
  (acc, opt) => ({ ...acc, [opt.key]: opt.Icon }),
  {}
);

export function renderReminderIcon(iconKey: string, size = 28) {
  const Icon = ICON_LOOKUP[iconKey] ?? REMINDER_ICON_OPTIONS[5].Icon; // falls back to bell
  return <Icon width={size} height={size} />;
}