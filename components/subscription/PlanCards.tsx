import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
// import { subscriptionStyles as styles } from '@/assets/styles/subscription/subscriptionStyles';
import { getSubscriptionStyles } from '@/assets/styles/subscription/subscriptionStyles'
import { useTheme } from '@/constants/ThemeContext'
import DoneSvg from '@/assets/icons/Done.svg';
import DoneWhite from '@/assets/icons/DoneWhite.svg'
import { router } from 'expo-router';

const { width } = Dimensions.get('window');
const moderateScale = (size: number, factor = 0.5) => {
    const s = (width / 375) * size;
    return size + (s - size) * factor;
};

type Plan = {
    id: string;
    name: string;
    price: string;
    period: string;
    billing: string;
    features: string[];
    isMostPopular?: boolean;
    saveBadge?: string;
};

const PLANS: Plan[] = [
    {
        id: 'monthly',
        name: 'Monthly',
        price: '₹499',
        period: '/ month',
        billing: 'Billed monthly',
        features: [
            'Full access to all sessions',
            'Personalized insights',
            'Ad-free experience',
            'Cancel anytime',
        ],
    },
    {
        id: 'annual',
        name: 'Annual',
        price: '₹2,999',
        period: '/ year',
        billing: 'Save 50%',
        features: [
            'Full access to all sessions',
            'Personalized insights',
            'Ad-free experience',
            'Priority support',
            'Cancel anytime',
        ],
        isMostPopular: true,
        saveBadge: 'Save 50%',
    },
    {
        id: 'lifetime',
        name: 'Lifetime',
        price: '₹7,999',
        period: '',
        billing: 'One-time payment',
        features: [
            'Full access to all sessions',
            'Personalized insights',
            'Ad-free experience',
            'Priority support',
            'No recurring payments',
        ],
    },
];

// Normalize all plans to same feature count (5)
const MAX_FEATURES = Math.max(...PLANS.map(p => p.features.length));

export default function PlanCards() {
    const [selected, setSelected] = useState('annual');
    const { colors, isDark } = useTheme()
    const styles = getSubscriptionStyles(colors)

    return (
        <View style={{ marginBottom: moderateScale(8), marginTop: moderateScale(16) }}>
            <Text style={styles.sectionTitle}>Choose Your Plan</Text>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    paddingHorizontal: moderateScale(16),
                    gap: moderateScale(12),
                    paddingRight: moderateScale(24),
                    alignItems: 'stretch',   // ← all cards same height
                }}
            >
                {PLANS.map((plan) => (
                    <TouchableOpacity
                        key={plan.id}
                        style={[
                            styles.planCard,
                            selected === plan.id && styles.planCardSelected,
                            {
                                width: moderateScale(185),
                                minHeight: moderateScale(340),
                                paddingTop: plan.isMostPopular
                                    ? moderateScale(26)
                                    : moderateScale(14),
                            },
                        ]}
                        onPress={() => {
                            setSelected(plan.id);
                            router.push({
                                pathname: '/plandetail',
                                params: {
                                    name: plan.name,
                                    price: plan.price,
                                    period: plan.period,
                                    billing: plan.billing,
                                    features: JSON.stringify(plan.features),
                                    isMostPopular: plan.isMostPopular ? 'true' : 'false',
                                },
                            });
                        }}
                        activeOpacity={0.85}
                    >
                        {/* Most Popular Badge */}
                        {plan.isMostPopular && (
                            <View style={styles.planMostPopularBadge}>
                                <Text style={styles.planMostPopularText}>Most Popular</Text>
                            </View>
                        )}

                        {/* Plan name + Radio */}
                        <View style={styles.planHeaderRow}>
                            <Text style={styles.planName}>{plan.name}</Text>
                            <View style={[
                                styles.planRadio,
                                selected === plan.id && styles.planRadioSelected,
                            ]}>
                                {selected === plan.id && <View style={styles.planRadioDot} />}
                            </View>
                        </View>

                        {/* Price */}
                        <Text style={styles.planPrice}>
                            {plan.price}
                            {plan.period ? (
                                <Text style={styles.planPricePeriod}> {plan.period}</Text>
                            ) : null}
                        </Text>

                        {/* Billing / Save badge */}
                        {plan.saveBadge ? (
                            <View style={styles.planSaveBadge}>
                                <Text style={styles.planSaveText}>{plan.saveBadge}</Text>
                            </View>
                        ) : (
                            <Text style={styles.planBilling}>{plan.billing}</Text>
                        )}

                        {/* Divider */}
                        <View style={{
                            height: 0.5,
                            backgroundColor: '#00000020',
                            marginVertical: moderateScale(8),
                        }} />

                        {/* Features — padded to MAX so all cards equal height */}
                        {Array.from({ length: MAX_FEATURES }).map((_, i) => {
                            const feature = plan.features[i];
                            return (
                                <View key={i} style={[
                                    styles.planFeatureRow,
                                    { opacity: feature ? 1 : 0 },  // hide if no feature
                                ]}>
                                    {isDark ? <DoneWhite width={14} height={14} /> : <DoneSvg width={14} height={14} />}
                                    <Text style={styles.planFeatureText}>
                                        {feature ?? ' '}
                                    </Text>
                                </View>
                            );
                        })}
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
}