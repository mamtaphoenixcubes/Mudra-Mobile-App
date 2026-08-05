import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
// import { aboutMudrasStyles as styles } from '@/assets/styles/aboutmudras/aboutMudrasStyles';
import { getAboutMudrasStyles } from '@/assets/styles/aboutmudras/aboutMudrasStyles'
import { useTheme } from '@/constants/ThemeContext'
import FavouriteSvg from '@/assets/icons/Favourite.svg';
import StarSvg from '@/assets/icons/Star.svg';

export default function OurApproach() {
    const { colors } = useTheme()
const styles = getAboutMudrasStyles(colors)
    return (
        <>
            <View style={styles.sectionTitleContainer}>
                <Text style={styles.sectionTitle}>Our Approach</Text>
            </View>

            <View style={styles.approachContainer}>
                {/* Approach card */}
                <View style={styles.approachCard}>
                    <View style={styles.approachIconCircle}>
                        <FavouriteSvg width={24} height={24} />
                    </View>
                    <Text style={styles.approachText}>
                        At Moodra, we blend ancient wisdom with modern science to bring you simple, effective and accessible mudra practices for everyday life.
                    </Text>
                </View>
            </View>

            {/* Explore banner */}
            <View style={styles.exploreContainer}>
                <View style={styles.exploreCard}>
                    <View style={styles.exploreIconCircle}>
                        <StarSvg width={24} height={24} />
                    </View>
                    <View style={styles.exploreTextBlock}>
                        <Text style={styles.exploreTitle}>Small Gestures, Big Impact</Text>
                        <Text style={styles.exploreSubtitle}>
                            Just a few minutes of mudra practice daily can bring balance, peace and positive change.
                        </Text>
                    </View>
                    <TouchableOpacity
                        style={styles.exploreBtn}
                        activeOpacity={0.8}
                        onPress={() => router.push('/browse')}
                    >
                        <Text style={styles.exploreBtnText}>Explore Mudras</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    );
}