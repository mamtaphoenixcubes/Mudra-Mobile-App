import { create } from 'zustand';
import axios from 'axios';

interface MoodStore {
  moods: any[];

  selectedMood: any | null;

  loading: boolean;

  error: string | null;

  fetchMoods: () => Promise<void>;

  fetchMoodById: (
    id: string | number
  ) => Promise<any>;
}

export const useMoodStore =
  create<MoodStore>((set) => ({
    moods: [],

    selectedMood: null,

    loading: false,

    error: null,

    /*
    |--------------------------------------------------------------------------
    | FETCH ALL MOODS
    |--------------------------------------------------------------------------
    */

    fetchMoods: async () => {
      try {
        set({
          loading: true,
          error: null,
        });

        const response =
          await axios.get(
            `${process.env.EXPO_PUBLIC_API_URL}/moods`
          );

        set({
          moods:
            response.data?.data?.data ||
            [],

          loading: false,
        });
      } catch (error: any) {
        console.log(
          'MOOD ERROR:',
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
    | FETCH MOOD BY ID
    |--------------------------------------------------------------------------
    */

    fetchMoodById: async (
      id
    ) => {
      try {
        set({
          loading: true,
          error: null,
        });

        const response =
          await axios.get(
            `${process.env.EXPO_PUBLIC_API_URL}/moods/${id}`
          );

        const mood =
          response.data?.data?.data;

        set({
          selectedMood: mood,

          loading: false,
        });

        return mood;
      } catch (error: any) {
        console.log(
          'MOOD BY ID ERROR:',
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