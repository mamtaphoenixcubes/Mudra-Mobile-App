// RecommendedListScreen.tsx
import React, { useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    Image,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { useRouter } from 'expo-router';
import { useTheme } from '@/constants/ThemeContext';
import { useAuthStore } from '@/store/authStore';
import { useNidraStore } from '@/store/nidraStore';
import AppHeader from '@/components/common/AppHeader';
import axios from 'axios';
import { getRecommendedListStyles } from '@/assets/styles/recommended/recommendedListStyles';

type DifficultyLevel = 'Beginner' | 'Intermediate' | 'Advanced';

type Session = {
    id: string;
    title: string;
    duration: string;
    category: string;
    description: string;
    difficulty: DifficultyLevel;
    image: string | null;
    cardBg: string;
    isSaved: boolean;
};

const CARD_COLORS = ['#FFF6BF', '#CBECFF', '#FFDBE7', '#E9FFDB', '#F6D29C'];

const DIFFICULTY_COLORS: Record<DifficultyLevel, { bg: string; text: string }> = {
    Beginner: { bg: 'rgba(100,200,150,0.18)', text: 'rgba(80, 120, 90, 0.85)' },
    Intermediate: { bg: 'rgba(155,143,232,0.18)', text: 'rgba(100, 90, 160, 0.85)' },
    Advanced: { bg: 'rgba(240,100,100,0.18)', text: 'rgba(180, 60, 60, 0.85)' },
};

function BookmarkIcon({ saved }: { saved: boolean }) {
    return (
        <Svg width={16} height={16} viewBox="0 0 24 24">
            <Path
                d="M5 3h14a1 1 0 0 1 1 1v17l-7-3-7 3V4a1 1 0 0 1 1-1z"
                fill={saved ? '#9A85FE' : 'transparent'}
                stroke={saved ? '#9A85FE' : 'rgba(0,0,0,0.4)'}
                strokeWidth="2"
                strokeLinejoin="round"
            />
        </Svg>
    );
}

interface RowProps {
    session: Session;
    onPressCard: (session: Session) => void;
    onPressBookmark: (session: Session) => void;
    saving: boolean;
}

function RecommendedRow({ session, onPressCard, onPressBookmark, saving }: RowProps) {
    const { colors } = useTheme();
    const styles = getRecommendedListStyles(colors);
    const [imgError, setImgError] = React.useState(false);

    const difficultyStyle = DIFFICULTY_COLORS[session.difficulty] ?? DIFFICULTY_COLORS.Beginner;

    return (
        <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => onPressCard(session)}
            style={[styles.card, { backgroundColor: session.cardBg }]}
        >
            {session.image && !imgError ? (
                <Image
                    source={{ uri: session.image }}
                    style={styles.thumb}
                    resizeMode="cover"
                    onError={() => setImgError(true)}
                />
            ) : (
                <View style={[styles.thumb, styles.thumbPlaceholder]} />
            )}

            <View style={styles.cardBody}>
                <Text style={styles.cardTitle} numberOfLines={1}>
                    {session.title}
                </Text>

                <View style={styles.metaRow}>
                    <Text style={styles.metaText}>{session.duration}</Text>
                    <View style={styles.dot} />
                    <Text style={styles.metaText}>{session.category}</Text>
                </View>

                <Text style={styles.cardDesc} numberOfLines={2}>
                    {session.description}
                </Text>

                <View style={[styles.badge, { backgroundColor: difficultyStyle.bg }]}>
                    <Text style={[styles.badgeText, { color: difficultyStyle.text }]}>
                        {session.difficulty}
                    </Text>
                </View>
            </View>

            <TouchableOpacity
                style={styles.bookmarkBtn}
                activeOpacity={0.7}
                onPress={(e) => {
                    e.stopPropagation();
                    onPressBookmark(session);
                }}
                disabled={saving}
            >
                <BookmarkIcon saved={session.isSaved} />
            </TouchableOpacity>
        </TouchableOpacity>
    );
}

export default function RecommendedListScreen() {
    const { colors } = useTheme();
    const styles = getRecommendedListStyles(colors);
    const router = useRouter();
    const { isLoggedIn, token, user } = useAuthStore();
    const { nidras, loading, error, fetchNidras } = useNidraStore();

    const [savingId, setSavingId] = React.useState<string | null>(null);
    const [savedMap, setSavedMap] = React.useState<Record<string, boolean>>({});

    useEffect(() => {
        fetchNidras({
            profileDocumentId: user?.id,
            page: 1,
            pageSize: 20,
        });
    }, [user?.id]);

    const sessions: Session[] = (nidras || []).map((item: any, index: number) => {
        const id = item.documentId;
        return {
            id,
            title: item.NidraIntroCard?.Name,
            duration: `${item.Duration} min`,
            category: item.NidraCategories?.[0]?.Name,
            description: item.NidraIntroCard?.ShortDescription,
            difficulty: item.NidraIntroCard?.Level,
            image: item.NidraIntroCard?.ThumbnailImage?.[0]?.url
                ? `${process.env.EXPO_PUBLIC_IMAGE_API_URL}${item.NidraIntroCard.ThumbnailImage[0].url}`
                : null,
            cardBg: CARD_COLORS[index % CARD_COLORS.length],
            isSaved: savedMap[id] ?? (item.user_yoga_nidra_activities?.[0]?.IsSaved ?? false),
        };
    });

    const handlePressCard = async (session: Session) => {
        const loggedIn = isLoggedIn && !!token && !!user;

        if (loggedIn) {
            try {
                await axios.post(
                    `${process.env.EXPO_PUBLIC_API_URL}/yoga-nidras/${session.id}/view`,
                    { profileDocumentId: user?.id },
                    { headers: { Authorization: `Bearer ${token}` } }
                );
            } catch (error) {
                console.error('Failed to record view:', error);
            }
            router.push({ pathname: '/nidradetail', params: { id: String(session.id) } });
        } else {
            router.push({
                pathname: '/auth/login',
                params: { redirect: '/nidradetail', id: String(session.id) },
            });
        }
    };

    const handlePressBookmark = async (session: Session) => {
        const loggedIn = isLoggedIn && !!token && !!user;

        if (!loggedIn) {
            router.push({
                pathname: '/auth/login',
                params: { redirect: '/recommendedlist', action: 'save', nidraId: String(session.id) },
            });
            return;
        }

        try {
            setSavingId(session.id);
            await axios.post(
                `${process.env.EXPO_PUBLIC_API_URL}/yoga-nidras/${session.id}/save`,
                { profileDocumentId: user?.id },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setSavedMap((prev) => ({ ...prev, [session.id]: !session.isSaved }));
        } catch (error: any) {
            console.log('SAVE_NIDRA_ERROR', error?.response?.data || error);
        } finally {
            setSavingId(null);
        }
    };

    return (
        <View style={[styles.screen, { backgroundColor: colors.background }]}>
            <AppHeader onBackPress={() => router.back()} />

            <View style={styles.headerSection}>
                <Text style={styles.pageTitle}>Recommended for you</Text>
            </View>

            {loading ? (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>Loading...</Text>
                </View>
            ) : error ? (
                <View style={styles.emptyContainer}>
                    <Text style={[styles.emptyText, { color: '#E53935' }]}>{error}</Text>
                </View>
            ) : sessions.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>No Yoga Nidra found</Text>
                </View>
            ) : (
                <FlatList
                    data={sessions}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <RecommendedRow
                            session={item}
                            onPressCard={handlePressCard}
                            onPressBookmark={handlePressBookmark}
                            saving={savingId === item.id}
                        />
                    )}
                />
            )}
        </View>
    );
}