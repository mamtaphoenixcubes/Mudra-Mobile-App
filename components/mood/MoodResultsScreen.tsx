import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    Image,
    Dimensions,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@/constants/ThemeContext';
import AppHeader from '@/components/common/AppHeader';
import StandaloneTabBar from '@/components/home/StandaloneTabBar';
import ClockSvg from '@/assets/icons/clock.svg';
import { getMoodResultsStyles } from '@/assets/styles/moodresults/moodResultsStyles';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const moderateScale = (size: number, factor = 0.5) =>
    size + ((SCREEN_WIDTH - 375) / 375) * size * factor;

// Cycled in order across mudra cards
const CARD_COLORS = ['#FFF6BF', '#CBECFF', '#E9FFDB', '#FFDBE7', '#F3E8FF'];

type TabKey = 'mudras' | 'nidras';

// ── Hardcoded placeholder data ──────────────────────────────────────────
const MUDRA_ITEMS = [
    { id: '1', name: 'Gyan Mudra', desc: 'Focus & Clarity', duration: '15 min', image: require('@/assets/images/Pranayama_Images/GyanMudra.png') },
    { id: '2', name: 'Anjali Mudra', desc: 'Gratitude & Peace', duration: '5 min', image: require('@/assets/images/Pranayama_Images/AnjaliMudraSaved.png') },
    { id: '3', name: 'Prithvi Mudra', desc: 'Stability & Ground', duration: '12 min', image: require('@/assets/images/Pranayama_Images/PrithviMudra.png') },
    { id: '4', name: 'Surya Mudra', desc: 'Energy & Metabolism', duration: '10 min', image: require('@/assets/images/Pranayama_Images/SuryaMudra.png') },
    { id: '5', name: 'Prana Mudra', desc: 'Vitality & Immunity', duration: '8 min', image: require('@/assets/images/Pranayama_Images/GyanMudra.png') },
];

const NIDRA_ITEMS = [
    {
        id: 'n1',
        name: 'Morning Reset Yoga Nidra',
        duration: '20 min',
        tags: 'Energy, Clarity',
        image: require('@/assets/images/tabIcons/calm-mind.png'),
    },
    {
        id: 'n2',
        name: 'Chakra Balancing Yoga Nidra',
        duration: '40 min',
        tags: 'Chakra, Healing',
        image: require('@/assets/images/tabIcons/body-scan.png'),
    },
    {
        id: 'n3',
        name: 'Gratitude Yoga Nidra',
        duration: '20 min',
        tags: 'Emotional Healing, Gratitude',
        image: require('@/assets/images/tabIcons/anxiety-release.png'),
    },
];

export default function MoodResultsScreen() {
    const { colors, isDark } = useTheme();
    const insets = useSafeAreaInsets();

    const { moodName } = useLocalSearchParams<{
        moodId?: string;
        moodName?: string;
        colorCode?: string;
    }>();

    const [activeTab, setActiveTab] = useState<TabKey>('mudras');

    const styles = getMoodResultsStyles(colors, isDark);

    return (
        <View style={[styles.screen, { backgroundColor: colors.background }]}>
            <AppHeader />

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: insets.bottom + 120 }}
            >
                <Text style={styles.pageTitle}>
                    {moodName ? `${moodName} Practices` : 'Practices For You'}
                </Text>
                <Text style={styles.pageSubtitle}>
                    Mudras and Yoga Nidra sessions suited to how you feel today
                </Text>

                {/* ── Tabs ── */}
                <View style={styles.tabRow}>
                    <TouchableOpacity
                        style={[styles.tabBtn, activeTab === 'mudras' && styles.tabBtnActive]}
                        activeOpacity={0.8}
                        onPress={() => setActiveTab('mudras')}
                    >
                        <Text style={[styles.tabLabel, activeTab === 'mudras' && styles.tabLabelActive]}>
                            Mudras
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.tabBtn, activeTab === 'nidras' && styles.tabBtnActive]}
                        activeOpacity={0.8}
                        onPress={() => setActiveTab('nidras')}
                    >
                        <Text style={[styles.tabLabel, activeTab === 'nidras' && styles.tabLabelActive]}>
                            Nidras
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* ── Mudras Tab ── */}
                {activeTab === 'mudras' && (
                    <View style={styles.mudraGrid}>
                        {MUDRA_ITEMS.map((item, index) => {
                            const bg = CARD_COLORS[index % CARD_COLORS.length];
                            return (
                                <TouchableOpacity
                                    key={item.id}
                                    style={[styles.mudraCard, { backgroundColor: bg }]}
                                    activeOpacity={0.85}
                                    onPress={() => {
                                        // TODO: router.push(`/mudradetail?id=${item.id}`)
                                    }}
                                >
                                    <View style={styles.mudraImageWrapper}>
                                        <Image source={item.image} style={styles.mudraImage} resizeMode="cover" />
                                    </View>
                                    <Text style={styles.mudraName} numberOfLines={1}>
                                        {item.name}
                                    </Text>
                                    <Text style={styles.mudraDesc} numberOfLines={1}>
                                        {item.desc}
                                    </Text>
                                    <View style={styles.mudraTimeRow}>
                                        <ClockSvg width={11} height={11} />
                                        <Text style={styles.mudraTime}>{item.duration}</Text>
                                    </View>
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                )}

                {/* ── Nidras Tab ── */}
                {activeTab === 'nidras' && (
                    <View style={styles.nidraList}>
                        {NIDRA_ITEMS.map((item, index) => (
                            <React.Fragment key={item.id}>
                                <TouchableOpacity
                                    style={styles.nidraRow}
                                    activeOpacity={0.8}
                                    onPress={() => {
                                        // TODO: router.push(`/nidradetail?id=${item.id}`)
                                    }}
                                >
                                    <Image source={item.image} style={styles.nidraThumb} resizeMode="cover" />

                                    <View style={styles.nidraTextBlock}>
                                        <Text style={styles.nidraName} numberOfLines={2}>
                                            {item.name}
                                        </Text>
                                        <Text style={styles.nidraMeta} numberOfLines={1}>
                                            {item.duration}  |  {item.tags}
                                        </Text>
                                    </View>

                                    <TouchableOpacity style={styles.nidraPlayBtn} activeOpacity={0.8}>
                                        <Ionicons name="play" size={moderateScale(16)} color="#FFFFFF" />
                                    </TouchableOpacity>

                                    <TouchableOpacity style={styles.nidraMoreBtn} hitSlop={8}>
                                        <Ionicons name="ellipsis-vertical" size={moderateScale(18)} color={colors.textSub} />
                                    </TouchableOpacity>
                                </TouchableOpacity>

                                {index < NIDRA_ITEMS.length - 1 && <View style={styles.nidraDivider} />}
                            </React.Fragment>
                        ))}
                    </View>
                )}
            </ScrollView>

            <StandaloneTabBar />
        </View>
    );
}