import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { getMeditationDetailStyles } from '@/assets/styles/meditation/meditationDetailStyles';
import { useTheme } from '@/constants/ThemeContext';
import PlaySvg from '@/assets/icons/play.svg';

export default function MeditationDetailStartBtn() {
    const { colors } = useTheme();
    const styles = getMeditationDetailStyles(colors);

    return (
        <View style={styles.startBtnContainer}>
            <TouchableOpacity
                style={styles.startBtn}
                onPress={() => router.push('/meditationplayer')}
                activeOpacity={0.85}
            >
                <PlaySvg width={20} height={20} color="#FFFFFF" />
                <Text style={styles.startBtnText}>Start Practice</Text>
            </TouchableOpacity>
        </View>
    );
}