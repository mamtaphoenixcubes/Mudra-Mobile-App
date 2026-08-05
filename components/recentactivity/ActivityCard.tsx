import React from 'react';
import { router } from 'expo-router';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { getRecentActivityStyles } from '@/assets/styles/recentactivity/recentActivityStyles'
import { useTheme } from '@/constants/ThemeContext'
import { Ionicons } from '@expo/vector-icons';
import ClockSvg from '@/assets/icons/clock.svg';
import PlaySvg from '@/assets/icons/Play.svg';

export type ActivityItem = {
    id: string;
    title: string;
    badge: string;
    subtitle: string;
    duration: string;
    time: string;
    image: any;
    bg: string;
    isElementTracker?: boolean;
    elementStatus?: string;
    ElementIcon?: React.ReactNode;
    contentId?: string;
    screenType?: 'mudra' | 'nidra';
};

type Props = {
    item: ActivityItem;
};

export default function ActivityCard({ item }: Props) {
    const { colors } = useTheme()
    const styles = getRecentActivityStyles(colors)
    return (
        <TouchableOpacity
            style={[styles.activityCard, { backgroundColor: item.bg }]}
            activeOpacity={0.85}
        >
            <Image source={item.image} style={styles.activityImage} resizeMode="cover" />

            <View style={styles.activityContent}>
                <View style={styles.activityTitleRow}>
                    <Text style={styles.activityTitle}>{item.title}</Text>
                    <View style={styles.activityBadge}>
                        <Text style={styles.activityBadgeText}>{item.badge}</Text>
                    </View>
                </View>

                {item.isElementTracker ? (
                    <View style={styles.activitySubtitleRow}>
                        <Text style={styles.activitySubtitle} numberOfLines={2}>{item.elementStatus}</Text>
                        {item.ElementIcon}
                    </View>
                ) : (
                    <Text style={styles.activitySubtitle} numberOfLines={1}>{item.subtitle}</Text>
                )}

                <View style={styles.activityMetaRow}>
                    <ClockSvg width={12} height={12} />
                    <Text style={styles.activityMeta}>{item.duration}</Text>
                    <View style={styles.activityDot} />
                    <Text style={styles.activityMeta}>{item.time}</Text>
                </View>
            </View>

            <View style={styles.activityActions}>
                {item.isElementTracker ? (
                    <TouchableOpacity activeOpacity={0.7}>
                        <Ionicons name="chevron-forward" size={20} color="#0F0F0F60" />
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity
                        style={styles.playBtn}
                        activeOpacity={0.7}
                        onPress={() => {
                            if (!item.contentId) return;
                            router.push({
                                pathname: item.screenType === 'nidra' ? '/nidradetail' : '/mudradetail',
                                params: { id: item.contentId },
                            });
                        }}
                    >
                        <PlaySvg width={14} height={14} />
                    </TouchableOpacity>
                )}
                <TouchableOpacity activeOpacity={0.7}>
                    <Ionicons name="ellipsis-vertical" size={18} color="#0F0F0F60" />
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );
}