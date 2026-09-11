import { create } from 'zustand';
import axios from 'axios';
import RazorpayCheckout from 'react-native-razorpay';

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL;

interface RazorpaySubscriptionSuccessResponse {
    razorpay_payment_id: string;
    razorpay_subscription_id: string;
    razorpay_signature: string;
}

interface CreateOrderResponse {
    success: boolean;
    data?: {
        orderId: string;
        amount: number;
        currency: string;
        keyId: string;
        profileDocumentId: string;
        subscriptionPlanDocumentId: string;
        planType: string;
        billingType: string;
        transactionDocumentId: string | null;
    };
    message?: string;
}

interface RazorpaySuccessResponse {
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
}

interface VerifyResponse {
    success: boolean;
    message?: string;
    data?: {
        paymentTransactionDocumentId: string;
        userSubscriptionDocumentId: string;
        razorpayOrderId: string;
        razorpayPaymentId: string;
        paymentStatus: string;
        subscriptionStatus: string;
        planType: string;
        billingType: string;
        amount: number;
        currency: string;
    };
}

type PaymentStore = {
    processing: boolean;
    error: string | null;
    lastResult: VerifyResponse['data'] | null;

    payForPlan: (params: {
        profileDocumentId: string;
        subscriptionPlanDocumentId: string;
        userName?: string;
        userEmail?: string;
        userPhone?: string;
    }) => Promise<boolean>;

    payForSubscription: (params: {
        profileDocumentId: string;
        subscriptionPlanDocumentId: string;
        userName?: string;
        userEmail?: string;
        userPhone?: string;
    }) => Promise<boolean>;

    resetPaymentState: () => void;
};

export const usePaymentStore = create<PaymentStore>((set) => ({
    processing: false,
    error: null,
    lastResult: null,

    payForPlan: async ({
        profileDocumentId,
        subscriptionPlanDocumentId,
        userName = 'User',
        userEmail = '',
        userPhone = '',
    }) => {
        set({ processing: true, error: null });

        try {
            // 1. Create Razorpay order
            const orderResponse = await axios.post(
                `${API_BASE_URL}/payments/create-order`,
                {
                    profileDocumentId,
                    subscriptionPlanDocumentId,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            const orderData: CreateOrderResponse = orderResponse.data;

            if (!orderData.success || !orderData.data?.orderId) {
                throw new Error(
                    orderData.message || 'Failed to create payment order.'
                );
            }

            // 2. Open Razorpay Checkout
            const options = {
                key: orderData.data.keyId,
                amount: orderData.data.amount,
                currency: orderData.data.currency,
                name: 'YogaNidraMudra',
                description: `${orderData.data.planType} Subscription`,
                order_id: orderData.data.orderId,
                prefill: {
                    name: userName,
                    email: userEmail,
                    contact: userPhone,
                },
                theme: {
                    color: '#9A85FE',
                },
            };

            const razorpayResponse = (await RazorpayCheckout.open(
                options
            )) as RazorpaySuccessResponse;

            // 3. Verify payment
            const verifyResponse = await axios.post(
                `${API_BASE_URL}/payments/verify`,
                {
                    profileDocumentId,
                    subscriptionPlanDocumentId,
                    razorpayOrderId: razorpayResponse.razorpay_order_id,
                    razorpayPaymentId: razorpayResponse.razorpay_payment_id,
                    razorpaySignature: razorpayResponse.razorpay_signature,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            const verifyData: VerifyResponse = verifyResponse.data;

            if (!verifyData.success) {
                throw new Error(
                    verifyData.message || 'Payment verification failed.'
                );
            }

            set({
                processing: false,
                lastResult: verifyData.data ?? null,
            });

            return true;
        } catch (error: any) {
            console.log('PAYMENT_ERROR', error);
            console.log('PAYMENT_ERROR_RESPONSE', error?.response?.data);
            console.log('PAYMENT_ERROR_STATUS', error?.response?.status);

            const message =
                error?.response?.data?.message ||
                error?.description ||
                error?.message ||
                'Payment failed. Please try again.';

            set({
                processing: false,
                error: message,
            });

            return false;
        }
    },

    payForSubscription: async ({
        profileDocumentId,
        subscriptionPlanDocumentId,
        userName = 'User',
        userEmail = '',
        userPhone = '',
    }) => {
        set({ processing: true, error: null });

        try {
            // 1. Create Razorpay subscription
            const subResponse = await axios.post(
                `${API_BASE_URL}/payments/create-subscription`,
                {
                    profileDocumentId,
                    subscriptionPlanDocumentId,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            console.log(
                '[SUBSCRIPTION] Create subscription response:',
                subResponse.data
            );

            const subData = subResponse.data;

            if (
                !subData.success ||
                !subData.data?.subscriptionId
            ) {
                throw new Error(
                    subData.message ||
                    'Failed to create subscription.'
                );
            }

            // 2. Open Razorpay Checkout
            const options = {
                key: subData.data.keyId,
                subscription_id: subData.data.subscriptionId,

                name: 'YogaNidraMudra',

                description: `${subData.data.planType} Subscription`,

                prefill: {
                    name: userName,
                    email: userEmail,
                    contact: userPhone,
                },

                theme: {
                    color: '#9A85FE',
                },
            };

            console.log(
                '[SUBSCRIPTION] Opening Razorpay Checkout:',
                options
            );

            const razorpayResponse =
                (await RazorpayCheckout.open(
                    options
                )) as RazorpaySubscriptionSuccessResponse;

            console.log(
                '[SUBSCRIPTION] Razorpay success response:',
                razorpayResponse
            );

            // 3. Verify recurring subscription payment
            const verifyResponse = await axios.post(
                `${API_BASE_URL}/payments/verify-subscription`,
                {
                    profileDocumentId,
                    subscriptionPlanDocumentId,

                    razorpaySubscriptionId:
                        razorpayResponse.razorpay_subscription_id,

                    razorpayPaymentId:
                        razorpayResponse.razorpay_payment_id,

                    razorpaySignature:
                        razorpayResponse.razorpay_signature,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            console.log(
                '[SUBSCRIPTION] Verification response:',
                verifyResponse.data
            );

            const verifyData: VerifyResponse =
                verifyResponse.data;

            if (!verifyData.success) {
                throw new Error(
                    verifyData.message ||
                    'Subscription verification failed.'
                );
            }

            set({
                processing: false,
                lastResult: verifyData.data ?? null,
            });

            return true;
        } catch (error: any) {
            console.log(
                '[SUBSCRIPTION] PAYMENT ERROR:',
                error
            );

            console.log(
                '[SUBSCRIPTION] ERROR RESPONSE:',
                error?.response?.data
            );

            console.log(
                '[SUBSCRIPTION] ERROR STATUS:',
                error?.response?.status
            );

            const message =
                error?.response?.data?.message ||
                error?.description ||
                error?.message ||
                'Subscription failed. Please try again.';

            set({
                processing: false,
                error: message,
            });

            return false;
        }
    },

    resetPaymentState: () =>
        set({
            processing: false,
            error: null,
            lastResult: null,
        }),
}));