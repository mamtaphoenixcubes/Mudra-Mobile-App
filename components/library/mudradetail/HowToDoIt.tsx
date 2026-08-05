import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const IMAGE_W = SCREEN_WIDTH * 0.24;
const IMAGE_H = IMAGE_W * 0.75;

const fallbackSteps = [
    'Sit comfortably with your spine erect.',
    'Touch the tip of your index finger to the tip of your thumb.',
    'Keep the other three fingers relaxed and extended.',
    'Breathe deeply and hold for 5-15 minutes.',
];


export default function HowToDoIt({ mudra }: { mudra?: any }) {
    const source = mudra?.data ?? mudra;

    // Extract steps from HowToDoIt.instructionsPoints
    const structuredSteps =
        source?.HowToDoIt?.instructionsPoints?.flatMap(
            (group: any) =>
                group?.children?.map(
                    (item: any) => item?.children?.[0]?.text
                ) || []
        ) || [];

    const stepsToShow = structuredSteps.length > 0
            ? structuredSteps
            : Array.isArray(source?.howToDo) && source.howToDo.length > 0
            ? source.howToDo
            : fallbackSteps;
   const BASE_URL = process.env.EXPO_PUBLIC_IMAGE_API_URL;

   const bannerImageUrl = source?.bannerImage?.formats?.large?.url ? `${BASE_URL}${source.bannerImage.formats.large.url}` : source?.bannerImage?.url ? `${BASE_URL}${source.bannerImage.url}`: null;


    return (
        <View style={styles.container}>
            <View style={styles.card}>

                {/* Left Content */}
                <View style={styles.leftContent}>
                    <Text style={styles.title}>How to do it</Text>

                    {stepsToShow.map((step: string, index: number) => (
                        <View key={index} style={styles.bulletRow}>
                            <Text style={styles.bullet}>•</Text>
                            <Text style={styles.stepText}>{step}</Text>
                        </View>
                    ))}
                </View>

                {/* Right Image */}
                <View style={styles.imageWrapper}>
                    <Image
                        source={
                            bannerImageUrl
                                ? { uri: bannerImageUrl }
                                : require('@/assets/images/Pranayama_Images/Rectangle 34624418 (7).png')
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