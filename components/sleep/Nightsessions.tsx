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
import Svg, { Polygon, Path, Circle } from 'react-native-svg';

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
};

const SESSIONS: Session[] = [
  {
    id: '1',
    title: 'Calm Mind Yoga Nidra',
    duration: '20 min',
    category: 'Yoga Nidra',
    description: 'Soothe your thoughts and prepare for peaceful sleep.',
    difficulty: 'Beginner',
    image: require('../../assets/images/tabIcons/calm-mind.png'),
  },
  {
    id: '2',
    title: 'Anxiety Release Yoga Nidra',
    duration: '25 min',
    category: 'Yoga Nidra',
    description: 'Release worry and mental stress.',
    difficulty: 'Beginner',
    image: require('../../assets/images/tabIcons/anxiety-release.png'),
  },
  {
    id: '3',
    title: 'Body Scan Yoga Nidra',
    duration: '35 min',
    category: 'Yoga Nidra',
    description: 'Relax your body deeply from head to toe.',
    difficulty: 'Intermediate',
    image: require('../../assets/images/tabIcons/body-scan.png'),
  },
  {
    id: '4',
    title: 'Let Go & Rest Yoga Nidra',
    duration: '40 min',
    category: 'Yoga Nidra',
    description: 'Surrender, let go and fall into deep rest.',
    difficulty: 'Intermediate',
    image: require('../../assets/images/tabIcons/sleep3.png'),
  },
];

type LibraryItem = {
  id: string;
  title: string;
  duration: string;
  category: string;
  image: any;
};

const LIBRARY_ITEMS: LibraryItem[] = [
  {
    id: '1',
    title: 'Healing Sleep Yoga Nidra',
    duration: '45 min',
    category: 'Deep Reset & Healing',
    image: require('../../assets/images/tabIcons/HealingSleep.png'),
  },
  {
    id: '2',
    title: 'Chakra Balancing Yoga Nidra',
    duration: '35 min',
    category: 'Chakra Balance',
    image: require('../../assets/images/tabIcons/Chakra.png'),
  },
  {
    id: '3',
    title: 'Gratitude Before Sleep',
    duration: '20 min',
    category: 'Gratitude & Positivity',
    image: require('../../assets/images/tabIcons/Gratitude.png'),
  },
  {
    id: '4',
    title: 'Releasing the Day Yoga Nidra',
    duration: '25 min',
    category: 'Let Go & Relax',
    image: require('../../assets/images/tabIcons/sleep3.png'),
  },
];

const PlayIcon = () => (
  <View style={styles.playIconWrapper}>
    <Svg width={10} height={10} viewBox="0 0 24 24">
      <Polygon points="6,3 20,12 6,21" fill="#FFFFFF" />
    </Svg>
  </View>
);

const PlayCircleIcon = () => (
  <Svg width={36} height={36} viewBox="0 0 24 24">
    <Circle cx="12" cy="12" r="11" fill="none" stroke="rgba(255, 255, 255, 0.99)" strokeWidth="1.2" />
    <Polygon points="9.5,7 18,12 9.5,17" fill="rgba(255, 255, 255, 0.97)" />
  </Svg>
);

const MoreIcon = () => (
  <Svg width={18} height={18} viewBox="0 0 24 24">
    <Circle cx="12" cy="5" r="1.5" fill="rgb(255, 255, 255)" />
    <Circle cx="12" cy="12" r="1.5" fill="rgb(255, 255, 255)" />
    <Circle cx="12" cy="19" r="1.5" fill="rgb(255, 255, 255)" />
  </Svg>
);

const BookmarkIcon = () => (
  <Svg width={14} height={14} viewBox="0 0 24 24">
    <Path
      d="M5 3h14a1 1 0 0 1 1 1v17l-7-3-7 3V4a1 1 0 0 1 1-1z"
      fill="none"
      stroke="rgba(255,255,255,0.8)"
      strokeWidth="2"
      strokeLinejoin="round"
    />
  </Svg>
);

const DotIcon = () => <View style={styles.dot} />;

const DIFFICULTY_COLORS: Record<DifficultyLevel, { bg: string; text: string }> = {
  Beginner: { bg: 'rgba(100,200,150,0.18)', text: 'rgba(137, 139, 138, 0.69)' },
  Intermediate: { bg: 'rgba(155,143,232,0.18)', text: 'rgba(137, 139, 138, 0.69)' },
  Advanced: { bg: 'rgba(240,100,100,0.18)', text: 'rgba(137, 139, 138, 0.69)' },
};

