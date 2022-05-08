import { groupIdFromParamsSelector } from '@redux/groups';
import type { RootState } from '@redux/types';
import { createSelector } from '@reduxjs/toolkit';
import { StudentDto, StudentId } from 'models/student';
import { formatFullNameWithInitials, getFullName } from 'utils/string';

const studentsSelector = (state: RootState) => state.students;

export const studentIdFromParamsSelector = (
  _: any,
  { studentId }: { studentId?: StudentId }
) => studentId ?? -1;
export const studentIdsFromParamsSelector = (
  _: any,
  { ids }: { ids: StudentId[] }
) => ids;

export const studentByIdSelector = createSelector(
  studentsSelector,
  studentIdFromParamsSelector,
  (state, studentId) => state.entities[studentId]
);

export const studentsByGroupSelector = createSelector(
  studentsSelector,
  groupIdFromParamsSelector,
  (state, groupId) =>
    Object.values(state.entities).filter(
      (dto): dto is StudentDto => dto?.group === groupId
    )
);

export const studentsByIdsSelector = createSelector(
  studentsSelector,
  studentIdsFromParamsSelector,
  (state, ids) => ids.map((id) => state.entities[id])
);

export const studentsByGroupAlphabeticalSelector = createSelector(
  studentsByGroupSelector,
  (students) =>
    students
      .filter((student): student is StudentDto => !!student)
      .sort((a, b) => getFullName(a).localeCompare(getFullName(b)))
);

export const studentInitialsByIdSelector = createSelector(
  studentByIdSelector,
  (student) => (student != null ? formatFullNameWithInitials(student) : null)
);
