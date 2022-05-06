import { Container, Grid, Paper, Stack } from '@mui/material';
import {
  deleteFacultyThunk,
  facultyByIdSelector,
  getFacultyByIdThunk,
} from '@redux/faculties';
import { useAppDispatch } from '@redux/utils';
import { unwrapResult } from '@reduxjs/toolkit';
import BackButton from 'components/buttons/BackButton';
import EditButton from 'components/buttons/EditButton';
import DeleteButtonWithConfirm from 'components/buttons/DeleteButtonWithConfirm';
import PreLoading from 'components/PreLoading';
import Title from 'components/Title';
import { FacultyId } from 'models/faculty';
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { defaultErrorEnqueue } from 'utils/errorProcessor';
import { useMySnackbar, useParamSelector } from 'utils/hooks';
import EditFacultyDialog from './EditFacultyDialog';

export interface FacultyModuleProps {
  facultyId: FacultyId;
}

const FacultyModule = ({ facultyId }: FacultyModuleProps) => {
  const { enqueueSuccess, enqueueError } = useMySnackbar();

  const dispatch = useAppDispatch();
  const loadingAction = useCallback(
    () =>
      dispatch(getFacultyByIdThunk({ facultyId }))
        .then(unwrapResult)
        .catch((e: Error) => {
          defaultErrorEnqueue(e, enqueueError);
        }),
    [dispatch, facultyId, enqueueError]
  );

  const faculty = useParamSelector(facultyByIdSelector, { facultyId });

  const navigate = useNavigate();
  const handleDeleteClick = useCallback(
    () =>
      dispatch(deleteFacultyThunk({ facultyId }))
        .then(unwrapResult)
        .then(() => enqueueSuccess(`Факультет ${faculty?.name ?? ''} удален`))
        .then(() => navigate(-1))
        .catch((e: Error) => {
          defaultErrorEnqueue(e, enqueueError);
        }),
    [dispatch, enqueueError, facultyId, faculty, enqueueSuccess, navigate]
  );

  const [openEditDialog, setOpenEditDialog] = useState(false);
  const handleEditButtonClick = useCallback(
    () => setOpenEditDialog(true),
    [setOpenEditDialog]
  );

  return (
    <Paper sx={{ p: 1 }}>
      <PreLoading action={loadingAction}>
        <Container sx={{ mt: 2, mb: 2 }}>
          <Grid
            container
            justifyContent="space-between"
            spacing={2}
            flexWrap="nowrap"
            alignItems="center"
          >
            <Grid item>
              <Stack direction="row" spacing={2}>
                <BackButton />
                <Title>{faculty?.name}</Title>
              </Stack>
            </Grid>
            <Grid item minWidth={96}>
              <EditButton onClick={handleEditButtonClick} />
              <DeleteButtonWithConfirm
                onDelete={handleDeleteClick}
                dialogTitle={`Удалить ${faculty?.name}?`}
                dialogDescription="Эта операция необратима и приведет к удалению всех студентов факультета"
              />
            </Grid>
          </Grid>
          {faculty && (
            <EditFacultyDialog
              open={openEditDialog}
              setOpen={setOpenEditDialog}
              faculty={faculty}
            />
          )}
        </Container>
      </PreLoading>
    </Paper>
  );
};

export default FacultyModule;
