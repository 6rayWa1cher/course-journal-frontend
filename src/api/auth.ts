import type { AxiosPromise } from "axios";
import { basicAxios, mainAxios } from "./helpers/myaxios";
import type { ApiAuthBag, SelfInfo } from "./types";

export const checkCredentialsApi = (): AxiosPromise<void> =>
  mainAxios.get(`/auth/check`);

export interface RefreshUserIdRequest {
  refreshToken: string;
  userId: number;
}
export const getTokenFromRefreshApi = (
  data: RefreshUserIdRequest
): AxiosPromise<ApiAuthBag> => basicAxios.post(`/auth/get_access`, data);

export const invalidateTokenApi = (
  data: RefreshUserIdRequest
): AxiosPromise<void> => mainAxios.delete(`/auth/invalidate`, { data });

export interface LoginRequest {
  username: string;
  password: string;
}

export const loginApi = (data: LoginRequest): AxiosPromise<ApiAuthBag> =>
  basicAxios.post(`/auth/login`, data);

export const getSelfUserApi = (): AxiosPromise<SelfInfo> =>
  mainAxios.get(`/auth/user`);
