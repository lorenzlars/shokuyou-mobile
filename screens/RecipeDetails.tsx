import {Alert, SafeAreaView, StyleSheet, Text, TextInput, View} from 'react-native';
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {RootStackParamList} from "../App";
import {useLayoutEffect, useState} from "react";
import {useNavigation} from "@react-navigation/native";
import NavigationButton from "../components/NavigationButton";
import Recipe from "../model/Recipe";
import {database} from "../model";
import ContextMenu from "react-native-context-menu-view";
import InputField from "../components/InputField";
import {RecipeFormValues, useRecipeForm} from "./useRecipeForm";

export type RecipeScreenNavigationProps = NativeStackScreenProps<RootStackParamList, 'Recipe'>;

export default function RecipeDetails(props: RecipeScreenNavigationProps) {
  const navigation = useNavigation();
  const params = props.route.params;

  const {control, handleSubmit} = useRecipeForm()

  function handleBack() {
    navigation.goBack();
  }

  async function handleCreate(values: RecipeFormValues) {
    await database.write(async () => {
      const newRecipe = await database.get<Recipe>('recipes').create((recipe) => {
        recipe.name = values.name
        recipe.description = values.name
      })
      Alert.alert('Created', `Recipe ${newRecipe.name} created`);
      navigation.goBack();
    })
  }

  async function handleDelete() {
    await database.write(async () => {
      const recipe = await database.get<Recipe>('recipes').find(params.id)
      await recipe.destroyPermanently();
    })

    navigation.goBack();
  }

  useLayoutEffect(() => {
    if (params?.id) {
      navigation.setOptions({
        title: params.id,
        headerRight: () => (
            <ContextMenu
                actions={[{title: "Delete"}]}
                onPress={({nativeEvent}) => {
                  switch (nativeEvent.index) {
                    case 0:
                      return handleDelete();
                  }
                }}
                dropdownMenuMode={true}
            >
              <NavigationButton name="dots-horizontal"/>
            </ContextMenu>
        ),
      });
    } else {
      navigation.setOptions({
        headerLeft: () => (
            <NavigationButton name="close" theme="danger" onPress={handleBack}/>
        ),
        headerRight: () => (
            <NavigationButton name="check" theme="success" onPress={handleSubmit(handleCreate)}/>
        ),
      });
    }

  }, [navigation]);

  return (
      <SafeAreaView style={styles.container}>
        <InputField
            control={control}
            name="name"
            placeholder="Name"/>
        <InputField
            control={control}
            name="description"
            placeholder="Description"/>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },
});
