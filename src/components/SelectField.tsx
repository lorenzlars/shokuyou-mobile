import {Control, Controller, FieldValues, Path} from "react-hook-form";
import {StyleSheet, TextInput, View, Text, TextInputProps} from "react-native";
import BaseSelect, {BaseSelectProps} from "./BaseSelect";

type Props<T extends FieldValues> = BaseSelectProps & {
  control: Control<T>;
  name: Path<T>;
  label?: string;
}

export default function SelectField<T extends FieldValues>({
                                                             control,
                                                             name,
                                                             label,
                                                             ...baseSelectProps
                                                           }: Props<T>) {
  return (
      <Controller
          control={control}
          name={name}
          render={({field: {onChange, value}}) => (
              <BaseSelect
                  onValueChange={onChange}
                  value={value}
                  {...baseSelectProps}
              />
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
