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
import { getPranayamaStyles } from '@/assets/styles/pranayama/pranayamaStyles';
import { router } from 'expo-router';
import PranayamaBrowseCategory from './PranayamaBrowseCategory';

const CARD_COLORS = ['#FFF6BF', '#CBECFF', '#E9FFDB', '#FFDBE7', '#F3E8FF'];

const PRANAYAMAS = [
    {
        id: '1',
        title: 'Nadi Shodhana',
        subtitle: 'Alternate Nostril Breathing',
        level: 'Beginner',
        duration: '10 min',
        image: require('@/assets/images/tabIcons/calm-mind.png'),
        bg: '#FFF6BF',
    },
    {
        id: '2',
        title: 'Kapalabhati',
        subtitle: 'Skull Shining Breath',
        level: 'Intermediate',
        duration: '8 min',
        image: require('@/assets/images/tabIcons/anxiety-release.png'),
        bg: '#CBECFF',
    },
    {
        id: '3',
        title: 'Bhramari',
        subtitle: 'Humming Bee Breath',
        level: 'Beginner',
        duration: '6 min',
        image: require('@/assets/images/tabIcons/body-scan.png'),
        bg: '#E9FFDB',
    },
    {
        id: '4',
        title: 'Ujjayi',
        subtitle: 'Ocean Breath',
        level: 'Beginner',
        duration: '12 min',
        image: require('@/assets/images/tabIcons/calm-mind.png'),
        bg: '#FFDBE7',
    },
    {
        id: '5',
        title: 'Sheetali',
        subtitle: 'Cooling Breath',
        level: 'Intermediate',
        duration: '7 min',
        image: require('@/assets/images/tabIcons/anxiety-release.png'),
        bg: '#F3E8FF',
    },
    {
        id: '6',
        title: 'Bhastrika',
        subtitle: 'Bellows Breath',
        level: 'Advanced',
        duration: '10 min',
        image: require('@/assets/images/tabIcons/body-scan.png'),
        bg: '#CBECFF',
    },
];

export default function PranayamaRecommended() {
    const { colors } = useTheme();
    const styles = getPranayamaStyles(colors);

    return (
        <View>
            {/* Section Header */}
            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Recommended for You</Text>
                <TouchableOpacity activeOpacity={0.7} onPress={() => router.push('/pranayamalist')}>
                    <Text style={styles.viewAll}>View All {'>'}</Text>
                </TouchableOpacity>
            </View>

            {/* Horizontal Cards */}
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.pranayamaScrollContent}
            >
                {PRANAYAMAS.map((item, index) => (
                    <TouchableOpacity
                        key={item.id}
                        style={[styles.pranayamaCard, { backgroundColor: CARD_COLORS[index % CARD_COLORS.length] }]}
                        activeOpacity={0.85}
                        onPress={() => router.push('/pranayamadetail')}
                    >
                        <View style={styles.pranayamaImageWrapper}>
                            <Image
                                source={item.image}
                                style={styles.pranayamaCardImage}
                                resizeMode="cover"
                            />
                        </View>
                        <Text style={styles.pranayamaCardTitle} numberOfLines={1}>{item.title}</Text>
                        <Text style={styles.pranayamaCardDesc} numberOfLines={1}>{item.subtitle}</Text>
                        <View style={styles.pranayamaCardMeta}>
                            <Ionicons name="time-outline" size={12} color="#0F0F0F80" />
                            <Text style={styles.pranayamaCardMetaText}>{item.duration}</Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            {/* Featured Card */}
            <PranayamaBrowseCategory />
        </View>
    );
}