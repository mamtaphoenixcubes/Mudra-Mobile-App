import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
// import { helpSupportStyles as styles } from '@/assets/styles/helpsupport/helpSupportStyles';
import { getHelpSupportStyles } from '@/assets/styles/helpsupport/helpSupportStyles'
import { useTheme } from '@/constants/ThemeContext'
import HelpSvg from '@/assets/icons/Help.svg';
import CommentWhiteSvg from '@/assets/icons/CommentWhite.svg';
import { router } from 'expo-router';

export default function HelpSupportBanner() {
    const { colors } = useTheme()
    const styles = getHelpSupportStyles(colors)
    return (
        <>
            {/* Subtitle under header */}
            <Text style={styles.headerSubtitle}>
                We're here to help you on your healing journey.
            </Text>

            {/* Banner card */}
            <View style={[styles.bannerContainer, { marginTop: 16 }]}>
                <View style={styles.bannerCard}>
                    <View style={styles.bannerIconCircle}>
                        <HelpSvg width={26} height={26} />
                    </View>

                    <View style={styles.bannerTextBlock}>
                        <Text style={styles.bannerTitle}>Need immediate help?</Text>
                        <Text style={styles.bannerSubtitle}>Our support team is here for you.</Text>
                    </View>

                    <TouchableOpacity style={styles.bannerBtn} activeOpacity={0.8} onPress={() => router.push('/chat')}>
                        <CommentWhiteSvg width={16} height={16} />
                        <Text style={styles.bannerBtnText}>Contact Support</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    );
}