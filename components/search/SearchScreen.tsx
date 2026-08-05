import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    TextInput,
    ScrollView,
    TouchableOpacity,
    Image,
} from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getSearchStyles } from '@/assets/styles/search/searchStyles';
import { useTheme } from '@/constants/ThemeContext';
import StandaloneTabBar from '@/components/home/StandaloneTabBar';
import ArrowLeft from '@/assets/icons/arrow-left.svg';
import SearchSvg from '@/assets/icons/Search.svg';
import FilterSvg from '@/assets/icons/Filter.svg';
import { Ionicons } from '@expo/vector-icons';
import LotusBlack from '@/assets/icons/LotusBlack.svg';
import FavouriteSvg from '@/assets/icons/Favourite.svg';
import SleepSvg from '@/assets/icons/sleep.svg';
import EnergySvg from '@/assets/icons/Energy.svg';
import BrainSvg from '@/assets/icons/brain.svg';
import ElementairSvg from '@/assets/icons/elementair.svg';
import MeditationSvg from '@/assets/icons/Meditation.svg';
import RightArrowSvg from '@/assets/icons/RightArrow.svg';
import ArrowLeftWhite from '@/assets/icons/arrow-left white.svg'
import LotusWhite from '@/assets/icons/LotusWhite.svg'
import FavouriteWhite from '@/assets/icons/FavouriteWhite.svg'
import SleepWhite from '@/assets/icons/SleepWhite.svg'
import EnergyWhite from '@/assets/icons/EnergyWhite.svg'
import BrainWhite from '@/assets/icons/brainWhite.svg'
import ElementairWhite from '@/assets/icons/elementairWhite.svg'
import MeditationWhite from '@/assets/icons/pranayamaWhite.svg'
import FilterWhite from '@/assets/icons/FilterWhite.svg'
import SearchWhite from '@/assets/icons/searchWhite.svg'

const RECENT = ['Anjali Mudra', 'Stress Relief', 'Yoga Nidra', 'Sleep'];


const CATEGORIES = [
    { label: 'All Mudras', icon: <LotusBlack width={22} height={22} /> },
    { label: 'Health & Wellness', icon: <FavouriteSvg width={22} height={22} /> },
    { label: 'Sleep & Relaxation', icon: <SleepSvg width={22} height={22} /> },
    { label: 'Energy & Vitality', icon: <EnergySvg width={22} height={22} /> },
    { label: 'Mind & Focus', icon: <BrainSvg width={22} height={22} /> },
    { label: 'Detox & Balance', icon: <ElementairSvg width={22} height={22} /> },
    { label: 'Yoga Nidra Sessions', icon: <MeditationSvg width={22} height={22} /> },
];

const POPULAR = [
    'Stress Relief', 'Better Sleep', 'Boost Energy',
    'Focus', 'Detox', 'Anxiety Relief', 'Digestion', 'Heart Health',
];

const TRY_SEARCHING = [
    'Mudras for anxiety',
    'Best mudras for sleep',
    'Yoga nidra for deep relaxation',
    'Mudras for digestion',
];

const FILTER_TABS = ['All', 'Mudras', 'Yoga Nidra', 'Elements', 'Ailments'];

const SUGGESTIONS = [
    'Stress relief mudras',
    'Sleep mudras',
    'Energy mudras',
    'Focus mudras',
];

