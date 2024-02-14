import i18next from 'i18next';
import {initReactI18next} from 'react-i18next';
import en from './src/assets/locales/en.json';
import ar from './src/assets/locales/ar.json';
import languageDetector from './src/config/languageDetector';

//empty for now
const resources = {
  en: {
    translation: en,
  },
  ar: {
    translation: ar,
  },
};

i18next
  .use(initReactI18next)
  .use(languageDetector)
  .init({
    resources,
    compatibilityJSON: 'v3',
    //language to use if translations in user language are not available
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // not needed for react!!
    },
  });

export default i18next;
