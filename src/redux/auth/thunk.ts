import { authPrefix } from "./types";
import {
  convertAuthBagFromApi,
  removeAuthBag,
  saveAuthBag,
} from "service/authbag";
import { authInvalidateApi, authLoginApi } from "api/auth";
import { refreshTokenSelector, userIdSelector } from "./selector";
import { createAxiosAsyncThunk } from "@redux/utils";
import type { LoginRequest } from "api/types";

export const loginThunk = createAxiosAsyncThunk(
  `${authPrefix}/login`,
  async (loginData: LoginRequest) => {
    const response = await authLoginApi(loginData);
    const apiAuthBag = response.data;
    const authBag = convertAuthBagFromApi(apiAuthBag);
    saveAuthBag(authBag);
    return authBag;
  }
);

export const logoutThunk = createAxiosAsyncThunk(
  `${authPrefix}/logout`,
  async (_, { getState }) => {
    const state = getState();
    const refreshToken = refreshTokenSelector(state);
    const userId = userIdSelector(state);
    if (refreshToken && userId) {
      try {
        await authInvalidateApi({ refreshToken, userId });
      } catch (ignored) {}
    }
    removeAuthBag();
    return {};
  }
);
