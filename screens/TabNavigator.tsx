import Recipes from './Recipes'
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import Settings from "./Settings";
import {NavigationProp, useNavigation, useRoute} from "@react-navigation/native";
import {useEffect} from "react";

export type RootStackParamList = {
  Recipes: undefined;
  Settings: undefined;
};

const Tab = createBottomTabNavigator<RootStackParamList>();

export default function TabNavigator() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute();

  useEffect(() => {
    const parentNavigation = navigation.getParent();

    if (parentNavigation) {
      const routeName = route.name;

      parentNavigation.setOptions({
        title: routeName === 'Recipes' ? 'Recipes' : 'Settings',
      });
    }

  }, [route, navigation]);


  return (
      <Tab.Navigator
          screenOptions={{
            headerShown: false,
            animation: 'shift',
            tabBarActiveTintColor: '#000000',
            tabBarInactiveTintColor: '#999999',
            tabBarStyle: {
              backgroundColor: '#ffffff',
            },
          }}
      >
        <Tab.Screen
            name="Recipes"
            component={Recipes}
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
