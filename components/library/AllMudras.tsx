
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import AirIcon from '@/assets/icons/air.svg';
import BeginnerIcon from '@/assets/icons/beginner.svg';
import HandIcon from '@/assets/icons/hand.svg';
import EarthIcon from '@/assets/icons/earth.svg';
import SpaceIcon from '@/assets/icons/space.svg';
import WaterIcon from '@/assets/icons/water.svg';
import { useMudraStore } from '@/store/mudraStore';
import { useAuthStore } from '@/store/authStore';
import { useTheme } from '@/constants/ThemeContext'

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const IMAGE_W = SCREEN_WIDTH * 0.28;
const IMAGE_H = IMAGE_W * 1.22;

type MudraDetail = {
    name: string;
    Icon: React.ComponentType<any>;
};
interface UserMudraActivity {
    documentId: string;
    isLiked?: boolean;
    isSaved?: boolean;
    isCompleted?: boolean;
    user?: {
        documentId: string;
    };
}

type Mudra = {
    documentId: number;
    id?: number;
    name: string;
    element: string;
    level: string;
    type: string;
    userMudraActivities?: UserMudraActivity[];
    introCard?: {
        introCardText?: string;
        introCardImage?: {
            url?: string;
        };
    };

    intentions?: {
        id: number;
        name: string;
    }[];
};


const elementIconMap: Record<string, React.ComponentType<any>> = {
    air: AirIcon,
    earth: EarthIcon,
    water: WaterIcon,
    fire: SpaceIcon,
    space: SpaceIcon,
};

const elementColorMap: Record<string, string> = {
    air: '#FFDBA7',
    earth: '#EBCFFF',
    water: '#CBECFF',
    fire: '#FFDBE7',
    space: '#D8DBFF',
};
const CARD_IMAGE_PLACEHOLDER =
    require('@/assets/images/Pranayama_Images/Rectangle 34624418.png');

