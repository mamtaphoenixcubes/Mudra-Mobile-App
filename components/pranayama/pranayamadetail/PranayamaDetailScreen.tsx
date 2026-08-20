import React from 'react';
import { View, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getPranayamaDetailStyles } from '@/assets/styles/pranayama/pranayamaDetailStyles';
import { useTheme } from '@/constants/ThemeContext';
import StandaloneTabBar from '@/components/home/StandaloneTabBar';
import PranayamaDetailHeader from './PranayamaDetailHeader';
import PranayamaDetailHero from './PranayamaDetailHero';
import PranayamaDetailInfoBanner from './PranayamaDetailInfoBanner';
import PranayamaDetailExpect from './PranayamaDetailExpect';
import PranayamaDetailBenefits from './PranayamaDetailBenefits';
import PranayamaDetailAbout from './PranayamaDetailAbout';
import PranayamaDetailAlsoLove from './PranayamaDetailAlsoLove';
import PranayamaDetailStartBtn from './PranayamaDetailStartBtn';

export default function PranayamaDetailScreen() {
    const insets = useSafeAreaInsets();
    const { colors } = useTheme();
    const styles = getPranayamaDetailStyles(colors);

    return (
        <View style={styles.screen}>
            <PranayamaDetailHeader />
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: insets.bottom + 120 }}
            >
                <PranayamaDetailHero />
                <PranayamaDetailInfoBanner />
                <PranayamaDetailExpect />
                <View style={styles.sectionDivider} />
                <PranayamaDetailBenefits />
                <View style={styles.sectionDivider} />
                <PranayamaDetailAbout />
                <View style={styles.sectionDivider} />
                <PranayamaDetailAlsoLove />
                <PranayamaDetailStartBtn />
            </ScrollView>
            <StandaloneTabBar />
        </View>
    );
}