import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ClockIcon from '@/assets/icons/clock.svg';
import BestIcon from '@/assets/icons/Best.svg';
import SymbolicIcon from '@/assets/icons/symbolic.svg';

// ─── Single Info Card ─────────────────────────────────────────────────────────
const InfoCard = ({ title, description, color, Icon }: { title: string; description: string; color: string; Icon: React.ComponentType<any> }) => (
    <View style={[styles.card, { backgroundColor: color }]}> 
        <Text style={styles.cardTitle}>{title}</Text>
        <View style={styles.cardBody}>
            {/* Circle Icon */}
            <View style={styles.iconWrapper}>
                <Icon width={28} height={28} />
            </View>
            {/* Description */}
            <Text style={styles.cardDescription}>{description}</Text>
        </View>
    </View>
);

// ─── 2x2 Grid ────────────────────────────────────────────────────────────────
export default function InfoCards({ mudra }: { mudra?: any }) {
    const cards = [
        {
            title: 'Duration',
            description: mudra?.durationCard?.cardText || '5-15 minutes',
            color: '#E9FFDB',
            Icon: ClockIcon,
        },
        {
            title: 'Best Time',
            description: mudra?.bestTimeCard?.cardText || 'Morning or meditation',
            color: '#FFDBE7',
            Icon: BestIcon,
        },
        {
            title: 'Symbolic Meaning',
            description: mudra?.symbolicMeaningCard?.cardText || 'Union of individual consciousness with universal consciousness.',
            color: '#CBECFF',
            Icon: SymbolicIcon,
        },
        {
            title: 'Energetic Meaning',
            description: mudra?.EnergeticMeaningCard?.cardText || 'Activates the crown chakra and enhances prana flow to the brain.',
            color: '#FFF6BF',
            Icon: SymbolicIcon,
        },
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
    container: {
        paddingHorizontal: 16,
        paddingTop: 12,
        gap: 10,
    },

    // Each row holds 2 cards
    row: {
        flexDirection: 'row',
        gap: 10,
    },

    // Figma: width 160, height 70, border-radius 7.34, border 0.38px
    card: {
        flex: 1,
        borderRadius: 7.34,
        borderWidth: 0.38,
        borderColor: '#00000018',
        padding: 12,
        gap: 8,
    },

    // Title — Figma: SF Pro Display, 500 Medium, #0F0F0FCC
    cardTitle: {
        fontFamily: 'SF-Pro-Display',
        fontWeight: '500',
        fontSize: 13,
        lineHeight: 17,
        color: '#0F0F0FCC',
    },

    cardBody: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },

    // White circle icon wrapper
    iconWrapper: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
    },

    // Description — Figma: SF Pro Display, 400 Regular
    cardDescription: {
        flex: 1,
        fontFamily: 'SF-Pro-Display',
        fontWeight: '400',
        fontSize: 11,
        lineHeight: 16,
        color: '#555',
    },
});