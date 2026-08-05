import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuthStore } from '@/store/authStore';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image,
    TouchableOpacity,
    Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/constants/ThemeContext'

import BeginnerIcon from '@/assets/icons/beginner.svg';
import SpaceIcon from '@/assets/icons/space.svg';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const CARD_WIDTH = SCREEN_WIDTH * 0.42;
const IMAGE_HEIGHT = CARD_WIDTH * 0.8;

const elementColors: Record<string, string> = {
    air: '#CBECFF',
    earth: '#E9FFDB',
    fire: '#FFDBE7',
    water: '#FFF0D9',
    space: '#EBCFFF',
};

// ────────────────────────────────────────────────────────────────
// Related Card
// ────────────────────────────────────────────────────────────────

const RelatedCard = ({
    mudra,
}: {
    mudra: any;
}) => {
    const { token, user } = useAuthStore();

    const profileDocumentId =
        user?.id ||
        user?.profileDocumentId;

    const userActivity =
        mudra?.userMudraActivities?.find(
            (activity: any) =>
                activity?.user?.documentId ===
                profileDocumentId
        );

    const isSaved =
        userActivity?.isSaved ?? false;

    const [saved, setSaved] =
        useState(isSaved);

    const [saving, setSaving] =
        useState(false);

    useEffect(() => {
        setSaved(isSaved);
    }, [isSaved]);

    const handleSaveMudra = async (
        e: any
    ) => {
        e.stopPropagation();

        if (
            !profileDocumentId ||
            saving
        ) {
            return;
        }

        const previousState = saved;

        // Update UI instantly
        setSaved(!previousState);

        try {
            setSaving(true);

            await axios.post(
                `${process.env.EXPO_PUBLIC_API_URL}/mudras/${mudra.documentId}/save`,
                {
                    profileDocumentId,
                },
                {
                    headers: token
                        ? {
                            Authorization: `Bearer ${token}`,
                        }
                        : {},
                }
            );
        } catch (error: any) {
            // rollback if API fails
            setSaved(previousState);

            console.log(
                'SAVE_MUDRA_ERROR',
                error?.response?.data ||
                error
            );
        } finally {
            setSaving(false);
        }
    };
    const router = useRouter();

    const intentions =
        mudra?.intentions?.map(
            (item: any) => item?.name
        ) || [];

    const imageUrl =
        mudra?.introCard
            ?.introCardImage?.url ||
        mudra?.image?.[0]?.url ||
        mudra?.thumbnail?.url;

    const fullImageUrl = imageUrl
        ? imageUrl.startsWith('http')
            ? imageUrl
            : `${process.env.EXPO_PUBLIC_IMAGE_API_URL}${imageUrl}`
        : null;

    const element =
        mudra?.element?.toLowerCase() ||
        'space';

    const cardColor =
        elementColors[element] ||
        '#F5F5F5';

    const LevelIcon =
        mudra?.level === 'Beginner'
            ? BeginnerIcon
            : SpaceIcon;

    return (

        <TouchableOpacity
            style={[
                styles.card,
                {
                    backgroundColor:
                        cardColor,
                },
            ]}
            activeOpacity={0.85}
            onPress={() =>
                router.push({
                    pathname:
                        '/mudradetail',
                    params: {
                        id: String(
                            mudra?.documentId ||
                            mudra?.id
                        ),
                    },
                })
            }
        >

            {/* Image */}

            <View
                style={
                    styles.imageWrapper
                }
            >

                {fullImageUrl ? (

                    <Image
                        source={{
                            uri: fullImageUrl,
                        }}
                        style={
                            styles.image
                        }
                        resizeMode="cover"
                    />

                ) : (

                    <View
                        style={[
                            styles.image,
                            {
                                justifyContent:
                                    'center',
                                alignItems:
                                    'center',
                                backgroundColor:
                                    '#F3F3F3',
                            },
                        ]}
                    >
                        <Text>
                            No Image
                        </Text>
                    </View>

                )}

                {/* Bookmark */}

                <TouchableOpacity
                    style={styles.bookmark}
                    activeOpacity={0.8}
                    onPress={handleSaveMudra}
                >
                    <Ionicons
                        name={
                            saved
                                ? 'bookmark'
                                : 'bookmark-outline'
                        }
                        size={20}
                        color={
                            saved
                                ? '#8B5CF6'
                                : '#fff'
                        }
                    />
                </TouchableOpacity>

            </View>

            {/* Name */}

            <Text
                style={
                    styles.mudraName
                }
                numberOfLines={1}
            >
                {mudra?.name}
            </Text>

            {/* Intentions */}

            {intentions.length >
                0 && (

                    <View
                        style={
                            styles.tagPill
                        }
                    >
                        <Text
                            style={
                                styles.tagText
                            }
                            numberOfLines={1}
                        >
                            {intentions.join(
                                ' • '
                            )}
                        </Text>
                    </View>

                )}

            {/* Level */}

            <View
                style={
                    styles.levelRow
                }
            >

                <LevelIcon
                    width={16}
                    height={16}
                />

                <Text
                    style={
                        styles.levelText
                    }
                >
                    {mudra?.level ||
                        'Beginner'}
                </Text>

            </View>

        </TouchableOpacity>

    );
};

