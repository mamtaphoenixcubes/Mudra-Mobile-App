import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
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
import AsanaSvg from '@/assets/icons/Asana.svg';
import PranayamaSvg from '@/assets/icons/Pranayama.svg';
import MeditationSvg from '@/assets/icons/Meditations.svg';
import { useAuthStore } from '@/store/authStore';
import { useNidraStore } from '@/store/nidraStore';
import EmptyState from './EmptyState';

const TAB_CONFIG = [
    { key: 'mudras', label: 'Mudras', Icon: FavouriteSvg },
    { key: 'nidra', label: 'Nidra', Icon: MoonSvg },
    { key: 'asana', label: 'Asana', Icon: AsanaSvg },
    { key: 'pranayama', label: 'Pranayama', Icon: PranayamaSvg },
    { key: 'meditation', label: 'Meditation', Icon: MeditationSvg },
] as const;

export default function SavedFavouritesScreen() {
    const insets = useSafeAreaInsets();
    const [activeTab, setActiveTab] = useState<'mudras' | 'nidra' | 'asana' | 'pranayama' | 'meditation'>('mudras');
    const { likedMudras, fetchLikedMudras, user } = useAuthStore();
    const {
        savedNidras,
        loadingSavedNidras,
        savedNidrasError,
        fetchSavedNidras,
    } = useNidraStore();
    const { colors, isDark } = useTheme();
    const styles = getSavedStyles(colors, isDark);
    const profileDocumentId = user?.id;

    useEffect(() => {
        fetchLikedMudras();
    }, []);
    useEffect(() => {
        if (profileDocumentId) {
            fetchSavedNidras(profileDocumentId);
        }
    }, [profileDocumentId]);

    const {
        libraryMudras,
        fetchLibraryMudras,
    } = useAuthStore();

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

                <View style={styles.tabContainer}>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.tabScrollContent}
                    >
                        {TAB_CONFIG.map((tab) => {
                            const selected = activeTab === tab.key;
                            //const iconColor = selected ? '#FFFFFF' : colors.textSub;
                            const iconColor = '#0F0F0F'
                            return (
                                <TouchableOpacity
                                    key={tab.key}
                                    style={styles.tabItem}
                                    onPress={() => setActiveTab(tab.key)}
                                    activeOpacity={0.8}
                                >
                                    <View style={[styles.tabIconCircle, selected && styles.tabIconCircleActive]}>
                                        <tab.Icon width={18} height={18} color={iconColor} />
                                    </View>
                                    <Text style={[styles.tabText, selected && styles.tabTextActive]} numberOfLines={1}>
                                        {tab.label}
                                    </Text>
                                </TouchableOpacity>
                            );
                        })}
                    </ScrollView>
                </View>

                <Text style={styles.subtitle}>
                    {activeTab === 'mudras' && 'All your favorite mudras and mudra sessions in one place for easy access.'}
                    {activeTab === 'nidra' && 'All your favorite nidra and nidra sessions in one place for easy access.'}
                    {activeTab === 'asana' && 'All your favorite asana practices in one place for easy access.'}
                    {activeTab === 'pranayama' && 'All your favorite pranayama sessions in one place for easy access.'}
                    {activeTab === 'meditation' && 'All your favorite meditation sessions in one place for easy access.'}
                </Text>

                {activeTab === 'mudras' && (

                    uniqueSavedItems.length > 0 ? (
                        <>

                            <SavedMudrasSection mudras={uniqueSavedItems} />
                            <SavedSessionsSection mudras={uniqueSavedItems} />
                        </>
                    ) : (
                        <EmptyState />
                    )
                )}

                {activeTab === 'nidra' && (

                    (savedNidras?.length ?? 0) > 0 ? (
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

                    ) : (
                        <EmptyState />
                    )
                )}

                {(activeTab === 'asana' || activeTab === 'pranayama' || activeTab === 'meditation') && (
                    <EmptyState />
                )}

                <SavedTipBanner />
            </ScrollView>
            <StandaloneTabBar />
        </View>
    );
}