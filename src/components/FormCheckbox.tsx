import React from 'react';
import {
  Checkbox,
  CheckboxProps,
  FormControlLabel,
  FormHelperText,
} from '@mui/material';
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
  label: string;
  control: Control<T>;
  controllerProps?: Partial<ControllerProps<T, J>>;
}

const FormCheckbox = <T extends FieldValues, J extends FieldPath<T>>({
  name,
  control,
  label,
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
        <>
          <FormControlLabel
            control={
              <Checkbox
                id={name}
                checked={value ?? false}
                onChange={(e) => onChange(e.target.checked)}
                onBlur={onBlur}
                inputRef={ref}
                {...fieldProps}
              />
            }
            label={label}
          />
          {error != null && (
            <FormHelperText error>{error.message}</FormHelperText>
          )}
        </>
      )}
      {...controllerProps}
    />
  );
};

export default FormCheckbox;
