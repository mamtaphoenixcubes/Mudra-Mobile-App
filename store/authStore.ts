import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const EMPTY_LIBRARY = {
  audioSingles: [],
  audioPlaylists: [],
  videoSingles: [],
  videoPlaylists: [],
};

interface LibraryMudras {
  audioSingles: any[];
  audioPlaylists: any[];
  videoSingles: any[];
  videoPlaylists: any[];
}

interface AuthState {
  user: any | null;
  token: string | null;
  auth: any | null;
  isLoggedIn: boolean;
  likedMudras: any[];
  libraryMudras: LibraryMudras;

  setAuth: (data: any) => Promise<void>;
  updateUser: (partialUser: any) => Promise<void>;
  logout: () => Promise<void>;
  fetchLikedMudras: () => Promise<void>;
  fetchLibraryMudras: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  token: null,
  auth: null,
  isLoggedIn: false,

  likedMudras: [],

  libraryMudras: EMPTY_LIBRARY,

  setAuth: async (data) => {
    try {
      
      const authData = {
        user: data.user,
        token: data.token,
        isLoggedIn: true,
      };

      await AsyncStorage.setItem(
        'auth',
        JSON.stringify(authData)
      );

      await AsyncStorage.setItem(
        'token',
        data.token
      );

      await AsyncStorage.setItem(
        'user',
        JSON.stringify(data.user)
      );

      await AsyncStorage.setItem(
        'isLoggedIn',
        'true'
      );

      set({
        user: data.user,
        token: data.token,
        auth: authData,
        isLoggedIn: true,
      });
    } catch (error) {
      console.log('Auth Storage Error:', error);
    }
  },

updateUser: async (partialUser) => {
        try {
            const currentUser = get().user;
            const mergedUser = { ...currentUser, ...partialUser };

            const authData = {
                user: mergedUser,
                token: get().token,
                isLoggedIn: get().isLoggedIn,
            };

            await AsyncStorage.setItem(
                'auth',
                JSON.stringify(authData)
            );

            await AsyncStorage.setItem(
                'user',
                JSON.stringify(mergedUser)
            );

            set({
                user: mergedUser,
                auth: authData,
            });
        } catch (error) {
            console.log('Update User Error:', error);
        }
    },


  fetchLikedMudras: async () => {
    try {
      const { user, token } = get();

      if (!user?.id || !token) {
        return;
      }

      const response = await axios.get(
        `${process.env.EXPO_PUBLIC_IMAGE_API_URL}/api/profile/${user.id}/mudras?type=liked`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      set({
        likedMudras: response?.data?.data || [],
      });

      console.log(
        'Liked Mudras:',
        response?.data?.data
      );
    } catch (error: any) {
      console.log(
        'Fetch Liked Mudras Error:',
        error?.response?.data || error.message
      );
    }
  },

  fetchLibraryMudras: async () => {
    try {
      const { user, token } = get();

      if (!user?.id || !token) {
        return;
      }

      const response = await axios.get(
        `${process.env.EXPO_PUBLIC_API_URL}/user-mudra-activities/profile/${user.id}/library`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(
        'Library Response:',
        response.data
      );

      set({
        libraryMudras:
          response?.data?.saved ?? EMPTY_LIBRARY,
      });

      console.log(
        'Library Mudras:',
        response?.data?.data
      );
    } catch (error: any) {
      console.log(
        'Fetch Library Mudras Error:',
        error?.response?.data || error.message
      );

      set({
        libraryMudras: EMPTY_LIBRARY,
      });
    }
  },

  logout: async () => {
    try {
      await AsyncStorage.removeItem('auth');
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('user');
      await AsyncStorage.removeItem('isLoggedIn');

      set({
        user: null,
        token: null,
        auth: null,
        isLoggedIn: false,
        likedMudras: [],
        libraryMudras: EMPTY_LIBRARY,
      });
    } catch (error) {
      console.log('Logout Error:', error);
    }
  },
}));