import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ElementBalance from './Elementbalance';
import BrowseByCategory from './BrowseByCategory';
import RecommendedSessions from './RecommendedSessions';
import StandaloneTabBar from '@/components/home/StandaloneTabBar';
import ElementTrackerHeader from './ElementTrackerHeader';
import TrackerSkeleton from '@/components/common/skeletons/TrackerSkeleton'
import { useTheme } from '@/constants/ThemeContext'

export default function ElementTracker() {
    const { colors } = useTheme()
    const insets = useSafeAreaInsets();
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 1000)
        return () => clearTimeout(timer)
    }, [])

    if (isLoading) return <TrackerSkeleton />


    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <ElementTrackerHeader />
            <ScrollView
                contentContainerStyle={{ paddingBottom: insets.bottom + 120 }}
                showsVerticalScrollIndicator={false}
            >
                <Text style={[styles.pageTitle, { color: colors.text }]}>Element Tracker</Text>
                <ElementBalance />
                <BrowseByCategory />
                <RecommendedSessions />
            </ScrollView>
            <StandaloneTabBar />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    pageTitle: {
        fontFamily: 'SF-Pro-Display',
        fontWeight: '600',
        fontSize: 20,
        color: '#0F0F0F',
        textAlign: 'center',
        marginBottom: 4,
        paddingHorizontal: 16,
    },
});