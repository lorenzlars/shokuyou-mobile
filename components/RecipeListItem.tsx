import {Image, StyleSheet, Text, View} from 'react-native';

type Props = {
  name: string;
  description: string;
}

export default function RecipeListItem(props: Props) {
  return (
      <View style={styles.container}>
        <View style={styles.details}>
          <Text style={styles.title}>
            {props.name}
          </Text>
          <Text>
            {props.description}
          </Text>
        </View>
        <Image style={styles.image} source={{uri: 'https://picsum.photos/200'}}/>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    flexDirection: 'row',
    padding: 10,
    gap: 10,
  },
  details: {
    flex: 1,
    flexShrink: 1
  },
  title: {
    fontWeight: 600
  },
  description: {},
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
});
