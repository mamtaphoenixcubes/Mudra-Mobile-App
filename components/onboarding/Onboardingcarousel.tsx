import React, { useEffect, useRef, useState } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Animated,
    ScrollView,
    FlatList,
    Dimensions,
    NativeSyntheticEvent,
    NativeScrollEvent,
} from 'react-native';
import { router } from 'expo-router';
import { carouselStyles as styles } from '@/assets/styles/onboarding/splashStyles';
import LotusBlack from '@/assets/icons/LotusBlack.svg';
import EnergyIcon from '@/assets/icons/Energy.svg';
import BrainIcon from '@/assets/icons/brain.svg';
import BookIcon from '@/assets/icons/Book.svg';
import ScienceIcon from '@/assets/icons/Science.svg';
import ClockIcon from '@/assets/icons/clock.svg';
import BenefitsIcon from '@/assets/icons/Benefits.svg';
import StarIcon from '@/assets/icons/Star.svg';
import JourneyIcon from '@/assets/icons/Journey.svg';
import SelfIcon from '@/assets/icons/Self.svg';

const { width } = Dimensions.get('window');

const SLIDES = [
    {
        id: '1',
        image: require('@/assets/images/Pranayama_Images/Carousel1.png'),
        title: 'Discover the Power\nof Mudras',
        description:
            'Mudras are simple hand gestures that activate energy flow, restore balance, and support your physical, mental, and emotional well-being.',
        features: [
            { icon: EnergyIcon, label: 'Boost Energy\nNaturally', bg: '#EBCFFF' },
            { icon: LotusBlack, label: 'Restore Balance\n& Harmony', bg: '#CBECFF' },
            { icon: BrainIcon, label: 'Calm Your Mind &\nReduce Stress', bg: '#FFDBE7' },
        ],
    },
    {
        id: '2',
        image: require('@/assets/images/Pranayama_Images/Carousel2.png'),
        title: 'Ancient Wisdom,\nModern Benefits',
        description:
            'Rooted in ancient traditions and backed by modern science, Mudras help you lead a healthier, more balanced life every day.',
        features: [
            { icon: BookIcon, label: 'Ancient Practice\nTimeless Wisdom', bg: '#EBCFFF' },
            { icon: ScienceIcon, label: 'Backed by\nModern Science', bg: '#CBECFF' },
            { icon: StarIcon, label: 'Natural & Holistic\nWellness', bg: '#FFDBE7' },
        ],
    },
    {
        id: '3',
        image: require('@/assets/images/Pranayama_Images/Carousel3.png'),
        title: 'Small Gestures,\nPowerful Results',
        description:
            'Just a few minutes of Mudras each day can bring lasting positive changes to your body, mind, and soul.',
        features: [
            { icon: ClockIcon, label: 'Take Just\nMinutes a Day', bg: '#EBCFFF' },
            { icon: BenefitsIcon, label: 'See Real, Lasting\nBenefits', bg: '#CBECFF' },
            { icon: StarIcon, label: 'Simple, Natural &\nEffective', bg: '#FFDBE7' },
        ],
    },
    {
        id: '4',
        image: require('@/assets/images/Pranayama_Images/Carousel4.png'),
        title: 'Your Journey\nStarts Now',
        description:
            'Embrace the ancient wisdom of Mudras and unlock a healthier, happier, and more balanced you.',
        features: [
            { icon: JourneyIcon, label: 'Begin Your\nHealing Journey', bg: '#EBCFFF' },
            { icon: LotusBlack, label: 'Connect with\nAncient Wisdom', bg: '#CBECFF' },
            { icon: SelfIcon, label: 'Become Your\nBest Self', bg: '#FFDBE7' },
        ],
    },
];

const AUTO_SCROLL_INTERVAL = 3000; // 3 seconds per slide

