import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { getNidraDetailStyles } from '@/assets/styles/nidradetail/nidraDetailStyles';
import { useTheme } from '@/constants/ThemeContext';
import ImageViewerModal from '@/components/common/ImageViewerModal';

import ClockSvg from '@/assets/icons/clock.svg';
import GroupSvg from '@/assets/icons/Group.svg';
import VolumeSvg from '@/assets/icons/Volume.svg';
import DownloadSvg from '@/assets/icons/download.svg';

import ClockWhite from '@/assets/icons/ClockWhite.svg';
import GroupWhite from '@/assets/icons/GroupWhite.svg';
import VolumeWhite from '@/assets/icons/SoundWhite.svg';
import DownloadWhite from '@/assets/icons/downloadWhite.svg';

interface Props {
    nidra: any;
}

export default function NidraDetailHero({ nidra }: Props) {
    const { colors, isDark } = useTheme();
    const styles = getNidraDetailStyles(colors);

    const Divider = () => <View style={styles.heroAttrDivider} />;

    const intro = nidra?.NidraIntroCard;
    const [viewerVisible, setViewerVisible] = useState(false);

    const image =
        intro?.ThumbnailImage?.[0]?.url
            ? `${process.env.EXPO_PUBLIC_IMAGE_API_URL}${intro.ThumbnailImage[0].url}`
            : null;

    return (
        <View style={styles.heroContainer}>
            {/* Left — Image */}
            <TouchableOpacity activeOpacity={0.9} onPress={() => setViewerVisible(true)}>
                <Image
                    source={
                        image
                            ? { uri: image }
                            : require('@/assets/images/Pranayama_Images/DeepRest&Relaxation.png')
                    }
                    style={styles.heroImage}
                    resizeMode="cover"
                />
            </TouchableOpacity>

            {/* Right — Text */}
            <View style={styles.heroTextBlock}>
                <View style={styles.heroBadge}>
                    <Text style={styles.heroBadgeText}>Yoga Nidra</Text>
                </View>

                <Text style={styles.heroTitle}>
                    {intro?.Name}
                </Text>

                <Text style={styles.heroSubtitle}>
                    {intro?.ShortDescription}
                </Text>
            </View>

            {/* Bottom Attributes */}
            <View style={styles.heroAttrsRow}>
                <View style={styles.heroAttrItem}>
                    {isDark ? (
                        <ClockWhite width={14} height={14} />
                    ) : (
                        <ClockSvg width={14} height={14} />
                    )}
                    <Text style={styles.heroAttrLabel}>
                        {nidra?.Duration} min
                    </Text>
                </View>

                <Divider />

                <View style={styles.heroAttrItem}>
                    {isDark ? (
                        <GroupWhite width={14} height={14} />
                    ) : (
                        <GroupSvg width={14} height={14} />
                    )}
                    <Text style={styles.heroAttrLabel}>
                        {intro?.Level}
                    </Text>
                </View>

                <Divider />

                <View style={styles.heroAttrItem}>
                    {isDark ? (
                        <VolumeWhite width={14} height={14} />
                    ) : (
                        <VolumeSvg width={14} height={14} />
                    )}
                    <Text style={styles.heroAttrLabel}>
                        Hindi
                    </Text>
                </View>

                <Divider />

                <View style={styles.heroAttrItem}>
                    {isDark ? (
                        <DownloadWhite width={14} height={14} />
                    ) : (
                        <DownloadSvg width={14} height={14} />
                    )}
                    <Text style={styles.heroAttrLabel}>
                        Download
                    </Text>
                </View>
            </View>
            <ImageViewerModal
                visible={viewerVisible}
                images={[
                    image
                        ? { uri: image }
                        : require('@/assets/images/Pranayama_Images/DeepRest&Relaxation.png')
                ]}
                onClose={() => setViewerVisible(false)}
            />
        </View>
    );
}