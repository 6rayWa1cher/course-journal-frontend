import {
  Container,
  Divider,
  Grid,
  IconButton,
  LinearProgress,
  Paper,
} from '@mui/material';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Title from 'components/Title';
import { useDocumentTitle, useMySnackbar } from 'utils/hooks';
import { FormProvider, useForm } from 'react-hook-form';
import InnerEmployeeForm from 'components/forms/EmployeeForm/InnerEmployeeForm';
import ClearSubmitButtons from 'components/ClearSubmitButtons';
import {
  employeeAuthUserSchema,
  EmployeeAuthUserType,
} from 'validation/yup/employee';
import { yupResolver } from '@hookform/resolvers/yup';
import { isSerializedAxiosError, useAppDispatch } from '@redux/utils';
import { defaultErrorEnqueue } from 'utils/errorProcessor';
import { createEmployeeWithAuthUserThunk } from '@redux/employees';
import { unwrapResult } from '@reduxjs/toolkit';
import { formatFullNameWithInitials } from 'utils/string';

const CreateEmployeePage = () => {
  useDocumentTitle('Создание преподавателя');
  const navigate = useNavigate();
  const handleBackButtonClick = useCallback(() => navigate(-1), [navigate]);

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
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const dispatch = useAppDispatch();
  const { enqueueSuccess, enqueueError } = useMySnackbar();
  const onSubmit = useCallback(
    async ({
      firstName,
      middleName,
      lastName,
      department,
      username,
      password,
    }: EmployeeAuthUserType) => {
      const request = {
        employee: {
          firstName,
          middleName,
          lastName,
          department,
        },
        authUser: {
          username,
          password,
        },
      };
      try {
        const {
          employee: { id: employeeId },
        } = await dispatch(createEmployeeWithAuthUserThunk(request)).then(
          unwrapResult
        );
        enqueueSuccess(
          `Пользователь ${formatFullNameWithInitials({
            firstName,
            middleName,
            lastName,
          })} успешно создан`
        );
        navigate(`/employees/${employeeId}`, { replace: true });
      } catch (e) {
        if (isSerializedAxiosError(e) && e.response?.status === 409) {
          if (e.config.url?.includes('auth-user')) {
            enqueueError('Пользователь с такими данными уже существует');
          } else {
            enqueueError('Преподаватель с такими данными уже существует');
          }
        } else {
          defaultErrorEnqueue(e as Error, enqueueError);
        }
      }
    },
    [dispatch, navigate, enqueueError, enqueueSuccess]
  );

  return (
    <Paper sx={{ p: 1 }}>
      <Container sx={{ mt: 2 }}>
        <Grid container spacing={2}>
          <Grid item>
            <IconButton onClick={handleBackButtonClick}>
              <ArrowBackIosNewIcon />
            </IconButton>
          </Grid>
          <Grid item>
            <Title>Создание преподавателя</Title>
          </Grid>
        </Grid>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <InnerEmployeeForm />
            <Divider />
            <ClearSubmitButtons submitLabel="Создать" />
            {isSubmitting && <LinearProgress />}
          </form>
        </FormProvider>
      </Container>
    </Paper>
  );
};

export default CreateEmployeePage;
