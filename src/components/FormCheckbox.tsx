import React from 'react';
import { Checkbox, CheckboxProps } from '@mui/material';
import {
  Control,
  Controller,
  ControllerProps,
  FieldPath,
  FieldValues,
} from 'react-hook-form';

export interface FormCheckboxProps<
  T extends FieldValues,
  J extends FieldPath<T>
> {
  name: J;
  control: Control<T>;
  controllerProps?: Partial<ControllerProps<T, J>>;
}

const FormCheckbox = <T extends FieldValues, J extends FieldPath<T>>({
  name,
  control,
  controllerProps = {},
  ...fieldProps
}: FormCheckboxProps<T, J> & CheckboxProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, onBlur, value, name, ref },
        fieldState: { error },
      }) => (
        <Checkbox
          id={name}
          checked={value}
          onChange={(e) => onChange(e.target.checked)}
          onBlur={onBlur}
          inputRef={ref}
          {...fieldProps}
        />
      )}
      {...controllerProps}
    />
  );
};

export default FormCheckbox;
