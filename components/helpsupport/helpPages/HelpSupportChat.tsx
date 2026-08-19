import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    Dimensions,
    KeyboardAvoidingView,
    Platform,
    Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTheme } from '@/constants/ThemeContext';
import AppHeader from '@/components/common/AppHeader';

import { db } from '@/constants/firebase';
import {
    collection,
    addDoc,
    query,
    orderBy,
    onSnapshot,
    serverTimestamp,
    Timestamp,
    doc,
    setDoc,
    getDoc,
} from 'firebase/firestore';
import { useAnonAuthStore } from '@/store/anonAuthStore';
import { useAuthStore } from '@/store/authStore';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const moderateScale = (size: number, factor = 0.5) =>
    size + ((SCREEN_WIDTH - 375) / 375) * size * factor;

interface FAQItem {
    id: string;
    question: string;
    answer: string;
    keywords: string[];
}

const FAQ_ITEMS: FAQItem[] = [
    {
        id: 'reset-password',
        question: 'How do I reset my password?',
        answer: "Go to the Login screen and tap \"Forgot Password?\" You'll receive a code by email to set a new password.",
        keywords: ['password', 'reset', 'forgot', 'login'],
    },
    {
        id: 'cancel-subscription',
        question: 'How do I cancel my subscription?',
        answer: 'Go to Profile → Subscription, and tap "Manage Subscription." You can cancel anytime before your next billing date.',
        keywords: ['cancel', 'subscription', 'billing', 'premium'],
    },
    {
        id: 'download-sessions',
        question: 'Can I download sessions for offline use?',
        answer: 'Yes — open any session and tap the Download icon in the toolbar. Downloaded sessions appear in your Library for offline playback.',
        keywords: ['download', 'offline'],
    },
    {
        id: 'sync-devices',
        question: 'Does my progress sync across devices?',
        answer: 'Yes, as long as you\'re logged into the same account, your saved sessions and progress sync automatically.',
        keywords: ['sync', 'device', 'progress'],
    },
    {
        id: 'contact-human',
        question: 'I need to talk to a real person',
        answer: "I'm just a quick-answer bot for now! For anything else, please use Email Support or Call Support from the Help & Support screen.",
        keywords: ['human', 'agent', 'person', 'real'],
    },
];

const FALLBACK_ANSWER =
    "I don't have an answer for that yet. Please try Email Support or Call Support from the Help & Support screen.";

interface Message {
    id: string;
    sender: 'bot' | 'user' | 'admin';
    text: string;
    timestamp?: Timestamp | null;
}

const BotAvatar = ({ color, icon = 'sparkles' }: { color: string; icon?: keyof typeof Ionicons.glyphMap }) => (
    <View style={[styles.avatar, { backgroundColor: color }]}>
        <Ionicons name={icon} size={14} color="#FFFFFF" />
    </View>
);

const UserAvatar = ({ color, textColor }: { color: string; textColor: string }) => (
    <View style={[styles.avatar, { backgroundColor: color }]}>
        <Ionicons name="person" size={13} color={textColor} />
    </View>
);

const TypingIndicator = ({ bubbleColor, dotColor }: { bubbleColor: string; dotColor: string }) => {
    const dot1 = useRef(new Animated.Value(0)).current;
    const dot2 = useRef(new Animated.Value(0)).current;
    const dot3 = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const bounce = (dot: Animated.Value, delay: number) =>
            Animated.loop(
                Animated.sequence([
                    Animated.delay(delay),
                    Animated.timing(dot, { toValue: -4, duration: 260, useNativeDriver: true }),
                    Animated.timing(dot, { toValue: 0, duration: 260, useNativeDriver: true }),
                ])
            ).start();

        bounce(dot1, 0);
        bounce(dot2, 130);
        bounce(dot3, 260);
    }, []);

    return (
        <View style={[styles.bubble, styles.botBubbleShape, { backgroundColor: bubbleColor }]}>
            <View style={styles.typingRow}>
                {[dot1, dot2, dot3].map((dot, i) => (
                    <Animated.View
                        key={i}
                        style={[
                            styles.typingDot,
                            { backgroundColor: dotColor, transform: [{ translateY: dot }] },
                        ]}
                    />
                ))}
            </View>
        </View>
    );
};