const MudraCard = ({
    mudra,
}: {
    mudra: Mudra;
}) => {

    const router = useRouter();
    const [saving, setSaving] = useState(false);
    const { isLoggedIn, token, user } = useAuthStore();

    const profileDocumentId =
        user?.id ||
        user?.profileDocumentId;
    const userActivity = mudra?.userMudraActivities?.find(
        (activity: any) =>
            activity?.user?.documentId === profileDocumentId
    );

    const isSaved = userActivity?.isSaved ?? false;
    const [saved, setSaved] = useState(isSaved);

    useEffect(() => {
        setSaved(isSaved);
    }, [isSaved]);
    const handleSaveMudra = async () => {
        const loggedIn =
            isLoggedIn &&
            !!token &&
            !!user;

        if (!loggedIn) {
            router.push({
                pathname: '/auth/login',
                params: {
                    redirect: '/library',
                    action: 'save',
                    mudraId: String(
                        mudra.documentId
                    ),
                },
            });

            return;
        }

        try {
            if (
                !profileDocumentId ||
                saving
            ) {
                return;
            }

            setSaving(true);

            await axios.post(
                `${process.env.EXPO_PUBLIC_API_URL}/mudras/${mudra.documentId}/save`,
                {
                    profileDocumentId,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setSaved(prev => !prev);
        } catch (error: any) {
            console.log(
                'SAVE_MUDRA_ERROR',
                error?.response?.data ||
                error
            );
        } finally {
            setSaving(false);
        }
    };

    const lowerElement =
        mudra.element?.toLowerCase() || '';

    const elementIcon =
        elementIconMap[lowerElement] ||
        SpaceIcon;

    const cardColor =
        elementColorMap[lowerElement] ||
        '#F5F5F5';

    const details: MudraDetail[] = [
        {
            name: mudra.element,
            Icon: elementIcon,
        },
        {
            name: mudra.level,
            Icon: BeginnerIcon,
        },
        {
            name: mudra.type,
            Icon: HandIcon,
        },
    ];

    const intentions = Array.isArray(
        mudra.intentions
    )
        ? mudra.intentions
            .map(
                (item: any) =>
                    item?.name
            )
            .filter(Boolean)
        : [];

    const intentionText =
        intentions.join('  •  ');

    const imageUrl =
        mudra?.introCard
            ?.introCardImage?.url;

    const description =
        mudra?.introCard
            ?.introCardText ||
        '';

    const handleMudraPress = async () => {
    try {
        // Call view API
                await axios.post(
                `${process.env.EXPO_PUBLIC_API_URL}/mudras/${mudra.documentId}/view`,
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
        console.log(
            'VIEW_MUDRA_ERROR',
            error?.response?.data || error
        );
    }

    const loggedIn =
        isLoggedIn &&
        !!token &&
        !!user;

    if (loggedIn) {
        router.push({
            pathname: '/mudradetail',
            params: {
                id: String(mudra.documentId),
            },
        });
    } else {
        router.push({
            pathname: '/auth/login',
            params: {
                redirect: '/mudradetail',
                id: String(mudra.documentId),
            },
        });
    }
};

    return (

        <TouchableOpacity
            style={[
                styles.mudraCard,
                {
                    backgroundColor:
                        cardColor,
                },
            ]}
            activeOpacity={0.85}
            onPress={
                handleMudraPress
            }
        >

            {/* Image */}

            <View
                style={
                    styles.imageContainer
                }
            >

                <Image
                    source={
                        imageUrl
                            ? {
                                uri: `${process.env.EXPO_PUBLIC_IMAGE_API_URL}${imageUrl}`,
                            }
                            : CARD_IMAGE_PLACEHOLDER
                    }
                    style={
                        styles.mudraImage
                    }
                    resizeMode="cover"
                />

            </View>

            {/* Content */}

            <View
                style={
                    styles.contentSection
                }
            >

                {/* Name */}

                <View
                    style={
                        styles.nameRow
                    }
                >

                    <Text
                        style={
                            styles.mudraName
                        }
                        numberOfLines={2}
                    >
                        {mudra.name}
                    </Text>

                    <TouchableOpacity
                        onPress={handleSaveMudra}
                        hitSlop={{
                            top: 10,
                            bottom: 10,
                            left: 10,
                            right: 10,
                        }}
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
                                    ? '#9A85FE'
                                    : '#555'
                            }
                        />
                    </TouchableOpacity>

                </View>

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
                                numberOfLines={
                                    1
                                }
                            >
                                {
                                    intentionText
                                }
                            </Text>

                        </View>

                    )}

                {/* Description */}

                <Text
                    style={
                        styles.description
                    }
                    numberOfLines={2}
                >
                    {description}
                </Text>

                {/* Details */}

                <View
                    style={
                        styles.detailsRow
                    }
                >

                    {details.map(
                        (
                            detail,
                            index
                        ) => (

                            <View
                                key={
                                    index
                                }
                                style={
                                    styles.detailItem
                                }
                            >

                                <detail.Icon
                                    width={
                                        14
                                    }
                                    height={
                                        14
                                    }
                                />

                                <Text
                                    style={
                                        styles.detailText
                                    }
                                >
                                    {
                                        detail.name
                                    }
                                </Text>

                                {index <
                                    details.length -
                                    1 && (

                                        <Text
                                            style={
                                                styles.separator
                                            }
                                        >
                                            |
                                        </Text>

                                    )}

                            </View>

                        )
                    )}

                </View>

            </View>

        </TouchableOpacity>

    );

};

