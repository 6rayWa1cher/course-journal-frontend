import { createAxiosAsyncThunk } from '@redux/utils';
import {
  createEmployeeApi,
  deleteEmployeeApi,
  getEmployeeByIdApi,
  getEmployeesApi,
  putEmployeeApi,
} from 'api/employees';
import { GetEmployeesRequest } from 'api/types';
import { EmployeeRestDto, EmployeeId } from 'models/employee';

export interface EmployeesGetByIdArgs {
  employeeId: EmployeeId;
}

export const getEmployeeByIdThunk = createAxiosAsyncThunk(
  'employees/getById',
  async (args: EmployeesGetByIdArgs) => {
    const { employeeId } = args;
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

export const createEmployeeThunk = createAxiosAsyncThunk(
  'employees/create',
  async (args: EmployeeRestDto) => {
    const employee = (await createEmployeeApi(args)).data;
    return employee;
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

export type DeleteEmployeeArgs = EmployeesGetByIdArgs;

export const deleteEmployeeThunk = createAxiosAsyncThunk(
  'employees/delete',
  async ({ employeeId }: DeleteEmployeeArgs) => {
    await deleteEmployeeApi(employeeId);
    return employeeId;
  }
);
