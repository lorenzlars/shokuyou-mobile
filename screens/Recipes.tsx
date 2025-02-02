import {StyleSheet, View} from 'react-native';
import RecipeListItem from "../components/RecipeListItem";
import {useLayoutEffect, useState} from "react";
import {useNavigation} from "@react-navigation/native";
import NavigationButton from "../components/NavigationButton";
import {FlashList} from "@shopify/flash-list";

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
    navigation.getParent()?.setOptions({
      headerLargeTitle: true,
      headerSearchBarOptions: {
        inputType: 'text',
        onChangeText: (event) => setSearch(event.nativeEvent.text),

      },
      headerRight: () => <NavigationButton name="plus"
                                           onPress={() => navigation.navigate('Recipe')}/>,
    });
  }, [navigation]);

  return (
      <FlashList
          data={data}
          renderItem={({item: recipe}) =>
              <RecipeListItem {...recipe}
                              onPress={() => navigation.navigate('Recipe', {id: recipe.id})}/>}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={() => <View
              style={{height: 1, backgroundColor: '#d1d1d1', marginLeft: 20, marginRight: 20}}/>}
      />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});


