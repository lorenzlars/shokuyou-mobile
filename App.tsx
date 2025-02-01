import {StatusBar} from 'expo-status-bar';
import {SafeAreaView, StyleSheet} from 'react-native';
import {NavigationContainer} from "@react-navigation/native";
import TabNavigator from "./screens/TabNavigator";
import Recipe from "./screens/Recipe";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {SafeAreaProvider} from "react-native-safe-area-context";

export type RootStackParamList = {
  Tabs: undefined;
  Recipe: { id: number };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
      <>
        <StatusBar style="auto"/>
        <SafeAreaProvider>
          <SafeAreaView style={styles.container}>
            <NavigationContainer>
              <Stack.Navigator
                  screenOptions={{
                    headerStyle: {backgroundColor: '#6ecaa6'},
                  }}
              >
                <Stack.Screen name="Tabs" component={TabNavigator}/>
                <Stack.Screen
                    name="Recipe"
                    component={Recipe}
                    options={{title: 'Recipe'}}
                />
              </Stack.Navigator>
            </NavigationContainer>
          </SafeAreaView>
        </SafeAreaProvider>
      </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
});
