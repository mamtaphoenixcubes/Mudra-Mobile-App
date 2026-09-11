import React, { useEffect, useState } from 'react';

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
import { useLocalSearchParams } from 'expo-router';

import { useTheme } from '@/constants/ThemeContext';
import { getTicketDetailStyles } from '@/assets/styles/contact/ticketDetailStyles';
import AppHeader from '@/components/common/AppHeader';

import { useAuthStore } from '@/store/authStore';

import {
    useContactStore,
} from '@/store/contactStore';


export default function TicketDetail() {
    const { colors } = useTheme();

    const styles = getTicketDetailStyles(colors);

    const {
        ticketId,
    } = useLocalSearchParams<{
        ticketId: string;
    }>();

    const { user } = useAuthStore();

    const email = user?.email;

    const {
        selectedTicket,
        loadingTicket,
        sendingReply,
        fetchTicketMessages,
        sendReply,
    } = useContactStore();

    const [draft, setDraft] = useState('');


    // --------------------------------------------------
    // Fetch ticket messages
    // --------------------------------------------------

    useEffect(() => {
        if (!ticketId || !email) {
            return;
        }

        fetchTicketMessages(
            ticketId,
            email
        );
    }, [
        ticketId,
        email,
    ]);


    // --------------------------------------------------
    // Send reply
    // --------------------------------------------------

    const handleSend = async () => {
        const trimmed = draft.trim();

        if (
            !trimmed ||
            !ticketId ||
            !email ||
            selectedTicket?.status === 'resolved' ||
            sendingReply
        ) {
            return;
        }

        const success = await sendReply(
            ticketId,
            {
                email,
                message: trimmed,

                senderName: user?.fullName
                    ? `${user.fullName}`.trim()
                    : 'User',

                senderUid: user?.id,
            }
        );

        if (!success) {
            return;
        }

        setDraft('');

        /*
         * Reload the conversation so the newly
         * sent reply appears in the existing UI.
         */
        await fetchTicketMessages(
            ticketId,
            email
        );
    };


    // --------------------------------------------------
    // Loading state
    // --------------------------------------------------

    if (loadingTicket) {
        return (
            <View style={styles.container}>
                <AppHeader />

                <View style={styles.centerState}>
                    <ActivityIndicator
                        size="small"
                        color={colors.primary}
                    />

                    <Text style={styles.emptyStateText}>
                        Loading your message…
                    </Text>
                </View>
            </View>
        );
    }


    // --------------------------------------------------
    // Ticket not found
    // --------------------------------------------------

    if (!selectedTicket) {
        return (
            <View style={styles.container}>
                <AppHeader />

                <View style={styles.centerState}>
                    <Ionicons
                        name="mail-outline"
                        size={32}
                        color={colors.textSub}
                    />

                    <Text style={styles.emptyStateText}>
                        We couldn't find this message.
                    </Text>
                </View>
            </View>
        );
    }


    // --------------------------------------------------
    // Existing UI
    // --------------------------------------------------

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={
                Platform.OS === 'ios'
                    ? 'padding'
                    : 'height'
            }
            keyboardVerticalOffset={
                Platform.OS === 'ios'
                    ? 90
                    : 0
            }
        >
            <AppHeader />

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={
                    styles.scrollContent
                }
            >
                <View style={styles.contentWrapper}>

                    {/* Subject */}

                    <View style={styles.subjectSection}>
                        <Text style={styles.eyebrow}>
                            YOUR MESSAGE
                        </Text>

                        <Text style={styles.subjectTitle}>
                            {selectedTicket.subject}
                        </Text>

                        <View style={styles.accentBar} />

                        <Text style={styles.statusText}>
                            {selectedTicket.status === 'resolved'
                                ? 'Resolved'
                                : 'Open'}
                        </Text>
                    </View>


                    {/* Conversation */}

                    <View style={styles.threadSection}>

                        {/* Original message */}

                        <View style={styles.messageCard}>
                            <View style={styles.messageHeaderRow}>

                                <View
                                    style={[
                                        styles.avatarCircle,
                                        {
                                            backgroundColor:
                                                '#CBECFF',
                                        },
                                    ]}
                                >
                                    <Ionicons
                                        name="person-outline"
                                        size={15}
                                        color="#5A9BC4"
                                    />
                                </View>

                                <View>
                                    <Text
                                        style={
                                            styles.senderName
                                        }
                                    >
                                        You
                                    </Text>

                                    <Text
                                        style={
                                            styles.senderTime
                                        }
                                    >
                                        Sent {selectedTicket.time}
                                    </Text>
                                </View>

                            </View>

                            <Text
                                style={styles.messageBody}
                            >
                                {selectedTicket.message}
                            </Text>
                        </View>


                        {/* Replies */}

                        {selectedTicket.replies.map(
                            (reply) => (
                                <View
                                    key={reply.id}
                                    style={
                                        reply.sender ===
                                            'support'
                                            ? styles.replyCard
                                            : styles.messageCard
                                    }
                                >

                                    <View
                                        style={
                                            styles.messageHeaderRow
                                        }
                                    >

                                        <View
                                            style={[
                                                styles.avatarCircle,
                                                {
                                                    backgroundColor:
                                                        reply.sender ===
                                                            'support'
                                                            ? '#E9D9FF'
                                                            : '#CBECFF',
                                                },
                                            ]}
                                        >
                                            <Ionicons
                                                name={
                                                    reply.sender ===
                                                        'support'
                                                        ? 'headset-outline'
                                                        : 'person-outline'
                                                }
                                                size={15}
                                                color={
                                                    reply.sender ===
                                                        'support'
                                                        ? '#9A85FE'
                                                        : '#5A9BC4'
                                                }
                                            />
                                        </View>

                                        <View>
                                            <Text
                                                style={
                                                    styles.senderName
                                                }
                                            >
                                                {reply.sender ===
                                                    'support'
                                                    ? 'Mudras Support'
                                                    : 'You'}
                                            </Text>

                                            <Text
                                                style={
                                                    styles.senderTime
                                                }
                                            >
                                                Replied {reply.time}
                                            </Text>
                                        </View>

                                    </View>

                                    <Text
                                        style={
                                            styles.messageBody
                                        }
                                    >
                                        {reply.text}
                                    </Text>

                                </View>
                            )
                        )}

                    </View>
                </View>
            </ScrollView>


            {/* Composer — hidden once the ticket is resolved */}

            {selectedTicket.status !== 'resolved' && (

                <View style={styles.composerWrapper}>
                    <View style={styles.contentWrapper}>

                        <View style={styles.composerRow}>

                            <TextInput
                                value={draft}
                                onChangeText={setDraft}
                                placeholder="Write a follow-up…"
                                placeholderTextColor={
                                    colors.textSub
                                }
                                style={
                                    styles.composerInput
                                }
                                multiline
                            />

                            <TouchableOpacity
                                style={[
                                    styles.sendCircle,
                                    (
                                        !draft.trim() ||
                                        sendingReply
                                    ) &&
                                    styles.sendCircleDisabled,
                                ]}
                                activeOpacity={0.85}
                                onPress={handleSend}
                                disabled={
                                    !draft.trim() ||
                                    sendingReply
                                }
                            >
                                {sendingReply ? (
                                    <ActivityIndicator
                                        size="small"
                                        color="#FFFFFF"
                                    />
                                ) : (
                                    <Ionicons
                                        name="send"
                                        size={14}
                                        color="#FFFFFF"
                                    />
                                )}
                            </TouchableOpacity>

                        </View>
                    </View>
                </View>
            )}

        </KeyboardAvoidingView>
    );
}