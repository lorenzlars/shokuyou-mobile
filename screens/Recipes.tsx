import {FlatList, SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import RecipeListItem from "../components/RecipeListItem";
import {useLayoutEffect, useState} from "react";
import {useNavigation} from "@react-navigation/native";
import NavigationButton from "../components/NavigationButton";

export default function Recipes() {
  const navigation = useNavigation();

  const [search, setSearch] = useState('');
  const [data, setData] = useState(Array.from({length: 100}, (_, i) => ({
    id: `${Math.round(Math.random() * 1000000)}`,
    name: "dolore et et",
    description: "Adipisicing ad velit dolor ipsum amet labore id mollit pariatur."
  })));
  const filteredRecipes = data.filter(recipe =>
      recipe.name.toLowerCase().includes(search.toLowerCase())
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Recipes',
      headerSearchBarOptions: {
        inputType: 'text',
        onChangeText: (event) => setSearch(event.nativeEvent.text),

      },
      headerRight: () => <NavigationButton name="plus"
                                           onPress={() => navigation.navigate('Recipe')}/>,
    });
    navigation.getParent()?.setOptions({
      title: 'Recipesss',
    })
  }, [navigation]);

  return (
      <SafeAreaView>
        {/*<FlatList*/}
        {/*    data={data}*/}
        {/*    renderItem={({item: recipe}) => <RecipeListItem {...recipe} />}*/}
        {/*    keyExtractor={(item) => item.id}*/}
        {/*    initialNumToRender={10}*/}
        {/*/>*/}
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          {filteredRecipes.map((recipe) => <RecipeListItem {...recipe}
                                                           key={recipe.id}
                                                           onPress={() => navigation.navigate('Recipe', {id: recipe.id})}/>)}
        </ScrollView>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});


