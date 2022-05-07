import { Container, Grid, IconButton, Paper, Stack } from '@mui/material';
import {
  authUserByEmployeeIdSelector,
  getAuthUserByEmployeeIdThunk,
} from '@redux/authUsers';
import {
  deleteEmployeeThunk,
  employeeByIdSelector,
  getEmployeeByIdThunk,
} from '@redux/employees';
import { SerializedAxiosError } from '@redux/types';
import { useAppDispatch } from '@redux/utils';
import { unwrapResult } from '@reduxjs/toolkit';
import BigProcess from 'components/BigProcess';
import EditEmployeeForm from 'components/forms/EmployeeForm/EditEmployeeForm';
import NotFound from 'components/NotFound';
import { useCallback, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { defaultErrorEnqueue } from 'utils/errorProcessor';
import {
  useDocumentTitle,
  useLoadingPlain,
  useMySnackbar,
  useParamSelector,
} from 'utils/hooks';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Title from 'components/Title';
import { Box } from '@mui/system';
import { formatFullNameWithInitials } from 'utils/string';
import DeleteButtonWithConfirm from 'components/buttons/DeleteButtonWithConfirm';
import BackButton from 'components/buttons/BackButton';
import PreLoading from 'components/PreLoading';

const EditEmployeePage = () => {
  const params = useParams();

  const employeeId = Number(params.employeeId);

  const { enqueueSuccess, enqueueError } = useMySnackbar();

  const dispatch = useAppDispatch();
  const loadingAction = useCallback(() => {
    return Promise.all([
      dispatch(getEmployeeByIdThunk({ employeeId }))
        .then(unwrapResult)
        .catch((e: Error) => {
          defaultErrorEnqueue(e, enqueueError);
        }),
      dispatch(getAuthUserByEmployeeIdThunk({ employeeId }))
        .then(unwrapResult)
        .catch((e: SerializedAxiosError) => {
          if (e.response?.status !== 404) {
            defaultErrorEnqueue(e, enqueueError);
          }
        }),
    ]);
  }, [dispatch, employeeId, enqueueError]);

  const navigate = useNavigate();

  const employee = useParamSelector(employeeByIdSelector, { employeeId });
  const authUser = useParamSelector(authUserByEmployeeIdSelector, {
    employeeId,
  });

  const fullNameWithInitials = useMemo(
    () =>
      employee == null
        ? null
        : formatFullNameWithInitials({
            firstName: employee.firstName,
            lastName: employee.lastName,
            middleName: employee.middleName ?? undefined,
          }),
    [employee]
  );
  useDocumentTitle(fullNameWithInitials ?? 'Изменение преподавателя');
  const handleDeleteClick = useCallback(async () => {
    try {
      await dispatch(deleteEmployeeThunk({ employeeId })).then(unwrapResult);
      enqueueSuccess(`Пользователь ${fullNameWithInitials} успешно удален`);
      navigate('/employees');
    } catch (e) {
      defaultErrorEnqueue(e as Error, enqueueError);
    }
  }, [
    dispatch,
    employeeId,
    enqueueSuccess,
    enqueueError,
    fullNameWithInitials,
    navigate,
  ]);

  return (
    <Paper sx={{ p: 1 }}>
      <Container>
        <PreLoading action={loadingAction}>
          <Grid
            container
            justifyContent="space-between"
            spacing={2}
            paddingTop={2}
          >
            <Grid item>
              <Stack direction="row" spacing={2}>
                <BackButton to="/employees" />
                <Title>Редактирование преподавателя</Title>
              </Stack>
            </Grid>
            <Grid item>
              <DeleteButtonWithConfirm
                onDelete={handleDeleteClick}
                dialogTitle={`Удалить преподавателя ${formatFullNameWithInitials}?`}
                dialogDescription="Эта операция необратима и приведет к удалению всех курсов преподавателя"
              />
            </Grid>
          </Grid>
          {employee != null && (
            <EditEmployeeForm
              employeeId={employee?.id}
              authUserId={authUser?.id}
            />
          )}
        </PreLoading>
      </Container>
    </Paper>
  );
};

export default EditEmployeePage;
