import React from 'react';
import { View } from 'react-native';
import LotusBlack from '@/assets/icons/LotusBlack.svg';
import LotusWhite from '@/assets/icons/LotusWhite.svg';
import { getMudraOfTheDayStyles } from '@/assets/styles/mudraoftheday/mudraOfTheDayStyles'
import { useTheme } from '@/constants/ThemeContext'

export default function LotusDivider() {
    const { colors, isDark } = useTheme()
    const styles = getMudraOfTheDayStyles(colors)

    return (
        <View style={styles.dividerContainer}>
            <View style={styles.dividerLine} />
            {isDark
                ? <LotusWhite width={24} height={24} style={styles.dividerLotus} />
                : <LotusBlack width={24} height={24} style={styles.dividerLotus} />
            }
            <View style={styles.dividerLine} />
        </View>
    );
}