import { createAxiosAsyncThunk } from "@redux/utils";
import { getEmployeeByIdApi } from "api/employees";
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
