import React from 'react';
import { View, Text } from 'react-native';
// import { termsStyles as styles } from '@/assets/styles/terms/termsStyles';
import { getTermsStyles } from '@/assets/styles/terms/termsStyles'
import { useTheme } from '@/constants/ThemeContext'
import CalenderIcon from '@/assets/icons/CalenderIcon.svg';
import CalenderIconWhite from '@/assets/icons/CalenderIconWhite.svg'

export default function TermsDateBadge() {
    const { colors, isDark } = useTheme()
    const styles = getTermsStyles(colors)
    return (
        <View style={styles.dateBadgeRow}>
            {isDark
                ? <CalenderIconWhite width={20} height={20} />
                : <CalenderIcon width={20} height={20} />
            }
            <Text style={styles.dateBadgeText}>Last updated: May 15, 2024</Text>
        </View>
    );
}