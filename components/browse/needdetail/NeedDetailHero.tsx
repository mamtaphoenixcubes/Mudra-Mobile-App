import React, { useState } from 'react';

import {
    View,
    Text,
    Image,
    Dimensions,
    ScrollView,
    NativeSyntheticEvent,
    NativeScrollEvent,
    TouchableOpacity
} from 'react-native';
const needDetailImage = require(
    '@/assets/images/Pranayama_Images/NeedDetail.png'
);
// import { needDetailStyles as styles } from '@/assets/styles/browse/needDetailStyles';
import { getNeedDetailStyles } from '@/assets/styles/browse/needDetailStyles'
import { useTheme } from '@/constants/ThemeContext'

import PeopleIcon from '@/assets/icons/People.svg';
import PeopleWhite from '@/assets/icons/PeopleWhite.svg';
import ImageViewerModal from '@/components/common/ImageViewerModal'

type Props = {
    item: any;
};

const BASE_URL = process.env.EXPO_PUBLIC_IMAGE_API_URL;

const IMAGE_WIDTH = Dimensions.get('window').width * 0.42;

export default function NeedDetailHero({ item }: Props) {

    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [imageVisible, setImageVisible] = useState(false)
    const { colors, isDark } = useTheme()
    const styles = getNeedDetailStyles(colors)

    // Banner Images
    const images =
        item?.bannerImage?.map((img: any) => ({
            uri: `${BASE_URL}${img.url}`,
        })) || needDetailImage;

    // Scroll Handler
    const handleScrollEnd = (
        event: NativeSyntheticEvent<NativeScrollEvent>
    ) => {
        const index = Math.round(
            event.nativeEvent.contentOffset.x / IMAGE_WIDTH
        );

        setCurrentImageIndex(index);
    };

    return (
        <View style={styles.hero}>
            <View style={styles.heroRow}>

                {/* IMAGE SECTION */}
                <View
                    style={[
                        styles.heroImageWrapper,
                        {
                            backgroundColor:
                                item?.color || '#F5F5F5',
                        },
                    ]}
                >
                    {images.length > 1 ? (
                        <>
                            <ScrollView
                                horizontal
                                pagingEnabled
                                showsHorizontalScrollIndicator={false}
                                onMomentumScrollEnd={handleScrollEnd}
                                decelerationRate="fast"
                                snapToInterval={IMAGE_WIDTH}
                                snapToAlignment="start"
                            >
                                {images.map(
                                    (
                                        imgSource: any,
                                        index: number
                                    ) => (
                                        <View
                                            key={index}
                                            style={styles.imageSlide}
                                        >
                                            <TouchableOpacity onPress={() => setImageVisible(true)} activeOpacity={0.9}>
                                                <Image
                                                    source={imgSource}
                                                    style={styles.heroImage}
                                                    resizeMode="cover"
                                                />
                                            </TouchableOpacity>
                                        </View>
                                    )
                                )}
                            </ScrollView>

                            {/* BADGE */}
                            <View style={styles.badge}>
                                <Text style={styles.badgeText}>
                                    {currentImageIndex + 1}/
                                    {images.length}
                                </Text>
                            </View>
                        </>
                    ) : (
                        images[0] && (
                            <TouchableOpacity
                                onPress={() => setImageVisible(true)}
                                activeOpacity={0.9}
                                style={{ width: IMAGE_WIDTH, height: '100%' }}  
                            >
                                <Image
                                    source={images[0]}
                                    style={[styles.heroImage, { width: IMAGE_WIDTH }]}  
                                    resizeMode="cover"
                                />
                            </TouchableOpacity>
                        )
                    )}
                </View>

                {/* TEXT SECTION */}
                <View style={styles.heroTextBlock}>
                    <Text style={styles.heroTitle}>
                        {item?.Name}
                    </Text>

                    <Text style={styles.heroSubtitle}>
                        {item?.shortDescription}
                    </Text>

                    <View style={styles.heroFollowersRow}>
                        {isDark ? <PeopleWhite width={16} height={16} /> : <PeopleIcon width={16} height={16} />}

                        <Text
                            style={
                                styles.heroFollowersText
                            }
                        >
                            {item?.followersCount}{' '}
                            people follow this need
                        </Text>
                    </View>
                </View>

            </View>
            <ImageViewerModal
                visible={imageVisible}
                images={images.length > 0 ? images : [images[0]].filter(Boolean)}
                initialIndex={images.length > 1 ? currentImageIndex : 0}
                onClose={() => setImageVisible(false)}
            />
        </View>
    );
}