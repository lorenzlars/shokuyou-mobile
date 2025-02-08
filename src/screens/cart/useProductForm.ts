import {number, object, string} from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";

export type ProductFormValues = {
  name: string;
  unit?: string;
  quantity?: number;
}

export default function useProductForm(defaultValues?: ProductFormValues) {
  const schema = object({
    name: string().required().label('Name'),
    unit: string().label('Description'),
    quantity: number().label('Quantity'),
  })

  return useForm({
    defaultValues,
    resolver: yupResolver(schema),
  })
}