export default function OnboardingCarousel() {
    const [activeIndex, setActiveIndex] = useState(0);
    const flatListRef = useRef<FlatList>(null);
    const autoScrollTimer = useRef<ReturnType<typeof setInterval> | null>(null);

    // Button animations
    const buttonAnim = useRef(new Animated.Value(0)).current;
    const buttonSlide = useRef(new Animated.Value(20)).current;

    useEffect(() => {
        // Animate button in on mount
        Animated.parallel([
            Animated.timing(buttonAnim, { toValue: 1, duration: 500, delay: 300, useNativeDriver: true }),
            Animated.timing(buttonSlide, { toValue: 0, duration: 500, delay: 300, useNativeDriver: true }),
        ]).start();

        startAutoScroll();
        return () => stopAutoScroll();
    }, []);

    const startAutoScroll = () => {
        stopAutoScroll();
        autoScrollTimer.current = setInterval(() => {
            setActiveIndex((prev) => {
                const next = prev < SLIDES.length - 1 ? prev + 1 : 0;
                flatListRef.current?.scrollToIndex({ index: next, animated: true });
                return next;
            });
        }, AUTO_SCROLL_INTERVAL);
    };

    const stopAutoScroll = () => {
        if (autoScrollTimer.current) {
            clearInterval(autoScrollTimer.current);
            autoScrollTimer.current = null;
        }
    };

    const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
        const index = Math.round(e.nativeEvent.contentOffset.x / width);
        setActiveIndex(index);
        // Reset auto scroll timer on manual swipe
        startAutoScroll();
    };

    const handleNext = () => {
        stopAutoScroll();
        if (activeIndex < SLIDES.length - 1) {
            const next = activeIndex + 1;
            flatListRef.current?.scrollToIndex({ index: next, animated: true });
            setActiveIndex(next);
            startAutoScroll();
        } else {
            // router.replace('/auth/login');
            router.replace('/(tabs)');
        }
    };

    const handleSkip = () => {
        stopAutoScroll();
        //router.replace('/auth/login');
        router.replace('/(tabs)');
    };

    const handleBack = () => {
        stopAutoScroll();
        if (activeIndex > 0) {
            const prev = activeIndex - 1;
            flatListRef.current?.scrollToIndex({ index: prev, animated: true });
            setActiveIndex(prev);
            startAutoScroll();
        } else {
            router.replace('/onboarding/welcome');
        }
    };

    const renderSlide = ({ item }: { item: typeof SLIDES[0] }) => (
        <View style={{ width }}>
            {/* Hero image */}
            <View style={styles.heroWrapper}>
                <View style={styles.heroImageContainer}>
                    <Image source={item.image} style={styles.heroImage} />
                </View>
            </View>

            {/* Content */}
            <View style={styles.contentContainer}>

                {/* Title */}
                <Text style={styles.title}>{item.title}</Text>

                {/* Lotus divider */}
                {/* Lotus divider */}
                <View style={styles.lotusContainer}>
                    <View style={styles.lotusLine} />
                    <View style={styles.lotusIcon}>
                        <LotusBlack width={28} height={28} />
                    </View>
                    <View style={styles.lotusLine} />
                </View>

                {/* Description */}
                <Text style={styles.description}>{item.description}</Text>

                {/* Feature icons */}
                <View style={styles.featuresRow}>
                    {item.features.map((feature, index) => {
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
                </View>

            </View>
        </View>
    );

    const isLastSlide = activeIndex === SLIDES.length - 1;

    return (
        <View style={styles.container}>

            {/* Skip button */}
            <TouchableOpacity
                style={styles.skipButton}
                onPress={handleSkip}
                activeOpacity={0.7}
            >
                <Text style={styles.skipText}>Skip</Text>
            </TouchableOpacity>

            {/* Auto-scrolling slides */}
            <FlatList
                ref={flatListRef}
                data={SLIDES}
                renderItem={renderSlide}
                keyExtractor={(item) => item.id}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onMomentumScrollEnd={handleScroll}
                scrollEventThrottle={16}
                getItemLayout={(_, index) => ({
                    length: width,
                    offset: width * index,
                    index,
                })}
            />

            {/* Pagination dots + buttons — fixed at bottom */}
            <Animated.View
                style={[
                    styles.bottomFixed,
                    {
                        opacity: buttonAnim,
                        transform: [{ translateY: buttonSlide }],
                    },
                ]}
            >
                {/* Dots */}
                <View style={styles.dotsRow}>
                    {SLIDES.map((_, index) => (
                        <View
                            key={index}
                            style={index === activeIndex ? styles.dotActive : styles.dot}
                        />
                    ))}
                </View>

                {/* Next / Let's Begin button */}
                <TouchableOpacity
                    style={styles.button}
                    activeOpacity={0.85}
                    onPress={handleNext}
                >
                    <Text style={styles.buttonText}>
                        {isLastSlide ? "Let's Begin" : 'Next'}
                    </Text>
                </TouchableOpacity>

                {/* Back link — hidden on first slide */}
                {activeIndex > 0 && (
                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={handleBack}
                    >
                        <Text style={styles.skipText}>Back</Text>
                    </TouchableOpacity>
                )}
            </Animated.View>

        </View>
    );
}