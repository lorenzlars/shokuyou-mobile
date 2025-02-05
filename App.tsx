import {NavigationContainer} from "@react-navigation/native";
import {SafeAreaProvider} from "react-native-safe-area-context";
import {StyleSheet} from "react-native";
import {useEffect} from "react";
import {database, initDatabase} from "./model";
// https://reactnavigation.org/docs/stack-navigator#installation
import 'react-native-gesture-handler';
import TabNavigator from "./screens/TabNavigator";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Recipe from "./model/Recipe";
import RecipeDetails from "./screens/RecipeDetails";
import RecipesEdit from "./screens/RecipesEdit";


export type RootStackParamList = {
  TabNavigation: undefined;
  Recipe: { recipe?: Recipe };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  useEffect(() => {
    initDatabase();
  }, [database]);

  return (
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="TabNavigation" component={TabNavigator}
                          options={{headerShown: false}}/>
            <Stack.Screen name="Recipe" component={RecipeDetails}/>
            <Stack.Screen name="RecipeEdit" component={RecipesEdit}
                          options={{presentation: 'modal'}}/>
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({});
