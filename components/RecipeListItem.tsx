import {Image, Pressable, StyleSheet, Text, View} from 'react-native';

type Props = {
  id: string;
  name: string;
  description: string;
  onPress?: () => void;
}

export default function RecipeListItem(props: Props) {
  return (
      <Pressable onPress={props.onPress}>
        <View style={styles.container}>
          <Image style={styles.image} source={{uri: 'https://picsum.photos/200'}}/>
          <View style={styles.details}>
            <Text style={styles.title}>
              {props.name}
            </Text>
            <Text style={styles.description}>
              {props.description}
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
    borderBottomWidth: 1,
    borderBottomColor: '#eeeeee',
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
