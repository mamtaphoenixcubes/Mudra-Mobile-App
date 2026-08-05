import React, {
    useEffect,
    useState,
} from 'react';

import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Image,
} from 'react-native';

import { SvgUri } from 'react-native-svg';
import StressIcon from '@/assets/icons/stress.svg';
import SleepIcon from '@/assets/icons/sleep.svg';
import FocusIcon from '@/assets/icons/focus.svg';
import DigestionIcon from '@/assets/icons/digestion.svg';
import FatigueIcon from '@/assets/icons/fatigue.svg';
import GroundingIcon from '@/assets/icons/grounding.svg';
import { useRouter } from 'expo-router';
import { useAuthStore } from '@/store/authStore';
import { useTheme } from '@/constants/ThemeContext';

/*
|--------------------------------------------------------------------------
| BASE URL
|--------------------------------------------------------------------------
*/

const BASE_URL = process.env.EXPO_PUBLIC_IMAGE_API_URL;

const CATEGORY_COLORS = [
    '#F6D29C', // Peach
    '#D8B8F2', // Lavender
    '#F2E7A3',
    '#BFE0F5',
    '#F5D3DF',
    '#D7EDC5',
];

export default function Categories({ categories }: any) {
    const { colors } = useTheme()

    const router = useRouter();

    /*
    |--------------------------------------------------------------------------
    | AUTH STORE
    |--------------------------------------------------------------------------
    */

    const {
        isLoggedIn,
        token,
        user,
    } = useAuthStore();

    /*
    |--------------------------------------------------------------------------
    | CATEGORY STORE
    |--------------------------------------------------------------------------
    */

    /*
    |--------------------------------------------------------------------------
    | FORMAT CATEGORIES
    |--------------------------------------------------------------------------
    */

    const rawcategories = categories as any;

    const displayedcategories =
        Array.isArray(rawcategories)
            ? rawcategories
            : Array.isArray(rawcategories?.data)
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

            if (!uniqueCategoryMap.has(key)) {

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

    /*
    |--------------------------------------------------------------------------
    | CATEGORY TYPE
    |--------------------------------------------------------------------------
    */

    type DisplayCategory = {
        id?: string | number;

        documentId?: string | number;

        name: string;

        color: string;

        imageUrl?: string | null;

        FallbackIcon: React.ComponentType<{
            width: number;
            height: number;
        }>;
    };

    /*
    |--------------------------------------------------------------------------
    | MAP CATEGORY ICONS
    |--------------------------------------------------------------------------
    */

    const displayCategories: DisplayCategory[] =
        uniqueCategories.map(
            (
                c: any,
                index: number
            ) => {

                const name: string =
                    c.Name || 'Unknown';

                const lower =
                    name.toLowerCase();

                let FallbackIcon =
                    StressIcon;

                if (
                    lower.includes('sleep')
                ) {
                    FallbackIcon =
                        SleepIcon;
                } else if (
                    lower.includes('focus')
                ) {
                    FallbackIcon =
                        FocusIcon;
                } else if (
                    lower.includes('digest')
                ) {
                    FallbackIcon =
                        DigestionIcon;
                } else if (
                    lower.includes('fatigue')
                ) {
                    FallbackIcon =
                        FatigueIcon;
                } else if (
                    lower.includes('ground')
                ) {
                    FallbackIcon =
                        GroundingIcon;
                }

                const imageUrl =
                    c?.icon?.url
                        ? c.icon.url.startsWith(
                            'http'
                        )
                            ? c.icon.url
                            : `${BASE_URL}${c.icon.url}`
                        : null;

                return {
                    id: c.id,
                    documentId:
                        c.documentId,
                    name,

                    color:
                        CATEGORY_COLORS[
                        index %
                        CATEGORY_COLORS.length
                        ],

                    imageUrl,
                    FallbackIcon,
                };
            }
        );

    /*
    |--------------------------------------------------------------------------
    | HANDLE VIEW ALL
    |--------------------------------------------------------------------------
    */

    const handleViewAll = () => {

        router.push('/browse');

    };

    /*
    |--------------------------------------------------------------------------
    | HANDLE CATEGORY CLICK
    |--------------------------------------------------------------------------
    */

    const handleCategoryPress = (
        category: DisplayCategory
    ) => {

        const loggedIn =
            isLoggedIn &&
            !!token &&
            !!user;

        if (loggedIn) {

            router.push({
                pathname:
                    '/needdetail',

                params: {
                    id: String(
                        category.documentId
                    ),
                },
            });

        } else {

            router.push({
                pathname:
                    '/auth/login',

                params: {
                    redirect:
                        '/needdetail',

                    id: String(
                        category.documentId
                    ),
                },
            });

        }

    };

    /*
    |--------------------------------------------------------------------------
    | RENDER
    |--------------------------------------------------------------------------
    */

    return (

        <View style={[styles.container, { backgroundColor: colors.background }]}>

            {/* Header */}

            <View style={styles.header}>

                <View style={styles.headerLeft}>

                    <Text style={[styles.title, { color: colors.text }]}>
                        Categories
                    </Text>

                    <Text style={[styles.subtitle, { color: colors.textSub }]}>
                        (Browse by need)
                    </Text>

                </View>

                {/* VIEW ALL BUTTON */}

                <TouchableOpacity
                    style={
                        styles.viewAllButton
                    }
                    onPress={
                        handleViewAll
                    }
                >

                    <Text
                        style={
                            styles.viewAllText
                        }
                    >
                        View All
                    </Text>

                    <Text
                        style={
                            styles.arrowIcon
                        }
                    >
                        ›
                    </Text>

                </TouchableOpacity>

            </View>

            {/* Category Circles */}

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={
                    false
                }
                contentContainerStyle={
                    styles.categoriesContainer
                }
            >

                {displayCategories.map(
                    (
                        category,
                        index: number
                    ) => (

                        <CategoryCard
                            key={
                                category.id ??
                                index
                            }
                            category={
                                category
                            }
                            onPress={() =>
                                handleCategoryPress(
                                    category
                                )
                            }
                        />

                    )
                )}

            </ScrollView>

        </View>

    );
}

/*
|--------------------------------------------------------------------------
| CATEGORY CARD
|--------------------------------------------------------------------------
*/

function CategoryCard({
    category,
    onPress,
}: {
    category: any;

    onPress: () => void;
}) {

    const [imageError, setImageError] =
        useState(false);

    const isSvg =
        category?.imageUrl
            ?.toLowerCase()
            ?.includes('.svg');
             
    const { colors } = useTheme()

    return (

        <TouchableOpacity
            style={styles.categoryCard}
            onPress={onPress}
            activeOpacity={0.8}
        >

            <View
                style={[
                    styles.circleIcon,
                    {
                        backgroundColor:
                            category.color,
                    },
                ]}
            >

                {category.imageUrl &&
                    !imageError ? (

                    isSvg ? (

                        <SvgUri
                            uri={category.imageUrl}
                            width={32}
                            height={32}
                        />

                    ) : (

                        <Image
                            source={{
                                uri: category.imageUrl,
                            }}
                            style={
                                styles.remoteImage
                            }
                            resizeMode="contain"
                            onError={() => {

                                console.log(
                                    'IMAGE LOAD ERROR'
                                );

                                setImageError(
                                    true
                                );

                            }}
                        />

                    )

                ) : (

                    <category.FallbackIcon
                        width={42}
                        height={42}
                    />

                )}

            </View>

            <Text
                style={[styles.categoryText, { color: colors.text }]}
            >
                {category.name}
            </Text>

        </TouchableOpacity>

    );
}

const styles = StyleSheet.create({

    container: {
        marginTop: 8,
        marginBottom: 8,
    },

    header: {
        flexDirection: 'row',
        justifyContent:
            'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 16,
    },

    headerLeft: {
        flexDirection: 'row',
        alignItems: 'baseline',
        gap: 6,
    },

    title: {
        fontFamily:
            'SF-Pro-Display',
        fontWeight: '600',
        fontSize: 18,
        lineHeight: 25,
        color: '#000',
    },

    subtitle: {
        fontFamily:
            'SF-Pro-Display',
        fontWeight: '400',
        fontSize: 13,
        lineHeight: 18,
        color: '#888',
    },

    viewAllButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 2,
    },

    viewAllText: {
        fontFamily:
            'SF-Pro-Display',
        fontWeight: '500',
        fontSize: 14,
        color: '#8B5CF6',
    },

    arrowIcon: {
        fontFamily:
            'SF-Pro-Display',
        fontWeight: '500',
        fontSize: 18,
        color: '#8B5CF6',
        lineHeight: 20,
    },

    categoriesContainer: {
        paddingHorizontal: 16,
        gap: 14,
    },

    circleIcon: {
        width: 90,
        height: 90,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.05)',
    },

    categoryCard: {
        alignItems: 'center',
        width: 86,
    },

    remoteImage: {
        width: 56,
        height: 56,
    },

    categoryText: {
        fontFamily: 'SF-Pro-Display',
        fontWeight: '500',
        fontSize: 12,
        lineHeight: 16,
        textAlign: 'center',
        color: '#333',
        paddingHorizontal: 4,
    },

});