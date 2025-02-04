import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup"

export type RecipeFormValues = {
  name: string;
  description: string;
}

export function useRecipeForm(defaultValues?: RecipeFormValues) {
  const schema = yup.object({
    name: yup.string().required().label('Name'),
    description: yup.string().required().label('Description'),
  })

  return useForm({
    defaultValues,
    resolver: yupResolver(schema),
  })
}
