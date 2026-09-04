import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    Modal
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/constants/ThemeContext';
import AppHeader from '@/components/common/AppHeader';
import PlaylistAddItems from './PlaylistAddItems';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const moderateScale = (size: number, factor = 0.5) =>
    size + ((SCREEN_WIDTH - 375) / 375) * size * factor;


// ── Palette (as provided) ──
const CARD_COLORS = {
    cardOrange: '#FFDBA7',
    cardPurple: '#EBCFFF',
    cardGreen: '#E9FFDB',
    cardYellow: '#FFF6BF',
    cardBlue: '#CBECFF',
    cardPink: '#FFDBE7',
    cardPeach: '#FFD4C4',
};

interface CategoryItem {
    key: 'mudra' | 'nidra' | 'pranayama' | 'asana' | 'meditation';
    label: string;
    icon: keyof typeof Ionicons.glyphMap;
    bg: string;
}

const CATEGORIES: CategoryItem[] = [
    { key: 'mudra', label: 'Mudra', icon: 'hand-left-outline', bg: CARD_COLORS.cardPurple },
    { key: 'nidra', label: 'Nidra', icon: 'moon-outline', bg: CARD_COLORS.cardBlue },
    { key: 'pranayama', label: 'Pranayama', icon: 'leaf-outline', bg: CARD_COLORS.cardGreen },
    { key: 'asana', label: 'Asana', icon: 'body-outline', bg: CARD_COLORS.cardPeach },
    { key: 'meditation', label: 'Meditation', icon: 'sparkles-outline', bg: CARD_COLORS.cardYellow },
];

export default function PlaylistCategorySelect() {
    const { colors } = useTheme();
  const {
    playlistId,
    playlistName,
    playlistType,
} = useLocalSearchParams<{
    playlistId: string;
    playlistName?: string;
    playlistType: 'audio' | 'video';
}>();

    const [activeCategory, setActiveCategory] = useState<CategoryItem['key'] | null>(null);

    const handleSelectCategory = (category: CategoryItem['key']) => {
        setActiveCategory(category);
    };

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <AppHeader />

            <View style={styles.introBlock}>
                <Text style={[styles.title, { color: colors.text }]}>
                    Add to “{playlistName || 'your playlist'}”
                </Text>
                <Text style={[styles.subtitle, { color: colors.textSub }]}>
                    Choose a category to browse and add sessions
                </Text>
            </View>

            <View style={styles.grid}>
                {CATEGORIES.map((item) => (
                    <TouchableOpacity
                        key={item.key}
                        style={[styles.card, { backgroundColor: item.bg }]}
                        activeOpacity={0.85}
                        onPress={() => handleSelectCategory(item.key)}
                    >
                        <View style={styles.cardIconCircle}>
                            <Ionicons name={item.icon} size={26} color="#1A1A1A" />
                        </View>
                        <Text style={styles.cardLabel}>{item.label}</Text>
                        <Ionicons
                            name="chevron-forward"
                            size={16}
                            color="#1A1A1A80"
                            style={styles.cardChevron}
                        />
                    </TouchableOpacity>
                ))}
            </View>

            <TouchableOpacity
                style={[styles.doneBtn, { backgroundColor: colors.primary }]}
                activeOpacity={0.85}
                onPress={() => router.push('/myplaylists')}
            >
                <Text style={styles.doneBtnText}>Done for now</Text>
            </TouchableOpacity>

            <Modal
                visible={!!activeCategory}
                animationType="slide"
                onRequestClose={() => setActiveCategory(null)}
            >
                {activeCategory && (
             <PlaylistAddItems
                    playlistId={playlistId as string}
                    playlistType={playlistType || 'audio'}
                    playlistName={playlistName}
                    category={activeCategory}
                    onClose={() => setActiveCategory(null)}
                />
                )}
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    introBlock: {
        paddingHorizontal: moderateScale(20),
        paddingTop: moderateScale(8),
        marginBottom: moderateScale(20),
    },
    title: {
        fontFamily: 'SF-Pro-Display',
        fontWeight: '600',
        fontSize: moderateScale(20),
        marginBottom: moderateScale(4),
    },
    subtitle: {
        fontFamily: 'SF-Pro-Display',
        fontWeight: '400',
        fontSize: moderateScale(13),
        lineHeight: moderateScale(19),
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingHorizontal: moderateScale(16),
        gap: moderateScale(12),
    },
    card: {
        width: (SCREEN_WIDTH - moderateScale(16) * 2 - moderateScale(12)) / 2,
        borderRadius: moderateScale(18),
        padding: moderateScale(16),
        minHeight: moderateScale(120),
        justifyContent: 'space-between',
    },
    cardIconCircle: {
        width: moderateScale(44),
        height: moderateScale(44),
        borderRadius: moderateScale(22),
        backgroundColor: 'rgba(255,255,255,0.55)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    cardLabel: {
        fontFamily: 'SF-Pro-Display',
        fontWeight: '600',
        fontSize: moderateScale(15),
        color: '#1A1A1A',
        marginTop: moderateScale(12),
    },
    cardChevron: {
        position: 'absolute',
        top: moderateScale(16),
        right: moderateScale(14),
    },
    doneBtn: {
        marginHorizontal: moderateScale(16),
        marginTop: moderateScale(24),
        borderRadius: moderateScale(14),
        paddingVertical: moderateScale(14),
        alignItems: 'center',
    },
    doneBtnText: {
        fontFamily: 'SF-Pro-Display',
        fontWeight: '600',
        fontSize: moderateScale(15),
        color: '#FFFFFF',
    },
});