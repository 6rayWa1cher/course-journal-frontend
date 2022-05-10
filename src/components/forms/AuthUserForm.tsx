import { Grid } from '@mui/material';
import FormTextField from 'components/FormTextField';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import RandomPasswordInput from 'components/RandomPasswordInput';

export interface AuthUserFormProps {
  passwordRequired?: boolean;
  passwordLabel?: string;
}

const AuthUserForm = ({
  passwordRequired = true,
  passwordLabel = 'Пароль',
}: AuthUserFormProps) => {
  const { control, setValue } = useFormContext();

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
        <RandomPasswordInput
          name="password"
          control={control}
          setValue={setValue}
          label={passwordLabel}
          inputProps={{
            autoComplete: 'off',
          }}
          visible={visible}
          setVisible={setVisible}
          variant="standard"
          required={passwordRequired}
          fullWidth
        />
      </Grid>
    </Grid>
  );
};

export default AuthUserForm;
