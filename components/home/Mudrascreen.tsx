import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useAuthStore } from '@/store/authStore';
import { useTheme } from '@/constants/ThemeContext';

const { width } = Dimensions.get('window');
const H_PAD = 16;
const ELEM_GAP = 8;
const ELEM_CIRCLE = (width * 0.55 - ELEM_GAP * 4) / 5;

const ELEMENTS = [
  { id: 'earth', label: 'Earth', bg: '#E8F5EE', border: '#6DBF8C', image: require('../../assets/images/tabIcons/earth.png') },
  { id: 'water', label: 'Water', bg: '#E3F4FB', border: '#5AADDB', image: require('../../assets/images/tabIcons/water.png') },
  { id: 'fire', label: 'Fire', bg: '#FEF3E2', border: '#F4A230', image: require('../../assets/images/tabIcons/fire.png') },
  { id: 'air', label: 'Air', bg: '#EEE9FB', border: '#9B8FD4', image: require('../../assets/images/tabIcons/air.png') },
  { id: 'space', label: 'Space', bg: '#FDE8F1', border: '#E87FAB', image: require('../../assets/images/tabIcons/space.png') },
];

interface MudraScreenProps {
  mudras: any[];
}

export default function MudraScreen({ mudras }: MudraScreenProps) {
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const router = useRouter();
  const { colors } = useTheme();
  const { isLoggedIn, token, user } = useAuthStore();

  const mudra = mudras?.[0];
  const mudraTitle = mudra?.name || 'Mudra of the Day';
  const mudraDescription = mudra?.introCard?.introCardText || 'One gesture. One shift. One small act of self-leadership.';
  const imageUrl = mudra?.introCard?.introCardImage?.url
    ? `${process.env.EXPO_PUBLIC_IMAGE_API_URL}${mudra.introCard.introCardImage.url}`
    : null;

  const handleElementPress = (el: typeof ELEMENTS[0]) => {
    const isSelected = selectedElement === el.id;
    setSelectedElement(isSelected ? null : el.id);
    router.push({ pathname: '/elementtracker', params: { element: el.id } });
  };

  const handleExplore = () => {
  const loggedIn =
    isLoggedIn &&
    !!token &&
    !!user;

  if (!loggedIn) {
    router.push({
      pathname: '/auth/login',
      params: {
        redirect: '/mudradetail',
        id: String(
          mudra?.documentId
        ),
      },
    });

    return;
  }

  router.push({
    pathname: '/mudradetail',
    params: {
      id: String(
        mudra?.documentId
      ),
    },
  });
};

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>

      {/* ── Mudra of the Day Card ── */}
      {mudra && (
        <View style={styles.mudraCard}>
          <View style={styles.mudraContent}>
            <View style={styles.mudraImageWrapper}>
              <Image
                source={imageUrl ? { uri: imageUrl } : require('../../assets/images/tabIcons/mudra-day.png')}
                style={styles.mudraImage}
                resizeMode="cover"
              />
            </View>
            <View style={styles.mudraTextBlock}>
              <Text style={styles.mudraTitle} numberOfLines={2}>{mudraTitle}</Text>
              <Text style={styles.mudraSubtitle} numberOfLines={4}>{mudraDescription}</Text>
              <TouchableOpacity style={styles.exploreBtn} activeOpacity={0.8} onPress={handleExplore}>
                <Text style={styles.exploreBtnText}>Explore</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}

      {/* ── Element Tracker ── */}
      <View style={styles.elementSection}>

        {/* Title + Circles */}
        <View style={styles.elementTopRow}>
          <Text style={[styles.elementTitle, { color: colors.text }]}>
            Element Tracker
          </Text>
          <View style={styles.elementsRow}>
            {ELEMENTS.map((el) => {
              const isSelected = selectedElement === el.id;
              return (
                <TouchableOpacity
                  key={el.id}
                  onPress={() => handleElementPress(el)}
                  activeOpacity={0.85}
                >
                  <View style={[
                    styles.elementCircle,
                    { backgroundColor: el.bg, borderColor: el.border },
                    isSelected && styles.elementCircleSelected,
                  ]}>
                    <Image source={el.image} style={styles.elementIcon} resizeMode="contain" />
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Labels */}
        <View style={styles.elementLabelsRow}>
          {ELEMENTS.map((el) => {
            const isSelected = selectedElement === el.id;
            return (
              <Text
                key={el.id}
                style={[
                  styles.elementLabel,
                  { color: colors.textSub },
                  isSelected && { color: el.border, fontWeight: '700', textDecorationLine: 'underline' },
                ]}
              >
                {el.label}
              </Text>
            );
          })}
        </View>

        {/* Description */}
        <Text style={[styles.elementDescription, { color: colors.textSub }]}>
          See which element feels depleted or excessive today and receive curated mudras, meditations, and Yoga Nidra sessions to support balance.
        </Text>

        {/* Feedback */}
        {selectedElement && (
          <View style={[
            styles.elementFeedback,
            {
              backgroundColor: (ELEMENTS.find((e) => e.id === selectedElement)?.bg ?? '#EEE') + 'AA',
              borderColor: ELEMENTS.find((e) => e.id === selectedElement)?.border,
            },
          ]}>
            <Text style={[styles.elementFeedbackText, { color: colors.text }]}>
              {selectedElement.charAt(0).toUpperCase() + selectedElement.slice(1)}{' '}
              element selected. Your curated session is being prepareddd.
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 8,
  },

  // ── Mudra Card ──────────────────────────────────────
  mudraCard: {
    marginHorizontal: H_PAD,
    marginTop: 16,
    backgroundColor: '#FFDBA7',
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
  },
  mudraContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    gap: 14,
  },
  mudraImageWrapper: {
    width: width * 0.36,
    height: width * 0.36,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: 'rgba(255,255,255,0.4)',
    flexShrink: 0,
  },
  mudraImage: {
    width: '100%',
    height: '100%',
  },
  mudraTextBlock: {
    flex: 1,
    gap: 6,
  },
  mudraTitle: {
    fontSize: 16,
    fontFamily: 'SF-Pro-Display',
    fontWeight: '500',
    color: '#1A1A1A',
    lineHeight: 22,
  },
  mudraSubtitle: {
    fontSize: 12,
    fontFamily: 'SF-Pro-Display',
    fontWeight: '400',
    color: 'rgba(0,0,0,0.5)',
    lineHeight: 17,
  },
  exploreBtn: {
    alignSelf: 'flex-start',
    marginTop: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 3,
    paddingHorizontal: 16,
    paddingVertical: 7,
  },
  exploreBtnText: {
    fontSize: 12,
    fontFamily: 'SF-Pro-Display',
    fontWeight: '500',
    color: '#000000',
    textDecorationLine: 'underline',
  },

  // ── Element Section ─────────────────────────────────
  elementSection: {
    marginHorizontal: H_PAD,
    marginTop: 20,
    marginBottom: 16,
  },
  elementTopRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  elementTitle: {
    fontSize: 20,
    fontFamily: 'SF-Pro-Display',
    fontWeight: '600',
    flex: 1,
    marginRight: 8,
  },
  elementsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: ELEM_GAP,
    flexShrink: 0,
  },
  elementCircle: {
    width: ELEM_CIRCLE,
    height: ELEM_CIRCLE,
    borderRadius: ELEM_CIRCLE / 2,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  elementCircleSelected: {
    borderWidth: 2.5,
    transform: [{ scale: 1.08 }],
  },
  elementIcon: {
    width: ELEM_CIRCLE * 0.6,
    height: ELEM_CIRCLE * 0.6,
  },
  elementLabelsRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: ELEM_GAP,
    marginTop: -6,
    marginBottom: 10,
  },
  elementLabel: {
    fontSize: 10,
    fontFamily: 'SF-Pro-Display',
    fontWeight: '500',
    width: ELEM_CIRCLE,
    textAlign: 'center',
  },
  elementDescription: {
    fontSize: 13,
    fontFamily: 'SF-Pro-Display',
    fontWeight: '400',
    lineHeight: 20,
    marginBottom: 12,
  },
  elementFeedback: {
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
  },
  elementFeedbackText: {
    fontSize: 13,
    fontFamily: 'SF-Pro-Display',
    fontWeight: '400',
    textAlign: 'center',
  },
});