export default function HelpSupportChat() {
    const { colors } = useTheme();
    const router = useRouter();

    const { user } = useAuthStore();
    const anonUid = useAnonAuthStore((s) => s.uid);
    const isLoggedIn = !!user?.FirebaseUid;

    const [guestMode, setGuestMode] = useState(false);
    const [showEntryPrompt, setShowEntryPrompt] = useState(!isLoggedIn);

    const uid = isLoggedIn ? user?.FirebaseUid ?? null : guestMode ? anonUid : null;

    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isBotTyping, setIsBotTyping] = useState(false);
    const scrollRef = useRef<ScrollView>(null);
    const [assignedToName, setAssignedToName] = useState<string | null>(null);
    const [showClosurePrompt, setShowClosurePrompt] = useState(false);
    const [conversationEnded, setConversationEnded] = useState(false);
    const [wantsMoreHelp, setWantsMoreHelp] = useState(false);

    useEffect(() => {
        if (isLoggedIn) {
            setShowEntryPrompt(false);
            setGuestMode(false);
        }
    }, [isLoggedIn]);

    useEffect(() => {
        if (!uid) {
            return;
        }

        const chatDocRef = doc(db, 'supportChats', uid);

        getDoc(chatDocRef).then((snapshot) => {
            if (!snapshot.exists()) {
                setDoc(chatDocRef, {
                    name: user?.fullName || user?.username || null,
                    isGuest: !isLoggedIn,
                    assignmentStatus: 'unassigned',
                    assignedTo: null,
                    assignedToName: null,
                }).catch((err) => console.log('Init chat doc error:', err));
            } else {
                setDoc(
                    chatDocRef,
                    {
                        name: user?.fullName || user?.username || null,
                        isGuest: !isLoggedIn,
                    },
                    { merge: true }
                ).catch((err) => console.log('Update chat doc error:', err));
            }
        });

        const messagesRef = collection(db, 'supportChats', uid, 'messages');
        const q = query(messagesRef, orderBy('timestamp', 'asc'));

        const unsubscribeSnapshot = onSnapshot(
            q,
            (snapshot) => {
                const loaded: Message[] = snapshot.docs.map((docSnap) => ({
                    id: docSnap.id,
                    sender: docSnap.data().sender,
                    text: docSnap.data().text,
                    timestamp: docSnap.data().timestamp ?? null,
                }));

                if (loaded.length === 0) {
                    addDoc(messagesRef, {
                        sender: 'bot',
                        text: "Hi! I'm the Mudras support assistant. Pick a question below, or type your own.",
                        timestamp: serverTimestamp(),
                    }).catch((err) => console.log('Seed greeting error:', err));
                    return;
                }

                setMessages(loaded);
                scrollToBottom();
            },
            (error) => {
                console.log('Firestore listener error:', error);
            }
        );

        return () => {
            unsubscribeSnapshot();
        };
    }, [uid]);

    useEffect(() => {
        if (!uid) {
            return;
        }

        const chatDocRef = doc(db, 'supportChats', uid);
        const unsubscribe = onSnapshot(chatDocRef, (snapshot) => {
            setAssignedToName(snapshot.data()?.assignedToName ?? null);
        });

        return () => {
            unsubscribe();
        };
    }, [uid]);

    const scrollToBottom = () => {
        setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 100);
    };

    const writeMessage = async (sender: 'bot' | 'user', text: string) => {
        if (!uid) return;
        const messagesRef = collection(db, 'supportChats', uid, 'messages');
        await addDoc(messagesRef, {
            sender,
            text,
            timestamp: serverTimestamp(),
        });
        await setDoc(
            doc(db, 'supportChats', uid),
            { lastMessage: text, lastMessageAt: serverTimestamp(), lastMessageSender: sender },
            { merge: true }
        );
    };

    const respondAsBot = (text: string) => {
        setIsBotTyping(true);
        scrollToBottom();
        const delay = 500 + Math.random() * 400;
        setTimeout(() => {
            setIsBotTyping(false);
            writeMessage('bot', text)
                .then(() => setShowClosurePrompt(true))
                .catch((err) => console.log('Bot reply write error:', err));
        }, delay);
    };

    // const handleQuickReply = (faq: FAQItem) => {
    //     writeMessage('user', faq.question).catch((err) => console.log('User message write error:', err));
    //     if (hasHumanJoined) return;
    //     respondAsBot(faq.answer);
    // };

    // const handleSend = () => {
    //     const trimmed = input.trim();
    //     if (!trimmed) return;

    //     writeMessage('user', trimmed).catch((err) => console.log('User message write error:', err));
    //     setInput('');

    //     if (hasHumanJoined) return;
    //     const lower = trimmed.toLowerCase();
    //     const match = FAQ_ITEMS.find((faq) => faq.keywords.some((kw) => lower.includes(kw)));
    //     respondAsBot(match ? match.answer : FALLBACK_ANSWER);
    // };
    const handleQuickReply = (faq: FAQItem) => {
        setWantsMoreHelp(false);
        writeMessage('user', faq.question).catch((err) => console.log('User message write error:', err));
        if (hasHumanJoined) return;
        respondAsBot(faq.answer);
    };

    const handleSend = () => {
        const trimmed = input.trim();
        if (!trimmed) return;

        setWantsMoreHelp(false);
        writeMessage('user', trimmed).catch((err) => console.log('User message write error:', err));
        setInput('');

        if (hasHumanJoined) return;
        const lower = trimmed.toLowerCase();
        const match = FAQ_ITEMS.find((faq) => faq.keywords.some((kw) => lower.includes(kw)));
        respondAsBot(match ? match.answer : FALLBACK_ANSWER);
    };


    const handleChooseLogin = () => {
        router.push({
            pathname: '/auth/login',
            params: { redirect: '/chat' },
        });
    };

    const handleChooseGuest = () => {
        setGuestMode(true);
        setShowEntryPrompt(false);
    };

    const handleClosureDone = () => {
        setShowClosurePrompt(false);
        setConversationEnded(true);
        writeMessage('user', 'Got it, thanks!').catch((err) => console.log('Closure message error:', err));

        if (!uid) return;
        setDoc(
            doc(db, 'supportChats', uid),
            { queryResolved: true, queryResolvedAt: serverTimestamp() },
            { merge: true }
        ).catch((err) => console.log('Resolve flag error:', err));
    };

    const handleClosureContinue = () => {
        setShowClosurePrompt(false);
        setWantsMoreHelp(true);
    };

    // const showSuggestions = !messages.some((m) => m.sender === 'user');
    const showSuggestions = wantsMoreHelp || !messages.some((m) => m.sender === 'user');
    const hasHumanJoined = messages.some((m) => m.sender === 'admin');

    return (
        <KeyboardAvoidingView
            style={[styles.container, { backgroundColor: colors.background }]}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <AppHeader />

            <View style={styles.headerBlock}>
                <Text style={[styles.pageTitle, { color: colors.text }]}>Live Chat</Text>
                <View style={styles.statusRow}>
                    <View style={styles.statusDot} />
                    <Text style={[styles.statusText, { color: colors.textSub }]}>
                        {assignedToName ? `Connected with ${assignedToName}` : 'Instant answers · Always online'}
                    </Text>
                </View>
            </View>

            <ScrollView
                ref={scrollRef}
                style={styles.messagesScroll}
                contentContainerStyle={styles.messagesContent}
                showsVerticalScrollIndicator={false}
            >
                {showEntryPrompt && (
                    <View style={[styles.bubbleRow, styles.bubbleRowBot]}>
                        <BotAvatar color={colors.primary} />
                        <View style={[styles.bubble, styles.botBubbleShape, { backgroundColor: colors.surfaceAlt, maxWidth: '80%' }]}>
                            <Text style={[styles.bubbleText, { color: colors.text }]}>
                                Welcome to Mudras Support!{'\n'}For a better experience, we recommend you log in and relaunch chat.
                            </Text>

                            <TouchableOpacity
                                style={[styles.promptBtn, { borderColor: colors.primary }]}
                                activeOpacity={0.7}
                                onPress={handleChooseLogin}
                            >
                                <Text style={[styles.promptBtnText, { color: colors.primary }]}>
                                    I would like to proceed with the login
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.promptBtn, { borderColor: colors.dividerDark, marginTop: moderateScale(8) }]}
                                activeOpacity={0.7}
                                onPress={handleChooseGuest}
                            >
                                <Text style={[styles.promptBtnText, { color: colors.textSub }]}>
                                    Proceed without logging in
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}

                {!showEntryPrompt &&
                    messages.map((msg) => (
                        <View
                            key={msg.id}
                            style={[styles.bubbleRow, msg.sender === 'user' ? styles.bubbleRowUser : styles.bubbleRowBot]}
                        >
                            {(msg.sender === 'bot' || msg.sender === 'admin') && (
                                <BotAvatar color={colors.primary} icon={msg.sender === 'admin' ? 'headset' : 'sparkles'} />
                            )}

                            <View
                                style={[
                                    styles.bubble,
                                    msg.sender === 'user'
                                        ? [styles.userBubbleShape, { backgroundColor: colors.primary }]
                                        : [styles.botBubbleShape, { backgroundColor: colors.surfaceAlt }],
                                ]}
                            >
                                <Text
                                    style={[
                                        styles.bubbleText,
                                        { color: msg.sender === 'user' ? '#FFFFFF' : colors.text },
                                    ]}
                                >
                                    {msg.text}
                                </Text>
                            </View>

                            {msg.sender === 'user' && (
                                <UserAvatar color={colors.primaryLight} textColor={colors.primary as string} />
                            )}
                        </View>
                    ))}

                {/* {!showEntryPrompt && isBotTyping && (
                    <View style={[styles.bubbleRow, styles.bubbleRowBot]}>
                        <BotAvatar color={colors.primary} />
                        <TypingIndicator bubbleColor={colors.surfaceAlt} dotColor={colors.textMuted as string} />
                    </View>
                )} */}
                {!showEntryPrompt && showClosurePrompt && !conversationEnded && (
                    <View style={[styles.bubbleRow, styles.bubbleRowBot]}>
                        <BotAvatar color={colors.primary} />
                        <View style={[styles.bubble, styles.botBubbleShape, { backgroundColor: colors.surfaceAlt, maxWidth: '80%' }]}>
                            <Text style={[styles.bubbleText, { color: colors.text }]}>
                                Is there anything else we may help you with today?
                            </Text>

                            <View style={styles.closureBtnRow}>
                                <TouchableOpacity
                                    style={[styles.closurePillBtn, { borderColor: colors.primary }]}
                                    activeOpacity={0.7}
                                    onPress={handleClosureDone}
                                >
                                    <Text style={[styles.closurePillBtnText, { color: colors.primary }]}>
                                        Got it, thanks!
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={[styles.closurePillBtn, { borderColor: colors.primary }]}
                                    activeOpacity={0.7}
                                    onPress={handleClosureContinue}
                                >
                                    <Text style={[styles.closurePillBtnText, { color: colors.primary }]}>
                                        Need further help
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                )}

                {!showEntryPrompt && showSuggestions && (
                    <View style={styles.suggestionsWrap}>
                        <Text style={[styles.suggestionsLabel, { color: colors.textMuted }]}>SUGGESTED QUESTIONS</Text>
                        {FAQ_ITEMS.map((faq) => (
                            <TouchableOpacity
                                key={faq.id}
                                style={[styles.suggestionCard, { borderColor: colors.dividerDark, backgroundColor: colors.card }]}
                                activeOpacity={0.7}
                                onPress={() => handleQuickReply(faq)}
                            >
                                <Text style={[styles.suggestionText, { color: colors.text }]}>{faq.question}</Text>
                                <Ionicons name="chevron-forward" size={16} color={colors.textMuted as string} />
                            </TouchableOpacity>
                        ))}
                    </View>
                )}
            </ScrollView>

            {!showEntryPrompt && !conversationEnded && (
                <View style={[styles.inputRow, { borderTopColor: colors.dividerDark, backgroundColor: colors.background }]}>
                    <TextInput
                        value={input}
                        onChangeText={setInput}
                        placeholder="Type a message..."
                        placeholderTextColor={colors.textMuted}
                        style={[styles.input, { color: colors.text, backgroundColor: colors.inputBg }]}
                        returnKeyType="send"
                        onSubmitEditing={handleSend}
                        multiline
                    />
                    <TouchableOpacity
                        onPress={handleSend}
                        disabled={!input.trim()}
                        activeOpacity={0.85}
                        style={[styles.sendBtn, { backgroundColor: input.trim() ? colors.primary : colors.dividerDark }]}
                    >
                        <Ionicons name="arrow-up" size={18} color="#FFFFFF" />
                    </TouchableOpacity>
                </View>
            )}
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    headerBlock: {
        alignItems: 'center',
        marginBottom: moderateScale(10),
        paddingHorizontal: moderateScale(16),
    },
    pageTitle: {
        fontFamily: 'SF-Pro-Display',
        fontWeight: '600',
        fontSize: moderateScale(20),
        textAlign: 'center',
    },
    statusRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: moderateScale(6),
        marginTop: moderateScale(4),
    },
    statusDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: '#22C55E',
    },
    statusText: {
        fontFamily: 'SF-Pro-Display',
        fontSize: moderateScale(12),
        fontWeight: '400',
    },
    messagesScroll: { flex: 1 },
    messagesContent: {
        paddingHorizontal: moderateScale(16),
        paddingBottom: moderateScale(20),
        gap: moderateScale(10),
    },
    bubbleRow: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        gap: moderateScale(8),
    },
    bubbleRowBot: { justifyContent: 'flex-start' },
    bubbleRowUser: { justifyContent: 'flex-end' },
    avatar: {
        width: moderateScale(26),
        height: moderateScale(26),
        borderRadius: moderateScale(13),
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
    },
    bubble: {
        maxWidth: '72%',
        paddingHorizontal: moderateScale(14),
        paddingVertical: moderateScale(10),
        shadowColor: '#000',
        shadowOpacity: 0.04,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 1 },
        elevation: 1,
    },
    botBubbleShape: {
        borderRadius: moderateScale(16),
        borderBottomLeftRadius: moderateScale(4),
    },
    userBubbleShape: {
        borderRadius: moderateScale(16),
        borderBottomRightRadius: moderateScale(4),
    },
    bubbleText: {
        fontFamily: 'SF-Pro-Display',
        fontSize: moderateScale(14),
        lineHeight: moderateScale(20),
    },
    promptBtn: {
        marginTop: moderateScale(10),
        borderWidth: 1,
        borderRadius: moderateScale(18),
        paddingVertical: moderateScale(9),
        paddingHorizontal: moderateScale(14),
        alignItems: 'center',
    },
    promptBtnText: {
        fontFamily: 'SF-Pro-Display',
        fontSize: moderateScale(13),
        fontWeight: '600',
    },
    typingRow: {
        flexDirection: 'row',
        gap: moderateScale(4),
        paddingVertical: moderateScale(2),
    },
    typingDot: { width: 6, height: 6, borderRadius: 3 },
    suggestionsWrap: {
        marginTop: moderateScale(16),
        gap: moderateScale(8),
    },
    suggestionsLabel: {
        fontFamily: 'SF-Pro-Display',
        fontSize: moderateScale(11),
        fontWeight: '600',
        letterSpacing: 0.4,
        marginBottom: moderateScale(2),
    },
    suggestionCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderRadius: moderateScale(12),
        paddingHorizontal: moderateScale(14),
        paddingVertical: moderateScale(12),
    },
    suggestionText: {
        flex: 1,
        fontFamily: 'SF-Pro-Display',
        fontSize: moderateScale(13),
        fontWeight: '500',
    },
    inputRow: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        gap: moderateScale(10),
        paddingHorizontal: moderateScale(16),
        paddingVertical: moderateScale(12),
        borderTopWidth: 0.5,
    },
    input: {
        flex: 1,
        fontFamily: 'SF-Pro-Display',
        fontSize: moderateScale(14),
        borderRadius: moderateScale(20),
        paddingHorizontal: moderateScale(16),
        paddingVertical: moderateScale(10),
        maxHeight: moderateScale(100),
    },
    sendBtn: {
        width: moderateScale(38),
        height: moderateScale(38),
        borderRadius: moderateScale(19),
        alignItems: 'center',
        justifyContent: 'center',
    },
    closureBtnRow: {
        flexDirection: 'row',
        gap: moderateScale(8),
        marginTop: moderateScale(10),
    },
    closurePillBtn: {
        borderWidth: 1,
        borderRadius: moderateScale(18),
        paddingVertical: moderateScale(8),
        paddingHorizontal: moderateScale(12),
    },
    closurePillBtnText: {
        fontFamily: 'SF-Pro-Display',
        fontSize: moderateScale(12.5),
        fontWeight: '600',
    },
});