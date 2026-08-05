import TimeIcon from '@/assets/icons/Time.svg';
import MoonIcon from '@/assets/icons/Moon.svg';
import StreakIcon from '@/assets/icons/Streak.svg';
import BalanceIcon from '@/assets/icons/Balance.svg';
import LotusIcon from '@/assets/icons/LotusBlack.svg';
import GiftIcon from '@/assets/icons/Gift.svg';
import FireIcon from '@/assets/icons/Fire.svg';
import InfoIcon from '@/assets/icons/info-circle.svg';
import SymbolicIcon from '@/assets/icons/symbolic.svg';

type IconComponent = React.FC<{ width: number; height: number }>;

// Checked in order — first keyword match wins. Add new rules near the
// top if they need to take priority over an existing broader match
// (e.g. "streak" should win over the generic "reminder" fallback).
const KEYWORD_RULES: { keywords: string[]; icon: IconComponent }[] = [
    { keywords: ['streak'], icon: StreakIcon },
    { keywords: ['sleep', 'nidra', 'wind down', 'bedtime'], icon: MoonIcon },
    { keywords: ['element', 'balance', 'hydrat'], icon: BalanceIcon },
    { keywords: ['offer', 'premium', 'discount', 'unlock'], icon: GiftIcon },
    { keywords: ['completed', 'doing great', 'sessions this week'], icon: FireIcon },
    { keywords: ['new mudra', 'mudra added', 'practice'], icon: LotusIcon },
    { keywords: ['new', 'added', 'available', 'explore'], icon: SymbolicIcon },
];

export function getNotificationIcon(
    type: 'reminder' | 'update',
    title: string,
    subtitle: string
): IconComponent {
    const text = `${title} ${subtitle}`.toLowerCase();

    for (const rule of KEYWORD_RULES) {
        if (rule.keywords.some((kw) => text.includes(kw))) {
            return rule.icon;
        }
    }

    // No keyword matched — fall back by type.
    return type === 'reminder' ? TimeIcon : InfoIcon;
}