import { create } from 'zustand';
import axios from 'axios';

export type ContactPayload = {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    subject: string;
    message: string;
};

export type TicketSummary = {
    id: string;
    subject: string;
    preview: string;
    time: string;
    status: 'open' | 'resolved';
    replyCount: number;
};

export type TicketReply = {
    id: string;
    sender: 'user' | 'support';
    text: string;
    time: string;
};

export type TicketSubmission = {
    id: string;
    subject: string;
    message: string;
    time: string;
    status: 'open' | 'resolved';
    replies: TicketReply[];
};

type ContactStore = {
    submitting: boolean;
    error: string | null;
    success: boolean;


    tickets: TicketSummary[];
    selectedTicket: TicketSubmission | null;

    loadingTickets: boolean;
    loadingTicket: boolean;
    sendingReply: boolean;

    submitContact: (payload: ContactPayload) => Promise<boolean>;

    fetchTickets: (email: string) => Promise<void>;

    fetchTicketMessages: (
        ticketId: string,
        email: string
    ) => Promise<void>;

    sendReply: (
        ticketId: string,
        payload: {
            email: string;
            message: string;
            senderName: string;
            senderUid?: string;
        }
    ) => Promise<boolean>;
    resetContactState: () => void;
};

const CONTACT_API_BASE_URL = (process.env.EXPO_PUBLIC_API_URL ?? '').replace(/\/mobile\/?$/, '/web');

const formatTicketTime = (dateString?: string | null): string => {
    if (!dateString) return '';

    const date = new Date(dateString);
    const now = new Date();

    const isToday =
        date.getDate() === now.getDate() &&
        date.getMonth() === now.getMonth() &&
        date.getFullYear() === now.getFullYear();

    if (isToday) {
        return date.toLocaleTimeString([], {
            hour: 'numeric',
            minute: '2-digit',
        });
    }

    return date.toLocaleDateString([], {
        day: 'numeric',
        month: 'short',
    });
};

export const useContactStore = create<ContactStore>((set) => ({
    submitting: false,
    error: null,
    success: false,

    tickets: [],
    selectedTicket: null,

    loadingTickets: false,
    loadingTicket: false,
    sendingReply: false,

    submitContact: async (payload) => {
        set({ submitting: true, error: null, success: false });
        try {
            await axios.post(
                `${CONTACT_API_BASE_URL}/contact-us`,
                payload
            );

            set({ submitting: false, success: true });
            return true;
        } catch (error: any) {
            console.log('CONTACT_SUBMIT_ERROR', error?.response?.data || error);
            set({
                submitting: false,
                error: error?.response?.data?.message || 'Something went wrong. Please try again.',
            });
            return false;
        }
    },

    // --------------------------------
    // GET USER TICKETS
    // --------------------------------
    fetchTickets: async (email) => {
        set({
            loadingTickets: true,
            error: null,
        });

        try {
            const response = await axios.get(
                `${CONTACT_API_BASE_URL}/contact-us/user/tickets`,
                {
                    params: {
                        email,
                        page: 1,
                        pageSize: 10,
                    },
                }
            );

            console.log('GET TICKETS RESPONSE:', response);
            console.log('GET TICKETS DATA:', response.data);

            const apiTickets = response.data?.data ?? [];

            const tickets: TicketSummary[] = apiTickets.map((ticket: any) => ({
                id: ticket.documentId,

                subject: ticket.Subject ?? '',

                preview: ticket.Message ?? '',

                time: formatTicketTime(ticket.LastMessageAt),

                status:
                    ticket.TicketStatus?.toUpperCase() === 'RESOLVED'
                        ? 'resolved'
                        : 'open',

                replyCount: 0,
            }));

            set({
                tickets,
                loadingTickets: false,
            });
        } catch (error: any) {
            console.log(
                'FETCH_TICKETS_ERROR',
                error?.response?.data || error
            );

            set({
                loadingTickets: false,
                error:
                    error?.response?.data?.message ||
                    'Unable to load your tickets.',
            });
        }
    },

    // --------------------------------
    // GET TICKET MESSAGES
    // --------------------------------
    fetchTicketMessages: async (ticketId, email) => {
        set({
            loadingTicket: true,
            error: null,
        });

        try {
            const response = await axios.get(
                `${CONTACT_API_BASE_URL}/contact-us/user/tickets/${ticketId}/messages`,
                {
                    params: {
                        email,
                    },
                }
            );

            console.log(
                'TICKET_MESSAGES_RESPONSE',
                response.data
            );

            const data = response.data?.data;

            const replies: TicketReply[] = (
                data?.messages ?? []
            ).map((reply: any) => ({
                id: String(reply.id),

                sender:
                    reply.SenderType?.toUpperCase() === 'ADMIN'
                        ? 'support'
                        : 'user',

                text: reply.Message ?? '',

                time: formatTicketTime(reply.SentAt),
            }));

            const submission: TicketSubmission = {
                id: data?.documentId ?? ticketId,

                subject: data?.Subject ?? '',

                message: data?.Message ?? '',

                time: formatTicketTime(
                    data?.SubmittedAt
                ),

                status:
                    data?.TicketStatus?.toUpperCase() ===
                        'RESOLVED'
                        ? 'resolved'
                        : 'open',

                replies,
            };

            set({
                selectedTicket: submission,
                loadingTicket: false,
            });
        } catch (error: any) {
            console.log(
                'FETCH_TICKET_MESSAGES_ERROR',
                error?.response?.data || error
            );

            set({
                loadingTicket: false,
                error:
                    error?.response?.data?.message ||
                    'Unable to load this ticket.',
            });
        }
    },

    // --------------------------------
    // SEND TICKET REPLY
    // --------------------------------
    sendReply: async (ticketId, payload) => {
        set({
            sendingReply: true,
            error: null,
        });

        try {
            await axios.post(
                `${CONTACT_API_BASE_URL}/contact-us/user/tickets/${ticketId}/reply`,
                payload
            );

            set({
                sendingReply: false,
            });

            return true;
        } catch (error: any) {
            console.log(
                'SEND_REPLY_ERROR',
                error?.response?.data || error
            );

            set({
                sendingReply: false,
                error:
                    error?.response?.data?.message ||
                    'Unable to send your reply.',
            });

            return false;
        }
    },


    resetContactState: () => set({ submitting: false, error: null, success: false }),
}));