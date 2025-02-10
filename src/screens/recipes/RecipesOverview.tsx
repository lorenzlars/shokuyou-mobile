import { SafeAreaView, View } from 'react-native';
import RecipeListItem from './RecipeListItem';
import { useLayoutEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { FlashList } from '@shopify/flash-list';
import { compose, withDatabase, withObservables } from '@nozbe/watermelondb/react';
import Recipe from '../../model/Recipe';
import { RecipesNavigatorParams } from './RecipesNavigator';
import { Database } from '@nozbe/watermelondb';
import { ObservableProps } from '../../types/watermelondb';

type Props = {
  recipes: Recipe[];
};

function RecipesOverview({ recipes }: Props) {
  const navigation = useNavigation<RecipesNavigatorParams>();

  const [search, setSearch] = useState('');
  const filteredRecipes = recipes.filter((recipe) =>
    recipe.name.toLowerCase().includes(search.toLowerCase()),
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerSearchBarOptions: {
        inputType: 'text',
        onChangeText: (event) => setSearch(event.nativeEvent.text),
      },
    });
  }, [navigation]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlashList
        contentInsetAdjustmentBehavior="automatic"
        data={filteredRecipes}
        renderItem={({ item }) => (
          <RecipeListItem
            recipe={item}
            onPress={() => navigation.navigate('RecipeDetails', { id: item.id })}
          />
        )}
        estimatedItemSize={30}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => (
          <View
            style={{ height: 1, backgroundColor: '#d1d1d1', marginLeft: 20, marginRight: 20 }}
          />
        )}
      />
    </SafeAreaView>
  );
}

const enhance = compose(
  withDatabase,
  withObservables<{ database: Database }, ObservableProps<Props>>([], ({ database }) => ({
    recipes: database.collections
      .get<Recipe>('recipes')
      .query()
      .observeWithColumns(['_id', 'name', 'description']),
  })) as any,
);

export default enhance(RecipesOverview);
