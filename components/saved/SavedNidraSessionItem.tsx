import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';
import { getSavedStyles } from '@/assets/styles/saved/savedStyles';
import { useTheme } from '@/constants/ThemeContext';
import { useAuthStore } from '@/store/authStore';

interface Props {
    item: any;
    index: number;
    isLast: boolean;
    fetchSavedNidras: (profileDocumentId: string) => Promise<void>;
}
export default function SavedNidraSessionItem({
    item,
    index,
    isLast,
    fetchSavedNidras,
}: Props) {
    const { colors } = useTheme();
    const styles = getSavedStyles(colors);

    const { token, user } = useAuthStore();

    const profileDocumentId =
        user?.id || user?.documentId;

    const [saved, setSaved] = useState(item.IsSaved);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        setSaved(item.IsSaved);
    }, [item.IsSaved]);

    const handleSaveNidra = async () => {
        try {
            if (
                !profileDocumentId ||
                !item.documentId ||
                saving
            ) {
                return;
            }

            setSaving(true);

            await axios.post(
                `${process.env.EXPO_PUBLIC_API_URL}/yoga-nidras/${item.documentId}/save`,
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

            setSaved((prev) => !prev);
          if (profileDocumentId) {
    await fetchSavedNidras(profileDocumentId);
}
        } catch (error: any) {
            console.log(
                'SAVE_NIDRA_ERROR',
                error?.response?.data || error
            );
        } finally {
            setSaving(false);
        }
    };

    const media = item.media;
    const image = media?.thumbnail;

    return (
        <>
            <View style={styles.sessionRow}>
                <Image
                    source={{
                        uri: `${process.env.EXPO_PUBLIC_IMAGE_API_URL}${
                            image?.formats?.small?.url ||
                            image?.url
                        }`,
                    }}
                    style={styles.sessionImage}
                    resizeMode="cover"
                />

                <View style={styles.sessionTextBlock}>
                    <Text style={styles.sessionTitle}>
                        {media?.title}
                    </Text>

                    <View style={styles.sessionMetaRow}>
                        <Text style={styles.sessionMeta}>
                            {item.Duration
                                ? `${item.Duration} min`
                                : '--'}
                        </Text>

                        <View
                            style={styles.sessionMetaDot}
                        />

                        <Text style={styles.sessionMeta}>
                            Yoga Nidra
                        </Text>
                    </View>

                    <Text
                        style={styles.sessionDesc}
                        numberOfLines={2}
                    >
                        {media?.description?.[0]
                            ?.children?.[0]?.text ?? ''}
                    </Text>
                </View>

                <View style={styles.sessionActions}>
                    <TouchableOpacity
                        disabled={saving}
                        onPress={handleSaveNidra}
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
                                    : colors.textSub
                            }
                        />
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <Ionicons
                            name="ellipsis-vertical"
                            size={18}
                            color={colors.textSub}
                        />
                    </TouchableOpacity>
                </View>
            </View>

            {!isLast && (
                <View
                    style={styles.sessionRowDivider}
                />
            )}
        </>
    );
}