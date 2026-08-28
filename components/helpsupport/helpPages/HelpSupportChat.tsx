import React, { useEffect, useRef, useState } from 'react';
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
    subQuestions?: FAQItem[];
}

// const FAQ_ITEMS: FAQItem[] = [
//     {
//         id: 'reset-password',
//         question: 'How do I reset my password?',
//         answer:
//             'Go to the Login screen and tap "Forgot Password?" You\'ll receive a code by email to set a new password.',
//         keywords: ['password', 'reset', 'forgot', 'login'],
//         subQuestions: [
//             {
//                 id: 'reset-password-refund',
//                 question: 'Will I get a refund if I cancel early?',
//                 answer:
//                     'Refunds depend on your billing cycle — if you cancel mid-cycle, you\'ll keep access until the period ends, but partial refunds aren\'t issued automatically. Contact Email Support for exceptions.',
//                 keywords: ['refund'],
//             },
//             {
//                 id: 'reset-password-resubscribe',
//                 question: 'Can I resubscribe later?',
//                 answer:
//                     'Yes — you can resubscribe anytime from Profile → Subscription. Your saved sessions and progress will still be there.',
//                 keywords: ['resubscribe', 'rejoin'],
//             },
//         ],
//     },

//     {
//         id: 'cancel-subscription',
//         question: 'How do I cancel my subscription?',
//         answer:
//             'Go to Profile → Subscription, and tap "Manage Subscription." You can cancel anytime before your next billing date.',
//         keywords: ['cancel', 'subscription', 'billing', 'premium'],
//         subQuestions: [
//             {
//                 id: 'cancel-subscription-refund',
//                 question: 'Will I get a refund if I cancel early?',
//                 answer:
//                     'Refunds depend on your billing cycle — if you cancel mid-cycle, you\'ll keep access until the period ends, but partial refunds aren\'t issued automatically. Contact Email Support for exceptions.',
//                 keywords: ['refund'],
//             },
//             {
//                 id: 'cancel-subscription-resubscribe',
//                 question: 'Can I resubscribe later?',
//                 answer:
//                     'Yes — you can resubscribe anytime from Profile → Subscription. Your saved sessions and progress will still be there.',
//                 keywords: ['resubscribe', 'rejoin'],
//             },
//         ],
//     },

//     {
//         id: 'download-sessions',
//         question: 'Can I download sessions for offline use?',
//         answer:
//             'Yes — open any session and tap the Download icon in the toolbar. Downloaded sessions appear in your Library for offline playback.',
//         keywords: ['download', 'offline'],
//     },

//     {
//         id: 'sync-devices',
//         question: 'Does my progress sync across devices?',
//         answer:
//             'Yes, as long as you\'re logged into the same account, your saved sessions and progress sync automatically.',
//         keywords: ['sync', 'device', 'progress'],
//     },

