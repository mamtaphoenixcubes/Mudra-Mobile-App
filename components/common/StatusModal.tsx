import React from 'react';
import {
    Modal,
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
} from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';

const { width } = Dimensions.get('window');
const moderateScale = (size: number, factor = 0.5) => {
    const s = (width / 375) * size;
    return size + (s - size) * factor;
};

type StatusType = 'success' | 'error';

interface StatusModalProps {
    visible: boolean;
    type: StatusType;
    title?: string;
    message: string; // dynamic — usually straight from an API response
    onClose: () => void;
    buttonText?: string;
}

const SuccessIcon = () => (
    <Svg width={moderateScale(56)} height={moderateScale(56)} viewBox="0 0 24 24" fill="none">
        <Circle cx="12" cy="12" r="10" fill="#22C55E20" />
        <Path
            d="M8 12.5l2.5 2.5L16 9"
            stroke="#22C55E"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </Svg>
);

const ErrorIcon = () => (
    <Svg width={moderateScale(56)} height={moderateScale(56)} viewBox="0 0 24 24" fill="none">
        <Circle cx="12" cy="12" r="10" fill="#FF3B3020" />
        <Path
            d="M15 9l-6 6M9 9l6 6"
            stroke="#FF3B30"
            strokeWidth="2.2"
            strokeLinecap="round"
        />
    </Svg>
);

const DEFAULT_TITLES: Record<StatusType, string> = {
    success: 'Success',
    error: 'Something went wrong',
};

export default function StatusModal({
    visible,
    type,
    title,
    message,
    onClose,
    buttonText,
}: StatusModalProps) {
    const isSuccess = type === 'success';
    const confirmColor = isSuccess ? '#22C55E' : '#9A85FE';

    return (
        <Modal
            transparent
            visible={visible}
            animationType="fade"
            statusBarTranslucent
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <View style={styles.card}>
                    {isSuccess ? <SuccessIcon /> : <ErrorIcon />}

                    <Text style={styles.title}>{title ?? DEFAULT_TITLES[type]}</Text>

                    <Text style={styles.body}>{message}</Text>

                    <TouchableOpacity
                        style={[styles.confirmBtn, { backgroundColor: confirmColor }]}
                        onPress={onClose}
                        activeOpacity={0.85}
                    >
                        <Text style={styles.confirmBtnText}>
                            {buttonText ?? (isSuccess ? 'Continue' : 'Try Again')}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.45)',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: moderateScale(28),
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: moderateScale(20),
        paddingVertical: moderateScale(28),
        paddingHorizontal: moderateScale(24),
        alignItems: 'center',
        width: '80%',
        gap: moderateScale(10),
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.12,
        shadowRadius: 24,
        elevation: 10,
    },
    title: {
        fontFamily: 'SF-Pro-Display',
        fontWeight: '600',
        fontSize: moderateScale(18),
        color: '#0F0F0F',
        textAlign: 'center',
        marginTop: moderateScale(6),
    },
    body: {
        fontFamily: 'SF-Pro-Display',
        fontWeight: '400',
        fontSize: moderateScale(13),
        color: '#0F0F0F',
        textAlign: 'center',
        lineHeight: moderateScale(20),
        paddingHorizontal: moderateScale(4),
        marginBottom: moderateScale(4),
    },
    confirmBtn: {
        width: '100%',
        borderRadius: moderateScale(12),
        paddingVertical: moderateScale(15),
        alignItems: 'center',
        justifyContent: 'center',
    },
    confirmBtnText: {
        fontFamily: 'SF-Pro-Display',
        fontWeight: '500',
        fontSize: moderateScale(15),
        color: '#FFFFFF',
    },
});