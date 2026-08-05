import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Animated,
  Image,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/constants/ThemeContext'
import { SvgUri } from 'react-native-svg';
import { ImageSourcePropType } from 'react-native';
// ─── Types ────────────────────────────────────────────────────────────────────
type Category = {
  id: string;
  label: string;
  image?: string | ImageSourcePropType;
  mime?: string;
};


const EarthIcon = () => (
  <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
    <Path d="M12 4L20 19H4L12 4Z" stroke="#0F0F0F" strokeWidth="1.6" strokeLinejoin="round" />
  </Svg>
);
const WaterIcon = () => (
  <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 3C12 3 6 10.5 6 15a6 6 0 0012 0c0-4.5-6-12-6-12z"
      stroke="#0F0F0F"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
  </Svg>
);
const FireIcon = () => (
  <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 2c1 3-3 4-3 8a3 3 0 006 0c0-1-1-2-1-2s2 2 2 5a5 5 0 01-10 0c0-5 4-6 6-11z"
      stroke="#0F0F0F"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
  </Svg>
);
const AirIcon = () => (
  <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
    <Path d="M4 8h11a2.5 2.5 0 100-5" stroke="#0F0F0F" strokeWidth="1.6" strokeLinecap="round" />
    <Path d="M4 13h14a2.5 2.5 0 110 5" stroke="#0F0F0F" strokeWidth="1.6" strokeLinecap="round" />
    <Path d="M4 18h8" stroke="#0F0F0F" strokeWidth="1.6" strokeLinecap="round" />
  </Svg>
);
const SpaceIcon = () => (
  <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 3a9 9 0 100 18 9 9 0 000-18z"
      stroke="#0F0F0F"
      strokeWidth="1.6"
      strokeDasharray="2 3"
    />
  </Svg>
);

const ELEMENTAL_ICONS = [EarthIcon, WaterIcon, FireIcon, AirIcon, SpaceIcon];
const ELEMENTAL_COLORS = ['#FFF6BF', '#CBECFF', '#FFD4C4', '#E9FFDB', '#FFDBE7'];
const CHAKRA_COLORS = ['#E9FFDB', '#FFDBE7', '#FFDBA7', '#EBCFFF', '#CBECFF'];


// ─── Category SVG Icon (used only for "All") ──────────────────────────────────
const CategoryIcon = ({ color }: { color: string }) => (
  <Svg width={22} height={22} viewBox="0 0 1024 1024">
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

// ─── Category Button ──────────────────────────────────────────────────────────
type ButtonProps = {
  item: Category;
  isActive: boolean;
  onPress: () => void;
};

const CategoryButton = ({ item, isActive, onPress }: ButtonProps) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const isAll = item.id === 'all';

  const handlePressIn = () =>
    Animated.spring(scaleAnim, { toValue: 0.92, useNativeDriver: true, speed: 50, bounciness: 4 }).start();
  const handlePressOut = () =>
    Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true, speed: 30, bounciness: 6 }).start();

  const iconColor = isActive ? '#FFFFFF' : '#AAAAAA';

  const btnStyle = [
    styles.btn,
    isActive ? styles.btnActive : styles.btnInactive,
  ];

  const labelStyle = isActive ? styles.labelActive : styles.labelInactive;

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={btnStyle}
      >
      {isAll || !item.image ? (
      <CategoryIcon color={iconColor} />
          ) : item.mime?.includes('svg') ? (
            <SvgUri
              width={30}
              height={38}
              uri={item.image as string}
            />
          ) : (
            <Image
              source={
                typeof item.image === 'string'
                  ? { uri: item.image }
                  : item.image
              }
              style={[
                styles.categoryImage,
                isActive && styles.categoryImageActive,
              ]}
              resizeMode="contain"
            />
          )}
        <Text style={[styles.label, labelStyle]} numberOfLines={2}>
          {item.label}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────

