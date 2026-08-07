import React, { useState, useEffect, useCallback } from 'react';
import { View, ScrollView, Text, RefreshControl } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getProgressInsightsStyles } from '@/assets/styles/progressinsights/progressInsightsStyles'
import { useTheme } from '@/constants/ThemeContext'
import StandaloneTabBar from '@/components/home/StandaloneTabBar';
import ProgressHeader from './ProgressHeader';
import ProgressTabSelector, { type ProgressTab } from './ProgressTabSelector';
import OverallProgress from './OverallProgress';
import PracticeAnalysis from './PracticeAnalysis';
import ConsistencySection from './ConsistencySection';
import AnalyticsSection from './AnalyticsSection';
import GoalBanner from './GoalBanner';
import { useProgressInsightStore } from '@/store/progressInsightStore';
import { useAuthStore } from '@/store/authStore';


export default function ProgressInsightsScreen() {
    const insets = useSafeAreaInsets();
    const { colors } = useTheme()
    const styles = getProgressInsightsStyles(colors)
  const { user } = useAuthStore();
const [refreshing, setRefreshing] = useState(false);
    const profileDocumentId =
        user?.id ||
        user?.profileDocumentId;
    const [activeTab, setActiveTab] = useState<ProgressTab>('All');
const { goal, overview, summary, distribution,analytics, loading,createGoal,fetchGoal,fetchOverview,fetchSummary,fetchDistribution,fetchAnalytics,} = useProgressInsightStore();
const loadData = useCallback(async () => {
    if (!profileDocumentId) return;

    await Promise.all([
        fetchGoal(profileDocumentId),
        fetchOverview(profileDocumentId),
        fetchSummary(profileDocumentId),
        fetchDistribution(profileDocumentId),
        fetchAnalytics(profileDocumentId),
    ]);
}, [
    profileDocumentId,
    fetchGoal,
    fetchOverview,
    fetchSummary,
    fetchDistribution,
    fetchAnalytics,
]);
useEffect(() => {
    loadData();
}, [loadData]);
const onRefresh = useCallback(async () => {
    setRefreshing(true);

    try {
        await loadData();
    } finally {
        setRefreshing(false);
    }
}, [loadData]);
    return (
        <View style={styles.screen}>
            <ProgressHeader />
       <ScrollView
    showsVerticalScrollIndicator={false}
    contentContainerStyle={{ paddingBottom: insets.bottom + 120 }}
    refreshControl={
        <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[colors.primary]}
            tintColor={colors.primary}
        />
    }
>
                <Text style={styles.pageTitle}>Progress Insights</Text>
                <Text style={styles.subtitle}>
                    Track your journey. Celebrate your growth.
                </Text>
                <ProgressTabSelector active={activeTab} onChange={setActiveTab} />

                {activeTab === 'All' && (
                    <>
                         <OverallProgress summary={summary} />
                        <PracticeAnalysis distribution={distribution} />
                       <ConsistencySection overview={overview} />
                         <AnalyticsSection analytics={analytics} />
                        <GoalBanner analytics={analytics} />
                    </>
                )}

                {activeTab === 'Reminders' && (
                    <View style={{ padding: 32, alignItems: 'center' }}>
                        <Text style={{ color: colors.textSub, fontFamily: 'SF-Pro-Display', fontSize: 14, textAlign: 'center' }}>
                            No reminder activity yet.
                        </Text>
                    </View>
                )}

                {activeTab === 'Updates' && (
                    <View style={{ padding: 32, alignItems: 'center' }}>
                        <Text style={{ color: colors.textSub, fontFamily: 'SF-Pro-Display', fontSize: 14, textAlign: 'center' }}>
                            No updates yet.
                        </Text>
                    </View>
                )}
            </ScrollView>
            <StandaloneTabBar />
        </View>
    );
}