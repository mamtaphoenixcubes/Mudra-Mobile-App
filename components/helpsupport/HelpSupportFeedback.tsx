import React from 'react';
import { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
// import { helpSupportStyles as styles } from '@/assets/styles/helpsupport/helpSupportStyles';
import { getHelpSupportStyles } from '@/assets/styles/helpsupport/helpSupportStyles'
import { useTheme } from '@/constants/ThemeContext'
import { Ionicons } from '@expo/vector-icons';
import FeedbackModal from '@/components/common/FeedbackModal';

export default function HelpSupportFeedback() {
    const { colors } = useTheme()
    const styles = getHelpSupportStyles(colors)
    const [feedbackVisible, setFeedbackVisible] = useState(false);

    const handleFeedbackSubmit = (rating: number, comment: string) => {
        console.log('Feedback submitted:', { rating, comment });
        // TODO: axios.post(`${process.env.EXPO_PUBLIC_API_URL}/feedback`, { rating, comment })
    };

    return (
        <View style={styles.feedbackContainer}>
            <View style={styles.feedbackCard}>
                <View style={styles.feedbackIconCircle}>
                    <Ionicons name="heart-outline" size={24} color="#0F0F0F" />
                </View>
                <View style={styles.feedbackTextBlock}>
                    <Text style={styles.feedbackTitle}>We value your feedback</Text>
                    <Text style={styles.feedbackSubtitle}>
                        Help us improve Mudras by sharing your thoughts.
                    </Text>
                </View>
                <TouchableOpacity
                    style={styles.feedbackBtn}
                    activeOpacity={0.8}
                    onPress={() => setFeedbackVisible(true)}
                >
                    <Text style={styles.feedbackBtnText}>Give Feedback</Text>
                </TouchableOpacity>
            </View>

            <FeedbackModal
                visible={feedbackVisible}
                onClose={() => setFeedbackVisible(false)}
                onSubmit={handleFeedbackSubmit}
            />
        </View>
    );
}