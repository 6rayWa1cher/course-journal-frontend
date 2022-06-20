import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '@redux/types';

export const authSelector = (state: RootState) => state.auth;

export const bagSelector = createSelector(authSelector, (state) => state.bag);

export const accessTokenSelector = createSelector(
  bagSelector,
  (bag) => bag?.accessToken.value
);

export const refreshTokenSelector = createSelector(
  bagSelector,
  (bag) => bag?.refreshToken.value
);

export const loggedInSelector = createSelector(
  authSelector,
  ({ bag, courseToken }) =>
    courseToken != null ||
    (bag !== null &&
      (new Date() < new Date(bag.accessToken.expiringAt) ||
        new Date() < new Date(bag.refreshToken.expiringAt)))
);

export const authUserIdSelector = createSelector(
  bagSelector,
  (bag) => bag?.authUserId
);

export const courseTokenSelector = createSelector(
  authSelector,
  (state) => state.courseToken
);

export const loggedInWithSelector = createSelector(authSelector, (state) =>
  state.bag != null
    ? 'accessToken'
    : state.courseToken != null
    ? 'courseToken'
    : undefined
);
