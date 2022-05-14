import { Grid } from '@mui/material';
import FormTextField from 'components/FormTextField';
import { useFormContext } from 'react-hook-form';

const FullNameForm = () => {
  const { control } = useFormContext();

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} md={4}>
        <FormTextField
          name="lastName"
          control={control}
          variant="standard"
          margin="normal"
          label="Фамилия"
          type="text"
          fullWidth
          required
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <FormTextField
          name="firstName"
          control={control}
          variant="standard"
          margin="normal"
          label="Имя"
          type="text"
          fullWidth
          required
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <FormTextField
          name="middleName"
          control={control}
          variant="standard"
          margin="normal"
          label="Отчество"
          type="text"
          fullWidth
        />
      </Grid>
    </Grid>
  );
};

export default FullNameForm;
