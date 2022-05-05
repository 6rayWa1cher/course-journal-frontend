import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Paper,
} from '@mui/material';
import { getAuthUserByEmployeeIdThunk } from '@redux/authUsers';
import { deleteEmployeeThunk, getEmployeeByIdThunk } from '@redux/employees';
import { SerializedAxiosError } from '@redux/types';
import { useAppDispatch } from '@redux/utils';
import { unwrapResult } from '@reduxjs/toolkit';
import BigProcess from 'components/BigProcess';
import EditEmployeeForm from 'components/forms/EmployeeForm/EditEmployeeForm';
import NotFound from 'components/NotFound';
import { useCallback, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { defaultErrorEnqueue } from 'utils/errorProcessor';
import { useLoadingPlain, useMySnackbar } from 'utils/hooks';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Title from 'components/Title';
import { Box } from '@mui/system';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { formatFullNameWithInitials } from 'utils/string';
import { LoadingButton } from '@mui/lab';

const EmployeePage = () => {
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

  const [openDialog, setOpenDialog] = useState(false);
  const handleCloseDialog = useCallback(
    () => setOpenDialog(false),
    [setOpenDialog]
  );
  const handleOpenDialog = useCallback(
    () => setOpenDialog(true),
    [setOpenDialog]
  );
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
  const deleteAction = useCallback(async () => {
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
  const deleteProps = useLoadingPlain(deleteAction, { immediate: false });
  const handleDeleteButtonClick = deleteProps.execute;

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
            <IconButton onClick={handleOpenDialog} color="error">
              <DeleteForeverIcon />
            </IconButton>
          </Box>
        </Box>
        <EditEmployeeForm employeeId={employee?.id} authUserId={authUser?.id} />
        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle>
            Удалить преподавателя {fullNameWithInitials}?
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Эта операция необратима и приведет к удалению всех курсов
              преподавателя
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Отменить</Button>
            <LoadingButton
              onClick={handleDeleteButtonClick}
              loading={deleteProps.loading}
              color="error"
            >
              Удалить
            </LoadingButton>
          </DialogActions>
        </Dialog>
      </Container>
    </Paper>
  );
};

export default EmployeePage;
