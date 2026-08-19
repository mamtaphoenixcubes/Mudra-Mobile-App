import React from 'react';
import { View, ScrollView, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@/constants/ThemeContext';
import { getAsanaStyles } from '@/assets/styles/asana/asanaStyles';
import AsanaHeader from './AsanaHeader'
import AsanaCategorySelector from './AsanaCategorySelector';
import AsanaRecommended from './AsanaRecommended';
import AsanaRecentlyPlayed from './AsanaRecentlyPlayed';
import StandaloneTabBar from '@/components/home/StandaloneTabBar';

const TAB_BAR_HEIGHT = 100;

export default function Asana() {
    const insets = useSafeAreaInsets();
    const { colors } = useTheme();
    const styles = getAsanaStyles(colors);

    return (
         <View style={styles.container}>
        <AsanaHeader />
        <ScrollView
            style={{ flex: 1, backgroundColor: colors.background }}
            contentContainerStyle={{ paddingBottom: TAB_BAR_HEIGHT + insets.bottom }}
            showsVerticalScrollIndicator={false}
        >
            <Text style={styles.pageTitle}>Yoga Asana</Text>
            <AsanaCategorySelector />
            <AsanaRecommended />
            <AsanaRecentlyPlayed />
        </ScrollView>
        <StandaloneTabBar />
    </View>
    );
}