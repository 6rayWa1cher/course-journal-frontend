import { createAxiosAsyncThunk } from '@redux/utils';
import { AuthUserId, UserRole } from 'models/authUser';
import {
  createAuthUserApi,
  getAuthUserByEmployeeIdApi,
  getAuthUserByIdApi,
  getAuthUserByStudentIdApi,
  patchAuthUserApi,
} from 'api/authUsers';
import { unwrapResult } from '@reduxjs/toolkit';
import { getEmployeeByIdThunk } from '@redux/employees';
import { EmployeeId } from 'models/employee';
import { CreateAuthUserRequest, PatchAuthUserRequest } from 'api/types';
import { StudentId } from 'models/student';
import { getStudentByIdThunk } from '@redux/students/thunk';

export interface GetAuthUserByIdArgs {
  authUserId: AuthUserId;
}

export const getAuthUserByIdThunk = createAxiosAsyncThunk(
  'authUsers/getSelfUser',
  async (args: GetAuthUserByIdArgs) => {
    const user = (await getAuthUserByIdApi(args.authUserId)).data;
    return user;
  }
);

export type LoadUserDataArgs = GetAuthUserByIdArgs;

export const loadUserDataThunk = createAxiosAsyncThunk(
  'authUsers/loadUserData',
  async (args: LoadUserDataArgs, { dispatch }) => {
    const { userRole, employee, student } = await dispatch(
      getAuthUserByIdThunk(args)
    ).then(unwrapResult);
    if (userRole === UserRole.TEACHER) {
      if (employee == null)
        throw new Error('Unexpected employee=null on userRole=TEACHER');
      await dispatch(getEmployeeByIdThunk({ employeeId: employee })).then(
        unwrapResult
      );
    }
    if (userRole === UserRole.HEADMAN) {
      if (student == null)
        throw new Error('Unexpected student=null on userRole=HEADMAN');
      await dispatch(getStudentByIdThunk({ studentId: student })).then(
        unwrapResult
      );
    }
  }
);

export interface GetAuthUserByEmployeeIdArgs {
  employeeId: EmployeeId;
}

export const getAuthUserByEmployeeIdThunk = createAxiosAsyncThunk(
  'authUsers/getAuthUserByEmployeeId',
  async ({ employeeId }: GetAuthUserByEmployeeIdArgs) => {
    const user = (await getAuthUserByEmployeeIdApi(employeeId)).data;
    return user;
  }
);

export interface GetAuthUserByStudentIdArgs {
  studentId: StudentId;
}

export const getAuthUserByStudentIdThunk = createAxiosAsyncThunk(
  'authUsers/getAuthUserByStudentId',
  async ({ studentId }: GetAuthUserByStudentIdArgs) => {
    const user = (await getAuthUserByStudentIdApi(studentId)).data;
    return user;
  }
);

export const createAuthUserThunk = createAxiosAsyncThunk(
  'authUsers/create',
  async (data: CreateAuthUserRequest) => {
    const user = (await createAuthUserApi(data)).data;
    return user;
  }
);

export interface PatchAuthUserArgs {
  authUserId: EmployeeId;
  data: PatchAuthUserRequest;
}

export const patchAuthUserThunk = createAxiosAsyncThunk(
  'authUsers/patch',
  async ({ authUserId, data }: PatchAuthUserArgs) => {
    const user = (await patchAuthUserApi(authUserId, data)).data;
    return user;
  }
);
