import { Box } from '@mui/lab/node_modules/@mui/system';
import { Divider, Grid, Typography, useMediaQuery } from '@mui/material';
import { styled, useTheme } from '@mui/system';
import {
  getGroupsByFacultyIdThunk,
  groupsByFacultyAlphabeticalSelector,
} from '@redux/groups';
import { useAppDispatch } from '@redux/utils';
import { unwrapResult } from '@reduxjs/toolkit';
import ListSelector from 'components/ListSelector';
import NativeSelector from 'components/NativeSelector';
import NavListWithAvatars from 'components/NavListWithAvatars';
import PreLoading from 'components/PreLoading';
import Scrollable from 'components/Scrollable';
import { FacultyId } from 'models/faculty';
import { GroupId } from 'models/group';
import { useCallback, useEffect, useState } from 'react';
import { defaultErrorEnqueue } from 'utils/errorProcessor';
import {
  useMySnackbar,
  useNumberSearchState,
  useParamSelector,
} from 'utils/hooks';
import StudentsModule from './StudentsModule';

export interface GroupsModuleProps {
  facultyId: FacultyId;
}

const BorderedListSelector = styled(ListSelector)({
  height: '300px',
  maxHeight: '300px',
  overflow: 'auto',
});

const GroupsModule = ({ facultyId }: GroupsModuleProps) => {
  const theme = useTheme();
  const narrowScreen = useMediaQuery(theme.breakpoints.down('md'));

  const { enqueueError } = useMySnackbar();

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

  useEffect(() => {
    if (groups.length > 0 && selected == null) {
      setSelected(groups[0].id);
    }
  }, [groups, selected, setSelected]);

  const studentsModule =
    selected != null ? <StudentsModule groupId={selected} /> : null;

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
              <Typography component="h3" variant="h6">
                Группы
              </Typography>
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
          {narrowScreen ? (
            studentsModule
          ) : (
            <>
              <Typography component="h3" variant="h6">
                {selected != null && groups != null && groups.length > 0
                  ? `Студенты группы "${
                      groups.filter((g) => g.id === selected)[0].name
                    }"`
                  : 'Студенты'}
              </Typography>
              <Divider />
              <Scrollable height="50vh">{studentsModule}</Scrollable>
            </>
          )}
        </Grid>
      </Grid>
    </PreLoading>
  );
};

export default GroupsModule;
