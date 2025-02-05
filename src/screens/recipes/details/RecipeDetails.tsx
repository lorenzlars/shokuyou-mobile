import {Image, Text, ScrollView, StyleSheet, View} from 'react-native';
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {useEffect, useLayoutEffect} from "react";
import {useNavigation} from "@react-navigation/native";
import NavigationButton from "../../../components/NavigationButton";
import Recipe from "../../../model/Recipe";
import {database} from "../../../model";
import ContextMenu from "react-native-context-menu-view";
import {useRecipeForm} from "./useRecipeForm";
import {RecipeNavigatorParams} from "../RecipesNavigator";
import {RootParamList} from "../../../App";

type Props = NativeStackScreenProps<RootParamList, 'RecipeDetails'>;

export default function RecipeDetails({route}: Props) {
  const navigation = useNavigation<RecipeNavigatorParams>();
  const {control, handleSubmit, reset} = useRecipeForm()

  useEffect(() => {
    if (route.params?.recipe) {
      const recipe = route.params.recipe;

      reset({
        name: recipe.name,
        description: recipe.description,
      })
    }
  }, [])

  async function handleDelete() {
    await database.write(async () => {
      const recipe = await database.get<Recipe>('recipes').find(route.params.recipe!.id)
      await recipe.destroyPermanently();
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
                    return navigation.navigate('RecipeForm', {recipe: route.params.recipe});
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
            <Text style={styles.title}>{route.params.recipe.name}</Text>
            <Text style={styles.contentField}>{route.params.recipe.description}</Text>
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
