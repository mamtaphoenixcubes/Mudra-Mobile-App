import React, { useState, useRef } from 'react';
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

const { width } = Dimensions.get('window');

type Category = {
  id: string;
  label: string;
  lines?: string;
};

const CATEGORIES: Category[] = [
  { id: 'all', label: 'All' },
  { id: 'sleep', label: 'Sleep\nDeeply' },
  { id: 'relax', label: 'Relax &\nUnwind' },
  { id: 'anxiety', label: 'Anxiety\nRelief' },
  { id: 'emotional', label: 'Emotional\nHealing' },
  { id: 'chakra', label: 'Chakra\nBalance' },
  { id: 'nidras', label: 'All\nNidras' },
];

const GridIcon = ({ active }: { active: boolean }) => {
  const dotColor = active ? '#FFFFFF' : 'rgba(255,255,255,0.7)';
  const size = 5;
  const gap = 3;

  return (
    <View style={styles.gridIcon}>
      {[0, 1, 2].map((row) => (
        <View key={row} style={styles.gridRow}>
          {[0, 1, 2].map((col) => (
            <View
              key={col}
              style={[
                styles.gridDot,
                {
                  width: size,
                  height: size,
                  borderRadius: 1,
                  backgroundColor: dotColor,
                  marginRight: col < 2 ? gap : 0,
                  marginBottom: row < 2 ? gap : 0,
                },
              ]}
            />
          ))}
        </View>
      ))}
    </View>
  );
};

import Svg, { Path, Polygon } from 'react-native-svg';

const CategoryIcon = ({ active, activeBg }: { active: boolean; activeBg: string }) => {
  const color = active ? '#FFFFFF' : 'rgba(255,255,255,0.5)';
  return (
    <Svg width={28} height={28} viewBox="0 0 1024 1024">
      <Path
        d="M391.836735 475.428571H177.632653c-45.97551 0-83.591837-37.616327-83.591837-83.591836V177.632653c0-45.97551 37.616327-83.591837 83.591837-83.591837h214.204082c45.97551 0 83.591837 37.616327 83.591836 83.591837v214.204082c0 45.97551-37.616327 83.591837-83.591836 83.591836zM177.632653 135.836735c-22.987755 0-41.795918 18.808163-41.795918 41.795918v214.204082c0 22.987755 18.808163 41.795918 41.795918 41.795918h214.204082c22.987755 0 41.795918-18.808163 41.795918-41.795918V177.632653c0-22.987755-18.808163-41.795918-41.795918-41.795918H177.632653z"
        fill={color}
      />
      <Path
        d="M391.836735 929.959184H177.632653c-45.97551 0-83.591837-37.616327-83.591837-83.591837v-214.204082c0-45.97551 37.616327-83.591837 83.591837-83.591836h214.204082c45.97551 0 83.591837 37.616327 83.591836 83.591836v214.204082c0 45.97551-37.616327 83.591837-83.591836 83.591837z m-214.204082-339.591837c-22.987755 0-41.795918 18.808163-41.795918 41.795918v214.204082c0 22.987755 18.808163 41.795918 41.795918 41.795918h214.204082c22.987755 0 41.795918-18.808163 41.795918-41.795918v-214.204082c0-22.987755-18.808163-41.795918-41.795918-41.795918H177.632653z"
        fill={color}
      />
      <Path
        d="M846.367347 929.959184h-214.204082c-45.97551 0-83.591837-37.616327-83.591836-83.591837v-214.204082c0-45.97551 37.616327-83.591837 83.591836-83.591836h214.204082c45.97551 0 83.591837 37.616327 83.591837 83.591836v214.204082c0 45.97551-37.616327 83.591837-83.591837 83.591837z m-214.204082-339.591837c-22.987755 0-41.795918 18.808163-41.795918 41.795918v214.204082c0 22.987755 18.808163 41.795918 41.795918 41.795918h214.204082c22.987755 0 41.795918-18.808163 41.795918-41.795918v-214.204082c0-22.987755-18.808163-41.795918-41.795918-41.795918h-214.204082z"
        fill={color}
      />
      <Path
        d="M739.265306 475.428571C634.253061 475.428571 548.571429 389.746939 548.571429 284.734694S634.253061 94.040816 739.265306 94.040816 929.959184 179.722449 929.959184 284.734694 844.277551 475.428571 739.265306 475.428571z m0-339.591836C657.240816 135.836735 590.367347 202.710204 590.367347 284.734694S657.240816 433.632653 739.265306 433.632653 888.163265 366.759184 888.163265 284.734694 821.289796 135.836735 739.265306 135.836735z"
        fill={color}
      />
    </Svg>
  );
};

