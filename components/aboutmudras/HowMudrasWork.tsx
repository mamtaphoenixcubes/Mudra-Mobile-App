import React from 'react';
import { View, Text } from 'react-native';
// import { aboutMudrasStyles as styles } from '@/assets/styles/aboutmudras/aboutMudrasStyles';
import { getAboutMudrasStyles } from '@/assets/styles/aboutmudras/aboutMudrasStyles'
import { useTheme } from '@/constants/ThemeContext'

const STEPS = [
    { title: 'Energy Flow', body: "Mudras channel energy through the body's subtle pathways." },
    { title: 'Element Activation', body: 'Each mudra corresponds to elements (Pancha Mahabhutas).' },
    { title: 'Balance & Heal', body: 'They help balance energies and support natural healing.' },
    { title: 'Transform', body: 'Regular practice brings positive transformation and well-being.' },
];

export default function HowMudrasWork() {
    const { colors } = useTheme()
const styles = getAboutMudrasStyles(colors)
    return (
        <View style={styles.howContainer}>
            <View style={styles.sectionTitleContainer}>
                <Text style={styles.sectionTitle}>How Mudras Work</Text>
            </View>
            <View style={styles.howCard}>
                <View style={styles.howVerticalLine} />
                {STEPS.map((step, i) => (
                    <React.Fragment key={i}>
                        <View style={styles.howRow}>
                            <View style={styles.howNumberCircle}>
                                <Text style={styles.howNumber}>{i + 1}</Text>
                            </View>
                            <View style={styles.howTextBlock}>
                                <Text style={styles.howStepTitle}>{step.title}</Text>
                                <Text style={styles.howStepBody}>{step.body}</Text>
                            </View>
                        </View>
                        {i < STEPS.length - 1 && <View style={styles.howRowDivider} />}
                    </React.Fragment>
                ))}
            </View>
        </View>
    );
}