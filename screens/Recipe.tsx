import {StyleSheet, Text, View} from 'react-native';
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {RootStackParamList} from "../App";
import React from "react";
import {useNavigation} from "@react-navigation/native";
import NavigationButton from "../components/NavigationButton";

export type RecipeScreenNavigationProps = NativeStackScreenProps<RootStackParamList, 'Recipe'>;

export default function Recipe(props: RecipeScreenNavigationProps) {
  const navigation = useNavigation();
  const params = props.route.params;

  function handleCreate() {
    alert('Created');
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
        <Text>Recipe</Text>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
