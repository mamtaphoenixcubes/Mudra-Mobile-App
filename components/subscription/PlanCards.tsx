// import React, { useState } from 'react';
// import { View, Text, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
// // import { subscriptionStyles as styles } from '@/assets/styles/subscription/subscriptionStyles';
// import { getSubscriptionStyles } from '@/assets/styles/subscription/subscriptionStyles'
// import { useTheme } from '@/constants/ThemeContext'
// import DoneSvg from '@/assets/icons/Done.svg';
// import DoneWhite from '@/assets/icons/DoneWhite.svg'
// import { router } from 'expo-router';

// const { width } = Dimensions.get('window');
// const moderateScale = (size: number, factor = 0.5) => {
//     const s = (width / 375) * size;
//     return size + (s - size) * factor;
// };

// type Plan = {
//     id: string;
//     name: string;
//     price: string;
//     period: string;
//     billing: string;
//     features: string[];
//     isMostPopular?: boolean;
//     saveBadge?: string;
// };

// const PLANS: Plan[] = [
//     {
//         id: 'monthly',
//         name: 'Monthly',
//         price: '₹499',
//         period: '/ month',
//         billing: 'Billed monthly',
//         features: [
//             'Full access to all sessions',
//             'Personalized insights',
//             'Ad-free experience',
//             'Cancel anytime',
//         ],
//     },
//     {
//         id: 'annual',
//         name: 'Annual',
//         price: '₹2,999',
//         period: '/ year',
//         billing: 'Save 50%',
//         features: [
//             'Full access to all sessions',
//             'Personalized insights',
//             'Ad-free experience',
//             'Priority support',
//             'Cancel anytime',
//         ],
//         isMostPopular: true,
//         saveBadge: 'Save 50%',
//     },
//     {
//         id: 'lifetime',
//         name: 'Lifetime',
//         price: '₹7,999',
//         period: '',
//         billing: 'One-time payment',
//         features: [
//             'Full access to all sessions',
//             'Personalized insights',
//             'Ad-free experience',
//             'Priority support',
//             'No recurring payments',
//         ],
//     },
// ];

// // Normalize all plans to same feature count (5)
// const MAX_FEATURES = Math.max(...PLANS.map(p => p.features.length));

// export default function PlanCards() {
//     const [selected, setSelected] = useState('annual');
//     const { colors, isDark } = useTheme()
//     const styles = getSubscriptionStyles(colors)

//     return (
//         <View style={{ marginBottom: moderateScale(8), marginTop: moderateScale(16) }}>
//             <Text style={styles.sectionTitle}>Choose Your Plan</Text>
//             <ScrollView
//                 horizontal
//                 showsHorizontalScrollIndicator={false}
//                 contentContainerStyle={{
//                     paddingHorizontal: moderateScale(16),
//                     gap: moderateScale(12),
//                     paddingRight: moderateScale(24),
//                     alignItems: 'stretch',   // ← all cards same height
//                 }}
//             >
//                 {PLANS.map((plan) => (
//                     <TouchableOpacity
//                         key={plan.id}
//                         style={[
//                             styles.planCard,
//                             selected === plan.id && styles.planCardSelected,
//                             {
//                                 width: moderateScale(185),
//                                 minHeight: moderateScale(340),
//                                 paddingTop: plan.isMostPopular
//                                     ? moderateScale(26)
//                                     : moderateScale(14),
//                             },
//                         ]}
//                         onPress={() => {
//                             setSelected(plan.id);
//                             router.push({
//                                 pathname: '/plandetail',
//                                 params: {
//                                     name: plan.name,
//                                     price: plan.price,
//                                     period: plan.period,
//                                     billing: plan.billing,
//                                     features: JSON.stringify(plan.features),
//                                     isMostPopular: plan.isMostPopular ? 'true' : 'false',
//                                 },
//                             });
//                         }}
//                         activeOpacity={0.85}
//                     >
//                         {/* Most Popular Badge */}
//                         {plan.isMostPopular && (
//                             <View style={styles.planMostPopularBadge}>
//                                 <Text style={styles.planMostPopularText}>Most Popular</Text>
//                             </View>
//                         )}

