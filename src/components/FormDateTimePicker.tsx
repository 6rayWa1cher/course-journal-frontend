import { DateTimePicker, DateTimePickerProps } from '@mui/lab';
import { TextFieldProps, TextField } from '@mui/material';
import {
  FieldValues,
  FieldPath,
  Control,
  ControllerProps,
  Controller,
} from 'react-hook-form';

export interface FormDateTimePickerProps<
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
  disabled = false,
  ...props
}: FormDateTimePickerProps<T, J> & TextFieldProps) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { onChange, onBlur, value, name, ref },
        fieldState: { error },
      }) => (
        <DateTimePicker
          mask="__.__.____ __:__"
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
          {...dateTimePickerProps}
        />
      )}
      {...controllerProps}
    />
  );
};

export default FormDateTimePicker;
