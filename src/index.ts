import { registerRootComponent } from 'expo';
import App from './App';
import { client } from './api/client.gen';

client.setConfig({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  throwOnError: true,
});

registerRootComponent(App);
