import type { AxiosPromise } from "axios";
import type { EmployeeDto, EmployeeId } from "models/employee";
import { mainAxios } from "./helpers/myaxios";
import { preparePageRequest } from "./helpers/preparers";
import { GetEmployeesRequest, Page } from "./types";

export const getEmployeesApi = (
  pageable: GetEmployeesRequest
): AxiosPromise<Page<EmployeeDto>> =>
  mainAxios.get("/employees/", { params: preparePageRequest(pageable) });

export const getEmployeeByIdApi = (id: EmployeeId): AxiosPromise<EmployeeDto> =>
  mainAxios.get(`/employees/${id}`);
