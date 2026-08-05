import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getMudraOfTheDayStyles } from '@/assets/styles/mudraoftheday/mudraOfTheDayStyles'
import { useTheme } from '@/constants/ThemeContext'

interface Props {
    imageUri?: any;
    name: string;
    subtitle: string;
    isFavorite?: boolean;
    onFavoriteToggle?: () => void;
}

const SCREEN_WIDTH = Dimensions.get('window').width;
const IMAGE_SIZE = SCREEN_WIDTH * 0.52;

export default function HeroCard({
    imageUri,
    name,
    subtitle,
    isFavorite,
    onFavoriteToggle,
}: Props) {
    const { colors } = useTheme()
    const styles = getMudraOfTheDayStyles(colors)

  const handleHeart = () => {
    onFavoriteToggle?.();
};
console.log(isFavorite,"isFavorite");

    return (
        <View style={styles.heroCard}>
                <TouchableOpacity
            style={styles.heroHeartBtn}
            onPress={handleHeart}
            hitSlop={8}
        >
            <Ionicons
                name={isFavorite ? 'heart' : 'heart-outline'}
                size={22}
                color={isFavorite ? '#FF3B30' : '#FFFFFF'}
            />
        </TouchableOpacity>

            <View style={[styles.heroImageWrapper, { width: IMAGE_SIZE, height: IMAGE_SIZE, borderRadius: IMAGE_SIZE / 2 }]}>
                {imageUri ? (
                    <Image
                        source={imageUri}
                        style={[styles.heroImage, { width: IMAGE_SIZE, height: IMAGE_SIZE, borderRadius: IMAGE_SIZE / 2 }]}
                        resizeMode="cover"
                    />
                ) : (
                    <View style={[styles.heroImagePlaceholder, { width: IMAGE_SIZE, height: IMAGE_SIZE, borderRadius: IMAGE_SIZE / 2 }]}>
                        <Ionicons name="hand-left-outline" size={64} color="#bbb" />
                    </View>
                )}
            </View>

            <Text style={styles.heroName}>{name}</Text>
            <Text style={styles.heroSubtitle}>{subtitle}</Text>
        </View>
    );
}