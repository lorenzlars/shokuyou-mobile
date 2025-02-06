import {Button, StyleSheet, Text, View} from 'react-native';
import {useCallback, useEffect, useLayoutEffect, useState} from "react";
import {useFocusEffect, useIsFocused, useNavigation, useRoute} from "@react-navigation/native";
import NavigationHeader from "../../components/NavigationHader";
import InputField from "../../components/InputField";
import {LoginFormValues, useLoginForm} from "./useLoginForm";
import {useDatabase} from "@nozbe/watermelondb/react";
import axios, {AxiosError, AxiosResponse} from "axios";
import {AuthService} from "../../api";

export default function Settings() {
  const {control, handleSubmit, reset} = useLoginForm()
  const database = useDatabase()
  const [isLoggedIn, setLogin] = useState(false)

  useEffect(() => {
    database.localStorage.get("accessToken").then((value) => {

      setLogin(!!value)
    })

  }, [])

  async function handleLogin(values: LoginFormValues) {
    try {
      const {data} = await AuthService.userLogin({
        body: values
      })

      console.log(data)

      await database.localStorage.set("accessToken", data?.accessToken)

    } catch (e: AxiosError) {
      console.log(e.response.config.baseURL)
    }
  }

  return (
      <View style={styles.container}>
        <InputField
            control={control}
            name="username"
            label="Username"
            autoComplete="username"
        />
        <InputField
            control={control}
            name="password"
            label="Password"
            autoComplete="current-password"
            secureTextEntry={true}
        />
        <Button title="Login" onPress={handleSubmit(handleLogin)}/>
        <Text>{isLoggedIn ? 'True' : 'False'}</Text>
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
