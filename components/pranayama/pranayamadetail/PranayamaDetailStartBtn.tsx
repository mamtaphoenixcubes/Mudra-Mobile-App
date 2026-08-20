import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { getPranayamaDetailStyles } from '@/assets/styles/pranayama/pranayamaDetailStyles';
import { useTheme } from '@/constants/ThemeContext';
import PlaySvg from '@/assets/icons/play.svg';

export default function PranayamaDetailStartBtn() {
    const { colors } = useTheme();
    const styles = getPranayamaDetailStyles(colors);

    return (
        <View style={styles.startBtnContainer}>
            <TouchableOpacity
                style={styles.startBtn}
                onPress={() => router.push('/pranayamaplayer')}
                activeOpacity={0.85}
            >
                <PlaySvg width={20} height={20} color="#FFFFFF" />
                <Text style={styles.startBtnText}>Start Practice</Text>
            </TouchableOpacity>
        </View>
    );
}