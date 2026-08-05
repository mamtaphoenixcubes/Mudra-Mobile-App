import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ProfileRemindersScreen from './Profileremindersscreen';
import Preferences from './Preferences';
import More from './More';
import { useTheme } from '@/constants/ThemeContext'


export default function Profile() {
    const insets = useSafeAreaInsets();
    const { colors } = useTheme()

    return (
        <ScrollView
            style={[styles.container, { backgroundColor: colors.background }]}
            contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}
            showsVerticalScrollIndicator={false}
        >
            <Text style={[styles.pageTitle, { color: colors.text }]}>
                Profile/Settings
            </Text>
            <ProfileRemindersScreen />
            <Preferences />
            <More />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    pageTitle: {
        fontFamily: 'SF-Pro-Display',
        fontWeight: '600',
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 4,
        paddingHorizontal: 16,
    },
});