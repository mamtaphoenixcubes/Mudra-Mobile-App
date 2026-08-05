import React, { useState,useEffect } from 'react';
import { View, ScrollView, Text } from 'react-native';
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

    const profileDocumentId =
        user?.id ||
        user?.profileDocumentId;
    const [activeTab, setActiveTab] = useState<ProgressTab>('All');
const { goal, overview, summary, distribution,analytics, loading,createGoal,fetchGoal,fetchOverview,fetchSummary,fetchDistribution,fetchAnalytics,} = useProgressInsightStore();
useEffect(() => {
  if (!profileDocumentId) return;

  fetchGoal(profileDocumentId);
  fetchOverview(profileDocumentId);
  fetchSummary(profileDocumentId);
  fetchDistribution(profileDocumentId);
  fetchAnalytics(profileDocumentId);
}, [profileDocumentId]);
    return (
        <View style={styles.screen}>
            <ProgressHeader />
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: insets.bottom + 120 }}
            >
                <Text style={styles.pageTitle}>Progress Insights</Text>
                <Text style={styles.subtitle}>
                    Track your journey. Celebrate your growth.
                </Text>
                <ProgressTabSelector active={activeTab} onChange={setActiveTab} />

                {activeTab === 'All' && (
                    <>
                        <OverallProgress />
                        <PracticeAnalysis />
                        <ConsistencySection />
                        <AnalyticsSection />
                        <GoalBanner />
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