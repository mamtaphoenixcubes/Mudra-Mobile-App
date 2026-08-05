import React, { useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Image,
    Dimensions,
} from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { authStyles, AUTH_COLORS } from '@/assets/styles/auth/authStyles';
import LotusBlack from '@/assets/icons/LotusBlack.svg';
import FocusSvg from '@/assets/icons/Focus.svg';
import EnergySvg from '@/assets/icons/Energy.svg';
import FavouriteSvg from '@/assets/icons/Favourite.svg';
import ClockSvg from '@/assets/icons/clock.svg';
import BeginnerSvg from '@/assets/icons/Beginner.svg';
import SomeSvg from '@/assets/icons/Some.svg';
import AdvancedSvg from '@/assets/icons/Advanced.svg';
import { useTheme } from '@/constants/ThemeContext'

const { width } = Dimensions.get('window');
const GAP = 10;
const CARD_WIDTH = (width - 32 - GAP * 3) / 4;
const TRI_WIDTH = (width - 32 - GAP * 2) / 3;

const GOALS = [
    { id: 'stress', label: 'Reduce Stress', icon: <LotusBlack width={32} height={32} /> },
    { id: 'energy', label: 'Boost Energy', icon: <EnergySvg width={32} height={32} /> },
    { id: 'health', label: 'Improve Health', icon: <FavouriteSvg width={32} height={32} /> },
    { id: 'focus', label: 'Improve Focus', icon: <FocusSvg width={32} height={32} /> },
];

const EXPERIENCE = [
    { id: 'beginner', label: 'Beginner', icon: <BeginnerSvg width={32} height={32} /> },
    { id: 'some', label: 'Some Experience', icon: <SomeSvg width={32} height={32} /> },
    { id: 'advanced', label: 'Advanced', icon: <AdvancedSvg width={32} height={32} /> },
];
const TIME = [
    { id: '5-10', label: '5-10 min' },
    { id: '10-20', label: '10-20 min' },
    { id: '20-30', label: '20-30 min' },
    { id: '30+', label: '30+ min' },
];

const AGES = [
    { id: '18-25', label: '18-25', sub: 'Years' },
    { id: '26-35', label: '26-35', sub: 'Years' },
    { id: '36-45', label: '36-45', sub: 'Years' },
    { id: '45+', label: '45+', sub: 'Years' },
];

// Experience level dot fill
const EXP_FILL: Record<string, number> = {
    beginner: 0,
    some: 0.5,
    advanced: 1,
};

