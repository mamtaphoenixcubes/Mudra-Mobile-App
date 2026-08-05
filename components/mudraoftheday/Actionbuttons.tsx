import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getMudraOfTheDayStyles } from '@/assets/styles/mudraoftheday/mudraOfTheDayStyles'
import { useTheme } from '@/constants/ThemeContext'

interface Props {
    onExplore?: () => void;
    onSave?: () => void;
    isSaved?: boolean;
}

export default function ActionButtons({
    onExplore,
    onSave,
    isSaved = false,
}: Props) {
    const { colors } = useTheme()
    const styles = getMudraOfTheDayStyles(colors)

    return (
        <View style={styles.actionContainer}>
            <TouchableOpacity style={styles.actionExploreBtn} onPress={onExplore} activeOpacity={0.85}>
                <Text style={styles.actionExploreBtnText}>Explore This Mudra</Text>
                <Ionicons name="arrow-forward" size={18} color="#fff" />
            </TouchableOpacity>

        <TouchableOpacity
    style={styles.actionSaveBtn}
    onPress={onSave}
    activeOpacity={0.75}
>
    <Ionicons
        name={isSaved ? "bookmark" : "bookmark-outline"}
        size={18}
        color={isSaved ? "#7B6FE8" : colors.textSub}
    />

    <Text
        style={[
            styles.actionSaveBtnText,
            isSaved && { color: "#7B6FE8" },
        ]}
    >
        {isSaved ? "Saved" : "Save for Later"}
    </Text>
</TouchableOpacity>

            <View style={styles.actionTomorrowCard}>
                <View style={styles.actionTomorrowIconBox}>
                    <Ionicons name="calendar-outline" size={22} color={colors.textSub} />
                </View>
                <View style={styles.actionTomorrowText}>
                    <Text style={styles.actionTomorrowTitle}>Come back tomorrow</Text>
                    <Text style={styles.actionTomorrowSubtitle}>A new mudra, every day for your well-being.</Text>
                </View>
            </View>
        </View>
    );
}