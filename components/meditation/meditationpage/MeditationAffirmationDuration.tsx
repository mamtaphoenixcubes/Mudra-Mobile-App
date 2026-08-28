import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';

import LotusIcon from '@/assets/icons/LotusBlack.svg';
import ClockIcon from '@/assets/icons/clock.svg';
import QuotesIcon from '@/assets/icons/Quotes.svg';

interface Meditation {
    affirmationCard?: {
        cardText?: string;
    };
    durationPickerCard?: {
        defaultDuration?: number;
        beginnerDuration?: number;
        intermediateDuration?: number;
        expertDuration?: number;
        advancedDuration?: number;
    };
}

interface MeditationAffirmationDurationProps {
    meditation?: Meditation;
    selectedDuration: number;
    onDurationChange: (duration: number) => void;
    onDurationPress?: (duration: number) => void;
}

export default function MeditationAffirmationDuration({
    meditation,
    selectedDuration,
    onDurationChange,
    onDurationPress,
}: MeditationAffirmationDurationProps) {
    const durationConfig = meditation?.durationPickerCard;

    const durationOptions = [
        {
            label: 'Beginner',
            value: durationConfig?.beginnerDuration ?? 5,
        },
        {
            label: 'Intermediate',
            value: durationConfig?.intermediateDuration ?? 10,
        },
        {
            label: 'Expert',
            value: durationConfig?.expertDuration ?? 15,
        },
        {
            label: 'Advanced',
            value: durationConfig?.advancedDuration ?? 20,
        },
    ];

    return (
        <View style={styles.container}>
            {/* Affirmation */}
            <View
                style={[
                    styles.card,
                    styles.affirmationCard,
                ]}
            >
                <Text style={styles.cardTitle}>
                    Affirmation
                </Text>

                <QuotesIcon
                    width={28}
                    height={20}
                />

                <Text style={styles.affirmationText}>
                    {meditation?.affirmationCard?.cardText}
                </Text>

                <View style={styles.lotusWrapper}>
                    <LotusIcon
                        width={36}
                        height={36}
                    />
                </View>
            </View>

            {/* Duration */}
            <TouchableOpacity
                activeOpacity={0.9}
                style={[
                    styles.card,
                    styles.durationCard,
                ]}
                onPress={() =>
                    onDurationPress?.(selectedDuration)
                }
            >
                <Text style={styles.cardTitle}>
                    Duration
                </Text>

                <View style={styles.clockWrapper}>
                    <ClockIcon
                        width={52}
                        height={52}
                    />
                </View>

                <Text style={styles.durationDisplay}>
                    {Math.round(selectedDuration)} min
                </Text>

                <View style={styles.pillsRow}>
                    {durationOptions.map((item) => (
                        <TouchableOpacity
                            key={item.label}
                            activeOpacity={0.7}
                            style={[
                                styles.durationPill,
                                selectedDuration ===
                                item.value &&
                                styles.durationPillActive,
                            ]}
                            onPress={() =>
                                onDurationChange(
                                    item.value
                                )
                            }
                        >
                            <Text
                                style={[
                                    styles.durationPillText,
                                    selectedDuration ===
                                    item.value &&
                                    styles.durationPillTextActive,
                                ]}
                            >
                                {item.value} min
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingHorizontal: 16,
        paddingTop: 16,
        gap: 12,
    },
    card: {
        flex: 1,
        borderRadius: 16,
        padding: 14,
        alignItems: 'center',
    },
    affirmationCard: {
        backgroundColor: '#E9FFDB',
    },
    durationCard: {
        backgroundColor: '#FFDBE7',
    },
    cardTitle: {
        fontFamily: 'SF-Pro-Display',
        fontWeight: '500',
        fontSize: 15,
        color: '#0F0F0F',
        textAlign: 'center',
        marginBottom: 8,
    },
    affirmationText: {
        fontFamily: 'SF-Pro-Display',
        fontSize: 12,
        color: '#0F0F0F',
        textAlign: 'center',
        lineHeight: 17,
    },
    lotusWrapper: {
        marginTop: 10,
    },
    clockWrapper: {
        marginVertical: 8,
    },
    durationDisplay: {
        fontSize: 28,
        fontWeight: '700',
        color: '#0F0F0F',
        marginBottom: 12,
    },
    pillsRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 6,
    },
    durationPill: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 16,
        backgroundColor: '#FFF',
    },
    durationPillActive: {
        backgroundColor: '#000',
    },
    durationPillText: {
        fontSize: 11,
        color: '#000',
    },
    durationPillTextActive: {
        color: '#FFF',
        fontWeight: '600',
    },
});