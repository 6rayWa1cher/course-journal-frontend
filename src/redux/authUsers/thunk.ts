import { createAxiosAsyncThunk } from "@redux/utils";
import { AuthUserId, UserRole } from "models/authUser";
import { getAuthUserByEmployeeIdApi, getAuthUserByIdApi } from "api/authUsers";
import { unwrapResult } from "@reduxjs/toolkit";
import { getEmployeeByIdThunk } from "@redux/employees";
import { EmployeeId } from "models/employee";

export interface GetAuthUserByIdArgs {
  authUserId: AuthUserId;
}

export const getAuthUserByIdThunk = createAxiosAsyncThunk(
  "authUsers/getSelfUser",
  async (args: GetAuthUserByIdArgs) => {
    const user = (await getAuthUserByIdApi(args.authUserId)).data;
    return user;
  }
);

export type LoadUserDataArgs = GetAuthUserByIdArgs;

export const loadUserDataThunk = createAxiosAsyncThunk(
  "authUsers/loadUserData",
  async (args: LoadUserDataArgs, { dispatch }) => {
    const { userRole, employee } = await dispatch(
      getAuthUserByIdThunk(args)
    ).then(unwrapResult);
    if (userRole === UserRole.TEACHER) {
      if (employee == null)
        throw new Error("Unexpected employee=null on userRole=TEACHER");
      await dispatch(getEmployeeByIdThunk({ employeeId: employee })).then(
        unwrapResult
      );
    }
  }
);

export interface GetAuthUserByEmployeeIdArgs {
  employeeId: EmployeeId;
}

export const getAuthUserByEmployeeIdThunk = createAxiosAsyncThunk(
  "authUsers/getAuthUserByEmployeeId",
  async ({ employeeId }: GetAuthUserByEmployeeIdArgs) => {
    const user = (await getAuthUserByEmployeeIdApi(employeeId)).data;
    return user;
  }
);
