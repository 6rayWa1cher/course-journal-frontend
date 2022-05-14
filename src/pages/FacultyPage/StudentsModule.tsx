import {
  getStudentsByGroupIdThunk,
  studentsByGroupAlphabeticalSelector,
} from '@redux/students';
import NavListWithAvatars from 'components/NavListWithAvatars';
import PreLoading from 'components/PreLoading';
import { GroupId } from 'models/group';
import { useCallback } from 'react';
import { useLoadingActionThunk, useParamSelector } from 'utils/hooks';
import StarIcon from '@mui/icons-material/Star';
import { getFirstCapitalSymbols, getFullName } from 'utils/string';
import { FacultyId } from 'models/faculty';

export interface StudentsModuleProps {
  facultyId: FacultyId;
  groupId: GroupId;
}

const StudentsModule = ({ facultyId, groupId }: StudentsModuleProps) => {
  const thunk = useCallback(
    () => getStudentsByGroupIdThunk({ groupId }),
    [groupId]
  );
  const loadingAction = useLoadingActionThunk(thunk);
  const students = useParamSelector(studentsByGroupAlphabeticalSelector, {
    groupId,
  });

  return (
    <PreLoading action={loadingAction}>
      <NavListWithAvatars
        items={students.map((v) => ({
          id: v.id,
          name: getFullName(v),
          link: `/faculties/${facultyId}/students/${v.id}`,
          avatar: v.headman ? (
            <StarIcon />
          ) : (
            getFirstCapitalSymbols(getFullName(v), 2)
          ),
        }))}
      />
    </PreLoading>
  );
};

export default StudentsModule;
