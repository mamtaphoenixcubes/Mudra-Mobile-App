import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    ScrollView,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { authStyles, AUTH_COLORS } from '@/assets/styles/auth/authStyles';
import { useTheme } from '@/constants/ThemeContext'

export default function Success() {
    const { colors } = useTheme()

    const handleGoToLogin = () => {
        router.push('/auth/login');
    };

    const handleBackToHome = () => {
        router.push('/(tabs)');
    };

    return (
        <ScrollView
            style={[authStyles.container, { backgroundColor: colors.background }]}
            contentContainerStyle={authStyles.scrollContent}
            showsVerticalScrollIndicator={false}
        >
            <View style={[authStyles.inner, { justifyContent: 'center' }]}>
                {/* Success Image - Keep only this */}
                <Image
                    source={require('@/assets/images/Pranayama_Images/Success.png')}
                    style={authStyles.heroImage}
                    resizeMode="contain"
                />

                {/* Title */}
                <Text style={[authStyles.title, { color: colors.primary }]}>Success!</Text>

                {/* Success Message */}
                <Text style={[authStyles.successMessage, { color: colors.text }]}>
                    Your password has been reset successfully.
                </Text>

                <Text style={[authStyles.subtitle, { color: colors.text }]}>
                    You can now log in to continue your healing journey
                </Text>

                {/* Go to Log In Button */}
                <TouchableOpacity
                    style={authStyles.primaryBtn}
                    onPress={handleGoToLogin}
                    activeOpacity={0.8}
                >
                    <Text style={authStyles.primaryBtnText}>Go to Log In</Text>
                </TouchableOpacity>

                {/* OR Divider */}
                <View style={authStyles.dividerRow}>
                    <View style={[authStyles.dividerLine, { backgroundColor: colors.authDivider }]} />
                    <Text style={[authStyles.dividerText, { color: colors.textSub }]}>or</Text>
                    <View style={[authStyles.dividerLine, { backgroundColor: colors.authDivider }]} />
                </View>

                {/* Back to Home Button */}
                <TouchableOpacity
                    style={authStyles.socialBtn}
                    onPress={handleBackToHome}
                    activeOpacity={0.7}
                >
                    <Ionicons name="home-outline" size={20} color={AUTH_COLORS.text} />
                    <Text style={authStyles.socialBtnText}>Back to Home</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}