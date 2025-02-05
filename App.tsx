import {NavigationContainer} from "@react-navigation/native";
import {SafeAreaProvider} from "react-native-safe-area-context";
import {StyleSheet} from "react-native";
import {useEffect} from "react";
import {database, initDatabase} from "./model";
// https://reactnavigation.org/docs/stack-navigator#installation
import 'react-native-gesture-handler';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Recipe from "./model/Recipe";
import RecipeDetails from "./screens/recipes/details/RecipeDetails";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import RecipesNavigator from "./screens/recipes/RecipesNavigator";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import Settings from "./screens/settings/Settings";
import RecipeForm from "./screens/recipes/details/RecipeForm";


export type RootStackNavigatorParamList = {
  RootTabNavigator: undefined;
  RecipeDetails: { recipe?: Recipe };
  RecipeForm: { recipe?: Recipe };
};

export type RootTabNavigatorParamList = {
  RecipesNavigator: undefined;
  Settings: undefined;
};

const Stack = createNativeStackNavigator<RootStackNavigatorParamList>();
const Tab = createBottomTabNavigator<RootTabNavigatorParamList>();

function RootTabNavigator() {
  return (
      <Tab.Navigator
          screenOptions={{
            headerShown: false,
            animation: 'shift',
          }}
      >
        <Tab.Screen
            name="RecipesNavigator"
            component={RecipesNavigator}
            options={{
              title: 'Recipes',
              tabBarIcon: () => (<MaterialCommunityIcons name="chef-hat" size={24}/>)
            }}
        />
        <Tab.Screen
            name="Settings"
            component={Settings}
            options={{
              title: 'Settings',
              tabBarIcon: () => (<MaterialCommunityIcons name="cog" size={24}/>)
            }}
        />
      </Tab.Navigator>
  );
}


export default function App() {
  useEffect(() => {
    initDatabase();
  }, [database]);

  return (
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="RootTabNavigator" component={RootTabNavigator}
                          options={{headerShown: false}}/>
            <Stack.Screen name="RecipeDetails" component={RecipeDetails}/>
            <Stack.Screen name="RecipeForm" component={RecipeForm}
                          options={{presentation: 'modal'}}/>
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({});
