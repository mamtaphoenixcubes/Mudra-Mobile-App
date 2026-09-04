import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { router } from 'expo-router';
// import { savedStyles as styles } from '@/assets/styles/saved/savedStyles';
import { getSavedStyles } from '@/assets/styles/saved/savedStyles'
import { useTheme } from '@/constants/ThemeContext'
import { Ionicons } from '@expo/vector-icons';
import ClockSvg from '@/assets/icons/clock.svg';
import FavouriteSvg from '@/assets/icons/Favourite.svg';
import StarSvg from '@/assets/icons/Star.svg';
import ClockWhiteSvg from '@/assets/icons/ClockWhite.svg';
import FavouriteWhiteSvg from '@/assets/icons/FavouriteWhite.svg';
import StarWhiteEmptySvg from '@/assets/icons/StarWhiteEmpty.svg';


export default function EmptyState() {
    const { colors, isDark } = useTheme();
    const styles = getSavedStyles(colors, isDark);

    const WHY_ITEMS = [
        { icon: isDark ? <ClockWhiteSvg width={20} height={20} /> : <ClockSvg width={20} height={20} />, text: 'Quick access to your favorite mudras' },
        { icon: isDark ? <FavouriteWhiteSvg width={20} height={20} /> : <FavouriteSvg width={20} height={20} />, text: 'Continue your practice anytime' },
        { icon: isDark ? <StarWhiteEmptySvg width={20} height={20} /> : <StarSvg width={20} height={20} />, text: 'Build your personal collection' },
    ];
    return (
        <View style={styles.emptyContainer}>
            <Image
                source={require('@/assets/images/Pranayama_Images/TermsandConditions.png')}
                style={styles.emptyImage}
                resizeMode="cover"
            />

            <Text style={styles.emptyTitle}>No saved mudras yet</Text>
            <Text style={styles.emptySubtitle}>
                Save your favorite mudras to access them quickly and continue your practice.
            </Text>

            <TouchableOpacity
                style={styles.emptyBtn}
                activeOpacity={0.8}
                onPress={() => router.push('/browse')}
            >
                <Ionicons name="bookmark-outline" size={18} color={isDark ? '#FFFFFF99' : '#0F0F0F99'} />
                <Text style={styles.emptyBtnText}>Explore Mudra Library</Text>
            </TouchableOpacity>

            <Text style={styles.emptyWhyTitle}>Why save mudras?</Text>

            {WHY_ITEMS.map((item, i) => (
                <View key={i} style={styles.emptyWhyRow}>
                    {item.icon}
                    <Text style={styles.emptyWhyText}>{item.text}</Text>
                </View>
            ))}
        </View>
    );
}