import React from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/constants/ThemeContext';
import { getAsanaStyles } from '@/assets/styles/asana/asanaStyles';
import { router } from 'expo-router';
import AsanaBrowseCategory from './AsanaBrowseCategory';

const CARD_COLORS = ['#FFF6BF', '#CBECFF', '#E9FFDB', '#FFDBE7'];

const ASANAS = [
    {
        id: '1',
        title: 'Surya Namaskar',
        subtitle: 'Sun Salutation',
        level: 'Beginner',
        duration: '20 min',
        image: require('@/assets/images/tabIcons/calm-mind.png'),
        bg: '#FFF6BF',
    },
    {
        id: '2',
        title: 'Trikonasana',
        subtitle: 'Triangle Pose',
        level: 'Intermediate',
        duration: '15 min',
        image: require('@/assets/images/tabIcons/anxiety-release.png'),
        bg: '#CBECFF',
    },
    {
        id: '3',
        title: 'Vrikshasana',
        subtitle: 'Tree Pose',
        level: 'Beginner',
        duration: '10 min',
        image: require('@/assets/images/tabIcons/body-scan.png'),
        bg: '#E9FFDB',
    },
    {
        id: '4',
        title: 'Adho Mukha',
        subtitle: 'Downward Dog',
        level: 'Beginner',
        duration: '12 min',
        image: require('@/assets/images/tabIcons/calm-mind.png'),
        bg: '#FFDBE7',
    },
];

export default function AsanaRecommended() {
    const { colors } = useTheme();
    const styles = getAsanaStyles(colors);

    return (
        <View>
            {/* Section Header */}
            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Recommended for You</Text>
                <TouchableOpacity activeOpacity={0.7} onPress={() => router.push('/asanalist')}>
                    <Text style={styles.viewAll}>View All {'>'}</Text>
                </TouchableOpacity>
            </View>

            {/* Horizontal Cards */}
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.asanaScrollContent}
            >
                {ASANAS.map((asana) => (
                    <TouchableOpacity
                        key={asana.id}
                        style={[styles.asanaCard, { backgroundColor: asana.bg }]}
                        activeOpacity={0.85}
                        onPress={() => router.push('/asanadetail')}
                    >
                        <Image
                            source={asana.image}
                            style={styles.asanaCardImage}
                            resizeMode="cover"
                        />
                        <View style={styles.asanaCardBody}>
                            <View style={[styles.asanaCardBadge, { backgroundColor: 'rgba(0,0,0,0.08)' }]}>
                                <Text style={styles.asanaCardBadgeText}>{asana.level}</Text>
                            </View>
                            <Text style={styles.asanaCardTitle} numberOfLines={1}>{asana.title}</Text>
                            <Text style={[styles.asanaCardMetaText, { fontSize: 11 }]} numberOfLines={1}>
                                {asana.subtitle}
                            </Text>
                            <View style={styles.asanaCardMeta}>
                                <Ionicons name="time-outline" size={12} color={colors.textSub} />
                                <Text style={styles.asanaCardMetaText}>{asana.duration}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            {/* Browse by Category */}
            <AsanaBrowseCategory />
        </View>
    );
}