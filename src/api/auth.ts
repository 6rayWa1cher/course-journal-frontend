import { AxiosPromise } from "axios";
import { basicAxios, mainAxios } from "./myaxios";
import type {
  ApiAuthBag,
  LoginRequest,
  RefreshUserIdRequest,
  SelfInfo,
} from "./types";

export const authCheckCredentialsApi = (): AxiosPromise<never> =>
  mainAxios.get(`/auth/check`);

export const authGetAccessApi = (
  data: RefreshUserIdRequest
): AxiosPromise<ApiAuthBag> => basicAxios.post(`/auth/get_access`, data);

export const authInvalidateApi = (
  data: RefreshUserIdRequest
): AxiosPromise<never> => mainAxios.delete(`/auth/invalidate`, { data });

export const authLoginApi = (data: LoginRequest): AxiosPromise<ApiAuthBag> =>
  basicAxios.post(`/auth/login`, data);

export const authGetSelfUserApi = (): AxiosPromise<SelfInfo> =>
  mainAxios.get(`/auth/user`);
