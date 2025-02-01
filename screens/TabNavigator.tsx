import {Easing, StyleSheet} from 'react-native';
import Recipes from './Recipes'
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import Settings from "./Settings";

export type RootStackParamList = {
  Recipes: undefined;
  Settings: undefined;
};

const Tab = createBottomTabNavigator<RootStackParamList>();

export default function TabNavigator() {
  return (
      <Tab.Navigator
          screenOptions={{
            headerShown: false,
          }}
      >
        <Tab.Screen
            name="Recipes"
            component={Recipes}
            options={{
              title: 'Recipes',
              transitionSpec: {
                animation: 'timing',
                config: {
                  duration: 150,
                  easing: Easing.inOut(Easing.ease),
                },
              },
            }}
        />
        <Tab.Screen
            name="Settings"
            component={Settings}
            options={{
              title: 'Settings',
            }}
        />
      </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
});
