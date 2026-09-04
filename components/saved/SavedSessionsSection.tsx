import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import { useAuthStore } from '@/store/authStore';
import { getSavedStyles } from '@/assets/styles/saved/savedStyles';
import { useTheme } from '@/constants/ThemeContext';
import { Ionicons } from '@expo/vector-icons';

interface SavedSessionsSectionProps {
  mudras: any[];
}

export default function SavedSessionsSection({
  mudras = [],
}: SavedSessionsSectionProps) {
  const { colors, isDark } = useTheme();
  const styles = getSavedStyles(colors, isDark);

  // Support Audio, Audio Playlist, Video, Video Playlist
  const [savedSessions, setSavedSessions] = useState(mudras);

  useEffect(() => {
    setSavedSessions(mudras);
  }, [mudras]);

  const { token, user } = useAuthStore();
  const profileDocumentId = user?.id;
  const sessions = savedSessions.filter(
    (item) =>
      item.playlist ||
      item.audio ||
      item.video ||
      item.videoPlaylist
  );

  const [savingId, setSavingId] = useState<string | null>(null);

  const handleSaveMudra = async (mudraId: string) => {
    if (!profileDocumentId || savingId === mudraId) return;

    try {
      setSavingId(mudraId);

      await axios.post(
        `${process.env.EXPO_PUBLIC_API_URL}/mudras/${mudraId}/save`,
        {
          profileDocumentId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Remove from saved list after unsaving
      setSavedSessions((prev) =>
        prev.filter(
          (item) => item.mudra?.documentId !== mudraId
        )
      );
    } catch (error: any) {
      console.log(
        'SAVE_MUDRA_ERROR',
        error?.response?.data || error
      );
    } finally {
      setSavingId(null);
    }
  };

  return (
    <View style={styles.sessionsContainer}>
      <View style={styles.sectionHeaderRow}>
        <Text style={styles.sectionTitle}>
          Saved Mudra Sessions
        </Text>


      </View>

      <View style={styles.sessionsCard}>
        {sessions.length === 0 ? (
          <View
            style={{
              paddingVertical: 30,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text
              style={[
                styles.sessionDesc,
                {
                  textAlign: 'center',
                  color: colors.textSub,
                },
              ]}
            >
              No saved mudra sessions yet.
            </Text>
          </View>
        ) : (
          sessions.map((item: any, i: number) => {
            const {
              mudra,
              playlist,
              audio,
              video,
              videoPlaylist,
            } = item;

            const session =
              playlist ||
              audio ||
              videoPlaylist ||
              video;

            const type = playlist
              ? 'playlist'
              : audio
                ? 'audio'
                : videoPlaylist
                  ? 'videoPlaylist'
                  : 'video';

            const imageUrl = session?.thumbnail?.url
              ? `${process.env.EXPO_PUBLIC_IMAGE_API_URL}${session.thumbnail.url}`
              : mudra?.thumbnail?.url
                ? `${process.env.EXPO_PUBLIC_IMAGE_API_URL}${mudra.thumbnail.url}`
                : null;

            const title =
              session?.title || mudra?.name || '';

            const description =
              session?.description?.[0]?.children?.[0]
                ?.text ?? '';

            let duration = '--';

            switch (type) {
              case 'playlist':
                duration = session?.audios?.length
                  ? `${session.audios.length} Tracks`
                  : '--';
                break;

              case 'videoPlaylist':
                duration = session?.videos?.length
                  ? `${session.videos.length} Videos`
                  : '--';
                break;

              case 'audio':
              case 'video':
                duration = session?.durationInSeconds
                  ? `${Math.floor(
                    session.durationInSeconds / 60
                  )} min`
                  : '1 Track';
                break;
            }

            const mediaLabel =
              type === 'playlist'
                ? 'Mudra Playlist'
                : type === 'audio'
                  ? 'Mudra Audio'
                  : type === 'videoPlaylist'
                    ? 'Video Playlist'
                    : 'Mudra Video';

            return (
              <React.Fragment
                key={
                  session?.documentId ??
                  `${mudra?.documentId}-${i}`
                }
              >
                <View style={styles.sessionRow}>
                  <Image
                    source={
                      imageUrl
                        ? { uri: imageUrl }
                        : require('@/assets/images/Pranayama_Images/GyanMudra.png')
                    }
                    style={styles.sessionImage}
                    resizeMode="cover"
                  />

                  <View style={styles.sessionTextBlock}>
                    <Text style={styles.sessionTitle}>
                      {title}
                    </Text>

                    <View
                      style={styles.sessionMetaRow}
                    >
                      <Text
                        style={styles.sessionMeta}
                      >
                        {duration}
                      </Text>

                      <View
                        style={
                          styles.sessionMetaDot
                        }
                      />

                      <Text
                        style={styles.sessionMeta}
                      >
                        {mediaLabel}
                      </Text>
                    </View>

                    <Text
                      style={styles.sessionDesc}
                      numberOfLines={2}
                    >
                      {description}
                    </Text>
                  </View>

                  <View
                    style={styles.sessionActions}
                  >
                    <TouchableOpacity
                      disabled={savingId === mudra.documentId}
                      onPress={() =>
                        handleSaveMudra(mudra.documentId)
                      }
                    >
                      <Ionicons
                        name="bookmark"
                        size={20}
                        color="#7C3AED"
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

                {i < sessions.length - 1 && (
                  <View
                    style={
                      styles.sessionRowDivider
                    }
                  />
                )}
              </React.Fragment>
            );
          })
        )}
      </View>
    </View>
  );
}