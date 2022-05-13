import { DateTimePicker, DateTimePickerProps } from '@mui/lab';
import { TextFieldProps, TextField } from '@mui/material';
import { rules } from '@typescript-eslint/eslint-plugin';
import {
  FieldValues,
  FieldPath,
  Control,
  ControllerProps,
  Controller,
} from 'react-hook-form';
import FormTextField from './FormTextField';

export interface FormDateTimePicker<
  T extends FieldValues,
  J extends FieldPath<T>
> {
  name: J;
  control: Control<T>;
  controllerProps?: Partial<ControllerProps<T, J>>;
  dateTimePickerProps?: Partial<DateTimePickerProps<Date>>;
}

const FormDateTimePicker = <T extends FieldValues, J extends FieldPath<T>>({
  name,
  control,
  controllerProps = {},
  dateTimePickerProps = {},
  ...props
}: FormDateTimePicker<T, J> & TextFieldProps) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({
        field: { onChange, onBlur, value, name, ref },
        fieldState: { error },
      }) => (
        <DateTimePicker
          value={value as Date | null}
          onChange={onChange}
          renderInput={(params: TextFieldProps) => (
            <TextField
              id={name}
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              inputRef={ref}
              error={!!error}
              helperText={error ? error.message : null}
              {...params}
              {...props}
            />
          )}
          {...dateTimePickerProps}
        />
      )}
      {...controllerProps}
    />
  );
};

export default FormDateTimePicker;
