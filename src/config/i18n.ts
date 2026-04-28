import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from '../i18n/en.json';
import id from '../i18n/id.json';
import zh from '../i18n/zh.json';

i18n
    .use(initReactI18next)
    .init({
        resources: {
            en: { translation: en },
            id: { translation: id },
            zh: { translation: zh },
        },
        lng: 'en',
        fallbackLng: 'id',
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;
