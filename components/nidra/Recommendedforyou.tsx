
import React, { useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Animated,
  Dimensions,
  Image,
} from 'react-native';
import Svg, { Polygon, Path } from 'react-native-svg';
import { useRouter } from 'expo-router';
import { useTheme } from '@/constants/ThemeContext'
import { useNidraStore } from '@/store/nidraStore';
import { useAuthStore } from '@/store/authStore';
import axios from 'axios';
import { SvgUri } from 'react-native-svg';
import { SvgXml } from 'react-native-svg';

const { width } = Dimensions.get('window');

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

type Category = {
  id: string;
  title: string;
  description: string;
  practiceCount: number;
  icon: any;
  mime?: string;
};

// ── Icons ──────────────────────────────────────────────────────────────────

const PlayIcon = () => (
  <View style={styles.playIconWrapper}>
    <Svg width={10} height={10} viewBox="0 0 24 24">
      <Polygon points="6,3 20,12 6,21" fill="#FFFFFF" />
    </Svg>
  </View>
);

const BookmarkIcon = () => (
  <Svg width={14} height={14} viewBox="0 0 24 24">
    <Path
      d="M5 3h14a1 1 0 0 1 1 1v17l-7-3-7 3V4a1 1 0 0 1 1-1z"
      fill="none"
      stroke="rgba(0,0,0,0.4)"
      strokeWidth="2"
      strokeLinejoin="round"
    />
  </Svg>
);

const ChevronRightIcon = ({ color = 'rgba(0,0,0,0.35)' }: { color?: string }) => (
  <Svg width={16} height={16} viewBox="0 0 24 24">
    <Path
      d="M9 18l6-6-6-6"
      //stroke="rgba(0,0,0,0.35)"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </Svg>
);

const DotIcon = () => <View style={styles.dot} />;

// ── Difficulty Badge ───────────────────────────────────────────────────────

const DIFFICULTY_COLORS: Record<DifficultyLevel, { bg: string; text: string }> = {
  Beginner: { bg: 'rgba(100,200,150,0.18)', text: 'rgba(80, 120, 90, 0.85)' },
  Intermediate: { bg: 'rgba(155,143,232,0.18)', text: 'rgba(100, 90, 160, 0.85)' },
  Advanced: { bg: 'rgba(240,100,100,0.18)', text: 'rgba(180, 60, 60, 0.85)' },
};

const DifficultyBadge = ({ level }: { level: DifficultyLevel }) => {
  const colors = DIFFICULTY_COLORS[level];
  return (
    <View style={[styles.badge, { backgroundColor: colors.bg }]}>
      <Text style={[styles.badgeText, { color: colors.text }]}>{level}</Text>
    </View>
  );
};

// ── Placeholder Thumb ──────────────────────────────────────────────────────

const PlaceholderThumb = ({ index, small }: { index: number; small?: boolean }) => {
  const BG_COLORS = ['#D8EAD3', '#D3D8EA', '#EAD3D8', '#EAE8D3'];
  return (
    <View style={[
      small ? styles.listThumbPlaceholder : styles.thumbPlaceholder,
      { backgroundColor: BG_COLORS[index % BG_COLORS.length] },
    ]}>
      <View style={small ? styles.listThumbCircle : styles.thumbCircle} />
    </View>
  );
};

// ── Session Card ───────────────────────────────────────────────────────────

type CardProps = { session: Session; index: number };

