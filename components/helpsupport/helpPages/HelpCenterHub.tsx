import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/constants/ThemeContext';
import { getHelpSupportStyles } from '@/assets/styles/helpsupport/helpSupportStyles';
import AppHeader from '@/components/common/AppHeader';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const moderateScale = (size: number, factor = 0.5) =>
    size + ((SCREEN_WIDTH - 375) / 375) * size * factor;

interface HubItem {
    icon: keyof typeof Ionicons.glyphMap;
    title: string;
    subtitle: string;
    topic: string;
}

const HUB_ITEMS: HubItem[] = [
    { icon: 'help-circle-outline', title: 'FAQ', subtitle: 'Find answers to common questions', topic: 'faq' },
    { icon: 'compass-outline', title: 'How It Works', subtitle: 'Learn how Mudra helps you heal', topic: 'how-it-works' },
    { icon: 'rocket-outline', title: 'Getting Started', subtitle: 'A quick guide to get you started', topic: 'getting-started' },
    { icon: 'grid-outline', title: 'Features Guide', subtitle: 'Explore all features in detail', topic: 'features-guide' },
    { icon: 'card-outline', title: 'Account & Billing', subtitle: 'Manage your account and subscription', topic: 'account-billing' },
];

export default function HelpCenterHub() {
    const { colors } = useTheme();
    const styles = getHelpSupportStyles(colors);

    return (
        <View style={[localStyles.container, { backgroundColor: colors.background }]}>
            <AppHeader />

            <Text style={[localStyles.pageTitle, { color: colors.text }]}>Help Center</Text>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={localStyles.scrollContent}
            >
                <Text style={styles.sectionLabel}>All Topics</Text>
                <View style={styles.listCard}>
                    {HUB_ITEMS.map((item, i) => (
                        <React.Fragment key={item.topic}>
                            <TouchableOpacity
                                style={styles.listRow}
                                activeOpacity={0.7}
                                onPress={() =>
                                    router.push({ pathname: '/helparticle', params: { topic: item.topic } })
                                }
                            >
                                <View style={styles.listIconCircle}>
                                    <Ionicons name={item.icon} size={22} color={colors.primary} />
                                </View>
                                <View style={styles.listTextBlock}>
                                    <Text style={styles.listRowTitle}>{item.title}</Text>
                                    <Text style={styles.listRowSubtitle}>{item.subtitle}</Text>
                                </View>
                                <Ionicons
                                    name="chevron-forward"
                                    size={18}
                                    color={colors.textMuted as string}
                                    style={styles.listArrow}
                                />
                            </TouchableOpacity>
                            {i < HUB_ITEMS.length - 1 && <View style={styles.listRowDivider} />}
                        </React.Fragment>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
}

const localStyles = StyleSheet.create({
    container: {
        flex: 1,
    },
    pageTitle: {
        fontFamily: 'SF-Pro-Display',
        fontWeight: '600',
        fontSize: moderateScale(20),
        textAlign: 'center',
        marginVertical: moderateScale(10),
        paddingHorizontal: moderateScale(16),
    },
    scrollContent: {
        paddingHorizontal: moderateScale(16),
        paddingBottom: moderateScale(40),
    },
});