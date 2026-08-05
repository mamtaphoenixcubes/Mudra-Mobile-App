import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
// import { elementDetailStyles as styles } from '@/assets/styles/elementdetail/elementDetailStyles';
import { getElementDetailStyles } from '@/assets/styles/elementdetail/elementDetailStyles'
import { useTheme } from '@/constants/ThemeContext'
import LotusBlackSvg from '@/assets/icons/LotusBlack.svg';
import CalmSvg from '@/assets/icons/Calm.svg';
import AirSvg from '@/assets/icons/air.svg';
import BalanceSvg from '@/assets/icons/Balance.svg';
import RightArrowSvg from '@/assets/icons/RightArrow.svg';
import RightArrowWhite from '@/assets/icons/RightArrowWhite.svg'

type Practice = {
    icon: React.ReactNode;
    title: string;
    subtitle: string;
};

type Props = {
    elementName: string;
    mudras: string;
};

export default function ElementPractices({ elementName, mudras }: Props) {
    const { colors, isDark } = useTheme()
    const styles = getElementDetailStyles(colors)
    const PRACTICES: Practice[] = [
        {
            icon: <LotusBlackSvg width={26} height={26} />,
            title: 'Mudras',
            subtitle: mudras,
        },
        {
            icon: <CalmSvg width={26} height={26} />,
            title: 'Yoga Nidra',
            subtitle: 'Practice calming Yoga Nidra sessions',
        },
        {
            icon: <AirSvg width={26} height={26} />,
            title: 'Breath',
            subtitle: 'Try Nadi Shodhana & Sheetali Pranayama',
        },
        {
            icon: <BalanceSvg width={26} height={26} />,
            title: 'Lifestyle',
            subtitle: `Stay hydrated, connect with water, embrace creativity`,
        },
    ];

    return (
        <View style={styles.practicesContainer}>
            <Text style={styles.sectionTitle}>Signs of Imbalance</Text>
            <View style={styles.practicesCard}>
                {PRACTICES.map((p, i) => (
                    <React.Fragment key={i}>
                        <TouchableOpacity
                            style={styles.practiceRow}
                            activeOpacity={0.7}
                        >
                            <View style={styles.practiceIconCircle}>
                                {p.icon}
                            </View>
                            <View style={styles.practiceTextBlock}>
                                <Text style={styles.practiceTitle}>{p.title}</Text>
                                <Text style={styles.practiceSubtitle} numberOfLines={2}>
                                    {p.subtitle}
                                </Text>
                            </View>
                            {isDark ? <RightArrowWhite width={16} height={16} /> : <RightArrowSvg width={16} height={16} />}
                        </TouchableOpacity>
                        {i < PRACTICES.length - 1 && (
                            <View style={styles.practiceRowDivider} />
                        )}
                    </React.Fragment>
                ))}
            </View>
        </View>
    );
}