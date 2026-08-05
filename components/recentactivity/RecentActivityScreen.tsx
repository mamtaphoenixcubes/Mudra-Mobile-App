import React, { useEffect } from 'react';
import { View, ScrollView, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getRecentActivityStyles } from '@/assets/styles/recentactivity/recentActivityStyles'
import { useTheme } from '@/constants/ThemeContext'
import StandaloneTabBar from '@/components/home/StandaloneTabBar';
import RecentActivityHeader from './RecentActivityHeader';
import PracticeSummary from './PracticeSummary';
import ActivityGroups from './ActivityGroups';
import MotivationBanner from './MotivationBanner';
import { useActivityStore } from '@/store/activityStore';
import { useAuthStore } from '@/store/authStore';

export default function RecentActivityScreen() {
    const insets = useSafeAreaInsets();
    const { colors } = useTheme()
    const styles = getRecentActivityStyles(colors)

    const { user } = useAuthStore();
    const profileDocumentId = user?.id || user?.profileDocumentId;
    const fetchUserActivities = useActivityStore((s) => s.fetchUserActivities);

    useEffect(() => {
        if (profileDocumentId) {
            fetchUserActivities(profileDocumentId);
        }
    }, [profileDocumentId]);

    return (
        <View style={styles.screen}>
            <RecentActivityHeader />
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: insets.bottom + 120 }}
            >
                <Text style={styles.pageTitle}>Recent Activity</Text>
                <Text style={styles.subtitle}>
                    Your journey of healing and growth. See what you've practiced and track your progress.
                </Text>
                <PracticeSummary />
                <ActivityGroups />
                <MotivationBanner />
            </ScrollView>
            <StandaloneTabBar />
        </View>
    );
}