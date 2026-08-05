import React from 'react';
import { View, Text } from 'react-native';
// import { termsStyles as styles } from '@/assets/styles/terms/termsStyles';
import { getTermsStyles } from '@/assets/styles/terms/termsStyles'
import { useTheme } from '@/constants/ThemeContext'

type Section = {
    title: string;
    body?: string;
    bullets?: string[];
};

const SECTIONS: Section[] = [
    {
        title: '1. Acceptance of Terms',
        body: 'By using the Mudras app, you agree to these Terms & Conditions and our Privacy Policy',
    },
    {
        title: '2. Use of the App',
        body: 'You agree to use the app only for personal, non-commercial purposes.\nYou must not misuse the app or try to gain unauthorized access to its features.',
    },
    {
        title: '3. Account & Registration',
        bullets: [
            'You may need to create an account to access certain features.',
            'You are responsible for maintaining the confidentiality of your account.',
            'You agree to provide accurate and complete information.',
        ],
    },
    {
        title: '4. Content & Intellectual Property',
        body: 'All content in the app (text, images, audio, videos, graphics, logos) is the property of Mudras and protected by copyright laws.\nYou may not copy, reproduce or distribute any content without permission.',
    },
    {
        title: '5. User-Generated Content',
        body: 'If you submit feedback, reviews or content, you grant Mudras a non-exclusive, royalty-free, worldwide license to use it. You are responsible for the content you submit.',
    },
    {
        title: '6. Disclaimers',
        body: 'The app provides wellness and educational content for general information only. It is not a substitute for professional medical advice, diagnosis or treatment. Always consult a qualified healthcare provider for any health concerns.',
    },
    {
        title: '7. Limitation of Liability',
        body: 'Mudras is not liable for any indirect, incidental, or consequential damages arising from the use or inability to use the app.',
    },
    {
        title: '8. Third-Party Services',
        body: 'The app may contain links to third-party services. We are not responsible for their content or practices.',
    },
    {
        title: '9. Termination',
        body: 'We may suspend or terminate your access to the app at any time without prior notice if you violate these terms.',
    },
    {
        title: '10. Changes to These Terms',
        body: 'We may update these Terms from time to time. Continued use of the app means you accept the updated terms.',
    },
    {
        title: '11. Governing Law',
        body: 'These Terms are governed by the laws of India.\nAny disputes will be subject to the jurisdiction of the courts in India.',
    },
    {
        title: '12. Contact Us',
        body: 'If you have any questions about these Terms & Conditions, please contact us.',
    },
];

export default function TermsSections() {
    const { colors } = useTheme()
    const styles = getTermsStyles(colors)
    return (
        <View style={styles.sectionsContainer}>
            {SECTIONS.map((section, i) => (
                <View key={i} style={styles.section}>
                    <Text style={styles.sectionTitle}>{section.title}</Text>

                    {section.body && (
                        <Text style={styles.sectionBody}>{section.body}</Text>
                    )}

                    {section.bullets && section.bullets.map((bullet, j) => (
                        <View key={j} style={styles.bulletRow}>
                            <View style={styles.bulletDot} />
                            <Text style={styles.bulletText}>{bullet}</Text>
                        </View>
                    ))}
                </View>
            ))}
        </View>
    );
}