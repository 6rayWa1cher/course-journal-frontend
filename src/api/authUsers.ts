import type { AxiosPromise } from "axios";
import type { AuthUserDto, AuthUserId } from "models/authUser";
import { EmployeeId } from "models/employee";
import { mainAxios } from "./helpers/myaxios";

export const getAuthUserByIdApi = (
  authUserId: AuthUserId
): AxiosPromise<AuthUserDto> => mainAxios.get(`/auth-user/${authUserId}`);

export const getAuthUserByEmployeeIdApi = (
  employeeId: EmployeeId
): AxiosPromise<AuthUserDto> =>
  mainAxios.get(`/auth-user/employee/${employeeId}`);
