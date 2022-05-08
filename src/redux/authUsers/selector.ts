import { createSelector } from '@reduxjs/toolkit';
import { authUserIdSelector } from '@redux/auth/selector';
import type { RootState } from '@redux/types';
import { AuthUserDto, AuthUserId } from 'models/authUser';
import { employeeIdFromParamsSelector } from '@redux/employees';
import { studentIdFromParamsSelector } from '@redux/students';
import { find } from 'lodash';

const authUsersSelector = (state: RootState) => state.authUsers;

export const authUserIdFromParamsSelector = (
  _: any,
  { authUserId }: { authUserId?: AuthUserId }
) => authUserId ?? -1;
export const authUserIdsFromParamsSelector = (
  _: any,
  { ids }: { ids: AuthUserId[] }
) => ids;

export const selfAuthUserSelector = createSelector(
  authUsersSelector,
  authUserIdSelector,
  ({ entities }, uid): Nullable<AuthUserDto> =>
    uid != null ? entities[uid] : null
);

export const authUserByIdSelector = createSelector(
  authUsersSelector,
  authUserIdFromParamsSelector,
  (state, authUserId) => state.entities[authUserId]
);

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
