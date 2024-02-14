import AsyncStorage from '@react-native-async-storage/async-storage';
import {NativeModules, Platform} from 'react-native';
import SplashScreen from 'react-native-splash-screen';

const languageDetector = {
  type: 'languageDetector',
  async: true,
  init: () => {},
  detect: callback => {
    AsyncStorage.getItem('LANGUAGE')
      .then(language => {
        if (language) {
          return callback(language);
        } else {
          //if language was not stored yet, use device's locale
          const locale =
            Platform.OS == 'android'
              ? NativeModules.I18nManager.localeIdentifier
              : NativeModules.SettingsManager.settings.AppleLocale;
          return callback(locale.includes('ar') ? 'ar' : 'en');
        }
      })
      .catch(error => {
        console.log('Error reading language', error);
      });
  },
  cacheUserLanguage: language => {
    AsyncStorage.setItem('LANGUAGE', language)
      .then(() => {
        console.log('Setting language successfuly');
      })
      .catch(err => {
        console.log('Failed setting language', err);
      });
  },
};

export default languageDetector;
