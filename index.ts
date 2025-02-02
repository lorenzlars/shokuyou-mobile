import {registerRootComponent} from 'expo';

import App from './App';
import SQLiteAdapter from "@nozbe/watermelondb/adapters/sqlite";
import migrations from "./model/migrations";
import {schema} from "./model/schema";
import {Database} from "@nozbe/watermelondb";
import Post from "./model/Post";

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
