import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
  Platform,
} from "react-native";
import { SvgUri } from "react-native-svg";
import { router } from "expo-router";
import { useAuthStore } from "@/store/authStore";
import { useTheme } from "@/constants/ThemeContext";

const { width } = Dimensions.get("window");

const H_PAD = 16;
const QA_GAP = 10;
// 3 cards visible + peek
const QA_CARD_WIDTH = (width - H_PAD * 2 - QA_GAP * 2) / 2.8;
const QA_CARD_HEIGHT = QA_CARD_WIDTH * 1.7;

const BASE_URL = "http://192.168.1.10:1337";

const NEED_CIRCLE_SIZE = 80;

interface CategoryItem {
  id: number;
  documentId: number;
  Name: string;
  order?: number;
  color?: string;
  icon?: { url: string } | null;
}

interface WellnessHomeProps {
  categories: CategoryItem[];
}

const quickActions = [
  {
    id: "1",
    title: "Find Your\nMudra",
    bg: "#FFD4C4",
    image: require("../../assets/images/tabIcons/find_your_mudra.png"),
    route: "/library",
  },
  {
    id: "2",
    title: "Calm Your System\nIn 3 Minutes",
    bg: "#E9FFDB",
    image: require("../../assets/images/tabIcons/calm_your_system.png"),
    route: null, // Add later
  },
  {
    id: "3",
    title: "Balance Your\nElements Today",
    bg: "#CBECFF",
    image: require("../../assets/images/tabIcons/balance_elements.png"),
    route: "/elementtracker",
  },
  {
    id: "4",
    title: "Shift Your\nState Now",
    bg: "#FFF6BF",
    image: require("../../assets/images/tabIcons/shift_your_state.png"),
    route: "/nidra",
  },
];

const fallbackIcons = [
  require("../../assets/images/tabIcons/stress_anxiety.png"),
  require("../../assets/images/tabIcons/sleep.png"),
  require("../../assets/images/tabIcons/Focus.png"),
  require("../../assets/images/tabIcons/Digestion.png"),
  require("../../assets/images/tabIcons/Fatigue.png"),
  require("../../assets/images/tabIcons/Grounding.png"),
];

const CATEGORY_COLORS = [
  '#F6D29C', '#D8B8F2', '#F2E7A3',
  '#BFE0F5', '#F5D3DF', '#D7EDC5',
];

function QuickActionCard({ item }: { item: typeof quickActions[0] }) {
  const { colors } = useTheme();

  const handlePress = () => {
    if (item.route) {
      router.push(item.route as any);
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.82}
      onPress={handlePress}
      style={[
        styles.qaCard,
        {
          backgroundColor: item.bg,
          width: QA_CARD_WIDTH,
          height: QA_CARD_HEIGHT,
        },
      ]}
    >
      <Image
        source={item.image}
        style={styles.qaImage}
        resizeMode="cover"
      />

      <View style={styles.qaTitleContainer}>
        <Text style={styles.qaTitle}>{item.title}</Text>
      </View>
    </TouchableOpacity>
  );
}

function NeedChip({ item, index }: { item: CategoryItem; index: number }) {
  const { isLoggedIn, token, user } = useAuthStore();
  const { colors } = useTheme();
  const [imageError, setImageError] = useState(false);

  const chipColor = CATEGORY_COLORS[index % CATEGORY_COLORS.length];
  const imageUrl = item?.icon?.url
    ? item.icon.url.startsWith("http") ? item.icon.url : `${BASE_URL}${item.icon.url}`
    : null;
  const fallbackIcon = fallbackIcons[index % fallbackIcons.length];
  const isSvg = imageUrl?.toLowerCase()?.includes(".svg");

  const handleNavigate = () => {
    const loggedIn = isLoggedIn && !!token && !!user;
    if (loggedIn) {
      router.push({ pathname: "/needdetail", params: { id: String(item?.documentId) } });
    } else {
      router.push({ pathname: "/auth/login", params: { redirect: "/needdetail", id: String(item?.documentId) } });
    }
  };

  return (
    <TouchableOpacity activeOpacity={0.8} style={styles.needWrapper} onPress={handleNavigate}>
      <View style={[styles.needCircle, { backgroundColor: chipColor }]}>
        {imageUrl && !imageError ? (
          isSvg ? (
            <SvgUri uri={imageUrl} width={48} height={48} onError={() => setImageError(true)} />
          ) : (
            <Image source={{ uri: imageUrl }} style={styles.needIcon} resizeMode="contain" onError={() => setImageError(true)} />
          )
        ) : (
          <Image source={fallbackIcon} style={styles.needIcon} resizeMode="contain" />
        )}
      </View>
      <Text style={[styles.needLabel, { color: colors.text }]} numberOfLines={2}>
        {item?.Name}
      </Text>
    </TouchableOpacity>
  );
}

