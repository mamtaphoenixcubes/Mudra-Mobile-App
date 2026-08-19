// components/pranayama/PranayamaListScreen.tsx
import React, { useMemo } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    FlatList,
    useWindowDimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useTheme } from '@/constants/ThemeContext';
import { getPranayamaListStyles } from '@/assets/styles/pranayama/pranayamaListStyles';
import AppHeader from '@/components/common/AppHeader';

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

const LEVEL_COLORS: Record<string, { bg: string; text: string }> = {
    Beginner: { bg: '#E9FFDB', text: '#2E7D32' },
    Intermediate: { bg: '#FFF3C4', text: '#9A6B00' },
    Advanced: { bg: '#FFDBE0', text: '#B3261E' },
};

export default function PranayamaListScreen() {
    const { colors, isDark } = useTheme();
    const styles = getPranayamaListStyles(colors);
    const { width } = useWindowDimensions();

    const numColumns = width >= 700 ? 3 : 2;
    const GRID_GAP = 14;
    const HORIZONTAL_PADDING = 16;

    const cardWidth = useMemo(() => {
        const totalGap = GRID_GAP * (numColumns - 1);
        return (width - HORIZONTAL_PADDING * 2 - totalGap) / numColumns;
    }, [width, numColumns]);

    const renderItem = ({ item, index }: { item: (typeof PRANAYAMAS)[number]; index: number }) => {
        const levelStyle = LEVEL_COLORS[item.level] ?? { bg: colors.card, text: colors.text };
        const isLastInRow = (index + 1) % numColumns === 0;

        return (
            <TouchableOpacity
                style={[
                    styles.card,
                    {
                        width: cardWidth,
                        marginRight: isLastInRow ? 0 : GRID_GAP,
                        backgroundColor: item.bg,
                    },
                ]}
                activeOpacity={0.85}
                onPress={() => router.push('/pranayamadetail')}
            >
                <View style={styles.cardImageWrapper}>
                    <Image source={item.image} style={styles.cardImage} resizeMode="cover" />
                </View>

                <View style={[styles.cardBadge, { backgroundColor: levelStyle.bg }]}>
                    <Text style={[styles.cardBadgeText, { color: levelStyle.text }]}>
                        {item.level}
                    </Text>
                </View>

                <Text style={styles.cardTitle} numberOfLines={1}>{item.title}</Text>
                <Text style={styles.cardSubtitle} numberOfLines={1}>{item.subtitle}</Text>

                <View style={styles.cardFooter}>
                    <View style={styles.cardMeta}>
                        <Ionicons name="time-outline" size={12} color="#0F0F0F80" />
                        <Text style={styles.cardMetaText}>{item.duration}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <AppHeader />
            <Text style={styles.pageTitle}>All Pranayamas</Text>

            <View style={styles.subHeaderRow}>
                <Text style={styles.subHeaderText}>
                    {PRANAYAMAS.length} {PRANAYAMAS.length === 1 ? 'session' : 'sessions'}
                </Text>
            </View>

            <FlatList
                data={PRANAYAMAS}
                key={numColumns}
                keyExtractor={(item) => item.id}
                numColumns={numColumns}
                contentContainerStyle={styles.listContent}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    <View style={styles.emptyState}>
                        <Ionicons name="body-outline" size={36} color={colors.textSub} />
                        <Text style={styles.emptyText}>No pranayamas available yet.</Text>
                    </View>
                }
            />
        </View>
    );
}