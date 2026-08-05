import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

/**
 * Request filters for fetchNidras()
 */
interface NidraFilters {
    profileDocumentId?: string;
    categories?: string[];
    chakras?: string[];
    elements?: string[];
    page?: number;
    pageSize?: number;
}
interface NidraMobileCategoriesResponse {
    categories: any[];
    chakras: any[];
    elements: any[];
}
/**
 * Response returned by /yoga-nidras/filters
 */
interface NidraFilterResponse {
    needs: any[];
    chakras: string[];
    elements: string[];
}

interface NidraStore {
    nidras: any[];
    selectedNidra: any | null;
    filters: NidraFilterResponse;

    loading: boolean;
    loadingNidra: boolean;
    loadingFilters: boolean;

    error: string | null;
    nidraError: string | null;
    filtersError: string | null;
    mobileCategories: NidraMobileCategoriesResponse;

    loadingMobileCategories: boolean;
    savedNidras: any[];
    loadingSavedNidras: boolean;
    savedNidrasError: string | null;

    fetchSavedNidras: (
        profileDocumentId: string
    ) => Promise<void>;
    mobileCategoriesError: string | null;
    fetchNidras: (filters?: NidraFilters) => Promise<void>;
    fetchNidraById: (
        id: string | number,
        profileDocumentId?: string
    ) => Promise<void>;
    fetchNidraFilters: () => Promise<void>;
    setSelectedNidra: (nidra: any) => void;
    loadStoredNidra: () => Promise<void>;
    clearSelectedNidra: () => Promise<void>;


    fetchMobileCategories: () => Promise<void>;
    recentlyPlayedNidras: any[];
    loadingRecentlyPlayed: boolean;
    recentlyPlayedError: string | null;

    fetchRecentlyPlayedNidras: (
        profileDocumentId: string
    ) => Promise<void>;
}

