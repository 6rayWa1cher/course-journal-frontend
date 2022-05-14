import { yupResolver } from '@hookform/resolvers/yup';
import {
  Paper,
  Grid,
  Button,
  Collapse,
  Divider,
  Container,
} from '@mui/material';
import { patchAuthUserThunk, selfAuthUserSelector } from '@redux/authUsers';
import { isSerializedAxiosError, useAppDispatch } from '@redux/utils';
import { unwrapResult } from '@reduxjs/toolkit';
import ClearSubmitButtons from 'components/ClearSubmitButtons';
import EditAuthUserForm from 'components/forms/EditAuthUserForm';
import SubTitle from 'components/SubTitle';
import { useCallback, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { defaultErrorEnqueue } from 'utils/errorProcessor';
import { useMySnackbar, useTypedSelector } from 'utils/hooks';
import { editAuthUserSchema, EditAuthUserSchemaType } from 'validation/yup';

const AuthUserModule = () => {
  const authUser = useTypedSelector(selfAuthUserSelector);
  const authUserId = authUser?.id;
  const methods = useForm<EditAuthUserSchemaType>({
    resolver: yupResolver(editAuthUserSchema),
    mode: 'all',
    defaultValues: {
      username: '',
      newPassword: '',
      confirmPassword: '',
    },
  });
  const [edit, setEdit] = useState(false);
  const handleToggleButton = useCallback(
    () => setEdit((value) => !value),
    [setEdit]
  );
  const dispatch = useAppDispatch();
  const { enqueueSuccess, enqueueError } = useMySnackbar();
  const onSubmit = useCallback(
    async ({ username, newPassword }: EditAuthUserSchemaType) => {
      if (authUserId == null) {
        throw new Error('unexpected empty authUser');
      }
      try {
        await dispatch(
          patchAuthUserThunk({
            authUserId,
            data: {
              username: username.length > 0 ? username : undefined,
              password: newPassword.length > 0 ? newPassword : undefined,
            },
          })
        ).then(unwrapResult);
        enqueueSuccess('Данные авторизации успешно изменены');
      } catch (e) {
        if (isSerializedAxiosError(e) && e.response?.status === 409) {
          enqueueError('Пользователь с такими данными уже существует');
        } else {
          defaultErrorEnqueue(e as Error, enqueueError);
        }
      }
    },
    [authUserId, dispatch, enqueueError, enqueueSuccess]
  );
  const {
    handleSubmit,
    formState: { isDirty },
  } = methods;

  return (
    <Paper sx={{ p: 2 }}>
      <Grid container justifyContent="space-between" spacing={2} sx={{ p: 2 }}>
        <Grid item>
          <SubTitle>Данные авторизации</SubTitle>
        </Grid>
        <Grid item>
          <Button onClick={handleToggleButton} disabled={authUserId == null}>
            {!edit ? 'Изменить' : 'Закрыть'}
          </Button>
        </Grid>
      </Grid>
      <Collapse in={edit}>
        <Divider sx={{ mb: 1 }} />
        <Container>
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <EditAuthUserForm />
              <Divider sx={{ pt: 1, mb: 1 }} />
              <ClearSubmitButtons disabledSubmit={!isDirty} />
            </form>
          </FormProvider>
        </Container>
      </Collapse>
    </Paper>
  );
};

export default AuthUserModule;
