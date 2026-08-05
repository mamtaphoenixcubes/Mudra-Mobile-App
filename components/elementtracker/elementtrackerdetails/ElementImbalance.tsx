import React from 'react';
import { View, Text } from 'react-native';
// import { elementDetailStyles as styles } from '@/assets/styles/elementdetail/elementDetailStyles';
import { getElementDetailStyles } from '@/assets/styles/elementdetail/elementDetailStyles'
import { useTheme } from '@/constants/ThemeContext'
import WarningSvg from '@/assets/icons/Warning.svg';

type Props = {
    deficiency?: string[];
    excess?: string[];
};

export default function ElementImbalance({ deficiency, excess }: Props) {
    const { colors } = useTheme()
    const styles = getElementDetailStyles(colors)
    // Default data if none provided
    const defaultDeficiency = [
        'Dryness',
        'Lack of emotion',
        'Stiffness',
        'Low creativity'
    ];

    const defaultExcess = [
        'Over-sensitivity',
        'Mood swings',
        'Attachment',
        'Feeling overwhelmed'
    ];

    const deficiencyData = deficiency?.length ? deficiency : defaultDeficiency;
    const excessData = excess?.length ? excess : defaultExcess;

    return (
        <View style={styles.imbalanceContainer}>
            <Text style={styles.sectionTitle}>Signs of Imbalance</Text>
            <View style={styles.imbalanceCard}>
                {/* Deficiency */}
                <View style={styles.imbalanceCol}>
                    <View style={styles.imbalanceHeader}>
                        <View style={styles.imbalanceIconCircle}>
                            <WarningSvg width={18} height={18} />
                        </View>
                        <Text style={styles.imbalanceColTitle}>Deficiency</Text>
                    </View>
                    {deficiencyData.map((item, i) => (
                        <View key={i} style={styles.bulletRow}>
                            <View style={styles.bullet} />
                            <Text style={styles.bulletText}>{item}</Text>
                        </View>
                    ))}
                </View>

                {/* Vertical divider */}
                <View style={styles.imbalanceDivider} />

                {/* Excess */}
                <View style={styles.imbalanceCol}>
                    <View style={styles.imbalanceHeader}>
                        <View style={styles.imbalanceIconCircle}>
                            <WarningSvg width={18} height={18} />
                        </View>
                        <Text style={styles.imbalanceColTitle}>Excess</Text>
                    </View>
                    {excessData.map((item, i) => (
                        <View key={i} style={styles.bulletRow}>
                            <View style={styles.bullet} />
                            <Text style={styles.bulletText}>{item}</Text>
                        </View>
                    ))}
                </View>
            </View>
        </View>
    );
}