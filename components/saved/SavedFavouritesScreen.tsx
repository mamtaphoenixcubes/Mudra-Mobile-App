import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
// import { savedStyles as styles } from '@/assets/styles/saved/savedStyles';
import { getSavedStyles } from '@/assets/styles/saved/savedStyles'
import { useTheme } from '@/constants/ThemeContext'
import StandaloneTabBar from '@/components/home/StandaloneTabBar';
import SavedHeader from './SavedHeader';
import SavedMudrasSection from './SavedMudrasSection';
import SavedSessionsSection from './SavedSessionsSection';
import SavedNidraSection from './SavedNidraSection';
import SavedNidraSessionsSection from './SavedNidraSessionsSection';
import SavedTipBanner from './SavedTipBanner';
import FavouriteSvg from '@/assets/icons/Favourite.svg';
import MoonSvg from '@/assets/icons/Moon.svg';
import { useAuthStore } from '@/store/authStore';
import { useNidraStore } from '@/store/nidraStore';

// Set to false to see empty state
const HAS_SAVED_ITEMS = true;

export default function SavedFavouritesScreen() {
    const insets = useSafeAreaInsets();
    const [activeTab, setActiveTab] = useState<'mudras' | 'nidra'>('mudras');
    const {likedMudras,fetchLikedMudras,user} = useAuthStore();
    const {
    savedNidras,
    loadingSavedNidras,
    savedNidrasError,
    fetchSavedNidras,
} = useNidraStore();
    const { colors } = useTheme()
const styles = getSavedStyles(colors)
  const profileDocumentId = user?.id;

      useEffect(() => {
    fetchLikedMudras();
}, []);
useEffect(() => {
    if (profileDocumentId) {
        fetchSavedNidras(profileDocumentId);
    }
}, [profileDocumentId]);
console.log(savedNidras,"savedNidrassavedNidras");

const {
  libraryMudras,
  fetchLibraryMudras,
} = useAuthStore();
console.log(libraryMudras?.audioSingles,"libraryMudraslibraryMudraslibraryMudras");

useEffect(() => {
  fetchLibraryMudras();
}, []);

    const [refreshing, setRefreshing] = useState(false);

const onRefresh = useCallback(async () => {
    try {
        setRefreshing(true);
        await fetchLikedMudras();
    } catch (error) {
        console.log('Refresh error:', error);
    } finally {
        setRefreshing(false);
    }
}, [fetchLikedMudras]);



const likedItems = (likedMudras ?? []).map((mudra: any) => ({
  mudra,
  source: 'liked',
}));


const libraryItems = [
  ...(libraryMudras?.audioSingles ?? []),
  ...(libraryMudras?.audioPlaylists ?? []),
  ...(libraryMudras?.videoSingles ?? []),
  ...(libraryMudras?.videoPlaylists ?? []),
];

const allSavedItems = [...likedItems, ...libraryItems];

const uniqueSavedItems = Object.values(
  allSavedItems.reduce((acc: any, item: any) => {
    const id = item.mudra.documentId;

    if (!acc[id]) {
      acc[id] = item;
    } else {
      acc[id] = {
        ...acc[id],
        ...item,
        source: acc[id].source || item.source,
        playlist: acc[id].playlist || item.playlist,
        audio: acc[id].audio || item.audio,
      };
    }

    return acc;
  }, {})
);


    return (
        <View style={styles.screen}>
            <SavedHeader isFavourites />
           <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: insets.bottom + 120 }}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            >
                <Text style={styles.pageTitle}>Saved / Favourites</Text>

                {/* Tab Selector */}
                <View style={styles.tabContainer}>
                    <TouchableOpacity
                        style={[styles.tabItem, activeTab === 'mudras' && styles.tabItemActive]}
                        onPress={() => setActiveTab('mudras')}
                        activeOpacity={0.8}
                    >
                        <FavouriteSvg
                            width={16}
                            height={16}
                            color={activeTab === 'mudras' ? '#0F0F0F' : '#FFFFFF'}
                        />
                        <Text style={[styles.tabText, activeTab === 'mudras' && styles.tabTextActive]}>
                            Saved Mudras
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.tabItem, activeTab === 'nidra' && styles.tabItemActive]}
                        onPress={() => setActiveTab('nidra')}
                        activeOpacity={0.8}
                    >
                        <MoonSvg
                            width={16}
                            height={16}
                            color={activeTab === 'nidra' ? '#0F0F0F' : '#FFFFFF'}
                        />
                        <Text style={[styles.tabText, activeTab === 'nidra' && styles.tabTextActive]}>
                            Saved Nidra
                        </Text>
                    </TouchableOpacity>
                </View>

                <Text style={styles.subtitle}>
                    {activeTab === 'mudras'
                        ? 'All your favorite mudras and mudra sessions in one place for easy access.'
                        : 'All your favorite nidra and nidra sessions in one place for easy access.'}
                </Text>

                {activeTab === 'mudras' && (
                    <>
                        <SavedMudrasSection mudras={uniqueSavedItems} />
                        <SavedSessionsSection mudras={uniqueSavedItems}/>
                    </>
                )}

                {activeTab === 'nidra' && (
    <>
      <SavedNidraSection
    nidras={savedNidras}
    loading={loadingSavedNidras}
    error={savedNidrasError}
    fetchSavedNidras={fetchSavedNidras}
/>

       <SavedNidraSessionsSection
    nidras={savedNidras}
    loading={loadingSavedNidras}
    error={savedNidrasError}
    fetchSavedNidras={fetchSavedNidras}
/>
    </>
)}

                <SavedTipBanner />
            </ScrollView>
            <StandaloneTabBar />
        </View>
    );
}