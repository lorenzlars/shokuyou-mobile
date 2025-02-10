import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { object, string } from 'yup';

export type LoginFormValues = {
  username: string;
  password: string;
};

export function useLoginForm(defaultValues?: LoginFormValues) {
  const schema = object({
    username: string().required().label('Username'),
    password: string().required().label('Password'),
  });

  return useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });
}
