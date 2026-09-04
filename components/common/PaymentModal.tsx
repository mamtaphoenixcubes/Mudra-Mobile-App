// import React, { useState } from 'react';
// import {
//     Modal,
//     View,
//     Text,
//     TextInput,
//     TouchableOpacity,
//     StyleSheet,
//     Dimensions,
//     KeyboardAvoidingView,
//     Platform,
// } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import { useTheme } from '@/constants/ThemeContext';

// const { width: SCREEN_WIDTH } = Dimensions.get('window');
// const moderateScale = (size: number, factor = 0.5) =>
//     size + ((SCREEN_WIDTH - 375) / 375) * size * factor;

// interface PaymentModalProps {
//     visible: boolean;
//     planName: string;
//     planPrice: string;
//     planBilling: string;
//     onClose: () => void;
//     onSuccess: () => void;
// }

// // UI ONLY — no payment provider wired up yet. Card number/expiry/CVC are
// // plain TextInputs for now, not connected to any processor. Swap these
// // for a real payment SDK's card-input component later, and wire
// // handlePay to actually charge something.
// export default function PaymentModal({
//     visible,
//     planName,
//     planPrice,
//     planBilling,
//     onClose,
//     onSuccess,
// }: PaymentModalProps) {
//     const { colors } = useTheme();
//     const [cardNumber, setCardNumber] = useState('');
//     const [expiry, setExpiry] = useState('');
//     const [cvc, setCvc] = useState('');

//     const canPay = cardNumber.length > 0 && expiry.length > 0 && cvc.length > 0;

//     const handlePay = () => {
//         if (!canPay) return;
//         // TODO: wire to a real payment provider later.
//         onSuccess();
//     };

//     return (
//         <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
//             <KeyboardAvoidingView
//                 style={{ flex: 1 }}
//                 behavior={Platform.OS === 'ios' ? 'padding' : undefined}
//             >
//                 <View style={styles.backdrop}>
//                     <View style={[styles.card, { backgroundColor: colors.card }]}>
//                         <TouchableOpacity
//                             style={[styles.closeBtn, { backgroundColor: colors.surfaceAlt }]}
//                             onPress={onClose}
//                             hitSlop={8}
//                         >
//                             <Ionicons name="close" size={16} color={colors.text} />
//                         </TouchableOpacity>

//                         <View style={[styles.iconCircle, { backgroundColor: colors.primaryMuted }]}>
//                             <Ionicons name="ribbon-outline" size={24} color={colors.primary} />
//                         </View>

//                         <Text style={[styles.title, { color: colors.text }]}>Confirm subscription</Text>
//                         <Text style={[styles.subtitle, { color: colors.textSub }]}>
//                             Enter your payment details.
//                         </Text>

//                         <View style={[styles.planRecap, { backgroundColor: colors.primaryMuted }]}>
//                             <View>
//                                 <Text style={[styles.planName, { color: colors.text }]}>{planName}</Text>
//                                 <Text style={[styles.planBilling, { color: colors.textSub }]}>{planBilling}</Text>
//                             </View>
//                             <Text style={[styles.planPrice, { color: colors.primary }]}>{planPrice}</Text>
//                         </View>

//                         <Text style={[styles.label, { color: colors.textSub }]}>Card number</Text>
//                         <TextInput
//                             style={[styles.input, { backgroundColor: colors.surfaceAlt, color: colors.text, borderColor: colors.border }]}
//                             placeholder="1234 1234 1234 1234"
//                             placeholderTextColor={colors.textMuted}
//                             keyboardType="number-pad"
//                             value={cardNumber}
//                             onChangeText={setCardNumber}
//                         />

//                         <View style={styles.rowInputs}>
//                             <View style={{ flex: 1 }}>
//                                 <Text style={[styles.label, { color: colors.textSub }]}>Expiry</Text>
//                                 <TextInput
//                                     style={[styles.input, { backgroundColor: colors.surfaceAlt, color: colors.text, borderColor: colors.border }]}
//                                     placeholder="MM / YY"
//                                     placeholderTextColor={colors.textMuted}
//                                     keyboardType="number-pad"
//                                     value={expiry}
//                                     onChangeText={setExpiry}
//                                 />
//                             </View>
//                             <View style={{ flex: 1 }}>
//                                 <Text style={[styles.label, { color: colors.textSub }]}>CVC</Text>
//                                 <TextInput
//                                     style={[styles.input, { backgroundColor: colors.surfaceAlt, color: colors.text, borderColor: colors.border }]}
//                                     placeholder="123"
//                                     placeholderTextColor={colors.textMuted}
//                                     keyboardType="number-pad"
//                                     secureTextEntry
//                                     value={cvc}
//                                     onChangeText={setCvc}
//                                 />
//                             </View>
//                         </View>

//                         <TouchableOpacity
//                             style={[
//                                 styles.payBtn,
//                                 { backgroundColor: colors.primary, opacity: canPay ? 1 : 0.5 },
//                             ]}
//                             onPress={handlePay}
//                             disabled={!canPay}
//                             activeOpacity={0.85}
//                         >
//                             <Text style={styles.payBtnText}>Pay {planPrice}</Text>
//                         </TouchableOpacity>

