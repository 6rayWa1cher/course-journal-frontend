import { createSelector } from '@reduxjs/toolkit';
import { authUserIdSelector } from '@redux/auth/selector';
import type { RootState } from '@redux/types';
import { AuthUserDto, AuthUserId } from 'models/authUser';

export const authUsersSelector = (state: RootState) => state.authUsers;

export const authUserIdFromParamsSelector = (
  _: unknown,
  { authUserId }: { authUserId?: AuthUserId }
) => authUserId ?? -1;
export const authUserIdsFromParamsSelector = (
  _: unknown,
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
