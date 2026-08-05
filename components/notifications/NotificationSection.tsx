import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
// import { notificationStyles as styles } from '@/assets/styles/notifications/notificationStyles';
import { getNotificationStyles } from '@/assets/styles/notifications/notificationStyles'
import { useTheme } from '@/constants/ThemeContext'
import NotificationItem, { NotificationData } from './NotificationItem';

type Props = {
    title: string;
    showMarkAllRead?: boolean;
    onMarkAllRead?: () => void;
    items: NotificationData[];
};

export default function NotificationSection({
    title,
    showMarkAllRead = false,
    onMarkAllRead,
    items,
}: Props) {
    const { colors: themeColors } = useTheme()
    const styles = getNotificationStyles(themeColors)
    return (
        <View>
            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>{title}</Text>
                {showMarkAllRead && (
                    <TouchableOpacity onPress={onMarkAllRead} activeOpacity={0.7}>
                        <Text style={styles.markAllRead}>Mark all as read</Text>
                    </TouchableOpacity>
                )}
            </View>
            {items.map((item) => (
                <NotificationItem key={item.id} item={item} />
            ))}
        </View>
    );
}