import {StatusBar} from 'expo-status-bar';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {NavigationContainer} from "@react-navigation/native";
import {SafeAreaProvider} from "react-native-safe-area-context";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import Settings from "./screens/Settings";
import {SafeAreaView, StyleSheet} from "react-native";
import RecipesNavigator from "./screens/RecipesNavigator";

export type RootStackParamList = {
  RecipesNavigator: undefined;
  Settings: { id: number };
};

const Tab = createBottomTabNavigator<RootStackParamList>();

export default function App() {
  return (
      <>
        <StatusBar/>
        <SafeAreaProvider>
          <SafeAreaView style={{flex: 1}}>
            <NavigationContainer>
              <Tab.Navigator
                  screenOptions={{
                    headerShown: false,
                    headerTransparent: false,
                    animation: 'shift',
                    tabBarActiveTintColor: '#000000',
                    tabBarInactiveTintColor: '#999999',
                    tabBarStyle: {
                      backgroundColor: '#ffffff',
                    },
                  }}
              >
                <Tab.Screen
                    name="RecipesNavigator"
                    component={RecipesNavigator}
                    options={{
                      title: 'Recipes',
                      tabBarIconStyle: styles.tabBarIconStyle,
                      tabBarIcon: () => (<MaterialCommunityIcons name="chef-hat" size={24}/>)
                    }}
                />
                <Tab.Screen
                    name="Settings"
                    component={Settings}
                    options={{
                      title: 'Settings',
                      tabBarIconStyle: styles.tabBarIconStyle,
                      tabBarIcon: () => (<MaterialCommunityIcons name="cog" size={24}/>)
                    }}
                />
              </Tab.Navigator>
            </NavigationContainer>
          </SafeAreaView>
        </SafeAreaProvider>
      </>
  );
}

const styles = StyleSheet.create({
  tabBarIconStyle: {}
});