type CategorySelectorProps = {
  categories: {
    needs: any[];
    chakras: string[];
    elements: string[];
  };
  onCategorySelect?: (categoryId: string) => void;
  onSubOptionSelect?: (
    categoryId: string,
    subOptions: string[]
  ) => void;
};

export default function CategorySelector({
  categories,
  onCategorySelect,
  onSubOptionSelect,
}: CategorySelectorProps) {
  const [activeNeed, setActiveNeed] = useState('all');
  const [activeDropdown, setActiveDropdown] = useState<'chakra' | 'elemental' | null>(null);
  const [selectedChakra, setSelectedChakra] = useState<string | null>(null);
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const { colors } = useTheme()
  const CHAKRA_OPTIONS = categories?.chakras ?? [];
  const ELEMENTAL_OPTIONS = categories?.elements ?? [];
  const handleCategoryPress = (id: string) => {
    if (id === 'chakra') {
      setActiveDropdown('chakra');
    } else if (id === 'elemental') {
      setActiveDropdown('elemental');
    } else {
      setActiveNeed(id);
      setActiveDropdown(null);
    }

    onCategorySelect?.(id);
  };

  const handleSubOptionPress = (option: string) => {
    if (activeDropdown === 'chakra') {
      const value = selectedChakra === option ? null : option;

      setSelectedChakra(value);
      onSubOptionSelect?.('chakra', value ? [value] : []);
    }

    if (activeDropdown === 'elemental') {
      const value = selectedElement === option ? null : option;

      setSelectedElement(value);
      onSubOptionSelect?.('elemental', value ? [value] : []);
    }
  };
  const categoryList: Category[] = [
    { id: 'all', label: 'All' },

    ...(categories?.needs ?? []).map((need: any) => ({
      id: need.documentId,
      label: need.Name,
      image: `${process.env.EXPO_PUBLIC_IMAGE_API_URL}${need.icon.url}`,
      mime: need.icon.mime,
    })),
    {
      id: 'chakra',
      label: 'Chakra',
      image: require('../../assets/images/CategoryIcon/Chakra.png'),
    },
    {
      id: 'elemental',
      label: 'Elemental',
      image: require('../../assets/images/CategoryIcon/Elemental.png'),
    },
  ];
  const dropdownOptions =
    activeDropdown === 'chakra'
      ? CHAKRA_OPTIONS
      : activeDropdown === 'elemental'
        ? ELEMENTAL_OPTIONS
        : null;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: colors.primary }]}>Rest deeply. Reset naturally.</Text>
        <Text style={[styles.headerSubtitle, { color: colors.primary }]}>

          Guided Yoga Nidra practices for every need and moment.
        </Text>
      </View>

      {/* Category Scroll */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {categoryList.map((item) => (
          <CategoryButton
            key={item.id}
            item={item}
            isActive={
              item.id === activeNeed ||
              item.id === activeDropdown
            }
            onPress={() => handleCategoryPress(item.id)}
          />
        ))}
      </ScrollView>

      {/* Sub-option dropdown — only for Chakra / Elemental */}
      {dropdownOptions && (
        <View style={styles.dropdownWrap}>
          <View style={styles.dropdownHeaderRow}>
            <TouchableOpacity style={styles.resetButton} onPress={() => {
              if (activeDropdown === 'chakra') {
                setSelectedChakra(null);
                onSubOptionSelect?.('chakra', []);
              }

              if (activeDropdown === 'elemental') {
                setSelectedElement(null);
                onSubOptionSelect?.('elemental', []);
              }
            }}>

              <Text style={styles.resetText}>Reset</Text>
              <Ionicons name="refresh-outline" size={16} color="#0F0F0F80" />
            </TouchableOpacity>
          </View>

          {activeDropdown === 'elemental' ? (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.elementalContent}
            >
              {ELEMENTAL_OPTIONS.map((option, index) => {
                const isSelected = selectedElement === option;
                const bgColor = ELEMENTAL_COLORS[index % ELEMENTAL_COLORS.length];
                const IconComp = ELEMENTAL_ICONS[index % ELEMENTAL_ICONS.length];
                return (
                  <TouchableOpacity
                    key={option}
                    activeOpacity={0.8}
                    onPress={() => handleSubOptionPress(option)}
                    style={[
                      styles.elementalCard,
                      { backgroundColor: bgColor },
                      isSelected && styles.elementalCardSelected,
                    ]}
                  >
                    <View style={styles.elementalIconCircle}>
                      <IconComp />
                    </View>
                    <Text style={styles.elementalLabel} numberOfLines={1}>
                      {option}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          ) : (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.chakraContent}
            >
              {CHAKRA_OPTIONS.map((option, index) => {
                const isSelected = selectedChakra === option;
                const bgColor = CHAKRA_COLORS[index % CHAKRA_COLORS.length];

                return (
                  <TouchableOpacity
                    key={option}
                    activeOpacity={0.8}
                    onPress={() => handleSubOptionPress(option)}
                    style={[
                      styles.chakraChip,
                      { backgroundColor: bgColor },
                      isSelected && styles.chakraChipSelected,
                    ]}
                  >
                    <Text style={styles.chakraChipText}>
                      {option}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          )}
        </View>
      )}
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const BTN_SIZE = 72;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FAFAFA',
    paddingVertical: 10,
  },

  header: {
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  headerTitle: {
    fontFamily: 'SF-Pro-Display',
    fontSize: 15,
    fontWeight: '600',
    color: '#9B8FE8',
    textAlign: 'center',
    letterSpacing: 0.2,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontFamily: 'SF-Pro-Display',
    fontSize: 13,
    color: '#9B8FE8',
    textAlign: 'center',
    lineHeight: 18,
    opacity: 0.85,
  },

  scrollContent: {
    paddingHorizontal: 12,
    gap: 8,
    alignItems: 'center',
  },

  btn: {
    width: BTN_SIZE,
    height: BTN_SIZE + 20,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
    paddingVertical: 10,
    gap: 6,
  },

  btnActive: {
    backgroundColor: '#9B8FE8',
    borderWidth: 0,
  },

  btnInactive: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },

  // Image icon styles
  categoryImage: {
    width: 38,
    height: 38,
    opacity: 0.8,
    tintColor: '#0F0F0FCC',
  },
  categoryImageActive: {
    opacity: 1,
    tintColor: '#FFFFFF',
  },

  label: {
    fontFamily: 'SF-Pro-Display',
    textAlign: 'center',
    lineHeight: 14,
  },
  labelActive: {
    fontSize: 11,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  labelInactive: {
    fontSize: 11,
    fontWeight: '500',
    color: '#0F0F0FCC',
  },
  // ── Sub-option dropdown ──
  dropdownWrap: {
    paddingTop: 24,
  },
  dropdownHeaderRow: {
    alignItems: 'flex-end',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  resetButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  resetText: {
    fontFamily: 'SF-Pro-Display',
    fontWeight: '500',
    fontSize: 14,
    textAlign: 'center',
    color: '#0F0F0F80',
  },

  // Chakra: flat colored pill chips
  chakraContent: {
    paddingHorizontal: 12,
    gap: 10,
  },
  chakraChip: {
    borderRadius: 30,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  chakraChipSelected: {
    borderWidth: 1.5,
    borderColor: '#0F0F0F33',
  },
  chakraChipText: {
    fontFamily: 'SF-Pro-Display',
    fontWeight: '400',
    fontSize: 14,
    color: '#0F0F0F',
  },

  // Elemental: small icon cards
  elementalContent: {
    paddingHorizontal: 12,
    gap: 10,
  },
  elementalCard: {
    width: 78,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    gap: 8,
  },
  elementalCardSelected: {
    borderWidth: 1.5,
    borderColor: '#0F0F0F33',
  },
  elementalIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  elementalLabel: {
    fontFamily: 'SF-Pro-Display',
    fontWeight: '500',
    fontSize: 12,
    textAlign: 'center',
    textTransform: 'capitalize',
    color: '#0F0F0FCC',
  },
});