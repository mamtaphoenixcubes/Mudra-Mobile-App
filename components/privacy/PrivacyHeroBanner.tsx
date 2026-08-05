import React from 'react';
import { View, Text, Image } from 'react-native';
// import { privacyStyles as styles } from '@/assets/styles/privacy/privacyStyles';
import { getPrivacyStyles } from '@/assets/styles/privacy/privacyStyles'
import { useTheme } from '@/constants/ThemeContext'

export default function PrivacyHeroBanner() {
    const { colors } = useTheme()
    const styles = getPrivacyStyles(colors)
    return (
        <>
            <Text style={styles.subtitle}>
                Your privacy is important to us.
            </Text>

            <View style={styles.heroContainer}>
                <View style={styles.heroCard}>
                    <Image
                        source={require('@/assets/images/Pranayama_Images/PrivacyPolicy.png')}
                        style={styles.heroImage}
                        resizeMode="cover"
                    />
                    <View style={styles.heroTextBlock}>
                        <Text style={styles.heroTitle}>Our Commitment</Text>
                        <Text style={styles.heroBody}>
                            We are committed to protecting your privacy and personal information. This policy explains how we collect, use, store and protect your data.
                        </Text>
                    </View>
                </View>
            </View>
        </>
    );
}