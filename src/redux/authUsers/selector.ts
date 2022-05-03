import { createSelector } from "@reduxjs/toolkit";
import { authUserIdSelector } from "@redux/auth/selector";
import type { RootState } from "@redux/types";
import { AuthUserDto, AuthUserId } from "models/authUser";

const authUsersSelector = (state: RootState) => state.authUsers;

const authUserIdFromParamsSelector = (
  _: any,
  { authUserId }: { authUserId: AuthUserId }
) => authUserId;
const authUserIdsFromParamsSelector = (
  _: any,
  { ids }: { ids: AuthUserId[] }
) => ids;

export const selfAuthUserSelector = createSelector(
  authUsersSelector,
  authUserIdSelector,
  ({ entities }, uid): Nullable<AuthUserDto> =>
    uid !== null && uid !== undefined ? entities[uid] : null
);

// export const loggedInUserSelector = createSelector(
//   authUsersSelector,
//   userIdSelector,
//   ({ entities }, uid): Nullable<AuthUserDto> => {
//     if (uid == null) {
//       throw Error("incorrect state: self user id isn't found");
//     }
//     const userDto = entities[uid];
//     if (userDto == null) {
//       throw Error("incorrect state: self user dto isn't found");
//     }
//     return userDto;
//   }
// );

// export const usersByIdsSelector = createSelector(
//   authUsersSelector,
//   authUserIdsFromParamsSelector,
//   ({ entities }, ids): (UserDto | undefined)[] => ids.map((id) => entities[id])
// );

// export const userByIdSelector = createSelector(
//   authUsersSelector,
//   authUserIdFromParamsSelector,
//   ({ entities }, uid): Nullable<UserDto> =>
//     uid !== null && uid !== undefined ? entities[uid] : null
// );
