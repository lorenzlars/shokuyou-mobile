import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {object, string} from "yup";

export type RecipeFormValues = {
  name: string;
  description: string;
}

export function useRecipeForm(defaultValues?: RecipeFormValues) {
  const schema = object({
    name: string().required().label('Name'),
    description: string().required().label('Description'),
  })

  return useForm({
    defaultValues,
    resolver: yupResolver(schema),
  })
}
