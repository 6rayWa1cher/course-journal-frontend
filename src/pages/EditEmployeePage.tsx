import { Container, IconButton, Paper } from '@mui/material';
import { getAuthUserByEmployeeIdThunk } from '@redux/authUsers';
import { deleteEmployeeThunk, getEmployeeByIdThunk } from '@redux/employees';
import { SerializedAxiosError } from '@redux/types';
import { useAppDispatch } from '@redux/utils';
import { unwrapResult } from '@reduxjs/toolkit';
import BigProcess from 'components/BigProcess';
import EditEmployeeForm from 'components/forms/EmployeeForm/EditEmployeeForm';
import NotFound from 'components/NotFound';
import { useCallback, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { defaultErrorEnqueue } from 'utils/errorProcessor';
import { useDocumentTitle, useLoadingPlain, useMySnackbar } from 'utils/hooks';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Title from 'components/Title';
import { Box } from '@mui/system';
import { formatFullNameWithInitials } from 'utils/string';
import DeleteButtonWithConfirm from 'components/buttons/DeleteButtonWithConfirm';

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
  const loadingProps = useLoadingPlain(loadingAction);

  const navigate = useNavigate();
  const handleBackButtonClick = useCallback(() => navigate(-1), [navigate]);

  const [employee, authUser] = loadingProps.value ?? [];
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

  if (loadingProps.loading) {
    return <BigProcess />;
  }

  if (employee == null) {
    return <NotFound />;
  }

  return (
    <Paper sx={{ p: 1 }}>
      <Container>
        <Box sx={{ pt: 2, display: 'flex', gap: 1 }}>
          <Box>
            <IconButton onClick={handleBackButtonClick}>
              <ArrowBackIosNewIcon />
            </IconButton>
          </Box>
          <Box sx={{ flexGrow: 1 }}>
            <Title>Редактирование преподавателя</Title>
          </Box>
          <Box>
            <DeleteButtonWithConfirm
              onDelete={handleDeleteClick}
              dialogTitle={`Удалить преподавателя ${formatFullNameWithInitials}?`}
              dialogDescription="Эта операция необратима и приведет к удалению всех курсов преподавателя"
            />
          </Box>
        </Box>
        <EditEmployeeForm employeeId={employee?.id} authUserId={authUser?.id} />
      </Container>
    </Paper>
  );
};

export default EditEmployeePage;
