import { Box } from '@mui/lab/node_modules/@mui/system';
import { Divider, Grid, Typography, IconButton } from '@mui/material';
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
  useNarrowScreen,
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
  const narrowScreen = useNarrowScreen();

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
    () =>
      selected != null ? (
        <StudentsModule facultyId={facultyId} groupId={selected} />
      ) : null,
    [selected, facultyId]
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
      enqueueError('?????????????????? ???????????????????????????? ????????????');
      throw new Error('selected is null');
    }
    try {
      await dispatch(deleteGroupThunk({ groupId: selected })).then(
        unwrapResult
      );
      enqueueSuccess(`???????????? ${group?.name} ??????????????`);
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
            <Grid container spacing={2}>
              <Grid item xs>
                <NativeSelector
                  items={groups}
                  label="????????????"
                  selected={selected}
                  onSelect={setSelected}
                />
              </Grid>
              <Grid item>{addButton}</Grid>
            </Grid>
          ) : (
            <>
              <Grid container justifyContent="space-between" spacing={2}>
                <Grid item>
                  <Typography component="h3" variant="h6">
                    ????????????
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
                {group != null ? `???????????? "${group.name}"` : '????????????'}
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
                    ? `?????????????? ???????????? "${group.name}"?`
                    : '?????????????? ?????????????'
                }
                dialogDescription="?????? ???????????????? ???????????????????? ?? ???????????????? ?? ???????????????? ???????? ?????????????????? ????????????"
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
