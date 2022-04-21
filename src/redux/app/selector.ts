import { createSelector } from "@reduxjs/toolkit";
import { loggedInSelector } from "@redux/auth";
import type { RootState } from "@redux/types";
import { selfUserSelector } from "@redux/users";
import { appPrefix, Stage } from "./types";

export const appSelector = (state: RootState) => state[appPrefix];

export const stateSelector = createSelector(
  appSelector,
  (state) => state.state
);

export const errorSelector = createSelector(
  appSelector,
  (state) => state.error
);

const userStageSelector = createSelector(selfUserSelector, (userDto): Stage => {
  if (!userDto) {
    return Stage.UNAUTHORIZED;
  }
  return Stage.AUTHORIZED;
});

export const stageSelector = createSelector(
  loggedInSelector,
  (state: RootState) => userStageSelector(state),
  (loggedIn, stage): Stage => (!loggedIn ? Stage.UNAUTHORIZED : stage)
);
