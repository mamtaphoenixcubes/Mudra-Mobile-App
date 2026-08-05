import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Animated,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { router } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import { useTheme } from '@/constants/ThemeContext'

const { width } = Dimensions.get("window");

type Level = "High" | "Medium" | "Low";

// ─── Vector icon component ────────────────────────────────────────────────────
const ElementIcon = ({ name, color }: { name: string; color: string }) => {
  const size = 26;
  switch (name) {
    case "Earth":
      return <MaterialCommunityIcons name="image-filter-hdr" size={size} color={color} />;
    case "Water":
      return <Ionicons name="water-outline" size={size} color={color} />;
    case "Fire":
      return <Ionicons name="flame-outline" size={size} color={color} />;
    case "Air":
      return <Feather name="wind" size={size} color={color} />;
    case "Space":
      return <MaterialCommunityIcons name="dots-circle" size={size} color={color} />;
    default:
      return null;
  }
};

// ─── Data ─────────────────────────────────────────────────────────────────────
interface ElementData {
  name: string;
  level: Level;
  bgColor: string;
  iconBg: string;
  levelColor: string;
}

const ELEMENTS: ElementData[] = [
  { name: "Earth", level: "High", bgColor: "#FFF6BF", iconBg: "#FFFFFF", levelColor: "#070707" },
  { name: "Water", level: "Low", bgColor: "#CBECFF", iconBg: "#FFFFFF", levelColor: "#070707" },
  { name: "Fire", level: "Medium", bgColor: "#FFD4C4", iconBg: "#FFFFFF", levelColor: "#070707" },
  { name: "Air", level: "High", bgColor: "#E9FFDB", iconBg: "#FFFFFF", levelColor: "#070707" },
  { name: "Space", level: "Low", bgColor: "#FFDBE7", iconBg: "#FFFFFF", levelColor: "#070707" },
];

const LEVEL_DOTS: Record<Level, boolean[]> = {
  High: [true, true, true, false],
  Medium: [true, true, false, false],
  Low: [true, false, false, false],
};

const LEVEL_DOT_COLOR: Record<Level, string> = {
  High: "#0F0F0FB2",
  Medium: "#0F0F0FB2",
  Low: "#0F0F0FB2",
};

// ─── Sub-components ───────────────────────────────────────────────────────────
function LevelDots({ level }: { level: Level }) {
  return (
    <View style={styles.dotsRow}>
      {LEVEL_DOTS[level].map((filled, i) => (
        <View
          key={i}
          style={[
            styles.dot,
            { backgroundColor: filled ? LEVEL_DOT_COLOR[level] : "#E5E7EB" },
          ]}
        />
      ))}
    </View>
  );
}

function ElementCard({ element, index }: { element: ElementData; index: number }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(24)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 480, delay: index * 90, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 480, delay: index * 90, useNativeDriver: true }),
    ]).start();
  }, []);


  return (

    <TouchableOpacity
      activeOpacity={0.85}
      onPress={() => router.push({
        pathname: '/elementdetail',
        params: { element: element.name },
      })}
    >


      <Animated.View
        style={[
          styles.card,
          { backgroundColor: element.bgColor },
          { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
        ]}
      >
        {/* Icon circle */}
        <View style={[styles.iconCircle, { backgroundColor: element.iconBg }]}>
          <ElementIcon name={element.name} color={element.levelColor} />
        </View>

        <Text style={styles.elementName}>{element.name}</Text>
        <Text style={[styles.levelText, { color: element.levelColor }]}>
          {element.level}
        </Text>
        <LevelDots level={element.level} />
      </Animated.View>

    </TouchableOpacity>
  );
}

function LegendItem({ level, description }: { level: Level; description: string }) {
   const { colors } = useTheme()
  return (
    <View style={styles.legendRow}>
      <View style={[styles.legendPill, { backgroundColor: LEVEL_DOT_COLOR[level] }]} />
      <Text style={[styles.legendLevel, { color: colors.text }]}>{level}</Text>
      <Text style={[styles.legendDesc, { color: colors.textSub }]}>- {description}</Text>
    </View>
  );
}

