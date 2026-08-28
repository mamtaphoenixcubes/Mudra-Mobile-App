import React from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@/constants/ThemeContext';
import StandaloneTabBar from '@/components/home/StandaloneTabBar';
import MeditationDetailHeader from './MeditationDetailHeader';
import MeditationDetailHeroSection from './MeditationDetailHeroSection';
import MeditationDetailHowToDoIt from './MeditationDetailHowToDoIt';
import MeditationDetailElementalLogic from './MeditationDetailElementalLogic';
import MeditationDetailInfoCards from './MeditationDetailInfoCards';
import MeditationDetailPairedWith from './MeditationDetailPairedWith';
import MeditationDetailRelated from './MeditationDetailRelated';
import MeditationDetailStartBtn from './MeditationDetailStartBtn';

export default function MeditationDetailScreen() {
    const insets = useSafeAreaInsets();
    const { colors } = useTheme();

    // TODO: replace with real fetched meditation once a meditationStore exists
    const meditation: any = undefined;

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <MeditationDetailHeader />
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: insets.bottom + 120 }}>
                <Text style={[styles.pageTitle, { color: colors.text }]}>Meditation Detail</Text>
                <MeditationDetailHeroSection meditation={meditation} />
                <MeditationDetailHowToDoIt meditation={meditation} />
                <MeditationDetailElementalLogic meditation={meditation} />
                <MeditationDetailInfoCards meditation={meditation} />
                <MeditationDetailPairedWith meditation={meditation} />
                <MeditationDetailRelated meditation={meditation} />
                <MeditationDetailStartBtn meditation={meditation} />
            </ScrollView>
            <StandaloneTabBar />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    pageTitle: { fontFamily: 'SF-Pro-Display', fontWeight: '600', fontSize: 20, textAlign: 'center', paddingHorizontal: 16, paddingVertical: 8 },
});