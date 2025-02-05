import {Button, StyleSheet, Text, View} from 'react-native';
import {useCallback, useLayoutEffect} from "react";
import {useFocusEffect, useIsFocused, useNavigation, useRoute} from "@react-navigation/native";
import NavigationHeader from "../../components/NavigationHader";
import InputField from "../../components/InputField";
import {LoginFormValues, useLoginForm} from "./useLoginForm";

export default function Settings() {
  const {control, handleSubmit} = useLoginForm()

  function handleLogin(values: LoginFormValues) {

  }

  return (
      <View style={styles.container}>
        <InputField
            control={control}
            name="username"
            label="Username"/>
        <InputField
            control={control}
            name="password"
            label="Password"/>
        <Button title="Login" onPress={handleSubmit(handleLogin)}/>
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
