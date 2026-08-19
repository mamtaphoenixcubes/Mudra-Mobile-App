import React from 'react';
import { View, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getAsanaDetailStyles } from '@/assets/styles/asana/asanaDetailStyles';
import { useTheme } from '@/constants/ThemeContext';
import StandaloneTabBar from '@/components/home/StandaloneTabBar';
import AsanaDetailHeader from './AsanaDetailHeader';
import AsanaDetailHero from './AsanaDetailHero';
import AsanaDetailInfoBanner from './AsanaDetailInfoBanner';
import AsanaDetailExpect from './AsanaDetailExpect';
import AsanaDetailBenefits from './AsanaDetailBenefits';
import AsanaDetailAbout from './AsanaDetailAbout';
import AsanaDetailAlsoLove from './AsanaDetailAlsoLove';
import AsanaDetailStartBtn from './AsanaDetailStartBtn';

export default function AsanaDetailScreen() {
    const insets = useSafeAreaInsets();
    const { colors } = useTheme();
    const styles = getAsanaDetailStyles(colors);

    return (
        <View style={styles.screen}>
            <AsanaDetailHeader />
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: insets.bottom + 120 }}
            >
                <AsanaDetailHero />
                <AsanaDetailInfoBanner />
                <AsanaDetailExpect />
                <View style={styles.sectionDivider} />
                <AsanaDetailBenefits />
                <View style={styles.sectionDivider} />
                <AsanaDetailAbout />
                <View style={styles.sectionDivider} />
                <AsanaDetailAlsoLove />
                <AsanaDetailStartBtn />
            </ScrollView>
            <StandaloneTabBar />
        </View>
    );
}