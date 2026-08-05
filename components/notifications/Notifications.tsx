import React, { useState } from 'react';
import { View, ScrollView, Text } from 'react-native';

import NotificationHeader from './NotificationHeader';
import FilterTabs, { TabType } from './FilterTabs';
import NotificationSection from './NotificationSection';
import EmptyState from './EmptyState';
import { NotificationData } from './NotificationItem';
import StandaloneTabBar from '@/components/home/StandaloneTabBar';
import { getNotificationStyles } from '@/assets/styles/notifications/notificationStyles'
import { useTheme } from '@/constants/ThemeContext'
import { useNotificationLogStore, formatNotificationTime } from '@/store/notificationLogStore';
import { getNotificationIcon } from '@/constants/notificationIcons';

// ── Main ─────────────────────────────────────────────────────────────────────
export default function Notifications() {
    const [activeTab, setActiveTab] = useState<TabType>('All');

    const logEntries = useNotificationLogStore((s) => s.entries);
    const markAllReadInStore = useNotificationLogStore((s) => s.markAllRead);

    const notifications: NotificationData[] = logEntries.map((entry) => ({
        id: entry.id,
        type: entry.type,
        icon: getNotificationIcon(entry.type, entry.title, entry.subtitle),
        title: entry.title,
        subtitle: entry.subtitle,
        time: formatNotificationTime(entry.timestamp),
        unread: entry.unread,
    }));

    const reminders = notifications.filter((n) => n.type === 'reminder');
    const updates = notifications.filter((n) => n.type === 'update');

    const showReminders = activeTab === 'All' || activeTab === 'Reminders';
    const showUpdates = activeTab === 'All' || activeTab === 'Updates';

    const markAllRead = () => markAllReadInStore();

    const isEmpty = notifications.length === 0;
    const { colors: themeColors } = useTheme()
    const styles = getNotificationStyles(themeColors)

    return (
        <View style={styles.screen}>

            {/* Header */}
            <NotificationHeader />

            {/* Filter Tabs */}
            <FilterTabs activeTab={activeTab} onTabChange={setActiveTab} />

            {/* Scrollable content */}
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                <Text style={styles.pageTitle}>Notifications</Text>
                {showReminders && reminders.length > 0 && (
                    <NotificationSection
                        title="Reminders"
                        showMarkAllRead
                        onMarkAllRead={markAllRead}
                        items={reminders}
                    />
                )}

                {showUpdates && updates.length > 0 && (
                    <NotificationSection
                        title="Updates"
                        items={updates}
                    />
                )}

                {isEmpty && <EmptyState />}
                {!isEmpty && activeTab === 'Reminders' && reminders.length === 0 && <EmptyState />}
                {!isEmpty && activeTab === 'Updates' && updates.length === 0 && <EmptyState />}
            </ScrollView>

            {/* Tab bar */}
            <StandaloneTabBar />

        </View>
    );
}
