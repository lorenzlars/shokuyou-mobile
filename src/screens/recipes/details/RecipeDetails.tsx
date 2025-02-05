import {Image, Text, ScrollView, StyleSheet, View} from 'react-native';
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {useLayoutEffect} from "react";
import {useNavigation} from "@react-navigation/native";
import NavigationButton from "../../../components/NavigationButton";
import Recipe from "../../../model/Recipe";
import ContextMenu from "react-native-context-menu-view";
import {RecipeNavigatorParams} from "../RecipesNavigator";
import {RootParamList} from "../../../App";
import {compose, useDatabase, withDatabase, withObservables} from "@nozbe/watermelondb/react";
import {EnhancedPropsWithDatabase} from "../../../types/watermelondb";

type Props = {
  recipe: Recipe
}

function RecipeDetails({recipe}: Props) {
  const navigation = useNavigation<RecipeNavigatorParams>();
  const database = useDatabase()

  async function handleDelete() {
    await database.write(async () => {
      const recipeEntity = await database.get<Recipe>('recipes').find(recipe.id)
      await recipeEntity.destroyPermanently();
    })

    navigation.goBack();
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
          <ContextMenu
              actions={[{title: "Edit"}, {title: "Delete"}]}
              onPress={({nativeEvent}) => {
                switch (nativeEvent.name) {
                  case "Delete":
                    return handleDelete();
                  case "Edit":
                    return navigation.navigate('RecipeEditForm', {id: recipe.id});
                }
              }}
              dropdownMenuMode={true}
          >
            <NavigationButton name="dots-horizontal"/>
          </ContextMenu>
      ),
    });
  }, [navigation]);

  return (
      <ScrollView>
        <View>
          <Image style={styles.image} source={{uri: 'https://picsum.photos/200'}}/>
          <View style={styles.container}>
            <Text style={styles.title}>{recipe.name}</Text>
            <Text style={styles.contentField}>{recipe.description}</Text>
          </View>
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

type EnhancedProps = EnhancedPropsWithDatabase<NativeStackScreenProps<RootParamList, 'RecipeDetails'>>;

const enhance = compose(
    withDatabase,
    withObservables([], ({route, database}: EnhancedProps) => ({
      recipe: database.collections.get<Recipe>('recipes').findAndObserve(route.params.id),
    })),
)

export default enhance(RecipeDetails)
