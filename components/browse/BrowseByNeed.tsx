import React, {
    useEffect,
    useMemo,
    useState,
} from 'react';

import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import NeedFilters from './NeedFilters';
import NeedCard from './NeedCard';

import LotusIcon from '@/assets/icons/LotusBlack.svg';

import StandaloneTabBar from '@/components/home/StandaloneTabBar';

import { useCategoryStore } from '@/store/categoryStore';
import { useNeedsCategoryStore } from '@/store/need_categories';
import AppHeader from '@/components/common/AppHeader'
import { useTheme } from '@/constants/ThemeContext'


const PASTEL_COLORS = [
    '#F7D9A6', // Peach
    '#E8D4FF', // Lavender
    '#DFF3D8', // Mint
    '#F7E7A8', // Soft Yellow
    '#D8ECF8', // Sky Blue
    '#F9D6E5', // Pink
    '#FBE0B8', // Apricot
    '#E7D7F9', // Purple
    '#E3F4D7', // Green
    '#F5E9B5', // Cream
];

export default function BrowseByNeed() {

    const { colors } = useTheme()

    const router = useRouter();
    const insets = useSafeAreaInsets();

    const [selectedFilter, setSelectedFilter] =
        useState('All');

    const [filteredNeeds, setFilteredNeeds] =
        useState<any[]>([]);

    // ---------------- CATEGORY STORE ----------------

    const {
        categories: fetchedCategories,
        fetchCategories,
    } = useCategoryStore();

    // ---------------- NEED CATEGORY STORE ----------------

    const {
        needsCategories,
        fetchNeedsCategories,
    } = useNeedsCategoryStore();

    // ---------------- FETCH DATA ----------------

    useEffect(() => {
        fetchCategories();
        fetchNeedsCategories();
    }, [
        fetchCategories,
        fetchNeedsCategories,
    ]);

    // ---------------- ALL NEEDS ----------------

    const needs = useMemo(() => {

        const rawcategories =
            fetchedCategories as any;

        const displayedcategories =
            Array.isArray(rawcategories)
                ? rawcategories
                : Array.isArray(
                    rawcategories?.data
                )
                    ? rawcategories.data
                    : [];

        const uniqueCategoryMap =
            new Map<string, any>();

        displayedcategories.forEach(
            (category: any) => {

                const key = String(
                    category.Name ||
                    category.documentId ||
                    category.id ||
                    ''
                ).toLowerCase();

                if (
                    !uniqueCategoryMap.has(
                        key
                    )
                ) {
                    uniqueCategoryMap.set(
                        key,
                        category
                    );
                }
            }
        );

        const uniqueCategories =
            Array.from(
                uniqueCategoryMap.values()
            ).sort(
                (a: any, b: any) =>
                    (a.order ?? 0) -
                    (b.order ?? 0)
            );

        return uniqueCategories.map(
            (
                category: any,
                index: number
            ) => ({
                id: category.documentId,

                title:
                    category.Name ||
                    'Unknown',

                icon:
                    category?.icon?.url
                        ? {
                            uri:
                                category
                                    .icon?.url,
                        }
                        : LotusIcon,

                description:
                    category.shortIntro ||
                    'Explore this wellness category.',

                // Dynamic looping pastel colors
                cardColor:
                    PASTEL_COLORS[
                    index %
                    PASTEL_COLORS.length
                    ],

                recommendedMudras:
                    category?.mudras
                        ?.length > 0
                        ? category.mudras
                        : [
                            'Practice Mudra',
                        ],

                bestPairedWith:
                    category.bestPairedWith ||
                    [
                        'Breathing',
                        'Mantra',
                        'Meditation',
                    ],
            })
        );
    }, [fetchedCategories]);

    // ---------------- INITIAL DATA ----------------

    useEffect(() => {
        setFilteredNeeds(needs);
    }, [needs]);

    // ---------------- FILTER LOGIC ----------------

    useEffect(() => {

        if (
            selectedFilter === 'All'
        ) {
            setFilteredNeeds(needs);
            return;
        }

        const selectedCategory =
            needsCategories.find(
                (item: any) =>
                    item.name ===
                    selectedFilter
            );

        if (!selectedCategory) {
            setFilteredNeeds([]);
            return;
        }

        const categoryNeeds =
            selectedCategory?.needs ||
            [];

        const filtered =
            needs.filter(
                (item: any) =>
                    categoryNeeds.some(
                        (need: any) =>
                            need.documentId ===
                            item.id
                    )
            );

        setFilteredNeeds(filtered);

    }, [
        selectedFilter,
        needsCategories,
        needs,
    ]);

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>

            {/* HEADER */}

            {/* <View style={styles.header}>

                <TouchableOpacity
                    onPress={() =>
                        router.back()
                    }
                    hitSlop={8}
                >
                    <Ionicons
                        name="arrow-back"
                        size={24}
                        color="#000"
                    />
                </TouchableOpacity>

                <Text
                    style={
                        styles.headerTitle
                    }
                >
                    Browse by Need
                </Text>

                <TouchableOpacity
                    hitSlop={8}
                >
                    <Ionicons
                        name="search-outline"
                        size={24}
                        color="#000"
                    />
                </TouchableOpacity>
            </View> */}
            <AppHeader
                rightIcon={
                    <TouchableOpacity hitSlop={8}>
                        <Ionicons name="search-outline" size={24} color={colors.text} />
                    </TouchableOpacity>
                }
            />
            <Text style={[styles.headerTitle, { color: colors.text, textAlign: 'center', paddingVertical: 8 }]}>
                Browse by Need
            </Text>

            {/* SUBTITLE */}

            <View
                style={
                    styles.subtitleWrapper
                }
            >
                <Text
                    style={
                        styles.subtitle
                    }
                >
                    Explore mudras curated
                    for everyday needs.
                    {'\n'}
                    Support your body,
                    mind and emotions
                    naturally.
                </Text>
            </View>

            {/* FILTERS */}

            <NeedFilters
                active={selectedFilter}
                onSelect={(
                    item: any
                ) =>
                    setSelectedFilter(
                        item.name
                    )
                }
            />

            {/* NEED CARDS */}

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >

                {filteredNeeds.length > 0 ? (

                    filteredNeeds.map((item) => (
                        <NeedCard
                            key={item.id}
                            item={item}
                        />
                    ))

                ) : (

                    <View style={styles.emptyContainer}>

                        <Text style={styles.emptyTitle}>
                            No categories available
                        </Text>

                    </View>

                )}

                {/* BANNER */}

                <View style={styles.banner}>
                    <LotusIcon
                        width={32}
                        height={32}
                    />

                    <Text style={styles.bannerText}>
                        Listen to your body.
                        Choose what feels right
                        for you today. Small
                        gestures, big shifts.
                    </Text>
                </View>

            </ScrollView>

            <StandaloneTabBar />

        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#fff',
    },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:
            'space-between',
        paddingHorizontal: 16,
        paddingVertical: 14,
        backgroundColor: '#fff',
    },

    headerTitle: {
        fontFamily:
            'SF-Pro-Display',
        fontWeight: '700',
        fontSize: 18,
        color: '#000',
    },

    subtitleWrapper: {
        paddingHorizontal: 24,
        paddingTop: 4,
        paddingBottom: 16,
        alignItems: 'center',
    },

    subtitle: {
        fontFamily:
            'SF-Pro-Display',
        fontWeight: '400',
        fontSize: 15,
        lineHeight: 22,
        color: '#A78BFA',
        textAlign: 'center',
    },

    scrollContent: {
        paddingTop: 14,
        paddingBottom: 100,
    },

    banner: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor:
            '#9A85FE33',
        borderRadius: 12,
        marginHorizontal: 16,
        marginBottom: 12,
        paddingHorizontal: 14,
        paddingVertical: 12,
        gap: 12,
    },

    bannerText: {
        flex: 1,
        fontFamily:
            'SF-Pro-Display',
        fontWeight: '500',
        fontSize: 12,
        lineHeight: 20,
        color: '#0F0F0FCC',
    },

    emptyContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 60,
        paddingHorizontal: 24,
    },

    emptyTitle: {
        fontFamily: 'SF-Pro-Display',
        fontSize: 18,
        fontWeight: '700',
        color: '#0F0F0F',
        marginBottom: 8,
    },


});