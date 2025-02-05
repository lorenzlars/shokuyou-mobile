import {StyleSheet} from "react-native";
// https://reactnavigation.org/docs/stack-navigator#installation
import 'react-native-gesture-handler';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Recipes from "./RecipesOverview";
import NavigationButton from "../../components/NavigationButton";
import {useNavigation} from "@react-navigation/native";
import RecipesEdit from "./details/RecipeForm";
import Recipe from "../../model/Recipe";
import RecipesOverview from "./RecipesOverview";
import RecipeForm from "./details/RecipeForm";


export type RecipesNavigatorParamList = {
  Recipes: undefined;
  RecipeForm: { recipe?: Recipe };
};

const Stack = createNativeStackNavigator<RecipesNavigatorParamList>();

export default function RecipesNavigator() {
  const navigation = useNavigation();

  return (
      <Stack.Navigator
          screenOptions={{
            headerLargeTitle: true,
            headerRight: () =>
                <NavigationButton
                    name="plus"
                    onPress={() => navigation.navigate('RecipeForm')}
                />
          }}
      >
        <Stack.Screen name="Recipes" component={RecipesOverview}/>
      </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});
