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
import ConfirmModal from '@/components/common/ConfirmModal';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {signInWithGoogle,} from '@/services/googleAuth';
import {googleLogin,} from '@/services/authApi';
import axios from 'axios';

import { authStyles, AUTH_COLORS } from '@/assets/styles/auth/authStyles';
import { useTheme } from '@/constants/ThemeContext';

// Zustand Store

// Import SVG components
import GoogleIcon from '@/assets/icons/Google.svg';
import AppleIcon from '@/assets/icons/Apple.svg';
import EmailIcon from '@/assets/icons/Email.svg';
import PasswordIcon from '@/assets/icons/Password.svg';
import EyeIcon from '@/assets/icons/Eye.svg';
import { useAuthStore } from '@/store/authStore';
import StatusModal from '@/components/common/StatusModal';

export default function Login() {

 const {
    redirect,
    id,
    action,
    mudraId,
    profileCheckSource,
} = useLocalSearchParams();

    const { setAuth } = useAuthStore();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    const [showPassword, setShowPassword] = useState(false);
    const [showProfileModal, setShowProfileModal] = useState(false);
    
    const [emailFocused, setEmailFocused] = useState(false);
    const [passwordFocused, setPasswordFocused] = useState(false);
    const { colors } = useTheme();
    const insets = useSafeAreaInsets();
    const [headerHeight, setHeaderHeight] = useState(0);
    const [statusModal, setStatusModal] = useState<{
        visible: boolean;
        type: 'success' | 'error';
        title: string;
        message: string;
    }>({ visible: false, type: 'success', title: '', message: '' });
const shouldShowProfileModal =
    profileCheckSource === 'profileReminders' ||
    profileCheckSource === 'more';
    const [pendingRedirect, setPendingRedirect] = useState<any>(null);
    const [loading, setLoading] = useState(false);
const getProfileCompletionStatus = (profileUser: any) => {
    const rawCompletionPercentage = Number(
        profileUser?.profileCompletionPercentage ??
        profileUser?.profile_completion_percentage ??
        profileUser?.profile?.profileCompletionPercentage ??
        profileUser?.profile?.completionPercentage ??
        0
    );

    const rawProfileComplete =
        profileUser?.profileComplete ??
        profileUser?.profile_complete ??
        profileUser?.profile?.profileComplete ??
        profileUser?.profile?.complete ??
        rawCompletionPercentage >= 100;

    const profileComplete =
        typeof rawProfileComplete === 'string'
            ? ['true', '1', 'yes'].includes(
                rawProfileComplete.toLowerCase()
            )
            : Boolean(rawProfileComplete);

    return {
        profileComplete,
        profileCompletionPercentage:
            Number.isFinite(rawCompletionPercentage)
                ? rawCompletionPercentage
                : 0,
    };
};
    const handleLogin = async () => {

        if (!email || !password) {
            // Alert.alert('Error', 'Please fill in all fields');
            setStatusModal({ visible: true, type: 'error', title: 'Login Failed', message: 'Please fill in all fields' });
            return;
        }

        console.log('Login pressed', {
            email,
            password,
            rememberMe,
        });

        setLoading(true);

        try {

            const url =
                `${process.env.EXPO_PUBLIC_API_URL}/auth/login`;

            const payload = {
                email,
                password,
            };

            const res = await axios.post(url, payload);

          

            if (res?.data?.success) {

                const userData =
                    res?.data?.data?.user ||
                    res?.data?.user;
  console.log(
                'LOGIN RESPONSE:',
                userData
            );
                const authToken =
                    res?.data?.data?.refreshToken ||
                    res?.data?.refreshToken;

                    console.log('userData before setAuth:', JSON.stringify(userData, null, 2));

                await setAuth({
                    user: userData,
                    token: authToken,
                });
const {
    profileCompletionPercentage,
    profileComplete,
} = getProfileCompletionStatus(userData);

const profileIncomplete =
    profileCompletionPercentage < 100 ||
    !profileComplete;
                // AUTO SAVE MUDRA AFTER LOGIN
                if (
                    action === 'save' &&
                    mudraId
                ) {
                    try {

                        const profileDocumentId =
                            userData?.profileDocumentId ||
                            userData?.id;

                        await axios.post(
                            `${process.env.EXPO_PUBLIC_API_URL}/mudras/${mudraId}/save`,
                            {
                                profileDocumentId,
                            },
                            {
                                headers: {
                                    Authorization: `Bearer ${authToken}`,
                                },
                            }
                        );

                        console.log(
                            'Mudra saved after login'
                        );

                    } catch (error: any) {

                        console.log(
                            'AUTO_SAVE_ERROR',
                            error?.response?.data ||
                            error
                        );

                    }
                }

                // Alert.alert(
                //     'Success',
                //     'Login successful'
                // );
                setStatusModal({ visible: true, type: 'success', title: 'Success', message: 'Login successful' });

                const redirectPath =
                    typeof redirect === 'string' &&
                        redirect.length > 0
                        ? redirect
                        : null;

                const redirectParams: Record<
                    string,
                    string
                > = {};

                if (redirectPath && id) {
                    redirectParams.id =
                        String(id);
                }

                // if (redirectPath) {

                //     router.replace({
                //         pathname:
                //             redirectPath as any,
                //         params:
                //             redirectParams,
                //     });

                // } else {

                //     router.replace(
                //         '/(tabs)'
                //     );

                // }
                setPendingRedirect({ pathname: redirectPath ?? '/(tabs)', params: redirectParams });
setPendingRedirect({
    pathname: redirectPath ?? '/(tabs)',
    params: redirectParams,
    profileIncomplete,
    shouldShowProfileModal,
});

            } else {

                const message =
                    res?.data?.message ||
                    'Login failed';

                //Alert.alert('Error', message);
                setStatusModal({ visible: true, type: 'error', title: 'Login Failed', message });

            }

        } catch (err: any) {

            console.log(
                'Login error:',
                err?.response?.data ||
                err?.message ||
                err
            );

            const message =
                err?.response?.data?.message ||
                err?.message ||
                'Login error';

            // Alert.alert('Error', message);
            setStatusModal({ visible: true, type: 'error', title: 'Login Failed', message });

        }
        finally {

            setLoading(false);

        }
    };

  const handleGoogleLogin = async () => {

    if (loading) {
        return;
    }

    setLoading(true);

    try {

        //--------------------------------------------------
        // 1. OPEN GOOGLE SIGN IN
        //--------------------------------------------------

        const googleResult =
            await signInWithGoogle();


        //--------------------------------------------------
        // GOOGLE SIGN IN FAILED / CANCELLED
        //--------------------------------------------------

        if (!googleResult.success) {

            if (googleResult.cancelled) {
                return;
            }

            throw new Error(
                googleResult.message ||
                'Google sign in failed'
            );
        }


        //--------------------------------------------------
        // 2. GET GOOGLE ID TOKEN
        //--------------------------------------------------

        const idToken =
            googleResult.idToken;


        if (!idToken) {

            throw new Error(
                'Google ID token was not returned'
            );

        }


        console.log(
            'Google ID token received'
        );

        //--------------------------------------------------
        // 3. SEND GOOGLE TOKEN TO NODE.JS
        //--------------------------------------------------

        const result =
            await googleLogin(
                idToken
            );


        console.log(
            'GOOGLE LOGIN RESPONSE:',
            result
        );


        //--------------------------------------------------
        // 4. CHECK NODE RESPONSE
        //--------------------------------------------------

        if (!result?.success) {

            throw new Error(
                result?.message ||
                'Google login failed'
            );

        }


        //--------------------------------------------------
        // 5. GET USER DATA
        //--------------------------------------------------

        const userData =
            result?.data?.user ||
            result?.user;


        console.log(
            'GOOGLE USER:',
            userData
        );


        //--------------------------------------------------
        // 6. GET REFRESH TOKEN
        //--------------------------------------------------

        const authToken =
            result?.data?.refreshToken ||
            result?.refreshToken;


        if (!authToken) {

            throw new Error(
                'Authentication token was not returned'
            );

        }


        //--------------------------------------------------
        // 7. SAVE AUTH STATE
        //--------------------------------------------------

        await setAuth({
            user: userData,
            token: authToken,
        });


        //--------------------------------------------------
        // 8. PROFILE COMPLETION
        //--------------------------------------------------

        const {
            profileCompletionPercentage,
            profileComplete,
        } =
            getProfileCompletionStatus(
                userData
            );


        const profileIncomplete =
            profileCompletionPercentage < 100 ||
            !profileComplete;


        //--------------------------------------------------
        // 9. AUTO SAVE MUDRA AFTER GOOGLE LOGIN
        //--------------------------------------------------

        if (
            action === 'save' &&
            mudraId
        ) {

            try {

                const profileDocumentId =
                    userData?.profileDocumentId ||
                    userData?.id;


                await axios.post(
                    `${process.env.EXPO_PUBLIC_API_URL}/mudras/${mudraId}/save`,
                    {
                        profileDocumentId,
                    },
                    {
                        headers: {
                            Authorization:
                                `Bearer ${authToken}`,
                        },
                    }
                );


                console.log(
                    'Mudra saved after Google login'
                );

            } catch (error: any) {

                console.log(
                    'GOOGLE_AUTO_SAVE_ERROR',
                    error?.response?.data ||
                    error
                );

            }

        }


        //--------------------------------------------------
        // 10. SUCCESS MESSAGE
        //--------------------------------------------------

        setStatusModal({
            visible: true,
            type: 'success',
            title: 'Success',
            message: 'Login successful',
        });


        //--------------------------------------------------
        // 11. REDIRECT
        //--------------------------------------------------

        const redirectPath =
            typeof redirect === 'string' &&
            redirect.length > 0
                ? redirect
                : null;


        const redirectParams: Record<
            string,
            string
        > = {};


        if (
            redirectPath &&
            id
        ) {

            redirectParams.id =
                String(id);

        }


        //--------------------------------------------------
        // STORE PENDING REDIRECT
        //--------------------------------------------------

    setPendingRedirect({
    pathname: redirectPath ?? '/(tabs)',
    params: redirectParams,
    profileIncomplete,
    shouldShowProfileModal,
});


    } catch (error: any) {

        console.log(
            'GOOGLE LOGIN ERROR:',
            error?.response?.data ||
            error?.message ||
            error
        );


        //--------------------------------------------------
        // ACCOUNT ALREADY EXISTS
        //--------------------------------------------------

        const backendMessage =
            error?.response?.data?.message;


        const message =
            backendMessage ||
            error?.message ||
            'Google login failed';


        setStatusModal({
            visible: true,
            type: 'error',
            title: 'Google Login Failed',
            message,
        });


    } finally {

        setLoading(false);

    }

};

    const handleAppleLogin = () => {
        console.log('Continue with Apple');
    };

    return (
        <KeyboardAvoidingView style={[authStyles.container, { backgroundColor: colors.background }]}
            behavior={
                Platform.OS === 'ios'
                    ? 'padding'
                    : 'height'
            }
        >
            <View
                onLayout={(e) => setHeaderHeight(e.nativeEvent.layout.height)}
                style={[
                    authStyles.fixedHeader,
                    { paddingTop: insets.top, backgroundColor: colors.background },
                ]}
            >
                <TouchableOpacity
                    onPress={() => {
                        if (router.canGoBack()) {
                            router.back();
                        } else {
                            router.replace('/(tabs)');
                        }
                    }}
                    //style={[authStyles.backBtn, { marginTop: 0 }]}
                    style={[authStyles.backBtn, { marginTop: 0, marginBottom: 0, width: 32, height: 30 }]}
                    hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                >
                    <Ionicons
                        name="arrow-back"
                        size={24}
                        color={colors.text}
                    />
                </TouchableOpacity>
            </View>


            <ScrollView
                // contentContainerStyle={authStyles.scrollContent}
                contentContainerStyle={[authStyles.scrollContent, { paddingTop: headerHeight }]}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
            >

                <View style={[authStyles.inner, { paddingTop: 0 }]}>

                    {/* Back Button */}
                    {/* <TouchableOpacity
                        onPress={() => {
                            if (router.canGoBack()) {
                                router.back();
                            } else {
                                router.replace('/(tabs)');
                            }
                        }}
                        style={authStyles.backBtn}
                    >
                        <Ionicons
                            name="arrow-back"
                            size={24}
                            //color={AUTH_COLORS.text}
                            color={colors.text}
                        />
                    </TouchableOpacity> */}

                    {/* Login Image */}
                    <Image
                        source={require('@/assets/images/Pranayama_Images/Login.png')}
                        style={authStyles.heroImage}
                        resizeMode="contain"
                    />

                    {/* Title */}
                    <Text style={[authStyles.title, { color: colors.primary }]}>
                        Log In
                    </Text>

                    {/* Subtitle */}
                    <Text style={[authStyles.subtitle, { color: colors.text }]}>
                        Welcome back! Log in to continue your healing journey
                    </Text>

                    {/* Email Input */}
                    <View
                        style={[
                            authStyles.inputWrapper,
                            emailFocused &&
                            authStyles.inputWrapperFocused,
                        ]}
                    >
                        <EmailIcon
                            width={20}
                            height={20}
                        />

                        <TextInput
                            style={authStyles.input}
                            placeholder="Email Address"
                            placeholderTextColor={
                                AUTH_COLORS.placeholder
                            }
                            value={email}
                            onChangeText={setEmail}
                            onFocus={() => setEmailFocused(true)}
                            onBlur={() => setEmailFocused(false)}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            autoCorrect={false}
                            returnKeyType="next"

                            // Autofill
                            autoComplete="email"
                            textContentType="username"
                            importantForAutofill="yes"
                        />
                    </View>

                    {/* Password Input */}
                    <View
                        style={[
                            authStyles.inputWrapper,
                            passwordFocused &&
                            authStyles.inputWrapperFocused,
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
                            onFocus={() => setPasswordFocused(true)}
                            onBlur={() => setPasswordFocused(false)}
                            secureTextEntry={!showPassword}
                            returnKeyType="done"
                            onSubmitEditing={handleLogin}

                            // Autofill
                            autoComplete="password"
                            textContentType="password"
                            importantForAutofill="yes"
                        />

                        <TouchableOpacity
                            onPress={() =>
                                setShowPassword(!showPassword)
                            }
                            activeOpacity={0.7}
                        >
                            <EyeIcon
                                width={20}
                                height={20}
                            />
                        </TouchableOpacity>
                    </View>

                    {/* Remember Me + Forgot Password */}
                    <View style={authStyles.checkboxRow}>

                        <TouchableOpacity
                            style={authStyles.checkboxContainer}
                            onPress={() =>
                                setRememberMe(!rememberMe)
                            }
                            activeOpacity={0.7}
                        >

                            <View
                                style={[
                                    authStyles.checkbox,
                                    rememberMe &&
                                    authStyles.checkboxChecked,
                                    { borderColor: colors.dividerDark }
                                ]}
                            >

                                {rememberMe && (
                                    <Ionicons
                                        name="checkmark"
                                        size={14}
                                        color={AUTH_COLORS.white}
                                    />
                                )}

                            </View>

                            <Text style={[authStyles.checkboxText, { color: colors.text }]}>
                                Remember me
                            </Text>

                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() =>
                                router.push('/auth/forgotpassword')
                            }
                            activeOpacity={0.7}
                        >

                            <Text style={authStyles.forgotPassword}>
                                Forgot Password?
                            </Text>

                        </TouchableOpacity>

                    </View>

                    {/* Login Button */}
                    <TouchableOpacity
                        style={authStyles.primaryBtn}
                        onPress={handleLogin}
                        activeOpacity={0.8}
                        disabled={loading}
                    >

                        {loading ? (
                            <ActivityIndicator color="#FFFFFF" />
                        ) : (

                            <Text style={authStyles.primaryBtnText}>
                                Log In
                            </Text>

                        )}

                    </TouchableOpacity>

                    {/* Divider */}
                    <View style={authStyles.dividerRow}>

                        <View style={[authStyles.dividerLine, { backgroundColor: colors.authDivider }]} />

                        <Text style={[authStyles.dividerText, { color: colors.textSub }]}>
                            or continue with
                        </Text>

                        <View style={[authStyles.dividerLine, { backgroundColor: colors.authDivider }]} />

                    </View>

                    {/* Google Login */}
                    <TouchableOpacity
                        style={authStyles.socialBtn}
                        onPress={handleGoogleLogin}
                        activeOpacity={0.7}
                    >

                        <GoogleIcon
                            width={20}
                            height={20}
                        />

                        <Text style={authStyles.socialBtnText}>
                            Continue with Google
                        </Text>

                    </TouchableOpacity>

                    {/* Apple Login */}
                    {/* Apple Login - iOS Only */}
                    {Platform.OS === 'ios' && (
                        <TouchableOpacity
                            style={authStyles.socialBtn}
                            onPress={handleAppleLogin}
                            activeOpacity={0.7}
                        >
                            <AppleIcon
                                width={20}
                                height={20}
                            />

                            <Text style={authStyles.socialBtnText}>
                                Continue with Apple
                            </Text>
                        </TouchableOpacity>
                    )}

                    {/* Bottom Row */}
                    <View style={authStyles.bottomRow}>

                        <Text style={[authStyles.bottomText, { color: colors.text }]}>
                            Dont have an account?
                        </Text>

                        <TouchableOpacity
                            onPress={() =>
                                router.push('/auth/signup')
                            }
                            activeOpacity={0.7}
                        >

                            <Text style={authStyles.bottomLink}>
                                Sign Up
                            </Text>

                        </TouchableOpacity>

                    </View>

                </View>

            </ScrollView>
        <StatusModal
    visible={statusModal.visible}
    type={statusModal.type}
    title={statusModal.title}
    message={statusModal.message}
    onClose={() => {

        setStatusModal((prev) => ({
            ...prev,
            visible: false,
        }));

        if (
            statusModal.type === 'success' &&
            pendingRedirect
        ) {

        if (
    pendingRedirect?.profileIncomplete === true &&
    pendingRedirect?.shouldShowProfileModal === true
) {
    setShowProfileModal(true);
} else {
    router.replace({
        pathname: pendingRedirect.pathname,
        params: pendingRedirect.params,
    });

    setPendingRedirect(null);
}
        }
    }}
/>

<ConfirmModal
    visible={showProfileModal}
    type="profileDetails"
    onConfirm={() => {

        setShowProfileModal(false);

        router.push('/editprofile');

        setPendingRedirect(null);
    }}
    onCancel={() => {

        setShowProfileModal(false);

        if (pendingRedirect) {
            router.replace({
                pathname: pendingRedirect.pathname,
                params: pendingRedirect.params,
            });

            setPendingRedirect(null);
        }
    }}
/>

        </KeyboardAvoidingView>
    );
}