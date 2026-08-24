import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/constants/ThemeContext';
import { getMeditationStyles } from '@/assets/styles/meditation/meditationStyles';

const RECENT_MEDITATIONS = [
    {
        id: '1',
        title: 'Calm Mind',
        meta: '10 min · Beginner',
        image: require('@/assets/images/tabIcons/calm-mind.png'),
    },
    {
        id: '2',
        title: 'Anxiety Release',
        meta: '15 min · Beginner',
        image: require('@/assets/images/tabIcons/anxiety-release.png'),
    },
    {
        id: '3',
        title: 'Body Scan',
        meta: '20 min · All Levels',
        image: require('@/assets/images/tabIcons/body-scan.png'),
    },
];
export default function MeditationRecentlyPlayed() {
    const { colors, isDark } = useTheme();
    const styles = getMeditationStyles(colors);

    return (
        <View>
            {/* Section Header */}
            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Recently Played</Text>
                <TouchableOpacity activeOpacity={0.7} style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={styles.viewAll}>View All</Text>
                    <Ionicons name="chevron-forward" size={14} color={colors.primary} />
                </TouchableOpacity>
            </View>

            {/* Recent rows */}
            {RECENT_MEDITATIONS.map((meditation, index) => (
                <TouchableOpacity
                    key={meditation.id}
                    style={[
                        styles.recentCard,
                        index === RECENT_MEDITATIONS.length - 1 && { marginBottom: 0 },
                    ]}
                    activeOpacity={0.8}
                >
                    <View style={styles.recentRow}>
                        <Image
                            source={meditation.image}
                            style={styles.recentImage}
                            resizeMode="cover"
                        />
                        <View style={styles.recentContent}>
                            <Text style={styles.recentTitle} numberOfLines={1}>{meditation.title}</Text>
                            <Text style={styles.recentMeta}>{meditation.meta}</Text>
                        </View>
                        <Ionicons name="play-circle-outline" size={32} color={colors.primary} />
                    </View>
                </TouchableOpacity>
            ))}

            {/* Banner */}
            <View style={[styles.sectionHeader, { marginTop: 24 }]}>
                <Text style={styles.sectionTitle}>Did You Know?</Text>
            </View>
            <View style={styles.banner}>
                <Image
                    source={require('@/assets/images/tabIcons/calm-mind.png')}
                    style={styles.bannerImage}
                    resizeMode="cover"
                />
                <View style={styles.bannerRight}>
                    <View style={styles.bannerContentRow}>
                        <View style={styles.bannerTextBlock}>
                            <Text style={styles.bannerTitle}>
                                Find strength. Move with intention.
                            </Text>
                            <Text style={styles.bannerDescription}>
                                Yoga asanas build physical strength while calming your mind and restoring energy.
                            </Text>
                        </View>
                    </View>
                    <TouchableOpacity style={[styles.learnButton, { marginTop: 8, alignSelf: 'flex-start' }]} activeOpacity={0.8}>
                        <Text style={styles.learnButtonText}>Learn More</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}