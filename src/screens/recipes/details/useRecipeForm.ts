import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { array, number, object, string } from 'yup';

export type RecipeFormValues = {
  name: string;
  description?: string;
  imageUrl?: string;
  ingredients: {
    name: string;
    unit: string;
    quantity: number;
  }[];
};

export function useRecipeForm(defaultValues?: RecipeFormValues) {
  const schema = object({
    name: string().required().label('Name'),
    description: string().label('Description'),
    imageUrl: string(),
    ingredients: array().of(
      object({
        name: string().required().label('Name'),
        unit: string().required().label('Unit'),
        quantity: number().required().label('Quantity'),
      }),
    ),
  });

  return useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });
}