type CategoryButtonProps = {
  item: Category;
  isActive: boolean;
  onPress: () => void;
};

const CategoryButton = ({ item, isActive, onPress }: CategoryButtonProps) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.93,
      useNativeDriver: true,
      speed: 50,
      bounciness: 4,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      speed: 30,
      bounciness: 6,
    }).start();
  };

  const isAll = item.id === 'all';

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={[
          styles.categoryBtn,
          styles.categoryBtnRegular,
          isActive && !isAll && styles.categoryBtnActive,
          isActive && isAll && styles.categoryBtnAllActive,
        ]}
      >
        {isAll ? (
          <CategoryIcon active={isActive} activeBg="#7B6FD4" />
        ) : (
          <CategoryIcon active={isActive} activeBg="#3A3560" />
        )}
        <Text
          style={[
            styles.categoryLabel,
            isAll ? styles.categoryLabelAll : styles.categoryLabelRegular,
            isActive && styles.categoryLabelActive,
          ]}
          numberOfLines={2}
        >
          {item.label}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

// ─── Featured Card ───────────────────────────────────────────────────────────
const PlayIcon = () => (
  <Svg width={12} height={12} viewBox="0 0 24 24">
    <Polygon points="5,3 19,12 5,21" fill="#FFFFFF" />
  </Svg>
);

const StarIcon = () => (
  <Svg width={11} height={11} viewBox="0 0 24 24">
    <Path
      d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
      fill="none"
      stroke="rgba(255,255,255,0.75)"
      strokeWidth="2"
    />
  </Svg>
);

