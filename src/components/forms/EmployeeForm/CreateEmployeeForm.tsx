import { yupResolver } from '@hookform/resolvers/yup';
import { useAppDispatch } from '@redux/utils';
import { EmployeeData } from 'models/employee';
import { useCallback } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
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
  const handleSubmit = useCallback(
    (data: EmployeeAuthUserType) => {
      return Promise.resolve();
    },
    [dispatch]
  );

  return (
    <FormProvider {...methods}>
      <InnerEmployeeForm onSubmit={handleSubmit} />
    </FormProvider>
  );
};

export default CreateEmployeeForm;
