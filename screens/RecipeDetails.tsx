import {Alert, StyleSheet, Text, TextInput, View} from 'react-native';
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {RootStackParamList} from "../App";
import React, {useState} from "react";
import {useNavigation} from "@react-navigation/native";
import NavigationButton from "../components/NavigationButton";
import {database} from "../model";
import Recipe from "../model/Recipe";

export type RecipeScreenNavigationProps = NativeStackScreenProps<RootStackParamList, 'Recipe'>;

export default function RecipeDetails(props: RecipeScreenNavigationProps) {
  const [name, setName] = useState<string>()
  const navigation = useNavigation();
  const params = props.route.params;

  async function handleCreate() {
    await database.get<Recipe>('recipes').create((recipe) => {
      recipe.name = ''
    })
    Alert.alert('Created', 'Recipe created');
    navigation.goBack();
  }

  React.useLayoutEffect(() => {
    if (params?.id) {
      navigation.setOptions({
        title: params.id,
      });
    } else {
      navigation.setOptions({
        headerLeft: () => (
            <NavigationButton name="close" theme="danger" onPress={() => navigation.goBack()}/>
        ),
        headerRight: () => (
            <NavigationButton name="check" theme="success" onPress={handleCreate}/>
        ),
      });
    }

  }, [navigation]);

  return (
      <View style={styles.container}>
        <TextInput value={name} onChangeText={setName}/>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 58,
  },
});
