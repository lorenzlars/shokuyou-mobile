import {StatusBar} from 'expo-status-bar';
import {NavigationContainer} from "@react-navigation/native";
import {SafeAreaProvider} from "react-native-safe-area-context";
import {SafeAreaView, StyleSheet} from "react-native";
import TabNavigator from "./screens/TabNavigator";
import Recipe from "./screens/Recipe";
import {createNativeStackNavigator} from "@react-navigation/native-stack";

export type RootStackParamList = {
  TabNavigator: undefined;
  Recipe: { id: number };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
      <>
        <StatusBar/>
        <SafeAreaProvider>
          <SafeAreaView style={{flex: 1}}>
            <NavigationContainer>
              <Stack.Navigator
                  screenOptions={{
                    animation: 'simple_push'
                  }}
              >
                <Stack.Screen name="TabNavigator" component={TabNavigator}/>
                <Stack.Screen name="Recipe" component={Recipe}/>
              </Stack.Navigator>
            </NavigationContainer>
          </SafeAreaView>
        </SafeAreaProvider>
      </>
  );
}

const styles = StyleSheet.create({});

