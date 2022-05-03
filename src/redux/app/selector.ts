import { createSelector } from "@reduxjs/toolkit";
import { loggedInSelector } from "@redux/auth";
import type { RootState } from "@redux/types";
import { Stage } from "./types";
import { selfAuthUserSelector } from "@redux/authUsers";

export const appSelector = (state: RootState) => state.app;

export const stateSelector = createSelector(
  appSelector,
  (state) => state.state
);

export const errorSelector = createSelector(
  appSelector,
  (state) => state.error
);

const userStageSelector = createSelector(
  selfAuthUserSelector,
  (authUserDto): Stage => {
    if (!authUserDto) {
      return Stage.UNAUTHORIZED;
    }
    return Stage.AUTHORIZED;
  }
);

export const stageSelector = createSelector(
  loggedInSelector,
  (state: RootState) => userStageSelector(state),
  (loggedIn, stage): Stage => (!loggedIn ? Stage.UNAUTHORIZED : stage)
);
