import {
  FormControl,
  FormControlProps,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  OutlinedInputProps,
  FilledInput,
  Input,
} from '@mui/material';
import { useCallback } from 'react';
import {
  Control,
  Controller,
  ControllerProps,
  FieldPath,
  FieldValues,
} from 'react-hook-form';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export interface PasswordInputProps<
  T extends FieldValues,
  J extends FieldPath<T>
> extends Partial<FormControlProps> {
  name: J;
  control: Control<T>;
  label?: string;
  visible: boolean;
  setVisible: (value: boolean) => void;
  variant?: 'outlined' | 'standard' | 'filled';
  controllerProps?: Partial<ControllerProps<T, J>>;
  inputProps?: Partial<OutlinedInputProps>;
  additionalAdornment?: Children;
}

const PasswordInput = <T extends FieldValues, J extends FieldPath<T>>({
  name,
  control,
  controllerProps = {},
  visible,
  setVisible,
  label = 'Password',
  variant = 'standard',
  inputProps = {},
  additionalAdornment,
  ...fieldProps
}: PasswordInputProps<T, J>) => {
  const handleButtonClick = useCallback(
    () => setVisible(!visible),
    [visible, setVisible]
  );
  const handleMouseDownPassword = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
    },
    []
  );
  const InputComponent = (() => {
    switch (variant) {
      case 'filled':
        return FilledInput;
      case 'outlined':
        return OutlinedInput;
      case 'standard':
        return Input;
    }
  })();
  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, onBlur, value, name, ref },
        fieldState: { error },
      }) => (
        <FormControl
          variant="outlined"
          {...fieldProps}
          sx={{ margin: (theme) => theme.spacing(2, 0, 1) }}
        >
          <InputLabel htmlFor="outlined-adornment-password">{label}</InputLabel>
          <InputComponent
            id="outlined-adornment-password"
            type={visible ? 'text' : 'password'}
            name={name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            inputRef={ref}
            error={!!error}
            endAdornment={
              <InputAdornment position="end">
                {additionalAdornment}
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleButtonClick}
                  onMouseDown={handleMouseDownPassword}
                >
                  {visible ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label={label}
            {...inputProps}
          />
          {error && <FormHelperText error>{error.message}</FormHelperText>}
        </FormControl>
      )}
      {...controllerProps}
    />
  );
};

export default PasswordInput;
