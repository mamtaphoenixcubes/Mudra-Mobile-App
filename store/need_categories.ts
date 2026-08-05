import { create } from 'zustand';
import axios from 'axios';

interface NeedsCategoryStore {
  needsCategories: any[];

  selectedNeedsCategory: any | null;

  loading: boolean;

  error: string | null;

  fetchNeedsCategories: () => Promise<void>;

  fetchNeedsCategoryById: (
    id: string | number
  ) => Promise<any>;
}

export const useNeedsCategoryStore =
  create<NeedsCategoryStore>((set) => ({
    needsCategories: [],

    selectedNeedsCategory: null,

    loading: false,

    error: null,

    /*
    |--------------------------------------------------------------------------
    | FETCH ALL NEEDS CATEGORIES
    |--------------------------------------------------------------------------
    */

    fetchNeedsCategories: async () => {
      try {
        set({
          loading: true,
          error: null,
        });

        const response =
          await axios.get(
            `${process.env.EXPO_PUBLIC_API_URL}/needs-categories?populate=*`
          );

        set({
          needsCategories:
            response.data?.data?.data ||
            [],

          loading: false,
        });
      } catch (error: any) {
        console.log(
          'NEEDS CATEGORY ERROR:',
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
    | FETCH NEEDS CATEGORY BY ID
    |--------------------------------------------------------------------------
    */

    fetchNeedsCategoryById:
      async (id) => {
        try {
          set({
            loading: true,
            error: null,
          });

          const response =
            await axios.get(
              `${process.env.EXPO_PUBLIC_API_URL}/needs-categories/${id}?populate=*`
            );

          const needsCategory =
            response.data?.data?.data;

          set({
            selectedNeedsCategory:
              needsCategory,

            loading: false,
          });

          return needsCategory;
        } catch (error: any) {
          console.log(
            'NEEDS CATEGORY BY ID ERROR:',
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