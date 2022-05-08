import { yupResolver } from '@hookform/resolvers/yup';
import {
  authUserByIdSelector,
  createAuthUserThunk,
  patchAuthUserThunk,
} from '@redux/authUsers';
import {
  employeeByIdSelector,
  putEmployeeThunk,
  putEmployeeWithAuthUserThunk,
} from '@redux/employees';
import { isSerializedAxiosError, useAppDispatch } from '@redux/utils';
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
import { defaultErrorEnqueue } from 'utils/errorProcessor';
import { unwrapResult } from '@reduxjs/toolkit';
import { Divider, LinearProgress } from '@mui/material';
import ClearSubmitButtons from 'components/ClearSubmitButtons';
import EmployeeForm from 'components/forms/EmployeeForm';

export interface EditEmployeeModuleProps {
  employeeId: EmployeeId;
  authUserId?: AuthUserId;
}

const EditEmployeeModule = ({
  authUserId,
  employeeId,
}: EditEmployeeModuleProps) => {
  const employee = useParamSelector(employeeByIdSelector, { employeeId });
  const authUser = useParamSelector(authUserByIdSelector, { authUserId });
  const authUserPresented = authUserId != null;
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
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const dispatch = useAppDispatch();
  const { enqueueError, enqueueSuccess } = useMySnackbar();
  const onSubmit = useCallback(
    async ({
      firstName,
      middleName,
      lastName,
      department,
      username,
      password,
    }: EmployeeAuthUserOptionalPasswordType) => {
      try {
        const authUserChanged =
          authUser?.username !== username || password !== '';
        const employeeRequest = {
          employeeId,
          employee: {
            firstName,
            middleName,
            lastName,
            department,
          },
        };
        const authUserRequest = {
          authUserId,
          authUser: {
            username,
            password:
              password != null && password.length > 0 ? password : undefined,
          },
        };
        if (authUserChanged || !authUserPresented) {
          await dispatch(
            putEmployeeWithAuthUserThunk({
              ...employeeRequest,
              ...authUserRequest,
            })
          ).then(unwrapResult);
        } else {
          await dispatch(
            putEmployeeThunk({ employeeId, data: employeeRequest.employee })
          ).then(unwrapResult);
        }
        if (authUserChanged && authUserPresented) {
          await dispatch(
            patchAuthUserThunk({
              authUserId,
              data: {
                username,
                password:
                  password != null && password.length > 0
                    ? password
                    : undefined,
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
        if (isSerializedAxiosError(e) && e.response?.status === 409) {
          enqueueError('Преподаватель с такими данными уже существует');
        } else {
          defaultErrorEnqueue(e as Error, enqueueError);
        }
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <EmployeeForm
          passwordRequired={!authUserPresented}
          passwordLabel={authUserPresented ? 'Новый пароль' : 'Пароль'}
        />
        <Divider />
        <ClearSubmitButtons submitLabel="Сохранить" />
        {isSubmitting && <LinearProgress />}
      </form>
    </FormProvider>
  );
};

export default EditEmployeeModule;
