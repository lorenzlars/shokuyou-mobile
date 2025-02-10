import { Button, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import useProductForm from './useProductForm';
import InputField from '../../components/InputField';
import SelectField from '../../components/SelectField';

enum IngredientUnit {
  GRAM = 'gram',
  KILOGRAM = 'kilogram',
  LITER = 'liter',
  MILLILITER = 'milliliter',
  CUP = 'cup',
  TABLESPOON = 'tablespoon',
  TEASPOON = 'teaspoon',
  OUNCE = 'ounce',
  POUND = 'pound',
  PIECE = 'piece',
  PINCH = 'pinch',
  DASH = 'dash',
}

const IngredientUnitArray = Object.values(IngredientUnit);

export default function ProductForm() {
  const { control, setValue, getValues } = useProductForm();

  function handleAdd(quantity: number) {
    const { quantity: currentQuantity } = getValues();

    setValue('quantity', currentQuantity ? currentQuantity + quantity : quantity);
    setValue('unit', IngredientUnit.GRAM);
  }

  return (
    <View style={styles.container}>
      <InputField control={control} name="name" label="Name" />
      <InputField control={control} name="quantity" label="Quantity" inputMode="numeric" />
      <Button title="+ 1g" onPress={() => handleAdd(1)}></Button>
      <Button title="+ 10g" onPress={() => handleAdd(10)}></Button>
      <Button title="+ 100g" onPress={() => handleAdd(100)}></Button>
      <Text>Unit</Text>
      <SelectField control={control} name="unit" options={IngredientUnitArray} />
      {/*<FormButton label="Add" onPress={handleSubmit(handleCreate)} />*/}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});
