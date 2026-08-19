import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { getAsanaDetailStyles } from '@/assets/styles/asana/asanaDetailStyles';
import { useTheme } from '@/constants/ThemeContext';
import ClockSvg from '@/assets/icons/clock.svg';
import GroupSvg from '@/assets/icons/Group.svg';
import VolumeSvg from '@/assets/icons/Volume.svg';
import DownloadSvg from '@/assets/icons/download.svg';
import ClockWhite from '@/assets/icons/ClockWhite.svg';
import GroupWhite from '@/assets/icons/GroupWhite.svg';
import ImageViewerModal from '@/components/common/ImageViewerModal';

const Divider = ({ styles }: { styles: any }) => <View style={styles.heroAttrDivider} />;

export default function AsanaDetailHero() {
    const { colors, isDark } = useTheme();
    const styles = getAsanaDetailStyles(colors);

    const [isImageModalVisible, setIsImageModalVisible] = useState(false);


    const heroImages = [require('@/assets/images/tabIcons/calm-mind.png')];

    return (
        <View style={styles.heroContainer}>
            <Text style={styles.pageTitle}>Asana Detail</Text>

            <View style={styles.heroTopRow}>
                <TouchableOpacity
                    style={styles.heroImageWrapper}
                    activeOpacity={0.85}
                    onPress={() => setIsImageModalVisible(true)}
                >
                    <Image
                        source={heroImages[0]}
                        style={styles.heroImage}
                        resizeMode="cover"
                    />
                </TouchableOpacity>

                <View style={styles.heroTextBlock}>
                    <View style={styles.heroBadge}>
                        <Text style={styles.heroBadgeText}>Yoga Asana</Text>
                    </View>
                    <Text style={styles.heroTitle}>Surya Namaskar</Text>
                    <Text style={styles.heroSubtitle}>
                        A dynamic sequence of 12 postures that energizes the body and calms the mind.
                    </Text>
                </View>
            </View>

            <View style={styles.heroAttrsRow}>
                <View style={styles.heroAttrItem}>
                    {isDark ? <ClockWhite width={14} height={14} /> : <ClockSvg width={14} height={14} />}
                    <Text style={styles.heroAttrLabel}>20 min</Text>
                </View>
                <Divider styles={styles} />
                <View style={styles.heroAttrItem}>
                    {isDark ? <GroupWhite width={14} height={14} /> : <GroupSvg width={14} height={14} />}
                    <Text style={styles.heroAttrLabel}>All Levels</Text>
                </View>
                <Divider styles={styles} />
                <View style={styles.heroAttrItem}>
                    <VolumeSvg width={14} height={14} />
                    <Text style={styles.heroAttrLabel}>English</Text>
                </View>
                <Divider styles={styles} />
                <View style={styles.heroAttrItem}>
                    <DownloadSvg width={14} height={14} />
                    <Text style={styles.heroAttrLabel}>Download</Text>
                </View>
            </View>

            <ImageViewerModal
                visible={isImageModalVisible}
                images={heroImages}
                initialIndex={0}
                onClose={() => setIsImageModalVisible(false)}
            />
        </View>
    );
}