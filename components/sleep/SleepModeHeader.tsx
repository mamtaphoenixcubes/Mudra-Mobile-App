import React from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ArrowLeft from '@/assets/icons/arrow-left white.svg';
import SleepWhite from '@/assets/icons/SleepWhite.svg';

export default function SleepModeHeader() {
    const insets = useSafeAreaInsets();

    return (
        <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
            <TouchableOpacity
                style={styles.iconBtn}
                onPress={() => router.back()}
                activeOpacity={0.7}
            >
                <ArrowLeft width={24} height={24} />
            </TouchableOpacity>

            <View style={styles.titleRow}>
                <Text style={styles.title}>Sleep Mode</Text>
                <SleepWhite width={22} height={22} />
            </View>

            <TouchableOpacity style={styles.iconBtn} activeOpacity={0.7}>
                <SleepWhite width={30} height={30} />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingBottom: 12,
        backgroundColor: '#0F0F1A',
    },
    iconBtn: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    titleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    title: {
        fontFamily: 'SF-Pro-Display',
        fontWeight: '600',
        fontSize: 17,
        color: '#FFFFFF',
    },
    moonIcon: {
        width: 22,
        height: 22,
        resizeMode: 'contain',
    },
    rightMoonIcon: {
        width: 30,
        height: 30,
        resizeMode: 'contain',
    },
});