import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ElementalLogicIcon from '@/assets/icons/elementallogic.svg';

export default function ElementalLogic({ mudra }: { mudra?: any }) {
    return (
        <View style={styles.container}>
            <View style={styles.card}>

                {/* ── Left: Circle Icon ── */}
                <View style={styles.iconWrapper}>
                    <ElementalLogicIcon width={32} height={32} />
                </View>

                {/* ── Right: Title + Description ── */}
                <View style={styles.content}>
                    <Text style={styles.title}>Elemental Logic</Text>
                    <Text style={styles.description}>
                        {mudra?.elementalLogic || 'Activates the Air element to stimulate mental clarity.'}
                    </Text>
                </View>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        paddingTop: 12,
    },

    // Figma: width 328, height 70, border-radius 7.34, color #EBCFFF
    card: {
        backgroundColor: '#EBCFFF',
        borderRadius: 7.34,
        padding: 12,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },

    // Circle icon background
    iconWrapper: {
        width: 52,
        height: 52,
        borderRadius: 26,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
    },

    content: {
        flex: 1,
        gap: 4,
    },

    // Figma: SF Pro Display, weight 500 Medium
    title: {
        fontFamily: 'SF-Pro-Display',
        fontWeight: '500',
        fontSize: 14,
        lineHeight: 18,
        color: '#1A1A1A',
    },

    // Figma: SF Pro Display, weight 400 Regular
    description: {
        fontFamily: 'SF-Pro-Display',
        fontWeight: '400',
        fontSize: 12,
        lineHeight: 16,
        color: '#555',
    },
});