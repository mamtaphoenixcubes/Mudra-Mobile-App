import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
// import { notificationStyles as styles } from '@/assets/styles/notifications/notificationStyles';
import { getNotificationStyles } from '@/assets/styles/notifications/notificationStyles'
import { useTheme } from '@/constants/ThemeContext'

export default function EmptyState() {
    const { colors: themeColors } = useTheme()
    const styles = getNotificationStyles(themeColors)
    return (
        <View style={styles.emptyState}>
            <View style={styles.emptyIconCircle}>
                <Ionicons name="notifications-outline" size={28} color="#0F0F0F80" />
            </View>
            <Text style={styles.emptyTitle}>You're all caught up!</Text>
            <Text style={styles.emptySubtitle}>
                We'll notify you when there's something new.
            </Text>
        </View>
    );
}