import { create } from 'zustand';
import axios from 'axios';

interface ActivityStore {
    activities: any[];
    loading: boolean;
    error: string | null;
    fetchUserActivities: (profileDocumentId: string) => Promise<void>;
}

export const useActivityStore = create<ActivityStore>((set) => ({
    activities: [],
    loading: false,
    error: null,

    fetchUserActivities: async (profileDocumentId) => {
        try {
            set({ loading: true, error: null });

            const response = await axios.get(
                `${process.env.EXPO_PUBLIC_API_URL}/user-activities?profileDocumentId=${profileDocumentId}`
            );

            set({
                activities: response.data?.data?.data ?? [],
                loading: false,
            });
        } catch (error: any) {
            console.log('FETCH USER ACTIVITIES ERROR:', error);
            set({ loading: false, error: error.message });
        }
    },
}));