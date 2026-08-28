import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, NativeSyntheticEvent, NativeScrollEvent, TouchableOpacity, Image } from 'react-native';
import ClockSvg from '@/assets/icons/clock.svg';
import ClockWhite from '@/assets/icons/ClockWhite.svg';
import GroupSvg from '@/assets/icons/Group.svg';
import GroupWhite from '@/assets/icons/GroupWhite.svg';
import LanguageSvg from '@/assets/icons/Language.svg';
import LanguageWhite from '@/assets/icons/LanguageWhite.svg';
import { useTheme } from '@/constants/ThemeContext';
import ImageViewerModal from '@/components/common/ImageViewerModal';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const IMAGE_WIDTH = SCREEN_WIDTH * 0.4;
const IMAGE_HEIGHT = IMAGE_WIDTH * 1.2;

const DEFAULT_IMAGE = require('@/assets/images/tabIcons/calm-mind.png');

const fallbackMeditation = {
    name: 'Body Scan Meditation',
    intentions: ['Relax', 'Awareness', 'Calm'],
    description: 'A guided practice that brings gentle attention through each part of the body to release tension and settle the mind.',
    duration: '15 min',
    level: 'Beginner',
    technique: 'Body Scan',
    images: [DEFAULT_IMAGE],
};

type Props = { meditation?: any };

export default function MeditationDetailHeroSection({ meditation }: Props) {
    const { colors, isDark } = useTheme();
    const data = meditation ?? fallbackMeditation;

    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [viewerVisible, setViewerVisible] = useState(false);

    const images = Array.isArray(data.images) && data.images.length > 0 ? data.images : [DEFAULT_IMAGE];

    const details = [
        { label: 'Duration', value: data.duration || '15 min', Icon: isDark ? ClockWhite : ClockSvg },
        { label: 'Level', value: data.level || 'Beginner', Icon: isDark ? GroupWhite : GroupSvg },
        { label: 'Technique', value: data.technique || 'Guided', Icon: isDark ? LanguageWhite : LanguageSvg },
    ];

    const handleScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const index = Math.round(event.nativeEvent.contentOffset.x / event.nativeEvent.layoutMeasurement.width);
        setCurrentImageIndex(index);
    };

    return (
        <View style={styles.outerContainer}>
            <View style={styles.container}>
                <View style={styles.imageWrapper}>
                    <ScrollView
                        horizontal
                        pagingEnabled
                        showsHorizontalScrollIndicator={false}
                        onMomentumScrollEnd={handleScrollEnd}
                    >
                        {images.map((imgSource: any, index: number) => (
                            <TouchableOpacity
                                key={index}
                                activeOpacity={0.9}
                                onPress={() => {
                                    setCurrentImageIndex(index);
                                    setViewerVisible(true);
                                }}
                            >
                                <Image
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

                <View style={styles.content}>
                    <Text style={[styles.name, { color: colors.text }]} numberOfLines={2}>{data.name}</Text>

                    {data.intentions?.length > 0 && (
                        <View style={styles.tagPill}>
                            <Text style={styles.tagText} numberOfLines={1}>
                                {data.intentions.join('  •  ')}
                            </Text>
                        </View>
                    )}

                    <Text style={[styles.description, { color: colors.textSub }]} numberOfLines={3}>
                        {data.description}
                    </Text>
                </View>
            </View>

            <View style={[styles.attrsRow, { borderTopColor: colors.dividerDark }]}>
                {details.map((detail, index) => (
                    <React.Fragment key={index}>
                        <View style={styles.attrItem}>
                            <detail.Icon width={15} height={15} />
                            <Text style={[styles.attrLabel, { color: colors.textSub }]} numberOfLines={1}>
                                {detail.value}
                            </Text>
                        </View>
                        {index < details.length - 1 && (
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
    container:
    {
        flexDirection: 'row',
        gap: 12,
        alignItems: 'flex-start'
    },
    outerContainer:
    {
        paddingHorizontal: 16,
        paddingTop: 16,
        gap: 12
    },
    imageWrapper:
    {
        width: IMAGE_WIDTH,
        height: IMAGE_HEIGHT,
        borderRadius: 10,
        overflow: 'hidden',
        flexShrink: 0
    },
    image:
    {
        width: '100%',
        height: '100%'
    },
    badge:
    {
        position: 'absolute',
        bottom: 10,
        right: 10,
        backgroundColor: '#0F0F0F80',
        borderRadius: 6,
        paddingHorizontal: 8,
        paddingVertical: 3
    },
    badgeText:
    {
        fontFamily: 'SF-Pro-Display',
        fontWeight: '500',
        fontSize: 12,
        color: '#fff'
    },
    content:
    {
        flex: 1,
        minWidth: 0,
        gap: 7
    },
    name:
    {
        fontFamily: 'SF-Pro-Display',
        fontWeight: '500',
        fontSize: SCREEN_WIDTH < 375 ? 16 : 18,
        lineHeight: SCREEN_WIDTH < 375 ? 20 : 24
    },
    tagPill:
    {
        alignSelf: 'flex-start',
        backgroundColor: '#fff',
        borderRadius: 60,
        borderWidth: 0.38,
        borderColor: '#00000066',
        paddingHorizontal: 10,
        paddingVertical: 4,
        maxWidth: '100%'
    },
    tagText:
    {
        fontFamily: 'SF-Pro-Display',
        fontWeight: '400',
        fontSize: 10,
        lineHeight: 15,
        color: '#333'
    },
    description:
    {
        fontFamily: 'SF-Pro-Display',
        fontWeight: '400',
        fontSize: SCREEN_WIDTH < 375 ? 11 : 12,
        lineHeight: 17
    },
    attrsRow:
    {
        flexDirection: 'row',
        alignItems: 'center',
        borderTopWidth: 0.5,
        paddingTop: 12,
        marginTop: 8,
        width: '100%'
    },
    attrItem:
    {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 5
    },
    attrLabel:
    {
        fontFamily: 'SF-Pro-Display',
        fontWeight: '500',
        fontSize: 12,
        color: '#888'
    },
    attrDivider:
    {
        width: 0.5,
        height: 20,
        backgroundColor: '#00000020'
    },
});