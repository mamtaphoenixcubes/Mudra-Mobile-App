
import React from 'react';
import { View, Text } from 'react-native';
// import { needDetailStyles as styles } from '@/assets/styles/browse/needDetailStyles';
import { getNeedDetailStyles } from '@/assets/styles/browse/needDetailStyles'
import { useTheme } from '@/constants/ThemeContext'
import TipIcon from '@/assets/icons/tip.svg'; // Make sure you have tip.svg in your assets/icons folder

type Props = { text: string };

export default function NeedDetailInsight({ text }: Props) {
    const { colors } = useTheme()
    const styles = getNeedDetailStyles(colors)
    return (
        <View style={styles.insightCard}>
            <View style={styles.insightIconCircle}>
                <TipIcon width={24} height={24} />
            </View>
            <Text style={styles.insightText}>{text}</Text>
        </View>
    );
}