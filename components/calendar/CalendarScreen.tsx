import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { getCalendarStyles } from '@/assets/styles/calendar/calendarStyles';
import { useTheme } from '@/constants/ThemeContext';
import { useProgressInsightStore } from '@/store/progressInsightStore';
import ActivitiesModal from '@/components/calendar/ActivitiesModal';

const WEEKDAY_HEADERS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
const MONTH_NAMES = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
];

function dateKey(year: number, month: number, day: number): string {
    const m = String(month + 1).padStart(2, '0');
    const d = String(day).padStart(2, '0');

    return `${year}-${m}-${d}`;
}

function buildMonthGrid(year: number, month: number) {
    const firstOfMonth = new Date(year, month, 1);
    const firstWeekday = (firstOfMonth.getDay() + 6) % 7;
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();

    const cells: { day: number; month: number; year: number; inCurrentMonth: boolean }[] = [];

    // Leading days from previous month
    for (let i = firstWeekday - 1; i >= 0; i--) {
        cells.push({ day: daysInPrevMonth - i, month: month - 1, year, inCurrentMonth: false });
    }
    // Current month
    for (let d = 1; d <= daysInMonth; d++) {
        cells.push({ day: d, month, year, inCurrentMonth: true });
    }
    // Trailing days to fill out the last week
    while (cells.length % 7 !== 0) {
        const nextDay = cells.length - (firstWeekday + daysInMonth) + 1;
        cells.push({ day: nextDay, month: month + 1, year, inCurrentMonth: false });
    }

    // Group into weeks of 7
    const weeks: typeof cells[] = [];
    for (let i = 0; i < cells.length; i += 7) {
        weeks.push(cells.slice(i, i + 7));
    }
    return weeks;
}

