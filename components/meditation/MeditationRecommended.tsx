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
import { getMeditationStyles } from '@/assets/styles/meditation/meditationStyles';
import { router } from 'expo-router';
import MeditationBrowseCategory from './MeditationBrowseCategory';

const CARD_COLORS = ['#FFF6BF', '#CBECFF', '#E9FFDB', '#FFDBE7'];

const MEDITATIONS = [
    {
        id: '1',
        title: 'Calm Mind',
        subtitle: 'Mindfulness Meditation',
        level: 'Beginner',
        duration: '10 min',
        image: require('@/assets/images/tabIcons/calm-mind.png'),
        bg: '#FFF6BF',
    },
    {
        id: '2',
        title: 'Anxiety Release',
        subtitle: 'Relaxation Meditation',
        level: 'Beginner',
        duration: '15 min',
        image: require('@/assets/images/tabIcons/anxiety-release.png'),
        bg: '#CBECFF',
    },
    {
        id: '3',
        title: 'Body Scan',
        subtitle: 'Body Awareness Meditation',
        level: 'Beginner',
        duration: '20 min',
        image: require('@/assets/images/tabIcons/body-scan.png'),
        bg: '#E9FFDB',
    },
    {
        id: '4',
        title: 'Deep Relaxation',
        subtitle: 'Guided Meditation',
        level: 'Intermediate',
        duration: '20 min',
        image: require('@/assets/images/tabIcons/calm-mind.png'),
        bg: '#FFDBE7',
    },
];

export default function MeditationRecommended() {
    const { colors } = useTheme();
    const styles = getMeditationStyles(colors);

    return (
        <View>
            {/* Section Header */}
            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Recommended for You</Text>
                <TouchableOpacity activeOpacity={0.7} onPress={() => router.push('/meditationlist')}>
                    <Text style={styles.viewAll}>View All {'>'}</Text>
                </TouchableOpacity>
            </View>

            {/* Horizontal Cards */}
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.meditationScrollContent}
            >
                {MEDITATIONS.map((meditation) => (
                    <TouchableOpacity
                        key={meditation.id}
                        style={[styles.meditationCard, { backgroundColor: meditation.bg }]}
                        activeOpacity={0.85}
                        onPress={() => router.push('/meditationdetail')}
                    >
                        <Image
                            source={meditation.image}
                            style={styles.meditationCardImage}
                            resizeMode="cover"
                        />
                        <View style={styles.meditationCardBody}>
                            <View style={[styles.meditationCardBadge, { backgroundColor: 'rgba(0,0,0,0.08)' }]}>
                                <Text style={styles.meditationCardBadgeText}>{meditation.level}</Text>
                            </View>
                            <Text style={styles.meditationCardTitle} numberOfLines={1}>{meditation.title}</Text>
                            <Text style={[styles.meditationCardMetaText, { fontSize: 11 }]} numberOfLines={1}>
                                {meditation.subtitle}
                            </Text>
                            <View style={styles.meditationCardMeta}>
                                <Ionicons name="time-outline" size={12} color={colors.textSub} />
                                <Text style={styles.meditationCardMetaText}>{meditation.duration}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            {/* Browse by Category */}
            <MeditationBrowseCategory />
        </View>
    );
}