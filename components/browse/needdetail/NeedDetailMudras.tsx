import React, { useEffect, useState } from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
// import { needDetailStyles as styles } from '@/assets/styles/browse/needDetailStyles';
import { getNeedDetailStyles } from '@/assets/styles/browse/needDetailStyles'
import { useTheme } from '@/constants/ThemeContext'
import axios from 'axios';
import { useAuthStore } from '@/store/authStore'; // adjust path

interface NeedDetailMudrasProps {
  needTitle: string;
  mudras: any[];
}

const cardColors = [
  '#CBECFF',
  '#E9FFDB',
  '#FFDBE7',
  '#FFF0D9',
];

export default function NeedDetailMudras({
  needTitle,
  mudras = [],
}: NeedDetailMudrasProps) {
  const { colors } = useTheme()
  const styles = getNeedDetailStyles(colors)

  const router = useRouter();

  const { token, user } = useAuthStore();
  const profileDocumentId = user?.id || user?.profileDocumentId;

  const [savingId, setSavingId] = useState<string | null>(null);

  const [savedMudras, setSavedMudras] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const savedMap: Record<string, boolean> = {};

    mudras.forEach((item: any) => {
      savedMap[item.documentId] =
        item.userMudraActivities?.[0]?.isSaved || false;
    });

    setSavedMudras(savedMap);
  }, [mudras]);

  const handleSaveMudra = async (mudra: any) => {
    try {
      if (!profileDocumentId || savingId === mudra.documentId) {
        return;
      }

      setSavingId(mudra.documentId);

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

      setSavedMudras(prev => ({
        ...prev,
        [mudra.documentId]: !prev[mudra.documentId],
      }));
    } catch (error: any) {
      console.log(
        'SAVE_MUDRA_ERROR',
        error?.response?.data || error
      );
    } finally {
      setSavingId(null);
    }
  };
  console.log(mudras, 'mudrasmudr1212as');

  return (
    <View style={styles.mudrasContainer}>

      {/* HEADER */}

      <View style={styles.mudrasSectionHeader}>
        <Text style={styles.mudrasSectionTitle}>
          Recommended Mudras for {needTitle}
        </Text>

        <TouchableOpacity activeOpacity={0.7}>
          <Text style={styles.mudrasViewAll}>
            View All {'>'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* MUDRAS */}

      {mudras?.map(
        (
          mudra: any,
          index: number
        ) => {

          const bgColor =
            cardColors[
            index % cardColors.length
            ];

          const intentions =
            mudra?.intentions?.map(
              (item: any) => item?.name
            ) || [];

          const imageUrl =
            mudra?.introCard
              ?.introCardImage?.url ||
            mudra?.image?.[0]?.url ||
            mudra?.thumbnail?.url;

          const description =
            mudra?.introCard
              ?.introCardText ||
            mudra?.description ||
            'Mudra Practice';

          return (
            <TouchableOpacity
              key={
                mudra?.documentId ||
                mudra?.id ||
                index
              }
              style={[
                styles.mudraCard,
                {
                  backgroundColor:
                    bgColor,
                },
              ]}
              activeOpacity={0.85}
              onPress={() =>
                router.push({
                  pathname:
                    '/mudradetail',
                  params: {
                    id: String(
                      mudra?.documentId
                    ),
                  },
                })
              }
            >

              {/* IMAGE */}

              <Image
                source={
                  imageUrl
                    ? {
                      uri: imageUrl,
                    }
                    : require('@/assets/images/Pranayama_Images/Prayer.png')
                }
                style={styles.mudraImage}
                resizeMode="cover"
              />

              {/* CONTENT */}

              <View
                style={
                  styles.mudraContent
                }
              >

                {/* NAME */}

                <Text
                  style={
                    styles.mudraName
                  }
                >
                  {mudra?.name}
                </Text>

                {/* INTENTIONS */}

                {intentions.length >
                  0 && (
                    <View
                      style={
                        styles.mudraTagsRow
                      }
                    >
                      {intentions
                        .slice(0, 3)
                        .map(
                          (
                            intention: string,
                            i: number
                          ) => (
                            <View
                              key={i}
                              style={
                                styles.mudraTag
                              }
                            >
                              <Text
                                style={
                                  styles.mudraTagText
                                }
                              >
                                {
                                  intention
                                }
                              </Text>
                            </View>
                          )
                        )}
                    </View>
                  )}

                {/* DESCRIPTION */}

                <Text
                  style={
                    styles.mudraSubtitle
                  }
                  numberOfLines={3}
                >
                  {description}
                </Text>

              </View>

              {/* RIGHT */}

              <View
                style={
                  styles.mudraRight
                }
              >

                <View
                  style={
                    styles.mudraTimeRow
                  }
                >
                  <Ionicons
                    name="time-outline"
                    size={16}
                    color="#0F0F0F80"
                  />

                  <Text
                    style={
                      styles.mudraTime
                    }
                  >
                    {mudra?.duration ||
                      '5 min'}
                  </Text>
                </View>

                <TouchableOpacity
                  onPress={() => handleSaveMudra(mudra)}
                  hitSlop={{
                    top: 10,
                    bottom: 10,
                    left: 10,
                    right: 10,
                  }}
                >
                  <Ionicons
                    name={
                      savedMudras[mudra.documentId]
                        ? 'bookmark'
                        : 'bookmark-outline'
                    }
                    size={20}
                    color={
                      savedMudras[mudra.documentId]
                        ? '#9A85FE'
                        : '#555'
                    }
                  />
                </TouchableOpacity>

              </View>

            </TouchableOpacity>
          );
        }
      )}
    </View>
  );
}