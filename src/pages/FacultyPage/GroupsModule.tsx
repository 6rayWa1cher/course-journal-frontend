import { Box } from '@mui/lab/node_modules/@mui/system';
import {
  Divider,
  Grid,
  Typography,
  useMediaQuery,
  IconButton,
} from '@mui/material';
import { useTheme } from '@mui/system';
import {
  deleteGroupThunk,
  getGroupsByFacultyIdThunk,
  groupByIdSelector,
  groupsByFacultyAlphabeticalSelector,
} from '@redux/groups';
import { useAppDispatch } from '@redux/utils';
import { unwrapResult } from '@reduxjs/toolkit';
import AddButton from 'components/buttons/AddButton';
import DeleteButtonWithConfirm from 'components/buttons/DeleteButtonWithConfirm';
import EditButton from 'components/buttons/EditButton';
import ListSelector from 'components/ListSelector';
import NativeSelector from 'components/NativeSelector';
import PreLoading from 'components/PreLoading';
import Scrollable from 'components/Scrollable';
import { FacultyId } from 'models/faculty';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { defaultErrorEnqueue } from 'utils/errorProcessor';
import {
  useMySnackbar,
  useNumberSearchState,
  useParamSelector,
} from 'utils/hooks';
import CreateGroupDialog from './CreateGroupDialog';
import EditGroupDialog from './EditGroupDialog';
import StudentsModule from './StudentsModule';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import AddStudentsDialog from './AddStudentsDialog';

export interface GroupsModuleProps {
  facultyId: FacultyId;
}

const GroupsModule = ({ facultyId }: GroupsModuleProps) => {
  const theme = useTheme();
  const narrowScreen = useMediaQuery(theme.breakpoints.down('md'));

  const { enqueueSuccess, enqueueError } = useMySnackbar();

  const dispatch = useAppDispatch();
  const loadingAction = useCallback(
    () =>
      dispatch(getGroupsByFacultyIdThunk({ facultyId }))
        .then(unwrapResult)
        .catch((e: Error) => {
          defaultErrorEnqueue(e, enqueueError);
        }),
    [dispatch, facultyId, enqueueError]
  );

  const [selected, setSelected] = useNumberSearchState('group');

  const groups = useParamSelector(groupsByFacultyAlphabeticalSelector, {
    facultyId,
  });
  const group = useParamSelector(groupByIdSelector, {
    groupId: selected ?? undefined,
  });

  useEffect(() => {
    if (groups.length > 0 && selected == null) {
      setSelected(groups[0].id);
    }
  }, [groups, selected, setSelected]);

  const studentsModule = useMemo(
    () => (selected != null ? <StudentsModule groupId={selected} /> : null),
    [selected]
  );

  const [openAddDialog, setOpenAddDialog] = useState(false);
  const handleAddClick = useCallback(
    () => setOpenAddDialog(true),
    [setOpenAddDialog]
  );

  const addButton = <AddButton onClick={handleAddClick} />;

  const [openEditDialog, setOpenEditDialog] = useState(false);
  const handleEditClick = useCallback(
    () => setOpenEditDialog(true),
    [setOpenEditDialog]
  );

  const deleteAction = useCallback(async () => {
    if (selected == null) {
      enqueueError('Произошла непредвиденная ошибка');
      throw new Error('selected is null');
    }
    try {
      await dispatch(deleteGroupThunk({ groupId: selected })).then(
        unwrapResult
      );
      enqueueSuccess(`Группа ${group?.name} удалена`);
      setSelected(null);
    } catch (e) {
      defaultErrorEnqueue(e as Error, enqueueError);
    }
  }, [dispatch, enqueueError, enqueueSuccess, group, selected, setSelected]);

  const [openAddBatchStudentsDialog, setOpenAddBatchStudentsDialog] =
    useState(false);
  const handleAddBatchStudentsClick = useCallback(
    () => setOpenAddBatchStudentsDialog(true),
    [setOpenAddBatchStudentsDialog]
  );

  const disableGroupEditButtons = group == null;

  return (
    <PreLoading action={loadingAction}>
      <Grid container>
        <Grid item xs={12} md={6} p={2}>
          {narrowScreen ? (
            <NativeSelector
              items={groups}
              label="Группа"
              selected={selected}
              onSelect={setSelected}
            />
          ) : (
            <>
              <Grid container justifyContent="space-between" spacing={2}>
                <Grid item>
                  <Typography component="h3" variant="h6">
                    Группы
                  </Typography>
                </Grid>
                <Grid item>{addButton}</Grid>
              </Grid>
              <Divider />
              <Scrollable height="50vh">
                <ListSelector
                  items={groups}
                  selected={selected}
                  onSelect={setSelected}
                />
              </Scrollable>
            </>
          )}
        </Grid>
        <Grid item xs={12} md={6} p={2}>
          <Grid container justifyContent="space-between" spacing={2}>
            <Grid item>
              <Typography component="h3" variant="h6">
                {group != null ? `Группа "${group.name}"` : 'Группа'}
              </Typography>
            </Grid>
            <Grid item>
              <EditButton
                onClick={handleEditClick}
                disabled={disableGroupEditButtons}
              />
              <IconButton
                onClick={handleAddBatchStudentsClick}
                disabled={disableGroupEditButtons}
              >
                <UploadFileIcon />
              </IconButton>
              <DeleteButtonWithConfirm
                onDelete={deleteAction}
                dialogTitle={
                  group != null
                    ? `Удалить группу "${group.name}"?`
                    : 'Удалить группу?'
                }
                dialogDescription="Эта операция необратима и приведет к удалению всех студентов группы"
                disabled={disableGroupEditButtons}
              />
            </Grid>
          </Grid>
          <Divider />
          <Box sx={{ pt: 2 }}>
            {narrowScreen ? (
              studentsModule
            ) : (
              <Scrollable height="50vh">{studentsModule}</Scrollable>
            )}
          </Box>
        </Grid>
      </Grid>
      <CreateGroupDialog
        facultyId={facultyId}
        open={openAddDialog}
        setOpen={setOpenAddDialog}
      />
      {group != null && (
        <EditGroupDialog
          group={group}
          open={openEditDialog}
          setOpen={setOpenEditDialog}
        />
      )}
      {group != null && (
        <AddStudentsDialog
          groupId={group.id}
          open={openAddBatchStudentsDialog}
          setOpen={setOpenAddBatchStudentsDialog}
        />
      )}
    </PreLoading>
  );
};

export default GroupsModule;
