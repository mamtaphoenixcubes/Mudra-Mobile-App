import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
// import { subscriptionStyles as styles } from '@/assets/styles/subscription/subscriptionStyles';
import { getSubscriptionStyles } from '@/assets/styles/subscription/subscriptionStyles'
import { useTheme } from '@/constants/ThemeContext'
import StandaloneTabBar from '@/components/home/StandaloneTabBar';
import SubscriptionHeader from './SubscriptionHeader';
import SubscriptionHeroBanner from './SubscriptionHeroBanner';
import PlanCards from './PlanCards';
import StatsRow from './StatsRow';
import PremiumFeatures from './PremiumFeatures';
import TrialBanner from './TrialBanner';

export default function SubscriptionScreen() {
    const insets = useSafeAreaInsets();
    const { colors } = useTheme()
    const styles = getSubscriptionStyles(colors)

    return (
        <View style={styles.screen}>
            <SubscriptionHeader />
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: insets.bottom + 120 }}
            >
                <Text style={styles.pageTitle}>Subscription / Premium</Text>
                <Text style={styles.pageSubtitle}>
                    Unlock your full potential with Mudra Premium.
                </Text>
                <SubscriptionHeroBanner />
                <PlanCards />
                <StatsRow />
                <PremiumFeatures />
                <TrialBanner />
            </ScrollView>
            <StandaloneTabBar />
        </View>
    );
}