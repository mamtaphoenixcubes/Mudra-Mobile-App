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

const { width } = Dimensions.get('window');

type DifficultyLevel = 'Beginner' | 'Intermediate' | 'Advanced';

type Session = {
  id: string;
  title: string;
  duration: string;
  category: string;
  description: string;
  difficulty: DifficultyLevel;
  image: any;
  cardBg: string;
};

type Category = {
  id: string;
  title: string;
  description: string;
  practiceCount: number;
  icon: any;
};


const CATEGORIES: Category[] = [
  { id: '1', title: 'Earth', description: 'Prithvi Mudra, Apan Mudra, Bhumi Sparsha Mudra', practiceCount: 12, icon: require('../../assets/images/tabIcons/Vector.png') },
  { id: '2', title: 'Water', description: 'Varuna Mudra, Jal Mudra, Shankh Mudra', practiceCount: 10, icon: require('../../assets/images/tabIcons/Vector.png') },
  { id: '3', title: 'Fire', description: 'Agri Mudia Surya Mudra, Pitta Shamak Mudra', practiceCount: 14, icon: require('../../assets/images/tabIcons/Vector.png') },
  { id: '4', title: 'Air', description: 'Unlock aspiration and creative flow.', practiceCount: 8, icon: require('../../assets/images/tabIcons/Vector.png') },
  { id: '5', title: 'Space', description: 'Akash Mudra, Shonya Mudra Dhyana Mudra', practiceCount: 9, icon: require('../../assets/images/tabIcons/Vector.png') },
];

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

  const handlePressIn = () =>
    Animated.spring(scaleAnim, {
      toValue: 0.96,
      useNativeDriver: true,
      speed: 50,
      bounciness: 3,
    }).start();

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      speed: 30,
      bounciness: 6,
    }).start(() => {
      // ✅ Fix: cast pathname to `any` to bypass Expo Router's strict typed routes
      router.push({
        pathname: '/(tab)/SessionPlayer' as any,
        params: {
          id: session.id,
          title: session.title,
          duration: session.duration,
          category: session.category,
          description: session.description,
          difficulty: session.difficulty,
          cardBg: session.cardBg,
        },
      });
    });
  };

  return (
    // ✅ Fix: cardWrapper now has a fixed CARD_HEIGHT so all cards are identical size
    <Animated.View style={[styles.cardWrapper, { transform: [{ scale: scaleAnim }] }]}>
      <TouchableOpacity
        activeOpacity={1}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={[styles.card, { backgroundColor: session.cardBg }]}
      >
        {/* Thumbnail — fixed height */}
        <View style={styles.thumbContainer}>
          {session.image && !imgError ? (
            <Image
              source={session.image}
              style={styles.thumbImage}
              resizeMode="cover"
              onError={() => setImgError(true)}
            />
          ) : (
            <PlaceholderThumb index={index} />
          )}
          <TouchableOpacity style={styles.playOverlay} activeOpacity={0.85}>
            <PlayIcon />
          </TouchableOpacity>
          <TouchableOpacity style={styles.bookmarkBtn} activeOpacity={0.7}>
            <BookmarkIcon />
          </TouchableOpacity>
        </View>

        {/* Body — fixed height, content clipped to fit */}
        <View style={styles.cardBody}>
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle} numberOfLines={2}>{session.title}</Text>
            <View style={styles.metaRow}>
              <Text style={styles.metaText}>{session.duration}</Text>
              <DotIcon />
              <Text style={styles.metaText}>{session.category}</Text>
            </View>
            {/* ✅ numberOfLines={2} so short & long descriptions take same space */}
            <Text style={styles.cardDesc} numberOfLines={2}>{session.description}</Text>
          </View>
          {/* Badge pinned to bottom */}
          <DifficultyBadge level={session.difficulty} />
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

// ── Category Row ───────────────────────────────────────────────────────────

const CategoryRow = ({ item, isLast }: { item: Category; isLast: boolean }) => {
  const [imgError, setImgError] = React.useState(false);
  const { colors } = useTheme()

  return (
    <TouchableOpacity
      activeOpacity={0.75}
      style={[styles.categoryRow, !isLast && styles.categoryRowBorder,
      !isLast && { borderBottomColor: colors.dividerDark }
      ]}
    >
      <View style={styles.categoryIconWrap}>
        {item.icon && !imgError ? (
          <Image
            source={item.icon}
            style={styles.categoryIcon}
            resizeMode="contain"
            onError={() => setImgError(true)}
          />
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

export default function BrowseByCategory() {
  const { colors } = useTheme()
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>

      {/* ── Browse by Category ── */}
      <View style={[styles.sectionHeader, { marginTop: 28 }]}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Browse by Category</Text>
        <TouchableOpacity activeOpacity={0.7}>
          <Text style={[styles.viewAll, { color: colors.text }]}>View All  {'>'}</Text>
        </TouchableOpacity>
      </View>

      <View style={[styles.categoryCard, { backgroundColor: colors.cardPurple }]}>
        {CATEGORIES.map((item, index) => (
          <CategoryRow
            key={item.id}
            item={item}
            isLast={index === CATEGORIES.length - 1}
          />
        ))}
      </View>

    </View>
  );
}

// ── Constants & Styles ─────────────────────────────────────────────────────

const CARD_WIDTH = width * 0.62;
const CARD_GAP = 14;
const THUMB_HEIGHT = CARD_WIDTH * 0.72;  // fixed image area height
const CARD_BODY_HEIGHT = 160;            // ✅ fixed body height — all cards same total size
const CARD_HEIGHT = THUMB_HEIGHT + CARD_BODY_HEIGHT; // total card height
const LIST_THUMB = 76;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingBottom: 10,
  },

  // ── Section Header ──
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0a0a0a',
    letterSpacing: 0.2,
  },
  viewAll: {
    fontSize: 13,
    fontWeight: '500',
    color: '#0a0a0a',
    opacity: 0.85,
  },

  // ── Horizontal Scroll ──
  scrollContent: {
    paddingHorizontal: 16,
    gap: CARD_GAP,
    paddingBottom: 4,
    alignItems: 'flex-start', // ✅ prevents cards from stretching to tallest sibling
  },

  // ── Session Card ──
  // ✅ Both cardWrapper and card have explicit fixed dimensions
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
    height: THUMB_HEIGHT,  // fixed
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
  // ✅ cardBody has fixed height and uses space-between to pin badge to bottom
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
    fontSize: 15,
    fontWeight: '700',
    color: '#1A1A1A',
    lineHeight: 21,
  },
  cardDesc: {
    fontSize: 12,
    color: 'rgba(0,0,0,0.5)',
    lineHeight: 17,
  },

  // ── Category Section ──
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
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  categoryIcon: {
    width: 26,
    height: 26,
  },
  categoryIconFallback: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: 'rgba(155,143,232,0.2)',
  },
  categoryTextBlock: {
    flex: 1,
    gap: 2,
  },
  categoryTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  categoryDesc: {
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
    fontSize: 12,
    fontWeight: '500',
    color: 'rgba(0,0,0,0.45)',
  },

  // ── Library (kept for reference) ──
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

  // ── Shared ──
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  metaText: { fontSize: 12, color: 'rgba(0,0,0,0.45)', letterSpacing: 0.1 },
  dot: { width: 4, height: 4, borderRadius: 2, backgroundColor: 'rgba(0,0,0,0.25)' },
  badge: {
    alignSelf: 'flex-start',
    borderRadius: 30,
    paddingHorizontal: 14,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.08)',
  },
  badgeText: { fontSize: 11, fontWeight: '500', letterSpacing: 0.2 },
});