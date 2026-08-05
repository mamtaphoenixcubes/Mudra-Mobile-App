import React, { useEffect, useRef } from 'react';
import {
    View,
    Animated,
    Dimensions,
    Image,
} from 'react-native';
import { router } from 'expo-router';
import { splashStyles as styles } from '@/assets/styles/onboarding/splashStyles';
import GroupLines from '@/assets/icons/Grouplines.svg';

const { width, height } = Dimensions.get('window');

export default function SplashScreen() {
    // ── Entrance animations ──────────────────────
    const logoOpacity = useRef(new Animated.Value(0)).current;
    const logoScale = useRef(new Animated.Value(0.8)).current;
    const titleOpacity = useRef(new Animated.Value(0)).current;
    const titleTranslateY = useRef(new Animated.Value(20)).current;
    const waveOpacity = useRef(new Animated.Value(0)).current;
    const spinnerRotation = useRef(new Animated.Value(0)).current;
    const spinnerOpacity = useRef(new Animated.Value(0)).current;

    // ── Continuous logo animations ───────────────
    const floatAnim = useRef(new Animated.Value(0)).current;
    const pulseAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        // Step 1 — logo fades + scales in
        Animated.parallel([
            Animated.timing(logoOpacity, {
                toValue: 1,
                duration: 800,
                useNativeDriver: true,
            }),
            Animated.spring(logoScale, {
                toValue: 1,
                friction: 6,
                tension: 40,
                useNativeDriver: true,
            }),
        ]).start(() => {

            // Step 2 — title slides up and fades in
            Animated.parallel([
                Animated.timing(titleOpacity, {
                    toValue: 1,
                    duration: 600,
                    useNativeDriver: true,
                }),
                Animated.timing(titleTranslateY, {
                    toValue: 0,
                    duration: 600,
                    useNativeDriver: true,
                }),
            ]).start(() => {

                // Step 3 — wave + spinner appear
                Animated.parallel([
                    Animated.timing(waveOpacity, {
                        toValue: 1,
                        duration: 500,
                        useNativeDriver: true,
                    }),
                    Animated.timing(spinnerOpacity, {
                        toValue: 1,
                        duration: 400,
                        useNativeDriver: true,
                    }),
                ]).start();

                // Step 4 — spinner rotates continuously
                Animated.loop(
                    Animated.timing(spinnerRotation, {
                        toValue: 1,
                        duration: 1800,
                        useNativeDriver: true,
                    })
                ).start();

                // Step 5 — float up and down continuously
                Animated.loop(
                    Animated.sequence([
                        Animated.timing(floatAnim, {
                            toValue: -10,
                            duration: 2000,
                            useNativeDriver: true,
                        }),
                        Animated.timing(floatAnim, {
                            toValue: 0,
                            duration: 2000,
                            useNativeDriver: true,
                        }),
                    ])
                ).start();

                // Step 6 — pulse (breathe) continuously
                Animated.loop(
                    Animated.sequence([
                        Animated.timing(pulseAnim, {
                            toValue: 1.06,
                            duration: 1800,
                            useNativeDriver: true,
                        }),
                        Animated.timing(pulseAnim, {
                            toValue: 1,
                            duration: 1800,
                            useNativeDriver: true,
                        }),
                    ])
                ).start();

                // Step 7 — navigate after 3.5s
                setTimeout(() => {
                    router.replace('/onboarding/welcome');
                }, 3500);
            });
        });
    }, []);

    const spinnerSpin = spinnerRotation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    return (
        <View style={styles.container}>

            {/* Logo + Title */}
            <View style={styles.centerContent}>
                <Animated.View
                    style={[
                        styles.logoContainer,
                        {
                            opacity: logoOpacity,
                            transform: [
                                { scale: Animated.multiply(logoScale, pulseAnim) },
                                { translateY: floatAnim },
                            ],
                        },
                    ]}
                >
                    <Image
                        source={require('@/assets/images/Pranayama_Images/MudraImage.png')}
                        style={styles.logoImage}
                    />
                </Animated.View>

                <Animated.Text
                    style={[
                        styles.title,
                        {
                            opacity: titleOpacity,
                            transform: [{ translateY: titleTranslateY }],
                        },
                    ]}
                >
                    M U D R A S
                </Animated.Text>
            </View>

            {/* Bottom — wave + spinner */}
            <View style={styles.bottomContainer}>

                {/* Spinner */}
                <Animated.View
                    style={[
                        styles.spinnerContainer,
                        {
                            opacity: spinnerOpacity,
                            transform: [{ rotate: spinnerSpin }],
                        },
                    ]}
                >
                    <View style={styles.spinnerOuter}>
                        <View style={styles.spinnerInner} />
                    </View>
                </Animated.View>

                {/* Wave SVG */}
                <Animated.View
                    style={[
                        styles.waveContainer,
                        { opacity: waveOpacity },
                    ]}
                >
                    <GroupLines
                        width={width}
                        height="100%"
                        preserveAspectRatio="xMidYMax slice"
                    />
                </Animated.View>

            </View>
        </View>
    );
}