import { yupResolver } from '@hookform/resolvers/yup';
import { createAuthUserThunk } from '@redux/authUsers';
import { createEmployeeThunk, deleteEmployeeThunk } from '@redux/employees';
import { isSerializedAxiosError, useAppDispatch } from '@redux/utils';
import { unwrapResult } from '@reduxjs/toolkit';
import { UserRole } from 'models/authUser';
import { useCallback } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { defaultErrorEnqueue } from 'utils/errorProcessor';
import { useMySnackbar } from 'utils/hooks';
import { formatFullNameWithInitials } from 'utils/string';
import {
  employeeAuthUserSchema,
  EmployeeAuthUserType,
} from 'validation/yup/employee';
import InnerEmployeeForm from './InnerEmployeeForm';

const CreateEmployeeForm = () => {
  const methods = useForm<EmployeeAuthUserType>({
    resolver: yupResolver(employeeAuthUserSchema),
    mode: 'all',
    defaultValues: {
      firstName: '',
      middleName: '',
      lastName: '',
      department: '',
      username: '',
      password: '',
    },
  });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { enqueueSuccess, enqueueError } = useMySnackbar();
  const handleSubmit = useCallback(
    async (data: EmployeeAuthUserType) => {
      const {
        firstName,
        middleName,
        lastName,
        department,
        username,
        password,
      } = data;
      let employeeId;
      try {
        const employee = await dispatch(
          createEmployeeThunk({ firstName, middleName, lastName, department })
        ).then(unwrapResult);
        employeeId = employee.id;
        await dispatch(
          createAuthUserThunk({
            username,
            password,
            userRole: UserRole.TEACHER,
            userInfo: employeeId,
          })
        ).then(unwrapResult);
        enqueueSuccess(
          `Пользователь ${formatFullNameWithInitials({
            firstName,
            middleName,
            lastName,
          })} успешно создан`
        );
        navigate(`/employees/${employeeId}`, { replace: true });
      } catch (e) {
        if (employeeId != null) {
          try {
            await dispatch(deleteEmployeeThunk({ employeeId })).then(
              unwrapResult
            );
          } catch (e1) {
            defaultErrorEnqueue(e1 as Error, enqueueError);
          }
        }
        if (isSerializedAxiosError(e) && e.response?.status === 409) {
          enqueueError('Преподаватель с такими данными уже существует');
        } else {
          defaultErrorEnqueue(e as Error, enqueueError);
        }
      }
    },
    [dispatch, navigate, enqueueError, enqueueSuccess]
  );

  return (
    <FormProvider {...methods}>
      <InnerEmployeeForm onSubmit={handleSubmit} />
    </FormProvider>
  );
};

export default CreateEmployeeForm;
