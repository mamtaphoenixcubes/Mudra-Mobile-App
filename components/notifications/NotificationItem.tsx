import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { getNotificationStyles } from '@/assets/styles/notifications/notificationStyles'
import { useTheme } from '@/constants/ThemeContext'
import { useNotificationLogStore } from '@/store/notificationLogStore';

export type NotificationData = {
    id: string;
    type: 'reminder' | 'update';
    icon: React.FC<{ width: number; height: number }>;
    title: string;
    subtitle: string;
    time: string;
    unread: boolean;
};

export default function NotificationItem({ item }: { item: NotificationData }) {
    const IconComponent = item.icon;
    const { colors: themeColors } = useTheme()
    const styles = getNotificationStyles(themeColors)
    const removeEntry = useNotificationLogStore((s) => s.removeEntry);

    const renderClearAction = () => (
        <TouchableOpacity
            style={[styles.itemClearAction, { alignSelf: 'stretch' }]}
            onPress={() => removeEntry(item.id)}
        >
            <Ionicons name="trash-outline" size={20} color="#FFFFFF" />
        </TouchableOpacity>
    );

    return (
        <View style={styles.itemSwipeWrapper}>
            <Swipeable renderRightActions={renderClearAction} overshootRight={false}>
                <TouchableOpacity style={styles.itemWrapper} activeOpacity={0.7}>
                    <View style={styles.iconCircle}>
                        <IconComponent width={22} height={22} />
                    </View>
                    <View style={styles.itemContent}>
                        <Text style={styles.itemTitle}>{item.title}</Text>
                        <Text style={styles.itemSubtitle}>{item.subtitle}</Text>
                    </View>
                    <View style={styles.itemRight}>
                        <Text style={styles.itemTime}>{item.time}</Text>
                        {item.unread && <View style={styles.unreadDot} />}
                    </View>
                </TouchableOpacity>
            </Swipeable>
        </View>
    );
}