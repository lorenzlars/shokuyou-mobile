import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import Recipe from "../../model/Recipe";

type Props = {
  recipe: Recipe;
  onPress?: () => void;
}

export default function RecipeListItem({recipe, onPress}: Props) {
  return (
      <Pressable onPress={onPress}>
        <View style={styles.container}>
          <Image style={styles.image} source={{uri: 'https://picsum.photos/200'}}/>
          <View style={styles.details}>
            <Text style={styles.title}>
              {recipe.name}
            </Text>
            <Text style={styles.description}>
              {recipe.description}
            </Text>
          </View>
        </View>
      </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    flexDirection: 'row',
    padding: 18,
    gap: 18,
  },
  details: {
    flex: 1,
    flexShrink: 1
  },
  title: {
    fontWeight: 700,
    fontSize: 16.5,
  },
  description: {
    color: '#aaaaaa'
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
});
