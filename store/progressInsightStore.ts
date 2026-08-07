import { create } from 'zustand';
import axios from 'axios';

interface ProgressInsightStore {
  goal: any | null;
  overview: any | null;
  summary: any | null;
  distribution: any |null;
  analytics: any | null;

  loading: boolean;
  error: string | null;

  createGoal: (data: {
    profileDocumentId: string;
    goalType: string;
    goalValue: number;
    resetType: string;
  }) => Promise<void>;

  fetchGoal: (
    profileDocumentId: string
  ) => Promise<void>;

  fetchOverview: (
    profileDocumentId: string
  ) => Promise<void>;

  fetchSummary: (
    profileDocumentId: string,
    types?: string[]
  ) => Promise<void>;

  fetchDistribution: (
    profileDocumentId: string
  ) => Promise<void>;

  fetchAnalytics: (
    profileDocumentId: string
  ) => Promise<void>;

  clearProgressData: () => void;
}

export const useProgressInsightStore =
  create<ProgressInsightStore>((set) => ({
    goal: null,
    overview: null,
    summary: null,
    distribution: null,
    analytics: null,

    loading: false,
    error: null,

    //-------------------------------------
    // Create Goal
    //-------------------------------------

    createGoal: async (data) => {
      try {
        set({
          loading: true,
          error: null,
        });

        await axios.post(
          `${process.env.EXPO_PUBLIC_API_URL}/user-goal`,
          data
        );

        set({
          loading: false,
        });
      } catch (error: any) {
        console.log(
          'CREATE GOAL ERROR:',
          error
        );

        set({
          loading: false,
          error: error.message,
        });
      }
    },

    //-------------------------------------
    // Fetch Goal
    //-------------------------------------

    fetchGoal: async (
      profileDocumentId
    ) => {
      try {
        set({
          loading: true,
          error: null,
        });

        const response =
          await axios.get(
            `${process.env.EXPO_PUBLIC_API_URL}/user-goal`,
            {
              params: {
                profileDocumentId,
              },
            }
          );

        set({
          goal:
            response.data.data ??
            response.data,
          loading: false,
        });
      } catch (error: any) {
        console.log(
          'FETCH GOAL ERROR:',
          error
        );

        set({
          loading: false,
          error: error.message,
        });
      }
    },

    //-------------------------------------
    // Overview
    //-------------------------------------

    fetchOverview: async (
      profileDocumentId
    ) => {
      try {
        set({
          loading: true,
          error: null,
        });

        const response =
          await axios.get(
            `${process.env.EXPO_PUBLIC_API_URL}/progress-insight/overview`,
            {
              params: {
                profileDocumentId,
              },
            }
          );

        set({
          overview:
            response.data.data ??
            response.data,
          loading: false,
        });
      } catch (error: any) {
        console.log(
          'OVERVIEW ERROR:',
          error
        );

        set({
          loading: false,
          error: error.message,
        });
      }
    },

    //-------------------------------------
    // Summary
    //-------------------------------------

    fetchSummary: async (
      profileDocumentId,
      types = [
        'overall',
        'weekly',
        'monthly',
      ]
    ) => {
      try {
        set({
          loading: true,
          error: null,
        });

        const query = types
          .map((type) => `type=${type}`)
          .join('&');

        const response =
          await axios.get(
            `${process.env.EXPO_PUBLIC_API_URL}/progress-insight/summary?profileDocumentId=${profileDocumentId}&${query}`
          );

        set({
          summary:
            response.data.data ??
            response.data,
          loading: false,
        });
      } catch (error: any) {
        console.log(
          'SUMMARY ERROR:',
          error
        );

        set({
          loading: false,
          error: error.message,
        });
      }
    },

    //-------------------------------------
    // Distribution
    //-------------------------------------

    fetchDistribution: async (
      profileDocumentId
    ) => {
      try {
        set({
          loading: true,
          error: null,
        });

        const response =
          await axios.get(
            `${process.env.EXPO_PUBLIC_API_URL}/progress-insight/distribution`,
            {
              params: {
                profileDocumentId,
              },
            }
          );

        set({
          distribution:
            response.data.data ??
            response.data,
          loading: false,
        });
      } catch (error: any) {
        console.log(
          'DISTRIBUTION ERROR:',
          error
        );

        set({
          loading: false,
          error: error.message,
        });
      }
    },

    //-------------------------------------
    // Analytics
    //-------------------------------------

    fetchAnalytics: async (
      profileDocumentId
    ) => {
      try {
        set({
          loading: true,
          error: null,
        });

        const response =
          await axios.get(
            `${process.env.EXPO_PUBLIC_API_URL}/progress-insight/analytics`,
            {
              params: {
                profileDocumentId,
              },
            }
          );

        set({
          analytics:
            response.data.data ??
            response.data,
          loading: false,
        });
      } catch (error: any) {
        console.log(
          'ANALYTICS ERROR:',
          error
        );

        set({
          loading: false,
          error: error.message,
        });
      }
    },

    //-------------------------------------
    // Clear
    //-------------------------------------

    clearProgressData: () => {
      set({
        goal: null,
        overview: null,
        summary: null,
        distribution: null,
        analytics: null,
        error: null,
      });
    },
  }));