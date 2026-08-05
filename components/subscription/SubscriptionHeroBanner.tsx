import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
// import { subscriptionStyles as styles } from '@/assets/styles/subscription/subscriptionStyles';
import { getSubscriptionStyles } from '@/assets/styles/subscription/subscriptionStyles'
import { useTheme } from '@/constants/ThemeContext'
import LotusBlack from '@/assets/icons/Lotus.svg';
import StarSvg from '@/assets/icons/StarWhite.svg';

export default function SubscriptionHeroBanner() {
    const { colors } = useTheme()
    const styles = getSubscriptionStyles(colors)
    return (
        <View style={styles.heroBannerContainer}>
            <View style={styles.heroBannerCard}>
                <View style={styles.heroBannerIconCircle}>
                    <LotusBlack width={32} height={32} />
                </View>
                <View style={styles.heroBannerTextBlock}>
                    <Text style={styles.heroBannerTitle}>Go Premium. Live Better.</Text>
                    <Text style={styles.heroBannerSubtitle}>
                        Access all features, premium sessions and personalized insights.
                    </Text>
                </View>
                <TouchableOpacity style={styles.heroBannerBtn} activeOpacity={0.8}>
                    <StarSvg width={14} height={14} color="#FFFFFF" />
                    <Text style={styles.heroBannerBtnText}>7 Days Free Trial</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}