export default function CalendarScreen() {
    const insets = useSafeAreaInsets();
    const { colors } = useTheme();
    const styles = getCalendarStyles(colors);

    const { overview } = useProgressInsightStore();

    const calendarData = useMemo(
        () => overview?.calendar?.calendar ?? [],
        [overview?.calendar?.calendar]
    );

    const completedDates = useMemo(
        () =>
            new Set(
                calendarData
                    .filter((item: any) => item.completed)
                    .map((item: any) => item.date)
            ),
        [calendarData]
    );

    const apiToday = overview?.calendar?.today;

    const today = apiToday ? new Date(apiToday) : new Date();

    const [viewDate, setViewDate] = useState(
        new Date(today.getFullYear(), today.getMonth(), 1)
    );

    const [selectedDate, setSelectedDate] = useState<string | null>(
        overview?.calendar?.today ?? null
    );

    const [activitiesModalVisible, setActivitiesModalVisible] = useState(false);

    useEffect(() => {
        if (!selectedDate && overview?.calendar?.today) {
            setSelectedDate(overview.calendar.today);
        }
    }, [overview?.calendar?.today, selectedDate]);

    const calendarMap = useMemo(
        () => new Map(calendarData.map((item: any) => [item.date, item])),
        [calendarData]
    );

    const selectedDay = useMemo(
        () => (selectedDate ? calendarMap.get(selectedDate) : undefined),
        [calendarMap, selectedDate]
    );

    const selectedDateLabel = selectedDate
        ? new Date(selectedDate).toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
        })
        : null;

    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    const weeks = buildMonthGrid(year, month);

    const todayKey = dateKey(
        today.getFullYear(),
        today.getMonth(),
        today.getDate()
    );

    const completedCountThisMonth =
        overview?.calendar?.totalDays ?? 0;

    const goToPrevMonth = () => setViewDate(new Date(year, month - 1, 1));
    const goToNextMonth = () => setViewDate(new Date(year, month + 1, 1));

    return (
        <View style={styles.screen}>
            <TouchableOpacity
                style={[styles.closeBtn, { top: insets.top + 12 }]}
                onPress={() => router.back()}
                activeOpacity={0.7}
            >
                <Ionicons name="close" size={24} color={colors.text} />
            </TouchableOpacity>

            <View style={styles.headerBlock}>
                <Text style={styles.pageTitle}>Practice Calendar</Text>
                <Text style={styles.subtitle}>Every filled day is a session completed.</Text>
            </View>

            <View style={styles.monthNavRow}>
                <TouchableOpacity style={styles.monthNavBtn} onPress={goToPrevMonth} activeOpacity={0.7}>
                    <Ionicons name="chevron-back" size={18} color={colors.text} />
                </TouchableOpacity>
                <Text style={styles.monthNavLabel}>{MONTH_NAMES[month]} {year}</Text>
                <TouchableOpacity style={styles.monthNavBtn} onPress={goToNextMonth} activeOpacity={0.7}>
                    <Ionicons name="chevron-forward" size={18} color={colors.text} />
                </TouchableOpacity>
            </View>

            <View style={styles.calendarContainer}>
                <View style={styles.calendarCard}>
                    <View style={styles.weekdayHeaderRow}>
                        {WEEKDAY_HEADERS.map((label, i) => (
                            <View key={i} style={styles.weekdayHeaderCell}>
                                <Text style={styles.weekdayHeaderText}>{label}</Text>
                            </View>
                        ))}
                    </View>

                    {weeks.map((week, wi) => (
                        <View key={wi} style={styles.weekRow}>
                            {week.map((cell, ci) => {
                                const key = dateKey(cell.year, cell.month, cell.day);
                                const isCompleted = completedDates.has(key);
                                const isToday = key === todayKey;

                                return (
                                    <View key={ci} style={styles.dayCell}>
                                        <TouchableOpacity
                                            activeOpacity={0.7}
                                            onPress={() => {
                                                if (cell.inCurrentMonth) {
                                                    setSelectedDate(key);
                                                    setActivitiesModalVisible(true);
                                                }
                                            }}
                                            style={[
                                                styles.dayCircle,
                                                isCompleted && styles.dayCircleCompleted,
                                                isToday && !isCompleted && styles.dayCircleToday,
                                                selectedDate === key && {
                                                    borderWidth: 2,
                                                    borderColor: colors.primary,
                                                },
                                            ]}
                                        >
                                            <Text
                                                style={[
                                                    styles.dayText,
                                                    isCompleted && styles.dayTextCompleted,
                                                    !cell.inCurrentMonth && styles.dayTextOutsideMonth,
                                                ]}
                                            >
                                                {cell.day}
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                );
                            })}
                        </View>
                    ))}
                </View>
            </View>

            <View style={styles.legendRow}>
                <View style={styles.legendItem}>
                    <View style={[styles.legendDot, { backgroundColor: colors.primary }]} />
                    <Text style={styles.legendText}>Completed</Text>
                </View>
                <View style={styles.legendItem}>
                    <View style={[styles.legendDot, { borderWidth: 1, borderColor: colors.primary, backgroundColor: 'transparent' }]} />
                    <Text style={styles.legendText}>Today</Text>
                </View>
            </View>

            <View style={styles.summaryContainer}>
                <View style={styles.summaryCard}>
                    <Text style={styles.summaryText}>
                        {completedCountThisMonth} session{completedCountThisMonth === 1 ? '' : 's'} completed in {MONTH_NAMES[month]}
                    </Text>
                </View>
            </View>
            {/* <View style={styles.activitiesContainer}>
                <Text style={styles.activitiesTitle}>
                    {selectedDate
                        ? `Activities on ${selectedDateLabel}`
                        : 'Select a date'}
                </Text>

                {!selectedDay?.sessions?.length ? (
                    <Text style={styles.noActivityText}>
                        No activities found
                    </Text>
                ) : (
                    selectedDay.sessions.map((session, index) => (
                        <View
                            key={index}
                            style={styles.activityCard}
                        >
                            <View style={{ flex: 1 }}>
                                <Text style={styles.activityTitle} numberOfLines={1}>
                                    {session.title}
                                </Text>

                                <Text style={styles.activitySubtitle} numberOfLines={1}>
                                    {session.practiceType} • {session.sessionType}
                                </Text>
                            </View>

                            <Text style={styles.activityDuration}>
                                {Math.floor(session.sessionDuration / 60)} min
                            </Text>
                        </View>
                    ))
                )}
            </View> */}
            <ActivitiesModal
                visible={activitiesModalVisible}
                onClose={() => setActivitiesModalVisible(false)}
                dateLabel={selectedDateLabel}
                sessions={selectedDay?.sessions}
            />
        </View>
    );
}