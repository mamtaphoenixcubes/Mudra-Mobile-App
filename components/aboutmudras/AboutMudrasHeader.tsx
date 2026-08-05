import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
// import { aboutMudrasStyles as styles } from '@/assets/styles/aboutmudras/aboutMudrasStyles';
import { getAboutMudrasStyles } from '@/assets/styles/aboutmudras/aboutMudrasStyles'
import { useTheme } from '@/constants/ThemeContext'
import ArrowLeft from '@/assets/icons/arrow-left.svg';
import ArrowLeftWhite from '@/assets/icons/arrow-left white.svg'
import LotusBlack from '@/assets/icons/LotusBlack.svg';
import LotusWhite from '@/assets/icons/LotusWhite.svg'
import { Image } from 'react-native';

export default function AboutMudrasHeader() {
    const insets = useSafeAreaInsets();
    const { colors, isDark } = useTheme()
    const styles = getAboutMudrasStyles(colors)

    return (
        <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
            <TouchableOpacity
                style={styles.headerIconBtn}
                onPress={() => router.back()}
                activeOpacity={0.7}
            >
                {/* <ArrowLeft width={24} height={24} /> */}
                {isDark
                    ? <ArrowLeftWhite width={24} height={24} />
                    : <ArrowLeft width={24} height={24} />
                }
            </TouchableOpacity>

            <View style={styles.headerCenter}>
                <Image
                    source={require('@/assets/images/Pranayama_Images/MudraImage.png')}
                    style={{ width: 28, height: 28, resizeMode: 'contain' }}
                />
                <Text style={styles.headerTitle}>MUDRAS</Text>
            </View>
            <TouchableOpacity style={styles.headerIconBtn} activeOpacity={0.7}>
                {/* <LotusBlack width={24} height={24} /> */}
                {isDark
                    ? <LotusWhite width={24} height={24} />
                    : <LotusBlack width={24} height={24} />
                }
            </TouchableOpacity>
        </View>
    );
}