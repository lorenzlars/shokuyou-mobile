import {NavigationContainer} from "@react-navigation/native";
import {SafeAreaProvider} from "react-native-safe-area-context";
import {SafeAreaView, StyleSheet, View} from "react-native";
import TabNavigator from "./screens/TabNavigator";
import RecipeDetails from "./screens/RecipeDetails";
import {createNativeStackNavigator} from "@react-navigation/native-stack";

export type RootStackParamList = {
  TabNavigator: undefined;
  Recipe: { id: number };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
      <SafeAreaProvider>
        <SafeAreaView style={{flex: 1}}>
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
        </SafeAreaView>
      </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({});

