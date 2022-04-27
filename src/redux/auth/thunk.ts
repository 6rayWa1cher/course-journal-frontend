import { authPrefix } from "./types";
import {
  convertAuthBagFromApi,
  removeAuthBag,
  saveAuthBag,
} from "service/authbag";
import { authInvalidateApi, authLoginApi } from "api/auth";
import { authSelector, refreshTokenSelector, userIdSelector } from "./selector";
import { createAxiosAsyncThunk, serializeAxiosError } from "@redux/utils";
import type { LoginRequest } from "api/types";
import { usersGetSelfUserThunk } from "@redux/users/thunk";
import { unwrapResult } from "@reduxjs/toolkit";
import { setBag } from "./action";

export const loginThunk = createAxiosAsyncThunk(
  `${authPrefix}/login`,
  async (loginData: LoginRequest, { dispatch }) => {
    const response = await authLoginApi(loginData);
    const apiAuthBag = response.data;
    const authBag = convertAuthBagFromApi(apiAuthBag);
    saveAuthBag(authBag);
    dispatch(setBag(authBag));
    await dispatch(usersGetSelfUserThunk()).then(unwrapResult);
    return authBag;
  },
  {
    condition: (_, { getState }) =>
      authSelector(getState()).currentRequestId == null,
  }
);

export const logoutThunk = createAxiosAsyncThunk(
  `${authPrefix}/logout`,
  async (_, { getState, requestId, rejectWithValue }) => {
    const state = getState();
    const refreshToken = refreshTokenSelector(state);
    const userId = userIdSelector(state);
    if (refreshToken && userId) {
      try {
        await authInvalidateApi({ refreshToken, userId });
      } catch (ignored) {}
    }
    removeAuthBag();
  },
  {
    condition: (_, { getState }) =>
      authSelector(getState()).currentRequestId == null,
  }
);
