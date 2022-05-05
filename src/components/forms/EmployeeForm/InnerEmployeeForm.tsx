import {
  Button,
  Divider,
  Grid,
  IconButton,
  LinearProgress,
} from '@mui/material';
import { styled } from '@mui/system';
import PasswordInput from 'components/PasswordInput';
import { useCallback, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { EmployeeAuthUserType } from 'validation/yup/employee';
import FormTextField from 'components/FormTextField';
import CasinoIcon from '@mui/icons-material/Casino';
import { generatePassword } from 'utils/random';

const PaddingGrid = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(1),
}));

export interface InnerEmployeeFormProps {
  passwordRequired?: boolean;
  passwordLabel?: string;
  submitLabel?: string;
  onSubmit: (data: EmployeeAuthUserType) => Promise<unknown>;
}
const InnerEmployeeForm = ({
  passwordRequired = true,
  passwordLabel = 'Пароль',
  submitLabel = 'Создать',
  onSubmit,
}: InnerEmployeeFormProps) => {
  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
    setValue,
  } = useFormContext<EmployeeAuthUserType>();

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
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container>
        <PaddingGrid item xs={12} md={4}>
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
        </PaddingGrid>
        <PaddingGrid item xs={12} md={4}>
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
        </PaddingGrid>
        <PaddingGrid item xs={12} md={4}>
          <FormTextField
            name="middleName"
            control={control}
            variant="standard"
            margin="normal"
            label="Отчество"
            type="text"
            fullWidth
          />
        </PaddingGrid>
        <PaddingGrid item xs={12}>
          <FormTextField
            name="department"
            control={control}
            variant="standard"
            margin="normal"
            label="Отдел"
            type="text"
            fullWidth
          />
        </PaddingGrid>
      </Grid>
      <Divider />
      <Grid container>
        <PaddingGrid item xs={12} md={6}>
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
        </PaddingGrid>
        <PaddingGrid item xs={12} md={6}>
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
        </PaddingGrid>
      </Grid>
      <Divider />
      <Grid container sx={{ p: (theme) => theme.spacing(2, 0, 1) }}>
        <PaddingGrid item xs={12} md={6}>
          <Button type="reset" fullWidth variant="outlined">
            Очистить
          </Button>
        </PaddingGrid>
        <PaddingGrid item xs={12} md={6}>
          <Button type="submit" fullWidth variant="contained" color="primary">
            {submitLabel}
          </Button>
        </PaddingGrid>
      </Grid>
      {isSubmitting && <LinearProgress />}
    </form>
  );
};

export default InnerEmployeeForm;
