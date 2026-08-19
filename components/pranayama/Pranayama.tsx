import React from 'react';
import { View, ScrollView, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@/constants/ThemeContext';
import { getPranayamaStyles } from '@/assets/styles/pranayama/pranayamaStyles';
import PranayamaHeader from './PranayamaHeader'
import PranayamaCategorySelector from './PranayamaCategorySelector';
import PranayamaRecommended from './PranayamaRecommended';
import PranayamaRecentlyPlayed from './PranayamaRecentlyPlayed';
import StandaloneTabBar from '@/components/home/StandaloneTabBar';

const TAB_BAR_HEIGHT = 100;

export default function Pranayama() {
    const insets = useSafeAreaInsets();
    const { colors } = useTheme();
    const styles = getPranayamaStyles(colors);

    return (
        <View style={styles.container}>
            <PranayamaHeader />
            <ScrollView
                style={{ flex: 1, backgroundColor: colors.background }}
                contentContainerStyle={{ paddingBottom: TAB_BAR_HEIGHT + insets.bottom }}
                showsVerticalScrollIndicator={false}
            >
                <Text style={styles.pageTitle}>Pranayama</Text>
                <PranayamaCategorySelector />
                <PranayamaRecommended />
                <PranayamaRecentlyPlayed />
            </ScrollView>
            <StandaloneTabBar />
        </View>
    );
}