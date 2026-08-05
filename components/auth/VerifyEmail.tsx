import React, {
    useState,
    useEffect,
    useRef,
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
} from 'react-native';

import {
    router,
    useLocalSearchParams,
} from 'expo-router';

import {
    Ionicons,
} from '@expo/vector-icons';

import axios from 'axios';

import {
    authStyles,
    AUTH_COLORS,
} from '@/assets/styles/auth/authStyles';
import { useTheme } from '@/constants/ThemeContext'
import StatusModal from '@/components/common/StatusModal';

export default function VerifyEmail() {
    const { colors } = useTheme()

    /*
    |--------------------------------------------------------------------------
    | ROUTE PARAMS
    |--------------------------------------------------------------------------
    */

    const {
        email,
        type,
    } = useLocalSearchParams();

    /*
    |--------------------------------------------------------------------------
    | STATES
    |--------------------------------------------------------------------------
    */

    const [otp, setOtp] =
        useState([
            '',
            '',
            '',
            '',
            '',
            '',
        ]);

    const [timeLeft,
        setTimeLeft] =
        useState(30);

    const [canResend,
        setCanResend] =
        useState(false);

    const [isLoading,
        setIsLoading] =
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
    | INPUT REFS
    |--------------------------------------------------------------------------
    */

    const inputRefs =
        useRef<
            (TextInput | null)[]
        >([]);

    /*
    |--------------------------------------------------------------------------
    | TIMER
    |--------------------------------------------------------------------------
    */

    useEffect(() => {

        if (
            timeLeft > 0 &&
            !canResend
        ) {

            const timer =
                setTimeout(() => {

                    setTimeLeft(
                        timeLeft - 1
                    );

                }, 1000);

            return () =>
                clearTimeout(timer);

        }

        else if (
            timeLeft === 0 &&
            !canResend
        ) {

            setCanResend(true);

        }

    }, [
        timeLeft,
        canResend,
    ]);

    /*
    |--------------------------------------------------------------------------
    | OTP CHANGE
    |--------------------------------------------------------------------------
    */

    const handleOtpChange =
        (
            text: string,
            index: number
        ) => {

            if (
                text.length > 1
            ) return;

            const newOtp =
                [...otp];

            newOtp[index] =
                text;

            setOtp(newOtp);

            /*
            |--------------------------------------------------------------------------
            | AUTO NEXT INPUT
            |--------------------------------------------------------------------------
            */

            if (
                text &&
                index < 5
            ) {

                inputRefs.current[
                    index + 1
                ]?.focus();

            }

        };

    /*
    |--------------------------------------------------------------------------
    | BACKSPACE
    |--------------------------------------------------------------------------
    */

    const handleKeyPress =
        (
            e: any,
            index: number
        ) => {

            if (

                e.nativeEvent.key
                === 'Backspace'

                &&

                !otp[index]

                &&

                index > 0

            ) {

                inputRefs.current[
                    index - 1
                ]?.focus();

            }

        };

    /*
    |--------------------------------------------------------------------------
    | VERIFY EMAIL / OTP
    |--------------------------------------------------------------------------
    */

    const handleVerifyEmail =
        async () => {

            const otpCode =
                otp.join('');

            /*
            |--------------------------------------------------------------------------
            | VALIDATION
            |--------------------------------------------------------------------------
            */

            if (
                otpCode.length !== 6
            ) {

                // Alert.alert(
                //     'Error',
                //     'Please enter the 6-digit OTP'
                // );
                setStatusModal({ visible: true, type: 'error', title: 'Verification Failed', message: 'Please enter the 6-digit OTP' });

                return;

            }

            if (!email) {

                // Alert.alert(
                //     'Error',
                //     'Email not found'
                // );
                setStatusModal({ visible: true, type: 'error', title: 'Verification Failed', message: 'Email not found' });
                return;

            }

            try {

                setIsLoading(true);

                /*
                |--------------------------------------------------------------------------
                | API URL
                |--------------------------------------------------------------------------
                */

                const url =

                    type ===
                        'reset-password'

                        ?

                        `${process.env.EXPO_PUBLIC_API_URL}/auth/verify-reset-otp`

                        :

                        `${process.env.EXPO_PUBLIC_API_URL}/otp/verify`;

                /*
                |--------------------------------------------------------------------------
                | API CALL
                |--------------------------------------------------------------------------
                */

                const res =
                    await axios.post(

                        url,

                        {
                            email,
                            otp: otpCode,
                        }

                    );

                const success =
                    res?.data?.success;

                const valid =
                    res?.data?.data?.valid
                    ??
                    true;

                const message =
                    res?.data?.message
                    ||
                    res?.data?.data?.message
                    ||
                    'Verification failed';

                /*
                |--------------------------------------------------------------------------
                | SUCCESS
                |--------------------------------------------------------------------------
                */

                if (
                    success &&
                    valid
                ) {

                    /*
                    |--------------------------------------------------------------------------
                    | RESET PASSWORD FLOW
                    |--------------------------------------------------------------------------
                    */

                    if (
                        type ===
                        'reset-password'
                    ) {

                        // router.push({

                        //     pathname: '/auth/resetpassword',
                        //     params: { email,},

                        // });
                        setPendingRedirect({
                            pathname: '/auth/resetpassword',
                            params: { email: String(email) },
                        });

                        setStatusModal({ visible: true, type: 'success', message: 'Email verified successfully' });

                        return;

                    }

                    /*
                    |--------------------------------------------------------------------------
                    | SIGNUP FLOW
                    |--------------------------------------------------------------------------
                    */

                    // router.push('/auth/success');
                    setPendingRedirect({ pathname: '/auth/success', params: {} });

                    setStatusModal({ visible: true, type: 'success', message: 'Email verified successfully' });

                }

                else {

                    // Alert.alert(
                    //     'Error',
                    //     message
                    // );
                    setStatusModal({ visible: true, type: 'error', title: 'Verification Failed', message });

                }

            } catch (err: any) {

                console.log(
                    'OTP VERIFY ERROR:',
                    err?.response?.data
                );

                // Alert.alert(

                //     'Error',

                //     err?.response?.data?.message
                //     ||
                //     err?.message
                //     ||
                //     'Verification failed'

                // );
                setStatusModal({
                    visible: true,
                    type: 'error',
                    title: 'Verification Failed',
                    message:
                        err?.response?.data?.message
                        ||
                        err?.message
                        ||
                        'Verification failed'
                });

            } finally {

                setIsLoading(false);

            }

        };

    /*
    |--------------------------------------------------------------------------
    | RESEND CODE
    |--------------------------------------------------------------------------
    */

    const handleResendCode =
        async () => {

            if (!canResend)
                return;

            try {

                const url =

                    type ===
                        'reset-password'

                        ?

                        `${process.env.EXPO_PUBLIC_API_URL}/auth/forgot-password`

                        :

                        `${process.env.EXPO_PUBLIC_API_URL}/otp/send`;

                await axios.post(

                    url,

                    {
                        email,
                    }

                );

                // Alert.alert(
                //     'Success',
                //     'OTP resent successfully'
                // );
                setStatusModal({ visible: true, type: 'success', message: 'OTP resent successfully' });

                setTimeLeft(30);

                setCanResend(false);

                setOtp([
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                ]);

                inputRefs.current[0]
                    ?.focus();

            } catch (error: any) {

                // Alert.alert(

                //     'Error',

                //     error?.response?.data?.message
                //     ||
                //     'Failed to resend OTP'

                // );
                setStatusModal({
                    visible: true,
                    type: 'error',
                    title: 'Resend Failed',
                    message: error?.response?.data?.message || 'Failed to resend OTP',
                });

            }

        };

    /*
    |--------------------------------------------------------------------------
    | CHANGE EMAIL
    |--------------------------------------------------------------------------
    */

    const handleChangeEmail =
        () => {

            router.back();

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
                showsVerticalScrollIndicator={
                    false
                }
                keyboardShouldPersistTaps="handled"
            >

                <View style={authStyles.inner}>

                    {/* BACK BUTTON */}

                    <TouchableOpacity
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

                    </TouchableOpacity>

                    {/* IMAGE */}

                    <Image
                        source={require(
                            '@/assets/images/Pranayama_Images/VerifyEmail.png'
                        )}
                        style={
                            authStyles.heroImage
                        }
                        resizeMode="contain"
                    />

                    {/* TITLE */}

                    <Text style={[authStyles.title, { color: colors.primary }]}>
                        Verify Your Email
                    </Text>

                    {/* SUBTITLE */}

                    <Text
                        style={[authStyles.subtitle, { color: colors.text }]}
                    >

                        We&apos;ve sent a
                        6-digit verification
                        code to your email

                    </Text>

                    {/* EMAIL */}

                    <Text
                        style={
                            authStyles.emailText
                        }
                    >

                        {email}

                    </Text>

                    {/* LABEL */}

                    <Text
                        style={[authStyles.otpLabel, { color: colors.text }]}
                    >

                        Enter 6-digit code

                    </Text>

                    {/* OTP INPUTS */}

                    <View
                        style={
                            authStyles.otpContainer
                        }
                    >

                        {otp.map(

                            (
                                digit,
                                index
                            ) => (

                                <TextInput

                                    key={index}

                                    ref={(ref) => {

                                        inputRefs.current[
                                            index
                                        ] = ref;

                                    }}

                                    style={
                                        authStyles.otpInput
                                    }

                                    value={digit}

                                    onChangeText={(text) =>
                                        handleOtpChange(
                                            text,
                                            index
                                        )
                                    }

                                    onKeyPress={(e) =>
                                        handleKeyPress(
                                            e,
                                            index
                                        )
                                    }

                                    keyboardType="number-pad"

                                    maxLength={1}

                                    textAlign="center"
                                />

                            )

                        )}

                    </View>

                    {/* RESEND */}

                    <View
                        style={
                            authStyles.resendContainer
                        }
                    >

                        <Text
                            style={[authStyles.resendText, { color: colors.text }]}
                        >

                            Didn&apos;t receive the code?

                        </Text>

                        <TouchableOpacity
                            onPress={
                                handleResendCode
                            }
                            disabled={!canResend}
                            activeOpacity={0.7}
                        >

                            <Text
                                style={[

                                    authStyles.resendLink,

                                    !canResend &&

                                    authStyles
                                        .resendLinkDisabled,

                                ]}
                            >

                                Resend Code {

                                    !canResend &&

                                    `(${timeLeft
                                        .toString()
                                        .padStart(2, '0')}s)`

                                }

                            </Text>

                        </TouchableOpacity>

                    </View>

                    {/* VERIFY BUTTON */}

                    <TouchableOpacity
                        style={
                            authStyles.primaryBtn
                        }

                        onPress={
                            handleVerifyEmail
                        }

                        activeOpacity={0.8}

                        disabled={isLoading}
                    >

                        <Text
                            style={
                                authStyles.primaryBtnText
                            }
                        >

                            {

                                isLoading

                                    ?

                                    'Verifying...'

                                    :

                                    'Verify Email'

                            }

                        </Text>

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

                    {/* CHANGE EMAIL */}

                    <TouchableOpacity
                        style={
                            authStyles.socialBtn
                        }

                        onPress={
                            handleChangeEmail
                        }

                        activeOpacity={0.7}
                    >

                        <Ionicons
                            name="mail-outline"
                            size={20}
                            color={
                                AUTH_COLORS.text
                            }
                        />

                        <Text
                            style={
                                authStyles.socialBtnText
                            }
                        >

                            Change Email Address

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
