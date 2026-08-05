import { create } from 'zustand';
import axios from 'axios';

interface FilterStore {
  filters: any[];

  selectedFilter: any | null;

  loading: boolean;

  error: string | null;

  fetchFilters: () => Promise<void>;

  fetchFilterById: (
    id: string | number
  ) => Promise<any>;
}

export const useFilterStore =
  create<FilterStore>((set) => ({
    filters: [],

    selectedFilter: null,

    loading: false,

    error: null,

    /*
    |--------------------------------------------------------------------------
    | FETCH ALL FILTERS
    |--------------------------------------------------------------------------
    */

    fetchFilters: async () => {
      try {
        set({
          loading: true,
          error: null,
        });

        const response =
          await axios.get(
            `${process.env.EXPO_PUBLIC_API_URL}/filters?populate=*`
          );

        set({
          filters:
            response.data?.data ||
            [],

          loading: false,
        });
      } catch (error: any) {
        console.log(
          'FILTERS ERROR:',
          error
        );

        set({
          loading: false,

          error: error.message,
        });
      }
    },

    /*
    |--------------------------------------------------------------------------
    | FETCH FILTER BY ID
    |--------------------------------------------------------------------------
    */

    fetchFilterById: async (id) => {
      try {
        set({
          loading: true,
          error: null,
        });

        const response =
          await axios.get(
            `${process.env.EXPO_PUBLIC_API_URL}/filters/${id}?populate=*`
          );

        const filter =
          response.data?.data?.data;

        set({
          selectedFilter: filter,

          loading: false,
        });

        return filter;
      } catch (error: any) {
        console.log(
          'FILTER BY ID ERROR:',
          error
        );

        set({
          loading: false,

          error: error.message,
        });

        return null;
      }
    },
  }));