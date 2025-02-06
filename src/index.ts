import {registerRootComponent} from 'expo';

import App from './App';
import SQLiteAdapter from "@nozbe/watermelondb/adapters/sqlite";
import migrations from "./model/migrations";
import {schema} from "./model/schema";
import {Database} from "@nozbe/watermelondb";
import Recipe from "./model/Recipe";
import axios from "axios";
import {client} from "./api/client.gen";

axios.defaults.baseURL = process.env.EXPO_PUBLIC_API_URL;

client.setConfig({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  throwOnError: true,
})

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
