import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AppHeader from '@/components/common/AppHeader';
import { useTheme } from '@/constants/ThemeContext';
import { router } from 'expo-router';

export default function NotificationHeader() {
    const { colors } = useTheme()
    return (
        <AppHeader
            rightIcon={
                <TouchableOpacity
                    style={{ width: 40, height: 40, alignItems: 'center', justifyContent: 'center' }}
                    activeOpacity={0.7}
                    onPress={() => router.push('/profile')}
                >
                    <Ionicons name="settings-outline" size={22} color={colors.text} />
                </TouchableOpacity>
            }
        />
    );
}