import React from 'react';
import { View, Text } from 'react-native';
import { getNidraDetailStyles } from '@/assets/styles/nidradetail/nidraDetailStyles';
import { useTheme } from '@/constants/ThemeContext';

import DailyUpdateSvg from '@/assets/icons/DailyUpdate.svg';
import DailyUpdateWhite from '@/assets/icons/DailyUpdateWhite.svg';

interface Props {
    nidra: any;
}

export default function NidraDetailBenefits({ nidra }: Props) {
    const { colors, isDark } = useTheme();
    const styles = getNidraDetailStyles(colors);

    const benefits =
        nidra?.DetailsPage?.Benefits?.ListOfBenefits || [];

    return (
        <View style={{ paddingHorizontal: 0 }}>
            <Text style={styles.sectionTitle}>Benefits</Text>

            <View style={styles.benefitsContainer}>
                {benefits.map((benefit: string, index: number) => (
                    <View key={index} style={styles.benefitRow}>
                        {isDark ? (
                            <DailyUpdateWhite width={18} height={18} />
                        ) : (
                            <DailyUpdateSvg width={18} height={18} />
                        )}

                        <Text style={styles.benefitText}>
                            {benefit}
                        </Text>
                    </View>
                ))}
            </View>
        </View>
    );
}