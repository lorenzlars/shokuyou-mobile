import {StyleSheet, Text, View} from 'react-native';
import {useLayoutEffect} from "react";
import {useNavigation, useRoute} from "@react-navigation/native";

export default function Settings() {
  const navigation = useNavigation();
  const route = useRoute()

  useLayoutEffect(() => {
    navigation.getParent()?.setOptions({
      title: 'Settings',
    });
  }, [route.name]);

  return (
      <View style={styles.container}>
        <Text style={{textAlign: 'center'}}>Settings</Text>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
  },
});