export default function Personalisation() {
    const insets = useSafeAreaInsets();
    const [selectedGoal, setSelectedGoal] = useState('stress');
    const [selectedExp, setSelectedExp] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [selectedAge, setSelectedAge] = useState('');
    const { colors } = useTheme()

    return (
        <View style={[authStyles.container, { paddingTop: insets.top, backgroundColor: colors.background }]}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingHorizontal: 16,
                    paddingTop: 16,
                    paddingBottom: insets.bottom + 40,
                }}
            >
                {/* Hero Image */}
                <Image
                    source={require('@/assets/images/Pranayama_Images/Personalise.png')}
                    style={authStyles.personalisationHeroImage}
                    resizeMode="cover"
                />

                {/* Title */}
                <Text style={authStyles.personalisationTitle}>
                    Personalise Your Experience
                </Text>

                {/* Subtitle */}
                <Text style={[authStyles.personalisationSubtitle, { color: colors.text }]}>
                    Help us understand you better to personalise your healing journey
                </Text>

                {/* ── Goal ── */}
                <Text style={[authStyles.personalisationSectionLabel, { color: colors.text }]}>
                    What is your primary goal?
                </Text>
                <View style={{ flexDirection: 'row', gap: GAP, marginBottom: 24 }}>
                    {GOALS.map((item) => {
                        const active = selectedGoal === item.id;
                        return (
                            <TouchableOpacity
                                key={item.id}
                                style={[
                                    authStyles.personalisationCard,
                                    { width: CARD_WIDTH },
                                    active && authStyles.personalisationCardActive,
                                ]}
                                onPress={() => setSelectedGoal(item.id)}
                                activeOpacity={0.8}
                            >
                                {item.icon}
                                <Text style={[
                                    authStyles.personalisationCardLabel,
                                    active && authStyles.personalisationCardLabelActive,
                                ]}>
                                    {item.label}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>

                {/* ── Experience ── */}
                <Text style={[authStyles.personalisationSectionLabel, { color: colors.text }]}>
                    What is your experience with Mudras?
                </Text>
                <View style={{ flexDirection: 'row', gap: GAP, marginBottom: 24 }}>
                    {EXPERIENCE.map((item) => {
                        const active = selectedExp === item.id;
                        const fill = EXP_FILL[item.id];
                        return (
                            <TouchableOpacity
                                key={item.id}
                                style={[
                                    authStyles.personalisationCard,
                                    { width: TRI_WIDTH, paddingVertical: 16 },
                                    active && authStyles.personalisationCardActive,
                                ]}
                                onPress={() => setSelectedExp(item.id)}
                                activeOpacity={0.8}
                            >
                                {/* Dot indicator */}
                                {item.icon}
                                <Text style={[
                                    authStyles.personalisationCardLabel,
                                    active && authStyles.personalisationCardLabelActive,
                                ]}>
                                    {item.label}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>

                {/* ── Time ── */}
                <Text style={[authStyles.personalisationSectionLabel, { color: colors.text }]}>
                    How much time can you dedicate daily?
                </Text>
                <View style={{ flexDirection: 'row', gap: GAP, marginBottom: 24 }}>
                    {TIME.map((item) => {
                        const active = selectedTime === item.id;
                        return (
                            <TouchableOpacity
                                key={item.id}
                                style={[
                                    authStyles.personalisationCard,
                                    { width: CARD_WIDTH },
                                    active && authStyles.personalisationCardActive,
                                ]}
                                onPress={() => setSelectedTime(item.id)}
                                activeOpacity={0.8}
                            >
                                <ClockSvg
                                    width={24}
                                    height={24}
                                    color={active ? AUTH_COLORS.primary : '#0F0F0F80'}
                                />
                                <Text style={[
                                    authStyles.personalisationCardLabel,
                                    active && authStyles.personalisationCardLabelActive,
                                ]}>
                                    {item.label}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>

                {/* ── Age ── */}
                <Text style={[authStyles.personalisationSectionLabel, { color: colors.text }]}>
                    What is your age range?
                </Text>
                <View style={{ flexDirection: 'row', gap: GAP, marginBottom: 8 }}>
                    {AGES.map((item) => {
                        const active = selectedAge === item.id;
                        return (
                            <TouchableOpacity
                                key={item.id}
                                style={[
                                    authStyles.personalisationCard,
                                    { width: CARD_WIDTH },
                                    active && authStyles.personalisationCardActive,
                                ]}
                                onPress={() => setSelectedAge(item.id)}
                                activeOpacity={0.8}
                            >
                                <Text style={[
                                    authStyles.personalisationCardLabel,
                                    { fontSize: 14, fontWeight: '500' },
                                    active && authStyles.personalisationCardLabelActive,
                                ]}>
                                    {item.label}
                                </Text>
                                <Text style={[
                                    authStyles.personalisationCardLabel,
                                    active && { color: AUTH_COLORS.primary },
                                ]}>
                                    {item.sub}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>

                {/* ── Continue ── */}
                <TouchableOpacity
                    style={authStyles.personalisationContinueBtn}
                    onPress={() => router.replace('/(tabs)')}
                    activeOpacity={0.85}
                >
                    <Text style={authStyles.personalisationContinueBtnText}>Continue</Text>
                </TouchableOpacity>

                {/* ── Skip ── */}
                <TouchableOpacity
                    onPress={() => router.replace('/(tabs)')}
                    activeOpacity={0.7}
                    style={{ alignItems: 'center', paddingBottom: 8 }}
                >
                    <Text style={[authStyles.personalisationSkipText, { color: colors.text }]}>
                        I'll do this later
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}