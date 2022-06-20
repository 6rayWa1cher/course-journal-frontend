import { createSelector } from '@reduxjs/toolkit';
import { compact, find, pick, uniq } from 'lodash';
import { CourseFullDto } from 'models/course';
import { GroupDto, GroupId } from 'models/group';
import { isArrayOfNumbersContainsElementFromOtherArray } from 'utils/collections';
import { authUsersSelector, selfAuthUserSelector } from './authUsers';
import { coursesSelector } from './courses';
import { employeeIdFromParamsSelector, employeesSelector } from './employees';
import { groupsSelector } from './groups';
import {
  studentIdFromParamsSelector,
  studentsByGroupSelector,
  studentsByIdsSelector,
  studentsSelector,
} from './students/selector';

export const authUserByStudentIdSelector = createSelector(
  authUsersSelector,
  studentIdFromParamsSelector,
  (state, studentId) => find(state.entities, (u) => u?.student === studentId)
);

export const authUserByEmployeeIdSelector = createSelector(
  authUsersSelector,
  employeeIdFromParamsSelector,
  (state, employeeId) => find(state.entities, (u) => u?.employee === employeeId)
);

export const selfEmployeeSelector = createSelector(
  employeesSelector,
  selfAuthUserSelector,
  (state, authUser) => {
    const employeeId = authUser?.employee;
    return employeeId != null ? state.entities[employeeId] : null;
  }
);

export const selfStudentSelector = createSelector(
  studentsSelector,
  selfAuthUserSelector,
  (state, authUser) => {
    const studentId = authUser?.student;
    return studentId != null ? state.entities[studentId] : null;
  }
);

export const selfGroupSelector = createSelector(
  studentsSelector,
  groupsSelector,
  selfAuthUserSelector,
  (students, groups, authUser) => {
    const studentId = authUser?.student;
    const student =
      studentId != undefined ? students.entities[studentId] : null;
    return student != null ? groups.entities[student.group] : null;
  }
);

export const groupsByStudentsSelector = createSelector(
  groupsSelector,
  studentsByIdsSelector,
  (state, students): GroupDto[] => {
    const groupIds: GroupId[] = uniq(compact(students).map((s) => s?.group));
    return compact(Object.values(pick(state.entities, ...groupIds)));
  }
);

export const coursesByGroupIdSelector = createSelector(
  coursesSelector,
  studentsByGroupSelector,
  (state, students) => {
    const studentsIds = students.map((student) => student.id);
    console.log(studentsIds);
    return Object.values(state.entities)
      .filter(
        (courseFullDto): courseFullDto is CourseFullDto =>
          courseFullDto != null && 'students' in courseFullDto
      )
      .filter((courseFullDto) =>
        isArrayOfNumbersContainsElementFromOtherArray(
          studentsIds,
          courseFullDto.students
        )
      );
  }
);
