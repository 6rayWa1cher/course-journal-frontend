import { DatePicker, DatePickerProps } from '@mui/lab';
import { TextFieldProps, TextField } from '@mui/material';
import {
  FieldValues,
  FieldPath,
  Control,
  Controller,
  ControllerProps,
} from 'react-hook-form';

export interface FormDatePickerProps<
  T extends FieldValues,
  J extends FieldPath<T>
> {
  name: J;
  control: Control<T>;
  controllerProps?: Partial<ControllerProps<T, J>>;
  datePickerProps?: Partial<DatePickerProps<Date>>;
}

const FormDatePicker = <T extends FieldValues, J extends FieldPath<T>>({
  name,
  control,
  controllerProps = {},
  datePickerProps = {},
  disabled = false,
  ...props
}: FormDatePickerProps<T, J> & TextFieldProps) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { onChange, onBlur, value, name, ref },
        fieldState: { error },
      }) => (
        <DatePicker
          mask="__.__.____"
          value={value as Date | null}
          onChange={onChange}
          disabled={disabled}
          renderInput={(params: TextFieldProps) => (
            <TextField
              id={name}
              value={value ?? ''}
              onChange={onChange}
              onBlur={onBlur}
              inputRef={ref}
              error={!!error}
              helperText={error ? error.message : null}
              disabled={disabled}
              {...params}
              {...props}
            />
          )}
          {...datePickerProps}
        />
      )}
      {...controllerProps}
    />
  );
};

export default FormDatePicker;