const FeaturedCard = () => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.97,
      useNativeDriver: true,
      speed: 50,
      bounciness: 3,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      speed: 30,
      bounciness: 5,
    }).start();
  };

  return (
    <Animated.View style={[styles.featuredWrapper, { transform: [{ scale: scaleAnim }] }]}>
      <TouchableOpacity
        activeOpacity={1}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={styles.featuredCard}
      >
        {/* Thumbnail */}
        <View style={styles.featuredThumb}>
          <Image
            source={require('../../assets/images/tabIcons/deep-sleep.png')}
            style={styles.featuredImage}
            resizeMode="cover"
          />
        </View>

        <View style={styles.dividerWrapper}>
          <View style={styles.divider} />
        </View>

        {/* Content */}
        <View style={styles.featuredContent}>
          {/* Badge */}
          <View style={styles.featuredBadge}>
            <StarIcon />
            <Text style={styles.featuredBadgeText}>Featured</Text>
          </View>

          {/* Title */}
          <Text style={styles.featuredTitle}>Deep Sleep Yoga Nidra</Text>

          {/* Meta */}
          <Text style={styles.featuredMeta}>30 min  •  Yoga Nidra</Text>

          {/* Description */}
          <Text style={styles.featuredDesc} numberOfLines={2}>
            A deeply relaxing practice to quiet the mind, release tension and guide you into restful sleep.
          </Text>

          {/* Play Button */}
          <TouchableOpacity style={styles.playBtn} activeOpacity={0.85}>
            <PlayIcon />
            <Text style={styles.playBtnText}>Play Now</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────
export default function UnwindCategorySelector() {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Unwind Release. Rest deeply</Text>
        <Text style={styles.headerSubtitle}>
          Curated night sessions and Yoga Nidra to help you sleep better.
        </Text>
      </View>

      {/* Category Scroll */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {CATEGORIES.map((item) => (
          <CategoryButton
            key={item.id}
            item={item}
            isActive={activeCategory === item.id}
            onPress={() => setActiveCategory(item.id)}
          />
        ))}
      </ScrollView>

      {/* Featured Card */}
      <FeaturedCard />
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const CARD_SIZE = 70;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
  },

  // Header
  header: {
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#9B8FE8',
    textAlign: 'center',
    letterSpacing: 0.2,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 13,
    color: '#9B8FE8',
    textAlign: 'center',
    lineHeight: 18,
    opacity: 0.85,
  },

  // Scroll
  scrollContent: {
    paddingHorizontal: 14,
    gap: 8,
    alignItems: 'center',
  },

  // Category Buttons
  categoryBtn: {
    width: CARD_SIZE,
    height: CARD_SIZE + 8,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
  },
  categoryBtnAll: {
    backgroundColor: '#7B6FD4',
  },
  categoryBtnAllActive: {
    backgroundColor: '#7B6FD4',
  },
  categoryBtnRegular: {
    backgroundColor: '#2A2A3E',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.07)',
  },
  categoryBtnActive: {
    backgroundColor: '#3A3560',
    borderColor: 'rgba(155,143,232,0.4)',
  },

  // Category Labels
  categoryLabel: {
    textAlign: 'center',
    marginTop: 5,
  },
  categoryLabelAll: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.3,
  },
  categoryLabelRegular: {
    fontSize: 11,
    fontWeight: '400',
    color: 'rgba(255,255,255,0.55)',
    lineHeight: 15,
  },
  categoryLabelActive: {
    color: '#9B8FE8',
    fontWeight: '500',
  },

  // Grid icon
  gridIcon: {
    width: 22,
    height: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gridRow: {
    flexDirection: 'row',
  },
  gridDot: {},

  // ── Featured Card ──────────────────────────────────────────
  featuredWrapper: {
    marginHorizontal: 14,
    marginTop: 16,
  },
  featuredCard: {
    flexDirection: 'row',
    backgroundColor: '#23233A',
    borderRadius: 14,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.07)',
    height: 150,
  },

  // Thumbnail
  featuredThumb: {
    width: 150,
    height: 150,
  },
  featuredImage: {
    width: '100%',
    height: '100%',
  },
  // Styles:
  dividerWrapper: {
    alignSelf: 'stretch',       // stretches full height of the card
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,        // controls the "80%" gap — adjust to taste
  },
  divider: {
    width: 1,
    flex: 1,                    // fills the wrapper minus paddingVertical
    backgroundColor: 'rgba(255, 255, 255, 0.26)',
    marginLeft: 5,
  },
  // Content area
  featuredContent: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 9,
    justifyContent: 'space-between',
  },

  // Badge
  featuredBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 20,
    paddingHorizontal: 7,
    paddingVertical: 3,
    gap: 3,
    marginBottom: 4,
  },
  featuredBadgeText: {
    fontSize: 9,
    color: 'rgba(255,255,255,0.75)',
    fontWeight: '500',
    letterSpacing: 0.2,
  },

  // Title
  featuredTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
    lineHeight: 17,
    marginBottom: 2,
  },

  // Meta
  featuredMeta: {
    fontSize: 10,
    color: 'rgba(255,255,255,0.45)',
    marginBottom: 4,
    letterSpacing: 0.1,
  },

  // Description
  featuredDesc: {
    fontSize: 10,
    color: 'rgba(255,255,255,0.55)',
    lineHeight: 14,
    marginBottom: 7,
  },

  // Play button
  playBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#7B6FD4',
    borderRadius: 18,
    paddingVertical: 6,
    paddingHorizontal: 14,
    gap: 5,
    alignSelf: 'stretch',
    width: '60%',
  },
  playBtnText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#FFFFFF',
    letterSpacing: 0.2,
  },
});