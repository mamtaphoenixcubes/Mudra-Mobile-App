import React from 'react';
import { View, Image, TouchableOpacity, Text } from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getPranayamaDetailStyles } from '@/assets/styles/pranayama/pranayamaDetailStyles';
import { useTheme } from '@/constants/ThemeContext';
import ArrowLeft from '@/assets/icons/arrow-left.svg';
import ArrowLeftWhite from '@/assets/icons/arrow-left white.svg';
import FavouriteSvg from '@/assets/icons/Favourite.svg';
import FavouriteWhite from '@/assets/icons/FavouriteWhite.svg';
import ShareSvg from '@/assets/icons/share.svg';
import ShareWhite from '@/assets/icons/shareWhite.svg';

export default function MeditationDetailHeader() {
    const insets = useSafeAreaInsets();
    const { colors, isDark } = useTheme();
    const styles = getPranayamaDetailStyles(colors);

    return (
        <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
            <TouchableOpacity style={styles.headerIconBtn} onPress={() => router.back()} activeOpacity={0.7}>
                {isDark ? <ArrowLeftWhite width={24} height={24} /> : <ArrowLeft width={24} height={24} />}
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
                <TouchableOpacity style={styles.headerIconBtn} activeOpacity={0.7}>
                    {isDark ? <FavouriteWhite width={22} height={22} /> : <FavouriteSvg width={22} height={22} />}
                </TouchableOpacity>
                <TouchableOpacity style={styles.headerIconBtn} activeOpacity={0.7}>
                    {isDark ? <ShareWhite width={22} height={22} /> : <ShareSvg width={22} height={22} />}
                </TouchableOpacity>
            </View>
        </View>
    );
}