import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, ScrollView, NativeSyntheticEvent, NativeScrollEvent, TouchableOpacity } from 'react-native';
import ElementAirIcon from '@/assets/icons/elementair.svg';
import BeginnerIcon from '@/assets/icons/beginner.svg';
import HandIcon from '@/assets/icons/hand.svg';
import { useTheme } from '@/constants/ThemeContext';
import ElementAirWhiteIcon from '@/assets/icons/elementairWhite.svg'
import BeginnerWhiteIcon from '@/assets/icons/beginnerWhite.svg'
import HandWhiteIcon from '@/assets/icons/handWhite.svg'
import ImageViewerModal from '@/components/common/ImageViewerModal'

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const IMAGE_WIDTH = SCREEN_WIDTH * 0.4;
const IMAGE_HEIGHT = IMAGE_WIDTH * 1.2;

const mudraData = [
    {
        id: 1,
        name: 'Jnana Mudra',
        tags: ['Mind', 'Clarity', 'Awareness'],
        description: 'Enhances focus, memory and inner wisdom. Calms the mind and reduces stress.',
        imageCount: 4,
        currentImage: 1,
        image: require('@/assets/images/Pranayama_Images/Rectangle 34624418 (6).png'),
        details: [
            { label: 'Element', value: 'Air', Icon: ElementAirIcon },
            { label: 'Level', value: 'Beginner', Icon: BeginnerIcon },
            { label: 'Type', value: 'Hand Mudra', Icon: HandIcon },
        ],
    },
];

const DEFAULT_IMAGE = require('@/assets/images/Pranayama_Images/Rectangle 34624418.png');

type Props = { mudra?: any };

function resolveImageUrl(image: any): string | null {
    if (!image) return null;
    if (typeof image === 'string') return image;
    if (image.url) return image.url;
    if (typeof image === 'object' && image.uri) return image.uri;
    if (image.formats?.large?.url) return image.formats.large.url;
    if (image.formats?.medium?.url) return image.formats.medium.url;
    if (image.formats?.small?.url) return image.formats.small.url;
    if (image.formats?.thumbnail?.url) return image.formats.thumbnail.url;
    return null;
}
const BASE_URL = process.env.EXPO_PUBLIC_IMAGE_API_URL;

function buildImageSources(source: any, fallbackImage: any) {
    const images: any[] = [];
    const sourceImage = source?.image;

    if (Array.isArray(sourceImage) && sourceImage.length) {
        sourceImage.forEach((img: any) => {
            const resolved = resolveImageUrl(img);
            if (resolved) images.push({ uri: resolved });
        });
    } else if (sourceImage) {
        const resolved = resolveImageUrl(sourceImage);
        if (resolved) images.push({ uri: resolved });
        else if (typeof sourceImage === 'object') images.push(sourceImage);
    }

    if (images.length === 0 && source?.thumbnail) {
        const resolved = resolveImageUrl(source.thumbnail);
        if (resolved) images.push({ uri: resolved });
    }

    if (images.length === 0 && fallbackImage) {
        images.push(fallbackImage);
    }

    if (images.length === 0) {
        images.push(DEFAULT_IMAGE);
    }

    return images;
}

function mapApiMudra(m: any, fallbackImage: any) {
    if (!m) return null;
    const source = m.data ?? m;
    const images = buildImageSources(source, fallbackImage);
    const tags = Array.isArray(source.tags) ? source.tags : source.tagList || [];
    const { colors, isDark } = useTheme()

    return {
        id: source.id,
        name: source.name || source.title || 'Untitled',
        tags,
        description: source.description || source.shortDescription || '',
        element: source.element || '',
        intentions: Array.isArray(source.intentions)
            ? source.intentions.map((item: any) => item.name)
            : [],
        chakra: source.chakra || '',
        level: source.level || '',
        type: source.type || '',
        imageCount: images.length,
        currentImage: 1,
        image: images,
        images,
        details: [
            { label: 'Element', value: source.element || '', Icon: isDark ? ElementAirWhiteIcon : ElementAirIcon },
            { label: 'Level', value: source.level || '', Icon: isDark ? BeginnerWhiteIcon : BeginnerIcon },
            { label: 'Type', value: source.type || '', Icon: isDark ? HandWhiteIcon : HandIcon },
        ],
    };
}