export default function SearchScreen() {
    const insets = useSafeAreaInsets();
    const [query, setQuery] = useState('');
    const [recentSearches, setRecentSearches] = useState(RECENT);
    const [activeFilter, setActiveFilter] = useState('All');
    const inputRef = useRef<TextInput>(null);
    const { colors, isDark } = useTheme()
    const styles = getSearchStyles(colors)

    const isSearching = query.trim().length > 0;
    const hasResults = false; // toggle to true when results exist

  

    return (
        <View style={styles.screen}>

            {/* Header */}
            <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
                <TouchableOpacity
                    style={styles.headerBackBtn}
                    onPress={() => router.back()}
                    activeOpacity={0.7}
                >
                    {isDark ? <ArrowLeftWhite width={24} height={24} /> : <ArrowLeft width={24} height={24} />}
                </TouchableOpacity>

                <View style={styles.searchBar}>
                    {isDark ? <SearchWhite width={18} height={18} /> : <SearchSvg width={18} height={18} />}
                    <TextInput
                        ref={inputRef}
                        style={styles.searchInput}
                        placeholder="Search Mudras, Sessions, Needs..."
                        //placeholderTextColor="#0F0F0F60"
                        placeholderTextColor={colors.textMuted}
                        value={query}
                        onChangeText={setQuery}
                        autoFocus
                        returnKeyType="search"
                    />
                    {query.length > 0 && (
                        <TouchableOpacity onPress={() => setQuery('')} activeOpacity={0.7}>
                            <Ionicons name="close-circle" size={18} color={colors.textMuted} />
                        </TouchableOpacity>
                    )}
                </View>

                <TouchableOpacity style={styles.filterBtn} activeOpacity={0.7}>
                    {isDark ? <FilterWhite width={22} height={22} /> : <FilterSvg width={22} height={22} />}
                </TouchableOpacity>
            </View>

            {/* Content */}
            {!isSearching ? (
                /* ── Default state ── */
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: insets.bottom + 120 }}
                >
                    {/* Recent Searches */}
                    {recentSearches.length > 0 && (
                        <View style={styles.recentContainer}>
                            <View style={styles.sectionTitleRow}>
                                <Text style={styles.sectionTitle}>Recent Searches</Text>
                                <TouchableOpacity onPress={() => setRecentSearches([])} activeOpacity={0.7}>
                                    <Text style={styles.clearAllText}>Clear All</Text>
                                </TouchableOpacity>
                            </View>
                            <ScrollView
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={styles.recentScrollContent}
                            >
                                {recentSearches.map((item, i) => (
                                    <TouchableOpacity
                                        key={i}
                                        style={styles.recentChip}
                                        onPress={() => setQuery(item)}
                                        activeOpacity={0.7}
                                    >
                                        <Ionicons name="time-outline" size={14} color={colors.textSub} />
                                        <Text style={styles.recentChipText}>{item}</Text>
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>
                        </View>
                    )}

                    {/* Popular Searches */}
                    <View style={styles.popularContainer}>
                        <View style={styles.sectionTitleRow}>
                            <Text style={styles.sectionTitle}>Popular Searches</Text>
                        </View>
                        <View style={styles.popularWrap}>
                            {POPULAR.map((item, i) => (
                                <TouchableOpacity
                                    key={i}
                                    style={styles.popularChip}
                                    onPress={() => setQuery(item)}
                                    activeOpacity={0.7}
                                >
                                    <Text style={styles.popularChipText}>{item}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>

                    {/* Browse by Category */}
                    <View style={styles.browseContainer}>
                        <View style={styles.sectionTitleRow}>
                            <Text style={styles.sectionTitle}>Browse by Category</Text>
                        </View>
                        {CATEGORIES.map((cat, i) => (
                            <React.Fragment key={i}>
                                <TouchableOpacity style={styles.browseRow} activeOpacity={0.7}>
                                    <View style={styles.browseIconCircle}>
                                        {cat.icon}
                                    </View>
                                    <Text style={styles.browseLabel}>{cat.label}</Text>
                                    <RightArrowSvg width={16} height={16} />
                                </TouchableOpacity>
                                {i < CATEGORIES.length - 1 && <View style={styles.browseRowDivider} />}
                            </React.Fragment>
                        ))}
                    </View>

                    {/* Try Searching For */}
                    <View style={styles.tryContainer}>
                        <View style={styles.sectionTitleRow}>
                            <Text style={styles.sectionTitle}>Try searching for</Text>
                        </View>
                        <View style={styles.tryCard}>
                            {TRY_SEARCHING.map((item, i) => (
                                <React.Fragment key={i}>
                                    <TouchableOpacity
                                        style={styles.tryRow}
                                        onPress={() => setQuery(item)}
                                        activeOpacity={0.7}
                                    >
                                        {isDark ? <SearchWhite width={16} height={16} /> : <SearchSvg width={16} height={16} />}
                                        <Text style={styles.tryText}>{item}</Text>
                                    </TouchableOpacity>
                                    {i < TRY_SEARCHING.length - 1 && (
                                        <View style={styles.tryRowDivider} />
                                    )}
                                </React.Fragment>
                            ))}
                        </View>
                    </View>
                </ScrollView>
            ) : !hasResults ? (
                /* ── Empty / No results state ── */
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: insets.bottom + 120 }}
                >
                    {/* Filter tabs */}
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.filterTabsRow}
                    >
                        {FILTER_TABS.map((tab) => (
                            <TouchableOpacity
                                key={tab}
                                style={[
                                    styles.filterTab,
                                    activeFilter === tab && styles.filterTabActive,
                                ]}
                                onPress={() => setActiveFilter(tab)}
                                activeOpacity={0.7}
                            >
                                <Text style={[
                                    styles.filterTabText,
                                    activeFilter === tab && styles.filterTabTextActive,
                                ]}>
                                    {tab}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>

                    <View style={styles.emptyContainer}>
                        <Image
                            source={require('@/assets/images/Pranayama_Images/SearchEmpty.png')}
                            style={styles.emptyImage}
                            resizeMode="contain"
                        />
                        <Text style={styles.emptyTitle}>No results found</Text>
                        <Text style={styles.emptySubtitle}>
                            We couldn't find anything matching your search.
                        </Text>

                        <TouchableOpacity
                            style={styles.emptyRetryBtn}
                            onPress={() => setQuery('')}
                            activeOpacity={0.8}
                        >
                            {isDark ? <SearchWhite width={16} height={16} /> : <SearchSvg width={16} height={16} />}
                            <Text style={styles.emptyRetryText}>Try a different search</Text>
                        </TouchableOpacity>

                        <Text style={styles.emptySuggestTitle}>Search suggestions</Text>

                        {SUGGESTIONS.map((s, i) => (
                            <TouchableOpacity
                                key={i}
                                style={[
                                    styles.emptySuggestChip,
                                    i === SUGGESTIONS.length - 1 && { borderBottomWidth: 0 }
                                ]}
                                onPress={() => setQuery(s)}
                                activeOpacity={0.7}
                            >
                                {isDark ? <SearchWhite width={18} height={18} /> : <SearchSvg width={18} height={18} />}
                                <Text style={styles.emptySuggestChipText}>{s}</Text>

                            </TouchableOpacity>
                        ))}
                    </View>
                </ScrollView>
            ) : null}

            <StandaloneTabBar />
        </View>
    );
}