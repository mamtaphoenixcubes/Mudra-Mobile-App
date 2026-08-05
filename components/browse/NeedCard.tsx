import React, { useState } from 'react';

import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
} from 'react-native';

import { SvgUri } from 'react-native-svg';

import BrainIcon from '@/assets/icons/brain.svg';
import MudraDocIcon from '@/assets/icons/mudra-doc.svg';
import PranayamaIcon from '@/assets/icons/pranayama.svg';
import MantraIcon from '@/assets/icons/mantra.svg';
import SleepMoonIcon from '@/assets/icons/nidra.svg';

import { Ionicons } from '@expo/vector-icons';

import { router } from 'expo-router';

import { useAuthStore } from '@/store/authStore';

/*
|--------------------------------------------------------------------------
| BASE URL
|--------------------------------------------------------------------------
*/

const BASE_URL = process.env.EXPO_PUBLIC_IMAGE_API_URL;

interface NeedCardProps {
    item: any;
}

export default function NeedCard({
    item,
}: NeedCardProps) {

    const [expanded, setExpanded] =
        useState(false);

    const [imageError, setImageError] =
        useState(false);

    const {
        isLoggedIn,
        token,
        user,
    } = useAuthStore();

    /*
    |--------------------------------------------------------------------------
    | SAFE IMAGE URL
    |--------------------------------------------------------------------------
    */

    const imageUrl =
        item?.icon?.uri
            ? item.icon.uri.startsWith(
                  'http'
              )
                ? item.icon.uri
                : `${BASE_URL}${item.icon.uri}`
            : item?.icon?.url
            ? item.icon.url.startsWith(
                  'http'
              )
                ? item.icon.url
                : `${BASE_URL}${item.icon.url}`
            : null;

    const isSvg =
        imageUrl
            ?.toLowerCase()
            ?.includes('.svg');

    /*
    |--------------------------------------------------------------------------
    | NAVIGATE
    |--------------------------------------------------------------------------
    */

    const handleNavigate = () => {

        const loggedIn =
            isLoggedIn &&
            !!token &&
            !!user;

        if (loggedIn) {

            router.push({
                pathname:
                    '/needdetail',

                params: {
                    id: item?.id,
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
                        item?.id
                    ),
                },
            });

        }

    };

    /*
    |--------------------------------------------------------------------------
    | ICON MAP
    |--------------------------------------------------------------------------
    */

    const iconMap: any = {
        pranayama:
            PranayamaIcon,

        breathing:
            PranayamaIcon,

        mantra: MantraIcon,

        meditation:
            SleepMoonIcon,

        nidra:
            SleepMoonIcon,

        sleep:
            SleepMoonIcon,
    };

    return (

        <View
            style={[
                styles.card,
                {
                    backgroundColor:
                        item?.cardColor ||
                        '#F5F5F5',
                },
            ]}
        >

            {/* ── Top Row ── */}

            <TouchableOpacity
                style={
                    styles.collapsedRow
                }
                onPress={() =>
                    setExpanded(
                        !expanded
                    )
                }
                activeOpacity={0.85}
            >

                {/* ICON */}

                <View
                    style={
                        styles.iconCircle
                    }
                >

                    {imageUrl &&
                    !imageError ? (

                        isSvg ? (

                            <SvgUri
                                uri={
                                    imageUrl
                                }
                                width={42}
                                height={42}
                                onError={() => {

                                    console.log(
                                        'SVG LOAD ERROR'
                                    );

                                    setImageError(
                                        true
                                    );

                                }}
                            />

                        ) : (

                            <Image
                                source={{
                                    uri: imageUrl,
                                }}
                                style={
                                    styles.dynamicIcon
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

                        <BrainIcon
                            width={42}
                            height={42}
                        />

                    )}

                </View>

                {/* TITLE + DESCRIPTION */}

                <View
                    style={
                        styles.titleBlock
                    }
                >

                    <Text
                        style={styles.title}
                    >
                        {item?.title}
                    </Text>

                    <Text
                        style={
                            styles.description
                        }
                        numberOfLines={
                            expanded
                                ? 3
                                : 1
                        }
                    >
                        {
                            item?.description
                        }
                    </Text>

                </View>

                {/* ARROW */}

                <TouchableOpacity
                    onPress={
                        handleNavigate
                    }
                    hitSlop={{
                        top: 10,
                        bottom: 10,
                        left: 10,
                        right: 10,
                    }}
                    activeOpacity={0.7}
                >

                    <Ionicons
                        name="chevron-forward"
                        size={20}
                        color="#1A1A1A"
                    />

                </TouchableOpacity>

            </TouchableOpacity>

            {/* ── Expanded Section ── */}

         {/* ── Expanded Section ── */}

{expanded && (

    <View
        style={
            styles.expandedContent
        }
    >

        <View
            style={
                styles.horizontalDivider
            }
        />

        <View
            style={
                styles.expandedRow
            }
        >

            {/* Recommended Mudras */}

            <View
                style={
                    styles.expandedSection
                }
            >

                <Text
                    style={
                        styles.sectionLabel
                    }
                >
                    Recommended Mudras
                </Text>

                {item?.recommendedMudras
                    ?.length > 0 ? (

                    item.recommendedMudras.map(
                        (
                            mudra: any,
                            i: number
                        ) => {

                            const mudraText =
                                typeof mudra ===
                                'string'
                                    ? mudra
                                    : mudra?.name ||
                                      '';

                            return (

                                <View
                                    key={i}
                                    style={
                                        styles.listRow
                                    }
                                >

                                    <MudraDocIcon
                                        width={
                                            15
                                        }
                                        height={
                                            15
                                        }
                                    />

                                    <Text
                                        style={
                                            styles.listText
                                        }
                                    >
                                        {
                                            mudraText
                                        }
                                    </Text>

                                </View>

                            );

                        }
                    )

                ) : (

                    <Text
                        style={
                            styles.listText
                        }
                    >
                        No mudras available
                    </Text>

                )}

            </View>

            {/* Divider */}

            <View
                style={
                    styles.verticalDivider
                }
            />

            {/* Best Paired With */}

            <View
                style={
                    styles.expandedSection
                }
            >

                <Text
                    style={
                        styles.sectionLabel
                    }
                >
                    Best paired with
                </Text>

                {item?.bestPairedWith
                    ?.length > 0 ? (

                    item.bestPairedWith.map(
                        (
                            paired: any,
                            i: number
                        ) => {

                            const pairedText =
                                typeof paired ===
                                'string'
                                    ? paired
                                    : paired?.shortText ||
                                      '';

                            const lowerText =
                                pairedText.toLowerCase();

                            let PairIcon =
                                SleepMoonIcon;

                            Object.keys(
                                iconMap
                            ).forEach(
                                (
                                    key
                                ) => {

                                    if (
                                        lowerText.includes(
                                            key
                                        )
                                    ) {

                                        PairIcon =
                                            iconMap[
                                                key
                                            ];

                                    }

                                }
                            );

                            return (

                                <View
                                    key={i}
                                    style={
                                        styles.listRow
                                    }
                                >

                                    <PairIcon
                                        width={
                                            15
                                        }
                                        height={
                                            15
                                        }
                                    />

                                    <Text
                                        style={
                                            styles.listText
                                        }
                                    >
                                        {
                                            pairedText
                                        }
                                    </Text>

                                </View>

                            );

                        }
                    )

                ) : (

                    <Text
                        style={
                            styles.listText
                        }
                    >
                        No recommendations
                    </Text>

                )}

            </View>

        </View>

    </View>

)}

        </View>

    );
}

const styles = StyleSheet.create({

    card: {
        marginHorizontal: 16,
        marginBottom: 14,
        borderRadius: 12,
        overflow: 'hidden',
    },

    collapsedRow: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 14,
        gap: 12,
        minHeight: 76,
    },

    iconCircle: {
        width: 58,
        height: 58,
        borderRadius: 29,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        overflow: 'hidden',
    },

    dynamicIcon: {
        width: 42,
        height: 42,
    },

    titleBlock: {
        flex: 1,
        gap: 4,
    },

    title: {
        fontFamily:
            'SF-Pro-Display',
        fontWeight: '500',
        fontSize: 17,
        color: '#1A1A1A',
        lineHeight: 22,
    },

    description: {
        fontFamily:
            'SF-Pro-Display',
        fontWeight: '400',
        fontSize: 13,
        color: '#3A3A3A',
        lineHeight: 18,
    },

    expandedContent: {
        paddingHorizontal: 14,
        paddingBottom: 18,
    },

    horizontalDivider: {
        height: 0.5,
        backgroundColor:
            'rgba(0,0,0,0.15)',
        marginBottom: 14,
    },

    expandedRow: {
        flexDirection: 'row',
        gap: 10,
    },

    expandedSection: {
        flex: 1,
        gap: 8,
    },

    verticalDivider: {
        width: 0.5,
        backgroundColor:
            'rgba(0,0,0,0.15)',
    },

    sectionLabel: {
        fontFamily:
            'SF-Pro-Display',
        fontWeight: '500',
        fontSize: 13,
        color: '#1A1A1A',
        marginBottom: 4,
    },

    listRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },

    listText: {
        fontFamily:
            'SF-Pro-Display',
        fontWeight: '400',
        fontSize: 13,
        color: '#2A2A2A',
        flexShrink: 1,
        lineHeight: 18,
    },

});