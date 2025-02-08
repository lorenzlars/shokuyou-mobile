import {Control, Controller, FieldValues, Path} from "react-hook-form";
import {StyleSheet, TextInput, View, Text, TextInputProps} from "react-native";

type Props<T extends FieldValues> = TextInputProps & {
  control: Control<T>;
  name: Path<T>;
  label?: string;
}

export default function InputField<T extends FieldValues>({
                                                            control,
                                                            name,
                                                            label,
                                                            ...textInputProps
                                                          }: Props<T>) {
  return (

      <Controller
          control={control}
          name={name}
          render={({field: {onChange, onBlur, value}, fieldState: {error}}) => (
              <View>
                <View style={[styles.container, {borderColor: error?.message ? 'red' : '#bbbbbb'}]}>
                  <Text style={styles.label}>{label}</Text>
                  <TextInput
                      style={styles.input}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      {...textInputProps}
                  />
                </View>
                <Text style={styles.error}>{error?.message}</Text>
              </View>
          )}
      />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderColor: '#eeeeee',
    backgroundColor: '#ffffff',
    borderWidth: 0.5,
    borderRadius: 10,
    gap: 4,
  },
  label: {
    fontSize: 12,
    color: '#777777',
  },
  input: {
    color: '#000000',
  },
  error: {
    color: 'red',
  }
});
