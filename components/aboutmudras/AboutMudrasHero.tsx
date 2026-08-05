import React from 'react';
import { View, Text, Image } from 'react-native';
// import { aboutMudrasStyles as styles } from '@/assets/styles/aboutmudras/aboutMudrasStyles';
import { getAboutMudrasStyles } from '@/assets/styles/aboutmudras/aboutMudrasStyles'
import { useTheme } from '@/constants/ThemeContext'

export default function AboutMudrasHero() {
    const { colors } = useTheme()
    const styles = getAboutMudrasStyles(colors)
    return (
        <>
            <View style={styles.pageTitleContainer}>
                <Text style={styles.pageTitle}>About Mudras</Text>
                <Text style={styles.pageSubtitle}>Ancient gestures for modern well-being.</Text>
            </View>

            <View style={styles.heroContainer}>
                <View style={styles.heroCard}>
                    <Image
                        source={require('@/assets/images/Pranayama_Images/AboutMudras.png')}
                        style={styles.heroImage}
                        resizeMode="cover"
                    />
                    <View style={styles.heroTextBlock}>
                        <Text style={styles.heroTitle}>The Power of Mudras</Text>
                        <Text style={styles.heroBody}>
                            Mudras are sacred hand gestures that channel energy and influence body, mind and spirit. Rooted in ancient wisdom, they help restore balance and promote holistic well-being.
                        </Text>
                    </View>
                </View>
            </View>
        </>
    );
}