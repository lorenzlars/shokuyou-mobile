import {SafeAreaView, StyleSheet, View} from 'react-native';
import RecipeListItem from "../components/RecipeListItem";
import {useLayoutEffect, useState} from "react";
import {useNavigation, useRoute} from "@react-navigation/native";
import NavigationButton from "../components/NavigationButton";
import {FlashList} from "@shopify/flash-list";
import {withObservables} from "@nozbe/watermelondb/react";
import Recipe from "../model/Recipe";
import {database} from "../model";

type Props = {
  recipes: Recipe[];
  count: number;
  filter?: string;
}

function Recipes({recipes}: Props) {
  const navigation = useNavigation();
  const route = useRoute()


  const [search, setSearch] = useState('');
  const filteredRecipes = recipes.filter(recipe =>
      recipe.name.toLowerCase().includes(search.toLowerCase())
  );

  useLayoutEffect(() => {
    navigation.getParent()?.setOptions({
      title: 'Recipes',
      headerLargeTitle: true,
      headerSearchBarOptions: {
        inputType: 'text',
        onChangeText: (event) => setSearch(event.nativeEvent.text),

      },
      headerRight: () => <NavigationButton name="plus"
                                           onPress={() => navigation.navigate('Recipe')}/>,
    });
  }, [route.name]);

  return (
      <SafeAreaView style={{flex: 1}}>
        <FlashList
            data={filteredRecipes}
            renderItem={({item}) =>
                <RecipeListItem
                    recipe={item}
                    onPress={() => navigation.navigate('Recipe', {recipe: item._raw})}
                />
            }
            estimatedItemSize={30}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={() => <View
                style={{height: 1, backgroundColor: '#d1d1d1', marginLeft: 20, marginRight: 20}}/>}
        />
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({});

const enhance = withObservables([], () => ({
  recipes: database.collections.get<Recipe>('recipes').query(),
}))

export default enhance(Recipes)
