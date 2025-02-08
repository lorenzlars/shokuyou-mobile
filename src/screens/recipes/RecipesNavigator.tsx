import {StyleSheet, View} from "react-native";
// https://reactnavigation.org/docs/stack-navigator#installation
import 'react-native-gesture-handler';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import NavigationButton from "../../components/NavigationButton";
import {useNavigation} from "@react-navigation/native";
import RecipesOverview from "./RecipesOverview";
import {StackScreenProps} from "@react-navigation/stack";
import {RootNavigatorProps,} from "../../App";
import {CompositeNavigationProps} from "../../types/navigation";
import {ScreenOptions} from "../../constants/screenOptions";

type RecipesNavigationParamList = {
  Recipes: undefined;
};

type RecipesStackNavigatorProps = StackScreenProps<RecipesNavigationParamList, keyof RecipesNavigationParamList>

export type RecipesNavigatorParams = CompositeNavigationProps<RootNavigatorProps, RecipesStackNavigatorProps>

const Stack = createNativeStackNavigator<RecipesNavigationParamList>();

export default function RecipesNavigator() {
  const navigation = useNavigation<RecipesNavigatorParams>();

  return (
      <Stack.Navigator
          screenOptions={{
            ...ScreenOptions.largeHeader,
            headerRight: () =>
                <View style={styles.headerActionsContainer}>
                  <NavigationButton label="Inbox"/>
                  <NavigationButton
                      icon="plus"
                      onPress={() => navigation.navigate('RecipeForm')}
                  />
                </View>
          }}
      >
        <Stack.Screen name="Recipes" component={RecipesOverview}/>
      </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  headerActionsContainer: {
    gap: 10,
    flexDirection: 'row',
  }
});
