import { createSelector } from '@reduxjs/toolkit';
import { find } from 'lodash';
import { authUsersSelector, selfAuthUserSelector } from './authUsers';
import { employeeIdFromParamsSelector, employeesSelector } from './employees';
import { studentIdFromParamsSelector } from './students';

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
