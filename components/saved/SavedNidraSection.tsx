import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    Image,
    TouchableOpacity,
    Dimensions,
    Alert,
} from 'react-native';
import axios from 'axios';
import { useAuthStore } from '@/store/authStore';
import { getSavedStyles } from '@/assets/styles/saved/savedStyles';
import { useTheme } from '@/constants/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import ClockSvg from '@/assets/icons/clock.svg';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const moderateScale = (size: number, factor = 0.5) => {
    const s = (SCREEN_WIDTH / 375) * size;
    return size + (s - size) * factor;
};

interface Props {
    nidras: any[];
    loading?: boolean;
    error?: string | null;
    fetchSavedNidras: (profileDocumentId: string) => Promise<void>;
}

export default function SavedNidraSection({
    nidras,
    loading,
    error,
    fetchSavedNidras,
}: Props) {
    const { colors, isDark } = useTheme();
    const styles = getSavedStyles(colors, isDark);
    const { token, user } = useAuthStore();

    const profileDocumentId =
        user?.id || user?.profileDocumentId;

    const [likedMap, setLikedMap] = useState<Record<string, boolean>>({});
    useEffect(() => {
        const initialLikes: Record<string, boolean> = {};

        (nidras ?? []).forEach((item) => {
            initialLikes[item.documentId] = item?.IsLiked ?? false;
        });

        setLikedMap(initialLikes);
    }, [nidras]);
    const handleLike = async (nidra: any) => {
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

            // Optimistic UI update
            setLikedMap((prev) => ({
                ...prev,
                [nidra.documentId]: !prev[nidra.documentId],
            }));

            // Refresh saved nidras
            if (profileDocumentId) {
                await fetchSavedNidras(profileDocumentId);
            }
        } catch (error) {
            console.log(error);
            Alert.alert('Error', 'Unable to update like.');
        }
    };
    const savedNidrasList = (nidras ?? []).filter(
        (item) => item?.IsSaved && item?.NidraIntroCard
    );

    if (loading) {
        return null;
    }

    if (error) {
        return (
            <View style={{ paddingHorizontal: 16 }}>
                <Text>{error}</Text>
            </View>
        );
    }

    if (savedNidrasList.length === 0) {
        return (
            <View style={{ marginBottom: moderateScale(28) }}>
                <View style={styles.sectionHeaderRow}>
                    <Text style={styles.sectionTitle}>
                        Saved Nidra
                    </Text>

                    <TouchableOpacity activeOpacity={0.7}>
                        <Text style={styles.sectionLink}>
                            View All &gt;
                        </Text>
                    </TouchableOpacity>
                </View>

                <View
                    style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingVertical: 32,
                    }}
                >
                    <Text
                        style={{
                            color: colors.textSub,
                            fontSize: 14,
                        }}
                    >
                        No saved nidra found.
                    </Text>
                </View>
            </View>
        );
    }

    return (
        <View style={{ marginBottom: moderateScale(28) }}>
            <View style={styles.sectionHeaderRow}>
                <Text style={styles.sectionTitle}>
                    Saved Nidra
                </Text>

                <TouchableOpacity activeOpacity={0.7}>
                    <Text style={styles.sectionLink}>
                        View All &gt;
                    </Text>
                </TouchableOpacity>
            </View>

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={
                    styles.mudrasScrollContent
                }
            >
                {savedNidrasList.map((item) => {
                    const card = item.NidraIntroCard;
                    const image =
                        card?.ThumbnailImage?.[0];

                    return (
                        <TouchableOpacity
                            key={item.documentId}
                            style={[
                                styles.mudraCard,
                                {
                                    backgroundColor:
                                        '#CBECFF',
                                },
                            ]}
                            activeOpacity={0.85}
                        >
                            <TouchableOpacity
                                style={styles.mudraFavBtn}
                                activeOpacity={0.7}
                                onPress={() => handleLike(item)}
                            >
                                <Ionicons
                                    name={
                                        likedMap[item.documentId]
                                            ? 'heart'
                                            : 'heart-outline'
                                    }
                                    size={16}
                                    color={
                                        likedMap[item.documentId]
                                            ? '#FF4D67'
                                            : '#0F0F0F80'
                                    }
                                />
                            </TouchableOpacity>

                            <View
                                style={
                                    styles.mudraImageWrapper
                                }
                            >
                                <Image
                                    source={{
                                        uri: `${process.env.EXPO_PUBLIC_IMAGE_API_URL}${image?.formats
                                            ?.small
                                            ?.url ||
                                            image?.url
                                            }`,
                                    }}
                                    style={
                                        styles.mudraImage
                                    }
                                    resizeMode="cover"
                                />
                            </View>

                            <Text
                                style={
                                    styles.mudraName
                                }
                                numberOfLines={1}
                            >
                                {card?.Name}
                            </Text>

                            <Text
                                style={
                                    styles.mudraDesc
                                }
                                numberOfLines={2}
                            >
                                {
                                    card?.ShortDescription
                                }
                            </Text>

                            <View
                                style={
                                    styles.mudraTimeRow
                                }
                            >
                                <ClockSvg
                                    width={12}
                                    height={12}
                                />

                                <Text
                                    style={
                                        styles.mudraTime
                                    }
                                >
                                    <View style={styles.mudraTimeRow}>
                                        <Text style={styles.mudraTime}>
                                            {item?.Duration
                                                ? `${item.Duration} min`
                                                : '--'}
                                        </Text>
                                    </View>
                                </Text>
                            </View>
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>
        </View>
    );
}