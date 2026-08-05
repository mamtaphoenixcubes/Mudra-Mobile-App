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

interface Props {
    date?: string;
    onInfoPress?: () => void;
}

function BackArrow({ color }: { color: string }) {
    return (
        <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
            <Path
                d="M19 12H5M5 12L12 19M5 12L12 5"
                stroke={color}
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    );
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
        <View style={[styles.headerContainer, { paddingTop: insets.top }]}>
            <View style={styles.headerRow}>
                <TouchableOpacity onPress={() => router.back()} style={styles.headerIconBtn} hitSlop={8}>
                    <BackArrow color={colors.text} />
                </TouchableOpacity>
                <View style={styles.headerCenterGroup}>
                    <Image
                        source={require('@/assets/images/Pranayama_Images/MudraImage.png')}
                        style={styles.headerLogo}
                        resizeMode="contain"
                    />
                    <Text style={styles.headerBrandTitle}>MUDRAS</Text>
                </View>
                <TouchableOpacity onPress={onInfoPress} style={styles.headerIconBtn} hitSlop={8}>
                    {isDark ? <AlertWhite width={26} height={26} /> : <AlertIcon width={26} height={26} />}
                </TouchableOpacity>
            </View>
            <Text style={styles.headerScreenTitle}>Mudra of the Day</Text>
            <View style={styles.headerDateRow}>
                <CalendarIcon width={15} height={15} />
                <Text style={styles.headerDateText}>{getFormattedDate()}</Text>
            </View>
        </View>
    );
}