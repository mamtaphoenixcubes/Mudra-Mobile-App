// InvoiceScreen.tsx
import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/constants/ThemeContext';
import { getInvoiceStyles } from '@/assets/styles/subscription/invoiceStyles';
import AppHeader from '@/components/common/AppHeader';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';

export default function InvoiceScreen() {
    const { colors } = useTheme();
    const styles = getInvoiceStyles(colors);
    const router = useRouter();
    const [downloading, setDownloading] = React.useState(false);

    const {
        planName,
        price,
        billing,
        paymentId,
        transactionId,
        paidAt,
        paymentMethod,
    } = useLocalSearchParams<{
        planName: string;
        price: string;
        billing?: string;
        paymentId?: string;
        transactionId?: string;
        paidAt?: string;
        paymentMethod?: string;
    }>();

    const displayDate = paidAt
        ? new Date(paidAt).toLocaleString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
        })
        : new Date().toLocaleString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
        });


    const handleDownloadInvoice = async () => {
        try {
            setDownloading(true);

            const html = `
                <html>
                    <body style="font-family: Helvetica; padding: 32px; color: #1A1A1A;">
                        <div style="background: #9A85FE; padding: 24px; border-radius: 12px; text-align: center; margin-bottom: 24px;">
                            <p style="color: #FFFFFF; font-size: 18px; font-weight: 700; margin: 0;">Yoga Mudra Nidra</p>
                            <p style="color: #FFFFFF; font-size: 14px; margin: 6px 0 0;">Payment successful</p>
                        </div>

                        <h2 style="font-size: 16px; margin-bottom: 4px;">Invoice ${transactionId ? `#${transactionId.slice(-8).toUpperCase()}` : ''
                }</h2>

                        <table style="width: 100%; font-size: 13px; border-collapse: collapse; margin-top: 16px;">
                           <tr>
                                <td style="padding: 6px 0; color: #666;">Plan</td>
                                <td style="padding: 6px 0; text-align: right; font-weight: 700;">${planName ?? ''}</td>
                            </tr>
                            <tr>
                                <td style="padding: 6px 0; color: #666;">Amount paid</td>
                                <td style="padding: 6px 0; text-align: right; font-weight: 700; color: #9A85FE;">${price ?? ''}</td>
                            </tr>
                            <tr>
                                <td style="padding: 6px 0; color: #666;">Billing</td>
                                <td style="padding: 6px 0; text-align: right;">${billing ?? '—'}</td>
                            </tr>
                            <tr>
                                <td style="padding: 6px 0; color: #666;">Date</td>
                                <td style="padding: 6px 0; text-align: right;">${displayDate}</td>
                            </tr>
                            <tr>
                                <td style="padding: 6px 0; color: #666;">Payment method</td>
                                <td style="padding: 6px 0; text-align: right;">${paymentMethod ?? 'Razorpay'}</td>
                            </tr>
                            <tr>
                                <td style="padding: 6px 0; color: #666;">Payment ID</td>
                                <td style="padding: 6px 0; text-align: right;">${paymentId ?? '—'}</td>
                            </tr>
                        </table>

                        <p style="font-size: 11px; color: #999; margin-top: 32px; text-align: center;">
                            Paid securely via Razorpay
                       </p>
                  </body>
               </html>
            `;

            const { uri } = await Print.printToFileAsync({ html });

            const canShare = await Sharing.isAvailableAsync();
            if (canShare) {
                await Sharing.shareAsync(uri, {
                    mimeType: 'application/pdf',
                    dialogTitle: 'Save or share your invoice',
                });
            } else {
                Alert.alert('Invoice ready', `Saved to: ${uri}`);
            }
        } catch (error) {
            console.log('DOWNLOAD_INVOICE_ERROR', error);
            Alert.alert('Download failed', 'Could not generate the invoice. Please try again.');
        } finally {
            setDownloading(false);
        }

    };

    const handleGoHome = () => {
        router.push('/(tabs)');
    };

    return (
        <View style={[styles.screen, { backgroundColor: colors.background }]}>
            <AppHeader />
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                <View style={styles.card}>
                    {/* Header banner */}
                    <View style={styles.banner}>

                        <View style={styles.successCircle}>
                            <Ionicons name="checkmark" size={26} color="#FFFFFF" />
                        </View>

                        <Text style={styles.successTitle}>Payment successful</Text>
                        <Text style={styles.successSubtitle}>
                            {planName ? `${planName} plan activated` : 'Your plan is now active'}
                        </Text>
                    </View>

                    {/* Body */}
                    <View style={styles.body}>
                        <View style={styles.invoiceLabelRow}>
                            <Text style={styles.invoiceLabel}>INVOICE</Text>
                            <Text style={styles.invoiceNumber}>
                                {transactionId ? `#${transactionId.slice(-8).toUpperCase()}` : ''}
                            </Text>
                        </View>

                        <View style={styles.planPriceRow}>
                            <Text style={styles.planName}>{planName ?? 'Plan'}</Text>
                            <Text style={styles.planPrice}>{price ?? ''}</Text>
                        </View>

                        <View style={styles.detailsTable}>
                            <View style={styles.detailRow}>
                                <Text style={styles.detailLabel}>Date</Text>
                                <Text style={styles.detailValue}>{displayDate}</Text>
                            </View>
                            <View style={styles.detailRow}>
                                <Text style={styles.detailLabel}>Billing</Text>
                                <Text style={styles.detailValue}>{billing ?? '—'}</Text>
                            </View>
                            <View style={styles.detailRow}>
                                <Text style={styles.detailLabel}>Payment method</Text>
                                <Text style={styles.detailValue}>{paymentMethod ?? 'Razorpay'}</Text>
                            </View>
                            <View style={styles.detailRow}>
                                <Text style={styles.detailLabel}>Payment ID</Text>
                                <Text style={[styles.detailValue, styles.mono]} numberOfLines={1}>
                                    {paymentId ?? '—'}
                                </Text>
                            </View>
                        </View>

                        <View style={styles.trustStrip}>
                            <Ionicons name="shield-checkmark-outline" size={14} color={colors.primary} />
                            <Text style={[styles.trustText, { color: colors.primary }]}>
                                Paid securely via Razorpay
                            </Text>
                        </View>

                        <TouchableOpacity
                            style={styles.downloadBtn}
                            activeOpacity={0.85}
                            onPress={handleDownloadInvoice}
                            disabled={downloading}
                        >
                            {downloading ? (
                                <ActivityIndicator size="small" color={colors.primary} />
                            ) : (
                                <>
                                    <Ionicons name="download-outline" size={16} color={colors.primary} />
                                    <Text style={[styles.downloadBtnText, { color: colors.primary }]}>
                                        Download invoice
                                    </Text>
                                </>
                            )}
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.homeBtn, { backgroundColor: colors.primary }]}
                            activeOpacity={0.85}
                            onPress={handleGoHome}
                        >
                            <Text style={styles.homeBtnText}>Go to home</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}