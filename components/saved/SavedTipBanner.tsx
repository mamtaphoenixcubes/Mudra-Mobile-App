import React from 'react';
import { View, Text } from 'react-native';
// import { savedStyles as styles } from '@/assets/styles/saved/savedStyles';
import { getSavedStyles } from '@/assets/styles/saved/savedStyles'
import { useTheme } from '@/constants/ThemeContext'
import FavouriteSvg from '@/assets/icons/Favourite.svg';

export default function SavedTipBanner() {
    const { colors, isDark } = useTheme();
    const styles = getSavedStyles(colors, isDark);
    return (
        <View style={styles.tipContainer}>
            <View style={styles.tipCard}>
                <View style={styles.tipIconCircle}>
                    <FavouriteSvg width={22} height={22} />
                </View>
                <Text style={styles.tipText}>
                    Tip: Save your favorite mudras and sessions to build your personal wellness library.
                </Text>
            </View>
        </View>
    );
}