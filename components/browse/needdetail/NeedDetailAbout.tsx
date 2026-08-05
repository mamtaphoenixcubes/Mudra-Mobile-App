import React from 'react';

import {
  View,
  Text,
  Image,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import LotusBlack from '@/assets/icons/LotusBlack.svg';
// import { needDetailStyles as styles } from '@/assets/styles/browse/needDetailStyles';
import { getNeedDetailStyles } from '@/assets/styles/browse/needDetailStyles'
import { useTheme } from '@/constants/ThemeContext'

type Props = {
  needTitle: string;
  aboutText: string;
  howItHelpsText: string;
  icon?: any;
};

export default function NeedDetailAbout({
  needTitle,
  aboutText,
  howItHelpsText,
  icon,
}: Props) {

  const BASE_URL = process.env.EXPO_PUBLIC_IMAGE_API_URL;
  const { colors } = useTheme()
  const styles = getNeedDetailStyles(colors)

  const iconUrl =
    icon?.url?.startsWith('http')
      ? icon.url
      : `${BASE_URL}${icon?.url}`;

  return (
    <View style={styles.aboutContainer}>
      <Text style={styles.aboutTitle}>
        About {needTitle}
      </Text>

      <Text style={styles.aboutText}>
        {aboutText}
      </Text>

      <View style={styles.howItHelpsRow}>
        <View style={styles.howItHelpsIconCircle}>
          <LotusBlack width={22} height={22} />
        </View>
        <View style={styles.howItHelpsTextBlock}>
          <Text style={styles.howItHelpsTitle}>
            How it helps
          </Text>

          <Text style={styles.howItHelpsSubtitle}>
            {howItHelpsText}
          </Text>
        </View>

        <Ionicons
          name="chevron-forward"
          size={18}
          color="#0F0F0F80"
        />
      </View>
    </View>
  );
}