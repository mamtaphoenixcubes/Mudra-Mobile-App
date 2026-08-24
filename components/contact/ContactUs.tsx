import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/constants/ThemeContext';
import { getContactStyles } from '@/assets/styles/contact/contactStyles';
import AppHeader from '@/components/common/AppHeader';
import { useContactStore } from '@/store/contactStore';

type FeatureItem = {
    id: string;
    icon: keyof typeof Ionicons.glyphMap;
    iconBg: string;
    iconColor: string;
    title: string;
    desc: string;
};

const FEATURES: FeatureItem[] = [
    {
        id: 'reply',
        icon: 'mail-outline',
        iconBg: '#FFF6BF',
        iconColor: '#9A8A2E',
        title: 'We reply within 24-48 hours',
        desc: 'Our team is here to support you.',
    },
    {
        id: 'care',
        icon: 'heart-outline',
        iconBg: '#FFDBE7',
        iconColor: '#C4708A',
        title: 'Made with care',
        desc: 'Your feedback helps us grow.',
    },
    {
        id: 'privacy',
        icon: 'shield-checkmark-outline',
        iconBg: '#E9D9FF',
        iconColor: '#9A85FE',
        title: 'Your privacy matters',
        desc: 'We respect and protect your information.',
    },
    {
        id: 'community',
        icon: 'people-outline',
        iconBg: '#CBECFF',
        iconColor: '#5A9BC4',
        title: 'For the community',
        desc: 'Supporting your wellness journey together.',
    },
];

export default function ContactUs() {
    const { colors } = useTheme();
    const styles = getContactStyles(colors);

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');

    const { submitContact, submitting, error, success } = useContactStore();

    const handleSend = async () => {
        const ok = await submitContact({
            firstName,
            lastName,
            email,
            phoneNumber: phone,
            subject,
            message,
        });

        if (ok) {
            setFirstName('');
            setLastName('');
            setEmail('');
            setPhone('');
            setSubject('');
            setMessage('');
        }
    };
    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <AppHeader />
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {/* Info Section */}
                <View style={styles.infoSection}>
                    <Text style={styles.eyebrow}>CONTACT US</Text>
                    <Text style={styles.heroTitle}>We're Here to Help</Text>
                    <View style={styles.accentBar} />
                    <Text style={styles.heroSubtitle}>
                        Have questions, feedback, or need guidance? We'd love to hear from you.
                    </Text>
                </View>

                {/* Form Card */}
                <View style={styles.formCard}>
                    <Text style={styles.formTitle}>Send Us a Message</Text>
                    <Text style={styles.formSubtitle}>
                        Fill out the form below and we'll get back to you.
                    </Text>

                    <View style={styles.nameRow}>
                        <View style={styles.inputWrapper}>
                            <Ionicons name="person-outline" size={16} color={colors.textMuted} />
                            <TextInput
                                value={firstName}
                                onChangeText={setFirstName}
                                placeholder="First Name"
                                placeholderTextColor={colors.textMuted}
                                style={styles.input}
                            />
                        </View>
                        <View style={styles.inputWrapper}>
                            <Ionicons name="person-outline" size={16} color={colors.textMuted} />
                            <TextInput
                                value={lastName}
                                onChangeText={setLastName}
                                placeholder="Last Name"
                                placeholderTextColor={colors.textMuted}
                                style={styles.input}
                            />
                        </View>
                    </View>

                    <View style={[styles.inputWrapper, styles.fullWidthWrapper]}>
                        <Ionicons name="mail-outline" size={16} color={colors.textMuted} />
                        <TextInput
                            value={email}
                            onChangeText={setEmail}
                            placeholder="Email"
                            placeholderTextColor={colors.textMuted}
                            style={styles.input}
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                    </View>

                    <View style={[styles.inputWrapper, styles.fullWidthWrapper]}>
                        <Ionicons name="call-outline" size={16} color={colors.textMuted} />
                        <TextInput
                            value={phone}
                            onChangeText={setPhone}
                            placeholder="Phone"
                            placeholderTextColor={colors.textMuted}
                            style={styles.input}
                            keyboardType="phone-pad"
                        />
                    </View>

                    <View style={[styles.inputWrapper, styles.fullWidthWrapper]}>
                        <Ionicons name="chatbubble-ellipses-outline" size={16} color={colors.textMuted} />
                        <TextInput
                            value={subject}
                            onChangeText={setSubject}
                            placeholder="Subject"
                            placeholderTextColor={colors.textMuted}
                            style={styles.input}
                        />
                    </View>

                    <View style={[styles.inputWrapper, styles.messageWrapper]}>
                        <Ionicons name="create-outline" size={16} color={colors.textMuted} style={{ marginTop: 2 }} />
                        <TextInput
                            value={message}
                            onChangeText={setMessage}
                            placeholder="Your message"
                            placeholderTextColor={colors.textMuted}
                            style={[styles.input, styles.messageInput]}
                            multiline
                        />
                    </View>

                    {error && (
                        <Text style={styles.errorText}>{error}</Text>
                    )}
                    {success && (
                        <Text style={styles.successText}>Your message has been sent!</Text>
                    )}

                    <TouchableOpacity
                        style={[styles.sendBtn, submitting && styles.sendBtnDisabled]}
                        activeOpacity={0.85}
                        onPress={handleSend}
                        disabled={submitting}
                    >
                        <Text style={styles.sendBtnText}>
                            {submitting ? 'Sending...' : 'Send Message'}
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Features */}
                <View style={styles.featuresSection}>
                    {FEATURES.map((item) => (
                        <View key={item.id} style={styles.featureRow}>
                            <View style={[styles.featureIconCircle, { backgroundColor: item.iconBg }]}>
                                <Ionicons name={item.icon} size={20} color={item.iconColor} />
                            </View>
                            <View style={styles.featureTextBlock}>
                                <Text style={styles.featureTitle}>{item.title}</Text>
                                <Text style={styles.featureDesc}>{item.desc}</Text>
                            </View>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}