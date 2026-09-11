import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";
import RazorpayCheckout from "react-native-razorpay";

// --------------------------------------------------
// API
// --------------------------------------------------

const API_BASE_URL =
  "http://192.168.1.3:5000/api/v1/mobile";

// --------------------------------------------------
// Test data
// --------------------------------------------------

const PROFILE_DOCUMENT_ID = "fp1ytd39ya7nt18s0cesrynj";

const SUBSCRIPTION_PLAN_DOCUMENT_ID =  "hmlfcortgeqfmkez3ro6cgez";

// --------------------------------------------------
// Types
// --------------------------------------------------

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

// --------------------------------------------------
// Component
// --------------------------------------------------

export default function RazorpayTestScreen() {
  const [loading, setLoading] = useState(false);

  const [orderId, setOrderId] = useState<string | null>(null);

  const [paymentId, setPaymentId] = useState<string | null>(
    null
  );

  const [signature, setSignature] = useState<string | null>(
    null
  );

  const [result, setResult] = useState<string>("");

  // --------------------------------------------------
  // 1. Create Razorpay Order
  // --------------------------------------------------

  const createOrder = async () => {
    try {
      setLoading(true);
      setResult("");

      console.log(
        "Creating Razorpay order..."
      );

      const response = await fetch(
        `${API_BASE_URL}/payments/create-order`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            profileDocumentId:
              PROFILE_DOCUMENT_ID,

            subscriptionPlanDocumentId:
              SUBSCRIPTION_PLAN_DOCUMENT_ID,
          }),
        }
      );

      const data: CreateOrderResponse =
        await response.json();

      console.log(
        "CREATE ORDER RESPONSE:",
        data
      );

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            "Failed to create payment order."
        );
      }

      if (!data.data?.orderId) {
        throw new Error(
          "Order ID was not returned."
        );
      }

      setOrderId(
        data.data.orderId
      );

      // --------------------------------------------------
      // 2. Open Razorpay Checkout
      // --------------------------------------------------

      const options = {
        key: data.data.keyId,

        amount: data.data.amount,

        currency: data.data.currency,

        name: "YogaNidraMudra",

        description:
          "Lifetime Subscription",

        order_id:
          data.data.orderId,

        prefill: {
          name: "Test User",

          email:
            "test@example.com",

          contact:
            "9999999999",
        },

        theme: {
          color: "#3399cc",
        },
      };

      console.log(
        "Opening Razorpay Checkout..."
      );

      const razorpayResponse =
        (await RazorpayCheckout.open(
          options
        )) as RazorpaySuccessResponse;

      // --------------------------------------------------
      // 3. Razorpay Success
      // --------------------------------------------------

      console.log(
        "RAZORPAY SUCCESS:",
        razorpayResponse
      );

      setPaymentId(
        razorpayResponse.razorpay_payment_id
      );

      setSignature(
        razorpayResponse.razorpay_signature
      );

      // --------------------------------------------------
      // 4. Verify Payment
      // --------------------------------------------------

      await verifyPayment(
        razorpayResponse
      );

    } catch (error: any) {
      console.log(
        "RAZORPAY ERROR:",
        error
      );

      const message =
        error?.description ||
        error?.message ||
        "Payment failed.";

      setResult(
        `ERROR:\n${message}`
      );

      Alert.alert(
        "Payment Error",
        message
      );
    } finally {
      setLoading(false);
    }
  };

  // --------------------------------------------------
  // Verify Payment
  // --------------------------------------------------

  const verifyPayment = async (
    razorpayResponse: RazorpaySuccessResponse
  ) => {
    try {
      console.log(
        "Verifying payment..."
      );

      const response = await fetch(
        `${API_BASE_URL}/payments/verify`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            profileDocumentId:
              PROFILE_DOCUMENT_ID,

            subscriptionPlanDocumentId:
              SUBSCRIPTION_PLAN_DOCUMENT_ID,

            razorpayOrderId:
              razorpayResponse.razorpay_order_id,

            razorpayPaymentId:
              razorpayResponse.razorpay_payment_id,

            razorpaySignature:
              razorpayResponse.razorpay_signature,
          }),
        }
      );

      const data: VerifyResponse =
        await response.json();

      console.log(
        "VERIFY RESPONSE:",
        data
      );

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            "Payment verification failed."
        );
      }

      setResult(
        JSON.stringify(
          data,
          null,
          2
        )
      );

      Alert.alert(
        "Payment Successful",
        "Payment verified and subscription activated."
      );

    } catch (error: any) {
      console.log(
        "VERIFY ERROR:",
        error
      );

      const message =
        error?.message ||
        "Payment verification failed.";

      setResult(
        `VERIFY ERROR:\n${message}`
      );

      Alert.alert(
        "Verification Failed",
        message
      );
    }
  };

  // --------------------------------------------------
  // UI
  // --------------------------------------------------

  return (
    <ScrollView
      contentContainerStyle={
        styles.container
      }
    >
      <Text style={styles.title}>
        Razorpay Test
      </Text>

      <Text style={styles.subtitle}>
        LIFETIME Subscription
      </Text>

      <View
        style={styles.infoContainer}
      >
        <Text style={styles.label}>
          Profile:
        </Text>

        <Text style={styles.value}>
          {PROFILE_DOCUMENT_ID}
        </Text>

        <Text style={styles.label}>
          Plan:
        </Text>

        <Text style={styles.value}>
          {SUBSCRIPTION_PLAN_DOCUMENT_ID}
        </Text>

        <Text style={styles.label}>
          Order:
        </Text>

        <Text style={styles.value}>
          {orderId || "Not created"}
        </Text>

        <Text style={styles.label}>
          Payment:
        </Text>

        <Text style={styles.value}>
          {paymentId || "Not completed"}
        </Text>

        <Text style={styles.label}>
          Signature:
        </Text>

        <Text style={styles.value}>
          {signature || "Not available"}
        </Text>
      </View>

      <Button
        title={
          loading
            ? "Processing..."
            : "Test Razorpay Payment"
        }
        onPress={createOrder}
        disabled={loading}
      />

      {result ? (
        <View
          style={styles.resultContainer}
        >
          <Text style={styles.resultTitle}>
            Result
          </Text>

          <Text style={styles.result}>
            {result}
          </Text>
        </View>
      ) : null}
    </ScrollView>
  );
}

// --------------------------------------------------
// Styles
// --------------------------------------------------

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,

    justifyContent: "center",

    padding: 24,

    backgroundColor: "#fff",
  },

  title: {
    fontSize: 28,

    fontWeight: "700",

    textAlign: "center",

    marginBottom: 8,
  },

  subtitle: {
    fontSize: 18,

    textAlign: "center",

    marginBottom: 30,
  },

  infoContainer: {
    marginBottom: 30,
  },

  label: {
    fontSize: 14,

    fontWeight: "700",

    marginTop: 12,
  },

  value: {
    fontSize: 12,

    marginTop: 4,
  },

  resultContainer: {
    marginTop: 30,

    padding: 15,

    borderWidth: 1,

    borderRadius: 8,
  },

  resultTitle: {
    fontSize: 18,

    fontWeight: "700",

    marginBottom: 10,
  },

  result: {
    fontSize: 12,
  },
});