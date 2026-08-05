import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
// import { helpSupportStyles as styles } from '@/assets/styles/helpsupport/helpSupportStyles';
import { getHelpSupportStyles } from '@/assets/styles/helpsupport/helpSupportStyles'
import { useTheme } from '@/constants/ThemeContext'
import FileSvg from '@/assets/icons/file.svg';
import StartSvg from '@/assets/icons/Start.svg';
import AnnouncementSvg from '@/assets/icons/announcement.svg';
import { router } from 'expo-router';

type Item = {
    icon: React.ReactNode;
    title: string;
    subtitle: string;
    onPress?: () => void;
};

const ITEMS: Item[] = [
    {
        icon: <FileSvg width={22} height={22} />,
        title: 'Help Center',
        subtitle: 'Browse articles and guides',
        onPress: () => router.push('/helpcenter')
    },
    {
        icon: <StartSvg width={22} height={22} />,
        title: 'Video Tutorials',
        subtitle: 'Watch step-by-step tutorials',
        onPress: () => router.push('/videotutorials')
    },
    {
        icon: <AnnouncementSvg width={22} height={22} />,
        title: 'Updates & Announcements',
        subtitle: 'Stay updated with the latest news',
        onPress: () => router.push('/updates')
    },
];

export default function HelpSupportResources() {
    const { colors } = useTheme()
    const styles = getHelpSupportStyles(colors)
    return (
        <View style={styles.listContainer}>
            <Text style={styles.sectionLabel}>Quick Help</Text>
            <View style={styles.listCard}>
                {ITEMS.map((item, i) => (
                    <React.Fragment key={i}>
                        <TouchableOpacity style={styles.listRow} activeOpacity={0.7} onPress={item.onPress}>
                            <View style={styles.listIconCircle}>
                                {item.icon}
                            </View>
                            <View style={styles.listTextBlock}>
                                <Text style={styles.listRowTitle}>{item.title}</Text>
                                <Text style={styles.listRowSubtitle}>{item.subtitle}</Text>
                            </View>
                            <Ionicons
                                name="chevron-forward"
                                size={18}
                                color="#0F0F0F60"
                                style={styles.listArrow}
                            />
                        </TouchableOpacity>
                        {i < ITEMS.length - 1 && <View style={styles.listRowDivider} />}
                    </React.Fragment>
                ))}
            </View>
        </View>
    );
}