import React from 'react';
import { View, Text } from 'react-native';
// import { privacyStyles as styles } from '@/assets/styles/privacy/privacyStyles';
import { getPrivacyStyles } from '@/assets/styles/privacy/privacyStyles'
import { useTheme } from '@/constants/ThemeContext'
import CalenderIcon from '@/assets/icons/CalenderIcon.svg';
import CalenderIconWhite from '@/assets/icons/CalenderIconWhite.svg'

export default function PrivacyDateBadge() {
    const { colors } = useTheme()
    const styles = getPrivacyStyles(colors)
    const { isDark } = useTheme()
    return (
        <View style={styles.dateBadgeRow}>
            {/* <CalenderIcon width={20} height={20} /> */}
            {isDark
                ? <CalenderIconWhite width={20} height={20} />
                : <CalenderIcon width={20} height={20} />
            }
            <Text style={styles.dateBadgeText}>Last updated: May 15, 2024</Text>
        </View>
    );
}