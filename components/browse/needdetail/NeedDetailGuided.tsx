import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
// import { needDetailStyles as styles } from '@/assets/styles/browse/needDetailStyles';
import { getNeedDetailStyles } from '@/assets/styles/browse/needDetailStyles'
import { useTheme } from '@/constants/ThemeContext'
import LotusBlack from '@/assets/icons/LotusBlack.svg';

type Props = { needTitle: string };

export default function NeedDetailGuided({ needTitle }: Props) {
    const { colors } = useTheme()
    const styles = getNeedDetailStyles(colors)
    return (
        <View style={styles.guidedBanner}>
            <View style={styles.guidedIconCircle}>
                <LotusBlack width={24} height={24} />
            </View>
            <View style={styles.guidedTextBlock}>
                <Text style={styles.guidedTitle}>Start a guided session</Text>
                <Text style={styles.guidedSubtitle}>
                    Try a guided Mudra meditation for {needTitle.toLowerCase()}
                </Text>
            </View>
            <TouchableOpacity style={styles.guidedBtn} activeOpacity={0.85}>
                <Text style={styles.guidedBtnText}>Start Now</Text>
            </TouchableOpacity>
        </View>
    );
}