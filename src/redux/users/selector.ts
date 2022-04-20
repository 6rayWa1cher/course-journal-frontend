import { createSelector } from "@reduxjs/toolkit";
import { userIdSelector } from "@redux/auth";
import type { RootState } from "@redux/types";
import { UserDto } from "src/models/user";
import { UserId, usersPrefix } from "./types";

const usersSelector = (state: RootState) => state[usersPrefix];

const userIdFromParamsSelector = (_: any, { userId }: { userId: UserId }) =>
  userId;
const userIdsFromParamsSelector = (_: any, { ids }: { ids: UserId[] }) => ids;

export const selfUserSelector = createSelector(
  usersSelector,
  userIdSelector,
  ({ entities }, uid): Nullable<UserDto> =>
    uid !== null && uid !== undefined ? entities[uid] : null
);

export const loggedInUserSelector = createSelector(
  usersSelector,
  userIdSelector,
  ({ entities }, uid): UserDto => {
    if (uid == null) {
      throw Error("incorrect state: self user id isn't found");
    }
    const userDto = entities[uid];
    if (userDto == null) {
      throw Error("incorrect state: self user dto isn't found");
    }
    return userDto;
  }
);

export const usersByIdsSelector = createSelector(
  usersSelector,
  userIdsFromParamsSelector,
  ({ entities }, ids): (UserDto | undefined)[] => ids.map((id) => entities[id])
);

export const userByIdSelector = createSelector(
  usersSelector,
  userIdFromParamsSelector,
  ({ entities }, uid): Nullable<UserDto> =>
    uid !== null && uid !== undefined ? entities[uid] : null
);
