import {StyleSheet} from "react-native";
// https://reactnavigation.org/docs/stack-navigator#installation
import 'react-native-gesture-handler';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Recipes from "./Recipes";
import NavigationButton from "../components/NavigationButton";
import {useNavigation} from "@react-navigation/native";
import RecipesEdit from "./RecipesEdit";
import Recipe from "../model/Recipe";


export type RootStackParamList = {
  Recipes: undefined;
  RecipeEdit: { recipe?: Recipe };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RecipeStack() {
  const navigation = useNavigation();

  return (
      <Stack.Navigator
          screenOptions={{
            headerLargeTitle: true,
            headerRight: () =>
                <NavigationButton
                    name="plus"
                    onPress={() => navigation.navigate('RecipeEdit')}
                />
          }}
      >
        <Stack.Screen name="Recipes" component={Recipes}/>
      </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});
