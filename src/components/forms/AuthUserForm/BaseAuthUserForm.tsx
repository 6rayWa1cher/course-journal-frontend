import { Grid, IconButton, Typography } from '@mui/material';
import FormTextField from 'components/FormTextField';
import PasswordInput from 'components/PasswordInput';
import { useCallback, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { generatePassword } from 'utils/random';
import CasinoIcon from '@mui/icons-material/Casino';

export interface BaseAuthUserFormProps {
  passwordRequired?: boolean;
  passwordLabel?: string;
}

const BaseAuthUserForm = ({
  passwordRequired = true,
  passwordLabel = 'Пароль',
}: BaseAuthUserFormProps) => {
  const { control, setValue } = useFormContext();

  const handleRandomPasswordButtonClick = useCallback(
    () =>
      setValue('password', generatePassword({ minLength: 12, maxLength: 18 })),
    [setValue]
  );
  const handleRandomPasswordMouseDown = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
    },
    []
  );

  const [visible, setVisible] = useState(false);

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} md={6}>
        <FormTextField
          name="username"
          control={control}
          variant="standard"
          margin="normal"
          label="Логин"
          type="text"
          autoComplete="off"
          fullWidth
          required
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <PasswordInput
          name="password"
          control={control}
          label={passwordLabel}
          inputProps={{
            autoComplete: 'off',
          }}
          visible={visible}
          setVisible={setVisible}
          variant="standard"
          required={passwordRequired}
          additionalAdornment={
            <IconButton
              onClick={handleRandomPasswordButtonClick}
              onMouseDown={handleRandomPasswordMouseDown}
            >
              <CasinoIcon />
            </IconButton>
          }
          fullWidth
        />
      </Grid>
    </Grid>
  );
};

export default BaseAuthUserForm;