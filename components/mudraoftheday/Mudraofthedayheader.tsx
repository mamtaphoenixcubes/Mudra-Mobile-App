import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import Svg, { Path } from 'react-native-svg';
import CalendarIcon from '@/assets/icons/calender.svg';
import AlertIcon from '@/assets/icons/alert.svg';
import AlertWhite from '@/assets/icons/alertWhite.svg'
import { getMudraOfTheDayStyles } from '@/assets/styles/mudraoftheday/mudraOfTheDayStyles'
import { useTheme } from '@/constants/ThemeContext'
import AppHeader from '@/components/common/AppHeader';


interface Props {
    date?: string;
    onInfoPress?: () => void;
}


export default function MudraOfTheDayHeader({ date, onInfoPress }: Props) {
    const insets = useSafeAreaInsets();
    const { colors, isDark } = useTheme()
    const styles = getMudraOfTheDayStyles(colors)

    const getFormattedDate = () => {
        if (date) return date;
        const now = new Date();
        return now.toLocaleDateString('en-US', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });
    };

    return (
        <View style={styles.headerContainer}>
            <AppHeader
                onBackPress={() => router.back()}
                rightIcon={isDark ? <AlertWhite width={26} height={26} /> : <AlertIcon width={26} height={26} />}
                onRightPress={onInfoPress}
            />
            <Text style={styles.headerScreenTitle}>Mudra of the Day</Text>
            <View style={styles.headerDateRow}>
                <CalendarIcon width={15} height={15} />
                <Text style={styles.headerDateText}>{getFormattedDate()}</Text>
            </View>
        </View>
    );
}