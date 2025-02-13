import { Button, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { IngredientUnit } from '../../../types/model';
import InputField from '../../../components/InputField';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootParamList } from '../../../App';

export default function RecipeIngredientForm({
  route,
}: NativeStackScreenProps<RootParamList, 'RecipeIngredientForm'>) {
  const { control, setValue, getValues } = route.params.formContext;

  function handleAdd(quantity: number) {
    const { quantity: currentQuantity } = getValues();

    setValue('quantity', currentQuantity ? currentQuantity + quantity : quantity);
    setValue('unit', IngredientUnit.GRAM);
  }

  return (
    <View style={styles.container}>
      <InputField control={control} name={`ingredients.${route.params.id}.name`} label="Name" />
      {/*<InputField*/}
      {/*  control={control}*/}
      {/*  name={`ingredients.${route.params.id}.quantity`}*/}
      {/*  label="Quantity"*/}
      {/*  inputMode="numeric"*/}
      {/*/>*/}
      <Button title="+ 1g" onPress={() => handleAdd(1)}></Button>
      <Button title="+ 10g" onPress={() => handleAdd(10)}></Button>
      <Button title="+ 100g" onPress={() => handleAdd(100)}></Button>
      <Text>Unit</Text>
      {/*<SelectField*/}
      {/*  control={control}*/}
      {/*  name={`ingredients.${route.params.id}.unit`}*/}
      {/*  options={IngredientUnits}*/}
      {/*/>*/}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});
