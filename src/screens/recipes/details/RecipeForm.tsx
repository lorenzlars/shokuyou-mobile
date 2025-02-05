import {Image, ScrollView, StyleSheet, View} from 'react-native';
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {RootParamList} from "../../../App";
import {useEffect, useLayoutEffect} from "react";
import {useNavigation} from "@react-navigation/native";
import NavigationButton from "../../../components/NavigationButton";
import Recipe from "../../../model/Recipe";
import InputField from "../../../components/InputField";
import {RecipeFormValues, useRecipeForm} from "./useRecipeForm";
import {withObservables, useDatabase, compose, withDatabase} from "@nozbe/watermelondb/react";
import {EnhancedPropsWithDatabase, ObservableProps} from "../../../types/watermelondb";

type Props = {
  recipe?: Recipe
}

export function RecipeForm({recipe}: Props) {
  const navigation = useNavigation();
  const database = useDatabase()
  const {control, handleSubmit, reset} = useRecipeForm()

  console.log('loaded', recipe)
  useEffect(() => {

    if (recipe) {
      reset({
        name: recipe.name,
        description: recipe.description,
      })
    }
  }, [])

  useLayoutEffect(() => {
    navigation.setOptions({
      title: recipe ? 'Edit Recipe' : 'New Recipe',
      headerLeft: () => (
          <NavigationButton name="close" theme="danger" onPress={navigation.goBack}/>
      ),
      headerRight: () => (
          <NavigationButton name="check" theme="success"
                            onPress={handleSubmit(recipe ? handleUpdate : handleCreate)}/>
      ),
    });
  }, [navigation]);

  async function handleCreate(values: RecipeFormValues) {
    await database.write(async () => {
      await database.get<Recipe>('recipes').create((recipe) => {
        recipe.name = values.name
        recipe.description = values.description
      })
      navigation.goBack();
    })
  }

  async function handleUpdate(values: RecipeFormValues) {
    await database.write(async () => {
      await recipe!.update(() => {
        recipe!.name = values.name
        recipe!.description = values.description
      })
    })

    navigation.goBack();
  }

  return (
      <ScrollView style={styles.container}>
        <View>
          <Image style={styles.image} source={{uri: 'https://picsum.photos/200'}}/>
          <InputField
              control={control}
              name="name"
              label="Name"/>
          <InputField
              control={control}
              name="description"
              label="Description"/>
        </View>
      </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
    padding: 10,
  },
  image: {
    height: 200,
    borderRadius: 8,
  },
});

type EnhancedProps = EnhancedPropsWithDatabase<NativeStackScreenProps<RootParamList, 'RecipeEditForm'>>

const enhance = compose(
    withDatabase,
    withObservables<EnhancedProps, ObservableProps<Props>>([], ({route, database}) => ({
      recipe: database.collections.get<Recipe>('recipes').findAndObserve(route.params.id),
    })) as any,
)

export const RecipeEditForm = enhance(RecipeForm)
