import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import InputField from "../../components/InputField";
import {LoginFormValues, useLoginForm} from "./useLoginForm";
import FormButton from "../../components/FormButton";
import {useNavigation} from "@react-navigation/native";
import {SettingsNavigatorParams} from "./SettingsNavigator";
import {useState} from "react";
import {AxiosError} from "axios";
import {useCloud} from "../../providers/CloudProvider";

export default function SettingsAccount() {
  const navigation = useNavigation<SettingsNavigatorParams>()
  const {control, handleSubmit} = useLoginForm()
  const {signIn} = useCloud()
  const [error, setError] = useState<string>()

  async function handleLogin(values: LoginFormValues) {
    try {
      await signIn(values.username, values.password)

      navigation.pop()
    } catch (error) {
      if (error instanceof AxiosError && error.response?.status === 401) {
        setError("Invalid username or password")
      } else {
        setError("Unknown error")
      }
    }
  }

  return (
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.container}>
          <Text style={styles.title}>Shokuyou Cloud</Text>
          <Text style={styles.description}>Sync all your data across all your devices.</Text>
          <InputField
              control={control}
              name="username"
              label="Username"
              placeholder="Required"
              autoComplete="username"
              autoCorrect={false}
          />
          <InputField
              control={control}
              name="password"
              label="Password"
              placeholder="Required"
              autoComplete="current-password"
              secureTextEntry={true}
              autoCorrect={false}
          />
          <FormButton label="Sign in" onPress={handleSubmit(handleLogin)}/>
          <Text style={{color: 'red'}}>{error}</Text>
          <Text style={styles.description}>Don't have an account? Sign up now.</Text>
        </View>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 10,
    padding: 10,
  },
  title: {
    fontSize: 32,
    marginTop: 32,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  description: {
    color: '#aaaaaa',
    textAlign: 'center',
    marginBottom: 32,
  }
});
