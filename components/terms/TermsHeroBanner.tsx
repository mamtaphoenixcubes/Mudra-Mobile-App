import React from 'react';
import { View, Text, Image } from 'react-native';
// import { termsStyles as styles } from '@/assets/styles/terms/termsStyles';
import { getTermsStyles } from '@/assets/styles/terms/termsStyles'
import { useTheme } from '@/constants/ThemeContext'

export default function TermsHeroBanner() {
    const { colors } = useTheme()
    const styles = getTermsStyles(colors)
    return (
        <>
            <Text style={styles.subtitle}>
                Please read these terms carefully before using Mudras.
            </Text>

            <View style={styles.heroContainer}>
                <View style={styles.heroCard}>
                    <Image
                        source={require('@/assets/images/Pranayama_Images/TermsandConditions.png')}
                        style={styles.heroImage}
                        resizeMode="cover"
                    />
                    <View style={styles.heroTextBlock}>
                        <Text style={styles.heroTitle}>Welcome to Mudras</Text>
                        <Text style={styles.heroBody}>
                            By accessing or using the Mudras app, you agree to be bound by these Terms & Conditions. If you do not agree, please do not use the app.
                        </Text>
                    </View>
                </View>
            </View>
        </>
    );
}