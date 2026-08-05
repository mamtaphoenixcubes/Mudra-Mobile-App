import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
// import { savedStyles as styles } from '@/assets/styles/saved/savedStyles';
import { getSavedStyles } from '@/assets/styles/saved/savedStyles'
import { useTheme } from '@/constants/ThemeContext'
import StandaloneTabBar from '@/components/home/StandaloneTabBar';
import SavedHeader from './SavedHeader';
import EmptyState from './EmptyState';

export default function SavedEmptyScreen() {
    const insets = useSafeAreaInsets();
    const [activeTab, setActiveTab] = useState<'mudras' | 'sessions'>('mudras');
    const { colors } = useTheme()
const styles = getSavedStyles(colors)

    return (
        <View style={styles.screen}>
            <SavedHeader isFavourites={false} />
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: insets.bottom + 120 }}
            >
                <Text style={styles.pageTitle}>Saved</Text>

                {/* Simple tab */}
                <View style={[styles.tabContainer, { marginHorizontal: 32 }]}>
                    <TouchableOpacity
                        style={[styles.tabItem, activeTab === 'mudras' && styles.tabItemActive]}
                        onPress={() => setActiveTab('mudras')}
                        activeOpacity={0.8}
                    >
                        <Text style={[styles.tabText, activeTab === 'mudras' && styles.tabTextActive]}>
                            Mudras
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.tabItem, activeTab === 'sessions' && styles.tabItemActive]}
                        onPress={() => setActiveTab('sessions')}
                        activeOpacity={0.8}
                    >
                        <Text style={[styles.tabText, activeTab === 'sessions' && styles.tabTextActive]}>
                            Sessions
                        </Text>
                    </TouchableOpacity>
                </View>

                <EmptyState />
            </ScrollView>
            <StandaloneTabBar />
        </View>
    );
}