import {
  accessTokenSelector,
  authUserIdSelector,
  refreshTokenSelector,
  loggedInWithSelector,
  courseTokenSelector,
} from '@redux/auth/selector';
import { logoutThunk } from '@redux/auth/thunk';
import { setBag } from '@redux/auth/action';
import type { Store } from '@redux/types';
import createAuthRefreshInterceptor, {
  AxiosAuthRefreshRequestConfig,
} from 'axios-auth-refresh';
import { convertAuthBagFromApi, saveAuthBag } from 'service/authbag';
import { basicAxios, mainAxios } from './myaxios';
import { AxiosError } from 'axios';

const getAccessToken = (store: Store) => accessTokenSelector(store.getState());

const getCourseToken = (store: Store) => courseTokenSelector(store.getState());

export const createWrappedAuthApiInterceptor = (store: Store) => {
  const refreshAuthLogic = async (failedRequest: AxiosError) => {
    if (loggedInWithSelector(store.getState()) !== 'accessToken') {
      throw new Error(
        "Can't provide refresh logic for non-accessToken authentications"
      );
    } else {
      try {
        const res = await basicAxios.post(
          '/auth/get_access',
          {
            refreshToken: refreshTokenSelector(store.getState()),
            userId: authUserIdSelector(store.getState()),
          },
          { skipAuthRefresh: true } as AxiosAuthRefreshRequestConfig
        );
        const authBag = convertAuthBagFromApi(res.data);
        saveAuthBag(authBag);
        store.dispatch(setBag(authBag));
        if (failedRequest?.response?.config.headers != null) {
          failedRequest.response.config.headers['Authorization'] =
            'Bearer ' + getAccessToken(store);
        }
        return await Promise.resolve();
      } catch (e) {
        console.error(e);
        try {
          await store.dispatch(logoutThunk({ bothTokensInvalid: true }));
        } finally {
          throw e;
        }
      }
    }
  };

  createAuthRefreshInterceptor(mainAxios, refreshAuthLogic, {
    statusCodes: [401, 403],
  });
};

export const createWrappedApiInterceptor = (store: Store) => {
  mainAxios.interceptors.request.use((request) => {
    if (request.headers) {
      switch (loggedInWithSelector(store.getState())) {
        case 'accessToken':
          request.headers['Authorization'] = `Bearer ${getAccessToken(store)}`;
          break;
        case 'courseToken':
          request.headers['Authorization'] = `ctbearer ${getCourseToken(
            store
          )}`;
          break;
      }
    }
    return request;
  });
};
