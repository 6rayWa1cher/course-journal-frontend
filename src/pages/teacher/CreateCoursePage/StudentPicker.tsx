import { Checkbox, FormControlLabel } from '@mui/material';
import {
  getStudentsByGroupIdThunk,
  studentsByGroupAlphabeticalSelector,
} from '@redux/students';
import EmptyListCaption from 'components/EmptyListCaption';
import ListCheckboxes from 'components/ListCheckboxes';
import PreLoading from 'components/PreLoading';
import Scrollable from 'components/Scrollable';
import { GroupId } from 'models/group';
import { useCallback, useMemo } from 'react';
import { useFormContext } from 'react-hook-form';
import { useLoadingActionThunk, useParamSelector } from 'utils/hooks';
import { getFullName } from 'utils/string';

export interface StudentPickerProps {
  groupId: GroupId;
}

const StudentPicker = ({ groupId }: StudentPickerProps) => {
  const { control } = useFormContext();
  const students = useParamSelector(studentsByGroupAlphabeticalSelector, {
    groupId,
  });
  const thunk = useCallback(
    () => getStudentsByGroupIdThunk({ groupId }),
    [groupId]
  );
  const loadingAction = useLoadingActionThunk(thunk);

  const options = useMemo(
    () =>
      students.map((s) => ({
        id: s.id,
        name: getFullName(s),
      })),
    [students]
  );

  return (
    <PreLoading action={loadingAction}>
      <Scrollable height="50vh" onlyMax>
        {options.length > 0 ? (
          <ListCheckboxes
            options={options}
            name="students"
            control={control}
            selectAll
          />
        ) : (
          <EmptyListCaption />
        )}
      </Scrollable>
    </PreLoading>
  );
};

export default StudentPicker;