// ─── Main screen ──────────────────────────────────────────────────────────────
export default function ElementBalance() {
  const { colors } = useTheme()
  const headerFade = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(headerFade, { toValue: 1, duration: 700, useNativeDriver: true }).start();
  }, []);

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <Animated.View style={[styles.header, { opacity: headerFade }]}>
        <Text style={[styles.headerText, { color: colors.primary }]}>
          Track the balance of the five elements within you.
        </Text>
        <Text style={[styles.headerText, { color: colors.primary }]}>Bring awareness. Restore harmony.</Text>
      </Animated.View>

      {/* Horizontally scrollable cards */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.cardsScroll}
      >
        {ELEMENTS.map((el, i) => (
          <ElementCard key={el.name} element={el} index={i} />
        ))}
      </ScrollView>

      {/* Info box */}
      <View style={[styles.infoBox, { backgroundColor: colors.cardPurple, borderColor: colors.border }]}>
        {/* Left column */}
        <View style={styles.infoLeft}>
          <Text style={[styles.infoTitle, { color: colors.text }]}>About Element Balance</Text>
          <Text style={[styles.infoBody, { color: colors.textSub }]}>
            When elements are in balance, you feel energized, calm and aligned.
            Imbalance can show up as physical emotional or mental discomfort.
          </Text>
        </View>

        {/* Vertical divider */}
        <View style={[styles.divider, { backgroundColor: colors.dividerDark }]} />

        {/* Right column */}
        <View style={styles.infoRight}>
          <LegendItem level="High" description="Strong & in excess" />
          <LegendItem level="Medium" description="Balanced" />
          <LegendItem level="Low" description="Deficient & needs support" />
        </View>
      </View>
    </ScrollView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const CARD_WIDTH = (width - 48) / 3.2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  content: {
    paddingBottom: 10,
    paddingHorizontal: 16,
  },

  // Header
  header: {
    alignItems: "center",
    marginBottom: 28,
    paddingHorizontal: 8,
    gap: 2,
  },
  headerText: {
    fontFamily: 'SF-Pro-Display',
    fontSize: 13,
    color: "#A78BFA",
    textAlign: "center",
    fontWeight: "400",
    lineHeight: 22,
    letterSpacing: 0.1,
  },

  // Cards
  cardsScroll: {
    paddingHorizontal: 4,
    paddingBottom: 8,
    gap: 10,
  },
  card: {
    width: CARD_WIDTH,
    borderRadius: 20,
    paddingVertical: 18,
    paddingHorizontal: 10,
    alignItems: "center",
    gap: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  iconCircle: {
    width: 54,
    height: 54,
    borderRadius: 27,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  elementName: {
    fontFamily: 'SF-Pro-Display',
    fontSize: 14,
    fontWeight: "600",
    color: "#1F2937",
    letterSpacing: 0.1,
  },
  levelText: {
    fontFamily: 'SF-Pro-Display',
    fontSize: 12,
    fontWeight: "400",
  },
  dotsRow: {
    flexDirection: "row",
    gap: 4,
    marginTop: 2,
  },
  dot: {
    width: 16,
    height: 5,
    borderRadius: 3,
  },

  // Info box
  infoBox: {
    marginTop: 24,
    backgroundColor: "#F9FAFB",
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: "#F3F4F6",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
    flexDirection: "row",   // ← side-by-side
    alignItems: "center",
  },
  infoLeft: {
    flex: 1,
    paddingRight: 16,
  },
  infoTitle: {
    fontFamily: 'SF-Pro-Display',
    fontSize: 10,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 8,
  },
  infoBody: {
    fontFamily: 'SF-Pro-Display',
    fontSize: 10,
    color: "#6B7280",
    lineHeight: 20,
  },
  divider: {
    width: 1,              // ← vertical divider
    alignSelf: "stretch",
    backgroundColor: "#E5E7EB",
    marginHorizontal: 4,
  },
  infoRight: {
    width: 149,
    flexShrink: 0,
    paddingLeft: 12,
    gap: 8,
  },
  legendRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  legendPill: {
    width: 20,
    height: 10,
    borderRadius: 6,
    flexShrink: 0,
  },
  legendLevel: {
    fontFamily: 'SF-Pro-Display',
    fontSize: 10,
    fontWeight: "600",
    color: "#374151",
    width: 44,
    flexShrink: 0,
  },
  legendDesc: {
    fontFamily: 'SF-Pro-Display',
    fontSize: 10,
    color: "#6B7280",
    flexShrink: 1,
    flexWrap: "wrap",
  },
});