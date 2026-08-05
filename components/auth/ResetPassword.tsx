import React, { useState } from 'react';

import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Alert,
    ActivityIndicator,
} from 'react-native';

import { router, useLocalSearchParams } from 'expo-router';

import axios from 'axios';

import { Ionicons } from '@expo/vector-icons';

import {
    authStyles,
    AUTH_COLORS
} from '@/assets/styles/auth/authStyles';
import { useTheme } from '@/constants/ThemeContext'

// SVG
import PasswordIcon from '@/assets/icons/Password.svg';
import EyeIcon from '@/assets/icons/Eye.svg';
import StatusModal from '@/components/common/StatusModal';

export default function ResetPassword() {
    const { colors } = useTheme()

    /*
    |--------------------------------------------------------------------------
    | ROUTE PARAMS
    |--------------------------------------------------------------------------
    */

    const { email } = useLocalSearchParams();

    /*
    |--------------------------------------------------------------------------
    | STATES
    |--------------------------------------------------------------------------
    */

    const [password, setPassword] =
        useState('');

    const [
        confirmPassword,
        setConfirmPassword
    ] = useState('');

    const [loading, setLoading] =
        useState(false);

    const [showPassword, setShowPassword] =
        useState(false);

    const [
        showConfirmPassword,
        setShowConfirmPassword
    ] = useState(false);

    const [
        passwordFocused,
        setPasswordFocused
    ] = useState(false);

    const [
        confirmPasswordFocused,
        setConfirmPasswordFocused
    ] = useState(false);

    const [statusModal, setStatusModal] = useState<{
        visible: boolean;
        type: 'success' | 'error';
        title?: string;
        message: string;
    }>({ visible: false, type: 'success', message: '' });

    const [pendingRedirect, setPendingRedirect] = useState<{
        pathname: string;
        params: Record<string, string>;
    } | null>(null);

    /*
    |--------------------------------------------------------------------------
    | RESET PASSWORD
    |--------------------------------------------------------------------------
    */

    const handleResetPassword =
        async () => {

            try {

                /*
                |--------------------------------------------------------------------------
                | VALIDATION
                |--------------------------------------------------------------------------
                */

                if (
                    !password ||
                    !confirmPassword
                ) {

                    // Alert.alert(
                    //     'Error',
                    //     'Please fill all fields'
                    // );
                    setStatusModal({ visible: true, type: 'error', title: 'Reset Failed', message: 'Please fill all fields' });

                    return;
                }

                if (
                    password !==
                    confirmPassword
                ) {

                    // Alert.alert(
                    //     'Error',
                    //     'Passwords do not match'
                    // );
                    setStatusModal({ visible: true, type: 'error', title: 'Reset Failed', message: 'Passwords do not match' });

                    return;
                }

                if (
                    password.length < 6
                ) {

                    // Alert.alert(
                    //     'Error',
                    //     'Password must be at least 6 characters'
                    // );
                    setStatusModal({ visible: true, type: 'error', title: 'Reset Failed', message: 'Password must be at least 6 characters' });


                    return;
                }

                setLoading(true);

                /*
                |--------------------------------------------------------------------------
                | API CALL
                |--------------------------------------------------------------------------
                */

                const response =
                    await axios.post(

                        `${process.env.EXPO_PUBLIC_API_URL}/auth/reset-password`,

                        {
                            email,
                            password,
                            confirmPassword,
                        }

                    );

                /*
                |--------------------------------------------------------------------------
                | SUCCESS
                |--------------------------------------------------------------------------
                */

                if (
                    response.data?.success
                ) {

                    // Alert.alert(
                    //     'Success',
                    //     'Password reset successful'
                    // );

                    // router.push(
                    //     '/auth/success'
                    // );
                    setPendingRedirect({ pathname: '/auth/success', params: {} });

                    setStatusModal({ visible: true, type: 'success', message: 'Password reset successful' });


                }

            } catch (error: any) {

                console.log(
                    'RESET PASSWORD ERROR:',
                    error?.response?.data
                );

                // Alert.alert(

                //     'Error',

                //     error?.response?.data?.message ||

                //     'Something went wrong'

                // );
                setStatusModal({
                    visible: true,
                    type: 'error',
                    title: 'Reset Failed',
                    message: error?.response?.data?.message || 'Something went wrong',
                });

            } finally {

                setLoading(false);

            }

        };

    /*
    |--------------------------------------------------------------------------
    | LOGIN NAVIGATION
    |--------------------------------------------------------------------------
    */

    const handleBackToLogin =
        () => {

            router.push(
                '/auth/login'
            );

        };

    return (

        <KeyboardAvoidingView
            style={[authStyles.container, { backgroundColor: colors.background }]}
            behavior={
                Platform.OS === 'ios'
                    ? 'padding'
                    : 'height'
            }
        >

            <ScrollView
                contentContainerStyle={
                    authStyles.scrollContent
                }
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
            >

                <View style={authStyles.inner}>

                    {/* BACK BUTTON */}

                    <TouchableOpacity
                        onPress={() => router.back()}
                        style={authStyles.backBtn}
                        activeOpacity={0.7}
                    >

                        <Ionicons
                            name="arrow-back"
                            size={24}
                            color={colors.text}
                        />

                    </TouchableOpacity>

                    {/* IMAGE */}

                    <Image
                        source={require('@/assets/images/Pranayama_Images/ResetPassword.png')}
                        style={authStyles.heroImage}
                        resizeMode="contain"
                    />

                    {/* TITLE */}

                    <Text style={[authStyles.title, { color: colors.primary }]}>
                        Reset Password
                    </Text>

                    {/* SUBTITLE */}

                    <Text style={[authStyles.subtitle, { color: colors.text }]}>

                        Create a new password
                        for your account
                        to continue your
                        healing journey

                    </Text>

                    {/* PASSWORD */}

                    <View
                        style={[
                            authStyles.inputWrapper,

                            passwordFocused &&
                            authStyles.inputWrapperFocused
                        ]}
                    >

                        <PasswordIcon
                            width={20}
                            height={20}
                        />

                        <TextInput
                            style={authStyles.input}
                            placeholder="Password"
                            placeholderTextColor={
                                AUTH_COLORS.placeholder
                            }
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry={!showPassword}
                            onFocus={() =>
                                setPasswordFocused(true)
                            }
                            onBlur={() =>
                                setPasswordFocused(false)
                            }
                        />

                        <TouchableOpacity
                            onPress={() =>
                                setShowPassword(
                                    !showPassword
                                )
                            }
                        >

                            <EyeIcon
                                width={20}
                                height={20}
                            />

                        </TouchableOpacity>

                    </View>

                    {/* PASSWORD TEXT */}

                    <Text
                        style={[authStyles.passwordRequirement, { color: colors.textSub }]}
                    >

                        Password must be at least
                        6 characters long.

                    </Text>

                    {/* CONFIRM PASSWORD */}

                    <View
                        style={[
                            authStyles.inputWrapper,

                            confirmPasswordFocused &&
                            authStyles.inputWrapperFocused
                        ]}
                    >

                        <PasswordIcon
                            width={20}
                            height={20}
                        />

                        <TextInput
                            style={authStyles.input}
                            placeholder="Confirm Password"
                            placeholderTextColor={
                                AUTH_COLORS.placeholder
                            }
                            value={confirmPassword}
                            onChangeText={
                                setConfirmPassword
                            }
                            secureTextEntry={
                                !showConfirmPassword
                            }
                            onFocus={() =>
                                setConfirmPasswordFocused(true)
                            }
                            onBlur={() =>
                                setConfirmPasswordFocused(false)
                            }
                            onSubmitEditing={
                                handleResetPassword
                            }
                        />

                        <TouchableOpacity
                            onPress={() =>
                                setShowConfirmPassword(
                                    !showConfirmPassword
                                )
                            }
                        >

                            <EyeIcon
                                width={20}
                                height={20}
                            />

                        </TouchableOpacity>

                    </View>

                    {/* RESET BUTTON */}

                    <TouchableOpacity
                        style={authStyles.primaryBtn}
                        onPress={handleResetPassword}
                        activeOpacity={0.8}
                        disabled={loading}
                    >

                        {
                            loading ? (

                                <ActivityIndicator
                                    color="#fff"
                                />

                            ) : (

                                <Text
                                    style={
                                        authStyles.primaryBtnText
                                    }
                                >

                                    Reset Password

                                </Text>

                            )
                        }

                    </TouchableOpacity>

                    {/* DIVIDER */}

                    <View style={authStyles.dividerRow}>

                        <View
                            style={[authStyles.dividerLine, { backgroundColor: colors.authDivider }]}
                        />

                        <Text
                            style={[authStyles.dividerText, { color: colors.textSub }]}
                        >

                            or

                        </Text>

                        <View
                            style={[authStyles.dividerLine, { backgroundColor: colors.authDivider }]}
                        />

                    </View>

                    {/* BACK TO LOGIN */}

                    <TouchableOpacity
                        style={authStyles.socialBtn}
                        onPress={handleBackToLogin}
                        activeOpacity={0.7}
                    >

                        <Ionicons
                            name="log-in-outline"
                            size={20}
                            color={AUTH_COLORS.text}
                        />

                        <Text
                            style={
                                authStyles.socialBtnText
                            }
                        >

                            Back to Log In

                        </Text>

                    </TouchableOpacity>

                </View>

            </ScrollView>
            <StatusModal
                visible={statusModal.visible}
                type={statusModal.type}
                title={statusModal.title}
                message={statusModal.message}
                onClose={() => {
                    setStatusModal((prev) => ({ ...prev, visible: false }));

                    if (statusModal.type === 'success' && pendingRedirect) {
                        router.push({
                            pathname: pendingRedirect.pathname as any,
                            params: pendingRedirect.params,
                        });
                        setPendingRedirect(null);
                    }
                }}
            />

        </KeyboardAvoidingView>

    );

}