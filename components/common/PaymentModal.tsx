import React from 'react';
import {
    Modal,
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    KeyboardAvoidingView,
    Platform,
    ActivityIndicator,
    Alert,
    Image
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/constants/ThemeContext';
import { usePaymentStore } from '@/store/paymentStore';
import { useAuthStore } from '@/store/authStore';
import ConfirmModal from '@/components/common/ConfirmModal';


const { width: SCREEN_WIDTH } = Dimensions.get('window');
const moderateScale = (size: number, factor = 0.5) =>
    size + ((SCREEN_WIDTH - 375) / 375) * size * factor;

interface PaymentModalProps {
    visible: boolean;
    planName: string;
    planPrice: string;
    planBilling: string;
    planDocumentId: string;
    billingType: string; 
    onClose: () => void;
    onSuccess: () => void;
}


export default function PaymentModal({
    visible,
    planName,
    planPrice,
    planBilling,
    planDocumentId,
    billingType,
    onClose,
    onSuccess,
}: PaymentModalProps) {
    const { colors } = useTheme();
    const { processing, payForPlan, payForSubscription } = usePaymentStore();
    const { user } = useAuthStore();
    const [paymentFailedVisible, setPaymentFailedVisible] = React.useState(false);
    const [paymentFailedMessage, setPaymentFailedMessage] = React.useState<string | null>(null);

    const handlePay = async () => {
        // Free plan — no Razorpay checkout needed.
        if (planPrice === '₹0') {
            onSuccess();
            return;
        }

        const profileDocumentId = user?.id;

        if (!profileDocumentId) {
            Alert.alert('Login Required', 'Please log in to continue.');
            return;
        }

        const payFn = billingType === 'MONTHLY' ? payForSubscription : payForPlan;

        const success = await payFn({
            profileDocumentId,
            subscriptionPlanDocumentId: planDocumentId,
            userName: user?.fullName ?? 'User',
            userEmail: user?.email ?? '',
            userPhone: user?.phone ?? '',
        });

        if (success) {
            onSuccess();
        } else {
            setPaymentFailedMessage(usePaymentStore.getState().error ?? null);
            setPaymentFailedVisible(true);
        }
    };

    return (
        <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            >
                <View style={styles.backdrop}>
                    <View style={[styles.card, { backgroundColor: colors.card }]}>
                        <TouchableOpacity
                            style={[styles.closeBtn, { backgroundColor: colors.surfaceAlt }]}
                            onPress={onClose}
                            hitSlop={8}
                        >
                            <Ionicons name="close" size={16} color={colors.text} />
                        </TouchableOpacity>

                        <View style={[styles.iconCircle, { backgroundColor: colors.primaryMuted }]}>
                            <Image
                                source={require('@/assets/images/tabIcons/lotus.png')}
                                style={{ width: 50, height: 50}}
                                resizeMode="contain"
                            />
                        </View>

                        <Text style={[styles.title, { color: colors.text }]}>Confirm subscription</Text>
                        <Text style={[styles.subtitle, { color: colors.textSub }]}>
                            You'll be redirected to Razorpay's secure checkout
                        </Text>

                        <View style={[styles.planRecap, { backgroundColor: colors.primaryMuted }]}>
                            <View>
                                <Text style={[styles.planName, { color: colors.text }]}>{planName}</Text>
                                <Text style={[styles.planBilling, { color: colors.textSub }]}>{planBilling}</Text>
                            </View>
                            <Text style={[styles.planPrice, { color: colors.primary }]}>{planPrice}</Text>
                        </View>

                        <View style={[styles.infoRow, { borderColor: colors.border }]}>
                            <Ionicons name="card-outline" size={18} color={colors.textSub} />
                            <Text style={[styles.infoText, { color: colors.text }]}>
                                Cards, UPI, netbanking and wallets
                            </Text>
                        </View>

                        <View style={[styles.infoRow, styles.infoRowLast, { borderColor: colors.border }]}>
                            <Ionicons name="refresh-circle-outline" size={18} color={colors.success ?? '#22C55E'} />
                            <Text style={[styles.infoText, { color: colors.text }]}>
                                Full refund available within 7 days
                            </Text>
                        </View>

                        <TouchableOpacity
                            style={[styles.payBtn, { backgroundColor: colors.primary }]}
                            onPress={handlePay}
                            activeOpacity={0.85}
                            disabled={processing}
                        >
                            {processing ? (
                                <ActivityIndicator size="small" color="#FFFFFF" />
                            ) : (
                                <Text style={styles.payBtnText}>
                                    {planPrice === '₹0' ? 'Get Started' : `Pay ${planPrice} with Razorpay`}
                                </Text>
                            )}
                        </TouchableOpacity>

                        <View style={styles.trustRow}>
                            <View style={styles.trustItem}>
                                <Ionicons name="lock-closed-outline" size={12} color={colors.textSub as string} />
                                <Text style={[styles.trustText, { color: colors.textSub }]}>PCI DSS secure</Text>
                            </View>
                            <View style={styles.trustItem}>
                                <Ionicons name="close-circle-outline" size={12} color={colors.textSub as string} />
                                <Text style={[styles.trustText, { color: colors.textSub }]}>Cancel anytime</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </KeyboardAvoidingView>
            <ConfirmModal
                visible={paymentFailedVisible}
                type="paymentFailed"
                bodyOverride={paymentFailedMessage ?? undefined}
                onConfirm={() => {
                    setPaymentFailedVisible(false);
                    handlePay();
                }}
                onCancel={() => setPaymentFailedVisible(false)}
            />
        </Modal>
    );
}

const styles = StyleSheet.create({
    backdrop: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: moderateScale(24),
    },
    card: {
        width: '100%',
        maxWidth: moderateScale(340),
        borderRadius: moderateScale(20),
        padding: moderateScale(20),
        position: 'relative',
    },
    closeBtn: {
        position: 'absolute',
        top: moderateScale(14),
        right: moderateScale(14),
        width: moderateScale(28),
        height: moderateScale(28),
        borderRadius: moderateScale(14),
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2,
    },
    iconCircle: {
        width: moderateScale(52),
        height: moderateScale(52),
        borderRadius: moderateScale(26),
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginBottom: moderateScale(14),
    },
    title: {
        fontFamily: 'SF-Pro-Display',
        fontWeight: '600',
        fontSize: moderateScale(18),
        textAlign: 'center',
        marginBottom: moderateScale(4),
    },
    subtitle: {
        fontFamily: 'SF-Pro-Display',
        fontWeight: '400',
        fontSize: moderateScale(13),
        textAlign: 'center',
        marginBottom: moderateScale(18),
        paddingHorizontal: moderateScale(8),
    },
    planRecap: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: moderateScale(12),
        padding: moderateScale(14),
        marginBottom: moderateScale(16),
    },
    planName: {
        fontFamily: 'SF-Pro-Display',
        fontWeight: '600',
        fontSize: moderateScale(14),
    },
    planBilling: {
        fontFamily: 'SF-Pro-Display',
        fontWeight: '400',
        fontSize: moderateScale(11),
        marginTop: 2,
    },
    planPrice: {
        fontFamily: 'SF-Pro-Display',
        fontWeight: '700',
        fontSize: moderateScale(18),
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: moderateScale(10),
        borderWidth: 1,
        borderRadius: moderateScale(12),
        paddingHorizontal: moderateScale(14),
        paddingVertical: moderateScale(12),
        marginBottom: moderateScale(10),
    },
    infoRowLast: {
        marginBottom: moderateScale(20),
    },
    infoText: {
        fontFamily: 'SF-Pro-Display',
        fontWeight: '400',
        fontSize: moderateScale(13),
        flex: 1,
    },
    payBtn: {
        borderRadius: moderateScale(12),
        paddingVertical: moderateScale(14),
        alignItems: 'center',
        marginBottom: moderateScale(14),
    },
    payBtnText: {
        fontFamily: 'SF-Pro-Display',
        fontWeight: '600',
        fontSize: moderateScale(15),
        color: '#FFFFFF',
    },
    trustRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: moderateScale(16),
    },
    trustItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: moderateScale(5),
    },
    trustText: {
        fontFamily: 'SF-Pro-Display',
        fontSize: moderateScale(11),
    },
});