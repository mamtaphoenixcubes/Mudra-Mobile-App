import React, { useEffect, useRef } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Animated,
    ScrollView,
    Dimensions,
} from 'react-native';
import { router } from 'expo-router';
import { welcomeStyles as styles } from '@/assets/styles/onboarding/splashStyles';
import LotusBlack from '@/assets/icons/LotusBlack.svg';
import HandIcon from '@/assets/icons/hand.svg';
import MeditationIcon from '@/assets/icons/Meditation.svg';
import NidraIcon from '@/assets/icons/nidra.svg';

const FEATURES = [
    { icon: HandIcon, label: 'Ancient\nPractice', bg: '#FFF6BF' },
    { icon: LotusBlack, label: 'Holistic\nHealing', bg: '#EBCFFF' },
    { icon: MeditationIcon, label: 'Mind-Body\nBalance', bg: '#CBECFF' },
    { icon: NidraIcon, label: 'Inner Peace &\nWellbeing', bg: '#FFDBE7' },
];

export default function WelcomeScreen() {
    // Individual animation values for staggered entrance
    const imageAnim = useRef(new Animated.Value(0)).current;
    const titleAnim = useRef(new Animated.Value(0)).current;
    const subtitleAnim = useRef(new Animated.Value(0)).current;
    const descAnim = useRef(new Animated.Value(0)).current;
    const featuresAnim = useRef(new Animated.Value(0)).current;
    const buttonAnim = useRef(new Animated.Value(0)).current;

    // Slide values
    const imageSlide = useRef(new Animated.Value(-20)).current;
    const titleSlide = useRef(new Animated.Value(24)).current;
    const subtitleSlide = useRef(new Animated.Value(24)).current;
    const descSlide = useRef(new Animated.Value(24)).current;
    const featuresSlide = useRef(new Animated.Value(24)).current;
    const buttonSlide = useRef(new Animated.Value(24)).current;

    const makeAnim = (opacity: Animated.Value, translate: Animated.Value, delay: number) =>
        Animated.parallel([
            Animated.timing(opacity, {
                toValue: 1,
                duration: 500,
                delay,
                useNativeDriver: true,
            }),
            Animated.timing(translate, {
                toValue: 0,
                duration: 500,
                delay,
                useNativeDriver: true,
            }),
        ]);

    useEffect(() => {
        // Staggered sequence — each element comes in 100ms after the previous
        Animated.sequence([
            makeAnim(imageAnim, imageSlide, 0),
            makeAnim(titleAnim, titleSlide, 0),
            makeAnim(subtitleAnim, subtitleSlide, 0),
            makeAnim(descAnim, descSlide, 0),
            makeAnim(featuresAnim, featuresSlide, 0),
            makeAnim(buttonAnim, buttonSlide, 0),
        ]).start();

        // Run all with stagger instead of sequence for smoother feel
        Animated.stagger(100, [
            makeAnim(imageAnim, imageSlide, 0),
            makeAnim(titleAnim, titleSlide, 0),
            makeAnim(subtitleAnim, subtitleSlide, 0),
            makeAnim(descAnim, descSlide, 0),
            makeAnim(featuresAnim, featuresSlide, 0),
            makeAnim(buttonAnim, buttonSlide, 0),
        ]).start();
    }, []);

    return (
        <ScrollView
            style={styles.container}
            bounces={false}
            showsVerticalScrollIndicator={false}
        >
            {/* Hero Image — rounded corners, padded from edges */}
            <Animated.View
                style={[
                    styles.heroWrapper,
                    {
                        opacity: imageAnim,
                        transform: [{ translateY: imageSlide }],
                    },
                ]}
            >
                <View style={styles.heroImageContainer}>
                    <Image
                        source={require('@/assets/images/Pranayama_Images/Welcome.png')}
                        style={styles.heroImage}
                    />
                </View>
            </Animated.View>

            {/* Content */}
            <View style={styles.contentContainer}>

                {/* Title */}
                <Animated.Text
                    style={[
                        styles.title,
                        {
                            opacity: titleAnim,
                            transform: [{ translateY: titleSlide }],
                        },
                    ]}
                >
                    Welcome to Mudras
                </Animated.Text>

                {/* Lotus divider */}
                <Animated.View
                    style={[
                        styles.lotusContainer,
                        {
                            opacity: subtitleAnim,
                            transform: [{ translateY: subtitleSlide }],
                        },
                    ]}
                >
                    <View style={styles.lotusLine} />
                    <View style={styles.lotusIcon}>
                        <LotusBlack width={28} height={28} />
                    </View>
                    <View style={styles.lotusLine} />
                </Animated.View>
                {/* Subtitle */}
                <Animated.Text
                    style={[
                        styles.subtitle,
                        {
                            opacity: subtitleAnim,
                            transform: [{ translateY: subtitleSlide }],
                        },
                    ]}
                >
                    Ancient wisdom.{'\n'}In your hands.
                </Animated.Text>

                {/* Description */}
                <Animated.Text
                    style={[
                        styles.description,
                        {
                            opacity: descAnim,
                            transform: [{ translateY: descSlide }],
                        },
                    ]}
                >
                    Mudras are sacred hand gestures that channel energy, balance the
                    elements, and harmonize mind, body, and spirit.
                </Animated.Text>

                {/* Feature icons row */}
                <Animated.View
                    style={[
                        styles.featuresRow,
                        {
                            opacity: featuresAnim,
                            transform: [{ translateY: featuresSlide }],
                        },
                    ]}
                >
                    {FEATURES.map((feature, index) => {
                        const IconComponent = feature.icon;
                        return (
                            <View key={index} style={styles.featureItem}>
                                <View
                                    style={[
                                        styles.featureIconContainer,
                                        { backgroundColor: feature.bg },
                                    ]}
                                >
                                    <IconComponent width={28} height={28} />
                                </View>
                                <Text style={styles.featureLabel}>{feature.label}</Text>
                            </View>
                        );
                    })}
                </Animated.View>

                {/* CTA Button */}
                <Animated.View
                    style={[
                        { width: '100%' },
                        {
                            opacity: buttonAnim,
                            transform: [{ translateY: buttonSlide }],
                        },
                    ]}
                >
                    <TouchableOpacity
                        style={styles.button}
                        activeOpacity={0.85}
                        onPress={() => router.push('/onboarding/carousel')}
                    >
                        <Text style={styles.buttonText}>Begin Your Journey</Text>
                    </TouchableOpacity>
                </Animated.View>

                {/* Skip link */}
                <Animated.View
                    style={{
                        opacity: buttonAnim,
                        transform: [{ translateY: buttonSlide }],
                    }}
                >
                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => router.replace('/(tabs)')}
                    >
                        <Text style={styles.skipText}>I&apos;ll explore later</Text>
                    </TouchableOpacity>
                </Animated.View>

                {/* Pagination dots */}
                <Animated.View
                    style={[
                        styles.dotsRow,
                        { opacity: buttonAnim },
                    ]}
                >
                    <View style={styles.dotActive} />
                    <View style={styles.dot} />
                    <View style={styles.dot} />
                    <View style={styles.dot} />
                </Animated.View>

            </View>
        </ScrollView>
    );
}