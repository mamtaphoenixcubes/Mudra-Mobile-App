import React from 'react';
import { View, Text } from 'react-native';
import { getNidraDetailStyles } from '@/assets/styles/nidradetail/nidraDetailStyles';
import { useTheme } from '@/constants/ThemeContext';
import LotusBlack from '@/assets/icons/LotusBlack.svg';

interface Props {
    nidra: any;
}

export default function NidraDetailInfoBanner({ nidra }: Props) {
    const { colors } = useTheme();
    const styles = getNidraDetailStyles(colors);

    const intro = nidra?.NidraIntroCard;

    return (
        <View style={styles.infoBannerContainer}>
            <View style={styles.infoBannerCard}>
                <View style={styles.infoBannerIconCircle}>
                    <LotusBlack width={24} height={24} />
                </View>

                <Text style={styles.infoBannerText}>
                    {intro?.Description ??
                        intro?.ShortDescription ??
                        'No description available.'}
                </Text>
            </View>
        </View>
    );
}