//                         {/* Plan name + Radio */}
//                         <View style={styles.planHeaderRow}>
//                             <Text style={styles.planName}>{plan.name}</Text>
//                             <View style={[
//                                 styles.planRadio,
//                                 selected === plan.id && styles.planRadioSelected,
//                             ]}>
//                                 {selected === plan.id && <View style={styles.planRadioDot} />}
//                             </View>
//                         </View>

//                         {/* Price */}
//                         <Text style={styles.planPrice}>
//                             {plan.price}
//                             {plan.period ? (
//                                 <Text style={styles.planPricePeriod}> {plan.period}</Text>
//                             ) : null}
//                         </Text>

//                         {/* Billing / Save badge */}
//                         {plan.saveBadge ? (
//                             <View style={styles.planSaveBadge}>
//                                 <Text style={styles.planSaveText}>{plan.saveBadge}</Text>
//                             </View>
//                         ) : (
//                             <Text style={styles.planBilling}>{plan.billing}</Text>
//                         )}

//                         {/* Divider */}
//                         <View style={{
//                             height: 0.5,
//                             backgroundColor: '#00000020',
//                             marginVertical: moderateScale(8),
//                         }} />

//                         {/* Features — padded to MAX so all cards equal height */}
//                         {Array.from({ length: MAX_FEATURES }).map((_, i) => {
//                             const feature = plan.features[i];
//                             return (
//                                 <View key={i} style={[
//                                     styles.planFeatureRow,
//                                     { opacity: feature ? 1 : 0 },  // hide if no feature
//                                 ]}>
//                                     {isDark ? <DoneWhite width={14} height={14} /> : <DoneSvg width={14} height={14} />}
//                                     <Text style={styles.planFeatureText}>
//                                         {feature ?? ' '}
//                                     </Text>
//                                 </View>
//                             );
//                         })}
//                     </TouchableOpacity>
//                 ))}
//             </ScrollView>
//         </View>
//     );
// }
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { getSubscriptionStyles } from '@/assets/styles/subscription/subscriptionStyles'
import { useTheme } from '@/constants/ThemeContext'
import DoneSvg from '@/assets/icons/Done.svg';
import DoneWhite from '@/assets/icons/DoneWhite.svg'
import { router } from 'expo-router';
import { useSubscriptionStore, SubscriptionPlan } from '@/store/subscriptionStore';

const { width } = Dimensions.get('window');
const moderateScale = (size: number, factor = 0.5) => {
    const s = (width / 375) * size;
    return size + (s - size) * factor;
};

function formatPrice(plan: SubscriptionPlan) {
    if (plan.Price === 0) return { price: '₹0', period: '' };
    const period = plan.BillingType === 'MONTHLY' ? '/ month' : '';
    return { price: `₹${plan.Price}`, period };
}

function ctaLabel(plan: SubscriptionPlan) {
    if (plan.PlanType === 'FREE') return 'Get Started Free';
    if (plan.PlanType === 'LIFETIME') return 'Get Lifetime Access';
    if (plan.TrialEnabled && plan.TrialDays > 0) return `Start ${plan.TrialDays}-Day Free Trial`;
    return 'Get Started';
}

