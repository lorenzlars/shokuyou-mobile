import {FlatList, Platform, View} from 'react-native';
import RecipeListItem from "../components/RecipeListItem";
import {useState} from "react";

export default function Recipes() {
  const [data, setData] = useState();
  const x = Array.from({length: 10}, (_, i) => ({
    id: `${Math.round(Math.random() * 1000000)}`,
    name: "dolore et et",
    description: "Adipisicing ad velit dolor ipsum amet labore id mollit pariatur."
  }))

  return (
      <View>
        <FlatList
            data={data}
            renderItem={({item: recipe}) => <RecipeListItem {...recipe} />}
            keyExtractor={(item) => item.id}
        />
      </View>
  );
}


