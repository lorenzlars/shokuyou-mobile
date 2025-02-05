import {Image, SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {RootStackNavigatorParamList} from "../../../App";
import {useEffect, useLayoutEffect} from "react";
import {useNavigation} from "@react-navigation/native";
import NavigationButton from "../../../components/NavigationButton";
import Recipe from "../../../model/Recipe";
import {database} from "../../../model";
import ContextMenu from "react-native-context-menu-view";
import InputField from "../../../components/InputField";
import {RecipeFormValues, useRecipeForm} from "./useRecipeForm";

export type RecipeScreenNavigationProps = NativeStackScreenProps<RootStackNavigatorParamList, 'RecipeDetails'>;

export default function RecipeDetails({route}: RecipeScreenNavigationProps) {
  const navigation = useNavigation();
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

  function handleBack() {
    navigation.goBack();
  }

  async function handleCreate(values: RecipeFormValues) {
    await database.write(async () => {
      await database.get<Recipe>('recipes').create((recipe) => {
        recipe.name = values.name
        recipe.description = values.description
      })
      navigation.goBack();
    })
  }

  async function handleDelete() {
    await database.write(async () => {
      const recipe = await database.get<Recipe>('recipes').find(route.params.recipe!.id)
      await recipe.destroyPermanently();
    })

    navigation.goBack();
  }

  useLayoutEffect(() => {
    if (route.params?.recipe) {
      navigation.setOptions({
        headerRight: () => (
            <ContextMenu
                actions={[{title: "Delete"}, {title: "Edit"}]}
                onPress={({nativeEvent}) => {
                  switch (nativeEvent.index) {
                    case 0:
                      return handleDelete();
                    case 1:
                      return navigation.navigate('RecipeForm', {recipe: route.params.recipe});
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
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 99999,
  },
  image: {
    height: 200,
    borderRadius: 8,
  },
});
