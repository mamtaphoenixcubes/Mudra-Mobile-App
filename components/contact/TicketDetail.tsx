import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/constants/ThemeContext';
import { getTicketDetailStyles } from '@/assets/styles/contact/ticketDetailStyles';
import AppHeader from '@/components/common/AppHeader';



// TEMP: preview-only mock data — remove once real submission is wired up
const MOCK_SUBMISSION: TicketSubmission = {
    id: 'mock-1',
    subject: 'Issue with meditation session',
    message: 'I am unable to start the meditation session from the mobile application.',
    time: '10:24 AM',
    status: 'open',
    replies: [
        {
            id: 'reply-1',
            sender: 'support',
            text: 'Hi, thanks for reaching out — could you tell us which device and app version you\'re on?',
            time: '10:41 AM',
        },
    ],
};


type TicketReply = {
    id: string;
    sender: 'user' | 'support';
    text: string;
    time: string;
};

type TicketSubmission = {
    id: string;
    subject: string;
    message: string;
    time: string;
    status: 'open' | 'resolved';
    replies: TicketReply[];
};

interface TicketDetailProps {
    submission: TicketSubmission | null;
    loading?: boolean;
    onSendFollowUp?: (text: string) => void;
    sending?: boolean;
}

export default function TicketDetail({
    submission: incomingSubmission,
    loading = false,
    onSendFollowUp,
    sending = false,
}: TicketDetailProps) {
    const { colors } = useTheme();
    const styles = getTicketDetailStyles(colors);

    const [submission, setSubmission] = useState(incomingSubmission ?? MOCK_SUBMISSION);

    const [draft, setDraft] = useState('');



    const handleSend = () => {
        const trimmed = draft.trim();
        // if (!trimmed || !onSendFollowUp) return;
        if (!trimmed) return;

        handleFollowUp(trimmed);
        setDraft('');
    };

    if (loading) {
        return (
            <View style={styles.container}>
                <AppHeader />
                <View style={styles.centerState}>
                    <ActivityIndicator size="small" color={colors.primary} />
                    <Text style={styles.emptyStateText}>Loading your message…</Text>
                </View>
            </View>
        );
    }

    if (!submission) {
        return (
            <View style={styles.container}>
                <AppHeader />
                <View style={styles.centerState}>
                    <Ionicons name="mail-outline" size={32} color={colors.textSub} />
                    <Text style={styles.emptyStateText}>
                        We couldn't find this message.
                    </Text>
                </View>
            </View>
        );
    }

    const handleFollowUp = onSendFollowUp ?? ((text: string) => {
        setSubmission((prev) => ({
            ...prev,
            replies: [
                ...prev.replies,
                {
                    id: `mock-reply-${Date.now()}`,
                    sender: 'user',
                    text,
                    time: 'Just now',
                },
            ],
        }));
    });

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
        >
            <AppHeader />

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                <View style={styles.contentWrapper}>
                    <View style={styles.subjectSection}>
                        <Text style={styles.eyebrow}>YOUR MESSAGE</Text>
                        <Text style={styles.subjectTitle}>{submission.subject}</Text>
                        <View style={styles.accentBar} />
                        <Text style={styles.statusText}>
                            {submission.status === 'resolved' ? 'Resolved' : 'Open'}
                        </Text>
                    </View>

                    <View style={styles.threadSection}>
                        {/* Original message */}
                        <View style={styles.messageCard}>
                            <View style={styles.messageHeaderRow}>
                                <View
                                    style={[
                                        styles.avatarCircle,
                                        { backgroundColor: '#CBECFF' },
                                    ]}
                                >
                                    <Ionicons name="person-outline" size={15} color="#5A9BC4" />
                                </View>
                                <View>
                                    <Text style={styles.senderName}>You</Text>
                                    <Text style={styles.senderTime}>Sent {submission.time}</Text>
                                </View>
                            </View>
                            <Text style={styles.messageBody}>{submission.message}</Text>
                        </View>

                        {/* Replies */}
                        {submission.replies.map((reply) => (
                            <View
                                key={reply.id}
                                style={
                                    reply.sender === 'support'
                                        ? styles.replyCard
                                        : styles.messageCard
                                }
                            >
                                <View style={styles.messageHeaderRow}>
                                    <View
                                        style={[
                                            styles.avatarCircle,
                                            {
                                                backgroundColor:
                                                    reply.sender === 'support'
                                                        ? '#E9D9FF'
                                                        : '#CBECFF',
                                            },
                                        ]}
                                    >
                                        <Ionicons
                                            name={
                                                reply.sender === 'support'
                                                    ? 'headset-outline'
                                                    : 'person-outline'
                                            }
                                            size={15}
                                            color={
                                                reply.sender === 'support' ? '#9A85FE' : '#5A9BC4'
                                            }
                                        />
                                    </View>
                                    <View>
                                        <Text style={styles.senderName}>
                                            {reply.sender === 'support' ? 'Mudras Support' : 'You'}
                                        </Text>
                                        <Text style={styles.senderTime}>
                                            Replied {reply.time}
                                        </Text>
                                    </View>
                                </View>
                                <Text style={styles.messageBody}>{reply.text}</Text>
                            </View>
                        ))}
                    </View>
                </View>
            </ScrollView>

            {/* {handleFollowUp && ( */}
            <View style={styles.composerWrapper}>
                <View style={styles.contentWrapper}>
                    <View style={styles.composerRow}>
                        <TextInput
                            value={draft}
                            onChangeText={setDraft}
                            placeholder="Write a follow-up…"
                            placeholderTextColor={colors.textSub}
                            style={styles.composerInput}
                            multiline
                        />
                        <TouchableOpacity
                            style={[
                                styles.sendCircle,
                                (!draft.trim() || sending) && styles.sendCircleDisabled,
                            ]}
                            activeOpacity={0.85}
                            onPress={handleSend}
                            disabled={!draft.trim() || sending}
                        >
                            {sending ? (
                                <ActivityIndicator size="small" color="#FFFFFF" />
                            ) : (
                                <Ionicons name="send" size={14} color="#FFFFFF" />
                            )}
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            {/* )} */}
        </KeyboardAvoidingView>
    );
}