// Normalize all plans to same feature count so cards stay equal height
export default function PlanCards() {
    const [selected, setSelected] = useState<string | null>(null);
    const { colors, isDark } = useTheme()
    const styles = getSubscriptionStyles(colors)
    const { plans, loadingPlans, plansError, fetchPlans } = useSubscriptionStore();

    useEffect(() => {
        fetchPlans();
    }, []);

    useEffect(() => {
        if (plans.length && !selected) {
            const popular = plans.find((p) => p.IsPopular);
            setSelected((popular ?? plans[0]).documentId);
        }
    }, [plans]);

    const maxFeatures = Math.max(1, ...plans.map((p) => p.Description?.length ?? 0));

    const handleOpenPlan = (plan: SubscriptionPlan) => {
        const { price, period } = formatPrice(plan);
        setSelected(plan.documentId);
        router.push({
            pathname: '/plandetail',
            params: {
                planDocumentId: plan.documentId,
                planCode: plan.Code,
                planType: plan.PlanType,
                name: plan.Name,
                price,
                period,
                billing: plan.BillingType === 'ONE_TIME' ? 'One-time payment' : `Billed ${plan.BillingType.toLowerCase()}`,
                features: JSON.stringify(plan.Description ?? []),
                isMostPopular: plan.IsPopular ? 'true' : 'false',
            },
        });
    };

    if (loadingPlans) {
        return (
            <View style={{ marginBottom: moderateScale(8), marginTop: moderateScale(16) }}>
                <Text style={styles.sectionTitle}>Choose Your Plan</Text>
                <Text style={{ paddingHorizontal: moderateScale(16), color: colors.textSub }}>
                    Loading plans...
                </Text>
            </View>
        );
    }

    if (plansError) {
        return (
            <View style={{ marginBottom: moderateScale(8), marginTop: moderateScale(16) }}>
                <Text style={styles.sectionTitle}>Choose Your Plan</Text>
                <Text style={{ paddingHorizontal: moderateScale(16), color: '#E53935' }}>
                    {plansError}
                </Text>
            </View>
        );
    }

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
                    alignItems: 'stretch',
                }}
            >
                {plans.map((plan) => {
                    const { price, period } = formatPrice(plan);
                    return (
                        <TouchableOpacity
                            key={plan.documentId}
                            style={[
                                styles.planCard,
                                selected === plan.documentId && styles.planCardSelected,
                                {
                                    width: moderateScale(185),
                                    minHeight: moderateScale(380),
                                    paddingTop: plan.IsPopular
                                        ? moderateScale(26)
                                        : moderateScale(14),
                                },
                            ]}
                            onPress={() => handleOpenPlan(plan)}
                            activeOpacity={0.85}
                        >
                            {plan.IsPopular && (
                                <View style={styles.planMostPopularBadge}>
                                    <Text style={styles.planMostPopularText}>Most Popular</Text>
                                </View>
                            )}

                            <View style={styles.planHeaderRow}>
                                <Text style={styles.planName}>{plan.Name}</Text>
                                <View style={[
                                    styles.planRadio,
                                    selected === plan.documentId && styles.planRadioSelected,
                                ]}>
                                    {selected === plan.documentId && <View style={styles.planRadioDot} />}
                                </View>
                            </View>

                            <Text style={styles.planPrice}>
                                {price}
                                {period ? (
                                    <Text style={styles.planPricePeriod}> {period}</Text>
                                ) : null}
                            </Text>

                            <Text style={styles.planBilling}>
                                {plan.BillingType === 'ONE_TIME' ? 'One-time payment' : `Billed ${plan.BillingType.toLowerCase()}`}
                            </Text>

                            <View style={{
                                height: 0.5,
                                backgroundColor: '#00000020',
                                marginVertical: moderateScale(8),
                            }} />

                            {Array.from({ length: maxFeatures }).map((_, i) => {
                                const feature = plan.Description?.[i];
                                return (
                                    <View key={i} style={[
                                        styles.planFeatureRow,
                                        { opacity: feature ? 1 : 0 },
                                    ]}>
                                        {isDark ? <DoneWhite width={14} height={14} /> : <DoneSvg width={14} height={14} />}
                                        <Text style={styles.planFeatureText}>
                                            {feature ?? ' '}
                                        </Text>
                                    </View>
                                );
                            })}

                            {/* CTA button — matches "Get Started Free" / "Start 7-Day Free Trial" / "Get Lifetime Access" */}
                            <TouchableOpacity
                                style={[
                                    styles.planCtaBtn,
                                    plan.IsPopular && styles.planCtaBtnSelected,
                                ]}
                                activeOpacity={0.85}
                                onPress={() => handleOpenPlan(plan)}
                            >
                                <Text style={[
                                    styles.planCtaBtnText,
                                    plan.IsPopular && styles.planCtaBtnTextSelected,
                                ]}>
                                    {ctaLabel(plan)}
                                </Text>
                            </TouchableOpacity>
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>
        </View>
    );
}