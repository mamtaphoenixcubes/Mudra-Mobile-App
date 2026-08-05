import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
// import { elementDetailStyles as styles } from '@/assets/styles/elementdetail/elementDetailStyles';
import { getElementDetailStyles } from '@/assets/styles/elementdetail/elementDetailStyles'
import { useTheme } from '@/constants/ThemeContext'
import LotusBlackSvg from '@/assets/icons/LotusBlack.svg';

type Props = {
    elementName: string;
};

export default function ElementExploreBanner({ elementName }: Props) {
    const { colors } = useTheme()
    const styles = getElementDetailStyles(colors)
    return (
        <View style={styles.exploreContainer}>
            <View style={styles.exploreCard}>
                <View style={styles.exploreIconCircle}>
                    <LotusBlackSvg width={28} height={28} />
                </View>
                <View style={styles.exploreTextBlock}>
                    <Text style={styles.exploreTitle}>
                        Explore Mudras for {elementName} Balance
                    </Text>
                    <Text style={styles.exploreSubtitle}>
                        Recommended Mudras to harmonize your {elementName} element.
                    </Text>
                </View>
                <TouchableOpacity style={styles.exploreBtn} activeOpacity={0.8}>
                    <Text style={styles.exploreBtnText}>Explore Now</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}