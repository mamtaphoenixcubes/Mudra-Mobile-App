// components/asana/AsanaListScreen.tsx
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
import { getAsanaListStyles } from '@/assets/styles/asana/asanaListStyles';
import AppHeader from '@/components/common/AppHeader';

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

// Level badge accent colors — distinct per difficulty, same tone family as the rest of the app
const LEVEL_COLORS: Record<string, { bg: string; text: string }> = {
    Beginner: { bg: '#E9FFDB', text: '#2E7D32' },
    Intermediate: { bg: '#FFF3C4', text: '#9A6B00' },
    Advanced: { bg: '#FFDBE0', text: '#B3261E' },
};

export default function AsanaListScreen() {
    const { colors, isDark } = useTheme();
    const styles = getAsanaListStyles(colors);
    const { width } = useWindowDimensions();

    // Responsive column count: phones → 2, larger/tablet widths → 3
    const numColumns = width >= 700 ? 3 : 2;
    const GRID_GAP = 14;
    const HORIZONTAL_PADDING = 16;

    const cardWidth = useMemo(() => {
        const totalGap = GRID_GAP * (numColumns - 1);
        return (width - HORIZONTAL_PADDING * 2 - totalGap) / numColumns;
    }, [width, numColumns]);

    const renderItem = ({ item, index }: { item: (typeof ASANAS)[number]; index: number }) => {
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
                onPress={() => router.push('/asanadetail')}
            >
                <View style={[styles.cardImageWrapper, { backgroundColor: item.bg }]}>
                    <Image source={item.image} style={styles.cardImage} resizeMode="cover" />
                </View>

                <View style={styles.cardBody}>
                    <View style={[styles.cardBadge, { backgroundColor: levelStyle.bg }]}>
                        <Text style={[styles.cardBadgeText, { color: levelStyle.text }]}>
                            {item.level}
                        </Text>
                    </View>

                    <Text style={styles.cardTitle} numberOfLines={1}>{item.title}</Text>
                    <Text style={styles.cardSubtitle} numberOfLines={1}>{item.subtitle}</Text>

                    <View style={styles.cardFooter}>
                        <View style={styles.cardMeta}>
                            <Ionicons name="time-outline" size={13} color={colors.textSub} />
                            <Text style={styles.cardMetaText}>{item.duration}</Text>
                        </View>
                        <Ionicons
                            name="chevron-forward"
                            size={15}
                            color={isDark ? colors.textSub : colors.border}
                        />
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <AppHeader />
<Text style={styles.pageTitle}>All Asanas</Text>

            <View style={styles.subHeaderRow}>
                <Text style={styles.subHeaderText}>
                    {ASANAS.length} {ASANAS.length === 1 ? 'session' : 'sessions'}
                </Text>
            </View>

            <FlatList
                data={ASANAS}
                key={numColumns} // forces re-layout if column count changes (e.g. rotation)
                keyExtractor={(item) => item.id}
                numColumns={numColumns}
                contentContainerStyle={styles.listContent}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    <View style={styles.emptyState}>
                        <Ionicons name="body-outline" size={36} color={colors.textSub} />
                        <Text style={styles.emptyText}>No asanas available yet.</Text>
                    </View>
                }
            />
        </View>
    );
}