import React from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@/constants/ThemeContext';
import StandaloneTabBar from '@/components/home/StandaloneTabBar';
import PranayamaDetailHeader from './PranayamaDetailHeader';
import PranayamaDetailHeroSection from './PranayamaDetailHeroSection';
import PranayamaDetailHowToDoIt from './PranayamaDetailHowToDoIt';
import PranayamaDetailElementalLogic from './PranayamaDetailElementalLogic';
import PranayamaDetailInfoCards from './PranayamaDetailInfoCards';
import PranayamaDetailPairedWith from './PranayamaDetailPairedWith';
import PranayamaDetailRelated from './PranayamaDetailRelated';
import PranayamaDetailStartBtn from './PranayamaDetailStartBtn';

export default function PranayamaDetailScreen() {
    const insets = useSafeAreaInsets();
    const { colors } = useTheme();

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <PranayamaDetailHeader />

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: insets.bottom + 120 }}
            >
                <Text style={[styles.pageTitle, { color: colors.text }]}>Pranayama Detail</Text>

                <PranayamaDetailHeroSection />
                <PranayamaDetailHowToDoIt />
                <PranayamaDetailElementalLogic />
                <PranayamaDetailInfoCards />
                <PranayamaDetailPairedWith />
                <PranayamaDetailRelated />

                <PranayamaDetailStartBtn />
            </ScrollView>

            <StandaloneTabBar />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    pageTitle: {
        fontFamily: 'SF-Pro-Display',
        fontWeight: '600',
        fontSize: 20,
        textAlign: 'center',
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
});