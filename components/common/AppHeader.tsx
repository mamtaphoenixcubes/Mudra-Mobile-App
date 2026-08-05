import React from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
} from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ArrowLeft from '@/assets/icons/arrow-left.svg';
import { useTheme } from '@/constants/ThemeContext'
import ArrowLeftWhite from '@/assets/icons/arrow-left white.svg'

const { width } = Dimensions.get('window');
const moderateScale = (size: number, factor = 0.5) => {
    const s = (width / 375) * size;
    return size + (s - size) * factor;
};

type Props = {
    rightIcon?: React.ReactNode;
    onRightPress?: () => void;
    onBackPress?: () => void;
};

export default function AppHeader({ rightIcon, onRightPress, onBackPress }: Props) {
    const insets = useSafeAreaInsets();
    const { colors, isDark } = useTheme()

    return (
        <View style={[styles.header, { paddingTop: insets.top + 8, backgroundColor: colors.background }]}>
            {/* Left — back */}
            <TouchableOpacity
                style={styles.iconBtn}
                onPress={onBackPress ?? (() => router.back())}
                activeOpacity={0.7}
            >
                {isDark ? <ArrowLeftWhite width={24} height={24} /> : <ArrowLeft width={24} height={24} />}
            </TouchableOpacity>

            {/* Center — logo + MUDRAS */}
            <View style={styles.center}>
                <Image
                    source={require('@/assets/images/Pranayama_Images/MudraImage.png')}
                    style={styles.logo}
                    resizeMode="contain"
                />
                <Text style={styles.title}>MUDRAS</Text>
            </View>

            {/* Right — optional icon */}
            <TouchableOpacity
                style={styles.iconBtn}
                onPress={onRightPress}
                activeOpacity={0.7}
                disabled={!rightIcon}
            >
                {rightIcon ?? <View />}
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: moderateScale(16),
        paddingBottom: moderateScale(12),
        backgroundColor: '#FFFFFF',
    },
    iconBtn: {
        width: moderateScale(40),
        height: moderateScale(40),
        alignItems: 'center',
        justifyContent: 'center',
    },
    center: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: moderateScale(8),
    },
    logo: {
        width: moderateScale(28),
        height: moderateScale(28),
    },
    title: {
        fontFamily: 'SF-Pro-Display',
        fontWeight: '700',
        fontSize: moderateScale(18),
        color: '#9A85FE',
        letterSpacing: 1,
    },
});