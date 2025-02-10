import {Button, StyleSheet, Text, View} from 'react-native'
import React from 'react'
import {useDatabase} from "@nozbe/watermelondb/react";
import useProductForm, {ProductFormValues} from "./useProductForm";
import InputField from "../../components/InputField";
import FormButton from "../../components/FormButton";
import Product from "../../model/Product";
import SelectField from "../../components/SelectField";

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
  DASH = 'dash'
}


const IngredientUnitArray = Object.values(IngredientUnit);


export default function ProductForm() {
  const database = useDatabase()
  const {control, handleSubmit, setValue, getValues} = useProductForm()

  async function handleCreate(values: ProductFormValues) {
    // TODO: Build wrapper which checks if product should be added or existing quantity increased

    await database.write(async () => {
      await database.get<Product>('products').create((recipe) => {
        recipe.name = values.name
        recipe.unit = values.unit
        recipe.quantity = values.quantity
      })
    })
  }

  function handleAdd(quantity: number) {
    const {quantity: currentQuantity} = getValues()

    setValue('quantity', currentQuantity ? currentQuantity + quantity : quantity)
    setValue('unit', IngredientUnit.GRAM)
  }

  return (
      <View style={styles.container}>
        <InputField control={control} name="name" label="Name"/>
        <InputField control={control} name="quantity" label="Quantity" inputMode="numeric"/>
        <Button title="+ 1g" onPress={() => handleAdd(1)}></Button>
        <Button title="+ 10g" onPress={() => handleAdd(10)}></Button>
        <Button title="+ 100g" onPress={() => handleAdd(100)}></Button>
        <Text>Unit</Text>
        <SelectField control={control} name="unit" options={IngredientUnitArray}/>
        <FormButton label="Add" onPress={handleSubmit(handleCreate)}/>
      </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});
