import {Control, Controller} from "react-hook-form";
import {StyleSheet, TextInput, View, Text} from "react-native";

type Props = {
  control: Control;
  name: string;
  placeholder: string
}

export default function InputField(props: Props) {
  return (

      <Controller
          control={props.control}
          name={props.name}
          render={({field: {onChange, onBlur, value}, fieldState: {error}}) => (
              <>
                <View style={styles.container}>
                  <TextInput
                      placeholder={props.placeholder}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                  />
                </View>
                <Text>{error?.message}</Text>
              </>
          )}
      />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 18,
    borderColor: '#eeeeee',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderRadius: 10,
  },
});
