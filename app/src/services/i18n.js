import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { getLocales } from 'react-native-localize';

const languageDetector = {
    type: 'languageDetector',
    async: true, // flags below detection to be async
    detect: callback => {
        return /*'en'; */ Localization.getLocalizationAsync().then(({ locale }) => {
            callback(locale);
        });
    },
    init: () => { },
    cacheUserLanguage: () => { },
};

i18n
    .use(languageDetector)
    .init({
        lng: getLocales()[0].languageCode,
        fallbackLng: 'en',
        resources: {
            en: {
                translation: {
                    'Hey Yo Im at home': 'Hey Yo Im at home',
                    'Hey Yo Im inside Room': 'Hey Yo Im inside Room',
                },
            },
            es: {
                translation: {
                    'Hey Yo Im at home': 'Hey yo estoy en casa',
                    'Hey Yo Im inside Room': 'Hola, yo estoy dentro de la habitación',
                },
            },
            de: {
                translation: {
                    'Hey Yo Im at home': 'Hey Yo Ich bin zu Hause',
                    'Hey Yo Im inside Room': 'Hey Yo Ich bin im Zimmer',
                },
            },
        },

        // have a common namespace used around the full app
        ns: ['common'],
        defaultNS: 'common',

        debug: true,

        // cache: {
        //   enabled: true
        // },

        interpolation: {
            escapeValue: false, // not needed for react as it does escape per default to prevent xss!
        },
    });

export default i18n;

// creating a language detection plugin using expo
// http://i18next.com/docs/ownplugin/#languagedetector

        // resources: {
        //     en: {
        //         home: {
        //             title: 'Welcome',
        //             introduction: 'This text comes from i18next and is provided in english.',
        //         },
        //         page2: {
        //             title: 'Page 2',
        //             introduction: 'This text on page two.',
        //         },
        //         common: {
        //             currentLanguage: 'The current language is "{{lng}}"',
        //             actions: {
        //                 toggleToGerman: 'Deutsch',
        //                 toggleToEnglish: 'English',
        //                 goToPage2: 'Open page 2',
        //             },
        //             infoText: '<0><0>Eins </O><1>Zwei </1><2>Drei </2><3>Vier </3><4>Fünf</4></O>',
        //         },
        //     },
        //     de: {
        //         home: {
        //             title: 'Willkommen',
        //             introduction: 'Dieser Text ist von i18next und ist in deutsch.',
        //         },
        //         page2: {
        //             title: 'Seite 2',
        //             introduction: 'Text auf Seite 2',
        //         },
        //         common: {
        //             currentLanguage: 'Die Sprache ist auf "{{lng}}" gesetzt',
        //             actions: {
        //                 toggleToGerman: 'Deutsch',
        //                 toggleToEnglish: 'English',
        //                 goToPage2: 'Öffne Seite 2',
        //             },
        //         },
        //     },
        // },
