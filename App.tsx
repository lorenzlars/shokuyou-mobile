import {NavigationContainer} from "@react-navigation/native";
import {SafeAreaProvider} from "react-native-safe-area-context";
import {StyleSheet} from "react-native";
import TabNavigator from "./screens/TabNavigator";
import RecipeDetails from "./screens/RecipeDetails";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {useEffect} from "react";
import {database, initDatabase} from "./model";

export type RootStackParamList = {
  TabNavigator: undefined;
  Recipe: { id?: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  useEffect(() => {
    initDatabase();
  }, [database]);

  return (
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator
              screenOptions={{
                animation: 'simple_push'
              }}
          >
            <Stack.Screen name="TabNavigator" component={TabNavigator}/>
            <Stack.Screen name="Recipe" component={RecipeDetails}/>
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({});
