import { Divider } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { EmployeeAuthUserType } from 'validation/yup/employee';
import FormTextField from 'components/FormTextField';
import AuthUserForm from './AuthUserForm';
import FullNameForm from './FullNameForm';

export interface EmployeeFormProps {
  passwordRequired?: boolean;
  passwordLabel?: string;
}
const EmployeeForm = ({
  passwordRequired = true,
  passwordLabel = 'Пароль',
}: EmployeeFormProps) => {
  const { control } = useFormContext<EmployeeAuthUserType>();

  return (
    <>
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
      <AuthUserForm
        passwordRequired={passwordRequired}
        passwordLabel={passwordLabel}
      />
    </>
  );
};

export default EmployeeForm;
