import React from 'react';
import { View, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import StandaloneTabBar from '@/components/home/StandaloneTabBar';
// import { elementDetailStyles as styles } from '@/assets/styles/elementdetail/elementDetailStyles';
import { getElementDetailStyles } from '@/assets/styles/elementdetail/elementDetailStyles'
import { useTheme } from '@/constants/ThemeContext'
import ElementDetailHeader from './ElementDetailHeader';
import ElementDetailHero from './ElementDetailHero';
import ElementInsight from './ElementInsight';
import ElementQualities from './ElementQualities';
import ElementExploreBanner from './ElementExploreBanner';
import ElementImbalance from './ElementImbalance';
import ElementPractices from './ElementPractices';

const ELEMENT_DATA: Record<string, {
    name: string;
    keywords: string[];
    description: string;
    image: any;
    insight: string;
    deficiency: string[];
    excess: string[];
    mudras: string;
}> = {
    Water: {
        name: 'Water',
        keywords: ['Flow', 'Emotion', 'Adaptability'],
        description: 'Water represents flow, emotions and the ability to adapt. It governs our creativity, intuition and emotional balance.',
        image: require('@/assets/images/Pranayama_Images/Water.png'),
        insight: 'When Water is balanced, you feel calm, creative and emotionally stable. When imbalanced, you may feel overwhelmed, moody or disconnected.',
        deficiency: ['Dry skin', 'Anxiety', 'Insomnia', 'Fearfulness'],
        excess: ['Water retention', 'Lethargy', 'Allergies', 'Attachment issues'],
        mudras: 'Varun Mudra, Jal Mudra',
    },
    Earth: {
        name: 'Earth',
        keywords: ['Stability', 'Grounding', 'Nourishment'],
        description: 'Earth represents stability, grounding and the ability to nurture. It governs our physical strength and endurance.',
        image: require('@/assets/images/Pranayama_Images/Water.png'),
        insight: 'When Earth is balanced, you feel stable, grounded and secure. When imbalanced, you may feel heavy, stubborn or disconnected from your body.',
        deficiency: ['Weak bones', 'Low stamina', 'Fear of change', 'Anxiety'],
        excess: ['Weight gain', 'Lethargy', 'Stubbornness', 'Depression'],
        mudras: 'Prithvi Mudra, Gyan Mudra',
    },
    Fire: {
        name: 'Fire',
        keywords: ['Energy', 'Transformation', 'Willpower'],
        description: 'Fire represents transformation, energy and willpower. It governs our digestion, metabolism and drive.',
        image: require('@/assets/images/Pranayama_Images/Water.png'),
        insight: 'When Fire is balanced, you feel motivated, confident and focused. When imbalanced, you may feel irritable, aggressive or burnt out.',
        deficiency: ['Poor digestion', 'Low energy', 'Lack of motivation', 'Cold extremities'],
        excess: ['Acidity', 'Anger', 'Inflammation', 'Perfectionism'],
        mudras: 'Surya Mudra, Agni Mudra',
    },
    Air: {
        name: 'Air',
        keywords: ['Movement', 'Breath', 'Freedom'],
        description: 'Air represents movement, breath and freedom. It governs our nervous system, circulation and communication.',
        image: require('@/assets/images/Pranayama_Images/Water.png'),
        insight: 'When Air is balanced, you feel light, creative and communicative. When imbalanced, you may feel anxious, scattered or restless.',
        deficiency: ['Low energy', 'Poor circulation', 'Shyness', 'Lethargy'],
        excess: ['Anxiety', 'Insomnia', 'Dry skin', 'Restlessness'],
        mudras: 'Vayu Mudra, Akash Mudra',
    },
    Space: {
        name: 'Space',
        keywords: ['Stillness', 'Expansion', 'Awareness'],
        description: 'Space represents stillness, expansion and pure awareness. It governs our sense of openness and spiritual connection.',
        image: require('@/assets/images/Pranayama_Images/Water.png'),
        insight: 'When Space is balanced, you feel expansive, clear and present. When imbalanced, you may feel isolated, empty or disconnected.',
        deficiency: ['Closed-mindedness', 'Lack of inspiration', 'Difficulty meditating', 'Feeling stuck'],
        excess: ['Detachment', 'Feeling ungrounded', 'Overwhelm', 'Dissociation'],
        mudras: 'Akash Mudra, Shunya Mudra',
    },
};

export default function ElementDetailScreen() {
    const { colors } = useTheme()
    const styles = getElementDetailStyles(colors)
    const { element } = useLocalSearchParams();
    const insets = useSafeAreaInsets();
    const data = ELEMENT_DATA[element as string] ?? ELEMENT_DATA['Water'];

    return (
        <View style={styles.screen}>
            <ElementDetailHeader />
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: insets.bottom + 120 }}
            >
                <ElementDetailHero
                    name={data.name}
                    keywords={data.keywords}
                    description={data.description}
                    image={data.image}
                />
                <ElementInsight
                    elementName={data.name}
                    insightText={data.insight}
                />
                <ElementQualities />

                <ElementImbalance
                    deficiency={data.deficiency}
                    excess={data.excess}
                />
                <ElementPractices
                    elementName={data.name}
                    mudras={data.mudras}
                />
                <ElementExploreBanner
                    elementName={data.name}
                />

            </ScrollView>
            <StandaloneTabBar />
        </View>
    );
}