export const useNidraStore = create<NidraStore>((set) => ({
    nidras: [],
    selectedNidra: null,
    setSelectedNidra: (nidra) =>
        set({
            selectedNidra: nidra,
        }),
    filters: {
        needs: [],
        chakras: [],
        elements: [],
    },
    mobileCategories: {
        categories: [],
        chakras: [],
        elements: [],

    },
    recentlyPlayedNidras: [],

    loadingRecentlyPlayed: false,
    savedNidras: [],

    loadingSavedNidras: false,

    savedNidrasError: null,
    recentlyPlayedError: null,
    loadingMobileCategories: false,

    mobileCategoriesError: null,
    loading: false,
    loadingNidra: false,
    loadingFilters: false,

    error: null,
    nidraError: null,
    filtersError: null,

    fetchNidras: async (filters = {}) => {
        try {
            set({
                loading: true,
                error: null,
            });

            const {
                profileDocumentId,
                categories = [],
                chakras = [],
                elements = [],
                page = 1,
                pageSize = 9,
            } = filters;

            const params = new URLSearchParams();

            if (categories.length) {
                params.append('category', categories.join(','));
            }

            if (chakras.length) {
                params.append('chakra', chakras.join(','));
            }

            if (elements.length) {
                params.append('element', elements.join(','));
            }

            params.append('page', page.toString());
            params.append('pageSize', pageSize.toString());
            if (profileDocumentId) {
                params.append('profileDocumentId', profileDocumentId);
            }

            const response = await axios.get(
                `${process.env.EXPO_PUBLIC_API_URL}/yoga-nidras?${params.toString()}`
            );

            set({
                nidras: response.data.data || [],
                loading: false,
            });

        } catch (error: any) {
            console.log('FETCH NIDRAS ERROR:', error);

            set({
                loading: false,
                error: error.message,
            });
        }
    },

    fetchNidraById: async (
        id: string | number,
        profileDocumentId?: string
    ) => {
        try {
            set({
                loadingNidra: true,
                nidraError: null,
            });

            const response = await axios.get(
                `${process.env.EXPO_PUBLIC_API_URL}/yoga-nidras/${id}?profileDocumentId=${profileDocumentId}`,
            );

            const nidra =
                response.data.data ??
                response.data ??
                null;

            await AsyncStorage.setItem(
                'selectedNidra',
                JSON.stringify(nidra)
            );

            set({
                selectedNidra: nidra,
                loadingNidra: false,
            });
        } catch (error: any) {
            console.log('FETCH NIDRA ERROR:', error);

            set({
                loadingNidra: false,
                nidraError: error.message,
            });
        }
    },

    fetchNidraFilters: async () => {
        try {
            set({
                loadingFilters: true,
                filtersError: null,
            });

            const response = await axios.get(
                `${process.env.EXPO_PUBLIC_API_URL}/yoga-nidras/filters`
            );

            set({
                filters:
                    response.data?.data ??
                    response.data ?? {
                        needs: [],
                        chakras: [],
                        elements: [],
                    },
                loadingFilters: false,
            });
        } catch (error: any) {
            console.log('FETCH NIDRA FILTERS ERROR:', error);

            set({
                loadingFilters: false,
                filtersError: error.message,
            });
        }
    },
    fetchRecentlyPlayedNidras: async (
        profileDocumentId: string
    ) => {
        try {
            set({
                loadingRecentlyPlayed: true,
                recentlyPlayedError: null,
            });

            const response = await axios.get(
                `${process.env.EXPO_PUBLIC_API_URL}/categories/mobile/recently-played-nidras?profileDocumentId=${profileDocumentId}`,
            );
            console.log(response, "responseeeeeeee");

            set({
                recentlyPlayedNidras:
                    response.data?.data || [],
                loadingRecentlyPlayed: false,
            });
        } catch (error: any) {
            console.log(
                'FETCH RECENTLY PLAYED NIDRAS ERROR:',
                error
            );

            set({
                loadingRecentlyPlayed: false,
                recentlyPlayedError: error.message,
            });
        }
    },
    fetchMobileCategories: async () => {
        try {
            set({
                loadingMobileCategories: true,
                mobileCategoriesError: null,
            });

            const response = await axios.get(
                `${process.env.EXPO_PUBLIC_API_URL}/categories/mobile/nidra-categories`
            );

            set({
                mobileCategories:
                    response.data?.data ?? {
                        categories: [],
                        chakras: [],
                        elements: [],
                    },
                loadingMobileCategories: false,
            });
        } catch (error: any) {
            console.log(
                'FETCH MOBILE NIDRA CATEGORIES ERROR:',
                error
            );

            set({
                loadingMobileCategories: false,
                mobileCategoriesError: error.message,
            });
        }
    },
    fetchSavedNidras: async (
        profileDocumentId: string
    ) => {
        try {
            set({
                loadingSavedNidras: true,
                savedNidrasError: null,
            });

            const response = await axios.get(
                `${process.env.EXPO_PUBLIC_API_URL}/categories/mobile/nidra-library?profileDocumentId=${profileDocumentId}`
            );

            console.log(
                'SAVED NIDRAS',
                response.data
            );

            set({
                savedNidras:
                    response.data?.data || [],
                loadingSavedNidras: false,
            });
        } catch (error: any) {
            console.log(
                'FETCH SAVED NIDRAS ERROR:',
                error
            );

            set({
                loadingSavedNidras: false,
                savedNidrasError: error.message,
            });
        }
    },

    loadStoredNidra: async () => {
        try {
            const storedNidra = await AsyncStorage.getItem(
                'selectedNidra'
            );

            if (storedNidra) {
                set({
                    selectedNidra: JSON.parse(storedNidra),
                });
            }
        } catch (error) {
            console.log(
                'LOAD STORED NIDRA ERROR:',
                error
            );
        }
    },

    clearSelectedNidra: async () => {
        try {
            await AsyncStorage.removeItem('selectedNidra');

            set({
                selectedNidra: null,
            });
        } catch (error) {
            console.log(
                'CLEAR SELECTED NIDRA ERROR:',
                error
            );
        }
    },
}));