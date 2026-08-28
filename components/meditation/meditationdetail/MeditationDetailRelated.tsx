import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '@/constants/ThemeContext';
import GroupSvg from '@/assets/icons/Group.svg';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = SCREEN_WIDTH * 0.42;
const IMAGE_HEIGHT = CARD_WIDTH * 0.8;

const CARD_COLORS = ['#CBECFF', '#E9FFDB', '#FFDBE7', '#FFF6BF'];

const FALLBACK_RELATED = [
    { id: '2', name: 'Loving-Kindness', level: 'Beginner', image: require('@/assets/images/tabIcons/anxiety-release.png') },
    { id: '3', name: 'Breath Awareness', level: 'Beginner', image: require('@/assets/images/tabIcons/body-scan.png') },
    { id: '5', name: 'Mindful Walking', level: 'Intermediate', image: require('@/assets/images/tabIcons/anxiety-release.png') },
];

const RelatedCard = ({ item, index }: { item: any; index: number }) => {
    const router = useRouter();
    const cardColor = CARD_COLORS[index % CARD_COLORS.length];

    return (
        <TouchableOpacity
            style={[styles.card, { backgroundColor: cardColor }]}
            activeOpacity={0.85}
            onPress={() =>
                router.push({
                    pathname: '/meditationdetail',
                    params: { id: String(item.id) },
                })
            }
        >
            <View style={styles.imageWrapper}>
                <Image source={item.image} style={styles.image} resizeMode="cover" />
            </View>
            <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
            <View style={styles.levelRow}>
                <GroupSvg width={16} height={16} />
                <Text style={styles.levelText}>{item.level}</Text>
            </View>
        </TouchableOpacity>
    );
};

export default function MeditationDetailRelated({ meditation }: { meditation?: any }) {
    const { colors } = useTheme();
    const related = Array.isArray(meditation?.related) && meditation.related.length > 0
        ? meditation.related
        : FALLBACK_RELATED;

    if (!related.length) return null;

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={[styles.sectionTitle, { color: colors.text }]}>Related Meditations</Text>
                <TouchableOpacity style={styles.viewAllBtn}>
                    <Text style={styles.viewAllText}>View All</Text>
                    <Text style={styles.viewAllArrow}>›</Text>
                </TouchableOpacity>
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                {related.map((item: any, index: number) => (
                    <RelatedCard key={item.id} item={item} index={index} />
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { paddingTop: 20, gap: 14 },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16 },
    sectionTitle: { fontFamily: 'SF-Pro-Display', fontWeight: '600', fontSize: 20, lineHeight: 26 },
    viewAllBtn: { flexDirection: 'row', alignItems: 'center', gap: 2 },
    viewAllText: { fontFamily: 'SF-Pro-Display', fontWeight: '500', fontSize: 15, color: '#8B5CF6' },
    viewAllArrow: { fontFamily: 'SF-Pro-Display', fontWeight: '500', fontSize: 20, color: '#8B5CF6', lineHeight: 22 },
    scrollContent: { paddingHorizontal: 16, gap: 14, alignItems: 'flex-start' },
    card: { width: CARD_WIDTH, borderRadius: 14, padding: 8, gap: 8, overflow: 'hidden' },
    imageWrapper: { width: '100%', height: IMAGE_HEIGHT, borderRadius: 10, overflow: 'hidden' },
    image: { width: '100%', height: '100%' },
    name: { fontFamily: 'SF-Pro-Display', fontWeight: '500', fontSize: 16, lineHeight: 20, color: '#1A1A1A' },
    levelRow: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 8 },
    levelText: { fontFamily: 'SF-Pro-Display', fontWeight: '400', fontSize: 14, color: '#0F0F0F80' },
});