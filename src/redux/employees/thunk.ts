import { createAxiosAsyncThunk } from '@redux/utils';
import {
  createAuthUserApi,
  deleteAuthUserApi,
  getAuthUserByEmployeeIdApi,
} from 'api/authUsers';
import {
  createEmployeeApi,
  deleteEmployeeApi,
  getEmployeeByIdApi,
  getEmployeesApi,
  putEmployeeApi,
} from 'api/employees';
import { isAxiosError } from 'api/helpers/utils';
import { GetEmployeesRequest } from 'api/types';
import { AuthUserId, UserRole } from 'models/authUser';
import { EmployeeRestDto, EmployeeId, EmployeeDto } from 'models/employee';
import { upsertOneEmployee } from './actions';

export interface EmployeesGetByIdArgs {
  employeeId: EmployeeId;
}

export const getEmployeeByIdThunk = createAxiosAsyncThunk(
  'employees/getById',
  async ({ employeeId }: EmployeesGetByIdArgs) => {
    const data = (await getEmployeeByIdApi(employeeId)).data;
    return data;
  }
);

export const getEmployeesThunk = createAxiosAsyncThunk(
  'employees/getEmployees',
  async (args: GetEmployeesRequest) => {
    const data = (await getEmployeesApi(args)).data;
    return data;
  }
);

export type GetEmployeeWithAuthUserArgs = EmployeesGetByIdArgs;

export const getEmployeeWithAuthUserThunk = createAxiosAsyncThunk(
  'employees/getWithAuthUser',
  async ({ employeeId }: GetEmployeeWithAuthUserArgs) => {
    const employee = (await getEmployeeByIdApi(employeeId)).data;
    try {
      const authUser = (await getAuthUserByEmployeeIdApi(employeeId)).data;
      return { employee, authUser };
    } catch (e) {
      if (isAxiosError(e) && e.response?.status === 404) {
        return { employee };
      }
      throw e;
    }
  }
);

export const createEmployeeThunk = createAxiosAsyncThunk(
  'employees/create',
  async (args: EmployeeRestDto) => {
    const employee = (await createEmployeeApi(args)).data;
    return employee;
  }
);

export interface CreateEmployeeWithAuthUserArgs {
  employee: EmployeeRestDto;
  authUser: {
    username: string;
    password: string;
  };
}

export const createEmployeeWithAuthUserThunk = createAxiosAsyncThunk(
  'employees/createWithAuthUser',
  async (args: CreateEmployeeWithAuthUserArgs) => {
    const employee = (await createEmployeeApi(args.employee)).data;
    const employeeId = employee.id;
    try {
      const authUserRequest = {
        ...args.authUser,
        userRole: UserRole.TEACHER,
        userInfo: employeeId,
      };
      const authUser = (await createAuthUserApi(authUserRequest)).data;
      return { employee, authUser };
    } catch (err) {
      await deleteEmployeeApi(employeeId);
      throw err;
    }
  }
);

export interface PutEmployeeArgs {
  employeeId: EmployeeId;
  data: EmployeeRestDto;
}

export const putEmployeeThunk = createAxiosAsyncThunk(
  'employees/put',
  async ({ employeeId, data }: PutEmployeeArgs) => {
    const employee = (await putEmployeeApi(employeeId, data)).data;
    return employee;
  }
);

export type PutEmployeeWithAuthUserArgs = {
  employeeId: EmployeeId;
  prevEmployee: EmployeeRestDto;
  employee: EmployeeRestDto;
} & (
  | {
      authUserId: AuthUserId;
      authUser: { username: string; password?: string };
    }
  | { authUserId: undefined; authUser?: { username: string; password: string } }
);

export const putEmployeeWithAuthUserThunk = createAxiosAsyncThunk(
  'employees/putWithAuthUser',
  async (
    {
      employeeId,
      authUserId,
      prevEmployee,
      employee,
      authUser,
    }: PutEmployeeWithAuthUserArgs,
    { dispatch }
  ) => {
    const editEmployee = async () =>
      (await putEmployeeApi(employeeId, employee)).data;

    if (authUserId == null && authUser == null) {
      const editedEmployee = await editEmployee();
      return { employee: editedEmployee };
    } else if (authUserId == null && authUser != null) {
      const request = {
        ...authUser,
        userRole: UserRole.TEACHER,
        userInfo: employeeId,
      };
      const createdAuthUser = (await createAuthUserApi(request)).data;
      const authUserId = createdAuthUser.id;
      try {
        const editedEmployee = await editEmployee();
        return { employee: editedEmployee, authUser: createdAuthUser };
      } catch (e) {
        await deleteAuthUserApi(authUserId);
        throw e;
      }
    } else if (authUserId != null && authUser == null) {
    }
  }
);

export type DeleteEmployeeArgs = EmployeesGetByIdArgs;

export const deleteEmployeeThunk = createAxiosAsyncThunk(
  'employees/delete',
  async ({ employeeId }: DeleteEmployeeArgs) => {
    await deleteEmployeeApi(employeeId);
    return employeeId;
  }
);
