import { Container, Grid, Paper, Stack } from '@mui/material';
import { authUserByEmployeeIdSelector } from '@redux/authUsers';
import {
  deleteEmployeeThunk,
  employeeByIdSelector,
  getEmployeeWithAuthUserThunk,
} from '@redux/employees';
import { useAppDispatch } from '@redux/utils';
import { unwrapResult } from '@reduxjs/toolkit';
import EditEmployeeForm from 'components/forms/EmployeeForm/EditEmployeeForm';
import { useCallback, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { defaultErrorEnqueue } from 'utils/errorProcessor';
import {
  useDocumentTitle,
  useLoadingActionThunk,
  useMySnackbar,
  useParamSelector,
} from 'utils/hooks';
import Title from 'components/Title';
import { formatFullNameWithInitials } from 'utils/string';
import DeleteButtonWithConfirm from 'components/buttons/DeleteButtonWithConfirm';
import BackButton from 'components/buttons/BackButton';
import PreLoading from 'components/PreLoading';

const EditEmployeePage = () => {
  const params = useParams();

  const employeeId = Number(params.employeeId);

  const { enqueueSuccess, enqueueError } = useMySnackbar();

  const dispatch = useAppDispatch();
  const thunk = useCallback(
    () => getEmployeeWithAuthUserThunk({ employeeId }),
    [employeeId]
  );
  const loadingAction = useLoadingActionThunk(thunk);

  const navigate = useNavigate();

  const employee = useParamSelector(employeeByIdSelector, { employeeId });
  const authUser = useParamSelector(authUserByEmployeeIdSelector, {
    employeeId,
  });

  const fullNameWithInitials = useMemo(
    () => (employee == null ? null : formatFullNameWithInitials(employee)),
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