// ────────────────────────────────────────────────────────────────
// Main Component
// ────────────────────────────────────────────────────────────────

export default function RelatedMudras({
    mudra,
}: {
    mudra?: any;
}) {

    const relatedMudras =
        mudra?.relatedMudrasInverse || [];

    if (
        !relatedMudras.length
    ) {
        return null;
    }
    const { colors } = useTheme();

    return (

        <View style={styles.container}>

            {/* Header */}

            <View style={styles.header}>

                <Text
                    style={[styles.sectionTitle, { color: colors.text }]}
                >
                    Related Mudras
                </Text>

                <TouchableOpacity
                    style={
                        styles.viewAllBtn
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
                            styles.viewAllArrow
                        }
                    >
                        ›
                    </Text>

                </TouchableOpacity>

            </View>

            {/* Cards */}

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={
                    false
                }
                contentContainerStyle={
                    styles.scrollContent
                }
            >

                {relatedMudras.map(
                    (
                        item: any
                    ) => (

                        <RelatedCard
                            key={
                                item.documentId ||
                                item.id
                            }
                            mudra={item}
                        />

                    )
                )}

            </ScrollView>

        </View>

    );

}

// ────────────────────────────────────────────────────────────────
// Styles
// ────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({

    container: {
        paddingTop: 20,
        gap: 14,
    },

    header: {
        flexDirection: 'row',
        justifyContent:
            'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
    },

    sectionTitle: {
        fontFamily:
            'SF-Pro-Display',
        fontWeight: '600',
        fontSize: 20,
        lineHeight: 26,
        color: '#000',
    },

    viewAllBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 2,
    },

    viewAllText: {
        fontFamily:
            'SF-Pro-Display',
        fontWeight: '500',
        fontSize: 15,
        color: '#8B5CF6',
    },

    viewAllArrow: {
        fontFamily:
            'SF-Pro-Display',
        fontWeight: '500',
        fontSize: 20,
        color: '#8B5CF6',
        lineHeight: 22,
    },

    scrollContent: {
        paddingHorizontal: 16,
        gap: 14,
        alignItems: 'flex-start',
    },

    card: {
        width: CARD_WIDTH,
        borderRadius: 14,
        padding: 8,
        gap: 8,
        overflow: 'hidden',
    },

    imageWrapper: {
        width: '100%',
        height: IMAGE_HEIGHT,
        borderRadius: 10,
        overflow: 'hidden',
    },

    image: {
        width: '100%',
        height: '100%',
    },

    bookmark: {
        position: 'absolute',
        top: 8,
        right: 8,
        width: 28,
        height: 28,
        backgroundColor:
            'rgba(0,0,0,0.3)',
        borderRadius: 6,
        alignItems: 'center',
        justifyContent: 'center',
    },

    mudraName: {
        fontFamily:
            'SF-Pro-Display',
        fontWeight: '500',
        fontSize: 16,
        lineHeight: 20,
        color: '#1A1A1A',
    },

    tagPill: {
        alignSelf: 'flex-start',
        borderRadius: 60,
        borderWidth: 0.5,
        borderColor:
            '#00000080',
        paddingHorizontal: 8,
        paddingVertical: 3,
        backgroundColor:
            '#ffffff',
    },

    tagText: {
        fontFamily:
            'SF-Pro-Display',
        fontWeight: '400',
        fontSize: 13,
        lineHeight: 15,
        color: '#333',
    },

    description: {
        fontFamily:
            'SF-Pro-Display',
        fontWeight: '400',
        fontSize: 13,
        lineHeight: 18,
        color: '#555',
    },

    levelRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        paddingHorizontal: 8,
    },

    levelText: {
        fontFamily:
            'SF-Pro-Display',
        fontWeight: '400',
        fontSize: 14,
        color: '#0F0F0F80',
    },

});