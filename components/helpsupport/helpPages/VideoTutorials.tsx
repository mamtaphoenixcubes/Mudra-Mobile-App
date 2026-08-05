import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Dimensions, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/constants/ThemeContext';
import AppHeader from '@/components/common/AppHeader';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const moderateScale = (size: number, factor = 0.5) =>
    size + ((SCREEN_WIDTH - 375) / 375) * size * factor;


interface TutorialItem {
    id: string;
    title: string;
    duration: string;
    videoUrl: string | null;
}

const TUTORIALS: TutorialItem[] = [
    { id: 'getting-started', title: 'Getting started with Mudras', duration: '2:30', videoUrl: null },
    { id: 'browse-mudras', title: 'Browsing mudras by need', duration: '1:45', videoUrl: null },
    { id: 'yoga-nidra', title: 'Your first Yoga Nidra session', duration: '3:10', videoUrl: null },
    { id: 'playlists', title: 'Creating and managing playlists', duration: '2:05', videoUrl: null },
    { id: 'reminders', title: 'Setting up daily reminders', duration: '1:20', videoUrl: null },
];

export default function VideoTutorials() {
    const { colors } = useTheme();

    const handlePress = (tutorial: TutorialItem) => {
        if (!tutorial.videoUrl) {
            Alert.alert('Coming soon', 'This tutorial video isn\'t available yet — check back soon!');
            return;
        }
        // TODO: navigate to a video player screen / open tutorial.videoUrl
        // once real tutorial video files exist
    };

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <AppHeader />

            <Text style={[styles.pageTitle, { color: colors.text }]}>Video Tutorials</Text>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                {TUTORIALS.map((tutorial) => (
                    <TouchableOpacity
                        key={tutorial.id}
                        style={[styles.card, { backgroundColor: colors.card }]}
                        activeOpacity={0.8}
                        onPress={() => handlePress(tutorial)}
                    >
                        <View style={[styles.thumbnail, { backgroundColor: colors.surfaceAlt }]}>
                            <View style={[styles.playCircle, { backgroundColor: colors.primary }]}>
                                <Ionicons name="play" size={16} color="#FFFFFF" />
                            </View>
                        </View>

                        <View style={styles.textBlock}>
                            <Text style={[styles.title, { color: colors.text }]} numberOfLines={2}>
                                {tutorial.title}
                            </Text>
                            <Text style={[styles.duration, { color: colors.textSub }]}>
                                {tutorial.duration}
                            </Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    pageTitle: {
        fontFamily: 'SF-Pro-Display',
        fontWeight: '600',
        fontSize: moderateScale(20),
        textAlign: 'center',
        marginVertical: moderateScale(10),
        paddingHorizontal: moderateScale(16),
    },
    scrollContent: {
        paddingHorizontal: moderateScale(16),
        paddingBottom: moderateScale(40),
        gap: moderateScale(12),
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: moderateScale(12),
        borderRadius: moderateScale(14),
        padding: moderateScale(12),
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 2 },
        elevation: 2,
    },
    thumbnail: {
        width: moderateScale(88),
        height: moderateScale(60),
        borderRadius: moderateScale(10),
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
    },
    playCircle: {
        width: moderateScale(34),
        height: moderateScale(34),
        borderRadius: moderateScale(17),
        alignItems: 'center',
        justifyContent: 'center',
    },
    textBlock: {
        flex: 1,
        gap: moderateScale(4),
    },
    title: {
        fontFamily: 'SF-Pro-Display',
        fontSize: moderateScale(14),
        fontWeight: '600',
    },
    duration: {
        fontFamily: 'SF-Pro-Display',
        fontSize: moderateScale(12),
    },
});