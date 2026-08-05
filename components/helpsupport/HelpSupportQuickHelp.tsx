import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
// import { helpSupportStyles as styles } from '@/assets/styles/helpsupport/helpSupportStyles';
import { getHelpSupportStyles } from '@/assets/styles/helpsupport/helpSupportStyles'
import { useTheme } from '@/constants/ThemeContext'
import BookSvg from '@/assets/icons/Book.svg';
import LearnSvg from '@/assets/icons/Learn.svg';
import StartSvg from '@/assets/icons/Start.svg';
import LotusBlackSvg from '@/assets/icons/LotusBlack.svg';
import WarrantySvg from '@/assets/icons/Warranty.svg';
import { router } from 'expo-router';

type Item = {
    icon: React.ReactNode;
    title: string;
    subtitle: string;
    onPress?: () => void;
};

const ITEMS: Item[] = [
    {
        icon: <BookSvg width={22} height={22} />,
        title: 'FAQ',
        subtitle: 'Find answers to common questions',
        onPress: () => router.push({ pathname: '/helparticle', params: { topic: 'faq' } })
    },
    {
        icon: <LearnSvg width={22} height={22} />,
        title: 'How It Works',
        subtitle: 'Learn how Mudra helps you heal',
        onPress: () => router.push({ pathname: '/helparticle', params: { topic: 'how-it-works' } })
    },
    {
        icon: <StartSvg width={22} height={22} />,
        title: 'Getting Started',
        subtitle: 'A quick guide to get you started',
        onPress: () => router.push({ pathname: '/helparticle', params: { topic: 'getting-started' } })
    },
    {
        icon: <LotusBlackSvg width={22} height={22} />,
        title: 'Features Guide',
        subtitle: 'Explore all features in detail',
        onPress: () => router.push({ pathname: '/helparticle', params: { topic: 'features-guide' } })
    },
    {
        icon: <WarrantySvg width={22} height={22} />,
        title: 'Account & Billing',
        subtitle: 'Manage your account and subscription',
        onPress: () => router.push({ pathname: '/helparticle', params: { topic: 'account-billing' } })
    },
];

export default function HelpSupportQuickHelp() {
    const { colors } = useTheme()
    const styles = getHelpSupportStyles(colors)
    return (
        <View style={styles.listContainer}>
            <Text style={styles.sectionLabel}>Quick Help</Text>
            <View style={styles.listCard}>
                {ITEMS.map((item, i) => (
                    <React.Fragment key={i}>
                        <TouchableOpacity style={styles.listRow} activeOpacity={0.7} onPress={item.onPress}>
                            <View style={styles.listIconCircle}>
                                {item.icon}
                            </View>
                            <View style={styles.listTextBlock}>
                                <Text style={styles.listRowTitle}>{item.title}</Text>
                                <Text style={styles.listRowSubtitle}>{item.subtitle}</Text>
                            </View>
                            <Ionicons
                                name="chevron-forward"
                                size={18}
                                color="#0F0F0F60"
                                style={styles.listArrow}
                            />
                        </TouchableOpacity>
                        {i < ITEMS.length - 1 && <View style={styles.listRowDivider} />}
                    </React.Fragment>
                ))}
            </View>
        </View>
    );
}