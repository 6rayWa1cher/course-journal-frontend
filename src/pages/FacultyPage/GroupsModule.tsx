import { Grid, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/system';
import {
  getGroupsByFacultyIdThunk,
  groupIdsByFacultySelector,
} from '@redux/groups';
import { useAppDispatch } from '@redux/utils';
import { unwrapResult } from '@reduxjs/toolkit';
import PreLoading from 'components/PreLoading';
import { FacultyId } from 'models/faculty';
import { GroupId } from 'models/group';
import { useCallback, useState } from 'react';
import { defaultErrorEnqueue } from 'utils/errorProcessor';
import { useMySnackbar, useParamSelector } from 'utils/hooks';
import GroupListSelector from './GroupListSelector';
import GroupNativeSelector from './GroupNativeSelector';

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

  const [selected, setSelected] = useState<GroupId | null>(null);

  const groupsIds = useParamSelector(groupIdsByFacultySelector, { facultyId });

  const GroupSelector = narrowScreen ? GroupNativeSelector : GroupListSelector;

  return (
    <PreLoading action={loadingAction}>
      <Grid container>
        <Grid item xs={12} md={4}>
          <GroupSelector
            groupsIds={groupsIds}
            selected={selected}
            onSelect={setSelected}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <p>kek</p>
        </Grid>
      </Grid>
    </PreLoading>
  );
};

export default GroupsModule;
