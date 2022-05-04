import React from 'react';
import { TextField, TextFieldProps } from '@mui/material';
import {
  Control,
  Controller,
  ControllerProps,
  FieldPath,
  FieldValues,
} from 'react-hook-form';

export interface FormTextFieldProps<
  T extends FieldValues,
  J extends FieldPath<T>
> {
  name: J;
  control: Control<T>;
  controllerProps?: Partial<ControllerProps<T, J>>;
}

const FormTextField = <T extends FieldValues, J extends FieldPath<T>>({
  name,
  control,
  controllerProps = {},
  ...fieldProps
}: FormTextFieldProps<T, J> & TextFieldProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, onBlur, value, name, ref },
        fieldState: { error },
      }) => (
        <TextField
          id={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          inputRef={ref}
          error={!!error}
          helperText={error ? error.message : null}
          {...fieldProps}
        />
      )}
      {...controllerProps}
    />
  );
};

export default FormTextField;
