import React from 'react';
import { View, Text } from 'react-native';
import { getReminderStyles } from '@/assets/styles/reminders/reminderStyles';
import { useTheme } from '@/constants/ThemeContext';
import NotificationSvg from '@/assets/icons/Notification.svg';
import ClockSvg from '@/assets/icons/clock.svg';
import CalenderIconSvg from '@/assets/icons/CalenderIcon.svg';

interface Reminder {
    documentId: string;
    title: string;
    enabled: boolean;
    repeatType:
    | 'DAILY'
    | 'WEEKDAYS'
    | 'WEEKENDS'
    | 'CUSTOM_DAYS'
    | 'INTERVAL'
    | string;
    customDays?: string[] | null;
}

interface ReminderOverviewProps {
    reminders: Reminder[];
    loading?: boolean;
}

export default function ReminderOverview({
    reminders,
}: ReminderOverviewProps) {
    const { colors } = useTheme();
    const styles = getReminderStyles(colors);

    // Active reminders
    const activeCount = reminders.filter(
        (r) => r.enabled
    ).length;

    // Daily reminders
    const dailyCount = reminders.filter(
        (r) =>
            r.enabled &&
            r.repeatType === 'DAILY'
    ).length;

    // Days in a week
    let daysAWeek = 0;

    reminders.forEach((r) => {
        if (!r.enabled) return;

        switch (r.repeatType) {
            case 'DAILY':
                daysAWeek = Math.max(daysAWeek, 7);
                break;

            case 'WEEKDAYS':
                daysAWeek = Math.max(daysAWeek, 5);
                break;

            case 'WEEKENDS':
                daysAWeek = Math.max(daysAWeek, 2);
                break;

            case 'CUSTOM_DAYS':
                daysAWeek = Math.max(
                    daysAWeek,
                    r.customDays?.length ?? 0
                );
                break;

            case 'INTERVAL':
                daysAWeek = Math.max(daysAWeek, 7);
                break;

            default:
                break;
        }
    });

    const STATS = [
        {
            icon: (
                <NotificationSvg
                    width={22}
                    height={22}
                />
            ),
            value: activeCount.toString(),
            label: 'Active\nReminders',
        },
        {
            icon: (
                <ClockSvg
                    width={22}
                    height={22}
                />
            ),
            value: dailyCount.toString(),
            label: 'Daily\nReminders',
        },
        {
            icon: (
                <CalenderIconSvg
                    width={22}
                    height={22}
                />
            ),
            value: daysAWeek.toString(),
            label: 'Days\na Week',
        },
    ];

    return (
        <View style={styles.overviewContainer}>
            <View style={styles.overviewCard}>
                <Text style={styles.overviewTitle}>
                    Reminder Overview
                </Text>

                <View style={styles.overviewStatsRow}>
                    {STATS.map((stat, index) => (
                        <React.Fragment key={index}>
                            <View
                                style={
                                    styles.overviewStatItem
                                }
                            >
                                <View
                                    style={
                                        styles.overviewIconCircle
                                    }
                                >
                                    {stat.icon}
                                </View>

                                <Text
                                    style={
                                        styles.overviewStatValue
                                    }
                                >
                                    {stat.value}
                                </Text>

                                <Text
                                    style={
                                        styles.overviewStatLabel
                                    }
                                >
                                    {stat.label}
                                </Text>
                            </View>

                            {index <
                                STATS.length - 1 && (
                                    <View
                                        style={
                                            styles.overviewStatDivider
                                        }
                                    />
                                )}
                        </React.Fragment>
                    ))}
                </View>
            </View>
        </View>
    );
}