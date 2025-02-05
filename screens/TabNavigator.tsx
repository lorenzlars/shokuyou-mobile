import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import Settings from "./Settings";
import RecipeStack from "./RecipeStack";
import {MaterialCommunityIcons} from "@expo/vector-icons";

export type RootStackParamList = {
  RecipesStack: undefined;
  Settings: undefined;
};

const Tab = createBottomTabNavigator<RootStackParamList>();

export default function TabNavigator() {
  return (
      <Tab.Navigator
          screenOptions={{
            headerShown: false,
            animation: 'shift',
          }}
      >
        <Tab.Screen
            name="RecipesStack"
            component={RecipeStack}
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
