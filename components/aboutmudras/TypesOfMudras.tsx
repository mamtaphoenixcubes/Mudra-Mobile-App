import React from 'react';
import { View, Text, ScrollView } from 'react-native';
// import { aboutMudrasStyles as styles } from '@/assets/styles/aboutmudras/aboutMudrasStyles';
import { getAboutMudrasStyles } from '@/assets/styles/aboutmudras/aboutMudrasStyles'
import { useTheme } from '@/constants/ThemeContext'
import LotusBlack from '@/assets/icons/LotusBlack.svg';
import AirSvg from '@/assets/icons/air.svg';
import CalmSvg from '@/assets/icons/Calm.svg';
import HealingSvg from '@/assets/icons/Healing.svg';

const TYPES = [
    { icon: <LotusBlack width={32} height={32} />, label: 'Hasta\nMudras', sub: 'Hand gestures practiced with fingers and palms', bg: '#FFDBE7' },
    { icon: <AirSvg width={32} height={32} />, label: 'Prana\nMudras', sub: 'Gestures that regulate life force energy', bg: '#E9FFDB' },
    { icon: <CalmSvg width={32} height={32} />, label: 'Dhyan\nMudras', sub: 'Mudras used during meditation for deeper awareness', bg: '#CBECFF' },
    { icon: <HealingSvg width={32} height={32} />, label: 'Healing\nMudras', sub: 'Mudras that support healing and wellness.', bg: '#FFF6BF' },
];

export default function TypesOfMudras() {
    const { colors } = useTheme()
const styles = getAboutMudrasStyles(colors)
    return (
        <View style={styles.typesContainer}>
            <View style={styles.sectionTitleContainer}>
                <Text style={styles.sectionTitle}>Types of Mudras</Text>
            </View>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.typesScrollContent}
            >
                {TYPES.map((item, i) => (
                    <View key={i} style={[styles.typeCard, { backgroundColor: item.bg }]}>
                        <View style={styles.typeIconCircle}>
                            {item.icon}
                        </View>
                        <Text style={styles.typeLabel}>{item.label}</Text>
                        <Text style={styles.typeSubLabel}>{item.sub}</Text>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
}