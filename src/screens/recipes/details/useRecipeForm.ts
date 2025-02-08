import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {object, string} from "yup";

export type RecipeFormValues = {
  name: string;
  description: string;
  imageUrl: string;
}

export function useRecipeForm(defaultValues?: RecipeFormValues) {
  const schema = object({
    name: string().required().label('Name'),
    description: string().required().label('Description'),
    imageUrl: string(),
  })

  return useForm({
    defaultValues,
    resolver: yupResolver(schema),
  })
}
