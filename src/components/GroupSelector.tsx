import { Box, LinearProgress } from '@mui/material';
import {
  allFacultiesSelector,
  facultyByIdSelector,
  getAllFacultiesThunk,
  getFacultyByIdThunk,
} from '@redux/faculties';
import {
  getGroupsByFacultyIdThunk,
  groupsByFacultySelector,
} from '@redux/groups';
import { useAppDispatch } from '@redux/utils';
import { unwrapResult } from '@reduxjs/toolkit';
import ListSelector from 'components/ListSelector';
import NativeSelector from 'components/NativeSelector';
import Scrollable from 'components/Scrollable';
import { FacultyId } from 'models/faculty';
import { GroupId } from 'models/group';
import { useState, useCallback, useEffect } from 'react';
import { defaultErrorEnqueue } from 'utils/errorProcessor';
import {
  useLoadingPlain,
  useMySnackbar,
  useNarrowScreen,
  useParamSelector,
  useTypedSelector,
} from 'utils/hooks';

export interface GroupSelectorProps {
  groupId: GroupId | null;
  setGroupId: (group: GroupId | null) => void;
}

const GroupSelector = ({ groupId, setGroupId }: GroupSelectorProps) => {
  const [facultyId, setFacultyId] = useState<FacultyId | null>(null);
  const dispatch = useAppDispatch();
  const { enqueueError } = useMySnackbar();
  const faculties = useTypedSelector(allFacultiesSelector) ?? [];
  const faculty = useParamSelector(facultyByIdSelector, {
    facultyId: facultyId ?? -1,
  });
  const groups = useParamSelector(groupsByFacultySelector, {
    facultyId: facultyId ?? -1,
  });
  const loadData = useCallback(async () => {
    try {
      if (facultyId == null) {
        await dispatch(getAllFacultiesThunk()).then(unwrapResult);
      } else if (faculty == null) {
        await dispatch(getFacultyByIdThunk({ facultyId })).then(unwrapResult);
      }
      if (facultyId != null) {
        await dispatch(getGroupsByFacultyIdThunk({ facultyId })).then(
          unwrapResult
        );
      }
    } catch (e) {
      defaultErrorEnqueue(e as Error, enqueueError);
    }
  }, [dispatch, enqueueError, facultyId, faculty]);
  const { loading, execute } = useLoadingPlain(loadData, { immediate: false });

  useEffect(() => {
    execute();
  }, [execute, facultyId, groupId]);

  const narrowScreen = useNarrowScreen();

  return (
    <>
      <NativeSelector
        items={faculties}
        label="Факультеты"
        selected={facultyId}
        onSelect={setFacultyId}
      />
      {loading ? <LinearProgress /> : <Box sx={{ height: '4px' }} />}
      {narrowScreen ? (
        <NativeSelector
          items={groups}
          label="Группы"
          selected={groupId}
          onSelect={setGroupId}
        />
      ) : (
        <Scrollable height="50vh" onlyMax>
          <ListSelector
            items={groups}
            selected={groupId}
            onSelect={setGroupId}
          />
        </Scrollable>
      )}
    </>
  );
};

export default GroupSelector;