// ─── All Mudras Screen ───────────────────────────────────────────────────────
export default function AllMudras({ mudras, loading }: any) {
    const { colors } = useTheme()

    const rawMudras = mudras as any;
    let displayedMudras = Array.isArray(rawMudras)
        ? rawMudras
        : Array.isArray(rawMudras?.data)
            ? rawMudras.data
            : [];

    // Filter out duplicates by name (case-insensitive)
    const seenNames = new Set<string>();
    displayedMudras = displayedMudras.filter((m: any) => {
        const name = (m?.name || m?.title || '').toString().trim().toLowerCase();
        if (!name) return false;
        if (seenNames.has(name)) return false;
        seenNames.add(name);
        return true;
    });
    const emptyMessage = loading ? 'Loading mudras...' : 'No mudras found.';



    return (
        <View style={styles.container}>

            {/* Divider */}
            <View style={[styles.divider, { backgroundColor: colors.hairlineDivider }]} />

            {/* Header */}
            <View style={styles.header}>
                <Text style={[styles.title, { color: colors.text }]}>All Mudras</Text>
                <TouchableOpacity style={styles.sortButton}>
                    <Text style={styles.sortText}>Sort by: Popular</Text>
                    <Ionicons name="chevron-down" size={14} color="#8B5CF6" />
                </TouchableOpacity>
            </View>

            {/* List */}
            <FlatList
                data={displayedMudras}
                renderItem={({ item }) => <MudraCard mudra={item} />}
                keyExtractor={(item, index) => String(item?.documentId ?? item?.id ?? index)}
                contentContainerStyle={styles.mudrasList}
                showsVerticalScrollIndicator={false}
                scrollEnabled={false}
                ListEmptyComponent={
                    <View style={styles.emptyState}>
                        <Text style={[styles.emptyText, { color: colors.textSub }]}>{emptyMessage}</Text>
                    </View>
                }
            />

        </View>
    );
}

// ─── Styles ──────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    divider: {
        width: '100%',
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#00000040',
        marginVertical: 8,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 14,
    },
    title: {
        fontFamily: 'SF-Pro-Display',
        fontWeight: '600',
        fontSize: 20,
        color: '#000',
    },
    sortButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    sortText: {
        fontFamily: 'SF-Pro-Display',
        fontWeight: '500',
        fontSize: 14,
        color: '#8B5CF6',
    },
    mudrasList: {
        paddingHorizontal: 16,
        paddingBottom: 32,
        gap: 14,
    },
    emptyState: {
        paddingTop: 40,
        alignItems: 'center',
    },
    emptyText: {
        fontFamily: 'SF-Pro-Display',
        fontWeight: '500',
        fontSize: 14,
        color: '#666',
    },

    // ── Card ──
    mudraCard: {
        width: '100%',
        borderRadius: 16,
        padding: 12,
        flexDirection: 'row',
        gap: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 6,
        elevation: 2,
    },

    // ── Image ──
    imageContainer: {
        width: IMAGE_W,
        height: IMAGE_H,
        borderRadius: 12,
        overflow: 'hidden',
        flexShrink: 0,
    },
    mudraImage: {
        width: '100%',
        height: '100%',
    },

    // ── Content ──
    contentSection: {
        flex: 1,
        justifyContent: 'space-between',
        paddingVertical: 2,
    },
    nameRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 6,
    },
    mudraName: {
        fontFamily: 'SF-Pro-Display',
        fontWeight: '500',
        fontSize: 16,
        lineHeight: 20,
        color: '#1A1A1A',
        flex: 1,
        marginRight: 6,
    },

    // ── Tag ──
    tagPill: {
        alignSelf: 'flex-start',
        backgroundColor: '#FFFFFF',
        borderRadius: 60,
        borderWidth: 0.38,
        borderColor: '#00000030',
        paddingHorizontal: 10,
        paddingVertical: 4,
        marginBottom: 8,
    },
    tagText: {
        fontFamily: 'SF-Pro-Display',
        fontWeight: '400',
        fontSize: 10,
        lineHeight: 14,
        color: '#333',
        flexShrink: 1,
    },

    // ── Description ──
    description: {
        fontFamily: 'SF-Pro-Display',
        fontWeight: '400',
        fontSize: 12,
        lineHeight: 17,
        color: '#555',
        marginBottom: 8,
    },

    // ── Details ──
    detailsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        flexShrink: 1,
        gap: 2,
    },
    detailItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 2,
        flexShrink: 1,
    },
    detailText: {
        fontFamily: 'SF-Pro-Display',
        fontWeight: '400',
        fontSize: 10,
        lineHeight: 14,
        color: '#444',
        flexShrink: 1,
    },
    separator: {
        fontSize: 10,
        color: '#bbb',
        marginHorizontal: 2,
    },
});