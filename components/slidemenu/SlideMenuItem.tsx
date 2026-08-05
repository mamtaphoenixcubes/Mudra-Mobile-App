import React, { useRef } from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
// import { slideMenuStyles as styles } from '@/assets/styles/slidemenu/slideMenuStyles';
import { getSlideMenuStyles } from '@/assets/styles/slidemenu/slideMenuStyles'
import { useTheme } from '@/constants/ThemeContext'
import { Ionicons } from '@expo/vector-icons';

export interface MenuItem {
    id: string;
    title: string;
    icon: keyof typeof Ionicons.glyphMap;
    route: string;
    badge?: number;
}

interface SlideMenuItemProps {
    item: MenuItem;
    isActive?: boolean;
    onPress: (route: string) => void;
}

export default function SlideMenuItem({ item, isActive = false, onPress }: SlideMenuItemProps) {
    const { colors } = useTheme()
    const styles = getSlideMenuStyles(colors)
    const scaleAnim = useRef(new Animated.Value(1)).current;

    const handlePressIn = () => {
        Animated.spring(scaleAnim, {
            toValue: 0.96,
            useNativeDriver: true,
            speed: 50,
            bounciness: 2,
        }).start();
    };

    const handlePressOut = () => {
        Animated.spring(scaleAnim, {
            toValue: 1,
            useNativeDriver: true,
            speed: 30,
            bounciness: 4,
        }).start();
    };

    return (
        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
            <TouchableOpacity
                style={[
                    styles.menuItem,
                    isActive ? styles.menuItemActive : styles.menuItemInactive,
                ]}
                onPress={() => onPress(item.route)}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                activeOpacity={1}
            >
                {/* Icon box */}
                <View style={[
                    styles.menuIconContainer,
                    isActive && styles.menuIconContainerActive,
                ]}>
                    <Ionicons
                        name={item.icon}
                        size={20}
                        color={isActive ? '#9A85FE' : '#555555'}
                    />
                </View>

                {/* Label */}
                <Text style={[styles.menuText, isActive && styles.menuTextActive]}>
                    {item.title}
                </Text>

                {/* Badge */}
                {item.badge && item.badge > 0 && (
                    <View style={styles.menuBadge}>
                        <Text style={styles.menuBadgeText}>
                            {item.badge > 99 ? '99+' : item.badge}
                        </Text>
                    </View>
                )}

                {/* Active dot */}
                {isActive && <View style={styles.activeIndicator} />}
            </TouchableOpacity>
        </Animated.View>
    );
}