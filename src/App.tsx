import {
  CompositeScreenProps,
  NavigationContainer,
  NavigatorScreenParams,
  useNavigation
} from "@react-navigation/native";
import {SafeAreaProvider} from "react-native-safe-area-context";
import {StyleSheet} from "react-native";
import {useEffect} from "react";
import {database, initDatabase} from "./model";
// https://reactnavigation.org/docs/stack-navigator#installation
import 'react-native-gesture-handler';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Recipe from "./model/Recipe";
import RecipeDetails from "./screens/recipes/details/RecipeDetails";
import {BottomTabScreenProps, createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import RecipesNavigator from "./screens/recipes/RecipesNavigator";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import Settings from "./screens/settings/Settings";
import RecipeForm from "./screens/recipes/details/RecipeForm";
import NavigationButton from "./components/NavigationButton";
import type {StackScreenProps} from "@react-navigation/stack";

type RootTabNavigatorParamList = {
  RecipesNavigator: undefined;
  Settings: undefined;
};

type RootStackNavigatorParamList = {
  RootTabNavigator: NavigatorScreenParams<RootTabNavigatorParamList>
  RecipeDetails: { recipe: Recipe };
  RecipeForm: { recipe: Recipe } | undefined;
};

type RootStackNavigatorProps = StackScreenProps<RootStackNavigatorParamList, keyof RootStackNavigatorParamList>
type RootTabNavigatorProps = BottomTabScreenProps<RootTabNavigatorParamList, keyof RootTabNavigatorParamList>

export type RootParamList = RootTabNavigatorParamList & RootStackNavigatorParamList
export type RootNavigatorProps = CompositeScreenProps<RootStackNavigatorProps, RootTabNavigatorProps>

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
          <Stack.Navigator screenOptions={{
            headerBackVisible: false,
            headerLeft: () => {
              const navigation = useNavigation()

              return (<NavigationButton name="arrow-left" onPress={navigation.goBack}/>)
            },

          }}>
            <Stack.Screen name="RootTabNavigator" component={RootTabNavigator}
                          options={{headerShown: false}}/>
            <Stack.Screen name="RecipeDetails" component={RecipeDetails}
                          options={{
                            title: '',
                            headerTransparent: true,
                          }}/>
            <Stack.Screen name="RecipeForm" component={RecipeForm}
                          options={{presentation: 'modal'}}/>
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({});
