import {StyleSheet, Text, View} from 'react-native';
import {RouteProp} from "@react-navigation/native";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {RootStackParamList} from "../App";

export type RecipeScreenNavigationProps = NativeStackScreenProps<RootStackParamList, 'Recipe'>;

export default function Recipe(props: RecipeScreenNavigationProps) {
  const {id} = props.route!.params;

  return (
      <View style={styles.container}>
        <Text>Recipe: {id}</Text>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
});
