import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

interface MudraStore {
  mudras: any[];
  selectedMudra: any | null;

  loading: boolean;
  loadingMudra: boolean;

  error: string | null;
  mudraError: string | null;

  fetchMudras: () => Promise<void>;
  fetchMudraById: (id: string | number) => Promise<void>;

  loadStoredMudra: () => Promise<void>;
  clearSelectedMudra: () => Promise<void>;
}

export const useMudraStore = create<MudraStore>((set) => ({
  mudras: [],
  selectedMudra: null,

  loading: false,
  loadingMudra: false,

  error: null,
  mudraError: null,

  fetchMudras: async () => {
    try {
      set({
        loading: true,
        error: null,
      });

      const response = await axios.get(
        `${process.env.EXPO_PUBLIC_API_URL}/mudras`
      );

      set({
        mudras: response.data.data || [],
        loading: false,
      });
    } catch (error: any) {
      console.log('MUDRA ERROR:', error);

      set({
        loading: false,
        error: error.message,
      });
    }
  },

  fetchMudraById: async (id: string | number) => {
    try {
      set({
        loadingMudra: true,
        mudraError: null,
      });

      const response = await axios.get(
        `${process.env.EXPO_PUBLIC_API_URL}/mudras/${id}`
      );

      const mudra =
        response.data.data ||
        response.data ||
        null;

      // Persist to AsyncStorage
      await AsyncStorage.setItem(
        'selectedMudra',
        JSON.stringify(mudra)
      );

      set({
        selectedMudra: mudra,
        loadingMudra: false,
      });
    } catch (error: any) {
      console.log(
        'FETCH MUDRA ERROR:',
        error
      );

      set({
        loadingMudra: false,
        mudraError: error.message,
      });
    }
  },

  loadStoredMudra: async () => {
    try {
      const storedMudra =
        await AsyncStorage.getItem(
          'selectedMudra'
        );

      if (storedMudra) {
        set({
          selectedMudra:
            JSON.parse(storedMudra),
        });
      }
    } catch (error) {
      console.log(
        'LOAD STORED MUDRA ERROR:',
        error
      );
    }
  },

  clearSelectedMudra: async () => {
    try {
      await AsyncStorage.removeItem(
        'selectedMudra'
      );

      set({
        selectedMudra: null,
      });
    } catch (error) {
      console.log(
        'CLEAR MUDRA ERROR:',
        error
      );
    }
  },
}));