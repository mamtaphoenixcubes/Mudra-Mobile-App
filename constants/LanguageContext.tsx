import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n, { SUPPORTED_LANGUAGES } from './i18n';

// ── Language Code ────────────────────────────────────────
export type LanguageCode = string; // 'en', 'hi', etc.

// ── Context Type ─────────────────────────────────────────
interface LanguageContextType {
    language: LanguageCode;
    languages: typeof SUPPORTED_LANGUAGES;
    setLanguage: (code: LanguageCode) => void;
}

const LanguageContext = createContext<LanguageContextType>({
    language: 'en',
    languages: SUPPORTED_LANGUAGES,
    setLanguage: () => { },
});

// ── Storage Key ──────────────────────────────────────────
const STORAGE_KEY = '@mudras_language';

// ── Provider ─────────────────────────────────────────────
export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguageState] = useState<LanguageCode>('en');

    useEffect(() => {
        AsyncStorage.getItem(STORAGE_KEY).then((saved) => {
            if (saved && SUPPORTED_LANGUAGES.some((l) => l.code === saved)) {
                setLanguageState(saved);
                i18n.changeLanguage(saved);
            }
        });
    }, []);

    const setLanguage = async (code: LanguageCode) => {
        setLanguageState(code);
        await i18n.changeLanguage(code);
        await AsyncStorage.setItem(STORAGE_KEY, code);
    };

    return (
        <LanguageContext.Provider value={{ language, languages: SUPPORTED_LANGUAGES, setLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
}

// ── Hook ─────────────────────────────────────────────────
export const useLanguage = () => useContext(LanguageContext);