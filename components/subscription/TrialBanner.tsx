import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
// import { subscriptionStyles as styles } from '@/assets/styles/subscription/subscriptionStyles';
import { getSubscriptionStyles } from '@/assets/styles/subscription/subscriptionStyles'
import { useTheme } from '@/constants/ThemeContext'
import GiftSvg from '@/assets/icons/Gift.svg';
import SecureSvg from '@/assets/icons/Secure.svg';
import CancelSvg from '@/assets/icons/Cancel.svg';
import WarrantySvg from '@/assets/icons/Warranty.svg';
import SecureWhite from '@/assets/icons/SecureWhite.svg'
import CancelWhite from '@/assets/icons/CancelWhite.svg'
import WarrantyWhite from '@/assets/icons/WarrantyWhite.svg'

export default function TrialBanner() {
    const { colors, isDark } = useTheme()
    const styles = getSubscriptionStyles(colors)
    return (
        <>
            {/* Trial card */}
            <View style={styles.trialContainer}>
                <View style={styles.trialCard}>
                    <View style={styles.trialIconCircle}>
                        <GiftSvg width={24} height={24} />
                    </View>
                    <View style={styles.trialTextBlock}>
                        <Text style={styles.trialTitle}>Start your 7-day free trial</Text>
                        <Text style={styles.trialSubtitle}>
                            Cancel anytime. No charges before trial ends.
                        </Text>
                    </View>
                    <TouchableOpacity style={styles.trialBtn} activeOpacity={0.8}>
                        <Text style={styles.trialBtnText}>Start Free Trial</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Auto-renew note */}
            <Text style={styles.renewNote}>
                After trial your selected plan will be auto-renewed.{'\n'}
                You can cancel anytime from your account settings.
            </Text>

            {/* Trust row */}
            <View style={styles.trustRow}>
                <View style={styles.trustItem}>
                    {isDark ? <SecureWhite width={16} height={16} /> : <SecureSvg width={16} height={16} />}
                    <Text style={styles.trustText}>Secure Payments</Text>
                </View>
                <View style={styles.trustDivider} />
                <View style={styles.trustItem}>
                    {isDark ? <CancelWhite width={16} height={16} /> : <CancelSvg width={16} height={16} />}
                    <Text style={styles.trustText}>Cancel Anytime</Text>
                </View>
                <View style={styles.trustDivider} />
                <View style={styles.trustItem}>
                    {isDark ? <WarrantyWhite width={16} height={16} /> : <WarrantySvg width={16} height={16} />}
                    <Text style={styles.trustText}>100% Satisfaction</Text>
                </View>
            </View>
        </>
    );
}