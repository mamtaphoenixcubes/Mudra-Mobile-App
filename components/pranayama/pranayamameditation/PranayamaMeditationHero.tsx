import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import ElementIcon from '@/assets/icons/elementair.svg';
import LevelIcon from '@/assets/icons/beginner.svg';
import TypeIcon from '@/assets/icons/hand.svg';
import { useTheme } from '@/constants/ThemeContext';
import ElementIconWhite from '@/assets/icons/elementairWhite.svg'
import LevelIconWhite from '@/assets/icons/beginnerWhite.svg'
import TypeIconWhite from '@/assets/icons/handWhite.svg'
import ImageViewerModal from '@/components/common/ImageViewerModal'

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const IMAGE_SIZE = SCREEN_WIDTH * 0.38;

interface Pranayama {
    name?: string;
    description?: string;
    element?: string;
    level?: string;
    type?: string;
    intentions?: {
        name: string;
    }[];
    image?: {
        uri?: string;
        url?: string;
    }[];
}

interface PranayamaMeditationHeroProps {
    pranayama?: Pranayama;
}
const DEFAULT_IMAGE = require('@/assets/images/tabIcons/calm-mind.png');

export default function PranayamaMeditationHero({
    pranayama,
}: PranayamaMeditationHeroProps) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [viewerVisible, setViewerVisible] = useState(false);

    const BASE_URL = process.env.EXPO_PUBLIC_IMAGE_API_URL;
    const { colors, isDark } = useTheme()

    const images = Array.isArray(pranayama?.image)
        ? pranayama.image.map((img: any) => ({
            uri: `${BASE_URL}${img?.uri || img?.url}`,
        }))
        : pranayama?.image
            ? [
                DEFAULT_IMAGE
            ]
            : [];

    const intentions = Array.isArray(pranayama?.intentions)
        ? pranayama.intentions.map((item: any) => item.name)
        : [];

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={styles.row}>

                {/* Images */}
                <View style={{ width: IMAGE_SIZE }}>
                    <ScrollView
                        horizontal
                        pagingEnabled
                        showsHorizontalScrollIndicator={false}
                        onMomentumScrollEnd={(e) => {
                            const index = Math.round(
                                e.nativeEvent.contentOffset.x /
                                e.nativeEvent.layoutMeasurement.width
                            );
                            setActiveIndex(index);
                        }}
                        style={{
                            width: IMAGE_SIZE,
                            height: IMAGE_SIZE,
                            borderRadius: 10,
                            overflow: 'hidden',
                        }}
                    >
                        {images.map((img, i) => (
                            <TouchableOpacity
                                key={i}
                                activeOpacity={0.9}
                                onPress={() => {
                                    setActiveIndex(i);
                                    setViewerVisible(true);
                                }}
                            >
                                <Image
                                    key={i}
                                    source={img}
                                    style={{
                                        width: IMAGE_SIZE,
                                        height: IMAGE_SIZE,
                                        borderRadius: 10,
                                    }}
                                    resizeMode="cover"
                                />
                            </TouchableOpacity>
                        ))}
                    </ScrollView>

                    <View style={styles.dots}>
                        {images.map((_, i) => (
                            <View
                                key={i}
                                style={[styles.dot, i === activeIndex && styles.dotActive, i === activeIndex && { backgroundColor: colors.text }]}
                            />
                        ))}
                    </View>
                </View>

                {/* Content */}
                <View style={styles.rightCol}>
                    <Text style={[styles.pranayamaName, { color: colors.text }]}>
                        {pranayama?.name}
                    </Text>

                    {intentions.length > 0 && (
                        <View style={[styles.tagPill, { borderColor: colors.hairlineDivider }]}>
                            <Text style={[styles.tagText, { color: colors.text }]}>
                                {intentions.join(' • ')}
                            </Text>
                        </View>
                    )}

                    <Text style={[styles.description, { color: colors.textSub }]}>
                        {pranayama?.description}
                    </Text>

                    <View style={styles.infoRow}>
                        <View style={styles.infoItem}>
                            {isDark ? <ElementIconWhite width={14} height={14} /> : <ElementIcon width={14} height={14} />}
                            <View>
                                <Text style={[styles.infoLabel, { color: colors.textSub }]}>Element</Text>
                                <Text style={[styles.infoValue, { color: colors.textSub }]}>
                                    {pranayama?.element}
                                </Text>
                            </View>
                        </View>

                        <View style={[styles.infoDivider, { backgroundColor: colors.dividerDark }]} />

                        <View style={styles.infoItem}>
                            {isDark ? <LevelIconWhite width={14} height={14} /> : <LevelIcon width={14} height={14} />}
                            <View>
                                <Text style={[styles.infoLabel, { color: colors.textSub }]}>Level</Text>
                                <Text style={[styles.infoValue, { color: colors.textSub }]}>
                                    {pranayama?.level}
                                </Text>
                            </View>
                        </View>

                        <View style={[styles.infoDivider, { backgroundColor: colors.dividerDark }]} />

                        <View style={styles.infoItem}>
                            {isDark ? <TypeIconWhite width={14} height={14} /> : <TypeIcon width={14} height={14} />}
                            <View>
                                <Text style={[styles.infoLabel, { color: colors.textSub }]}>Type</Text>
                                <Text style={[styles.infoValue, { color: colors.textSub }]}>
                                    {pranayama?.type}
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>

            </View>

            <View style={[styles.bottomDivider, { backgroundColor: colors.dividerDark }]} />
            <ImageViewerModal
                visible={viewerVisible}
                images={images}
                initialIndex={activeIndex}
                onClose={() => setViewerVisible(false)}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        paddingTop: 12,
    },
    row: {
        flexDirection: 'row',
        paddingHorizontal: 16,
        gap: 12,
        alignItems: 'flex-start',
    },
    dots: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 5,
        marginTop: 8,
    },
    dot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: '#D9D9D9',
    },
    dotActive: {
        backgroundColor: '#0F0F0F',
        width: 10,
    },
    rightCol: {
        flex: 1,
        gap: 7,
    },
    pranayamaName: {
        fontFamily: 'SF-Pro-Display',
        fontWeight: '500',
        fontSize: 18,
        color: '#0F0F0F',
        lineHeight: 24,
    },
    tagPill: {
        alignSelf: 'flex-start',
        borderRadius: 60,
        borderWidth: 0.8,
        borderColor: '#0F0F0F40',
        paddingHorizontal: 8,
        paddingVertical: 4,
    },
    tagText: {
        fontFamily: 'SF-Pro-Display',
        fontWeight: '500',
        fontSize: 10,
        color: '#0F0F0F',
        textAlign: 'center',
    },
    description: {
        fontFamily: 'SF-Pro-Display',
        fontWeight: '400',
        fontSize: 11,
        color: '#3A3A3A',
        lineHeight: 16,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'nowrap',
        gap: 2,
        marginTop: 2,
    },
    infoItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 3,
        flexShrink: 1,
    },
    infoDivider: {
        width: 0.5,
        height: 18,
        backgroundColor: '#0F0F0F30',
        flexShrink: 0,
    },
    infoLabel: {
        fontFamily: 'SF-Pro-Display',
        fontWeight: '400',
        fontSize: 8,
        color: '#0F0F0F80',
        lineHeight: 10,
    },
    infoValue: {
        fontFamily: 'SF-Pro-Display',
        fontWeight: '400',
        fontSize: 8,
        color: '#0F0F0F80',
        lineHeight: 11,
        flexShrink: 1,
    },
    bottomDivider: {
        height: 0.5,
        backgroundColor: '#00000066',
        marginTop: 16,
        marginHorizontal: 16,
    },
});