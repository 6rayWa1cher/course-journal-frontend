import { Divider } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { EmployeeAuthUserType } from 'validation/yup/employee';
import FormTextField from 'components/FormTextField';
import BaseAuthUserForm from '../AuthUserForm/BaseAuthUserForm';
import FullNameForm from '../FullNameForm';

export interface InnerEmployeeFormProps {
  passwordRequired?: boolean;
  passwordLabel?: string;
}
const InnerEmployeeForm = ({
  passwordRequired = true,
  passwordLabel = 'Пароль',
}: InnerEmployeeFormProps) => {
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
      <BaseAuthUserForm
        passwordRequired={passwordRequired}
        passwordLabel={passwordLabel}
      />
    </>
  );
};

export default InnerEmployeeForm;
