
import { create } from 'zustand';
import axios from 'axios';

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL;

export type SubscriptionPlan = {
    id: number;
    documentId: string;
    Name: string;
    Code: string;
    PlanType: string;
    BillingType: string;
    Price: number;
    Currency: string;
    TrialEnabled: boolean;
    TrialDays: number;
    IsPopular: boolean;
    Description: string[];
};

type SubscriptionStore = {
    plans: SubscriptionPlan[];
    loadingPlans: boolean;
    plansError: string | null;

    fetchPlans: () => Promise<void>;
};

export const useSubscriptionStore = create<SubscriptionStore>((set) => ({
    plans: [],
    loadingPlans: false,
    plansError: null,

    fetchPlans: async () => {
        set({ loadingPlans: true, plansError: null });

        try {
            const response = await axios.get(
                `${API_BASE_URL}/subscription-plans`
            );

            const data = response.data;

            if (!data.success) {
                throw new Error('Failed to load subscription plans.');
            }

            set({
                plans: (data.data ?? []).sort(
                    (a: SubscriptionPlan, b: any) =>
                        (a as any).SortOrder - (b as any).SortOrder
                ),
                loadingPlans: false,
            });
        } catch (error: any) {
            console.log('FETCH_PLANS_ERROR', error);

            set({
                loadingPlans: false,
                plansError: error?.message || 'Unable to load plans.',
            });
        }
    },
}));