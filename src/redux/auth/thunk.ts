import {
  convertAuthBagFromApi,
  removeAuthBag,
  saveAuthBag,
} from 'service/authbag';
import { invalidateTokenApi, loginApi } from 'api/auth';
import {
  authSelector,
  authUserIdSelector,
  refreshTokenSelector,
} from './selector';
import { createAxiosAsyncThunk } from '@redux/utils';
import { unwrapResult } from '@reduxjs/toolkit';
import { setBag } from './action';
import { loadUserDataThunk } from '@redux/authUsers';
import { LoginRequest } from 'api/types';

export const loginThunk = createAxiosAsyncThunk(
  'auth/login',
  async (loginData: LoginRequest, { dispatch }) => {
    const response = await loginApi(loginData);
    const apiAuthBag = response.data;
    const authBag = convertAuthBagFromApi(apiAuthBag);
    saveAuthBag(authBag);
    dispatch(setBag(authBag));
    const { authUserId } = authBag;
    await dispatch(loadUserDataThunk({ authUserId })).then(unwrapResult);
    return authBag;
  },
  {
    condition: (_, { getState }) =>
      authSelector(getState()).currentRequestId == null,
  }
);

export const logoutThunk = createAxiosAsyncThunk(
  'auth/logout',
  async (_, { getState }) => {
    const state = getState();
    const refreshToken = refreshTokenSelector(state);
    const authUserId = authUserIdSelector(state);
    if (refreshToken && authUserId) {
      try {
        await invalidateTokenApi({ refreshToken, userId: authUserId });
      } catch {}
    }
    removeAuthBag();
  },
  {
    condition: (_, { getState }) =>
      authSelector(getState()).currentRequestId == null,
  }
);
