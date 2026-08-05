import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
// import { slideMenuStyles as styles } from '@/assets/styles/slidemenu/slideMenuStyles';
import { getSlideMenuStyles } from '@/assets/styles/slidemenu/slideMenuStyles'
import { useTheme } from '@/constants/ThemeContext'
import { Ionicons } from '@expo/vector-icons';

interface SlideMenuFooterProps {
    onPressItem: (route: string) => void;
}

const FOOTER_ITEMS = [
    { title: 'Settings', icon: 'settings-outline', route: '/profile' },
    { title: 'Help & Support', icon: 'help-circle-outline', route: '/helpsupport' },
    { title: 'Terms & Privacy', icon: 'document-text-outline', route: '/terms' },
];

export default function SlideMenuFooter({ onPressItem }: SlideMenuFooterProps) {
    const { colors } = useTheme()
    const styles = getSlideMenuStyles(colors)
    return (
        <View style={styles.footer}>
            {FOOTER_ITEMS.map((item) => (
                <TouchableOpacity
                    key={item.title}
                    style={styles.footerItem}
                    onPress={() => onPressItem(item.route)}
                    activeOpacity={0.7}
                >
                    <View style={styles.footerIconBox}>
                        <Ionicons name={item.icon as any} size={18} color="#777777" />
                    </View>
                    <Text style={styles.footerText}>{item.title}</Text>
                    <Ionicons name="chevron-forward" size={14} color="#CCCCCC" />
                </TouchableOpacity>
            ))}
        </View>
    );
}