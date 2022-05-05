import { yupResolver } from '@hookform/resolvers/yup';
import {
  authUserByIdSelector,
  createAuthUserThunk,
  patchAuthUserThunk,
} from '@redux/authUsers';
import { employeeByIdSelector, putEmployeeThunk } from '@redux/employees';
import { useAppDispatch } from '@redux/utils';
import { AuthUserId, UserRole } from 'models/authUser';
import { EmployeeId } from 'models/employee';
import { useCallback } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useMySnackbar, useParamSelector } from 'utils/hooks';
import {
  employeeAuthUserOptionalPasswordSchema,
  EmployeeAuthUserOptionalPasswordType,
  employeeAuthUserSchema,
} from 'validation/yup/employee';
import InnerEmployeeForm from './InnerEmployeeForm';
import { pick } from 'lodash';
import { defaultErrorEnqueue } from 'utils/errorProcessor';
import { unwrapResult } from '@reduxjs/toolkit';

interface EditEmployeeFormProps {
  employeeId: EmployeeId;
  authUserId?: AuthUserId;
}

const EditEmployeeForm = ({
  authUserId,
  employeeId,
}: EditEmployeeFormProps) => {
  const employee = useParamSelector(employeeByIdSelector, { employeeId });
  const authUser = useParamSelector(authUserByIdSelector, { authUserId });
  const authUserPresented = !!authUserId;
  const yupSchema = authUserPresented
    ? employeeAuthUserOptionalPasswordSchema
    : employeeAuthUserSchema;
  const methods = useForm<EmployeeAuthUserOptionalPasswordType>({
    resolver: yupResolver(yupSchema),
    mode: 'all',
    defaultValues: {
      firstName: employee?.firstName ?? '',
      middleName: employee?.middleName ?? '',
      lastName: employee?.lastName ?? '',
      department: employee?.department ?? '',
      username: authUser?.username ?? '',
      password: '',
    },
  });

  const dispatch = useAppDispatch();
  const { enqueueError, enqueueSuccess } = useMySnackbar();
  const handleSubmit = useCallback(
    async ({
      firstName,
      middleName,
      lastName,
      department,
      username,
      password,
    }: EmployeeAuthUserOptionalPasswordType) => {
      try {
        await dispatch(
          putEmployeeThunk({
            employeeId,
            data: {
              firstName,
              middleName,
              lastName,
              department,
            },
          })
        ).then(unwrapResult);
        const authUserChanged =
          authUser?.username !== username || password !== '';
        if (authUserChanged && authUserPresented) {
          await dispatch(
            patchAuthUserThunk({
              authUserId,
              data: {
                username,
                password,
              },
            })
          ).then(unwrapResult);
        } else if (authUserChanged) {
          await dispatch(
            createAuthUserThunk({
              username,
              password,
              userRole: UserRole.TEACHER,
              userInfo: employeeId,
            })
          ).then(unwrapResult);
        }
        enqueueSuccess('Преподаватель сохранен');
      } catch (e) {
        defaultErrorEnqueue(e as Error, enqueueError);
      }
    },
    [
      dispatch,
      authUserId,
      employeeId,
      enqueueError,
      authUser,
      authUserPresented,
      enqueueSuccess,
    ]
  );

  return (
    <FormProvider {...methods}>
      <InnerEmployeeForm
        onSubmit={handleSubmit}
        passwordRequired={!authUserPresented}
        passwordLabel={authUserPresented ? 'Новый пароль' : 'Пароль'}
        submitLabel="Сохранить"
      />
    </FormProvider>
  );
};

export default EditEmployeeForm;
