import React from 'react';
import { View, ScrollView, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
// import { helpSupportStyles as styles } from '@/assets/styles/helpsupport/helpSupportStyles';
import { getHelpSupportStyles } from '@/assets/styles/helpsupport/helpSupportStyles'
import { useTheme } from '@/constants/ThemeContext'
import StandaloneTabBar from '@/components/home/StandaloneTabBar';
import HelpSupportHeader from './HelpSupportHeader';
import HelpSupportBanner from './HelpSupportBanner';
import HelpSupportQuickHelp from './HelpSupportQuickHelp';
import HelpSupportContact from './HelpSupportContact';
import HelpSupportResources from './HelpSupportResources';
import HelpSupportFeedback from './HelpSupportFeedback';

export default function HelpSupport() {
    const insets = useSafeAreaInsets();
    const { colors } = useTheme()
const styles = getHelpSupportStyles(colors)

    return (
        <View style={styles.screen}>
            <HelpSupportHeader />
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: insets.bottom + 120 }}
            >
                 <Text style={styles.pageTitle}>Help & Support</Text>
                <HelpSupportBanner />
                <HelpSupportQuickHelp />
                <HelpSupportContact />
                <HelpSupportResources />
                <HelpSupportFeedback />
            </ScrollView>
            <StandaloneTabBar />
        </View>
    );
}