import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { getProgressInsightsStyles } from '@/assets/styles/progressinsights/progressInsightsStyles'
import { useTheme } from '@/constants/ThemeContext'

const TABS = ['All', 'Reminders', 'Updates'] as const;
export type ProgressTab = typeof TABS[number];

interface ProgressTabSelectorProps {
    active: ProgressTab;
    onChange: (tab: ProgressTab) => void;
}

export default function ProgressTabSelector({ active, onChange }: ProgressTabSelectorProps) {
    const { colors } = useTheme()
    const styles = getProgressInsightsStyles(colors)

    return (
        <View style={styles.tabContainer}>
            {TABS.map((tab) => (
                <TouchableOpacity
                    key={tab}
                    style={[styles.tabItem, active === tab && styles.tabItemActive]}
                    onPress={() => onChange(tab)}
                    activeOpacity={0.8}
                >
                    <Text style={[styles.tabText, active === tab && styles.tabTextActive]}>
                        {tab}
                    </Text>
                </TouchableOpacity>
            ))}
        </View>
    );
}