export default function WellnessHome({ categories }: WellnessHomeProps) {
  const { colors } = useTheme();
const sortedCategories = useMemo(() => {
  return [...(categories || [])].sort(
    (a, b) => (a.order ?? 9999) - (b.order ?? 9999)
  );
}, [categories]);
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>

      {/* Quick Actions */}
      <Text style={[styles.sectionTitle, { color: colors.text }]}>Quick Actions</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.qaRow}
      >
        {quickActions.map((item) => (
          <QuickActionCard key={item.id} item={item} />
        ))}
      </ScrollView>

      {/* Browse by Need */}
      <View style={styles.browseHeader}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Browse by Need</Text>
        <TouchableOpacity onPress={() => router.push("/browse")}>
          <Text style={[styles.viewAll, { color: colors.primary }]}>View All ›</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tabIconsRow}
      >
      {sortedCategories.map((item, index) => (
        <NeedChip
          key={item.documentId || item.id}
          item={item}
          index={index}
        />
      ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 8,
    paddingBottom: 16,
  },

  sectionTitle: {
    fontSize: 20,
    fontFamily: 'SF-Pro-Display',
    fontWeight: '600',
    letterSpacing: -0.2,
    marginBottom: 12,
    paddingHorizontal: H_PAD,
  },

  // Quick Actions
  qaRow: {
    paddingHorizontal: H_PAD,
    gap: QA_GAP,
    paddingBottom: 4,
    paddingRight: H_PAD + 8,
  },

  qaCard: {
    borderRadius: 12,
    overflow: 'hidden',
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 6 },
      android: { elevation: 3 },
    }),
  },

  qaImage: {
    width: '100%',
    height: '62%',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },

  qaTitleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 6,
  },

  qaTitle: {
    fontSize: 12,
    fontFamily: 'SF-Pro-Display',
    fontWeight: '600',
    textAlign: 'center',
    textDecorationLine: 'underline',
    lineHeight: 17,
    color: '#0F0F0FCC',
  },

  // Browse by Need
  browseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: H_PAD,
    marginTop: 20,
    marginBottom: 0,
  },

  viewAll: {
    fontSize: 13,
    fontFamily: 'SF-Pro-Display',
    fontWeight: '500',
    marginBottom: 12,
  },

  tabIconsRow: {
    paddingHorizontal: H_PAD,
    gap: 6,
    alignItems: 'flex-start',
    paddingRight: H_PAD + 8,
  },

  needWrapper: {
    alignItems: 'center',
    width: NEED_CIRCLE_SIZE + 10,
  },

  needCircle: {
    width: NEED_CIRCLE_SIZE,
    height: NEED_CIRCLE_SIZE,
    borderRadius: NEED_CIRCLE_SIZE / 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
    overflow: 'hidden',
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.07, shadowRadius: 4 },
      android: { elevation: 2 },
    }),
  },

  needIcon: {
    width: 56,
    height: 56,
  },

  needLabel: {
    fontSize: 12,
    fontFamily: 'SF-Pro-Display',
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: 15,
    width: NEED_CIRCLE_SIZE + 10,
  },
});