import React from 'react';
import { View, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getMeditationDetailStyles } from '@/assets/styles/meditation/meditationDetailStyles';
import { useTheme } from '@/constants/ThemeContext';
import StandaloneTabBar from '@/components/home/StandaloneTabBar';
import MeditationDetailHeader from './MeditationDetailHeader';
import MeditationDetailHero from './MeditationDetailHero';
import MeditationDetailInfoBanner from './MeditationDetailInfoBanner';
import MeditationDetailExpect from './MeditationDetailExpect';
import MeditationDetailBenefits from './MeditationDetailBenefits';
import MeditationDetailAbout from './MeditationDetailAbout';
import MeditationDetailAlsoLove from './MeditationDetailAlsoLove';
import MeditationDetailStartBtn from './MeditationDetailStartBtn';

export default function MeditationDetailScreen() {
    const insets = useSafeAreaInsets();
    const { colors } = useTheme();
    const styles = getMeditationDetailStyles(colors);

    return (
        <View style={styles.screen}>
            <MeditationDetailHeader />
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: insets.bottom + 120 }}
            >
                <MeditationDetailHero />
                <MeditationDetailInfoBanner />
                <MeditationDetailExpect />
                <View style={styles.sectionDivider} />
                <MeditationDetailBenefits />
                <View style={styles.sectionDivider} />
                <MeditationDetailAbout />
                <View style={styles.sectionDivider} />
                <MeditationDetailAlsoLove />
                <MeditationDetailStartBtn />
            </ScrollView>
            <StandaloneTabBar />
        </View>
    );
}