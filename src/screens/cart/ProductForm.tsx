import {StyleSheet, View} from 'react-native'
import React, {ReactNode,} from 'react'
import {useDatabase} from "@nozbe/watermelondb/react";
import useProductForm, {ProductFormValues} from "./useProductForm";
import InputField from "../../components/InputField";
import FormButton from "../../components/FormButton";
import Product from "../../model/Product";


export default function ProductForm() {
  const database = useDatabase()
  const {control, handleSubmit} = useProductForm()

  async function handleCreate(values: ProductFormValues) {
    // TODO: Build wrapper which checks if product should be added or existing quantity increased

    await database.write(async () => {
      await database.get<Product>('products').create((recipe) => {
        recipe.name = values.name
      })
    })
  }

  return (
      <View style={styles.container}>
        <InputField control={control} name="name" label="Name"/>
        <FormButton label="Add" onPress={handleSubmit(handleCreate)}/>
      </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});
