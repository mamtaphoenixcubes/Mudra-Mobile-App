import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import UnwindCategorySelector from './UnwindCategorySelector';
import NightSessions from './Nightsessions';
import StandaloneTabBar from '@/components/home/StandaloneTabBar';
import SleepModeHeader from './SleepModeHeader';

export default function SleepMode() {
  const insets = useSafeAreaInsets();
  return (
    <View style={styles.container}>
      <SleepModeHeader />
      <ScrollView
        contentContainerStyle={{ paddingBottom: insets.bottom + 120 }}
        showsVerticalScrollIndicator={false}
      >
        <UnwindCategorySelector />
        <NightSessions />
      </ScrollView>
      <StandaloneTabBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F0F1A',
  },
});