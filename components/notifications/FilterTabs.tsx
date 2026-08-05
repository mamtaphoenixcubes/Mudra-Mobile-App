import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
// import { notificationStyles as styles } from '@/assets/styles/notifications/notificationStyles';
import { getNotificationStyles } from '@/assets/styles/notifications/notificationStyles'
import { useTheme } from '@/constants/ThemeContext'
import { colors } from '@/constants/theme';

export type TabType = 'All' | 'Reminders' | 'Updates';
const TABS: TabType[] = ['All', 'Reminders', 'Updates'];

type Props = {
    activeTab: TabType;
    onTabChange: (tab: TabType) => void;
};

export default function FilterTabs({ activeTab, onTabChange }: Props) {
    const { colors: themeColors } = useTheme()
    const styles = getNotificationStyles(themeColors)
    return (
        <View style={styles.tabsWrapper}>
            {TABS.map((tab) => (
                <TouchableOpacity
                    key={tab}
                    style={[styles.tab, activeTab === tab && styles.tabActive]}
                    onPress={() => onTabChange(tab)}
                    activeOpacity={0.8}
                >
                    <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>
                        {tab}
                    </Text>
                </TouchableOpacity>
            ))}
        </View>
    );
}