//                         <View style={styles.trustRow}>
//                             <View style={styles.trustItem}>
//                                 <Ionicons name="lock-closed-outline" size={12} color={colors.textSub as string} />
//                                 <Text style={[styles.trustText, { color: colors.textSub }]}>Secure payment</Text>
//                             </View>
//                             <View style={styles.trustItem}>
//                                 <Ionicons name="close-circle-outline" size={12} color={colors.textSub as string} />
//                                 <Text style={[styles.trustText, { color: colors.textSub }]}>Cancel anytime</Text>
//                             </View>
//                         </View>
//                     </View>
//                 </View>
//             </KeyboardAvoidingView>
//         </Modal>
//     );
// }

// const styles = StyleSheet.create({
//     backdrop: {
//         flex: 1,
//         backgroundColor: 'rgba(0,0,0,0.5)',
//         alignItems: 'center',
//         justifyContent: 'center',
//         paddingHorizontal: moderateScale(24),
//     },
//     card: {
//         width: '100%',
//         maxWidth: moderateScale(340),
//         borderRadius: moderateScale(20),
//         padding: moderateScale(20),
//         position: 'relative',
//     },
//     closeBtn: {
//         position: 'absolute',
//         top: moderateScale(14),
//         right: moderateScale(14),
//         width: moderateScale(28),
//         height: moderateScale(28),
//         borderRadius: moderateScale(14),
//         alignItems: 'center',
//         justifyContent: 'center',
//         zIndex: 2,
//     },
//     iconCircle: {
//         width: moderateScale(52),
//         height: moderateScale(52),
//         borderRadius: moderateScale(26),
//         alignItems: 'center',
//         justifyContent: 'center',
//         alignSelf: 'center',
//         marginBottom: moderateScale(14),
//     },
//     title: {
//         fontFamily: 'SF-Pro-Display',
//         fontWeight: '600',
//         fontSize: moderateScale(18),
//         textAlign: 'center',
//         marginBottom: moderateScale(4),
//     },
//     subtitle: {
//         fontFamily: 'SF-Pro-Display',
//         fontWeight: '400',
//         fontSize: moderateScale(13),
//         textAlign: 'center',
//         marginBottom: moderateScale(18),
//     },
//     planRecap: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         borderRadius: moderateScale(12),
//         padding: moderateScale(14),
//         marginBottom: moderateScale(18),
//     },
//     planName: {
//         fontFamily: 'SF-Pro-Display',
//         fontWeight: '600',
//         fontSize: moderateScale(14),
//     },
//     planBilling: {
//         fontFamily: 'SF-Pro-Display',
//         fontWeight: '400',
//         fontSize: moderateScale(11),
//         marginTop: 2,
//     },
//     planPrice: {
//         fontFamily: 'SF-Pro-Display',
//         fontWeight: '700',
//         fontSize: moderateScale(18),
//     },
//     label: {
//         fontFamily: 'SF-Pro-Display',
//         fontWeight: '600',
//         fontSize: moderateScale(12),
//         marginBottom: moderateScale(6),
//     },
//     input: {
//         borderWidth: 1,
//         borderRadius: moderateScale(10),
//         paddingHorizontal: moderateScale(14),
//         paddingVertical: moderateScale(12),
//         fontFamily: 'SF-Pro-Display',
//         fontSize: moderateScale(14),
//         marginBottom: moderateScale(14),
//     },
//     rowInputs: {
//         flexDirection: 'row',
//         gap: moderateScale(10),
//     },
//     payBtn: {
//         borderRadius: moderateScale(12),
//         paddingVertical: moderateScale(14),
//         alignItems: 'center',
//         marginTop: moderateScale(4),
//         marginBottom: moderateScale(14),
//     },
//     payBtnText: {
//         fontFamily: 'SF-Pro-Display',
//         fontWeight: '600',
//         fontSize: moderateScale(15),
//         color: '#FFFFFF',
//     },
//     trustRow: {
//         flexDirection: 'row',
//         justifyContent: 'center',
//         gap: moderateScale(16),
//     },
//     trustItem: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         gap: moderateScale(5),
//     },
//     trustText: {
//         fontFamily: 'SF-Pro-Display',
//         fontSize: moderateScale(11),
//     },
// });
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
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/constants/ThemeContext';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const moderateScale = (size: number, factor = 0.5) =>
    size + ((SCREEN_WIDTH - 375) / 375) * size * factor;

interface PaymentModalProps {
    visible: boolean;
    planName: string;
    planPrice: string;
    planBilling: string;
    onClose: () => void;
    onSuccess: () => void;
}

// UI ONLY — Razorpay checkout is not wired up yet. handlePay currently
// just calls onSuccess directly. Once implemented, this button should
// call RazorpayCheckout.open({...}) from react-native-razorpay, and
// onSuccess should only fire from that call's resolved promise.
export default function PaymentModal({
    visible,
    planName,
    planPrice,
    planBilling,
    onClose,
    onSuccess,
}: PaymentModalProps) {
    const { colors } = useTheme();

    const handlePay = () => {
        // TODO: replace with RazorpayCheckout.open({...}) and call
        // onSuccess() only from its resolved promise.
        onSuccess();
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
                            <Ionicons name="ribbon-outline" size={24} color={colors.primary} />
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
                            <Ionicons name="shield-checkmark-outline" size={18} color={colors.success ?? '#22C55E'} />
                            <Text style={[styles.infoText, { color: colors.text }]}>
                                Only whitelisted domains can charge you
                            </Text>
                        </View>

                        <TouchableOpacity
                            style={[styles.payBtn, { backgroundColor: colors.primary }]}
                            onPress={handlePay}
                            activeOpacity={0.85}
                        >
                            <Text style={styles.payBtnText}>Pay {planPrice} with Razorpay</Text>
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