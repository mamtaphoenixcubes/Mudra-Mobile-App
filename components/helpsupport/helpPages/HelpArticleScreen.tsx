import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, useWindowDimensions, LayoutAnimation, Platform, UIManager } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/constants/ThemeContext';
import AppHeader from '@/components/common/AppHeader';
import { getHelpSupportStyles } from '@/assets/styles/helpsupport/helpSupportStyles';

if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental?.(true);
}

// ── Content schema ───────────────────────────────────────────────────────────
interface FAQContent {
    kind: 'faq';
    question: string;
    answer: string;
}

interface SectionContent {
    kind: 'sections';
    title: string;
    description: string;
}

type TopicContent = FAQContent | SectionContent;

interface TopicConfig {
    title: string;
    subtitle: string;
    icon: keyof typeof Ionicons.glyphMap;
    // Sequential topics (How It Works, Getting Started) render as a numbered
    // timeline with connecting lines. Non-sequential topics (Features Guide,
    // Account & Billing) render as a plain icon list — there's no real order
    // to those items, so a numbered "step 4" would read oddly for a feature list.
    sequential: boolean;
    items: TopicContent[];
}

// ── Placeholder content — draft copy, edit freely later ─────────────────────
const TOPICS: Record<string, TopicConfig> = {
    faq: {
        title: 'FAQ',
        subtitle: 'Answers to common questions',
        icon: 'help-circle-outline',
        sequential: false,
        items: [
            {
                kind: 'faq',
                question: 'What is a mudra?',
                answer: 'A mudra is a hand gesture used in yoga and meditation practice, believed to direct energy flow and support specific mental or physical states.',
            },
            {
                kind: 'faq',
                question: 'How do I find a mudra for a specific need?',
                answer: 'Use the Browse by Need section on the Library screen, or filter by Chakra or Element to find mudras suited to what you\'re looking for.',
            },
            {
                kind: 'faq',
                question: 'Can I save mudras and Nidra sessions for later?',
                answer: 'Yes — tap the heart or bookmark icon on any mudra or session to save it. Find your saved items under Saved / Favourites.',
            },
            {
                kind: 'faq',
                question: 'How do playlists work?',
                answer: 'You can add any audio or video session to a playlist from the player\'s toolbar. Playlists can mix both audio and video sessions together.',
            },
            {
                kind: 'faq',
                question: 'Is my progress saved across devices?',
                answer: 'Yes, as long as you\'re logged into the same account, your saved sessions and practice history sync automatically.',
            },
        ],
    },
    'how-it-works': {
        title: 'How It Works',
        subtitle: 'Understanding your practice with Mudras',
        icon: 'compass-outline',
        sequential: true,
        items: [
            {
                kind: 'sections',
                title: 'Choose your intention',
                description: 'Start by browsing mudras by need, chakra, or element — or explore the Mudra of the Day for a guided suggestion.',
            },
            {
                kind: 'sections',
                title: 'Practice with guidance',
                description: 'Each mudra includes step-by-step instructions and a timer to help you hold the gesture for the recommended duration.',
            },
            {
                kind: 'sections',
                title: 'Deepen with Yoga Nidra',
                description: 'Pair your mudra practice with a Yoga Nidra session for deeper relaxation, sleep support, or emotional healing.',
            },
            {
                kind: 'sections',
                title: 'Track your journey',
                description: 'Your practice streaks, saved sessions, and progress insights are all available under Progress Insights and Recent Activity.',
            },
        ],
    },
    'getting-started': {
        title: 'Getting Started',
        subtitle: 'A quick guide to your first week',
        icon: 'rocket-outline',
        sequential: true,
        items: [
            {
                kind: 'sections',
                title: 'Complete your personalisation',
                description: 'Tell us what you\'re looking for — sleep, stress relief, focus — so we can tailor recommendations to you.',
            },
            {
                kind: 'sections',
                title: 'Try your first mudra',
                description: 'Head to Mudra of the Day or Browse by Need, and follow the guided steps for a simple first practice.',
            },
            {
                kind: 'sections',
                title: 'Set a daily reminder',
                description: 'Go to Reminders in the menu to set a gentle daily nudge to keep your practice consistent.',
            },
            {
                kind: 'sections',
                title: 'Explore Yoga Nidra',
                description: 'When you\'re ready to unwind, try a Yoga Nidra session from the Nidra tab for guided deep rest.',
            },
        ],
    },
    'features-guide': {
        title: 'Features Guide',
        subtitle: 'Explore everything Mudras offers',
        icon: 'grid-outline',
        sequential: false,
        items: [
            {
                kind: 'sections',
                title: 'Mudra Library',
                description: 'Browse hundreds of mudras by category, chakra, element, or intention — each with detailed instructions.',
            },
            {
                kind: 'sections',
                title: 'Yoga Nidra Sessions',
                description: 'Guided audio sessions for sleep, anxiety relief, emotional healing, creativity, and burnout recovery.',
            },
            {
                kind: 'sections',
                title: 'Playlists',
                description: 'Create custom playlists mixing audio and video sessions, and pick up right where you left off.',
            },
            {
                kind: 'sections',
                title: 'Progress Insights',
                description: 'See your practice streaks, consistency trends, and overall progress over time.',
            },
            {
                kind: 'sections',
                title: 'Reminders',
                description: 'Set personalised daily or weekly reminders to help build a consistent practice habit.',
            },
        ],
    },
    'account-billing': {
        title: 'Account & Billing',
        subtitle: 'Manage your account and subscription',
        icon: 'card-outline',
        sequential: false,
        items: [
            {
                kind: 'sections',
                title: 'Update your profile',
                description: 'Go to Profile → Edit Profile to update your name, username, phone number, email, or profile photo.',
            },
            {
                kind: 'sections',
                title: 'Manage your subscription',
                description: 'Go to Profile → Subscription to view your plan, upgrade, or manage your billing details.',
            },
            {
                kind: 'sections',
                title: 'Change your password',
                description: 'Use "Forgot Password?" on the Login screen to reset your password via a one-time code sent to your email.',
            },
            {
                kind: 'sections',
                title: 'Delete your account',
                description: 'Account deletion is available under Profile settings. This action is permanent and cannot be undone.',
            },
        ],
    },
};

