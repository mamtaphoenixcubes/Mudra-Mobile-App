import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const IMAGE_W = SCREEN_WIDTH * 0.24;
const IMAGE_H = IMAGE_W * 0.75;

const fallbackSteps = [
    'Sit comfortably with your spine erect.',
    'Close your right nostril with your thumb, inhale through the left.',
    'Close the left nostril, release the right, and exhale.',
    'Repeat for 5-10 minutes, alternating sides.',
];

export default function PranayamaDetailHowToDoIt({ pranayama }: { pranayama?: any }) {
    const stepsToShow = Array.isArray(pranayama?.howToDo) && pranayama.howToDo.length > 0
        ? pranayama.howToDo
        : fallbackSteps;

    const bannerImageUrl = pranayama?.bannerImage?.url || null;

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <View style={styles.leftContent}>
                    <Text style={styles.title}>How to do it</Text>

                    {stepsToShow.map((step: string, index: number) => (
                        <View key={index} style={styles.bulletRow}>
                            <Text style={styles.bullet}>•</Text>
                            <Text style={styles.stepText}>{step}</Text>
                        </View>
                    ))}
                </View>

                <View style={styles.imageWrapper}>
                    <Image
                        source={
                            bannerImageUrl
                                ? { uri: bannerImageUrl }
                                : require('@/assets/images/tabIcons/calm-mind.png')
                        }
                        style={styles.image}
                        resizeMode="cover"
                    />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        paddingTop: 16,
    },
    card: {
        backgroundColor: '#FFDBA7',
        borderRadius: 10,
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    leftContent: {
        flex: 1,
        minWidth: 0,
    },
    title: {
        fontFamily: 'SF-Pro-Display',
        fontWeight: '500',
        fontSize: 13,
        lineHeight: 20,
        color: '#1A1A1A',
        marginBottom: 8,
    },
    bulletRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 6,
    },
    bullet: {
        fontFamily: 'SF-Pro-Display',
        fontSize: 10,
        color: '#555',
        lineHeight: 15,
        marginRight: 4,
    },
    stepText: {
        flex: 1,
        fontFamily: 'SF-Pro-Display',
        fontWeight: '400',
        fontSize: 10,
        lineHeight: 14,
        color: '#555',
    },
    imageWrapper: {
        width: IMAGE_W,
        height: IMAGE_H,
        borderRadius: 8,
        overflow: 'hidden',
        marginLeft: 8,
    },
    image: {
        width: '100%',
        height: '100%',
    },
});