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
import NidraSvg from '@/assets/icons/nidra.svg';
import AsanaSvg from '@/assets/icons/Asana.svg';
import PranayamaSvg from '@/assets/icons/Pranayama.svg';
import MeditationSvg from '@/assets/icons/Meditations.svg';
import { getMoodResultsStyles } from '@/assets/styles/moodresults/moodResultsStyles';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const moderateScale = (size: number, factor = 0.5) =>
    size + ((SCREEN_WIDTH - 375) / 375) * size * factor;

// Cycled in order across grid cards (mudras, asana, pranayama)
const CARD_COLORS = ['#FFF6BF', '#CBECFF', '#E9FFDB', '#FFDBE7', '#F3E8FF'];

type TabKey = 'mudras' | 'nidras' | 'asana' | 'pranayama' | 'meditation';
type TabLayout = 'grid' | 'list';
type TabIconKind = 'ionicon' | 'svg';

interface GridItem {
    id: string;
    name: string;
    desc: string;
    duration: string;
    image: any;
}

interface ListItem {
    id: string;
    name: string;
    duration: string;
    tags: string;
    image: any;
}

interface TabConfigItem {
    key: TabKey;
    label: string;
    layout: TabLayout;
    iconKind: TabIconKind;
    ioniconName?: React.ComponentProps<typeof Ionicons>['name'];
    Icon?: React.ComponentType<{ width: number; height: number; color: string }>;
}

const TAB_CONFIG: TabConfigItem[] = [
    { key: 'mudras', label: 'Mudras', layout: 'grid', iconKind: 'ionicon', ioniconName: 'hand-left-outline' },
    { key: 'nidras', label: 'Nidras', layout: 'list', iconKind: 'svg', Icon: NidraSvg },
    { key: 'asana', label: 'Asana', layout: 'grid', iconKind: 'svg', Icon: AsanaSvg },
    { key: 'pranayama', label: 'Pranayama', layout: 'grid', iconKind: 'svg', Icon: PranayamaSvg },
    { key: 'meditation', label: 'Meditation', layout: 'list', iconKind: 'svg', Icon: MeditationSvg },
];

// ── Hardcoded placeholder data ──────────────────────────────────────────
const MUDRA_ITEMS: GridItem[] = [
    { id: '1', name: 'Gyan Mudra', desc: 'Focus & Clarity', duration: '15 min', image: require('@/assets/images/Pranayama_Images/GyanMudra.png') },
    { id: '2', name: 'Anjali Mudra', desc: 'Gratitude & Peace', duration: '5 min', image: require('@/assets/images/Pranayama_Images/AnjaliMudraSaved.png') },
    { id: '3', name: 'Prithvi Mudra', desc: 'Stability & Ground', duration: '12 min', image: require('@/assets/images/Pranayama_Images/PrithviMudra.png') },
    { id: '4', name: 'Surya Mudra', desc: 'Energy & Metabolism', duration: '10 min', image: require('@/assets/images/Pranayama_Images/SuryaMudra.png') },
    { id: '5', name: 'Prana Mudra', desc: 'Vitality & Immunity', duration: '8 min', image: require('@/assets/images/Pranayama_Images/GyanMudra.png') },
];

const NIDRA_ITEMS: ListItem[] = [
    { id: 'n1', name: 'Morning Reset Yoga Nidra', duration: '20 min', tags: 'Energy, Clarity', image: require('@/assets/images/tabIcons/calm-mind.png') },
    { id: 'n2', name: 'Chakra Balancing Yoga Nidra', duration: '40 min', tags: 'Chakra, Healing', image: require('@/assets/images/tabIcons/body-scan.png') },
    { id: 'n3', name: 'Gratitude Yoga Nidra', duration: '20 min', tags: 'Emotional Healing, Gratitude', image: require('@/assets/images/tabIcons/anxiety-release.png') },
];

const ASANA_ITEMS: GridItem[] = [
    { id: 'a1', name: 'Tadasana', desc: 'Grounding & Posture', duration: '10 min', image: require('@/assets/images/Pranayama_Images/GyanMudra.png') },
    { id: 'a2', name: 'Vrikshasana', desc: 'Balance & Focus', duration: '8 min', image: require('@/assets/images/Pranayama_Images/PrithviMudra.png') },
    { id: 'a3', name: 'Balasana', desc: 'Rest & Release', duration: '6 min', image: require('@/assets/images/Pranayama_Images/AnjaliMudraSaved.png') },
    { id: 'a4', name: 'Bhujangasana', desc: 'Spine & Openness', duration: '12 min', image: require('@/assets/images/Pranayama_Images/SuryaMudra.png') },
];