const DifficultyBadge = ({ level }: { level: DifficultyLevel }) => {
  const colors = DIFFICULTY_COLORS[level];
  return (
    <View style={[styles.badge, { backgroundColor: colors.bg }]}>
      <Text style={[styles.badgeText, { color: colors.text }]}>{level}</Text>
    </View>
  );
};

const PlaceholderThumb = ({ index, small }: { index: number; small?: boolean }) => {
  const BG_COLORS = ['#2A1A3E', '#1A2A3E', '#1A3A2E', '#3A2A1E'];
  return (
    <View style={[
      small ? styles.listThumbPlaceholder : styles.thumbPlaceholder,
      { backgroundColor: BG_COLORS[index % BG_COLORS.length] }
    ]}>
      <View style={small ? styles.listThumbCircle : styles.thumbCircle} />
    </View>
  );
};

type CardProps = { session: Session; index: number };

const SessionCard = ({ session, index }: CardProps) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const [imgError, setImgError] = React.useState(false);

  const handlePressIn = () =>
    Animated.spring(scaleAnim, { toValue: 0.96, useNativeDriver: true, speed: 50, bounciness: 3 }).start();
  const handlePressOut = () =>
    Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true, speed: 30, bounciness: 6 }).start();

  return (
    <Animated.View style={[styles.cardWrapper, { transform: [{ scale: scaleAnim }] }]}>
      <TouchableOpacity activeOpacity={1} onPressIn={handlePressIn} onPressOut={handlePressOut} style={styles.card}>
        <View style={styles.thumbContainer}>
          {session.image && !imgError ? (
            <Image source={session.image} style={styles.thumbImage} resizeMode="cover" onError={() => setImgError(true)} />
          ) : (
            <PlaceholderThumb index={index} />
          )}
          <TouchableOpacity style={styles.playOverlay} activeOpacity={0.85}>
            <PlayIcon />
          </TouchableOpacity>
          <TouchableOpacity style={styles.bookmarkBtn} activeOpacity={0.7}>
            <BookmarkIcon />
          </TouchableOpacity>
          <View style={styles.thumbGradient} />
        </View>

        <View style={styles.cardBody}>

          {/* 🔥 TOP CONTENT */}
          <View>
            <Text style={styles.cardTitle} numberOfLines={2}>
              {session.title}
            </Text>

            <View style={styles.metaRow}>
              <Text style={styles.metaText}>{session.duration}</Text>
              <DotIcon />
              <Text style={styles.metaText}>{session.category}</Text>
            </View>

            <Text style={styles.cardDesc} numberOfLines={3}>
              {session.description}
            </Text>
          </View>

          {/* 🔥 BOTTOM FIXED (WILL NEVER MOVE) */}
          <DifficultyBadge level={session.difficulty} />

        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const LibraryRow = ({ item, index }: { item: LibraryItem; index: number }) => {
  const [imgError, setImgError] = React.useState(false);
  const isLast = index === LIBRARY_ITEMS.length - 1;

  return (
    <View style={[styles.libraryRow, !isLast && styles.libraryRowBorder]}>
      <View style={styles.listThumbContainer}>
        {item.image && !imgError ? (
          <Image
            source={item.image}
            style={styles.listThumbImage}
            resizeMode="cover"
            onError={() => setImgError(true)}
          />
        ) : (
          <PlaceholderThumb index={index} small />
        )}
      </View>

      <View style={styles.libraryTextBlock}>
        <Text style={styles.libraryTitle} numberOfLines={2}>{item.title}</Text>
        <View style={styles.metaRow}>
          <Text style={styles.metaText}>{item.duration}</Text>
          <DotIcon />
          <Text style={styles.metaText}>{item.category}</Text>
        </View>
      </View>

      <View style={styles.libraryActions}>
        <TouchableOpacity activeOpacity={0.7}>
          <PlayCircleIcon />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.7} style={styles.moreBtn}>
          <MoreIcon />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const ReminderBanner = () => (
  <View style={styles.reminderCard}>
    <View style={styles.reminderIcon}>
      <Image
        source={require('../../assets/images/tabIcons/bell-ringing.png')}
        style={{ width: 32, height: 32 }}
        resizeMode="contain"
      />
    </View>
    <View style={styles.reminderText}>
      <Text style={styles.reminderTitle}>Set a bedtime reminder</Text>
      <Text style={styles.reminderDesc}>
        We'll remind you to wind down and prepare for a restful night.
      </Text>
    </View>
    <TouchableOpacity style={styles.reminderBtn} activeOpacity={0.85}>
      <Text style={styles.reminderBtnText}>Set Reminder</Text>
    </TouchableOpacity>
  </View>
);

export default function NightSessions() {
  return (
    <View style={styles.container}>

      {/* ── Night Sessions ── */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Night Sessions</Text>
        <TouchableOpacity activeOpacity={0.7}>
          <Text style={styles.viewAll}>View All  {'>'}</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        decelerationRate="fast"
        snapToInterval={CARD_WIDTH + CARD_GAP}
        snapToAlignment="start"
      >
        {SESSIONS.map((session, index) => (
          <SessionCard key={session.id} session={session} index={index} />
        ))}
      </ScrollView>

      {/* ── Yoga Nidra Library ── */}
      <View style={[styles.sectionHeader, { marginTop: 28 }]}>
        <Text style={styles.sectionTitle}>Yoga Nidra Library</Text>
        <TouchableOpacity activeOpacity={0.7}>
          <Text style={styles.viewAll}>View All  {'>'}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.libraryCard}>
        {LIBRARY_ITEMS.map((item, index) => (
          <LibraryRow key={item.id} item={item} index={index} />
        ))}
      </View>

      {/* ── Reminder Banner ── */}
      <ReminderBanner />

    </View>
  );
}

// const CARD_WIDTH = width * 0.42;
const CARD_WIDTH = 160;
const CARD_HEIGHT = 310; // 🔥 fixed height for ALL cards
const THUMB_HEIGHT = 150;
const CARD_GAP = 10;
// const THUMB_HEIGHT = CARD_WIDTH * 1.0;
const LIST_THUMB = 76;

const styles = StyleSheet.create({
  // ← No backgroundColor here — transparent, inherits from parent ScrollView
  container: {
    paddingVertical: 20,
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
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.2,
  },
  viewAll: {
    fontSize: 13,
    fontWeight: '500',
    color: '#FFFFFF',
    opacity: 0.85,
  },

  scrollContent: {
    paddingHorizontal: 16,
    gap: CARD_GAP,
    paddingBottom: 4,
  },

  cardWrapper: { width: CARD_WIDTH },
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT, // ✅ important
    minHeight: 260, // 👈 base height
    backgroundColor: '#1C1C2E',
    borderRadius: 14,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.07)',
  },
  thumbContainer: {
    width: '100%',
    height: THUMB_HEIGHT,
  },
  thumbImage: { width: '100%', height: '100%' },
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
    borderColor: 'rgba(155,143,232,0.25)',
    position: 'absolute',
  },
  thumbInnerCircle: {
    width: THUMB_HEIGHT * 0.2,
    height: THUMB_HEIGHT * 0.2,
    borderRadius: THUMB_HEIGHT * 0.1,
    backgroundColor: 'rgba(155,143,232,0.12)',
  },
  thumbGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: THUMB_HEIGHT * 0.4,
    backgroundColor: 'transparent',
    shadowColor: '#1C1C2E',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 1,
    shadowRadius: 20,
  },
  playOverlay: { position: 'absolute', bottom: 10, right: 10 },
  playIconWrapper: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(0,0,0,0.55)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  bookmarkBtn: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: 'rgba(0,0,0,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardBody: {
    flex: 1,
    padding: 10,
    justifyContent: 'space-between', // 🔥 THIS IS KEY
  },
  cardTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
    lineHeight: 17,
    height: 34, // ✅ fixed height (2 lines)
  },
  cardDesc: {
    fontSize: 12,
    color: '#555',
    height: 42, // keep this for equal height
    marginTop: 4,
    marginBottom: 8, // 👈 ADD THIS
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

  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginTop: 4,
    marginBottom: 4,
  },
  metaText: { fontSize: 10, color: 'rgba(255,255,255,0.45)', letterSpacing: 0.1 },
  dot: { width: 3, height: 3, borderRadius: 1.5, backgroundColor: 'rgba(255,255,255,0.3)' },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: '#2ecc71',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    marginBottom: 6, // 👈 ADD THIS
  },
  badgeText: { fontSize: 9, fontWeight: '600', letterSpacing: 0.2 },

  reminderCard: {
    marginHorizontal: 16,
    marginTop: 20,
    backgroundColor: '#1C1C2E',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.07)',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 12,
  },
  reminderIcon: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: 'rgba(155, 143, 232, 0.05)',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  reminderText: {
    flex: 1,
    gap: 4,
  },
  reminderTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#ffffffec',
    lineHeight: 18,
  },
  reminderDesc: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.5)',
    lineHeight: 15,
  },
  reminderBtn: {
    backgroundColor: '#c2b6fe88',
    borderColor: '#9A85FE',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 14,
    paddingVertical: 10,
    flexShrink: 0,
  },
  reminderBtnText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
    letterSpacing: 0.2,
  },
});