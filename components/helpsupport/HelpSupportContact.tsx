import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
// import { helpSupportStyles as styles } from '@/assets/styles/helpsupport/helpSupportStyles';
import { getHelpSupportStyles } from '@/assets/styles/helpsupport/helpSupportStyles'
import { useTheme } from '@/constants/ThemeContext'
import EmailSvg from '@/assets/icons/Email.svg';
import LiveChatSvg from '@/assets/icons/LiveChat.svg';
import PhoneSvg from '@/assets/icons/Help.svg';
import { Linking } from 'react-native';
import { router } from 'expo-router';

type ContactItem = {
    icon: React.ReactNode;
    title: string;
    subtitle: string;
    meta: string;
    onPress?: () => void;
};

const EMAIL = 'support@mudra.app';
const PHONE = '+919876543210';

const ITEMS: ContactItem[] = [
    {
        icon: <EmailSvg width={22} height={22} />,
        title: 'Email Support',
        subtitle: 'We usually respond within 24 hours',
        meta: EMAIL,
        onPress: () => Linking.openURL(`mailto:${EMAIL}`),
    },
    {
        icon: <LiveChatSvg width={22} height={22} />,
        title: 'Live Chat',
        subtitle: 'Chat with our support team',
        meta: 'Available 9AM-PM',
        onPress: () => router.push('/chat'),
    },
    {
        icon: <PhoneSvg width={22} height={22} />,
        title: 'Call Support',
        subtitle: 'Speak with our support team',
        meta: '+91 98765 43210',
        onPress: () => Linking.openURL(`tel:${PHONE}`),
    },
];

export default function HelpSupportContact() {
    const { colors } = useTheme()
    const styles = getHelpSupportStyles(colors)
    return (
        <View style={styles.listContainer}>
            <Text style={styles.sectionLabel}>Contact Support</Text>
            <View style={styles.listCard}>
                {ITEMS.map((item, i) => (
                    <React.Fragment key={i}>
                        <TouchableOpacity style={styles.listRow} activeOpacity={0.7} onPress={item.onPress}>
                            <View style={styles.listIconCircle}>
                                {item.icon}
                            </View>
                            <View style={styles.listTextBlock}>
                                <Text style={styles.listRowTitle}>{item.title}</Text>
                                <Text style={styles.listRowSubtitle}>{item.subtitle}</Text>
                            </View>
                            <Text style={styles.listRowMeta}>{item.meta}</Text>
                            <Ionicons
                                name="chevron-forward"
                                size={18}
                                color="#0F0F0F60"
                                style={styles.listArrow}
                            />
                        </TouchableOpacity>
                        {i < ITEMS.length - 1 && <View style={styles.listRowDivider} />}
                    </React.Fragment>
                ))}
            </View>
        </View>
    );
}