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
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { authStyles, AUTH_COLORS } from '@/assets/styles/auth/authStyles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Import SVG components
import GoogleIcon from '@/assets/icons/Google.svg';
import AppleIcon from '@/assets/icons/Apple.svg';
import UserIcon from '@/assets/icons/User.svg';
import EmailIcon from '@/assets/icons/Email.svg';
import PasswordIcon from '@/assets/icons/Password.svg';
import EyeIcon from '@/assets/icons/Eye.svg';
import { useTheme } from '@/constants/ThemeContext';
import StatusModal from '@/components/common/StatusModal';

export default function SignUp() {
    const { colors } = useTheme();
    const insets = useSafeAreaInsets();
    const [headerHeight, setHeaderHeight] = useState(0);
    const [fullName, setFullName] = useState('');
    const [username, setUsername] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [agreeToTerms, setAgreeToTerms] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [fullNameFocused, setFullNameFocused] = useState(false);
    const [usernameFocused, setUsernameFocused] = useState(false);
    const [phoneNumberFocused, setPhoneNumberFocused] = useState(false);
    const [emailFocused, setEmailFocused] = useState(false);
    const [passwordFocused, setPasswordFocused] = useState(false);
    const [confirmPasswordFocused, setConfirmPasswordFocused] = useState(false);
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

    const handleSignUp = () => {

        if (!fullName || !username || !phoneNumber || !email || !password || !confirmPassword) {
            //Alert.alert('Error', 'Please fill in all fields');
            setStatusModal({ visible: true, type: 'error', title: 'Sign Up Failed', message: 'Please fill in all fields' });
            return;
        }

        if (password !== confirmPassword) {
            setStatusModal({ visible: true, type: 'error', title: 'Sign Up Failed', message: 'Passwords do not match' });
            return;
        }

        if (!agreeToTerms) {
            setStatusModal({ visible: true, type: 'error', title: 'Sign Up Failed', message: 'Please agree to the Terms of Service and Privacy Policy' });
            return;
        }

        // Submit to /users/create
        (async () => {
            try {
                const payload = {
                    fullName,
                    username,
                    phoneNumber,
                    email,
                    password,
                };
                console.log(payload, 'Submitting registration');

                const url = `${process.env.EXPO_PUBLIC_API_URL}/users/create`;
                const res = await axios.post(url, payload);

                if (res?.data?.success) {
                    // Registration succeeded — navigate to verify email
                    // router.push({
                    //     pathname: '/auth/verifyemail',
                    //     params: { email: email }
                    // });
                    setPendingRedirect({
                        pathname: '/auth/verifyemail',
                        params: { email: email },
                    });
                    setStatusModal({ visible: true, type: 'success', message: 'Verify your email' });
                } else {
                    const message = res?.data?.message || 'Registration failed';
                    //Alert.alert('Error', message);
                    setStatusModal({ visible: true, type: 'error', title: 'Sign Up Failed', message });
                }
            } catch (err: any) {
                console.log('Register error:', err?.response || err?.message || err);
                const msg = err?.response?.data?.message || err?.message || 'Registration error';
                //Alert.alert('Error', msg);
                setStatusModal({ visible: true, type: 'error', title: 'Sign Up Failed', message: msg });
            }
        })();
    };

    const handleGoogleSignUp = () => {
        console.log('Continue with Google');
    };

    const handleAppleSignUp = () => {
        console.log('Continue with Apple');
    };

    return (
        <KeyboardAvoidingView
            style={[authStyles.container, { backgroundColor: colors.background }]}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <View
                onLayout={(e) => setHeaderHeight(e.nativeEvent.layout.height)}
                style={[
                    authStyles.fixedHeader,
                    { paddingTop: insets.top, backgroundColor: colors.background },
                ]}
            >
                <TouchableOpacity
                    onPress={() => router.back()}
                    style={[authStyles.backBtn, { marginTop: 0, marginBottom: 0, width: 32, height: 32 }]}
                    activeOpacity={0.7}
                    hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                >
                    <Ionicons name="arrow-back" size={22} color={colors.text} />
                </TouchableOpacity>
            </View>

            <ScrollView
                //contentContainerStyle={authStyles.scrollContent}
                contentContainerStyle={[authStyles.scrollContent, { paddingTop: headerHeight }]}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
            >
                <View style={[authStyles.inner, { paddingTop: 0 }]}>
                    {/* Back Button */}
                    {/* <TouchableOpacity
                        onPress={() => router.back()}
                        style={authStyles.backBtn}
                        activeOpacity={0.7}
                    >
                        <Ionicons name="arrow-back" size={24} color={colors.text} />
                    </TouchableOpacity> */}

                    {/* Sign Up Image */}
                    <Image
                        source={require('@/assets/images/Pranayama_Images/SignUp.png')}
                        style={authStyles.heroImage}
                        resizeMode="contain"
                    />

                    {/* Title */}
                    <Text style={[authStyles.title, { color: colors.primary }]}>Sign Up</Text>

                    {/* Subtitle */}
                    <Text style={[authStyles.subtitle, { color: colors.text }]}>
                        Create your account to begin your healing journey
                    </Text>

                    {/* Full Name Input */}
                    <View style={[
                        authStyles.inputWrapper,
                        fullNameFocused && authStyles.inputWrapperFocused
                    ]}>
                        <UserIcon width={20} height={20} />
                        <TextInput
                            style={authStyles.input}
                            placeholder="Full Name"
                            placeholderTextColor={AUTH_COLORS.placeholder}
                            value={fullName}
                            onChangeText={setFullName}
                            onFocus={() => setFullNameFocused(true)}
                            onBlur={() => setFullNameFocused(false)}
                            returnKeyType="next"
                        />
                    </View>

                    {/* Username Input */}
                    <View style={[
                        authStyles.inputWrapper,
                        usernameFocused && authStyles.inputWrapperFocused
                    ]}>
                        <Ionicons name="person-outline" size={20} color={AUTH_COLORS.text} />
                        <TextInput
                            style={authStyles.input}
                            placeholder="Username"
                            placeholderTextColor={AUTH_COLORS.placeholder}
                            value={username}
                            onChangeText={setUsername}
                            onFocus={() => setUsernameFocused(true)}
                            onBlur={() => setUsernameFocused(false)}
                            autoCapitalize="none"
                            autoCorrect={false}
                            returnKeyType="next"
                        />
                    </View>

                    {/* Phone Number Input */}
                    <View style={[
                        authStyles.inputWrapper,
                        phoneNumberFocused && authStyles.inputWrapperFocused
                    ]}>
                        <Ionicons name="call-outline" size={20} color={AUTH_COLORS.text} />
                        <TextInput
                            style={authStyles.input}
                            placeholder="Phone Number"
                            placeholderTextColor={AUTH_COLORS.placeholder}
                            value={phoneNumber}
                            onChangeText={setPhoneNumber}
                            onFocus={() => setPhoneNumberFocused(true)}
                            onBlur={() => setPhoneNumberFocused(false)}
                            keyboardType="phone-pad"
                            returnKeyType="next"
                        />
                    </View>

                    {/* Email Input */}
                    <View style={[
                        authStyles.inputWrapper,
                        emailFocused && authStyles.inputWrapperFocused
                    ]}>
                        <EmailIcon width={20} height={20} />
                        <TextInput
                            style={authStyles.input}
                            placeholder="Email Address"
                            placeholderTextColor={AUTH_COLORS.placeholder}
                            value={email}
                            onChangeText={setEmail}
                            onFocus={() => setEmailFocused(true)}
                            onBlur={() => setEmailFocused(false)}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            autoCorrect={false}
                            returnKeyType="next"
                        />
                    </View>

                    {/* Password Input */}
                    <View style={[
                        authStyles.inputWrapper,
                        passwordFocused && authStyles.inputWrapperFocused
                    ]}>
                        <PasswordIcon width={20} height={20} />
                        <TextInput
                            style={authStyles.input}
                            placeholder="Password"
                            placeholderTextColor={AUTH_COLORS.placeholder}
                            value={password}
                            onChangeText={setPassword}
                            onFocus={() => setPasswordFocused(true)}
                            onBlur={() => setPasswordFocused(false)}
                            secureTextEntry={!showPassword}
                            returnKeyType="next"
                        />
                        <TouchableOpacity
                            onPress={() => setShowPassword(!showPassword)}
                            activeOpacity={0.7}
                        >
                            <EyeIcon width={20} height={20} />
                        </TouchableOpacity>
                    </View>

                    {/* Confirm Password Input */}
                    <View style={[
                        authStyles.inputWrapper,
                        confirmPasswordFocused && authStyles.inputWrapperFocused
                    ]}>
                        <PasswordIcon width={20} height={20} />
                        <TextInput
                            style={authStyles.input}
                            placeholder="Confirm Password"
                            placeholderTextColor={AUTH_COLORS.placeholder}
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                            onFocus={() => setConfirmPasswordFocused(true)}
                            onBlur={() => setConfirmPasswordFocused(false)}
                            secureTextEntry={!showConfirmPassword}
                            returnKeyType="done"
                            onSubmitEditing={handleSignUp}
                        />
                        <TouchableOpacity
                            onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                            activeOpacity={0.7}
                        >
                            <EyeIcon width={20} height={20} />
                        </TouchableOpacity>
                    </View>

                    {/* Terms and Conditions Checkbox */}
                    <TouchableOpacity
                        style={authStyles.checkboxContainer}
                        onPress={() => setAgreeToTerms(!agreeToTerms)}
                        activeOpacity={0.7}
                    >
                        <View style={[
                            authStyles.checkbox,
                            agreeToTerms && authStyles.checkboxChecked,
                            { borderColor: colors.authBorder }
                        ]}>
                            {agreeToTerms && (
                                <Ionicons name="checkmark" size={14} color={AUTH_COLORS.white} />
                            )}
                        </View>
                        <Text style={[authStyles.termsText, { color: colors.text }]}>
                            I agree to the <Text style={authStyles.termsLink}>Terms of Service</Text> and <Text style={authStyles.termsLink}>Privacy Policy</Text>
                        </Text>
                    </TouchableOpacity>

                    {/* Sign Up Button */}
                    <TouchableOpacity
                        style={authStyles.primaryBtn}
                        onPress={handleSignUp}
                        activeOpacity={0.8}
                    >
                        <Text style={authStyles.primaryBtnText}>Sign Up</Text>
                    </TouchableOpacity>

                    {/* Divider */}
                    <View style={authStyles.dividerRow}>
                        <View style={[authStyles.dividerLine, { backgroundColor: colors.authDivider }]} />
                        <Text style={[authStyles.dividerText, { color: colors.textSub }]}>or continue with</Text>
                        <View style={[authStyles.dividerLine, { backgroundColor: colors.authDivider }]} />
                    </View>

                    {/* Continue with Google Button */}
                    <TouchableOpacity
                        style={authStyles.socialBtn}
                        onPress={handleGoogleSignUp}
                        activeOpacity={0.7}
                    >
                        <GoogleIcon width={20} height={20} />
                        <Text style={authStyles.socialBtnText}>Continue with Google</Text>
                    </TouchableOpacity>

                    {/* Continue with Apple Button */}
                    <TouchableOpacity
                        style={authStyles.socialBtn}
                        onPress={handleAppleSignUp}
                        activeOpacity={0.7}
                    >
                        <AppleIcon width={20} height={20} />
                        <Text style={authStyles.socialBtnText}>Continue with Apple</Text>
                    </TouchableOpacity>

                    {/* Login Link */}
                    <View style={authStyles.bottomRow}>
                        <Text style={[authStyles.bottomText, { color: colors.text }]}>Already have an account?</Text>
                        <TouchableOpacity
                            onPress={() => router.push('/auth/login')}
                            activeOpacity={0.7}
                        >
                            <Text style={authStyles.bottomLink}>Log In</Text>
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