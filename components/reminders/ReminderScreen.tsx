import React, { useEffect } from 'react';
import { View, ScrollView, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getReminderStyles } from '@/assets/styles/reminders/reminderStyles';
import { useTheme } from '@/constants/ThemeContext';
import StandaloneTabBar from '@/components/home/StandaloneTabBar';
import ReminderHeader from './ReminderHeader';
import ReminderOverview from './ReminderOverview';
import ReminderTypes from './ReminderTypes';
import ReminderPreferences from './ReminderPreferences';
import { useReminderStore } from '@/store/reminderStore';
import { useAuthStore } from '@/store/authStore';
import { useReminderSync } from '@/hooks/useReminderSync';

export default function ReminderScreen() {
    useReminderSync();
    const insets = useSafeAreaInsets();
    const { colors } = useTheme();
    const styles = getReminderStyles(colors);
    const { user } = useAuthStore();
    const profileDocumentId =
        user?.id ||
        user?.profileDocumentId;


    const {
        reminders,
        loading,
        fetchReminders,
    } = useReminderStore();

    useEffect(() => {
        if (profileDocumentId) {
            fetchReminders(profileDocumentId);
        }
    }, [profileDocumentId]);

    const reminder = reminders[0] ?? null;

    return (
        <View style={styles.screen}>
            <ReminderHeader />

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingBottom: insets.bottom + 120,
                }}
            >
                <Text style={styles.pageTitle}>
                    Reminder Settings
                </Text>

                <Text style={styles.subtitle}>
                    Stay consistent with gentle reminders
                    for your practice and well-being.
                </Text>

                <ReminderOverview
                    reminders={reminders}
                    loading={loading}
                />

                <ReminderTypes
                    reminders={reminders}
                    loading={loading}
                />

                <ReminderPreferences
                    reminder={reminder}
                    loading={loading}
                />
            </ScrollView>

            <StandaloneTabBar />
        </View>
    );
}