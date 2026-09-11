import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import AppHeader from '@/components/common/AppHeader';
import PaymentModal from '@/components/common/PaymentModal';
import { useTheme } from '@/constants/ThemeContext';
import { getPlanDetailStyles } from '@/assets/styles/subscription/planDetailStyles';
import { usePaymentStore } from '@/store/paymentStore';

export default function PlanDetailScreen() {
    const { colors } = useTheme();
    const styles = getPlanDetailStyles(colors);
    const [paymentModalVisible, setPaymentModalVisible] = useState(false);

    const { name, price, period, billing, features, isMostPopular, planDocumentId, planType } = useLocalSearchParams<{
        name: string;
        price: string;
        period?: string;
        billing: string;
        features: string;
        isMostPopular?: string;
        planDocumentId: string;
        planCode?: string;
        planType?: string;
    }>();

    const featureList: string[] = features ? JSON.parse(features) : [];

    const handlePaymentSuccess = () => {
        setPaymentModalVisible(false);
        const result = usePaymentStore.getState().lastResult;
        router.push({
            pathname: '/invoice',
            params: {
                planName: name,
                price,
                billing,
                paymentId: result?.razorpayPaymentId,
                transactionId: result?.paymentTransactionDocumentId,
                paidAt: new Date().toISOString(),
                paymentMethod: 'Razorpay',
            },
        });
    };

    return (
        <View style={styles.screen}>
            <AppHeader />

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

                <Text style={styles.pageTitle}>{name} Plan</Text>
                <Text style={styles.pageSubtitle}>Everything included, no hidden fees.</Text>

                <View style={styles.priceCard}>
                    {isMostPopular === 'true' && (
                        <View style={styles.priceCardBadge}>
                            <Text style={styles.priceCardBadgeText}>MOST POPULAR</Text>
                        </View>
                    )}
                    <Text style={styles.priceCardPlanName}>{name}</Text>
                    <Text style={styles.priceCardPrice}>
                        {price}
                        {period ? <Text style={styles.priceCardPeriod}> {period}</Text> : null}
                    </Text>
                    <Text style={styles.priceCardBilling}>{billing}</Text>
                </View>

                <Text style={styles.sectionLabel}>What's included</Text>
                <View style={styles.featuresCard}>
                    {featureList.map((feature, i) => (
                        <View key={i} style={styles.featureRow}>
                            <Ionicons name="checkmark-circle" size={18} color={colors.primary} />
                            <Text style={styles.featureText}>{feature}</Text>
                        </View>
                    ))}
                </View>

                <TouchableOpacity
                    style={styles.getStartedBtn}
                    activeOpacity={0.85}
                    onPress={() => setPaymentModalVisible(true)}
                >
                    <Text style={styles.getStartedBtnText}>Get Started</Text>
                </TouchableOpacity>
            </ScrollView>

            <PaymentModal
                visible={paymentModalVisible}
                planName={`${name} Plan`}
                planPrice={price}
                planBilling={billing}
                planDocumentId={planDocumentId}
                billingType={planType === 'PREMIUM' || planType === 'PREMIUM_PLUS' ? 'MONTHLY' : (planType === 'LIFETIME' ? 'ONE_TIME' : 'FREE')}
                onClose={() => setPaymentModalVisible(false)}
                onSuccess={handlePaymentSuccess}
            />
        </View>
    );
}