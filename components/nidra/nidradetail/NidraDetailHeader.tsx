import React, { useState } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Alert,
    Share,
} from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import axios from 'axios';

import { getNidraDetailStyles } from '@/assets/styles/nidradetail/nidraDetailStyles';
import { useTheme } from '@/constants/ThemeContext';

import { useAuthStore } from '@/store/authStore';

import ArrowLeft from '@/assets/icons/arrow-left.svg';
import FavouriteSvg from '@/assets/icons/Favourite.svg';
import ShareSvg from '@/assets/icons/share.svg';

import ArrowLeftWhite from '@/assets/icons/arrow-left white.svg';
import FavouriteWhite from '@/assets/icons/FavouriteWhite.svg';
import ShareWhite from '@/assets/icons/shareWhite.svg';
import FavouriteFilled from '@/assets/icons/FavouriteFilled.svg';

interface Props {
    nidra: any;
}

export default function NidraDetailHeader({ nidra }: Props) {
    const insets = useSafeAreaInsets();
    const { colors, isDark } = useTheme();
    const styles = getNidraDetailStyles(colors);

    const { token, user } = useAuthStore();

    const profileDocumentId =
        user?.id ||
        user?.profileDocumentId;

    const [liked, setLiked] = useState(
        nidra?.userActivity?.IsLiked ?? false
    );

    const handleLike = async () => {
        if (!token) {
            Alert.alert('Login Required', 'Please login first.');
            return;
        }

        try {
            await axios.post(
                `${process.env.EXPO_PUBLIC_API_URL}/yoga-nidras/${nidra.documentId}/like`,
                {
                    profileDocumentId,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setLiked((prev) => !prev);
        } catch (error) {
            console.log(error);
            Alert.alert('Error', 'Unable to update like.');
        }
    };

    const handleShare = async () => {
        try {
            await Share.share({
                message: `${nidra.title}\n\nCheck out this Yoga Nidra.`,
            });

            await axios.post(
                `${process.env.EXPO_PUBLIC_API_URL}/yoga-nidras/${nidra.documentId}/share`,
                {
                    profileDocumentId,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <View
            style={[
                styles.header,
                {
                    paddingTop: insets.top + 8,
                },
            ]}
        >
            <TouchableOpacity
                style={styles.headerIconBtn}
                onPress={() => router.back()}
            >
                {isDark ? (
                    <ArrowLeftWhite width={24} height={24} />
                ) : (
                    <ArrowLeft width={24} height={24} />
                )}
            </TouchableOpacity>

            <View style={styles.headerCenter}>
                <Image
                    source={require('@/assets/images/Pranayama_Images/MudraImage.png')}
                    style={styles.headerLogo}
                    resizeMode="contain"
                />
                <Text style={styles.headerTitle}>MUDRAS</Text>
            </View>

            <View style={styles.headerRightRow}>
                {/* <TouchableOpacity
                    style={styles.headerIconBtn}
                    onPress={handleLike}
                >
                    <FavouriteSvg
                        width={22}
                        height={22}
                        fill={liked ? '#FF3B30' : 'none'}
                        stroke={liked ? '#FF3B30' : 'none'}
                    />
                </TouchableOpacity> */}
                <TouchableOpacity
                    style={styles.headerIconBtn}
                    onPress={handleLike}
                >
                    {liked ? (
                        <FavouriteFilled width={28} height={28} />
                    ) : isDark ? (
                        <FavouriteWhite width={22} height={22} />
                    ) : (
                        <FavouriteSvg width={22} height={22} />
                    )}
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.headerIconBtn}
                    onPress={handleShare}
                >
                    {isDark ? (
                        <ShareWhite width={22} height={22} />
                    ) : (
                        <ShareSvg width={22} height={22} />
                    )}
                </TouchableOpacity>
            </View>
        </View>
    );
}