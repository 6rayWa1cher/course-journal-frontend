import { yupResolver } from '@hookform/resolvers/yup';
import { Divider } from '@mui/material';
import ClearSubmitButton from 'components/ClearSubmitButtons';
import FormCheckbox from 'components/FormCheckbox';
import { AuthUserDto } from 'models/authUser';
import { StudentDto } from 'models/student';
import { useCallback } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import {
  studentFullSchema,
  StudentFullSchemaType,
} from 'validation/yup/student';
import BaseAuthUserForm from '../AuthUserForm/BaseAuthUserForm';
import FullNameForm from '../FullNameForm';

export interface StudentFormProps {
  student: StudentDto;
  authUser?: AuthUserDto;
}

const StudentForm = ({ student, authUser }: StudentFormProps) => {
  const authUserExists = authUser != null;
  const methods = useForm<StudentFullSchemaType>({
    resolver: yupResolver(studentFullSchema),
    mode: 'all',
    defaultValues: {
      firstName: student.firstName,
      middleName: student.middleName ?? '',
      lastName: student.lastName,
      headman: student.headman,
      username: authUser?.username ?? '',
      password: '',
    },
    context: {
      authUserExists,
    },
  });

  const { handleSubmit, control, watch } = methods;

  const headman = watch('headman');

  const onSubmit = useCallback(async () => {
    return null;
  }, []);

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FullNameForm />
        <Divider sx={{ pt: 2, mb: 2 }} />
        <FormCheckbox name="headman" label="Староста" control={control} />
        {headman && (
          <BaseAuthUserForm passwordRequired={headman && !authUserExists} />
        )}
        <ClearSubmitButton />
      </form>
    </FormProvider>
  );
};

export default StudentForm;
