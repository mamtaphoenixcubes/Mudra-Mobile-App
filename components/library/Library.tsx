import React, {
    useCallback,
    useEffect,
    useState,
} from 'react';

import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    RefreshControl,
} from 'react-native';

import Filters from './Filters';
import Categories from './Categories';
import AllMudras from './AllMudras';

import LotusIcon from '@/assets/icons/Lotus.svg';
import { useTheme } from '@/constants/ThemeContext'

import { useCategoryStore } from '@/store/categoryStore';
import { useMudraStore } from '@/store/mudraStore';
import { useFilterStore } from '@/store/filtersStore';
import LibrarySkeleton from '@/components/common/skeletons/LibrarySkeleton';

export default function Library() {
    const { colors, isDark } = useTheme()

    const [refreshing, setRefreshing] =
        useState(false);

    const [hasLoadedOnce, setHasLoadedOnce] =
        useState(false);

    const [selectedFilters, setSelectedFilters] =
        useState<Record<string, string>>({});

    /*
    |--------------------------------------------------------------------------
    | CATEGORY STORE
    |--------------------------------------------------------------------------
    */

    const {
        categories: fetchedCategories,
        loading: categoryLoading,
        fetchCategories,
    } = useCategoryStore();


    const {
        filters: fetchedFilters,
        loading: filterLoading,
        fetchFilters,
    } = useFilterStore();

    /*
    |--------------------------------------------------------------------------
    | MUDRA STORE
    |--------------------------------------------------------------------------
    */

    const {
        mudras: fetchedMudras,
        loading: mudraLoading,
        fetchMudras,
    } = useMudraStore();
    /*
    |--------------------------------------------------------------------------
    | INITIAL FETCH
    |--------------------------------------------------------------------------
    */

    const loadInitialData =
        useCallback(async () => {

            try {

                await Promise.all([
                    fetchCategories(),
                    fetchMudras(),
                    fetchFilters(),
                ]);

            } catch (error) {

                console.log(
                    'Initial Fetch Error:',
                    error
                );

            }
            finally {

                setHasLoadedOnce(true);

            }


        }, [
            fetchCategories,
            fetchMudras,
            fetchFilters,
        ]);

    useEffect(() => {

        loadInitialData();

    }, [loadInitialData]);

    /*
    |--------------------------------------------------------------------------
    | PULL TO REFRESH
    |--------------------------------------------------------------------------
    */

    const onRefresh = useCallback(async () => {

        try {

            setRefreshing(true);

            await Promise.all([
                fetchCategories(),
                fetchMudras(),
                fetchFilters(),
            ]);

        } catch (error) {

            console.log(
                'Refresh Error:',
                error
            );

        } finally {

            setRefreshing(false);

        }

    }, [
        fetchCategories,
        fetchMudras,
        fetchFilters,
    ]);

    const mudrasArray = (fetchedMudras as any)?.data || [];
    const filteredMudras = mudrasArray.filter(
        (mudra: any) => {

            if (
                selectedFilters.element &&
                mudra.element !==
                selectedFilters.element
            ) {
                return false;
            }

            if (
                selectedFilters.chakra &&
                mudra.chakra !==
                selectedFilters.chakra
            ) {
                return false;
            }

            if (
                selectedFilters.level &&
                mudra.level !==
                selectedFilters.level
            ) {
                return false;
            }

            if (
                selectedFilters.type &&
                mudra.type !==
                selectedFilters.type
            ) {
                return false;
            }

            if (
                selectedFilters.intention
            ) {

                const hasIntention =
                    mudra.intentions?.some(
                        (intent: any) =>
                            intent.name ===
                            selectedFilters.intention
                    );

                if (!hasIntention) {
                    return false;
                }
            }

            return true;
        }
    );

    if (!hasLoadedOnce) {
        return <LibrarySkeleton />;
    }

    return (

        <ScrollView
            style={[styles.container, { backgroundColor: colors.background }]}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={
                styles.contentContainer
            }
            refreshControl={
                <RefreshControl
                    refreshing={
                        refreshing ||
                        categoryLoading ||
                        mudraLoading ||
                        filterLoading
                    }
                     onRefresh={onRefresh}
                    tintColor={colors.primary}
                    colors={[colors.primary]}
                    progressBackgroundColor={isDark ? '#1A1A2E' : '#FFFFFF'}
                />
            }
        >
            <Text style={[styles.pageTitle, { color: colors.text }]}>Mudra Library</Text>
            <Text style={[styles.subtitle, { color: colors.primary }]}>
                Explore Mudras to support your
                mind, body, emotions and energy.
            </Text>

            <Filters
                filters={fetchedFilters}
                selectedFilters={selectedFilters}
                onFilterSelect={setSelectedFilters}
            />

            {/* PASS CATEGORIES */}
            <Categories
                categories={
                    fetchedCategories
                }
            />

            {/* PASS MUDRAS */}
            <AllMudras
                mudras={filteredMudras}
                loading={mudraLoading}
            />

            {/* ── Footer ── */}

            <View style={styles.footer}>

                <Text
                    style={styles.footerText}
                >
                    Mire mudras to support your
                    journey.
                </Text>

                <LotusIcon
                    width={44}
                    height={26}
                />

            </View>

        </ScrollView>

    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#fff',
    },

    contentContainer: {
        paddingBottom: 40,
    },

    subtitle: {
        fontFamily: 'SF-Pro-Display',
        fontWeight: '400',
        fontSize: 14,
        lineHeight: 20,
        letterSpacing: 0,
        textAlign: 'center',
        color: '#9A85FECC',
        paddingTop: 12,
        paddingHorizontal: 24,
        paddingBottom: 8,
    },

    // ── Footer ────────────────────────────────────────────────────────────────

    footer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 8,
        gap: 12,
    },

    footerText: {
        fontFamily: 'SF-Pro-Display',
        fontWeight: '400',
        fontSize: 16,
        lineHeight: 22,
        textAlign: 'center',
        color: '#9A85FECC',
        paddingHorizontal: 24,
    },
    pageTitle: {
        fontFamily: 'SF-Pro-Display',
        fontWeight: '600',
        fontSize: 20,
        color: '#0F0F0F',
        textAlign: 'center',
        paddingHorizontal: 16,
        paddingTop: 8,
        marginBottom: 4,
    },

});