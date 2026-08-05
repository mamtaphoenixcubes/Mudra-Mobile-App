import React, { useEffect, useState, useCallback } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    RefreshControl,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CategorySelector from './Categoryselector';
import Recommendedforyou from './Recommendedforyou';
import RecentlyPlayed from './RecentlyPlayed';
import { useTheme } from '@/constants/ThemeContext';
import { useNidraStore } from '@/store/nidraStore';
import { useAuthStore } from '@/store/authStore';

const TAB_BAR_HEIGHT = 100;

export default function Nidra() {
    const insets = useSafeAreaInsets();
    const { colors } = useTheme();
 const { user } = useAuthStore();
   const [refreshing, setRefreshing] = useState(false);
       const profileDocumentId =
           user?.id ||
           user?.profileDocumentId;
           
const [selectedCategory, setSelectedCategory] = useState('all');
const [selectedSubOptions, setSelectedSubOptions] = useState<string[]>([]);

const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
const [selectedChakras, setSelectedChakras] = useState<string[]>([]);
const [selectedElements, setSelectedElements] = useState<string[]>([]);
const onRefresh = useCallback(async () => {
    setRefreshing(true);

    try {
        await Promise.all([
            fetchNidraFilters(),
            fetchMobileCategories(),
            fetchNidras({
                profileDocumentId,
                categories: selectedCategories,
                chakras: selectedChakras,
                elements: selectedElements,
            }),
            profileDocumentId
                ? fetchRecentlyPlayedNidras(profileDocumentId)
                : Promise.resolve(),
        ]);
    } catch (error) {
        console.error('Refresh failed:', error);
    } finally {
        setRefreshing(false);
    }
}, [
    profileDocumentId,
    selectedCategories,
    selectedChakras,
    selectedElements,
]);
const {
    nidras,
    filters,
    mobileCategories,
    loading,
    error,
    fetchNidras,
    fetchNidraFilters,
    fetchMobileCategories,

    recentlyPlayedNidras,
    loadingRecentlyPlayed,
    recentlyPlayedError,
    fetchRecentlyPlayedNidras,
} = useNidraStore();

useEffect(() => {
    fetchNidraFilters();        // if still needed elsewhere
    fetchMobileCategories();    // new API
}, []);
useEffect(() => {
    if (profileDocumentId) {
        fetchRecentlyPlayedNidras(profileDocumentId);
    }
}, [profileDocumentId]);

useEffect(() => {
    fetchNidras({
        profileDocumentId,
        categories: selectedCategories,
        chakras: selectedChakras,
        elements: selectedElements,
    });
}, [
    profileDocumentId,
    selectedCategories,
    selectedChakras,
    selectedElements,
]);
const handleCategorySelect = (id: string) => {
    setSelectedCategory(id);

    if (id === 'all') {
        setSelectedCategories([]);
        setSelectedChakras([]);
        setSelectedElements([]);
        setSelectedSubOptions([]);
        return;
    }

    // Opening Chakra or Elemental should NOT clear Need
    if (id === 'chakra' || id === 'elemental') {
        return;
    }

    // Need selected
    setSelectedCategories([id]);
};

const handleSubOptionSelect = (
    categoryId: string,
    options: string[]
) => {

    setSelectedSubOptions(options);

if (categoryId === 'chakra') {
    setSelectedChakras(options);
}

if (categoryId === 'elemental') {
    setSelectedElements(options);
}
};

    return (
      <ScrollView
    style={[
        styles.container,
        { backgroundColor: colors.background },
    ]}
    contentContainerStyle={{
        paddingBottom: TAB_BAR_HEIGHT + insets.bottom,
    }}
    showsVerticalScrollIndicator={false}
    refreshControl={
        <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.text}          // iOS
            colors={[colors.primary]}        // Android
            progressBackgroundColor={colors.background}
        />
    }
>
            <Text
                style={[
                    styles.pageTitle,
                    { color: colors.text },
                ]}
            >
                Yoga Nidra Library
            </Text>

     <CategorySelector
    categories={filters}
    onCategorySelect={handleCategorySelect}
    onSubOptionSelect={handleSubOptionSelect}
/>

  <Recommendedforyou
    nidras={nidras}
    loading={loading}
    error={error}
    filters={mobileCategories}
    selectedCategory={selectedCategory}
    selectedSubOptions={selectedSubOptions}
/>

            <RecentlyPlayed
    data={recentlyPlayedNidras}
    loading={loadingRecentlyPlayed}
    error={recentlyPlayedError}
/>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAFAFA',
    },
    pageTitle: {
        fontFamily: 'SF-Pro-Display',
        fontWeight: '600',
        fontSize: 20,
        textAlign: 'center',
        paddingHorizontal: 16,
        paddingTop: 8,
        marginBottom: 4,
    },
});