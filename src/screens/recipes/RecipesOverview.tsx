import {SafeAreaView, StyleSheet, View} from 'react-native';
import RecipeListItem from "../../components/RecipeListItem";
import {useLayoutEffect, useState} from "react";
import {useNavigation} from "@react-navigation/native";
import {FlashList} from "@shopify/flash-list";
import {compose, withDatabase, withObservables} from "@nozbe/watermelondb/react";
import Recipe from "../../model/Recipe";
import {RecipeNavigatorParams} from "./RecipesNavigator";
import {Database} from "@nozbe/watermelondb";

type Props = {
  recipes: Recipe[];
  count: number;
  filter?: string;
}

function RecipesOverview({recipes}: Props) {
  const navigation = useNavigation<RecipeNavigatorParams>();

  const [search, setSearch] = useState('');
  const filteredRecipes = recipes.filter(recipe =>
      recipe.name.toLowerCase().includes(search.toLowerCase())
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerSearchBarOptions: {
        inputType: 'text',
        onChangeText: (event) => setSearch(event.nativeEvent.text),
      },
    });
  }, [])


  return (
      <SafeAreaView style={{flex: 1}}>
        <FlashList
            data={filteredRecipes}
            renderItem={({item}) =>
                <RecipeListItem
                    recipe={item}
                    onPress={() => navigation.navigate('RecipeDetails', {id: item.id})}
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

const enhance = compose(
    withDatabase,
    withObservables([], ({database}: { database: Database }) => ({
      recipes: database.collections.get<Recipe>('recipes').query().observeWithColumns(["name", "description"]),
    })),
)

export default enhance(RecipesOverview)
