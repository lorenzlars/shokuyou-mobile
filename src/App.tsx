import {
  CompositeScreenProps,
  NavigationContainer,
  NavigatorScreenParams,
  useNavigation,
} from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createDatabase } from './model';
// https://reactnavigation.org/docs/stack-navigator#installation
import 'react-native-gesture-handler';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RecipeDetails from './screens/recipes/details/RecipeDetails';
import { BottomTabScreenProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import RecipesNavigator from './screens/recipes/RecipesNavigator';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { RecipeEditForm, RecipeForm } from './screens/recipes/details/RecipeForm';
import NavigationButton from './components/NavigationButton';
import type { StackScreenProps } from '@react-navigation/stack';
import { DatabaseProvider } from '@nozbe/watermelondb/react';
import SettingsNavigator from './screens/settings/SettingsNavigator';
import SettingsAccount from './screens/settings/SettingsAccount';
import { CloudProvider } from './providers/CloudProvider';
import SettingsIngredients from './screens/settings/SettingsIngredients';
import CartNavigator from './screens/cart/CartNavigator';
import { ScreenOptions } from './constants/screenOptions';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

type RootTabNavigatorParamList = {
  RecipesNavigator: undefined;
  CartNavigator: undefined;
  SettingsNavigator: undefined;
};

type RootStackNavigatorParamList = {
  RootTabNavigator: NavigatorScreenParams<RootTabNavigatorParamList>;
  RecipeDetails: { id: string };
  RecipeForm: undefined;
  RecipeEditForm: { id: string };
  SettingsAccount: undefined;
  SettingsIngredients: undefined;
};

type RootStackNavigatorProps = StackScreenProps<
  RootStackNavigatorParamList,
  keyof RootStackNavigatorParamList
>;
type RootTabNavigatorProps = BottomTabScreenProps<
  RootTabNavigatorParamList,
  keyof RootTabNavigatorParamList
>;

export type RootParamList = RootTabNavigatorParamList & RootStackNavigatorParamList;
export type RootNavigatorProps = CompositeScreenProps<
  RootStackNavigatorProps,
  RootTabNavigatorProps
>;

const Stack = createNativeStackNavigator<RootStackNavigatorParamList>();
const Tab = createBottomTabNavigator<RootTabNavigatorParamList>();

function RootTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'shift',
        tabBarInactiveTintColor: '#aaaaaa',
        lazy: false,
      }}>
      <Tab.Screen
        name="RecipesNavigator"
        component={RecipesNavigator}
        options={{
          title: 'Recipes',
          tabBarBadge: 1,
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="chef-hat" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="CartNavigator"
        component={CartNavigator}
        options={{
          title: 'Cart',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="cart" size={24} color={color} />,
        }}
      />
      <Tab.Screen
        name="SettingsNavigator"
        component={SettingsNavigator}
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="cog" size={24} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  const database = createDatabase();

  // useEffect(() => {
  //   registerBackgroundFetchAsync()
  // }, [])

  return (
    <DatabaseProvider database={database}>
      <CloudProvider database={database}>
        <GestureHandlerRootView>
          <SafeAreaProvider>
            <NavigationContainer>
              <Stack.Navigator
                screenOptions={{
                  headerBackVisible: false,
                  headerLeft: function HeaderLeftAction() {
                    const navigation = useNavigation();

                    return <NavigationButton icon="chevron-left" onPress={navigation.goBack} />;
                  },
                }}>
                <Stack.Screen
                  name="RootTabNavigator"
                  component={RootTabNavigator}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="RecipeDetails"
                  component={RecipeDetails}
                  options={{
                    title: '',
                    headerTransparent: true,
                  }}
                />
                <Stack.Screen
                  name="RecipeForm"
                  component={RecipeForm}
                  options={{ presentation: 'modal', headerTransparent: true }}
                />
                <Stack.Screen
                  name="RecipeEditForm"
                  component={RecipeEditForm}
                  options={{ presentation: 'modal', headerTransparent: true }}
                />
                <Stack.Screen
                  name="SettingsAccount"
                  component={SettingsAccount}
                  options={{
                    title: '',
                    headerTransparent: true,
                    presentation: 'modal',
                  }}
                />
                <Stack.Screen
                  name="SettingsIngredients"
                  component={SettingsIngredients}
                  options={{
                    ...ScreenOptions.largeHeader,
                    title: 'Ingredients',
                  }}
                />
              </Stack.Navigator>
            </NavigationContainer>
          </SafeAreaProvider>
        </GestureHandlerRootView>
      </CloudProvider>
    </DatabaseProvider>
  );
}
