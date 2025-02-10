import { SafeAreaView, Text, View } from 'react-native';
import { compose, useDatabase, withDatabase, withObservables } from '@nozbe/watermelondb/react';
import { Database } from '@nozbe/watermelondb';
import Ingredient from '../../model/Ingredient';
import { FlashList } from '@shopify/flash-list';
import { useLayoutEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { SettingsNavigatorParams } from './SettingsNavigator';
import NavigationButton from '../../components/NavigationButton';

type Props = {
  ingredients: Ingredient[];
  ingredientsCount: number;
};

function SettingsIngredients({ ingredients, ingredientsCount }: Props) {
  const navigation = useNavigation<SettingsNavigatorParams>();
  const database = useDatabase();
  const [search, setSearch] = useState('');
  const filteredIngredients = ingredients.filter((ingredient) =>
    ingredient.name.toLowerCase().includes(search.toLowerCase()),
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerSearchBarOptions: {
        inputType: 'text',
        placeholder: ingredientsCount > 0 ? 'Search ingredients' : 'Create ingredients',
        onChangeText: (event) => setSearch(event.nativeEvent.text),
      },
    });
  }, [ingredientsCount, navigation]);

  async function handleCreate() {
    await database.write(async () => {
      await database.get<Ingredient>('ingredients').create((ingredient) => {
        ingredient.name = search;
      });
    });
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {filteredIngredients.length === 0 && !!search && (
        <NavigationButton icon="plus" onPress={handleCreate} />
      )}
      {filteredIngredients.length > 0 && (
        <FlashList
          contentInsetAdjustmentBehavior="automatic"
          data={filteredIngredients}
          renderItem={({ item }) => <Text>{item.name}</Text>}
          estimatedItemSize={ingredientsCount}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={() => (
            <View
              style={{ height: 1, backgroundColor: '#d1d1d1', marginLeft: 20, marginRight: 20 }}
            />
          )}
        />
      )}
    </SafeAreaView>
  );
}

const enhance = compose(
  withDatabase,
  withObservables<{ database: Database }, any>([], ({ database }) => ({
    ingredients: database.collections
      .get<Ingredient>('ingredients')
      .query()
      .observeWithColumns(['_id', 'name', 'description']),
    ingredientsCount: database.collections.get<Ingredient>('ingredients').query().observeCount(),
  })) as any,
);

export default enhance(SettingsIngredients);
