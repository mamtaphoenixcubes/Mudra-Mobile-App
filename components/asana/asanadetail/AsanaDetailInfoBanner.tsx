import React from 'react';
import { View, Text } from 'react-native';
import { getAsanaDetailStyles } from '@/assets/styles/asana/asanaDetailStyles';
import { useTheme } from '@/constants/ThemeContext';
import LotusBlack from '@/assets/icons/LotusBlack.svg';

export default function AsanaDetailInfoBanner() {
    const { colors } = useTheme();
    const styles = getAsanaDetailStyles(colors);

    return (
        <View style={styles.infoBannerContainer}>
            <View style={styles.infoBannerCard}>
                <View style={styles.infoBannerIconCircle}>
                    <LotusBlack width={24} height={24} />
                </View>
                <Text style={styles.infoBannerText}>
                    Surya Namaskar is a complete workout that strengthens muscles, improves flexibility and boosts energy levels when practiced daily.
                </Text>
            </View>
        </View>
    );
}