import { createSelector } from '@reduxjs/toolkit';
import { compact, find, pick, uniq } from 'lodash';
import { GroupDto, GroupId } from 'models/group';
import { StudentDto } from 'models/student';
import { authUsersSelector, selfAuthUserSelector } from './authUsers';
import { employeeIdFromParamsSelector, employeesSelector } from './employees';
import { groupsSelector } from './groups';
import { studentIdFromParamsSelector, studentsByIdsSelector } from './students';

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

export const groupsByStudentsSelector = createSelector(
  groupsSelector,
  studentsByIdsSelector,
  (state, students): GroupDto[] => {
    const groupIds: GroupId[] = uniq(compact(students).map((s) => s?.group));
    return compact(Object.values(pick(state.entities, ...groupIds)));
  }
);
