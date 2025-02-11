import { Image, Text, ScrollView, StyleSheet, View, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import NavigationButton from '../../../components/NavigationButton';
import Recipe from '../../../model/Recipe';
import ContextMenu from 'react-native-context-menu-view';
import { RecipesNavigatorParams } from '../RecipesNavigator';
import { RootParamList } from '../../../App';
import { compose, useDatabase, withDatabase, withObservables } from '@nozbe/watermelondb/react';
import { EnhancedPropsWithDatabase, ObservableProps } from '../../../types/watermelondb';
import Ingredient from '../../../model/Ingredient';
import { Q } from '@nozbe/watermelondb';
import RecipesIngredients from '../../../model/RecipesIngredients';

type Props = {
  recipe: Recipe;
  ingredients: (Ingredient & RecipesIngredients)[];
};

function RecipeDetails({ recipe, ingredients }: Props) {
  const navigation = useNavigation<RecipesNavigatorParams>();
  const database = useDatabase();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <ContextMenu
          actions={[{ title: 'Edit' }, { title: 'Delete' }]}
          onPress={({ nativeEvent }) => {
            switch (nativeEvent.name) {
              case 'Delete':
                return handleDelete();
              case 'Edit':
                return navigation.navigate('RecipeEditForm', { id: recipe.id });
            }
          }}
          dropdownMenuMode={true}>
          <NavigationButton icon="dots-horizontal" />
        </ContextMenu>
      ),
    });

    async function handleDelete() {
      Alert.alert('Delete', 'Are you sure you want to delete this recipe?', [
        { text: 'Cancel' },
        {
          text: 'Delete',
          onPress: async () => {
            await database.write(async () => {
              const recipeEntity = await database.get<Recipe>('recipes').find(recipe.id);
              await recipeEntity.destroyPermanently();
            });

            navigation.goBack();
          },
          style: 'destructive',
        },
      ]);
    }
  }, [navigation, database, recipe.id]);

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      <View>
        <Image style={styles.image} source={{ uri: 'https://picsum.photos/200' }} />
        <View style={styles.container}>
          <Text style={styles.title}>{recipe.name}</Text>
          <Text style={styles.contentField}>{recipe.description}</Text>
        </View>
        {ingredients.map((ingredient) => (
          <View>
            <Text>{ingredient.name}</Text>
            <Text>{ingredient.unit}</Text>
            <Text>{ingredient.quantity}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    gap: 10,
  },
  image: {
    height: 300,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  contentField: {},
});

type EnhancedProps = EnhancedPropsWithDatabase<
  NativeStackScreenProps<RootParamList, 'RecipeDetails'>
>;

const enhance = compose(
  withDatabase,
  withObservables<EnhancedProps, ObservableProps<Props>>([], ({ route, database }) => ({
    recipe: database.collections.get<Recipe>('recipes').findAndObserve(route.params.id),
    ingredients: database.collections
      .get<Ingredient & RecipesIngredients>('ingredients')
      .query(
        Q.experimentalJoinTables(['recipes_ingredients']),
        Q.on('recipes_ingredients', 'recipe_id', route.params.id),
      )
      .observe(),
  })) as any,
);

export default enhance(RecipeDetails);
