import type { AxiosPromise } from 'axios';
import type { AuthUserDto, AuthUserId } from 'models/authUser';
import { EmployeeId } from 'models/employee';
import { StudentId } from 'models/student';
import { mainAxios } from './helpers/myaxios';
import { CreateAuthUserRequest, PatchAuthUserRequest } from './types';

export const getAuthUserByIdApi = (
  authUserId: AuthUserId
): AxiosPromise<AuthUserDto> => mainAxios.get(`/auth-user/${authUserId}`);

export const getAuthUserByEmployeeIdApi = (
  employeeId: EmployeeId
): AxiosPromise<AuthUserDto> =>
  mainAxios.get(`/auth-user/employee/${employeeId}`);

export const getAuthUserByStudentIdApi = (
  studentId: StudentId
): AxiosPromise<AuthUserDto> =>
  mainAxios.get(`/auth-user/student/${studentId}`);

export const createAuthUserApi = (
  data: CreateAuthUserRequest
): AxiosPromise<AuthUserDto> => mainAxios.post('/auth-user/', data);

export const patchAuthUserApi = (
  authUserId: AuthUserId,
  data: PatchAuthUserRequest
): AxiosPromise<AuthUserDto> =>
  mainAxios.patch(`/auth-user/${authUserId}`, data);

export const deleteAuthUserApi = (authUserId: AuthUserId): AxiosPromise<void> =>
  mainAxios.delete(`/auth-user/${authUserId}`);
