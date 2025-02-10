import { Image, SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootParamList } from '../../../App';
import { useEffect, useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import NavigationButton from '../../../components/NavigationButton';
import Recipe from '../../../model/Recipe';
import InputField from '../../../components/InputField';
import { RecipeFormValues, useRecipeForm } from './useRecipeForm';
import { withObservables, useDatabase, compose, withDatabase } from '@nozbe/watermelondb/react';
import { EnhancedPropsWithDatabase, ObservableProps } from '../../../types/watermelondb';
import * as ImagePicker from 'expo-image-picker';
import FormButton from '../../../components/FormButton';
import { Controller } from 'react-hook-form';

type Props = {
  recipe?: Recipe;
};

export function RecipeForm({ recipe }: Props) {
  const navigation = useNavigation();
  const database = useDatabase();
  const { control, handleSubmit, reset, setValue } = useRecipeForm();

  useEffect(() => {
    if (recipe) {
      reset({
        name: recipe.name,
        description: recipe.description,
        imageUrl: recipe.imageUrl,
      });
    }
  }, [recipe, reset]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: recipe ? 'Edit Recipe' : 'New Recipe',
      headerLeft: () => (
        <NavigationButton icon="close" theme="danger" onPress={navigation.goBack} />
      ),
      headerRight: () => (
        <NavigationButton
          icon="check"
          theme="success"
          onPress={handleSubmit(recipe ? handleUpdate : handleCreate)}
        />
      ),
    });

    async function handleCreate(values: RecipeFormValues) {
      await database.write(async () => {
        await database.get<Recipe>('recipes').create((recipe) => {
          recipe.name = values.name;
          recipe.description = values.description;
        });
        navigation.goBack();
      });
    }

    async function handleUpdate(values: RecipeFormValues) {
      await database.write(async () => {
        await recipe!.update(() => {
          recipe!.name = values.name;
          recipe!.description = values.description;
        });
      });

      navigation.goBack();
    }
  }, [navigation, database, recipe, handleSubmit]);

  // function createFile() {
  //   try {
  //     const file = new File(Paths.cache, 'example.txt');
  //     file.create(); // can throw an error if the file already exists or no permission to create it
  //     file.write('Hello, world!');
  //     console.log(file.text()); // Hello, world!
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  async function pickImage() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setValue('imageUrl', result.assets[0].uri);
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <View style={styles.container}>
          <Controller
            control={control}
            name="imageUrl"
            render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
              <Image style={styles.image} source={{ uri: value }} />
            )}
          />
          <FormButton onPress={pickImage} label="Pick Image" />
          <InputField control={control} name="name" label="Name" />
          <InputField control={control} name="description" label="Description" />
        </View>
      </ScrollView>
    </SafeAreaView>
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

type EnhancedProps = EnhancedPropsWithDatabase<
  NativeStackScreenProps<RootParamList, 'RecipeEditForm'>
>;

const enhance = compose(
  withDatabase,
  withObservables<EnhancedProps, ObservableProps<Props>>([], ({ route, database }) => ({
    recipe: database.collections.get<Recipe>('recipes').findAndObserve(route.params.id),
  })) as any,
);

export const RecipeEditForm = enhance(RecipeForm);
