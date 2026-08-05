import React, { useEffect } from 'react';

import {
  View,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';

import { useLocalSearchParams } from 'expo-router';

// import { needDetailStyles as styles } from '@/assets/styles/browse/needDetailStyles';
import { getNeedDetailStyles } from '@/assets/styles/browse/needDetailStyles'
import { useTheme } from '@/constants/ThemeContext'

import StandaloneTabBar from '@/components/home/StandaloneTabBar';

import NeedDetailHeader from './NeedDetailHeader';
import NeedDetailHero from './NeedDetailHero';
import NeedDetailInsight from './NeedDetailInsight';
import NeedDetailBenefits from './NeedDetailBenefits';
import NeedDetailAbout from './NeedDetailAbout';
import NeedDetailMudras from './NeedDetailMudras';
import NeedDetailGuided from './NeedDetailGuided';

import { useCategoryStore } from '@/store/categoryStore';



interface NeedMeta {
  insight: string;

  aboutText: string;

  howItHelpsText: string;

  followers: string;
}

export default function NeedDetails() {
  const params: any = useLocalSearchParams();
  const { colors } = useTheme()
const styles = getNeedDetailStyles(colors)

  const {
    selectedCategory,
    fetchCategoryById,
    loading,
  } = useCategoryStore();

  /*
  |--------------------------------------------------------------------------
  | FETCH CATEGORY BY ID
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    if (params?.id) {
      fetchCategoryById(params.id);
    }
  }, [params?.id]);

  const item = selectedCategory;

  console.log(item, 'gdrrrrrrrrrrrr');

  /*
  |--------------------------------------------------------------------------
  | DYNAMIC META
  |--------------------------------------------------------------------------
  */

  
      

  const meta: NeedMeta = {

    insight:
      item?.solutionCard?.solutionCardDescription ||
      'These Mudras help restore balance, improve well-being and support your overall health naturally.',

    aboutText:
      item?.about ||
      'Practicing Mudras regularly helps activate energy channels in the body and brings physical, emotional and mental balance.',

    howItHelpsText:
      item?.helpCard?.helpCardDescription ||
      'Supports natural healing, improves energy flow and promotes inner balance.',

    followers:
      item?.followersCount || '1M+',
  };

  /*
  |--------------------------------------------------------------------------
  | LOADING
  |--------------------------------------------------------------------------
  */

  if (loading) {
    return (
      <SafeAreaView
        style={[
          styles.screen,
          {
            justifyContent: 'center',
            alignItems: 'center',
          },
        ]}
      >
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  /*
  |--------------------------------------------------------------------------
  | EMPTY STATE
  |--------------------------------------------------------------------------
  */

  if (!item) {
    return null;
  }

  return (
    <View style={styles.screen}>
      <NeedDetailHeader />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <NeedDetailHero
          item={item}
        />

        <NeedDetailInsight
  text={meta.insight}
/>

        <NeedDetailBenefits
          benefits={item?.benefits || []}
        />

        <NeedDetailAbout
          needTitle={item?.Name}
          aboutText={meta.aboutText}
          howItHelpsText={meta.howItHelpsText}
           icon={item?.helpCard?.icon}
        />

        <View style={styles.divider} />

        <NeedDetailMudras
          needTitle={item?.Name}
          mudras={item?.mudras}
        />

        <NeedDetailGuided
          needTitle={item?.Name}
        />
      </ScrollView>

      <StandaloneTabBar />
    </View>
  );
}