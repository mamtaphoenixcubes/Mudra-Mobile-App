import React from 'react';
import { View, ScrollView, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@/constants/ThemeContext';
import { getMeditationStyles } from '@/assets/styles/meditation/meditationStyles';
import MeditationHeader from './MeditationHeader'
import MeditationCategorySelector from './MeditationCategorySelector';
import MeditationRecommended from './MeditationRecommended';
import MeditationRecentlyPlayed from './MeditationRecentlyPlayed';
import StandaloneTabBar from '@/components/home/StandaloneTabBar';

const TAB_BAR_HEIGHT = 100;

export default function Meditation() {
    const insets = useSafeAreaInsets();
    const { colors } = useTheme();
    const styles = getMeditationStyles(colors);

    return (
        <View style={styles.container}>
            {/* <MeditationHeader /> */}
            <ScrollView
                style={{ flex: 1, backgroundColor: colors.background }}
                contentContainerStyle={{ paddingBottom: TAB_BAR_HEIGHT + insets.bottom }}
                showsVerticalScrollIndicator={false}
            >
                <Text style={styles.pageTitle}>Yoga Meditation</Text>
                <MeditationCategorySelector />
                <MeditationRecommended />
                <MeditationRecentlyPlayed />
            </ScrollView>
            <StandaloneTabBar />
        </View>
    );
}