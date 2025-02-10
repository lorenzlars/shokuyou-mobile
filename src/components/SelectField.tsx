import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import BaseSelect, { BaseSelectProps } from './BaseSelect';

type Props<T extends FieldValues> = BaseSelectProps & {
  control: Control<T>;
  name: Path<T>;
  label?: string;
};

export default function SelectField<T extends FieldValues>({
  control,
  name,
  label,
  ...baseSelectProps
}: Props<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <BaseSelect onValueChange={onChange} value={value} {...baseSelectProps} />
      )}
    />
  );
}
