import React from 'react';
import { View, Text } from 'react-native';
// import { termsStyles as styles } from '@/assets/styles/terms/termsStyles';
import { getTermsStyles } from '@/assets/styles/terms/termsStyles'
import { useTheme } from '@/constants/ThemeContext'
import EmailTheme from '@/assets/icons/EmailTheme.svg';
import WebTheme from '@/assets/icons/WebTheme.svg';

export default function TermsContactRow() {
    const { colors } = useTheme()
    const styles = getTermsStyles(colors)
    return (
        <View style={styles.contactContainer}>
            <View style={styles.contactCard}>
                <View style={styles.contactItem}>
                    <EmailTheme width={20} height={20} />
                    <Text style={styles.contactText}>Email: support@mudra.app</Text>
                </View>

                <View style={styles.contactDivider} />

                <View style={styles.contactItem}>
                    <WebTheme width={20} height={20} />
                    <Text style={styles.contactText}>Website: www.mudra.app</Text>
                </View>
            </View>
        </View>
    );
}