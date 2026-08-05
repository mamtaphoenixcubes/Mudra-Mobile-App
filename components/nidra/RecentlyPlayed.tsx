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
import { router } from 'expo-router';
import { useNidraStore } from '@/store/nidraStore';

import { Dimensions } from 'react-native'
const { width } = Dimensions.get('window')

// ─── Types ────────────────────────────────────────────────────────────────────


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
const LibraryRow = ({
  item,
  index,
  totalItems,
  setSelectedNidra,
}: {
  item: any;
  index: number;
  totalItems: number;
  setSelectedNidra: (nidra: any) => void;
}) => {
  const [imgError, setImgError] = React.useState(false);
  const isLast = index === totalItems - 1;
  const { colors } = useTheme()
  const isPlaylist =
    item.MediaType === 'AUDIO_PLAYLIST';

  const title = isPlaylist
    ? item.media?.title
    : item.media?.title;

  const thumbnail =
    item.media?.thumbnail?.url;

  const duration =
    item.LastSessionDuration
      ? `${Math.floor(
        item.LastSessionDuration / 60
      )} min`
      : '--';

  const category =
    item.NidraIntroCard?.Level ?? '';
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => {
        // Save selected nidra in store
        setSelectedNidra(item);

        // Playlist
        if (item.MediaType === 'AUDIO_PLAYLIST') {
          router.push({
            pathname: '/sessionplayer',
            params: {
              playlistId: item.media.documentId,
              mediaId:
                item.media.audios?.[0]?.documentId,
            },
          });

          return;
        }

        // Single Audio
        router.push({
          pathname: '/sessionplayer',
          params: {
            mediaId: item.media.documentId,
          },
        });
      }}
      style={[
        styles.libraryRow,
        !isLast && styles.libraryRowBorder,
        { backgroundColor: colors.card },
        !isLast && {
          borderBottomColor: colors.dividerDark,
        },
      ]}
    >
      <View style={styles.listThumbContainer}>
        {item.image && !imgError ? (
          <Image
            source={{
              uri:
                process.env.EXPO_PUBLIC_IMAGE_API_URL +
                thumbnail,
            }}
            style={styles.listThumbImage}
            resizeMode="cover"
            onError={() => setImgError(true)}
          />
        ) : (
          <PlaceholderThumb index={index} small />
        )}
      </View>

      <View style={styles.libraryTextBlock}>
        <Text style={[styles.libraryTitle, { color: colors.text }]} numberOfLines={2}>{title}</Text>
        <View style={styles.metaRow}>
          <Text style={[styles.metaText, { color: colors.textSub }]}>{duration}</Text>
          <DotIcon />
          <Text style={[styles.metaText, { color: colors.textSub }]}>{category}</Text>
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
    </TouchableOpacity>
  );
};

// ─── Main Component ──────────────────────────────────────────────────────────

interface RecentlyPlayedProps {
  data: any[];
  loading: boolean;
  error: string | null;
}

export default function RecentlyPlayed({
  data,
  loading,
  error,
}: RecentlyPlayedProps) {
  const setSelectedNidra = useNidraStore(
    (state) => state.setSelectedNidra
  );

  const { colors } = useTheme()
  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={{ paddingBottom: 40 }}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles.headerRow}>
        <Text style={[styles.heading, { color: colors.text }]}>Recently Played</Text>
        <TouchableOpacity style={styles.viewAllRow}>
          <Text style={[styles.viewAllText, { color: colors.text }]}>View All</Text>
          <Ionicons name="chevron-forward" size={16} color={colors.text} />
        </TouchableOpacity>
      </View>

      {/* Library Section */}
      <View style={styles.librarySection}>
        <View style={[styles.libraryCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          {data.map((item, index) => (
            <LibraryRow
              key={item.documentId}
              item={item}
              index={index}
              totalItems={data.length}
              setSelectedNidra={setSelectedNidra}
            />
          ))}
        </View>
      </View>

      {/* Bottom Banner — side by side */}
      <View style={styles.banner}>
        {/* Left: image */}
        <Image
          source={require('../../assets/images/tabIcons/AnxietyReleaseYogaNidra.png')}
          style={styles.bannerImage}
        />

        {/* Right: text + button */}
        <View style={styles.bannerRight}>
          <View style={styles.bannerContentRow}>
            {/* Left: title + description */}
            <View style={styles.bannerTextBlock}>
              <Text style={[styles.bannerTitle, { color: colors.text }]}>Find stillness. Heal from within.</Text>
              <Text style={[styles.bannerDescription, { color: colors.textSub }]}>
                Yoga Nidra is a powerful practice of conscious relaxation that helps
                your body heal and mind reset.
              </Text>
            </View>

            {/* Right: button */}
            <TouchableOpacity style={styles.learnButton}>
              <Text style={styles.learnButtonText}>Learn More</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    paddingHorizontal: 20,
    // paddingTop: 20,
  },

  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18,
  },

  heading: {
    fontFamily: 'SF-Pro-Display',
    fontSize: 20,
    fontWeight: '500',
    color: '#111',
  },

  viewAllRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  viewAllText: {
    fontFamily: 'SF-Pro-Display',
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
    //backgroundColor: '#FFFFFF',
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
    fontFamily: 'SF-Pro-Display',
    fontSize: 15,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 4,
  },

  metaText: {
    fontFamily: 'SF-Pro-Display',
    fontSize: 12,
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
    backgroundColor: '#9A85FE33',
    borderRadius: 14,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginHorizontal: 0,
  },

  bannerImage: {
    width: width * 0.28,
    height: width * 0.28,
    borderRadius: 10,
    flexShrink: 0,
  },

  bannerRight: {
    flex: 1,
  },

  bannerContentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  bannerTextBlock: {
    flex: 1,
  },

  bannerTitle: {
    fontSize: 10,
    fontFamily: 'SF-Pro-Display',
    fontWeight: '500',
    marginBottom: 4,
  },

  bannerDescription: {
    fontSize: 8,
    fontFamily: 'SF-Pro-Display',
    fontWeight: '500',
    lineHeight: 15,
  },

  learnButton: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
    flexShrink: 0,
  },

  learnButtonText: {
    fontFamily: 'SF-Pro-Display',
    fontSize: 11,
    fontWeight: '500',
    color: '#111',
  },
});