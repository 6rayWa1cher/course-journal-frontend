import { Grid } from '@mui/material';
import FormTextField from 'components/FormTextField';
import PasswordInput from 'components/PasswordInput';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

const EditAuthUserForm = () => {
  const { control } = useFormContext();

  const [visible1, setVisible1] = useState(false);
  const [visible2, setVisible2] = useState(false);

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} md={4}>
        <FormTextField
          name="username"
          label="Логин"
          autoComplete="username"
          control={control}
          variant="standard"
          margin="normal"
          fullWidth
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <PasswordInput
          name="newPassword"
          label="Новый пароль"
          inputProps={{
            autoComplete: 'new-password',
          }}
          control={control}
          visible={visible1}
          setVisible={setVisible1}
          variant="standard"
          required={false}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <PasswordInput
          name="confirmPassword"
          label="Подтверждение пароля"
          inputProps={{
            autoComplete: 'new-password',
          }}
          control={control}
          visible={visible2}
          setVisible={setVisible2}
          variant="standard"
          required={false}
          fullWidth
        />
      </Grid>
    </Grid>
  );
};

export default EditAuthUserForm;
