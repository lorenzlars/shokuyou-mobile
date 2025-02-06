import {Control, Controller, FieldValues, Path} from "react-hook-form";
import {StyleSheet, TextInput, View, Text, TextInputProps} from "react-native";

type Props<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  placeholder?: TextInputProps['placeholder'];
  autoComplete?: TextInputProps['autoComplete'];
  secureTextEntry?: TextInputProps['secureTextEntry'];
}

export default function InputField<T extends FieldValues>(props: Props<T>) {
  return (

      <Controller
          control={props.control}
          name={props.name}
          render={({field: {onChange, onBlur, value}, fieldState: {error}}) => (
              <>
                <View style={styles.container}>
                  <Text>{props.label}</Text>
                  <TextInput
                      style={styles.input}
                      placeholder={props.placeholder}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      autoComplete={props.autoComplete}
                      secureTextEntry={props.secureTextEntry}
                  />
                </View>
                {error?.message && <Text style={styles.error}>{error.message}</Text>}
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
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  input: {
    flex: 1,
    color: '#000000',
    maxWidth: '70%',
  },
  error: {
    color: 'red',
  }
});
