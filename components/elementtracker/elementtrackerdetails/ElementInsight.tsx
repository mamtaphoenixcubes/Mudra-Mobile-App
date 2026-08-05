import React from 'react';
import { View, Text } from 'react-native';
// import { elementDetailStyles as styles } from '@/assets/styles/elementdetail/elementDetailStyles';
import { getElementDetailStyles } from '@/assets/styles/elementdetail/elementDetailStyles'
import { useTheme } from '@/constants/ThemeContext'
import TipSvg from '@/assets/icons/Tip.svg';

type Props = {
    elementName: string;
    insightText: string;
};

export default function ElementInsight({ elementName, insightText }: Props) {
    const { colors } = useTheme()
    const styles = getElementDetailStyles(colors)
    return (
        <View style={styles.insightContainer}>
            <View style={styles.insightCard}>
                {/* Icon circle */}
                <View style={styles.insightIconCircle}>
                    <TipSvg width={24} height={24} />
                </View>

                {/* Text block */}
                <View style={styles.insightTextBlock}>
                    <Text style={styles.insightTitle}>Element Insight</Text>
                    <Text style={styles.insightBody}>{insightText}</Text>
                </View>
            </View>
        </View>
    );
}