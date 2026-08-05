import React, { useCallback, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, RefreshControl } from 'react-native';
import Home from './Home';
import WellnessHome from './WellnessHome';
import MudraScreen from './Mudrascreen';
import SleepModeCard from './Sleepmodecard';
import { useMoodStore } from '@/store/moodsStore';
import { useCategoryStore } from '@/store/categoryStore';
import { useMudraStore } from '@/store/mudraStore';
import { useTheme } from '@/constants/ThemeContext';

export default function MainHome() {
  const { colors } = useTheme()

  const [refreshing, setRefreshing] = useState(false);

  const { moods, loading: moodsLoading, error, fetchMoods } = useMoodStore();
  const { mudras: fetchedMudras, loading: mudraLoading, fetchMudras } = useMudraStore();
  const { categories: fetchedCategories, loading: categoryLoading, fetchCategories } = useCategoryStore();

  const loadInitialData = useCallback(async () => {
    try {
      await Promise.all([fetchMoods(), fetchCategories(), fetchMudras()]);
    } catch (error) {
      console.log('Initial Fetch Error:', error);
    }
  }, [fetchMoods, fetchCategories, fetchMudras]);

  useEffect(() => {
    loadInitialData();
  }, [loadInitialData]);

  const onRefresh = useCallback(async () => {
    try {
      setRefreshing(true);
      await Promise.all([fetchMoods(), fetchCategories(), fetchMudras()]);
    } catch (error) {
      console.log('Refresh Error:', error);
    } finally {
      setRefreshing(false);
    }
  }, [fetchMoods, fetchCategories, fetchMudras]);

  const mudrasArray = (fetchedMudras as any)?.data || [];
  const mudraOfTheDay = mudrasArray
    ? mudrasArray.filter((mudra: any) => mudra?.isMudraOfDay === true)
    : [];

  return (
    <ScrollView
      style={[styles.scroll, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={refreshing || moodsLoading || categoryLoading || mudraLoading}
          onRefresh={onRefresh}
          tintColor="#8B7CF6"
        />
      }
    >
      <Home moods={moods} loading={moodsLoading} error={error} />
      <WellnessHome categories={fetchedCategories} />
      <MudraScreen mudras={mudraOfTheDay} />
      <SleepModeCard />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  content: {
    paddingBottom: 100,
  },
});