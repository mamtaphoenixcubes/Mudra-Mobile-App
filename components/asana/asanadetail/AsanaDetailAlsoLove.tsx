import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getAsanaDetailStyles } from '@/assets/styles/asana/asanaDetailStyles';
import { useTheme } from '@/constants/ThemeContext';
import ClockSvg from '@/assets/icons/clock.svg';

const CARDS = [
    { id: '1', title: 'Warrior Sequence', duration: '25 min', image: require('@/assets/images/tabIcons/calm-mind.png'), bg: '#CBECFF' },
    { id: '2', title: 'Tree Pose Flow', duration: '15 min', image: require('@/assets/images/tabIcons/anxiety-release.png'), bg: '#E9FFDB' },
    { id: '3', title: 'Yin Yoga Deep Stretch', duration: '40 min', image: require('@/assets/images/tabIcons/body-scan.png'), bg: '#FFDBE7' },
];

export default function AsanaDetailAlsoLove() {
    const { colors } = useTheme();
    const styles = getAsanaDetailStyles(colors);

    return (
        <View style={styles.alsoLoveContainer}>
            <Text style={styles.sectionTitle}>You'll Also Love</Text>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.alsoLoveScrollContent}
            >
                {CARDS.map((card) => (
                    <TouchableOpacity
                        key={card.id}
                        style={[styles.alsoLoveCard, { backgroundColor: card.bg }]}
                        activeOpacity={0.85}
                    >
                        <Image source={card.image} style={styles.alsoLoveImage} resizeMode="cover" />
                        <View style={styles.alsoLoveTextBlock}>
                            <Text style={styles.alsoLoveTitle}>{card.title}</Text>
                            <View style={styles.alsoLoveMetaRow}>
                                <View style={styles.alsoLoveMeta}>
                                    <ClockSvg width={12} height={12} />
                                    <Text style={styles.alsoLoveMetaText}>{card.duration}</Text>
                                </View>
                                <Ionicons name="heart-outline" size={14} color="#0F0F0F80" />
                            </View>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
}