import React, { useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    Image,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { getCategoryDetailStyles } from '@/assets/styles/nidra/categoryDetailStyles';
import { useTheme } from '@/constants/ThemeContext';
import { useNidraStore } from '@/store/nidraStore';
import { useAuthStore } from '@/store/authStore';
import AppHeader from '@/components/common/AppHeader';
import StandaloneTabBar from '@/components/home/StandaloneTabBar';

export default function CategoryDetailScreen() {
    const { colors } = useTheme();
    const styles = getCategoryDetailStyles(colors);

    const { id, title, description, categoryType } = useLocalSearchParams<{
        id: string;
        title: string;
        description?: string;
        categoryType?: 'category' | 'chakra' | 'elemental';
    }>();

    const { user } = useAuthStore();
    const profileDocumentId = user?.id || user?.profileDocumentId;

    const { nidras, loading, error, fetchNidras } = useNidraStore();

  useEffect(() => {
    fetchNidras({
        profileDocumentId,
        categories: categoryType === 'category' ? [id] : [],
    });
}, [id, categoryType, profileDocumentId]);
const filteredNidras = (nidras || []).filter((item: any) => {
    if (categoryType === 'chakra') {
        return !!item.Chakra;
    }

    if (categoryType === 'elemental') {
        return !!item.Elements;
    }

    return true;
});

 const practices = filteredNidras.map((item: any) => ({
    id: item.documentId,
    title: item.NidraIntroCard?.Name,
    duration: `${item.Duration} min`,
    difficulty: item.NidraIntroCard?.Level,
    image: item.NidraIntroCard?.ThumbnailImage?.[0]?.url
        ? `${process.env.EXPO_PUBLIC_IMAGE_API_URL}${item.NidraIntroCard.ThumbnailImage[0].url}`
        : null,
}));

    // Real number, not decorative — sums each practice's actual duration.
    const totalMinutes = practices.reduce((sum, p) => {
        const parsed = parseInt(p.duration, 10);
        return sum + (Number.isNaN(parsed) ? 0 : parsed);
    }, 0);
    const totalTimeLabel = totalMinutes >= 60
        ? `${Math.floor(totalMinutes / 60)}h ${totalMinutes % 60}m`
        : `${totalMinutes}m`;

    const handlePracticePress = (practiceId: string) => {
        router.push({
            pathname: '/nidradetail',
            params: { id: practiceId },
        });
    };

    return (
        <View style={styles.screen}>
            <AppHeader />

            <View style={styles.heroBand}>
                <Text style={styles.categoryTitle}>{title}</Text>
                {!!description && (
                    <Text style={styles.categoryDescription}>{description}</Text>
                )}
                <View style={styles.statsRow}>
                    <View style={styles.statChip}>
                        <Ionicons name="layers-outline" size={14} color={colors.primary} />
                        <Text style={styles.statChipText}>
                            {practices.length} practice{practices.length === 1 ? '' : 's'}
                        </Text>
                    </View>
                    {totalMinutes > 0 && (
                        <View style={styles.statChip}>
                            <Ionicons name="time-outline" size={14} color={colors.primary} />
                            <Text style={styles.statChipText}>{totalTimeLabel} total</Text>
                        </View>
                    )}
                </View>
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.listContent}
            >
                {loading ? (
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>Loading...</Text>
                    </View>
                ) : error ? (
                    <View style={styles.emptyContainer}>
                        <Text style={[styles.emptyText, { color: '#E53935' }]}>{error}</Text>
                    </View>
                ) : practices.length === 0 ? (
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>No practices found in this category yet.</Text>
                    </View>
                ) : (
                    practices.map((practice) => (
                        <TouchableOpacity
                            key={practice.id}
                            style={styles.practiceRow}
                            activeOpacity={0.7}
                            onPress={() => handlePracticePress(practice.id)}
                        >
                            <View style={styles.practiceThumbWrap}>
                                {practice.image ? (
                                    <Image
                                        source={{ uri: practice.image }}
                                        style={styles.practiceThumbImage}
                                        resizeMode="cover"
                                    />
                                ) : (
                                    <View style={styles.practiceThumbPlaceholder}>
                                        <Ionicons name="play" size={18} color={colors.primary} />
                                    </View>
                                )}
                            </View>
                            <View style={styles.practiceTextBlock}>
                                <Text style={styles.practiceTitle} numberOfLines={1}>
                                    {practice.title}
                                </Text>
                                <View style={styles.practiceMetaRow}>
                                    <Text style={styles.practiceMetaText}>{practice.duration}</Text>
                                    <View style={styles.metaDot} />
                                    <Text style={styles.practiceMetaText}>{practice.difficulty}</Text>
                                </View>
                            </View>
                            <Ionicons name="chevron-forward" size={18} color={colors.textMuted as string} />
                        </TouchableOpacity>
                    ))
                )}
            </ScrollView>

            <StandaloneTabBar />
        </View>
    );
}