import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { useRouter } from 'expo-router';
import { useTheme } from '@/constants/ThemeContext';

const { width } = Dimensions.get('window');
const H_PAD = 16;
const CARD_WIDTH = width - H_PAD * 2;
const CARD_HEIGHT = CARD_WIDTH * 0.52;
const IMAGE_WIDTH = CARD_WIDTH * 0.34;

export default function SleepModeCard() {
    const router = useRouter();
    const { colors } = useTheme();

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={styles.card}>
                {/* Left Image */}
                <View style={[styles.imageWrapper, { width: IMAGE_WIDTH, height: CARD_HEIGHT }]}>
                    <Image
                        source={require('../../assets/images/tabIcons/sleep-mode.png')}
                        style={styles.image}
                    />
                </View>

                {/* Right Content */}
                <View style={styles.content}>
                    <Text style={styles.title}>Sleep Mode</Text>
                    <Text style={styles.description}>
                        A dedicated nighttime library with dimmed visuals, breath pacing, and long-form Yoga Nidra audio designed to help transition from activation to rest.
                    </Text>
                    <TouchableOpacity
                        style={styles.button}
                        activeOpacity={0.8}
                        onPress={() => router.push('/sleepmode')}
                    >
                        <Text style={styles.buttonText}>Know More</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Bottom Tagline */}
            <Text style={styles.tagline}>
                Sit. Breathe. Place your hands. Begin.
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: H_PAD,
        paddingTop: 8,
        paddingBottom: 16,
        alignItems: 'center',
    },
    card: {
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        backgroundColor: '#CBECFF',
        borderRadius: 12,
        flexDirection: 'row',
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 6,
        elevation: 3,
    },
    imageWrapper: {
        overflow: 'hidden',
        flexShrink: 0,
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    content: {
        flex: 1,
        paddingHorizontal: 14,
        paddingVertical: 14,
        justifyContent: 'center',
        gap: 6,
    },
    title: {
        fontSize: 15,
        fontFamily: 'SF-Pro-Display',
        fontWeight: '500',
        color: '#1D2B36',
    },
    description: {
        fontSize: 11,
        fontFamily: 'SF-Pro-Display',
        fontWeight: '400',
        lineHeight: 16,
        color: '#0F0F0F80',
    },
    button: {
        alignSelf: 'flex-start',
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 14,
        paddingVertical: 6,
        borderRadius: 6,
        marginTop: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.06,
        shadowRadius: 2,
        elevation: 2,
    },
    buttonText: {
        fontSize: 12,
        fontFamily: 'SF-Pro-Display',
        fontWeight: '500',
        color: '#1D2B36',
        textDecorationLine: 'underline',
    },
    tagline: {
        marginTop: 12,
        fontSize: 14,
        fontFamily: 'SF-Pro-Display',
        fontWeight: '600',
        color: '#9A85FE80',
        fontStyle: 'italic',
        textAlign: 'center',
    },
});