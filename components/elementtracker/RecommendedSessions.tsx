// app/recently-played.tsx

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Ionicons, Entypo } from '@expo/vector-icons';
import { useTheme } from '@/constants/ThemeContext'

// ─── Types ────────────────────────────────────────────────────────────────────

type RecentlyPlayedItem = {
  id: number;
  title: string;
  duration: string;
  tags: string;
  image: any;
};

type LibraryItem = {
  id: string;
  title: string;
  subtile: string;
  duration: string;
  image?: any;
};


const LIBRARY_ITEMS: LibraryItem[] = [
  {
    id: '1',
    title: 'Balancing Earth Element',
    subtile: 'Ground stabilize and feel secure',
    duration: '20 min',
    image: require('../../assets/images/tabIcons/Balancing.png'),
  },
  {
    id: '2',
    title: 'Cooling Water Element',
    subtile: 'Emotional flow and calmness',
    duration: '40 min',
    image: require('../../assets/images/tabIcons/Cooling.png'),
  },
  {
    id: '3',
    title: 'Ignite Your Inner Fire',
    subtile: 'Boost energy and confidence',
    duration: '20 min',
    image: require('../../assets/images/tabIcons/Ignite.png'),
  },
  {
    id: '4',
    title: 'Soothing Air Element',
    subtile: 'Rolease stress and breathe easy',
    duration: '20 min',
    image: require('../../assets/images/tabIcons/Soothing.png'),
  },
  {
    id: '5',
    title: 'Expanding Space Element',
    subtile: 'Inner slience and spacious awareness',
    duration: '20 min',
    image: require('../../assets/images/tabIcons/Expanding.png'),
  },
];

// ─── Helper Components ────────────────────────────────────────────────────────

const DotIcon = () => <View style={styles.dot} />;

const PlayCircleIcon = () => (
  <View style={styles.playButton}>
    <Entypo name="controller-play" size={20} color="#fff" />
  </View>
);

const MoreIcon = () => (
  <Entypo name="dots-three-vertical" size={16} color="#666" />
);

const PlaceholderThumb = ({ index, small }: { index: number; small?: boolean }) => (
  <View style={[styles.placeholderThumb, small && styles.placeholderThumbSmall]}>
    <Text style={styles.placeholderText}>🎵</Text>
  </View>
);

// ─── Library Row Component ────────────────────────────────────────────────────

const LibraryRow = ({ item, index }: { item: LibraryItem; index: number }) => {
  const [imgError, setImgError] = React.useState(false);
  const { colors } = useTheme()
  const isLast = index === LIBRARY_ITEMS.length - 1;

  return (
    <View style={[styles.libraryRow, !isLast && styles.libraryRowBorder,
    { backgroundColor: colors.card },
    !isLast && { borderBottomColor: colors.dividerDark }
    ]}>
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
        <Text style={[styles.libraryTitle, { color: colors.text }]} numberOfLines={2}>{item.title}</Text>
        <View style={styles.metaRow}>
          <Text style={[styles.metaText, { color: colors.textSub }]}>{item.duration}</Text>
          <DotIcon />
          <Text style={[styles.metaText, { color: colors.textSub }]}>{item.subtile}</Text>
        </View>
      </View>

      <View style={styles.libraryActions}>
        <TouchableOpacity activeOpacity={0.7}>
          <PlayCircleIcon />
        </TouchableOpacity>
      </View>
    </View>
  );
};

// ─── Main Component ──────────────────────────────────────────────────────────

export default function RecommendedSessions() {
  const { colors } = useTheme()
  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={{ paddingBottom: 40 }}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles.headerRow}>
        <Text style={[styles.heading, { color: colors.text }]}>Recommended Sessions</Text>
        <TouchableOpacity style={styles.viewAllRow}>
          <Text style={[styles.viewAllText, { color: colors.text }]}>View All</Text>
          <Ionicons name="chevron-forward" size={16} color={colors.text} />
        </TouchableOpacity>
      </View>

      {/* Library Section */}
      <View style={styles.librarySection}>
        <View style={[styles.libraryCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          {LIBRARY_ITEMS.map((item, index) => (
            <LibraryRow key={item.id} item={item} index={index} />
          ))}
        </View>
      </View>

      {/* Bottom Banner — side by side */}
      <View style={[styles.tipCard, { backgroundColor: colors.cardPurpleAlt }]}>
        <View style={styles.tipIconWrapper}>
          <Image
            source={require('../../assets/images/tabIcons/profile-avatar.png')}
            style={styles.tipIcon}
          />
        </View>
        <Text style={[styles.tipText, { color: colors.textSub }]}>
          Check in daily and observe shifts in your elements.{'\n'}
          Small awareness brings big transformation.
        </Text>
      </View>
    </ScrollView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 24,
  },

  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18,
  },

  heading: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111',
  },

  viewAllRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  viewAllText: {
    fontSize: 13,
    color: '#111',
    marginRight: 2,
  },

  librarySection: {
    marginBottom: 24,
  },

  libraryCard: {
    //backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E8E8E8',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },

  libraryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
  },

  libraryRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },

  listThumbContainer: {
    width: 60,
    height: 60,
    borderRadius: 10,
    overflow: 'hidden',
    marginRight: 12,
  },

  listThumbImage: {
    width: '100%',
    height: '100%',
  },

  libraryTextBlock: {
    flex: 1,
  },

  libraryTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 4,
  },

  metaText: {
    fontSize: 10,
    color: '#888',
  },

  libraryActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  moreBtn: {
    padding: 4,
  },

  tipCard: {
    backgroundColor: '#EDE9F8',
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },

  tipIconWrapper: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#fcfcfc',
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },

  tipIcon: {
    width: 36,
    height: 26,
    resizeMode: 'contain',
  },

  tipText: {
    flex: 1,
    fontSize: 10,
    color: '#444',
    lineHeight: 17,
  },

  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },

  dot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: '#666',
    marginHorizontal: 6,
  },

  placeholderThumb: {
    width: 80,
    height: 60,
    borderRadius: 10,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },

  placeholderThumbSmall: {
    width: 60,
    height: 60,
  },

  placeholderText: {
    fontSize: 24,
  },

  playButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#9C9C9C',
    justifyContent: 'center',
    alignItems: 'center',
  },

  // ─── Banner ───────────────────────────────────────────────────────────────
  banner: {
    backgroundColor: '#E9E2FF',
    borderRadius: 18,
    padding: 16,
    flexDirection: 'row',      // ← side by side
    alignItems: 'flex-start',
    gap: 14,
  },

  bannerImage: {
    width: 90,
    height: 90,
    borderRadius: 52,
    flexShrink: 0,
  },

  bannerRight: {
    flex: 1,
  },

  bannerContentRow: {
    flexDirection: 'row',       // ← side by side
    alignItems: 'center',
    gap: 12,
  },

  bannerTextBlock: {
    flex: 1,                   
  },

  bannerTitle: {
    fontSize: 9,
    fontWeight: '600',
    color: '#222',
    marginBottom: 4,
  },

  bannerDescription: {
    fontSize: 8,
    color: '#666',
    lineHeight: 16,
  },

  learnButton: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: 10,
    alignItems: 'center',
    flexShrink: 0,              // ← prevents button from shrinking
    minWidth: 50,               // ← keeps button a consistent width
  },

  learnButtonText: {
    fontSize: 10,
    fontWeight: '500',
    color: '#111',
  },
});