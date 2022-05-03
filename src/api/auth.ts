import type { AxiosPromise } from "axios";
import { basicAxios, mainAxios } from "./helpers/myaxios";
import type {
  ApiAuthBag,
  LoginRequest,
  RefreshUserIdRequest,
  SelfInfo,
} from "./types";

export const checkCredentialsApi = (): AxiosPromise<void> =>
  mainAxios.get(`/auth/check`);

export const getTokenFromRefreshApi = (
  data: RefreshUserIdRequest
): AxiosPromise<ApiAuthBag> => basicAxios.post(`/auth/get_access`, data);

export const invalidateTokenApi = (
  data: RefreshUserIdRequest
): AxiosPromise<void> => mainAxios.delete(`/auth/invalidate`, { data });

export const loginApi = (data: LoginRequest): AxiosPromise<ApiAuthBag> =>
  basicAxios.post(`/auth/login`, data);

export const getSelfUserApi = (): AxiosPromise<SelfInfo> =>
  mainAxios.get(`/auth/user`);
