import React, { useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { useTheme } from '@/constants/ThemeContext';
import { getTicketListStyles } from '@/assets/styles/contact/ticketListStyles';
import AppHeader from '@/components/common/AppHeader';

import { useAuthStore } from '@/store/authStore';
import {
    useContactStore,
    TicketSummary,
} from '@/store/contactStore';


export default function TicketListScreen() {
    const { colors } = useTheme();
    const styles = getTicketListStyles(colors);
    const router = useRouter();

    const { user } = useAuthStore();

    const email = user?.email;

    const {
        tickets,
        loadingTickets,
        fetchTickets,
    } = useContactStore();


    useEffect(() => {
        if (!email) return;

        fetchTickets(email);
    }, [email]);


    const handleOpenTicket = (ticketId: string) => {
        router.push({
            pathname: '/ticketdetail',
            params: { ticketId },
        });
    };


    const renderTicket = ({ item }: { item: TicketSummary }) => (
        <TouchableOpacity
            style={styles.ticketCard}
            activeOpacity={0.8}
            onPress={() => handleOpenTicket(item.id)}
        >
            <View
                style={[
                    styles.avatarCircle,
                    {
                        backgroundColor:
                            item.status === 'resolved'
                                ? '#E9FFDB'
                                : '#CBECFF',
                    },
                ]}
            >
                <Ionicons
                    name={
                        item.status === 'resolved'
                            ? 'checkmark-done-outline'
                            : 'chatbubble-ellipses-outline'
                    }
                    size={18}
                    color={
                        item.status === 'resolved'
                            ? '#4CAF7D'
                            : '#5A9BC4'
                    }
                />
            </View>


            <View style={styles.ticketTextBlock}>
                <View style={styles.ticketTopRow}>
                    <Text
                        style={styles.ticketSubject}
                        numberOfLines={1}
                    >
                        {item.subject}
                    </Text>

                    <Text style={styles.ticketTime}>
                        {item.time}
                    </Text>
                </View>


                <Text
                    style={styles.ticketPreview}
                    numberOfLines={2}
                >
                    {item.preview}
                </Text>


                <View style={styles.ticketBottomRow}>
                    <View
                        style={[
                            styles.statusBadge,
                            {
                                backgroundColor:
                                    item.status === 'resolved'
                                        ? '#E9FFDB'
                                        : '#FFF6BF',
                            },
                        ]}
                    >
                        <Text
                            style={[
                                styles.statusBadgeText,
                                {
                                    color:
                                        item.status === 'resolved'
                                            ? '#4CAF7D'
                                            : '#9A8A2E',
                                },
                            ]}
                        >
                            {item.status === 'resolved'
                                ? 'Resolved'
                                : 'Open'}
                        </Text>
                    </View>


                    {item.replyCount > 0 && (
                        <Text style={styles.replyCountText}>
                            {item.replyCount}{' '}
                            {item.replyCount === 1
                                ? 'reply'
                                : 'replies'}
                        </Text>
                    )}
                </View>
            </View>


            <Ionicons
                name="chevron-forward"
                size={18}
                color={colors.textMuted}
            />
        </TouchableOpacity>
    );


    return (
        <View style={styles.container}>
            <AppHeader />


            <View style={styles.headerSection}>
                <Text style={styles.eyebrow}>
                    SUPPORT
                </Text>

                <Text style={styles.heroTitle}>
                    Your Tickets
                </Text>

                <View style={styles.accentBar} />

                <Text style={styles.heroSubtitle}>
                    Track replies to messages you've sent us.
                </Text>
            </View>


            {loadingTickets ? (
                <View style={styles.emptyState}>
                    <ActivityIndicator
                        size="small"
                        color={colors.primary}
                    />

                    <Text style={styles.emptyStateText}>
                        Loading your tickets…
                    </Text>
                </View>
            ) : tickets.length === 0 ? (
                <View style={styles.emptyState}>
                    <Ionicons
                        name="mail-open-outline"
                        size={32}
                        color={colors.textSub}
                    />

                    <Text style={styles.emptyStateText}>
                        You haven't sent us a message yet.
                    </Text>
                </View>
            ) : (
                <FlatList
                    data={tickets}
                    keyExtractor={(item) => item.id}
                    renderItem={renderTicket}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                />
            )}
        </View>
    );
}