// ── FAQ accordion item ───────────────────────────────────────────────────────
const FAQItem = ({ item, styles, colors }: { item: FAQContent; styles: any; colors: any }) => {
    const [expanded, setExpanded] = useState(false);

    const toggle = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setExpanded((e) => !e);
    };

    return (
        <TouchableOpacity style={styles.articleCard} activeOpacity={0.8} onPress={toggle}>
            <View style={styles.articleFaqHeaderRow}>
                <Text style={styles.articleFaqQuestion}>{item.question}</Text>
                <View style={styles.articleChevronCircle}>
                    <Ionicons
                        name={expanded ? 'chevron-up' : 'chevron-down'}
                        size={14}
                        color={colors.textSub}
                    />
                </View>
            </View>
            {expanded && <Text style={styles.articleFaqAnswer}>{item.answer}</Text>}
        </TouchableOpacity>
    );
};

// ── Timeline step item (sequential topics) ──────────────────────────────────
const TimelineItem = ({
    item,
    index,
    isLast,
    styles,
}: {
    item: SectionContent;
    index: number;
    isLast: boolean;
    styles: any;
}) => (
    <View style={styles.articleTimelineRow}>
        <View style={styles.articleTimelineRail}>
            <View style={styles.articleTimelineNumber}>
                <Text style={styles.articleTimelineNumberText}>{index + 1}</Text>
            </View>
            {!isLast && <View style={styles.articleTimelineLine} />}
        </View>
        <View style={[styles.articleCard, styles.articleTimelineCard]}>
            <Text style={styles.articleSectionTitle}>{item.title}</Text>
            <Text style={styles.articleSectionDescription}>{item.description}</Text>
        </View>
    </View>
);

// ── Icon list item (non-sequential topics) ──────────────────────────────────
const IconListItem = ({ item, styles, colors }: { item: SectionContent; styles: any; colors: any }) => (
    <View style={[styles.articleCard, styles.articleIconListCard]}>
        <View style={styles.articleIconListBadge}>
            <Ionicons name="checkmark" size={15} color={colors.primary} />
        </View>
        <View style={styles.articleSectionTextBlock}>
            <Text style={styles.articleSectionTitle}>{item.title}</Text>
            <Text style={styles.articleSectionDescription}>{item.description}</Text>
        </View>
    </View>
);

export default function HelpArticleScreen() {
    const { colors } = useTheme();
    const styles = getHelpSupportStyles(colors);
    const { topic } = useLocalSearchParams<{ topic: string }>();

    // useWindowDimensions (not a static Dimensions.get) so this responds
    // correctly to rotation, split-screen, and foldables — not just a
    // snapshot taken once at import time.
    const { width: screenWidth } = useWindowDimensions();
    const isTablet = screenWidth >= 768;

    const config = TOPICS[topic ?? 'faq'] ?? TOPICS.faq;

    return (
        <View style={[localStyles.container, { backgroundColor: colors.background }]}>
            <AppHeader />

            <ScrollView
                contentContainerStyle={localStyles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/*
                  Tablet-safe wrapper: on phones this is just full width (no
                  visual difference at all). On tablets/large screens it caps
                  content at a comfortable reading width and centers it, so
                  long lines of text and cards don't stretch edge-to-edge
                  awkwardly across a much wider viewport.
                */}
                <View style={isTablet ? localStyles.tabletContentWrap : undefined}>
                    <View style={styles.articleHeaderBlock}>
                        <View style={styles.articleHeaderIconCircle}>
                            <Ionicons name={config.icon} size={26} color={colors.primary} />
                        </View>
                        <Text style={styles.pageTitle}>{config.title}</Text>
                        <Text style={styles.articlePageSubtitle}>{config.subtitle}</Text>
                    </View>

                    <View style={styles.articleItemsWrap}>
                        {config.items.map((item, index) => {
                            if (item.kind === 'faq') {
                                return <FAQItem key={index} item={item} styles={styles} colors={colors} />;
                            }
                            return config.sequential ? (
                                <TimelineItem
                                    key={index}
                                    item={item}
                                    index={index}
                                    isLast={index === config.items.length - 1}
                                    styles={styles}
                                />
                            ) : (
                                <IconListItem key={index} item={item} styles={styles} colors={colors} />
                            );
                        })}
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

// Only structural/layout concerns that don't depend on theme colors live here —
// everything color/typography-related comes from the shared getHelpSupportStyles.
const localStyles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: 16,
        paddingBottom: 40,
        flexGrow: 1,
        alignItems: 'stretch',
    },
    tabletContentWrap: {
        width: '100%',
        maxWidth: 560,
        alignSelf: 'center',
    },
});