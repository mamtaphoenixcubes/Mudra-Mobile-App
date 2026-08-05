import { create } from 'zustand';
import axios from 'axios';

interface CategoryStore {
  categories: any[];

  selectedCategory: any | null;

  loading: boolean;

  error: string | null;

  fetchCategories: () => Promise<void>;

  fetchCategoryById: (
    id: string | number
  ) => Promise<any>;
}

export const useCategoryStore =
  create<CategoryStore>((set) => ({
    categories: [],

    selectedCategory: null,

    loading: false,

    error: null,

    /*
    |--------------------------------------------------------------------------
    | FETCH ALL CATEGORIES
    |--------------------------------------------------------------------------
    */

    fetchCategories: async () => {
      try {
        set({
          loading: true,
          error: null,
        });

        const response =
          await axios.get(
            `${process.env.EXPO_PUBLIC_API_URL}/categories`
          );

        set({
          categories:
            response.data?.data?.data ||
            [],

          loading: false,
        });
      } catch (error: any) {
        console.log(
          'CATEGORY ERROR:',
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
    | FETCH CATEGORY BY ID
    |--------------------------------------------------------------------------
    */

    fetchCategoryById: async (
      id
    ) => {
      try {
        set({
          loading: true,
          error: null,
        });

        const response =
          await axios.get(
            `${process.env.EXPO_PUBLIC_API_URL}/categories/${id}`
          );

        const category =
          response.data?.data?.data;

        set({
          selectedCategory: category,

          loading: false,
        });

        return category;
      } catch (error: any) {
        console.log(
          'CATEGORY BY ID ERROR:',
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