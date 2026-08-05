import React, {
    useState,
} from 'react';

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

import axios from 'axios';

import { router } from 'expo-router';

import { Ionicons }
    from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import {
    authStyles,
    AUTH_COLORS,
} from '@/assets/styles/auth/authStyles';
import { useTheme } from '@/constants/ThemeContext';
import StatusModal from '@/components/common/StatusModal';

/*                                                                         |
| -------------------------------------------------------------------------- |
| SVG ICONS                                                                  |
| -------------------------------------------------------------------------- |
| */

import EmailIcon
    from '@/assets/icons/Email.svg';

import PhoneIcon
    from '@/assets/icons/Phone.svg';

export default function ForgotPassword() {
    const { colors } = useTheme()
    const insets = useSafeAreaInsets();
    const [headerHeight, setHeaderHeight] = useState(0);

    /*
    |--------------------------------------------------------------------------
    | STATES
    |--------------------------------------------------------------------------
    */

    const [email, setEmail] =
        useState('');

    const [phoneNumber,
        setPhoneNumber] =
        useState('');

    const [loading, setLoading] =
        useState(false);

    const [resetMethod,
        setResetMethod] =
        useState<'email' | 'phone'>(
            'email'
        );

    const [emailFocused,
        setEmailFocused] =
        useState(false);

    const [phoneFocused,
        setPhoneFocused] =
        useState(false);

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
    | SEND RESET LINK
    |--------------------------------------------------------------------------
    */

    const handleSendResetLink =
        async () => {

            try {

                /*
                |--------------------------------------------------------------------------
                | VALIDATION
                |--------------------------------------------------------------------------
                */

                if (
                    resetMethod === 'email'
                    && !email
                ) {

                    // Alert.alert(
                    //     'Error',
                    //     'Please enter your email'
                    // );
                    setStatusModal({ visible: true, type: 'error', title: 'Reset Failed', message: 'Please enter your email' });

                    return;

                }

                /*
                |--------------------------------------------------------------------------
                | START LOADING
                |--------------------------------------------------------------------------
                */

                setLoading(true);

                /*
                |--------------------------------------------------------------------------
                | API CALL
                |--------------------------------------------------------------------------
                */

                const response =
                    await axios.post(

                        `${process.env.EXPO_PUBLIC_API_URL}/auth/forgot-password`,

                        {
                            email,
                        }

                    );

                /*
       |--------------------------------------------------------------------------
       | SUCCESS
       |--------------------------------------------------------------------------
       */

                // Alert.alert(

                //     'Success',

                //     response.data?.message ||

                //     'OTP sent to your email',

                //     [
                //         {
                //             text: 'OK',

                //             onPress: () => {

                //                 router.push({
                //                     pathname:
                //                         '/auth/verifyemail',
                //                     params: {
                //                         email,
                //                         type: 'reset-password',
                //                     },
                //                 });
                //             },
                //         },
                //     ]
                // );
                setPendingRedirect({
                    pathname: '/auth/verifyemail',
                    params: { email, type: 'reset-password' },
                });

                setStatusModal({
                    visible: true,
                    type: 'success',
                    message: response.data?.message || 'OTP sent to your email',
                });


            } catch (error: any) {

                console.log(
                    'FORGOT PASSWORD ERROR:',
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

                /*
                |--------------------------------------------------------------------------
                | STOP LOADING
                |--------------------------------------------------------------------------
                */

                setLoading(false);

            }

        };

    /*
    |--------------------------------------------------------------------------
    | RESET METHODS
    |--------------------------------------------------------------------------
    */

    const handleResetViaPhone =
        () => {

            setResetMethod('phone');

        };

    const handleResetViaEmail =
        () => {

            setResetMethod('email');

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
                    <Ionicons
                        name="arrow-back"
                        size={22}
                        color={colors.text}
                    />
                </TouchableOpacity>
            </View>


            <ScrollView
                // contentContainerStyle={
                //     authStyles.scrollContent
                // }
                contentContainerStyle={[
                    authStyles.scrollContent,
                    { paddingTop: headerHeight },
                ]}

                showsVerticalScrollIndicator={
                    false
                }
                keyboardShouldPersistTaps="handled"
            >

                <View style={authStyles.inner}>

                    {/* BACK BUTTON */}

                    {/* <TouchableOpacity
                    onPress={() =>
                        router.back()
                    }
                    style={authStyles.backBtn}
                    activeOpacity={0.7}
                >

                    <Ionicons
                        name="arrow-back"
                        size={24}
                       color={colors.text}
                    />

                </TouchableOpacity> */}

                    {/* IMAGE */}

                    <Image
                        source={require(
                            '@/assets/images/Pranayama_Images/ForgotPassword.png'
                        )}
                        style={
                            authStyles.heroImage
                        }
                        resizeMode="contain"
                    />

                    {/* TITLE */}

                    <Text style={[authStyles.title, { color: colors.primary }]}>
                        Forgot Password?
                    </Text>

                    {/* SUBTITLE */}

                    <Text
                        style={[authStyles.subtitle, { color: colors.text }]}
                    >

                        Don&apos;t worry, it happens.
                        Enter your email and
                        we&apos;ll send you a link
                        to reset your password.

                    </Text>

                    {/* EMAIL INPUT */}

                    {resetMethod ===
                        'email' && (

                            <View
                                style={[
                                    authStyles.inputWrapper,

                                    emailFocused &&
                                    authStyles
                                        .inputWrapperFocused,
                                ]}
                            >

                                <EmailIcon
                                    width={20}
                                    height={20}
                                />

                                <TextInput
                                    style={
                                        authStyles.input
                                    }

                                    placeholder="Email Address"

                                    placeholderTextColor={
                                        AUTH_COLORS.placeholder
                                    }

                                    value={email}

                                    onChangeText={
                                        setEmail
                                    }

                                    onFocus={() =>
                                        setEmailFocused(
                                            true
                                        )
                                    }

                                    onBlur={() =>
                                        setEmailFocused(
                                            false
                                        )
                                    }

                                    keyboardType="email-address"

                                    autoCapitalize="none"

                                    autoCorrect={false}

                                    returnKeyType="done"

                                    editable={!loading}

                                    onSubmitEditing={
                                        handleSendResetLink
                                    }
                                />

                            </View>

                        )}

                    {/* PHONE INPUT */}

                    {resetMethod ===
                        'phone' && (

                            <View
                                style={[
                                    authStyles.inputWrapper,

                                    phoneFocused &&
                                    authStyles
                                        .inputWrapperFocused,
                                ]}
                            >

                                <PhoneIcon
                                    width={20}
                                    height={20}
                                />

                                <TextInput
                                    style={
                                        authStyles.input
                                    }

                                    placeholder="Phone Number"

                                    placeholderTextColor={
                                        AUTH_COLORS.placeholder
                                    }

                                    value={
                                        phoneNumber
                                    }

                                    onChangeText={
                                        setPhoneNumber
                                    }

                                    onFocus={() =>
                                        setPhoneFocused(
                                            true
                                        )
                                    }

                                    onBlur={() =>
                                        setPhoneFocused(
                                            false
                                        )
                                    }

                                    keyboardType="phone-pad"

                                    editable={!loading}

                                    returnKeyType="done"

                                    onSubmitEditing={
                                        handleSendResetLink
                                    }
                                />

                            </View>

                        )}

                    {/* BUTTON */}

                    <TouchableOpacity
                        style={
                            authStyles.primaryBtn
                        }

                        onPress={
                            handleSendResetLink
                        }

                        activeOpacity={0.8}

                        disabled={loading}
                    >

                        {loading ? (

                            <ActivityIndicator
                                color="#FFFFFF"
                            />

                        ) : (

                            <Text
                                style={
                                    authStyles.primaryBtnText
                                }
                            >

                                Send Reset Link

                            </Text>

                        )}

                    </TouchableOpacity>

                    {/* DIVIDER */}

                    <View
                        style={
                            authStyles.dividerRow
                        }
                    >

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

                    {/* PHONE RESET */}

                    <TouchableOpacity
                        style={[

                            authStyles.socialBtn,

                            resetMethod ===
                            'phone' &&

                            authStyles
                                .activeMethodBtn,

                        ]}

                        onPress={
                            handleResetViaPhone
                        }

                        activeOpacity={0.7}
                    >

                        <PhoneIcon
                            width={20}
                            height={20}
                        />

                        <Text
                            style={
                                authStyles.socialBtnText
                            }
                        >

                            Reset via Phone Number

                        </Text>

                    </TouchableOpacity>

                    {/* LOGIN */}

                    <View
                        style={
                            authStyles.bottomRow
                        }
                    >

                        <Text
                            style={[authStyles.bottomText, { color: colors.text }]}
                        >

                            Remember your password?

                        </Text>

                        <TouchableOpacity
                            onPress={() =>
                                router.push(
                                    '/auth/login'
                                )
                            }

                            activeOpacity={0.7}
                        >

                            <Text
                                style={
                                    authStyles.bottomLink
                                }
                            >

                                Log In

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
