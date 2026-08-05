import React from 'react';
import { View, ScrollView, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
// import { privacyStyles as styles } from '@/assets/styles/privacy/privacyStyles';
import { getPrivacyStyles } from '@/assets/styles/privacy/privacyStyles'
import { useTheme } from '@/constants/ThemeContext'
import StandaloneTabBar from '@/components/home/StandaloneTabBar';
import PrivacyHeader from './PrivacyHeader';
import PrivacyHeroBanner from './PrivacyHeroBanner';
import PrivacyDateBadge from './PrivacyDateBadge';
import PrivacySections from './PrivacySections';
import PrivacyContactRow from './PrivacyContactRow';

export default function PrivacyScreen() {
    const insets = useSafeAreaInsets();
    const { colors } = useTheme()
const styles = getPrivacyStyles(colors)

    return (
        <View style={styles.screen}>
            <PrivacyHeader />
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: insets.bottom + 120 }}
            >
                 <Text style={styles.pageTitle}>Privacy Policy</Text>
                <PrivacyHeroBanner />
                <PrivacyDateBadge />
                <PrivacySections />
                <PrivacyContactRow />
            </ScrollView>
            <StandaloneTabBar />
        </View>
    );
}