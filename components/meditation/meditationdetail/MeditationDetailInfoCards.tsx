import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ClockIcon from '@/assets/icons/clock.svg';
import BestIcon from '@/assets/icons/Best.svg';
import SymbolicIcon from '@/assets/icons/symbolic.svg';

const InfoCard = ({ title, description, color, Icon }: { title: string; description: string; color: string; Icon: React.ComponentType<any> }) => (
    <View style={[styles.card, { backgroundColor: color }]}>
        <Text style={styles.cardTitle}>{title}</Text>
        <View style={styles.cardBody}>
            <View style={styles.iconWrapper}>
                <Icon width={28} height={28} />
            </View>
            <Text style={styles.cardDescription}>{description}</Text>
        </View>
    </View>
);

export default function MeditationDetailInfoCards({ meditation }: { meditation?: any }) {
    const cards = [
        { title: 'Duration', description: meditation?.durationText || '10-20 minutes', color: '#E9FFDB', Icon: ClockIcon },
        { title: 'Best Time', description: meditation?.bestTimeText || 'Before sleep or during a break', color: '#FFDBE7', Icon: BestIcon },
        { title: 'Benefit', description: meditation?.benefitText || 'Releases tension and improves body awareness.', color: '#CBECFF', Icon: SymbolicIcon },
        { title: 'Mental Effect', description: meditation?.mentalEffectText || 'Quiets racing thoughts and induces deep relaxation.', color: '#FFF6BF', Icon: SymbolicIcon },
    ];

    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <InfoCard {...cards[0]} />
                <InfoCard {...cards[1]} />
            </View>
            <View style={styles.row}>
                <InfoCard {...cards[2]} />
                <InfoCard {...cards[3]} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { paddingHorizontal: 16, paddingTop: 12, gap: 10 },
    row: { flexDirection: 'row', gap: 10 },
    card: { flex: 1, borderRadius: 7.34, borderWidth: 0.38, borderColor: '#00000018', padding: 12, gap: 8 },
    cardTitle: { fontFamily: 'SF-Pro-Display', fontWeight: '500', fontSize: 13, lineHeight: 17, color: '#0F0F0FCC' },
    cardBody: { flexDirection: 'row', alignItems: 'center', gap: 10 },
    iconWrapper: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
    cardDescription: { flex: 1, fontFamily: 'SF-Pro-Display', fontWeight: '400', fontSize: 11, lineHeight: 16, color: '#555' },
});