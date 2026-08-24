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

type ContactStore = {
    submitting: boolean;
    error: string | null;
    success: boolean;
    submitContact: (payload: ContactPayload) => Promise<boolean>;
    resetContactState: () => void;
};

const CONTACT_API_BASE_URL = (process.env.EXPO_PUBLIC_API_URL ?? '').replace(/\/mobile\/?$/, '/web');

export const useContactStore = create<ContactStore>((set) => ({
    submitting: false,
    error: null,
    success: false,

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

    resetContactState: () => set({ submitting: false, error: null, success: false }),
}));