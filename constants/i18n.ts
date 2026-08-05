import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';

import en from './locales/en.json';

const resources = {
    en: { translation: en },
};

export const SUPPORTED_LANGUAGES = [
    { code: 'en', label: 'English' },
];

const deviceLanguage = Localization.getLocales()[0]?.languageCode ?? 'en';

i18n.use(initReactI18next).init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
        escapeValue: false,
    },
});
export default i18n;