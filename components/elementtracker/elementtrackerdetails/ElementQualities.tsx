import React from 'react';
import { View, Text } from 'react-native';
// import { elementDetailStyles as styles } from '@/assets/styles/elementdetail/elementDetailStyles';
import { getElementDetailStyles } from '@/assets/styles/elementdetail/elementDetailStyles'
import { useTheme } from '@/constants/ThemeContext'
import WavesSvg from '@/assets/icons/waves.svg';
import WaterSvg from '@/assets/icons/water.svg';
import HandbalanceSvg from '@/assets/icons/Handbalance.svg';
import MoonSvg from '@/assets/icons/Moon.svg';

type Quality = {
    label: string;
    bg: string;
    icon: React.ReactNode;
};

const QUALITIES: Quality[] = [
    {
        label: 'Fluid &\nAdaptive',
        bg: '#FFDBE7',
        icon: <WavesSvg width={32} height={32} />,
    },
    {
        label: 'Emotional\nDepth',
        bg: '#E9FFDB',
        icon: <WaterSvg width={32} height={32} />,
    },
    {
        label: 'Intuitive\nNature',
        bg: '#CBECFF',
        icon: <HandbalanceSvg width={32} height={32} />,
    },
    {
        label: 'Nurturing &\nHealing',
        bg: '#FFF6BF',
        icon: <MoonSvg width={32} height={32} />,
    },
];

export default function ElementQualities() {
    const { colors } = useTheme()
    const styles = getElementDetailStyles(colors)
    return (
        <View style={styles.qualitiesContainer}>
            <Text style={styles.qualitiesTitle}>Qualities</Text>
            <View style={styles.qualitiesRow}>
                {QUALITIES.map((q, i) => (
                    <View
                        key={i}
                        style={[styles.qualityCard, { backgroundColor: q.bg }]}
                    >
                        <View style={styles.qualityIconWrapper}>
                            {q.icon}
                        </View>
                        <Text style={styles.qualityLabel}>{q.label}</Text>
                    </View>
                ))}
            </View>
        </View>
    );
}