//     {
//         id: 'contact-human',
//         question: 'I need to talk to a real person',
//         answer:
//             "I'm just a quick-answer bot for now! For anything else, please use Email Support or Call Support from the Help & Support screen.",
//         keywords: ['human', 'agent', 'person', 'real'],
//     },
// ];
const FAQ_ITEMS: FAQItem[] = [
    {
        id: 'reset-password',
        question: 'How do I reset my password?',
        answer:
            'Go to the Login screen and tap "Forgot Password?" You\'ll receive a verification code by email to set a new password.',
        keywords: ['password', 'reset', 'forgot', 'login'],
        subQuestions: [
            {
                id: 'reset-password-not-receiving-code',
                question: 'What if I do not receive the password reset code?',
                answer:
                    'Please check your spam or junk folder first. Make sure you entered the email address associated with your Mudras account. If you still do not receive the code, wait a few minutes and try requesting a new code.',
                keywords: [
                    'code',
                    'email',
                    'verification',
                    'not received',
                    'otp',
                ],
            },
            {
                id: 'reset-password-expired-code',
                question: 'What if my password reset code has expired?',
                answer:
                    'Password reset codes are valid for a limited time. If your code has expired, go back to the Forgot Password screen and request a new code.',
                keywords: [
                    'expired',
                    'code',
                    'password',
                    'reset',
                ],
            },
            {
                id: 'reset-password-email',
                question: 'What if I no longer have access to my registered email?',
                answer:
                    'If you no longer have access to the email address linked to your account, please contact Support so we can help you recover access to your account.',
                keywords: [
                    'email',
                    'access',
                    'account',
                    'recover',
                ],
            },
        ],
    },

    {
        id: 'cancel-subscription',
        question: 'How do I cancel my subscription?',
        answer:
            'Go to Profile → Subscription and tap "Manage Subscription." You can cancel your subscription anytime before your next billing date.',
        keywords: [
            'cancel',
            'subscription',
            'billing',
            'premium',
        ],
        subQuestions: [
            {
                id: 'cancel-subscription-when',
                question: 'When should I cancel my subscription?',
                answer:
                    'You can cancel your subscription at any time. To avoid your next renewal charge, make sure you cancel before your next billing date.',
                keywords: [
                    'when',
                    'cancel',
                    'renewal',
                    'billing date',
                ],
            },
            {
                id: 'cancel-subscription-access',
                question: 'Will I still have access after cancelling?',
                answer:
                    'Yes. After cancelling, you can continue using your subscription benefits until the end of your current billing period.',
                keywords: [
                    'access',
                    'cancel',
                    'subscription',
                    'billing period',
                ],
            },
            {
                id: 'cancel-subscription-resubscribe',
                question: 'Can I subscribe again after cancelling?',
                answer:
                    'Yes. You can resubscribe at any time from Profile → Subscription. Your account and saved progress will remain available.',
                keywords: [
                    'resubscribe',
                    'subscribe',
                    'cancel',
                    'subscription',
                ],
            },
        ],
    },

    {
        id: 'download-sessions',
        question: 'Can I download sessions for offline use?',
        answer:
            'Yes. Open a supported session and tap the Download icon. Once downloaded, the session will be available in your Library for offline playback.',
        keywords: [
            'download',
            'offline',
            'session',
            'save',
        ],
        subQuestions: [
            {
                id: 'download-sessions-where',
                question: 'Where can I find my downloaded sessions?',
                answer:
                    'Your downloaded sessions can be found in your Library. Open the Library and look for the downloaded content section.',
                keywords: [
                    'where',
                    'download',
                    'library',
                ],
            },
            {
                id: 'download-sessions-delete',
                question: 'Can I remove a downloaded session?',
                answer:
                    'Yes. You can remove downloaded sessions from your Library to free up storage space on your device.',
                keywords: [
                    'remove',
                    'delete',
                    'download',
                    'storage',
                ],
            },
            {
                id: 'download-sessions-internet',
                question: 'Do I need an internet connection to play downloaded sessions?',
                answer:
                    'No. Once a session has been successfully downloaded, you can play it without an active internet connection.',
                keywords: [
                    'internet',
                    'offline',
                    'download',
                    'play',
                ],
            },
        ],
    },

    {
        id: 'sync-devices',
        question: 'Does my progress sync across devices?',
        answer:
            'Yes. When you log in with the same account on another device, your saved sessions and progress can sync automatically.',
        keywords: [
            'sync',
            'device',
            'progress',
            'account',
        ],
        subQuestions: [
            {
                id: 'sync-devices-same-account',
                question: 'Do I need to use the same account on both devices?',
                answer:
                    'Yes. You need to log in with the same Mudras account on both devices for your saved sessions and progress to sync.',
                keywords: [
                    'same account',
                    'account',
                    'device',
                    'sync',
                ],
            },
            {
                id: 'sync-devices-not-updating',
                question: 'What should I do if my progress is not syncing?',
                answer:
                    'First, make sure you are logged into the same account on both devices and have an active internet connection. You can also close and reopen the app and check again.',
                keywords: [
                    'not syncing',
                    'sync',
                    'progress',
                    'update',
                ],
            },
            {
                id: 'sync-devices-new-device',
                question: 'Will my saved sessions appear on a new device?',
                answer:
                    'Yes. If you sign in with the same account, your saved sessions and synced progress should be available on your new device.',
                keywords: [
                    'new device',
                    'saved',
                    'sessions',
                    'sync',
                ],
            },
        ],
    },

    {
        id: 'contact-human',
        question: 'I need to talk to a real person',
        answer:
            'Our support assistant can help with common questions. If you need additional assistance, you can contact our support team through Email Support or Call Support from the Help & Support screen.',
        keywords: [
            'human',
            'agent',
            'person',
            'real',
            'support',
            'help',
        ],
        subQuestions: [
            {
                id: 'contact-human-email',
                question: 'How can I contact support by email?',
                answer:
                    'Open the Help & Support screen and select Email Support. You can send your question or issue directly to our support team.',
                keywords: [
                    'email',
                    'support',
                    'contact',
                ],
            },
            {
                id: 'contact-human-call',
                question: 'Can I call the support team?',
                answer:
                    'Yes. Open the Help & Support screen and select Call Support to contact the support team by phone.',
                keywords: [
                    'call',
                    'phone',
                    'support',
                ],
            },
            {
                id: 'contact-human-response',
                question: 'How long does it take to get a response?',
                answer:
                    'Response times can vary depending on the type of request and support availability. Our support team will respond as soon as possible.',
                keywords: [
                    'response',
                    'reply',
                    'support',
                    'time',
                ],
            },
        ],
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

const BotAvatar = ({
    color,
    icon = 'sparkles',
}: {
    color: string;
    icon?: keyof typeof Ionicons.glyphMap;
}) => {
    return (
        <View
            style={[
                styles.avatar,
                {
                    backgroundColor: color,
                },
            ]}
        >
            <Ionicons
                name={icon}
                size={14}
                color="#FFFFFF"
            />
        </View>
    );
};

const UserAvatar = ({
    color,
    textColor,
}: {
    color: string;
    textColor: string;
}) => {
    return (
        <View
            style={[
                styles.avatar,
                {
                    backgroundColor: color,
                },
            ]}
        >
            <Ionicons
                name="person"
                size={13}
                color={textColor}
            />
        </View>
    );
};

const TypingIndicator = ({
    bubbleColor,
    dotColor,
}: {
    bubbleColor: string;
    dotColor: string;
}) => {
    const dot1 = useRef(new Animated.Value(0)).current;
    const dot2 = useRef(new Animated.Value(0)).current;
    const dot3 = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const animations = [
            { dot: dot1, delay: 0 },
            { dot: dot2, delay: 130 },
            { dot: dot3, delay: 260 },
        ];

        const animationLoops = animations.map(
            ({ dot, delay }) =>
                Animated.loop(
                    Animated.sequence([
                        Animated.delay(delay),
                        Animated.timing(dot, {
                            toValue: -4,
                            duration: 260,
                            useNativeDriver: true,
                        }),
                        Animated.timing(dot, {
                            toValue: 0,
                            duration: 260,
                            useNativeDriver: true,
                        }),
                    ])
                )
        );

        animationLoops.forEach((animation) =>
            animation.start()
        );

        return () => {
            animationLoops.forEach((animation) =>
                animation.stop()
            );
        };
    }, [dot1, dot2, dot3]);

    return (
        <View
            style={[
                styles.bubble,
                styles.botBubbleShape,
                {
                    backgroundColor: bubbleColor,
                },
            ]}
        >
            <View style={styles.typingRow}>
                {[dot1, dot2, dot3].map((dot, index) => (
                    <Animated.View
                        key={index}
                        style={[
                            styles.typingDot,
                            {
                                backgroundColor: dotColor,
                                transform: [
                                    {
                                        translateY: dot,
                                    },
                                ],
                            },
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
    const [showEntryPrompt, setShowEntryPrompt] =
        useState(!isLoggedIn);

    const uid = isLoggedIn
        ? user?.FirebaseUid ?? null
        : guestMode
            ? anonUid
            : null;

    const [messages, setMessages] = useState<Message[]>(
        []
    );

    const [input, setInput] = useState('');

    const [isBotTyping, setIsBotTyping] =
        useState(false);

    const scrollRef = useRef<ScrollView>(null);

    const [
        assignedToName,
        setAssignedToName,
    ] = useState<string | null>(null);

    const [
        showClosurePrompt,
        setShowClosurePrompt,
    ] = useState(false);

    const [
        conversationEnded,
        setConversationEnded,
    ] = useState(false);

    const [
        wantsMoreHelp,
        setWantsMoreHelp,
    ] = useState(false);

    const [
        activeQuestionList,
        setActiveQuestionList,
    ] = useState<FAQItem[]>(FAQ_ITEMS);

    const botTimeoutsRef = useRef<
        ReturnType<typeof setTimeout>[]
    >([]);

    useEffect(() => {
        if (isLoggedIn) {
            setShowEntryPrompt(false);
            setGuestMode(false);
        }
    }, [isLoggedIn]);

    useEffect(() => {
        return () => {
            botTimeoutsRef.current.forEach((timeoutId) => {
                clearTimeout(timeoutId);
            });

            botTimeoutsRef.current = [];
        };
    }, []);

    useEffect(() => {
        if (!uid) {
            return;
        }

        const chatDocRef = doc(
            db,
            'supportChats',
            uid
        );

        getDoc(chatDocRef)
            .then((snapshot) => {
                if (!snapshot.exists()) {
                    return setDoc(chatDocRef, {
                        name:
                            user?.fullName ||
                            user?.username ||
                            null,
                        isGuest: !isLoggedIn,
                        assignmentStatus:
                            'unassigned',
                        assignedTo: null,
                        assignedToName: null,
                    });
                }

                return setDoc(
                    chatDocRef,
                    {
                        name:
                            user?.fullName ||
                            user?.username ||
                            null,
                        isGuest: !isLoggedIn,
                    },
                    {
                        merge: true,
                    }
                );
            })
            .catch((err) => {
                console.log(
                    'Chat document error:',
                    err
                );
            });

        const messagesRef = collection(
            db,
            'supportChats',
            uid,
            'messages'
        );

        const messagesQuery = query(
            messagesRef,
            orderBy('timestamp', 'asc')
        );

        const unsubscribeSnapshot =
            onSnapshot(
                messagesQuery,
                (snapshot) => {
                    const loaded: Message[] =
                        snapshot.docs.map(
                            (docSnap) => {
                                const data =
                                    docSnap.data();

                                return {
                                    id: docSnap.id,
                                    sender:
                                        data.sender,
                                    text:
                                        data.text,
                                    timestamp:
                                        data.timestamp ??
                                        null,
                                };
                            }
                        );

                    if (loaded.length === 0) {
                        addDoc(messagesRef, {
                            sender: 'bot',
                            text:
                                "Hi! I'm the Mudras support assistant. Pick a question below, or type your own.",
                            timestamp:
                                serverTimestamp(),
                        }).catch((err) => {
                            console.log(
                                'Seed greeting error:',
                                err
                            );
                        });

                        return;
                    }

                    setMessages(loaded);

                    setTimeout(() => {
                        scrollRef.current?.scrollToEnd(
                            {
                                animated: true,
                            }
                        );
                    }, 100);
                },
                (error) => {
                    console.log(
                        'Firestore listener error:',
                        error
                    );
                }
            );

        return () => {
            unsubscribeSnapshot();
        };
    }, [uid, user?.fullName, user?.username, isLoggedIn]);

    useEffect(() => {
        if (!uid) {
            return;
        }

        const chatDocRef = doc(
            db,
            'supportChats',
            uid
        );

        const unsubscribe = onSnapshot(
            chatDocRef,
            (snapshot) => {
                setAssignedToName(
                    snapshot.data()?.assignedToName ??
                    null
                );
            }
        );

        return () => {
            unsubscribe();
        };
    }, [uid]);

    const scrollToBottom = () => {
        setTimeout(() => {
            scrollRef.current?.scrollToEnd({
                animated: true,
            });
        }, 100);
    };

    const writeMessage = async (
        sender: 'bot' | 'user',
        text: string
    ) => {
        if (!uid) {
            return;
        }

        const messagesRef = collection(
            db,
            'supportChats',
            uid,
            'messages'
        );

        await addDoc(messagesRef, {
            sender,
            text,
            timestamp: serverTimestamp(),
        });

        await setDoc(
            doc(db, 'supportChats', uid),
            {
                lastMessage: text,
                lastMessageAt:
                    serverTimestamp(),
                lastMessageSender: sender,
            },
            {
                merge: true,
            }
        );
    };

    const respondAsBot = (text: string) => {
        setIsBotTyping(true);
        scrollToBottom();

        const delay =
            500 + Math.random() * 400;

        const timeoutId = setTimeout(() => {
            botTimeoutsRef.current =
                botTimeoutsRef.current.filter(
                    (id) => id !== timeoutId
                );

            setIsBotTyping(false);

            writeMessage('bot', text)
                .then(() => {
                    setShowClosurePrompt(true);
                    scrollToBottom();
                })
                .catch((err) => {
                    console.log(
                        'Bot reply write error:',
                        err
                    );
                });
        }, delay);

        botTimeoutsRef.current.push(timeoutId);
    };

    const findFAQByKeyword = (
        faqList: FAQItem[],
        searchText: string
    ): FAQItem | null => {
        const lowerText =
            searchText.toLowerCase();

        for (const faq of faqList) {
            const matched =
                faq.keywords.some((keyword) =>
                    lowerText.includes(
                        keyword.toLowerCase()
                    )
                );

            if (matched) {
                return faq;
            }

            if (
                faq.subQuestions &&
                faq.subQuestions.length > 0
            ) {
                const nestedMatch =
                    findFAQByKeyword(
                        faq.subQuestions,
                        searchText
                    );

                if (nestedMatch) {
                    return nestedMatch;
                }
            }
        }

        return null;
    };

    const handleQuickReply = (
        faq: FAQItem
    ) => {
        setWantsMoreHelp(false);
        setShowClosurePrompt(false);

        writeMessage(
            'user',
            faq.question
        ).catch((err) => {
            console.log(
                'User message write error:',
                err
            );
        });

        if (hasHumanJoined) {
            return;
        }

        if (
            faq.subQuestions &&
            faq.subQuestions.length > 0
        ) {
            setIsBotTyping(true);
            scrollToBottom();

            const delay =
                500 + Math.random() * 400;

            const timeoutId = setTimeout(() => {
                botTimeoutsRef.current =
                    botTimeoutsRef.current.filter(
                        (id) => id !== timeoutId
                    );

                setIsBotTyping(false);

                writeMessage(
                    'bot',
                    faq.answer
                )
                    .then(() => {
                        setActiveQuestionList(
                            faq.subQuestions!
                        );

                        setWantsMoreHelp(true);

                        scrollToBottom();
                    })
                    .catch((err) => {
                        console.log(
                            'Bot reply write error:',
                            err
                        );
                    });
            }, delay);

            botTimeoutsRef.current.push(
                timeoutId
            );

            return;
        }

        respondAsBot(faq.answer);
    };

    const handleSend = () => {
        const trimmed =
            input.trim();

        if (!trimmed) {
            return;
        }

        setWantsMoreHelp(false);
        setShowClosurePrompt(false);

        setActiveQuestionList(
            FAQ_ITEMS
        );

        writeMessage(
            'user',
            trimmed
        ).catch((err) => {
            console.log(
                'User message write error:',
                err
            );
        });

        setInput('');

        if (hasHumanJoined) {
            return;
        }

        const match =
            findFAQByKeyword(
                FAQ_ITEMS,
                trimmed
            );

        respondAsBot(
            match
                ? match.answer
                : FALLBACK_ANSWER
        );
    };

    const handleChooseLogin = () => {
        router.push({
            pathname: '/auth/login',
            params: {
                redirect: '/chat',
            },
        });
    };

    const handleChooseGuest = () => {
        setGuestMode(true);
        setShowEntryPrompt(false);
    };

    const handleClosureDone = () => {
        setShowClosurePrompt(false);
        setConversationEnded(true);

        writeMessage(
            'user',
            'Got it, thanks!'
        ).catch((err) => {
            console.log(
                'Closure message error:',
                err
            );
        });

        if (!uid) {
            return;
        }

        setDoc(
            doc(
                db,
                'supportChats',
                uid
            ),
            {
                queryResolved: true,
                queryResolvedAt:
                    serverTimestamp(),
            },
            {
                merge: true,
            }
        ).catch((err) => {
            console.log(
                'Resolve flag error:',
                err
            );
        });
    };

    const handleClosureContinue = () => {
        setShowClosurePrompt(false);
        setConversationEnded(false);
        setWantsMoreHelp(true);
        setActiveQuestionList(
            FAQ_ITEMS
        );

        scrollToBottom();
    };

    const hasHumanJoined =
        messages.some(
            (message) =>
                message.sender === 'admin'
        );

    const hasUserMessage =
        messages.some(
            (message) =>
                message.sender === 'user'
        );

    /*
     * Initial state:
     * show main FAQ questions.
     *
     * After parent question:
     * wantsMoreHelp = true
     * activeQuestionList = subQuestions
     *
     * After Need further help:
     * wantsMoreHelp = true
     * activeQuestionList = FAQ_ITEMS
     */
    const showSuggestions =
        !showEntryPrompt &&
        !conversationEnded &&
        activeQuestionList.length > 0 &&
        (
            wantsMoreHelp ||
            !hasUserMessage
        );

    return (
        <KeyboardAvoidingView
            style={[
                styles.container,
                {
                    backgroundColor:
                        colors.background,
                },
            ]}
            behavior={
                Platform.OS === 'ios'
                    ? 'padding'
                    : 'height'
            }
        >
            <AppHeader />

            <View
                style={
                    styles.headerBlock
                }
            >
                <Text
                    style={[
                        styles.pageTitle,
                        {
                            color:
                                colors.text,
                        },
                    ]}
                >
                    Live Chat
                </Text>

                <View
                    style={
                        styles.statusRow
                    }
                >
                    <View
                        style={
                            styles.statusDot
                        }
                    />

                    <Text
                        style={[
                            styles.statusText,
                            {
                                color:
                                    colors.textSub,
                            },
                        ]}
                    >
                        {assignedToName
                            ? `Connected with ${assignedToName}`
                            : 'Instant answers · Always online'}
                    </Text>
                </View>
            </View>

            <ScrollView
                ref={scrollRef}
                style={
                    styles.messagesScroll
                }
                contentContainerStyle={
                    styles.messagesContent
                }
                showsVerticalScrollIndicator={
                    false
                }
            >
                {showEntryPrompt && (
                    <View
                        style={[
                            styles.bubbleRow,
                            styles.bubbleRowBot,
                        ]}
                    >
                        <BotAvatar
                            color={
                                colors.primary
                            }
                        />

                        <View
                            style={[
                                styles.bubble,
                                styles.botBubbleShape,
                                {
                                    backgroundColor:
                                        colors.surfaceAlt,
                                    maxWidth:
                                        '80%',
                                },
                            ]}
                        >
                            <Text
                                style={[
                                    styles.bubbleText,
                                    {
                                        color:
                                            colors.text,
                                    },
                                ]}
                            >
                                Welcome to Mudras Support!
                                {'\n'}
                                For a better experience, we recommend you log in and relaunch chat.
                            </Text>

                            <TouchableOpacity
                                style={[
                                    styles.promptBtn,
                                    {
                                        borderColor:
                                            colors.primary,
                                    },
                                ]}
                                activeOpacity={
                                    0.7
                                }
                                onPress={
                                    handleChooseLogin
                                }
                            >
                                <Text
                                    style={[
                                        styles.promptBtnText,
                                        {
                                            color:
                                                colors.primary,
                                        },
                                    ]}
                                >
                                    I would like to proceed with the login
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[
                                    styles.promptBtn,
                                    {
                                        borderColor:
                                            colors.dividerDark,
                                        marginTop:
                                            moderateScale(
                                                8
                                            ),
                                    },
                                ]}
                                activeOpacity={
                                    0.7
                                }
                                onPress={
                                    handleChooseGuest
                                }
                            >
                                <Text
                                    style={[
                                        styles.promptBtnText,
                                        {
                                            color:
                                                colors.textSub,
                                        },
                                    ]}
                                >
                                    Proceed without logging in
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}

                {!showEntryPrompt &&
                    messages.map(
                        (msg) => (
                            <View
                                key={
                                    msg.id
                                }
                                style={[
                                    styles.bubbleRow,
                                    msg.sender ===
                                        'user'
                                        ? styles.bubbleRowUser
                                        : styles.bubbleRowBot,
                                ]}
                            >
                                {(msg.sender ===
                                    'bot' ||
                                    msg.sender ===
                                    'admin') && (
                                        <BotAvatar
                                            color={
                                                colors.primary
                                            }
                                            icon={
                                                msg.sender ===
                                                    'admin'
                                                    ? 'headset'
                                                    : 'sparkles'
                                            }
                                        />
                                    )}

                                <View
                                    style={[
                                        styles.bubble,
                                        msg.sender ===
                                            'user'
                                            ? [
                                                styles.userBubbleShape,
                                                {
                                                    backgroundColor:
                                                        colors.primary,
                                                },
                                            ]
                                            : [
                                                styles.botBubbleShape,
                                                {
                                                    backgroundColor:
                                                        colors.surfaceAlt,
                                                },
                                            ],
                                    ]}
                                >
                                    <Text
                                        style={[
                                            styles.bubbleText,
                                            {
                                                color:
                                                    msg.sender ===
                                                        'user'
                                                        ? '#FFFFFF'
                                                        : colors.text,
                                            },
                                        ]}
                                    >
                                        {
                                            msg.text
                                        }
                                    </Text>
                                </View>

                                {msg.sender ===
                                    'user' && (
                                        <UserAvatar
                                            color={
                                                colors.primaryLight
                                            }
                                            textColor={
                                                colors.primary as string
                                            }
                                        />
                                    )}
                            </View>
                        )
                    )}

                {isBotTyping &&
                    !showEntryPrompt && (
                        <View
                            style={[
                                styles.bubbleRow,
                                styles.bubbleRowBot,
                            ]}
                        >
                            <BotAvatar
                                color={
                                    colors.primary
                                }
                            />

                            <TypingIndicator
                                bubbleColor={
                                    colors.surfaceAlt
                                }
                                dotColor={
                                    colors.textMuted as string
                                }
                            />
                        </View>
                    )}

                {!showEntryPrompt &&
                    showClosurePrompt &&
                    !conversationEnded && (
                        <View
                            style={[
                                styles.bubbleRow,
                                styles.bubbleRowBot,
                            ]}
                        >
                            <BotAvatar
                                color={
                                    colors.primary
                                }
                            />

                            <View
                                style={[
                                    styles.bubble,
                                    styles.botBubbleShape,
                                    {
                                        backgroundColor:
                                            colors.surfaceAlt,
                                        maxWidth:
                                            '80%',
                                    },
                                ]}
                            >
                                <Text
                                    style={[
                                        styles.bubbleText,
                                        {
                                            color:
                                                colors.text,
                                        },
                                    ]}
                                >
                                    Is there anything else we may help you with today?
                                </Text>

                                <View
                                    style={
                                        styles.closureBtnRow
                                    }
                                >
                                    <TouchableOpacity
                                        style={[
                                            styles.closurePillBtn,
                                            {
                                                borderColor:
                                                    colors.primary,
                                            },
                                        ]}
                                        activeOpacity={
                                            0.7
                                        }
                                        onPress={
                                            handleClosureDone
                                        }
                                    >
                                        <Text
                                            style={[
                                                styles.closurePillBtnText,
                                                {
                                                    color:
                                                        colors.primary,
                                                },
                                            ]}
                                        >
                                            Got it, thanks!
                                        </Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={[
                                            styles.closurePillBtn,
                                            {
                                                borderColor:
                                                    colors.primary,
                                            },
                                        ]}
                                        activeOpacity={
                                            0.7
                                        }
                                        onPress={
                                            handleClosureContinue
                                        }
                                    >
                                        <Text
                                            style={[
                                                styles.closurePillBtnText,
                                                {
                                                    color:
                                                        colors.primary,
                                                },
                                            ]}
                                        >
                                            Need further help
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    )}

                {showSuggestions && (
                    <View
                        style={
                            styles.suggestionsWrap
                        }
                    >
                        <Text
                            style={[
                                styles.suggestionsLabel,
                                {
                                    color:
                                        colors.textMuted,
                                },
                            ]}
                        >
                            SUGGESTED QUESTIONS
                        </Text>

                        {activeQuestionList.map(
                            (faq) => (
                                <TouchableOpacity
                                    key={
                                        faq.id
                                    }
                                    style={[
                                        styles.suggestionCard,
                                        {
                                            borderColor:
                                                colors.dividerDark,
                                            backgroundColor:
                                                colors.card,
                                        },
                                    ]}
                                    activeOpacity={
                                        0.7
                                    }
                                    onPress={() =>
                                        handleQuickReply(
                                            faq
                                        )
                                    }
                                >
                                    <Text
                                        style={[
                                            styles.suggestionText,
                                            {
                                                color:
                                                    colors.text,
                                            },
                                        ]}
                                    >
                                        {
                                            faq.question
                                        }
                                    </Text>

                                    <Ionicons
                                        name="chevron-forward"
                                        size={
                                            16
                                        }
                                        color={
                                            colors.textMuted as string
                                        }
                                    />
                                </TouchableOpacity>
                            )
                        )}
                    </View>
                )}
            </ScrollView>

            {!showEntryPrompt &&
                !conversationEnded && (
                    <View
                        style={[
                            styles.inputRow,
                            {
                                borderTopColor:
                                    colors.dividerDark,
                                backgroundColor:
                                    colors.background,
                            },
                        ]}
                    >
                        <TextInput
                            value={
                                input
                            }
                            onChangeText={
                                setInput
                            }
                            placeholder="Type a message..."
                            placeholderTextColor={
                                colors.textMuted
                            }
                            style={[
                                styles.input,
                                {
                                    color:
                                        colors.text,
                                    backgroundColor:
                                        colors.inputBg,
                                },
                            ]}
                            returnKeyType="send"
                            onSubmitEditing={
                                handleSend
                            }
                            multiline
                        />

                        <TouchableOpacity
                            onPress={
                                handleSend
                            }
                            disabled={
                                !input.trim()
                            }
                            activeOpacity={
                                0.85
                            }
                            style={[
                                styles.sendBtn,
                                {
                                    backgroundColor:
                                        input.trim()
                                            ? colors.primary
                                            : colors.dividerDark,
                                },
                            ]}
                        >
                            <Ionicons
                                name="arrow-up"
                                size={
                                    18
                                }
                                color="#FFFFFF"
                            />
                        </TouchableOpacity>
                    </View>
                )}
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

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

    messagesScroll: {
        flex: 1,
    },

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

    bubbleRowBot: {
        justifyContent: 'flex-start',
    },

    bubbleRowUser: {
        justifyContent: 'flex-end',
    },

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
        shadowOffset: {
            width: 0,
            height: 1,
        },
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

    typingDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
    },

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