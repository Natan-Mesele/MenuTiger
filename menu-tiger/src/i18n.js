import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Translation files
const resources = {
  en: {
    translation: {
      welcome: 'Welcome',
      description: 'This is a React app with Tailwind and i18n.',
    },
  },
  fr: {
    translation: {
      welcome: 'Bienvenue',
      description: 'Ceci est une application React avec Tailwind et i18n.',
    },
  },
};

i18n
  .use(LanguageDetector) // Detects user language
  .use(initReactI18next) // Passes i18n instance to react-i18next
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
