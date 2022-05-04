import { createAxiosAsyncThunk } from "@redux/utils";
import { getEmployeeByIdApi, getEmployeesApi } from "api/employees";
import { GetEmployeesRequest } from "api/types";
import { EmployeeId } from "models/employee";

export interface EmployeesGetByIdArgs {
  employeeId: EmployeeId;
}

export const getEmployeeByIdThunk = createAxiosAsyncThunk(
  "employees/getById",
  async (args: EmployeesGetByIdArgs) => {
    const { employeeId } = args;
    const data = (await getEmployeeByIdApi(employeeId)).data;
    return data;
  }
);

export const geеEmployeesThunk = createAxiosAsyncThunk(
  "employees/getEmployees",
  async (args: GetEmployeesRequest) => {
    const data = (await getEmployeesApi(args)).data;
    return data;
  }
);
