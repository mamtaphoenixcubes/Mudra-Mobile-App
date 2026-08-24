import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
} from 'react-native';
import Slider from '@react-native-community/slider';
import { useTheme } from '@/constants/ThemeContext'

const { width: SCREEN_WIDTH } =
    Dimensions.get('window');

const moderateScale = (
    size: number,
    factor = 0.5
) =>
    size +
    ((SCREEN_WIDTH - 375) / 375) *
        size *
        factor;

const formatTime = (
    seconds: number
) => {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);

    return `${m}:${s
        .toString()
        .padStart(2, '0')}`;
};

interface MudraPlayerProgressProps {
    current: number;
    total: number;
    onChange: (val: number) => void;
    onSeekComplete: (
        val: number
    ) => void;
}

export default function MeditationPlayerProgress({
    current,
    total,
    onChange,
    onSeekComplete,
}: MudraPlayerProgressProps) {
    const { colors } = useTheme()
    return (
        <View style={styles.section}>
            <View style={styles.timeRow}>
                <Text style={[styles.timeText, { color: colors.textSub }]}>
                    {formatTime(current)}
                </Text>

                <Text style={[styles.timeText, { color: colors.text }]}>
                    {formatTime(total)}
                </Text>
            </View>

            <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={total || 1}
                value={current}
                onValueChange={onChange}
                onSlidingComplete={
                    onSeekComplete
                }
                //minimumTrackTintColor="#1A1A1A"
                minimumTrackTintColor={colors.text}
                maximumTrackTintColor="#E2E2E2"
                //thumbTintColor="#1A1A1A"
                thumbTintColor={colors.text}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    section: {
        paddingHorizontal:
            moderateScale(16),
        marginBottom:
            moderateScale(6),
    },

    timeRow: {
        flexDirection: 'row',
        justifyContent:
            'space-between',
        marginBottom:
            moderateScale(4),
    },

    timeText: {
        fontFamily:
            'SF-Pro-Display',
        fontSize:
            moderateScale(11),
        color: '#AAAAAA',
        fontWeight: '500',
    },

    slider: {
        width: '100%',
        height: 32,
    },
});