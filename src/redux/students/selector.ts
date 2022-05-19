import { courseByIdSelector } from '@redux/courses';
import { groupIdFromParamsSelector } from '@redux/groups';
import type { RootState } from '@redux/types';
import { createSelector } from '@reduxjs/toolkit';
import { compact } from 'lodash';
import { StudentDto, StudentId } from 'models/student';
import { formatFullNameWithInitials, getFullName } from 'utils/string';

const studentsSelector = (state: RootState) => state.students;

export const studentIdFromParamsSelector = (
  _: unknown,
  { studentId }: { studentId?: StudentId }
) => studentId ?? -1;
export const studentIdsFromParamsSelector = (
  _: unknown,
  { ids }: { ids: StudentId[] }
) => ids;

export const studentByIdSelector = createSelector(
  studentsSelector,
  studentIdFromParamsSelector,
  (state, studentId) => state.entities[studentId]
);

export const studentsByCourseSelector = createSelector(
  studentsSelector,
  courseByIdSelector,
  (state, course) =>
    course != null && 'students' in course
      ? compact(course.students.map((id) => state.entities[id]))
      : []
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

export const studentInitialsByIdsSelector = createSelector(
  studentsByIdsSelector,
  (students) =>
    students.map((student) =>
      student != null ? formatFullNameWithInitials(student) : null
    )
);