const PRANAYAMA_ITEMS: GridItem[] = [
    { id: 'p1', name: 'Anulom Vilom', desc: 'Balance & Calm', duration: '10 min', image: require('@/assets/images/Pranayama_Images/PrithviMudra.png') },
    { id: 'p2', name: 'Bhramari', desc: 'Stress Relief', duration: '5 min', image: require('@/assets/images/Pranayama_Images/GyanMudra.png') },
    { id: 'p3', name: 'Kapalbhati', desc: 'Energy & Detox', duration: '8 min', image: require('@/assets/images/Pranayama_Images/SuryaMudra.png') },
    { id: 'p4', name: 'Ujjayi', desc: 'Focus & Warmth', duration: '10 min', image: require('@/assets/images/Pranayama_Images/AnjaliMudraSaved.png') },
];

const MEDITATION_ITEMS: ListItem[] = [
    { id: 'm1', name: 'Body Scan Meditation', duration: '15 min', tags: 'Relaxation, Awareness', image: require('@/assets/images/tabIcons/body-scan.png') },
    { id: 'm2', name: 'Loving Kindness Meditation', duration: '20 min', tags: 'Compassion, Warmth', image: require('@/assets/images/tabIcons/calm-mind.png') },
    { id: 'm3', name: 'Anxiety Release Meditation', duration: '18 min', tags: 'Calm, Grounding', image: require('@/assets/images/tabIcons/anxiety-release.png') },
];

const TAB_DATA: Record<TabKey, GridItem[] | ListItem[]> = {
    mudras: MUDRA_ITEMS,
    nidras: NIDRA_ITEMS,
    asana: ASANA_ITEMS,
    pranayama: PRANAYAMA_ITEMS,
    meditation: MEDITATION_ITEMS,
};

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

    const activeConfig = TAB_CONFIG.find((t) => t.key === activeTab)!;
    const activeItems = TAB_DATA[activeTab];

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
                    Practices suited to how you feel today
                </Text>

                {/* ── Tabs — icon on top, label below ── */}
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.tabScrollContent}
                >
                    {TAB_CONFIG.map((tab) => {
                        const selected = activeTab === tab.key;
                        const iconColor = selected ? '#FFFFFF' : colors.textSub;

                        return (
                            <TouchableOpacity
                                key={tab.key}
                                style={styles.tabItem}
                                activeOpacity={0.8}
                                onPress={() => setActiveTab(tab.key)}
                            >
                                <View style={[styles.tabIconCircle, selected && styles.tabIconCircleActive]}>
                                    {tab.iconKind === 'ionicon' ? (
                                        <Ionicons name={tab.ioniconName!} size={moderateScale(18)} color={iconColor} />
                                    ) : (
                                        <tab.Icon width={moderateScale(18)} height={moderateScale(18)} color={iconColor} />
                                    )}
                                </View>
                                <Text style={[styles.tabLabel, selected && styles.tabLabelActive]} numberOfLines={1}>
                                    {tab.label}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
                </ScrollView>

                {/* ── Grid layout (Mudras, Asana, Pranayama) ── */}
                {activeConfig.layout === 'grid' && (
                    <View style={styles.mudraGrid}>
                        {(activeItems as GridItem[]).map((item, index) => {
                            const bg = CARD_COLORS[index % CARD_COLORS.length];
                            return (
                                <TouchableOpacity
                                    key={item.id}
                                    style={[styles.mudraCard, { backgroundColor: bg }]}
                                    activeOpacity={0.85}
                                    onPress={() => {
                                        // TODO: router.push(`/${activeTab}detail?id=${item.id}`)
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

                {/* ── List layout (Nidras, Meditation) ── */}
                {activeConfig.layout === 'list' && (
                    <View style={styles.nidraList}>
                        {(activeItems as ListItem[]).map((item, index) => (
                            <React.Fragment key={item.id}>
                                <TouchableOpacity
                                    style={styles.nidraRow}
                                    activeOpacity={0.8}
                                    onPress={() => {
                                        // TODO: router.push(`/${activeTab}detail?id=${item.id}`)
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

                                {index < (activeItems as ListItem[]).length - 1 && <View style={styles.nidraDivider} />}
                            </React.Fragment>
                        ))}
                    </View>
                )}
            </ScrollView>

            <StandaloneTabBar />
        </View>
    );
}