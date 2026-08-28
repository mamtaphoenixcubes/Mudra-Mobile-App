import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ElementalLogicIcon from '@/assets/icons/elementallogic.svg';

export default function PranayamaDetailElementalLogic({ pranayama }: { pranayama?: any }) {
    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <View style={styles.iconWrapper}>
                    <ElementalLogicIcon width={32} height={32} />
                </View>

                <View style={styles.content}>
                    <Text style={styles.title}>How It Works</Text>
                    <Text style={styles.description}>
                        {pranayama?.howItWorks || 'Regulates airflow between the nostrils to balance the left and right hemispheres of the brain, calming the nervous system.'}
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
    card: {
        backgroundColor: '#EBCFFF',
        borderRadius: 7.34,
        padding: 12,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
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
    title: {
        fontFamily: 'SF-Pro-Display',
        fontWeight: '500',
        fontSize: 14,
        lineHeight: 18,
        color: '#1A1A1A',
    },
    description: {
        fontFamily: 'SF-Pro-Display',
        fontWeight: '400',
        fontSize: 12,
        lineHeight: 16,
        color: '#555',
    },
});