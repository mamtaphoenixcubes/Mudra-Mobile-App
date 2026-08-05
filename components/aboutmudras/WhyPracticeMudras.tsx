import React from 'react';
import { View, Text, ScrollView } from 'react-native';
// import { aboutMudrasStyles as styles } from '@/assets/styles/aboutmudras/aboutMudrasStyles';
import { getAboutMudrasStyles } from '@/assets/styles/aboutmudras/aboutMudrasStyles'
import { useTheme } from '@/constants/ThemeContext'
import LotusBlack from '@/assets/icons/LotusBlack.svg';
import ImproveSvg from '@/assets/icons/Improve.svg';
import ElementairSvg from '@/assets/icons/elementair.svg';
import WarrantySvg from '@/assets/icons/Warranty.svg';
import HarmonySvg from '@/assets/icons/Harmony.svg';

const ITEMS = [
    { icon: <LotusBlack width={28} height={28} />, label: 'Balance\nEnergy', sub: 'Harmonize your body and mind' },
    { icon: <ImproveSvg width={28} height={28} />, label: 'Improve\nFocus', sub: 'Enhance clarity and concentration' },
    { icon: <ElementairSvg width={28} height={28} />, label: 'Reduce\nStress', sub: 'Calm your mind and emotions' },
    { icon: <WarrantySvg width={28} height={28} />, label: 'Boost Well-\nbeing', sub: 'Support physical and mental health' },
    { icon: <HarmonySvg width={28} height={28} />, label: 'Inner\nHarmony', sub: 'Connect with your inner self' },
];

export default function WhyPracticeMudras() {
    const { colors } = useTheme()
const styles = getAboutMudrasStyles(colors)
    return (
        <View style={styles.whyContainer}>
            <View style={styles.sectionTitleContainer}>
                <Text style={styles.sectionTitle}>Why Practice Mudras?</Text>
            </View>

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.whyScrollContent}
            >
                {ITEMS.map((item, i) => (
                    <React.Fragment key={i}>
                        <View style={styles.whyItem}>
                            <View style={styles.whyIconCircle}>
                                {item.icon}
                            </View>
                            <Text style={styles.whyLabel}>{item.label}</Text>
                            <Text style={styles.whySubLabel}>{item.sub}</Text>
                        </View>
                        {i < ITEMS.length - 1 && <View style={styles.whyDivider} />}
                    </React.Fragment>
                ))}
            </ScrollView>
        </View>
    );
}