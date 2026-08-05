import React, { useRef, useState } from 'react';
import {
    Modal,
    View,
    Image,
    TouchableOpacity,
    Pressable,
    StyleSheet,
    useWindowDimensions,
    Animated,
    StatusBar,
    ScrollView,
    Text,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@/constants/ThemeContext';

// ── Close Icon ────────────────────────────────────────────────────────────────
const CloseIcon = ({ color }: { color: string }) => (
    <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
        <Path
            d="M18 6L6 18M6 6L18 18"
            stroke={color}
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </Svg>
);

// ── Props ─────────────────────────────────────────────────────────────────────
interface ImageViewerModalProps {
    visible: boolean;
    images: any[];   // array of require(...) or { uri: '...' }
    initialIndex?: number;
    onClose: () => void;
}

// ── Component ─────────────────────────────────────────────────────────────────
export default function ImageViewerModal({
    visible,
    images,
    initialIndex = 0,
    onClose,
}: ImageViewerModalProps) {
    const { colors, isDark } = useTheme();
    const insets = useSafeAreaInsets();

    // Responsive: reacts to rotation, foldables, tablets — not just a static Dimensions.get()
    const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = useWindowDimensions();

    const opacityAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(0.94)).current;
    const [currentIndex, setCurrentIndex] = useState(initialIndex);
    const scrollRef = useRef<ScrollView>(null);

    // ── Responsive card sizing ──
    // Card width: 85% of screen, capped at 340 so it doesn't balloon on tablets
    const CARD_WIDTH = Math.min(SCREEN_WIDTH * 0.85, 340);
    // Card image height: capped so it never exceeds ~60% of screen height on short devices
    const CARD_IMAGE_HEIGHT = Math.min(CARD_WIDTH * 1.05, SCREEN_HEIGHT * 0.6);

    const handleShow = () => {
        setCurrentIndex(initialIndex);
        setTimeout(() => {
            scrollRef.current?.scrollTo({ x: initialIndex * CARD_WIDTH, animated: false });
        }, 50);
        Animated.parallel([
            Animated.timing(opacityAnim, {
                toValue: 1,
                duration: 200,
                useNativeDriver: true,
            }),
            Animated.spring(scaleAnim, {
                toValue: 1,
                friction: 8,
                tension: 80,
                useNativeDriver: true,
            }),
        ]).start();
    };

    const handleClose = () => {
        Animated.parallel([
            Animated.timing(opacityAnim, {
                toValue: 0,
                duration: 160,
                useNativeDriver: true,
            }),
            Animated.timing(scaleAnim, {
                toValue: 0.94,
                duration: 160,
                useNativeDriver: true,
            }),
        ]).start(() => onClose());
    };

    const handleScroll = (e: any) => {
        const index = Math.round(e.nativeEvent.contentOffset.x / CARD_WIDTH);
        setCurrentIndex(index);
    };

    const cardBg = '#0F0F0F';
    const backdropColor = isDark ? 'rgba(0,0,0,0.7)' : 'rgba(15,15,15,0.55)';
    const dotActive = '#FFFFFF';
    const dotInactive = 'rgba(255,255,255,0.3)';

    const isMultiple = images.length > 1;

    if (!images || images.length === 0) return null;

    return (
        <Modal
            visible={visible}
            transparent
            animationType="none"
            statusBarTranslucent
            onRequestClose={handleClose}
            onShow={handleShow}
        >
            <StatusBar hidden />

            {/* ── Backdrop wrapper — plain View, just for centering/insets ── */}
            <Animated.View
                style={[
                    styles.backdrop,
                    {
                        backgroundColor: backdropColor,
                        opacity: opacityAnim,
                        paddingTop: insets.top,
                        paddingBottom: insets.bottom,
                    },
                ]}
            >
                {/*
                  ── Tap-outside-to-close ──
                  This is a SIBLING behind the card (absolute fill), not a wrapper
                  around it. That's the key fix: a Touchable/Pressable *wrapping*
                  the ScrollView fights with the ScrollView's own pan responder for
                  the horizontal swipe gesture (breaks paging, esp. on Android).
                  As a sibling, it only ever receives touches that land outside the
                  card's bounds, so it never competes with the ScrollView at all.
                */}
                <Pressable
                    style={StyleSheet.absoluteFillObject}
                    onPress={handleClose}
                />

                {/* ── Card — sits on top of the Pressable, untouched by it ── */}
                <Animated.View
                    style={[
                        styles.card,
                        {
                            width: CARD_WIDTH,
                            backgroundColor: cardBg,
                            transform: [{ scale: scaleAnim }],
                        },
                    ]}
                >
                    {/* Close button */}
                    <TouchableOpacity
                        style={styles.closeBtn}
                        onPress={handleClose}
                        activeOpacity={0.8}
                        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                    >
                        <CloseIcon color="#FFFFFF" />
                    </TouchableOpacity>

                    {/* Counter — only if multiple */}
                    {isMultiple && (
                        <View style={styles.counter}>
                            <Text style={styles.counterText}>
                                {currentIndex + 1} / {images.length}
                            </Text>
                        </View>
                    )}

                    {/* Image scroll — now a direct child of the card, no touch wrapper above it */}
                    <ScrollView
                        ref={scrollRef}
                        horizontal
                        pagingEnabled={isMultiple}
                        scrollEnabled={isMultiple}
                        showsHorizontalScrollIndicator={false}
                        onMomentumScrollEnd={handleScroll}
                        style={{ width: CARD_WIDTH, height: CARD_IMAGE_HEIGHT }}
                    >
                        {images.map((src, i) => (
                            <View
                                key={i}
                                style={{
                                    width: CARD_WIDTH,
                                    height: CARD_IMAGE_HEIGHT,
                                }}
                            >
                                <Image
                                    source={src}
                                    style={styles.image}
                                    resizeMode="cover"
                                />
                            </View>
                        ))}
                    </ScrollView>

                    {/* Dot indicators — only if multiple */}
                    {isMultiple && (
                        <View style={styles.dotsRow}>
                            {images.map((_, i) => (
                                <View
                                    key={i}
                                    style={[
                                        styles.dot,
                                        { backgroundColor: i === currentIndex ? dotActive : dotInactive },
                                        i === currentIndex && styles.dotActive,
                                    ]}
                                />
                            ))}
                        </View>
                    )}
                </Animated.View>
            </Animated.View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    backdrop: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    card: {
        borderRadius: 20,
        overflow: 'hidden',
        // Responsive shadow — subtle, works on both platforms
        shadowColor: '#000',
        shadowOpacity: 0.25,
        shadowRadius: 20,
        shadowOffset: { width: 0, height: 10 },
        elevation: 10,
    },
    closeBtn: {
        position: 'absolute',
        top: 10,
        right: 10,
        zIndex: 2,
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: 'rgba(255,255,255,0.18)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    counter: {
        position: 'absolute',
        top: 10,
        left: 10,
        zIndex: 2,
        backgroundColor: 'rgba(255,255,255,0.18)',
        borderRadius: 12,
        paddingHorizontal: 11,
        paddingVertical: 5,
    },
    counterText: {
        fontFamily: 'SF-Pro-Display',
        fontSize: 11,
        fontWeight: '500',
        color: '#FFFFFF',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    dotsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
        paddingVertical: 14,
    },
    dot: {
        width: 6,
        height: 6,
        borderRadius: 3,
    },
    dotActive: {
        width: 20,
        borderRadius: 3,
    },
});