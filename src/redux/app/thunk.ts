import { loggedInSelector } from "@redux/auth";
import { eraseBag, loadBag } from "@redux/auth/slice";
import { usersGetSelfUserThunk } from "@redux/users";
import { createTypedAsyncThunk } from "@redux/utils";
import { unwrapResult } from "@reduxjs/toolkit";
import { appSelector } from "./selector";
import { appPrefix, WebApplicationState } from "./types";

export const initAppThunk = createTypedAsyncThunk(
  appPrefix + "/init",
  async (_, { dispatch, getState, requestId }) => {
    const { currentRequestId, state } = appSelector(getState());
    if (
      state !== WebApplicationState.LOADING ||
      requestId !== currentRequestId
    ) {
      return;
    }
    dispatch(loadBag());
    if (loggedInSelector(getState())) {
      try {
        await dispatch(usersGetSelfUserThunk()).then(unwrapResult);
      } catch (err) {
        console.log("Emitting logout in response to ", err);
        dispatch(eraseBag());
      }
    }
  }
);
