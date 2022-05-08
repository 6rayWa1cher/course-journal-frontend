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
import BaseAuthUserForm from '../AuthUserForm/BaseAuthUserForm';
import FullNameForm from '../FullNameForm';

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
      <FullNameForm />
      <FormTextField
        name="department"
        control={control}
        variant="standard"
        margin="normal"
        label="Отдел"
        type="text"
        fullWidth
      />
      <Divider />
      <BaseAuthUserForm
        passwordRequired={passwordRequired}
        passwordLabel={passwordLabel}
      />
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
