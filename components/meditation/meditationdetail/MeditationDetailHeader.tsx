import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getPranayamaDetailStyles } from '@/assets/styles/pranayama/pranayamaDetailStyles';
import { useTheme } from '@/constants/ThemeContext';
import FavouriteSvg from '@/assets/icons/Favourite.svg';
import FavouriteWhite from '@/assets/icons/FavouriteWhite.svg';
import ShareSvg from '@/assets/icons/share.svg';
import ShareWhite from '@/assets/icons/shareWhite.svg';
import AppHeader from '@/components/common/AppHeader';

export default function MeditationDetailHeader() {
    const insets = useSafeAreaInsets();
    const { colors, isDark } = useTheme();
    const styles = getPranayamaDetailStyles(colors);

    return (
        <View style={{ position: 'relative' }}>
            <AppHeader onBackPress={() => router.back()} />

            <View
                style={[
                    styles.headerRightRow,
                    {
                        position: 'absolute',
                        top: insets.top + 8,
                        right: 0,
                        bottom: 0,
                    },
                ]}
            >
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