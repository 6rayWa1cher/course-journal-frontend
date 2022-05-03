import { authUserIdSelector, loggedInSelector } from "@redux/auth";
import { eraseBag, loadBag } from "@redux/auth/slice";
import { loadUserDataThunk } from "@redux/authUsers";
import { createTypedAsyncThunk } from "@redux/utils";
import { unwrapResult } from "@reduxjs/toolkit";
import { AuthUserId } from "models/authUser";
import { appSelector } from "./selector";
import { WebApplicationState } from "./types";

export const initAppThunk = createTypedAsyncThunk(
  "app/init",
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
      const authUserId = authUserIdSelector(getState()) as AuthUserId;
      try {
        await dispatch(loadUserDataThunk({ authUserId })).then(unwrapResult);
      } catch (err) {
        console.log("Emitting logout in response to ", err);
        dispatch(eraseBag());
      }
    }
  }
);
