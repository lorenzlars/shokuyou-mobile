import {Alert, StyleSheet, Text, TextInput, View} from 'react-native';
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {RootStackParamList} from "../App";
import {useLayoutEffect, useState} from "react";
import {useNavigation} from "@react-navigation/native";
import NavigationButton from "../components/NavigationButton";
import {database} from "../model";
import Recipe from "../model/Recipe";

export type RecipeScreenNavigationProps = NativeStackScreenProps<RootStackParamList, 'Recipe'>;

export default function RecipeDetails(props: RecipeScreenNavigationProps) {
  const navigation = useNavigation();
  const [name, setName] = useState<string>('')
  const params = props.route.params;

  function handleBack() {
    navigation.goBack();
  }

  async function handleCreate() {
    const newRecipe = await database.get<Recipe>('recipes').create((recipe) => {
      recipe.name = name
      recipe.description = name
    })
    Alert.alert('Created');
    navigation.goBack();
  }

  useLayoutEffect(() => {
    if (params?.id) {
      navigation.setOptions({
        title: params.id,
      });
    } else {
      navigation.setOptions({
        headerLeft: () => (
            <NavigationButton name="close" theme="danger" onPress={handleBack}/>
        ),
        headerRight: () => (
            <NavigationButton name="check" theme="success" onPress={handleCreate}/>
        ),
      });
    }

  }, [navigation]);

  return (
      <View style={styles.container}>
        <TextInput style={{backgroundColor: 'red'}} value={name} onChangeText={setName}/>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
