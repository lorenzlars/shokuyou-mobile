import {StyleSheet, Text, View} from 'react-native';
import {useCallback, useLayoutEffect} from "react";
import {useFocusEffect, useIsFocused, useNavigation, useRoute} from "@react-navigation/native";
import NavigationHeader from "../../components/NavigationHader";

export default function Settings() {
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
