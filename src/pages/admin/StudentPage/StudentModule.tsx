import { yupResolver } from '@hookform/resolvers/yup';
import { Divider, Grid } from '@mui/material';
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
import AuthUserForm from 'components/forms/AuthUserForm';
import FullNameForm from 'components/forms/FullNameForm';
import { isSerializedAxiosError, useAppDispatch } from '@redux/utils';
import { putStudentWithAuthUserThunk } from '@redux/students';
import { unwrapResult } from '@reduxjs/toolkit';
import { useMySnackbar } from 'utils/hooks';
import { formatFullNameWithInitials } from 'utils/string';
import { defaultErrorEnqueue } from 'utils/errorProcessor';
import BackButton from 'components/buttons/BackButton';
import Title from 'components/Title';
import { FacultyId } from 'models/faculty';

export interface StudentModuleProps {
  facultyId: FacultyId;
  student: StudentDto;
  authUser?: AuthUserDto;
}

const StudentModule = ({
  facultyId,
  student,
  authUser,
}: StudentModuleProps) => {
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

  const dispatch = useAppDispatch();
  const { enqueueSuccess, enqueueError } = useMySnackbar();
  const onSubmit = useCallback(
    async ({
      firstName,
      middleName,
      lastName,
      headman,
      username,
      password,
    }: StudentFullSchemaType) => {
      try {
        const request = {
          studentId: student.id,
          student: {
            firstName,
            middleName,
            lastName,
            group: student.group,
          },
          headman,
          authUserId: authUserExists ? authUser.id : undefined,
          authUser: {
            username,
            password,
          },
        };
        await dispatch(putStudentWithAuthUserThunk(request)).then(unwrapResult);
        enqueueSuccess(
          `?????????????? ${formatFullNameWithInitials({
            firstName,
            middleName,
            lastName,
          })} ????????????????`
        );
      } catch (e) {
        if (isSerializedAxiosError(e) && e.response?.status === 409) {
          if (e.config.url?.includes('auth-user')) {
            enqueueError('???????????????????????? ?? ???????????? ?????????????? ?????? ????????????????????');
          } else {
            enqueueError('?????????????? ?? ???????????? ?????????????? ?????? ????????????????????');
          }
        } else {
          defaultErrorEnqueue(e as Error, enqueueError);
        }
      }
    },
    [
      authUser?.id,
      authUserExists,
      dispatch,
      enqueueError,
      enqueueSuccess,
      student.group,
      student.id,
    ]
  );

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item>
            <BackButton
              to={`/faculties/${facultyId}?group=${student.group}`}
              replace
            />
          </Grid>
          <Grid item>
            <Title>???????????????????????????? ????????????????</Title>
          </Grid>
        </Grid>
        <FullNameForm />
        <Divider sx={{ pt: 2, mb: 2 }} />
        <FormCheckbox name="headman" label="????????????????" control={control} />
        {headman && (
          <AuthUserForm passwordRequired={headman && !authUserExists} />
        )}
        <ClearSubmitButton />
      </form>
    </FormProvider>
  );
};

export default StudentModule;
