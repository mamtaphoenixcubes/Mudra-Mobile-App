import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { SvgUri } from 'react-native-svg';
import { useTheme } from '@/constants/ThemeContext';
import { router } from 'expo-router';

const { width } = Dimensions.get('window');

// 4 cards visible + peek of 5th
// gap between cards = 8, padding left = 16
const GAP = 8;
const H_PAD = 16;
const CARD_SIZE = (width - H_PAD * 2 - GAP * 3) / 4;

const EXPO_IMAGE_API_URL = process.env.EXPO_PUBLIC_IMAGE_API_URL;

interface HomeProps {
  moods: any[];
  loading: boolean;
  error: string | null;
}

export default function Home({ moods, loading, error }: HomeProps) {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>

      {/* Top Section */}
      <View style={styles.topContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>
            Your hands already{"\n"}know the way.
          </Text>
          <Text style={styles.subtitle}>
            Small gestures. Deep shifts.
          </Text>
        </View>

        <View style={styles.imageContainer}>
          <Image
            source={require('../../assets/images/tabIcons/lotus.png')}
            style={styles.lotus}
          />
        </View>
      </View>

      {/* Section Heading */}
      <Text style={[styles.bottomText, { color: colors.text }]}>
        Practice by what you need today
      </Text>

      {/* Loading */}
      {loading && (
        <ActivityIndicator size="small" color="#8B7CF6" style={{ marginTop: 20 }} />
      )}

      {/* Error */}
      {error && (
        <Text style={styles.errorText}>{error}</Text>
      )}

      {/* Mood Cards */}
      {!loading && (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.moodRow}
          style={styles.moodScroll}
          decelerationRate="fast"
        >
          {moods?.map((item: any, index: number) => {
            const imageUrl = `${EXPO_IMAGE_API_URL}${item?.icon?.url}`;

            return (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.moodCard,
                  { backgroundColor: item?.colorCode || '#EEE' },
                ]}
                activeOpacity={0.75}
                onPress={() =>
        router.push({
            pathname: '/moodresults',
            params: {
                moodId: item.id,
                moodName: item.name,
                colorCode: item.colorCode,
            },
        })
    }
              >
                <SvgUri
                  uri={imageUrl}
                  width={CARD_SIZE * 0.5}
                  height={CARD_SIZE * 0.5}
                />
                <Text style={styles.moodLabel} numberOfLines={1}>
                  {item?.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: H_PAD,
    paddingBottom: 16,
    paddingTop: 12,
  },

  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  textContainer: {
    flex: 1,
    paddingRight: 8,
  },

  title: {
    fontSize: 22,
    fontFamily: 'SF-Pro-Display',
    fontWeight: '500',
    color: '#9A85FE',
    lineHeight: 30,
  },

  subtitle: {
    marginTop: 6,
    fontSize: 13,
    fontFamily: 'SF-Pro-Display',
    fontWeight: '500',
    color: '#9A85FE99',
  },

  imageContainer: {
    width: width * 0.45,
    height: width * 0.45,
    justifyContent: 'center',
    alignItems: 'center',
  },

  lotus: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },

  bottomText: {
    marginTop: 4,
    marginBottom: 4,
    fontSize: 18,
    fontFamily: 'SF-Pro-Display',
    fontWeight: '600',
  },

  moodScroll: {
    marginTop: 10,
  },

  moodRow: {
    paddingRight: H_PAD,
    gap: GAP,
    alignItems: 'flex-start',
  },

  moodCard: {
    width: CARD_SIZE,
    height: CARD_SIZE * 1.2,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 4,
    gap: 6,
  },

  moodLabel: {
    fontSize: 12,
    fontFamily: 'SF-Pro-Display',
    fontWeight: '500',
    color: '#0F0F0FB2',
    textAlign: 'center',
  },

  errorText: {
    marginTop: 10,
    color: 'red',
    fontSize: 14,
  },
});