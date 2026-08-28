import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const IMAGE_W = SCREEN_WIDTH * 0.24;
const IMAGE_H = IMAGE_W * 0.75;

const fallbackSteps = [
    'Find a quiet space and sit or lie down comfortably.',
    'Close your eyes and take three slow, deep breaths.',
    'Bring your attention to your feet, then slowly move upward through the body.',
    'Notice any tension without judgment, letting it soften as you exhale.',
];

export default function MeditationDetailHowToDoIt({ meditation }: { meditation?: any }) {
    const stepsToShow = Array.isArray(meditation?.howToDo) && meditation.howToDo.length > 0
        ? meditation.howToDo
        : fallbackSteps;

    const bannerImageUrl = meditation?.bannerImage?.url || null;

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
    container: { paddingHorizontal: 16, paddingTop: 16 },
    card: { backgroundColor: '#FFDBA7', borderRadius: 10, padding: 10, flexDirection: 'row', alignItems: 'center' },
    leftContent: { flex: 1, minWidth: 0 },
    title: { fontFamily: 'SF-Pro-Display', fontWeight: '500', fontSize: 13, lineHeight: 20, color: '#1A1A1A', marginBottom: 8 },
    bulletRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 6 },
    bullet: { fontFamily: 'SF-Pro-Display', fontSize: 10, color: '#555', lineHeight: 15, marginRight: 4 },
    stepText: { flex: 1, fontFamily: 'SF-Pro-Display', fontWeight: '400', fontSize: 10, lineHeight: 14, color: '#555' },
    imageWrapper: { width: IMAGE_W, height: IMAGE_H, borderRadius: 8, overflow: 'hidden', marginLeft: 8 },
    image: { width: '100%', height: '100%' },
});