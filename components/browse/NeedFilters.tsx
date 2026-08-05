import { useNeedsCategoryStore } from '@/store/need_categories';
import React, { useEffect } from 'react';

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useTheme } from '@/constants/ThemeContext'

interface Props {
  active: string;
  onSelect: (item: any) => void;
}

export default function NeedFilters({
  active,
  onSelect,
}: Props) {
  const { colors } = useTheme()

  const {
    needsCategories,
    loading,
    fetchNeedsCategories,
  } = useNeedsCategoryStore();

  useEffect(() => {
    fetchNeedsCategories();
  }, [fetchNeedsCategories]);

  // Add static "All"
  const filters = [
    {
      name: 'All',
      documentId: 'all',
    },
    ...needsCategories,
  ];

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator
          size="small"
          color="#9A85FE"
        />
      </View>
    );
  }

  return (
    <View style={[styles.wrapper, { backgroundColor: colors.background }]}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={
          styles.scrollContent
        }
      >
        {filters.map((item: any) => {

          const isActive =
            item.name === active;

          return (
            <TouchableOpacity
              key={item.documentId}
              style={[
                styles.pill,
                isActive &&
                  styles.pillActive,
              ]}
              onPress={() =>
                onSelect(item)
              }
              activeOpacity={0.75}
            >
              <Text
                style={[styles.pillText, { color: colors.text }]}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <View style={[styles.divider, { backgroundColor: colors.dividerDark }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 8,
  },

  loaderContainer: {
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },

  scrollContent: {
    paddingHorizontal: 16,
    gap: 8,
    paddingBottom: 12,
  },

  pill: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 3,
  },

  pillText: {
    fontFamily:
      'SF-Pro-Display',
    fontWeight: '400',
    fontSize: 15,
    color: '#0F0F0F',
  },

  pillActive: {
    backgroundColor:
      '#9A85FE',
  },

  pillTextActive: {
    color: '#FFFFFF',
  },

  divider: {
    height: 0.5,
    backgroundColor:
      '#00000066',
    marginHorizontal: 16,
    marginBottom: 12,
  },
});