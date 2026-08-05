import React from 'react';
import { View, Text } from 'react-native';
// import { privacyStyles as styles } from '@/assets/styles/privacy/privacyStyles';
import { getPrivacyStyles } from '@/assets/styles/privacy/privacyStyles'
import { useTheme } from '@/constants/ThemeContext'
import { Ionicons } from '@expo/vector-icons';
import PersonInfoSvg from '@/assets/icons/PersonInfo.svg';
import HealthSvg from '@/assets/icons/Break.svg';
import DeviceSvg from '@/assets/icons/Device.svg';
import UsageDataSvg from '@/assets/icons/beginner.svg';
import CookiesSvg from '@/assets/icons/Cookies.svg';
import EyeSvg from '@/assets/icons/Eye1.svg';
import EditSvg from '@/assets/icons/Edit.svg';
import DeleteSvg from '@/assets/icons/Delete.svg';
import ExportSvg from '@/assets/icons/Export.svg';

// ── Section 1 — Info Collect Card ────────────────────────────────────────────
const INFO_COLLECT_ITEMS = [
    {
        icon: <PersonInfoSvg width={22} height={22} />,
        title: 'Personal Information',
        subtitle: 'Name, email address, age, gender and profile details you provide',
    },
    {
        icon: <HealthSvg width={22} height={22} />,
        title: 'Health & Wellness Data',
        subtitle: 'Your practice history, mood tracking and wellness preferences',
    },
    {
        icon: <DeviceSvg width={22} height={22} />,
        title: 'Device Information',
        subtitle: 'Device type, OS app version and unique device identifiers',
    },
    {
        icon: <UsageDataSvg width={22} height={22} />,
        title: 'Usage Data',
        subtitle: 'How you use the app, features accessed and time spent',
    },
    {
        icon: <CookiesSvg width={22} height={22} />,
        title: 'Cookies & Tracking Technologies',
        subtitle: 'We use cookies and similar technologies to enhance your experience',
    },
];

// ── Section 2 — Checkmark List ────────────────────────────────────────────────
const USE_ITEMS = [
    'Provide, personalize and improve our services',
    'Track progress and provide insights',
    'Send reminders and important updates',
    'Ensure app security and prevent fraud',
    'Comply with legal obligations',
];

// ── Section 5 — Your Rights ───────────────────────────────────────────────────
const RIGHTS_ITEMS = [
    { icon: <EyeSvg width={22} height={22} />, label: 'Access\nyour data' },
    { icon: <EditSvg width={22} height={22} />, label: 'Update\nyour data' },
    { icon: <DeleteSvg width={22} height={22} />, label: 'Delete your\ndata' },
    { icon: <ExportSvg width={22} height={22} />, label: 'Export your\ndata' },
];

export default function PrivacySections() {
    const { colors, isDark } = useTheme()
    const styles = getPrivacyStyles(colors)
    const iconColor = isDark ? '#FFFFFF' : '#0F0F0F'
    return (
        <View>

            {/* ── Section 1 ── */}
            <View style={styles.sectionWrapper}>
                <Text style={styles.sectionTitle}>1. Information We Collect</Text>
                <Text style={styles.sectionBody}>
                    We collect information to provide and improve our services to you.
                </Text>
                <View style={styles.infoCard}>
                    {INFO_COLLECT_ITEMS.map((item, i) => (
                        <React.Fragment key={i}>
                            <View style={styles.infoRow}>
                                <View style={styles.infoIconCircle}>
                                    {item.icon}
                                </View>
                                <View style={styles.infoTextBlock}>
                                    <Text style={styles.infoRowTitle}>{item.title}</Text>
                                    <Text style={styles.infoRowSubtitle}>{item.subtitle}</Text>
                                </View>
                            </View>
                            {i < INFO_COLLECT_ITEMS.length - 1 && (
                                <View style={styles.infoRowDivider} />
                            )}
                        </React.Fragment>
                    ))}
                </View>
            </View>
            <View style={styles.sectionDivider} />

            {/* ── Section 2 ── */}
            <View style={styles.sectionWrapper}>
                <Text style={styles.sectionTitle}>2. How We Use Your Information</Text>
                <Text style={styles.sectionBody}>We use your information to</Text>
                <View style={styles.checkCard}>
                    {USE_ITEMS.map((item, i) => (
                        <View key={i} style={styles.checkRow}>
                            <Ionicons name="checkmark-circle-outline" size={20} color={colors.textSub} />
                            <Text style={styles.checkText}>{item}</Text>
                        </View>
                    ))}
                </View>
            </View>
            <View style={styles.sectionDivider} />

            {/* ── Section 3 ── */}
            <View style={styles.sectionWrapper}>
                <Text style={styles.sectionTitle}>3. How We Protect Your Information</Text>
                <Text style={styles.sectionBody}>
                    We implement industry-standard security measures to protect your data from unauthorized access, alteration or disclosure.
                </Text>
            </View>
            <View style={styles.sectionDivider} />

            {/* ── Section 4 ── */}
            <View style={styles.sectionWrapper}>
                <Text style={styles.sectionTitle}>4. Data Sharing</Text>
                <Text style={styles.sectionBody}>
                    We do not sell your personal information. We may share your data only with:
                </Text>
                {[
                    'Trusted service providers who help us operate the app',
                    'Legal authorities when required by law',
                    'In case of business transfer or merger (with confidentiality)',
                ].map((item, i) => (
                    <View key={i} style={styles.bulletRow}>
                        <View style={styles.bulletDot} />
                        <Text style={styles.bulletText}>{item}</Text>
                    </View>
                ))}
            </View>
            <View style={styles.sectionDivider} />

            {/* ── Section 5 ── */}
            <View style={styles.sectionWrapper}>
                <Text style={styles.sectionTitle}>5. Your Rights</Text>
                <Text style={styles.sectionBody}>You have the right to</Text>
                <View style={styles.rightsCard}>
                    {RIGHTS_ITEMS.map((item, i) => (
                        <React.Fragment key={i}>
                            <View style={styles.rightItem}>
                                <View style={styles.rightIconCircle}>
                                    {item.icon}
                                </View>
                                <Text style={styles.rightLabel}>{item.label}</Text>
                            </View>
                            {i < RIGHTS_ITEMS.length - 1 && (
                                <View style={styles.rightItemDivider} />
                            )}
                        </React.Fragment>
                    ))}
                </View>
            </View>
            <View style={styles.sectionDivider} />

            {/* ── Section 6 ── */}
            <View style={styles.sectionWrapper}>
                <Text style={styles.sectionTitle}>6. Children's Privacy</Text>
                <Text style={styles.sectionBody}>
                    Mudras is not intended for children under 13. We do not knowingly collect personal data from children.
                </Text>
            </View>
            <View style={styles.sectionDivider} />

            {/* ── Section 7 ── */}
            <View style={styles.sectionWrapper}>
                <Text style={styles.sectionTitle}>7. Changes to This Policy</Text>
                <Text style={styles.sectionBody}>
                    We may update this Privacy Policy from time to time. We will notify you of any significant changes through the app or email.
                </Text>
            </View>
            <View style={styles.sectionDivider} />

            {/* ── Section 8 ── */}
            <View style={styles.sectionWrapper}>
                <Text style={styles.sectionTitle}>8. Contact Us</Text>
                <Text style={styles.sectionBody}>
                    If you have any questions or concerns about this Privacy Policy, please contact us.
                </Text>
            </View>

        </View>
    );
}