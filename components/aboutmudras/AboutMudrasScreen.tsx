import React from 'react';
import { View, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
// import { aboutMudrasStyles as styles } from '@/assets/styles/aboutmudras/aboutMudrasStyles';
import { getAboutMudrasStyles } from '@/assets/styles/aboutmudras/aboutMudrasStyles'
import { useTheme } from '@/constants/ThemeContext'
import StandaloneTabBar from '@/components/home/StandaloneTabBar';
import AboutMudrasHeader from './AboutMudrasHeader';
import AboutMudrasHero from './AboutMudrasHero';
import WhyPracticeMudras from './WhyPracticeMudras';
import HowMudrasWork from './HowMudrasWork';
import TypesOfMudras from './TypesOfMudras';
import OurApproach from './OurApproach';

export default function AboutMudrasScreen() {
    const insets = useSafeAreaInsets();
    const { colors } = useTheme()
    const styles = getAboutMudrasStyles(colors)

    return (
        <View style={styles.screen}>
            <AboutMudrasHeader />
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: insets.bottom + 120 }}
            >
                <AboutMudrasHero />
                <WhyPracticeMudras />
                <HowMudrasWork />
                <TypesOfMudras />
                <OurApproach />
            </ScrollView>
            <StandaloneTabBar />
        </View>
    );
}