export default function HeroSection({ mudra }: Props) {
    const { colors, isDark } = useTheme()


    const resolvedMudra = mapApiMudra(mudra ?? mudraData[0], mudraData[0].image);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [viewerVisible, setViewerVisible] = useState(false);

    if (!resolvedMudra) {
        return null;
    }

    const handleScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const index = Math.round(event.nativeEvent.contentOffset.x / event.nativeEvent.layoutMeasurement.width);
        setCurrentImageIndex(index);
    };

    const images = (Array.isArray(resolvedMudra.images) ? resolvedMudra.images : [resolvedMudra.image]).map((img) => ({ ...img, uri: img?.uri ? `${BASE_URL}${img.uri}` : null, }));

    return (
        <View style={styles.outerContainer}>
            <View style={styles.container}>

                {/* ── Left: Image Carousel ── */}
                <View style={styles.imageWrapper}>
                    <ScrollView
                        horizontal
                        pagingEnabled
                        showsHorizontalScrollIndicator={false}
                        onMomentumScrollEnd={handleScrollEnd}
                    >
                        {images.map((imgSource, index) => (
                            <TouchableOpacity
                                key={index}
                                activeOpacity={0.9}
                                onPress={() => {
                                    setCurrentImageIndex(index);
                                    setViewerVisible(true);
                                }}
                            >
                                <Image
                                    key={index}
                                    source={imgSource}
                                    style={[styles.image, { width: IMAGE_WIDTH }]}
                                    resizeMode="cover"
                                />
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                    <View style={styles.badge}>
                        <Text style={styles.badgeText}>
                            {currentImageIndex + 1}/{images.length}
                        </Text>
                    </View>
                </View>

                {/* ── Right: Content ── */}
                <View style={styles.content}>

                    <Text style={[styles.name, { color: colors.text }]} numberOfLines={2}>{resolvedMudra.name}</Text>

                    {resolvedMudra?.intentions.length > 0 && (
                        <View style={styles.tagPill}>
                            <Text style={styles.tagText} numberOfLines={1}>
                                {resolvedMudra.intentions.join('  •  ')}
                            </Text>
                        </View>
                    )}

                    <Text style={[styles.description, { color: colors.textSub }]} numberOfLines={3}>
                        {resolvedMudra.description}
                    </Text>

                    {/* Detail Row */}
                    {/* <View style={styles.detailRow}>
                    {resolvedMudra.details.map((detail, index) => (
                        <React.Fragment key={index}>
                            <View style={styles.detailItem}>
                                <detail.Icon width={12} height={12} />
                                <View style={styles.detailTextColumn}>
                                    <Text style={[styles.detailLabel, { color: colors.textSub }]} numberOfLines={1}>
                                        {detail.label}
                                    </Text>
                                    <Text style={[styles.detailValue, { color: colors.textSub }]} numberOfLines={1}>
                                        {detail.value}
                                    </Text>
                                </View>
                            </View>
                            {index < resolvedMudra.details.length - 1 && (
                                <View style={[styles.detailSeparator, { backgroundColor: colors.dividerDark }]} />
                            )}
                        </React.Fragment>
                    ))}
                </View> */}


                </View>
            </View>
            <View style={[styles.attrsRow, { borderTopColor: colors.dividerDark }]}>
                {resolvedMudra.details.map((detail, index) => (
                    <React.Fragment key={index}>
                        <View style={styles.attrItem}>
                            <detail.Icon width={15} height={15} />
                            <Text style={[styles.attrLabel, { color: colors.textSub }]} numberOfLines={1}>
                                {detail.value}
                            </Text>
                        </View>
                        {index < resolvedMudra.details.length - 1 && (
                            <View style={[styles.attrDivider, { backgroundColor: colors.dividerDark }]} />
                        )}
                    </React.Fragment>
                ))}
            </View>
            <ImageViewerModal
                visible={viewerVisible}
                images={images}
                initialIndex={currentImageIndex}
                onClose={() => setViewerVisible(false)}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        // paddingHorizontal: 16,
        // paddingTop: 16,
        gap: 12,
        alignItems: 'flex-start',
    },
    outerContainer: {
        paddingHorizontal: 16,
        paddingTop: 16,
        gap: 12,
    },

    // ── Image ──
    imageWrapper: {
        width: IMAGE_WIDTH,
        height: IMAGE_HEIGHT,
        borderRadius: 10,
        overflow: 'hidden',
        flexShrink: 0,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    badge: {
        position: 'absolute',
        bottom: 10,
        right: 10,
        backgroundColor: '#0F0F0F80',
        borderRadius: 6,
        paddingHorizontal: 8,
        paddingVertical: 3,
    },
    badgeText: {
        fontFamily: 'SF-Pro-Display',
        fontWeight: '500',
        fontSize: 12,
        color: '#fff',
    },

    // ── Content ──
    content: {
        flex: 1,
        minWidth: 0,
        gap: 7,
    },
    name: {
        fontFamily: 'SF-Pro-Display',
        fontWeight: '500',
        fontSize: SCREEN_WIDTH < 375 ? 16 : 18,   // ← smaller on tiny screens
        lineHeight: SCREEN_WIDTH < 375 ? 20 : 24,
        color: '#000',
    },
    tagPill: {
        alignSelf: 'flex-start',
        backgroundColor: '#fff',
        borderRadius: 60,
        borderWidth: 0.38,
        borderColor: '#00000066',
        paddingHorizontal: 10,
        paddingVertical: 4,
        maxWidth: '100%',       // ← never overflow
    },
    tagText: {
        fontFamily: 'SF-Pro-Display',
        fontWeight: '400',
        fontSize: 10,
        lineHeight: 15,
        color: '#333',
    },
    description: {
        fontFamily: 'SF-Pro-Display',
        fontWeight: '400',
        fontSize: SCREEN_WIDTH < 375 ? 11 : 12,
        lineHeight: 17,
        color: '#666',
    },

    // ── Detail Row ──
    detailRow: {
        flexDirection: 'row',
        alignItems: 'center',
        flexShrink: 1,
    },
    detailItem: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 3,
        minWidth: 0,
        flexShrink: 1,
    },
    detailTextColumn: {
        flexShrink: 1,
        minWidth: 0,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 10,
        marginTop: 8,
    },
    infoText: {
        fontFamily: 'SF-Pro-Display',
        fontWeight: '400',
        fontSize: 12,
        lineHeight: 16,
        color: '#333',
        flexShrink: 1,
    },
    detailLabel: {
        fontFamily: 'SF-Pro-Display',
        fontWeight: '400',
        fontSize: 8,
        lineHeight: 11,
        color: '#888',
    },
    detailValue: {
        fontFamily: 'SF-Pro-Display',
        fontWeight: '400',
        fontSize: 8,
        lineHeight: 11,
        color: '#888',
        flexShrink: 1,
    },
    detailSeparator: {
        width: StyleSheet.hairlineWidth,
        height: 24,
        backgroundColor: '#00000030',
        flexShrink: 0,
        marginHorizontal: 3,
        alignSelf: 'center',
    },
    attrsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        borderTopWidth: 0.5,
        //borderTopColor: colors.dividerDark,  // need inline
        paddingTop: 12,
        marginTop: 8,
        width: '100%',
    },
    attrItem: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 5,
    },
    attrLabel: {
        fontFamily: 'SF-Pro-Display',
        fontWeight: '500',
        fontSize: 12,
        color: '#888',
    },
    attrDivider: {
        width: 0.5,
        height: 20,
        backgroundColor: '#00000020',
    },
});