const SessionCard = ({ session, index }: CardProps) => {
  const router = useRouter();
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const [imgError, setImgError] = React.useState(false);

  // Scale DOWN on press-in
  const handlePressIn = () =>
    Animated.spring(scaleAnim, {
      toValue: 0.96,
      useNativeDriver: true,
      speed: 50,
      bounciness: 3,
    }).start();

  // Scale BACK UP on press-out (finger lifted without completing tap)
  const handlePressOut = () =>
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      speed: 30,
      bounciness: 6,
    }).start();
  const { isLoggedIn, token, user } = useAuthStore();
  const [saving, setSaving] = React.useState(false);
  const [saved, setSaved] = React.useState(session.isSaved);

  React.useEffect(() => {
    setSaved(session.isSaved);
  }, [session.isSaved]);
  // Navigate only on confirmed tap (onPress fires after both pressIn + pressOut)
  const handlePress = async () => {
    const loggedIn =
      isLoggedIn &&
      !!token &&
      !!user;

    if (loggedIn) {
      try {
        // Call View API
    // Call View API
        await axios.post(
          `${process.env.EXPO_PUBLIC_API_URL}/yoga-nidras/${session.id}/view`,
          {
            profileDocumentId: user?.id,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        router.push({
          pathname: '/nidradetail',
          params: {
            id: String(session.id),
          },
        });
      } catch (error) {
        console.error('Failed to record view:', error);

        // Still navigate even if API fails
        router.push({
          pathname: '/nidradetail',
          params: {
            id: String(session.id),
          },
        });
      }
    } else {
      router.push({
        pathname: '/auth/login',
        params: {
          redirect: '/nidradetail',
          id: String(session.id),
        },
      });
    }
  };

  const handleSaveNidra = async () => {
    const loggedIn =
      isLoggedIn &&
      !!token &&
      !!user;

    if (!loggedIn) {
      router.push({
        pathname: '/auth/login',
        params: {
          redirect: '/nidra',
          action: 'save',
          nidraId: String(session.id),
        },
      });

      return;
    }

    try {


      setSaving(true);

      await axios.post(
        `${process.env.EXPO_PUBLIC_API_URL}/yoga-nidras/${session.id}/save`,
        {
          profileDocumentId: user?.id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSaved(prev => !prev);
    } catch (error: any) {
      console.log(
        'SAVE_NIDRA_ERROR',
        error?.response?.data || error
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <Animated.View style={[styles.cardWrapper, { transform: [{ scale: scaleAnim }] }]}>
      <TouchableOpacity
        activeOpacity={1}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={handlePress}         // ← navigation lives here only
        style={[styles.card, { backgroundColor: session.cardBg }]}
      >
        {/* Thumbnail */}
        <View style={styles.thumbContainer}>
          {session.image && !imgError ? (
            <Image
              source={{ uri: session.image }}
              style={styles.thumbImage}
              resizeMode="cover"
              onError={() => setImgError(true)}
            />
          ) : (
            <PlaceholderThumb index={index} />
          )}

          <TouchableOpacity
            style={styles.playOverlay}
            activeOpacity={0.85}
          >
            <PlayIcon />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.bookmarkBtn}
            activeOpacity={0.7}
            onPress={(e) => {
              e.stopPropagation();
              handleSaveNidra();
            }}
            disabled={saving}
          >
            <Svg width={14} height={14} viewBox="0 0 24 24">
              <Path
                d="M5 3h14a1 1 0 0 1 1 1v17l-7-3-7 3V4a1 1 0 0 1 1-1z"
                fill={saved ? '#9A85FE' : '#FFFFFF'}
                stroke={saved ? '#9A85FE' : '#FFFFFF'}
                strokeWidth="2"
                strokeLinejoin="round"
              />
            </Svg>
          </TouchableOpacity>
        </View>

        {/* Body */}
        <View style={styles.cardBody}>
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle} numberOfLines={2}>{session.title}</Text>
            <View style={styles.metaRow}>
              <Text style={styles.metaText}>{session.duration}</Text>
              <DotIcon />
              <Text style={styles.metaText}>{session.category}</Text>
            </View>
            <Text style={styles.cardDesc} numberOfLines={2}>{session.description}</Text>
          </View>
          <DifficultyBadge level={session.difficulty} />
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

// ── Category Row ───────────────────────────────────────────────────────────

const CategoryRow = ({ item, isLast }: { item: Category; isLast: boolean }) => {
  const [imgError, setImgError] = React.useState(false);
  const { colors } = useTheme();
  const router = useRouter();
const [svgXml, setSvgXml] = React.useState('');
  const handlePress = () => {
    router.push({
      pathname: '/categorydetail',
      params: {
        id: item.id,
        title: item.title,
        description: item.description,
        // 'chakra'/'elemental' match the two hardcoded ids in browseCategories;
        // anything else is treated as a regular Strapi category.
        categoryType: item.id === 'chakra' ? 'chakra' : item.id === 'elemental' ? 'elemental' : 'category',
      },
    });
  };
React.useEffect(() => {
  if (item.mime?.includes('svg') && typeof item.icon === 'string') {
    fetch(item.icon)
      .then(res => res.text())
      .then(setSvgXml)
      .catch(console.error);
  }
}, [item.icon]);
console.log(item);
  return (
    <TouchableOpacity
      activeOpacity={0.75}
      onPress={handlePress}
      style={[
        styles.categoryRow,
        !isLast && styles.categoryRowBorder,
        !isLast && { borderBottomColor: colors.dividerDark }
      ]}
    >
      <View style={styles.categoryIconWrap}>
       {item.icon && !imgError ? (
  item.mime?.includes('svg') ? (
    <SvgUri
      width={32}
      height={32}
      uri={item.icon as string}
    />
  ) : (
    <Image
      source={
        typeof item.icon === 'string'
          ? { uri: item.icon }
          : item.icon
      }
      style={styles.categoryIcon}
      resizeMode="contain"
      onError={() => setImgError(true)}
    />
  )
) : (
  <View style={styles.categoryIconFallback} />
)}
      </View>

      <View style={styles.categoryTextBlock}>
        <Text style={[styles.categoryTitle, { color: colors.text }]}>{item.title}</Text>
        <Text style={[styles.categoryDesc, { color: colors.textSub }]} numberOfLines={1}>{item.description}</Text>
      </View>

      <View style={styles.categoryRight}>
        <Text style={[styles.practiceCount, { color: colors.textSub }]}>{item.practiceCount} Practices</Text>
        <ChevronRightIcon color={colors.textSub} />
      </View>
    </TouchableOpacity>
  );
};

// ── Main Component ─────────────────────────────────────────────────────────

interface RecommendedForYouProps {
  nidras: any[];
  loading: boolean;
  error: string | null;
  filters: any;
  selectedCategory: string;
  selectedSubOptions: string[];
}

export default function Recommendedforyou({
  nidras,
  loading,
  error,
  filters,
  selectedCategory,
  selectedSubOptions,
}: RecommendedForYouProps) {

  const { colors } = useTheme();
  const sessions = (nidras || []).map((item: any) => ({
    id: item.documentId,
    title: item.NidraIntroCard?.Name,
    duration: `${item.Duration} min`,
    category: item.NidraCategories[0]?.Name,
    description: item.NidraIntroCard?.ShortDescription,
    difficulty: item.NidraIntroCard?.Level,
    image:
      item.NidraIntroCard?.ThumbnailImage?.[0]?.url
        ? `${process.env.EXPO_PUBLIC_IMAGE_API_URL}${item.NidraIntroCard.ThumbnailImage[0].url}`
        : null,
    cardBg: '#FFF6BF',

    // 👇 Add this
    isSaved:
      item.user_yoga_nidra_activities?.[0]?.IsSaved ?? false,
  }));

 const browseCategories = [
  ...(filters?.categories ?? []).map((category: any) => ({
    id: category.documentId,
    title: category.Name,
    description: category.shortDescription ?? '',
    practiceCount: category.nidraCount ?? 0,
    icon: category.icon?.url
      ? `${process.env.EXPO_PUBLIC_IMAGE_API_URL}${category.icon.url}`
      : null,
    mime: category.icon?.mime,
  })),

  {
    id: 'chakra',
    title: 'Chakra',
    description: 'Balance your energy centers.',
    practiceCount:
      filters?.chakras?.reduce(
        (sum: number, item: any) => sum + item.count,
        0
      ) ?? 0,
    icon: require('../../assets/images/CategoryIcon/Chakra.png'),
  },

  {
    id: 'elemental',
    title: 'Elemental',
    description: 'Connect with the five elements.',
    practiceCount:
      filters?.elements?.reduce(
        (sum: number, item: any) => sum + item.count,
        0
      ) ?? 0,
    icon: require('../../assets/images/CategoryIcon/Elemental.png'),
  },
];
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>

      {/* Recommended for You */}
      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Recommended for You</Text>
        <TouchableOpacity activeOpacity={0.7}>
          <Text style={[styles.viewAll, { color: colors.text }]}>View All  {'>'}</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={styles.emptyContainer}>
          <Text style={[styles.emptyText, { color: colors.textSub }]}>
            Loading...
          </Text>
        </View>
      ) : error ? (
        <View style={styles.emptyContainer}>
          <Text style={[styles.emptyText, { color: '#E53935' }]}>
            {error}
          </Text>
        </View>
      ) : sessions.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={[styles.emptyText, { color: colors.textSub }]}>
            No Yoga Nidra found
          </Text>
        </View>
      ) : (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          decelerationRate="fast"
          snapToInterval={CARD_WIDTH + CARD_GAP}
          snapToAlignment="start"
        >
          {sessions.map((session, index) => (
            <SessionCard
              key={session.id}
              session={session}
              index={index}
            />
          ))}
        </ScrollView>
      )}

      {/* Browse by Category */}
      <View style={[styles.sectionHeader, { marginTop: 28 }]}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Browse by Category</Text>
        <TouchableOpacity activeOpacity={0.7}>
          <Text style={[styles.viewAll, { color: colors.text }]}>View All  {'>'}</Text>
        </TouchableOpacity>
      </View>

      <View style={[styles.categoryCard, { backgroundColor: colors.cardPurple }]}>
        {browseCategories.map((item, index) => (
          <CategoryRow
            key={item.id}
            item={item}
            isLast={index === browseCategories.length - 1}
          />
        ))}
      </View>

    </View>
  );
}

// ── Constants & Styles ─────────────────────────────────────────────────────

const CARD_WIDTH = width * 0.62;
const CARD_GAP = 14;
const THUMB_HEIGHT = CARD_WIDTH * 0.72;
const CARD_BODY_HEIGHT = 160;
const CARD_HEIGHT = THUMB_HEIGHT + CARD_BODY_HEIGHT;
const LIST_THUMB = 76;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    backgroundColor: '#FAFAFA',
    paddingBottom: 40,
  },

  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 14,
  },
  sectionTitle: {
    fontFamily: 'SF-Pro-Display',
    fontSize: 20,
    fontWeight: '500',
    color: '#0a0a0a',
    letterSpacing: 0.2,
  },
  viewAll: {
    fontFamily: 'SF-Pro-Display',
    fontSize: 13,
    fontWeight: '500',
    color: '#0a0a0a',
    opacity: 0.85,
  },

  scrollContent: {
    paddingHorizontal: 16,
    gap: CARD_GAP,
    paddingBottom: 4,
    alignItems: 'flex-start',
  },

  cardWrapper: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
  },
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 18,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
  },
  thumbContainer: {
    width: '100%',
    height: THUMB_HEIGHT,
    padding: 10,
    position: 'relative',
  },
  thumbImage: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  thumbPlaceholder: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  thumbCircle: {
    width: THUMB_HEIGHT * 0.45,
    height: THUMB_HEIGHT * 0.45,
    borderRadius: THUMB_HEIGHT * 0.225,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
    position: 'absolute',
  },
  playOverlay: {
    position: 'absolute',
    bottom: 18,
    right: 18,
  },
  playIconWrapper: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(0,0,0,0.45)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  bookmarkBtn: {
    position: 'absolute',
    top: 18,
    right: 18,
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.75)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardBody: {
    width: '100%',
    height: CARD_BODY_HEIGHT,
    padding: 14,
    paddingBottom: 16,
    justifyContent: 'space-between',
  },
  cardContent: {
    gap: 5,
    flex: 1,
  },
  cardTitle: {
    fontFamily: 'SF-Pro-Display',
    fontSize: 15,
    fontWeight: '700',
    color: '#1A1A1A',
    lineHeight: 21,
  },
  cardDesc: {
    fontFamily: 'SF-Pro-Display',
    fontSize: 12,
    color: 'rgba(0,0,0,0.5)',
    lineHeight: 17,
  },

  categoryCard: {
    marginHorizontal: 16,
    backgroundColor: '#EEEAF8',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
    overflow: 'hidden',
  },
  categoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 14,
    gap: 12,
  },
  categoryRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.07)',
  },
  categoryIconWrap: {
    width: 48,
    height: 48,
    borderRadius: 23,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  categoryIcon: {
    width: 32,
    height: 32,
  },
  categoryIconFallback: {
    width: 30,
    height: 30,
    borderRadius: 13,
    backgroundColor: 'rgba(155,143,232,0.2)',
  },
  categoryTextBlock: {
    flex: 1,
    gap: 2,
  },
  categoryTitle: {
    fontFamily: 'SF-Pro-Display',
    fontSize: 15,
    fontWeight: '500',
    color: '#1A1A1A',
  },
  categoryDesc: {
    fontFamily: 'SF-Pro-Display',
    fontSize: 12,
    color: 'rgba(0,0,0,0.45)',
    lineHeight: 16,
  },
  categoryRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    flexShrink: 0,
  },
  practiceCount: {
    fontFamily: 'SF-Pro-Display',
    fontSize: 12,
    fontWeight: '500',
    color: 'rgba(0,0,0,0.45)',
  },

  libraryCard: {
    marginHorizontal: 16,
    backgroundColor: '#1C1C2E',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.07)',
    overflow: 'hidden',
  },
  libraryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 12,
  },
  libraryRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.06)',
  },
  listThumbContainer: {
    width: LIST_THUMB,
    height: LIST_THUMB,
    borderRadius: 10,
    overflow: 'hidden',
    flexShrink: 0,
  },
  listThumbImage: { width: '100%', height: '100%' },
  listThumbPlaceholder: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  listThumbCircle: {
    width: LIST_THUMB * 0.45,
    height: LIST_THUMB * 0.45,
    borderRadius: LIST_THUMB * 0.225,
    borderWidth: 1,
    borderColor: 'rgba(155,143,232,0.25)',
  },
  libraryTextBlock: {
    flex: 1,
    gap: 4,
  },
  libraryTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#FFFFFF',
    lineHeight: 18,
  },
  libraryActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  moreBtn: {
    padding: 4,
  },

  metaRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  metaText: { fontFamily: 'SF-Pro-Display', fontSize: 12, color: 'rgba(0,0,0,0.45)', letterSpacing: 0.1 },
  dot: { width: 4, height: 4, borderRadius: 2, backgroundColor: 'rgba(0,0,0,0.25)' },
  badge: {
    alignSelf: 'flex-start',
    borderRadius: 30,
    paddingHorizontal: 14,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.08)',
  },
  badgeText: { fontFamily: 'SF-Pro-Display', fontSize: 11, fontWeight: '500', letterSpacing: 0.2 },
  emptyContainer: {
    paddingVertical: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },

  emptyText: {
    fontFamily: 'SF-Pro-Display',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
});