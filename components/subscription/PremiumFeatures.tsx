import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
// import { subscriptionStyles as styles } from '@/assets/styles/subscription/subscriptionStyles';
import { getSubscriptionStyles } from '@/assets/styles/subscription/subscriptionStyles'
import { useTheme } from '@/constants/ThemeContext'
import { Ionicons } from '@expo/vector-icons';
import LotusBlack from '@/assets/icons/LotusBlack.svg';
import BeginnerSvg from '@/assets/icons/Group.svg';
import ExportSvg from '@/assets/icons/Export.svg';
import TuneSvg from '@/assets/icons/Tune.svg';
import HelpSvg from '@/assets/icons/Help.svg';

const FEATURES = [
    {
        icon: <LotusBlack width={22} height={22} />,
        title: 'Unlimited Access',
        subtitle: 'Access all Mudras, Yoga Nidra, Meditations and more.',
    },
    {
        icon: <BeginnerSvg width={22} height={22} />,
        title: 'Advanced Analytics',
        subtitle: 'Deep insights into your practice and well-being.',
    },
    {
        icon: <ExportSvg width={22} height={22} />,
        title: 'Offline Access',
        subtitle: 'Download sessions and practice anywhere, anytime.',
    },
    {
        icon: <TuneSvg width={22} height={22} />,
        title: 'Exclusive Content',
        subtitle: 'Premium sessions, expert talks and new releases.',
    },
    {
        icon: <HelpSvg width={22} height={22} />,
        title: 'Priority Support',
        subtitle: 'Get faster help and dedicated support.',
    },
];

export default function PremiumFeatures() {
    const { colors } = useTheme()
    const styles = getSubscriptionStyles(colors)
    return (
        <View style={styles.featuresContainer}>
            <Text style={styles.sectionTitle}>Premium Features</Text>
            <View style={styles.featuresCard}>
                {FEATURES.map((item, i) => (
                    <React.Fragment key={i}>
                        <TouchableOpacity style={styles.featureRow} activeOpacity={0.7}>
                            <View style={styles.featureIconCircle}>
                                {item.icon}
                            </View>
                            <View style={styles.featureTextBlock}>
                                <Text style={styles.featureTitle}>{item.title}</Text>
                                <Text style={styles.featureSubtitle}>{item.subtitle}</Text>
                            </View>
                            <Ionicons name="chevron-forward" size={16} color="#0F0F0F60" />
                        </TouchableOpacity>
                        {i < FEATURES.length - 1 && <View style={styles.featureRowDivider} />}
                    </React.Fragment>
                ))}
            </View>
        </View>
    );
}