import Recipes from './Recipes'
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Recipe from "./Recipe";
import {useNavigation} from "@react-navigation/native";

export type RootStackParamList = {
  Recipes: undefined;
  Recipe: { id: number };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RecipesNavigator() {
  const navigation = useNavigation();


  return (
      <Stack.Navigator
          screenOptions={{
            headerTransparent: false
          }}
      >
        <Stack.Screen name="Recipes" component={Recipes}
                      options={{
                        title: 'Recipes',
                        headerLargeTitle: true,
                      }}/>
        <Stack.Screen
            name="Recipe"
            component={Recipe}
            options={{title: 'Recipe', animation: 'slide_from_right'}}
        />
      </Stack.Navigator>
  );
}
