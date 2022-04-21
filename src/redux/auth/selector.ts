import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "@redux/types";
import { authPrefix } from "./types";

export const authSelector = (state: RootState) => state[authPrefix];

const bagSelector = createSelector(authSelector, (state) => state.bag);

export const accessTokenSelector = createSelector(
  bagSelector,
  (state) => state?.accessToken.value
);

export const refreshTokenSelector = createSelector(
  bagSelector,
  (state) => state?.refreshToken.value
);

export const loggedInSelector = createSelector(
  authSelector,
  ({ bag }) =>
    bag !== null &&
    (new Date() < new Date(bag.accessToken.expiringAt) ||
      new Date() < new Date(bag.refreshToken.expiringAt))
);

export const userIdSelector = createSelector(
  bagSelector,
  (state) => state?.userId
);
