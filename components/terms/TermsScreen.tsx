import React from 'react';
import { View, ScrollView, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
// import { termsStyles as styles } from '@/assets/styles/terms/termsStyles';
import { getTermsStyles } from '@/assets/styles/terms/termsStyles'
import { useTheme } from '@/constants/ThemeContext'
import StandaloneTabBar from '@/components/home/StandaloneTabBar';
import TermsHeader from './TermsHeader';
import TermsHeroBanner from './TermsHeroBanner';
import TermsDateBadge from './TermsDateBadge';
import TermsSections from './TermsSections';
import TermsContactRow from './TermsContactRow';

export default function TermsScreen() {
    const insets = useSafeAreaInsets();
    const { colors } = useTheme()
    const styles = getTermsStyles(colors)

    return (
        <View style={styles.screen}>
            <TermsHeader />
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: insets.bottom + 120 }}
            >
                <Text style={styles.pageTitle}>Terms & Conditions</Text>
                <TermsHeroBanner />
                <TermsDateBadge />
                <TermsSections />
                <TermsContactRow />
            </ScrollView>
            <StandaloneTabBar />
        </View>
    );
}