import { useCallback } from 'react';
import { Button, Container, LinearProgress, Typography } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useNavigate } from 'react-router-dom';
import { unwrapResult } from '@reduxjs/toolkit';
import { yupResolver } from '@hookform/resolvers/yup';

import { loginThunk } from '@redux/auth/thunk';
import { useMySnackbar, useTypedDispatch } from 'utils/hooks';
import { emailPasswordSchema, EmailPasswordSchemaType } from 'validation/yup';
import { useForm } from 'react-hook-form';
import FormTextField from 'components/FormTextField';
import CenteredMarginBox from 'components/CenteredMarginBox';
import CenteredRoundBox from 'components/CenteredRoundBox';
import { AxiosError } from 'axios';
import ImageWidgetPage from 'components/ImageWidgetPage';
import { defaultErrorEnqueue } from 'utils/errorProcessor';

const LoginWidget = ({ redirectTo = '/' }) => {
  const dispatch = useTypedDispatch();
  const navigate = useNavigate();
  const { enqueueError } = useMySnackbar();
  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm<EmailPasswordSchemaType>({
    resolver: yupResolver(emailPasswordSchema),
    mode: 'all',
    defaultValues: { username: '', password: '' },
  });

  const onSubmit = useCallback(
    ({ username, password }: EmailPasswordSchemaType) =>
      dispatch(loginThunk({ username, password }))
        .then(unwrapResult)
        .then(() => {
          navigate(redirectTo, { replace: true });
        })
        .catch((e: AxiosError) => {
          if (e.response?.status === 401) {
            enqueueError('Неверный логин или пароль');
          } else {
            defaultErrorEnqueue(e, enqueueError);
          }
        }),
    [dispatch, navigate, enqueueError, redirectTo]
  );

  return (
    <ImageWidgetPage title="Авторизация">
      <Container maxWidth="xs">
        <CenteredMarginBox>
          <CenteredRoundBox>
            <CheckCircleOutlineIcon />
          </CenteredRoundBox>
          <Typography component="h1" variant="h5">
            Войти
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormTextField
              name="username"
              control={control}
              variant="outlined"
              margin="normal"
              label="Логин"
              type="text"
              fullWidth
              required
              autoComplete="username"
            />
            <FormTextField
              name="password"
              control={control}
              variant="outlined"
              margin="normal"
              label="Пароль"
              type="password"
              fullWidth
              required
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{
                margin: (theme) => theme.spacing(3, 0, 2),
              }}
            >
              Войти
            </Button>
            {isSubmitting && <LinearProgress />}
          </form>
        </CenteredMarginBox>
      </Container>
    </ImageWidgetPage>
  );
};

export default LoginWidget;
