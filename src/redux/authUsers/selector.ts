import { createSelector } from '@reduxjs/toolkit';
import { authUserIdSelector } from '@redux/auth/selector';
import type { RootState } from '@redux/types';
import { AuthUserDto, AuthUserId } from 'models/authUser';

const authUsersSelector = (state: RootState) => state.authUsers;

const authUserIdFromParamsSelector = (
  _: any,
  { authUserId }: { authUserId?: AuthUserId }
) => authUserId ?? -1;
const authUserIdsFromParamsSelector = (
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
