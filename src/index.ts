import { registerRootComponent } from 'expo';
import App from './App';
import { client } from './api/client.gen';
// import { NativeModules, Platform } from 'react-native';
//
// const deviceLanguage =
//   Platform.OS === 'ios'
//     ? NativeModules.SettingsManager.settings.AppleLocale ||
//       NativeModules.SettingsManager.settings.AppleLanguages[0] //iOS 13
//     : NativeModules.I18nManager.localeIdentifier;

client.setConfig({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  throwOnError: true,
});

registerRootComponent(App);
