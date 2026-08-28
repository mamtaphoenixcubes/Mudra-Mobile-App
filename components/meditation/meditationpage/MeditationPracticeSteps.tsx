import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SvgUri } from 'react-native-svg';
import BrainIcon from '@/assets/icons/brain.svg';
import { useTheme } from '@/constants/ThemeContext'

const BASE_URL = process.env.EXPO_PUBLIC_IMAGE_API_URL;

const CIRCLE_COLORS = [
    '#FFDBA7',
    '#EBCFFF',
    '#E9FFDB',
    '#CBECFF',
];

interface PracticeStep {
    id: number;
    nameOfTheSteps: string;
    describeTheStep: string;
    stepIcon?: {
        url: string;
    };
}

interface Meditation {
    practiceSteps?: PracticeStep[];
}

interface MeditationPracticeStepsProps {
    meditation?: Meditation;
}

export default function MeditationPracticeSteps({
    meditation,
}: MeditationPracticeStepsProps) {
    const { colors } = useTheme();
    const steps = meditation?.practiceSteps || [];

    if (!steps.length) {
        return null;
    }

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
                Practice Steps
            </Text>

            {steps.map((step, index) => {
                const iconUrl = step?.stepIcon?.url
                    ? `${BASE_URL}${step.stepIcon.url}`
                    : '';

                return (
                    <View key={step.id}>
                        <View style={styles.stepRow}>
                            <View style={styles.leftCol}>
                                <View
                                    style={[
                                        styles.circle,
                                        {
                                            backgroundColor:
                                                CIRCLE_COLORS[
                                                index %
                                                CIRCLE_COLORS.length
                                                ],
                                        },
                                    ]}
                                >
                                    {iconUrl ? (
                                        <SvgUri
                                            uri={iconUrl}
                                            width={32}
                                            height={32}
                                        />
                                    ) : (
                                        <BrainIcon
                                            width={32}
                                            height={32}
                                        />
                                    )}
                                </View>

                                {index < steps.length - 1 && (
                                    <View
                                        style={
                                            styles.dashedContainer
                                        }
                                    >
                                        {[...Array(6)].map(
                                            (_, i) => (
                                                <View
                                                    key={
                                                        i
                                                    }
                                                    style={[styles.dash, { backgroundColor: colors.dashedLine }]}
                                                />
                                            )
                                        )}
                                    </View>
                                )}
                            </View>

                            <View style={styles.rightCol}>
                                <Text
                                    style={[styles.stepTitle, { color: colors.text }]}
                                >
                                    {
                                        step.nameOfTheSteps
                                    }
                                </Text>

                                <Text
                                    style={[styles.stepDescription, { color: colors.textSub }]}
                                >
                                    {
                                        step.describeTheStep
                                    }
                                </Text>
                            </View>
                        </View>

                        {index < steps.length - 1 && (
                            <View
                                style={[styles.divider, { backgroundColor: colors.dividerDark }]}
                            />
                        )}
                    </View>
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        paddingTop: 20,
        paddingBottom: 8,
        backgroundColor: '#fff',
    },
    sectionTitle: {
        fontFamily: 'SF-Pro-Display',
        fontWeight: '500',
        fontSize: 18,
        color: '#0F0F0F',
        marginBottom: 20,
    },
    stepRow: {
        flexDirection: 'row',
        gap: 16,
        alignItems: 'flex-start',
        paddingBottom: 16,
    },
    leftCol: {
        alignItems: 'center',
        width: 64,
    },
    circle: {
        width: 64,
        height: 64,
        borderRadius: 32,
        alignItems: 'center',
        justifyContent: 'center',
    },
    rightCol: {
        flex: 1,
        paddingTop: 10,
        gap: 6,
    },
    stepTitle: {
        fontFamily: 'SF-Pro-Display',
        fontWeight: '500',
        fontSize: 16,
        color: '#0F0F0F',
        lineHeight: 22,
    },
    stepDescription: {
        fontFamily: 'SF-Pro-Display',
        fontWeight: '400',
        fontSize: 13,
        color: '#3A3A3A',
        lineHeight: 19,
    },
    divider: {
        height: 0.5,
        backgroundColor: '#0F0F0F15',
        marginBottom: 16,
        marginLeft: 80,
    },
    dashedContainer: {
        alignItems: 'center',
        marginTop: 6,
        gap: 4,
    },
    dash: {
        width: 2,
        height: 5,
        borderRadius: 1,
        backgroundColor: '#0F0F0F60',
    },
});