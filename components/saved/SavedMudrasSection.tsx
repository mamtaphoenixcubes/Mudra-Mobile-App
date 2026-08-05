import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { getSavedStyles } from '@/assets/styles/saved/savedStyles';
import { useTheme } from '@/constants/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import ClockSvg from '@/assets/icons/clock.svg';
import { useRouter } from 'expo-router';
import { useAuthStore } from '@/store/authStore';

const CARD_COLORS = [
  '#FFF6BF',
  '#CBECFF',
  '#E9FFDB',
  '#FFDBE7',
  '#F6D29C',
  '#D8B8F2',
];

interface SavedMudrasSectionProps {
  mudras: any[];
}

export default function SavedMudrasSection({
  mudras = [],
}: SavedMudrasSectionProps) {
  const router = useRouter();
  const { token, user } = useAuthStore();
  const profileDocumentId = user?.id;

  const [savedMudras, setSavedMudras] =
    useState(mudras);
console.log(savedMudras,"savedmudras");

  const [likingId, setLikingId] =
    useState<string | null>(null);

  const { colors } = useTheme();
  const styles = getSavedStyles(colors);

  useEffect(() => {
    setSavedMudras(mudras);
  }, [mudras]);

  const handleMudraPress = (
    mudra: any
  ) => {
    router.push({
      pathname: '/mudradetail',
      params: {
        id: String(mudra.documentId),
      },
    });
  };

  const handleToggleLike = async (
    mudra: any
  ) => {
    if (
      !profileDocumentId ||
      !mudra?.documentId ||
      likingId
    ) {
      return;
    }

    try {
      setLikingId(mudra.documentId);

      await axios.post(
        `${process.env.EXPO_PUBLIC_API_URL}/mudras/${mudra.documentId}/like`,
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

      setSavedMudras((prev) =>
        prev.map((item) => {
          if (
            item.mudra.documentId !==
            mudra.documentId
          ) {
            return item;
          }

          return {
            ...item,
            source:
              item.source === 'liked'
                ? 'saved'
                : 'liked',
          };
        })
      );
    } catch (error: any) {
      console.log(
        'LIKE_MUDRA_ERROR',
        error?.response?.data || error
      );
    } finally {
      setLikingId(null);
    }
  };

  return (
    <View
      style={{
        marginBottom: moderateScale(28),
      }}
    >
      <View style={styles.sectionHeaderRow}>
        <Text style={styles.sectionTitle}>
          Saved Mudras
        </Text>

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() =>
            router.push('/library')
          }
        >

      
        </TouchableOpacity>
      </View>

      {savedMudras.length === 0 ? (
        <View
          style={[
            styles.mudraCard,
            {
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              paddingVertical:
                moderateScale(30),
              backgroundColor:
                colors.card,
            },
          ]}
        >
          <Text
            style={[
              styles.mudraDesc,
              {
                textAlign: 'center',
                color: colors.textSub,
              },
            ]}
          >
            No saved mudras yet.
          </Text>
        </View>
      ) : (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={
            false
          }
          contentContainerStyle={
            styles.mudrasScrollContent
          }
        >
          {savedMudras.map(
            (item: any, index: number) => {
              const mudra = item.mudra;

              const playlist =
                item.playlist;
              const audio = item.audio;
              const video = item.video;
              const videoPlaylist =
                item.videoPlaylist;

              const session =
                playlist ||
                audio ||
                videoPlaylist ||
                video;

             const imageUrl =
              mudra?.thumbnail?.url
                ? `${process.env.EXPO_PUBLIC_IMAGE_API_URL}${mudra.thumbnail.url}`
                : mudra?.introCard?.introCardImage?.url
                ? `${process.env.EXPO_PUBLIC_IMAGE_API_URL}${mudra.introCard.introCardImage.url}`
                : null;

              const description =
                mudra?.introCard
                  ?.introCardText ||
                mudra?.description ||
                session?.description?.[0]
                  ?.children?.[0]?.text ||
                '';

            const duration = mudra?.duration
              ? mudra.duration
              : session?.durationInSeconds
              ? `${session.durationInSeconds} sec`
              : '5-10 min';

              return (
                <TouchableOpacity
                  key={
                    mudra.documentId
                  }
                  style={[
                    styles.mudraCard,
                    {
                      backgroundColor:
                        CARD_COLORS[
                          index %
                            CARD_COLORS.length
                        ],
                    },
                  ]}
                  activeOpacity={0.85}
                  onPress={() =>
                    handleMudraPress(
                      mudra
                    )
                  }
                >
                  <TouchableOpacity
                    style={
                      styles.mudraFavBtn
                    }
                    activeOpacity={0.7}
                    hitSlop={{
                      top: 20,
                      bottom: 20,
                      left: 20,
                      right: 20,
                    }}
                    disabled={
                      likingId ===
                      mudra.documentId
                    }
                    onPress={(e) => {
                      e.stopPropagation();
                      handleToggleLike(
                        mudra
                      );
                    }}
                  >
                    <Ionicons
                      name={
                        item.source ===
                        'liked'
                          ? 'heart'
                          : 'heart-outline'
                      }
                      size={20}
                      color={
                        item.source ===
                        'liked'
                          ? '#FF4D67'
                          : colors.textSub
                      }
                    />
                  </TouchableOpacity>

                  <View
                    style={
                      styles.mudraImageWrapper
                    }
                  >
                    <Image
                      source={
                        imageUrl
                          ? {
                              uri: imageUrl,
                            }
                          : require('@/assets/images/Pranayama_Images/GyanMudra.png')
                      }
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
                    {mudra.name}
                  </Text>

                  <Text
                    style={
                      styles.mudraDesc
                    }
                    numberOfLines={2}
                  >
                    {description}
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
                      {duration}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            }
          )}
        </ScrollView>
      )}
    </View>
  );
}

function moderateScale(
  size: number,
  factor = 0.5
) {
  const { width } =
    require('react-native').Dimensions.get(
      'window'
    );

  const s = (width / 375) * size;

  return size + (s - size) * factor;
}