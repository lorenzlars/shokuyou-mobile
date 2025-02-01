import {StatusBar} from 'expo-status-bar';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import RecipeListItem from "./components/RecipeListItem";
import {useState} from "react";

export default function App() {
  const [data, setData] = useState(Array.from({length: 1000}, (_, i) => ({
    id: `${Math.random()}`,
    name: "dolore et et",
    description: "Adipisicing ad velit dolor ipsum amet labore id mollit pariatur."
  })));

  return (
      <>
        <StatusBar style="auto"/>
        <View style={styles.container}>
          <FlatList
              data={data}
              renderItem={({item: recipe}) => <RecipeListItem {...recipe} />}
              keyExtractor={(item) => item.id}
          />
        </View>
      </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
});
