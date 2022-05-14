import { IconButton } from '@mui/material';
import { useCallback } from 'react';
import { FieldPath, FieldValues, UseFormSetValue } from 'react-hook-form';
import { generatePassword } from 'utils/random';
import PasswordInput, { PasswordInputProps } from './PasswordInput';
import CasinoIcon from '@mui/icons-material/Casino';

export interface RandomPasswordInputProps<
  T extends FieldValues,
  J extends FieldPath<T>
> extends PasswordInputProps<T, J> {
  setValue: UseFormSetValue<T>;
}

const RandomPasswordInput = <T extends FieldValues, J extends FieldPath<T>>({
  setValue,
  ...props
}: RandomPasswordInputProps<T, J>) => {
  const handleRandomPasswordButtonClick = useCallback(
    () =>
      setValue(
        props.name,
        generatePassword({ minLength: 12, maxLength: 18 }) as any
      ),
    [setValue, props.name]
  );
  const handleRandomPasswordMouseDown = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
    },
    []
  );

  return (
    <PasswordInput
      additionalAdornment={
        <IconButton
          onClick={handleRandomPasswordButtonClick}
          onMouseDown={handleRandomPasswordMouseDown}
        >
          <CasinoIcon />
        </IconButton>
      }
      {...props}
    />
  );
};

export default RandomPasswordInput;
